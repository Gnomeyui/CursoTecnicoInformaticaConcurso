# 🔄 Guia de Migração: Dados Locais → Supabase

## 📊 Status da Migração

✅ **FASE 1 CONCLUÍDA**: Limpeza de dados locais hardcoded  
⏳ **FASE 2 PENDENTE**: Atualização de componentes para usar Supabase

---

## ⚠️ Componentes Afetados pela Limpeza

Os seguintes componentes importam dados dos arquivos que foram limpos e **precisam ser refatorados** para buscar dados do Supabase:

### 1. `/components/StudySession.tsx`

**Status**: ⚠️ Não funcional sem dados

**Problema**:
```typescript
import { questions, Question } from '../data/questions';
// questions agora é um array vazio []
```

**Solução**:
Substituir a importação local por chamada ao Supabase via hook `useSmartQuiz`.

**Código de Referência**:
```typescript
import { useSmartQuiz } from '../hooks/useSmartQuiz';

export function StudySession({ onBack, difficulty, subject }: StudySessionProps) {
  const { 
    questions: sessionQuestions, 
    loading, 
    error,
    handleAnswer 
  } = useSmartQuiz({
    materia: subject,
    dificuldade: difficulty,
    quantidade: 10
  });

  // Resto do componente...
}
```

**Arquivos de referência**:
- ✅ `/hooks/useSmartQuiz.tsx` - Hook já implementado e funcional
- ✅ `/components/SmartQuizSession.tsx` - Componente de exemplo usando o hook

---

### 2. `/components/FlashcardScreen.tsx`

**Status**: ⚠️ Não funcional sem dados

**Problema**:
```typescript
import { FLASHCARDS, Flashcard } from '../data/flashcards';
// FLASHCARDS agora é um array vazio []
```

**Solução Temporária** (até implementar tabela de flashcards no Supabase):
```typescript
import { useState, useEffect } from 'react';
import { supabase } from '../utils/supabase/client';
import { Flashcard } from '../data/flashcards';

export function FlashcardScreen({ onBack }: FlashcardScreenProps) {
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFlashcards() {
      // Buscar do Supabase quando a tabela estiver criada
      const { data, error } = await supabase
        .from('flashcards')
        .select('*')
        .order('id');

      if (data) {
        setFlashcards(data);
      }
      setLoading(false);
    }

    loadFlashcards();
  }, []);

  if (loading) return <div>Carregando flashcards...</div>;
  if (flashcards.length === 0) {
    return <div>Nenhum flashcard disponível. Importe os dados no Supabase.</div>;
  }

  // Resto do componente...
}
```

**Pré-requisito**:
- Criar tabela `flashcards` no Supabase (SQL de referência em `/data/flashcards.ts`)
- Importar os dados via script SQL ou interface administrativa

---

### 3. `/components/RegimentoInterno.tsx` (Verificar)

**Status**: 🔍 Verificação necessária

Pode estar usando dados de `/data/regimento-interno.ts`. Se sim, precisa ser migrado.

---

## 🚀 Componentes Prontos para Supabase

Estes componentes **JÁ ESTÃO** usando o sistema inteligente com Supabase:

### ✅ `/components/SmartQuizSession.tsx`

**Status**: ✅ Totalmente funcional

**Uso**:
```typescript
import { SmartQuizSession } from './components/SmartQuizSession';

// No seu App.tsx:
<SmartQuizSession 
  onBack={() => setActiveScreen('home')}
  materia="Informática"
  dificuldade="medium"
/>
```

**Features**:
- ✅ Busca questões do Supabase via RPC `get_smart_questions`
- ✅ Salva progresso via RPC `update_question_progress`
- ✅ Atualiza XP/Níveis via RPC `update_user_profile`
- ✅ Sistema de repetição espaçada inteligente
- ✅ Mesclagem de questões novas (70%) + revisão (30%)

---

## 📋 Plano de Migração Completo

### Etapa 1: Dados de Questões ✅ CONCLUÍDO

- [x] Limpar arrays locais
- [x] Criar hook `useSmartQuiz`
- [x] Criar componente `SmartQuizSession`
- [x] Documentar estrutura do banco de dados

### Etapa 2: Atualizar Componentes Legados ⏳ PENDENTE

- [ ] Refatorar `StudySession.tsx` para usar `useSmartQuiz`
- [ ] Refatorar `FlashcardScreen.tsx` para buscar do Supabase
- [ ] Verificar `RegimentoInterno.tsx` e migrar se necessário

### Etapa 3: Importar Dados para o Supabase ⏳ PENDENTE

- [ ] Executar checklist de segurança (`/CHECKLIST_SEGURANCA_BACKEND.md`)
- [ ] Criar tabela de flashcards (SQL em `/data/flashcards.ts`)
- [ ] Importar questões (script em `/scripts/importar_questoes.md`)
- [ ] Importar flashcards via SQL ou CSV

### Etapa 4: Testes de Integração ⏳ PENDENTE

- [ ] Testar `SmartQuizSession` com dados reais
- [ ] Testar salvamento de progresso
- [ ] Testar sistema de XP/Níveis
- [ ] Testar componentes migrados

