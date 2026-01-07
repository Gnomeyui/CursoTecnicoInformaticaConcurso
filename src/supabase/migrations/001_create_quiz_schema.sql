-- ============================================
-- GABARITOO - SISTEMA DE QUIZ INTELIGENTE
-- ============================================

-- 1. Tabela de Perfil do Usuário (Para Gamificação)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID REFERENCES auth.users(id) PRIMARY KEY,
    xp INTEGER DEFAULT 0,
    nivel INTEGER DEFAULT 1,
    streak_atual INTEGER DEFAULT 0,
    maior_streak INTEGER DEFAULT 0,
    ultimo_acesso DATE DEFAULT CURRENT_DATE,
    questoes_respondidas INTEGER DEFAULT 0,
    precisao_global DECIMAL(5,2) DEFAULT 0.00,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Tabela de Matérias/Assuntos (Taxonomia)
CREATE TABLE IF NOT EXISTS public.subjects (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    parent_id UUID REFERENCES public.subjects(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Tabela de Arquétipos (Templates de Cargos)
CREATE TABLE IF NOT EXISTS public.archetypes (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    nivel VARCHAR CHECK (nivel IN ('fundamental', 'medio', 'superior')),
    subjects_weights JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Tabela de Cargos (Vinculados aos Arquétipos)
CREATE TABLE IF NOT EXISTS public.job_roles (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL UNIQUE,
    archetype_id INTEGER REFERENCES public.archetypes(id),
    nivel VARCHAR CHECK (nivel IN ('fundamental', 'medio', 'superior')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Tabela de Questões (O Banco Geral)
CREATE TABLE IF NOT EXISTS public.questions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    text TEXT NOT NULL,
    options JSONB NOT NULL,
    correct_option_id TEXT NOT NULL,
    subject_id UUID REFERENCES public.subjects(id),
    difficulty_level VARCHAR CHECK (difficulty_level IN ('facil', 'medio', 'dificil')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. Tabela de Progresso (O Cérebro do Algoritmo)
CREATE TABLE IF NOT EXISTS public.user_question_progress (
    user_id UUID REFERENCES auth.users(id),
    question_id UUID REFERENCES public.questions(id),
    times_viewed INTEGER DEFAULT 0,
    times_correct INTEGER DEFAULT 0,
    times_wrong_total INTEGER DEFAULT 0,
    is_mastered BOOLEAN DEFAULT FALSE,
    is_critical BOOLEAN DEFAULT FALSE,
    last_answered_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    PRIMARY KEY (user_id, question_id)
);

-- 7. Tabela de Sessões de Estudo
CREATE TABLE IF NOT EXISTS public.study_sessions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id),
    job_role_id INTEGER REFERENCES public.job_roles(id),
    started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    ended_at TIMESTAMP WITH TIME ZONE,
    questions_answered INTEGER DEFAULT 0,
    correct_answers INTEGER DEFAULT 0,
    xp_gained INTEGER DEFAULT 0
);

-- ============================================
-- FUNÇÕES E STORED PROCEDURES
-- ============================================

-- Função para buscar questões inteligentes baseadas nos pesos
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

-- Função para atualizar progresso de questão
CREATE OR REPLACE FUNCTION update_question_progress(
    p_user_id UUID,
    p_question_id UUID,
    p_is_correct BOOLEAN
)
RETURNS void AS $$
DECLARE
    v_progress RECORD;
BEGIN
    -- Buscar progresso atual ou criar registro
    SELECT * INTO v_progress
    FROM public.user_question_progress
    WHERE user_id = p_user_id AND question_id = p_question_id;
    
    IF v_progress IS NULL THEN
        -- Criar novo registro
        INSERT INTO public.user_question_progress (
            user_id, 
            question_id, 
            times_viewed, 
            times_correct, 
            times_wrong_total,
            is_mastered,
            is_critical
        ) VALUES (
            p_user_id,
            p_question_id,
            1,
            CASE WHEN p_is_correct THEN 1 ELSE 0 END,
            CASE WHEN p_is_correct THEN 0 ELSE 1 END,
            FALSE,
            FALSE
        );
    ELSE
        -- Atualizar registro existente
        UPDATE public.user_question_progress
        SET 
            times_viewed = times_viewed + 1,
            times_correct = times_correct + CASE WHEN p_is_correct THEN 1 ELSE 0 END,
            times_wrong_total = times_wrong_total + CASE WHEN p_is_correct THEN 0 ELSE 1 END,
            is_mastered = CASE WHEN (times_correct + CASE WHEN p_is_correct THEN 1 ELSE 0 END) > 4 THEN TRUE ELSE is_mastered END,
            is_critical = CASE WHEN (times_wrong_total + CASE WHEN p_is_correct THEN 0 ELSE 1 END) > 6 THEN TRUE ELSE is_critical END,
            last_answered_at = NOW()
        WHERE user_id = p_user_id AND question_id = p_question_id;
    END IF;
END;
$$ LANGUAGE plpgsql;

-- Função para atualizar perfil do usuário
CREATE OR REPLACE FUNCTION update_user_profile(
    p_user_id UUID,
    p_xp_gain INTEGER,
    p_is_correct BOOLEAN
)
RETURNS void AS $$
DECLARE
    v_profile RECORD;
    v_new_nivel INTEGER;
BEGIN
    SELECT * INTO v_profile
    FROM public.profiles
    WHERE id = p_user_id;
    
    IF v_profile IS NULL THEN
        -- Criar perfil se não existir
        INSERT INTO public.profiles (id, xp, nivel, questoes_respondidas, precisao_global)
        VALUES (p_user_id, p_xp_gain, 1, 1, CASE WHEN p_is_correct THEN 100.00 ELSE 0.00 END);
    ELSE
        -- Calcular novo nível baseado em XP (100 XP por nível)
        v_new_nivel := FLOOR((v_profile.xp + p_xp_gain) / 100) + 1;
        
        -- Atualizar perfil
        UPDATE public.profiles
        SET 
            xp = xp + p_xp_gain,
            nivel = v_new_nivel,
            questoes_respondidas = questoes_respondidas + 1,
            precisao_global = (
                (precisao_global * questoes_respondidas + CASE WHEN p_is_correct THEN 100 ELSE 0 END) 
                / (questoes_respondidas + 1)
            ),
            ultimo_acesso = CURRENT_DATE,
            updated_at = NOW()
        WHERE id = p_user_id;
        
        -- Atualizar streak
        IF v_profile.ultimo_acesso = CURRENT_DATE THEN
            -- Mesmo dia, não altera streak
            NULL;
        ELSIF v_profile.ultimo_acesso = CURRENT_DATE - 1 THEN
            -- Dia consecutivo, aumenta streak
            UPDATE public.profiles
            SET 
                streak_atual = streak_atual + 1,
                maior_streak = GREATEST(maior_streak, streak_atual + 1)
            WHERE id = p_user_id;
        ELSE
            -- Quebrou a sequência
            UPDATE public.profiles
            SET streak_atual = 1
            WHERE id = p_user_id;
        END IF;
    END IF;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- DADOS INICIAIS (SEED)
-- ============================================

-- Inserir Matérias Principais
INSERT INTO public.subjects (name) VALUES
    ('Português'),
    ('Matemática'),
    ('Informática'),
    ('Direito Administrativo'),
    ('Direito Constitucional'),
    ('Direito Civil'),
    ('Direito Penal'),
    ('Raciocínio Lógico'),
    ('Conhecimentos Gerais'),
    ('Legislação'),
    ('LGPD'),
    ('Governança de TI')
ON CONFLICT (name) DO NOTHING;

-- Criar Arquétipos
INSERT INTO public.archetypes (name, nivel, subjects_weights) VALUES
    (
        'Administrativo Nível Médio',
        'medio',
        '[
            {"subject": "Português", "weight": 30},
            {"subject": "Matemática", "weight": 20},
            {"subject": "Informática", "weight": 20},
            {"subject": "Direito Administrativo", "weight": 20},
            {"subject": "Raciocínio Lógico", "weight": 10}
        ]'
    ),
    (
        'Técnico em Informática',
        'medio',
        '[
            {"subject": "Informática", "weight": 40},
            {"subject": "LGPD", "weight": 20},
            {"subject": "Governança de TI", "weight": 20},
            {"subject": "Português", "weight": 15},
            {"subject": "Legislação", "weight": 5}
        ]'
    ),
    (
        'Analista de Sistemas',
        'superior',
        '[
            {"subject": "Informática", "weight": 45},
            {"subject": "LGPD", "weight": 20},
            {"subject": "Governança de TI", "weight": 20},
            {"subject": "Português", "weight": 10},
            {"subject": "Legislação", "weight": 5}
        ]'
    ),
    (
        'Área Jurídica',
        'superior',
        '[
            {"subject": "Direito Constitucional", "weight": 30},
            {"subject": "Direito Administrativo", "weight": 25},
            {"subject": "Direito Civil", "weight": 20},
            {"subject": "Direito Penal", "weight": 15},
            {"subject": "Português", "weight": 10}
        ]'
    )
