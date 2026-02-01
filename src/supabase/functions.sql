-- =====================================================
-- GABARITOO - FUNÇÕES RPC SUPABASE
-- =====================================================
-- Data: 01/02/2026
-- Versão: 1.0 - Funções otimizadas para o front-end
-- Objetivo: Expor APIs seguras e performáticas
-- =====================================================

-- =====================================================
-- 1. get_smart_questions - Busca Inteligente de Questões
-- =====================================================
-- Retorna questões baseadas no perfil, dificuldade e histórico do usuário
-- Implementa o algoritmo de peso para priorizar matérias fracas

CREATE OR REPLACE FUNCTION get_smart_questions(
  p_user_id UUID,
  p_perfil_id UUID DEFAULT NULL,
  p_limite INTEGER DEFAULT 20,
  p_materia TEXT DEFAULT NULL,
  p_dificuldade dificuldade_tipo DEFAULT NULL,
  p_banca TEXT DEFAULT NULL,
  p_incluir_erradas BOOLEAN DEFAULT false
)
RETURNS TABLE (
  id UUID,
  tipo tipo_conteudo,
  materia materia_tipo,
  dificuldade dificuldade_tipo,
  pergunta TEXT,
  explicacao TEXT,
  banca TEXT,
  ano INTEGER,
  concurso TEXT,
  alternativas JSONB,
  peso DECIMAL -- Peso calculado pelo algoritmo
) AS $$
BEGIN
  RETURN QUERY
  WITH stats AS (
    -- Buscar estatísticas do usuário por matéria
    SELECT 
      em.materia,
      COALESCE(em.erros, 0) as erros,
      COALESCE(em.respondidas, 0) as respondidas,
      COALESCE(em.ultima_revisao, '1970-01-01'::timestamptz) as ultima_revisao
    FROM estatisticas_materia em
    WHERE em.user_id = p_user_id
      AND (p_perfil_id IS NULL OR em.perfil_id = p_perfil_id)
  ),
  questoes_respondidas AS (
    -- IDs das questões já respondidas
    SELECT DISTINCT questao_id
    FROM respostas_usuario
    WHERE user_id = p_user_id
  ),
  questoes_erradas AS (
    -- IDs das questões erradas (para modo revisão)
    SELECT DISTINCT ru.questao_id
    FROM respostas_usuario ru
    WHERE ru.user_id = p_user_id
      AND ru.acertou = false
  )
  SELECT 
    q.id,
    q.tipo,
    q.materia,
    q.dificuldade,
    q.pergunta,
    q.explicacao,
    q.banca,
    q.ano,
    q.concurso,
    -- Agregrar alternativas em JSONB
    (
      SELECT jsonb_agg(
        jsonb_build_object(
          'id', a.id,
          'ordem', a.ordem,
          'texto', a.texto,
          'correta', a.correta
        ) ORDER BY a.ordem
      )
      FROM alternativas a
      WHERE a.questao_id = q.id
    ) as alternativas,
    -- Calcular peso da questão (maior peso = maior prioridade)
    (
      COALESCE(s.erros::DECIMAL / NULLIF(s.respondidas, 0), 0.5) * 100 + -- Taxa de erro (0-100)
      EXTRACT(EPOCH FROM (NOW() - s.ultima_revisao)) / 86400 * 2 + -- Dias desde última revisão (peso 2x)
      CASE WHEN q.id IN (SELECT questao_id FROM questoes_erradas) THEN 50 ELSE 0 END + -- Bonus para erradas
      CASE WHEN q.id NOT IN (SELECT questao_id FROM questoes_respondidas) THEN 30 ELSE 0 END + -- Bonus para novas
      random() * 10 -- Fator aleatório para variedade
    ) as peso
  FROM questoes q
  LEFT JOIN stats s ON s.materia = q.materia
  WHERE 
    -- Filtros básicos
    (p_materia IS NULL OR q.materia::TEXT = p_materia)
    AND (p_dificuldade IS NULL OR q.dificuldade = p_dificuldade)
    AND (p_banca IS NULL OR q.banca = p_banca)
    -- Filtro de perfil (cargo e nível)
    AND (p_perfil_id IS NULL OR 
         (q.cargo_relacionado IS NULL OR 
          q.cargo_relacionado IN (
            SELECT cargo FROM perfis_concurso WHERE id = p_perfil_id
          ))
    )
    -- Se incluir_erradas = true, prioriza questões erradas
    AND (
      NOT p_incluir_erradas 
      OR q.id IN (SELECT questao_id FROM questoes_erradas)
    )
  ORDER BY peso DESC
  LIMIT p_limite;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =====================================================
