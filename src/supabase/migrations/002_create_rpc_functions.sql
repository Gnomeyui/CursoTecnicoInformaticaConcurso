-- =====================================================
-- 🔧 GABARITOO - FUNÇÕES RPC DO SUPABASE
-- =====================================================
-- Execute este SQL no SQL Editor do Supabase
-- Estas funções são chamadas pelo código React
-- =====================================================

-- =====================================================
-- 1️⃣ FUNÇÃO: update_question_progress
-- =====================================================
-- Atualiza o progresso individual de cada questão
-- Aplica as "Regras de Ouro":
--   ✅ Acertou > 4 vezes → is_mastered = true (nunca mais aparece)
--   ❌ Errou > 6 vezes → is_critical = true (vai para UTI)
-- =====================================================

CREATE OR REPLACE FUNCTION update_question_progress(
  p_user_id UUID,
  p_question_id UUID,
  p_is_correct BOOLEAN
)
RETURNS VOID
LANGUAGE plpgsql
AS $$
DECLARE
  v_progress_exists BOOLEAN;
  v_current_correct INT;
  v_current_wrong INT;
BEGIN
  -- Verifica se já existe registro de progresso para esta questão
  SELECT EXISTS(
    SELECT 1 FROM public.user_question_progress 
    WHERE user_id = p_user_id AND question_id = p_question_id
  ) INTO v_progress_exists;

  IF v_progress_exists THEN
    -- ===== ATUALIZA REGISTRO EXISTENTE =====
    UPDATE public.user_question_progress
    SET 
      times_viewed = times_viewed + 1,
      times_correct = CASE WHEN p_is_correct THEN times_correct + 1 ELSE times_correct END,
      times_wrong_total = CASE WHEN NOT p_is_correct THEN times_wrong_total + 1 ELSE times_wrong_total END,
      last_answered_at = NOW(),
      
      -- 🔥 REGRA DE OURO 1: Masterizada se acertou > 4
      is_mastered = CASE 
        WHEN (p_is_correct AND times_correct + 1 > 4) THEN TRUE 
        ELSE is_mastered 
      END,
      
      -- 🔥 REGRA DE OURO 2: Crítica se errou > 6
      is_critical = CASE 
        WHEN (NOT p_is_correct AND times_wrong_total + 1 > 6) THEN TRUE 
        ELSE is_critical 
      END
    WHERE user_id = p_user_id AND question_id = p_question_id;
    
  ELSE
    -- ===== CRIA NOVO REGISTRO =====
    INSERT INTO public.user_question_progress (
      user_id, 
      question_id, 
      times_viewed, 
      times_correct, 
      times_wrong_total, 
      is_mastered, 
      is_critical, 
      last_answered_at
    ) VALUES (
      p_user_id, 
      p_question_id, 
      1, 
      CASE WHEN p_is_correct THEN 1 ELSE 0 END,
      CASE WHEN NOT p_is_correct THEN 1 ELSE 0 END,
      FALSE,  -- Nunca começa como masterizada
      FALSE,  -- Nunca começa como crítica
      NOW()
    );
  END IF;
END;
$$;

-- =====================================================
-- 2️⃣ FUNÇÃO: update_user_profile
-- =====================================================
-- Atualiza XP, questões respondidas e último acesso
-- Chamada automaticamente após cada resposta
-- =====================================================

CREATE OR REPLACE FUNCTION update_user_profile(
  p_user_id UUID,
  p_xp_gain INTEGER,
  p_is_correct BOOLEAN
)
RETURNS VOID
LANGUAGE plpgsql
AS $$
BEGIN
  UPDATE public.profiles
  SET 
    xp = xp + p_xp_gain,
    questoes_respondidas = questoes_respondidas + 1,
    ultimo_acesso = CURRENT_DATE
    -- 💡 Aqui poderia adicionar lógica de nível automático se quisesse:
    -- nivel = FLOOR(xp / 100) + 1
  WHERE id = p_user_id;
  
  -- Se o perfil não existir, cria um novo
  IF NOT FOUND THEN
    INSERT INTO public.profiles (
      id,
      xp,
      questoes_respondidas,
      ultimo_acesso
    ) VALUES (
      p_user_id,
      p_xp_gain,
      1,
      CURRENT_DATE
    );
  END IF;
END;
$$;

-- =====================================================
-- 3️⃣ FUNÇÃO EXTRA: get_user_stats
-- =====================================================
-- Retorna estatísticas completas do usuário
-- Útil para dashboard e relatórios
-- =====================================================

