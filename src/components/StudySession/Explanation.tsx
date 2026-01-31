/**
 * @file Explanation.tsx
 * @description Card de explicação da resposta
 */

import React from 'react';
import { Lightbulb } from 'lucide-react';

interface ExplanationProps {
  text: string;
}

export const Explanation: React.FC<ExplanationProps> = ({ text }) => {
  return (
    <div className="mt-6 p-4 rounded-xl bg-blue-50 dark:bg-blue-500/20 border-2 border-blue-200 dark:border-blue-800 animate-slide-in-up">
      <div className="flex items-start gap-3">
        <Lightbulb className="size-6 text-blue-500 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-sm mb-1 font-semibold text-foreground">
            Explicação:
          </p>
          <p className="text-sm text-foreground">
            {text}
          </p>
        </div>
      </div>
    </div>
  );
};
