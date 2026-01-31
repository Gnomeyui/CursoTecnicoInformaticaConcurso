/**
 * @file useStatistics.test.ts
 * @description Testes unitários para o hook useStatistics
 */

import { renderHook } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useStatistics } from '../useStatistics';
import { mockStatsContext, mockGameContext } from '../../test/mocks';

// Mocks
vi.mock('../../context/StatsContext', () => ({
  useStats: () => mockStatsContext,
}));

vi.mock('../../context/GameContext', () => ({
  useGame: () => mockGameContext,
}));

describe('useStatistics Hook', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Inicialização', () => {
    it('deve retornar dados básicos de estatísticas', () => {
      const { result } = renderHook(() => useStatistics());

      expect(result.current.detailedStats).toBeDefined();
      expect(result.current.xp).toBe(mockGameContext.xp);
      expect(result.current.level).toBe(mockGameContext.level);
    });

    it('deve ter cores de gráfico definidas', () => {
      const { result } = renderHook(() => useStatistics());

      expect(result.current.chartColors).toBeInstanceOf(Array);
      expect(result.current.chartColors.length).toBe(5);
      expect(result.current.chartColors[0]).toBe('#3b82f6');
    });
  });

  describe('Computação de Dados dos Últimos 7 Dias', () => {
    it('deve processar dailyStats corretamente', () => {
      const { result } = renderHook(() => useStatistics());

      expect(result.current.last7Days).toBeInstanceOf(Array);
      expect(result.current.last7Days.length).toBe(7);
    });

    it('deve formatar datas corretamente', () => {
      const { result } = renderHook(() => useStatistics());

      const firstDay = result.current.last7Days[0];
      expect(firstDay.date).toMatch(/\d{2}\/\d{2}/); // Formato DD/MM
    });

    it('deve incluir questões e acertos', () => {
      const { result } = renderHook(() => useStatistics());

      const firstDay = result.current.last7Days[0];
      expect(firstDay).toHaveProperty('questões');
      expect(firstDay).toHaveProperty('acertos');
      expect(typeof firstDay.questões).toBe('number');
      expect(typeof firstDay.acertos).toBe('number');
    });

    it('deve retornar array vazio se não houver dados', () => {
      vi.mocked(mockStatsContext).detailedStats.dailyStats = [];

      const { result } = renderHook(() => useStatistics());

      expect(result.current.last7Days).toEqual([]);
      expect(result.current.hasDataLast7Days).toBe(false);
    });

    it('deve pegar apenas últimos 7 dias', () => {
      const manyDays = Array.from({ length: 30 }, (_, i) => ({
        date: `2026-01-${String(i + 1).padStart(2, '0')}`,
        questionsAnswered: 10,
        correctAnswers: 7,
      }));

      vi.mocked(mockStatsContext).detailedStats.dailyStats = manyDays;

      const { result } = renderHook(() => useStatistics());

      expect(result.current.last7Days.length).toBe(7);
    });
  });

  describe('Computação de Dados por Matéria', () => {
    it('deve processar subjectStats corretamente', () => {
      const { result } = renderHook(() => useStatistics());

      expect(result.current.subjectData).toBeInstanceOf(Array);
      expect(result.current.subjectData.length).toBe(5);
    });

    it('deve incluir todas as propriedades necessárias', () => {
      const { result } = renderHook(() => useStatistics());

      const firstSubject = result.current.subjectData[0];
      expect(firstSubject).toHaveProperty('name');
      expect(firstSubject).toHaveProperty('questões');
      expect(firstSubject).toHaveProperty('acertos');
      expect(firstSubject).toHaveProperty('precisão');
    });

    it('deve arredondar precisão para inteiro', () => {
      const { result } = renderHook(() => useStatistics());

      result.current.subjectData.forEach(subject => {
        expect(Number.isInteger(subject.precisão)).toBe(true);
      });
    });

    it('deve retornar array vazio se não houver dados', () => {
      vi.mocked(mockStatsContext).detailedStats.subjectStats = [];

      const { result } = renderHook(() => useStatistics());

      expect(result.current.subjectData).toEqual([]);
      expect(result.current.hasSubjectData).toBe(false);
    });
  });

  describe('Computação de Dados para Gráfico de Pizza', () => {
    it('deve processar pieData corretamente', () => {
      const { result } = renderHook(() => useStatistics());

      expect(result.current.pieData).toBeInstanceOf(Array);
      expect(result.current.pieData.length).toBe(5);
    });

    it('deve incluir nome e valor', () => {
      const { result } = renderHook(() => useStatistics());

      const firstItem = result.current.pieData[0];
      expect(firstItem).toHaveProperty('name');
      expect(firstItem).toHaveProperty('value');
      expect(typeof firstItem.name).toBe('string');
      expect(typeof firstItem.value).toBe('number');
    });

    it('valor deve ser o número de questões respondidas', () => {
      const { result } = renderHook(() => useStatistics());

      // Português tem 30 questões no mock
      const portugues = result.current.pieData.find(item => item.name === 'Português');
      expect(portugues?.value).toBe(30);
    });

    it('deve retornar array vazio se não houver dados', () => {
      vi.mocked(mockStatsContext).detailedStats.subjectStats = [];

      const { result } = renderHook(() => useStatistics());

      expect(result.current.pieData).toEqual([]);
    });
  });

  describe('Flags Booleanas', () => {
    it('hasDataLast7Days deve ser true quando há dados', () => {
      const { result } = renderHook(() => useStatistics());

      expect(result.current.hasDataLast7Days).toBe(true);
    });

    it('hasDataLast7Days deve ser false quando não há dados', () => {
      vi.mocked(mockStatsContext).detailedStats.dailyStats = [];

      const { result } = renderHook(() => useStatistics());

      expect(result.current.hasDataLast7Days).toBe(false);
    });

    it('hasSubjectData deve ser true quando há dados', () => {
      const { result } = renderHook(() => useStatistics());

      expect(result.current.hasSubjectData).toBe(true);
    });

    it('hasSubjectData deve ser false quando não há dados', () => {
      vi.mocked(mockStatsContext).detailedStats.subjectStats = [];

      const { result } = renderHook(() => useStatistics());

      expect(result.current.hasSubjectData).toBe(false);
    });
  });

  describe('Memoização (Performance)', () => {
    it('last7Days não deve recalcular se dailyStats não mudar', () => {
      const { result, rerender } = renderHook(() => useStatistics());

      const firstResult = result.current.last7Days;
      
      rerender();
      
      const secondResult = result.current.last7Days;

      // Deve ser a mesma referência (memoizado)
      expect(firstResult).toBe(secondResult);
    });

    it('subjectData não deve recalcular se subjectStats não mudar', () => {
      const { result, rerender } = renderHook(() => useStatistics());

      const firstResult = result.current.subjectData;
      
      rerender();
      
      const secondResult = result.current.subjectData;

      expect(firstResult).toBe(secondResult);
    });

    it('pieData não deve recalcular se subjectStats não mudar', () => {
      const { result, rerender } = renderHook(() => useStatistics());

      const firstResult = result.current.pieData;
      
      rerender();
      
      const secondResult = result.current.pieData;

      expect(firstResult).toBe(secondResult);
    });
  });

  describe('Integridade dos Dados', () => {
    it('total de questões nos gráficos deve bater com detailedStats', () => {
      const { result } = renderHook(() => useStatistics());

      const totalFromPie = result.current.pieData.reduce(
        (sum, item) => sum + item.value, 
        0
      );

      expect(totalFromPie).toBe(result.current.detailedStats.totalQuestionsAnswered);
    });

    it('precisão de cada matéria deve estar entre 0 e 100', () => {
      const { result } = renderHook(() => useStatistics());

      result.current.subjectData.forEach(subject => {
        expect(subject.precisão).toBeGreaterThanOrEqual(0);
        expect(subject.precisão).toBeLessThanOrEqual(100);
      });
    });

    it('número de acertos não deve exceder número de questões', () => {
      const { result } = renderHook(() => useStatistics());

      result.current.subjectData.forEach(subject => {
        expect(subject.acertos).toBeLessThanOrEqual(subject.questões);
      });
    });
  });

  describe('Casos Extremos', () => {
    it('deve lidar com dailyStats undefined', () => {
      vi.mocked(mockStatsContext).detailedStats.dailyStats = undefined as any;

      const { result } = renderHook(() => useStatistics());

      expect(result.current.last7Days).toEqual([]);
      expect(result.current.hasDataLast7Days).toBe(false);
    });

    it('deve lidar com subjectStats undefined', () => {
      vi.mocked(mockStatsContext).detailedStats.subjectStats = undefined as any;

      const { result } = renderHook(() => useStatistics());

      expect(result.current.subjectData).toEqual([]);
      expect(result.current.pieData).toEqual([]);
      expect(result.current.hasSubjectData).toBe(false);
    });

    it('deve lidar com datas inválidas', () => {
      const invalidDate = {
        date: 'invalid-date',
        questionsAnswered: 10,
        correctAnswers: 7,
      };

      vi.mocked(mockStatsContext).detailedStats.dailyStats = [invalidDate as any];

      const { result } = renderHook(() => useStatistics());

      // Não deve quebrar, apenas retornar formato inválido
      expect(result.current.last7Days.length).toBe(1);
    });

    it('deve lidar com accuracy NaN', () => {
      const zeroQuestions = {
        subject: 'Teste',
        questionsAnswered: 0,
        correctAnswers: 0,
        accuracy: NaN,
      };

      vi.mocked(mockStatsContext).detailedStats.subjectStats = [zeroQuestions as any];

      const { result } = renderHook(() => useStatistics());

      const subject = result.current.subjectData[0];
      // Math.round(NaN) = NaN, mas não deve quebrar o app
      expect(result.current.subjectData.length).toBe(1);
    });
  });
});
