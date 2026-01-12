/**
 * CORE - ENGINE DE SIMULADO
 * Motor de simulado cronometrado
 */

import { Question } from '../domain/Question';
import { SimuladoResposta, SimuladoResultado } from '../domain/Simulado';

export class SimuladoEngine {
  private questions: Question[];
  private respostas: SimuladoResposta[] = [];
  private inicio: number;

  constructor(questions: Question[]) {
    this.questions = questions;
    this.inicio = Date.now();
  }

  /**
   * Registra uma resposta
   */
  responder(
    question: Question,
    respostaMarcada: number,
    tempoGastoSegundos: number
  ) {
    this.respostas.push({
      questionId: question.id,
      respostaMarcada,
      correta: respostaMarcada === question.correta,
      tempoGastoSegundos
    });
  }

  /**
   * Finaliza o simulado e gera resultado
   */
  finalizar(): SimuladoResultado {
    const total = this.questions.length;
    const acertos = this.respostas.filter(r => r.correta).length;
    const erros = total - acertos;

    const tempoTotalSegundos = Math.floor((Date.now() - this.inicio) / 1000);

    // Calcula por disciplina
    const porDisciplina: Record<string, { acertos: number; total: number }> = {};

    this.questions.forEach(q => {
      if (!porDisciplina[q.disciplina]) {
        porDisciplina[q.disciplina] = { acertos: 0, total: 0 };
      }
      porDisciplina[q.disciplina].total++;
    });

    this.respostas.forEach(r => {
      const q = this.questions.find(q => q.id === r.questionId);
      if (q && r.correta) {
        porDisciplina[q.disciplina].acertos++;
      }
    });

    return {
      totalQuestoes: total,
      acertos,
      erros,
      percentual: Math.round((acertos / total) * 100),
      tempoTotalSegundos,
      porDisciplina
    };
  }

  /**
   * Retorna as respostas
   */
  getRespostas(): SimuladoResposta[] {
    return this.respostas;
  }
}
