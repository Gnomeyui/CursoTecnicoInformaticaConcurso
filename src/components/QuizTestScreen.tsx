/**
 * QuizTestScreen - Tela de teste do sistema de questões
 * 
 * MODELO HÍBRIDO:
 * - Exibe questões com formato "Banca • Ano • Cargo"
 * - Alternativas embaralhadas (shuffledOptions)
 * - Sistema de progresso e XP integrado
 */

import React, { useState } from 'react';
import { useSmartQuiz } from '../hooks/useSmartQuiz';
import { CheckCircle, XCircle, ChevronLeft, ChevronRight, RotateCcw } from 'lucide-react';

export function QuizTestScreen() {
  const { 
    questions, 
    loading, 
    error, 
    currentQuestion, 
    currentIndex, 
    totalQuestions,
    isLastQuestion,
    isFirstQuestion,
    nextQuestion,
    previousQuestion,
    resetQuiz,
    handleAnswer
  } = useSmartQuiz({ quantidade: 10 });

  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Carregando questões...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-6">
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 max-w-md">
          <XCircle className="w-12 h-12 text-red-600 dark:text-red-400 mx-auto mb-4" />
          <p className="text-red-800 dark:text-red-200 text-center">{error}</p>
        </div>
      </div>
    );
  }

  if (!currentQuestion) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <p className="text-gray-600 dark:text-gray-400">Nenhuma questão disponível</p>
      </div>
    );
  }

  const handleOptionSelect = (optionId: string) => {
    if (showExplanation) return; // Não permite mudar depois de responder
    
    setSelectedOption(optionId);
    setShowExplanation(true);
    
    // Salvar resposta
    const isCorrect = optionId === currentQuestion.correctOption;
    handleAnswer(currentQuestion.id, isCorrect);
  };

  const handleNext = () => {
    setSelectedOption(null);
    setShowExplanation(false);
    nextQuestion();
  };

  const handlePrevious = () => {
    setSelectedOption(null);
    setShowExplanation(false);
    previousQuestion();
  };

  const handleReset = () => {
    setSelectedOption(null);
    setShowExplanation(false);
    resetQuiz();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-indigo-900 dark:to-gray-900 p-6">
      <div className="max-w-3xl mx-auto">
        {/* Header com progresso */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Quiz de Teste
            </h1>
            <button
              onClick={handleReset}
              className="flex items-center gap-2 text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300"
            >
              <RotateCcw className="w-4 h-4" />
              Reiniciar
            </button>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <span>Questão {currentIndex + 1} de {totalQuestions}</span>
            <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-indigo-600 dark:bg-indigo-500 transition-all duration-300"
                style={{ width: `${((currentIndex + 1) / totalQuestions) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Card da Questão */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-6">
          {/* CABEÇALHO: Banca - Ano - Cargo */}
          <div className="flex flex-wrap gap-2 mb-4 text-xs font-bold uppercase tracking-wide">
            <span className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-md border border-gray-200 dark:border-gray-600">
              {currentQuestion.banca}
            </span>
            
            <span className="text-gray-300 dark:text-gray-600">•</span>
            
            <span className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-md border border-gray-200 dark:border-gray-600">
              {currentQuestion.ano}
            </span>
            
            <span className="text-gray-300 dark:text-gray-600">•</span>
            
            <span className="bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 px-3 py-1 rounded-md border border-blue-100 dark:border-blue-800 truncate max-w-[300px]">
              {currentQuestion.cargo}
            </span>
          </div>

          {/* Matéria */}
          <div className="mb-4">
            <span className="inline-block bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-xs font-semibold px-2 py-1 rounded">
              {currentQuestion.discipline}
            </span>
          </div>

          {/* Questão Número */}
          <div className="mb-2 text-sm text-gray-500 dark:text-gray-400">
            Questão {currentQuestion.questionNumber}
          </div>

          {/* Enunciado */}
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 leading-relaxed">
            {currentQuestion.statement}
          </h2>

          {/* Opções */}
          <div className="space-y-3">
            {currentQuestion.shuffledOptions.map((option) => {
              const isSelected = selectedOption === option.id;
              const isCorrect = option.id === currentQuestion.correctOption;
              const showCorrect = showExplanation && isCorrect;
              const showWrong = showExplanation && isSelected && !isCorrect;

              return (
                <button
                  key={option.id}
                  onClick={() => handleOptionSelect(option.id)}
                  disabled={showExplanation}
                  className={`
                    w-full text-left p-4 rounded-lg border-2 transition-all
                    ${!showExplanation && 'hover:border-indigo-300 dark:hover:border-indigo-600'}
                    ${isSelected && !showExplanation && 'border-indigo-500 dark:border-indigo-400 bg-indigo-50 dark:bg-indigo-900/20'}
                    ${!isSelected && !showExplanation && 'border-gray-200 dark:border-gray-700'}
                    ${showCorrect && 'border-green-500 dark:border-green-400 bg-green-50 dark:bg-green-900/20'}
                    ${showWrong && 'border-red-500 dark:border-red-400 bg-red-50 dark:bg-red-900/20'}
                    ${showExplanation && !isSelected && !isCorrect && 'opacity-50'}
                  `}
                >
                  <div className="flex items-center gap-3">
                    <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-semibold">
                      {option.id}
                    </span>
                    <span className="flex-1 text-gray-800 dark:text-gray-200">{option.text}</span>
                    {showCorrect && <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />}
                    {showWrong && <XCircle className="w-6 h-6 text-red-600 dark:text-red-400" />}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Feedback */}
          {showExplanation && (
            <div className={`mt-6 p-4 rounded-lg ${
              selectedOption === currentQuestion.correctOption
                ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800'
                : 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800'
            }`}>
              <div className="flex items-start gap-3">
                {selectedOption === currentQuestion.correctOption ? (
                  <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400 flex-shrink-0" />
                ) : (
                  <XCircle className="w-6 h-6 text-red-600 dark:text-red-400 flex-shrink-0" />
                )}
                <div>
                  <p className={`font-semibold mb-1 ${
                    selectedOption === currentQuestion.correctOption
                      ? 'text-green-900 dark:text-green-100'
                      : 'text-red-900 dark:text-red-100'
                  }`}>
                    {selectedOption === currentQuestion.correctOption ? 'Correto!' : 'Incorreto'}
                  </p>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    A resposta correta é a alternativa {currentQuestion.correctOption}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Navegação */}
        <div className="flex items-center justify-between gap-4">
          <button
            onClick={handlePrevious}
            disabled={isFirstQuestion}
            className="flex items-center gap-2 px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
            Anterior
          </button>

          <button
            onClick={handleNext}
            disabled={isLastQuestion}
            className="flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Próxima
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}