import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

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

const defaultTimes = {
  low: ['09:00'],
  medium: ['09:00', '14:00', '20:00'],
  high: ['08:00', '11:00', '14:00', '17:00', '20:00']
};

const motivationalMessages = [
  'Hora de estudar! Cada questão te aproxima do TOP 5! 🚀',
  'Seus concorrentes estão estudando. E você? 💪',
  'Apenas 10 questões hoje já fazem diferença! 📚',
  'O TOP 5 não vai se conquistar sozinho! Vamos lá! 🏆',
  'Lembre-se: consistência é a chave do sucesso! 🔑',
  'Sua vaga na ALE-RR está te esperando! 🎯',
  'Cada minuto de estudo conta! Vamos revisar? 📖',
  'Não deixe para amanhã! Responda algumas questões agora! ⚡',
  'Você está mais perto do que imagina! Continue! 🌟',
  'TOP 5 requer dedicação diária. Está pronto? 💯'
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
    askPermissionOnFirstVisit();
  }, []);

  useEffect(() => {
    saveSettings();
    if (settings.enabled && hasPermission) {
      scheduleNotifications();
    }
  }, [settings, hasPermission]);

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

  const checkPermission = () => {
    if ('Notification' in window) {
      setHasPermission(Notification.permission === 'granted');
    }
  };

  const requestPermission = async (): Promise<boolean> => {
    if (!('Notification' in window)) {
      console.log('Este navegador não suporta notificações');
      return false;
    }

    try {
      const permission = await Notification.requestPermission();
      const granted = permission === 'granted';
      setHasPermission(granted);
      return granted;
    } catch (error) {
      console.error('Erro ao solicitar permissão de notificação:', error);
      return false;
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

  const askPermissionOnFirstVisit = async () => {
    // Pedir permissão automaticamente na primeira visita
    const hasAsked = localStorage.getItem(PERMISSION_ASKED_KEY);
    
    if (!hasAsked && 'Notification' in window && Notification.permission === 'default') {
      // Aguardar 3 segundos antes de pedir (melhor UX)
      setTimeout(async () => {
        const granted = await requestPermission();
        localStorage.setItem(PERMISSION_ASKED_KEY, 'true');
        
        if (granted) {
          // Mostrar notificação de boas-vindas
          showWelcomeNotification();
        }
      }, 3000);
    }
  };

  const showWelcomeNotification = () => {
    if (hasPermission) {
      try {
        new Notification('🎉 Bem-vindo ao ALE-RR TOP 5!', {
          body: 'Notificações ativadas! Você receberá lembretes para estudar. Rumo ao TOP 5! 🚀',
          icon: '/icon-192.png',
          tag: 'welcome'
        });
      } catch (error) {
        console.error('Erro ao mostrar notificação de boas-vindas:', error);
      }
    }
  };

  const scheduleNotifications = () => {
    // Limpar timers antigos
    notificationTimers.forEach(timer => clearTimeout(timer));
    setNotificationTimers([]);

    if (!settings.enabled || !hasPermission) {
      return;
    }

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
        showNotification();
        // Reagendar para o próximo dia
        scheduleNotifications();
      }, delay);
      
      newTimers.push(timer);
      
      console.log(`Notificação agendada para ${time} (em ${Math.round(delay / 1000 / 60)} minutos)`);
    });
    
    setNotificationTimers(newTimers);
  };

  const showNotification = () => {
    if (!hasPermission || !settings.enabled) {
      return;
    }

    const message = settings.motivationalMessages
      ? motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)]
      : 'Hora de estudar para a ALE-RR!';

    try {
      const notification = new Notification('⏰ Hora de Estudar!', {
        body: message,
        icon: '/icon-192.png',
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