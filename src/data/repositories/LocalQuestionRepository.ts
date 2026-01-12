/**
 * REPOSITÓRIO - QUESTÕES LOCAIS
 * Implementação local do repositório de questões
 * 
 * 📌 Hoje: usa dados hardcoded
 * 📌 Amanhã: busca de API/SQLite
 * 
 * ⚠️ A interface não muda quando trocar a fonte
 * ⚠️ REPOSITÓRIO APENAS ENTREGA DADOS - SEM LÓGICA DE NEGÓCIO
 */

import { QuestionRepository, QuestionFilters } from '../../domain/repositories/QuestionRepository';
import { Question } from '../../domain/Question';

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
   * Retorna todas as questões com filtros
   * SEM lógica de premium - isso vai para Use Cases
   */
  async getAll(filters?: QuestionFilters): Promise<Question[]> {
    let data = [...this.questions];

    // Aplica filtros simples (APENAS filtragem, sem regras de negócio)
    if (filters?.cargo) {
      data = data.filter(q => q.cargo === filters.cargo);
    }

    if (filters?.banca) {
      data = data.filter(q => q.banca === filters.banca);
    }

    if (filters?.ano) {
      data = data.filter(q => q.ano === filters.ano);
    }

    if (filters?.estado) {
      data = data.filter(q => q.estado === filters.estado);
    }

    if (filters?.cidade) {
      data = data.filter(q => q.cidade === filters.cidade);
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
      data = data.filter(q => q.cargo === filters.perfil);
    }

    // Limite simples (sem regra de premium)
    if (filters?.limit) {
      data = data.slice(0, filters.limit);
    }

    return data;
  }

  /**
   * Busca questão por ID
   */
  async getById(id: string): Promise<Question | null> {
    const question = this.questions.find(q => q.id === id);
    return question ?? null;
  }

  /**
   * Conta questões com filtros
   */
  async count(filters?: QuestionFilters): Promise<number> {
    const questions = await this.getAll(filters);
    return questions.length;
  }

  /**
   * Retorna questões aleatórias
   */
  async getRandom(limit: number, filters?: QuestionFilters): Promise<Question[]> {
    const questions = await this.getAll(filters);
    
    // Embaralha e retorna N questões
    const shuffled = [...questions].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, limit);
  }
}

export const questionRepository = new LocalQuestionRepository();