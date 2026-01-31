/**
 * @file Dashboard.tsx (REFATORADO 10/10)
 * @description Componente de Dashboard (UI Pura)
 * @pattern Presentation Component - Zero lógica de negócio
 */

import React from 'react';
import { 
  Trophy, Flame, TrendingUp, Target, 
  Settings as SettingsIcon, ChevronRight, Zap, Calendar
} from 'lucide-react';
import { COPY } from '../utils/copy';
import { GabaritooLogo } from './GabaritooLogo';
import { useDashboard } from '../hooks/useDashboard';

/**
 * Props do Dashboard (apenas callbacks de navegação)
 */
interface DashboardProps {
  onStartQuiz?: () => void;
  onOpenStatistics?: () => void;
  onOpenAchievements?: () => void;
  onOpenCustomization?: () => void;
  onOpenSimulatedExam?: () => void;
  onOpenFlashcards?: () => void;
  onOpenRegimento?: () => void;
  onOpenStudyPlan?: () => void;
  onOpenSettings: () => void;
  onOpenProfiles: () => void;
}

/**
 * Dashboard Principal do App
 * 
 * @component
 * @example
 * ```tsx
 * <Dashboard 
 *   onStartQuiz={() => navigate('/quiz')}
 *   onOpenSettings={() => navigate('/settings')}
 * />
 * ```
 */