-- 2. registrar_resposta - Registra resposta e atualiza stats
-- =====================================================

CREATE OR REPLACE FUNCTION registrar_resposta(
  p_user_id UUID,
  p_questao_id UUID,
  p_alternativa_id UUID,
  p_perfil_id UUID DEFAULT NULL,
  p_modo TEXT DEFAULT 'quiz',
  p_tempo_segundos INTEGER DEFAULT NULL
)
RETURNS JSONB AS $$
DECLARE
  v_acertou BOOLEAN;
  v_materia materia_tipo;
  v_xp_ganho INTEGER;
  v_nivel_anterior INTEGER;
  v_nivel_atual INTEGER;
  v_resultado JSONB;
BEGIN
  -- Verificar se a alternativa está correta
  SELECT a.correta INTO v_acertou
  FROM alternativas a
  WHERE a.id = p_alternativa_id;
  
  -- Buscar matéria da questão
  SELECT q.materia INTO v_materia
  FROM questoes q
  WHERE q.id = p_questao_id;
  
  -- Registrar resposta
  INSERT INTO respostas_usuario (
    user_id,
    questao_id,
    alternativa_id,
    perfil_id,
    acertou,
    tempo_resposta_segundos,
    modo
  ) VALUES (
    p_user_id,
    p_questao_id,
    p_alternativa_id,
    p_perfil_id,
    v_acertou,
    p_tempo_segundos,
    p_modo
  );
  
  -- Atualizar estatísticas da matéria
  INSERT INTO estatisticas_materia (
    user_id,
    perfil_id,
    materia,
    respondidas,
    erros,
    acertos,
    streak,
    ultima_revisao
  ) VALUES (
    p_user_id,
    p_perfil_id,
    v_materia,
    1,
    CASE WHEN v_acertou THEN 0 ELSE 1 END,
    CASE WHEN v_acertou THEN 1 ELSE 0 END,
    CASE WHEN v_acertou THEN 1 ELSE 0 END,
    NOW()
  )
  ON CONFLICT (user_id, materia, perfil_id)
  DO UPDATE SET
    respondidas = estatisticas_materia.respondidas + 1,
    erros = estatisticas_materia.erros + CASE WHEN v_acertou THEN 0 ELSE 1 END,
    acertos = estatisticas_materia.acertos + CASE WHEN v_acertou THEN 1 ELSE 0 END,
    streak = CASE 
      WHEN v_acertou THEN estatisticas_materia.streak + 1 
      ELSE 0 
    END,
    melhor_streak = GREATEST(
      estatisticas_materia.melhor_streak,
      CASE WHEN v_acertou THEN estatisticas_materia.streak + 1 ELSE 0 END
    ),
    ultima_revisao = NOW();
  
  -- Atualizar gamificação (XP e nível)
  v_xp_ganho := CASE 
    WHEN v_acertou THEN 10 -- 10 XP por acerto
    ELSE 3 -- 3 XP por tentativa (mesmo errando)
  END;
  
  -- Buscar nível anterior
  SELECT nivel INTO v_nivel_anterior
  FROM gamification
  WHERE user_id = p_user_id;
  
  -- Atualizar gamificação
  INSERT INTO gamification (user_id, xp, nivel, ultimo_estudo)
  VALUES (
    p_user_id,
    v_xp_ganho,
    1,
    CURRENT_DATE
  )
  ON CONFLICT (user_id)
  DO UPDATE SET
    xp = gamification.xp + v_xp_ganho,
    nivel = FLOOR((gamification.xp + v_xp_ganho) / 100.0) + 1, -- 100 XP por nível
    streak_atual = CASE
      WHEN gamification.ultimo_estudo = CURRENT_DATE THEN gamification.streak_atual
      WHEN gamification.ultimo_estudo = CURRENT_DATE - 1 THEN gamification.streak_atual + 1
      ELSE 1
    END,
    melhor_streak = GREATEST(
      gamification.melhor_streak,
      CASE
        WHEN gamification.ultimo_estudo = CURRENT_DATE - 1 THEN gamification.streak_atual + 1
        ELSE gamification.streak_atual
      END
    ),
    ultimo_estudo = CURRENT_DATE;
  
  -- Buscar nível atual
  SELECT nivel INTO v_nivel_atual
  FROM gamification
  WHERE user_id = p_user_id;
  
  -- Montar resultado
  v_resultado := jsonb_build_object(
    'acertou', v_acertou,
    'xp_ganho', v_xp_ganho,
    'nivel_anterior', v_nivel_anterior,
    'nivel_atual', v_nivel_atual,
    'level_up', (v_nivel_atual > v_nivel_anterior)
  );
  
  RETURN v_resultado;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =====================================================
