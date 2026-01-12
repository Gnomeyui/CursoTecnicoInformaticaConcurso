# 💎 GABARITOO - SISTEMA DE PLANOS

> **Plataforma profissional de estudos para concursos**  
> Monetização recorrente com 3 planos inteligentes

---

## 🎯 PROPOSTA DE VALOR

### Para o Aluno
- Estude onde e quando quiser (modo offline)
- Foque no que mais erra (estatísticas)
- Pratique com simulados reais
- Economize 30% no plano anual

### Para o Negócio
- Receita recorrente previsível
- Conversão natural (5-10% esperado)
- LTV alto (R$ 100+ por cliente)
- Escalável sem refatoração

---

## 💰 ESTRUTURA DE PLANOS

```
┌────────────────────────────────────────────────────────────┐
│                                                            │
│  FREE           MENSAL          ANUAL (👑 RECOMENDADO)    │
│  ────           ──────          ─────                      │
│                                                            │
│  R$ 0           R$ 9,90/mês     R$ 84/ano                 │
│  ────           ───────         ─────────                 │
│                                 (R$ 7/mês)                │
│                                                            │
│  • 100          • 10.000        • 10.000 questões         │
│    questões       questões                                 │
│                                                            │
│  • Básico       • Offline       • Offline ilimitado       │
│                                                            │
│  • Simples      • Filtros       • Filtros avançados       │
│                                                            │
│  ❌ Simulados   • Simulados     • Simulados ilimitados    │
│                                                            │
│  ❌ Offline     • Estatísticas  • Estatísticas completas  │
│                   completas                                │
│                                                            │
│                                 • ECONOMIZE 30%           │
│                                   (R$ 34,80/ano)          │
│                                                            │
└────────────────────────────────────────────────────────────┘
```

---

## 📊 COMPARAÇÃO RÁPIDA

| Feature | FREE | MENSAL | ANUAL |
|---------|:----:|:------:|:-----:|
| Questões | 100 | 10.000 | 10.000 |
| Offline | ❌ | ✅ | ✅ |
| Filtros | ❌ | ✅ | ✅ |
| Simulados | ❌ | ✅ | ✅ |
| Estatísticas | Básico | Completo | Completo |
| Anúncios | Sim | Não | Não |
| Suporte | - | Email | **Prioritário** |
| **Preço/mês** | **R$ 0** | **R$ 9,90** | **R$ 7,00** |

---

## 💡 POR QUE 3 PLANOS?

### Psicologia de Preços

```
FREE → Aquisição (porta de entrada)
  ↓
MENSAL → Conversão rápida (receita imediata)
  ↓
ANUAL → Retenção (LTV máximo)
```

### Efeito Âncora

O plano **ANUAL** parece muito mais atraente quando comparado ao MENSAL:

```
MENSAL: R$ 9,90 × 12 = R$ 118,80/ano
ANUAL:  R$ 84,00/ano

ECONOMIA: R$ 34,80 (30%)
```

### Segmentação de Clientes

- **FREE**: Curiosos, testadores (70%)
- **MENSAL**: Estudantes regulares (15%)
- **ANUAL**: Concurseiros sérios (15%)

---

## 🎨 EXPERIÊNCIA DO USUÁRIO

### Fluxo de Conversão

```
1. Aluno FREE estuda normalmente
   ↓
2. Tenta usar Simulado / Filtros / Offline
   ↓
3. Sistema mostra: "Recurso Premium"
   ↓
4. Abre tela com 3 planos
   ↓
5. Destaca ANUAL (melhor economia)
   ↓
6. Escolhe e assina
   ↓
7. App desbloqueia tudo instantaneamente
```

### Gatilhos de Conversão

| Situação | Mensagem |
|----------|----------|
| Tentou simulado | "Desbloqueie simulados cronometrados" |
| Tentou filtros | "Use filtros por banca, cargo e disciplina" |
| Tentou offline | "Estude offline em qualquer lugar" |
| 80+ questões | "Você está chegando no limite FREE" |
| Viu estatísticas | "Veja análise completa dos seus erros" |

---

## 💰 PROJEÇÃO DE RECEITA

### Cenário Realista (1.000 usuários)

```
┌─────────────────────────────────────────┐
│  FREE:    600 usuários → R$ 0           │
│  MENSAL:  200 usuários → R$ 1.980/mês   │
│  ANUAL:   200 usuários → R$ 1.400/mês   │
│  ────────────────────────────────────   │
│  TOTAL:   R$ 3.380/mês                  │
│           R$ 40.560/ano                 │
└─────────────────────────────────────────┘
```

### Cenário Otimista (5.000 usuários)

```
┌─────────────────────────────────────────┐
│  FREE:    3.000 usuários → R$ 0         │
│  MENSAL:  1.000 usuários → R$ 9.900/mês │
│  ANUAL:   1.000 usuários → R$ 7.000/mês │
│  ────────────────────────────────────   │
│  TOTAL:   R$ 16.900/mês                 │
│           R$ 202.800/ano                │
└─────────────────────────────────────────┘
```

### Métricas Chave

- **Taxa de Conversão**: 5-10% (indústria: 3-5%)
- **Preferência Anual**: 50-60% (meta)
- **Churn Mensal**: <10%
- **LTV Médio**: R$ 100-150
- **CAC Máximo**: R$ 30-50

---

## 🏗️ ARQUITETURA TÉCNICA

### Camadas

