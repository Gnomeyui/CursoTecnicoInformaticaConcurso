import React from 'react';
import { CheckCircle2 } from 'lucide-react';

interface GabaritooLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  withText?: boolean;
  className?: string;
}

const sizeMap = {
  sm: { circle: 'w-6 h-6', icon: 14, gap: 'gap-1', text: 'text-xl' },
  md: { circle: 'w-10 h-10', icon: 20, gap: 'gap-2', text: 'text-3xl' },
  lg: { circle: 'w-16 h-16', icon: 32, gap: 'gap-3', text: 'text-5xl' },
  xl: { circle: 'w-20 h-20', icon: 40, gap: 'gap-4', text: 'text-6xl' },
};

export function GabaritooLogo({ size = 'md', withText = false, className = '' }: GabaritooLogoProps) {
  const sizes = sizeMap[size];

  return (
    <div className={`flex items-center ${sizes.gap} ${className}`}>
      {/* Logo Icon */}
      <div className={`flex ${sizes.gap}`}>
        {/* Ícone será adicionado depois */}
      </div>
      
      {/* Brand Text */}
      {withText && (
        <h1 className={`${sizes.text} font-black text-gray-900 tracking-tight`}>
          Gabarit
          <span style={{ color: '#10b981' }}>oo</span>
        </h1>
      )}
    </div>
  );
}