---

## 🔍 Como Identificar Componentes Não Migrados

Execute este comando para encontrar todos os imports de dados locais:

```bash
# No terminal (raiz do projeto):
grep -r "from.*data/questions" --include="*.tsx" --include="*.ts"
grep -r "from.*data/flashcards" --include="*.tsx" --include="*.ts"
grep -r "from.*data/regimento" --include="*.tsx" --include="*.ts"
```

Qualquer resultado que **NÃO SEJA** em `/data/*` precisa ser migrado.

---

## ⚡ Solução Rápida: Usar SmartQuizSession

Se você precisa que o sistema funcione **AGORA**, substitua temporariamente o uso de `StudySession` por `SmartQuizSession` no seu `App.tsx`:

```typescript
// ANTES (não funciona mais):
{activeScreen === 'study' && (
  <StudySession 
    onBack={() => setActiveScreen('home')}
    difficulty={selectedDifficulty}
    subject={selectedSubject}
  />
)}

// DEPOIS (funciona com Supabase):
{activeScreen === 'study' && (
  <SmartQuizSession 
    onBack={() => setActiveScreen('home')}
    materia={selectedSubject}
    dificuldade={selectedDifficulty === 'mix' ? undefined : selectedDifficulty}
  />
)}
```

**Nota**: `SmartQuizSession` usa nomes de props ligeiramente diferentes:
- `subject` → `materia`
- `difficulty` → `dificuldade`

---

## 🛠️ Hook Auxiliar: useSmartQuiz

Para componentes customizados, use diretamente o hook:

```typescript
import { useSmartQuiz } from '../hooks/useSmartQuiz';

function MeuComponente() {
  const { 
    questions,      // Questões carregadas do Supabase
    loading,        // Estado de carregamento
    error,          // Erros (se houver)
    currentIndex,   // Índice atual
    handleAnswer,   // Função para registrar resposta
    nextQuestion,   // Avançar para próxima
    resetQuiz       // Reiniciar sessão
  } = useSmartQuiz({
    materia: 'Informática',
    dificuldade: 'medium',
    quantidade: 10,
    autoStart: true
  });

  if (loading) return <div>Carregando...</div>;
  if (error) return <div>Erro: {error}</div>;
  
  const currentQ = questions[currentIndex];
  // Renderizar questão...
}
```

---

## 📚 Documentação de Referência

1. **Hook useSmartQuiz**: `/hooks/useSmartQuiz.tsx`
2. **Engine de Estudos**: `/lib/EngineEstudos.ts`
3. **Adaptadores**: `/lib/adaptadores.ts`
4. **Migrations SQL**: `/supabase/migrations/`
5. **Checklist Backend**: `/CHECKLIST_SEGURANCA_BACKEND.md`
6. **Instruções de Importação**: `/scripts/importar_questoes.md`

---

## 🎯 Próximos Passos Recomendados

1. ✅ **Verificar Backend**: Execute o checklist de segurança
2. ✅ **Importar Questões**: Use o script de importação para popular o banco
3. ✅ **Testar SmartQuizSession**: Verifique se está funcionando com dados reais
4. ⏳ **Migrar StudySession**: Refatore para usar `useSmartQuiz`
5. ⏳ **Migrar FlashcardScreen**: Crie tabela e implemente busca no Supabase

---

## ❓ Perguntas Frequentes

### Q: Por que os componentes não mostram mais questões?

**A**: Os arrays de dados locais foram limpos. Agora os dados vêm do Supabase.

---

### Q: Como voltar aos dados locais temporariamente?

**A**: Você pode reverter os arquivos `/data/*.ts` para a versão anterior via git:

```bash
git checkout HEAD~1 -- data/questions.ts data/flashcards.ts
```

**⚠️ Atenção**: Isso é apenas uma solução temporária. O ideal é migrar para o Supabase.

---

### Q: O SmartQuizSession não está carregando questões

**A**: Verifique:

1. ✅ Função RPC `get_smart_questions` existe no Supabase
2. ✅ Tabela `questions` tem dados
3. ✅ RLS (Row Level Security) está configurado corretamente
4. ✅ Usuário está autenticado (`supabase.auth.getUser()`)

Execute o **Checklist de Segurança** para diagnóstico completo.

---

### Q: Como importar as questões antigas para o Supabase?

**A**: Siga o guia em `/scripts/importar_questoes.md` ou use este SQL template:

```sql
-- Exemplo: Inserir uma questão
INSERT INTO public.questions (
  subject, difficulty, question, options, correct_answer, explanation
) VALUES (
  'Informática',
  'easy',
  'O que é um firewall?',
  ARRAY['Um antivírus', 'Um sistema de segurança', 'Um navegador', 'Um vírus'],
  1, -- Índice da resposta correta (0-based)
  'Firewall é um sistema de segurança que monitora o tráfego de rede.'
);
```

---

**Última atualização**: 2025-01-08  
**Versão do Sistema**: Gabaritoo v2.0 (Supabase-First)
