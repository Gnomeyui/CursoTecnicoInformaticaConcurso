/**
 * HOOK PERSONALIZADO PARA NOTIFICAÇÕES
 * 
 * Facilita o uso do sistema de notificações em qualquer componente
 * 
 * Uso:
 * ```tsx
 * const { requestPermission, scheduleNotifications, hasPermission } = useNotifications();
 * 
 * // Solicitar permissão
 * await requestPermission();
 * 
 * // Agendar notificações automáticas
 * scheduleNotifications();
 * ```
 */

import { useState, useEffect, useCallback } from 'react';
import { NotificationService, UserStudyStats, UserProfile } from '../utils/notifications';

interface UseNotificationsOptions {
  profile?: UserProfile;
  stats?: UserStudyStats;
  autoSchedule?: boolean; // Agendar automaticamente ao montar
  checkInterval?: number; // Intervalo de verificação em horas (padrão: 6)
}

export function useNotifications(options: UseNotificationsOptions = {}) {
  const {
    profile = 'regular',
    stats = {
      lastStudyAt: null,
      streakDays: 0,
      averageAccuracy: 0,
      questionsAnsweredToday: 0
    },
    autoSchedule = false,
    checkInterval = 6
  } = options;

  const [hasPermission, setHasPermission] = useState(false);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

  // Verificar permissão atual
  useEffect(() => {
    if ('Notification' in window) {
      setHasPermission(Notification.permission === 'granted');
    }
  }, []);

  /**
   * Solicitar permissão ao usuário
   */
  const requestPermission = useCallback(async (): Promise<boolean> => {
    if (!('Notification' in window)) {
      console.warn('Este navegador não suporta notificações');
      return false;
    }

    if (Notification.permission === 'granted') {
      setHasPermission(true);
      return true;
    }

    try {
      const permission = await Notification.requestPermission();
      const granted = permission === 'granted';
      setHasPermission(granted);
      return granted;
    } catch (error) {
      console.error('Erro ao solicitar permissão:', error);
      return false;
    }
  }, []);

  /**
   * Enviar notificação imediata
   */
  const sendNotification = useCallback((message: string) => {
    if (!hasPermission) {
      console.warn('Permissão de notificação não concedida');
      return;
    }

    try {
      new Notification('Gabaritoo', {
        body: message,
        icon: '/icon.png',
        badge: '/badge.png',
        tag: 'study-reminder',
        requireInteraction: false
      });
    } catch (error) {
      console.error('Erro ao enviar notificação:', error);
    }
  }, [hasPermission]);

  /**
   * Verificar e enviar notificação se apropriado
   */
  const checkAndSend = useCallback(() => {
    if (!hasPermission) return;

    const service = new NotificationService(profile, stats);
    const message = service.generateMessage();

    if (message) {
      sendNotification(message);
    }
  }, [hasPermission, profile, stats, sendNotification]);

  /**
   * Agendar verificações periódicas
   */
  const scheduleNotifications = useCallback(() => {
    // Limpar agendamento anterior se existir
    if (intervalId) {
      clearInterval(intervalId);
    }

    // Verificar imediatamente
    checkAndSend();

    // Agendar verificações periódicas
    const id = setInterval(() => {
      checkAndSend();
    }, checkInterval * 60 * 60 * 1000); // Converter horas para milissegundos

    setIntervalId(id);

    return () => clearInterval(id);
  }, [checkAndSend, checkInterval, intervalId]);

  /**
   * Parar agendamento
   */
  const stopScheduling = useCallback(() => {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
  }, [intervalId]);

  /**
   * Forçar envio (ignora frequência)
   */
  const forceSend = useCallback(() => {
    if (!hasPermission) {
      console.warn('Permissão de notificação não concedida');
      return;
    }

    const service = new NotificationService(profile, stats);
    const message = service.forceGenerateMessage();
    sendNotification(message);
  }, [hasPermission, profile, stats, sendNotification]);

  // Auto-agendar se solicitado
  useEffect(() => {
    if (autoSchedule && hasPermission) {
      scheduleNotifications();
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [autoSchedule, hasPermission]); // eslint-disable-line react-hooks/exhaustive-deps

  return {
    hasPermission,
    requestPermission,
    sendNotification,
    scheduleNotifications,
    stopScheduling,
    forceSend,
    checkAndSend
  };
}

/**
 * EXEMPLO DE USO EM COMPONENTE
 * 
 * ```tsx
 * function App() {
 *   const { user } = useAuth();
 *   const { stats } = useUserStats();
 *   
 *   const {
 *     hasPermission,
 *     requestPermission,
 *     scheduleNotifications
 *   } = useNotifications({
 *     profile: user?.profile || 'regular',
 *     stats: stats,
 *     autoSchedule: true, // Agenda automaticamente
 *     checkInterval: 6 // Verifica a cada 6 horas
 *   });
 * 
 *   return (
 *     <div>
 *       {!hasPermission && (
 *         <button onClick={requestPermission}>
 *           Ativar notificações
 *         </button>
 *       )}
 *     </div>
 *   );
 * }
 * ```
 */
