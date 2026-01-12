# 🏗️ GABARITOO - REFATORAÇÃO COMPLETA

## 🎯 Visão Geral

Esta refatoração transforma o Gabaritoo de um app de questões em uma **plataforma profissional de estudos**, pronta para monetização recorrente de R$ 9,90/mês.

## 📦 O Que Foi Criado

### 1️⃣ **Arquitetura Limpa** (Domain-Driven)

```
📁 /domain/          # Modelos de negócio puros
  ├── Question.ts
  ├── User.ts
  ├── QuestionRepository.ts
  ├── Simulado.ts
  ├── StudentMetrics.ts
  └── QuestionResult.ts

📁 /core/            # Lógica de negócio pura
  ├── QuizEngine.ts
  ├── SimuladoEngine.ts
  ├── FeatureGate.ts
  └── EngineTypes.ts

📁 /services/        # Serviços de infraestrutura
  ├── AuthService.ts
  ├── MetricsService.ts
  └── SimuladoService.ts

📁 /data/repositories/  # Camada de dados
  ├── LocalQuestionRepository.ts
  └── ResultRepository.ts

📁 /hooks/           # Hooks React
  ├── useQuizEngine.tsx
  ├── useSimuladoEngine.tsx
  ├── usePlan.ts
  └── useMetrics.ts

📁 /components/      # UI
  ├── UpgradeScreen.tsx
  ├── PremiumGateExample.tsx
  └── Settings.tsx (refatorado)
```

### 2️⃣ **Sistema de Monetização**

#### 🆓 Plano FREE
- 100 questões
- Estudo básico
- Estatísticas simples

#### 💎 Plano PREMIUM (R$ 9,90/mês)
- 10.000 questões
- Estudo offline
- Filtros avançados
- Simulados cronometrados
- Métricas detalhadas

### 3️⃣ **Controle Centralizado**

Todas as verificações de plano passam pelo `FeatureGate`:

```typescript
import { FeatureGate } from './core/FeatureGate';

// ✅ CORRETO
if (FeatureGate.canUseSimulado()) {
  // executar
}

// ❌ ERRADO
if (user.premium) {
  // não faça isso
}
```

### 4️⃣ **Engines Independentes**

Os engines são **puros** e não sabem de onde vêm os dados:

```typescript
// QuizEngine
const engine = new QuizEngine();
engine.load(questions);
engine.answer(questionId, option, time);
engine.getStats();

// SimuladoEngine
const simulado = new SimuladoEngine(questions);
simulado.responder(question, resposta, tempo);
simulado.finalizar();
```

## 🚀 Como Usar

### Criar um Quiz

```typescript
import { useQuizEngine } from './hooks/useQuizEngine';

function QuizScreen() {
  const { question, answer, loading, finished, stats } = useQuizEngine();

  if (loading) return <Loading />;
  if (finished) return <Resultado stats={stats} />;

  return (
    <Quiz
      question={question}
      onAnswer={(option, time) => answer(option, time)}
    />
  );
}
```

### Bloquear Feature Premium

```typescript
import { FeatureGate } from './core/FeatureGate';
import { UpgradeScreen } from './components/UpgradeScreen';

function SimuladoButton() {
  const [showUpgrade, setShowUpgrade] = useState(false);

  const handleClick = () => {
    if (!FeatureGate.canUseSimulado()) {
      setShowUpgrade(true);
      return;
    }
    // continuar
  };

  return (
    <>
      <button onClick={handleClick}>Simulado</button>
      {showUpgrade && <UpgradeScreen onClose={() => setShowUpgrade(false)} />}
    </>
  );
}
```

### Ver Métricas do Aluno

```typescript
import { useMetrics } from './hooks/useMetrics';

function MetricsScreen() {
  const metrics = useMetrics();

  return (
    <div>
      <p>Acertos: {metrics.percentualGeral}%</p>
      <p>Total: {metrics.totalRespondidas}</p>
      {/* Por disciplina, por assunto, etc */}
    </div>
  );
}
```

## 💰 Sistema de Plano nos Ajustes

A gestão de plano está **integrada nos Ajustes**, na seção "Assinatura":

### FREE
```
⚡ Assinar Premium
Desbloqueie todos os recursos por R$ 9,90/mês
📚 10.000 questões  ✈️ Offline  🎯 Simulados
```

### PREMIUM
```
👑 Gabaritoo Premium [Ativo]
• Estudo offline ilimitado
• Filtros avançados
• Simulados cronometrados
• Até 10.000 questões
Renovação: 12/02/2026
```

## 🧪 Testar Premium

