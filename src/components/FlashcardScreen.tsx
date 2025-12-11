import React, { useState, useEffect } from 'react';
import { FLASHCARDS, Flashcard } from '../data/flashcards';
import { 
  ChevronLeft, RotateCw, BookOpen, Trophy, 
  ThumbsUp, ThumbsDown, Zap, ArrowRight, Scale
} from 'lucide-react';

interface FlashcardScreenProps {
  onBack: () => void;
  dailyScore: number;
  onScoreUpdate: (score: number, total: number) => void;
}

export function FlashcardScreen({ onBack, dailyScore, onScoreUpdate }: FlashcardScreenProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [sessionCorrect, setSessionCorrect] = useState(0);
  const [sessionTotal, setSessionTotal] = useState(0);
  const [reviewedCards, setReviewedCards] = useState<Set<number>>(new Set());

  const currentCard = FLASHCARDS[currentIndex];

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleAnswer = (wasCorrect: boolean) => {
    if (!isFlipped) {
      alert('Vire o card primeiro para ver a resposta!');
      return;
    }

    const newTotal = sessionTotal + 1;
    setSessionTotal(newTotal);
    
    if (wasCorrect) {
      const newScore = sessionCorrect + 1;
      setSessionCorrect(newScore);
      onScoreUpdate(dailyScore + 1, newTotal);
    } else {
      onScoreUpdate(dailyScore, newTotal);
    }

    // Marcar como revisado
    setReviewedCards(prev => new Set([...prev, currentCard.id]));

    // Próximo card
    if (currentIndex < FLASHCARDS.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setIsFlipped(false);
    } else {
      alert(`🎉 Parabéns! Você revisou todos os ${FLASHCARDS.length} flashcards!\n\nAcertos: ${sessionCorrect + (wasCorrect ? 1 : 0)}/${newTotal}`);
      setCurrentIndex(0);
      setIsFlipped(false);
      setSessionCorrect(0);
      setSessionTotal(0);
      setReviewedCards(new Set());
    }
  };

  const getDifficultyColor = (dificuldade: string) => {
    if (dificuldade === 'Fácil') return 'bg-green-100 text-green-700 border-green-300';
    if (dificuldade === 'Média') return 'bg-amber-100 text-amber-700 border-amber-300';
    return 'bg-red-100 text-red-700 border-red-300';
  };

  const accuracy = sessionTotal > 0 ? Math.round((sessionCorrect / sessionTotal) * 100) : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 pb-safe">
      {/* Header */}
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
                <div className="text-lg sm:text-xl text-purple-600">{accuracy}%</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-3 sm:px-4 py-4 sm:py-6 max-w-3xl mx-auto">
        {/* Progress */}
        <div className="mb-4 sm:mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs sm:text-sm text-slate-600">
              Card {currentIndex + 1} de {FLASHCARDS.length}
            </span>
            <span className="text-xs sm:text-sm text-slate-600 font-medium">
              {Math.round(((currentIndex + 1) / FLASHCARDS.length) * 100)}%
            </span>
          </div>
          <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / FLASHCARDS.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Topic Badge */}
        <div className="flex items-center gap-2 mb-4">
          <div className="inline-flex items-center gap-2 px-3 py-2 rounded-full border-2 text-xs sm:text-sm bg-indigo-50 text-indigo-700 border-indigo-200">
            <Scale className="w-4 h-4" />
            <span className="uppercase tracking-wide">{currentCard.topico}</span>
          </div>
          <div className={`inline-flex items-center px-3 py-2 rounded-full border text-xs sm:text-sm ${getDifficultyColor(currentCard.dificuldade)}`}>
            {currentCard.dificuldade}
          </div>
        </div>

        {/* Flashcard with 3D Flip Effect */}
        <div className="perspective-1000 mb-6 sm:mb-8">
          <div 
            className={`relative w-full transition-all duration-500 transform-style-3d cursor-pointer ${isFlipped ? 'rotate-y-180' : ''}`}
            onClick={handleFlip}
            style={{ 
              transformStyle: 'preserve-3d',
              minHeight: '320px',
              perspective: '1000px'
            }}
          >
            {/* Frente do Card */}
            <div 
              className={`absolute w-full backface-hidden ${isFlipped ? 'invisible' : 'visible'}`}
              style={{ backfaceVisibility: 'hidden' }}
            >
              <div className="bg-gradient-to-br from-purple-500 to-indigo-600 rounded-3xl shadow-2xl p-6 sm:p-8 min-h-[320px] flex flex-col items-center justify-center text-white">
                <BookOpen className="w-12 h-12 sm:w-16 sm:h-16 mb-4 sm:mb-6 opacity-80" />
                <h2 className="text-lg sm:text-xl text-center leading-relaxed mb-6">
                  {currentCard.frente}
                </h2>
                <div className="flex items-center gap-2 text-sm sm:text-base text-purple-100 mt-auto">
                  <RotateCw className="w-4 h-4 animate-spin-slow" />
                  <span>Toque para revelar a resposta</span>
                </div>
              </div>
            </div>

            {/* Verso do Card */}
            <div 
              className={`absolute w-full ${isFlipped ? 'visible' : 'invisible'}`}
              style={{ 
                backfaceVisibility: 'hidden',
                transform: 'rotateY(180deg)'
              }}
            >
              <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl shadow-2xl p-6 sm:p-8 min-h-[320px] flex flex-col items-center justify-center text-white">
                <Trophy className="w-12 h-12 sm:w-16 sm:h-16 mb-4 sm:mb-6 opacity-80" />
                <div className="text-center">
                  <p className="text-base sm:text-lg leading-relaxed mb-4">
                    {currentCard.verso}
                  </p>
                  <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full text-xs sm:text-sm">
                    <Zap className="w-4 h-4" />
                    <span>Você sabia?</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Info Card */}
        {!isFlipped && (
          <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl p-4 sm:p-5 border-2 border-purple-200 mb-20 sm:mb-6">
            <div className="flex items-start gap-3">
              <BookOpen className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm sm:text-base text-purple-900 font-semibold mb-1">
                  Como usar os Flashcards:
                </h3>
                <p className="text-xs sm:text-sm text-purple-700 leading-relaxed">
                  1. Leia a pergunta com atenção<br/>
                  2. Tente lembrar a resposta<br/>
                  3. Toque no card para revelar<br/>
                  4. Seja honesto: você sabia ou não?
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        {isFlipped && (
          <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-lg border-2 border-slate-200 mb-20 sm:mb-6">
            <h3 className="text-base sm:text-lg text-center text-slate-900 mb-4">
              Você acertou?
            </h3>
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <button
                onClick={() => handleAnswer(false)}
                className="flex flex-col items-center gap-2 p-4 sm:p-5 rounded-xl bg-red-50 border-2 border-red-200 text-red-700 hover:bg-red-100 active:scale-95 transition-all touch-manipulation"
              >
                <ThumbsDown className="w-6 h-6 sm:w-7 sm:h-7" />
                <span className="text-sm sm:text-base font-semibold">Errei</span>
              </button>
              
              <button
                onClick={() => handleAnswer(true)}
                className="flex flex-col items-center gap-2 p-4 sm:p-5 rounded-xl bg-green-50 border-2 border-green-200 text-green-700 hover:bg-green-100 active:scale-95 transition-all touch-manipulation"
              >
                <ThumbsUp className="w-6 h-6 sm:w-7 sm:h-7" />
                <span className="text-sm sm:text-base font-semibold">Acertei</span>
              </button>
            </div>
          </div>
        )}

        {/* Spacer for mobile */}
        <div className="h-20 sm:h-0" />
      </div>

      {/* Fixed Bottom Button - Only when not flipped */}
      {!isFlipped && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-3 sm:p-4 safe-area-bottom z-40 sm:relative sm:border-0 sm:bg-transparent">
          <div className="max-w-3xl mx-auto">
            <button
              onClick={handleFlip}
              className="w-full py-4 sm:py-5 rounded-xl text-white font-semibold text-base sm:text-lg shadow-lg transition-all duration-200 touch-manipulation bg-gradient-to-r from-purple-600 to-pink-600 active:scale-[0.98] flex items-center justify-center gap-2"
            >
              <RotateCw className="w-5 h-5" />
              REVELAR RESPOSTA
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
