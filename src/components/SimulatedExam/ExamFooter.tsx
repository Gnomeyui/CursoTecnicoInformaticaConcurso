/**
 * @file ExamFooter.tsx
 * @description Footer com botões de navegação
 */

import React from 'react';

interface ExamFooterProps {
  currentQuestionIndex: number;
  totalQuestions: number;
  themeColor: string;
  onPrevious: () => void;
  onNext: () => void;
  onFinish: () => void;
}

export const ExamFooter: React.FC<ExamFooterProps> = ({
  currentQuestionIndex,
  totalQuestions,
  themeColor,
  onPrevious,
  onNext,
  onFinish
}) => {
  const isFirstQuestion = currentQuestionIndex === 0;
  const isLastQuestion = currentQuestionIndex === totalQuestions - 1;

  return (
    <div className="bg-card-theme border-t border-gray-200 dark:border-gray-800 p-4 shrink-0 z-20">
      <div className="max-w-3xl mx-auto flex gap-4">
        <button 
          disabled={isFirstQuestion}
          onClick={onPrevious}
          className="flex-1 py-3.5 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-xl font-bold disabled:opacity-50 transition-colors hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          Anterior
        </button>
        
        {isLastQuestion ? (
          <button 
            onClick={onFinish}
            className="flex-1 py-3.5 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 shadow-lg shadow-green-600/20 transition-all active:scale-95"
          >
            Finalizar Prova
          </button>
        ) : (
          <button 
            onClick={onNext}
            className="flex-1 py-3.5 text-white rounded-xl font-bold shadow-lg transition-all active:scale-95"
            style={{ backgroundColor: themeColor }}
          >
            Próxima
          </button>
        )}
      </div>
    </div>
  );
};
