# 🏆 ALE-RR TOP 5 - App de Estudos

Aplicativo de estudos para o concurso da Assembleia Legislativa de Roraima - Técnico em Informática.

## 🔧 Correções Aplicadas

✅ **vite.config.ts** - Configuração completa com 40+ alias de bibliotecas  
✅ **AndroidManifest.xml** - Permissão SCHEDULE_EXACT_ALARM removida  
✅ **styles.xml** - Tema NoActionBar corrigido  
✅ **MainActivity.java** - Código limpo  
✅ **splash.xml** - android:drawable ao invés de bitmap  
✅ **main.tsx** - ErrorBoundary React adicionado  

---

## 🚀 Build Rápido

```bash
# Limpar
rm -rf dist android/.gradle android/build

# Build
npm run build

# Sync
npx cap sync android

# Abrir Android Studio
npx cap open android
```

**No Android Studio:**
1. File → Invalidate Caches → Restart
2. Build → Rebuild Project
3. Build → Build APK(s)

**No celular:**
1. Desinstalar versão antiga
2. Instalar novo APK

---

## ✨ Recursos

- 2000+ questões (FGV/Cebraspe)
- 6 matérias: Informática, Redes, Segurança, Legislação, Português, LGPD
- Gamificação: XP, níveis, badges, streaks
- Estatísticas com gráficos (Recharts)
- Notificações nativas
- 5 temas visuais
- 100% offline

---

## 🛠️ Tecnologias

- React 18 + TypeScript
- Vite 5
- Capacitor 6 (Android)
- Tailwind CSS 4
- Recharts

---

## 📱 Compatibilidade

- Android 5.1+ (API 22+)
- ~99% dos dispositivos Android

---

**Versão:** 1.0.0  
**Status:** ✅ Pronto para produção
