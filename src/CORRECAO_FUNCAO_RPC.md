# 🔧 CORREÇÃO: Função RPC get_smart_questions não encontrada

## 🐛 **ERRO:**

```
{
  "code": "PGRST202",
  "message": "Could not find the function public.get_smart_questions(p_archetype_id, p_limit, p_user_id) in the schema cache"
}
```

---

## 🎯 **CAUSA:**

A função `get_smart_questions` ainda não foi criada no banco de dados Supabase.

Ela existe no arquivo de migração `/supabase/migrations/001_create_quiz_schema.sql`, mas **precisa ser executada manualmente** no Supabase SQL Editor.

---

## ✅ **SOLUÇÃO (Passo a Passo):**

### **1. Abrir o Supabase Dashboard**

1. Acesse: https://supabase.com/dashboard
2. Selecione seu projeto **Gabaritoo**
3. No menu lateral esquerdo, clique em **SQL Editor**

---

### **2. Executar o SQL da Função**

Cole o seguinte SQL no editor e clique em **RUN**:

```sql
-- =====================================================
-- 🧠 FUNÇÃO: get_smart_questions
-- =====================================================
-- Retorna questões inteligentes baseadas nos pesos
-- do arquétipo (perfil de concurso escolhido)
-- =====================================================

CREATE OR REPLACE FUNCTION get_smart_questions(
    p_user_id UUID,
    p_archetype_id INTEGER,
    p_limit INTEGER DEFAULT 10
)
RETURNS TABLE (
    id UUID,
    text TEXT,
    options JSONB,
    correct_option_id TEXT,
    subject_id UUID,
    difficulty_level VARCHAR
) AS $$
DECLARE
    v_subjects_weights JSONB;
    v_subject JSONB;
    v_subject_name TEXT;
    v_weight INTEGER;
    v_questions_needed INTEGER;
    v_total_weight INTEGER;
BEGIN
    -- Buscar os pesos do arquétipo
    SELECT subjects_weights INTO v_subjects_weights
    FROM public.archetypes
    WHERE public.archetypes.id = p_archetype_id;
    
    -- Calcular peso total
    SELECT SUM((value->>'weight')::INTEGER) INTO v_total_weight
    FROM jsonb_array_elements(v_subjects_weights);
    
    -- Para cada matéria, buscar questões proporcionalmente
    FOR v_subject IN SELECT * FROM jsonb_array_elements(v_subjects_weights)
    LOOP
        v_subject_name := v_subject->>'subject';
        v_weight := (v_subject->>'weight')::INTEGER;
        
        -- Calcular quantas questões dessa matéria
        v_questions_needed := ROUND((v_weight::DECIMAL / v_total_weight) * p_limit);
        
        -- Buscar questões dessa matéria que ainda não foram masterizadas
        RETURN QUERY
        SELECT 
            q.id,
            q.text,
            q.options,
            q.correct_option_id,
            q.subject_id,
            q.difficulty_level
        FROM public.questions q
        INNER JOIN public.subjects s ON q.subject_id = s.id
        LEFT JOIN public.user_question_progress uqp 
            ON uqp.question_id = q.id AND uqp.user_id = p_user_id
        WHERE s.name = v_subject_name
            AND (uqp.is_mastered IS NULL OR uqp.is_mastered = FALSE)
            AND (uqp.is_critical IS NULL OR uqp.is_critical = FALSE)
            AND (uqp.times_viewed IS NULL OR uqp.times_viewed < 10)
        ORDER BY RANDOM()
        LIMIT v_questions_needed;
    END LOOP;
END;
$$ LANGUAGE plpgsql;

-- =====================================================
-- ✅ CONCEDER PERMISSÕES
-- =====================================================
-- Permite que usuários autenticados executem a função

GRANT EXECUTE ON FUNCTION get_smart_questions(UUID, INTEGER, INTEGER) TO authenticated;
GRANT EXECUTE ON FUNCTION get_smart_questions(UUID, INTEGER, INTEGER) TO anon;

-- =====================================================
-- 📝 DOCUMENTAÇÃO
-- =====================================================

COMMENT ON FUNCTION get_smart_questions IS 
'Retorna questões inteligentes baseadas nos pesos do arquétipo.
Exclui questões masterizadas e críticas, limitando visualizações a 10.
Distribui questões proporcionalmente aos pesos das matérias.';
```

---

### **3. Verificar se Funcionou**

Após executar, você deve ver:

```
✅ Success. No rows returned
```

Isso significa que a função foi criada com sucesso!

---

### **4. Testar a Função (Opcional)**

Para confirmar que está funcionando, execute este teste:

```sql
-- Substitua pelos seus valores reais
SELECT * FROM get_smart_questions(
  'SEU-USER-UUID'::UUID,
  1,  -- ID do arquétipo (exemplo: 1)
  10  -- Número de questões
);
```

**Onde encontrar seu User UUID:**
1. No Supabase, vá em **Authentication** > **Users**
2. Clique no usuário
3. Copie o **UUID** (ex: `a1b2c3d4-e5f6-7890-1234-567890abcdef`)

