/**
 * CORE - CONTROLE DE FEATURES
 * Decisor central de permissões (FREE vs PREMIUM)
 * 
 * ⚠️ REGRA DE OURO:
 * Nenhuma tela decide se algo é premium.
 * Tudo passa por aqui.
 */

import { authService } from '../services/AuthService';

export const FeatureGate = {
  /**
   * Pode usar simulados?
   */
  canUseSimulado(): boolean {
    return authService.isPremium();
  },

  /**
   * Pode usar filtros avançados?
   */
  canUseFiltrosAvancados(): boolean {
    return authService.isPremium();
  },

  /**
   * Pode usar modo offline?
   */
  canUseOffline(): boolean {
    return authService.isPremium();
  },

  /**
   * Pode ver métricas detalhadas?
   */
  canUseMetrics(): boolean {
    return authService.isPremium();
  },

  /**
   * Limite máximo de questões
   */
  maxQuestoes(): number {
    return authService.isPremium() ? 10000 : 100;
  },

  /**
   * Pode exportar dados?
   */
  canExportData(): boolean {
    return authService.isPremium();
  }
};
