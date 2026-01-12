/**
 * CORE - DEPENDENCY INJECTION CONTAINER
 * Ponto central de injeção de dependências
 * QUANDO TIVER BACKEND: Troca UMA linha aqui
 * 
 * ⚠️ ÚNICO PONTO DE CONFIGURAÇÃO
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
// USE CASES (SEM LÓGICA DE NEGÓCIO)
// ============================================

import { GetQuestions } from '../domain/usecases/GetQuestions';
import { GetRandomQuestions } from '../domain/usecases/GetRandomQuestions';
import { CountQuestions } from '../domain/usecases/CountQuestions';

// ============================================
// USE CASES (COM LÓGICA DE PREMIUM)
// ============================================

import { GetQuestionsWithEntitlement } from '../domain/usecases/GetQuestionsWithEntitlement';
import { GetRandomQuestionsWithEntitlement } from '../domain/usecases/GetRandomQuestionsWithEntitlement';

/**
 * Use cases disponíveis para a aplicação
 * 
 * Básicos (sem regras de negócio):
 * - getQuestions: busca questões simples
 * - getRandomQuestions: questões aleatórias
 * - countQuestions: conta questões
 * 
 * Com Entitlement (aplicam regras de premium):
 * - getQuestionsWithEntitlement: aplica limites por plano
 * - getRandomQuestionsWithEntitlement: quiz com limites
 */
export const useCases = {
  // Básicos
  getQuestions: new GetQuestions(questionRepository),
  getRandomQuestions: new GetRandomQuestions(questionRepository),
  countQuestions: new CountQuestions(questionRepository),
  
  // Com Premium
  getQuestionsWithEntitlement: new GetQuestionsWithEntitlement(questionRepository),
  getRandomQuestionsWithEntitlement: new GetRandomQuestionsWithEntitlement(questionRepository),
};

// ============================================
// SERVIÇOS
// ============================================

export { EntitlementService } from '../domain/services/EntitlementService';