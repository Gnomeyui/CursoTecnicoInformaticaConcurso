# 🚀 Configuração do Banco de Dados Supabase - Gabaritoo

## 📋 Checklist de Configuração

### ✅ **Passo 1: Criar Tabelas Principais**

Execute o arquivo `/supabase/migrations/001_initial_schema.sql` no **SQL Editor** do Supabase.

Este arquivo cria:
- ✅ `questions` - Banco de questões
- ✅ `question_options` - Opções de cada questão
- ✅ `subjects` - Matérias (Informática, Português, etc)
- ✅ `archetypes` - Perfis de concurso (Técnico em TI, Analista, etc)
- ✅ `archetype_subjects` - Relacionamento entre perfis e matérias
- ✅ `user_question_progress` - Progresso individual de cada questão
- ✅ `profiles` - Perfil de cada usuário (XP, nível, estatísticas)

---

### ✅ **Passo 2: Criar Funções RPC (Stored Procedures)**

Execute o arquivo `/supabase/migrations/002_create_rpc_functions.sql` no **SQL Editor** do Supabase.

Este arquivo cria as funções:

#### **1. `get_smart_questions`** (já criada anteriormente)
```sql
-- Retorna questões inteligentes baseadas em:
-- - Perfil do concurso (arquétipo)
-- - Progresso do usuário
-- - Sistema de repetição espaçada
-- - 30% questões erradas + 70% novas
```

#### **2. `update_question_progress`** ⭐ NOVA
```sql
-- Atualiza progresso de cada questão
-- Aplica regras:
--   ✅ 4+ acertos → is_mastered = true
--   ❌ 6+ erros → is_critical = true
```

#### **3. `update_user_profile`** ⭐ NOVA
```sql
-- Atualiza XP e estatísticas do usuário
-- Incrementa questões respondidas
-- Atualiza último acesso
```

#### **4. `get_user_stats`** ⭐ BÔNUS
```sql
-- Retorna estatísticas completas:
-- - Total de questões respondidas
-- - Acertos/Erros
-- - Questões masterizadas
-- - Questões críticas (UTI)
-- - Acurácia %
```

---

### ✅ **Passo 3: Configurar Políticas de Segurança (RLS)**

**Se você ativou Row Level Security (RLS)**, execute:

```sql
-- Permitir leitura pública das questões
CREATE POLICY "Questões são públicas"
ON questions FOR SELECT
USING (true);

-- Permitir leitura pública das opções
CREATE POLICY "Opções são públicas"
ON question_options FOR SELECT
USING (true);

-- Permitir leitura pública das matérias
CREATE POLICY "Matérias são públicas"
ON subjects FOR SELECT
USING (true);

-- Permitir leitura pública dos arquétipos
CREATE POLICY "Arquétipos são públicos"
ON archetypes FOR SELECT
USING (true);

-- Permitir que usuários vejam/editem apenas seu próprio progresso
CREATE POLICY "Usuários veem seu próprio progresso"
ON user_question_progress FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Usuários editam seu próprio progresso"
ON user_question_progress FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Usuários atualizam seu próprio progresso"
ON user_question_progress FOR UPDATE
USING (auth.uid() = user_id);

-- Permitir que usuários vejam/editem apenas seu próprio perfil
CREATE POLICY "Usuários veem seu próprio perfil"
ON profiles FOR SELECT
USING (auth.uid() = id);

CREATE POLICY "Usuários editam seu próprio perfil"
ON profiles FOR INSERT
WITH CHECK (auth.uid() = id);

CREATE POLICY "Usuários atualizam seu próprio perfil"
ON profiles FOR UPDATE
USING (auth.uid() = id);
```

---

### ✅ **Passo 4: Inserir Dados de Exemplo (Opcional)**

Para testar rapidamente, execute:

```sql
-- Inserir Arquétipos (Perfis de Concurso)
INSERT INTO archetypes (name, description) VALUES
('Técnico em Informática', 'Foco em TI, Redes, Programação'),
('Analista Administrativo', 'Foco em Administração, Direito Administrativo'),
('Professor', 'Foco em Pedagogia, Didática');

-- Inserir Matérias
INSERT INTO subjects (name) VALUES
('Informática'),
('Português'),
('Raciocínio Lógico'),
('Direito Administrativo');

-- Relacionar Arquétipo "Técnico TI" com suas matérias
INSERT INTO archetype_subjects (archetype_id, subject_id) 
SELECT 
  (SELECT id FROM archetypes WHERE name = 'Técnico em Informática'),
  id
FROM subjects
WHERE name IN ('Informática', 'Português', 'Raciocínio Lógico');

-- Inserir algumas questões de exemplo
INSERT INTO questions (text, subject_id, difficulty_level, year, banca, exam_name) VALUES
(
  'Qual protocolo é utilizado para transferência de arquivos na web?',
  (SELECT id FROM subjects WHERE name = 'Informática'),
  'facil',
  '2023',
  'CESPE',
  'ALE-RR Técnico em Informática'
);

-- Inserir opções para a questão acima
INSERT INTO question_options (question_id, id, text, is_correct) VALUES
(
  (SELECT id FROM questions WHERE text LIKE 'Qual protocolo%' LIMIT 1),
  'A',
  'FTP',
  false
),
(
  (SELECT id FROM questions WHERE text LIKE 'Qual protocolo%' LIMIT 1),
  'B',
  'HTTP',
  true
),
(
  (SELECT id FROM questions WHERE text LIKE 'Qual protocolo%' LIMIT 1),
  'C',
  'SMTP',
  false
),
(
  (SELECT id FROM questions WHERE text LIKE 'Qual protocolo%' LIMIT 1),
  'D',
  'DNS',
  false
);
```

