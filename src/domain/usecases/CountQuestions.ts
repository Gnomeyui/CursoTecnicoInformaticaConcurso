/**
 * DOMAIN - USE CASE: COUNT QUESTIONS
 * Caso de uso para contar questões disponíveis
 */

import { QuestionRepository, QuestionFilters } from '../repositories/QuestionRepository';

export class CountQuestions {
  constructor(private repository: QuestionRepository) {}

  async execute(filters?: QuestionFilters): Promise<number> {
    return this.repository.count(filters);
  }
}
