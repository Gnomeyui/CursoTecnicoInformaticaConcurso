import React from 'react';
import logoImage from 'figma:asset/dbefc483e96f20fc902f133b4104ccca05db76bb.png';

interface GabaritooLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  withText?: boolean;
  className?: string;
}

const sizeMap = {
  sm: { width: 40, height: 40 },
  md: { width: 80, height: 80 },
  lg: { width: 120, height: 120 },
  xl: { width: 160, height: 160 },
};

export function GabaritooLogo({ size = 'md', withText = false, className = '' }: GabaritooLogoProps) {
  const sizes = sizeMap[size];

  return (
    <div className={`flex items-center justify-center ${className}`}>
      {/* Logo oficial do Gabaritoo (mipmap-xxxhdpi) - OCULTO TEMPORARIAMENTE */}
      {/* <img 
        src={logoImage} 
        alt="Gabaritoo" 
        style={{ 
          width: sizes.width,
          height: sizes.height,
          objectFit: 'contain'
        }}
      /> */}
    </div>
  );
}