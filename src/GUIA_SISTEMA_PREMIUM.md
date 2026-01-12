# 💎 GUIA - SISTEMA PREMIUM NO GABARITOO

## 📍 Localização nos Ajustes

O sistema de plano/pagamento agora está **integrado nos Ajustes**, na primeira seção chamada "Assinatura".

### Status FREE
```
┌─────────────────────────────────────┐
│  ⚡  Assinar Premium               │
│     Desbloqueie todos os recursos  │
│     por R$ 9,90/mês                │
│                                     │
│  📚 10.000 questões                │
│  ✈️  Estudo offline                │
│  🎯 Simulados ilimitados           │
└─────────────────────────────────────┘
```

### Status PREMIUM
```
┌─────────────────────────────────────┐
│  👑  Gabaritoo Premium    [Ativo]  │
│     Você tem acesso completo       │
│                                     │
│  • Estudo offline ilimitado        │
│  • Filtros avançados               │
│  • Simulados cronometrados         │
│  • Até 10.000 questões             │
│                                     │
│  Renovação: 12/02/2026             │
└─────────────────────────────────────┘
```

## 🎯 Como Usar o Sistema

### 1. Verificar Plano em Qualquer Componente

```typescript
import { usePlan } from '../hooks/usePlan';

function MinhaScreen() {
  const { isPremium, user } = usePlan();

  return (
    <div>
      {isPremium ? (
        <p>Bem-vindo, usuário Premium!</p>
      ) : (
        <p>Você está no plano gratuito</p>
      )}
    </div>
  );
}
```

### 2. Bloquear Feature com FeatureGate

```typescript
import { FeatureGate } from '../core/FeatureGate';

function handleSimulado() {
  if (!FeatureGate.canUseSimulado()) {
    // Mostrar tela de upgrade
    return;
  }

  // Continuar com simulado
}
```

### 3. Mostrar Tela de Upgrade

```typescript
import { UpgradeScreen } from './UpgradeScreen';

function MyComponent() {
  const [showUpgrade, setShowUpgrade] = useState(false);

  return (
    <>
      <button onClick={() => setShowUpgrade(true)}>
        Ver Premium
      </button>

      {showUpgrade && (
        <div className="fixed inset-0 z-50">
          <UpgradeScreen onClose={() => setShowUpgrade(false)} />
        </div>
      )}
    </>
  );
}
```

### 4. Bloquear Botão Visualmente

```typescript
import { FeatureGate } from '../core/FeatureGate';
import { Lock } from 'lucide-react';

function SimuladoButton() {
  const locked = !FeatureGate.canUseSimulado();

  return (
    <button disabled={locked}>
      {locked && <Lock className="w-4 h-4 mr-2" />}
      Simulado
      {locked && <span className="badge">Premium</span>}
    </button>
  );
}
```

## 🔐 Features Controladas

| Feature | FREE | PREMIUM | FeatureGate |
|---------|------|---------|-------------|
| Questões | 100 | 10.000 | `maxQuestoes()` |
| Offline | ❌ | ✅ | `canUseOffline()` |
| Filtros | ❌ | ✅ | `canUseFiltrosAvancados()` |
| Simulados | ❌ | ✅ | `canUseSimulado()` |
| Métricas | Básico | Completo | `canUseMetrics()` |

## 🧪 Ativar Premium para Testes

### No Console do Navegador:
```javascript
// Importar o serviço
import { authService } from './services/AuthService';

// Ativar premium por 1 mês
authService.activatePremium(1);

// Recarregar página
window.location.reload();
```

### Ou clique em "Assinar Premium" nos Ajustes
O botão atual mostra um diálogo para ativar modo teste.

## 📱 Integração com Google Play Billing (Futuro)

Quando implementar pagamento real, substitua em `/services/AuthService.ts`:

```typescript
// Hoje (teste):
activatePremium(months: number)

// Futuro (real):
async purchasePremium() {
  const purchase = await GooglePlayBilling.purchase('premium_monthly');
  
  // Validar com backend
  const response = await api.post('/validate-purchase', { 
    token: purchase.token 
  });

  // Atualizar usuário
  this.setUser(response.user);
}
```

## 🎨 UX: Gatilhos de Conversão

### Gatilho 1: Tentou usar Simulado
```typescript
if (!FeatureGate.canUseSimulado()) {
  showUpgrade('simulado'); // contexto específico
}
```

### Gatilho 2: Chegou no limite de 100 questões
```typescript
if (answeredCount >= 100 && !isPremium) {
  showUpgrade('geral');
}
```

### Gatilho 3: Tentou usar filtros
```typescript
if (!FeatureGate.canUseFiltrosAvancados()) {
  showUpgrade('filtros');
}
```

### Gatilho 4: Viu estatísticas limitadas
```typescript
// Mostrar teaser das métricas premium
<p>Ver estatísticas completas é Premium</p>
```

## ✅ Checklist de Implementação

Para adicionar bloqueio premium em uma nova feature:

- [ ] Adicionar método no `FeatureGate.ts`
- [ ] Verificar com `FeatureGate.canUseX()` antes de executar
- [ ] Mostrar `UpgradeScreen` se bloqueado
- [ ] Adicionar badge visual "Premium" na UI
- [ ] Testar com usuário FREE e PREMIUM

## 🚨 Regras de Ouro

1. **NUNCA** verificar `if (user.premium)` diretamente
2. **SEMPRE** usar `FeatureGate.canUseX()`
3. **NUNCA** bloquear estudo completamente
4. **SEMPRE** mostrar valor antes de pedir upgrade
5. **NUNCA** ser agressivo com conversão

## 🎯 Exemplos Prontos

Veja `/components/PremiumGateExample.tsx` para exemplos de:
- Botão de Simulado com bloqueio
- Seção de Filtros bloqueada
- Contador de questões com limite
- Badge de Premium

## 📊 Métricas Importantes (Futuro)

Quando tiver backend, registre:
- `upgrade_viewed`: usuário viu tela de upgrade
- `upgrade_clicked`: clicou em "Assinar"
- `premium_activated`: completou pagamento
- `feature_blocked`: tentou usar feature premium

Isso ajuda a otimizar conversão.

---

**Última atualização**: Janeiro 2026  
**Versão**: 2.0 - Sistema Premium Integrado
