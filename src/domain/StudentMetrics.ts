/**
 * DOMÍNIO - MÉTRICAS DO ALUNO
 * Estatísticas consolidadas de desempenho
 */

export interface StudentMetrics {
  totalRespondidas: number;
  totalAcertos: number;
  totalErros: number;
  percentualGeral: number;

  porDisciplina: Record<
    string,
    {
      acertos: number;
      erros: number;
      percentual: number;
    }
  >;

  porAssunto: Record<
    string,
    {
      acertos: number;
      erros: number;
      percentual: number;
    }
  >;

  tempoMedioSegundos: number;
}
