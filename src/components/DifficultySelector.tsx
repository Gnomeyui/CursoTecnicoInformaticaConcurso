import React from 'react';
import { ArrowLeft, Zap, Target, Flame, Shuffle } from 'lucide-react';

export type Difficulty = 'easy' | 'medium' | 'hard' | 'mix';

interface DifficultySelectorProps {
  onSelectDifficulty: (difficulty: Difficulty) => void;
  onBack: () => void;
}

export function DifficultySelector({ onSelectDifficulty, onBack }: DifficultySelectorProps) {
  const difficulties = [
    {
      id: 'easy' as Difficulty,
      name: 'Fácil',
      description: 'Questões básicas para começar',
      icon: Zap,
      color: 'from-green-500 to-green-600',
      textColor: 'text-green-500',
      xp: '+5 XP por acerto',
    },
    {
      id: 'medium' as Difficulty,
      name: 'Médio',
      description: 'Questões de nível intermediário',
      icon: Target,
      color: 'from-yellow-500 to-yellow-600',
      textColor: 'text-yellow-500',
      xp: '+10 XP por acerto',
    },
    {
      id: 'hard' as Difficulty,
      name: 'Difícil',
      description: 'Questões avançadas e complexas',
      icon: Flame,
      color: 'from-red-500 to-red-600',
      textColor: 'text-red-500',
      xp: '+20 XP por acerto',
    },
    {
      id: 'mix' as Difficulty,
      name: 'Misto',
      description: 'Todas as dificuldades',
      icon: Shuffle,
      color: 'from-purple-500 to-purple-600',
      textColor: 'text-purple-500',
      xp: 'XP variável',
    },
  ];

  return (
    <div className="min-h-screen p-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={onBack}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
        >
          <ArrowLeft className="size-6" />
        </button>
        <div>
          <h1 className="text-2xl">Escolha a Dificuldade</h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Quanto maior a dificuldade, maior o XP
          </p>
        </div>
      </div>

      {/* Difficulty Cards */}
      <div className="space-y-4">
        {difficulties.map((diff) => (
          <button
            key={diff.id}
            onClick={() => onSelectDifficulty(diff.id)}
            className="w-full bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all text-left"
          >
            <div className="flex items-start gap-4">
              <div className={`p-3 rounded-xl bg-gradient-to-br ${diff.color}`}>
                <diff.icon className="size-8 text-white" />
              </div>
              
              <div className="flex-1">
                <h3 className="text-xl mb-1">{diff.name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  {diff.description}
                </p>
                <p className={`text-sm ${diff.textColor}`}>
                  {diff.xp}
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
