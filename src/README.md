# ALE-RR TOP 1 - Aplicativo de Estudos

Aplicativo web completo para estudos do concurso da **ALE-RR (Assembleia Legislativa de Roraima)** para o cargo de **Técnico em Informática**.

## 🎯 Objetivo

Preparar candidatos para alcançar o **TOP 1** no concurso através de um sistema gamificado e completo de estudos.

## ✨ Funcionalidades Implementadas

### 📚 Sistema de Quiz
- **5 matérias completas**: Informática, Legislação, Português, LGPD e Governança de TI
- **3 níveis de dificuldade**: Fácil (+5 XP), Médio (+10 XP), Difícil (+20 XP)
- **Modo misto**: Todas as dificuldades em uma sessão
- **Explicações detalhadas**: Cada questão possui explicação após resposta
- **20 questões** no banco de dados (expansível)

### 🎮 Gamificação Completa
- **Sistema de XP**: Ganhe pontos por acertos
- **Sistema de Níveis**: 100 níveis disponíveis (100 XP por nível)
- **Celebrações animadas**: Level Up e conquistas especiais
- **Proteção contra loop infinito**: Segurança implementada no cálculo de níveis

### 🏆 Sistema de Conquistas
- **12 conquistas desbloqueáveis**:
  - Primeiros Passos (1 questão)
  - Novato (50 questões)
  - Estudante (200 questões)
  - Especialista (500 questões)
  - Mestre (1000 questões)
  - Precisão Perfeita (90% de acerto)
  - Dedicação (7 dias de sequência)
  - Disciplina Total (30 dias)
  - E mais...
- **Barra de progresso** para cada conquista

### 📊 Dashboard Analítico
- **Estatísticas em tempo real**:
  - Questões respondidas hoje
  - Taxa de acerto diária
  - Sequência de dias (streak)
  - Total de questões
  - Precisão geral
- **Cartões visuais** com ícones e cores

### 📈 Estatísticas Avançadas
- **3 visualizações**:
  - Visão Geral
  - Progresso Diário (últimos 7 dias)
  - Desempenho por Matéria
- **Gráficos interativos** (Recharts):
  - Gráfico de linha (progresso diário)
  - Gráfico de barras (precisão por matéria)
  - Gráfico de pizza (distribuição de questões)

### 🎨 Personalização Total
- **5 temas de cores**:
  - Padrão (Azul)
  - Floresta (Verde)
  - Oceano (Ciano)
  - Pôr do Sol (Laranja)
  - Noite (Roxo)
- **Modo escuro/claro** com toggle
- **Preview em tempo real**

### 💾 Persistência de Dados
- **localStorage** para salvar:
  - Progresso de XP e níveis
  - Estatísticas detalhadas por dia
  - Desempenho por matéria
  - Tema e preferências
- **Fonte única da verdade**: StatsContext gerencia todos os dados

## 🏗️ Arquitetura Profissional

### ✅ Boas Práticas Implementadas

#### 1. **Ciclo de Vida do App**
```typescript
// Detecta quando o usuário volta do background
document.addEventListener('visibilitychange', handleVisibilityChange);
```
- Verifica mudança de data ao retomar o app
- Força atualização dos contadores diários
- **Resolve o bug do "dia seguinte"**

#### 2. **Fonte Única da Verdade**
```typescript
// Estado derivado - não há redundância
const today = new Date().toISOString().split('T')[0];
const todayStats = detailedStats.dailyStats.find(d => d.date === today);
const dailyScore = todayStats ? todayStats.correctAnswers : 0;
```
- Todos os dados vêm do **StatsContext**
- Eliminação de estados duplicados
- Previne dessincronização

#### 3. **Segurança contra Loop Infinito**
```typescript
const getLevelFromXP = (currentXP: number): number => {
  let calculatedLevel = 1;
  let remainingXP = currentXP;
  
  while (remainingXP >= XP_PER_LEVEL && calculatedLevel < MAX_LEVEL) {
    remainingXP -= XP_PER_LEVEL;
    calculatedLevel++;
  }
  
  return calculatedLevel;
};
```
- **MAX_LEVEL = 100**: Limite de segurança
- Protege contra XP corrompido

#### 4. **Safe Area CSS**
```css
body {
  padding-top: var(--safe-area-top);
  padding-bottom: var(--safe-area-bottom);
  padding-left: var(--safe-area-left);
  padding-right: var(--safe-area-right);
}
```
- Funciona em dispositivos com notch
- Layout não fica escondido

#### 5. **Meta Theme Color**
```typescript
// Sincroniza cor da barra de status com tema
const metaThemeColor = document.querySelector('meta[name="theme-color"]');
metaThemeColor.setAttribute('content', colors[currentTheme]);
```
- Experiência nativa em dispositivos móveis

## 🛠️ Tecnologias Utilizadas

- **React 18**: Framework principal
- **TypeScript**: Tipagem estática
- **Tailwind CSS 4**: Estilização
- **Recharts**: Gráficos interativos
- **Lucide React**: Ícones modernos
- **Context API**: Gerenciamento de estado
- **localStorage**: Persistência de dados

## 📱 Responsividade

- Design mobile-first
- Otimizado para telas pequenas
- Funciona em desktop também

## 🚀 Como Usar

1. Acesse o aplicativo
2. Clique em **"Iniciar Quiz"**
3. Escolha a **dificuldade**
4. Responda as questões
5. Ganhe **XP** e **conquistas**
6. Acompanhe seu progresso nas **Estatísticas**
7. Personalize o tema em **Personalização**

## 📊 Estrutura de Dados

### StatsContext
```typescript
interface DetailedStats {
  dailyStats: DailyStat[];           // Histórico diário
  subjectStats: SubjectStat[];       // Por matéria
  totalQuestionsAnswered: number;    // Total geral
  totalCorrectAnswers: number;       // Acertos totais
  overallAccuracy: number;           // Precisão %
  currentStreak: number;             // Dias consecutivos
  longestStreak: number;             // Recorde
  totalStudyTime: number;            // Tempo em minutos
}
```

### GameContext
```typescript
interface GameContext {
  xp: number;                        // Experiência total
  level: number;                     // Nível atual (1-100)
  addXP: (amount: number) => void;   // Adicionar XP
  getLevelProgress: () => number;    // Progresso %
}
```

## 🎯 Próximas Expansões Possíveis

- [ ] Mais questões (expandir banco de dados)
- [ ] Sistema de favoritos em questões
- [ ] Modo simulado cronometrado
- [ ] Comentários em questões
- [ ] Compartilhamento de conquistas
- [ ] Ranking de usuários (com backend)
- [ ] Notificações de estudo
- [ ] Leitura do Regimento Interno

## ✅ Status do Projeto

**PRODUÇÃO - 100% FUNCIONAL**

Todas as boas práticas de arquitetura foram implementadas:
- ✅ Ciclo de vida gerenciado
- ✅ Estado centralizado
- ✅ Segurança implementada
- ✅ Persistência funcionando
- ✅ UI/UX polida
- ✅ Responsivo
- ✅ Acessível

---

**Desenvolvido com 💙 para candidatos ao TOP 1 da ALE-RR**
