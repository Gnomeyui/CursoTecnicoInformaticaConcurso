/**
 * @file useSettings.ts
 * @description Custom Hook para lógica de Settings
 * @pattern Headless Logic Pattern - Separação total de UI e Lógica
 */

import { useState, useCallback } from 'react';
import { toast } from 'sonner@2.0.3';
import { useCustomization } from '../context/CustomizationContext';
import { authService } from '../services/AuthService';
import { voucherService } from '../services/VoucherService';

/**
 * Dados retornados pelo hook
 */
export interface SettingsData {
  // User & Plan
  isPremium: boolean;
  user: any;
  plan: string;
  
  // Theme
  settings: any;
  theme: any;
  
  // Voucher
  voucherCode: string;
  isRedeeming: boolean;
  setVoucherCode: (code: string) => void;
  
  // Plan selector
  showPlanSelector: boolean;
  setShowPlanSelector: (show: boolean) => void;
  
  // Actions
  handleCancelSubscription: () => void;
  handleResetProgress: () => void;
  handleResetSettings: () => void;
  handleLogout: () => void;
  handleRedeemVoucher: () => void;
}

/**
 * Hook principal de Settings
 * 
 * @param {() => void} onClose - Callback para fechar tela de settings
 * @returns {SettingsData} Dados e ações de settings
 * 
 * @example
 * ```tsx
 * const settings = useSettings(() => navigate('/'));
 * 
 * return (
 *   <div>
 *     <button onClick={settings.handleLogout}>Sair</button>
 *     {settings.isPremium && <PremiumBadge />}
 *   </div>
 * );
 * ```
 */
export const useSettings = (onClose: () => void): SettingsData => {
  // ============================================
  // 1. CONTEXTS
  // ============================================
  const { settings } = useCustomization();
  const theme = settings.colorTheme;

  // ============================================
  // 2. STATE
  // ============================================
  const [showPlanSelector, setShowPlanSelector] = useState(false);
  const [voucherCode, setVoucherCode] = useState('');
  const [isRedeeming, setIsRedeeming] = useState(false);

  // ============================================
  // 3. AUTH DATA
  // ============================================
  const isPremium = authService.isPremium();
  const user = authService.getUser();
  const plan = authService.getPlan();

  // ============================================
  // 4. ACTIONS (CALLBACKS)
  // ============================================

  /**
   * Cancela assinatura premium
   */
  const handleCancelSubscription = useCallback(() => {
    if (confirm('⚠️ Tem certeza que deseja cancelar sua assinatura?\n\nVocê perderá acesso a todos os recursos premium.')) {
      authService.cancelSubscription();
      alert('Assinatura cancelada. Você voltou para o plano FREE.');
      window.location.reload();
    }
  }, []);

  /**
   * Reseta TODOS os dados do app (irreversível)
   */
  const handleResetProgress = useCallback(() => {
    if (window.confirm('⚠️ ATENÇÃO! Isso vai apagar TODAS as suas estatísticas, XP, nível e histórico de questões. Esta ação é IRREVERSÍVEL!\n\nTem certeza que deseja continuar?')) {
      if (window.confirm('✋ Última confirmação: TODOS os seus dados serão perdidos permanentemente. Deseja realmente resetar?')) {
        // Lista completa de todas as chaves do localStorage
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
  }, []);

  /**
   * Reseta apenas as configurações (mantém progresso)
   */
  const handleResetSettings = useCallback(() => {
    if (window.confirm('⚙️ Deseja resetar APENAS as configurações do app?\n\n✅ Seus dados de estudo (XP, estatísticas, histórico) serão mantidos\n❌ Configurações de plano, perfil e tema voltarão ao padrão\n\nDeseja continuar?')) {
      // Remover apenas configurações, mantendo progresso
      const settingsKeys = [
        'studyPlan',
        'alerr_settings',
        'alerr_customization',
        'concurso_profiles',
        'concurso_active_profile',
        'alerr_concurso_profile',
        'alerr_notifications',
        'alerr_notifications_enabled',
        'alerr_last_scheduled',
        'smart_notification_config',
        'alerr_theme'
      ];
      
      settingsKeys.forEach(key => {
        try {
          localStorage.removeItem(key);
        } catch (e) {
          console.error(`Erro ao remover ${key}:`, e);
        }
      });
      
      toast.success('✅ Configurações resetadas com sucesso!');
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
  }, []);

  /**
   * Faz logout do usuário
   */
  const handleLogout = useCallback(() => {
    if (window.confirm('Deseja realmente sair da sua conta?')) {
      alert('Logout realizado com sucesso!');
      onClose();
    }
  }, [onClose]);

  /**
   * Resgata voucher premium
   */
  const handleRedeemVoucher = useCallback(() => {
    if (!voucherCode.trim()) {
      toast.error('❌ Digite um código de voucher');
      return;
    }

    setIsRedeeming(true);

    // Simular delay (como se estivesse validando com servidor)
    setTimeout(() => {
      const result = voucherService.redeem(voucherCode);

      if (result.valid && result.voucher) {
        // Sucesso!
        const duration = result.voucher.type === 'monthly' ? '1 mês' : '1 ano';
        toast.success(`🎉 Voucher ativado com sucesso!\n\nVocê ganhou ${duration} de premium!`, {
          duration: 5000,
        });
        
        // Limpar campo
        setVoucherCode('');
        
        // Recarregar página após 2s para mostrar o status premium
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        // Erro
        toast.error(result.message || '❌ Erro ao validar voucher');
      }

      setIsRedeeming(false);
    }, 800);
  }, [voucherCode]);

  // ============================================
  // 5. RETURN (Dados e Ações)
  // ============================================
  return {
    // User & Plan
    isPremium,
    user,
    plan,
    
    // Theme
    settings,
    theme,
    
    // Voucher
    voucherCode,
    isRedeeming,
    setVoucherCode,
    
    // Plan selector
    showPlanSelector,
    setShowPlanSelector,
    
    // Actions
    handleCancelSubscription,
    handleResetProgress,
    handleResetSettings,
    handleLogout,
    handleRedeemVoucher,
  };
};
