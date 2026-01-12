/**
 * DOMÍNIO - SIMULADO
 * Configurações e resultados de simulados
 */

export interface SimuladoConfig {
  cargo?: string;
  banca?: string;
  disciplina?: string;
  assunto?: string;
  quantidadeQuestoes: number;
  tempoEmMinutos?: number;
}

export interface SimuladoResposta {
  questionId: string;
  respostaMarcada: number;
  correta: boolean;
  tempoGastoSegundos: number;
}

export interface SimuladoResultado {
  totalQuestoes: number;
  acertos: number;
  erros: number;
  percentual: number;
  tempoTotalSegundos: number;
  porDisciplina: Record<string, { acertos: number; total: number }>;
}
