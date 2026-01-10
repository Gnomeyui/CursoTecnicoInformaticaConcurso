/**
 * Simple Metrics - Rastreamento de Uso Real
 * 
 * Rastrea métricas básicas de uso do app para entender comportamento do usuário.
 * Dados salvos no localStorage (local-first).
 * 
 * Criado conforme Auditoria 2.0 (10/01/2026)
 */

interface MetricEvent {
  event: string;
  timestamp: number;
  data?: Record<string, any>;
}

interface DailyMetrics {
  date: string;
  sessionsStarted: number;
  questionsAnswered: number;
  correctAnswers: number;
  timeSpentMinutes: number;
  screensVisited: Set<string>;
}

const METRICS_KEY = 'gabaritoo_metrics';
const CURRENT_DAY_KEY = 'gabaritoo_current_day_metrics';

class SimpleMetrics {
  
  /**
   * Registra um evento de uso
   */
  track(event: string, data?: Record<string, any>) {
    const metric: MetricEvent = {
      event,
      timestamp: Date.now(),
      data
    };

    // Salva no histórico
    this.saveToHistory(metric);
    
    // Atualiza métricas do dia
    this.updateDailyMetrics(event, data);
    
    console.log('📊 Métrica registrada:', event, data);
  }

  /**
   * Salva evento no histórico
   */
  private saveToHistory(metric: MetricEvent) {
    try {
      const history = this.getHistory();
      history.push(metric);
      
      // Mantém apenas últimos 1000 eventos para não encher o localStorage
      if (history.length > 1000) {
        history.shift();
      }
      
      localStorage.setItem(METRICS_KEY, JSON.stringify(history));
    } catch (error) {
      console.error('Erro ao salvar métrica:', error);
    }
  }

  /**
   * Recupera histórico de eventos
   */
  getHistory(): MetricEvent[] {
    try {
      const data = localStorage.getItem(METRICS_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  /**
   * Atualiza métricas do dia atual
   */
  private updateDailyMetrics(event: string, data?: Record<string, any>) {
    const today = new Date().toISOString().split('T')[0];
    const current = this.getCurrentDayMetrics();

    // Se mudou de dia, reseta métricas
    if (current.date !== today) {
      this.resetDailyMetrics(today);
      return this.updateDailyMetrics(event, data);
    }

    // Atualiza contadores baseado no evento
    switch (event) {
      case 'session_started':
        current.sessionsStarted++;
        break;
      
      case 'question_answered':
        current.questionsAnswered++;
        if (data?.correct) {
          current.correctAnswers++;
        }
        break;
      
      case 'screen_viewed':
        if (data?.screen) {
          current.screensVisited.add(data.screen);
        }
        break;
      
      case 'time_spent':
        if (data?.minutes) {
          current.timeSpentMinutes += data.minutes;
        }
        break;
    }

    this.saveDailyMetrics(current);
  }

  /**
   * Recupera métricas do dia atual
   */
  getCurrentDayMetrics(): DailyMetrics {
    try {
      const data = localStorage.getItem(CURRENT_DAY_KEY);
      if (!data) {
        return this.createEmptyDayMetrics();
      }
      
      const parsed = JSON.parse(data);
      
      // Converte Set de volta (localStorage serializa Set como array)
      parsed.screensVisited = new Set(parsed.screensVisited || []);
      
      return parsed;
    } catch {
      return this.createEmptyDayMetrics();
    }
  }

  /**
   * Salva métricas do dia
   */
  private saveDailyMetrics(metrics: DailyMetrics) {
    try {
      // Converte Set para array antes de salvar
      const toSave = {
        ...metrics,
        screensVisited: Array.from(metrics.screensVisited)
      };
      
      localStorage.setItem(CURRENT_DAY_KEY, JSON.stringify(toSave));
    } catch (error) {
      console.error('Erro ao salvar métricas diárias:', error);
    }
  }

  /**
   * Reseta métricas do dia
   */
  private resetDailyMetrics(newDate: string) {
    const empty = this.createEmptyDayMetrics();
    empty.date = newDate;
    this.saveDailyMetrics(empty);
  }

  /**
   * Cria objeto de métricas vazio
   */
  private createEmptyDayMetrics(): DailyMetrics {
    return {
      date: new Date().toISOString().split('T')[0],
      sessionsStarted: 0,
      questionsAnswered: 0,
      correctAnswers: 0,
      timeSpentMinutes: 0,
      screensVisited: new Set()
    };
  }

  /**
   * Retorna estatísticas de uso agregadas
   */
  getUsageStats() {
    const daily = this.getCurrentDayMetrics();
    const history = this.getHistory();

    return {
      today: {
        sessions: daily.sessionsStarted,
        questions: daily.questionsAnswered,
        accuracy: daily.questionsAnswered > 0 
          ? Math.round((daily.correctAnswers / daily.questionsAnswered) * 100) 
          : 0,
        timeSpent: daily.timeSpentMinutes,
        screensVisited: daily.screensVisited.size
      },
      allTime: {
        totalEvents: history.length,
        firstUsed: history.length > 0 ? new Date(history[0].timestamp) : null,
        lastUsed: history.length > 0 ? new Date(history[history.length - 1].timestamp) : null
      }
    };
  }

  /**
   * Limpa todas as métricas (útil para debug)
   */
  clear() {
    localStorage.removeItem(METRICS_KEY);
    localStorage.removeItem(CURRENT_DAY_KEY);
    console.log('📊 Métricas limpas');
  }
}

// Singleton
export const metrics = new SimpleMetrics();

// Helpers para eventos comuns
export const trackEvent = {
  sessionStarted: () => metrics.track('session_started'),
  
  questionAnswered: (correct: boolean) => 
    metrics.track('question_answered', { correct }),
  
  screenViewed: (screen: string) => 
    metrics.track('screen_viewed', { screen }),
  
  timeSpent: (minutes: number) => 
    metrics.track('time_spent', { minutes }),
  
  featureUsed: (feature: string) => 
    metrics.track('feature_used', { feature }),
};
