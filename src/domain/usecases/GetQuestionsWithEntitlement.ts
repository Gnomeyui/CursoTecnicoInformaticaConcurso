/**
 * DOMAIN - USE CASE: GET QUESTIONS WITH ENTITLEMENT
 * Busca questões aplicando regras de premium
 * 
 * ✅ LÓGICA DE NEGÓCIO AQUI (NÃO NO REPOSITÓRIO)
 */

import { QuestionRepository, QuestionFilters } from '../repositories/QuestionRepository';
import { Question } from '../Question';
import { User } from '../User';
import { EntitlementService } from '../services/EntitlementService';

export class GetQuestionsWithEntitlement {
  constructor(private repository: QuestionRepository) {}

  async execute(user: User, filters?: QuestionFilters): Promise<Question[]> {
    // Aplica limite baseado no plano
    const questionLimit = EntitlementService.getQuestionLimit(user);
    
    // Se usuário não é premium, remove filtros avançados
    if (!EntitlementService.isPremium(user)) {
      // Free: sem filtros avançados, apenas questões básicas
      const allQuestions = await this.repository.getAll({ limit: questionLimit });
      return allQuestions;
    }

    // Premium: aplica filtros e retorna até o limite
    const questions = await this.repository.getAll({
      ...filters,
      limit: questionLimit
    });

    return questions;
  }
}