-- 3. get_dashboard_stats - Estatísticas para Dashboard
-- =====================================================

CREATE OR REPLACE FUNCTION get_dashboard_stats(p_user_id UUID)
RETURNS JSONB AS $$
DECLARE
  v_stats JSONB;
BEGIN
  SELECT jsonb_build_object(
    -- Gamificação
    'xp', COALESCE(g.xp, 0),
    'nivel', COALESCE(g.nivel, 1),
    'streak_atual', COALESCE(g.streak_atual, 0),
    'melhor_streak', COALESCE(g.melhor_streak, 0),
    
    -- Estatísticas gerais
    'total_respondidas', (
      SELECT COUNT(*)
      FROM respostas_usuario
      WHERE user_id = p_user_id
    ),
    'total_acertos', (
      SELECT COUNT(*)
      FROM respostas_usuario
      WHERE user_id = p_user_id AND acertou = true
    ),
    'total_erros', (
      SELECT COUNT(*)
      FROM respostas_usuario
      WHERE user_id = p_user_id AND acertou = false
    ),
    'taxa_acerto', (
      SELECT ROUND(
        COUNT(*) FILTER (WHERE acertou = true)::DECIMAL / NULLIF(COUNT(*), 0) * 100,
        1
      )
      FROM respostas_usuario
      WHERE user_id = p_user_id
    ),
    
    -- Estudos hoje
    'questoes_hoje', (
      SELECT COUNT(*)
      FROM respostas_usuario
      WHERE user_id = p_user_id
        AND created_at::DATE = CURRENT_DATE
    ),
    
    -- Meta diária
    'meta_diaria', COALESCE(p.meta_diaria, 20),
    
    -- Estatísticas por matéria (top 5 piores)
    'materias_fracas', (
      SELECT jsonb_agg(
        jsonb_build_object(
          'materia', materia,
          'taxa_erro', ROUND(erros::DECIMAL / NULLIF(respondidas, 0) * 100, 1)
        )
        ORDER BY (erros::DECIMAL / NULLIF(respondidas, 0)) DESC
        LIMIT 5
      )
      FROM estatisticas_materia
      WHERE user_id = p_user_id
        AND respondidas > 0
    ),
    
    -- Perfil ativo
    'perfil_ativo', (
      SELECT jsonb_build_object(
        'id', id,
        'nome', nome_perfil,
        'cargo', cargo
      )
      FROM perfis_concurso
      WHERE user_id = p_user_id AND ativo = true
      LIMIT 1
    )
  ) INTO v_stats
  FROM gamification g
  LEFT JOIN plano_estudo p ON p.user_id = p_user_id
  WHERE g.user_id = p_user_id;
  
  RETURN COALESCE(v_stats, '{}'::jsonb);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =====================================================
-- 4. resgatar_voucher - Valida e aplica cupom premium
-- =====================================================

