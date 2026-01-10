/**
 * SISTEMA DE NOTIFICAÇÕES INTELIGENTES
 * 
 * Exportações centralizadas para facilitar importação
 */

export { NotificationService } from './NotificationService';
export { getMotivationalMessage } from './notificationMessages';
export { detectContext } from './notificationContext';
export { calculateFrequency } from './notificationFrequency';
export { detectPerformance } from './notificationPerformance';
export { getHistory, saveHistory, clearHistory } from './notificationHistory';

export type {
  NotificationContext,
  UserProfile,
  PerformanceLevel,
  UserStudyStats,
  NotificationFrequency
} from './types';
