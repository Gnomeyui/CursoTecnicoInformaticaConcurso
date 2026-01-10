/**
 * FREQUÊNCIA INTELIGENTE DE NOTIFICAÇÕES
 * 
 * Ajusta automaticamente a frequência baseado no
 * comportamento do usuário para evitar spam
 */

import { NotificationFrequency, UserStudyStats } from './types';

export function calculateFrequency(
  stats: UserStudyStats
): NotificationFrequency {
  
  // USUÁRIO ENGAJADO (streak alto) → menos notificações
  if (stats.streakDays >= 5) {
    return {
      maxPerDay: 1,
      minIntervalHours: 24
    };
  }

  // USUÁRIO INATIVO → lembrete espaçado
  if (!stats.lastStudyAt) {
    return {
      maxPerDay: 1,
      minIntervalHours: 36
    };
  }

  const daysInactive = stats.lastStudyAt
    ? (Date.now() - stats.lastStudyAt.getTime()) / (1000 * 60 * 60 * 24)
    : 0;

  // Muito inativo (5+ dias) → 1 notificação espaçada
  if (daysInactive >= 5) {
    return {
      maxPerDay: 1,
      minIntervalHours: 48
    };
  }

  // PADRÃO (usuário regular) → 2/dia, espaçadas
  return {
    maxPerDay: 2,
    minIntervalHours: 12
  };
}
