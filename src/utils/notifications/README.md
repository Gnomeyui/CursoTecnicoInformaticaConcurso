# 🔔 Sistema de Notificações Inteligentes

Sistema completo de notificações adaptativas com **200 mensagens motivacionais** para apps de estudo.

---

## 📚 O QUE FOI IMPLEMENTADO

✅ **200 mensagens motivacionais** organizadas por contexto  
✅ **Detecção automática de contexto** (manhã, noite, inativo, streak)  
✅ **Adaptação ao perfil** (iniciante, regular, avançado)  
✅ **Ajuste por desempenho** (baixo, médio, alto)  
✅ **Anti-repetição inteligente** (histórico de 20 mensagens)  
✅ **Controle de frequência adaptativo** (evita spam)  
✅ **Arquitetura modular** (fácil de manter e expandir)

---

## 🏗️ ARQUITETURA

```
/utils/notifications/
├── index.ts                      # Exportações centralizadas
├── types.ts                      # Tipos TypeScript
├── NotificationService.ts        # Serviço principal
├── notificationMessages.ts       # 200 mensagens organizadas
├── notificationContext.ts        # Detecção de contexto
├── notificationFrequency.ts      # Frequência adaptativa
├── notificationPerformance.ts    # Detecção de desempenho
└── notificationHistory.ts        # Anti-repetição
```

---

## 🚀 USO BÁSICO

### 1. Importar o serviço

```typescript
import { NotificationService, UserStudyStats } from '@/utils/notifications';
```

### 2. Preparar dados do usuário

```typescript
const userStats: UserStudyStats = {
  lastStudyAt: new Date(),
  streakDays: 7,
  averageAccuracy: 68,
  questionsAnsweredToday: 12
};
```

### 3. Criar instância do serviço

```typescript
const notificationService = new NotificationService('regular', userStats);
```

### 4. Gerar mensagem

```typescript
const message = notificationService.generateMessage();

if (message) {
  // Enviar notificação push
  new Notification('Gabaritoo', {
    body: message,
    icon: '/icon.png'
  });
}
```

---

## 📊 CONTEXTOS DISPONÍVEIS

| Contexto | Quando usar | Tom |
|----------|-------------|-----|
| `morning` | 5h-12h | Início, possibilidade |
| `night` | 12h-5h | Fechamento, tranquilidade |
| `inactive` | 2+ dias sem estudar | Acolhimento, zero culpa |
| `streak` | 3+ dias consecutivos | Reconhecimento positivo |

---

## 👤 PERFIS DE USUÁRIO

| Perfil | Tom | Exemplo |
|--------|-----|---------|
| `beginner` | Acolhedor, simples | "Sem pressa. Um pouco hoje já é suficiente." |
| `regular` | Incentivo equilibrado | "Manter a rotina é o que te faz avançar." |
| `advanced` | Disciplina, foco | "Consistência hoje é desempenho amanhã." |

---

## 📈 NÍVEIS DE DESEMPENHO

| Nível | Acurácia | Foco da mensagem |
|-------|----------|------------------|
| `low` | < 50% | Encorajamento |
| `medium` | 50-75% | Consistência |
| `high` | > 75% | Reconhecimento |

---

## ⚙️ FREQUÊNCIA ADAPTATIVA

O sistema ajusta automaticamente a frequência baseado no comportamento:

| Situação | Notificações/dia | Intervalo mínimo |
|----------|------------------|------------------|
| Streak alto (5+ dias) | 1 | 24h |
| Usuário inativo | 1 | 36h |
| Muito inativo (5+ dias) | 1 | 48h |
| Padrão (regular) | 2 | 12h |

---

## 🔒 ANTI-REPETIÇÃO

- Mantém histórico das **últimas 20 mensagens**
- Nunca repete mensagem recente
- Fallback para mensagens inspiracionais se necessário
- Resetável para testes

---

## 🧪 TESTANDO O SISTEMA

### Método 1: Usando o componente Demo

```tsx
import { NotificationDemo } from '@/components/NotificationDemo';

function App() {
  return <NotificationDemo />;
}
```

