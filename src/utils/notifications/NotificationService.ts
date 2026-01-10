/**
 * SERVIÇO DE NOTIFICAÇÕES INTELIGENTES
 * 
 * Sistema completo de notificações adaptativas que:
 * - Detecta contexto automaticamente
 * - Ajusta frequência baseado no comportamento
 * - Evita repetição de mensagens
 * - Adapta tom ao perfil e desempenho
 * 
 * Uso:
 * ```ts
 * const service = new NotificationService('regular', userStats);
 * const message = service.generateMessage(new Date());
 * if (message) {
 *   // Enviar notificação push
 * }
 * ```
 */

import { detectContext } from './notificationContext';
import { getMotivationalMessage } from './notificationMessages';
import { calculateFrequency } from './notificationFrequency';
import { detectPerformance } from './notificationPerformance';
import { UserProfile, UserStudyStats } from './types';

const LAST_NOTIFICATION_KEY = 'last_notification_sent';

export class NotificationService {
  constructor(
    private userProfile: UserProfile,
    private stats: UserStudyStats
  ) {}

  /**
   * Verifica se deve enviar notificação agora
   */
  shouldSendNotification(now: Date = new Date()): boolean {
    const frequency = calculateFrequency(this.stats);

    try {
      const lastSent = localStorage.getItem(LAST_NOTIFICATION_KEY);
      
      if (!lastSent) {
        return true; // Primeira notificação
      }

      const hoursSinceLast =
        (now.getTime() - new Date(lastSent).getTime()) / (1000 * 60 * 60);

      return hoursSinceLast >= frequency.minIntervalHours;
    } catch (error) {
      console.error('Erro ao verificar última notificação:', error);
      return false;
    }
  }

  /**
   * Gera mensagem motivacional inteligente
   * 
   * Retorna null se não deve enviar notificação agora
   */
  generateMessage(now: Date = new Date()): string | null {
    if (!this.shouldSendNotification(now)) {
      return null;
    }

    try {
      const context = detectContext(now, this.stats);
      const performance = detectPerformance(this.stats.averageAccuracy);

      const message = getMotivationalMessage(
        context,
        this.userProfile,
        performance
      );

      // Salvar timestamp da última notificação
      localStorage.setItem(LAST_NOTIFICATION_KEY, now.toISOString());

      return message;
    } catch (error) {
      console.error('Erro ao gerar mensagem motivacional:', error);
      return null;
    }
  }

  /**
   * Força geração de mensagem (ignora frequência)
   * 
   * Útil para testes ou casos especiais
   */
  forceGenerateMessage(now: Date = new Date()): string {
    const context = detectContext(now, this.stats);
    const performance = detectPerformance(this.stats.averageAccuracy);

    return getMotivationalMessage(context, this.userProfile, performance);
  }

  /**
   * Reseta controle de frequência
   * 
   * Útil para testes
   */
  static resetFrequencyControl(): void {
    try {
      localStorage.removeItem(LAST_NOTIFICATION_KEY);
    } catch (error) {
      console.error('Erro ao resetar controle de frequência:', error);
    }
  }
}

/**
 * EXEMPLO DE USO
 * 
 * ```ts
 * // No seu componente principal ou hook
 * const userStats: UserStudyStats = {
 *   lastStudyAt: new Date('2024-01-09'),
 *   streakDays: 7,
 *   averageAccuracy: 68,
 *   questionsAnsweredToday: 12
 * };
 * 
 * const notificationService = new NotificationService('regular', userStats);
 * 
 * // Verificar e gerar mensagem
 * const message = notificationService.generateMessage();
 * 
 * if (message) {
 *   // Enviar notificação push
 *   if ('Notification' in window && Notification.permission === 'granted') {
 *     new Notification('Gabaritoo', {
 *       body: message,
 *       icon: '/icon.png'
 *     });
 *   }
 * }
 * ```
 */
