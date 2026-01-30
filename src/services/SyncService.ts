/**
 * SyncService - Sincronização com Servidor
 * 
 * Responsável por:
 * - Fazer fetch das questões do servidor
 * - Importar para o SQLite local
 * - Gerenciar estado de sincronização
 * 
 * Criado conforme Auditoria 2.1 (10/01/2026)
 */

import { sqliteService } from '../lib/database/SQLiteService';

interface SyncStatus {
  isSyncing: boolean;
  lastSyncDate: string | null;
  totalQuestions: number;
  error: string | null;
}

class SyncService {
  private readonly SYNC_KEY = 'gabaritoo_last_sync';
  private readonly SERVER_URL = 'https://seu-servidor.com/api'; // TODO: Atualizar com URL real

  /**
   * Retorna o status atual da sincronização
   */
  getSyncStatus(): SyncStatus {
    try {
      const lastSync = localStorage.getItem(this.SYNC_KEY);
      
      return {
        isSyncing: false,
        lastSyncDate: lastSync,
        totalQuestions: 0,
        error: null
      };
    } catch (error) {
      return {
        isSyncing: false,
        lastSyncDate: null,
        totalQuestions: 0,
        error: 'Erro ao recuperar status'
      };
    }
  }

  /**
   * Sincroniza questões do servidor para o SQLite
   */
  async syncQuestions(): Promise<{ success: boolean; message: string; total: number }> {
    try {
      console.log('🔄 Iniciando sincronização com servidor...');

      // 1. Verificar se já tem questões no banco
      const hasQuestions = await sqliteService.hasQuestions();
      
      if (hasQuestions) {
        console.log('ℹ️ Banco já possui questões. Pulando sincronização.');
        const stats = await sqliteService.getDatabaseStats();
        
        return {
          success: true,
          message: 'Questões já importadas',
          total: stats.questions
        };
      }

      // 2. Buscar questões do servidor
      const questions = await this.fetchQuestionsFromServer();
      
      if (!questions || questions.length === 0) {
        throw new Error('Nenhuma questão retornada pelo servidor');
      }

      // 3. Importar prova base (se necessário)
      const examId = await sqliteService.importExam({
        banca: 'CESPE',
        orgao: 'TRE-RO',
        cargo: 'Técnico Judiciário',
        ano: 2024,
        nivel: 'Médio'
      });

      // 4. Adicionar examId a todas as questões
      const questionsWithExam = questions.map(q => ({
        ...q,
        examId
      }));

      // 5. Importar questões em lote
      await sqliteService.importQuestionsBatch(questionsWithExam);

      // 6. Salvar timestamp da sincronização
      localStorage.setItem(this.SYNC_KEY, new Date().toISOString());

      console.log('✅ Sincronização concluída com sucesso!');

      return {
        success: true,
        message: 'Sincronização concluída',
        total: questions.length
      };

    } catch (error) {
      console.error('❌ Erro na sincronização:', error);
      
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Erro desconhecido',
        total: 0
      };
    }
  }

  /**
   * Busca questões do servidor
   * 
   * OPÇÕES DE IMPLEMENTAÇÃO:
   * 
   * 1. Servidor próprio (API REST):
   *    - GET https://seu-servidor.com/api/questions
   * 
   * 2. Arquivo JSON estático (mais simples para começar):
   *    - fetch('/data/questions.json')
   * 
   * 3. GitHub Pages (grátis):
   *    - https://seu-usuario.github.io/gabaritoo-data/questions.json
   */
  private async fetchQuestionsFromServer(): Promise<any[]> {
    try {
      // OPÇÃO 1: Servidor próprio (descomente quando tiver o servidor)
      // const response = await fetch(`${this.SERVER_URL}/questions`);
      
      // OPÇÃO 2: Arquivo JSON local (funciona agora)
      const response = await fetch('/data/questions.json');
      
      if (!response.ok) {
        throw new Error(`Erro HTTP: ${response.status}`);
      }

      const data = await response.json();
      
      // Validar formato dos dados
      if (!Array.isArray(data)) {
        throw new Error('Formato de dados inválido: esperado array');
      }

      console.log(`📦 ${data.length} questões recebidas do servidor`);
      
      return data;

    } catch (error) {
      console.error('❌ Erro ao buscar questões:', error);
      
      // Fallback: usar questões locais se o fetch falhar
      console.log('⚠️ Tentando usar questões locais...');
      return this.loadLocalQuestions();
    }
  }

  /**
   * Carrega questões do arquivo local (fallback)
   */
  private async loadLocalQuestions(): Promise<any[]> {
    try {
      // Importa as questões do arquivo de dados local
      const { questions } = await import('../data/seedQuestions');
      
      console.log(`📦 ${questions.length} questões carregadas localmente`);
      
      return questions;
    } catch (error) {
      console.error('❌ Erro ao carregar questões locais:', error);
      return [];
    }
  }

  /**
   * Força uma nova sincronização (apaga cache e redownload)
   */
  async forceSync(): Promise<{ success: boolean; message: string; total: number }> {
    try {
      console.log('🔄 Forçando nova sincronização...');
      
      // Limpa cache de sincronização
      localStorage.removeItem(this.SYNC_KEY);
      
      // Apaga questões antigas (opcional - comentado por segurança)
      // await sqliteService.execute('DELETE FROM questions');
      
      // Executa sincronização normal
      return await this.syncQuestions();
      
    } catch (error) {
      console.error('❌ Erro ao forçar sincronização:', error);
      
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Erro desconhecido',
        total: 0
      };
    }
  }

  /**
   * Verifica se é necessário sincronizar
   */
  needsSync(): boolean {
    const lastSync = localStorage.getItem(this.SYNC_KEY);
    
    if (!lastSync) {
      return true;
    }

    // Sincroniza se passou mais de 7 dias
    const lastSyncDate = new Date(lastSync);
    const daysSinceSync = (Date.now() - lastSyncDate.getTime()) / (1000 * 60 * 60 * 24);
    
    return daysSinceSync > 7;
  }

  /**
   * Sincronização automática inteligente
   * Chama isso no boot do app
   */
  async autoSync(): Promise<void> {
    try {
      // Verifica se tem questões
      const hasQuestions = await sqliteService.hasQuestions();
      
      if (!hasQuestions) {
        console.log('🔄 Primeira execução: sincronizando questões...');
        await this.syncQuestions();
        return;
      }

      // Verifica se precisa atualizar
      if (this.needsSync()) {
        console.log('🔄 Sincronizando atualizações...');
        await this.syncQuestions();
      } else {
        console.log('✅ Questões já atualizadas');
      }
      
    } catch (error) {
      console.error('⚠️ Erro na sincronização automática:', error);
      // Não bloqueia o app se falhar
    }
  }

  /**
   * Retorna estatísticas do banco local
   */
  async getLocalStats() {
    return await sqliteService.getDatabaseStats();
  }
}

// Singleton
export const syncService = new SyncService();
