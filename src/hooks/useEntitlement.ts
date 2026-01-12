/**
 * HOOK - USE ENTITLEMENT
 * Hook para verificar permissões premium
 * PREMIUM GOVERNA O APP
 */

import { useContext, useMemo } from 'react';
import { AppStateContext } from '../context/AppState/AppStateContext';
import { EntitlementService } from '../domain/services/EntitlementService';

export function useEntitlement() {
  const { state } = useContext(AppStateContext);
  const user = state.user;

  // Memoiza os valores para evitar recálculos desnecessários
  const entitlement = useMemo(() => ({
    // Status geral
    isPremium: EntitlementService.isPremium(user),
    isExpired: EntitlementService.isExpired(user),
    isExpiringSoon: EntitlementService.isExpiringSoon(user),
    
    // Permissões específicas
    canAccessFilters: EntitlementService.canAccessFilters(user),
    canDownloadOffline: EntitlementService.canDownloadOffline(user),
    canAccessSimulados: EntitlementService.canAccessSimulados(user),
    canAccessFullStats: EntitlementService.canAccessFullStats(user),
    
    // Limites
    questionLimit: EntitlementService.getQuestionLimit(user),
    shouldShowAds: EntitlementService.shouldShowAds(user),
    supportLevel: EntitlementService.getSupportLevel(user),
    
    // Mensagens
    getBlockMessage: (feature: string) => EntitlementService.getBlockMessage(feature),
    
    // Dados do usuário
    user,
    plan: user.plan,
  }), [user]);

  return entitlement;
}
