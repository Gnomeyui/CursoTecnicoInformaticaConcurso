import React, { useEffect } from 'react';
import { Zap, TrendingUp } from 'lucide-react';

interface LevelUpCelebrationProps {
  show: boolean;
  onComplete: () => void;
  oldLevel: number;
  newLevel: number;
}

export function LevelUpCelebration({ show, onComplete, oldLevel, newLevel }: LevelUpCelebrationProps) {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(onComplete, 3000);
      return () => clearTimeout(timer);
    }
  }, [show, onComplete]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fade-in">
      <div className="bg-gradient-to-br from-purple-500 to-purple-700 rounded-3xl p-8 shadow-2xl max-w-sm mx-4 text-center text-white animate-slide-in-up">
        <Zap className="size-20 mx-auto mb-4 text-yellow-300 animate-pulse-gentle" />
        
        <h2 className="text-3xl mb-2">Level Up!</h2>
        <p className="text-lg mb-6 text-purple-100">
          Você subiu de nível!
        </p>
        
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="bg-white/20 rounded-2xl px-6 py-4">
            <p className="text-sm text-purple-200 mb-1">Nível Anterior</p>
            <p className="text-4xl">{oldLevel}</p>
          </div>
          
          <TrendingUp className="size-8 text-yellow-300" />
          
          <div className="bg-white/20 rounded-2xl px-6 py-4">
            <p className="text-sm text-purple-200 mb-1">Novo Nível</p>
            <p className="text-4xl">{newLevel}</p>
          </div>
        </div>
        
        <p className="text-sm text-purple-100">
          Continue estudando para alcançar novos patamares! 🚀
        </p>
      </div>
    </div>
  );
}
