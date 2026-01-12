/**
 * REPOSITÓRIO - RESULTADOS
 * Armazena resultados das questões respondidas
 * 
 * 📌 Hoje: memória + localStorage
 * 📌 Amanhã: SQLite
 * 📌 Depois: sync com backend
 */

import { QuestionResult } from '../../domain/QuestionResult';

const STORAGE_KEY = 'gabaritoo_results';

class ResultRepository {
  private results: QuestionResult[] = [];

  constructor() {
    this.loadFromStorage();
  }

  private loadFromStorage() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const data = JSON.parse(saved);
        this.results = data.map((r: any) => ({
          ...r,
          data: new Date(r.data)
        }));
      }
    } catch (error) {
      console.error('Erro ao carregar resultados:', error);
    }
  }

  private saveToStorage() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.results));
    } catch (error) {
      console.error('Erro ao salvar resultados:', error);
    }
  }

  add(result: QuestionResult) {
    this.results.push(result);
    this.saveToStorage();
  }

  getAll(): QuestionResult[] {
    return this.results;
  }

  getByDisciplina(disciplina: string): QuestionResult[] {
    return this.results.filter(r => r.disciplina === disciplina);
  }

  getByAssunto(assunto: string): QuestionResult[] {
    return this.results.filter(r => r.assunto === assunto);
  }

  clear() {
    this.results = [];
    this.saveToStorage();
  }
}

export const resultRepository = new ResultRepository();
