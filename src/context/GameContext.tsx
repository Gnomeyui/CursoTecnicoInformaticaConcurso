import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

const MAX_LEVEL = 100;
const XP_PER_LEVEL = 100;

interface LevelUpInfo {
  oldLevel: number;
  newLevel: number;
}

interface GameContextType {
  xp: number;
  level: number;
  addXP: (amount: number) => void;
  showGloriaCelebration: boolean;
  dismissGloriaCelebration: () => void;
  showLevelUpCelebration: boolean;
  dismissLevelUpCelebration: () => void;
  levelUpInfo: LevelUpInfo | null;
  getLevelProgress: () => number;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export function GameProvider({ children }: { children: ReactNode }) {
  const [xp, setXP] = useState(0);
  const [level, setLevel] = useState(1);
  const [showGloriaCelebration, setShowGloriaCelebration] = useState(false);
  const [showLevelUpCelebration, setShowLevelUpCelebration] = useState(false);
  const [levelUpInfo, setLevelUpInfo] = useState<LevelUpInfo | null>(null);

  // Carregar dados salvos
  useEffect(() => {
    const saved = localStorage.getItem('alerr_game_data');
    if (saved) {
      try {
        const data = JSON.parse(saved);
        setXP(data.xp || 0);
        setLevel(data.level || 1);
      } catch (e) {
        console.error('Erro ao carregar dados do jogo:', e);
      }
    }
  }, []);

  // Salvar dados
  useEffect(() => {
    localStorage.setItem('alerr_game_data', JSON.stringify({ xp, level }));
  }, [xp, level]);

  // 🛡️ SEGURANÇA: Proteção contra loop infinito
  const getLevelFromXP = (currentXP: number): number => {
    let calculatedLevel = 1;
    let remainingXP = currentXP;
    
    while (remainingXP >= XP_PER_LEVEL && calculatedLevel < MAX_LEVEL) {
      remainingXP -= XP_PER_LEVEL;
      calculatedLevel++;
    }
    
    return calculatedLevel;
  };

  const addXP = (amount: number) => {
    const oldLevel = level;
    const newXP = xp + amount;
    const newLevel = getLevelFromXP(newXP);
    
    setXP(newXP);
    
    if (newLevel > oldLevel) {
      setLevel(newLevel);
      setLevelUpInfo({ oldLevel, newLevel });
      setShowLevelUpCelebration(true);
    }
  };

  const getLevelProgress = (): number => {
    const xpInCurrentLevel = xp - ((level - 1) * XP_PER_LEVEL);
    return (xpInCurrentLevel / XP_PER_LEVEL) * 100;
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
        xp,
        level,
        addXP,
        showGloriaCelebration,
        dismissGloriaCelebration,
        showLevelUpCelebration,
        dismissLevelUpCelebration,
        levelUpInfo,
        getLevelProgress,
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
