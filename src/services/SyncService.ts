/**
 * ========================================
 * SYNC SERVICE - ARQUITETURA OFFLINE-FIRST
 * ========================================
 * 
 * RESPONSABILIDADE:
 * - Baixar pacotes de questões do servidor por perfil
 * - Importar questões para SQLite local
 * - Gerenciar sincronização inteligente
 * - Controlar cache e atualizações
 * 
 * ARQUITETURA:
 * ========================================
 * 
 * FLUXO:
 * 1. Usuário escolhe perfil (Técnico + CESPE)
 * 2. App baixa: https://servidor.com/downloads/cespe/tecnico.json
 * 3. JSON contém ~2.000 questões filtradas para aquele perfil
 * 4. Importa tudo para SQLite local
 * 5. App funciona 100% offline a partir daqui
 * 
 * CUSTO ZERO:
 * - Usuário baixa 1x (500KB-2MB JSON)
 * - App lê do SQLite local (grátis, instantâneo)
 * - Servidor: CDN estático (GitHub Pages, Cloudflare R2, etc)
 * 
 * FORMATO DO JSON:
 * ========================================
 * {
 *   "metadata": {
 *     "perfil": "Técnico Judiciário",
 *     "banca": "CESPE",
 *     "versao": "2024-01-15",
 *     "total": 2000
 *   },
 *   "questoes": [
 *     {
 *       "id": "q_001",
 *       "materia": "Informática",
 *       "dificuldade": "medio",
 *       "pergunta": "Qual comando Linux...",
 *       "opcoes": ["rm -rf", "ls -la", "mkdir", "cd .."],
 *       "correta": 1,
 *       "explicacao": "O comando ls -la..."
 *     }
 *   ]
 * }
 */

import { sqliteService } from '../lib/database/SQLiteService';
import { toast } from 'sonner@2.0.3';

// ========================================
// CONFIGURAÇÃO DO SERVIDOR
// ========================================

/**
 * URL base do servidor de downloads
 * 
 * OPÇÕES:
 * 1. GitHub Pages (GRÁTIS): 
 *    - https://seu-usuario.github.io/gabaritoo-data
 * 
 * 2. Cloudflare R2 (GRÁTIS até 10GB/mês):
 *    - https://pub-xxxxx.r2.dev
 * 
 * 3. Servidor próprio:
 *    - https://api.gabaritoo.com/downloads
 * 
 * 4. Firebase Storage (GRÁTIS até 5GB):
 *    - https://firebasestorage.googleapis.com/v0/b/gabaritoo/o
 */
const SERVER_URL = 'https://seu-usuario.github.io/gabaritoo-data/downloads';

// ========================================
// TIPOS
// ========================================

interface PacoteMetadata {
  perfil: string;
  banca: string;
  cargo: string;
  nivel: string;
  versao: string;
  total: number;
}

interface Questao {
  id: string;
  materia: string;
  dificuldade: 'facil' | 'medio' | 'dificil';
  pergunta: string;
  opcoes: string[];
  correta: number; // Índice da opção correta (0-3)
  explicacao?: string;
  banca?: string;
  ano?: number;
}

interface PacoteQuestoes {
  metadata: PacoteMetadata;
  questoes: Questao[];
}

interface SyncStatus {
  perfilAtual: string | null;
  ultimaSync: string | null;
  totalQuestoes: number;
  versaoAtual: string | null;
  sincronizando: boolean;
}

// ========================================
// SYNC SERVICE CLASS
// ========================================

class SyncService {
  private readonly SYNC_KEY = 'gabaritoo_sync_status';

  // ========================================
  // STATUS DA SINCRONIZAÇÃO
  // ========================================

  /**
   * Retorna o status atual da sincronização
   */
  getStatus(): SyncStatus {
    try {
      const stored = localStorage.getItem(this.SYNC_KEY);
      
      if (stored) {
        return JSON.parse(stored);
      }

      return this.getDefaultStatus();
    } catch (error) {
      console.error('Erro ao carregar status:', error);
      return this.getDefaultStatus();
    }
  }

  /**
   * Status padrão (primeira execução)
   */
  private getDefaultStatus(): SyncStatus {
    return {
      perfilAtual: null,
      ultimaSync: null,
      totalQuestoes: 0,
      versaoAtual: null,
      sincronizando: false,
    };
  }

  /**
   * Salva status no localStorage
   */
  private saveStatus(status: Partial<SyncStatus>): void {
    const current = this.getStatus();
    const updated = { ...current, ...status };
    localStorage.setItem(this.SYNC_KEY, JSON.stringify(updated));
  }

  // ========================================
  // DOWNLOAD E IMPORTAÇÃO
  // ========================================

