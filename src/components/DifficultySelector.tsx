import React from 'react';
import { Brain, Zap, Flame, Shuffle } from 'lucide-react';

export type Difficulty = 'facil' | 'medio' | 'dificil' | 'mix';

interface DifficultySelectorProps {
  onSelectDifficulty: (difficulty: Difficulty) => void;
  onBack: () => void;
}

export function DifficultySelector({ onSelectDifficulty, onBack }: DifficultySelectorProps) {
  const difficulties = [
    {
      id: 'facil' as Difficulty,
      name: 'Fácil',
      description: 'Questões básicas e fundamentais',
      icon: <Brain className="w-12 h-12" />,
      color: 'from-green-500 to-emerald-600',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
      borderColor: 'border-green-200 dark:border-green-700',
      xp: '+5 XP',
    },
    {
      id: 'medio' as Difficulty,
      name: 'Médio',
      description: 'Questões intermediárias',
      icon: <Zap className="w-12 h-12" />,
      color: 'from-yellow-500 to-orange-600',
      bgColor: 'bg-yellow-50 dark:bg-yellow-900/20',
      borderColor: 'border-yellow-200 dark:border-yellow-700',
      xp: '+10 XP',
    },
    {
      id: 'dificil' as Difficulty,
      name: 'Difícil',
      description: 'Questões avançadas e complexas',
      icon: <Flame className="w-12 h-12" />,
      color: 'from-red-500 to-rose-600',
      bgColor: 'bg-red-50 dark:bg-red-900/20',
      borderColor: 'border-red-200 dark:border-red-700',
      xp: '+15 XP',
    },
    {
      id: 'mix' as Difficulty,
      name: 'Mix',
      description: 'Mistura de todas as dificuldades',
      icon: <Shuffle className="w-12 h-12" />,
      color: 'from-purple-500 to-indigo-600',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20',
      borderColor: 'border-purple-200 dark:border-purple-700',
      xp: '+10 XP',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-gray-900 dark:to-gray-800 p-4 sm:p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={onBack}
            className="mb-4 px-4 py-2 text-slate-600 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            ← Voltar
          </button>
          <h1 className="text-3xl sm:text-4xl text-slate-900 dark:text-white mb-2">
            Escolha a Dificuldade
          </h1>
          <p className="text-slate-600 dark:text-gray-400">
            Selecione o nível de dificuldade das questões para o seu estudo
          </p>
        </div>

        {/* Cards de Dificuldade */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {difficulties.map((diff) => (
            <button
              key={diff.id}
              onClick={() => onSelectDifficulty(diff.id)}
              className={`${diff.bgColor} ${diff.borderColor} border-2 rounded-2xl p-6 text-left transition-all hover:scale-105 hover:shadow-xl active:scale-95`}
            >
              {/* Ícone e Badge XP */}
              <div className="flex items-start justify-between mb-4">
                <div className={`bg-gradient-to-br ${diff.color} text-white p-3 rounded-xl shadow-lg`}>
                  {diff.icon}
                </div>
                <div className={`bg-gradient-to-r ${diff.color} text-white px-3 py-1 rounded-full text-sm`}>
                  {diff.xp}
                </div>
              </div>

              {/* Título */}
              <h3 className="text-2xl text-slate-900 dark:text-white mb-2">
                {diff.name}
              </h3>

              {/* Descrição */}
              <p className="text-slate-600 dark:text-gray-400 text-sm">
                {diff.description}
              </p>

              {/* Indicador */}
              <div className="mt-4 flex items-center gap-2">
                <div className={`flex-1 h-2 bg-gradient-to-r ${diff.color} rounded-full`}></div>
                <span className="text-xs text-slate-500 dark:text-gray-500">
                  {diff.id === 'facil' && '⭐'}
                  {diff.id === 'medio' && '⭐⭐'}
                  {diff.id === 'dificil' && '⭐⭐⭐'}
                  {diff.id === 'mix' && '🎲'}
                </span>
              </div>
            </button>
          ))}
        </div>

        {/* Dica */}
        <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-700 rounded-xl p-4">
          <div className="flex gap-3">
            <div className="text-blue-600 dark:text-blue-400">💡</div>
            <div>
              <h4 className="text-blue-900 dark:text-blue-100 mb-1">
                Dica de Estudo
              </h4>
              <p className="text-sm text-blue-700 dark:text-blue-300">
                Comece com questões <strong>Fáceis</strong> para construir confiança. 
                Quando acertar 80%+, avance para <strong>Médio</strong>. 
                O modo <strong>Mix</strong> simula melhor o concurso real!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
