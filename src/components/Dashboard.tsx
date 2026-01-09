import React, { useState, useEffect } from 'react';
import { 
  AlertTriangle, Trophy, Flame, TrendingUp, Target, 
  BookOpen, Settings as SettingsIcon, ChevronRight, Zap, Calendar
} from 'lucide-react';
import { supabase } from '../utils/supabase/client';
import { useCustomization } from '../context/CustomizationContext';
import { useConcursoProfile } from '../context/ConcursoProfileContext';

// MAPA DE CORES: Define exatamente qual cor usar para cada tema
const THEME_STYLES: Record<string, {
  gradient: string;      // Para o fundo do botão principal
  button: string;        // Para botões secundários
  lightText: string;     // Texto claro sobre fundo escuro
  iconBg: string;        // Fundo dos ícones circulares
  iconColor: string;     // Cor do ícone
  progressBar: string;   // Cor da barra de progresso
  softBg: string;        // Fundos suaves
  border: string;        // Bordas coloridas
}> = {
  blue: {
    gradient: 'from-blue-600 to-indigo-600',
    button: 'bg-blue-600 hover:bg-blue-700',
    lightText: 'text-blue-50',
    iconBg: 'bg-blue-50 dark:bg-blue-900/30',
    iconColor: 'text-blue-600 dark:text-blue-400',
    progressBar: 'bg-blue-600',
    softBg: 'bg-blue-50 dark:bg-blue-900/10',
    border: 'border-blue-100 dark:border-blue-800'
  },
  green: {
    gradient: 'from-emerald-500 to-teal-600',
    button: 'bg-emerald-600 hover:bg-emerald-700',
    lightText: 'text-emerald-50',
    iconBg: 'bg-emerald-50 dark:bg-emerald-900/30',
    iconColor: 'text-emerald-600 dark:text-emerald-400',
    progressBar: 'bg-emerald-600',
    softBg: 'bg-emerald-50 dark:bg-emerald-900/10',
    border: 'border-emerald-100 dark:border-emerald-800'
  },
  purple: {
    gradient: 'from-violet-600 to-fuchsia-600',
    button: 'bg-violet-600 hover:bg-violet-700',
    lightText: 'text-violet-50',
    iconBg: 'bg-violet-50 dark:bg-violet-900/30',
    iconColor: 'text-violet-600 dark:text-violet-400',
    progressBar: 'bg-violet-600',
    softBg: 'bg-violet-50 dark:bg-violet-900/10',
    border: 'border-violet-100 dark:border-violet-800'
  },
  orange: {
    gradient: 'from-orange-500 to-red-500',
    button: 'bg-orange-600 hover:bg-orange-700',
    lightText: 'text-orange-50',
    iconBg: 'bg-orange-50 dark:bg-orange-900/30',
    iconColor: 'text-orange-600 dark:text-orange-400',
    progressBar: 'bg-orange-600',
    softBg: 'bg-orange-50 dark:bg-orange-900/10',
    border: 'border-orange-100 dark:border-orange-800'
  },
};

