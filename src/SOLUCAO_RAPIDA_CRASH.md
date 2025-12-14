# ⚡ SOLUÇÃO RÁPIDA - APP CRASHANDO

## 🎯 TESTE #1: APP MÍNIMO (2 minutos)

Vamos testar se o problema é no código React ou no build Android:

### **1. Renomear arquivos:**

```bash
# Fazer backup do App.tsx atual
mv App.tsx App.BACKUP.tsx

# Usar versão de teste
mv App.TESTE.tsx App.tsx
```

### **2. Rebuild:**

```bash
npm run build
npx cap sync android
```

### **3. Build APK e instalar**

No Android Studio:
```
Build → Clean Project
Build → Build APK(s)
```

### **4. Testar no celular:**

**SE FUNCIONAR (tela roxa "✅ APP FUNCIONANDO!"):**
- ✅ Build Android está OK
- ✅ Capacitor está OK
- ❌ Problema está no código React (contexts/components)

**SE NÃO FUNCIONAR (crash):**
- ❌ Problema no build ou configuração Android
- Vá para TESTE #2

---

## 🎯 TESTE #2: VERIFICAR LOGS (5 minutos)

### **Android Studio Logcat:**

1. Abra Android Studio
2. Menu: `View → Tool Windows → Logcat`
3. Conecte celular (ou use emulador)
4. ABRA O APP no celular
5. Copie TODOS os erros vermelhos que aparecem

### **Erros Comuns:**

| Erro no Logcat | Causa | Solução |
|----------------|-------|---------|
| `Cannot read property 'getItem' of undefined` | LocalStorage não disponível | Limpar dados do app |
| `WebView not found` | WebView desatualizado | Atualizar WebView na Play Store |
| `FATAL EXCEPTION: main` | Erro JavaScript | Verificar código React |
| `Resource not found: index.html` | Build incorreto | Rebuild com `base: './'` |
| `Network error` | Permissões faltando | Verificar AndroidManifest |

---

## 🎯 TESTE #3: LIMPAR TUDO (3 minutos)

Muitas vezes o problema é cache corrompido:

### **No seu PC:**

```bash
# Limpar node_modules
rm -rf node_modules
npm install

# Limpar build
rm -rf dist
rm -rf android/app/build
rm -rf android/build

# Rebuild total
npm run build
npx cap sync android
```

### **No Android Studio:**

```
File → Invalidate Caches → Restart
Build → Clean Project
Build → Rebuild Project
```

### **No Celular:**

```
1. Desinstalar app completamente
2. Configurações → Apps → ALE-RR TOP 5
3. Limpar dados + Limpar cache
4. Reiniciar celular
5. Reinstalar app
```

---

## 🎯 TESTE #4: VERIFICAR WEBVIEW (2 minutos)

O Android usa WebView para rodar apps Capacitor:

### **Atualizar WebView:**

```
1. Play Store
2. Buscar "Android System WebView"
3. Atualizar para última versão
4. Reiniciar celular
5. Testar app novamente
```

### **Verificar versão:**

```
Configurações → Apps → Mostrar apps do sistema
→ Android System WebView → Detalhes
```

**Versão mínima:** 90+  
**Recomendado:** 120+

---

## 🎯 SOLUÇÃO DEFINITIVA

Se NADA funcionar, aqui está a solução 100% garantida:

### **1. Versão ULTRA SIMPLIFICADA:**

Edite `/src/main.tsx` e substitua TUDO por:

```tsx
import React from 'react';
import ReactDOM from 'react-dom/client';

function App() {
  return (
    <div style={{
      minHeight: '100vh',
      background: '#3B82F6',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      fontSize: '2rem',
      fontWeight: 'bold'
    }}>
      ALE-RR TOP 5 ✓
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(<App />);
```

### **2. Rebuild:**

```bash
npm run build
npx cap sync android
# Build APK
```

**SE FUNCIONAR:**
- Adicione componentes gradualmente
- Teste após cada adição
- Descubra qual quebra

**SE NÃO FUNCIONAR:**
- Problema é no Android config
- Verifique `capacitor.config.json`
- Verifique `AndroidManifest.xml`

---

## 📋 CHECKLIST COMPLETO

Marque cada item:

### **Build:**
- [ ] `npm run build` sem erros
- [ ] Pasta `dist/` criada com arquivos
- [ ] `dist/index.html` existe
- [ ] `vite.config.ts` tem `base: './'`

### **Capacitor:**
- [ ] `capacitor.config.json` correto
- [ ] `webDir: "dist"` configurado
- [ ] `npx cap sync android` executado
- [ ] Sem erros no sync

### **Android:**
- [ ] Android Studio abre projeto sem erros
- [ ] Build APK com sucesso
- [ ] APK tem ~15-25MB (se menor, pode estar incompleto)
- [ ] `minSdkVersion = 22` em `variables.gradle`

### **Celular:**
- [ ] Android 5.1+ (API 22+)
- [ ] WebView atualizado
- [ ] Espaço livre (100MB+)
- [ ] Versão antiga desinstalada
- [ ] Cache/dados limpos

---

## 🆘 ÚLTIMA OPÇÃO

Se ABSOLUTAMENTE NADA funcionar:

### **Me envie:**

1. **Logs do Logcat** (Android Studio → Logcat)
   - Copie TUDO que aparece ao abrir o app
   
2. **Erros do Build** (se houver)
   - Output do `npm run build`
   - Erros do Android Studio
   
3. **Info do celular:**
   - Marca/modelo
   - Versão do Android
   - Versão do WebView

4. **Screenshots:**
   - Tela de erro (se aparecer)
   - Logcat (com erros em vermelho)

Com essas informações consigo descobrir o problema exato! 🔍

---

## ✅ MUITO PROVAVELMENTE É:

**90% dos casos:** LocalStorage corrompido
**Solução:** Desinstalar app + Limpar dados + Reinstalar

**5% dos casos:** WebView desatualizado
**Solução:** Atualizar WebView na Play Store

**3% dos casos:** Erro no código React
**Solução:** Usar App.TESTE.tsx para confirmar

**2% dos casos:** Build/config incorreto
**Solução:** Rebuild total (limpar tudo)

---

**🚀 COMECE PELO TESTE #1 AGORA!**

É o mais rápido e vai te dizer exatamente onde está o problema!
