import React from 'react';
import { 
  Moon, Sun, Bell, Volume2, Trash2, LogOut, User, 
  ChevronRight, Palette, Clock, Shield, HelpCircle, Target
} from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Switch } from './ui/switch';
import { useTheme } from '../context/ThemeContext';
import { useCustomization } from '../context/CustomizationContext';
import { APP_THEMES } from '../lib/themeConfig';

interface SettingsProps {
  onClose: () => void;
  onOpenCustomization?: () => void;
  onOpenProfile?: () => void;
  onOpenStudyPlan?: () => void;
  onOpenNotifications?: () => void;
}

export function Settings({ 
  onClose, onOpenCustomization, onOpenProfile, onOpenStudyPlan, onOpenNotifications
}: SettingsProps) {
  
  const { isDarkMode, toggleDarkMode } = useTheme();
  const { settings } = useCustomization();
  const theme = APP_THEMES[settings.colorTheme] || APP_THEMES.focus;

  // Estados para preferências
  const [notifications, setNotifications] = React.useState(() => {
    const saved = localStorage.getItem('alerr_notifications_enabled');
    return saved ? JSON.parse(saved) : true;
  });
  
  const [sound, setSound] = React.useState(() => {
    const saved = localStorage.getItem('alerr_sound_enabled');
    return saved ? JSON.parse(saved) : false;
  });

  const [dailyGoal, setDailyGoal] = React.useState(() => {
    const saved = localStorage.getItem('alerr_settings');
    return saved ? JSON.parse(saved).dailyGoal || 50 : 50;
  });

  React.useEffect(() => {
    localStorage.setItem('alerr_notifications_enabled', JSON.stringify(notifications));
  }, [notifications]);

  React.useEffect(() => {
    localStorage.setItem('alerr_sound_enabled', JSON.stringify(sound));
  }, [sound]);

  const handleResetProgress = () => {
    if (window.confirm('⚠️ ATENÇÃO! Isso vai apagar TODAS as suas estatísticas, XP, nível e histórico de questões. Esta ação é IRREVERSÍVEL!\n\nTem certeza que deseja continuar?')) {
      if (window.confirm('✋ Última confirmação: TODOS os seus dados serão perdidos permanentemente. Deseja realmente resetar?')) {
        const keysToRemove = [
          'alerr_stats',
          'alerr_game',
          'alerr_answered_questions',
          'alerr_settings',
          'alerr_notifications_enabled',
          'alerr_sound_enabled',
          'alerr_concurso_profile',
          'exam_backup'
        ];
        
        keysToRemove.forEach(key => localStorage.removeItem(key));
        
        alert('✅ Progresso resetado! A página será recarregada.');
        window.location.reload();
      }
    }
  };

  const handleLogout = () => {
    if (window.confirm('Deseja realmente sair da sua conta?')) {
      alert('Logout realizado com sucesso!');
      onClose();
    }
  };

  // Componente Auxiliar para Item de Menu
  const MenuItem = ({ icon: Icon, label, desc, onClick, colorClass, activeToggle }: any) => {
    const content = (
      <>
        <div className="flex items-center gap-4">
          <div className={`p-3 rounded-2xl ${colorClass} transition-colors shadow-sm`}>
            <Icon size={22} strokeWidth={2.5} />
          </div>
          <div className="text-left">
            <p className="font-bold text-gray-900 dark:text-white text-sm">{label}</p>
            {desc && <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{desc}</p>}
          </div>
        </div>
        {activeToggle !== undefined ? (
          <div>{activeToggle}</div>
        ) : (
          <ChevronRight size={18} className="text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors" />
        )}
      </>
    );

    // Se tem toggle (Switch), usa div ao invés de button
    if (activeToggle !== undefined) {
      return (
        <div className="w-full flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all group">
          {content}
        </div>
      );
    }

    // Se é clicável, usa button
    return (
      <button 
        onClick={onClick}
        className="w-full flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all active:scale-[0.98] group"
      >
        {content}
      </button>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20 animate-in slide-in-from-right">
      
      {/* Header */}
      <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md px-6 py-5 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10 flex items-center justify-between">
        <h1 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">Ajustes</h1>
        <Button variant="ghost" onClick={onClose} className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white font-bold">Concluir</Button>
      </div>

      <div className="p-6 space-y-8 max-w-2xl mx-auto">
        
        {/* GRUPO 1: ESTUDO */}
        <section>
          <h2 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase ml-4 mb-3 tracking-widest">Sua Rotina</h2>
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-[1.5rem] shadow-sm overflow-hidden divide-y divide-gray-200 dark:divide-gray-700">
            {onOpenProfile && (
              <MenuItem 
                icon={User} 
                label="Perfil de Concurso" 
                desc="Cargo, banca e nível" 
                onClick={onOpenProfile}
                colorClass="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
              />
            )}
            <MenuItem 
              icon={Target} 
              label="Meta Diária" 
              desc={`${dailyGoal} questões por dia`}
              onClick={() => {
                const newGoal = prompt(`Qual sua meta diária de questões?\n\nAtual: ${dailyGoal} questões/dia`, dailyGoal.toString());
                if (newGoal && !isNaN(Number(newGoal))) {
                  const goal = Math.max(1, Math.min(1000, Number(newGoal)));
                  setDailyGoal(goal);
                  localStorage.setItem('alerr_settings', JSON.stringify({ dailyGoal: goal }));
                }
              }}
              colorClass="bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400"
            />
            {onOpenStudyPlan && (
              <MenuItem 
                icon={Clock} 
                label="Plano de Estudos" 
                desc="Metas diárias e intervalos" 
                onClick={onOpenStudyPlan}
                colorClass="bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400"
              />
            )}
          </div>
        </section>

        {/* GRUPO 2: APARÊNCIA */}
        <section>
          <h2 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase ml-4 mb-3 tracking-widest">Visual</h2>
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-[1.5rem] shadow-sm overflow-hidden divide-y divide-gray-200 dark:divide-gray-700">
            <MenuItem 
              icon={isDarkMode ? Moon : Sun} 
              label="Modo Escuro" 
              desc="Conforto visual para a noite"
              colorClass={isDarkMode ? "bg-indigo-900/50 text-indigo-300" : "bg-amber-100 text-amber-600"}
              activeToggle={<Switch checked={isDarkMode} onCheckedChange={toggleDarkMode} />}
            />
            {onOpenCustomization && (
              <MenuItem 
                icon={Palette} 
                label="Tema de Cores" 
                desc={`Atual: ${theme.name}`}
                onClick={onOpenCustomization}
                colorClass="bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400"
              />
            )}
          </div>
        </section>

        {/* GRUPO 3: SISTEMA */}
        <section>
          <h2 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase ml-4 mb-3 tracking-widest">App</h2>
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-[1.5rem] shadow-sm overflow-hidden divide-y divide-gray-200 dark:divide-gray-700">
            {onOpenNotifications ? (
              <MenuItem 
                icon={Bell} 
                label="Notificações Inteligentes" 
                desc={notifications ? 'Ativadas' : 'Desativadas'}
                onClick={onOpenNotifications}
                colorClass="bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400"
              />
            ) : (
              <MenuItem 
                icon={Bell} 
                label="Notificações Inteligentes" 
                desc={notifications ? 'Ativadas' : 'Desativadas'}
                colorClass="bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400"
                activeToggle={<Switch checked={notifications} onCheckedChange={setNotifications} />}
              />
            )}
            <MenuItem 
              icon={Volume2} 
              label="Efeitos Sonoros" 
              desc={sound ? 'Ativados' : 'Desativados'}
              colorClass="bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400"
              activeToggle={<Switch checked={sound} onCheckedChange={setSound} />}
            />
            <MenuItem 
              icon={HelpCircle} 
              label="Ajuda e Suporte" 
              colorClass="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
            />
          </div>
        </section>

        {/* GRUPO 4: ZONA DE PERIGO */}
        <section>
          <h2 className="text-xs font-bold text-red-500 dark:text-red-400 uppercase ml-4 mb-3 tracking-widest">Zona de Perigo</h2>
          <div className="bg-white dark:bg-gray-800 border border-red-200 dark:border-red-900 rounded-[1.5rem] shadow-sm overflow-hidden divide-y divide-gray-200 dark:divide-gray-700">
            <MenuItem 
              icon={Trash2} 
              label="Resetar Progresso" 
              desc="Apaga todos os dados (irreversível)"
              onClick={handleResetProgress}
              colorClass="bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400"
            />
            <MenuItem 
              icon={LogOut} 
              label="Sair da Conta" 
              colorClass="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
              onClick={handleLogout}
            />
          </div>
        </section>

        <p className="text-center text-xs text-gray-400 dark:text-gray-500 pt-4">
          Gabaritoo v2.0 • Feito com ❤️ em Roraima 🇧🇷
        </p>

      </div>
    </div>
  );
}