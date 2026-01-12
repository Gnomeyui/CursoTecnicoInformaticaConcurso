/**
 * SERVIÇO - SIMULADO
 * Gerencia criação e execução de simulados
 */

import { questionRepository } from '../data/repositories/LocalQuestionRepository';
import { SimuladoConfig } from '../domain/Simulado';
import { Question } from '../domain/Question';
import { FeatureGate } from '../core/FeatureGate';

export class SimuladoService {
  /**
   * Cria um simulado com as configurações fornecidas
   * @throws Error se usuário não for premium
   */
  async criarSimulado(config: SimuladoConfig): Promise<Question[]> {
    if (!FeatureGate.canUseSimulado()) {
      throw new Error('PREMIUM_REQUIRED');
    }

    const questions = await questionRepository.getPremium({
      cargo: config.cargo,
      banca: config.banca,
      disciplina: config.disciplina,
      assunto: config.assunto,
      limit: config.quantidadeQuestoes
    });

    // Embaralha questões
    return this.embaralhar(questions);
  }

  private embaralhar<T>(array: T[]): T[] {
    const result = [...array];
    for (let i = result.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
  }
}

export const simuladoService = new SimuladoService();
