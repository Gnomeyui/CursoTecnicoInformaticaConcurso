import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ALL_BADGES, Badge as BadgeDefinition } from '../data/badges';

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt?: string;
  progress?: number;
  target?: number;
}

export interface GameStats {
  xp: number;
  level: number;
  badges: Badge[];
  streak: number;
  lastStudyDate: string;
  totalQuestionsAnswered: number;
  totalCorrectAnswers: number;
  studyDays: string[];
  viewedBadgeIds: string[];
  simulatedExamsCompleted: number;
}

interface GameContextType {
  gameStats: GameStats;
  addXP: (amount: number) => void;
  checkAndUnlockBadges: () => void;
  updateStreak: () => void;
  recordStudyDay: () => void;
  recordQuestionAnswer: (wasCorrect: boolean) => void;
  recordSimulatedExam: () => void;
  showGloriaCelebration: boolean;
  dismissGloriaCelebration: () => void;
  markBadgesAsViewed: () => void;
  getNewBadgesCount: () => number;
  showLevelUpCelebration: boolean;
  dismissLevelUpCelebration: () => void;
  levelUpInfo: { oldLevel: number; newLevel: number } | null;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

const STORAGE_KEY = 'alerr_game_stats';

// Sistema de níveis: cada nível requer 100 XP a mais que o anterior
export const getXPForLevel = (level: number): number => {
  return level * 100;
};

const getLevelFromXP = (xp: number): number => {
  let level = 1;
  let totalXPNeeded = 0;
  while (xp >= totalXPNeeded + getXPForLevel(level)) {
    totalXPNeeded += getXPForLevel(level);
    level++;
  }
  return level;
};

export function GameProvider({ children }: { children: ReactNode }) {
  const [gameStats, setGameStats] = useState<GameStats>({
    xp: 0,
    level: 1,
    badges: [],
    streak: 0,
    lastStudyDate: '',
    totalQuestionsAnswered: 0,
    totalCorrectAnswers: 0,
    studyDays: [],
    viewedBadgeIds: [],
    simulatedExamsCompleted: 0,
  });

  const [showGloriaCelebration, setShowGloriaCelebration] = useState(false);
  const [showLevelUpCelebration, setShowLevelUpCelebration] = useState(false);
  const [levelUpInfo, setLevelUpInfo] = useState<{ oldLevel: number; newLevel: number } | null>(null);

  useEffect(() => {
    loadGameStats();
  }, []);

  useEffect(() => {
    saveGameStats();
  }, [gameStats]);

  useEffect(() => {
    if (gameStats.totalQuestionsAnswered > 0 || gameStats.xp > 0 || gameStats.streak > 0) {
      checkAndUnlockBadges();
    }
  }, [gameStats.totalQuestionsAnswered, gameStats.xp, gameStats.streak, gameStats.level, gameStats.studyDays.length, gameStats.simulatedExamsCompleted]);

  const loadGameStats = () => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const data = JSON.parse(saved);
        setGameStats({
          ...data,
          simulatedExamsCompleted: data.simulatedExamsCompleted || 0,
        });
      }
    } catch (error) {
      console.error('Erro ao carregar estatísticas:', error);
      // 🔧 CORREÇÃO: Fazer backup em vez de destruir dados
      const corrupted = localStorage.getItem(STORAGE_KEY);
      if (corrupted) {
        localStorage.setItem(STORAGE_KEY + '_corrupted_backup', corrupted);
      }
    }
  };

  const saveGameStats = () => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(gameStats));
    } catch (error) {
      console.error('Erro ao salvar estatísticas:', error);
    }
  };

  const addXP = (amount: number) => {
    setGameStats(prev => {
      const newXP = prev.xp + amount;
      const oldLevel = prev.level;
      const newLevel = getLevelFromXP(newXP);
      
      // 🎉 NOVO: Detectar Level Up
      if (newLevel > oldLevel) {
        setLevelUpInfo({ oldLevel, newLevel });
        setShowLevelUpCelebration(true);
      }
      
      return {
        ...prev,
        xp: newXP,
        level: newLevel
      };
    });
  };

  const updateStreak = () => {
    const today = new Date().toISOString().split('T')[0];
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
    
    setGameStats(prev => {
      if (prev.lastStudyDate === today) {
        return prev;
      } else if (prev.lastStudyDate === yesterday) {
        return {
          ...prev,
          streak: prev.streak + 1,
          lastStudyDate: today
        };
      } else {
        return {
          ...prev,
          streak: 1,
          lastStudyDate: today
        };
      }
    });
  };

  const recordStudyDay = () => {
    const today = new Date().toISOString().split('T')[0];
    setGameStats(prev => {
      if (!prev.studyDays.includes(today)) {
        return {
          ...prev,
          studyDays: [...prev.studyDays, today]
        };
      }
      return prev;
    });
  };

  const recordQuestionAnswer = (wasCorrect: boolean) => {
    setGameStats(prev => ({
      ...prev,
      totalQuestionsAnswered: prev.totalQuestionsAnswered + 1,
      totalCorrectAnswers: prev.totalCorrectAnswers + (wasCorrect ? 1 : 0)
    }));
  };

  const recordSimulatedExam = () => {
    setGameStats(prev => ({
      ...prev,
      simulatedExamsCompleted: prev.simulatedExamsCompleted + 1
    }));
  };

  const checkAndUnlockBadges = () => {
    const unlockedBadgeIds = new Set(gameStats.badges.map(b => b.id));
    const newBadges: Badge[] = [];

    const stats = {
      totalQuestionsAnswered: gameStats.totalQuestionsAnswered,
      correctAnswers: gameStats.totalCorrectAnswers,
      streak: gameStats.streak,
      level: gameStats.level,
      simulatedExamsCompleted: gameStats.simulatedExamsCompleted,
    };

    ALL_BADGES.forEach(badgeDef => {
      if (!unlockedBadgeIds.has(badgeDef.id) && badgeDef.condition(stats)) {
        newBadges.push({
          id: badgeDef.id,
          name: badgeDef.name,
          description: badgeDef.description,
          icon: badgeDef.icon,
          unlockedAt: new Date().toISOString()
        });
      }
    });

    if (newBadges.length > 0) {
      setGameStats(prev => ({
        ...prev,
        badges: [...prev.badges, ...newBadges]
      }));
    }

    // 🎉 Celebração GLÓRIA quando completar 2000 questões
    if (gameStats.totalQuestionsAnswered >= 2000 && !showGloriaCelebration) {
      const hasGloriaBeenShown = localStorage.getItem('gloria_celebration_shown');
      if (!hasGloriaBeenShown) {
        setShowGloriaCelebration(true);
        localStorage.setItem('gloria_celebration_shown', 'true');
      }
    }
  };

  const markBadgesAsViewed = () => {
    setGameStats(prev => ({
      ...prev,
      viewedBadgeIds: prev.badges.map(b => b.id)
    }));
  };

  const getNewBadgesCount = (): number => {
    return gameStats.badges.filter(b => !gameStats.viewedBadgeIds.includes(b.id)).length;
  };

  const dismissGloriaCelebration = () => {
    setShowGloriaCelebration(false);
  };

  const dismissLevelUpCelebration = () => {
    setShowLevelUpCelebration(false);
    setLevelUpInfo(null);
  };

  return (
    <GameContext.Provider
      value={{
        gameStats,
        addXP,
        checkAndUnlockBadges,
        updateStreak,
        recordStudyDay,
        recordQuestionAnswer,
        recordSimulatedExam,
        showGloriaCelebration,
        dismissGloriaCelebration,
        markBadgesAsViewed,
        getNewBadgesCount,
        showLevelUpCelebration,
        dismissLevelUpCelebration,
        levelUpInfo,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within GameProvider');
  }
  return context;
}