  /**
   * Baixa e importa pacote de questões para um perfil específico
   * 
   * EXEMPLO:
   * await syncService.baixarPacote({
   *   cargo: 'Técnico Judiciário',
   *   banca: 'CESPE',
   *   nivel: 'Médio'
   * });
   * 
   * ARQUIVO BAIXADO:
   * https://servidor.com/downloads/cespe/tecnico-medio.json
   * 
   * @param perfil - Dados do perfil (cargo, banca, nível)
   * @returns Promise<boolean> - true se sucesso
   */
  async baixarPacote(perfil: {
    cargo: string;
    banca: string;
    nivel: string;
  }): Promise<boolean> {
    try {
      // 1. Marcar como sincronizando
      this.saveStatus({ sincronizando: true });
      toast.loading('Baixando questões...', { id: 'sync' });

      // 2. Montar URL do pacote
      const url = this.buildPackageUrl(perfil);
      console.log('📥 Baixando pacote:', url);

      // 3. Fazer download
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`Pacote não encontrado: ${response.status}`);
      }

      const pacote: PacoteQuestoes = await response.json();

      // 4. Validar pacote
      this.validatePackage(pacote);

      toast.loading(`Importando ${pacote.questoes.length} questões...`, { id: 'sync' });

      // 5. Limpar questões antigas (evitar duplicatas)
      console.log('🗑️ Limpando banco local...');
      await sqliteService.execute('DELETE FROM questions');

      // 6. Criar/atualizar registro da prova
      const examId = await sqliteService.importExam({
        banca: perfil.banca,
        orgao: pacote.metadata.perfil,
        cargo: perfil.cargo,
        ano: new Date().getFullYear(),
        nivel: perfil.nivel,
      });

      // 7. Preparar questões para importação
      const questoesFormatadas = pacote.questoes.map((q, index) => ({
        examId,
        id: q.id,
        number: index + 1,
        discipline: q.materia,
        statement: q.pergunta,
        options: q.opcoes,
        correctOption: String.fromCharCode(97 + q.correta), // 0->a, 1->b, 2->c, 3->d
        difficulty: q.dificuldade,
        explanation: q.explicacao,
      }));

      // 8. Importar em lote (transação única - muito rápido!)
      console.log('💾 Importando para SQLite...');
      console.time('⏱️ Tempo de importação');
      
      await sqliteService.importQuestionsBatch(questoesFormatadas);
      
      console.timeEnd('⏱️ Tempo de importação');

      // 9. Salvar status
      this.saveStatus({
        perfilAtual: `${perfil.cargo} - ${perfil.banca}`,
        ultimaSync: new Date().toISOString(),
        totalQuestoes: pacote.questoes.length,
        versaoAtual: pacote.metadata.versao,
        sincronizando: false,
      });

      toast.success(`${pacote.questoes.length} questões importadas! 🎉`, { id: 'sync' });
      
