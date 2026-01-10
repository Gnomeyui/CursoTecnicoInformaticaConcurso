import { useCallback } from 'react';
import { useAppState } from '../context/AppState/AppStateContext';
import { updateProgress } from '../context/AppState/actions';

export function useProgress() {
  const { state, dispatch } = useAppState();
  const { progress } = state;

  const addXP = useCallback((amount: number) => {
    const newXP = progress.currentXP + amount;
    const xpNeeded = progress.xpForNextLevel;

    if (newXP >= xpNeeded) {
      // Level up!
      const newLevel = progress.level + 1;
      const remainingXP = newXP - xpNeeded;
      const nextLevelXP = Math.floor(xpNeeded * 1.5); // 50% a mais para o próximo nível

      dispatch(updateProgress({
        level: newLevel,
        currentXP: remainingXP,
        xpForNextLevel: nextLevelXP
      }));

      return { leveledUp: true, newLevel };
    } else {
      dispatch(updateProgress({
        currentXP: newXP
      }));

      return { leveledUp: false, newLevel: progress.level };
    }
  }, [progress, dispatch]);

  const incrementStreak = useCallback(() => {
    dispatch(updateProgress({
      streak: progress.streak + 1
    }));
  }, [progress.streak, dispatch]);

  const resetStreak = useCallback(() => {
    dispatch(updateProgress({
      streak: 0
    }));
  }, [dispatch]);

  const recordAnswer = useCallback((isCorrect: boolean) => {
    dispatch(updateProgress({
      totalQuestionsAnswered: progress.totalQuestionsAnswered + 1,
      correctAnswers: isCorrect ? progress.correctAnswers + 1 : progress.correctAnswers,
      wrongAnswers: !isCorrect ? progress.wrongAnswers + 1 : progress.wrongAnswers
    }));
  }, [progress, dispatch]);

  const getAccuracy = useCallback(() => {
    if (progress.totalQuestionsAnswered === 0) return 0;
    return Math.round((progress.correctAnswers / progress.totalQuestionsAnswered) * 100);
  }, [progress]);

  const getProgressPercentage = useCallback(() => {
    return Math.round((progress.currentXP / progress.xpForNextLevel) * 100);
  }, [progress]);

  return {
    progress,
    addXP,
    incrementStreak,
    resetStreak,
    recordAnswer,
    getAccuracy,
    getProgressPercentage
  };
}
