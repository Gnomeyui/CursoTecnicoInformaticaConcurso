import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, ChevronRight, Check, X, Clock, Zap, Star, TrendingUp, Trophy,
  ChevronLeft, Eye, EyeOff, BookOpen, Scale, ArrowRight, Shield, Network,
  Laptop, CheckCircle2, XCircle, Circle, Award
} from 'lucide-react';
import { getQuestionsBySubject, recordAnswer, selectSmartQuestions, shuffleQuestionOptions } from '../utils/questionManager';
import { useTheme } from '../context/ThemeContext';
import { useGame } from '../context/GameContext'; // 🚀 GameContext
import { useStats } from '../context/StatsContext'; // 📊 NOVO: StatsContext
import { FLASHCARDS } from '../data/flashcards';
import { QUESTIONS_WITH_DIFFICULTY } from '../data/questionsWithDifficulty';
import { Question } from '../types/estudos';

interface Flashcard {
  id: number;
  topico: string;
  frente: string;
  verso: string;
  dificuldade: 'Fácil' | 'Média' | 'Difícil';
}

interface StudySessionProps {
  onBack: () => void;
  dailyScore: number;
  totalQuestions?: number; // ✅ ADICIONADO (opcional para compatibilidade)
  onScoreUpdate: (score: number, total: number) => void;
  difficulty?: 'facil' | 'medio' | 'dificil' | 'mix'; // ✅ NOVO: Dificuldade selecionada
}

