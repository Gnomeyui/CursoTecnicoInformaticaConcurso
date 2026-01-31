/**
 * @file AnswerOption.tsx
 * @description Botão de opção de resposta (A, B, C, D)
 */

import React from 'react';
import { CheckCircle, XCircle } from 'lucide-react';

interface AnswerOptionProps {
  index: number;
  text: string;
  isSelected: boolean;
  isCorrect: boolean;
  showResult: boolean;
  onSelect: () => void;
  disabled: boolean;
}

export const AnswerOption: React.FC<AnswerOptionProps> = ({
  index,
  text,
  isSelected,
  isCorrect,
  showResult,
  onSelect,
  disabled
}) => {
  // ============================================
  // STYLING LOGIC
  // ============================================
  let buttonClass = 'w-full p-4 rounded-xl border-2 text-left transition-all ';
  
  if (!showResult) {
    // Estado normal (antes de confirmar)
    buttonClass += isSelected 
      ? 'border-blue-500 bg-blue-50 dark:bg-blue-500/20' 
      : 'border-border hover:border-blue-300 dark:hover:border-blue-700';
  } else {
    // Estado depois de confirmar
    if (isCorrect) {
      buttonClass += 'border-green-500 bg-green-50 dark:bg-green-500/20';
    } else if (isSelected && !isCorrect) {
      buttonClass += 'border-red-500 bg-red-50 dark:bg-red-500/20';
    } else {
      buttonClass += 'border-border';
    }
  }

  const letterClass = `
    flex-shrink-0 w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-semibold
    ${!showResult && !isSelected ? 'text-foreground border-border' : ''}
    ${!showResult && isSelected ? 'text-blue-600 dark:text-blue-400 border-blue-500' : ''}
    ${showResult && isCorrect ? 'text-green-600 dark:text-green-400 border-green-500' : ''}
    ${showResult && isSelected && !isCorrect ? 'text-red-600 dark:text-red-400 border-red-500' : ''}
    ${showResult && !isCorrect && !isSelected ? 'text-muted-foreground border-border' : ''}
  `;

  const textClass = `
    flex-1 font-medium
    ${!showResult && !isSelected ? 'text-foreground' : ''}
    ${!showResult && isSelected ? 'text-blue-600 dark:text-blue-400' : ''}
    ${showResult && isCorrect ? 'text-green-600 dark:text-green-400 font-semibold' : ''}
    ${showResult && isSelected && !isCorrect ? 'text-red-600 dark:text-red-400' : ''}
    ${showResult && !isCorrect && !isSelected ? 'text-muted-foreground' : ''}
  `;

  return (
    <button
      onClick={onSelect}
      disabled={disabled}
      className={buttonClass}
    >
      <div className="flex items-center gap-3">
        {/* Letter (A, B, C, D) */}
        <span className={letterClass}>
          {String.fromCharCode(65 + index)}
        </span>

        {/* Option Text */}
        <span className={textClass}>
          {text}
        </span>

        {/* Icons */}
        {showResult && isCorrect && (
          <CheckCircle className="size-6 text-green-500 flex-shrink-0" />
        )}
        {showResult && isSelected && !isCorrect && (
          <XCircle className="size-6 text-red-500 flex-shrink-0" />
        )}
      </div>
    </button>
  );
};
