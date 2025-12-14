import React, { useEffect, useState } from 'react';

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
      const newConfetti = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 0.5,
        duration: 2 + Math.random() * 2
      }));
      setConfetti(newConfetti);

      // Auto-fechar após 5 segundos
      const timer = setTimeout(() => {
        onComplete();
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [show, onComplete]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm">
      {/* Confetti */}
      {confetti.map(({ id, left, delay, duration }) => (
        <div
          key={id}
          className="absolute top-0 w-2 h-2 rounded-full animate-confetti"
          style={{
            left: `${left}%`,
            animationDelay: `${delay}s`,
            animationDuration: `${duration}s`,
            backgroundColor: ['#FFD700', '#FFA500', '#FF6347', '#FF1493', '#00CED1', '#32CD32'][id % 6]
          }}
        />
      ))}

      {/* Card de Celebração */}
      <div className="bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 rounded-3xl p-8 shadow-2xl max-w-md mx-4 text-center animate-scaleIn border-4 border-white">
        <div className="text-8xl mb-4 animate-bounce">{icon}</div>
        <h2 className="text-3xl font-bold text-white mb-3 drop-shadow-lg">
          {title}
        </h2>
        <p className="text-lg text-yellow-100 mb-6">
          {message}
        </p>
        <div className="flex items-center justify-center gap-2 text-white/90 text-sm">
          <span>✨</span>
          <span>Parabéns pela dedicação!</span>
          <span>✨</span>
        </div>
        <button
          onClick={onComplete}
          className="mt-6 px-6 py-3 bg-white text-orange-600 font-semibold rounded-full shadow-lg hover:scale-105 transition-transform"
        >
          Continuar 🚀
        </button>
      </div>

      <style jsx>{`
        @keyframes confetti {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }
        
        @keyframes scaleIn {
          0% {
            transform: scale(0) rotate(-180deg);
            opacity: 0;
          }
          50% {
            transform: scale(1.1) rotate(10deg);
          }
          100% {
            transform: scale(1) rotate(0deg);
            opacity: 1;
          }
        }
        
        .animate-confetti {
          animation: confetti linear forwards;
        }
        
        .animate-scaleIn {
          animation: scaleIn 0.6s ease-out;
        }
      `}</style>
    </div>
  );
}
