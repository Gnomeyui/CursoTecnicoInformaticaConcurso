/**
 * @file useDashboard.test.ts
 * @description Testes unitários para o hook useDashboard
 */

import { renderHook } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useDashboard } from '../useDashboard';
import { 
  mockStatsContext, 
  mockGameContext,
  mockCustomizationContext,
} from '../../test/mocks';

// Mocks
vi.mock('../../context/StatsContext', () => ({
  useStats: () => mockStatsContext,
}));

vi.mock('../../context/GameContext', () => ({
  useGame: () => mockGameContext,
}));

vi.mock('../../context/CustomizationContext', () => ({
  useCustomization: () => mockCustomizationContext,
}));

describe('useDashboard Hook', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Inicialização', () => {
    it('deve carregar dados básicos do dashboard', () => {
      const { result } = renderHook(() => useDashboard());

      expect(result.current.xp).toBeDefined();
      expect(result.current.level).toBeDefined();
      expect(result.current.totalQuestions).toBeDefined();
      expect(result.current.accuracy).toBeDefined();
    });

    it('deve carregar dados do contexto de stats', () => {
      const { result } = renderHook(() => useDashboard());

      expect(result.current.totalQuestions).toBe(
        mockStatsContext.detailedStats.totalQuestionsAnswered
      );
      expect(result.current.accuracy).toBe(
        mockStatsContext.detailedStats.overallAccuracy
      );
    });

    it('deve carregar dados do contexto de game', () => {
      const { result } = renderHook(() => useDashboard());

      expect(result.current.xp).toBe(mockGameContext.xp);
      expect(result.current.level).toBe(mockGameContext.level);
    });
  });

  describe('Cálculo de XP e Nível', () => {
    it('deve calcular XP para próximo nível', () => {
      const { result } = renderHook(() => useDashboard());

      // XP atual: 5500, Nível 6
      // Próximo nível precisa de 6000 XP (1000 * 6)
      // XP restante: 500
      expect(result.current.xpForNextLevel).toBe(6000);
      expect(result.current.xpRemaining).toBe(500);
    });

    it('deve calcular porcentagem de progresso do nível', () => {
      const { result } = renderHook(() => useDashboard());

      // XP atual no nível: 5500 % 1000 = 500
      // Progresso: (500 / 1000) * 100 = 50%
      expect(result.current.levelProgress).toBeCloseTo(50, 0);
    });

    it('deve lidar com nível 1 (início)', () => {
      mockGameContext.xp = 250;
      mockGameContext.level = 1;

      const { result } = renderHook(() => useDashboard());

      expect(result.current.xpForNextLevel).toBe(1000);
      expect(result.current.xpRemaining).toBe(750);
      expect(result.current.levelProgress).toBe(25);
    });

    it('deve lidar com XP exato para próximo nível', () => {
      mockGameContext.xp = 6000;
      mockGameContext.level = 6;

      const { result } = renderHook(() => useDashboard());

      expect(result.current.xpRemaining).toBe(0);
      expect(result.current.levelProgress).toBe(100);
    });
  });

  describe('Streak (Sequência)', () => {
    it('deve carregar streak atual', () => {
      const { result } = renderHook(() => useDashboard());

      expect(result.current.currentStreak).toBe(
        mockStatsContext.detailedStats.currentStreak
      );
    });

    it('deve indicar se tem streak ativa (>0)', () => {
      mockStatsContext.detailedStats.currentStreak = 5;

      const { result } = renderHook(() => useDashboard());

      expect(result.current.hasActiveStreak).toBe(true);
    });

    it('deve indicar se não tem streak ativa (=0)', () => {
      mockStatsContext.detailedStats.currentStreak = 0;

      const { result } = renderHook(() => useDashboard());

      expect(result.current.hasActiveStreak).toBe(false);
    });

    it('deve calcular dias até próximo marco', () => {
      mockStatsContext.detailedStats.currentStreak = 5;

      const { result } = renderHook(() => useDashboard());

      // Próximo marco é 7 dias (semana)
      // Faltam 2 dias
      expect(result.current.daysUntilNextMilestone).toBe(2);
    });

    it('deve identificar marco de uma semana (7 dias)', () => {
      mockStatsContext.detailedStats.currentStreak = 7;

      const { result } = renderHook(() => useDashboard());

      expect(result.current.isWeekStreak).toBe(true);
    });

    it('deve identificar marco de um mês (30 dias)', () => {
      mockStatsContext.detailedStats.currentStreak = 30;

      const { result } = renderHook(() => useDashboard());

      expect(result.current.isMonthStreak).toBe(true);
    });
  });

  describe('Estatísticas Gerais', () => {
    it('deve calcular taxa de acerto em porcentagem', () => {
      const { result } = renderHook(() => useDashboard());

      expect(result.current.accuracy).toBeGreaterThanOrEqual(0);
      expect(result.current.accuracy).toBeLessThanOrEqual(100);
    });

    it('deve formatar tempo de estudo em horas', () => {
      const { result } = renderHook(() => useDashboard());

      // totalStudyTime está em segundos no mock (3600s = 1h)
      expect(result.current.studyTimeHours).toBe(1);
    });

    it('deve calcular média de questões por dia', () => {
      const { result } = renderHook(() => useDashboard());

      const totalDays = mockStatsContext.detailedStats.dailyStats.length;
      const totalQuestions = mockStatsContext.detailedStats.totalQuestionsAnswered;
      const avgExpected = Math.round(totalQuestions / totalDays);

      expect(result.current.averageQuestionsPerDay).toBe(avgExpected);
    });
  });

  describe('Desempenho por Matéria', () => {
    it('deve identificar melhor matéria (maior accuracy)', () => {
      const { result } = renderHook(() => useDashboard());

      // No mock: Matemática e Informática têm 80%
      expect(result.current.bestSubject).toBeDefined();
      expect(result.current.bestSubject?.accuracy).toBe(80);
    });

    it('deve identificar pior matéria (menor accuracy)', () => {
      const { result } = renderHook(() => useDashboard());

      // No mock: Atualidades tem 60%
      expect(result.current.worstSubject).toBeDefined();
      expect(result.current.worstSubject?.subject).toBe('Atualidades');
      expect(result.current.worstSubject?.accuracy).toBe(60);
    });

    it('deve listar top 3 matérias', () => {
      const { result } = renderHook(() => useDashboard());

      expect(result.current.topSubjects).toHaveLength(3);
      
      // Deve estar ordenado por accuracy (decrescente)
      const accuracies = result.current.topSubjects.map(s => s.accuracy);
      const sortedAccuracies = [...accuracies].sort((a, b) => b - a);
      expect(accuracies).toEqual(sortedAccuracies);
    });
  });

  describe('Progresso Recente (Últimos 7 Dias)', () => {
    it('deve calcular total de questões dos últimos 7 dias', () => {
      const { result } = renderHook(() => useDashboard());

      const total = mockStatsContext.detailedStats.dailyStats.reduce(
        (sum, day) => sum + day.questionsAnswered,
        0
      );

      expect(result.current.last7DaysTotal).toBe(total);
    });

    it('deve calcular média diária dos últimos 7 dias', () => {
      const { result } = renderHook(() => useDashboard());

      const total = mockStatsContext.detailedStats.dailyStats.reduce(
        (sum, day) => sum + day.questionsAnswered,
        0
      );
      const avg = Math.round(total / 7);

      expect(result.current.last7DaysAverage).toBe(avg);
    });

    it('deve identificar melhor dia da semana', () => {
      const { result } = renderHook(() => useDashboard());

      // No mock: 29/01 tem 20 questões (maior)
      expect(result.current.bestDay).toBeDefined();
      expect(result.current.bestDay?.questionsAnswered).toBe(20);
    });

    it('deve calcular tendência (crescente, estável, decrescente)', () => {
      const { result } = renderHook(() => useDashboard());

      // Comparar primeiros 3 dias com últimos 3 dias
      expect(result.current.trend).toMatch(/crescente|estável|decrescente/i);
    });
  });

  describe('Achievements (Conquistas)', () => {
    it('deve listar conquistas desbloqueadas', () => {
      const { result } = renderHook(() => useDashboard());

      expect(result.current.achievements).toBeDefined();
      expect(result.current.achievements).toContain('first_study');
      expect(result.current.achievements).toContain('week_streak');
    });

    it('deve contar total de conquistas', () => {
      const { result } = renderHook(() => useDashboard());

      expect(result.current.achievementCount).toBe(
        mockGameContext.achievements.length
      );
    });

    it('deve identificar se conquistou todas', () => {
      mockGameContext.achievements = [
        'first_study',
        'week_streak',
        'month_streak',
        'master_accuracy',
        'speed_demon',
      ];

      const { result } = renderHook(() => useDashboard());

      // Assumindo 5 conquistas totais
      expect(result.current.hasAllAchievements).toBe(true);
    });
  });

  describe('Tema/Customização', () => {
    it('deve carregar tema ativo', () => {
      const { result } = renderHook(() => useDashboard());

      expect(result.current.currentTheme).toBe(
        mockCustomizationContext.settings.colorTheme
      );
    });

    it('deve ter dados do tema (nome e cores)', () => {
      const { result } = renderHook(() => useDashboard());

      expect(result.current.theme.name).toBe('Focus');
      expect(result.current.theme.primary).toBe('#3b82f6');
    });
  });

  describe('Metas e Recomendações', () => {
    it('deve sugerir meta diária baseada em histórico', () => {
      const { result } = renderHook(() => useDashboard());

      // Meta deve ser >= média atual
      expect(result.current.suggestedDailyGoal).toBeGreaterThanOrEqual(
        result.current.averageQuestionsPerDay
      );
    });

    it('deve indicar se bateu meta do dia', () => {
      const { result } = renderHook(() => useDashboard());

      // Hoje (último dia) tem 17 questões
      // Se meta for 15, bateu. Se for 20, não bateu.
      expect(typeof result.current.metGoalToday).toBe('boolean');
    });

    it('deve recomendar matéria para estudar (a pior)', () => {
      const { result } = renderHook(() => useDashboard());

      // Deve recomendar Atualidades (60% - pior)
      expect(result.current.recommendedSubject).toBe('Atualidades');
    });
  });

  describe('Casos Extremos', () => {
    it('deve lidar com 0 questões respondidas', () => {
      mockStatsContext.detailedStats.totalQuestionsAnswered = 0;
      mockStatsContext.detailedStats.dailyStats = [];

      const { result } = renderHook(() => useDashboard());

      expect(result.current.totalQuestions).toBe(0);
      expect(result.current.accuracy).toBe(0);
      expect(result.current.averageQuestionsPerDay).toBe(0);
    });

    it('deve lidar com 0 XP (novo usuário)', () => {
      mockGameContext.xp = 0;
      mockGameContext.level = 1;

      const { result } = renderHook(() => useDashboard());

      expect(result.current.xp).toBe(0);
      expect(result.current.level).toBe(1);
      expect(result.current.levelProgress).toBe(0);
    });

    it('deve lidar com subjectStats vazio', () => {
      mockStatsContext.detailedStats.subjectStats = [];

      const { result } = renderHook(() => useDashboard());

      expect(result.current.bestSubject).toBeUndefined();
      expect(result.current.worstSubject).toBeUndefined();
      expect(result.current.topSubjects).toEqual([]);
    });

    it('deve lidar com apenas 1 matéria estudada', () => {
      mockStatsContext.detailedStats.subjectStats = [
        { subject: 'Português', questionsAnswered: 10, correctAnswers: 7, accuracy: 70 },
      ];

      const { result } = renderHook(() => useDashboard());

      expect(result.current.bestSubject?.subject).toBe('Português');
      expect(result.current.worstSubject?.subject).toBe('Português');
      expect(result.current.topSubjects).toHaveLength(1);
    });
  });

  describe('Memoização (Performance)', () => {
    it('valores derivados não devem recalcular se dados não mudarem', () => {
      const { result, rerender } = renderHook(() => useDashboard());

      const firstBestSubject = result.current.bestSubject;
      const firstTopSubjects = result.current.topSubjects;
      
      rerender();
      
      const secondBestSubject = result.current.bestSubject;
      const secondTopSubjects = result.current.topSubjects;

      // Deve ser a mesma referência (memoizado)
      expect(firstBestSubject).toBe(secondBestSubject);
      expect(firstTopSubjects).toBe(secondTopSubjects);
    });
  });
});
