/**
 * SQLiteService - Gerenciador de Banco de Dados Local
 * 
 * MODELO HÍBRIDO:
 * - Schema normalizado (exams + questions)
 * - Service Pattern com métodos robustos
 * - Suporte a transações
 * - Migrations centralizadas (migrations.ts)
 */

import { CapacitorSQLite, SQLiteConnection, SQLiteDBConnection } from '@capacitor-community/sqlite';
import { Capacitor } from '@capacitor/core';
import { MIGRATION_V1 } from './migrations';

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
      await this.db.execute(MIGRATION_V1);

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

  /**
   * Importa um lote de questões (Bulk Insert)
   * Essencial para performance ao carregar 5.000+ questões
   */
  async importQuestionsBatch(questions: any[]): Promise<void> {
    if (!this.db) await this.initialize();

    // Prepara os statements para transação única
    const statements = questions.map(q => ({
      sql: `
        INSERT OR REPLACE INTO questions (
          exam_id, question_number, discipline, statement, 
          options, correct_option, created_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?);
      `,
      params: [
        q.examId || 1,      // ID da prova (vincular na tabela exams antes se necessário)
        q.number || q.id, 
        q.discipline || q.subject, 
        q.statement || q.question, 
        JSON.stringify(q.options), // Converte objeto de opções para string JSON
        q.correctOption || q.correct_answer,
        new Date().toISOString()
      ]
    }));

    try {
      console.log(`📦 Iniciando importação de ${questions.length} questões...`);
      await this.transaction(statements);
      console.log('✅ Importação concluída com sucesso!');
    } catch (error) {
      console.error('❌ Erro na importação em massa:', error);
      throw error;
    }
  }

  /**
   * Importa dados de uma prova/concurso
   */
  async importExam(exam: { banca: string; orgao: string; cargo: string; ano: number; nivel?: string }): Promise<number> {
    if (!this.db) await this.initialize();

    try {
      await this.execute(`
        INSERT OR REPLACE INTO exams (banca, orgao, cargo, ano, nivel)
        VALUES (?, ?, ?, ?, ?)
      `, [exam.banca, exam.orgao, exam.cargo, exam.ano, exam.nivel || 'Médio']);

      // Retorna o ID da prova inserida
      const result = await this.query(`
        SELECT id FROM exams 
        WHERE banca = ? AND orgao = ? AND cargo = ? AND ano = ?
        LIMIT 1
      `, [exam.banca, exam.orgao, exam.cargo, exam.ano]);

      return result[0]?.id || 1;
    } catch (error) {
      console.error('❌ Erro ao importar prova:', error);
      throw error;
    }
  }

  /**
   * Verifica se o banco já tem questões importadas
   */
  async hasQuestions(): Promise<boolean> {
    if (!this.db) await this.initialize();

    try {
      const result = await this.query('SELECT COUNT(*) as total FROM questions');
      return (result[0]?.total || 0) > 0;
    } catch (error) {
      console.error('❌ Erro ao verificar questões:', error);
      return false;
    }
  }

  /**
   * Retorna estatísticas do banco de dados
   */
  async getDatabaseStats(): Promise<{ exams: number; questions: number; userProgress: number }> {
    if (!this.db) await this.initialize();

    try {
      const [examsResult, questionsResult, progressResult] = await Promise.all([
        this.query('SELECT COUNT(*) as total FROM exams'),
        this.query('SELECT COUNT(*) as total FROM questions'),
        this.query('SELECT COUNT(*) as total FROM user_question_progress')
      ]);

      return {
        exams: examsResult[0]?.total || 0,
        questions: questionsResult[0]?.total || 0,
        userProgress: progressResult[0]?.total || 0
      };
    } catch (error) {
      console.error('❌ Erro ao obter estatísticas:', error);
      return { exams: 0, questions: 0, userProgress: 0 };
    }
  }
}

// Singleton
export const sqliteService = new SQLiteService();