/**
 * @file QuestionHeader.tsx
 * @description Header da questão (subject, difficulty, badges)
 */

import React from 'react';
import { RotateCcw } from 'lucide-react';

interface QuestionHeaderProps {
  subject: string;
  difficulty: string;
  difficultyColor: string;
  isReviewQuestion: boolean;
}

export const QuestionHeader: React.FC<QuestionHeaderProps> = ({
  subject,
  difficulty,
  difficultyColor,
  isReviewQuestion
}) => {
  const difficultyLabel = {
    easy: 'Fácil',
    medium: 'Médio',
    hard: 'Difícil'
  }[difficulty] || 'Médio';

  return (
    <div className="flex items-center gap-2 mb-4 flex-wrap">
      {/* Subject Badge */}
      <span className="px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 text-sm">
        {subject}
      </span>

      {/* Difficulty Badge */}
      <span className={`px-3 py-1 rounded-full text-sm ${difficultyColor}`}>
        {difficultyLabel}
      </span>

      {/* Review Badge */}
      {isReviewQuestion && (
        <span className="px-3 py-1 rounded-full bg-orange-100 dark:bg-orange-500/20 text-orange-600 dark:text-orange-400 text-sm flex items-center gap-1">
          <RotateCcw className="size-3" />
          Revisão
        </span>
      )}
    </div>
  );
};
