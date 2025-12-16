import React, { useState, useEffect } from 'react';
import { ArrowLeft, CheckCircle, XCircle, Lightbulb } from 'lucide-react';
import { questions, Question } from '../data/questions';
import { useGame } from '../context/GameContext';
import { useStats } from '../context/StatsContext';

type Difficulty = 'easy' | 'medium' | 'hard' | 'mix';

interface StudySessionProps {
  onBack: () => void;
  difficulty: Difficulty;
}

export function StudySession({ onBack, difficulty }: StudySessionProps) {
  const { addXP } = useGame();
  const { recordAnswer } = useStats();
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [sessionQuestions, setSessionQuestions] = useState<Question[]>([]);
  const [sessionStats, setSessionStats] = useState({ correct: 0, total: 0 });

  // Inicializar questões da sessão
  useEffect(() => {
    let filtered = questions;
    
    if (difficulty !== 'mix') {
      filtered = questions.filter(q => q.difficulty === difficulty);
    }
    
    // Embaralhar questões
    const shuffled = [...filtered].sort(() => Math.random() - 0.5);
    setSessionQuestions(shuffled.slice(0, 10)); // 10 questões por sessão
  }, [difficulty]);

  if (sessionQuestions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="text-center">
          <p className="text-lg text-gray-600 dark:text-gray-400">Carregando questões...</p>
        </div>
      </div>
    );
  }

  const currentQuestion = sessionQuestions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === sessionQuestions.length - 1;

  const handleSelectAnswer = (index: number) => {
    if (showExplanation) return;
    setSelectedAnswer(index);
  };

  const handleConfirm = () => {
    if (selectedAnswer === null) return;
    
    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
    
    // Registrar resposta
    recordAnswer(currentQuestion.subject, isCorrect);
    
    // Atualizar stats da sessão
    setSessionStats(prev => ({
      correct: prev.correct + (isCorrect ? 1 : 0),
      total: prev.total + 1,
    }));
    
    // Adicionar XP baseado na dificuldade
    if (isCorrect) {
      const xpMap = { easy: 5, medium: 10, hard: 20 };
      addXP(xpMap[currentQuestion.difficulty]);
    }
    
    setShowExplanation(true);
  };

  const handleNext = () => {
    if (isLastQuestion) {
      // Fim da sessão
      onBack();
    } else {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    }
  };

  const getDifficultyColor = (diff: string) => {
    const colors = {
      easy: 'text-green-500 bg-green-100 dark:bg-green-900/20',
      medium: 'text-yellow-500 bg-yellow-100 dark:bg-yellow-900/20',
      hard: 'text-red-500 bg-red-100 dark:bg-red-900/20',
    };
    return colors[diff as keyof typeof colors] || colors.medium;
  };

  return (
    <div className="min-h-screen p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={onBack}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
        >
          <ArrowLeft className="size-6" />
        </button>
        
        <div className="text-center flex-1">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Questão {currentQuestionIndex + 1} de {sessionQuestions.length}
          </p>
          <p className="text-lg">
            {sessionStats.correct}/{sessionStats.total} corretas
          </p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full mb-6 overflow-hidden">
        <div 
          className="h-full bg-blue-500 transition-all duration-300"
          style={{ width: `${((currentQuestionIndex + 1) / sessionQuestions.length) * 100}%` }}
        />
      </div>

      {/* Question Card */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg mb-6">
        {/* Subject & Difficulty Badge */}
        <div className="flex items-center gap-2 mb-4">
          <span className="px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-sm">
            {currentQuestion.subject}
          </span>
          <span className={`px-3 py-1 rounded-full text-sm ${getDifficultyColor(currentQuestion.difficulty)}`}>
            {currentQuestion.difficulty === 'easy' && 'Fácil'}
            {currentQuestion.difficulty === 'medium' && 'Médio'}
            {currentQuestion.difficulty === 'hard' && 'Difícil'}
          </span>
        </div>

        {/* Question */}
        <h2 className="text-xl mb-6 leading-relaxed">
          {currentQuestion.question}
        </h2>

        {/* Options */}
        <div className="space-y-3">
          {currentQuestion.options.map((option, index) => {
            const isSelected = selectedAnswer === index;
            const isCorrect = index === currentQuestion.correctAnswer;
            const showResult = showExplanation;

            let buttonClass = 'w-full p-4 rounded-xl border-2 text-left transition-all ';
            
            if (!showResult) {
              buttonClass += isSelected 
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                : 'border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700';
            } else {
              if (isCorrect) {
                buttonClass += 'border-green-500 bg-green-50 dark:bg-green-900/20';
              } else if (isSelected && !isCorrect) {
                buttonClass += 'border-red-500 bg-red-50 dark:bg-red-900/20';
              } else {
                buttonClass += 'border-gray-200 dark:border-gray-700';
              }
            }

            return (
              <button
                key={index}
                onClick={() => handleSelectAnswer(index)}
                disabled={showExplanation}
                className={buttonClass}
              >
                <div className="flex items-center gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm">
                    {String.fromCharCode(65 + index)}
                  </span>
                  <span className="flex-1">{option}</span>
                  {showResult && isCorrect && (
                    <CheckCircle className="size-6 text-green-500 flex-shrink-0" />
                  )}
                  {showResult && isSelected && !isCorrect && (
                    <XCircle className="size-6 text-red-500 flex-shrink-0" />
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Explanation */}
        {showExplanation && (
          <div className="mt-6 p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-800 animate-slide-in-up">
            <div className="flex items-start gap-3">
              <Lightbulb className="size-6 text-blue-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm mb-1">Explicação:</p>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  {currentQuestion.explanation}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        {!showExplanation ? (
          <button
            onClick={handleConfirm}
            disabled={selectedAnswer === null}
            className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 dark:disabled:bg-gray-700 text-white rounded-xl py-4 transition-colors disabled:cursor-not-allowed"
          >
            Confirmar Resposta
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white rounded-xl py-4 transition-colors"
          >
            {isLastQuestion ? 'Finalizar Sessão' : 'Próxima Questão'}
          </button>
        )}
      </div>
    </div>
  );
}