ON CONFLICT (name) DO NOTHING;

-- Vincular alguns cargos aos arquétipos (amostra)
INSERT INTO public.job_roles (title, archetype_id, nivel) VALUES
    ('Agente Administrativo', 1, 'medio'),
    ('Assistente Administrativo', 1, 'medio'),
    ('Técnico de Informática', 2, 'medio'),
    ('Analista de Sistemas', 3, 'superior'),
    ('Advogado', 4, 'superior'),
    ('Procurador', 4, 'superior')
ON CONFLICT (title) DO NOTHING;

-- ============================================
-- POLÍTICAS DE SEGURANÇA (RLS)
-- ============================================

-- Habilitar RLS em todas as tabelas
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_question_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.study_sessions ENABLE ROW LEVEL SECURITY;

-- Políticas para profiles (usuários só veem seus próprios dados)
CREATE POLICY "Users can view own profile" ON public.profiles
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.profiles
    FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON public.profiles
    FOR INSERT WITH CHECK (auth.uid() = id);

-- Políticas para user_question_progress
CREATE POLICY "Users can view own progress" ON public.user_question_progress
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own progress" ON public.user_question_progress
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own progress" ON public.user_question_progress
    FOR UPDATE USING (auth.uid() = user_id);

-- Políticas para study_sessions
CREATE POLICY "Users can view own sessions" ON public.study_sessions
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own sessions" ON public.study_sessions
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Políticas públicas para leitura (todos podem ver)
CREATE POLICY "Anyone can view subjects" ON public.subjects
    FOR SELECT USING (true);

CREATE POLICY "Anyone can view archetypes" ON public.archetypes
    FOR SELECT USING (true);

CREATE POLICY "Anyone can view job_roles" ON public.job_roles
    FOR SELECT USING (true);

CREATE POLICY "Anyone can view questions" ON public.questions
    FOR SELECT USING (true);
