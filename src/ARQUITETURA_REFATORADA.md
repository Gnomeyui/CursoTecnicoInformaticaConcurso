# 🏗️ ARQUITETURA REFATORADA - GABARITOO

## 📐 Visão Geral

Esta refatoração transforma o Gabaritoo em uma arquitetura limpa, escalável e preparada para crescimento sem necessidade de refatoração futura.

## 🎯 Princípios Aplicados

### 1. **Separação de Responsabilidades**
- **Domain**: Modelos de negócio puros (sem lógica)
- **Core**: Lógica de negócio (engines, regras)
- **Services**: Serviços de infraestrutura
- **Data**: Acesso a dados
- **Hooks**: Orquestração React
- **Components**: UI

### 2. **Independência de Fonte de Dados**
```
UI → Hook → Engine → Repository
```
- O Engine NUNCA sabe de onde vêm os dados
- O Repository pode ser trocado (JSON → SQLite → API)
- Zero refatoração quando mudar fonte

### 3. **Controle Centralizado de Features**
```typescript
FeatureGate.canUseSimulado()  // ✅ Correto
if (isPremium) { ... }         // ❌ Errado
```

## 📂 Estrutura de Diretórios

```
/domain/                    # Modelos de domínio (interfaces)
  Question.ts              # Modelo de questão
  User.ts                  # Modelo de usuário
  QuestionRepository.ts    # Interface do repositório
  Simulado.ts              # Tipos de simulado
  StudentMetrics.ts        # Métricas do aluno
  QuestionResult.ts        # Resultado de questão

/core/                      # Lógica de negócio pura
  QuizEngine.ts            # Motor de quiz (PURO)
  SimuladoEngine.ts        # Motor de simulado
  FeatureGate.ts           # Controle FREE/PREMIUM
  EngineTypes.ts           # Tipos internos

/services/                  # Serviços de infraestrutura
  AuthService.ts           # Autenticação e plano
  MetricsService.ts        # Cálculo de métricas
  SimuladoService.ts       # Gestão de simulados

/data/repositories/         # Camada de acesso a dados
  LocalQuestionRepository.ts   # Implementação local
  ResultRepository.ts          # Armazena resultados

/hooks/                     # Hooks React
  useQuizEngine.tsx        # Hook de quiz
  useSimuladoEngine.tsx    # Hook de simulado
  usePlan.ts               # Hook de plano
  useMetrics.ts            # Hook de métricas

/components/                # Componentes UI
  UpgradeScreen.tsx        # Tela de upgrade
```

## 🔄 Fluxos Principais

### Quiz Normal
```
1. UI chama useQuizEngine()
2. Hook carrega questões via questionRepository.getFree()
3. Hook cria QuizEngine e alimenta com questões
4. Usuário responde
5. Hook registra em resultRepository
6. Engine calcula estatísticas
```

### Simulado (Premium)
```
1. UI verifica FeatureGate.canUseSimulado()
2. Se FREE → UpgradeScreen
3. Se PREMIUM → simuladoService.criarSimulado(config)
4. Service valida e busca questões
5. useSimuladoEngine gerencia execução
6. Resultado gerado no final
```

### Métricas
```
1. UI chama useMetrics()
2. Hook busca resultRepository.getAll()
3. metricsService.calcular(results)
4. Retorna StudentMetrics
```

## 🎮 Controle de Features (FREE vs PREMIUM)

### Regras Atuais

| Feature | FREE | PREMIUM |
|---------|------|---------|
| Questões | 100 | 10.000 |
| Offline | ❌ | ✅ |
| Filtros | ❌ | ✅ |
| Simulados | ❌ | ✅ |
| Métricas | Básico | Completo |

### Como Usar

```typescript
// ❌ ERRADO (lógica espalhada)
if (user.premium) {
  // fazer algo
}

// ✅ CORRETO (centralizado)
if (FeatureGate.canUseSimulado()) {
  // fazer algo
}
```

## 🚀 Benefícios da Arquitetura

### ✅ O que você GANHOU

1. **Testabilidade**: Engines podem ser testados sem React
2. **Escalabilidade**: Trocar fonte de dados sem refatorar
3. **Manutenibilidade**: Código organizado e previsível
4. **Monetização**: Controle claro de features premium
5. **Evolução**: Preparado para backend futuro

### ❌ O que você ELIMINOU

1. Lógica duplicada
2. Dependência de dados hardcoded
3. Verificações de premium espalhadas
4. Código impossível de testar
5. Refatoração futura cara

## 🔮 Próximos Passos

### Curto Prazo (Sem Backend)
- [ ] Implementar download offline (localStorage)
- [ ] Criar tela de métricas detalhadas
- [ ] Adicionar mais filtros
- [ ] Sistema de recomendação de estudo

### Médio Prazo (Com Backend)
- [ ] Trocar LocalQuestionRepository por APIQuestionRepository
- [ ] Sync de resultados com servidor
- [ ] Integrar Google Play Billing
- [ ] Sistema de autenticação real

### Longo Prazo
- [ ] Download em massa de questões
- [ ] Sync offline → online
- [ ] Ranking de alunos
- [ ] IA para recomendações

## 📝 Exemplos de Uso

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

### Verificar Premium

```typescript
import { usePlan } from './hooks/usePlan';

function SimuladoButton() {
  const { isPremium } = usePlan();

  if (!isPremium) {
    return <UpgradeScreen />;
  }

  return <SimuladoScreen />;
}
```

### Ver Métricas

```typescript
import { useMetrics } from './hooks/useMetrics';

function MetricsScreen() {
  const metrics = useMetrics();

  return (
    <div>
      <p>Acertos: {metrics.percentualGeral}%</p>
      <p>Total: {metrics.totalRespondidas}</p>
      {/* ... */}
    </div>
  );
}
```

## 🎓 Regras de Ouro

1. **NUNCA** importe dados diretamente em componentes
2. **SEMPRE** use FeatureGate para verificar permissões
3. **NUNCA** coloque lógica de negócio em hooks
4. **SEMPRE** salve resultados via resultRepository
5. **NUNCA** misture UI com lógica de dados

## 🔧 Compatibilidade

A nova arquitetura é 100% compatível com o código antigo através de:

- `convertLegacyQuestion()` em LocalQuestionRepository
- Mesmos tipos no domain
- Hooks podem coexistir com código antigo

## 📦 Dependências

Nenhuma dependência externa nova foi adicionada.

---

**Última atualização**: Janeiro 2026  
**Versão**: 2.0 - Arquitetura Profissional
