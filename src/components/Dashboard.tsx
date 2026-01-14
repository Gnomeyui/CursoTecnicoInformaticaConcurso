import React, { useState, useEffect } from 'react';
import { 
  AlertTriangle, Trophy, Flame, TrendingUp, Target, 
  BookOpen, Settings as SettingsIcon, ChevronRight, Zap, Calendar
} from 'lucide-react';
import { useCustomization } from '../context/CustomizationContext';
import { useConcursoProfile } from '../context/ConcursoProfileContext';
import { useGame } from '../context/GameContext'; // Importar contexto do Jogo
import { useStats } from '../context/StatsContext'; // Importar contexto de Estatísticas
import { COPY } from '../utils/copy';
import { getRandomMotivationalCTA } from '../utils/getRandomMotivationalCTA';

interface DashboardProps {
  onStartQuiz?: () => void;
  onOpenStatistics?: () => void;
  onOpenAchievements?: () => void;
  onOpenCustomization?: () => void;
  onOpenSimulatedExam?: () => void;
  onOpenFlashcards?: () => void;
  onOpenRegimento?: () => void;
  onOpenStudyPlan?: () => void;
  user?: any;
  onOpenSettings: () => void;
  onOpenProfiles: () => void;
}

const Dashboard = ({ 
  onOpenSettings, 
  onOpenProfiles,
  onStartQuiz,
  onOpenSimulatedExam,
  onOpenAchievements,
  onOpenStudyPlan,
  onOpenStatistics
}: DashboardProps) => {
  const { theme: currentTheme } = useCustomization();
  const { activeProfile } = useConcursoProfile();
  
  // ✅ USAR DADOS REAIS DOS CONTEXTOS (NÃO HARDCODED!)
  const { xp, level } = useGame();
  const { detailedStats } = useStats();
  
  const [motivationalText] = useState(() => getRandomMotivationalCTA());

  // Calcular progresso do nível (apenas visual)
  const levelProgress = (xp % 1000) / 10; 

  return (
    <div className="min-h-screen bg-gray-50/50 dark:bg-gray-950 pb-32 font-sans animate-in fade-in duration-500">
      
      {/* 1. TOP BAR */}
      <div className="px-6 pt-6 pb-2 flex justify-between items-center bg-white dark:bg-gray-900 sticky top-0 z-20 border-b border-gray-100 dark:border-gray-800">
        <div onClick={onOpenProfiles} className="cursor-pointer">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">Foco Atual</p>
          <div className="flex items-center gap-1 group">
            <h1 className="text-lg font-bold text-gray-800 dark:text-white truncate max-w-[200px]">
              {activeProfile ? activeProfile.nome : 'Selecionar Cargo'}
            </h1>
            <ChevronRight size={16} className="text-gray-400 group-hover:text-gray-600 transition-colors" />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={onOpenStudyPlan} className="p-2.5 bg-gray-50 dark:bg-gray-800 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-all text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
            <Calendar size={20} />
          </button>
          <button onClick={onOpenSettings} className="p-2.5 bg-gray-50 dark:bg-gray-800 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-all text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
            <SettingsIcon size={20} />
          </button>
        </div>
      </div>

      <main className="px-6 space-y-6 mt-6">

        {/* 2. CARD PRINCIPAL */}
        <button 
          onClick={onStartQuiz}
          className={`w-full group relative overflow-hidden rounded-3xl bg-gradient-to-br ${currentTheme.gradient} p-6 text-left shadow-lg hover:shadow-xl transition-all duration-300 transform active:scale-[0.98]`}
        >
          <div className="absolute top-0 right-0 p-4 opacity-10 transform group-hover:scale-110 transition-transform duration-500">
            <Zap size={140} fill="currentColor" className="text-white" />
          </div>
          
          <div className="relative z-10 flex flex-col h-full justify-between min-h-[120px]">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold text-white mb-3 border border-white/10">
                <Flame size={12} fill="currentColor" /> {detailedStats.currentStreak} dias
              </span>
              <h2 className="text-3xl font-bold text-white mb-1">{COPY.home.title}</h2>
              <p className={`text-sm ${currentTheme.lightText} max-w-[85%]`}>
                {motivationalText}
              </p>
            </div>
            
            <div className="flex items-center gap-2 mt-4 font-bold text-white bg-white/10 w-fit px-4 py-2 rounded-xl backdrop-blur-sm">
              <span>{COPY.home.mainButton}</span>
              <ChevronRight size={16} />
            </div>
          </div>
        </button>

        {/* 3. CARDS DE ESTATÍSTICAS */}
        <div className="grid grid-cols-2 gap-4">
          
          {/* Nível (Dados Reais) */}
          <div className="bg-white dark:bg-gray-900 p-5 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 relative overflow-hidden">
            <div className={`absolute -right-4 -bottom-4 opacity-10 ${currentTheme.iconColor}`}>
              <Trophy size={80} />
            </div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wide">Nível {level}</p>
            <div className="mt-2 mb-3">
              <span className="text-3xl font-bold text-gray-800 dark:text-white">{xp}</span>
              <span className="text-xs text-gray-400 font-medium ml-1">XP</span>
            </div>
            <div className="w-full bg-gray-100 dark:bg-gray-800 h-1.5 rounded-full overflow-hidden">
              <div className={`h-full rounded-full ${currentTheme.progressBar}`} style={{ width: `${levelProgress}%` }}></div>
            </div>
          </div>

          {/* Precisão (Dados Reais) */}
          <div className="bg-white dark:bg-gray-900 p-5 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 relative overflow-hidden">
            <div className={`absolute -right-4 -bottom-4 opacity-10 ${currentTheme.iconColor}`}>
              <Target size={80} />
            </div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wide">Precisão</p>
            <div className="mt-2 flex items-baseline gap-1">
              <span className="text-3xl font-bold text-gray-800 dark:text-white">
                {Math.round(detailedStats.overallAccuracy)}%
              </span>
            </div>
            <div className="mt-3 flex items-center gap-1 text-[10px] text-green-600 bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded-md w-fit font-bold">
              <TrendingUp size={10} />
              <span>GERAL</span>
            </div>
          </div>
        </div>

        {/* 4. LISTA DE MATÉRIAS (Placeholder dinâmico se houver dados) */}
        {detailedStats.subjectStats.length > 0 ? (
          <div className="pt-2">
            <h3 className="font-bold text-gray-800 dark:text-white mb-4 px-1 text-lg">Seu Progresso</h3>
            <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 divide-y divide-gray-50 dark:divide-gray-800">
              {detailedStats.subjectStats.map((subj, index) => (
                <div key={index} className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-bold text-gray-800 dark:text-white">{subj.subject}</span>
                  </div>
                  <span className="text-xs font-bold">{Math.round(subj.accuracy)}%</span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="pt-2">
            <h3 className="font-bold text-gray-800 dark:text-white mb-4 px-1 text-lg">Suas Matérias</h3>
            <div className={`p-6 rounded-2xl ${currentTheme.iconBg} border border-gray-100 dark:border-gray-800`}>
              <div className="flex items-start gap-3">
                <TrendingUp size={20} className={currentTheme.iconColor} />
                <div>
                  <p className="text-sm font-bold text-gray-800 dark:text-white mb-1">
                    Comece a estudar!
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    Responda questões para acompanhar seu progresso por matéria. Veja suas estatísticas completas na aba Stats.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* 6. MENU INFERIOR */}
      <div className="fixed bottom-6 left-0 w-full px-6 flex justify-center z-30 pointer-events-none">
        <nav className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg border border-gray-200 dark:border-gray-700 p-1.5 rounded-2xl shadow-2xl flex items-center gap-1 pointer-events-auto w-full max-w-[400px] justify-between">
          <button onClick={onStartQuiz} className={`flex-1 flex flex-col items-center justify-center py-2.5 rounded-xl ${currentTheme.iconBg} ${currentTheme.iconColor} shadow-sm transition-all`}>
            <BookOpen size={20} strokeWidth={2.5} className="mb-0.5" />
            <span className="text-[10px] font-bold">{COPY.bottomNav.study}</span>
          </button>
          
          <button onClick={onOpenSimulatedExam} className="flex-1 flex flex-col items-center justify-center py-2.5 rounded-xl text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all">
            <Target size={20} strokeWidth={2.5} className="mb-0.5" />
            <span className="text-[10px] font-medium">{COPY.bottomNav.simulated}</span>
          </button>
          
          <button onClick={onOpenStatistics} className="flex-1 flex flex-col items-center justify-center py-2.5 rounded-xl text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all">
            <TrendingUp size={20} strokeWidth={2.5} className="mb-0.5" />
            <span className="text-[10px] font-medium">Stats</span>
          </button>
          
          <button onClick={onOpenAchievements} className="flex-1 flex flex-col items-center justify-center py-2.5 rounded-xl text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all">
            <Trophy size={20} strokeWidth={2.5} className="mb-0.5" />
            <span className="text-[10px] font-medium">{COPY.bottomNav.achievements}</span>
          </button>
        </nav>
      </div>

    </div>
  );
};

export default Dashboard;