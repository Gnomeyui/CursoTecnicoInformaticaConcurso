/**
 * TELA DE UPGRADE
 * Converte FREE → PREMIUM (redireciona para PlanSelector)
 */

import React, { useState } from 'react';
import { ArrowLeft, Check, Zap, Crown } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { PlanSelector } from './PlanSelector';

interface UpgradeScreenProps {
  onClose: () => void;
  context?: 'simulado' | 'filtros' | 'offline' | 'metricas' | 'geral';
}

export function UpgradeScreen({ onClose, context = 'geral' }: UpgradeScreenProps) {
  const [showPlanSelector, setShowPlanSelector] = useState(false);

  if (showPlanSelector) {
    return <PlanSelector onClose={onClose} />;
  }
  
  const contextMessages = {
    simulado: 'Desbloqueie simulados cronometrados',
    filtros: 'Use filtros por banca, cargo e disciplina',
    offline: 'Estude offline em qualquer lugar',
    metricas: 'Veja suas estatísticas detalhadas',
    geral: 'Estude sem limites'
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-card/80 backdrop-blur-md px-6 py-5 border-b border-border sticky top-0 z-10 flex items-center gap-3">
        <button 
          onClick={onClose} 
          className="p-2 hover:bg-accent rounded-lg transition-colors -ml-2"
        >
          <ArrowLeft className="h-6 w-6 text-foreground" />
        </button>
        <h1 className="text-2xl font-black text-foreground tracking-tight">Premium</h1>
      </div>

      <div className="p-6 max-w-md mx-auto space-y-6">
        
        {/* Destaque do contexto */}
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 mb-4">
            <Zap className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-2">
            {contextMessages[context]}
          </h2>
          <p className="text-muted-foreground">
            a partir de <span className="text-2xl font-black text-foreground">R$ 7,00</span>/mês
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            no plano anual
          </p>
        </div>

        {/* Benefícios */}
        <Card className="p-6">
          <h3 className="font-bold text-foreground mb-4">O que você ganha:</h3>
          <div className="space-y-3">
            <BenefitItem text="Estudo offline (ônibus, interior, sem internet)" />
            <BenefitItem text="Filtros por banca, cargo e disciplina" />
            <BenefitItem text="Estatísticas detalhadas dos seus erros" />
            <BenefitItem text="Simulados cronometrados ilimitados" />
            <BenefitItem text="Até 10.000 questões disponíveis" />
            <BenefitItem text="Recomendações inteligentes de estudo" />
            <BenefitItem text="Sem anúncios" />
          </div>
        </Card>

        {/* Opções de Plano */}
        <div className="space-y-3">
          {/* Plano Anual - Destaque */}
          <button
            onClick={() => setShowPlanSelector(true)}
            className="w-full p-4 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 rounded-xl text-white shadow-lg transition-all active:scale-[0.98]"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Crown className="w-5 h-5" />
                <span className="font-bold">Plano Anual</span>
              </div>
              <span className="px-2 py-0.5 bg-white/20 rounded-full text-xs font-bold">
                Economize 30%
              </span>
            </div>
            <div className="text-left">
              <p className="text-2xl font-black">R$ 84/ano</p>
              <p className="text-sm opacity-90">Apenas R$ 7,00 por mês</p>
            </div>
          </button>

          {/* Plano Mensal */}
          <button
            onClick={() => setShowPlanSelector(true)}
            className="w-full p-4 bg-card border-2 border-border hover:border-amber-400 rounded-xl transition-all active:scale-[0.98]"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="font-bold text-foreground text-left">Plano Mensal</p>
                <p className="text-sm text-muted-foreground text-left">R$ 9,90 por mês</p>
              </div>
              <Zap className="w-5 h-5 text-amber-500" />
            </div>
          </button>
        </div>

        <p className="text-center text-xs text-muted-foreground">
          ✓ Cancele quando quiser • Pagamento seguro
        </p>
      </div>
    </div>
  );
}

function BenefitItem({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-green-100 dark:bg-green-500/20 flex items-center justify-center">
        <Check className="w-3 h-3 text-green-600 dark:text-green-400" strokeWidth={3} />
      </div>
      <p className="text-sm text-foreground">{text}</p>
    </div>
  );
}