import { useCallback } from 'react';
import { useAppState } from '../context/AppState/AppStateContext';
import { updateStats } from '../context/AppState/actions';

export function useStats() {
  const { state, dispatch } = useAppState();
  const { stats } = state;

  const recordDailyActivity = useCallback((questionsAnswered: number, correctAnswers: number, studyTime: number) => {
    const today = new Date().toISOString().split('T')[0];
    
    // Se é um novo dia, resetar estatísticas diárias
    if (stats.daily.date !== today) {
      dispatch(updateStats({
        daily: {
          questionsAnswered,
          correctAnswers,
          studyTime,
          date: today
        }
      }));
    } else {
      // Atualizar estatísticas do dia atual
      dispatch(updateStats({
        daily: {
          questionsAnswered: stats.daily.questionsAnswered + questionsAnswered,
          correctAnswers: stats.daily.correctAnswers + correctAnswers,
          studyTime: stats.daily.studyTime + studyTime,
          date: today
        }
      }));
    }

    // Atualizar estatísticas semanais e mensais
    dispatch(updateStats({
      weekly: {
        questionsAnswered: stats.weekly.questionsAnswered + questionsAnswered,
        correctAnswers: stats.weekly.correctAnswers + correctAnswers,
        studyTime: stats.weekly.studyTime + studyTime
      },
      monthly: {
        questionsAnswered: stats.monthly.questionsAnswered + questionsAnswered,
        correctAnswers: stats.monthly.correctAnswers + correctAnswers,
        studyTime: stats.monthly.studyTime + studyTime
      }
    }));
  }, [stats, dispatch]);

  const recordSubjectActivity = useCallback((subject: string, isCorrect: boolean) => {
    const currentSubjectStats = stats.bySubject[subject] || { total: 0, correct: 0, accuracy: 0 };
    
    const newTotal = currentSubjectStats.total + 1;
    const newCorrect = isCorrect ? currentSubjectStats.correct + 1 : currentSubjectStats.correct;
    const newAccuracy = Math.round((newCorrect / newTotal) * 100);

    dispatch(updateStats({
      bySubject: {
        ...stats.bySubject,
        [subject]: {
          total: newTotal,
          correct: newCorrect,
          accuracy: newAccuracy
        }
      }
    }));
  }, [stats.bySubject, dispatch]);

  const getDailyProgress = useCallback(() => {
    const goal = state.preferences.dailyGoal;
    const current = stats.daily.questionsAnswered;
    const percentage = Math.min(Math.round((current / goal) * 100), 100);
    
    return {
      current,
      goal,
      percentage,
      completed: current >= goal
    };
  }, [stats.daily.questionsAnswered, state.preferences.dailyGoal]);

  const getDailyAccuracy = useCallback(() => {
    if (stats.daily.questionsAnswered === 0) return 0;
    return Math.round((stats.daily.correctAnswers / stats.daily.questionsAnswered) * 100);
  }, [stats.daily]);

  const getWeakestSubjects = useCallback(() => {
    return Object.entries(stats.bySubject)
      .sort(([, a], [, b]) => a.accuracy - b.accuracy)
      .slice(0, 3)
      .map(([subject, data]) => ({ subject, ...data }));
  }, [stats.bySubject]);

  const getStrongestSubjects = useCallback(() => {
    return Object.entries(stats.bySubject)
      .sort(([, a], [, b]) => b.accuracy - a.accuracy)
      .slice(0, 3)
      .map(([subject, data]) => ({ subject, ...data }));
  }, [stats.bySubject]);

  return {
    stats,
    recordDailyActivity,
    recordSubjectActivity,
    getDailyProgress,
    getDailyAccuracy,
    getWeakestSubjects,
    getStrongestSubjects
  };
}
