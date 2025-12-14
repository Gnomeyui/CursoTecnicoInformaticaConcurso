# 🎓 ALE-RR TOP 5 - App de Estudos para Concurso

Aplicativo Android nativo para estudo do concurso da Assembleia Legislativa de Roraima (ALE-RR) - Cargo: Técnico em Informática.

## 🎯 Objetivo

Alcançar o **TOP 5** no concurso através de um sistema completo de estudos gamificado.

## ✨ Funcionalidades

### 📚 Sistema de Estudos
- **Quiz Interativo**: Questões de múltipla escolha com feedback imediato
- **Flashcards**: Revisão rápida de conceitos importantes
- **Simulados Cronometrados**: Testes em condições reais de prova
- **5 Matérias**: Informática, Legislação, Português, LGPD, Governança de TI

### 🎮 Gamificação Completa
- **Sistema XP e Níveis**: Ganhe experiência ao responder questões
- **Badges e Conquistas**: Desbloqueie conquistas especiais
- **Streaks**: Mantenha uma sequência diária de estudos
- **Ranking de Desempenho**: Acompanhe sua evolução

### 📊 Estatísticas Avançadas
- **Gráficos Interativos**: Visualize seu progresso (Recharts)
- **Dashboard Analítico**: Métricas detalhadas por matéria
- **Histórico Completo**: Todas suas sessões de estudo
- **Taxa de Acerto**: Acompanhe sua evolução

### 🔔 Notificações Inteligentes
- **Lembretes Programáveis**: Configure horários personalizados
- **Mensagens Motivacionais**: Frases inspiradoras aleatórias
- **3 Frequências**: Baixa (1x), Média (3x), Alta (5x) por dia
- **Sistema Híbrido**: Funciona em Web e Android nativo

### 🎨 Personalização Total
- **5 Temas Visuais**: Padrão, Escuro, Azul, Verde, Rosa
- **Layout Customizável**: Ajuste a interface ao seu gosto
- **Persistência Local**: Todas configurações salvas

## 🚀 Como Buildar e Instalar

### Pré-requisitos
- Node.js 18+
- Android Studio (última versão)
- JDK 17+
- Um celular Android (API 26+)

### Passo 1: Instalar Dependências
```bash
npm install
```

### Passo 2: Build do Projeto
```bash
# Use o script automatizado
npm run build:android

# Ou manualmente:
npm run build
npx cap sync android
```

### Passo 3: Compilar no Android Studio
```bash
# Abre o Android Studio
npx cap open android
```

**No Android Studio:**
1. Aguarde o Gradle Sync terminar
2. Build > Clean Project
3. Build > Rebuild Project
4. Conecte seu celular via USB
5. Run (botão verde ▶️)

### Script Automatizado (Recomendado)

**Windows:**
```batch
COMANDOS_REBUILD_TOTAL.bat
```

**Linux/Mac:**
```bash
chmod +x COMANDOS_REBUILD_TOTAL.sh
./COMANDOS_REBUILD_TOTAL.sh
```

## 📱 Estrutura do Projeto

```
/
├── components/          # Componentes React
│   ├── QuizScreen.tsx
│   ├── Statistics.tsx
│   ├── Dashboard.tsx
│   ├── Achievements.tsx
│   ├── SimulatedExam.tsx
│   ├── Customization.tsx
│   ├── NotificationSettings.tsx
│   └── ui/             # Componentes UI (shadcn)
├── context/            # Context API
│   ├── GameContext.tsx
│   ├── StatsContext.tsx
│   ├── NotificationContext.tsx
│   ├── ThemeContext.tsx
│   └── CustomizationContext.tsx
├── data/               # Dados do app
│   ├── questions.ts    # Banco de questões
│   └── flashcards.ts   # Banco de flashcards
├── android/            # Projeto Android nativo
│   └── app/
│       └── src/main/
│           ├── AndroidManifest.xml
│           └── res/    # Recursos Android
├── public/             # Arquivos estáticos
└── App.tsx             # Componente principal
```

## 🔧 Tecnologias Utilizadas

- **React 18** - Framework frontend
- **TypeScript** - Tipagem estática
- **Vite** - Build tool
- **Tailwind CSS** - Estilização
- **Capacitor** - Framework híbrido Android
- **Recharts** - Gráficos e estatísticas
- **Lucide React** - Ícones
- **Sonner** - Toasts/notificações
- **LocalStorage** - Persistência de dados

## 📦 Plugins Capacitor

- `@capacitor/local-notifications` - Notificações programadas
- `@capacitor/haptics` - Feedback tátil
- `@capacitor/status-bar` - Barra de status
- `@capacitor/keyboard` - Controle do teclado

## 🎨 Temas Disponíveis

1. **Padrão** - Roxo vibrante (#7C3AED)
2. **Escuro** - Cinza escuro elegante
3. **Azul** - Azul profissional
4. **Verde** - Verde energizante
5. **Rosa** - Rosa suave

## 📊 Sistema de Gamificação

### Níveis e XP
- +10 XP por questão correta
- +5 XP por questão respondida (mesmo errada)
- 100 XP = 1 nível

### Badges Disponíveis
- 🏆 **Iniciante** - Complete 10 questões
- 🔥 **Estudioso** - 7 dias de streak
- 🎯 **Expert** - 90% de acerto
- 💯 **Perfeito** - 100% em um simulado
- 📚 **Dedicado** - 100 questões respondidas
- ⚡ **Relâmpago** - Complete um simulado em tempo recorde

## 🔔 Sistema de Notificações

### Configuração
1. Abra o app
2. Vá em **Configurações**
3. Ative **Notificações de Estudo**
4. Escolha a frequência
5. Aceite a permissão

### Horários Padrão
- **Baixa**: 09:00
- **Média**: 09:00, 14:00, 20:00
- **Alta**: 08:00, 11:00, 14:00, 17:00, 20:00

## 🐛 Troubleshooting

### App não instala no celular?
1. Verifique se o cabo USB está em modo transferência
2. Ative a **Depuração USB** no Android
3. Execute `adb devices` para confirmar conexão
4. Clean e Rebuild no Android Studio

### Notificações não aparecem?
1. Verifique permissões: Configurações Android > Apps > ALE-RR TOP 5 > Notificações
2. Desative otimização de bateria para o app
3. Veja os logs no Logcat (Android Studio)

### Erro de build Gradle?
```bash
# Limpe o cache
cd android
./gradlew clean

# Volte para raiz e reconstrua
cd ..
npm run build
npx cap sync android
```

## 📈 Estatísticas do Projeto

- **8 Componentes Principais**
- **5 Context Providers**
- **300+ Questões** (50 por matéria)
- **100+ Flashcards**
- **6 Funcionalidades Avançadas**
- **5 Temas Customizáveis**

## 🏆 Meta: TOP 5

Este app foi desenvolvido especificamente para ajudar você a alcançar uma das **5 melhores colocações** no concurso da ALE-RR.

**Estude consistentemente. Use as ferramentas. Alcance o TOP 5! 🚀**

## 📄 Licença

Este projeto é de uso pessoal para estudo do concurso ALE-RR.

---

**Desenvolvido com dedicação para o TOP 5 da ALE-RR 2024** 💜