export function StudySession({ onBack, dailyScore, totalQuestions = 0, onScoreUpdate, difficulty = 'mix' }: StudySessionProps) {
  // 🚀 GameContext para XP e badges
  const { addXP, checkAndUnlockBadges, updateStreak, recordStudyDay, recordQuestionAnswer: recordGameAnswer, gameStats } = useGame();
  // 📊 StatsContext para estatísticas detalhadas
  const { recordQuestionAnswer: recordStatsAnswer } = useStats();

  const [phase, setPhase] = useState<'flashcards' | 'questions'>('flashcards');
  const [flashcardsList, setFlashcardsList] = useState<Flashcard[]>([]);
  const [questionsList, setQuestionsList] = useState<Question[]>([]);
  const [currentFlashcardIndex, setCurrentFlashcardIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [sessionCorrect, setSessionCorrect] = useState(0);
  const [sessionTotal, setSessionTotal] = useState(0);
  const [usedQuestionIds, setUsedQuestionIds] = useState<Set<number>>(new Set());
  const [flashcardsCompleted, setFlashcardsCompleted] = useState(0);
  const [showXPGain, setShowXPGain] = useState(false);
  const [lastXPGain, setLastXPGain] = useState(0);

  // Carregar configurações e inicializar sessão
  useEffect(() => {
    loadSession();
  }, []);

  const loadSession = () => {
    const settings = localStorage.getItem('alerr_settings');
    const flashcardsPerSession = settings 
      ? JSON.parse(settings).flashcardsPerSession ?? 2
      : 2;
    const questionsPerSession = settings
      ? JSON.parse(settings).questionsPerSession || 10
      : 10;

    console.log('📚 Carregando sessão:', { 
      flashcardsPerSession, 
      questionsPerSession,
      totalFlashcardsDisponiveis: FLASHCARDS.length 
    });

    // Se não tem flashcards configurados, vai direto para questões
    if (flashcardsPerSession === 0) {
      setPhase('questions');
      loadQuestions(questionsPerSession);
      return;
    }

    // Selecionar flashcards aleatórios
    const shuffled = [...FLASHCARDS].sort(() => Math.random() - 0.5);
    setFlashcardsList(shuffled.slice(0, flashcardsPerSession));

    // Preparar questões (mas não mostrar ainda)
    loadQuestions(questionsPerSession);
  };

  const loadQuestions = (questionsPerSession: number) => {
    const smartSelection = selectSmartQuestions(
      QUESTIONS_WITH_DIFFICULTY, // ✅ NOVO: Usa questões com dificuldade automática
      questionsPerSession,
      usedQuestionIds,
      difficulty // ✅ Passa a dificuldade selecionada
    );
    const shuffledQuestions = smartSelection.map(q => shuffleQuestionOptions(q));
    setQuestionsList(shuffledQuestions);
  };

  const handleNextFlashcard = () => {
    const completed = flashcardsCompleted + 1;
    setFlashcardsCompleted(completed);
    
    if (currentFlashcardIndex + 1 < flashcardsList.length) {
      setCurrentFlashcardIndex(currentFlashcardIndex + 1);
      setShowAnswer(false);
    } else {
      // Terminou os flashcards, vai para questões
      setPhase('questions');
    }
  };

  const handleAnswer = () => {
    if (selectedOption === null) return;
    
    const currentQuestion = questionsList[currentQuestionIndex];
    if (!currentQuestion) return;
    
    setShowResult(true);
    const newTotal = sessionTotal + 1;
    setSessionTotal(newTotal);
    
    const wasCorrect = selectedOption === currentQuestion.correta;
    
    // Registrar resposta no questionManager (para histórico local)
    recordAnswer(currentQuestion.id, wasCorrect);
    
    // Registrar resposta no GameContext (para estatísticas globais e badges)
    recordGameAnswer(wasCorrect);
    
    // 📊 Registrar resposta no StatsContext (para estatísticas detalhadas por matéria)
    recordStatsAnswer(currentQuestion.materia, wasCorrect);
    
    // Marcar questão como usada
    setUsedQuestionIds(prev => new Set([...prev, currentQuestion.id]));
    
    // ✅ CORREÇÃO: Usar total acumulado do dia
    const totalQuestionsNow = totalQuestions + newTotal;
    
    if (wasCorrect) {
      const newScore = sessionCorrect + 1;
      setSessionCorrect(newScore);
      onScoreUpdate(dailyScore + 1, totalQuestionsNow);
    } else {
      onScoreUpdate(dailyScore, totalQuestionsNow);
    }

    // 🚀 NOVO: Adicionar XP e verificar badges
    if (wasCorrect) {
      const xpGain = 10; // +10 XP por questão correta
      addXP(xpGain);
      setLastXPGain(xpGain);
      setShowXPGain(true);
      setTimeout(() => setShowXPGain(false), 2000); // Ocultar após 2 segundos
    }
    
    // Verificar badges (sempre, pois algumas dependem do total de questões respondidas)
    checkAndUnlockBadges();
    
    // Atualizar streak e dia de estudo (apenas na primeira questão do dia)
    updateStreak();
    recordStudyDay();
  };

  const handleNext = () => {
    if (currentQuestionIndex + 1 < questionsList.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
      setShowResult(false);
    } else {
      // Sessão finalizada
      onBack();
    }
  };

  // Renderizar fase de flashcards
  if (phase === 'flashcards' && flashcardsList.length > 0) {
    const currentFlashcard = flashcardsList[currentFlashcardIndex];
    const progress = ((currentFlashcardIndex + 1) / flashcardsList.length) * 100;

    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-purple-200 dark:border-purple-700 sticky top-0 z-50">
          <div className="px-3 sm:px-4 py-3">
            <div className="flex items-center justify-between">
              <button 
                onClick={onBack}
                className="flex items-center gap-1 text-slate-600 dark:text-gray-300 hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
                <span className="text-sm">Sair</span>
              </button>
              <div className="flex items-center gap-2 text-sm text-purple-700 dark:text-purple-400">
                <BookOpen className="w-4 h-4" />
                <span className="font-medium">Aquecimento {currentFlashcardIndex + 1}/{flashcardsList.length}</span>
              </div>
            </div>
            {/* Progress Bar */}
            <div className="mt-3 bg-purple-100 dark:bg-purple-900/30 rounded-full h-2 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-purple-600 to-pink-600 h-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>

        {/* Flashcard */}
        <div className="px-3 sm:px-4 py-6 max-w-2xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden border-2 border-purple-200 dark:border-purple-700">
            {/* Front */}
            <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-6 sm:p-8">
              <div className="flex items-center gap-2 text-white/90 text-sm mb-4">
                <Scale className="w-4 h-4" />
                <span>{currentFlashcard.topico}</span>
              </div>
              <h2 className="text-xl sm:text-2xl text-white mb-2">
                {currentFlashcard.frente}
              </h2>
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/20 text-white text-xs">
                {currentFlashcard.dificuldade}
              </div>
            </div>

            {/* Back */}
            <div className={`p-6 sm:p-8 transition-all duration-300 ${
              showAnswer ? 'bg-white dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-900'
            }`}>
              <button
                onClick={() => setShowAnswer(!showAnswer)}
                className="w-full flex items-center justify-center gap-2 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl shadow-lg mb-6 transition-all hover:shadow-xl active:scale-95"
              >
                {showAnswer ? (
                  <>
                    <EyeOff className="w-5 h-5" />
                    <span>Ocultar Resposta</span>
                  </>
                ) : (
                  <>
                    <Eye className="w-5 h-5" />
                    <span>Revelar Resposta</span>
                  </>
                )}
              </button>

              {showAnswer && (
                <div className="space-y-4 animate-fadeIn">
                  <div className="bg-purple-50 dark:bg-purple-900/30 rounded-xl p-4 border-2 border-purple-200 dark:border-purple-700">
                    <p className="text-slate-800 dark:text-gray-200 leading-relaxed">
                      {currentFlashcard.verso}
                    </p>
                  </div>

                  <button
                    onClick={handleNextFlashcard}
                    className="w-full flex items-center justify-center gap-2 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl shadow-lg transition-all hover:shadow-xl active:scale-95"
                  >
                    {currentFlashcardIndex + 1 < flashcardsList.length ? (
                      <>
                        <span>Próximo Flashcard</span>
                        <ArrowRight className="w-5 h-5" />
                      </>
                    ) : (
                      <>
                        <span>Começar Questões</span>
                        <Zap className="w-5 h-5" />
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Status */}
          <div className="mt-6 text-center">
            <p className="text-sm text-slate-600 dark:text-gray-400">
              🧠 Você já revisou <strong>{flashcardsCompleted}</strong> de <strong>{flashcardsList.length}</strong> flashcards
            </p>
            <p className="text-xs text-purple-600 dark:text-purple-400 mt-2">
              Após terminar, você responderá {questionsList.length} questões!
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Renderizar fase de questões
  if (phase === 'questions' && questionsList.length > 0) {
    const currentQuestion = questionsList[currentQuestionIndex];
    const progress = ((currentQuestionIndex + 1) / questionsList.length) * 100;

    const getIcon = (materia: string) => {
      const mat = materia.toLowerCase();
      if (mat.includes('segurança')) return <Shield className="w-4 h-4" />;
      if (mat.includes('redes')) return <Network className="w-4 h-4" />;
      if (mat.includes('legislação') || mat.includes('direito')) return <Scale className="w-4 h-4" />;
      if (mat.includes('português')) return <BookOpen className="w-4 h-4" />;
      return <Laptop className="w-4 h-4" />;
    };

    const getColor = (materia: string) => {
      const mat = materia.toLowerCase();
      if (mat.includes('segurança')) return 'text-red-600 bg-red-50 border-red-200';
      if (mat.includes('redes')) return 'text-blue-600 bg-blue-50 border-blue-200';
      if (mat.includes('legislação') || mat.includes('direito')) return 'text-amber-600 bg-amber-50 border-amber-200';
      if (mat.includes('português')) return 'text-purple-600 bg-purple-50 border-purple-200';
      return 'text-cyan-600 bg-cyan-50 border-cyan-200';
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-gray-900 dark:to-gray-800">
        {/* XP Gain Notification */}
        {showXPGain && (
          <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 animate-bounce">
            <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-2">
              <Zap className="w-5 h-5" />
              <span className="font-bold">+{lastXPGain} XP</span>
              <Award className="w-5 h-5" />
            </div>
          </div>
        )}

        {/* Header */}
        <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-slate-200 dark:border-gray-700 sticky top-0 z-50">
          <div className="px-3 sm:px-4 py-3">
            <div className="flex items-center justify-between">
              <button 
                onClick={onBack}
                className="flex items-center gap-1 text-slate-600 dark:text-gray-300 hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
                <span className="text-sm">Sair</span>
              </button>
              <div className="flex items-center gap-3">
                {/* XP Display */}
                <div className="flex items-center gap-1 text-sm bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/30 dark:to-orange-900/30 px-2 py-1 rounded-lg border border-yellow-300 dark:border-yellow-700">
                  <Zap className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
                  <span className="text-yellow-700 dark:text-yellow-300 font-semibold">{gameStats.xp} XP</span>
                </div>
                <div className="flex items-center gap-1 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-green-600 dark:text-green-400" />
                  <span className="text-green-600 dark:text-green-400 font-semibold">{sessionCorrect}</span>
                </div>
                <div className="flex items-center gap-1 text-sm">
                  <XCircle className="w-4 h-4 text-red-600 dark:text-red-400" />
                  <span className="text-red-600 dark:text-red-400 font-semibold">{sessionTotal - sessionCorrect}</span>
                </div>
              </div>
            </div>
            {/* Progress */}
            <div className="mt-3">
              <div className="flex items-center justify-between text-xs text-slate-600 dark:text-gray-400 mb-1">
                <span>Questão {currentQuestionIndex + 1} de {questionsList.length}</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <div className="bg-slate-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-blue-600 to-cyan-600 h-full transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Question */}
        <div className="px-3 sm:px-4 py-6 max-w-3xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-5 sm:p-6 mb-6 border border-slate-200 dark:border-gray-700">
            {/* Subject Badge */}
            <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border-2 mb-4 ${getColor(currentQuestion.materia)}`}>
              {getIcon(currentQuestion.materia)}
              <span className="text-sm font-medium">{currentQuestion.materia}</span>
            </div>

            {/* Question */}
            <h2 className="text-lg sm:text-xl text-slate-900 dark:text-white mb-6 leading-relaxed">
              {currentQuestion.pergunta}
            </h2>

            {/* Options */}
            <div className="space-y-3">
              {currentQuestion.opcoes.map((opcao, index) => {
                const isSelected = selectedOption === index;
                const isCorrect = currentQuestion.correta === index;
                const showFeedback = showResult;

                let buttonClass = "w-full p-4 rounded-xl border-2 text-left transition-all ";
                if (!showFeedback) {
                  buttonClass += isSelected 
                    ? "border-blue-500 bg-blue-50 dark:bg-blue-900/30 shadow-md"
                    : "border-slate-300 dark:border-gray-600 hover:border-blue-300 hover:bg-slate-50 dark:hover:bg-gray-700";
                } else {
                  if (isCorrect) {
                    buttonClass += "border-green-500 bg-green-50 dark:bg-green-900/30";
                  } else if (isSelected && !isCorrect) {
                    buttonClass += "border-red-500 bg-red-50 dark:bg-red-900/30";
                  } else {
                    buttonClass += "border-slate-300 dark:border-gray-600 bg-slate-50 dark:bg-gray-800";
                  }
                }

                return (
                  <button
                    key={index}
                    onClick={() => !showResult && setSelectedOption(index)}
                    disabled={showResult}
                    className={buttonClass}
                  >
                    <div className="flex items-start gap-3">
                      {!showFeedback && (
                        <Circle className={`w-5 h-5 mt-0.5 ${isSelected ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400 dark:text-gray-500'}`} />
                      )}
                      {showFeedback && isCorrect && (
                        <CheckCircle2 className="w-5 h-5 mt-0.5 text-green-600 dark:text-green-400" />
                      )}
                      {showFeedback && !isCorrect && isSelected && (
                        <XCircle className="w-5 h-5 mt-0.5 text-red-600 dark:text-red-400" />
                      )}
                      {showFeedback && !isCorrect && !isSelected && (
                        <Circle className="w-5 h-5 mt-0.5 text-slate-400 dark:text-gray-500" />
                      )}
                      <span className="flex-1 text-sm sm:text-base text-slate-800 dark:text-gray-200">{opcao}</span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Explanation */}
            {showResult && (
              <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/30 rounded-xl border-2 border-blue-200 dark:border-blue-700">
                <div className="flex items-start gap-2">
                  <BookOpen className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                  <div className="flex-1">
                    <h3 className="text-sm font-semibold text-blue-900 dark:text-blue-300 mb-1">Explicação:</h3>
                    <p className="text-sm text-slate-700 dark:text-gray-300 leading-relaxed">
                      {currentQuestion.explicacao}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Actions */}
          {!showResult ? (
            <button
              onClick={handleAnswer}
              disabled={selectedOption === null}
              className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-4 rounded-xl shadow-lg disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 transition-all"
            >
              Confirmar Resposta
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 rounded-xl shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <span>
                {currentQuestionIndex + 1 < questionsList.length ? 'Próxima Questão' : 'Finalizar Sessão'}
              </span>
              <ArrowRight className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    );
  }

  // Loading
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-slate-600">Preparando sua sessão...</p>
      </div>
    </div>
  );
}