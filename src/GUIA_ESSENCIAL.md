# 📘 GUIA ESSENCIAL - Gabaritoo

## 🎯 Como Começar

### 1️⃣ Primeira Execução
```bash
npm install
npm run build
npx cap sync android
npx cap open android
```

### 2️⃣ Desenvolvimento
```bash
# Modo desenvolvimento (web)
npm run dev

# Build para Android
npm run android:build

# Testar no dispositivo
npm run android:run
```

## 🗂️ Estrutura de Arquivos ESSENCIAIS

### 🔧 Configuração
- `package.json` - Dependências e scripts
- `capacitor.config.json` - Config do Capacitor
- `vite.config.ts` - Config do Vite
- `tsconfig.json` - Config do TypeScript
- `tailwind.config.js` - Config do Tailwind CSS

### 📱 Core da Aplicação
- `/App.tsx` - Componente raiz
- `/src/main.tsx` - Entry point
- `/app/AppProviders.tsx` - Contexts providers
- `/app/AppRoutes.tsx` - Sistema de rotas
- `/app/AppShell.tsx` - Shell principal

### 🎨 Estilos
- `/styles/globals.css` - Estilos globais + Tailwind

### 🧩 Componentes Principais

#### Navegação e Dashboard
- `/components/Dashboard.tsx` - Tela principal
- `/components/Settings.tsx` - Configurações

#### Quiz e Estudos
- `/components/StudySession.tsx` - Sessão de estudos
- `/components/SmartQuizSession.tsx` - Quiz inteligente
- `/components/QuizTestScreen.tsx` - Tela de testes
- `/components/SimulatedExam.tsx` - Simulados
- `/components/FlashcardScreen.tsx` - Flashcards

#### Análises
- `/components/Statistics.tsx` - Estatísticas detalhadas
- `/components/Achievements.tsx` - Conquistas e badges

#### Configurações
- `/components/ProfileSelector.tsx` - Seleção de perfil
- `/components/Customization.tsx` - Personalização visual
- `/components/StudyPlanSettings.tsx` - Plano de estudos
- `/components/NotificationSettings.tsx` - Config de notificações
- `/components/SmartNotificationSettings.tsx` - Notificações inteligentes

#### Outros
- `/components/RegimentoInterno.tsx` - Regimento interno
- `/components/RegimentoReader.tsx` - Leitor de regimento
- `/components/TutorialGuide.tsx` - Tutorial
- `/components/onboarding/OnboardingPage.tsx` - Onboarding

### 🧠 Contextos (Estado Global)

**Principal:**
- `/context/AppState/` - **ESTADO CENTRAL UNIFICADO**
  - `AppStateContext.tsx` - Context principal
  - `appReducer.ts` - Reducer
  - `actions.ts` - Actions
  - `types.ts` - Tipos

**Secundários:**
- `/context/ThemeContext.tsx` - Temas e cores
- `/context/CustomizationContext.tsx` - Customização
- `/context/ConcursoProfileContext.tsx` - Perfis de concurso
- `/context/GameContext.tsx` - Gamificação
- `/context/StatsContext.tsx` - Estatísticas
- `/context/NotificationContext.tsx` - Notificações
- `/context/SmartNotificationContext.tsx` - Notificações inteligentes
- `/context/WrongQuestionsContext.tsx` - Questões erradas

### 📦 Bibliotecas Core

**Database:**
- `/lib/database/SQLiteService.ts` - **Serviço principal do SQLite**
- `/lib/database/migrations.ts` - Migrations do banco

**Engine:**
- `/lib/EngineEstudos.ts` - Engine de estudos
- `/lib/adaptadores.ts` - Adaptadores de dados
- `/lib/themeConfig.ts` - Config de temas

**Services:**
- `/services/SyncService.ts` - Sincronização de dados

### 🪝 Hooks Personalizados

- `/hooks/useProgress.ts` - Progresso do usuário
- `/hooks/useStats.ts` - Estatísticas
- `/hooks/useNotifications.ts` - Notificações
- `/hooks/usePreferences.ts` - Preferências
- `/hooks/useEngineEstudos.ts` - Engine de estudos
- `/hooks/useSmartQuiz.tsx` - Quiz inteligente
- `/hooks/useDatabaseSeed.ts` - Seed do banco

### 📊 Dados

- `/data/questions.ts` - Questões principais
- `/data/seedQuestions.ts` - Seed de questões
- `/data/questionsWithDifficulty.ts` - Questões com dificuldade
- `/data/badges.ts` - Sistema de badges
- `/data/flashcards.ts` - Flashcards
- `/data/regimento-interno.ts` - Regimento interno

### 🛠️ Utilitários

