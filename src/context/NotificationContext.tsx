import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { LocalNotifications } from '@capacitor/local-notifications';
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { Capacitor } from '@capacitor/core';

export interface NotificationSettings {
  enabled: boolean;
  times: string[]; // Horários no formato "HH:MM"
  frequency: 'low' | 'medium' | 'high'; // 1x, 3x, 5x por dia
  motivationalMessages: boolean;
}

interface NotificationContextType {
  settings: NotificationSettings;
  updateSettings: (settings: Partial<NotificationSettings>) => void;
  requestPermission: () => Promise<boolean>;
  hasPermission: boolean;
  scheduleNotifications: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

const STORAGE_KEY = 'alerr_notification_settings';
const PERMISSION_ASKED_KEY = 'alerr_permission_asked';

// Detectar se está em plataforma nativa ou web
const isNative = Capacitor.isNativePlatform();

const defaultTimes = {
  low: ['09:00'],
  medium: ['09:00', '14:00', '20:00'],
  high: ['08:00', '11:00', '14:00', '17:00', '20:00']
};

const motivationalMessages = [
  'Hora de estudar! Cada questão te aproxima do TOP 1! 🚀',
  'Seus concorrentes estão estudando. E você? 💪',
  'Apenas 10 questões hoje já fazem diferença! 📚',
  'O TOP 1 não vai se conquistar sozinho! Vamos lá! 🏆',
  'Lembre-se: consistência é a chave do sucesso! 🔑',
  'Sua vaga na ALE-RR está te esperando! 🎯',
  'Cada minuto de estudo conta! Vamos revisar? 📖',
  'Não deixe para amanhã! Responda algumas questões agora! ⚡',
  'Você está mais perto do que imagina! Continue! 🌟',
  'TOP 1 requer dedicação diária. Está pronto? 💯'
];

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<NotificationSettings>({
    enabled: false,
    times: defaultTimes.medium,
    frequency: 'medium',
    motivationalMessages: true
  });

  const [hasPermission, setHasPermission] = useState(false);
  const [notificationTimers, setNotificationTimers] = useState<NodeJS.Timeout[]>([]);

  useEffect(() => {
    loadSettings();
    checkPermission();
    // Inicializar notificações (só executará se for nativo)
    initializeNotifications();
  }, []);

  useEffect(() => {
    saveSettings();
    if (settings.enabled && hasPermission) {
      scheduleNotifications();
    }
  }, [settings, hasPermission]);

  const initializeNotifications = async () => {
    // PROTEÇÃO: Não executar no web
    if (!isNative) {
      console.log('📱 Notificações Web: Usando Notification API do navegador');
      return;
    }

    try {
      // ⚡ CRÍTICO: Verificar versão do Android e solicitar permissões
      console.log('🔔 Inicializando sistema de notificações nativas...');
      
      // Criar canal de notificação para Android 8+
      await LocalNotifications.createChannel({
        id: 'study-reminders',
        name: 'Lembretes de Estudo',
        description: 'Notificações para lembrar de estudar para o concurso ALE-RR',
        importance: 5, // MAX - Aparece na tela e faz som
        visibility: 1, // PUBLIC - Mostra conteúdo completo
        sound: 'default',
        vibration: true,
        lights: true,
        lightColor: '#3B82F6'
      });

      console.log('✅ Canal de notificação criado: study-reminders');

      // Listener para quando clicar na notificação
      await LocalNotifications.addListener('localNotificationActionPerformed', async (notification) => {
        console.log('✅ Notificação clicada:', notification);
        
        // Vibrar quando abrir
        try {
          await Haptics.impact({ style: ImpactStyle.Medium });
          console.log('📳 Vibração executada');
        } catch (e) {
          console.log('⚠️ Vibração não disponível:', e);
        }
      });

      console.log('✅ Sistema de notificações inicializado (Nativo Android)');
    } catch (error) {
      console.error('❌ Erro ao inicializar notificações nativas:', error);
    }
  };

