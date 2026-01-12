/**
 * EXEMPLO DE USO - PREMIUM GATE (NOVA ARQUITETURA)
 * Demonstra como bloquear features premium usando EntitlementService
 * ✅ Premium GOVERNA o app
 */

import React, { useState } from 'react';
import { Lock, Zap } from 'lucide-react';
import { Button } from './ui/button';
import { useEntitlement } from '../hooks/useEntitlement';
import { UpgradeScreen } from './UpgradeScreen';

/**
 * Exemplo 1: Bloquear botão de Simulado
 */
export function SimuladoButton() {
  const [showUpgrade, setShowUpgrade] = useState(false);
  const { canAccessSimulados, getBlockMessage } = useEntitlement();

  const handleClick = () => {
    if (!canAccessSimulados) {
      setShowUpgrade(true);
      return;
    }

    // Abre tela de simulado
    console.log('Iniciar simulado');
  };

  return (
    <>
      <Button
        onClick={handleClick}
        className="relative"
      >
        {!canAccessSimulados && (
          <Lock className="w-4 h-4 mr-2" />
        )}
        Simulado
        {!canAccessSimulados && (
          <span className="ml-2 px-2 py-0.5 text-xs bg-amber-100 text-amber-700 rounded-full font-bold">
            Premium
          </span>
        )}
      </Button>

      {showUpgrade && (
        <div className="fixed inset-0 z-50 bg-background">
          <UpgradeScreen 
            onClose={() => setShowUpgrade(false)} 
            context="simulado" 
          />
        </div>
      )}
    </>
  );
}

/**
 * Exemplo 2: Bloquear seção de Filtros Avançados
 */
export function FiltrosAvancados() {
  const [showUpgrade, setShowUpgrade] = useState(false);
  const { canAccessFilters, getBlockMessage } = useEntitlement();

  if (!canAccessFilters) {
    return (
      <>
        <div 
          onClick={() => setShowUpgrade(true)}
          className="p-6 border-2 border-dashed border-border rounded-xl cursor-pointer hover:border-amber-400 transition-colors"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-lg bg-amber-100 text-amber-600">
              <Lock className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-foreground">Filtros Avançados</h3>
            <span className="px-2 py-0.5 text-xs bg-amber-100 text-amber-700 rounded-full font-bold">
              Premium
            </span>
          </div>
          <p className="text-sm text-muted-foreground">
            {getBlockMessage('filters')}
          </p>
        </div>

        {showUpgrade && (
          <div className="fixed inset-0 z-50 bg-background">
            <UpgradeScreen 
              onClose={() => setShowUpgrade(false)} 
              context="filtros" 
            />
          </div>
        )}
      </>
    );
  }

  // Se for premium, mostra filtros normais
  return (
    <div className="space-y-3">
      <h3 className="font-bold">Filtros Avançados</h3>
      <select className="w-full p-2 border rounded">
        <option>Todas as bancas</option>
        <option>FGV</option>
        <option>CESPE</option>
      </select>
      {/* ... outros filtros */}
    </div>
  );
}

/**
 * Exemplo 3: Mostrar limite de questões
 */
export function QuestionCounter({ current }: { current: number }) {
  const { questionLimit, isPremium } = useEntitlement();
  const percentage = (current / questionLimit) * 100;
  const isNearLimit = percentage > 80;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">Questões respondidas</span>
        <span className={isNearLimit ? 'text-amber-600 font-bold' : 'text-foreground'}>
          {current} / {questionLimit}
        </span>
      </div>
      
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <div 
          className={`h-full transition-all ${
            isNearLimit ? 'bg-amber-500' : 'bg-primary'
          }`}
          style={{ width: `${Math.min(percentage, 100)}%` }}
        />
      </div>

      {isNearLimit && !isPremium && (
        <p className="text-xs text-amber-600">
          ⚠️ Você está próximo do limite gratuito. Assine Premium para 10.000 questões!
        </p>
      )}
    </div>
  );
}

/**
 * Exemplo 4: Badge de Premium em qualquer lugar
 */
export function PremiumBadge() {
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-gradient-to-r from-amber-400 to-orange-500 text-white text-xs font-bold rounded-full shadow-sm">
      <Zap className="w-3 h-3" />
      Premium
    </span>
  );
}