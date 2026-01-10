/**
 * DETECÇÃO AUTOMÁTICA DE CONTEXTO
 * 
 * Analisa o comportamento do usuário e define
 * qual mensagem é mais apropriada no momento
 */

import { NotificationContext, UserStudyStats } from './types';

export function detectContext(
  now: Date,
  stats: UserStudyStats
): NotificationContext {
  const hour = now.getHours();

  // Se nunca estudou, acolher
  if (!stats.lastStudyAt) {
    return 'inactive';
  }

  // Calcular dias de inatividade
  const daysInactive =
    (now.getTime() - stats.lastStudyAt.getTime()) / (1000 * 60 * 60 * 24);

  // Se inativo há 2+ dias, acolher
  if (daysInactive >= 2) {
    return 'inactive';
  }

  // Se tem streak de 3+ dias, reconhecer
  if (stats.streakDays >= 3) {
    return 'streak';
  }

  // Caso contrário, usar horário
  if (hour >= 5 && hour < 12) {
    return 'morning';
  }

  return 'night';
}
