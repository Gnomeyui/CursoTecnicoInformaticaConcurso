import React, { useEffect, useState } from 'react';
import { Trophy } from 'lucide-react';

interface ConfettiCelebrationProps {
  show: boolean;
  onComplete: () => void;
  title: string;
  message: string;
  icon: string;
}

export function ConfettiCelebration({ show, onComplete, title, message, icon }: ConfettiCelebrationProps) {
  const [confetti, setConfetti] = useState<Array<{ id: number; left: number; delay: number; duration: number }>>([]);

  useEffect(() => {
    if (show) {
      // Gerar confetes
      const pieces = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 0.5,
        duration: 2 + Math.random() * 1,
      }));
      setConfetti(pieces);

      // Auto-fechar após 3 segundos
      const timer = setTimeout(onComplete, 3000);
      return () => clearTimeout(timer);
    }
  }, [show, onComplete]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fade-in">
      {/* Confetti */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {confetti.map((piece) => (
          <div
            key={piece.id}
            className="absolute w-2 h-2 bg-yellow-400 rounded-full animate-fall"
            style={{
              left: `${piece.left}%`,
              top: '-10px',
              animationDelay: `${piece.delay}s`,
              animationDuration: `${piece.duration}s`,
            }}
          />
        ))}
      </div>

      {/* Celebration Card */}
      <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-2xl max-w-sm mx-4 text-center animate-slide-in-up">
        <div className="text-6xl mb-4">{icon}</div>
        <h2 className="text-3xl mb-4">{title}</h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">{message}</p>
        <div className="flex items-center justify-center gap-2">
          <Trophy className="size-8 text-yellow-500 animate-pulse-gentle" />
          <Trophy className="size-10 text-yellow-500 animate-pulse-gentle" />
          <Trophy className="size-8 text-yellow-500 animate-pulse-gentle" />
        </div>
      </div>
    </div>
  );
}
