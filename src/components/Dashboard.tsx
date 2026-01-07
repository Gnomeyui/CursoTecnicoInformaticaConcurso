import React from 'react';
import { Trophy, Target, TrendingUp, Settings, Award, BarChart3, Clock, CreditCard, BookOpen, User, ChevronRight, Zap, Flame, AlertTriangle } from 'lucide-react';
import { useGame } from '../context/GameContext';
import { useStats } from '../context/StatsContext';
import { useConcursoProfile } from '../context/ConcursoProfileContext';
import { useCustomization } from '../context/CustomizationContext';

// 🎨 MAPA DE ESTILOS DINÂMICOS - Versão Bento Grid
const THEME_STYLES: Record<string, {
  gradient: string;
  button: string;
  lightText: string;
  iconBg: string;
  iconColor: string;
  progressBar: string;
  ring: string;
}> = {
  default: {
    gradient: 'from-blue-600 to-indigo-600',
    button: 'bg-blue-600 hover:bg-blue-700',
    lightText: 'text-blue-50',
    iconBg: 'bg-blue-50 dark:bg-blue-900/30',
    iconColor: 'text-blue-600 dark:text-blue-400',
    progressBar: 'stroke-blue-600 dark:stroke-blue-400',
    ring: 'ring-blue-100'
  },
  blue: {
    gradient: 'from-blue-600 to-indigo-600',
    button: 'bg-blue-600 hover:bg-blue-700',
    lightText: 'text-blue-50',
    iconBg: 'bg-blue-50 dark:bg-blue-900/30',
    iconColor: 'text-blue-600 dark:text-blue-400',
    progressBar: 'stroke-blue-600 dark:stroke-blue-400',
    ring: 'ring-blue-100'
  },
  green: {
    gradient: 'from-emerald-500 to-teal-600',
    button: 'bg-emerald-600 hover:bg-emerald-700',
    lightText: 'text-emerald-50',
    iconBg: 'bg-emerald-50 dark:bg-emerald-900/30',
    iconColor: 'text-emerald-600 dark:text-emerald-400',
    progressBar: 'stroke-emerald-600 dark:stroke-emerald-400',
    ring: 'ring-emerald-100'
  },
  purple: {
    gradient: 'from-violet-600 to-fuchsia-600',
    button: 'bg-violet-600 hover:bg-violet-700',
    lightText: 'text-violet-50',
    iconBg: 'bg-violet-50 dark:bg-violet-900/30',
    iconColor: 'text-violet-600 dark:text-violet-400',
    progressBar: 'stroke-violet-600 dark:stroke-violet-400',
    ring: 'ring-violet-100'
  },
  orange: {
    gradient: 'from-orange-500 to-red-500',
    button: 'bg-orange-600 hover:bg-orange-700',
    lightText: 'text-orange-50',
    iconBg: 'bg-orange-50 dark:bg-orange-900/30',
    iconColor: 'text-orange-600 dark:text-orange-400',
    progressBar: 'stroke-orange-600 dark:stroke-orange-400',
    ring: 'ring-orange-100'
  }
};

interface DashboardProps {
  dailyScore: number;
  totalQuestions: number;
  onStartQuiz: () => void;
  onOpenStatistics: () => void;
  onOpenAchievements: () => void;
  onOpenCustomization: () => void;
  onOpenSimulatedExam?: () => void;
  onOpenFlashcards?: () => void;
  onOpenRegimento?: () => void;
  onOpenSettings?: () => void;
  onOpenProfiles?: () => void;
}

