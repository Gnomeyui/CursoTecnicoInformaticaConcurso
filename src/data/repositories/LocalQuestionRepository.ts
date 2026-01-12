/**
 * REPOSITÓRIO - QUESTÕES LOCAIS
 * Implementação local do repositório de questões
 * 
 * 📌 Hoje: usa dados hardcoded
 * 📌 Amanhã: busca de API/SQLite
 * 
 * ⚠️ A interface não muda quando trocar a fonte
 */

import { QuestionRepository, QuestionFilters } from '../../domain/QuestionRepository';
import { Question } from '../../domain/Question';
import { FeatureGate } from '../../core/FeatureGate';

// Importa as questões antigas (compatibilidade)
import { questions as legacyQuestions } from '../questions';

/**
 * Converte questão do formato legado para novo formato
 */
function convertLegacyQuestion(q: any): Question {
  return {
    id: String(q.id),
    enunciado: q.pergunta || q.enunciado || '',
    alternativas: q.opcoes || q.alternativas || [],
    correta: q.correta || 0,
    cargo: q.cargo,
    banca: q.banca,
    ano: q.ano,
    estado: q.estado,
    cidade: q.cidade,
    disciplina: q.materia || q.disciplina || 'Geral',
    assunto: q.assunto || q.materia || 'Geral',
    explicacao: q.explicacao,
    dificuldade: q.dificuldade
  };
}

class LocalQuestionRepository implements QuestionRepository {
  private questions: Question[];

  constructor() {
    // Converte questões legadas
    this.questions = legacyQuestions.map(convertLegacyQuestion);
  }

  /**
   * Modo FREE: retorna até 100 questões
   */
  async getFree(): Promise<Question[]> {
    const limit = FeatureGate.maxQuestoes();
    return this.questions.slice(0, limit);
  }

  /**
   * Modo PREMIUM: retorna com filtros
   */
  async getPremium(filters: QuestionFilters): Promise<Question[]> {
    let data = [...this.questions];

    if (filters.cargo) {
      data = data.filter(q => q.cargo === filters.cargo);
    }

    if (filters.banca) {
      data = data.filter(q => q.banca === filters.banca);
    }

    if (filters.ano) {
      data = data.filter(q => q.ano === filters.ano);
    }

    if (filters.estado) {
      data = data.filter(q => q.estado === filters.estado);
    }

    if (filters.disciplina) {
      data = data.filter(q => q.disciplina === filters.disciplina);
    }

    if (filters.assunto) {
      data = data.filter(q => q.assunto === filters.assunto);
    }

    const limit = filters.limit || FeatureGate.maxQuestoes();
    return data.slice(0, limit);
  }

  /**
   * Helper: retorna todas as questões (uso interno)
   */
  getAll(): Question[] {
    return this.questions;
  }
}

export const questionRepository = new LocalQuestionRepository();
