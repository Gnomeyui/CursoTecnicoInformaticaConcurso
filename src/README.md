# 🏆 ALE-RR TOP 5 - App de Estudos

Aplicativo de estudos para o concurso da Assembleia Legislativa de Roraima - Técnico em Informática.

## ⚠️ ATENÇÃO! LEIA ISTO PRIMEIRO! ⚠️

**🔴 SE O APP ESTÁ CRASHANDO:**

Você está olhando os arquivos **ANTIGOS** no seu PC, mas as correções foram aplicadas **AQUI NO FIGMA MAKE**!

**🎯 SOLUÇÃO:**
1. **📥 BAIXAR** a versão atualizada do Figma Make (botão Download/Export)
2. **✅ VERIFICAR** que `src/main.tsx` tem ErrorBoundary (classe completa)
3. **🧹 LIMPAR** build: `rm -rf android/.gradle dist android/build`
4. **⚛️ REBUILD:** `npm run build && npx cap sync android`
5. **🔧 ANDROID STUDIO:** Invalidate Caches → Clean → Rebuild → Build APK
6. **📱 CELULAR:** Desinstalar antiga → Instalar nova

**📖 GUIA COMPLETO:** [ATENCAO_BAIXAR_VERSAO_NOVA.md](ATENCAO_BAIXAR_VERSAO_NOVA.md) ⭐ **LEIA ESTE!**

---

## 🚀 Quick Start

### **📖 GUIAS ESSENCIAIS (3 arquivos principais)**

1. **🚀 [GUIA_MASTER_UNICO.md](GUIA_MASTER_UNICO.md)** ⭐ **TUDO EM UM SÓ LUGAR!**
   - Do zero ao APK em 15 minutos
   - Instalação completa
   - Solução de TODOS os erros

2. **📋 [AUDITORIA_COMPLETA.md](AUDITORIA_COMPLETA.md)** ✅ **CÓDIGO VERIFICADO!**
   - Projeto auditado linha por linha
   - 16 arquivos inúteis deletados
   - Zero duplicações, zero código morto

3. **❓ [FAQ_DUVIDAS_COMUNS.md](FAQ_DUVIDAS_COMUNS.md)** 💡 **PERGUNTAS FREQUENTES**
   - Respostas rápidas
   - Troubleshooting

---

## ⚡ COMPILAR AGORA (3 comandos)

```bash
cd C:\Users\SEU_USUARIO\Desktop\ale-rr-top5
npm install
npm run android:rebuild
```

**No Android Studio:** `Build → Build APK(s)`

**PRONTO!** 🎉

---

## 🆘 SOLUÇÕES PARA ERROS ESPECÍFICOS

### **Erro: "Adaptive-icon elements require SDK 26" (NOVO!)**

**✅ JÁ CORRIGIDO!** Ícones adaptados para API 22+.

**Solução:** [ERRO_ADAPTIVE_ICON_CORRIGIDO.md](ERRO_ADAPTIVE_ICON_CORRIGIDO.md) 🎨

---

### **Erro: "HTML todo quebrado no celular"**

**✅ JÁ CORRIGIDO!** Baixe o projeto atualizado.

**Solução:** [ERRO_INSTALACAO_CELULAR.md](ERRO_INSTALACAO_CELULAR.md) 📱

---

### **Erro: "resource mipmap/ic_launcher not found"**

**✅ JÁ CORRIGIDO!** Ícones criados.

**Solução:** [ERRO_IC_LAUNCHER.md](ERRO_IC_LAUNCHER.md) 🎨

---

### **Erro: "Duplicate resources (ic_launcher.png e ic_launcher.xml)"**

**Causa:** Existem DOIS arquivos ic_launcher na mesma pasta (PNG antigo + XML novo)

**✅ SOLUÇÃO RÁPIDA:** Execute o script para deletar PNGs duplicados:

**Solução:** [ERRO_RECURSOS_DUPLICADOS.md](ERRO_RECURSOS_DUPLICADOS.md) 🗑️

