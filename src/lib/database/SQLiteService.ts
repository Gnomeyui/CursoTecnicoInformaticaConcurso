/**
 * SQLiteService - Gerenciador de Banco de Dados Local
 * 
 * MODELO HÍBRIDO:
 * - Schema normalizado (exams + questions)
 * - Service Pattern com métodos robustos
 * - Suporte a transações
 */

import { CapacitorSQLite, SQLiteConnection, SQLiteDBConnection } from '@capacitor-community/sqlite';
import { Capacitor } from '@capacitor/core';

class SQLiteService {
  private sqlite: SQLiteConnection;
  private db: SQLiteDBConnection | null = null;
  private isInitialized = false;

  constructor() {
    this.sqlite = new SQLiteConnection(CapacitorSQLite);
  }

  /**
   * Inicializa o banco de dados
   */
  async initialize(): Promise<void> {
    if (this.isInitialized) return;

    try {
      console.log('🔄 Inicializando SQLite...');

      // Configuração para Web
      if (Capacitor.getPlatform() === 'web') {
        const jeepSqliteEl = document.querySelector('jeep-sqlite');
        if (!jeepSqliteEl) {
          const jeep = document.createElement('jeep-sqlite');
          document.body.appendChild(jeep);
          await customElements.whenDefined('jeep-sqlite');
        }
        await this.sqlite.initWebStore();
      }

      // Criar/Abrir banco
      this.db = await this.sqlite.createConnection(
        'gabaritoo_db',
        false,
        'no-encryption',
        1,
        false
      );

      await this.db.open();
      await this.runMigrations();

      this.isInitialized = true;
      console.log('✅ SQLite inicializado com sucesso');

    } catch (error) {
      console.error('❌ Erro ao inicializar SQLite:', error);
      throw error;
    }
  }

  /**
   * Executa as migrations (criação de tabelas)
   */
  private async runMigrations(): Promise<void> {
    if (!this.db) throw new Error('Banco não inicializado');

    console.log('🔄 Executando migrations...');

    try {
      // Migration 1: Criar tabelas principais
      await this.db.execute(`
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
      `);

      console.log('✅ Migrations executadas com sucesso');

    } catch (error) {
      console.error('❌ Erro ao executar migrations:', error);
      throw error;
    }
  }

  /**
   * Executa uma query SELECT
   */
  async query(sql: string, params?: any[]): Promise<any[]> {
    if (!this.db) await this.initialize();

    try {
      const result = await this.db!.query(sql, params);
      return result.values || [];
    } catch (error) {
      console.error('❌ Erro ao executar query:', error);
      throw error;
    }
  }

  /**
   * Executa um comando (INSERT, UPDATE, DELETE)
   */
  async execute(sql: string, params?: any[]): Promise<void> {
    if (!this.db) await this.initialize();

    try {
      await this.db!.run(sql, params);
    } catch (error) {
      console.error('❌ Erro ao executar comando:', error);
      throw error;
    }
  }

  /**
   * Executa múltiplos comandos em uma transação
   */
  async transaction(statements: Array<{ sql: string; params?: any[] }>): Promise<void> {
    if (!this.db) await this.initialize();

    try {
      await this.db!.execute('BEGIN TRANSACTION');

      for (const { sql, params } of statements) {
        await this.db!.run(sql, params);
      }

      await this.db!.execute('COMMIT');
    } catch (error) {
      await this.db!.execute('ROLLBACK');
      console.error('❌ Erro na transação:', error);
      throw error;
    }
  }

  /**
   * Fecha o banco de dados
   */
  async close(): Promise<void> {
    if (this.db) {
      await this.db.close();
      this.db = null;
      this.isInitialized = false;
    }
  }
}

// Singleton
export const sqliteService = new SQLiteService();