### Método 2: Forçar mensagem (ignora frequência)

```typescript
const message = notificationService.forceGenerateMessage();
console.log(message);
```

### Método 3: Resetar controle de frequência

```typescript
NotificationService.resetFrequencyControl();
```

---

## 🎯 INTEGRAÇÃO REAL COM WEB PUSH

### 1. Solicitar permissão

```typescript
async function requestNotificationPermission() {
  if (!('Notification' in window)) {
    console.log('Notificações não suportadas');
    return false;
  }

  const permission = await Notification.requestPermission();
  return permission === 'granted';
}
```

### 2. Agendar notificações

```typescript
function scheduleNotifications() {
  const service = new NotificationService('regular', userStats);
  
  // Verificar a cada 6 horas
  setInterval(() => {
    const message = service.generateMessage();
    
    if (message && Notification.permission === 'granted') {
      new Notification('Gabaritoo', {
        body: message,
        icon: '/icon.png',
        badge: '/badge.png',
        tag: 'study-reminder'
      });
    }
  }, 6 * 60 * 60 * 1000); // 6 horas
}
```

### 3. Service Worker (opcional, para notificações em background)

```javascript
// service-worker.js
self.addEventListener('push', (event) => {
  const data = event.data.json();
  
  self.registration.showNotification('Gabaritoo', {
    body: data.message,
    icon: '/icon.png',
    badge: '/badge.png'
  });
});
```

---

## 📱 BOAS PRÁTICAS

### ✅ FAÇA

- Use contexto apropriado ao horário
- Respeite a frequência adaptativa
- Permita usuário desabilitar notificações
- Teste em diferentes perfis de usuário
- Monitore taxa de clique nas notificações

### ❌ NÃO FAÇA

- Enviar mais de 2 notificações por dia
- Repetir mensagens recentemente vistas
- Usar tom culpabilizador
- Forçar notificações se usuário desabilitou
- Enviar notificações fora do horário adequado

---

## 🔧 EXTENSÃO FUTURA

### Possibilidades de evolução:

1. **A/B Testing** — Testar variações de mensagens
2. **Personalização** — Usuário escolhe temas preferidos
3. **Análise de engajamento** — Rastrear quais mensagens geram mais retorno
4. **Notificações rich** — Adicionar botões de ação
5. **Integração com calendário** — Lembrar de metas semanais
6. **Gamificação** — "Desbloqueie novas mensagens ao atingir X dias"

---

## 📊 MÉTRICAS RECOMENDADAS

Para otimizar o sistema, monitore:

- Taxa de clique (CTR) por tipo de mensagem
- Taxa de conversão (usuário retorna ao app)
- Taxa de desativação de notificações
- Horários com melhor engajamento
- Mensagens mais efetivas por perfil

---

## 🎓 EXEMPLOS DE MENSAGENS

### Manhã (Iniciante)
> "Que tal começar o dia resolvendo algumas questões?"

### Noite (Regular)
> "Finalizar o dia estudando reforça o hábito."

### Inativo (Avançado)
> "Disciplina também é saber retomar. Não perca o ritmo."

### Streak (Todos)
> "Parabéns por manter a constância. Continue assim."

---

## 🤝 CONTRIBUINDO

Para adicionar novas mensagens:

1. Edite `/utils/notifications/notificationMessages.ts`
2. Adicione no array apropriado (por contexto + perfil)
3. Mantenha o tom: calmo, direto, encorajador
4. Evite jargões técnicos

---

## 📄 LICENÇA

Este sistema foi desenvolvido para o app **Gabaritoo**.  
Uso livre para o projeto.

---

## ✨ RESULTADO FINAL

Com este sistema, seu app terá:

- ✅ Notificações que **não irritam**
- ✅ Mensagens que **fidelizam**
- ✅ Tom que **motiva sem pressionar**
- ✅ Sistema que **se adapta ao usuário**
- ✅ Base sólida para **crescimento**

**Este é um sistema de nível comercial, pronto para produção.**
