/**
 * EXEMPLO - PREMIUM GATE
 * Exemplo de como usar EntitlementService para bloquear features
 */

import React from 'react';
import { useEntitlement } from '../../hooks/useEntitlement';
import { Button } from '../ui/button';
import { Lock } from 'lucide-react';

interface PremiumGateProps {
  feature: 'filters' | 'offline' | 'simulados' | 'stats';
  children: React.ReactNode;
}

/**
 * Componente que bloqueia conteúdo para usuários free
 * Uso:
 * 
 * <PremiumGate feature="filters">
 *   <AdvancedFilters />
 * </PremiumGate>
 */
export function PremiumGate({ feature, children }: PremiumGateProps) {
  const entitlement = useEntitlement();

  // Mapeia feature para a permissão correspondente
  const hasAccess = {
    filters: entitlement.canAccessFilters,
    offline: entitlement.canDownloadOffline,
    simulados: entitlement.canAccessSimulados,
    stats: entitlement.canAccessFullStats,
  }[feature];

  // Se tem acesso, mostra o conteúdo
  if (hasAccess) {
    return <>{children}</>;
  }

  // Caso contrário, mostra banner de upgrade
  return (
    <div className="flex flex-col items-center justify-center p-8 bg-muted/50 rounded-xl border-2 border-dashed border-border">
      <Lock className="w-12 h-12 text-muted-foreground mb-4" />
      <p className="text-center text-sm text-muted-foreground mb-4">
        {entitlement.getBlockMessage(feature)}
      </p>
      <Button variant="default" size="sm">
        Ver Planos Premium
      </Button>
    </div>
  );
}

/**
 * Exemplo de uso em componentes:
 * 
 * // Filtros Avançados
 * <PremiumGate feature="filters">
 *   <FilterPanel />
 * </PremiumGate>
 * 
 * // Simulados
 * <PremiumGate feature="simulados">
 *   <SimulatedExamList />
 * </PremiumGate>
 * 
 * // Estatísticas Completas
 * <PremiumGate feature="stats">
 *   <AdvancedStatistics />
 * </PremiumGate>
 */
