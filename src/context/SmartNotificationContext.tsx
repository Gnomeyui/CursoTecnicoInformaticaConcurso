import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface NotificationConfig {
  enabled: boolean;
  startTime: string; // Formato "08:00"
  endTime: string; // Formato "22:00"
  intervalMinutes: number; // 10, 15, 30, etc.
  questionsPerNotification: number; // Quantas questões por notificação
  allowAccumulation: boolean; // Permitir acumular questões não feitas
  profileId: string | null; // ID do perfil de concurso
}

export interface PendingQuestions {
  profileId: string;
  count: number; // Quantidade acumulada
  lastNotification: string; // Última notificação enviada
}

interface SmartNotificationContextType {
  config: NotificationConfig;
  pendingQuestions: PendingQuestions[];
  updateConfig: (updates: Partial<NotificationConfig>) => void;
  addPendingQuestions: (profileId: string, count: number) => void;
  clearPendingQuestions: (profileId: string, answeredCount: number) => void;
  getPendingCount: (profileId: string) => number;
  shouldSendNotification: () => boolean;
  getNextNotificationTime: () => Date | null;
}

const SmartNotificationContext = createContext<SmartNotificationContextType | undefined>(undefined);

export function SmartNotificationProvider({ children }: { children: ReactNode }) {
  const [config, setConfig] = useState<NotificationConfig>({
    enabled: true,
    startTime: '08:00',
    endTime: '22:00',
    intervalMinutes: 30,
    questionsPerNotification: 10,
    allowAccumulation: true,
    profileId: null,
  });

  const [pendingQuestions, setPendingQuestions] = useState<PendingQuestions[]>([]);

  // Carregar configurações salvas
  useEffect(() => {
    const savedConfig = localStorage.getItem('smart_notification_config');
    const savedPending = localStorage.getItem('pending_questions');

    if (savedConfig) {
      try {
        setConfig(JSON.parse(savedConfig));
      } catch (e) {
        console.error('Erro ao carregar config de notificações:', e);
      }
    }

    if (savedPending) {
      try {
        setPendingQuestions(JSON.parse(savedPending));
      } catch (e) {
        console.error('Erro ao carregar questões pendentes:', e);
      }
    }
  }, []);

  // Salvar configurações
  useEffect(() => {
    localStorage.setItem('smart_notification_config', JSON.stringify(config));
  }, [config]);

  useEffect(() => {
    localStorage.setItem('pending_questions', JSON.stringify(pendingQuestions));
  }, [pendingQuestions]);

  const updateConfig = (updates: Partial<NotificationConfig>) => {
    setConfig(prev => ({ ...prev, ...updates }));
  };

  const addPendingQuestions = (profileId: string, count: number) => {
    if (!config.allowAccumulation) return;

    setPendingQuestions(prev => {
      const existing = prev.find(p => p.profileId === profileId);
      
      if (existing) {
        return prev.map(p =>
          p.profileId === profileId
            ? {
                ...p,
                count: p.count + count,
                lastNotification: new Date().toISOString(),
              }
            : p
        );
      } else {
        return [
          ...prev,
          {
            profileId,
            count,
            lastNotification: new Date().toISOString(),
          }
        ];
      }
    });
  };

  const clearPendingQuestions = (profileId: string, answeredCount: number) => {
    setPendingQuestions(prev =>
      prev.map(p =>
        p.profileId === profileId
          ? { ...p, count: Math.max(0, p.count - answeredCount) }
          : p
      ).filter(p => p.count > 0)
    );
  };

  const getPendingCount = (profileId: string): number => {
    const pending = pendingQuestions.find(p => p.profileId === profileId);
    return pending?.count || 0;
  };

  const shouldSendNotification = (): boolean => {
    if (!config.enabled) return false;

    const now = new Date();
    const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    
    // Verificar se está dentro do horário
    if (currentTime < config.startTime || currentTime > config.endTime) {
      return false;
    }

    return true;
  };

  const getNextNotificationTime = (): Date | null => {
    if (!config.enabled) return null;

    const now = new Date();
    const [startHour, startMinute] = config.startTime.split(':').map(Number);
    const [endHour, endMinute] = config.endTime.split(':').map(Number);

    const nextNotification = new Date(now);
    nextNotification.setMinutes(now.getMinutes() + config.intervalMinutes);

    // Se passou do horário de fim, agendar para amanhã no horário de início
    const nextTime = `${nextNotification.getHours().toString().padStart(2, '0')}:${nextNotification.getMinutes().toString().padStart(2, '0')}`;
    
    if (nextTime > config.endTime) {
      nextNotification.setDate(nextNotification.getDate() + 1);
      nextNotification.setHours(startHour, startMinute, 0, 0);
    }

    return nextNotification;
  };

  return (
    <SmartNotificationContext.Provider
      value={{
        config,
        pendingQuestions,
        updateConfig,
        addPendingQuestions,
        clearPendingQuestions,
        getPendingCount,
        shouldSendNotification,
        getNextNotificationTime,
      }}
    >
      {children}
    </SmartNotificationContext.Provider>
  );
}

export function useSmartNotification() {
  const context = useContext(SmartNotificationContext);
  if (!context) {
    throw new Error('useSmartNotification deve ser usado dentro de SmartNotificationProvider');
  }
  return context;
}
