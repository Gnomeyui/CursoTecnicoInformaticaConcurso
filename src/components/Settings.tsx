import React, { useState } from 'react';
import { 
  Bell, Trash2, LogOut, User, 
  ChevronRight, Palette, Clock, Shield, HelpCircle, ArrowLeft, Crown, Zap, Sparkles,
  Moon, Sun
} from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Switch } from './ui/switch';
import { useCustomization } from '../context/CustomizationContext';
import { useTheme } from '../context/ThemeContext';
import { APP_THEMES } from '../lib/themeConfig';
import { authService } from '../services/AuthService';
import { UpgradeScreen } from './UpgradeScreen';
import { PlanSelector } from './PlanSelector';

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
  
  const { settings } = useCustomization();
  const { isDarkMode, toggleDarkMode } = useTheme(); // Hook do Dark Mode
  const theme = APP_THEMES[settings.colorTheme] || APP_THEMES.focus;
  const [showPlanSelector, setShowPlanSelector] = useState(false);
  
  const isPremium = authService.isPremium();
  const user = authService.getUser();
  const plan = authService.getPlan();

  // Log para debug
  console.log('⚙️ Settings Mounted - isDarkMode:', isDarkMode);

  const handleCancelSubscription = () => {
    if (confirm('⚠️ Tem certeza que deseja cancelar sua assinatura?\n\nVocê perderá acesso a todos os recursos premium.')) {
      authService.cancelSubscription();
      alert('Assinatura cancelada. Você voltou para o plano FREE.');
      window.location.reload();
    }
  };

  const handleResetProgress = () => {
    if (window.confirm('⚠️ ATENÇÃO! Isso vai apagar TODAS as suas estatísticas, XP, nível e histórico de questões. Esta ação é IRREVERSÍVEL!\n\nTem certeza que deseja continuar?')) {
      if (window.confirm('✋ Última confirmação: TODOS os seus dados serão perdidos permanentemente. Deseja realmente resetar?')) {
        // 🗑️ LISTA COMPLETA DE TODAS AS CHAVES DO LOCALSTORAGE
        const keysToRemove = [
          // Estado Global
          'gabaritoo_app_state',
          
          // Gamificação
          'alerr_game_data',
          
          // Estatísticas
          'alerr_stats',
          
          // Questões
          'alerr_wrong_questions',
          'alerr_answered_questions',
          
          // Perfil e Settings
          'concurso_profiles',
          'concurso_active_profile',
          'alerr_concurso_profile',
          'alerr_settings',
          
          // Customização
          'alerr_customization',
          
          // Notificações
          'alerr_notifications',
          'alerr_notifications_enabled',
          'alerr_last_scheduled',
          'smart_notification_config',
          'pending_questions',
          
          // Plano de Estudos
          'studyPlan',
          
          // Simulados
          'exam_backup',
          'exam_history',
          
          // Tutorial/Onboarding
          'hasSeenTutorial_v3',
          'hasSeenOnboarding',
          
          // Tema
          'alerr_theme'
        ];
        
        // Remover todas as chaves
        keysToRemove.forEach(key => {
          try {
            localStorage.removeItem(key);
          } catch (e) {
            console.error(`Erro ao remover ${key}:`, e);
          }
        });
        
        // Limpar TUDO do localStorage (garantia absoluta)
        try {
          localStorage.clear();
        } catch (e) {
          console.error('Erro ao limpar localStorage:', e);
        }
        
        alert('✅ TODOS os dados foram apagados! A página será recarregada.');
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
            <p className="font-bold text-foreground text-sm">{label}</p>
            {desc && <p className="text-xs text-muted-foreground mt-0.5">{desc}</p>}
          </div>
        </div>
        {activeToggle !== undefined ? (
          <div>{activeToggle}</div>
        ) : (
          <ChevronRight size={18} className="text-muted-foreground group-hover:text-foreground transition-colors" />
        )}
      </>
    );

    // Se tem toggle (Switch), usa div ao invés de button
    if (activeToggle !== undefined) {
      return (
        <div className="w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-all group">
          {content}
        </div>
      );
    }

    // Se é clicável, usa button
    return (
      <button 
        onClick={onClick}
        className="w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-all active:scale-[0.98] group"
      >
        {content}
      </button>
    );
  };

  return (
    <div className="min-h-screen bg-background pb-20 animate-in slide-in-from-right">
      
      {/* Se showPlanSelector estiver ativo, mostra tela de seleção de plano */}
      {showPlanSelector && (
        <div className="fixed inset-0 z-50 bg-background">
          <PlanSelector onClose={() => setShowPlanSelector(false)} />
        </div>
      )}

      {/* Header */}
      <div className="bg-card/80 backdrop-blur-md px-6 py-5 border-b border-border sticky top-0 z-10 flex items-center gap-3">
        <button 
          onClick={onClose} 
          className="p-2 hover:bg-accent rounded-lg transition-colors -ml-2"
        >
          <ArrowLeft className="h-6 w-6 text-foreground" />
        </button>
        <h1 className="text-2xl font-black text-foreground tracking-tight">Ajustes</h1>
      </div>

      <div className="p-6 space-y-8 max-w-2xl mx-auto">
        
        {/* GRUPO 0: PLANO (NOVO) */}
        <section>
          <h2 className="text-xs font-bold text-muted-foreground uppercase ml-4 mb-3 tracking-widest">Assinatura</h2>
          <div className="bg-card border border-border rounded-[1.5rem] shadow-sm overflow-hidden">
            {isPremium ? (
              // Status PREMIUM
              <div className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 shadow-lg">
                    <Crown size={24} className="text-white" strokeWidth={2.5} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-lg font-black text-foreground">Gabaritoo Premium</h3>
                      <span className="px-2 py-0.5 text-xs font-bold bg-amber-100 dark:bg-amber-500/20 text-amber-700 dark:text-amber-400 rounded-full">
                        Ativo
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      Você tem acesso completo a todos os recursos
                    </p>
                    
                    {/* Benefícios ativos */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                        <span>Estudo offline ilimitado</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                        <span>Filtros avançados por banca e cargo</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                        <span>Simulados cronometrados</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                        <span>Até 10.000 questões disponíveis</span>
                      </div>
                    </div>

                    {user?.premiumExpiresAt && (
                      <p className="text-xs text-muted-foreground mt-3 pt-3 border-t border-border">
                        Renovação: {new Date(user.premiumExpiresAt).toLocaleDateString('pt-BR')}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              // Chamada para upgrade (FREE)
              <button
                onClick={() => setShowPlanSelector(true)}
                className="w-full p-6 hover:bg-muted/50 transition-all active:scale-[0.98] text-left"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 shadow-lg">
                    <Zap size={24} className="text-white" strokeWidth={2.5} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="text-lg font-black text-foreground">Assinar Premium</h3>
                      <ChevronRight size={20} className="text-muted-foreground" />
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      Desbloqueie todos os recursos por <span className="font-bold text-foreground">R$ 9,90/mês</span>
                    </p>
                    
                    <div className="flex flex-wrap gap-2">
                      <span className="px-2.5 py-1 text-xs font-medium bg-muted text-foreground rounded-lg">
                        📚 10.000 questões
                      </span>
                      <span className="px-2.5 py-1 text-xs font-medium bg-muted text-foreground rounded-lg">
                        ✈️ Estudo offline
                      </span>
                      <span className="px-2.5 py-1 text-xs font-medium bg-muted text-foreground rounded-lg">
                        🎯 Simulados ilimitados
                      </span>
                    </div>
                  </div>
                </div>
              </button>
            )}
          </div>
        </section>
        
        {/* GRUPO 1: ESTUDO */}
        <section>
          <h2 className="text-xs font-bold text-muted-foreground uppercase ml-4 mb-3 tracking-widest">Sua Rotina</h2>
          <div className="bg-card border border-border rounded-[1.5rem] shadow-sm overflow-hidden divide-y divide-border">
            {onOpenProfile && (
              <MenuItem 
                icon={User} 
                label="Perfil de Concurso" 
                desc="Cargo, banca e nível" 
                onClick={onOpenProfile}
                colorClass="bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400"
              />
            )}
            {onOpenStudyPlan && (
              <MenuItem 
                icon={Clock} 
                label="Plano de Estudos" 
                desc="Metas diárias e intervalos" 
                onClick={onOpenStudyPlan}
                colorClass="bg-orange-100 dark:bg-orange-500/20 text-orange-600 dark:text-orange-400"
              />
            )}
          </div>
        </section>

        {/* GRUPO 2: APARÊNCIA */}
        <section>
          <h2 className="text-xs font-bold text-muted-foreground uppercase ml-4 mb-3 tracking-widest">Visual</h2>
          <div className="bg-card border border-border rounded-[1.5rem] shadow-sm overflow-hidden divide-y divide-border">
            {/* MODO ESCURO - BOTÃO FUNCIONAL */}
            <MenuItem 
              icon={isDarkMode ? Moon : Sun}
              label="Modo Escuro" 
              desc={isDarkMode ? 'Ativado' : 'Desativado'}
              activeToggle={
                <Switch 
                  checked={isDarkMode}
                  onCheckedChange={() => {
                    console.log('🎨 Switch Toggle - Before:', isDarkMode);
                    toggleDarkMode();
                  }}
                />
              }
              colorClass={isDarkMode ? 'bg-slate-800 text-slate-200' : 'bg-orange-100 text-orange-500'}
            />
            {onOpenCustomization && (
              <MenuItem 
                icon={Palette} 
                label="Tema de Cores" 
                desc={`Atual: ${theme.name}`}
                onClick={onOpenCustomization}
                colorClass="bg-pink-100 dark:bg-pink-500/20 text-pink-600 dark:text-pink-400"
              />
            )}
          </div>
        </section>

        {/* GRUPO 3: SISTEMA */}
        <section>
          <h2 className="text-xs font-bold text-muted-foreground uppercase ml-4 mb-3 tracking-widest">App</h2>
          <div className="bg-card border border-border rounded-[1.5rem] shadow-sm overflow-hidden divide-y divide-border">
            {/* Notificações Inteligentes removidas - disponível em Meu Plano */}
            <MenuItem 
              icon={HelpCircle} 
              label="Ajuda e Suporte" 
              desc="Fale conosco pelo WhatsApp"
              onClick={() => {
                // Abrir WhatsApp (substitua pelo número real)
                const phoneNumber = '5595991234567'; // Formato: código país + DDD + número
                const message = encodeURIComponent('Olá! Preciso de ajuda com o Gabaritoo.');
                window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
              }}
              colorClass="bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300"
            />
            <MenuItem 
              icon={HelpCircle} 
              label="Ver Introdução Novamente" 
              desc="Reveja a tela de boas-vindas inicial"
              onClick={() => {
                localStorage.removeItem('hasSeenOnboarding');
                window.location.reload();
              }}
              colorClass="bg-indigo-100 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400"
            />
          </div>
        </section>

        {/* GRUPO 4: ZONA DE PERIGO */}
        <section>
          <h2 className="text-xs font-bold text-red-500 dark:text-red-400 uppercase ml-4 mb-3 tracking-widest">Zona de Perigo</h2>
          <div className="bg-card border border-red-200 dark:border-red-800 rounded-[1.5rem] shadow-sm overflow-hidden divide-y divide-border">
            <MenuItem 
              icon={Trash2} 
              label="Resetar Progresso" 
              desc="Apaga todos os dados (irreversível)"
              onClick={handleResetProgress}
              colorClass="bg-red-100 dark:bg-red-500/20 text-red-600 dark:text-red-400"
            />
            <MenuItem 
              icon={LogOut} 
              label="Sair da Conta" 
              colorClass="bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300"
              onClick={handleLogout}
            />
          </div>
        </section>

        <p className="text-center text-xs text-muted-foreground pt-4">
          Gabaritoo v2.0 • Feito com ❤️ em Roraima 🇧🇷
        </p>

      </div>
    </div>
  );
}