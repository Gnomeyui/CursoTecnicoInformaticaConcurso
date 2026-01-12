/**
 * CORE - ENGINE DE QUIZ
 * Motor puro de quiz (sem dependências externas)
 * 
 * ❌ NÃO sabe de onde vêm as questões
 * ❌ NÃO conhece UI, hooks ou React
 * ✅ Recebe questões prontas
 * ✅ Processa respostas
 * ✅ Gera métricas
 */

import { Question } from '../domain/Question';
import { EngineState, EngineStats } from './EngineTypes';

export class QuizEngine {
  private questions: Question[] = [];
  private state: EngineState;

  constructor() {
    this.state = this.createInitialState();
  }

  private createInitialState(): EngineState {
    return {
      currentIndex: 0,
      correct: 0,
      wrong: 0,
      answers: {}
    };
  }

  /**
   * Carrega questões no engine
   */
  load(questions: Question[]) {
    this.questions = questions;
    this.state = this.createInitialState();
  }

  /**
   * Retorna a questão atual
   */
  getCurrentQuestion(): Question | null {
    return this.questions[this.state.currentIndex] ?? null;
  }

  /**
   * Registra uma resposta
   */
  answer(questionId: string, selected: number, time: number) {
    const question = this.questions.find(q => q.id === questionId);
    if (!question) return;

    const isCorrect = question.correta === selected;

    this.state.answers[questionId] = {
      selected,
      correct: isCorrect,
      time
    };

    if (isCorrect) {
      this.state.correct++;
    } else {
      this.state.wrong++;
    }

    this.state.currentIndex++;
  }

  /**
   * Verifica se ainda há questões
   */
  hasNext(): boolean {
    return this.state.currentIndex < this.questions.length;
  }

  /**
   * Retorna estatísticas atuais
   */
  getStats(): EngineStats {
    const total = this.state.correct + this.state.wrong;

    return {
      total,
      correct: this.state.correct,
      wrong: this.state.wrong,
      accuracy: total === 0 ? 0 : this.state.correct / total
    };
  }

  /**
   * Reseta o engine
   */
  reset() {
    this.state = this.createInitialState();
  }

  /**
   * Retorna todas as respostas
   */
  getAnswers() {
    return this.state.answers;
  }

  /**
   * Retorna o índice atual
   */
  getCurrentIndex(): number {
    return this.state.currentIndex;
  }

  /**
   * Retorna o total de questões
   */
  getTotalQuestions(): number {
    return this.questions.length;
  }
}
