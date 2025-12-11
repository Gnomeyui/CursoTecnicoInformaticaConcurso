import React, { useState, useEffect } from 'react';
import { QUESTIONS, Question } from '../data/questions';
import { 
  selectSmartQuestions, 
  shuffleQuestionOptions, 
  recordAnswer 
} from '../utils/questionManager';
import { 
  Laptop, Shield, Scale, BookOpen, Network, 
  ChevronLeft, CheckCircle2, XCircle, Circle, 
  Award, Zap 
} from 'lucide-react';

interface QuizScreenProps {
  onBack: () => void;
  dailyScore: number;
  onScoreUpdate: (score: number, total: number) => void;
}

export function QuizScreen({ onBack, dailyScore, onScoreUpdate }: QuizScreenProps) {
  const [sessionQuestions, setSessionQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [sessionCorrect, setSessionCorrect] = useState(0);
  const [sessionTotal, setSessionTotal] = useState(0);
  const [usedQuestionIds, setUsedQuestionIds] = useState<Set<number>>(new Set());

  // Inicializar sessão com seleção inteligente de questões
  useEffect(() => {
    loadSessionQuestions();
  }, []);

  const loadSessionQuestions = () => {
    // Configuração padrão: buscar do localStorage ou usar 20
    const settings = localStorage.getItem('alerr_settings');
    const questionsPerSession = settings 
      ? JSON.parse(settings).questionsPerSession || 20
      : 20;

    // Selecionar questões inteligentemente
    const smartSelection = selectSmartQuestions(
      QUESTIONS, 
      questionsPerSession,
      usedQuestionIds
    );

    // Embaralhar as alternativas de cada questão
    const shuffledQuestions = smartSelection.map(q => shuffleQuestionOptions(q));

    setSessionQuestions(shuffledQuestions);
    setCurrentIndex(0);
  };

  const question = sessionQuestions[currentIndex];

  // Loading state
  if (sessionQuestions.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Preparando questões inteligentes...</p>
        </div>
      </div>
    );
  }

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

  const handleAnswer = () => {
    if (selectedOption === null || !question) return;
    
    setShowResult(true);
    const newTotal = sessionTotal + 1;
    setSessionTotal(newTotal);
    
    const wasCorrect = selectedOption === question.correta;
    
    // Registrar resposta no histórico
    recordAnswer(question.id, wasCorrect);
    
    // Marcar questão como usada nesta sessão
    setUsedQuestionIds(prev => new Set([...prev, question.id]));
    
    if (wasCorrect) {
      const newScore = sessionCorrect + 1;
      setSessionCorrect(newScore);
      onScoreUpdate(dailyScore + 1, newTotal);
    } else {
      onScoreUpdate(dailyScore, newTotal);
    }
  };

  const handleNext = () => {
    if (currentIndex < sessionQuestions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedOption(null);
      setShowResult(false);
    } else {
      const accuracy = sessionTotal > 0 ? Math.round((sessionCorrect / sessionTotal) * 100) : 0;
      alert(`🎉 Parabéns! Sessão completa!\n\nAcertos: ${sessionCorrect}/${sessionTotal} (${accuracy}%)\n\nDica: O sistema está aprendendo seus pontos fracos. Questões que você errou voltarão em breve para fixação!`);
      
      // Recarregar nova sessão de questões
      loadSessionQuestions();
      setSelectedOption(null);
      setShowResult(false);
      setSessionCorrect(0);
      setSessionTotal(0);
    }
  };

  const accuracy = sessionTotal > 0 ? Math.round((sessionCorrect / sessionTotal) * 100) : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 pb-safe">
      {/* Header - Mobile Optimized */}
      <div className="bg-white shadow-sm border-b border-slate-200 sticky top-0 z-50">
        <div className="px-3 sm:px-4 py-3">
          <div className="flex items-center justify-between gap-2">
            <button 
              onClick={onBack}
              className="flex items-center gap-1 text-slate-600 hover:text-slate-900 transition-colors active:scale-95 touch-manipulation min-h-[44px]"
            >
              <ChevronLeft className="w-5 h-5" />
              <span className="text-sm">Voltar</span>
            </button>
            
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="text-center">
                <div className="text-[10px] sm:text-xs text-slate-500 uppercase tracking-wide">Hoje</div>
                <div className="text-lg sm:text-xl text-emerald-600">{dailyScore}</div>
              </div>
              
              <div className="text-center">
                <div className="text-[10px] sm:text-xs text-slate-500 uppercase tracking-wide">Precisão</div>
                <div className="text-lg sm:text-xl text-blue-600">{accuracy}%</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content - Mobile First */}
      <div className="px-3 sm:px-4 py-4 sm:py-6 max-w-3xl mx-auto">
        {/* Progress - Mobile Friendly */}
        <div className="mb-4 sm:mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs sm:text-sm text-slate-600">
              Questão {currentIndex + 1} de {sessionQuestions.length}
            </span>
            <span className="text-xs sm:text-sm text-slate-600 font-medium">
              {Math.round(((currentIndex + 1) / sessionQuestions.length) * 100)}%
            </span>
          </div>
          <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / sessionQuestions.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Category Badge - Touch Friendly */}
        <div className={`inline-flex items-center gap-2 px-3 py-2 rounded-full border text-xs sm:text-sm mb-4 ${getColor(question.materia)}`}>
          {getIcon(question.materia)}
          <span className="uppercase tracking-wide">{question.materia}</span>
        </div>

        {/* Question Card - Mobile Optimized */}
        <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 mb-4 sm:mb-6">
          <h2 className="text-base sm:text-lg leading-relaxed text-slate-800">
            {question.pergunta}
          </h2>
        </div>

        {/* Options - Large Touch Targets */}
        <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
          {question.opcoes.map((opcao, index) => {
            let buttonClass = "w-full flex items-start gap-3 p-4 sm:p-5 rounded-xl border-2 transition-all duration-200 bg-white active:scale-[0.98] touch-manipulation min-h-[56px]";
            let iconComponent = <Circle className="w-5 h-5 sm:w-6 sm:h-6 text-slate-300 flex-shrink-0 mt-0.5" />;
            
            if (showResult) {
              if (index === question.correta) {
                buttonClass = "w-full flex items-start gap-3 p-4 sm:p-5 rounded-xl border-2 bg-emerald-500 border-emerald-600 shadow-lg";
                iconComponent = <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-white flex-shrink-0 mt-0.5" />;
              } else if (index === selectedOption) {
                buttonClass = "w-full flex items-start gap-3 p-4 sm:p-5 rounded-xl border-2 bg-red-500 border-red-600 shadow-lg";
                iconComponent = <XCircle className="w-5 h-5 sm:w-6 sm:h-6 text-white flex-shrink-0 mt-0.5" />;
              } else {
                buttonClass = "w-full flex items-start gap-3 p-4 sm:p-5 rounded-xl border-2 border-slate-200 opacity-50";
              }
            } else if (selectedOption === index) {
              buttonClass = "w-full flex items-start gap-3 p-4 sm:p-5 rounded-xl border-2 border-blue-500 bg-blue-50 shadow-md";
              iconComponent = <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 flex-shrink-0 mt-0.5" />;
            }

            const textClass = showResult && (index === question.correta || index === selectedOption) 
              ? "text-white" 
              : "text-slate-700";

            return (
              <button
                key={index}
                onClick={() => !showResult && setSelectedOption(index)}
                className={buttonClass}
                disabled={showResult}
              >
                {iconComponent}
                <span className={`flex-1 text-left text-sm sm:text-base ${textClass}`}>
                  {opcao}
                </span>
              </button>
            );
          })}
        </div>

        {/* Feedback - Mobile Optimized */}
        {showResult && (
          <div className="bg-gradient-to-r from-slate-50 to-slate-100 rounded-2xl p-4 sm:p-6 border-l-4 border-slate-400 mb-20 sm:mb-6">
            <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
              {selectedOption === question.correta ? (
                <>
                  <Award className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600 flex-shrink-0" />
                  <h3 className="text-base sm:text-lg text-emerald-700">Excelente!</h3>
                </>
              ) : (
                <>
                  <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-amber-600 flex-shrink-0" />
                  <h3 className="text-base sm:text-lg text-amber-700">Atenção:</h3>
                </>
              )}
            </div>
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
              {question.explicacao}
            </p>
          </div>
        )}

        {/* Spacer for fixed button */}
        <div className="h-20 sm:h-0" />
      </div>

      {/* Action Button - Fixed Bottom Mobile */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-3 sm:p-4 safe-area-bottom z-40 sm:relative sm:border-0 sm:bg-transparent">
        <div className="max-w-3xl mx-auto">
          <button
            onClick={showResult ? handleNext : handleAnswer}
            disabled={selectedOption === null && !showResult}
            className={`w-full py-4 sm:py-5 rounded-xl text-white font-semibold text-base sm:text-lg shadow-lg transition-all duration-200 touch-manipulation ${
              selectedOption === null && !showResult
                ? 'bg-slate-300 cursor-not-allowed'
                : 'bg-gradient-to-r from-blue-600 to-cyan-600 active:scale-[0.98]'
            }`}
          >
            {showResult 
              ? (currentIndex === sessionQuestions.length - 1 ? 'FINALIZAR' : 'PRÓXIMA QUESTÃO')
              : 'RESPONDER'
            }
          </button>
        </div>
      </div>
    </div>
  );
}