### Método 1: Via Interface
1. Abrir **Ajustes**
2. Clicar em **Assinar Premium**
3. Confirmar ativação de teste

### Método 2: Via Console
```javascript
import { authService } from './services/AuthService';
authService.activatePremium(1); // 1 mês
window.location.reload();
```

## 📊 Métricas de Conversão

O sistema registra automaticamente:
- Resultados de questões respondidas
- Cálculo de acertos por disciplina/assunto
- Identificação de pontos fracos
- Recomendações de estudo

```typescript
import { useMetrics, usePontosFracos } from './hooks/useMetrics';

const metrics = useMetrics();
const pontosFracos = usePontosFracos();
// ["Direito Constitucional", "Português"]
```

## 🔮 Preparado para Backend

Quando implementar backend, basta trocar:

### Questões
```typescript
// /data/repositories/LocalQuestionRepository.ts
// → /data/repositories/APIQuestionRepository.ts

async getFree() {
  const response = await fetch('/api/questions/free');
  return response.json();
}
```

### Autenticação
```typescript
// /services/AuthService.ts

async login(email, password) {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password })
  });
  const user = await response.json();
  this.setUser(user);
}
```

### Pagamento
```typescript
// Integração Google Play Billing

async purchasePremium() {
  const purchase = await GooglePlayBilling.purchase('premium_monthly');
  
  // Validar com backend
  const response = await fetch('/api/purchase/validate', {
    method: 'POST',
    body: JSON.stringify({ token: purchase.token })
  });

  const user = await response.json();
  authService.setUser(user);
}
```

## ✅ Benefícios Conquistados

### Técnicos
- ✅ Arquitetura limpa e escalável
- ✅ Código testável (engines puros)
- ✅ Independência de fonte de dados
- ✅ Controle centralizado de features
- ✅ Preparado para backend sem refatoração

### Negócio
- ✅ Sistema de monetização claro (R$ 9,90/mês)
- ✅ Diferenciação FREE vs PREMIUM óbvia
- ✅ Valor percebido alto (offline, simulados, métricas)
- ✅ UX de conversão não agressiva
- ✅ Base para recorrência sustentável

### UX
- ✅ Usuário FREE nunca fica travado
- ✅ Premium é desejável, não obrigatório
- ✅ Valor claro antes de pedir pagamento
- ✅ Integração natural nos Ajustes

## 📚 Documentação

- **[ARQUITETURA_REFATORADA.md](./ARQUITETURA_REFATORADA.md)** - Arquitetura completa
- **[GUIA_SISTEMA_PREMIUM.md](./GUIA_SISTEMA_PREMIUM.md)** - Como usar o sistema premium
- **[PremiumGateExample.tsx](./components/PremiumGateExample.tsx)** - Exemplos práticos

## 🎓 Regras de Ouro

1. **NUNCA** importe dados diretamente em componentes
2. **SEMPRE** use `FeatureGate` para verificar permissões
3. **NUNCA** coloque lógica de negócio em hooks
4. **SEMPRE** salve resultados via `resultRepository`
5. **NUNCA** bloqueie estudo completamente (apenas conforto)

## 🔧 Compatibilidade

A nova arquitetura é **100% compatível** com o código existente:
- Conversão automática de questões antigas
- Hooks podem coexistir
- Migração gradual sem quebras

## 🚦 Próximos Passos

### Curto Prazo (Sem Backend)
- [ ] Implementar download offline (localStorage)
- [ ] Criar tela de métricas detalhadas
- [ ] Sistema de recomendação de estudo
- [ ] Adicionar mais filtros premium

### Médio Prazo (Com Backend)
- [ ] Criar APIQuestionRepository
- [ ] Implementar autenticação real
- [ ] Integrar Google Play Billing
- [ ] Sync de resultados com servidor

### Longo Prazo
- [ ] Download em massa de questões (10mil)
- [ ] Sistema de ranking
- [ ] Recomendações com IA
- [ ] Notificações inteligentes baseadas em métricas

## 💡 Filosofia de Produto

> "O usuário FREE estuda.  
> O usuário PREMIUM estuda melhor."

O Premium não é uma trava, é um upgrade de conforto:
- Estuda em qualquer lugar (offline)
- Estuda mais focado (filtros)
- Estuda mais inteligente (métricas)
- Estuda como concurseiro profissional (simulados)

Isso justifica R$ 9,90/mês para quem está investindo no futuro.

---

**Versão**: 2.0 - Arquitetura Profissional  
**Última atualização**: Janeiro 2026  
**Status**: ✅ Pronto para monetização