---

## 🎯 **COMO FUNCIONA A FUNÇÃO:**

### **1. Recebe parâmetros:**
```typescript
p_user_id: UUID         // ID do usuário
p_archetype_id: INTEGER // ID do perfil (ex: Técnico TI)
p_limit: INTEGER        // Quantas questões (padrão: 10)
```

---

### **2. Busca pesos do arquétipo:**

```sql
-- Exemplo de subjects_weights:
[
  { "subject": "Português", "weight": 30 },
  { "subject": "Informática", "weight": 50 },
  { "subject": "Direito Administrativo", "weight": 20 }
]
```

---

### **3. Distribui questões proporcionalmente:**

```
Total de 10 questões:
  - Português: 30% → 3 questões
  - Informática: 50% → 5 questões
  - Direito Adm: 20% → 2 questões
```

---

### **4. Filtra questões:**

**Exclui:**
- ❌ Questões **masterizadas** (`is_mastered = TRUE`)
- ❌ Questões **críticas** (`is_critical = TRUE`)
- ❌ Questões vistas **mais de 10 vezes**

**Resultado:**
- ✅ Questões novas ou em progresso
- ✅ Distribuídas conforme importância do edital
- ✅ Embaralhadas aleatoriamente

---

## 🔄 **FLUXO COMPLETO:**

```
1. Usuário clica "Iniciar Quiz"
   ↓
2. React chama: supabase.rpc('get_smart_questions', {
     p_user_id: userId,
     p_archetype_id: activeProfile.archetype_id,
     p_limit: 10
   })
   ↓
3. Supabase executa a função SQL
   ↓
4. Retorna 10 questões inteligentes
   ↓
5. React exibe as questões no Quiz
```

---

## 📋 **CHECKLIST:**

Após executar o SQL, verifique:

- [ ] ✅ SQL executado sem erros
- [ ] ✅ Mensagem "Success. No rows returned"
- [ ] ✅ Função aparece em Database > Functions
- [ ] ✅ Permissões concedidas (authenticated + anon)
- [ ] ✅ Quiz carrega questões sem erro

---

## 🆘 **PROBLEMAS COMUNS:**

### **Erro: "relation 'archetypes' does not exist"**

**Solução:** Execute primeiro o arquivo `001_create_quiz_schema.sql` completo.

---

### **Erro: "relation 'subjects' does not exist"**

**Solução:** Execute o schema completo antes das funções RPC.

---

### **Erro: "permission denied for function"**

**Solução:** Execute os comandos `GRANT EXECUTE` no final do SQL acima.

---

### **Função criada mas retorna 0 questões**

**Causa:** Não existem questões cadastradas no banco.

**Solução:** 
1. Vá em **Table Editor** > **questions**
2. Verifique se existem registros
3. Se vazio, importe questões de exemplo

---

## 📚 **OUTRAS FUNÇÕES IMPORTANTES:**

Depois de criar `get_smart_questions`, você também precisa executar:

### **Arquivo: `002_create_rpc_functions.sql`**

Contém:
- ✅ `update_question_progress` - Atualiza progresso após resposta
- ✅ `update_user_profile` - Atualiza XP e stats
- ✅ `get_user_stats` - Retorna estatísticas do usuário

**Execute ele também** para ter todas as funções ativas!

---

## ✅ **RESULTADO FINAL:**

Após executar os SQLs:

```
╔════════════════════════════════════╗
║                                    ║
║   ✅ FUNÇÕES RPC CRIADAS!         ║
║                                    ║
║   🧠 get_smart_questions          ║
║   📊 update_question_progress     ║
║   👤 update_user_profile          ║
║   📈 get_user_stats               ║
║                                    ║
║   🚀 BACKEND OPERACIONAL!         ║
║                                    ║
╚════════════════════════════════════╝
```

**O Quiz agora funciona completamente!** 🎉

---

## 🎓 **COMO USAR NO CÓDIGO:**

```typescript
// Exemplo no React:
import { supabase } from '../utils/supabase/info';

const fetchQuestions = async () => {
  const { data, error } = await supabase.rpc('get_smart_questions', {
    p_user_id: user.id,
    p_archetype_id: activeProfile.archetype_id,
    p_limit: 10
  });

  if (error) {
    console.error('Erro:', error);
  } else {
    console.log('Questões:', data);
  }
};
```

---

**Arquivo de migração:**
- ✅ `/supabase/migrations/001_create_quiz_schema.sql` (linhas 88-148)

**Status:** ⚠️ **AGUARDANDO EXECUÇÃO MANUAL NO SUPABASE**

---

**Desenvolvido para o Gabaritoo** 🚀📚  
*Sistema Inteligente de Estudos para Concursos Públicos*

**Correção:** Criação da função RPC get_smart_questions  
**Data:** 7 de Janeiro de 2025  
**Status:** ⚠️ **AÇÃO NECESSÁRIA DO USUÁRIO**