export const Dashboard: React.FC<DashboardProps> = ({ 
  onOpenSettings, 
  onOpenProfiles,
  onStartQuiz,
  onOpenStudyPlan,
}) => {
  // ============================================
  // HOOK (ÚNICA FONTE DE DADOS)
  // ============================================
  const dashboard = useDashboard();

  // ============================================
  // RENDER (UI PURA)
  // ============================================
  return (
    <div className="min-h-screen bg-gray-50/50 pb-32 font-sans animate-in fade-in duration-500">
      
      {/* ========================================
          1. TOP BAR
      ======================================== */}
      <header className="px-6 pt-6 pb-2 flex justify-between items-center bg-white sticky top-0 z-20 border-b border-gray-100">
        <button 
          onClick={onOpenProfiles} 
          className="cursor-pointer flex items-center gap-3 hover:opacity-80 transition-opacity"
          aria-label="Selecionar perfil de concurso"
        >
          <GabaritooLogo size="sm" />
          
          <div className="flex-1">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">
              Foco Atual
            </p>
            <div className="flex items-center gap-1 group">
              <h1 className="text-lg font-bold text-gray-800 truncate max-w-[200px]">
                {dashboard.profileName}
              </h1>
              <ChevronRight 
                size={16} 
                className="text-gray-400 group-hover:text-gray-600 transition-colors" 
              />
            </div>
          </div>
        </button>

        <div className="flex items-center gap-2">
          <button 
            onClick={onOpenStudyPlan} 
            className="p-2.5 bg-gray-50 rounded-full hover:bg-gray-100 transition-all text-gray-500 hover:text-gray-700"
            aria-label="Plano de estudos"
          >
            <Calendar size={20} />
          </button>
          <button 
            onClick={onOpenSettings} 
            className="p-2.5 bg-gray-50 rounded-full hover:bg-gray-100 transition-all text-gray-500 hover:text-gray-700"
            aria-label="Configurações"
          >
            <SettingsIcon size={20} />
          </button>
        </div>
      </header>

      {/* ========================================
          2. MAIN CONTENT
      ======================================== */}
      <main className="px-6 space-y-6 mt-6">

        {/* ========================================
            2.1. CTA PRINCIPAL - Começar Quiz
        ======================================== */}
        <button 
          onClick={onStartQuiz}
          className="w-full group relative overflow-hidden rounded-3xl p-6 text-left shadow-lg hover:shadow-xl transition-all duration-300 transform active:scale-[0.98]"
          style={{ background: dashboard.themeGradient }}
          aria-label="Começar quiz"
        >
          {/* Background Icon */}
          <div className="absolute top-0 right-0 p-4 opacity-10 transform group-hover:scale-110 transition-transform duration-500">
            <Zap size={140} fill="currentColor" className="text-white" />
          </div>
          
          {/* Content */}
          <div className="relative z-10 flex flex-col h-full justify-between min-h-[120px]">
            <div>
              {/* Streak Badge */}
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold text-white mb-3 border border-white/10">
                <Flame size={12} fill="currentColor" /> 
                {dashboard.currentStreak} dias
              </span>

              {/* Title */}
              <h2 className="text-3xl font-bold text-white mb-1">
                {COPY.home.title}
              </h2>

              {/* Motivational Text */}
              <p className="text-sm text-white/90 max-w-[85%]">
                {dashboard.motivationalText}
              </p>
            </div>
            
            {/* Button */}
            <div className="flex items-center gap-2 mt-4 font-bold text-white bg-white/10 w-fit px-4 py-2 rounded-xl backdrop-blur-sm">
              <span>{COPY.home.mainButton}</span>
              <ChevronRight size={16} />
            </div>
          </div>
        </button>

        {/* ========================================
            2.2. STATS CARDS
        ======================================== */}
        <div className="grid grid-cols-2 gap-4">
          
          {/* Nível Card */}
          <article className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100 relative overflow-hidden">
            <div 
              className="absolute -right-4 -bottom-4 opacity-10" 
              style={{ color: dashboard.themeColor }}
            >
              <Trophy size={80} />
            </div>
            
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wide">
              Nível {dashboard.level}
            </p>
            
            <div className="mt-2 mb-3">
              <span className="text-3xl font-bold text-gray-800">
                {dashboard.xp}
              </span>
              <span className="text-xs text-gray-400 font-medium ml-1">
                XP
              </span>
            </div>
            
            {/* Progress Bar */}
            <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
              <div 
                className="h-full rounded-full transition-all duration-500" 
                style={{ 
                  width: `${dashboard.levelProgress}%`,
                  backgroundColor: dashboard.themeColor 
                }}
              />
            </div>
          </article>

          {/* Precisão Card */}
          <article className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100 relative overflow-hidden">
            <div 
              className="absolute -right-4 -bottom-4 opacity-10" 
              style={{ color: dashboard.themeColor }}
            >
              <Target size={80} />
            </div>
            
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wide">
              Precisão
            </p>
            
            <div className="mt-2 flex items-baseline gap-1">
              <span className="text-3xl font-bold text-gray-800">
                {dashboard.overallAccuracy}%
              </span>
            </div>
            
            <div className="mt-3 flex items-center gap-1 text-[10px] text-green-600 bg-green-50 px-2 py-1 rounded-md w-fit font-bold">
              <TrendingUp size={10} />
              <span>GERAL</span>
            </div>
          </article>
        </div>

        {/* ========================================
            2.3. SUBJECT STATS / EMPTY STATE
        ======================================== */}
        <section className="pt-2">
          <h3 className="font-bold text-gray-800 mb-4 px-1 text-lg">
            {dashboard.hasStats ? 'Seu Progresso' : 'Suas Matérias'}
          </h3>

          {dashboard.hasStats ? (
            /* Lista de Matérias */
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 divide-y divide-gray-50">
              {dashboard.subjectStats.map((subj, index) => (
                <div 
                  key={`${subj.subject}-${index}`} 
                  className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <span className="text-sm font-bold text-gray-800">
                    {subj.subject}
                  </span>
                  <span className="text-xs font-bold">
                    {subj.accuracy}%
                  </span>
                </div>
              ))}
            </div>
          ) : (
            /* Empty State */
            <div 
              className="p-6 rounded-2xl border border-gray-100" 
              style={{ backgroundColor: dashboard.bgLightHex }}
            >
              <div className="flex items-start gap-3">
                <TrendingUp size={20} style={{ color: dashboard.themeColor }} />
                <div>
                  <p className="text-sm font-bold text-gray-800 mb-1">
                    Comece a estudar!
                  </p>
                  <p className="text-xs text-gray-600">
                    Responda questões para acompanhar seu progresso por matéria. 
                    Veja suas estatísticas completas na aba Stats.
                  </p>
                </div>
              </div>
            </div>
          )}
        </section>

      </main>

      {/* ========================================
          3. BOTTOM NAV (mantido do original)
      ======================================== */}
      <div className="fixed bottom-6 left-0 w-full px-6 flex justify-center z-30 pointer-events-none">
        <nav className="bg-white/90 backdrop-blur-lg border border-gray-200 p-1.5 rounded-2xl shadow-2xl flex items-center gap-1 pointer-events-auto w-full max-w-[400px] justify-between">
          <button 
            onClick={onStartQuiz} 
            className="flex-1 flex flex-col items-center justify-center py-2.5 rounded-xl shadow-sm transition-all"
            style={{ 
              backgroundColor: dashboard.bgLightHex,
              color: dashboard.themeColor 
            }}
            aria-label="Quiz"
          >
            <Zap size={20} fill="currentColor" />
            <span className="text-[10px] font-bold mt-0.5">Quiz</span>
          </button>
        </nav>
      </div>
    </div>
  );
};

export default Dashboard;
