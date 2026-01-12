/**
 * SERVIÇO - MÉTRICAS
 * Calcula estatísticas do desempenho do aluno
 */

import { QuestionResult } from '../domain/QuestionResult';
import { StudentMetrics } from '../domain/StudentMetrics';

export class MetricsService {
  /**
   * Calcula métricas a partir dos resultados
   */
  calcular(results: QuestionResult[]): StudentMetrics {
    const metrics: StudentMetrics = {
      totalRespondidas: results.length,
      totalAcertos: 0,
      totalErros: 0,
      percentualGeral: 0,
      porDisciplina: {},
      porAssunto: {},
      tempoMedioSegundos: 0
    };

    if (results.length === 0) {
      return metrics;
    }

    let tempoTotal = 0;

    results.forEach(r => {
      tempoTotal += r.tempoSegundos;

      if (r.correta) metrics.totalAcertos++;
      else metrics.totalErros++;

      // Disciplina
      if (!metrics.porDisciplina[r.disciplina]) {
        metrics.porDisciplina[r.disciplina] = {
          acertos: 0,
          erros: 0,
          percentual: 0
        };
      }

      r.correta
        ? metrics.porDisciplina[r.disciplina].acertos++
        : metrics.porDisciplina[r.disciplina].erros++;

      // Assunto
      if (!metrics.porAssunto[r.assunto]) {
        metrics.porAssunto[r.assunto] = {
          acertos: 0,
          erros: 0,
          percentual: 0
        };
      }

      r.correta
        ? metrics.porAssunto[r.assunto].acertos++
        : metrics.porAssunto[r.assunto].erros++;
    });

    // Percentuais
    metrics.percentualGeral =
      Math.round((metrics.totalAcertos / metrics.totalRespondidas) * 100);

    Object.values(metrics.porDisciplina).forEach(d => {
      const total = d.acertos + d.erros;
      d.percentual = Math.round((d.acertos / total) * 100);
    });

    Object.values(metrics.porAssunto).forEach(a => {
      const total = a.acertos + a.erros;
      a.percentual = Math.round((a.acertos / total) * 100);
    });

    metrics.tempoMedioSegundos = Math.round(tempoTotal / results.length);

    return metrics;
  }

  /**
   * Identifica pontos fracos (abaixo de 70%)
   */
  identificarPontosFracos(metrics: StudentMetrics): string[] {
    return Object.entries(metrics.porAssunto)
      .filter(([_, data]) => data.percentual < 70)
      .map(([assunto]) => assunto);
  }
}

export const metricsService = new MetricsService();