```
┌─────────────────────────────────────┐
│  COMPONENTES (UI)                   │
│  ├─ PlanSelector                    │
│  ├─ UpgradeScreen                   │
│  └─ Settings                        │
├─────────────────────────────────────┤
│  HOOKS (React)                      │
│  ├─ usePlan                         │
│  ├─ useQuizEngine                   │
│  └─ useMetrics                      │
├─────────────────────────────────────┤
│  CORE (Lógica)                      │
│  ├─ FeatureGate ← CONTROLE CENTRAL  │
│  ├─ QuizEngine                      │
│  └─ SimuladoEngine                  │
├─────────────────────────────────────┤
│  SERVICES                           │
│  ├─ AuthService ← PLANOS AQUI       │
│  ├─ MetricsService                  │
│  └─ SimuladoService                 │
├─────────────────────────────────────┤
│  DOMAIN                             │
│  └─ User (free/monthly/annual)      │
└─────────────────────────────────────┘
```

### Decisões de Design

✅ **Controle Centralizado**: Todo acesso a features passa pelo `FeatureGate`  
✅ **Sem Lógica Espalhada**: Verificação de plano em 1 só lugar  
✅ **Preparado para Backend**: Trocar fonte de dados sem refatorar  
✅ **TypeScript 100%**: Segurança de tipos em tudo  

---

## 🚀 DIFERENCIAL COMPETITIVO

### Outros Apps de Questões

```
❌ Cobram R$ 19,90-29,90/mês
❌ Sem modo offline real
❌ Interface confusa
❌ Apenas questões, sem inteligência
```

### Gabaritoo

```
✅ R$ 7/mês no plano anual (menor preço)
✅ Offline ilimitado (estude no ônibus)
✅ Interface limpa e moderna
✅ Estatísticas que mostram ONDE você erra
✅ Simulados cronometrados
✅ Foco em Roraima (concursos locais)
```

---

## 📱 INTEGRAÇÃO DE PAGAMENTO

### Google Play Billing (Próximo Passo)

```typescript
// SKUs configurados
const PRODUCTS = {
  monthly: 'gabaritoo_premium_monthly',  // R$ 9,90
  annual: 'gabaritoo_premium_annual'     // R$ 84,00
};

// Fluxo
1. Usuário clica "Assinar"
2. Google Play Billing abre
3. Pagamento confirmado
4. Backend valida
5. App ativa recursos
```

### Métodos Aceitos

- 💳 Cartão de crédito
- 💰 Saldo Google Play
- 🏦 Débito em conta
- 📱 Operadora (Vivo, Claro, Tim)

---

## 🎯 ESTRATÉGIA DE LANÇAMENTO

### Fase 1: Soft Launch (1-2 meses)
- Liberar para **100 usuários beta**
- Coletar feedback
- Ajustar preços se necessário
- Meta: 10% de conversão

### Fase 2: Marketing Local (3-6 meses)
- Instagram/TikTok com foco em RR
- Parcerias com cursinhos
- Depoimentos de aprovados
- Meta: 1.000 usuários

### Fase 3: Expansão Regional (6-12 meses)
- Adicionar outros estados
- Mais concursos (municipais, estaduais)
- Sistema de afiliados
- Meta: 5.000 usuários

---

## 💎 VALOR PARA O CONCURSEIRO

### Cálculo Real

```
Cursinho presencial:  R$ 300-500/mês
Material apostilado:  R$ 200-300
Livros:               R$ 150-300
────────────────────────────────────
TOTAL:                R$ 650-1.100/mês
```

**vs**

```
Gabaritoo ANUAL:      R$ 7/mês
                      R$ 84/ano
```

### ROI do Aluno

```
Investimento: R$ 84/ano
Benefício:    Aprovação (salário R$ 3.000-8.000/mês)
ROI:          INFINITO
```

---

## 🎓 CASES DE SUCESSO (Futuros)

### Depoimento Ideal

> _"Passei no concurso da ALE-RR estudando no ônibus com o Gabaritoo. O modo offline foi essencial, eu moro no interior. Valeu cada centavo dos R$ 7/mês."_
>
> **— João Silva, Aprovado ALE-RR 2026**

---

## ✅ STATUS ATUAL

### Implementado ✅

- [x] Sistema de 3 planos
- [x] Controle de acesso (FeatureGate)
- [x] Tela de seleção de planos
- [x] Integração nos Ajustes
- [x] Economia de 30% destacada
- [x] UX de conversão não agressiva
- [x] Arquitetura preparada para backend

### Próximos Passos 🚧

- [ ] Integrar Google Play Billing
- [ ] Sistema de cupons/promoções
- [ ] Analytics de conversão
- [ ] A/B testing de preços
- [ ] Sistema de afiliados

---

## 📞 CONTATO

**Gabaritoo**  
App de estudos para concursos públicos

🌐 [em desenvolvimento]  
📧 suporte@gabaritoo.com.br  
📱 WhatsApp: (95) 99123-4567

---

## 🏆 RESUMO EXECUTIVO

### O Problema
Concurseiros gastam R$ 500+/mês em cursinhos, mas não conseguem estudar offline.

### A Solução
App completo de questões com modo offline por **R$ 7/mês** (anual).

### O Diferencial
- Menor preço do mercado
- Offline real (funciona sem internet)
- Estatísticas que mostram onde focar

### A Oportunidade
- 1M+ concurseiros no Brasil
- Mercado de R$ 5B+/ano em educação
- Crescimento de 20%+ ao ano

### O Ask
- Investimento: R$ 50k-100k
- Uso: Marketing + desenvolvimento
- Meta: 10k usuários em 12 meses
- Projeção: R$ 200k+/ano em receita

---

**Versão**: 2.0  
**Última atualização**: Janeiro 2026  
**Status**: ✅ Pronto para lançamento