interface DashboardProps {
  dailyScore?: number;
  totalQuestions?: number;
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
  user, 
  onOpenSettings, 
  onOpenProfiles,
  dailyScore = 0,
  totalQuestions = 0,
  onStartQuiz,
  onOpenStatistics,
  onOpenAchievements,
  onOpenCustomization,
  onOpenSimulatedExam,
  onOpenFlashcards,
  onOpenRegimento,
  onOpenStudyPlan
}: DashboardProps) => {
  const { primaryColor } = useCustomization();
  const { activeProfile } = useConcursoProfile();
  
  // GARANTIA DE COR: Se falhar, usa blue
  const currentTheme = THEME_STYLES[primaryColor] || THEME_STYLES['blue'];

  const [stats, setStats] = useState({
    xp: 0, level: 1, streak: 0, criticalQuestions: 0, masteredQuestions: 0, accuracy: 0
  });
  const [subjects, setSubjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Carrega dados do Supabase
  useEffect(() => {
    async function loadData() {
      if (!user) {
        setLoading(false);
        return;
      }
      
      try {
        // Simulação de carregamento (aqui entraria sua chamada real ao banco)
        const { data: profile } = await supabase.from('profiles').select('*').eq('id', user.id).single();
        const { count: critical } = await supabase.from('user_question_progress')
          .select('*', { count: 'exact', head: true }).eq('user_id', user.id).eq('is_critical', true);

        setStats({
          xp: profile?.xp || 1250,
          level: profile?.nivel || 3,
          streak: profile?.streak_atual || 5,
          criticalQuestions: critical || 0,
          masteredQuestions: 42,
          accuracy: 68
        });

        setSubjects([
          { name: 'Português', progress: 45, total: 120 },
          { name: 'Informática', progress: 30, total: 50 },
          { name: 'Direito Adm.', progress: 70, total: 80 },
        ]);
      } catch (error) {
        console.log('Erro ao carregar dados:', error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [user]);

  if (loading) return <div className="h-screen flex items-center justify-center"><div className={`animate-spin rounded-full h-8 w-8 border-b-2 ${currentTheme.iconColor}`}></div></div>;

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

        {/* 2. CARD PRINCIPAL (HERO) - A CORAGEM DA COR */}
        <button 
          onClick={onStartQuiz}
          className={`w-full group relative overflow-hidden rounded-3xl bg-gradient-to-br ${currentTheme.gradient} p-6 text-left shadow-lg hover:shadow-xl transition-all duration-300 transform active:scale-[0.98]`}
        >
          {/* Ícone de fundo decorativo */}
          <div className="absolute top-0 right-0 p-4 opacity-10 transform group-hover:scale-110 transition-transform duration-500">
            <Zap size={140} fill="currentColor" className="text-white" />
          </div>
          
          <div className="relative z-10 flex flex-col h-full justify-between min-h-[120px]">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold text-white mb-3 border border-white/10">
                <Flame size={12} fill="currentColor" /> {stats.streak} dias seguidos
              </span>
              <h2 className="text-3xl font-bold text-white mb-1">Modo Treino</h2>
              <p className={`text-sm ${currentTheme.lightText} max-w-[85%]`}>
                Algoritmo ajustado para o seu nível.
              </p>
            </div>
            
            <div className="flex items-center gap-2 mt-4 font-bold text-white bg-white/10 w-fit px-4 py-2 rounded-xl backdrop-blur-sm">
              <span>Iniciar Sessão</span>
              <ChevronRight size={16} />
            </div>
          </div>
        </button>

        {/* 3. CARDS DE ESTATÍSTICAS (BENTO GRID) */}
        <div className="grid grid-cols-2 gap-4">
          
          {/* Nível */}
          <div className="bg-white dark:bg-gray-900 p-5 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 relative overflow-hidden">
            <div className={`absolute -right-4 -bottom-4 opacity-10 ${currentTheme.iconColor}`}>
              <Trophy size={80} />
            </div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wide">Nível {stats.level}</p>
            <div className="mt-2 mb-3">
              <span className="text-3xl font-bold text-gray-800 dark:text-white">{stats.xp}</span>
              <span className="text-xs text-gray-400 font-medium ml-1">XP</span>
            </div>
            <div className="w-full bg-gray-100 dark:bg-gray-800 h-1.5 rounded-full overflow-hidden">
              <div className={`h-full rounded-full ${currentTheme.progressBar}`} style={{ width: `${(stats.xp % 1000) / 10}%` }}></div>
            </div>
          </div>

          {/* Precisão */}
          <div className="bg-white dark:bg-gray-900 p-5 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 relative overflow-hidden">
            <div className={`absolute -right-4 -bottom-4 opacity-10 ${currentTheme.iconColor}`}>
              <Target size={80} />
            </div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wide">Precisão</p>
            <div className="mt-2 flex items-baseline gap-1">
              <span className="text-3xl font-bold text-gray-800 dark:text-white">{stats.accuracy}%</span>
            </div>
            <div className="mt-3 flex items-center gap-1 text-[10px] text-green-600 bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded-md w-fit font-bold">
              <TrendingUp size={10} />
              <span>SUBINDO</span>
            </div>
          </div>
        </div>

        {/* 4. ALERTA DE REVISÃO (Só aparece se necessário) */}
        {stats.criticalQuestions > 0 ? (
          <div className="bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/30 rounded-3xl p-5 flex items-center justify-between animate-pulse-slow">
            <div className="flex items-center gap-4">
              <div className="bg-red-100 dark:bg-red-900/50 p-3 rounded-2xl text-red-600 dark:text-red-200">
                <AlertTriangle size={24} />
              </div>
              <div>
                <h3 className="font-bold text-gray-800 dark:text-white">Atenção!</h3>
                <p className="text-xs text-red-600 dark:text-red-400 font-medium">{stats.criticalQuestions} erros críticos.</p>
              </div>
            </div>
            <button onClick={() => console.log('Abrir UTI')} className="px-4 py-2 bg-red-600 text-white text-xs font-bold rounded-xl shadow-sm hover:bg-red-700">
              Corrigir
            </button>
          </div>
        ) : (
          // Mensagem positiva quando não há erros
          <div className={`rounded-3xl p-5 flex items-center gap-4 border ${currentTheme.softBg} ${currentTheme.border}`}>
             <div className={`p-2 rounded-full ${currentTheme.iconBg} ${currentTheme.iconColor}`}>
                <Trophy size={18} />
              </div>
              <p className={`text-xs font-medium ${currentTheme.iconColor}`}>Tudo em dia! Sem erros pendentes.</p>
          </div>
        )}

        {/* 5. LISTA DE MATÉRIAS */}
        <div className="pt-2">
          <h3 className="font-bold text-gray-800 dark:text-white mb-4 px-1 text-lg">Seu Progresso</h3>
          <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 divide-y divide-gray-50 dark:divide-gray-800">
            {subjects.map((subj, index) => (
              <div key={index} className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-4">
                  {/* Círculo de Progresso SVG */}
                  <div className="relative size-10 flex items-center justify-center">
                    <svg className="size-full -rotate-90" viewBox="0 0 36 36">
                      <path className="text-gray-100 dark:text-gray-800" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" />
                      <path className={currentTheme.iconColor} strokeDasharray={`${subj.progress}, 100`} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" />
                    </svg>
                    <span className="absolute text-[10px] font-bold text-gray-600 dark:text-gray-400">{subj.progress}%</span>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-800 dark:text-white">{subj.name}</p>
                    <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">{subj.total} questões</p>
                  </div>
                </div>
                <ChevronRight size={16} className="text-gray-300" />
              </div>
            ))}
          </div>
        </div>

      </main>

      {/* 6. MENU INFERIOR (ILHA FLUTUANTE) */}
      <div className="fixed bottom-6 left-0 w-full px-6 flex justify-center z-30 pointer-events-none">
        <nav className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg border border-gray-200 dark:border-gray-700 p-1.5 rounded-2xl shadow-2xl flex items-center gap-1 pointer-events-auto w-full max-w-[320px] justify-between">
          <button onClick={onStartQuiz} className={`flex-1 flex flex-col items-center justify-center py-2.5 rounded-xl ${currentTheme.iconBg} ${currentTheme.iconColor} shadow-sm transition-all`}>
            <BookOpen size={20} strokeWidth={2.5} className="mb-0.5" />
            <span className="text-[10px] font-bold">Estudar</span>
          </button>
          
          <button onClick={onOpenSimulatedExam} className="flex-1 flex flex-col items-center justify-center py-2.5 rounded-xl text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all">
            <Target size={20} strokeWidth={2.5} className="mb-0.5" />
            <span className="text-[10px] font-medium">Simulados</span>
          </button>
          
          <button onClick={onOpenAchievements} className="flex-1 flex flex-col items-center justify-center py-2.5 rounded-xl text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all">
            <Trophy size={20} strokeWidth={2.5} className="mb-0.5" />
            <span className="text-[10px] font-medium">Conquistas</span>
          </button>
        </nav>
      </div>

    </div>
  );
};

export default Dashboard;