**Notificações:**
- `/utils/notifications/NotificationService.ts` - Serviço principal
- `/utils/notifications/NotificationScheduler.ts` - Agendamento
- `/utils/notifications/notificationMessages.ts` - Mensagens (200+)
- `/utils/notifications/notificationFrequency.ts` - Frequência
- `/utils/notifications/notificationHistory.ts` - Histórico
- `/utils/notifications/notificationPerformance.ts` - Performance
- `/utils/notifications/types.ts` - Tipos

**Outros:**
- `/utils/questionHelpers.ts` - Helpers de questões
- `/utils/questionManager.ts` - Gerenciador de questões
- `/utils/difficultyClassifier.ts` - Classificador de dificuldade
- `/utils/getRandomMotivationalCTA.ts` - CTAs motivacionais
- `/utils/analytics/simple-metrics.ts` - Métricas simples

### 🎨 Componentes UI (Radix)

**Mais Usados:**
- `button.tsx` - Botões
- `card.tsx` - Cards
- `input.tsx` - Inputs
- `select.tsx` - Selects
- `switch.tsx` - Switches
- `slider.tsx` - Sliders
- `progress.tsx` - Progress bars
- `tabs.tsx` - Tabs
- `dialog.tsx` - Diálogos
- `badge.tsx` - Badges
- `checkbox.tsx` - Checkboxes
- `label.tsx` - Labels

**Helpers:**
- `utils.ts` - Funções utilitárias (cn, etc)

## 🔄 Fluxo de Dados

```
┌─────────────────┐
│  SQLiteService  │ ← Banco de dados local
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│    AppState     │ ← Estado global centralizado
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Custom Hooks   │ ← Lógica de negócio
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   Components    │ ← Interface do usuário
└─────────────────┘
```

## 📱 Build Android

### Passos Detalhados

1. **Build Web:**
   ```bash
   npm run build
   ```

2. **Sync com Android:**
   ```bash
   npx cap sync android
   ```

3. **Abrir Android Studio:**
   ```bash
   npx cap open android
   ```

4. **No Android Studio:**
   - Build > Build Bundle(s) / APK(s) > Build APK(s)
   - Ou Run > Run 'app' para testar em device

### Atalho Completo
```bash
npm run android:build
```

## 🐛 Troubleshooting

### Erro de Build
```bash
# Limpar e reinstalar
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Erro no Android
```bash
# Limpar cache do Capacitor
npx cap sync android --clean
```

### Erro no SQLite
```bash
# Verificar migrations em /lib/database/migrations.ts
# Verificar SQLiteService em /lib/database/SQLiteService.ts
```

## 🎯 Funcionalidades por Arquivo

### Quiz Inteligente
- **Componente:** `SmartQuizSession.tsx`
- **Hook:** `useSmartQuiz.tsx`
- **Engine:** `EngineEstudos.ts`
- **Dados:** `questions.ts`

### Estatísticas
- **Componente:** `Statistics.tsx`
- **Hook:** `useStats.ts`
- **Context:** `StatsContext.tsx`
- **Utils:** `analytics/simple-metrics.ts`

### Gamificação
- **Componente:** `Achievements.tsx`
- **Context:** `GameContext.tsx`
- **Dados:** `badges.ts`

### Notificações
- **Componentes:** `NotificationSettings.tsx`, `SmartNotificationSettings.tsx`
- **Service:** `NotificationService.ts`
- **Scheduler:** `NotificationScheduler.ts`
- **Mensagens:** `notificationMessages.ts` (200+ mensagens)

### Customização
- **Componente:** `Customization.tsx`
- **Context:** `CustomizationContext.tsx`, `ThemeContext.tsx`
- **Config:** `themeConfig.ts`

## 📝 Adicionar Novas Questões

1. Editar `/data/questions.ts`
2. Adicionar objeto no array seguindo o formato:
   ```typescript
   {
     id: number,
     subject: string,
     question: string,
     options: [string, string, string, string, string],
     correctAnswer: number, // 0-4
     difficulty: 'easy' | 'medium' | 'hard',
     jobRole: string // Ex: 'tecnico-informatica'
   }
   ```
3. Build e sync

**⚠️ ATENÇÃO:** Atualmente o sistema usa `/data/seedQuestions.ts` como fonte de questões!

### Adicionar Questões no Formato Atual

Editar `/data/seedQuestions.ts` e adicionar no array `questions`:

```typescript
{
  question_number: 99,
  discipline: 'Nome da Disciplina',
  statement: 'Texto da questão aqui...',
  options: {
    'A': 'Primeira alternativa',
    'B': 'Segunda alternativa',
    'C': 'Terceira alternativa',
    'D': 'Quarta alternativa',
    'E': 'Quinta alternativa'
  },
  correct_option: 'B'  // Letra da resposta correta
},
```

**Componentes que usam seedQuestions:**
- ✅ SimulatedExam.tsx (já integrado)
- ⏳ SmartQuizSession.tsx (precisa integrar)
- ⏳ StudySession.tsx (precisa integrar)

Veja mais detalhes em `/CORRECAO_QUESTOES.md`