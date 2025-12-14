import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

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
  viewedBadgeIds: string[]; // 🔔 NOVO: IDs das badges já visualizadas
}

interface GameContextType {
  gameStats: GameStats;
  addXP: (amount: number) => void;
  checkAndUnlockBadges: () => void;
  updateStreak: () => void;
  recordStudyDay: () => void;
  recordQuestionAnswer: (wasCorrect: boolean) => void;
  showGloriaCelebration: boolean; // 🎉 NOVO: Mostrar celebração GLÓRIA
  dismissGloriaCelebration: () => void; // 🎉 NOVO: Fechar celebração
  markBadgesAsViewed: () => void; // 🔔 NOVO: Marcar badges como visualizadas
  getNewBadgesCount: () => number; // 🔔 NOVO: Contar badges novas
}

const GameContext = createContext<GameContextType | undefined>(undefined);

const STORAGE_KEY = 'alerr_game_stats';

// Sistema de níveis: cada nível requer 100 XP a mais que o anterior
const getXPForLevel = (level: number): number => {
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
    viewedBadgeIds: [] // 🔔 NOVO: IDs das badges já visualizadas
  });

  const [showGloriaCelebration, setShowGloriaCelebration] = useState(false);

  useEffect(() => {
    loadGameStats();
  }, []);

  useEffect(() => {
    saveGameStats();
  }, [gameStats]);

  const loadGameStats = () => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const data = JSON.parse(saved);
        setGameStats(data);
      }
    } catch (error) {
      console.error('Erro ao carregar estatísticas do jogo:', error);
    }
  };

  const saveGameStats = () => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(gameStats));
    } catch (error) {
      console.error('Erro ao salvar estatísticas do jogo:', error);
    }
  };

  const addXP = (amount: number) => {
    setGameStats(prev => {
      const newXP = prev.xp + amount;
      const newLevel = getLevelFromXP(newXP);
      return {
        ...prev,
        xp: newXP,
        level: newLevel
      };
    });
  };

  const updateStreak = () => {
    const today = new Date().toLocaleDateString();
    const yesterday = new Date(Date.now() - 86400000).toLocaleDateString();
    
    setGameStats(prev => {
      if (prev.lastStudyDate === today) {
        return prev; // Já estudou hoje
      } else if (prev.lastStudyDate === yesterday) {
        // Mantém a sequência
        return {
          ...prev,
          streak: prev.streak + 1,
          lastStudyDate: today
        };
      } else {
        // Perdeu a sequência
        return {
          ...prev,
          streak: 1,
          lastStudyDate: today
        };
      }
    });
  };

  const recordStudyDay = () => {
    const today = new Date().toLocaleDateString();
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

  const checkAndUnlockBadges = () => {
    const allBadges: Badge[] = [
      {
        id: 'first_question',
        name: 'Primeira Questão',
        description: 'Respondeu sua primeira questão',
        icon: '🎯',
        target: 1
      },
      {
        id: 'streak_7',
        name: 'Semana Completa',
        description: 'Estudou por 7 dias seguidos',
        icon: '🔥',
        target: 7
      },
      {
        id: 'streak_30',
        name: 'Mês Dedicado',
        description: 'Estudou por 30 dias seguidos',
        icon: '💪',
        target: 30
      },
      {
        id: 'questions_100',
        name: 'Centurião',
        description: 'Respondeu 100 questões',
        icon: '💯',
        target: 100
      },
      {
        id: 'questions_500',
        name: 'Maratonista',
        description: 'Respondeu 500 questões',
        icon: '🏃',
        target: 500
      },
      {
        id: 'questions_1000',
        name: 'Mestre',
        description: 'Respondeu 1000 questões',
        icon: '🎓',
        target: 1000
      },
      {
        id: 'questions_2000',
        name: 'GLÓRIA - 2000 QUESTÕES',
        description: 'COMPLETOU TODAS AS 2.000 QUESTÕES DO BANCO! 🎉',
        icon: '👑',
        target: 2000
      },
      {
        id: 'accuracy_80',
        name: 'Precisão',
        description: 'Manteve 80% de acerto em 50 questões',
        icon: '🎯',
        target: 50
      },
      {
        id: 'level_5',
        name: 'Nível 5',
        description: 'Alcançou o nível 5',
        icon: '⭐',
        target: 5
      },
      {
        id: 'level_10',
        name: 'Nível 10',
        description: 'Alcançou o nível 10',
        icon: '🌟',
        target: 10
      },
      {
        id: 'level_20',
        name: 'Nível 20',
        description: 'Alcançou o nível 20',
        icon: '✨',
        target: 20
      },
      {
        id: 'study_days_30',
        name: '30 Dias de Estudo',
        description: 'Estudou em 30 dias diferentes',
        icon: '📚',
        target: 30
      },
      {
        id: 'study_days_60',
        name: '60 Dias de Estudo',
        description: 'Estudou em 60 dias diferentes',
        icon: '📖',
        target: 60
      },
      {
        id: 'top1_ready',
        name: 'Pronto para o TOP 1',
        description: 'Completou 1000 questões com 85% de acerto',
        icon: '🏆',
        target: 1000
      }
    ];

    setGameStats(prev => {
      const unlockedBadges = [...prev.badges];
      const accuracy = prev.totalQuestionsAnswered > 0 
        ? (prev.totalCorrectAnswers / prev.totalQuestionsAnswered) * 100 
        : 0;

      allBadges.forEach(badge => {
        const alreadyUnlocked = unlockedBadges.find(b => b.id === badge.id);
        let shouldUnlock = false;

        switch (badge.id) {
          case 'first_question':
            shouldUnlock = prev.totalQuestionsAnswered >= 1;
            break;
          case 'streak_7':
            shouldUnlock = prev.streak >= 7;
            break;
          case 'streak_30':
            shouldUnlock = prev.streak >= 30;
            break;
          case 'questions_100':
            shouldUnlock = prev.totalQuestionsAnswered >= 100;
            break;
          case 'questions_500':
            shouldUnlock = prev.totalQuestionsAnswered >= 500;
            break;
          case 'questions_1000':
            shouldUnlock = prev.totalQuestionsAnswered >= 1000;
            break;
          case 'questions_2000':
            shouldUnlock = prev.totalQuestionsAnswered >= 2000;
            break;
          case 'accuracy_80':
            shouldUnlock = prev.totalQuestionsAnswered >= 50 && accuracy >= 80;
            break;
          case 'level_5':
            shouldUnlock = prev.level >= 5;
            break;
          case 'level_10':
            shouldUnlock = prev.level >= 10;
            break;
          case 'level_20':
            shouldUnlock = prev.level >= 20;
            break;
          case 'study_days_30':
            shouldUnlock = prev.studyDays.length >= 30;
            break;
          case 'study_days_60':
            shouldUnlock = prev.studyDays.length >= 60;
            break;
          case 'top1_ready':
            shouldUnlock = prev.totalQuestionsAnswered >= 1000 && accuracy >= 85;
            break;
        }

        if (shouldUnlock && !alreadyUnlocked) {
          unlockedBadges.push({
            ...badge,
            unlockedAt: new Date().toISOString()
          });
        }
      });

      return {
        ...prev,
        badges: unlockedBadges
      };
    });
  };

  const recordQuestionAnswer = (wasCorrect: boolean) => {
    setGameStats(prev => {
      const newTotalQuestionsAnswered = prev.totalQuestionsAnswered + 1;
      const newTotalCorrectAnswers = wasCorrect ? prev.totalCorrectAnswers + 1 : prev.totalCorrectAnswers;
      
      // 🎉 VERIFICAR SE ATINGIU 2000 QUESTÕES
      if (newTotalQuestionsAnswered === 2000 && !prev.badges.find(b => b.id === 'questions_2000')) {
        setShowGloriaCelebration(true);
      }
      
      return {
        ...prev,
        totalQuestionsAnswered: newTotalQuestionsAnswered,
        totalCorrectAnswers: newTotalCorrectAnswers
      };
    });
  };

  const dismissGloriaCelebration = () => {
    setShowGloriaCelebration(false);
  };

  const markBadgesAsViewed = () => {
    setGameStats(prev => ({
      ...prev,
      viewedBadgeIds: prev.badges.map(badge => badge.id)
    }));
  };

  const getNewBadgesCount = () => {
    const newBadges = gameStats.badges.filter(badge => !gameStats.viewedBadgeIds.includes(badge.id));
    return newBadges.length;
  };

  return (
    <GameContext.Provider value={{ 
      gameStats, 
      addXP, 
      checkAndUnlockBadges, 
      updateStreak,
      recordStudyDay,
      recordQuestionAnswer,
      showGloriaCelebration,
      dismissGloriaCelebration,
      markBadgesAsViewed,
      getNewBadgesCount
    }}>
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

export { getXPForLevel, getLevelFromXP };