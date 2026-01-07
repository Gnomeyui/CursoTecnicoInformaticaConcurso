import React, { useEffect, useState } from 'react';
import { Check, X, AlertCircle, Trophy, Target } from 'lucide-react';
import { useSmartQuiz } from '../hooks/useSmartQuiz';

interface SmartQuizSessionProps {
  archetypeId: number;
  userId: string;
  onSessionComplete?: (stats: {
    questionsAnswered: number;
    correctAnswers: number;
    xpGained: number;
    accuracy: number;
  }) => void;
}

export function SmartQuizSession({
  archetypeId,
  userId,
  onSessionComplete
}: SmartQuizSessionProps) {
  const {
    fetchBlock,
    handleAnswer,
    getCurrentQuestion,
    resetSession,
    currentMode,
    isLoading,
    sessionStats,
    isSessionComplete,
    accuracy,
    totalQuestions,
    currentQuestionIndex
  } = useSmartQuiz({ archetypeId, userId, questionsPerBlock: 10 });

  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [lastAnswerCorrect, setLastAnswerCorrect] = useState(false);

  const currentQuestion = getCurrentQuestion();

  // Carregar questões ao montar
  useEffect(() => {
    fetchBlock();
  }, [fetchBlock]);

  // Verificar se a sessão foi completada
  useEffect(() => {
    if (isSessionComplete && onSessionComplete) {
      onSessionComplete({
        ...sessionStats,
        accuracy
      });
    }
  }, [isSessionComplete, sessionStats, accuracy, onSessionComplete]);

  const handleOptionSelect = async (optionId: string) => {
    if (showFeedback || !currentQuestion) return;

    setSelectedOption(optionId);
    const { isCorrect } = await handleAnswer(currentQuestion, optionId);
    setLastAnswerCorrect(isCorrect);
    setShowFeedback(true);

    // Aguardar 2 segundos antes de avançar
    setTimeout(() => {
      setShowFeedback(false);
      setSelectedOption(null);
    }, 2000);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Carregando questões...</p>
        </div>
      </div>
    );
  }

  if (isSessionComplete) {
    return (
      <div className="flex items-center justify-center min-h-screen p-6">
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl max-w-md w-full">
          <div className="text-center mb-6">
            <Trophy className="size-16 text-yellow-500 mx-auto mb-4" />
            <h2 className="text-3xl mb-2 text-gray-900 dark:text-gray-100">
              Sessão Concluída!
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Parabéns! Você completou todas as questões.
            </p>
          </div>

          <div className="space-y-4 mb-6">
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-700 dark:text-gray-300">Questões Respondidas</span>
                <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {sessionStats.questionsAnswered}
                </span>
              </div>
            </div>

            <div className="bg-green-50 dark:bg-green-900/20 rounded-2xl p-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-700 dark:text-gray-300">Acertos</span>
                <span className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {sessionStats.correctAnswers}
                </span>
              </div>
            </div>

            <div className="bg-purple-50 dark:bg-purple-900/20 rounded-2xl p-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-700 dark:text-gray-300">Precisão</span>
                <span className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                  {Math.round(accuracy)}%
                </span>
              </div>
            </div>

            <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-2xl p-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-700 dark:text-gray-300">XP Ganho</span>
                <span className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                  +{sessionStats.xpGained} XP
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={() => {
              resetSession();
              fetchBlock();
            }}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white rounded-2xl py-4 font-semibold transition-colors"
          >
            Iniciar Nova Sessão
          </button>
        </div>
      </div>
    );
  }

  if (!currentQuestion) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <AlertCircle className="size-16 text-orange-500 mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">
            Nenhuma questão disponível no momento.
          </p>
          <button
            onClick={fetchBlock}
            className="mt-4 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Tentar Novamente
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 pb-24">
      {/* Header com Progresso */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Target className="size-5 text-blue-500" />
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Questão {currentQuestionIndex + 1} de {totalQuestions}
            </span>
          </div>
          {currentMode === 'review_forced' && (
            <div className="bg-orange-100 dark:bg-orange-900/20 px-3 py-1 rounded-full">
              <span className="text-sm text-orange-600 dark:text-orange-400 font-semibold">
                Modo Revisão
              </span>
            </div>
          )}
        </div>

        {/* Barra de Progresso */}
        <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-500 transition-all duration-300"
            style={{
              width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%`
            }}
          />
        </div>

        {/* Estatísticas da Sessão */}
        <div className="grid grid-cols-3 gap-3 mt-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-3 text-center">
            <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Respondidas</p>
            <p className="text-lg font-bold text-gray-900 dark:text-gray-100">
              {sessionStats.questionsAnswered}
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-3 text-center">
            <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Acertos</p>
            <p className="text-lg font-bold text-green-600 dark:text-green-400">
              {sessionStats.correctAnswers}
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-3 text-center">
            <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">XP</p>
            <p className="text-lg font-bold text-yellow-600 dark:text-yellow-400">
              +{sessionStats.xpGained}
            </p>
          </div>
        </div>
      </div>

      {/* Questão */}
      <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-lg mb-6">
        <div className="mb-6">
          <div className="flex items-start gap-3 mb-4">
            <div className="bg-blue-100 dark:bg-blue-900/20 rounded-full p-2 flex-shrink-0">
              <span className="text-sm font-bold text-blue-600 dark:text-blue-400">
                {currentQuestionIndex + 1}
              </span>
            </div>
            <p className="text-lg text-gray-900 dark:text-gray-100 leading-relaxed">
              {currentQuestion.text}
            </p>
          </div>
        </div>

        {/* Opções */}
        <div className="space-y-3">
          {(currentQuestion.shuffledOptions || currentQuestion.options).map((option) => {
            const isSelected = selectedOption === option.id;
            const isCorrect = option.id === currentQuestion.correct_option_id;
            const showCorrect = showFeedback && isCorrect;
            const showWrong = showFeedback && isSelected && !isCorrect;

            return (
              <button
                key={option.id}
                onClick={() => handleOptionSelect(option.id)}
                disabled={showFeedback}
                className={`
                  w-full p-4 rounded-2xl text-left transition-all
                  ${!showFeedback && 'hover:bg-gray-50 dark:hover:bg-gray-700'}
                  ${isSelected && !showFeedback && 'bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-500'}
                  ${!isSelected && !showFeedback && 'bg-gray-50 dark:bg-gray-700'}
                  ${showCorrect && 'bg-green-100 dark:bg-green-900/20 border-2 border-green-500'}
                  ${showWrong && 'bg-red-100 dark:bg-red-900/20 border-2 border-red-500'}
                `}
              >
                <div className="flex items-center justify-between">
                  <span className="text-gray-900 dark:text-gray-100">{option.text}</span>
                  {showCorrect && <Check className="size-6 text-green-600" />}
                  {showWrong && <X className="size-6 text-red-600" />}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Feedback */}
      {showFeedback && (
        <div
          className={`
            rounded-2xl p-4 flex items-center gap-3 shadow-lg
            ${lastAnswerCorrect
              ? 'bg-green-100 dark:bg-green-900/20'
              : 'bg-red-100 dark:bg-red-900/20'
            }
          `}
        >
          {lastAnswerCorrect ? (
            <>
              <Check className="size-6 text-green-600 dark:text-green-400" />
              <div>
                <p className="font-semibold text-green-800 dark:text-green-300">
                  Resposta Correta!
                </p>
                <p className="text-sm text-green-700 dark:text-green-400">
                  Você ganhou +10 XP
                </p>
              </div>
            </>
          ) : (
            <>
              <X className="size-6 text-red-600 dark:text-red-400" />
              <div>
                <p className="font-semibold text-red-800 dark:text-red-300">
                  Resposta Incorreta
                </p>
                <p className="text-sm text-red-700 dark:text-red-400">
                  {currentMode === 'review_forced'
                    ? 'Leia com atenção! Você precisa acertar para avançar.'
                    : 'Esta questão voltará para revisão.'}
                </p>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
