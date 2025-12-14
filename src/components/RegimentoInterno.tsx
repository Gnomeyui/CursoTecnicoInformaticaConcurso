import React from 'react';
import { useCustomization } from '../context/CustomizationContext';
import RegimentoReader from './RegimentoReader';

interface RegimentoInternoProps {
  onBack: () => void;
}

export function RegimentoInterno({ onBack }: RegimentoInternoProps) {
  const { theme } = useCustomization();
  return <RegimentoReader onClose={onBack} theme={theme} />;
}