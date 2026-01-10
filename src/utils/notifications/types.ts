/**
 * TIPOS DO SISTEMA DE NOTIFICAÇÕES
 */

export type NotificationContext =
  | 'morning'    // Manhã - começar o dia
  | 'night'      // Noite - encerrar o dia
  | 'inactive'   // Inativo - acolhimento
  | 'streak';    // Constância - reconhecimento

export type UserProfile = 
  | 'beginner'   // Tom acolhedor, sem pressão
  | 'regular'    // Incentivo equilibrado
  | 'advanced';  // Disciplina, foco

export type PerformanceLevel = 
  | 'low'        // <50% acurácia - encorajamento
  | 'medium'     // 50-75% - consistência
  | 'high';      // >75% - reconhecimento

export interface UserStudyStats {
  lastStudyAt: Date | null;
  streakDays: number;
  averageAccuracy: number; // 0-100
  questionsAnsweredToday: number;
}

export interface NotificationFrequency {
  maxPerDay: number;
  minIntervalHours: number;
}
