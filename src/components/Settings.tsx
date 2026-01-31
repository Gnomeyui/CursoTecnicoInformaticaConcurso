/**
 * @file Settings.tsx (REFATORADO 10/10)
 * @description Componente de Configurações (UI Pura)
 * @pattern Presentation Component - Zero lógica de negócio
 */

import React from 'react';
import { 
  Bell, Trash2, LogOut, User, 
  ChevronRight, Palette, Clock, Shield, HelpCircle, ArrowLeft, Crown, Zap, Sparkles, RotateCcw, MessageSquare, Ticket
} from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Switch } from './ui/switch';
import { APP_THEMES } from '../lib/themeConfig';
import { UpgradeScreen } from './UpgradeScreen';
import { PlanSelector } from './PlanSelector';
import { useSettings } from '../hooks/useSettings';

/**
 * Props do Settings
 */
interface SettingsProps {
  onClose: () => void;
  onOpenCustomization?: () => void;
  onOpenProfile?: () => void;
  onOpenStudyPlan?: () => void;
  onOpenNotifications?: () => void;
}

/**
 * Componente de Settings
 * 
 * @component
 * @example
 * ```tsx
 * <Settings 
 *   onClose={() => navigate('/')} 
 *   onOpenProfile={() => setShowProfile(true)}
 * />
 * ```
 */
