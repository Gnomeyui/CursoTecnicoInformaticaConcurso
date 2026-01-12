/**
 * DOMÍNIO - REPOSITÓRIO DE QUESTÕES
 * Interface que define como acessar questões (sem implementação)
 */

import { Question } from './Question';

export interface QuestionFilters {
  cargo?: string;
  banca?: string;
  ano?: number;
  estado?: string;
  cidade?: string;
  disciplina?: string;
  assunto?: string;
  limit?: number;
}

export interface QuestionRepository {
  /**
   * Retorna questões para modo FREE (limitado)
   */
  getFree(): Promise<Question[]>;
  
  /**
   * Retorna questões com filtros (modo PREMIUM)
   */
  getPremium(filters: QuestionFilters): Promise<Question[]>;
}
