# 📚 Gabaritoo - App de Estudos para Concursos

> Aplicativo Android nativo desenvolvido em React + Capacitor para estudos de concursos públicos.

[![Status](https://img.shields.io/badge/status-em%20desenvolvimento-yellow)](https://github.com)
[![Android](https://img.shields.io/badge/android-5.0%2B-green)](https://github.com)
[![License](https://img.shields.io/badge/license-MIT-blue)](https://github.com)

---

## 🚀 Funcionalidades

### ✅ Core Features
- **Quiz Inteligente** - Sistema de questões com dificuldade adaptativa
- **Estatísticas Completas** - Gráficos de desempenho e progresso
- **Gamificação** - Sistema de XP, níveis e badges
- **Dashboard Analítico** - Visão geral do seu progresso
- **Modo Simulado** - Simulados cronometrados
- **Múltiplos Perfis** - Estude para diferentes cargos

### 🎯 Features Avançadas
- **Revisão Inteligente** - 30% questões erradas + 70% novas
- **Customização Visual** - 8 temas diferentes
- **Notificações Inteligentes** - Lembretes motivacionais
- **Sistema Premium** - 3 planos de assinatura
- **Vouchers/Cupons** - Códigos promocionais
- **Offline First** - Funciona sem internet

---

## 🛠️ Stack Tecnológica

| Categoria | Tecnologia | Versão |
|-----------|-----------|--------|
| **Frontend** | React | 18.x |
| **Linguagem** | TypeScript | 5.x |
| **Mobile** | Capacitor | 6.x |
| **Banco de Dados** | SQLite | - |
| **Estilização** | Tailwind CSS | 4.0 |
| **UI Components** | Shadcn/UI (Radix) | - |
| **Gráficos** | Recharts | - |
| **Ícones** | Lucide React | - |

---

## 📦 Instalação e Setup

### **Pré-requisitos:**
- Node.js 18+ 
- Android Studio (para build Android)
- Git

### **1. Clonar o repositório:**
```bash
git clone <repo-url>
cd gabaritoo
```

### **2. Instalar dependências:**
```bash
npm install
```

### **3. Build do projeto:**
```bash
npm run build
```

### **4. Sincronizar com Android:**
```bash
npx cap sync android
```

### **5. Abrir no Android Studio:**
```bash
npx cap open android
```

---

## 🔧 Scripts Disponíveis

```bash
npm run dev              # Servidor de desenvolvimento (web)
npm run build            # Build de produção
npm run preview          # Preview do build

npx cap sync android     # Sincronizar com Android
npx cap open android     # Abrir Android Studio
```

---

## 📂 Estrutura do Projeto

```
gabaritoo/
├── app/                    # Configuração do app (Providers, Routes, Shell)
├── features/               # Features organizadas por domínio
│   ├── dashboard/
│   ├── settings/
│   ├── study/
│   ├── exams/
│   └── ...
├── shared/                 # Código compartilhado
│   ├── ui/                 # Componentes UI reutilizáveis
│   ├── hooks/              # Hooks customizados
│   └── utils/              # Utilitários
├── components/             # Componentes base (Shadcn/UI)
│   └── ui/
├── context/                # Contexts React
├── services/               # Serviços (Auth, Sync, etc)
├── lib/                    # Libs e configs
├── android/                # Projeto Android (Capacitor)
├── docs/                   # Documentação completa
└── scripts/                # Scripts de automação
```

---

## 📖 Documentação

Toda a documentação está organizada em `/docs/`:

- **[Guia de Início Rápido](docs/guias/COMECE_AQUI.md)**
- **[Como Gerar APK](docs/guias/COMO_GERAR_APK.md)**
- **[Arquitetura do Sistema](docs/sistema/ARQUITETURA_ESCALAVEL.md)**
- **[Sistema de Planos Premium](docs/sistema/APRESENTACAO_SISTEMA_PLANOS.md)**
- **[Vouchers e Cupons](docs/vouchers/VOUCHER_README.md)**
- **[Índice Completo](docs/README.md)**

---

## 🎯 Roadmap

### ✅ Concluído (v1.0)
- [x] Sistema de quiz completo
- [x] Gamificação (XP, níveis, badges)
- [x] Dashboard com estatísticas
- [x] Modo simulado
- [x] Sistema premium
- [x] Sistema de vouchers
- [x] SQLite local
- [x] Build Android

### 🚧 Em Desenvolvimento (v2.0)
- [ ] Refatoração completa (Feature-Sliced Design)
- [ ] Testes automatizados
- [ ] CI/CD
- [ ] Publicação na Play Store

### 📋 Futuro (v3.0)
- [ ] Backend com Supabase
- [ ] Sincronização multi-dispositivo
- [ ] Modo colaborativo
- [ ] Ranking global

---

## 🤝 Contribuindo

Contribuições são bem-vindas! Por favor, leia [CONTRIBUTING.md](CONTRIBUTING.md) antes de enviar PRs.

---

## 📄 Licença

Este projeto está sob a licença MIT. Veja [LICENSE](LICENSE) para mais detalhes.

---

## 👥 Autores

Desenvolvido por [Seu Nome/Equipe]

---

## 📧 Contato

- **Email:** seuemail@exemplo.com
- **Website:** https://gabaritoo.com

---

**⭐ Se este projeto foi útil, considere dar uma estrela!**
