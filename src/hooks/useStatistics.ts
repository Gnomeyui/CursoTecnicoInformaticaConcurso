/**
 * @file useStatistics.ts
 * @description Custom Hook para lógica de Statistics
 * @pattern Headless Logic Pattern - Separação total de UI e Lógica
 */

import { useMemo } from 'react';
import { useStats } from '../context/StatsContext';
import { useGame } from '../context/GameContext';

/**
 * Dados do gráfico diário
 */
export interface DailyChartData {
  date: string;
  questões: number;
  acertos: number;
}

/**
 * Dados do gráfico por matéria
 */
export interface SubjectChartData {
  name: string;
  questões: number;
  acertos: number;
  precisão: number;
}

/**
 * Dados do gráfico de pizza
 */
export interface PieChartData {
  name: string;
  value: number;
}

/**
 * Dados retornados pelo hook
 */
export interface StatisticsData {
  // Raw stats from context
  detailedStats: any;
  xp: number;
  level: number;
  
  // Computed chart data
  last7Days: DailyChartData[];
  subjectData: SubjectChartData[];
  pieData: PieChartData[];
  
  // Flags
  hasDataLast7Days: boolean;
  hasSubjectData: boolean;
  
  // Chart colors
  chartColors: string[];
}

/**
 * Hook principal de Statistics
 * 
 * @returns {StatisticsData} Dados processados para gráficos
 * 
 * @example
 * ```tsx
 * const stats = useStatistics();
 * 
 * return (
 *   <div>
 *     <h1>Precisão: {Math.round(stats.detailedStats.overallAccuracy)}%</h1>
 *     <LineChart data={stats.last7Days} />
 *   </div>
 * );
 * ```
 */
export const useStatistics = (): StatisticsData => {
  // ============================================
  // 1. CONTEXTS
  // ============================================
  const { detailedStats } = useStats();
  const { xp, level } = useGame();

  // ============================================
  // 2. CHART COLORS (CONSTANTS)
  // ============================================
  const chartColors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

  // ============================================
  // 3. COMPUTED VALUES (MEMOIZED)
  // ============================================

  /**
   * Dados dos últimos 7 dias
   */
  const last7Days = useMemo<DailyChartData[]>(() => {
    if (!detailedStats.dailyStats || detailedStats.dailyStats.length === 0) {
      return [];
    }

    return detailedStats.dailyStats
      .slice(-7)
      .map((stat: any) => ({
        date: new Date(stat.date).toLocaleDateString('pt-BR', { 
          day: '2-digit', 
          month: '2-digit' 
        }),
        questões: stat.questionsAnswered,
        acertos: stat.correctAnswers,
      }));
  }, [detailedStats.dailyStats]);

  /**
   * Dados de desempenho por matéria
   */
  const subjectData = useMemo<SubjectChartData[]>(() => {
    if (!detailedStats.subjectStats || detailedStats.subjectStats.length === 0) {
      return [];
    }

    return detailedStats.subjectStats.map((stat: any) => ({
      name: stat.subject,
      questões: stat.questionsAnswered,
      acertos: stat.correctAnswers,
      precisão: Math.round(stat.accuracy),
    }));
  }, [detailedStats.subjectStats]);

  /**
   * Dados para gráfico de pizza (distribuição por matéria)
   */
  const pieData = useMemo<PieChartData[]>(() => {
    if (!detailedStats.subjectStats || detailedStats.subjectStats.length === 0) {
      return [];
    }

    return detailedStats.subjectStats.map((stat: any) => ({
      name: stat.subject,
      value: stat.questionsAnswered,
    }));
  }, [detailedStats.subjectStats]);

  /**
   * Flag: Tem dados dos últimos 7 dias?
   */
  const hasDataLast7Days = useMemo(() => {
    return last7Days.length > 0;
  }, [last7Days]);

  /**
   * Flag: Tem dados de matérias?
   */
  const hasSubjectData = useMemo(() => {
    return subjectData.length > 0;
  }, [subjectData]);

  // ============================================
  // 4. RETURN (Dados Processados)
  // ============================================
  return {
    // Raw stats
    detailedStats,
    xp,
    level,
    
    // Chart data
    last7Days,
    subjectData,
    pieData,
    
    // Flags
    hasDataLast7Days,
    hasSubjectData,
    
    // Colors
    chartColors,
  };
};
