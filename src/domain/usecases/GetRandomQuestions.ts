/**
 * DOMAIN - USE CASE: GET RANDOM QUESTIONS
 * Caso de uso para buscar questões aleatórias (quiz)
 */

import { QuestionRepository, QuestionFilters } from '../repositories/QuestionRepository';
import { Question } from '../Question';

export class GetRandomQuestions {
  constructor(private repository: QuestionRepository) {}

  async execute(limit: number, filters?: QuestionFilters): Promise<Question[]> {
    return this.repository.getRandom(limit, filters);
  }
}
