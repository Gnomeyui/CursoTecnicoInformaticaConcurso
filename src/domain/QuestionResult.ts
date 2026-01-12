/**
 * DOMÍNIO - RESULTADO DE QUESTÃO
 * Representa uma questão respondida pelo aluno
 */

export interface QuestionResult {
  questionId: string;
  disciplina: string;
  assunto: string;
  correta: boolean;
  tempoSegundos: number;
  data: Date;
}