CREATE OR REPLACE FUNCTION resgatar_voucher(
  p_user_id UUID,
  p_codigo TEXT
)
RETURNS JSONB AS $$
DECLARE
  v_voucher RECORD;
  v_resultado JSONB;
BEGIN
  -- Buscar voucher
  SELECT *
  INTO v_voucher
  FROM vouchers
  WHERE codigo = UPPER(p_codigo)
    AND usado = false
    AND (valido_ate IS NULL OR valido_ate > NOW())
  FOR UPDATE; -- Lock para evitar uso duplicado
  
  -- Validar se voucher existe
  IF NOT FOUND THEN
    RETURN jsonb_build_object(
      'sucesso', false,
      'mensagem', 'Cupom inválido ou já utilizado'
    );
  END IF;
  
  -- Marcar voucher como usado
  UPDATE vouchers
  SET 
    usado = true,
    usado_por = p_user_id,
    usado_em = NOW()
  WHERE id = v_voucher.id;
  
  -- Atualizar plano do usuário
  UPDATE users
  SET 
    plan = v_voucher.tipo::plan_type,
    premium = true,
    premium_expires_at = CASE
      WHEN premium_expires_at > NOW() 
      THEN premium_expires_at + (v_voucher.dias_premium || ' days')::INTERVAL
      ELSE NOW() + (v_voucher.dias_premium || ' days')::INTERVAL
    END
  WHERE id = p_user_id;
  
  v_resultado := jsonb_build_object(
    'sucesso', true,
    'mensagem', 'Cupom resgatado com sucesso! 🎉',
    'dias_adicionados', v_voucher.dias_premium,
    'expira_em', (
      SELECT premium_expires_at 
      FROM users 
      WHERE id = p_user_id
    )
  );
  
  RETURN v_resultado;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =====================================================
-- 5. criar_simulado - Gera um simulado personalizado
-- =====================================================

CREATE OR REPLACE FUNCTION criar_simulado(
  p_user_id UUID,
  p_perfil_id UUID DEFAULT NULL,
  p_quantidade INTEGER DEFAULT 40,
  p_tempo_minutos INTEGER DEFAULT 120,
  p_banca TEXT DEFAULT NULL,
  p_nivel nivel_escolaridade DEFAULT NULL
)
RETURNS UUID AS $$
DECLARE
  v_simulado_id UUID;
  v_questao RECORD;
  v_ordem INTEGER := 1;
BEGIN
  -- Criar registro do simulado
  INSERT INTO simulados (
    user_id,
    perfil_id,
    quantidade_questoes,
    tempo_limite_minutos,
    banca,
    nivel
  ) VALUES (
    p_user_id,
    p_perfil_id,
    p_quantidade,
    p_tempo_minutos,
    p_banca,
    p_nivel
  )
  RETURNING id INTO v_simulado_id;
  
  -- Selecionar questões aleatórias
  FOR v_questao IN
    SELECT q.id
    FROM questoes q
    WHERE 
      (p_banca IS NULL OR q.banca = p_banca)
      AND (p_nivel IS NULL OR q.nivel_relacionado = p_nivel)
      AND q.tipo = 'QUESTAO'
      -- Evitar questões já no simulado
      AND q.id NOT IN (
        SELECT questao_id 
        FROM simulados_questoes 
        WHERE simulado_id = v_simulado_id
      )
    ORDER BY random()
    LIMIT p_quantidade
  LOOP
    -- Adicionar questão ao simulado
    INSERT INTO simulados_questoes (
      simulado_id,
      questao_id,
      ordem
    ) VALUES (
      v_simulado_id,
      v_questao.id,
      v_ordem
    );
    
    v_ordem := v_ordem + 1;
  END LOOP;
  
  RETURN v_simulado_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =====================================================
-- 6. finalizar_simulado - Calcula nota e finaliza
-- =====================================================

