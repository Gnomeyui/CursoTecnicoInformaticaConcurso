/**
 * SQL Migrations - Schemas do Banco de Dados
 * 
 * Centraliza todos os scripts SQL para facilitar manutenção e legibilidade.
 * Seguindo boas práticas identificadas na Auditoria 2.0 (09/01/2026)
 */

export const MIGRATION_V1 = `
  -- ====================================
  -- MIGRATION V1: Tabelas Principais
  -- ====================================

  -- Tabela de Provas/Concursos
  CREATE TABLE IF NOT EXISTS exams (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    banca TEXT NOT NULL,
    orgao TEXT NOT NULL,
    cargo TEXT NOT NULL,
    ano INTEGER NOT NULL,
    nivel TEXT,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
  );

  -- Índices para exams
  CREATE INDEX IF NOT EXISTS idx_exams_banca ON exams(banca);
  CREATE INDEX IF NOT EXISTS idx_exams_ano ON exams(ano);
  CREATE INDEX IF NOT EXISTS idx_exams_cargo ON exams(cargo);

  -- Tabela de Questões
  CREATE TABLE IF NOT EXISTS questions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    exam_id INTEGER NOT NULL,
    question_number INTEGER NOT NULL,
    discipline TEXT NOT NULL,
    statement TEXT NOT NULL,
    options TEXT NOT NULL,
    correct_option TEXT NOT NULL,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (exam_id) REFERENCES exams(id) ON DELETE CASCADE
  );

  -- Índices para questions
  CREATE INDEX IF NOT EXISTS idx_questions_exam ON questions(exam_id);
  CREATE INDEX IF NOT EXISTS idx_questions_discipline ON questions(discipline);
  CREATE INDEX IF NOT EXISTS idx_questions_number ON questions(exam_id, question_number);

  -- Tabela de Progresso do Usuário
  CREATE TABLE IF NOT EXISTS user_question_progress (
    user_id TEXT NOT NULL,
    question_id INTEGER NOT NULL,
    times_viewed INTEGER DEFAULT 0,
    times_correct INTEGER DEFAULT 0,
    times_wrong_total INTEGER DEFAULT 0,
    is_mastered INTEGER DEFAULT 0,
    is_critical INTEGER DEFAULT 0,
    last_answered_at TEXT DEFAULT CURRENT_TIMESTAMP,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, question_id),
    FOREIGN KEY (question_id) REFERENCES questions(id) ON DELETE CASCADE
  );

  -- Índices para progresso
  CREATE INDEX IF NOT EXISTS idx_progress_user ON user_question_progress(user_id);
  CREATE INDEX IF NOT EXISTS idx_progress_mastered ON user_question_progress(user_id, is_mastered);
  CREATE INDEX IF NOT EXISTS idx_progress_critical ON user_question_progress(user_id, is_critical);

  -- Tabela de Perfil do Usuário
  CREATE TABLE IF NOT EXISTS user_profile (
    user_id TEXT PRIMARY KEY,
    xp INTEGER DEFAULT 0,
    level INTEGER DEFAULT 1,
    badges TEXT,
    streak INTEGER DEFAULT 0,
    last_activity_date TEXT,
    total_questions_answered INTEGER DEFAULT 0,
    correct_answers INTEGER DEFAULT 0,
    simulated_exams_completed INTEGER DEFAULT 0,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT DEFAULT CURRENT_TIMESTAMP
  );

  -- Tabela de Flashcards
  CREATE TABLE IF NOT EXISTS flashcards (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    topico TEXT NOT NULL,
    frente TEXT NOT NULL,
    verso TEXT NOT NULL,
    dificuldade TEXT CHECK (dificuldade IN ('Fácil', 'Média', 'Difícil')),
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT DEFAULT CURRENT_TIMESTAMP
  );

  -- Índice para flashcards
  CREATE INDEX IF NOT EXISTS idx_flashcards_topico ON flashcards(topico);

  -- Tabela de Sincronização (controle de versão)
  CREATE TABLE IF NOT EXISTS sync_metadata (
    key TEXT PRIMARY KEY,
    value TEXT NOT NULL,
    updated_at TEXT DEFAULT CURRENT_TIMESTAMP
  );

  -- Criar perfil padrão se não existir
  INSERT OR IGNORE INTO user_profile (user_id, xp, level, streak) 
  VALUES ('local_user', 0, 1, 0);
`;

/**
 * Lista de todas as migrations na ordem correta
 */
export const ALL_MIGRATIONS = [
  MIGRATION_V1
  // Adicione futuras migrations aqui: MIGRATION_V2, MIGRATION_V3...
];
