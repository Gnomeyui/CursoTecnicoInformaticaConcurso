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
-- ✅ PERMISSÕES DE SEGURANÇA
-- =====================================================
-- Permite que usuários autenticados executem as funções
-- Mas apenas com seus próprios dados (RLS será aplicado)
-- =====================================================

-- Conceder permissões de execução para usuários autenticados
GRANT EXECUTE ON FUNCTION update_question_progress(UUID, UUID, BOOLEAN) TO authenticated;
GRANT EXECUTE ON FUNCTION update_user_profile(UUID, INTEGER, BOOLEAN) TO authenticated;
GRANT EXECUTE ON FUNCTION get_user_stats(UUID) TO authenticated;

-- Permitir também para usuários anônimos (guest mode)
GRANT EXECUTE ON FUNCTION update_question_progress(UUID, UUID, BOOLEAN) TO anon;
GRANT EXECUTE ON FUNCTION update_user_profile(UUID, INTEGER, BOOLEAN) TO anon;
GRANT EXECUTE ON FUNCTION get_user_stats(UUID) TO anon;

-- =====================================================
-- 📝 COMENTÁRIOS DAS FUNÇÕES (Documentação)
-- =====================================================

COMMENT ON FUNCTION update_question_progress IS 
'Atualiza o progresso de uma questão específica para um usuário. 
Aplica regras de masterização (>4 acertos) e criticidade (>6 erros).';

COMMENT ON FUNCTION update_user_profile IS 
'Atualiza XP e estatísticas gerais do perfil do usuário.';

COMMENT ON FUNCTION get_user_stats IS 
'Retorna estatísticas agregadas do usuário incluindo acurácia e contagem de questões masterizadas/críticas.';

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
-- 🎉 FUNÇÕES CRIADAS COM SUCESSO!
-- =====================================================
-- Agora o sistema React pode chamar:
--   - supabase.rpc('update_question_progress', {...})
--   - supabase.rpc('update_user_profile', {...})
--   - supabase.rpc('get_user_stats', {...})
-- =====================================================
