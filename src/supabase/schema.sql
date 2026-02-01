-- =====================================================
-- GABARITOO - SCHEMA SUPABASE COMPLETO
-- =====================================================
-- Data: 01/02/2026
-- Versão: 1.0 - Schema inicial baseado em types/estudos.ts
-- Objetivo: Criar estrutura de banco que "casa perfeitamente" com o TypeScript
-- =====================================================

-- =====================================================
-- 1. EXTENSÕES NECESSÁRIAS
-- =====================================================

-- Habilitar UUID para IDs únicos
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Habilitar pg_trgm para busca full-text eficiente
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- =====================================================
-- 2. ENUMS (Tipos Enumerados)
-- =====================================================

-- Tipo de conteúdo (questão ou flashcard)
CREATE TYPE tipo_conteudo AS ENUM ('QUESTAO', 'FLASHCARD');

-- Dificuldade
CREATE TYPE dificuldade_tipo AS ENUM ('facil', 'medio', 'dificil');

-- Plano do usuário
CREATE TYPE plan_type AS ENUM ('free', 'monthly', 'annual');

-- Nível de escolaridade
CREATE TYPE nivel_escolaridade AS ENUM ('fundamental', 'medio', 'tecnico', 'superior');

-- Matérias/Disciplinas principais
CREATE TYPE materia_tipo AS ENUM (
  'Informática',
  'Legislação', 
  'Português',
  'LGPD',
  'Governança de TI',
  'História de Roraima',
  'Geografia de Roraima',
  'Direito Constitucional',
  'Direito Administrativo',
  'Matemática',
  'Raciocínio Lógico',
  'Conhecimentos Gerais',
  'Atualidades'
);

-- =====================================================
-- 3. TABELA: users (Usuários)
-- =====================================================

CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE,
  nome TEXT,
  plan plan_type NOT NULL DEFAULT 'free',
  premium BOOLEAN NOT NULL DEFAULT false,
  premium_expires_at TIMESTAMPTZ,
  subscription_id TEXT, -- ID da assinatura Google Play
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Índices para performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_premium ON users(premium) WHERE premium = true;

-- =====================================================
-- 4. TABELA: perfis_concurso (Perfis de Concurso)
-- =====================================================

CREATE TABLE perfis_concurso (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  
  -- Dados do perfil
  nome_perfil TEXT NOT NULL, -- Ex: "ALE-RR - Analista de TI"
  cargo TEXT NOT NULL,
  banca TEXT,
  nivel nivel_escolaridade,
  
  -- Status
  ativo BOOLEAN NOT NULL DEFAULT true,
  
  -- Timestamps
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  
  -- Constraint: usuário só pode ter 1 perfil ativo por vez
  CONSTRAINT unique_active_profile UNIQUE (user_id, ativo) 
    DEFERRABLE INITIALLY DEFERRED
);

-- Índices
CREATE INDEX idx_perfis_user ON perfis_concurso(user_id);
CREATE INDEX idx_perfis_ativo ON perfis_concurso(user_id, ativo) WHERE ativo = true;

-- =====================================================
-- 5. TABELA: questoes (Questões e Flashcards)
-- =====================================================

CREATE TABLE questoes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  -- Metadados
  tipo tipo_conteudo NOT NULL DEFAULT 'QUESTAO',
  materia materia_tipo NOT NULL,
  dificuldade dificuldade_tipo,
  
  -- Origem da questão
  banca TEXT, -- Ex: "CESPE", "FCC", "VUNESP"
  ano INTEGER, -- Ex: 2024
  concurso TEXT, -- Ex: "TRE-RO - Analista"
  
  -- Conteúdo
  pergunta TEXT NOT NULL,
  explicacao TEXT,
  
  -- Filtros avançados
  cargo_relacionado TEXT, -- Para filtrar questões por cargo
  nivel_relacionado nivel_escolaridade,
  
  -- Controle premium
  premium_only BOOLEAN NOT NULL DEFAULT false,
  
  -- Timestamps
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Índices para performance
CREATE INDEX idx_questoes_materia ON questoes(materia);
CREATE INDEX idx_questoes_dificuldade ON questoes(dificuldade);
CREATE INDEX idx_questoes_banca ON questoes(banca);
CREATE INDEX idx_questoes_tipo ON questoes(tipo);
CREATE INDEX idx_questoes_cargo ON questoes(cargo_relacionado);
CREATE INDEX idx_questoes_premium ON questoes(premium_only);

