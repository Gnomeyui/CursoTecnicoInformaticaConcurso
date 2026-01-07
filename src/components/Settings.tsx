import React from 'react';
import { 
  Moon, 
  Sun, 
  Bell, 
  Volume2, 
  Trash2, 
  LogOut, 
  User, 
  ChevronRight, 
  Palette,
  ShieldAlert,
  Target
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Button } from './ui/button';
import { Switch } from './ui/switch';
import { Separator } from './ui/separator';
import { Label } from './ui/label';
import { useTheme } from '../context/ThemeContext';
import { useCustomization } from '../context/CustomizationContext';
import { APP_THEMES } from '../lib/themeConfig';

interface SettingsProps {
  onClose: () => void;
  onOpenCustomization?: () => void;
  onOpenProfile?: () => void;
  onOpenNotifications?: () => void;
}

export function Settings({ 
  onClose, 
  onOpenCustomization, 
  onOpenProfile,
  onOpenNotifications 
}: SettingsProps) {
  const { isDarkMode, toggleDarkMode } = useTheme();
  const { settings } = useCustomization();
  const activeTheme = APP_THEMES[settings.colorTheme] || APP_THEMES.focus;
  
  // Estados para preferências (integrar com localStorage depois)
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
    if (saved) {
      const settings = JSON.parse(saved);
      return settings.dailyGoal || 20;
    }
    return 20;
  });

  // Salvar preferências quando mudarem
  React.useEffect(() => {
    localStorage.setItem('alerr_notifications_enabled', JSON.stringify(notifications));
  }, [notifications]);

  React.useEffect(() => {
    localStorage.setItem('alerr_sound_enabled', JSON.stringify(sound));
  }, [sound]);

  const handleResetProgress = () => {
    if (window.confirm('⚠️ Tem certeza? Esta ação não pode ser desfeita. Todo o seu progresso, XP e estatísticas serão apagados.')) {
      // Listar todas as chaves relacionadas ao app
      const keysToKeep = ['alerr_notifications_enabled', 'alerr_sound_enabled'];
      const keysToRemove: string[] = [];
      
      // Identificar chaves do Gabaritoo
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith('alerr_') && !keysToKeep.includes(key)) {
          keysToRemove.push(key);
        }
      }
      
      // Remover
      keysToRemove.forEach(key => localStorage.removeItem(key));
      
      alert('✅ Progresso resetado! Reinicie o app para começar do zero.');
      window.location.reload();
    }
  };

  const handleLogout = () => {
    if (window.confirm('Deseja realmente sair da sua conta?')) {
      // Implementar logout (quando tiver autenticação)
      alert('Logout em desenvolvimento. Por enquanto, o app funciona em modo offline.');
    }
  };

  return (
    <div className="min-h-screen bg-app pb-20 animate-in slide-in-from-right duration-300">
      
      {/* Cabeçalho */}
      <div className="bg-card-theme p-6 shadow-sm sticky top-0 z-10 flex items-center justify-between border-b border-gray-200 dark:border-gray-700">
        <h1 className="text-2xl font-bold text-app">Configurações</h1>
        <Button variant="ghost" onClick={onClose}>Concluir</Button>
      </div>

      <div className="p-4 space-y-6 max-w-2xl mx-auto">
        
        {/* Seção: Conta */}
        <div className="space-y-2">
          <h2 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase ml-1">
            Sua Conta
          </h2>
          <Card className="border-none shadow-sm">
            <CardContent className="p-0 divide-y dark:divide-gray-700">
              
              {onOpenProfile && (
                <button 
                  onClick={onOpenProfile}
                  className="w-full flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-left rounded-t-xl"
                >
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-full">
                      <User size={20} className="text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">Perfil do Concurso</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Alterar cargo ou banca</p>
                    </div>
                  </div>
                  <ChevronRight size={18} className="text-gray-400" />
                </button>
              )}

              <button 
                onClick={() => {
                  const newGoal = prompt(`Qual sua meta diária de questões?\n\nAtual: ${dailyGoal} questões/dia`, dailyGoal.toString());
                  if (newGoal && !isNaN(Number(newGoal))) {
                    const goal = Math.max(1, Math.min(1000, Number(newGoal)));
                    setDailyGoal(goal);
                    localStorage.setItem('alerr_settings', JSON.stringify({ dailyGoal: goal }));
                  }
                }}
                className="w-full flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-left rounded-b-xl"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-full">
                    <Target size={20} className="text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Meta Diária</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {dailyGoal} questões por dia
                    </p>
                  </div>
                </div>
                <ChevronRight size={18} className="text-gray-400" />
              </button>

            </CardContent>
          </Card>
        </div>

        {/* Seção: Aparência */}
        <div className="space-y-2">
          <h2 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase ml-1">
            App & Visual
          </h2>
          <Card className="border-none shadow-sm">
            <CardContent className="p-0 divide-y dark:divide-gray-700">
              
              {/* Botão de Tema (Dark Mode) */}
              <div className="flex items-center justify-between p-4 rounded-t-xl">
                <div className="flex items-center gap-3">
                  <div className="bg-purple-100 dark:bg-purple-900/30 p-2 rounded-full">
                    {isDarkMode ? <Moon size={20} className="text-purple-600 dark:text-purple-400" /> : <Sun size={20} className="text-purple-600 dark:text-purple-400" />}
                  </div>
                  <Label htmlFor="dark-mode" className="font-medium text-base cursor-pointer text-gray-900 dark:text-white">
                    Modo Escuro
                  </Label>
                </div>
                <Switch 
                  id="dark-mode" 
                  checked={isDarkMode} 
                  onCheckedChange={toggleDarkMode} 
                />
              </div>

              {/* Botão para Personalização Avançada */}
              {onOpenCustomization && (
                <button 
                  onClick={onOpenCustomization}
                  className="w-full flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-left rounded-b-xl"
                >
                  <div className="flex items-center gap-3">
                    <div className="bg-pink-100 dark:bg-pink-900/30 p-2 rounded-full">
                      <Palette size={20} className="text-pink-600 dark:text-pink-400" />
                    </div>
                    <span className="font-medium text-gray-900 dark:text-white">
                      Personalizar Cores & Temas
                    </span>
                  </div>
                  <ChevronRight size={18} className="text-gray-400" />
                </button>
              )}

            </CardContent>
          </Card>
        </div>

        {/* Seção: Preferências */}
        <div className="space-y-2">
          <h2 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase ml-1">
            Preferências
          </h2>
          <Card className="border-none shadow-sm">
            <CardContent className="p-0 divide-y dark:divide-gray-700">
              
              {/* Notificações - Abre tela dedicada se existir */}
              {onOpenNotifications ? (
                <button 
                  onClick={onOpenNotifications}
                  className="w-full flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-left rounded-t-xl"
                >
                  <div className="flex items-center gap-3">
                    <div className="bg-amber-100 dark:bg-amber-900/30 p-2 rounded-full">
                      <Bell size={20} className="text-amber-600 dark:text-amber-400" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        Notificações Inteligentes
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {notifications ? 'Ativadas' : 'Desativadas'}
                      </p>
                    </div>
                  </div>
                  <ChevronRight size={18} className="text-gray-400" />
                </button>
              ) : (
                <div className="flex items-center justify-between p-4 rounded-t-xl">
                  <div className="flex items-center gap-3">
                    <div className="bg-amber-100 dark:bg-amber-900/30 p-2 rounded-full">
                      <Bell size={20} className="text-amber-600 dark:text-amber-400" />
                    </div>
                    <Label htmlFor="notif" className="font-medium text-base cursor-pointer text-gray-900 dark:text-white">
                      Notificações Inteligentes
                    </Label>
                  </div>
                  <Switch 
                    id="notif" 
                    checked={notifications} 
                    onCheckedChange={setNotifications} 
                  />
                </div>
              )}

              <div className="flex items-center justify-between p-4 rounded-b-xl">
                <div className="flex items-center gap-3">
                  <div className="bg-orange-100 dark:bg-orange-900/30 p-2 rounded-full">
                    <Volume2 size={20} className="text-orange-600 dark:text-orange-400" />
                  </div>
                  <Label htmlFor="sound" className="font-medium text-base cursor-pointer text-gray-900 dark:text-white">
                    Efeitos Sonoros
                  </Label>
                </div>
                <Switch 
                  id="sound" 
                  checked={sound} 
                  onCheckedChange={setSound} 
                />
              </div>

            </CardContent>
          </Card>
        </div>

        {/* Seção: Zona de Perigo */}
        <div className="space-y-2">
          <h2 className="text-sm font-semibold text-red-500 dark:text-red-400 uppercase ml-1">
            Dados
          </h2>
          <Card className="border-red-100 dark:border-red-900 shadow-sm">
            <CardContent className="p-0 divide-y dark:divide-gray-700">
              
              <button 
                onClick={handleResetProgress}
                className="w-full flex items-center gap-3 p-4 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors text-red-600 dark:text-red-400 text-left rounded-t-xl"
              >
                <Trash2 size={20} />
                <div>
                  <p className="font-medium">Resetar todo o progresso</p>
                  <p className="text-xs text-red-500/70 dark:text-red-400/70">
                    Ação irreversível - cuidado!
                  </p>
                </div>
              </button>
              
              <button 
                onClick={handleLogout}
                className="w-full flex items-center gap-3 p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-gray-600 dark:text-gray-400 text-left rounded-b-xl"
              >
                <LogOut size={20} />
                <span className="font-medium">Sair da Conta</span>
              </button>
              
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <div className="text-center text-xs text-gray-400 dark:text-gray-500 mt-8 pb-8 space-y-1">
          <p className="font-semibold">Gabaritoo v1.0.0</p>
          <p>Sistema Inteligente de Estudos para Concursos</p>
          <p className="text-gray-400/70">Feito com ❤️ em Roraima 🇧🇷</p>
          <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
            <p className="text-green-600 dark:text-green-400 font-medium flex items-center justify-center gap-1">
              ✓ Todas as configurações são salvas automaticamente
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}