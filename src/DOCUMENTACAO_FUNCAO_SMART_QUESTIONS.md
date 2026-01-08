# 📚 Documentação Técnica: `get_smart_questions`

## 🎯 **VISÃO GERAL**

Função RPC (Remote Procedure Call) do PostgreSQL que implementa o algoritmo inteligente de seleção de questões do Gabaritoo.

---

## 🔧 **ASSINATURA DA FUNÇÃO**

```sql
get_smart_questions(
  p_user_id UUID,              -- ID do usuário
  p_archetype_id UUID DEFAULT NULL,  -- ID do perfil de concurso (opcional)
  p_limit INTEGER DEFAULT 10   -- Quantidade de questões a retornar
)
```

### **Retorna:**
```typescript
interface SmartQuestion {
  id: UUID;
  texto: string;
  opcoes: JSONB;
  resposta_correta: string;
  comentario: string;
  materia: string;
  dificuldade: string;
  concurso_perfil_id: UUID;
}
```

---

## 🧠 **ALGORITMO INTELIGENTE**

### **Distribuição 70/30:**

| Tipo | Percentual | Objetivo |
|------|-----------|----------|
| **Questões Novas** | 70% | Expandir conhecimento |
| **Questões Erradas** | 30% | Reforçar pontos fracos |

### **Lógica Detalhada:**

#### 1️⃣ **QUESTÕES NOVAS (70%)**

```sql
-- Critérios:
✅ Nunca foram respondidas pelo usuário
✅ Pertencem ao perfil de concurso selecionado (se filtrado)
✅ Ordem aleatória (RANDOM())
```

**Exemplo:**
- Se `p_limit = 10` → 7 questões novas
- Se `p_limit = 20` → 14 questões novas

#### 2️⃣ **QUESTÕES ERRADAS (30%)**

```sql
-- Critérios:
✅ Já foram respondidas pelo usuário
✅ Erros > Acertos (times_wrong_total > times_correct)
✅ NÃO estão masterizadas (is_mastered = FALSE)
✅ Prioriza mais erros e mais recentes
```

**Exemplo:**
- Se `p_limit = 10` → 3 questões erradas
- Se `p_limit = 20` → 6 questões erradas

#### 3️⃣ **FALLBACK AUTOMÁTICO**

Se não houver questões erradas suficientes:
- O sistema **complementa automaticamente** com mais questões novas
- Garante sempre retornar `p_limit` questões (se disponíveis)

---

## 📊 **EXEMPLOS DE USO**

### **Exemplo 1: Quiz Geral (sem filtro)**
```typescript
const { data, error } = await supabase.rpc('get_smart_questions', {
  p_user_id: '123e4567-e89b-12d3-a456-426614174000',
  p_archetype_id: null,  // Todas as matérias
  p_limit: 10
});
// Retorna: 7 novas + 3 erradas = 10 questões
```

### **Exemplo 2: Quiz Focado (ALE-RR Técnico)**
```typescript
const { data, error } = await supabase.rpc('get_smart_questions', {
  p_user_id: '123e4567-e89b-12d3-a456-426614174000',
  p_archetype_id: 'aabbccdd-1234-5678-90ab-cdef12345678',  // ID do perfil ALE-RR
  p_limit: 20
});
// Retorna: 14 novas + 6 erradas = 20 questões (só do perfil ALE-RR)
```

### **Exemplo 3: Modo Simulado**
```typescript
const { data, error } = await supabase.rpc('get_smart_questions', {
  p_user_id: userId,
  p_archetype_id: activeProfile.id,
  p_limit: 50  // Simulado completo
});
// Retorna: 35 novas + 15 erradas = 50 questões
```

---

## 🔍 **CASOS ESPECIAIS**

### **Caso 1: Usuário Iniciante**
- **Situação:** Nenhuma questão respondida ainda
- **Comportamento:** Retorna 100% questões novas (aleatórias)
- **Exemplo:** 10/10 questões novas

### **Caso 2: Usuário Avançado**
- **Situação:** Já respondeu muitas questões, poucas erradas disponíveis
- **Comportamento:** Complementa com novas até atingir o limite
- **Exemplo:** 8 novas + 2 erradas (se só tiver 2 erradas disponíveis)

### **Caso 3: Banco de Questões Pequeno**
- **Situação:** Menos questões disponíveis que o solicitado
- **Comportamento:** Retorna todas as disponíveis (pode ser < p_limit)
- **Exemplo:** Solicitou 50, mas só existem 30 → retorna 30

### **Caso 4: Todas as Questões Masterizadas**
- **Situação:** Usuário acertou >4 vezes todas as questões
- **Comportamento:** Retorna apenas questões novas (se houver)
- **Nota:** Questões masterizadas **nunca** aparecem novamente

---

## 🎯 **PRIORIZAÇÃO DE QUESTÕES ERRADAS**

As questões erradas são ordenadas por:

1. **Quantidade de erros** (DESC) - Mais erros primeiro
2. **Data mais recente** (DESC) - Erros recentes têm prioridade