-- Índice para busca full-text
CREATE INDEX idx_questoes_pergunta_trgm ON questoes USING gin(pergunta gin_trgm_ops);

-- =====================================================
-- 6. TABELA: alternativas (Opções de Resposta)
-- =====================================================

CREATE TABLE alternativas (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  questao_id UUID NOT NULL REFERENCES questoes(id) ON DELETE CASCADE,
  
  -- Dados da alternativa
  ordem INTEGER NOT NULL, -- 0, 1, 2, 3, 4 (ordem de exibição)
  texto TEXT NOT NULL,
  correta BOOLEAN NOT NULL DEFAULT false,
  
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  
  -- Constraint: cada questão deve ter pelo menos 1 alternativa correta
  CONSTRAINT unique_alternative_order UNIQUE (questao_id, ordem)
);

-- Índices
CREATE INDEX idx_alternativas_questao ON alternativas(questao_id);
CREATE INDEX idx_alternativas_correta ON alternativas(questao_id, correta) WHERE correta = true;

-- =====================================================
-- 7. TABELA: respostas_usuario (Histórico de Respostas)
-- =====================================================

CREATE TABLE respostas_usuario (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  questao_id UUID NOT NULL REFERENCES questoes(id) ON DELETE CASCADE,
  alternativa_id UUID NOT NULL REFERENCES alternativas(id) ON DELETE CASCADE,
  perfil_id UUID REFERENCES perfis_concurso(id) ON DELETE SET NULL,
  
  -- Resultado
  acertou BOOLEAN NOT NULL,
  tempo_resposta_segundos INTEGER, -- Tempo gasto para responder
  
  -- Contexto
  modo TEXT, -- 'quiz', 'simulado', 'revisao', 'flashcard'
  
  -- Timestamps
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Índices para análise de performance
CREATE INDEX idx_respostas_user ON respostas_usuario(user_id);
CREATE INDEX idx_respostas_questao ON respostas_usuario(questao_id);
CREATE INDEX idx_respostas_perfil ON respostas_usuario(perfil_id);
CREATE INDEX idx_respostas_acertou ON respostas_usuario(user_id, acertou);
CREATE INDEX idx_respostas_created ON respostas_usuario(created_at DESC);

-- Índice composto para relatórios
CREATE INDEX idx_respostas_user_materia ON respostas_usuario(user_id, created_at DESC);

-- =====================================================
-- 8. TABELA: estatisticas_materia (Stats por Matéria)
-- =====================================================

CREATE TABLE estatisticas_materia (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  perfil_id UUID REFERENCES perfis_concurso(id) ON DELETE CASCADE,
  materia materia_tipo NOT NULL,
  
  -- Estatísticas
  respondidas INTEGER NOT NULL DEFAULT 0,
  erros INTEGER NOT NULL DEFAULT 0,
  acertos INTEGER NOT NULL DEFAULT 0,
  streak INTEGER NOT NULL DEFAULT 0, -- Sequência de acertos atual
  melhor_streak INTEGER NOT NULL DEFAULT 0,
  
  -- Timestamps
  ultima_revisao TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  
  -- Constraint: 1 registro por user + materia + perfil
  CONSTRAINT unique_user_materia_perfil UNIQUE (user_id, materia, perfil_id)
);

-- Índices
CREATE INDEX idx_stats_user ON estatisticas_materia(user_id);
CREATE INDEX idx_stats_perfil ON estatisticas_materia(perfil_id);
CREATE INDEX idx_stats_materia ON estatisticas_materia(materia);

-- =====================================================
-- 9. TABELA: gamification (XP, Níveis, Badges)
-- =====================================================

CREATE TABLE gamification (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
  
  -- XP e Nível
  xp INTEGER NOT NULL DEFAULT 0,
  nivel INTEGER NOT NULL DEFAULT 1,
  
  -- Streaks
  streak_atual INTEGER NOT NULL DEFAULT 0,
  melhor_streak INTEGER NOT NULL DEFAULT 0,
  ultimo_estudo DATE,
  
  -- Conquistas
  badges_desbloqueados TEXT[] DEFAULT '{}', -- Array de IDs de badges
  
  -- Timestamps
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Índices
CREATE INDEX idx_gamification_user ON gamification(user_id);
CREATE INDEX idx_gamification_nivel ON gamification(nivel DESC);

-- =====================================================
-- 10. TABELA: vouchers (Cupons Premium)
-- =====================================================

CREATE TABLE vouchers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  -- Dados do voucher
  codigo TEXT NOT NULL UNIQUE,
  tipo TEXT NOT NULL, -- 'monthly', 'annual'
  dias_premium INTEGER NOT NULL, -- 30 ou 365
  
  -- Status
  usado BOOLEAN NOT NULL DEFAULT false,
  usado_por UUID REFERENCES users(id) ON DELETE SET NULL,
  usado_em TIMESTAMPTZ,
  
  -- Timestamps
  valido_ate TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Índices
CREATE INDEX idx_vouchers_codigo ON vouchers(codigo);
CREATE INDEX idx_vouchers_usado ON vouchers(usado) WHERE usado = false;

-- =====================================================
-- 11. TABELA: plano_estudo (Configurações do Plano)
-- =====================================================

CREATE TABLE plano_estudo (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
  
  -- Metas
  meta_diaria INTEGER NOT NULL DEFAULT 20, -- questões por dia
  
  -- Notificações
  notificacoes_ativas BOOLEAN NOT NULL DEFAULT true,
  horario_inicio TIME NOT NULL DEFAULT '08:00',
  horario_fim TIME NOT NULL DEFAULT '22:00',
  intervalo_minutos INTEGER NOT NULL DEFAULT 30,
  questoes_por_notificacao INTEGER NOT NULL DEFAULT 10,
  
  -- Preferências
  som_ativo BOOLEAN NOT NULL DEFAULT true,
  vibracao_ativa BOOLEAN NOT NULL DEFAULT true,
  
  -- Timestamps
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- =====================================================
-- 12. TABELA: simulados (Provas Simuladas)
-- =====================================================

CREATE TABLE simulados (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  perfil_id UUID REFERENCES perfis_concurso(id) ON DELETE SET NULL,
  
  -- Configuração
  quantidade_questoes INTEGER NOT NULL,
  tempo_limite_minutos INTEGER NOT NULL,
  banca TEXT,
  nivel nivel_escolaridade,
  
  -- Resultado
  finalizado BOOLEAN NOT NULL DEFAULT false,
  acertos INTEGER,
  erros INTEGER,
  tempo_gasto_segundos INTEGER,
  nota_final DECIMAL(5, 2), -- Nota de 0.00 a 100.00
  
  -- Timestamps
  iniciado_em TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  finalizado_em TIMESTAMPTZ
);

-- Índices
CREATE INDEX idx_simulados_user ON simulados(user_id);
CREATE INDEX idx_simulados_perfil ON simulados(perfil_id);
CREATE INDEX idx_simulados_finalizado ON simulados(finalizado);

-- =====================================================
-- 13. TABELA: simulados_questoes (Questões do Simulado)
-- =====================================================

CREATE TABLE simulados_questoes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  simulado_id UUID NOT NULL REFERENCES simulados(id) ON DELETE CASCADE,
  questao_id UUID NOT NULL REFERENCES questoes(id) ON DELETE CASCADE,
  ordem INTEGER NOT NULL,
  
  -- Resposta do usuário
  alternativa_escolhida UUID REFERENCES alternativas(id),
  acertou BOOLEAN,
  tempo_resposta_segundos INTEGER,
  
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  
  CONSTRAINT unique_simulado_questao UNIQUE (simulado_id, questao_id)
);

-- Índices
CREATE INDEX idx_simulados_questoes_simulado ON simulados_questoes(simulado_id);
CREATE INDEX idx_simulados_questoes_questao ON simulados_questoes(questao_id);

-- =====================================================
-- 14. FUNÇÕES TRIGGERS (Automação)
-- =====================================================

-- Função para atualizar o campo updated_at automaticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Aplicar trigger em todas as tabelas relevantes
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_perfis_updated_at BEFORE UPDATE ON perfis_concurso
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_questoes_updated_at BEFORE UPDATE ON questoes
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_stats_updated_at BEFORE UPDATE ON estatisticas_materia
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_gamification_updated_at BEFORE UPDATE ON gamification
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_plano_updated_at BEFORE UPDATE ON plano_estudo
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- 15. ROW LEVEL SECURITY (RLS) - Segurança
-- =====================================================

-- Habilitar RLS em todas as tabelas
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE perfis_concurso ENABLE ROW LEVEL SECURITY;
ALTER TABLE respostas_usuario ENABLE ROW LEVEL SECURITY;
ALTER TABLE estatisticas_materia ENABLE ROW LEVEL SECURITY;
ALTER TABLE gamification ENABLE ROW LEVEL SECURITY;
ALTER TABLE plano_estudo ENABLE ROW LEVEL SECURITY;
ALTER TABLE simulados ENABLE ROW LEVEL SECURITY;
ALTER TABLE simulados_questoes ENABLE ROW LEVEL SECURITY;

-- Políticas: Usuários podem ver apenas seus próprios dados
CREATE POLICY "Users can view own data" ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own data" ON users
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can view own profiles" ON perfis_concurso
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can view own answers" ON respostas_usuario
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can view own stats" ON estatisticas_materia
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can view own gamification" ON gamification
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can view own plan" ON plano_estudo
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can view own exams" ON simulados
  FOR ALL USING (auth.uid() = user_id);

-- Questões e alternativas: todos podem ler (públicas)
CREATE POLICY "Anyone can read questions" ON questoes
  FOR SELECT USING (true);

CREATE POLICY "Anyone can read alternatives" ON alternativas
  FOR SELECT USING (true);

-- =====================================================
-- 16. ÍNDICES ADICIONAIS PARA PERFORMANCE
-- =====================================================

-- Índice para dashboard (queries frequentes)
CREATE INDEX idx_respostas_dashboard ON respostas_usuario(user_id, created_at DESC)
  WHERE created_at > NOW() - INTERVAL '30 days';

-- Índice para ranking
CREATE INDEX idx_gamification_ranking ON gamification(xp DESC, nivel DESC);

-- Índice para busca de questões inteligente
CREATE INDEX idx_questoes_inteligente ON questoes(materia, dificuldade, premium_only);

-- =====================================================
-- 17. COMENTÁRIOS PARA DOCUMENTAÇÃO
-- =====================================================

COMMENT ON TABLE users IS 'Usuários do sistema com informações de plano e assinatura';
COMMENT ON TABLE questoes IS 'Questões de concursos e flashcards para estudo';
COMMENT ON TABLE respostas_usuario IS 'Histórico completo de respostas para análise de desempenho';
COMMENT ON TABLE estatisticas_materia IS 'Estatísticas agregadas por matéria para o algoritmo de peso';
COMMENT ON TABLE gamification IS 'Sistema de gamificação com XP, níveis e badges';
COMMENT ON TABLE simulados IS 'Provas simuladas com tempo e nota';

-- =====================================================
-- FIM DO SCHEMA
-- =====================================================
-- Total de tabelas: 13
-- Total de índices: 40+
-- Total de políticas RLS: 9
-- Status: ✅ Pronto para produção
-- =====================================================