export function Settings({ 
  onClose, 
  onOpenCustomization, 
  onOpenProfile, 
  onOpenStudyPlan, 
  onOpenNotifications
}: SettingsProps) {
  
  // ============================================
  // HOOK (ÚNICA FONTE DE DADOS E LÓGICA)
  // ============================================
  const settings = useSettings(onClose);
  
  // ============================================
  // THEME
  // ============================================
  const themeData = APP_THEMES[settings.settings.colorTheme] || APP_THEMES.focus;

  // ============================================
  // MENU ITEM COMPONENT (DRY)
  // ============================================
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

  // ============================================
  // RENDER
  // ============================================
  return (
    <div className="min-h-screen bg-background pb-20 animate-in slide-in-from-right">
      
      {/* Plan Selector Modal */}
      {settings.showPlanSelector && (
        <div className="fixed inset-0 z-50 bg-background">
          <PlanSelector onClose={() => settings.setShowPlanSelector(false)} />
        </div>
      )}

      {/* Header */}
      <div className="bg-card/80 backdrop-blur-md px-6 py-5 border-b border-border sticky top-0 z-10 flex items-center gap-3">
        <button 
          onClick={onClose} 
          className="p-2 hover:bg-accent rounded-lg transition-colors -ml-2"
          aria-label="Voltar"
        >
          <ArrowLeft className="h-6 w-6 text-foreground" />
        </button>
        <h1 className="text-2xl font-black text-foreground tracking-tight">Ajustes</h1>
      </div>

      <div className="p-6 space-y-8 max-w-2xl mx-auto">
        
        {/* GRUPO 0: PLANO */}
        <section>
          <h2 className="text-xs font-bold text-muted-foreground uppercase ml-4 mb-3 tracking-widest">
            Assinatura
          </h2>
          <div className="bg-card border border-border rounded-[1.5rem] shadow-sm overflow-hidden">
            {settings.isPremium ? (
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

                    {settings.user?.premiumExpiresAt && (
                      <p className="text-xs text-muted-foreground mt-3 pt-3 border-t border-border">
                        Renovação: {new Date(settings.user.premiumExpiresAt).toLocaleDateString('pt-BR')}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              // Chamada para upgrade (FREE)
              <button
                onClick={() => settings.setShowPlanSelector(true)}
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
        
        {/* GRUPO 0.5: VOUCHER */}
        {!settings.isPremium && (
          <section>
            <h2 className="text-xs font-bold text-muted-foreground uppercase ml-4 mb-3 tracking-widest">
              Tem um cupom?
            </h2>
            <div className="bg-card border border-border rounded-[1.5rem] shadow-sm overflow-hidden p-6">
              <div className="flex items-start gap-4 mb-4">
                <div className="p-3 rounded-2xl bg-gradient-to-br from-purple-400 to-pink-500 shadow-lg">
                  <Ticket size={24} className="text-white" strokeWidth={2.5} />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-black text-foreground mb-1">Resgatar Voucher</h3>
                  <p className="text-sm text-muted-foreground">
                    Digite seu código promocional para ganhar acesso premium gratuitamente
                  </p>
                </div>
              </div>

              {/* Input de Voucher */}
              <div className="space-y-3">
                <div className="relative">
                  <input
                    type="text"
                    value={settings.voucherCode}
                    onChange={(e) => settings.setVoucherCode(e.target.value.toUpperCase())}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && !settings.isRedeeming) {
                        settings.handleRedeemVoucher();
                      }
                    }}
                    placeholder="Digite o código aqui"
                    disabled={settings.isRedeeming}
                    className="w-full px-4 py-3 border-2 border-border rounded-xl font-mono text-center text-lg font-bold tracking-widest uppercase bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-purple-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    maxLength={20}
                  />
                </div>

                <Button
                  onClick={settings.handleRedeemVoucher}
                  disabled={settings.isRedeeming || !settings.voucherCode.trim()}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-3 rounded-xl shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {settings.isRedeeming ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Validando...
                    </>
                  ) : (
                    '🎁 Resgatar Cupom'
                  )}
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  💡 Os cupons são válidos para uso único e concedem 1 mês ou 1 ano de acesso premium
                </p>
              </div>
            </div>
          </section>
        )}

        {/* GRUPO 1: ESTUDO */}
        <section>
          <h2 className="text-xs font-bold text-muted-foreground uppercase ml-4 mb-3 tracking-widest">
            Sua Rotina
          </h2>
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
          <h2 className="text-xs font-bold text-muted-foreground uppercase ml-4 mb-3 tracking-widest">
            Visual
          </h2>
          <div className="bg-card border border-border rounded-[1.5rem] shadow-sm overflow-hidden divide-y divide-border">
            {onOpenCustomization && (
              <MenuItem 
                icon={Palette} 
                label="Tema de Cores" 
                desc={`Atual: ${themeData.name}`}
                onClick={onOpenCustomization}
                colorClass="bg-pink-100 dark:bg-pink-500/20 text-pink-600 dark:text-pink-400"
              />
            )}
          </div>
        </section>

        {/* GRUPO 3: SISTEMA */}
        <section>
          <h2 className="text-xs font-bold text-muted-foreground uppercase ml-4 mb-3 tracking-widest">
            App
          </h2>
          <div className="bg-card border border-border rounded-[1.5rem] shadow-sm overflow-hidden divide-y divide-border">
            <MenuItem 
              icon={MessageSquare} 
              label="Enviar Sugestões e Feedback" 
              desc="Compartilhe suas ideias e solicite provas"
              onClick={() => {
                const phoneNumber = '5595991234567';
                const message = encodeURIComponent('Olá! Gostaria de enviar uma sugestão para o Gabaritoo:\n\n');
                window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
              }}
              colorClass="bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400"
            />
            <MenuItem 
              icon={HelpCircle} 
              label="Ajuda e Suporte" 
              desc="Fale conosco pelo WhatsApp"
              onClick={() => {
                const phoneNumber = '5595991234567';
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
          <h2 className="text-xs font-bold text-red-500 dark:text-red-400 uppercase ml-4 mb-3 tracking-widest">
            Zona de Perigo
          </h2>
          <div className="bg-card border border-red-200 dark:border-red-800 rounded-[1.5rem] shadow-sm overflow-hidden divide-y divide-border">
            <MenuItem 
              icon={RotateCcw} 
              label="Resetar Configurações" 
              desc="Volta para o padrão (mantém seu progresso)"
              onClick={settings.handleResetSettings}
              colorClass="bg-orange-100 dark:bg-orange-500/20 text-orange-600 dark:text-orange-400"
            />
            <MenuItem 
              icon={Trash2} 
              label="Resetar Progresso" 
              desc="Apaga todos os dados (irreversível)"
              onClick={settings.handleResetProgress}
              colorClass="bg-red-100 dark:bg-red-500/20 text-red-600 dark:text-red-400"
            />
            <MenuItem 
              icon={LogOut} 
              label="Sair da Conta" 
              colorClass="bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300"
              onClick={settings.handleLogout}
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

export default Settings;
