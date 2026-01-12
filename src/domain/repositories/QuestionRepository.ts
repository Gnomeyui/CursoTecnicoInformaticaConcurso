/**
 * DOMAIN - QUESTION REPOSITORY INTERFACE
 * Contrato abstrato para acesso a questões
 * UI NUNCA acessa dados diretamente - SEMPRE via repositório
 */

import { Question } from '../Question';

export interface QuestionFilters {
  banca?: string;
  cargo?: string;
  ano?: number;
  estado?: string;
  disciplina?: string;
  assunto?: string;
  dificuldade?: 'facil' | 'medio' | 'dificil';
  perfil?: string; // Filtra por perfil de concurso selecionado
}

/**
 * Interface que define o contrato de acesso a questões
 * Implementações podem ser: Mock, SQLite, API, Cache
 */
export interface QuestionRepository {
  /**
   * Busca todas as questões com filtros opcionais
   */
  getAll(filters?: QuestionFilters): Promise<Question[]>;
  
  /**
   * Busca uma questão específica por ID
   */
  getById(id: string): Promise<Question | null>;
  
  /**
   * Conta total de questões disponíveis
   */
  count(filters?: QuestionFilters): Promise<number>;
  
  /**
   * Busca questões aleatórias (para quiz)
   */
  getRandom(limit: number, filters?: QuestionFilters): Promise<Question[]>;
}
