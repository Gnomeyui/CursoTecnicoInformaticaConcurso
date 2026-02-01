# 🗄️ GUIA DE INTEGRAÇÃO COM SUPABASE

**Data:** 01/02/2026  
**Versão:** 1.0  
**Status:** ✅ Pronto para implementação

---

## 📋 ÍNDICE

1. [Visão Geral](#visão-geral)
2. [Pré-requisitos](#pré-requisitos)
3. [Passo 1: Configurar Supabase](#passo-1-configurar-supabase)
4. [Passo 2: Executar SQL](#passo-2-executar-sql)
5. [Passo 3: Integrar Front-end](#passo-3-integrar-front-end)
6. [Passo 4: Migrar Dados](#passo-4-migrar-dados)
7. [Exemplos de Uso](#exemplos-de-uso)
8. [Testes](#testes)

---

## 🎯 VISÃO GERAL

Este guia conecta o **Gabaritoo** ao **Supabase** seguindo a arquitetura Local-First:

```
┌─────────────┐         ┌──────────────┐         ┌─────────────┐
│   React     │ ←──→    │   Supabase   │ ←──→    │  PostgreSQL │
│  Front-end  │  API    │   Client     │  RPC    │   Database  │
└─────────────┘         └──────────────┘         └─────────────┘
      ↓                        ↓
┌─────────────┐         ┌──────────────┐
│ SQLite      │         │  Realtime    │
│ (Offline)   │         │  Sync        │
└─────────────┘         └──────────────┘
```

### ✅ O que já está pronto:

- [x] **Schema SQL** completo (`/supabase/schema.sql`)
- [x] **Funções RPC** otimizadas (`/supabase/functions.sql`)
- [x] **Tipos TypeScript** (`/types/estudos.ts`)
- [x] **Hooks customizados** preparados
- [x] **Arquitetura de Services** implementada

---

## 🔧 PRÉ-REQUISITOS

### 1. Conta no Supabase

```bash
# Criar conta em: https://supabase.com
# Criar novo projeto
# Anote:
# - Project URL: https://xxxxx.supabase.co
# - API Key (anon/public): eyJhbGciOiJ...
# - Service Role Key: eyJhbGciOiJ... (NUNCA exponha no front-end!)
```

### 2. Instalar Cliente Supabase

```bash
npm install @supabase/supabase-js
```

### 3. Variáveis de Ambiente

Crie `.env.local`:

```env
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJ...
```

---

## 📦 PASSO 1: CONFIGURAR SUPABASE

### 1.1 Criar Projeto

1. Acesse [supabase.com](https://supabase.com)
2. Clique em "New Project"
3. Nome: `gabaritoo-producao`
4. Database Password: **(guarde em local seguro!)**
5. Region: `South America (São Paulo)`
6. Clique em "Create new project"

### 1.2 Configurar Autenticação

1. Vá em **Authentication** → **Providers**
2. Ative:
   - ✅ Email/Password
   - ✅ Anonymous Sign-in (para modo offline)
3. Configure URLs:
   - Site URL: `https://gabaritoo.com` (ou seu domínio)
   - Redirect URLs: adicione `capacitor://localhost` (para app mobile)

---

## 🗃️ PASSO 2: EXECUTAR SQL

### 2.1 Executar Schema Principal

1. No Supabase Dashboard, vá em **SQL Editor**
2. Clique em "New Query"
3. Cole o conteúdo completo de `/supabase/schema.sql`
4. Clique em **RUN** (⏯️)
5. Aguarde mensagem de sucesso ✅

### 2.2 Executar Funções RPC

1. Ainda no **SQL Editor**, clique em "New Query"
2. Cole o conteúdo completo de `/supabase/functions.sql`
3. Clique em **RUN** (⏯️)
4. Aguarde mensagem de sucesso ✅

### 2.3 Verificar Tabelas

1. Vá em **Table Editor**
2. Verifique se existem as 13 tabelas:
   - ✅ users
   - ✅ perfis_concurso
   - ✅ questoes
   - ✅ alternativas
   - ✅ respostas_usuario
   - ✅ estatisticas_materia
   - ✅ gamification
   - ✅ vouchers
   - ✅ plano_estudo
   - ✅ simulados
   - ✅ simulados_questoes

---

## 🔌 PASSO 3: INTEGRAR FRONT-END

### 3.1 Criar Cliente Supabase

Crie `/lib/supabase/client.ts`:

```typescript
import { createClient } from '@supabase/supabase-js';
import type { Database } from './database.types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Variáveis de ambiente Supabase não configuradas!');
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
  realtime: {
    params: {
      eventsPerSecond: 10,
    },
  },
});
```

### 3.2 Gerar Tipos TypeScript

```bash
# Instalar CLI do Supabase
npm install -D supabase

# Gerar tipos baseados no schema
npx supabase gen types typescript --project-id xxxxx > lib/supabase/database.types.ts
```

### 3.3 Criar Service de Questões

Atualize `/services/QuestionService.ts`:

```typescript
import { supabase } from '../lib/supabase/client';
import type { ItemEstudo } from '../types/estudos';

export const QuestionService = {
  /**
   * Busca questões inteligentes usando a função RPC
   */
  async getSmartQuestions(params: {
    userId: string;
    perfilId?: string;
    limite?: number;
    materia?: string;
    dificuldade?: 'facil' | 'medio' | 'dificil';
    banca?: string;
    incluirErradas?: boolean;
  }): Promise<ItemEstudo[]> {
    const { data, error } = await supabase.rpc('get_smart_questions', {
      p_user_id: params.userId,
      p_perfil_id: params.perfilId,
      p_limite: params.limite || 20,
      p_materia: params.materia,
      p_dificuldade: params.dificuldade,
      p_banca: params.banca,
      p_incluir_erradas: params.incluirErradas || false,
    });

    if (error) {
      console.error('Erro ao buscar questões:', error);
      throw error;
    }

    // Converter para formato ItemEstudo
    return data.map((q: any) => ({
      id: q.id,
      tipo: q.tipo,
      materia: q.materia,
      pergunta: q.pergunta,
      alternativas: q.alternativas,
      explicacao: q.explicacao,
      dificuldade: q.dificuldade,
    }));
  },

  /**
   * Registra resposta do usuário
   */
  async registrarResposta(params: {
    userId: string;
    questaoId: string;
    alternativaId: string;
    perfilId?: string;
    modo?: string;
    tempoSegundos?: number;
  }) {
    const { data, error } = await supabase.rpc('registrar_resposta', {
      p_user_id: params.userId,
      p_questao_id: params.questaoId,
      p_alternativa_id: params.alternativaId,
      p_perfil_id: params.perfilId,
      p_modo: params.modo || 'quiz',
      p_tempo_segundos: params.tempoSegundos,
    });

    if (error) {
      console.error('Erro ao registrar resposta:', error);
      throw error;
    }

    return data;
  },
};
```

### 3.4 Criar Hook de Questões

Crie `/hooks/useSupabaseQuestions.ts`:

```typescript
import { useState, useEffect } from 'react';
import { QuestionService } from '../services/QuestionService';
import { useAuth } from '../context/AuthContext';
import type { ItemEstudo } from '../types/estudos';

export function useSupabaseQuestions(params: {
  materia?: string;
  dificuldade?: 'facil' | 'medio' | 'dificil';
  limite?: number;
}) {
  const { user } = useAuth();
  const [questions, setQuestions] = useState<ItemEstudo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!user) return;

    async function loadQuestions() {
      try {
        setLoading(true);
        const data = await QuestionService.getSmartQuestions({
          userId: user.id,
          ...params,
        });
        setQuestions(data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    }

    loadQuestions();
  }, [user, params.materia, params.dificuldade, params.limite]);

  return { questions, loading, error };
}
```

---

## 📊 PASSO 4: MIGRAR DADOS

### 4.1 Script de Migração

Crie `/scripts/migrate-to-supabase.ts`:

```typescript
import { supabase } from '../lib/supabase/client';
import { questions as localQuestions } from '../data/questions';

async function migrate() {
  console.log('🚀 Iniciando migração...');

  // 1. Migrar questões
  for (const question of localQuestions) {
    // Inserir questão
    const { data: questao, error: questaoError } = await supabase
      .from('questoes')
      .insert({
        tipo: 'QUESTAO',
        materia: question.subject,
        dificuldade: question.difficulty === 'easy' ? 'facil' : 
                     question.difficulty === 'medium' ? 'medio' : 'dificil',
        pergunta: question.question,
        explicacao: question.explanation,
        banca: question.banca,
        ano: question.ano,
        concurso: question.concurso,
      })
      .select()
      .single();

    if (questaoError) {
      console.error('Erro ao inserir questão:', questaoError);
      continue;
    }

    // Inserir alternativas
    for (let i = 0; i < question.options.length; i++) {
      await supabase.from('alternativas').insert({
        questao_id: questao.id,
        ordem: i,
        texto: question.options[i],
        correta: i === question.correctAnswer,
      });
    }

    console.log(`✅ Questão ${question.id} migrada`);
  }

  console.log('🎉 Migração concluída!');
}

migrate();
```

Execute:

```bash
npm run migrate
```

---

## 💡 EXEMPLOS DE USO

### Exemplo 1: Buscar Questões Inteligentes

```typescript
import { useSupabaseQuestions } from '../hooks/useSupabaseQuestions';

function QuizScreen() {
  const { questions, loading } = useSupabaseQuestions({
    materia: 'Informática',
    limite: 20,
  });

  if (loading) return <div>Carregando...</div>;

  return (
    <div>
      {questions.map((q) => (
        <QuestionCard key={q.id} question={q} />
      ))}
    </div>
  );
}
```

### Exemplo 2: Registrar Resposta

```typescript
import { QuestionService } from '../services/QuestionService';

async function handleAnswer(questaoId: string, alternativaId: string) {
  const resultado = await QuestionService.registrarResposta({
    userId: user.id,
    questaoId,
    alternativaId,
    modo: 'quiz',
  });

  if (resultado.acertou) {
    console.log('Acertou! 🎉');
    console.log(`+${resultado.xp_ganho} XP`);
  }

  if (resultado.level_up) {
    console.log(`Level UP! Nível ${resultado.nivel_atual}`);
  }
}
```

### Exemplo 3: Dashboard com Stats

```typescript
import { supabase } from '../lib/supabase/client';

async function loadDashboard() {
  const { data } = await supabase.rpc('get_dashboard_stats', {
    p_user_id: user.id,
  });

  console.log('XP:', data.xp);
  console.log('Nível:', data.nivel);
  console.log('Streak:', data.streak_atual);
  console.log('Questões hoje:', data.questoes_hoje);
  console.log('Meta diária:', data.meta_diaria);
}
```

---

## 🧪 TESTES

### Teste 1: Verificar Conexão

```typescript
import { supabase } from './lib/supabase/client';

async function testConnection() {
  const { data, error } = await supabase.from('users').select('count');
  
  if (error) {
    console.error('❌ Erro de conexão:', error);
  } else {
    console.log('✅ Conexão OK!', data);
  }
}
```

### Teste 2: Criar Usuário de Teste

```typescript
const { data, error } = await supabase.auth.signUp({
  email: 'teste@gabaritoo.com',
  password: 'senha123',
});

console.log('Usuário criado:', data.user?.id);
```

### Teste 3: Buscar Questões

```typescript
const { data } = await supabase.rpc('get_smart_questions', {
  p_user_id: 'uuid-do-usuario',
  p_limite: 5,
});

console.log('Questões:', data);
```

---

## 📚 PRÓXIMOS PASSOS

1. ✅ **Estrutura do projeto** → COMPLETO
2. ✅ **Schema SQL criado** → COMPLETO
3. ✅ **Funções RPC criadas** → COMPLETO
4. 🎯 **Executar SQL no Supabase** → PRÓXIMO
5. ⏳ **Integrar cliente no front-end** → AGUARDANDO
6. ⏳ **Migrar dados** → AGUARDANDO
7. ⏳ **Testar integração** → AGUARDANDO

---

## 🆘 TROUBLESHOOTING

### Erro: "relation does not exist"
- Execute o `schema.sql` novamente
- Verifique se todas as tabelas foram criadas

### Erro: "function does not exist"
- Execute o `functions.sql` novamente
- Verifique os GRANTs de permissão

### Erro: "JWT expired"
- Renove o token de autenticação
- Configure `autoRefreshToken: true` no cliente

### Erro: "Row Level Security"
- Verifique se as políticas RLS estão ativas
- Confirme que o usuário está autenticado

---

## 📞 SUPORTE

- **Documentação Supabase:** https://supabase.com/docs
- **Discord Supabase:** https://discord.supabase.com
- **Logs do projeto:** Dashboard → Logs

---

**Desenvolvido por:** Equipe Gabaritoo  
**Data:** 01/02/2026  
**Versão:** 1.0
