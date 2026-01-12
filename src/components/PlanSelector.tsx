/**
 * SELETOR DE PLANOS
 * Tela de escolha entre FREE, MENSAL e ANUAL
 */

import React, { useState } from 'react';
import { ArrowLeft, Check, Zap, Crown, Sparkles } from 'lucide-react';
import { Button } from './ui/button';
import { authService } from '../services/AuthService';

interface PlanSelectorProps {
  onClose: () => void;
}

export function PlanSelector({ onClose }: PlanSelectorProps) {
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'annual'>('annual');

  const handleSubscribe = (plan: 'monthly' | 'annual') => {
    // 🚧 FUTURO: Integração com Google Play Billing
    const confirmMessage = 
      plan === 'annual'
        ? '🚧 Sistema de pagamento em desenvolvimento.\n\nAtivar plano ANUAL (R$ 84/ano) para testes?'
        : '🚧 Sistema de pagamento em desenvolvimento.\n\nAtivar plano MENSAL (R$ 9,90/mês) para testes?';

    if (confirm(confirmMessage)) {
      if (plan === 'annual') {
        authService.activateAnnual();
        alert('✅ Plano ANUAL ativado! (modo teste)\nVocê economizou 30% 🎉');
      } else {
        authService.activateMonthly();
        alert('✅ Plano MENSAL ativado! (modo teste)');
      }
      onClose();
      window.location.reload();
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card/80 backdrop-blur-md px-6 py-5 border-b border-border sticky top-0 z-10 flex items-center gap-3">
        <button 
          onClick={onClose} 
          className="p-2 hover:bg-accent rounded-lg transition-colors -ml-2"
        >
          <ArrowLeft className="h-6 w-6 text-foreground" />
        </button>
        <h1 className="text-2xl font-black text-foreground tracking-tight">Escolha seu plano</h1>
      </div>

      <div className="p-4 max-w-4xl mx-auto space-y-4 pb-32 h-[calc(100vh-80px)] overflow-y-auto">
        
        {/* Badge de economia */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 border border-green-300 dark:border-green-700 rounded-full">
            <Sparkles className="w-3.5 h-3.5 text-green-600 dark:text-green-400" />
            <span className="text-xs font-bold text-green-700 dark:text-green-300">
              Economize 30% com o plano anual
            </span>
          </div>
        </div>

        {/* PLANOS PREMIUM - Lado a Lado COMPACTOS */}
        <div className="grid grid-cols-2 gap-3">
          
          {/* PLANO MENSAL */}
          <div 
            className={`relative bg-card border-2 rounded-xl p-3 flex flex-col transition-all cursor-pointer ${
              selectedPlan === 'monthly' 
                ? 'border-amber-500 shadow-lg shadow-amber-500/20' 
                : 'border-border hover:border-amber-300'
            }`}
            onClick={() => setSelectedPlan('monthly')}
          >
            {selectedPlan === 'monthly' && (
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-amber-500 text-white text-[10px] font-bold rounded-full">
                Selecionado
              </div>
            )}

            <div className="mb-2">
              <div className="inline-flex items-center gap-1 px-2 py-0.5 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 rounded-full mb-1.5">
                <Zap className="w-2.5 h-2.5" />
                <span className="text-[10px] font-bold">Popular</span>
              </div>
              <h3 className="text-sm font-black text-foreground mb-0.5">Mensal</h3>
              <p className="text-xl font-black text-foreground">R$ 9,90</p>
              <p className="text-[10px] text-muted-foreground">por mês</p>
            </div>

            <div className="flex-1 space-y-1.5 mb-3">
              <FeatureCompact text="10.000 questões" premium />
              <FeatureCompact text="Estudo offline ilimitado" premium />
              <FeatureCompact text="Filtros avançados" premium />
              <FeatureCompact text="Simulados cronometrados" premium />
              <FeatureCompact text="Estatísticas completas" premium />
              <FeatureCompact text="Sem anúncios" premium />
            </div>

            <Button 
              onClick={() => handleSubscribe('monthly')}
              className="w-full bg-amber-500 hover:bg-amber-600 h-8 text-xs"
            >
              Assinar Mensal
            </Button>
          </div>

          {/* PLANO ANUAL - RECOMENDADO */}
          <div 
            className={`relative bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-950/50 dark:to-amber-950/50 border-2 rounded-xl p-3 flex flex-col transition-all cursor-pointer ${
              selectedPlan === 'annual' 
                ? 'border-orange-500 shadow-xl shadow-orange-500/30' 
                : 'border-orange-300 dark:border-orange-700 hover:border-orange-400'
            }`}
            onClick={() => setSelectedPlan('annual')}
          >
            {/* Badge de melhor oferta */}
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-gradient-to-r from-orange-500 to-red-500 text-white text-[10px] font-black rounded-full shadow-lg">
              🔥 MELHOR OFERTA
            </div>

            {selectedPlan === 'annual' && (
              <div className="absolute top-2 right-2">
                <div className="w-4 h-4 rounded-full bg-orange-500 flex items-center justify-center">
                  <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />
                </div>
              </div>
            )}

            <div className="mb-2 mt-1">
              <div className="inline-flex items-center gap-1 px-2 py-0.5 bg-orange-100 dark:bg-orange-900/50 text-orange-700 dark:text-orange-300 rounded-full mb-1.5">
                <Crown className="w-2.5 h-2.5" />
                <span className="text-[10px] font-bold">Mais Economia</span>
              </div>
              <h3 className="text-sm font-black text-foreground mb-0.5">Anual</h3>
              <div className="flex items-baseline gap-1">
                <p className="text-xl font-black text-foreground">R$ 84</p>
                <span className="text-[9px] text-muted-foreground line-through">R$ 118,80</span>
              </div>
              <p className="text-[10px] text-muted-foreground">por ano</p>
              <div className="mt-1 px-2 py-1 bg-green-100 dark:bg-green-900/30 border border-green-300 dark:border-green-700 rounded-md inline-block">
                <p className="text-[10px] font-bold text-green-700 dark:text-green-400">
                  Apenas R$ 7,00/mês
                </p>
                <p className="text-[9px] text-green-600 dark:text-green-500">
                  Economia de R$ 34,80/ano
                </p>
              </div>
            </div>

            <div className="flex-1 space-y-1.5 mb-3">
              <FeatureCompact text="10.000 questões" premium highlighted />
              <FeatureCompact text="Estudo offline ilimitado" premium highlighted />
              <FeatureCompact text="Filtros avançados" premium highlighted />
              <FeatureCompact text="Simulados cronometrados" premium highlighted />
              <FeatureCompact text="Estatísticas completas" premium highlighted />
              <FeatureCompact text="Sem anúncios" premium highlighted />
              <FeatureCompact text="Suporte prioritário" premium highlighted />
              <FeatureCompact text="30% de desconto" premium highlighted />
            </div>

            <Button 
              onClick={() => handleSubscribe('annual')}
              className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold shadow-lg h-8 text-xs"
            >
              Assinar Anual
            </Button>
          </div>

        </div>

        {/* Divisor */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="px-4 text-xs text-muted-foreground bg-background">ou continue com</span>
          </div>
        </div>

        {/* PLANO FREE - Largura Total */}
        <div className="bg-card border-2 border-border rounded-2xl p-6">
          <div className="flex items-start gap-6">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-muted rounded-full mb-3">
                <span className="text-sm font-bold text-muted-foreground">Gratuito</span>
              </div>
              <h3 className="text-2xl font-black text-foreground mb-1">Plano Free</h3>
              <p className="text-3xl font-black text-foreground mb-1">R$ 0</p>
              <p className="text-sm text-muted-foreground mb-4">para sempre</p>
              
              <div className="grid grid-cols-2 gap-x-6 gap-y-2">
                <Feature text="100 questões" />
                <Feature text="Estudo básico" />
                <Feature text="Estatísticas simples" />
                <Feature text="Sem filtros avançados" disabled />
                <Feature text="Sem modo offline" disabled />
                <Feature text="Sem simulados" disabled />
              </div>
            </div>
            
            <div className="flex items-center">
              <Button 
                variant="outline" 
                className="px-8"
                disabled
              >
                Plano atual
              </Button>
            </div>
          </div>
        </div>

        {/* Garantia */}
        <div className="text-center space-y-2 pt-4">
          <p className="text-sm text-muted-foreground">
            ✓ Cancele quando quiser • Pagamento seguro • Sem taxas ocultas
          </p>
          <p className="text-xs text-muted-foreground">
            🔒 Seus dados são protegidos e criptografados
          </p>
        </div>

        {/* Tabela de Comparação Detalhada */}
        <div className="bg-card border border-border rounded-2xl p-6 mt-8">
          <h3 className="text-lg font-bold text-foreground mb-4">Comparação completa</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 text-muted-foreground font-medium">Recurso</th>
                  <th className="text-center py-3 text-muted-foreground font-medium">Free</th>
                  <th className="text-center py-3 text-muted-foreground font-medium">Mensal</th>
                  <th className="text-center py-3 text-orange-600 font-bold">Anual</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                <ComparisonRow feature="Questões disponíveis" free="100" monthly="10.000" annual="10.000" />
                <ComparisonRow feature="Estudo offline" free="❌" monthly="✅" annual="✅" />
                <ComparisonRow feature="Filtros avançados" free="❌" monthly="✅" annual="✅" />
                <ComparisonRow feature="Simulados" free="❌" monthly="✅" annual="✅" />
                <ComparisonRow feature="Estatísticas" free="Básico" monthly="Completo" annual="Completo" />
                <ComparisonRow feature="Suporte" free="Comunidade" monthly="Email" annual="Prioritário" />
                <ComparisonRow feature="Anúncios" free="Sim" monthly="Não" annual="Não" />
                <ComparisonRow feature="Preço/mês" free="R$ 0" monthly="R$ 9,90" annual="R$ 7,00" highlighted />
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}

// Componente auxiliar para feature
function Feature({ 
  text, 
  premium = false, 
  disabled = false,
  highlighted = false 
}: { 
  text: string; 
  premium?: boolean; 
  disabled?: boolean;
  highlighted?: boolean;
}) {
  return (
    <div className="flex items-start gap-2">
      <div className={`mt-0.5 flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${
        disabled 
          ? 'bg-muted' 
          : premium && highlighted
          ? 'bg-gradient-to-br from-orange-400 to-red-500'
          : premium 
          ? 'bg-green-100 dark:bg-green-500/20' 
          : 'bg-blue-100 dark:bg-blue-500/20'
      }`}>
        {disabled ? (
          <span className="text-xs text-muted-foreground">—</span>
        ) : (
          <Check className={`w-3 h-3 ${
            premium && highlighted
              ? 'text-white'
              : premium 
              ? 'text-green-600 dark:text-green-400' 
              : 'text-blue-600 dark:text-blue-400'
          }`} strokeWidth={3} />
        )}
      </div>
      <p className={`text-sm ${
        disabled 
          ? 'text-muted-foreground line-through' 
          : highlighted
          ? 'font-bold text-foreground'
          : 'text-foreground'
      }`}>
        {text}
      </p>
    </div>
  );
}

// Componente auxiliar para linha de comparação
function ComparisonRow({ 
  feature, 
  free, 
  monthly, 
  annual,
  highlighted = false 
}: { 
  feature: string; 
  free: string; 
  monthly: string; 
  annual: string;
  highlighted?: boolean;
}) {
  return (
    <tr className={highlighted ? 'bg-amber-50/50 dark:bg-amber-950/20' : ''}>
      <td className="py-3 text-foreground font-medium">{feature}</td>
      <td className="py-3 text-center text-muted-foreground">{free}</td>
      <td className="py-3 text-center text-foreground">{monthly}</td>
      <td className={`py-3 text-center font-semibold ${
        highlighted ? 'text-orange-600' : 'text-orange-600'
      }`}>{annual}</td>
    </tr>
  );
}

// Componente auxiliar para feature compacta
function FeatureCompact({ 
  text, 
  premium = false, 
  disabled = false,
  highlighted = false 
}: { 
  text: string; 
  premium?: boolean; 
  disabled?: boolean;
  highlighted?: boolean;
}) {
  return (
    <div className="flex items-start gap-2">
      <div className={`mt-0.5 flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${
        disabled 
          ? 'bg-muted' 
          : premium && highlighted
          ? 'bg-gradient-to-br from-orange-400 to-red-500'
          : premium 
          ? 'bg-green-100 dark:bg-green-500/20' 
          : 'bg-blue-100 dark:bg-blue-500/20'
      }`}>
        {disabled ? (
          <span className="text-xs text-muted-foreground">—</span>
        ) : (
          <Check className={`w-3 h-3 ${
            premium && highlighted
              ? 'text-white'
              : premium 
              ? 'text-green-600 dark:text-green-400' 
              : 'text-blue-600 dark:text-blue-400'
          }`} strokeWidth={3} />
        )}
      </div>
      <p className={`text-sm ${
        disabled 
          ? 'text-muted-foreground line-through' 
          : highlighted
          ? 'font-bold text-foreground'
          : 'text-foreground'
      }`}>
        {text}
      </p>
    </div>
  );
}