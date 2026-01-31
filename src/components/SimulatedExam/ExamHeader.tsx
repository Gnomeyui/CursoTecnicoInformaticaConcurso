/**
 * @file ExamHeader.tsx
 * @description Header do simulado com timer e progresso
 */

import React from 'react';
import { Clock } from 'lucide-react';

interface ExamHeaderProps {
  currentQuestionIndex: number;
  totalQuestions: number;
  timeRemaining: number;
  isLowTime: boolean;
  progress: number;
  themeColor: string;
  formatTime: (seconds: number) => string;
}

export const ExamHeader: React.FC<ExamHeaderProps> = ({
  currentQuestionIndex,
  totalQuestions,
  timeRemaining,
  isLowTime,
  progress,
  themeColor,
  formatTime
}) => {
  return (
    <div className="bg-card-theme shadow-sm border-b border-gray-200 dark:border-gray-700 z-20 shrink-0">
      <div className="px-4 py-3 flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
            Questão
          </span>
          <span className="font-bold text-lg leading-none text-app">
            {currentQuestionIndex + 1}{' '}
            <span className="text-gray-400 text-sm font-normal">
              / {totalQuestions}
            </span>
          </span>
        </div>
        
        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border shadow-sm ${
          isLowTime 
            ? 'bg-red-50 border-red-200 text-red-700 dark:bg-red-900/30 dark:border-red-800 dark:text-red-400 animate-pulse' 
            : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-foreground'
        }`}>
          <Clock className="w-4 h-4" />
          <span className="font-mono font-bold text-sm">
            {formatTime(timeRemaining)}
          </span>
        </div>
      </div>
      
      {/* Progress Bar */}
      <div className="h-1 bg-gray-100 dark:bg-gray-800 w-full">
        <div 
          className="h-full transition-all duration-500"
          style={{ 
            width: `${progress}%`,
            backgroundColor: themeColor 
          }}
        />
      </div>
    </div>
  );
};
