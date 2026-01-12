/**
 * DATA LAYER - MOCK QUESTION REPOSITORY
 * Implementação mock do repositório (substitui hardcoded atual)
 * QUANDO TIVER BACKEND: Troca UMA linha no container.ts
 */

import { QuestionRepository, QuestionFilters } from '../../domain/repositories/QuestionRepository';
import { Question } from '../../domain/Question';
import { QUESTIONS } from '../questions';

export class MockQuestionRepository implements QuestionRepository {
  
  async getAll(filters?: QuestionFilters): Promise<Question[]> {
    let data = QUESTIONS;

    // Aplicar filtros
    if (filters?.banca) {
      data = data.filter(q => q.banca === filters.banca);
    }

    if (filters?.cargo) {
      data = data.filter(q => q.cargo === filters.cargo);
    }

    if (filters?.ano) {
      data = data.filter(q => q.ano === filters.ano);
    }

    if (filters?.estado) {
      data = data.filter(q => q.estado === filters.estado);
    }

    if (filters?.disciplina) {
      data = data.filter(q => q.disciplina === filters.disciplina);
    }

    if (filters?.assunto) {
      data = data.filter(q => q.assunto === filters.assunto);
    }

    if (filters?.dificuldade) {
      data = data.filter(q => q.dificuldade === filters.dificuldade);
    }

    if (filters?.perfil) {
      // Filtra por perfil de concurso
      data = data.filter(q => q.cargo === filters.perfil);
    }

    return data;
  }

  async getById(id: string): Promise<Question | null> {
    const question = QUESTIONS.find(q => q.id === id);
    return question ?? null;
  }

  async count(filters?: QuestionFilters): Promise<number> {
    const questions = await this.getAll(filters);
    return questions.length;
  }

  async getRandom(limit: number, filters?: QuestionFilters): Promise<Question[]> {
    const questions = await this.getAll(filters);
    
    // Embaralha e pega os primeiros N
    const shuffled = [...questions].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, limit);
  }
}
