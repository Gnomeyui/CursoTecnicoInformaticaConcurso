/**
 * DOMAIN - USE CASE: GET QUESTIONS
 * Caso de uso para buscar questões
 * UI é AGNÓSTICA de onde vêm os dados
 */

import { QuestionRepository, QuestionFilters } from '../repositories/QuestionRepository';
import { Question } from '../Question';

export class GetQuestions {
  constructor(private repository: QuestionRepository) {}

  async execute(filters?: QuestionFilters): Promise<Question[]> {
    return this.repository.getAll(filters);
  }
}
