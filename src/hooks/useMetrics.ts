/**
 * HOOK - MÉTRICAS
 * Hook para acessar métricas do aluno
 */

import { resultRepository } from '../data/repositories/ResultRepository';
import { metricsService } from '../services/MetricsService';
import { StudentMetrics } from '../domain/StudentMetrics';

export function useMetrics(): StudentMetrics {
  const results = resultRepository.getAll();
  return metricsService.calcular(results);
}

export function usePontosFracos(): string[] {
  const metrics = useMetrics();
  return metricsService.identificarPontosFracos(metrics);
}