      return true;

    } catch (error) {
      console.error('❌ Erro ao baixar pacote:', error);
      
      this.saveStatus({ sincronizando: false });
      
      toast.error(
        error instanceof Error 
          ? `Erro: ${error.message}` 
          : 'Erro ao baixar questões. Verifique sua conexão.',
        { id: 'sync' }
      );
      
      return false;
    }
  }

  /**
   * Monta URL do pacote baseado no perfil
   * 
   * FORMATO:
   * - Técnico + CESPE → cespe/tecnico-medio.json
   * - Analista + FCC → fcc/analista-superior.json
   * 
   * @param perfil - Dados do perfil
   * @returns URL completa do pacote
   */
  private buildPackageUrl(perfil: {
    cargo: string;
    banca: string;
    nivel: string;
  }): string {
    // Normalizar strings (lowercase, remover acentos, espaços)
    const banca = this.normalizeString(perfil.banca);
    const cargo = this.normalizeString(perfil.cargo);
    const nivel = this.normalizeString(perfil.nivel);

    // Construir nome do arquivo
    const filename = `${cargo}-${nivel}.json`;

    // URL completa
    return `${SERVER_URL}/${banca}/${filename}`;
  }

  /**
   * Normaliza string para usar em URLs
   * 
   * EXEMPLO:
   * "Técnico Judiciário" → "tecnico-judiciario"
   */
  private normalizeString(str: string): string {
    return str
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // Remove acentos
      .replace(/\s+/g, '-') // Substitui espaços por hífens
      .replace(/[^a-z0-9-]/g, ''); // Remove caracteres especiais
  }

  /**
   * Valida estrutura do pacote baixado
   */
  private validatePackage(pacote: any): asserts pacote is PacoteQuestoes {
    if (!pacote.metadata) {
      throw new Error('Pacote inválido: metadata ausente');
    }

    if (!Array.isArray(pacote.questoes)) {
      throw new Error('Pacote inválido: questões ausentes');
    }

    if (pacote.questoes.length === 0) {
      throw new Error('Pacote vazio: nenhuma questão encontrada');
    }

    // Validar primeira questão (amostra)
    const q = pacote.questoes[0];
    
    if (!q.id || !q.pergunta || !Array.isArray(q.opcoes)) {
      throw new Error('Pacote inválido: formato de questão incorreto');
    }

    console.log('✅ Pacote validado:', {
      perfil: pacote.metadata.perfil,
      versao: pacote.metadata.versao,
      total: pacote.questoes.length,
    });
  }

  // ========================================
  // VERIFICAÇÕES E UTILIDADES
  // ========================================

  /**
   * Verifica se há questões importadas no banco
   */
  async temQuestoes(): Promise<boolean> {
    return await sqliteService.hasQuestions();
  }

  /**
   * Verifica se precisa atualizar o pacote
   * (usa versão salva vs versão do servidor)
   */
  async precisaAtualizar(perfil: {
    cargo: string;
    banca: string;
    nivel: string;
  }): Promise<boolean> {
    try {
      const status = this.getStatus();
      
      // Se nunca sincronizou, precisa baixar
      if (!status.versaoAtual) {
        return true;
      }

      // Buscar versão atual do servidor (apenas metadata, sem baixar tudo)
      const url = this.buildPackageUrl(perfil);
      const response = await fetch(url, { method: 'HEAD' }); // Apenas headers

      if (!response.ok) {
        return false;
      }

      // Comparar última modificação (se servidor suportar)
      const lastModified = response.headers.get('Last-Modified');
      
      if (lastModified) {
        const serverDate = new Date(lastModified);
        const localDate = status.ultimaSync ? new Date(status.ultimaSync) : new Date(0);
        
        return serverDate > localDate;
      }

      // Se não tem Last-Modified, não atualiza
      return false;

    } catch (error) {
      console.error('Erro ao verificar atualização:', error);
      return false;
    }
  }

  /**
   * Sincronização automática inteligente
   * 
   * QUANDO CHAMAR:
   * - No boot do app (App.tsx ou AppShell.tsx)
   * - Quando usuário trocar de perfil
   * 
   * COMPORTAMENTO:
   * - Se não tem questões: baixa pacote
   * - Se tem questões: verifica se precisa atualizar
   * - Se offline: usa questões locais
   */
  async autoSync(perfil?: {
    cargo: string;
    banca: string;
    nivel: string;
  }): Promise<void> {
    try {
      // Se não passou perfil, pega do status
      if (!perfil) {
        const status = this.getStatus();
        if (!status.perfilAtual) {
          console.log('⚠️ Nenhum perfil configurado. Pulando sync.');
          return;
        }
        // TODO: parsear perfilAtual para extrair cargo, banca, nivel
        return;
      }

      // Verificar se tem questões
      const temQuestoes = await this.temQuestoes();

      if (!temQuestoes) {
        console.log('📥 Primeira execução: baixando questões...');
        await this.baixarPacote(perfil);
        return;
      }

      // Verificar se precisa atualizar
      const precisaAtualizar = await this.precisaAtualizar(perfil);

      if (precisaAtualizar) {
        console.log('🔄 Nova versão disponível. Atualizando...');
        await this.baixarPacote(perfil);
      } else {
        console.log('✅ Questões já atualizadas');
      }

    } catch (error) {
      console.error('⚠️ Erro na sincronização automática:', error);
      // Não bloqueia o app se falhar
      console.log('📱 Continuando com questões locais');
    }
  }

  /**
   * Retorna estatísticas do banco local
   */
  async getEstatisticas() {
    return await sqliteService.getDatabaseStats();
  }

  /**
   * Limpa todos os dados (reset completo)
   */
  async limparTudo(): Promise<void> {
    try {
      await sqliteService.execute('DELETE FROM questions');
      await sqliteService.execute('DELETE FROM exams');
      await sqliteService.execute('DELETE FROM user_question_progress');
      
      localStorage.removeItem(this.SYNC_KEY);
      
      console.log('🗑️ Todos os dados foram limpos');
      toast.success('Dados limpos com sucesso');
      
    } catch (error) {
      console.error('Erro ao limpar dados:', error);
      toast.error('Erro ao limpar dados');
    }
  }
}

// ========================================
// SINGLETON EXPORT
// ========================================

export const syncService = new SyncService();

// ========================================
// NOTAS PARA IMPLEMENTAÇÃO
// ========================================

/**
 * 🚀 PRÓXIMOS PASSOS:
 * 
 * 1. CRIAR SERVIDOR DE ARQUIVOS:
 *    - Opção mais simples: GitHub Pages (grátis, CDN global)
 *    - Estrutura:
 *      /downloads
 *        /cespe
 *          tecnico-medio.json
 *          analista-superior.json
 *        /fcc
 *          tecnico-medio.json
 *          analista-superior.json
 * 
 * 2. GERAR ARQUIVOS JSON:
 *    - Script Python/Node.js para filtrar questões por perfil
 *    - Exportar em formato padronizado
 *    - Comprimir com gzip (reduce 70% do tamanho)
 * 
 * 3. INTEGRAR NO APP:
 *    - No ProfileSelector: chamar syncService.baixarPacote()
 *    - No AppShell: chamar syncService.autoSync()
 *    - Nas Settings: botão "Atualizar Questões"
 * 
 * 4. ATUALIZAR HOOKS:
 *    - useQuestions: ler do SQLite em vez de Supabase
 *    - useSimulatedExam: ler do SQLite
 *    - useStudySession: ler do SQLite
 */
