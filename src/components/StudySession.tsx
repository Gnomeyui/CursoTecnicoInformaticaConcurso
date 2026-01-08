import React, { useState, useEffect } from 'react';
import { ArrowLeft, CheckCircle, XCircle, Lightbulb, RotateCcw } from 'lucide-react';
import { questions, Question } from '../data/questions';
import { useGame } from '../context/GameContext';
import { useStats } from '../context/StatsContext';
import { useWrongQuestions } from '../context/WrongQuestionsContext';
import { shuffleQuestionOptions, mixQuestionsWithReview, filterQuestions, ShuffledQuestion } from '../utils/questionHelpers';

type Difficulty = 'easy' | 'medium' | 'hard' | 'mix';

interface StudySessionProps {
  onBack: () => void;
  difficulty: Difficulty;
  subject?: string;
}

export function StudySession({ onBack, difficulty, subject }: StudySessionProps) {
  const { addXP } = useGame();
  const { recordAnswer } = useStats();
  const { recordWrongAnswer, recordCorrectReview, getWrongQuestionsForReview } = useWrongQuestions();
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [sessionQuestions, setSessionQuestions] = useState<ShuffledQuestion[]>([]);
  const [sessionStats, setSessionStats] = useState({ correct: 0, total: 0 });
  const [reviewQuestionIds, setReviewQuestionIds] = useState<number[]>([]);

  // Inicializar questões da sessão
  useEffect(() => {
    // Filtrar questões por dificuldade e matéria
    const filtered = filterQuestions(questions, difficulty, subject);
    
    console.log('📚 Total de questões disponíveis:', questions.length);
    console.log('🎯 Dificuldade selecionada:', difficulty);
    console.log('📖 Matéria selecionada:', subject);
    console.log('✅ Questões após filtros:', filtered.length);
    
    // Obter questões erradas para revisão (máximo 2 repetições)
    const wrongIds = getWrongQuestionsForReview(2);
    setReviewQuestionIds(wrongIds);
    
    console.log('🔄 Questões erradas disponíveis para revisão:', wrongIds.length);
    
    // Mesclar questões novas com questões de revisão (30% de revisão)
    const mixedQuestions = mixQuestionsWithReview(filtered, wrongIds, 10, 0.3);
    
    console.log('📝 Questões da sessão:', mixedQuestions.length);
    console.log('🔄 Questões de revisão incluídas:', 
      mixedQuestions.filter(q => wrongIds.includes(q.id)).length
    );
    
    // Embaralhar as alternativas de cada questão
    const shuffledQuestions = mixedQuestions.map(q => shuffleQuestionOptions(q));
    
    setSessionQuestions(shuffledQuestions);
  }, [difficulty, subject]);

  if (sessionQuestions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="text-center">
          <p className="text-lg text-gray-900 dark:text-gray-100 mb-2">Carregando questões...</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {questions.length} questões disponíveis
          </p>
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
    const isReviewQuestion = reviewQuestionIds.includes(currentQuestion.id);
    
    // Registrar resposta
    recordAnswer(currentQuestion.subject, isCorrect);
    
    // Atualizar stats da sessão
    setSessionStats(prev => ({
      correct: prev.correct + (isCorrect ? 1 : 0),
      total: prev.total + 1,
    }));
    
    // Gerenciar questões erradas
    if (isCorrect && isReviewQuestion) {
      // Se acertou uma questão de revisão, registrar
      recordCorrectReview(currentQuestion.id);
    } else if (!isCorrect) {
      // Se errou, adicionar/atualizar na lista de erradas
      recordWrongAnswer(currentQuestion.id, currentQuestion.subject);
    }
    
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
          <ArrowLeft className="size-6 text-gray-700 dark:text-gray-300" />
        </button>
        
        <div className="text-center flex-1">
          <p className="text-sm text-foreground">
            Questão {currentQuestionIndex + 1} de {sessionQuestions.length}
          </p>
          <p className="text-lg text-black">
            {sessionStats.correct}/{sessionStats.total} corretas
          </p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="h-2 bg-white rounded-full mb-6 overflow-hidden border border-black">
        <div 
          className="h-full bg-green-500 transition-all duration-300"
          style={{ width: `${((currentQuestionIndex + 1) / sessionQuestions.length) * 100}%` }}
        />
      </div>

      {/* Question Card */}
      <div className="bg-card rounded-2xl p-6 shadow-lg mb-6 border border-border">
        {/* Subject & Difficulty Badge */}
        <div className="flex items-center gap-2 mb-4 flex-wrap">
          <span className="px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 text-sm">
            {currentQuestion.subject}
          </span>
          <span className={`px-3 py-1 rounded-full text-sm ${getDifficultyColor(currentQuestion.difficulty)}`}>
            {currentQuestion.difficulty === 'easy' && 'Fácil'}
            {currentQuestion.difficulty === 'medium' && 'Médio'}
            {currentQuestion.difficulty === 'hard' && 'Difícil'}
          </span>
          {reviewQuestionIds.includes(currentQuestion.id) && (
            <span className="px-3 py-1 rounded-full bg-orange-100 dark:bg-orange-500/20 text-orange-600 dark:text-orange-400 text-sm flex items-center gap-1">
              <RotateCcw className="size-3" />
              Revisão
            </span>
          )}
        </div>

        {/* Informações da Prova (Banca, Ano, Concurso) */}
        {(currentQuestion.banca || currentQuestion.ano || currentQuestion.concurso) && (
          <div className="mb-4 pb-4 border-b border-border">
            <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
              {currentQuestion.banca && (
                <span className="flex items-center gap-1">
                  <span className="font-semibold">Banca:</span>
                  <span>{currentQuestion.banca}</span>
                </span>
              )}
              {currentQuestion.ano && (
                <span className="flex items-center gap-1">
                  <span className="font-semibold">Ano:</span>
                  <span>{currentQuestion.ano}</span>
                </span>
              )}
            </div>
            {currentQuestion.concurso && (
              <div className="mt-1 text-xs text-muted-foreground">
                <span className="font-semibold">Concurso:</span> {currentQuestion.concurso}
              </div>
            )}
          </div>
        )}

        {/* Question */}
        <h2 className="text-xl mb-6 leading-relaxed text-foreground">
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
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-500/20' 
                : 'border-border hover:border-blue-300 dark:hover:border-blue-700';
            } else {
              if (isCorrect) {
                buttonClass += 'border-green-500 bg-green-50 dark:bg-green-500/20';
              } else if (isSelected && !isCorrect) {
                buttonClass += 'border-red-500 bg-red-50 dark:bg-red-500/20';
              } else {
                buttonClass += 'border-border';
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
                  <span className={`
                    flex-shrink-0 w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-semibold
                    ${!showResult && !isSelected ? 'text-foreground border-border' : ''}
                    ${!showResult && isSelected ? 'text-blue-600 dark:text-blue-400 border-blue-500' : ''}
                    ${showResult && isCorrect ? 'text-green-600 dark:text-green-400 border-green-500' : ''}
                    ${showResult && isSelected && !isCorrect ? 'text-red-600 dark:text-red-400 border-red-500' : ''}
                    ${showResult && !isCorrect && !isSelected ? 'text-muted-foreground border-border' : ''}
                  `}>
                    {String.fromCharCode(65 + index)}
                  </span>
                  <span className={`
                    flex-1 font-medium
                    ${!showResult && !isSelected ? 'text-foreground' : ''}
                    ${!showResult && isSelected ? 'text-blue-600 dark:text-blue-400' : ''}
                    ${showResult && isCorrect ? 'text-green-600 dark:text-green-400 font-semibold' : ''}
                    ${showResult && isSelected && !isCorrect ? 'text-red-600 dark:text-red-400' : ''}
                    ${showResult && !isCorrect && !isSelected ? 'text-muted-foreground' : ''}
                  `}>
                    {option}
                  </span>
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
          <div className="mt-6 p-4 rounded-xl bg-blue-50 dark:bg-blue-500/20 border-2 border-blue-200 dark:border-blue-800 animate-slide-in-up">
            <div className="flex items-start gap-3">
              <Lightbulb className="size-6 text-blue-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm mb-1 font-semibold text-foreground">Explicação:</p>
                <p className="text-sm text-foreground">
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