---

## 🎯 Como o Sistema Funciona

### **Fluxo de Uma Sessão de Quiz:**

```
1. USUÁRIO INICIA QUIZ
   ↓
2. React chama: supabase.rpc('get_smart_questions', {...})
   ↓
3. Supabase retorna 10 questões inteligentes
   ↓
4. USUÁRIO RESPONDE QUESTÃO
   ↓
5. React chama: supabase.rpc('update_question_progress', {...})
   → Salva: times_viewed++, times_correct++ ou times_wrong++
   → Aplica regras: is_mastered ou is_critical
   ↓
6. React chama: supabase.rpc('update_user_profile', {...})
   → Salva: XP++, questoes_respondidas++
   ↓
7. REPETE até finalizar
```

---

## 🔥 Regras de Ouro Aplicadas Automaticamente

| Condição | Campo Atualizado | Efeito |
|----------|------------------|--------|
| **Acertou 4+ vezes** | `is_mastered = true` | Nunca mais aparece no quiz |
| **Errou 6+ vezes** | `is_critical = true` | Vai para "UTI de Questões" (revisão prioritária) |
| **Cada acerto** | `times_correct++` | Contabiliza domínio |
| **Cada erro** | `times_wrong_total++` | Marca para revisão |

---

## 🧪 Como Testar

### **1. Testar Função de Questões Inteligentes:**

```sql
-- Substitua os UUIDs pelos seus valores reais
SELECT * FROM get_smart_questions(
  'USUARIO-UUID'::UUID,
  1,  -- ID do arquétipo (Técnico TI)
  10  -- Limite de questões
);
```

### **2. Testar Atualização de Progresso:**

```sql
SELECT update_question_progress(
  'USUARIO-UUID'::UUID,
  'QUESTAO-UUID'::UUID,
  TRUE  -- Acertou
);

-- Verificar se foi salvo
SELECT * FROM user_question_progress WHERE user_id = 'USUARIO-UUID'::UUID;
```

### **3. Testar Estatísticas do Usuário:**

```sql
SELECT * FROM get_user_stats('USUARIO-UUID'::UUID);
```

---

## 📱 Configuração no App React

### **1. Verificar arquivo `/utils/supabase/info.tsx`**

Deve conter:
```typescript
export const projectId = 'SEU-PROJECT-ID';
export const publicAnonKey = 'SUA-ANON-KEY';
```

### **2. Obter ID do usuário**

Por enquanto, o app usa um ID de guest:
```typescript
const userId = localStorage.getItem('user_id') || 'guest-user';
```

**Para produção**, integre com Supabase Auth:
```typescript
const { data: { user } } = await supabase.auth.getUser();
const userId = user?.id;
```

---

## 🎉 Pronto!

Após executar todos os passos, o Gabaritoo terá:

- ✅ Banco de dados completo
- ✅ Funções RPC funcionando
- ✅ Sistema de progresso inteligente
- ✅ Regras de masterização/criticidade aplicadas automaticamente
- ✅ XP e estatísticas sincronizadas

---

## 🆘 Problemas Comuns

### **Erro: "permission denied for function get_smart_questions"**
**Solução:** Execute os comandos `GRANT EXECUTE` no final do arquivo `002_create_rpc_functions.sql`

### **Erro: "relation user_question_progress does not exist"**
**Solução:** Execute o arquivo `001_initial_schema.sql` primeiro

### **Erro: "function get_smart_questions does not exist"**
**Solução:** Você precisa criar esta função também (deve estar em outro arquivo de migration)

---

## 📚 Próximos Passos

1. ✅ Configurar autenticação real (Supabase Auth)
2. ✅ Adicionar mais questões no banco
3. ✅ Implementar sistema de níveis automático
4. ✅ Criar dashboard de estatísticas avançadas
5. ✅ Adicionar badges e conquistas

---

**Desenvolvido para o Gabaritoo** 🚀📚
Sistema Inteligente de Estudos para Concursos Públicos
