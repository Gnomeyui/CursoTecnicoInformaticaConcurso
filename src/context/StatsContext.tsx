import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface SubjectStats {
  subject: string;
  totalQuestions: number;
  correctAnswers: number;
  wrongAnswers: number;
  accuracy: number;
}

export interface DailyStats {
  date: string;
  questionsAnswered: number;
  correctAnswers: number;
  accuracy: number;
  xpEarned: number;
}

export interface DetailedStats {
  subjectStats: SubjectStats[];
  dailyStats: DailyStats[];
  weeklyProgress: {
    week: string;
    questionsAnswered: number;
    accuracy: number;
  }[];
  monthlyProgress: {
    month: string;
    questionsAnswered: number;
    accuracy: number;
  }[];
  strongestSubjects: SubjectStats[];
  weakestSubjects: SubjectStats[];
}

interface StatsContextType {
  detailedStats: DetailedStats;
  recordQuestionAnswer: (subject: string, isCorrect: boolean) => void;
  getSubjectStats: (subject: string) => SubjectStats | undefined;
  getTodayStats: () => DailyStats | undefined;
}

const StatsContext = createContext<StatsContextType | undefined>(undefined);

const STORAGE_KEY = 'alerr_detailed_stats';

export function StatsProvider({ children }: { children: ReactNode }) {
  const [detailedStats, setDetailedStats] = useState<DetailedStats>({
    subjectStats: [],
    dailyStats: [],
    weeklyProgress: [],
    monthlyProgress: [],
    strongestSubjects: [],
    weakestSubjects: []
  });

  useEffect(() => {
    loadStats();
  }, []);

  useEffect(() => {
    saveStats();
    calculateDerivedStats();
  }, [detailedStats.subjectStats, detailedStats.dailyStats]);

  const loadStats = () => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const data = JSON.parse(saved);
        setDetailedStats(data);
      }
    } catch (error) {
      console.error('Erro ao carregar estatísticas detalhadas:', error);
    }
  };

  const saveStats = () => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(detailedStats));
    } catch (error) {
      console.error('Erro ao salvar estatísticas detalhadas:', error);
    }
  };

  const recordQuestionAnswer = (subject: string, isCorrect: boolean) => {
    const today = new Date().toLocaleDateString();

    setDetailedStats(prev => {
      // Atualizar estatísticas por matéria
      const subjectIndex = prev.subjectStats.findIndex(s => s.subject === subject);
      let newSubjectStats = [...prev.subjectStats];

      if (subjectIndex >= 0) {
        const subjectStat = newSubjectStats[subjectIndex];
        newSubjectStats[subjectIndex] = {
          ...subjectStat,
          totalQuestions: subjectStat.totalQuestions + 1,
          correctAnswers: subjectStat.correctAnswers + (isCorrect ? 1 : 0),
          wrongAnswers: subjectStat.wrongAnswers + (isCorrect ? 0 : 1),
          accuracy: ((subjectStat.correctAnswers + (isCorrect ? 1 : 0)) / (subjectStat.totalQuestions + 1)) * 100
        };
      } else {
        newSubjectStats.push({
          subject,
          totalQuestions: 1,
          correctAnswers: isCorrect ? 1 : 0,
          wrongAnswers: isCorrect ? 0 : 1,
          accuracy: isCorrect ? 100 : 0
        });
      }

      // Atualizar estatísticas diárias
      const dailyIndex = prev.dailyStats.findIndex(d => d.date === today);
      let newDailyStats = [...prev.dailyStats];

      if (dailyIndex >= 0) {
        const dailyStat = newDailyStats[dailyIndex];
        newDailyStats[dailyIndex] = {
          ...dailyStat,
          questionsAnswered: dailyStat.questionsAnswered + 1,
          correctAnswers: dailyStat.correctAnswers + (isCorrect ? 1 : 0),
          accuracy: ((dailyStat.correctAnswers + (isCorrect ? 1 : 0)) / (dailyStat.questionsAnswered + 1)) * 100,
          xpEarned: dailyStat.xpEarned + (isCorrect ? 10 : 5)
        };
      } else {
        newDailyStats.push({
          date: today,
          questionsAnswered: 1,
          correctAnswers: isCorrect ? 1 : 0,
          accuracy: isCorrect ? 100 : 0,
          xpEarned: isCorrect ? 10 : 5
        });
      }

      // Manter apenas últimos 90 dias
      if (newDailyStats.length > 90) {
        newDailyStats = newDailyStats.slice(-90);
      }

      return {
        ...prev,
        subjectStats: newSubjectStats,
        dailyStats: newDailyStats
      };
    });
  };

  const calculateDerivedStats = () => {
    setDetailedStats(prev => {
      // Calcular matérias mais fortes e mais fracas
      const sortedByAccuracy = [...prev.subjectStats]
        .filter(s => s.totalQuestions >= 5) // Mínimo 5 questões
        .sort((a, b) => b.accuracy - a.accuracy);

      const strongestSubjects = sortedByAccuracy.slice(0, 5);
      const weakestSubjects = sortedByAccuracy.slice(-5).reverse();

      // Calcular progresso semanal
      const weeklyProgress = calculateWeeklyProgress(prev.dailyStats);

      // Calcular progresso mensal
      const monthlyProgress = calculateMonthlyProgress(prev.dailyStats);

      return {
        ...prev,
        strongestSubjects,
        weakestSubjects,
        weeklyProgress,
        monthlyProgress
      };
    });
  };

  const calculateWeeklyProgress = (dailyStats: DailyStats[]) => {
    const weeks: { [key: string]: { questions: number; correct: number } } = {};

    dailyStats.forEach(day => {
      const date = new Date(day.date);
      const weekStart = new Date(date);
      weekStart.setDate(date.getDate() - date.getDay());
      const weekKey = weekStart.toLocaleDateString();

      if (!weeks[weekKey]) {
        weeks[weekKey] = { questions: 0, correct: 0 };
      }

      weeks[weekKey].questions += day.questionsAnswered;
      weeks[weekKey].correct += day.correctAnswers;
    });

    return Object.entries(weeks).map(([week, data]) => ({
      week,
      questionsAnswered: data.questions,
      accuracy: data.questions > 0 ? (data.correct / data.questions) * 100 : 0
    })).slice(-12); // Últimas 12 semanas
  };

  const calculateMonthlyProgress = (dailyStats: DailyStats[]) => {
    const months: { [key: string]: { questions: number; correct: number } } = {};

    dailyStats.forEach(day => {
      const date = new Date(day.date);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;

      if (!months[monthKey]) {
        months[monthKey] = { questions: 0, correct: 0 };
      }

      months[monthKey].questions += day.questionsAnswered;
      months[monthKey].correct += day.correctAnswers;
    });

    return Object.entries(months).map(([month, data]) => ({
      month,
      questionsAnswered: data.questions,
      accuracy: data.questions > 0 ? (data.correct / data.questions) * 100 : 0
    })).slice(-6); // Últimos 6 meses
  };

  const getSubjectStats = (subject: string): SubjectStats | undefined => {
    return detailedStats.subjectStats.find(s => s.subject === subject);
  };

  const getTodayStats = (): DailyStats | undefined => {
    const today = new Date().toLocaleDateString();
    return detailedStats.dailyStats.find(d => d.date === today);
  };

  return (
    <StatsContext.Provider value={{ 
      detailedStats, 
      recordQuestionAnswer, 
      getSubjectStats,
      getTodayStats 
    }}>
      {children}
    </StatsContext.Provider>
  );
}

export function useStats() {
  const context = useContext(StatsContext);
  if (!context) {
    throw new Error('useStats must be used within StatsProvider');
  }
  return context;
}
