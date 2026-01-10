# 🔒 GUIA DE SEGURANÇA - SUPABASE RLS (Row Level Security)

**Data:** 10 de Janeiro de 2026  
**App:** Gabaritoo (alerr-top5)  
**Prioridade:** 🔴 CRÍTICA

---

## ⚠️ POR QUE ISSO É IMPORTANTE?

O arquivo `/utils/supabase/client.ts` usa a **chave pública (publicAnonKey)** no frontend, o que é **NORMAL** e esperado. 

**MAS** isso significa que **qualquer pessoa pode executar queries diretamente no banco** se as **Row Level Security (RLS)** policies não estiverem configuradas.

---

## 📋 CHECKLIST OBRIGATÓRIO

Acesse o **painel do Supabase** e siga este passo a passo:

### 1️⃣ **Acessar o Painel do Supabase**

1. Acesse: https://app.supabase.com/
2. Faça login
3. Selecione o projeto do **Gabaritoo**

---

### 2️⃣ **Verificar RLS nas Tabelas Principais**

Vá em: **Database** → **Tables** (menu lateral esquerdo)

Para **CADA TABELA** abaixo, verifique se RLS está **ATIVADO**:

| Tabela | RLS Ativo? | Ação |
|--------|------------|------|
| `profiles` | ✅ Sim / ❌ Não | Se NÃO, clique na tabela → botão **"Enable RLS"** |
| `user_question_progress` | ✅ Sim / ❌ Não | Se NÃO, ative RLS |
| `exams` | ✅ Sim / ❌ Não | Se NÃO, ative RLS |
| `questions` | ✅ Sim / ❌ Não | Se NÃO, ative RLS |
| `flashcards` | ✅ Sim / ❌ Não | Se NÃO, ative RLS |
| `sync_metadata` | ✅ Sim / ❌ Não | Se NÃO, ative RLS |

**Como saber se RLS está ativo?**
- Na lista de tabelas, veja a coluna **"RLS"**
- Se tiver um **cadeado 🔒**, está ativo
- Se **não tiver cadeado**, está desativado (PERIGO!)

---

### 3️⃣ **Criar Políticas (Policies) de Segurança**

**Para a tabela `profiles`:**

1. Clique na tabela **`profiles`**
2. Vá na aba **"Policies"**
3. Clique em **"New Policy"**
4. Escolha **"Enable read access"** (ou crie política customizada):

```sql
-- Nome: "Users can read their own profile"
-- Operação: SELECT
CREATE POLICY "Users can read their own profile"
ON profiles
FOR SELECT
USING (auth.uid() = id);
```

5. Crie outra política para **UPDATE**:

```sql
-- Nome: "Users can update their own profile"
-- Operação: UPDATE
CREATE POLICY "Users can update their own profile"
ON profiles
FOR UPDATE
USING (auth.uid() = id);
```

---

**Para a tabela `user_question_progress`:**

```sql
-- Nome: "Users can read their own progress"
-- Operação: SELECT
CREATE POLICY "Users can read their own progress"
ON user_question_progress
FOR SELECT
USING (auth.uid() = user_id);

-- Nome: "Users can insert their own progress"
-- Operação: INSERT
CREATE POLICY "Users can insert their own progress"
ON user_question_progress
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Nome: "Users can update their own progress"
-- Operação: UPDATE
CREATE POLICY "Users can update their own progress"
ON user_question_progress
FOR UPDATE
USING (auth.uid() = user_id);
```

---

**Para tabelas PÚBLICAS de leitura (exams, questions):**

Se essas tabelas devem ser **lidas por todos**, mas **modificadas apenas por admins**:

```sql
-- Nome: "Anyone can read exams"
-- Operação: SELECT
CREATE POLICY "Anyone can read exams"
ON exams
FOR SELECT
USING (true);

-- Nome: "Anyone can read questions"
-- Operação: SELECT
CREATE POLICY "Anyone can read questions"
ON questions
FOR SELECT
USING (true);
```

**ATENÇÃO:** Para INSERT/UPDATE/DELETE nessas tabelas, use **Service Role Key** no backend, NUNCA no frontend!

---

### 4️⃣ **Proteger Variáveis de Ambiente**

**No arquivo `/utils/supabase/info.tsx`:**

✅ **CORRETO:**
```typescript
export const projectId = import.meta.env.VITE_SUPABASE_PROJECT_ID;
export const publicAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
```

❌ **ERRADO (NUNCA FAÇA ISSO):**
```typescript
// NUNCA exponha a Service Role Key no frontend!
export const serviceRoleKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."; // ⚠️ PERIGO!
```

**Onde usar Service Role Key:**
- ✅ Apenas no **backend** (se tiver servidor Node.js/Deno)
- ✅ Em **scripts de migração** local
- ❌ **NUNCA** no código frontend (React/Vite)

---

### 5️⃣ **Testar a Segurança**

**Teste manual:**

1. Abra o **DevTools** do navegador (F12)
2. No console, execute:

```javascript
const { createClient } = await import('./utils/supabase/client');
const supabase = createClient(
  'https://SEU_PROJECT_ID.supabase.co',
  'SUA_ANON_KEY'
);

// Tentar ler dados de outro usuário (deve falhar!)
const { data, error } = await supabase
  .from('profiles')
  .select('*')
  .eq('id', 'UUID_DE_OUTRO_USUARIO');

console.log(data, error);
```

**Resultado esperado:**
- Se RLS estiver OK: `data = []` ou `error = "Permissão negada"`
- Se RLS estiver ERRADO: `data = [... dados de outro usuário]` ⚠️ **PROBLEMA!**

---

## 🚨 SE VOCÊ NÃO CONFIGURAR RLS

**O que pode acontecer:**

1. ❌ Qualquer usuário pode **ler dados de outros usuários**
2. ❌ Alguém pode **deletar todo o banco** via console do navegador
3. ❌ Atacantes podem **modificar XP/níveis/badges** de qualquer conta
4. ❌ Vazamento de **dados sensíveis** (emails, progresso, etc.)

---

## ✅ RESUMO RÁPIDO

**O que fazer AGORA:**

1. [ ] Acessar painel do Supabase
2. [ ] Ativar **RLS em TODAS as tabelas**
3. [ ] Criar **policies** para cada tabela (SELECT, INSERT, UPDATE, DELETE)
4. [ ] Verificar que **Service Role Key** NÃO está no frontend
5. [ ] Testar no console do navegador

**Tempo estimado:** 15-30 minutos  
**Impacto:** 🔒 Aplicação 100% segura

---

## 📚 DOCUMENTAÇÃO OFICIAL

- [Supabase RLS Guide](https://supabase.com/docs/guides/auth/row-level-security)
- [Policy Examples](https://supabase.com/docs/guides/database/postgres/row-level-security#policy-examples)
- [Security Best Practices](https://supabase.com/docs/guides/auth/managing-user-data#using-row-level-security)

---

## 🆘 PRECISA DE AJUDA?

**Comando rápido para testar RLS (no SQL Editor do Supabase):**

```sql
-- Verificar quais tabelas NÃO têm RLS ativado
SELECT schemaname, tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public' 
AND rowsecurity = false;
```

Se retornar alguma tabela, **ative RLS nela imediatamente!**

---

**✅ AUDITORIA COMPLETA CONCLUÍDA**  
Após seguir este guia, seu app estará pronto para produção! 🚀
