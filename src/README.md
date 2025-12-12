# 📱 ALE-RR TOP 5 - App Android

> **App de estudos para concurso da Assembleia Legislativa de Roraima**  
> **Cargo:** Técnico em Informática  
> **Objetivo:** 🏆 Ficar no TOP 5!

---

## 🎯 SOBRE O APP

Sistema completo de quiz com:

- ✅ **2.000+ questões** (Informática, Legislação, Português, LGPD, Governança TI)
- ✅ **Notificações inteligentes** para lembrar de estudar
- ✅ **Sistema de metas diárias** configurável
- ✅ **Flashcards de aquecimento** antes das questões
- ✅ **Estatísticas detalhadas** com gráficos
- ✅ **Gamificação completa** (XP, níveis, badges)
- ✅ **Modo simulado** cronometrado
- ✅ **5 temas visuais** (Azul, Roxo, Verde, Laranja, Dark)
- ✅ **Dashboard analítico** expandido
- ✅ **Sistema inteligente** que evita repetir questões

---

## 🚀 COMO GERAR O APK

### **OPÇÃO 1: Método Rápido (Recomendado)**

Veja o guia completo: **[GUIA_ANDROID_STUDIO.md](./GUIA_ANDROID_STUDIO.md)**

**5 passos:**

```bash
# 1. Instalar dependências
npm install

# 2. Adicionar Android
npx cap add android

# 3. Buildar projeto
npm run build

# 4. Sincronizar
npx cap sync android

# 5. Abrir Android Studio
npx cap open android
```

No Android Studio:  
**Build → Build APK(s) → Aguarde → Locate**

APK estará em: `android/app/build/outputs/apk/debug/app-debug.apk`

---

### **OPÇÃO 2: Método Online (Sem instalar nada)**

Veja o guia: **[METODO_FACIL_APK.md](./METODO_FACIL_APK.md)**

**3 passos:**

1. Acesse: https://www.pwabuilder.com/
2. Cole a URL do app
3. Download do APK

---

## 📋 REQUISITOS

### **Para gerar APK:**
- Node.js 20+
- Android Studio
- Java JDK 17

### **Para usar o app:**
- Android 5.1+ (API 22)
- 50 MB de espaço
- Conexão inicial (depois funciona offline)

---

## 📁 ESTRUTURA DO PROJETO

```
alerr-app/
├── android/              # Projeto Android nativo
├── components/           # Componentes React
│   ├── QuizScreen.tsx
│   ├── Dashboard.tsx
│   ├── Statistics.tsx
│   ├── Achievements.tsx
│   └── ...
├── context/             # Contextos (State Management)
│   ├── GameContext.tsx
│   ├── StatsContext.tsx
│   ├── ThemeContext.tsx
│   └── ...
├── data/                # Banco de questões
│   ├── questions.ts
│   ├── flashcards.ts
│   └── ...
├── public/              # Assets públicos
│   └── manifest.json
├── src/                 # Entry point
│   └── main.tsx
├── styles/              # Estilos globais
│   └── globals.css
├── App.tsx              # Componente principal
├── capacitor.config.json # Config Capacitor
├── package.json         # Dependências
├── vite.config.ts       # Config Vite
└── README.md            # Este arquivo
```

---

## 🎨 FUNCIONALIDADES IMPLEMENTADAS

### **1. Sistema de Quiz Inteligente**
- Embaralhamento de respostas
- Evita repetir questões recentes
- Intercala novas questões com revisão
- Feedback imediato com explicações

### **2. Flashcards de Aquecimento**
- Aparecem antes das questões
- Conceitos rápidos por matéria
- Preparação mental para o estudo

### **3. Notificações Inteligentes**
- Lembretes configuráveis ao longo do dia
- Mensagens motivacionais variadas
- Funciona em background (Android)

### **4. Gamificação Completa**
- Sistema de XP e níveis
- Badges desbloqueáveis
- Streaks de dias consecutivos
- Ranking de performance

### **5. Estatísticas Avançadas**
- Gráficos de desempenho por matéria
- Histórico de estudos
- Taxa de acerto global
- Progresso diário/semanal/mensal

### **6. Modo Simulado**
- Cronômetro regressivo
- Condições reais de prova
- Análise de tempo por questão
- Resultado detalhado

### **7. Personalização Total**
- 5 temas de cores
- Modo escuro
- Configuração de metas
- Horários personalizados

### **8. Dashboard Analítico**
- Visão geral do progresso
- Próximas metas
- Matérias que precisam de atenção
- Recomendações inteligentes

---

## 📚 BANCO DE QUESTÕES

**Total:** 2.000+ questões

**Distribuição por matéria:**
- **Informática:** 1.200 questões
  - Redes: 300
  - Segurança: 300
  - Hardware: 200
  - Sistemas Operacionais: 400
- **Legislação:** 400 questões
  - Direito Administrativo: 250
  - Regimento ALE-RR: 150
- **Português:** 200 questões
- **LGPD:** 100 questões
- **Governança de TI:** 100 questões

**Nível:** FGV/Cebraspe (bancas oficiais)

---

## 🔧 DESENVOLVIMENTO

### **Tecnologias Utilizadas:**

- **Frontend:** React 18 + TypeScript
- **Build:** Vite
- **Mobile:** Capacitor 6
- **Gráficos:** Recharts
- **Ícones:** Lucide React
- **Estilos:** Tailwind CSS 4.0
- **Storage:** LocalStorage (offline-first)

