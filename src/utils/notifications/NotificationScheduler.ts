import { LocalNotifications } from '@capacitor/local-notifications';
import { NotificationService } from './NotificationService';

export const NotificationScheduler = {
  // Solicitar permissão ao iniciar o app
  async requestPermissions() {
    try {
      const result = await LocalNotifications.requestPermissions();
      console.log('Permissão de notificações:', result.display);
      return result.display === 'granted';
    } catch (error) {
      console.error('Erro ao solicitar permissão de notificações:', error);
      return false;
    }
  },

  // Verificar se permissões foram concedidas
  async checkPermissions() {
    try {
      const result = await LocalNotifications.checkPermissions();
      return result.display === 'granted';
    } catch (error) {
      console.error('Erro ao verificar permissões:', error);
      return false;
    }
  },

  // Agendar notificações baseado na configuração
  async scheduleStudyReminders(config: any, notificationService: NotificationService) {
    try {
      // 1. Verificar permissões primeiro
      const hasPermission = await this.checkPermissions();
      if (!hasPermission) {
        console.log('Sem permissão para notificações. Solicitando...');
        const granted = await this.requestPermissions();
        if (!granted) {
          console.log('Permissão negada pelo usuário');
          return;
        }
      }

      // 2. Cancelar todas as notificações pendentes anteriores para não duplicar
      const pending = await LocalNotifications.getPending();
      if (pending.notifications.length > 0) {
        console.log(`Cancelando ${pending.notifications.length} notificações antigas`);
        await LocalNotifications.cancel(pending);
      }

      if (!config.enabled) {
        console.log('Notificações desabilitadas na configuração');
        return;
      }

      const notificationsToSchedule = [];
      const now = new Date();
      
      // Converter horários de string "HH:mm" para Date
      const [startHour, startMin] = config.startTime.split(':').map(Number);
      const [endHour, endMin] = config.endTime.split(':').map(Number);
      
      let scheduledTime = new Date();
      scheduledTime.setHours(startHour, startMin, 0, 0);

      // Se o horário de início já passou hoje, agenda para o próximo intervalo
      if (scheduledTime < now) {
        // Encontra o próximo slot válido
        while (scheduledTime < now) {
          scheduledTime.setMinutes(scheduledTime.getMinutes() + config.intervalMinutes);
        }
      }

      const endTime = new Date();
      endTime.setHours(endHour, endMin, 0, 0);

      // Se o horário final também já passou, agenda para amanhã
      if (endTime < now) {
        scheduledTime.setDate(scheduledTime.getDate() + 1);
        scheduledTime.setHours(startHour, startMin, 0, 0);
        endTime.setDate(endTime.getDate() + 1);
      }

      // Limite de segurança para não agendar milhares de notificações (Android tem limites)
      let count = 0;
      const MAX_NOTIFICATIONS = 50; 

      // Loop para criar agendamentos futuros (próximas 24-48h)
      const maxDate = new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000); // 2 dias

      while (scheduledTime <= maxDate && count < MAX_NOTIFICATIONS) {
        // Verifica se está dentro da janela de horário permitido do dia
        const schedHour = scheduledTime.getHours();
        const schedMin = scheduledTime.getMinutes();
        const timeInMinutes = schedHour * 60 + schedMin;
        const startInMinutes = startHour * 60 + startMin;
        const endInMinutes = endHour * 60 + endMin;

        if (timeInMinutes >= startInMinutes && timeInMinutes <= endInMinutes) {
          // Gera a mensagem baseada no contexto
          const messageBody = notificationService.forceGenerateMessage(scheduledTime);

          notificationsToSchedule.push({
            id: Math.floor(scheduledTime.getTime() / 1000), // ID único baseado no timestamp
            title: '📚 Hora de Estudar!',
            body: messageBody || `Você tem ${config.questionsPerNotification} questões te esperando!`,
            schedule: { at: new Date(scheduledTime) },
            sound: 'default', // Som padrão do sistema
            smallIcon: 'ic_stat_icon_config_sample',
            actionTypeId: 'STUDY_REMINDER',
            extra: {
              questionsCount: config.questionsPerNotification,
              timestamp: scheduledTime.toISOString()
            }
          });

          count++;
        }

        // Avança o tempo pelo intervalo configurado
        scheduledTime = new Date(scheduledTime.getTime() + config.intervalMinutes * 60 * 1000);
      }

      if (notificationsToSchedule.length > 0) {
        await LocalNotifications.schedule({ notifications: notificationsToSchedule });
        console.log(`✅ Agendadas ${notificationsToSchedule.length} notificações inteligentes`);
        console.log(`📅 Primeira notificação: ${notificationsToSchedule[0].schedule.at}`);
        console.log(`📅 Última notificação: ${notificationsToSchedule[notificationsToSchedule.length - 1].schedule.at}`);
      } else {
        console.log('⚠️ Nenhuma notificação foi agendada (fora do horário ou configuração inválida)');
      }
    } catch (error) {
      console.error('❌ Erro ao agendar notificações:', error);
    }
  },

  // Cancelar todas as notificações agendadas
  async cancelAll() {
    try {
      const pending = await LocalNotifications.getPending();
      if (pending.notifications.length > 0) {
        await LocalNotifications.cancel(pending);
        console.log(`Canceladas ${pending.notifications.length} notificações`);
      }
    } catch (error) {
      console.error('Erro ao cancelar notificações:', error);
    }
  },

  // Obter notificações pendentes (para debug)
  async getPendingNotifications() {
    try {
      const pending = await LocalNotifications.getPending();
      console.log(`Notificações pendentes: ${pending.notifications.length}`);
      pending.notifications.forEach(n => {
        console.log(`- ID: ${n.id}, Agendada para: ${n.schedule?.at}`);
      });
      return pending.notifications;
    } catch (error) {
      console.error('Erro ao buscar notificações pendentes:', error);
      return [];
    }
  },

  // Configurar listeners de notificações (cliques, etc)
  async registerActionHandlers(onNotificationClick?: () => void) {
    try {
      // Listener quando a notificação é tocada
      await LocalNotifications.addListener('localNotificationActionPerformed', (notification) => {
        console.log('Notificação clicada:', notification);
        if (onNotificationClick) {
          onNotificationClick();
        }
      });

      // Listener quando a notificação é recebida (app aberto)
      await LocalNotifications.addListener('localNotificationReceived', (notification) => {
        console.log('Notificação recebida:', notification);
      });
    } catch (error) {
      console.error('Erro ao registrar listeners:', error);
    }
  }
};
