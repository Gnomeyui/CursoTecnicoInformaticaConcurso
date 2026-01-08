# ✅ Checklist de Segurança e Configuração do Supabase

## 📋 Status da Limpeza de Dados

✅ **CONCLUÍDO** - Todos os arquivos de dados foram limpos:

- ✅ `/data/questions.ts` - Array vazio, mantidas apenas interfaces
- ✅ `/data/questionsWithDifficulty.ts` - Array vazio, função de referência mantida
- ✅ `/data/flashcards.ts` - Array vazio, incluído SQL de referência para criação da tabela
- ✅ `/data/regimento-interno.ts` - Array vazio, incluído SQL de referência para criação da tabela

**Resultado**: O aplicativo agora depende 100% do Supabase. Sem dados locais hardcoded.

---

## 🛡️ Checklist de Configuração do Backend

Para garantir que o sistema de salvamento funciona corretamente, execute as verificações abaixo no seu **SQL Editor do Supabase**.

### 1️⃣ Verificar se a Tabela de Progresso Existe

```sql
-- Execute este comando para verificar se a tabela existe:
SELECT EXISTS (
  SELECT FROM information_schema.tables 
  WHERE table_schema = 'public' 
  AND table_name = 'user_question_progress'
);
```

**Resultado esperado**: `true`

Se retornar `false`, crie a tabela com este comando:

```sql
CREATE TABLE IF NOT EXISTS public.user_question_progress (
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    question_id UUID REFERENCES public.questions(id) ON DELETE CASCADE,
    times_viewed INTEGER DEFAULT 0,
    times_correct INTEGER DEFAULT 0,
    times_wrong_total INTEGER DEFAULT 0,
    is_mastered BOOLEAN DEFAULT FALSE,
    is_critical BOOLEAN DEFAULT FALSE,
    last_answered_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    PRIMARY KEY (user_id, question_id)
);

-- Índices para performance
CREATE INDEX IF NOT EXISTS idx_user_progress_user 
  ON public.user_question_progress(user_id);

CREATE INDEX IF NOT EXISTS idx_user_progress_question 
  ON public.user_question_progress(question_id);

CREATE INDEX IF NOT EXISTS idx_user_progress_mastered 
  ON public.user_question_progress(user_id, is_mastered);

CREATE INDEX IF NOT EXISTS idx_user_progress_critical 
  ON public.user_question_progress(user_id, is_critical);
```

---

### 2️⃣ Verificar se as Políticas de Segurança (RLS) estão Ativas

```sql
-- Verificar se RLS está habilitado
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public' 
AND tablename = 'user_question_progress';
```

**Resultado esperado**: `rowsecurity = true`

Se estiver `false`, ative o RLS:

```sql
ALTER TABLE public.user_question_progress ENABLE ROW LEVEL SECURITY;
```

#### Criar Políticas de Acesso

```sql
-- Política: Usuário pode ver apenas seu próprio progresso
CREATE POLICY "Usuário visualiza apenas seu progresso" 
ON public.user_question_progress
FOR SELECT 
USING (auth.uid() = user_id);

-- Política: Usuário pode inserir seu próprio progresso
CREATE POLICY "Usuário insere apenas seu progresso" 
ON public.user_question_progress
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Política: Usuário pode atualizar apenas seu próprio progresso
CREATE POLICY "Usuário atualiza apenas seu progresso" 
ON public.user_question_progress
FOR UPDATE 
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Política: Usuário pode deletar apenas seu próprio progresso
CREATE POLICY "Usuário deleta apenas seu progresso" 
ON public.user_question_progress
FOR DELETE 
USING (auth.uid() = user_id);
```

---

### 3️⃣ Verificar se as Funções RPC Existem

O código frontend chama 3 funções RPC específicas. Verifique se elas existem:

```sql
-- Listar todas as funções RPC criadas
SELECT 
  routine_name,
  routine_type,
  data_type
FROM information_schema.routines
WHERE routine_schema = 'public'
AND routine_name IN (
  'get_smart_questions',
  'update_question_progress',
  'update_user_profile'
)
ORDER BY routine_name;
```

**Resultado esperado**: 3 funções listadas.

Se alguma estiver faltando, execute o script de migração `/supabase/migrations/002_create_rpc_functions.sql`.

---

#### 3.1 Verificar Assinatura da Função `get_smart_questions`

```sql
-- Ver detalhes da função
\df+ public.get_smart_questions
```

**Parâmetros esperados**:
- `p_user_id` (UUID)
- `p_materia` (TEXT) - opcional
- `p_limit` (INTEGER) - padrão 10

**Retorno esperado**: `SETOF questions` (todas as colunas da tabela questions)

---

#### 3.2 Verificar Assinatura da Função `update_question_progress`

```sql
-- Ver detalhes da função
\df+ public.update_question_progress
```

**Parâmetros esperados**:
- `p_user_id` (UUID)
- `p_question_id` (UUID)
- `p_correct` (BOOLEAN)

**Retorno**: `VOID` ou `user_question_progress`

---

#### 3.3 Verificar Assinatura da Função `update_user_profile`

```sql
-- Ver detalhes da função
\df+ public.update_user_profile
```

**Parâmetros esperados**:
- `p_user_id` (UUID)
- `p_xp_gained` (INTEGER)
- `p_level` (INTEGER) - opcional
- `p_badge` (TEXT) - opcional

**Retorno**: `VOID` ou `user_profiles`

---

### 4️⃣ Verificar Tabela de Questões