  const loadSettings = () => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const data = JSON.parse(saved);
        setSettings(data);
      }
    } catch (error) {
      console.error('Erro ao carregar configurações de notificação:', error);
    }
  };

  const saveSettings = () => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch (error) {
      console.error('Erro ao salvar configurações de notificação:', error);
    }
  };

  const checkPermission = async () => {
    if (isNative) {
      // Android/iOS - Usar Capacitor
      try {
        const result = await LocalNotifications.checkPermissions();
        setHasPermission(result.display === 'granted');
        console.log('Permissão de notificação (Nativo):', result.display);
      } catch (error) {
        console.error('Erro ao verificar permissão:', error);
        setHasPermission(false);
      }
    } else {
      // Web - Usar Notification API do browser
      if ('Notification' in window) {
        setHasPermission(Notification.permission === 'granted');
        console.log('Permissão de notificação (Web):', Notification.permission);
      } else {
        setHasPermission(false);
        console.log('Notificações não suportadas neste navegador');
      }
    }
  };

  const requestPermission = async (): Promise<boolean> => {
    if (isNative) {
      // Android/iOS - Usar Capacitor
      try {
        const result = await LocalNotifications.requestPermissions();
        const granted = result.display === 'granted';
        setHasPermission(granted);
        
        if (granted) {
          console.log('✅ Permissão de notificação concedida (Nativo)');
          // Vibrar para confirmar
          try {
            await Haptics.impact({ style: ImpactStyle.Heavy });
          } catch (e) {
            console.log('Vibração não disponível');
          }
          // Mostrar notificação de teste
          showWelcomeNotification();
        } else {
          console.log('❌ Permissão de notificação negada (Nativo)');
        }
        
        return granted;
      } catch (error) {
        console.error('Erro ao solicitar permissão de notificação:', error);
        return false;
      }
    } else {
      // Web - Usar Notification API do browser
      if (!('Notification' in window)) {
        console.log('Este navegador não suporta notificações');
        return false;
      }

      try {
        const permission = await Notification.requestPermission();
        const granted = permission === 'granted';
        setHasPermission(granted);
        
        if (granted) {
          console.log('✅ Permissão de notificação concedida (Web)');
          // Mostrar notificação de boas-vindas
          showWelcomeNotificationWeb();
        } else {
          console.log('❌ Permissão de notificação negada (Web)');
        }
        
        return granted;
      } catch (error) {
        console.error('Erro ao solicitar permissão de notificação:', error);
        return false;
      }
    }
  };

  const updateSettings = (newSettings: Partial<NotificationSettings>) => {
    setSettings(prev => {
      const updated = { ...prev, ...newSettings };
      
      // Atualizar horários baseado na frequência
      if (newSettings.frequency && !newSettings.times) {
        updated.times = defaultTimes[newSettings.frequency];
      }
      
      return updated;
    });
  };

  const showWelcomeNotification = async () => {
    if (!hasPermission) return;

    try {
      await LocalNotifications.schedule({
        notifications: [
          {
            id: 999,
            title: '🎉 Bem-vindo ao ALE-RR TOP 1!',
            body: 'Notificações ativadas! Você receberá lembretes para estudar. Rumo ao TOP 1! 🚀',
            schedule: { at: new Date(Date.now() + 1000) }, // 1 segundo
            channelId: 'study-reminders',
            sound: 'default',
            smallIcon: 'ic_launcher',
            extra: { type: 'welcome' }
          }
        ]
      });

      // Vibrar
      await Haptics.vibrate({ duration: 500 });
      
      console.log('✅ Notificação de boas-vindas agendada');
    } catch (error) {
      console.error('Erro ao mostrar notificação de boas-vindas:', error);
    }
  };

  const showWelcomeNotificationWeb = () => {
    if (!hasPermission) return;

    try {
      const notification = new Notification('🎉 Bem-vindo ao ALE-RR TOP 1!', {
        body: 'Notificações ativadas! Você receberá lembretes para estudar. Rumo ao TOP 1! 🚀',
        icon: '/path/to/icon.png' // Substitua pelo caminho do ícone
      });

      console.log('✅ Notificação de boas-vindas mostrada');
    } catch (error) {
      console.error('Erro ao mostrar notificação de boas-vindas:', error);
    }
  };

  const scheduleNotifications = async () => {
    if (!settings.enabled || !hasPermission) {
      console.log('Notificações desabilitadas ou sem permissão');
      return;
    }

    if (isNative) {
      // Android/iOS - Usar Capacitor Local Notifications
      try {
        // ⚡ CRÍTICO: Garantir que o canal existe antes de agendar
        await initializeNotifications();
        
        // Cancelar notificações antigas
        await LocalNotifications.cancel({ notifications: Array.from({ length: 100 }, (_, i) => ({ id: i + 1 })) });
        
        const notifications: any[] = [];
        const now = new Date();
        
        // Criar notificações para os próximos 7 dias
        for (let day = 0; day < 7; day++) {
          settings.times.forEach((time, index) => {
            const [hours, minutes] = time.split(':').map(Number);
            const scheduledTime = new Date(now);
            scheduledTime.setDate(now.getDate() + day);
            scheduledTime.setHours(hours, minutes, 0, 0);
            
            // Só agendar se for no futuro
            if (scheduledTime > now) {
              const message = settings.motivationalMessages
                ? motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)]
                : 'Hora de estudar para a ALE-RR!';

              const id = (day * 10) + index + 1;
              
              notifications.push({
                id: id,
                title: '⏰ Hora de Estudar!',
                body: message,
                schedule: { at: scheduledTime },
                channelId: 'study-reminders',
                sound: 'default',
                smallIcon: 'ic_launcher',
                extra: { 
                  type: 'study-reminder',
                  time: time,
                  day: day
                }
              });
            }
          });
        }

        if (notifications.length > 0) {
          await LocalNotifications.schedule({ notifications });
          console.log(`✅ ${notifications.length} notificações agendadas para os próximos 7 dias (Nativo)`);
          console.log('Próximas notificações:', notifications.slice(0, 3).map(n => ({
            id: n.id,
            time: n.schedule.at,
            body: n.body
          })));
        }
      } catch (error) {
        console.error('Erro ao agendar notificações:', error);
      }
    } else {
      // Web - Usar setTimeout e Notification API
      // Limpar timers antigos
      notificationTimers.forEach(timer => clearTimeout(timer));
      setNotificationTimers([]);

      const newTimers: NodeJS.Timeout[] = [];
      const now = new Date();
      
      settings.times.forEach(time => {
        const [hours, minutes] = time.split(':').map(Number);
        const scheduledTime = new Date();
        scheduledTime.setHours(hours, minutes, 0, 0);
        
        // Se o horário já passou hoje, agendar para amanhã
        if (scheduledTime <= now) {
          scheduledTime.setDate(scheduledTime.getDate() + 1);
        }
        
        const delay = scheduledTime.getTime() - now.getTime();
        
        // Agendar notificação
        const timer = setTimeout(() => {
          showNotificationWeb();
          // Reagendar para o próximo dia
          scheduleNotifications();
        }, delay);
        
        newTimers.push(timer);
        
        console.log(`Notificação agendada para ${time} (em ${Math.round(delay / 1000 / 60)} minutos) - Web`);
      });
      
      setNotificationTimers(newTimers);
    }
  };

  const showNotificationWeb = () => {
    if (!hasPermission || !settings.enabled) {
      return;
    }

    const message = settings.motivationalMessages
      ? motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)]
      : 'Hora de estudar para a ALE-RR!';

    try {
      const notification = new Notification('⏰ Hora de Estudar!', {
        body: message,
        icon: '/icon.svg',
        tag: 'alerr-study-reminder',
        requireInteraction: false,
        silent: false
      });

      // Vibrar se disponível
      if ('vibrate' in navigator) {
        navigator.vibrate([200, 100, 200]);
      }

      // Focar na janela quando clicar
      notification.onclick = () => {
        window.focus();
        notification.close();
      };
    } catch (error) {
      console.error('Erro ao mostrar notificação:', error);
    }
  };

  return (
    <NotificationContext.Provider value={{ 
      settings, 
      updateSettings, 
      requestPermission,
      hasPermission,
      scheduleNotifications
    }}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within NotificationProvider');
  }
  return context;
}