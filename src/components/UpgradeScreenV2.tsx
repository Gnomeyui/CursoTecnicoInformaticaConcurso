/**
 * ========================================
 * UPGRADE SCREEN V2 - ESTRATÉGIA "PREÇO DE LANCHE"
 * ========================================
 * 
 * OBJETIVO:
 * - Converter FREE → PREMIUM com foco em volume regional
 * - Preço psicológico: R$ 14,90 (menos que um X-Salada)
 * - Margem de lucro: 99%+ (custo quase zero com Offline-First)
 * 
 * ESTRATÉGIA:
 * - 5.000 usuários × R$ 14,90 = R$ 74.500/mês
 * - Custo servidor: ~R$ 50/mês (arquivos estáticos)
 * - Lucro líquido: ~R$ 74.000/mês 🎯
 * 
 * USO:
 * <UpgradeScreenV2 
 *   isOpen={showUpgrade} 
 *   onClose={() => setShowUpgrade(false)}
 *   context="offline"
 * />
 */

import React from 'react';
import { CheckCircle2, Trophy, Download, Zap, Crown, X, Lock, TrendingUp, Users } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';

// ========================================
// TIPOS
// ========================================

interface UpgradeScreenV2Props {
  isOpen: boolean;
  onClose: () => void;
  context?: 'offline' | 'simulado' | 'ranking' | 'filtros' | 'geral';
}

interface PlanOption {
  id: 'mensal' | 'trimestral' | 'vitalicio';
  name: string;
  price: string;
  priceValue: number;
  pricePerMonth?: string;
  badge?: string;
  badgeColor?: string;
  popular?: boolean;
  savings?: string;
}

// ========================================
// PLANOS (ESTRATÉGIA DE PREÇO)
// ========================================

const PLANS: PlanOption[] = [
  {
    id: 'mensal',
    name: 'Mensal',
    price: 'R$ 14,90',
    priceValue: 14.90,
    pricePerMonth: 'R$ 14,90/mês',
    badge: 'Flexível',
    badgeColor: 'bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400'
  },
  {
    id: 'trimestral',
    name: 'Trimestral',
    price: 'R$ 39,90',
    priceValue: 39.90,
    pricePerMonth: 'R$ 13,30/mês',
    badge: 'Economize 10%',
    badgeColor: 'bg-green-100 dark:bg-green-500/20 text-green-600 dark:text-green-400',
    popular: true,
    savings: 'R$ 4,80'
  },
  {
    id: 'vitalicio',
    name: 'Vitalício',
    price: 'R$ 147,00',
    priceValue: 147.00,
    pricePerMonth: 'Pagamento único',
    badge: 'Melhor Custo-Benefício',
    badgeColor: 'bg-amber-100 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400',
    savings: 'Economize 90%'
  }
];

// ========================================
// CONTEXTOS (MENSAGENS PERSONALIZADAS)
// ========================================

const CONTEXT_DATA = {
  offline: {
    icon: Download,
    title: 'Estude Offline em Qualquer Lugar',
    subtitle: 'Baixe todo o banco de questões e estude sem internet',
    highlight: 'Perfeito para ônibus, interior e economia de dados'
  },
  simulado: {
    icon: Trophy,
    title: 'Simulados Cronometrados Ilimitados',
    subtitle: 'Treine como se fosse a prova real',
    highlight: 'Descubra se você está pronto para a aprovação'
  },
  ranking: {
    icon: TrendingUp,
    title: 'Compare seu Desempenho',
    subtitle: 'Veja como você está em relação a outros candidatos',
    highlight: 'Ranking exclusivo da região'
  },
  filtros: {
    icon: Zap,
    title: 'Filtros Avançados por Banca e Cargo',
    subtitle: 'Foque apenas no que vai cair na sua prova',
    highlight: 'Estudo personalizado e eficiente'
  },
  geral: {
    icon: Crown,
    title: 'Seja Premium e Estude sem Limites',
    subtitle: 'Todos os recursos por menos que um X-Salada',
    highlight: 'Investimento mínimo, resultado máximo'
  }
};

// ========================================
// BENEFÍCIOS
// ========================================

const FEATURES = [
  {
    icon: Download,
    iconColor: 'text-blue-500',
    title: 'Downloads Ilimitados',
    desc: 'Baixe todos os cargos e estude 100% offline'
  },
  {
    icon: Users,
    iconColor: 'text-purple-500',
    title: 'Ranking Regional',
    desc: 'Compare seu desempenho com candidatos da sua região'
  },
  {
    icon: Trophy,
    iconColor: 'text-yellow-500',
    title: 'Simulados Ilimitados',
    desc: 'Treine com cronômetro e sinta a pressão da prova real'
  },
  {
    icon: Zap,
    iconColor: 'text-orange-500',
    title: 'Filtros Avançados',
    desc: 'Filtre por banca, cargo, nível e disciplina'
  },
  {
    icon: TrendingUp,
    iconColor: 'text-green-500',
    title: 'Estatísticas Detalhadas',
    desc: 'Saiba exatamente onde você precisa melhorar'
  },
  {
    icon: Crown,
    iconColor: 'text-amber-500',
    title: 'Sem Anúncios',
    desc: 'Foco total na sua aprovação, sem distrações'
  }
];

// ========================================
// COMPONENTE PRINCIPAL
// ========================================