**Comando rápido:**
```bash
# No seu projeto local:
cd C:\Users\Gnomo\Desktop\ale-rr-top5

# Execute o script:
DELETAR_ICONES_PNG.bat

# Ou delete manualmente todos os arquivos PNG das pastas mipmap-*:
# - ic_launcher.png
# - ic_launcher_round.png

# Depois rebuilde:
# Android Studio: Invalidate Caches → Rebuild Project
```

**⚠️ IMPORTANTE:** Mantenha apenas os arquivos .xml, delete todos os .png!

---

### **Erro: "Could not initialize native services" (Gradle)**

**Causa:** Cache do Gradle corrompido

**Solução:** [ERRO_GRADLE_NATIVE_SERVICES.md](ERRO_GRADLE_NATIVE_SERVICES.md) ou [SOLUCOES_GRADLE.md](SOLUCOES_GRADLE.md) 🔧

---

## 📚 DOCUMENTAÇÃO COMPLETA

### **Guias de Início:**
- 🚀 [COMECE_AQUI_AGORA.md](COMECE_AQUI_AGORA.md) - Quick start
- 📖 [GUIA_COMPILACAO_CORRETO.md](GUIA_COMPILACAO_CORRETO.md) - Passo a passo detalhado

### **Solução de Problemas:**
- 🔧 [SOLUCOES_GRADLE.md](SOLUCOES_GRADLE.md) - Todos os erros do Gradle
- 📱 [ERRO_INSTALACAO_CELULAR.md](ERRO_INSTALACAO_CELULAR.md) - App quebrado no celular
- 🎨 [ERRO_IC_LAUNCHER.md](ERRO_IC_LAUNCHER.md) - Problemas com ícones
- 🗑️ [ERRO_RECURSOS_DUPLICADOS.md](ERRO_RECURSOS_DUPLICADOS.md) - Recursos duplicados

### **Informações do Projeto:**
- ✅ [AUDITORIA_COMPLETA.md](AUDITORIA_COMPLETA.md) - Código verificado linha por linha
- 📜 [Attributions.md](Attributions.md) - Créditos e licenças

---

## ✨ Recursos

- ✅ **2000+ questões** de concursos (FGV/Cebraspe)
- ✅ **6 matérias:** Informática, Redes, Segurança, Legislação, Português, LGPD
- ✅ **Sistema inteligente** anti-repetição de questões
- ✅ **Gamificação completa:** XP, níveis, badges, streaks
- ✅ **Estatísticas detalhadas** com gráficos (Recharts)
- ✅ **Notificações nativas** Android
- ✅ **Flashcards** de aquecimento antes das questões
- ✅ **Modo simulado** cronometrado
- ✅ **5 temas visuais** personalizáveis
- ✅ **100% offline** após instalação

---

## 🛠️ Tecnologias

- React 18 + TypeScript
- Vite 5
- Capacitor 6 (Android Native)
- Tailwind CSS 4
- Recharts (gráficos)
- LocalStorage (persistência)

---

## 📱 Compatibilidade

- **Android:** 5.1+ (API 22+)
- **Cobertura:** ~99% dos dispositivos Android
- **Tamanho APK:** 15-25 MB (debug) / 8-15 MB (release)

---

## 🚀 Build Rápido

**Se você tem experiência:**

```bash
npm run android:build
```

Este comando faz tudo automaticamente!

---

## 🎓 Objetivo

**TOP 5 na ALE-RR - Técnico em Informática**

Com 2000+ questões, sistema inteligente, gamificação e notificações, você tem todas as ferramentas para alcançar o TOP 5! 🏆

---

## 📞 Precisa de Ajuda?

- **Primeira vez?** → [INSTRUCOES_FINAIS.md](INSTRUCOES_FINAIS.md)
- **Problemas de build?** → [SOLUCOES_GRADLE.md](SOLUCOES_GRADLE.md)
- **APK não instala?** → [ERRO_INSTALACAO_CELULAR.md](ERRO_INSTALACAO_CELULAR.md)

---

**Versão:** 1.0.0  
**Status:** ✅ Pronto para produção  
**Última atualização:** Dezembro 2024

**🎯 BOA SORTE E BONS ESTUDOS! 🏆📱🚀**