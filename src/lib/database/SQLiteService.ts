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
}

// Singleton
export const sqliteService = new SQLiteService();