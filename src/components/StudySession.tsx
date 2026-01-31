/**
 * @file StudySession.tsx (REFATORADO 10/10)
 * @description Componente de Sessão de Estudos (UI Pura)
 * @pattern Presentation Component - Zero lógica de negócio
 */

import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useStudySession, Difficulty } from '../hooks/useStudySession';
import { QuestionHeader } from './StudySession/QuestionHeader';
import { QuestionMetadata } from './StudySession/QuestionMetadata';
import { AnswerOption } from './StudySession/AnswerOption';
import { Explanation } from './StudySession/Explanation';

/**
 * Props do StudySession
 */
interface StudySessionProps {
  onBack: () => void;
  difficulty: Difficulty;
  subject?: string;
}

/**
 * Componente de Sessão de Estudos
 * 
 * @component
 * @example
 * ```tsx
 * <StudySession 
 *   difficulty="medium"
 *   subject="Matemática"
 *   onBack={() => navigate('/dashboard')}
 * />
 * ```
 */
export function StudySession({ onBack, difficulty, subject }: StudySessionProps) {
  // ============================================
  // HOOK (ÚNICA FONTE DE DADOS E LÓGICA)
  // ============================================
  const session = useStudySession(difficulty, subject, onBack);

  // ============================================
  // LOADING/EMPTY STATES
  // ============================================
  
  // Migrated State (quando não há questões)
  if (session.status === 'migrated') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-indigo-900 dark:to-gray-900 p-6">
        <div className="max-w-2xl mx-auto">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors mb-6"
          >
            <ArrowLeft size={20} />
            <span>Voltar</span>
          </button>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 text-center">
            <div className="text-6xl mb-4">📚</div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Sistema de Questões Migrado
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Este componente foi migrado para usar o banco de dados Supabase.
              <br />
              Por favor, use o <strong>SmartQuizSession</strong> que já está integrado.
            </p>
            <button
              onClick={onBack}
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold transition-colors"
            >
              Voltar ao Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Loading State
  if (session.status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="text-center">
          <p className="text-lg text-gray-900 dark:text-gray-100 mb-2">
            Carregando questões...
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Preparando {session.totalQuestions} questões
          </p>
        </div>
      </div>
    );
  }

  // Questão não carregada
  if (!session.currentQuestion) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <p className="text-lg text-gray-900 dark:text-gray-100">
          Nenhuma questão disponível
        </p>
      </div>
    );
  }

  // ============================================
  // RENDER (UI PURA)
  // ============================================
  return (
    <div className="min-h-screen p-6">
      
      {/* ========================================
          1. HEADER (Progress)
      ======================================== */}
      <header className="flex items-center justify-between mb-6">
        <button
          onClick={onBack}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
          aria-label="Voltar"
        >
          <ArrowLeft className="size-6 text-gray-700 dark:text-gray-300" />
        </button>
        
        <div className="text-center flex-1">
          <p className="text-sm text-foreground">
            Questão {session.currentQuestionIndex + 1} de {session.totalQuestions}
          </p>
          <p className="text-lg text-black font-semibold">
            {session.sessionStats.correct}/{session.sessionStats.total} corretas
            {session.sessionStats.total > 0 && (
              <span className="text-sm text-gray-600 ml-1">
                ({session.sessionStats.accuracy}%)
              </span>
            )}
          </p>
        </div>
      </header>

      {/* ========================================
          2. PROGRESS BAR
      ======================================== */}
      <div className="h-2 bg-white rounded-full mb-6 overflow-hidden border border-black">
        <div 
          className="h-full bg-green-500 transition-all duration-300"
          style={{ width: `${session.progressPercentage}%` }}
        />
      </div>

      {/* ========================================
          3. QUESTION CARD
      ======================================== */}
      <div className="bg-card rounded-2xl p-6 shadow-lg mb-6 border border-border">
        
        {/* Subject & Difficulty Badges */}
        <QuestionHeader
          subject={session.currentQuestion.subject}
          difficulty={session.currentQuestion.difficulty}
          difficultyColor={session.getDifficultyColor(session.currentQuestion.difficulty)}
          isReviewQuestion={session.isReviewQuestion}
        />

        {/* Metadata (Banca, Ano, Concurso) */}
        <QuestionMetadata
          banca={session.currentQuestion.banca}
          ano={session.currentQuestion.ano}
          concurso={session.currentQuestion.concurso}
        />

        {/* Question Text */}
        <h2 className="text-xl mb-6 leading-relaxed text-foreground">
          {session.currentQuestion.question}
        </h2>

        {/* Answer Options */}
        <div className="space-y-3">
          {session.currentQuestion.options.map((option, index) => (
            <AnswerOption
              key={index}
              index={index}
              text={option}
              isSelected={session.selectedAnswer === index}
              isCorrect={index === session.currentQuestion!.correctAnswer}
              showResult={session.showExplanation}
              onSelect={() => session.selectAnswer(index)}
              disabled={session.showExplanation}
            />
          ))}
        </div>

        {/* Explanation (após confirmar) */}
        {session.showExplanation && (
          <Explanation text={session.currentQuestion.explanation} />
        )}
      </div>

      {/* ========================================
          4. ACTION BUTTONS
      ======================================== */}
      <div className="space-y-3">
        {!session.showExplanation ? (
          /* Botão Confirmar */
          <button
            onClick={session.confirmAnswer}
            disabled={session.selectedAnswer === null}
            className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 dark:disabled:bg-gray-700 text-white rounded-xl py-4 transition-colors disabled:cursor-not-allowed font-semibold"
          >
            Confirmar Resposta
          </button>
        ) : (
          /* Botão Próxima/Finalizar */
          <button
            onClick={session.nextQuestion}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white rounded-xl py-4 transition-colors font-semibold"
          >
            {session.isLastQuestion ? 'Finalizar Sessão' : 'Próxima Questão'}
          </button>
        )}
      </div>
    </div>
  );
}

export default StudySession;