```sql
ORDER BY uqp.times_wrong_total DESC, uqp.last_answered_at DESC
```

**Por quê?**
- Questões com muitos erros precisam de mais revisão
- Erros recentes indicam dificuldade atual do usuário

---

## 🔒 **SEGURANÇA E PERMISSÕES**

```sql
-- Usuários autenticados
GRANT EXECUTE ON FUNCTION get_smart_questions(UUID, UUID, INTEGER) TO authenticated;

-- Modo guest (usuários não logados)
GRANT EXECUTE ON FUNCTION get_smart_questions(UUID, UUID, INTEGER) TO anon;
```

**Importante:**
- A função respeita o RLS (Row Level Security) das tabelas
- Cada usuário vê apenas seu próprio progresso
- Questões são públicas, mas o progresso é privado

---

## 📈 **PERFORMANCE**

### **Otimizações:**
1. **Índices sugeridos:**
   ```sql
   CREATE INDEX idx_progress_user_question ON user_question_progress(user_id, question_id);
   CREATE INDEX idx_progress_mastered ON user_question_progress(is_mastered) WHERE is_mastered = FALSE;
   CREATE INDEX idx_questions_profile ON questions(concurso_perfil_id);
   ```

2. **Uso de EXISTS** (mais rápido que LEFT JOIN para check de existência)

3. **RANDOM() com LIMIT** (evita carregar todas as questões na memória)

### **Tempo de Execução Esperado:**
- Banco com 1.000 questões: **< 100ms**
- Banco com 10.000 questões: **< 300ms**
- Banco com 100.000 questões: **< 1s** (com índices)

---

## 🧪 **TESTES**

### **Teste 1: Funcionamento Básico**
```sql
SELECT * FROM get_smart_questions(
  'YOUR-USER-UUID'::UUID,
  NULL,
  10
);
-- Deve retornar 10 questões
```

### **Teste 2: Verificar Distribuição**
```sql
WITH resultado AS (
  SELECT * FROM get_smart_questions('USER-UUID'::UUID, NULL, 100)
)
SELECT 
  COUNT(*) FILTER (WHERE id NOT IN (
    SELECT question_id FROM user_question_progress WHERE user_id = 'USER-UUID'
  )) AS novas,
  COUNT(*) FILTER (WHERE id IN (
    SELECT question_id FROM user_question_progress WHERE user_id = 'USER-UUID'
  )) AS revisao
FROM resultado;
-- Deve mostrar aproximadamente 70% novas e 30% revisão
```

### **Teste 3: Filtro por Perfil**
```sql
SELECT concurso_perfil_id, COUNT(*) 
FROM get_smart_questions('USER-UUID'::UUID, 'PROFILE-UUID'::UUID, 50)
GROUP BY concurso_perfil_id;
-- Deve retornar APENAS questões do perfil especificado
```

---

## 🐛 **TROUBLESHOOTING**

### **Erro: "function does not exist"**
**Solução:** Execute o arquivo `/supabase/migrations/002_create_rpc_functions.sql`

### **Retorna 0 questões**
**Possíveis causas:**
1. Tabela `questions` está vazia → Importe questões
2. Filtro `p_archetype_id` muito restritivo → Use `NULL` para teste
3. Todas as questões foram masterizadas → Adicione novas questões

### **Retorna menos que p_limit**
**Comportamento normal quando:**
- Banco tem menos questões que o solicitado
- Poucas questões erradas disponíveis (complementa com novas)

---

## 🔗 **INTEGRAÇÃO COM O REACT**

### **Hook useSmartQuiz.tsx**
```typescript
const { data, error } = await supabase.rpc('get_smart_questions', {
  p_user_id: userId,
  p_archetype_id: archetypeId,
  p_limit: 10
});
```

### **Componente SmartQuizSession.tsx**
```typescript
// Carrega questões automaticamente ao iniciar
useEffect(() => {
  loadQuestions();
}, [activeProfile]);
```

### **Componente SimulatedExam.tsx**
```typescript
// Modo simulado usa limite maior
const { data } = await supabase.rpc('get_smart_questions', {
  p_user_id: userId,
  p_archetype_id: archetypeId,
  p_limit: examSettings.questionsCount  // Ex: 50 questões
});
```

---

## 📝 **CHANGELOG**

### **v1.0 - 2026-01-08**
- ✅ Criação da função `get_smart_questions`
- ✅ Implementação do algoritmo 70/30
- ✅ Filtro por perfil de concurso
- ✅ Exclusão de questões masterizadas
- ✅ Priorização de questões com mais erros
- ✅ Fallback automático para questões novas

---

## 🎓 **REFERÊNCIAS**

- [Algoritmo de Revisão Espaçada](https://en.wikipedia.org/wiki/Spaced_repetition)
- [PostgreSQL PL/pgSQL Functions](https://www.postgresql.org/docs/current/plpgsql.html)
- [Supabase RPC Documentation](https://supabase.com/docs/guides/database/functions)

---

**🚀 Esta função é o coração do sistema inteligente do Gabaritoo!**
