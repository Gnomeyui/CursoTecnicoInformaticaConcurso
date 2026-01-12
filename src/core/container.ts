/**
 * CORE - DEPENDENCY INJECTION CONTAINER
 * Ponto central de injeção de dependências
 * QUANDO TIVER BACKEND: Troca UMA linha aqui
 */

import { MockQuestionRepository } from '../data/repositories/MockQuestionRepository';
import { QuestionRepository } from '../domain/repositories/QuestionRepository';

// ============================================
// REPOSITÓRIOS
// ============================================

/**
 * Repositório de questões
 * Para trocar de Mock para API, basta mudar esta linha:
 * export const questionRepository = new ApiQuestionRepository();
 */
export const questionRepository: QuestionRepository = new MockQuestionRepository();

// ============================================
// USE CASES
// ============================================

import { GetQuestions } from '../domain/usecases/GetQuestions';
import { GetRandomQuestions } from '../domain/usecases/GetRandomQuestions';
import { CountQuestions } from '../domain/usecases/CountQuestions';

/**
 * Use cases disponíveis para a aplicação
 */
export const useCases = {
  getQuestions: new GetQuestions(questionRepository),
  getRandomQuestions: new GetRandomQuestions(questionRepository),
  countQuestions: new CountQuestions(questionRepository),
};

// ============================================
// SERVIÇOS
// ============================================

export { EntitlementService } from '../domain/services/EntitlementService';