```sql
-- Verificar se a tabela questions existe e tem dados
SELECT COUNT(*) as total_questoes
FROM public.questions;
```

**Resultado esperado**: Número maior que 0.

Se retornar `0`, você precisa **importar as questões para o banco de dados**.

#### Estrutura Esperada da Tabela `questions`:

```sql
CREATE TABLE IF NOT EXISTS public.questions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    subject TEXT NOT NULL, -- 'Informática', 'Legislação', etc.
    difficulty TEXT CHECK (difficulty IN ('easy', 'medium', 'hard')),
    question TEXT NOT NULL,
    options TEXT[] NOT NULL, -- Array de strings
    correct_answer INTEGER NOT NULL, -- Índice da resposta correta (0-based)
    explanation TEXT,
    banca TEXT,
    ano INTEGER,
    concurso TEXT,
    perfil_concurso_id UUID REFERENCES public.concurso_profiles(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para performance
CREATE INDEX IF NOT EXISTS idx_questions_subject 
  ON public.questions(subject);

CREATE INDEX IF NOT EXISTS idx_questions_difficulty 
  ON public.questions(difficulty);

CREATE INDEX IF NOT EXISTS idx_questions_perfil 
  ON public.questions(perfil_concurso_id);
```

---

### 5️⃣ Verificar Tabela de Perfis de Usuário

```sql
-- Verificar se a tabela user_profiles existe
SELECT EXISTS (
  SELECT FROM information_schema.tables 
  WHERE table_schema = 'public' 
  AND table_name = 'user_profiles'
);
```

**Resultado esperado**: `true`

Se `false`, crie a tabela:

```sql
CREATE TABLE IF NOT EXISTS public.user_profiles (
    user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    xp INTEGER DEFAULT 0,
    level INTEGER DEFAULT 1,
    badges TEXT[] DEFAULT ARRAY[]::TEXT[],
    streak INTEGER DEFAULT 0,
    total_questions_answered INTEGER DEFAULT 0,
    correct_answers INTEGER DEFAULT 0,
    simulated_exams_completed INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;

-- Políticas
CREATE POLICY "Usuário gerencia seu perfil" 
ON public.user_profiles
FOR ALL 
USING (auth.uid() = user_id);

-- Índice
CREATE INDEX IF NOT EXISTS idx_user_profiles_level 
  ON public.user_profiles(level);
```

---

## 🧪 Teste de Integração Frontend-Backend

Após executar todas as verificações acima, teste o fluxo completo:

### Teste 1: Buscar Questões

No console do navegador (F12), execute:

```javascript
const { data, error } = await window.supabase
  .rpc('get_smart_questions', {
    p_user_id: window.supabase.auth.user()?.id,
    p_limit: 5
  });

console.log('Questões:', data);
console.log('Erro:', error);
```

**Resultado esperado**: Array com 5 questões.

---

### Teste 2: Salvar Progresso

```javascript
const { data, error } = await window.supabase
  .rpc('update_question_progress', {
    p_user_id: window.supabase.auth.user()?.id,
    p_question_id: 'UUID_DE_UMA_QUESTAO_EXISTENTE',
    p_correct: true
  });

console.log('Progresso salvo:', data);
console.log('Erro:', error);
```

**Resultado esperado**: `data` ou `null` (sem erro).

---

### Teste 3: Atualizar Perfil (XP)

```javascript
const { data, error } = await window.supabase
  .rpc('update_user_profile', {
    p_user_id: window.supabase.auth.user()?.id,
    p_xp_gained: 10
  });

console.log('Perfil atualizado:', data);
console.log('Erro:', error);
```

**Resultado esperado**: `data` ou `null` (sem erro).

---

## 🚨 Resolução de Problemas Comuns

### Erro: "function not found"

**Causa**: A função RPC não existe no banco de dados.

**Solução**: Execute o script `/supabase/migrations/002_create_rpc_functions.sql`.

---

### Erro: "permission denied for table"

**Causa**: RLS está ativo mas as políticas não estão configuradas.

**Solução**: Execute os comandos da seção 2️⃣ para criar as políticas.

---

### Erro: "new row violates row-level security policy"

**Causa**: Você está tentando inserir dados para outro usuário.

**Solução**: Certifique-se de que `user_id` é sempre igual a `auth.uid()`.

---

### Questões não aparecem no app

**Causa 1**: Tabela `questions` está vazia.

**Solução**: Importe as questões usando um script SQL ou ferramenta de importação CSV.

**Causa 2**: A função `get_smart_questions` não retorna dados.

**Solução**: Verifique se o filtro por `perfil_concurso_id` está correto. Teste sem filtro:

```sql
SELECT * FROM public.questions LIMIT 5;
```

---

## ✅ Status Final

Após executar todas as verificações acima:

- ✅ Tabela de progresso criada
- ✅ RLS habilitado com políticas
- ✅ Funções RPC existentes e funcionais
- ✅ Tabela de questões populada
- ✅ Tabela de perfis criada
- ✅ Testes de integração bem-sucedidos

**Resultado**: O sistema está pronto para uso 100% com Supabase! 🚀

---

## 📚 Próximos Passos

1. **Importar Questões**: Use o script em `/scripts/importar_questoes.md`
2. **Configurar Auth**: Siga `/supabase/README_SETUP.md`
3. **Deploy**: Configure variáveis de ambiente e faça build para produção

---

**Documentação gerada em**: 2025-01-08  
**Versão do Sistema**: Gabaritoo v2.0 (Supabase-First)