export const UpgradeScreenV2 = ({ isOpen, onClose, context = 'geral' }: UpgradeScreenV2Props) => {
  if (!isOpen) return null;

  const contextData = CONTEXT_DATA[context];
  const ContextIcon = contextData.icon;

  const handleSelectPlan = (planId: string) => {
    // TODO: Integrar com sistema de pagamento
    // Por enquanto, abre link externo
    const paymentUrl = `https://seu-link-de-pagamento.com?plan=${planId}`;
    window.open(paymentUrl, '_blank');
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/95 backdrop-blur-sm animate-in fade-in"
      onClick={onClose}
    >
      <Card 
        className="w-full max-w-lg relative overflow-hidden border-2 border-amber-500/20 shadow-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Botão Fechar */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-background/80 backdrop-blur-sm hover:bg-muted transition-colors"
          aria-label="Fechar"
        >
          <X className="w-5 h-5 text-muted-foreground" />
        </button>

        {/* Header com Gradiente */}
        <div className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-purple-800 p-8 text-center text-white overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
          </div>

          {/* Content */}
          <div className="relative z-10">
            <div className="mx-auto bg-white/10 w-20 h-20 rounded-2xl flex items-center justify-center mb-4 backdrop-blur-md border border-white/20 shadow-lg">
              <ContextIcon className="w-10 h-10 text-yellow-300" strokeWidth={2} />
            </div>
            <h2 className="text-2xl font-bold mb-2">{contextData.title}</h2>
            <p className="text-blue-100 text-sm mb-1">{contextData.subtitle}</p>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-medium mt-3">
              <Lock className="w-3 h-3" />
              <span>{contextData.highlight}</span>
            </div>
          </div>
        </div>

        {/* Corpo */}
        <div className="p-6 space-y-6 bg-card">
          
          {/* Social Proof */}
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <Users className="w-4 h-4" />
            <span>+ de <strong className="text-foreground">2.000 candidatos</strong> aprovados com Gabaritoo</span>
          </div>

          {/* Lista de Benefícios */}
          <div className="grid gap-3">
            {FEATURES.map((feature, idx) => (
              <div 
                key={idx} 
                className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="bg-background p-2 rounded-lg border shadow-sm flex-shrink-0">
                  <feature.icon className={`w-5 h-5 ${feature.iconColor}`} strokeWidth={2} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-sm leading-tight">{feature.title}</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Planos */}
          <div className="space-y-3">
            <h3 className="text-center text-sm font-semibold text-muted-foreground uppercase tracking-wider">
              Escolha seu plano
            </h3>

            {PLANS.map((plan) => (
              <button
                key={plan.id}
                onClick={() => handleSelectPlan(plan.id)}
                className={`w-full p-4 rounded-xl border-2 transition-all active:scale-[0.98] text-left ${
                  plan.popular 
                    ? 'bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 border-amber-400 shadow-lg shadow-amber-500/10' 
                    : 'bg-card border-border hover:border-primary/50'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-bold text-foreground">{plan.name}</span>
                      {plan.badge && (
                        <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${plan.badgeColor}`}>
                          {plan.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">{plan.pricePerMonth}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-black text-primary">{plan.price}</div>
                    {plan.savings && (
                      <div className="text-xs font-medium text-green-600 dark:text-green-400">
                        {plan.savings}
                      </div>
                    )}
                  </div>
                </div>
                
                {plan.popular && (
                  <div className="mt-2 pt-2 border-t border-amber-200 dark:border-amber-800">
                    <div className="flex items-center gap-1 text-xs text-amber-700 dark:text-amber-400 font-medium">
                      <Crown className="w-3 h-3 fill-current" />
                      <span>Mais popular entre candidatos</span>
                    </div>
                  </div>
                )}
              </button>
            ))}
          </div>

          {/* Comparação de Preço */}
          <div className="bg-muted/30 p-4 rounded-xl border border-dashed border-primary/30 text-center space-y-2">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              💡 Invista menos que um lanche
            </p>
            <div className="flex items-center justify-center gap-2 text-sm">
              <span className="line-through text-muted-foreground">X-Salada: R$ 20,00</span>
              <span className="text-green-600 font-bold">→</span>
              <span className="font-bold text-foreground">Gabaritoo: R$ 14,90/mês</span>
            </div>
            <p className="text-xs text-muted-foreground">
              Aproveite o preço de lançamento regional
            </p>
          </div>

          {/* CTA Principal */}
          <Button 
            className="w-full h-12 text-lg font-bold bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white shadow-lg shadow-orange-500/20"
            onClick={() => handleSelectPlan('trimestral')}
          >
            <Crown className="w-5 h-5 mr-2 fill-white" />
            Quero Ser Aprovado
          </Button>
          
          {/* Garantias */}
          <div className="space-y-2">
            <div className="flex items-center justify-center gap-2 text-xs text-green-600 dark:text-green-400 font-medium">
              <CheckCircle2 className="w-4 h-4" />
              <span>Cancele quando quiser, sem multa</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-xs text-blue-600 dark:text-blue-400 font-medium">
              <CheckCircle2 className="w-4 h-4" />
              <span>Garantia de 7 dias (dinheiro de volta)</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-xs text-purple-600 dark:text-purple-400 font-medium">
              <CheckCircle2 className="w-4 h-4" />
              <span>Pagamento 100% seguro (Stripe/Mercado Pago)</span>
            </div>
          </div>

          {/* Footer */}
          <p className="text-center text-xs text-muted-foreground pt-2 border-t border-border">
            Junte-se a milhares de candidatos que confiam no Gabaritoo para estudar na Região Norte
          </p>
        </div>
      </Card>
    </div>
  );
};