### **Plugins Capacitor:**

- `@capacitor/app` - Ciclo de vida do app
- `@capacitor/haptics` - Feedback tátil
- `@capacitor/keyboard` - Controle do teclado
- `@capacitor/local-notifications` - Notificações locais
- `@capacitor/splash-screen` - Tela inicial
- `@capacitor/status-bar` - Barra de status

### **Scripts disponíveis:**

```bash
# Desenvolvimento web
npm run dev

# Buildar para produção
npm run build

# Preview da build
npm run preview

# Sincronizar com Android
npm run android:sync

# Abrir Android Studio
npm run android:build

# Rodar em dispositivo
npm run android:run
```

---

## 📱 INSTALAÇÃO NO CELULAR

### **Método 1: USB**
1. Conectar celular via USB
2. Copiar APK para celular
3. Tocar no arquivo
4. Instalar

### **Método 2: WhatsApp**
1. Enviar APK para si mesmo
2. Baixar no celular
3. Instalar

### **Método 3: Google Drive**
1. Upload do APK
2. Compartilhar link
3. Baixar e instalar

**⚠️ Lembre-se:** Habilitar "Fontes desconhecidas" nas configurações de segurança.

---

## 🎁 COMPARTILHAR COM AMIGOS

### **Google Drive (Recomendado):**
```
1. Upload do APK
2. Compartilhar → "Qualquer pessoa com o link"
3. Copiar link
4. Enviar para amigos
```

### **Grupo de Estudos:**
```
1. Criar grupo no WhatsApp
2. Enviar APK
3. Todos baixam
4. Estudar juntos!
```

---

## 📖 DOCUMENTAÇÃO COMPLETA

- **[GUIA_ANDROID_STUDIO.md](./GUIA_ANDROID_STUDIO.md)** - Guia completo Android Studio
- **[METODO_FACIL_APK.md](./METODO_FACIL_APK.md)** - Métodos alternativos
- **[COMO_GERAR_APK_ANDROID.md](./COMO_GERAR_APK_ANDROID.md)** - Guia técnico detalhado

---

## 🐛 TROUBLESHOOTING

### **Problema: npm não reconhecido**
```
Solução: Instalar Node.js
https://nodejs.org/
```

### **Problema: JAVA_HOME not found**
```
Solução:
1. Instalar Java JDK 17
2. Configurar variável de ambiente
JAVA_HOME = C:\Program Files\Java\jdk-17
```

### **Problema: APK não instala**
```
Solução:
Configurações → Segurança → Fontes desconhecidas → Ativar
```

### **Problema: App fecha sozinho**
```
Solução:
1. Conectar via USB
2. Android Studio → Logcat
3. Ver erro específico
```

**Mais problemas?** Veja [GUIA_ANDROID_STUDIO.md](./GUIA_ANDROID_STUDIO.md) seção Troubleshooting.

---

## 📊 ROADMAP

### **v1.0.0** ✅ ATUAL
- [x] Sistema de quiz completo
- [x] 2.000+ questões
- [x] Notificações inteligentes
- [x] Gamificação
- [x] Estatísticas
- [x] Modo simulado
- [x] Personalização visual

### **v1.1.0** 🔄 PRÓXIMA
- [ ] Adicionar 1.000 novas questões
- [ ] Modo competitivo (ranking online)
- [ ] Exportar estatísticas PDF
- [ ] Temas personalizados do usuário
- [ ] Widget Android

### **v2.0.0** 🎯 FUTURO
- [ ] Versão iOS (App Store)
- [ ] Sincronização em nuvem
- [ ] Modo offline total
- [ ] Inteligência artificial para recomendações
- [ ] Grupos de estudo integrados

---

## 🤝 CONTRIBUIR

Este é um projeto pessoal de estudos, mas sugestões são bem-vindas!

**Como ajudar:**
1. Usar o app e dar feedback
2. Reportar bugs encontrados
3. Sugerir novas funcionalidades
4. Contribuir com questões

---

## 📝 LICENÇA

Projeto pessoal para fins de estudos.  
Livre para uso pessoal e educacional.

---

## 👤 AUTOR

**Desenvolvido com 💙 por um futuro Técnico em Informática da ALE-RR**

**Objetivo:** 🏆 Ficar no TOP 5!

---

## 🎓 AGRADECIMENTOS

- Assembleia Legislativa de Roraima
- Comunidade de concurseiros
- Amigos que testaram o app
- Todos que acreditaram no projeto

---

## 📞 CONTATO

**Dúvidas sobre o app?**  
Consulte os guias na pasta do projeto.

**Problemas técnicos?**  
Veja a seção Troubleshooting nos guias.

---

## 🏆 MENSAGEM FINAL

> "O sucesso é a soma de pequenos esforços repetidos dia após dia."

**Com este app, você tem:**
- ✅ Questões de qualidade
- ✅ Sistema organizado
- ✅ Motivação diária
- ✅ Acompanhamento de progresso

**Agora só falta:**
- 🎯 Sua dedicação
- 🎯 Sua consistência
- 🎯 Sua determinação

# RUMO AO TOP 5 DA ALE-RR! 🚀📱🏆

**Versão:** 1.0.0  
**Última atualização:** Dezembro 2024  
**Status:** ✅ Pronto para uso
