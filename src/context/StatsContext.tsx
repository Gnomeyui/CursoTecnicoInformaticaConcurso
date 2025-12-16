import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface DailyStat {
  date: string; // ISO format: YYYY-MM-DD
  questionsAnswered: number;
  correctAnswers: number;
  wrongAnswers: number;
  studyTime: number; // em minutos
}

interface SubjectStat {
  subject: string;
  questionsAnswered: number;
  correctAnswers: number;
  accuracy: number;
}

interface DetailedStats {
  dailyStats: DailyStat[];
  subjectStats: SubjectStat[];
  totalQuestionsAnswered: number;
  totalCorrectAnswers: number;
  overallAccuracy: number;
  currentStreak: number;
  longestStreak: number;
  totalStudyTime: number; // em minutos
}

interface StatsContextType {
  detailedStats: DetailedStats;
  recordAnswer: (subject: string, isCorrect: boolean) => void;
  recordStudyTime: (minutes: number) => void;
  getSubjectAccuracy: (subject: string) => number;
  getTodayStats: () => DailyStat;
}

const StatsContext = createContext<StatsContextType | undefined>(undefined);

const defaultStats: DetailedStats = {
  dailyStats: [],
  subjectStats: [],
  totalQuestionsAnswered: 0,
  totalCorrectAnswers: 0,
  overallAccuracy: 0,
  currentStreak: 0,
  longestStreak: 0,
  totalStudyTime: 0,
};

export function StatsProvider({ children }: { children: ReactNode }) {
  const [detailedStats, setDetailedStats] = useState<DetailedStats>(defaultStats);

  // Carregar dados salvos
  useEffect(() => {
    const saved = localStorage.getItem('alerr_stats');
    if (saved) {
      try {
        const data = JSON.parse(saved);
        setDetailedStats(data);
      } catch (e) {
        console.error('Erro ao carregar estatísticas:', e);
      }
    }
  }, []);

  // Salvar dados (usando toISOString para evitar problemas de timezone)
  useEffect(() => {
    localStorage.setItem('alerr_stats', JSON.stringify(detailedStats));
  }, [detailedStats]);

  const getTodayStats = (): DailyStat => {
    const today = new Date().toISOString().split('T')[0];
    const todayStat = detailedStats.dailyStats.find(d => d.date === today);
    
    if (todayStat) {
      return todayStat;
    }
    
    return {
      date: today,
      questionsAnswered: 0,
      correctAnswers: 0,
      wrongAnswers: 0,
      studyTime: 0,
    };
  };

  const recordAnswer = (subject: string, isCorrect: boolean) => {
    setDetailedStats(prev => {
      const today = new Date().toISOString().split('T')[0];
      
      // Atualizar estatísticas diárias
      const dailyStats = [...prev.dailyStats];
      const todayIndex = dailyStats.findIndex(d => d.date === today);
      
      if (todayIndex >= 0) {
        dailyStats[todayIndex] = {
          ...dailyStats[todayIndex],
          questionsAnswered: dailyStats[todayIndex].questionsAnswered + 1,
          correctAnswers: dailyStats[todayIndex].correctAnswers + (isCorrect ? 1 : 0),
          wrongAnswers: dailyStats[todayIndex].wrongAnswers + (isCorrect ? 0 : 1),
        };
      } else {
        dailyStats.push({
          date: today,
          questionsAnswered: 1,
          correctAnswers: isCorrect ? 1 : 0,
          wrongAnswers: isCorrect ? 0 : 1,
          studyTime: 0,
        });
      }
      
      // Atualizar estatísticas por matéria
      const subjectStats = [...prev.subjectStats];
      const subjectIndex = subjectStats.findIndex(s => s.subject === subject);
      
      if (subjectIndex >= 0) {
        const current = subjectStats[subjectIndex];
        const newCorrect = current.correctAnswers + (isCorrect ? 1 : 0);
        const newTotal = current.questionsAnswered + 1;
        
        subjectStats[subjectIndex] = {
          ...current,
          questionsAnswered: newTotal,
          correctAnswers: newCorrect,
          accuracy: (newCorrect / newTotal) * 100,
        };
      } else {
        subjectStats.push({
          subject,
          questionsAnswered: 1,
          correctAnswers: isCorrect ? 1 : 0,
          accuracy: isCorrect ? 100 : 0,
        });
      }
      
      // Calcular estatísticas gerais
      const totalQuestionsAnswered = prev.totalQuestionsAnswered + 1;
      const totalCorrectAnswers = prev.totalCorrectAnswers + (isCorrect ? 1 : 0);
      const overallAccuracy = (totalCorrectAnswers / totalQuestionsAnswered) * 100;
      
      // Calcular streak
      const sortedDays = [...dailyStats].sort((a, b) => b.date.localeCompare(a.date));
      let currentStreak = 0;
      let longestStreak = prev.longestStreak;
      
      for (let i = 0; i < sortedDays.length; i++) {
        const expectedDate = new Date();
        expectedDate.setDate(expectedDate.getDate() - i);
        const expectedDateStr = expectedDate.toISOString().split('T')[0];
        
        if (sortedDays[i].date === expectedDateStr && sortedDays[i].questionsAnswered > 0) {
          currentStreak++;
        } else {
          break;
        }
      }
      
      longestStreak = Math.max(longestStreak, currentStreak);
      
      return {
        dailyStats,
        subjectStats,
        totalQuestionsAnswered,
        totalCorrectAnswers,
        overallAccuracy,
        currentStreak,
        longestStreak,
        totalStudyTime: prev.totalStudyTime,
      };
    });
  };

  const recordStudyTime = (minutes: number) => {
    setDetailedStats(prev => {
      const today = new Date().toISOString().split('T')[0];
      const dailyStats = [...prev.dailyStats];
      const todayIndex = dailyStats.findIndex(d => d.date === today);
      
      if (todayIndex >= 0) {
        dailyStats[todayIndex] = {
          ...dailyStats[todayIndex],
          studyTime: dailyStats[todayIndex].studyTime + minutes,
        };
      } else {
        dailyStats.push({
          date: today,
          questionsAnswered: 0,
          correctAnswers: 0,
          wrongAnswers: 0,
          studyTime: minutes,
        });
      }
      
      return {
        ...prev,
        dailyStats,
        totalStudyTime: prev.totalStudyTime + minutes,
      };
    });
  };

  const getSubjectAccuracy = (subject: string): number => {
    const subjectStat = detailedStats.subjectStats.find(s => s.subject === subject);
    return subjectStat ? subjectStat.accuracy : 0;
  };

  return (
    <StatsContext.Provider
      value={{
        detailedStats,
        recordAnswer,
        recordStudyTime,
        getSubjectAccuracy,
        getTodayStats,
      }}
    >
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