export function Dashboard({
  dailyScore,
  totalQuestions,
  onStartQuiz,
  onOpenStatistics,
  onOpenAchievements,
  onOpenCustomization,
  onOpenSimulatedExam,
  onOpenFlashcards,
  onOpenRegimento,
  onOpenSettings,
  onOpenProfiles,
}: DashboardProps) {
  const { xp, level, getLevelProgress, streak } = useGame();
  const { detailedStats, getTodayStats } = useStats();
  const { activeProfile } = useConcursoProfile();
  const { settings } = useCustomization();
  
  // Seleciona o estilo atual baseado no tema escolhido
  const currentTheme = THEME_STYLES[settings.colorTheme] || THEME_STYLES.default;
  
  const progressPercentage = getLevelProgress();
  
  // Pegar dados reais de hoje
  const todayStats = getTodayStats();
  const todayQuestionsAnswered = todayStats.questionsAnswered;
  const todayCorrectAnswers = todayStats.correctAnswers;
  const todayAccuracy = todayQuestionsAnswered > 0 
    ? (todayCorrectAnswers / todayQuestionsAnswered) * 100 
    : 0;

  // Dados de matérias (mock - depois pode vir do backend)
  const subjects = [
    { name: 'Português', progress: 45, total: 120 },
    { name: 'Direito Administrativo', progress: 70, total: 80 },
    { name: 'Informática', progress: 30, total: 50 },
    { name: 'Raciocínio Lógico', progress: 15, total: 40 },
  ];

  // Número de questões críticas (mock)
  const criticalQuestions = 0; // Depois pegar do backend

  return (
    <div className="min-h-screen bg-gray-50/50 dark:bg-gray-950 pb-32 font-sans animate-in fade-in duration-500">
      
      {/* 1. TOP BAR SIMPLIFICADA */}
      <div className="px-6 pt-6 pb-2 flex justify-between items-center bg-white dark:bg-gray-900 sticky top-0 z-20 border-b border-gray-100 dark:border-gray-800">
        <div onClick={onOpenProfiles} className="cursor-pointer">
          <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-0.5">Estudando para</p>
          <div className="flex items-center gap-1 group">
            <h1 className="text-lg font-bold text-gray-800 dark:text-white truncate max-w-[200px]">
              {activeProfile ? activeProfile.nome : 'Selecionar Cargo'}
            </h1>
            <ChevronRight size={16} className="text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors" />
          </div>
        </div>
        
        <button 
          onClick={onOpenCustomization}
          className="p-2.5 bg-gray-50 dark:bg-gray-800 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-all text-gray-500"
        >
          <Settings size={20} />
        </button>
      </div>

      <main className="px-6 space-y-6 mt-6">

        {/* 2. HERO CARD (AÇÃO PRINCIPAL) - Botão de estudar em destaque */}
        <button 
          onClick={onStartQuiz}
          className={`w-full group relative overflow-hidden rounded-3xl bg-gradient-to-br ${currentTheme.gradient} p-6 text-left shadow-lg hover:shadow-xl transition-all duration-300 transform active:scale-[0.98]`}
        >
          <div className="absolute top-0 right-0 p-4 opacity-10 transform group-hover:scale-110 transition-transform duration-500">
            <Zap size={140} fill="currentColor" className={currentTheme.lightText} />
          </div>
          
          <div className="relative z-10 flex flex-col h-full justify-between min-h-[140px]">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold text-white mb-3 border border-white/10">
                <Flame size={12} fill="currentColor" /> {streak || 0} dias de ofensiva
              </span>
              <h2 className="text-3xl font-bold text-white mb-1">Quiz Inteligente</h2>
              <p className={`text-sm ${currentTheme.lightText} max-w-[80%]`}>
                O algoritmo seleciona questões focadas nas suas necessidades.
              </p>
            </div>
            
            <div className="flex items-center gap-2 mt-4 font-bold text-white">
              <span>Começar agora</span>
              <div className="bg-white/20 rounded-full p-1">
                <ChevronRight size={16} />
              </div>
            </div>
          </div>
        </button>

        {/* 3. BENTO GRID DE ESTATÍSTICAS */}
        <div className="grid grid-cols-2 gap-4">
          
          {/* Card de Nível */}
          <div className="bg-white dark:bg-gray-900 p-5 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 relative overflow-hidden">
            <div className={`absolute -right-4 -bottom-4 opacity-5 ${currentTheme.iconColor}`}>
              <Trophy size={80} />
            </div>
            <p className="text-xs font-medium text-gray-400 uppercase">Nível {level}</p>
            <div className="mt-2 mb-3">
              <span className="text-3xl font-bold text-gray-800 dark:text-white">{xp}</span>
              <span className="text-xs text-gray-400 font-medium ml-1">xp</span>
            </div>
            {/* Mini Progress Bar */}
            <div className="w-full bg-gray-100 dark:bg-gray-800 h-1.5 rounded-full overflow-hidden">
              <div 
                className={`h-full rounded-full ${currentTheme.iconColor.replace('text-', 'bg-')}`}
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>

          {/* Card de Precisão */}
          <div className="bg-white dark:bg-gray-900 p-5 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 relative overflow-hidden">
            <div className={`absolute -right-4 -bottom-4 opacity-5 ${currentTheme.iconColor}`}>
              <Target size={80} />
            </div>
            <p className="text-xs font-medium text-gray-400 uppercase">Precisão Global</p>
            <div className="mt-2 flex items-baseline gap-1">
              <span className="text-3xl font-bold text-gray-800 dark:text-white">{Math.round(todayAccuracy)}%</span>
            </div>
            <div className="mt-3 flex items-center gap-1.5 text-xs text-green-600 bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded-md w-fit">
              <TrendingUp size={12} />
              <span className="font-bold">Hoje</span>
            </div>
          </div>
        </div>

        {/* 4. ALERTA DE REVISÃO (Só aparece se necessário) */}
        {criticalQuestions > 0 && (
          <div className="bg-white dark:bg-gray-900 rounded-3xl p-1 shadow-sm border border-red-100 dark:border-red-900/30">
            <div className="bg-red-50 dark:bg-red-900/10 rounded-[20px] p-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="bg-red-100 dark:bg-red-800 p-3 rounded-full text-red-600 dark:text-red-200 shrink-0">
                  <AlertTriangle size={20} fill="currentColor" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 dark:text-white text-sm">Atenção Necessária</h3>
                  <p className="text-xs text-red-600 dark:text-red-400 font-medium">
                    {criticalQuestions} questões na UTI
                  </p>
                </div>
              </div>
              <button 
                onClick={() => {/* Navegar para UTI */}}
                className="px-4 py-2 bg-red-600 text-white text-xs font-bold rounded-xl shadow-md hover:bg-red-700 transition active:scale-95"
              >
                Revisar
              </button>
            </div>
          </div>
        )}

        {/* 5. LISTA DE MATÉRIAS (MINIMALISTA) */}
        <div>
          <div className="flex items-center justify-between mb-4 px-1">
            <h3 className="font-bold text-gray-800 dark:text-white text-lg">Seu Progresso</h3>
            <button 
              onClick={onOpenStatistics}
              className="text-xs font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 px-2 py-1 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
            >
              Ver Detalhes
            </button>
          </div>
          
          <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 divide-y divide-gray-50 dark:divide-gray-800">
            {subjects.map((subj, index) => (
              <div key={index} className="p-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors first:rounded-t-3xl last:rounded-b-3xl cursor-pointer">
                <div className="flex items-center gap-4">
                  {/* Circular Progress */}
                  <div className="relative size-10 flex items-center justify-center shrink-0">
                    <svg className="size-full -rotate-90" viewBox="0 0 36 36">
                      <path 
                        className="text-gray-100 dark:text-gray-800" 
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="4" 
                      />
                      <path 
                        className={currentTheme.progressBar}
                        strokeDasharray={`${subj.progress}, 100`} 
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="4" 
                      />
                    </svg>
                    <span className="absolute text-[10px] font-bold text-gray-600 dark:text-gray-300">{subj.progress}%</span>
                  </div>
                  
                  <div>
                    <p className="text-sm font-bold text-gray-800 dark:text-white leading-tight">{subj.name}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{subj.total} questões</p>
                  </div>
                </div>
                <ChevronRight size={16} className="text-gray-300 dark:text-gray-600" />
              </div>
            ))}
          </div>
        </div>

        {/* 6. QUICK ACCESS CARDS */}
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={onOpenSimulatedExam}
            className="bg-white dark:bg-gray-900 border-2 border-gray-100 dark:border-gray-800 rounded-2xl p-4 hover:border-purple-200 dark:hover:border-purple-900/30 transition-all active:scale-95 text-left"
          >
            <Clock className="size-6 text-purple-500 mb-2" />
            <p className="font-bold text-gray-900 dark:text-gray-100 text-sm">Simulado</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Modo prova</p>
          </button>
          
          <button
            onClick={onOpenAchievements}
            className="bg-white dark:bg-gray-900 border-2 border-gray-100 dark:border-gray-800 rounded-2xl p-4 hover:border-yellow-200 dark:hover:border-yellow-900/30 transition-all active:scale-95 text-left"
          >
            <Trophy className="size-6 text-yellow-500 mb-2" />
            <p className="font-bold text-gray-900 dark:text-gray-100 text-sm">Conquistas</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{detailedStats?.badges?.length || 0} badges</p>
          </button>
        </div>

      </main>

      {/* 7. BOTTOM NAVIGATION (FLUTUANTE ESTILO ILHA) */}
      <div className="fixed bottom-6 left-0 w-full px-6 flex justify-center z-30 pointer-events-none">
        <nav className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 p-2 rounded-2xl shadow-xl flex items-center gap-1 pointer-events-auto max-w-sm w-full justify-between">
          <button 
            onClick={onStartQuiz}
            className={`flex-1 flex flex-col items-center justify-center py-2 rounded-xl ${currentTheme.iconBg} ${currentTheme.iconColor} transition-all`}
          >
            <BookOpen size={20} strokeWidth={2.5} className="mb-0.5" />
            <span className="text-[10px] font-bold">Estudar</span>
          </button>
          
          <button 
            onClick={onOpenSimulatedExam}
            className="flex-1 flex flex-col items-center justify-center py-2 rounded-xl text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all"
          >
            <Target size={20} strokeWidth={2.5} className="mb-0.5" />
            <span className="text-[10px] font-medium">Simulados</span>
          </button>
          
          <button 
            onClick={onOpenStatistics}
            className="flex-1 flex flex-col items-center justify-center py-2 rounded-xl text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all"
          >
            <BarChart3 size={20} strokeWidth={2.5} className="mb-0.5" />
            <span className="text-[10px] font-medium">Stats</span>
          </button>
        </nav>
      </div>

    </div>
  );
}