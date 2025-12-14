import React, { useEffect } from 'react';
import { Trophy, Star, Zap } from 'lucide-react';
import { Haptics, NotificationType } from '@capacitor/haptics';

interface LevelUpCelebrationProps {
  show: boolean;
  onComplete: () => void;
  oldLevel: number;
  newLevel: number;
}

export function LevelUpCelebration({ show, onComplete, oldLevel, newLevel }: LevelUpCelebrationProps) {
  useEffect(() => {
    if (show) {
      // 🔧 Feedback tátil ao subir de nível
      try {
        Haptics.notification({ type: NotificationType.Success });
      } catch (error) {
        console.log('Haptics não disponível');
      }

      // Fecha automaticamente após 3 segundos
      const timer = setTimeout(() => {
        onComplete();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [show, onComplete]);

  if (!show) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
      onClick={onComplete}
    >
      <div className="relative max-w-md w-full mx-4">
        {/* Estrelas animadas de fundo */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <Star
              key={i}
              className="absolute text-yellow-400 animate-ping"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${Math.random() * 20 + 10}px`,
                height: `${Math.random() * 20 + 10}px`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${Math.random() * 2 + 1}s`,
              }}
            />
          ))}
        </div>

        {/* Card principal */}
        <div className="relative bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 rounded-3xl p-8 shadow-2xl animate-bounce-slow">
          <div className="text-center">
            {/* Troféu animado */}
            <div className="mb-6 flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-yellow-400 rounded-full blur-xl opacity-50 animate-pulse" />
                <Trophy className="relative w-24 h-24 text-yellow-300 drop-shadow-2xl animate-spin-slow" />
              </div>
            </div>

            {/* Título */}
            <h2 className="text-4xl font-bold text-white mb-2 drop-shadow-lg">
              Level Up!
            </h2>
            
            {/* Níveis */}
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="text-6xl font-bold text-white/70">
                {oldLevel}
              </div>
              <Zap className="w-8 h-8 text-yellow-300 animate-pulse" />
              <div className="text-6xl font-bold text-white">
                {newLevel}
              </div>
            </div>

            {/* Mensagem */}
            <p className="text-xl text-white/90 mb-6">
              Parabéns! Você está cada vez mais próximo do Top 1! 🎯
            </p>

            {/* Dica para fechar */}
            <p className="text-sm text-white/70">
              Toque em qualquer lugar para continuar
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
