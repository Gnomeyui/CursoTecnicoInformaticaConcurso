/**
 * DOMAIN - USE CASE: GET RANDOM QUESTIONS WITH ENTITLEMENT
 * Busca questões aleatórias aplicando regras de premium
 * 
 * ✅ LÓGICA DE NEGÓCIO AQUI (NÃO NO REPOSITÓRIO)
 */

import { QuestionRepository, QuestionFilters } from '../repositories/QuestionRepository';
import { Question } from '../Question';
import { User } from '../User';
import { EntitlementService } from '../services/EntitlementService';

export class GetRandomQuestionsWithEntitlement {
  constructor(private repository: QuestionRepository) {}

  async execute(user: User, limit: number, filters?: QuestionFilters): Promise<Question[]> {
    // Verifica se usuário é premium
    const isPremium = EntitlementService.isPremium(user);
    
    // Free: limite de questões por sessão
    const maxPerSession = isPremium ? limit : Math.min(limit, 10);
    
    // Se não é premium, remove filtros avançados
    const appliedFilters = isPremium ? filters : undefined;

    // Busca questões aleatórias
    const questions = await this.repository.getRandom(maxPerSession, appliedFilters);

    return questions;
  }
}
