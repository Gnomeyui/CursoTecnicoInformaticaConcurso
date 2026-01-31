/**
 * @file QuestionCard.tsx
 * @description Card da questão com badges e flag
 */

import React from 'react';
import { Flag } from 'lucide-react';
import { Question } from '../../hooks/useSimulatedExam';

interface QuestionCardProps {
  question: Question;
  isFlagged: boolean;
  onToggleFlag: () => void;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  isFlagged,
  onToggleFlag
}) => {
  return (
    <div className="bg-card-theme rounded-xl p-5 shadow-sm border border-gray-100 dark:border-gray-800">
      <div className="flex justify-between items-start mb-4">
        <div className="flex flex-wrap gap-2">
          <span className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wide bg-blue-50 text-blue-700 border border-blue-100 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-900/30">
            {question.difficulty_level || 'Geral'}
          </span>
          {question.banca && (
            <span className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wide bg-gray-50 text-gray-600 border border-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700">
              {question.banca}
            </span>
          )}
        </div>
        <button 
          onClick={onToggleFlag} 
          className="p-1 -mr-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
          aria-label={isFlagged ? "Remover marcação" : "Marcar questão"}
        >
          <Flag 
            className={`w-5 h-5 ${
              isFlagged 
                ? 'text-yellow-500 fill-yellow-500' 
                : 'text-gray-300'
            }`} 
          />
        </button>
      </div>

      <h3 className="text-lg font-medium text-app leading-relaxed">
        {question.text}
      </h3>
    </div>
  );
};