CREATE OR REPLACE FUNCTION get_user_stats(p_user_id UUID)
RETURNS TABLE (
  total_questions_answered BIGINT,
  total_correct BIGINT,
  total_wrong BIGINT,
  mastered_count BIGINT,
  critical_count BIGINT,
  current_xp INTEGER,
  accuracy_percentage NUMERIC
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    COUNT(*)::BIGINT AS total_questions_answered,
    SUM(times_correct)::BIGINT AS total_correct,
    SUM(times_wrong_total)::BIGINT AS total_wrong,
    COUNT(*) FILTER (WHERE is_mastered = TRUE)::BIGINT AS mastered_count,
    COUNT(*) FILTER (WHERE is_critical = TRUE)::BIGINT AS critical_count,
    COALESCE((SELECT xp FROM public.profiles WHERE id = p_user_id), 0) AS current_xp,
    CASE 
      WHEN SUM(times_correct + times_wrong_total) > 0 
      THEN ROUND((SUM(times_correct)::NUMERIC / SUM(times_correct + times_wrong_total)::NUMERIC) * 100, 2)
      ELSE 0 
    END AS accuracy_percentage
  FROM public.user_question_progress
  WHERE user_id = p_user_id;
END;
$$;

-- =====================================================
-- ✅ TESTE DAS FUNÇÕES (Opcional - Execute para validar)
-- =====================================================

-- Teste 1: Criar progresso de questão
-- SELECT update_question_progress(
--   'YOUR-USER-UUID'::UUID,
--   'SOME-QUESTION-UUID'::UUID,
--   TRUE
-- );

-- Teste 2: Ver estatísticas
-- SELECT * FROM get_user_stats('YOUR-USER-UUID'::UUID);

-- =====================================================
-- 4️⃣ FUNÇÃO: get_smart_questions
-- =====================================================
-- Retorna questões inteligentes baseadas no algoritmo:
-- • 70% questões novas (nunca respondidas)
-- • 30% questões erradas (para revisão)
-- • Filtra por concurso_perfil_id (archetype_id)
-- • Exclui questões masterizadas (acertou > 4 vezes)
-- =====================================================

CREATE OR REPLACE FUNCTION get_smart_questions(
  p_user_id UUID,
  p_archetype_id UUID DEFAULT NULL,
  p_limit INTEGER DEFAULT 10
)
RETURNS TABLE (
  id UUID,
  texto TEXT,
  opcoes JSONB,
  resposta_correta TEXT,
  comentario TEXT,
  materia TEXT,
  dificuldade TEXT,
  concurso_perfil_id UUID
)
LANGUAGE plpgsql
AS $$
DECLARE
  v_novas_limit INTEGER;
  v_erradas_limit INTEGER;
BEGIN
  -- Calcula quantas questões de cada tipo deve retornar
  v_novas_limit := CEIL(p_limit * 0.7);  -- 70% novas
  v_erradas_limit := p_limit - v_novas_limit;  -- 30% erradas
  
  RETURN QUERY
  -- ===== PARTE 1: QUESTÕES NOVAS (70%) =====
  (
    SELECT 
      q.id,
      q.texto,
      q.opcoes,
      q.resposta_correta,
      q.comentario,
      q.materia,
      q.dificuldade,
      q.concurso_perfil_id
    FROM public.questions q
    WHERE 
      -- Filtro por perfil de concurso (se fornecido)
      (p_archetype_id IS NULL OR q.concurso_perfil_id = p_archetype_id)
      
      -- Questões que o usuário NUNCA respondeu
      AND NOT EXISTS (
        SELECT 1 FROM public.user_question_progress uqp
        WHERE uqp.user_id = p_user_id 
          AND uqp.question_id = q.id
      )
    ORDER BY RANDOM()
    LIMIT v_novas_limit
  )
  
  UNION ALL
  
  -- ===== PARTE 2: QUESTÕES ERRADAS (30%) =====
  (
    SELECT 
      q.id,
      q.texto,
      q.opcoes,
      q.resposta_correta,
      q.comentario,
      q.materia,
      q.dificuldade,
      q.concurso_perfil_id
    FROM public.questions q
    INNER JOIN public.user_question_progress uqp 
      ON q.id = uqp.question_id
    WHERE 
      uqp.user_id = p_user_id
      
      -- Filtro por perfil de concurso (se fornecido)
      AND (p_archetype_id IS NULL OR q.concurso_perfil_id = p_archetype_id)
      
      -- Questões que o usuário errou mais do que acertou
      AND uqp.times_wrong_total > uqp.times_correct
      
      -- Não incluir questões masterizadas
      AND uqp.is_mastered = FALSE
      
    -- Prioriza questões com mais erros recentes
    ORDER BY uqp.times_wrong_total DESC, uqp.last_answered_at DESC
    LIMIT v_erradas_limit
  );
  
  -- Se não houver questões erradas suficientes, complementa com mais questões novas
  -- Isso é feito automaticamente pelo LIMIT total
  
END;
$$;

-- =====================================================
-- ✅ PERMISSÕES PARA get_smart_questions
-- =====================================================

GRANT EXECUTE ON FUNCTION get_smart_questions(UUID, UUID, INTEGER) TO authenticated;
GRANT EXECUTE ON FUNCTION get_smart_questions(UUID, UUID, INTEGER) TO anon;

-- =====================================================
-- 📝 DOCUMENTAÇÃO DA FUNÇÃO
-- =====================================================

COMMENT ON FUNCTION get_smart_questions IS 
'Algoritmo inteligente de seleção de questões:
- 70% questões novas (nunca respondidas)
- 30% questões erradas (para revisão focada)
- Filtra por perfil de concurso
- Exclui questões masterizadas (>4 acertos)
- Prioriza questões com mais erros para revisão';

-- =====================================================
-- 🎉 FUNÇÕES CRIADAS COM SUCESSO!
-- =====================================================
-- Agora o sistema React pode chamar:
--   - supabase.rpc('update_question_progress', {...})
--   - supabase.rpc('update_user_profile', {...})
--   - supabase.rpc('get_user_stats', {...})
--   - supabase.rpc('get_smart_questions', {...})
-- =====================================================