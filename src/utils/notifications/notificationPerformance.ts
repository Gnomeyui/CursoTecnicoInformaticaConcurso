/**
 * DETECÇÃO DE NÍVEL DE DESEMPENHO
 * 
 * Classifica o desempenho do usuário para
 * ajustar o tom das mensagens
 */

import { PerformanceLevel } from './types';

export function detectPerformance(accuracy: number): PerformanceLevel {
  if (accuracy < 50) {
    return 'low';    // Encorajamento
  }
  
  if (accuracy < 75) {
    return 'medium'; // Consistência
  }
  
  return 'high';     // Reconhecimento
}
