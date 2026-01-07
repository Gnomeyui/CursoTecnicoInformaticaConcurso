import React, { useState, useEffect } from 'react';
import { 
  AlertTriangle, 
  Trophy, 
  Flame, 
  TrendingUp, 
  Target,
  BookOpen,
  Settings as SettingsIcon,
  ChevronRight,
  Zap,
  CalendarClock
} from 'lucide-react';
import { useCustomization } from '../context/CustomizationContext';
import { useConcursoProfile } from '../context/ConcursoProfileContext';
import { useGame } from '../context/GameContext';
import { useStats } from '../context/StatsContext';

// --- CONFIGURAÇÃO DE TEMAS "PIXEL PERFECT" ---
const THEME_STYLES: Record<string, {
  gradient: string;
  button: string;
  lightText: string;
  iconBg: string;
  iconColor: string;
  progressBar: string;
  borderColor: string;
  highlight: string;
}> = {
  blue: {
    // Light: Vibrante | Dark: Profundo e Rico
    gradient: 'from-blue-600 to-indigo-600 dark:from-blue-700 dark:to-indigo-900',
    button: 'bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500',
    lightText: 'text-blue-50 dark:text-blue-100',
    iconBg: 'bg-blue-50 dark:bg-blue-500/20', // Transparência no escuro = Elegância
    iconColor: 'text-blue-600 dark:text-blue-400',
    progressBar: 'bg-blue-600 dark:bg-blue-500',
    borderColor: 'border-blue-100 dark:border-blue-800/30',
    highlight: 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
  },
  green: {
    gradient: 'from-emerald-500 to-teal-600 dark:from-emerald-700 dark:to-teal-900',
    button: 'bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-600 dark:hover:bg-emerald-500',
    lightText: 'text-emerald-50 dark:text-emerald-100',
    iconBg: 'bg-emerald-50 dark:bg-emerald-500/20',
    iconColor: 'text-emerald-600 dark:text-emerald-400',
    progressBar: 'bg-emerald-600 dark:bg-emerald-500',
    borderColor: 'border-emerald-100 dark:border-emerald-800/30',
    highlight: 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300'
  },
  purple: {
    gradient: 'from-violet-600 to-fuchsia-600 dark:from-violet-800 dark:to-fuchsia-900',
    button: 'bg-violet-600 hover:bg-violet-700 dark:bg-violet-600 dark:hover:bg-violet-500',
    lightText: 'text-violet-50 dark:text-violet-100',
    iconBg: 'bg-violet-50 dark:bg-violet-500/20',
    iconColor: 'text-violet-600 dark:text-violet-400',
    progressBar: 'bg-violet-600 dark:bg-violet-500',
    borderColor: 'border-violet-100 dark:border-violet-800/30',
    highlight: 'bg-violet-50 dark:bg-violet-900/20 text-violet-700 dark:text-violet-300'
  },
  orange: {
    gradient: 'from-orange-500 to-red-500 dark:from-orange-700 dark:to-red-900',
    button: 'bg-orange-600 hover:bg-orange-700 dark:bg-orange-600 dark:hover:bg-orange-500',
    lightText: 'text-orange-50 dark:text-orange-100',
    iconBg: 'bg-orange-50 dark:bg-orange-500/20',
    iconColor: 'text-orange-600 dark:text-orange-400',
    progressBar: 'bg-orange-600 dark:bg-orange-500',
    borderColor: 'border-orange-100 dark:border-orange-800/30',
    highlight: 'bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-300'
  },
  default: {
    gradient: 'from-blue-600 to-indigo-600 dark:from-blue-700 dark:to-indigo-900',
    button: 'bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500',
    lightText: 'text-blue-50 dark:text-blue-100',
    iconBg: 'bg-blue-50 dark:bg-blue-500/20',
    iconColor: 'text-blue-600 dark:text-blue-400',
    progressBar: 'bg-blue-600 dark:bg-blue-500',
    borderColor: 'border-blue-100 dark:border-blue-800/30',
    highlight: 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
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
  onOpenStudyPlan?: () => void;
}

export function Dashboard({
  onStartQuiz,
  onOpenStatistics,
  onOpenAchievements,
  onOpenCustomization,
  onOpenSimulatedExam,
  onOpenFlashcards,
  onOpenSettings,
  onOpenProfiles,
  onOpenStudyPlan
}: DashboardProps) {
  const { settings } = useCustomization();
  const { activeProfile } = useConcursoProfile();
  const { xp, level } = useGame();
  const { getTodayStats, detailedStats } = useStats();
  
  const theme = THEME_STYLES[settings.colorTheme] || THEME_STYLES['blue'];

  const [stats, setStats] = useState({
    xp: 0,
    level: 1,
    streak: 0,
    criticalQuestions: 0,
    masteredQuestions: 0,
    accuracy: 0
  });

  const [subjects, setSubjects] = useState<any[]>([]);

  useEffect(() => {
    // Carregar stats do dia
    const todayStats = getTodayStats();

    setStats({
      xp: xp || 0,
      level: level || 1,
      streak: detailedStats.currentStreak || 0,
      criticalQuestions: 0, // TODO: Buscar questões críticas
      masteredQuestions: 42,
      accuracy: todayStats.correctAnswers > 0 
        ? Math.round((todayStats.correctAnswers / todayStats.questionsAnswered) * 100) 
        : 0
    });
    
    // Mapear subjects para o formato esperado
    const formattedSubjects = detailedStats.subjectStats.map((subjectData) => ({
      name: subjectData.subject,
      progress: Math.round(subjectData.accuracy || 0),
      total: subjectData.questionsAnswered || 0
    }));

    setSubjects(formattedSubjects.length > 0 ? formattedSubjects : [
      { name: 'Português', progress: 45, total: 120 },
      { name: 'Direito Adm.', progress: 70, total: 80 },
      { name: 'Informática', progress: 30, total: 50 },
    ]);
  }, [xp, level, getTodayStats, detailedStats]);

  return (
    <div className="min-h-screen bg-background pb-32 font-sans animate-in fade-in duration-500">
      
      {/* 1. TOP BAR (Fixo e Limpo) */}
      <div className="px-6 pt-6 pb-4 flex justify-between items-center bg-background/80 backdrop-blur-md sticky top-0 z-20 border-b border-border">
        <div onClick={onOpenProfiles} className="cursor-pointer group">
          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-0.5">Foco Atual</p>
          <div className="flex items-center gap-1">
            <h1 className="text-xl font-extrabold text-foreground truncate max-w-[200px]">
              {activeProfile ? activeProfile.nome : 'Selecionar'}
            </h1>
            <ChevronRight size={18} className="text-muted-foreground group-hover:text-primary transition-colors" />
          </div>
        </div>
        
        <div className="flex gap-3">
          {onOpenStudyPlan && (
            <button 
              onClick={onOpenStudyPlan}
              className={`p-2.5 rounded-full ${theme.iconBg} ${theme.iconColor} hover:brightness-110 transition-all shadow-sm`}
            >
              <CalendarClock size={20} />
            </button>
          )}

          {onOpenSettings && (
            <button 
              onClick={onOpenSettings}
              className="p-2.5 bg-secondary text-secondary-foreground rounded-full hover:bg-muted transition-all"
            >
              <SettingsIcon size={20} />
            </button>
          )}
        </div>
      </div>

      <main className="px-6 space-y-8 mt-6">

        {/* 2. HERO CARD (Botão Gigante) */}
        <button 
          onClick={onStartQuiz}
          className={`w-full group relative overflow-hidden rounded-[2rem] bg-gradient-to-br ${theme.gradient} p-8 text-left shadow-xl hover:shadow-2xl transition-all duration-300 transform active:scale-[0.98] ring-offset-2 focus:ring-2 ring-primary`}
        >
          <div className="absolute top-0 right-0 p-4 opacity-10 transform group-hover:scale-110 transition-transform duration-500 rotate-12">
            <Zap size={160} fill="currentColor" className="text-white" />
          </div>
          
          <div className="relative z-10 flex flex-col h-full justify-between min-h-[140px]">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold text-white mb-4 border border-white/10 shadow-sm">
                <Flame size={12} fill="currentColor" /> {stats.streak} dias seguidos
              </span>
              <h2 className="text-3xl font-black text-white mb-2 leading-tight">Quiz<br/>Inteligente</h2>
              <p className={`text-sm ${theme.lightText} opacity-90 max-w-[80%]`}>
                O algoritmo preparou 10 questões para hoje.
              </p>
            </div>
            
            <div className="flex items-center gap-3 mt-6">
              <div className="bg-white text-black px-6 py-3 rounded-xl font-bold text-sm shadow-lg group-hover:scale-105 transition-transform flex items-center gap-2">
                Começar <ChevronRight size={16} />
              </div>
            </div>
          </div>
        </button>

        {/* 3. STATS CARDS (Grade Moderna) */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-card text-card-foreground p-5 rounded-[1.5rem] shadow-sm border border-border relative overflow-hidden">
            <div className={`absolute -right-4 -bottom-4 opacity-[0.03] dark:opacity-[0.08] ${theme.iconColor} scale-150`}>
              <Trophy size={100} />
            </div>
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Nível {stats.level}</p>
            <div className="mt-3 mb-4">
              <span className="text-4xl font-black tracking-tighter">{stats.xp}</span>
              <span className="text-xs text-muted-foreground font-bold ml-1">XP</span>
            </div>
            <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
              <div className={`h-full rounded-full ${theme.progressBar}`} style={{ width: `${(stats.xp % 1000) / 10}%` }}></div>
            </div>
          </div>

          <div className="bg-card text-card-foreground p-5 rounded-[1.5rem] shadow-sm border border-border relative overflow-hidden">
            <div className={`absolute -right-4 -bottom-4 opacity-[0.03] dark:opacity-[0.08] ${theme.iconColor} scale-150`}>
              <Target size={100} />
            </div>
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Precisão</p>
            <div className="mt-3 mb-2 flex items-baseline">
              <span className="text-4xl font-black tracking-tighter">{Math.round(stats.accuracy)}</span>
              <span className="text-xl font-bold text-muted-foreground">%</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-green-600 bg-green-50 dark:bg-green-900/30 dark:text-green-400 px-2 py-1 rounded-md w-fit font-bold">
              <TrendingUp size={12} />
              <span>Em alta</span>
            </div>
          </div>
        </div>

        {/* 4. ALERTA DE REVISÃO (Só se houver erro) */}
        {stats.criticalQuestions > 0 && (
          <div className="bg-card border border-red-100 dark:border-red-900/30 rounded-[1.5rem] p-1 shadow-sm animate-pulse-slow">
            <div className="bg-red-50 dark:bg-red-950/30 rounded-[1.2rem] p-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="bg-red-100 dark:bg-red-900/50 p-3 rounded-full text-red-600 dark:text-red-400 shrink-0">
                  <AlertTriangle size={22} />
                </div>
                <div>
                  <h3 className="font-bold text-red-900 dark:text-red-200 text-sm">Atenção Necessária</h3>
                  <p className="text-xs text-red-600 dark:text-red-400 font-medium">
                    {stats.criticalQuestions} questões críticas
                  </p>
                </div>
              </div>
              <button 
                onClick={onOpenFlashcards}
                className="px-5 py-2.5 bg-red-600 text-white text-xs font-bold rounded-xl shadow-lg hover:bg-red-700 transition active:scale-95"
              >
                Revisar
              </button>
            </div>
          </div>
        )}

        {/* 5. LISTA DE MATÉRIAS (Limpa e Legível) */}
        <div>
          <div className="flex items-center justify-between mb-4 px-2">
            <h3 className="font-bold text-lg text-foreground">Progresso</h3>
            <button 
              onClick={onOpenStatistics}
              className={`text-xs font-bold px-3 py-1 rounded-full ${theme.highlight} cursor-pointer hover:brightness-95 transition-all`}
            >
              Detalhes
            </button>
          </div>
          
          <div className="bg-card border border-border rounded-[1.5rem] shadow-sm divide-y divide-border">
            {subjects.map((subj, index) => (
              <div key={index} className="p-5 flex items-center justify-between hover:bg-muted/50 transition-colors cursor-pointer group">
                <div className="flex items-center gap-4">
                  {/* Micro Gráfico Circular SVG */}
                  <div className="relative size-12 flex items-center justify-center shrink-0">
                    <svg className="size-full -rotate-90" viewBox="0 0 36 36">
                      <path className="text-secondary" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" />
                      <path className={`${theme.iconColor}`} strokeDasharray={`${subj.progress}, 100`} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                    </svg>
                    <span className="absolute text-[10px] font-bold text-muted-foreground">{subj.progress}%</span>
                  </div>
                  
                  <div>
                    <p className="text-sm font-bold text-foreground leading-tight group-hover:text-primary transition-colors">{subj.name}</p>
                    <p className="text-xs text-muted-foreground mt-1 font-medium">{subj.total} questões feitas</p>
                  </div>
                </div>
                <ChevronRight size={18} className="text-muted-foreground/50 group-hover:text-primary transition-colors" />
              </div>
            ))}
          </div>
        </div>

      </main>

      {/* 6. BOTTOM NAV (Flutuante com Blur) */}
      <div className="fixed bottom-6 left-0 w-full px-6 flex justify-center z-30 pointer-events-none">
        <nav className="bg-background/90 dark:bg-card/90 backdrop-blur-xl border border-border p-1.5 rounded-2xl shadow-2xl flex items-center gap-1 pointer-events-auto max-w-sm w-full justify-between">
          
          <button 
            onClick={onStartQuiz}
            className={`flex-1 flex flex-col items-center justify-center py-3 rounded-xl ${theme.iconBg} ${theme.iconColor} transition-all`}
          >
            <BookOpen size={22} strokeWidth={2.5} className="mb-0.5" />
            <span className="text-[10px] font-bold">Estudar</span>
          </button>
          
          <button 
            onClick={onOpenSimulatedExam}
            className="flex-1 flex flex-col items-center justify-center py-3 rounded-xl text-muted-foreground hover:bg-muted hover:text-foreground transition-all"
          >
            <Target size={22} strokeWidth={2.5} className="mb-0.5" />
            <span className="text-[10px] font-medium">Simulados</span>
          </button>
          
          <button 
            onClick={onOpenAchievements}
            className="flex-1 flex flex-col items-center justify-center py-3 rounded-xl text-muted-foreground hover:bg-muted hover:text-foreground transition-all"
          >
            <Trophy size={22} strokeWidth={2.5} className="mb-0.5" />
            <span className="text-[10px] font-medium">Rank</span>
          </button>

        </nav>
      </div>

    </div>
  );
}