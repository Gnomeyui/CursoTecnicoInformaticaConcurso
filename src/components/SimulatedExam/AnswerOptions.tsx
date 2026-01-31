/**
 * @file AnswerOptions.tsx
 * @description Lista de opções de resposta
 */

import React from 'react';
import { QuestionOption } from '../../hooks/useSimulatedExam';

interface AnswerOptionsProps {
  options: QuestionOption[];
  selectedAnswer: string | undefined;
  onSelectAnswer: (optionId: string) => void;
}

export const AnswerOptions: React.FC<AnswerOptionsProps> = ({
  options,
  selectedAnswer,
  onSelectAnswer
}) => {
  return (
    <div className="space-y-3">
      {options.map((opt) => {
        const isSelected = selectedAnswer === opt.id;
        
        return (
          <button
            key={opt.id}
            onClick={() => onSelectAnswer(opt.id)}
            className={`w-full text-left p-4 rounded-xl border-2 transition-all flex items-start gap-4 active:scale-[0.99] group ${
              isSelected
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 shadow-sm'
                : 'border-transparent bg-white dark:bg-gray-800 shadow-sm hover:border-gray-200 dark:hover:border-gray-700'
            }`}
          >
            <div className={`w-6 h-6 rounded-full border-2 flex-shrink-0 flex items-center justify-center mt-0.5 transition-colors ${
              isSelected 
                ? 'border-blue-500 bg-blue-500' 
                : 'border-gray-300 dark:border-gray-600 group-hover:border-gray-400'
            }`}>
              {isSelected && <div className="w-2.5 h-2.5 bg-white rounded-full" />}
            </div>
            <span className={`text-base ${
              isSelected 
                ? 'text-blue-900 dark:text-blue-100 font-medium' 
                : 'text-gray-700 dark:text-gray-300'
            }`}>
              {opt.text}
            </span>
          </button>
        );
      })}
    </div>
  );
};
