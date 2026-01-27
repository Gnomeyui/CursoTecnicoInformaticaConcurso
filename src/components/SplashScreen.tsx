import React, { useEffect, useState } from 'react';
import { GabaritooLogo } from './GabaritooLogo';

interface SplashScreenProps {
  onFinish: () => void;
}

export function SplashScreen({ onFinish }: SplashScreenProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Anima por 2 segundos e depois faz fade out
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onFinish, 500); // Aguarda o fade out terminar
    }, 2000);

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div 
      className={`fixed inset-0 z-[300] flex items-center justify-center transition-opacity duration-500 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      style={{ background: 'linear-gradient(135deg, #1e3a8a 0%, #3730a3 100%)' }}
    >
      {/* Logo Container */}
      <div className="flex flex-col items-center gap-6 animate-in zoom-in duration-700">
        
        {/* Logo do Gabaritoo */}
        <div className="animate-in zoom-in duration-500">
          <GabaritooLogo size="lg" />
        </div>

        {/* Brand Name */}
        <div className="text-center space-y-2 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
          <h1 className="text-5xl font-black text-white tracking-tight">
            Gabarit
            <span style={{ color: '#10b981' }}>oo</span>
          </h1>
          <p className="text-white/80 text-sm font-medium tracking-wide">
            Sua jornada para a aprovação
          </p>
        </div>

        {/* Loading Indicator */}
        <div className="flex gap-1.5 mt-4 animate-in fade-in duration-700 delay-500">
          <div 
            className="w-2 h-2 rounded-full animate-bounce"
            style={{ 
              backgroundColor: '#10b981',
              animationDelay: '0ms'
            }}
          />
          <div 
            className="w-2 h-2 rounded-full animate-bounce"
            style={{ 
              backgroundColor: '#10b981',
              animationDelay: '150ms'
            }}
          />
          <div 
            className="w-2 h-2 rounded-full animate-bounce"
            style={{ 
              backgroundColor: '#10b981',
              animationDelay: '300ms'
            }}
          />
        </div>
      </div>
    </div>
  );
}