CREATE OR REPLACE FUNCTION finalizar_simulado(
  p_simulado_id UUID,
  p_tempo_gasto_segundos INTEGER
)
RETURNS JSONB AS $$
DECLARE
  v_total INTEGER;
  v_acertos INTEGER;
  v_erros INTEGER;
  v_nota DECIMAL;
  v_resultado JSONB;
BEGIN
  -- Contar total de questões
  SELECT COUNT(*) INTO v_total
  FROM simulados_questoes
  WHERE simulado_id = p_simulado_id;
  
  -- Contar acertos e erros
  SELECT 
    COUNT(*) FILTER (WHERE acertou = true),
    COUNT(*) FILTER (WHERE acertou = false)
  INTO v_acertos, v_erros
  FROM simulados_questoes
  WHERE simulado_id = p_simulado_id;
  
  -- Calcular nota (0 a 100)
  v_nota := (v_acertos::DECIMAL / NULLIF(v_total, 0) * 100);
  
  -- Atualizar simulado
  UPDATE simulados
  SET 
    finalizado = true,
    acertos = v_acertos,
    erros = v_erros,
    tempo_gasto_segundos = p_tempo_gasto_segundos,
    nota_final = v_nota,
    finalizado_em = NOW()
  WHERE id = p_simulado_id;
  
  v_resultado := jsonb_build_object(
    'total', v_total,
    'acertos', v_acertos,
    'erros', v_erros,
    'nota', v_nota,
    'aprovado', (v_nota >= 70) -- 70% para aprovação
  );
  
  RETURN v_resultado;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =====================================================
-- 7. get_ranking - Top 10 usuários por XP
-- =====================================================

CREATE OR REPLACE FUNCTION get_ranking(p_limite INTEGER DEFAULT 10)
RETURNS TABLE (
  posicao BIGINT,
  user_id UUID,
  nome TEXT,
  xp INTEGER,
  nivel INTEGER,
  streak INTEGER
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    ROW_NUMBER() OVER (ORDER BY g.xp DESC) as posicao,
    u.id,
    COALESCE(u.nome, 'Anônimo') as nome,
    g.xp,
    g.nivel,
    g.streak_atual
  FROM gamification g
  JOIN users u ON u.id = g.user_id
  ORDER BY g.xp DESC
  LIMIT p_limite;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =====================================================
-- GRANTS (Permissões de Execução)
-- =====================================================

-- Conceder permissão para usuários autenticados executarem as funções
GRANT EXECUTE ON FUNCTION get_smart_questions TO authenticated;
GRANT EXECUTE ON FUNCTION registrar_resposta TO authenticated;
GRANT EXECUTE ON FUNCTION get_dashboard_stats TO authenticated;
GRANT EXECUTE ON FUNCTION resgatar_voucher TO authenticated;
GRANT EXECUTE ON FUNCTION criar_simulado TO authenticated;
GRANT EXECUTE ON FUNCTION finalizar_simulado TO authenticated;
GRANT EXECUTE ON FUNCTION get_ranking TO authenticated;

-- =====================================================
-- COMENTÁRIOS PARA DOCUMENTAÇÃO
-- =====================================================

COMMENT ON FUNCTION get_smart_questions IS 'Busca inteligente de questões com algoritmo de peso baseado em estatísticas do usuário';
COMMENT ON FUNCTION registrar_resposta IS 'Registra resposta do usuário e atualiza automaticamente stats e gamificação';
COMMENT ON FUNCTION get_dashboard_stats IS 'Retorna todas as estatísticas necessárias para o dashboard em uma única query';
COMMENT ON FUNCTION resgatar_voucher IS 'Valida e aplica cupom premium com lock para evitar uso duplicado';
COMMENT ON FUNCTION criar_simulado IS 'Gera um simulado personalizado com questões aleatórias';
COMMENT ON FUNCTION finalizar_simulado IS 'Calcula nota final e finaliza simulado';
COMMENT ON FUNCTION get_ranking IS 'Retorna ranking dos top usuários por XP';

-- =====================================================
-- FIM DAS FUNÇÕES RPC
-- =====================================================
-- Total de funções: 7
-- Status: ✅ Pronto para integração com front-end
-- =====================================================
