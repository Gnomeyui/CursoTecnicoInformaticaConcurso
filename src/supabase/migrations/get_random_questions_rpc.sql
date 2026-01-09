-- ============================================================
-- 🚀 FUNÇÃO RPC PARA OTIMIZAR BUSCA DE QUESTÕES
-- ============================================================
-- 
-- Esta função SQL resolve o problema de performance quando o usuário
-- já respondeu MUITAS questões (>1000).
-- 
-- IMPORTANTE: Execute este SQL no painel do Supabase:
-- Painel Supabase > SQL Editor > New Query > Cole e Execute
--
-- Depois, atualize o código JS para usar:
-- const { data } = await supabase.rpc('get_random_questions_for_user', { 
--   p_user_id: userId, 
--   p_limit: 20, 
--   p_profile_id: 1 
-- });
-- ============================================================

-- Função para buscar questões NOVAS (não respondidas)
CREATE OR REPLACE FUNCTION get_random_questions_for_user(
  p_user_id UUID,
  p_limit INT,
  p_profile_id INT
)
RETURNS SETOF questions
LANGUAGE sql
SECURITY DEFINER
AS $$
  SELECT q.*
  FROM questions q
  WHERE q.concurso_perfil_id = p_profile_id
  AND NOT EXISTS (
    SELECT 1 FROM user_question_progress uqp 
    WHERE uqp.question_id = q.id 
    AND uqp.user_id = p_user_id
  )
  ORDER BY RANDOM()
  LIMIT p_limit;
$$;

-- Função para buscar questões ERRADAS (para revisão)
CREATE OR REPLACE FUNCTION get_wrong_questions_for_user(
  p_user_id UUID,
  p_limit INT,
  p_profile_id INT
)
RETURNS SETOF questions
LANGUAGE sql
SECURITY DEFINER
AS $$
  SELECT q.*
  FROM questions q
  INNER JOIN user_question_progress uqp 
    ON q.id = uqp.question_id
  WHERE uqp.user_id = p_user_id
  AND uqp.is_mastered = FALSE
  AND uqp.times_wrong_total > 0
  AND q.concurso_perfil_id = p_profile_id
  ORDER BY uqp.times_wrong_total DESC
  LIMIT p_limit;
$$;

-- ============================================================
-- 📊 EXEMPLO DE USO NO JAVASCRIPT:
-- ============================================================
--
-- // Buscar 21 questões novas (70% de 30)
-- const { data: novas } = await supabase.rpc('get_random_questions_for_user', {
--   p_user_id: userId,
--   p_limit: 21,
--   p_profile_id: archetypeId
-- });
--
-- // Buscar 9 questões erradas (30% de 30)
-- const { data: erradas } = await supabase.rpc('get_wrong_questions_for_user', {
--   p_user_id: userId,
--   p_limit: 9,
--   p_profile_id: archetypeId
-- });
--
-- const allQuestions = [...(novas || []), ...(erradas || [])];
-- ============================================================
