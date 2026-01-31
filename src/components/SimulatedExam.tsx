/**
 * @file SimulatedExam.tsx (REFATORADO 10/10)
 * @description Componente de Simulado (UI Pura)
 * @pattern Presentation Component - Zero lógica de negócio
 */

import React from 'react';
import { 
  ArrowLeft, Trophy, Target, Play, Loader2, Clock
} from 'lucide-react';
import { useCustomization } from '../context/CustomizationContext';
import { APP_THEMES } from '../lib/themeConfig';
import { getThemeColor, getThemeGradient } from '../lib/themeUtils';
import { useSimulatedExam } from '../hooks/useSimulatedExam';
import { ExamHeader } from './SimulatedExam/ExamHeader';
import { QuestionCard } from './SimulatedExam/QuestionCard';
import { AnswerOptions } from './SimulatedExam/AnswerOptions';
import { ExamFooter } from './SimulatedExam/ExamFooter';

/**
 * Props do SimulatedExam
 */
interface SimulatedExamProps {
  onBack: () => void;
}

/**
 * Componente de Simulado
 * 
 * @component
 * @example
 * ```tsx
 * <SimulatedExam onBack={() => navigate('/dashboard')} />
 * ```
 */
export function SimulatedExam({ onBack }: SimulatedExamProps) {
  // ============================================
  // HOOK (ÚNICA FONTE DE DADOS E LÓGICA)
  // ============================================
  const exam = useSimulatedExam();
  
  // ============================================
  // THEME
  // ============================================
  const { settings } = useCustomization();
  const theme = APP_THEMES[settings.colorTheme] || APP_THEMES.focus;
  const themeColor = getThemeColor(settings.colorTheme);
  const themeGradient = getThemeGradient(settings.colorTheme);

  // ============================================
  // CONFIG VIEW
  // ============================================
  if (exam.examState === 'config') {
    return (
      <div className="h-[100dvh] bg-app flex flex-col">
        {/* Header */}
        <div className="bg-card-theme shadow-sm border-b border-gray-200 dark:border-gray-700 p-4 shrink-0">
          <div className="flex items-center gap-4">
            <button 
              onClick={onBack} 
              className="p-2 -ml-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors"
              aria-label="Voltar"
            >
              <ArrowLeft className="w-6 h-6 text-foreground" />
            </button>
            <h1 className="text-xl font-bold text-foreground">
              Configurar Simulado
            </h1>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 flex flex-col items-center justify-center">
          <div className="w-full max-w-md space-y-8">
            
            {/* Hero Section */}
            <div className="text-center space-y-4">
              <div 
                className="w-20 h-20 rounded-2xl rotate-3 flex items-center justify-center mx-auto shadow-xl"
                style={{ background: themeGradient }}
              >
                <Trophy className="w-10 h-10 text-white -rotate-3" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground">
                  Simulado Inteligente
                </h2>
                <p className="text-muted-foreground mt-2 max-w-xs mx-auto">
                  Modo Offline: Treine com questões selecionadas do banco local.
                </p>
              </div>
            </div>

            {/* Settings */}
            <div className="bg-card rounded-2xl p-6 shadow-sm border border-border space-y-6 px-[21px] py-[47px]">
              
              {/* Question Count */}
              <div className="space-y-3">
                <label className="text-sm font-semibold text-foreground flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Target className="w-4 h-4 text-muted-foreground" />
                    Quantidade de Questões
                  </span>
                  <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
                    {exam.questionCount}
                  </span>
                </label>
                <input
                  type="range"
                  min="10"
                  max="500"
                  step="10"
                  value={exam.questionCount}
                  onChange={(e) => exam.setQuestionCount(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  style={{
                    background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${(exam.questionCount / 500) * 100}%, #e5e7eb ${(exam.questionCount / 500) * 100}%, #e5e7eb 100%)`
                  }}
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>10</span>
                  <span>250</span>
                  <span>500</span>
                </div>
              </div>

              {/* Time Limit */}
              <div className="space-y-3">
                <label className="text-sm font-semibold text-foreground flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    Tempo Limite
                  </span>
                  <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
                    {exam.timeLimit >= 60 ? `${Math.floor(exam.timeLimit / 60)}h ${exam.timeLimit % 60}min` : `${exam.timeLimit}min`}
                  </span>
                </label>
                <input
                  type="range"
                  min="30"
                  max="300"
                  step="15"
                  value={exam.timeLimit}
                  onChange={(e) => exam.setTimeLimit(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  style={{
                    background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${(exam.timeLimit / 300) * 100}%, #e5e7eb ${(exam.timeLimit / 300) * 100}%, #e5e7eb 100%)`
                  }}
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>30min</span>
                  <span>2h 30min</span>
                  <span>5h</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Start Button */}
        <div className="p-6 bg-app shrink-0">
          <button
            onClick={exam.startExam}
            disabled={exam.loading}
            className="w-full max-w-md mx-auto py-4 rounded-xl text-white font-bold text-lg shadow-lg flex items-center justify-center gap-3 disabled:opacity-70 transition-transform active:scale-95"
            style={{ backgroundColor: themeColor }}
          >
            {exam.loading ? (
              <>
                <Loader2 className="w-6 h-6 animate-spin" />
                Preparando...
              </>
            ) : (
              <>
                <Play className="w-6 h-6 fill-current" />
                Iniciar Agora
              </>
            )}
          </button>
        </div>
      </div>
    );
  }

  // ============================================
  // RUNNING VIEW
  // ============================================
  if (exam.examState === 'running' && exam.selectedQuestions.length > 0 && exam.currentQuestion) {
    return (
      <div className="h-[100dvh] bg-app flex flex-col overflow-hidden">
        
        {/* Header */}
        <ExamHeader
          currentQuestionIndex={exam.currentQuestionIndex}
          totalQuestions={exam.selectedQuestions.length}
          timeRemaining={exam.timeRemaining}
          isLowTime={exam.isLowTime}
          progress={exam.progress}
          themeColor={themeColor}
          formatTime={exam.formatTime}
        />

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 w-full max-w-3xl mx-auto flex flex-col">
          <div className="space-y-6 my-auto">
            
            {/* Question Card */}
            <QuestionCard
              question={exam.currentQuestion}
              isFlagged={exam.flaggedQuestions.has(exam.currentQuestionIndex)}
              onToggleFlag={exam.toggleFlag}
            />

            {/* Answer Options */}
            <AnswerOptions
              options={exam.currentQuestion.options}
              selectedAnswer={exam.answers[exam.currentQuestionIndex]}
              onSelectAnswer={exam.selectAnswer}
            />
          </div>
        </div>

        {/* Footer */}
        <ExamFooter
          currentQuestionIndex={exam.currentQuestionIndex}
          totalQuestions={exam.selectedQuestions.length}
          themeColor={themeColor}
          onPrevious={exam.prevQuestion}
          onNext={exam.nextQuestion}
          onFinish={exam.finishExam}
        />
      </div>
    );
  }

  // ============================================
  // FINISHED VIEW
  // ============================================
  if (exam.examState === 'finished') {
    return (
      <div className="min-h-[100dvh] bg-app flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-lg bg-card-theme rounded-2xl p-6 shadow-xl border border-gray-100 dark:border-gray-800 text-center space-y-6">
          
          {/* Icon */}
          <div className="mb-6 inline-flex p-4 rounded-full bg-secondary">
            {exam.isPassed ? (
              <Trophy className="w-12 h-12 text-yellow-500" />
            ) : (
              <Target className="w-12 h-12 text-blue-500" />
            )}
          </div>
          
          {/* Title */}
          <div>
            <h2 className="text-3xl font-bold mb-2">
              {exam.isPassed ? 'Aprovado!' : 'Treino Concluído'}
            </h2>
            <p className="text-muted-foreground">
              Você acertou {exam.score} de {exam.selectedQuestions.length} questões.
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-green-100 dark:bg-green-900/30 p-4 rounded-2xl">
              <div className="text-2xl font-bold text-green-700 dark:text-green-400">
                {exam.accuracy}%
              </div>
              <div className="text-xs text-green-600 dark:text-green-500">
                Aproveitamento
              </div>
            </div>
            <div className="bg-blue-100 dark:bg-blue-900/30 p-4 rounded-2xl">
              <div className="text-2xl font-bold text-blue-700 dark:text-blue-400">
                {exam.score}
              </div>
              <div className="text-xs text-blue-600 dark:text-blue-500">
                Questões Corretas
              </div>
            </div>
          </div>

          {/* Back Button */}
          <div className="pt-4">
            <button
              onClick={onBack}
              className="w-full py-3.5 text-white rounded-xl font-bold shadow-lg hover:brightness-110 active:scale-95 transition-all"
              style={{ backgroundColor: themeColor }}
            >
              VOLTAR AO INÍCIO
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
}

export default SimulatedExam;