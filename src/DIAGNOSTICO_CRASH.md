# 🔴 APP CRASHANDO AO ABRIR - DIAGNÓSTICO E SOLUÇÃO

## ❌ SINTOMA

App abre e fecha imediatamente (crash loop)

## ✅ CORREÇÕES APLICADAS

### 1. **Error Boundary Adicionado** (`/src/main.tsx`)
- Captura TODOS os erros de JavaScript
- Mostra tela de erro ao invés de crash silencioso
- Botão "Reiniciar App" limpa localStorage e recarrega

### 2. **Proteção contra LocalStorage** (`/App.tsx`)
- Try/catch em todas as operações de localStorage
- Recuperação automática se localStorage estiver corrompido
- Valores default (0) se não houver dados

### 3. **Inicialização Segura do Capacitor** (`/src/main.tsx`)
- Configuração assíncrona com try/catch
- StatusBar e SplashScreen protegidos contra erros
- Logs de erro detalhados no console

## 🚀 COMO TESTAR AGORA

### **Passo 1: Rebuild Completo**

```bash
# No seu projeto local
npm run build
npx cap sync android
npx cap open android
```

### **Passo 2: No Android Studio**

```
1. Build → Clean Project
2. Build → Rebuild Project
3. Build → Build APK(s)
```

### **Passo 3: Instalar no Celular**

```
1. Desinstale a versão antiga do app
2. Instale o novo APK
3. Abra o app
```

### **SE CONTINUAR CRASHANDO:**

O app agora vai mostrar uma **tela de erro** ao invés de fechar!

Você verá:
```
💥
Erro Crítico
[mensagem do erro]
[Botão: Reiniciar App]
```

## 🐛 VERIFICAR LOGS (IMPORTANTE!)

Para descobrir o erro exato, use o **Android Logcat**:

### **No Android Studio:**

```
1. View → Tool Windows → Logcat
2. Selecione seu dispositivo
3. Filtre por "alerr" ou "Error"
4. ABRA O APP no celular
5. Copie os erros que aparecem
```

### **Logs Importantes:**

Procure por:
- `Error:` (erros JavaScript)
- `FATAL EXCEPTION` (crash nativo)
- `TypeError` (erro de tipo)
- `localStorage` (erro de storage)
- `Capacitor` (erro de plugin)

## 🔧 POSSÍVEIS CAUSAS E SOLUÇÕES

### **1. LocalStorage Corrompido**

**Sintoma:** App fecha imediatamente

**Solução:**
```
1. Desinstalar app
2. Limpar dados do app:
   - Configurações → Apps → ALE-RR TOP 5
   - Limpar dados
   - Limpar cache
3. Reinstalar
```

**OU** use o botão "Reiniciar App" na tela de erro!

---

### **2. Permissões Faltando**

**Sintoma:** App fecha ao tentar usar notificações

**Verificar:** `/android/app/src/main/AndroidManifest.xml`

Deve ter:
```xml
<uses-permission android:name="android.permission.POST_NOTIFICATIONS" />
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
<uses-permission android:name="android.permission.VIBRATE" />
```

---

### **3. Erro de Build/Código Quebrado**

**Sintoma:** App não abre nada

**Solução:**
```bash
# Rebuild TOTAL
npm run build
rm -rf android/app/build
npx cap sync android

# No Android Studio:
Build → Clean Project
Build → Rebuild Project
```

---

### **4. WebView Desatualizado**

**Sintoma:** Tela branca ou crash

**Solução:**
```
1. No celular: Play Store
2. Buscar "Android System WebView"
3. Atualizar
4. Reiniciar celular
5. Testar app novamente
```

---

### **5. Versão Android Muito Antiga**

**Sintoma:** Crash em Android 5.x ou 6.x

**Verificar:**
```
Configurações → Sobre o telefone → Versão do Android
```

**Requisitos:**
- Android 5.1+ (API 22+)
- Android 8.0+ recomendado

---

## 📱 TESTE COM DEBUGGING

### **Opção 1: Chrome DevTools**

```
1. Conecte celular no PC (cabo USB)
2. Ative "Depuração USB"
3. Abra Chrome: chrome://inspect
4. Clique em "inspect" no seu app
5. Veja os erros no Console
```

### **Opção 2: Android Studio Logcat**

```
1. Android Studio → Logcat
2. Abra o app no celular
3. Copie TODOS os erros vermelhos
4. Me envie para analisar
```

---

## 🎯 CHECKLIST DE VERIFICAÇÃO

Antes de testar, confirme:

- [ ] `npm run build` executado
- [ ] `npx cap sync android` executado
- [ ] Android Studio buildou com sucesso
- [ ] APK instalado no celular
- [ ] Versão ANTIGA do app desinstalada
- [ ] Cache/dados do app limpos
- [ ] Celular reiniciado

---

## 💡 TESTE RÁPIDO

Crie um APK de teste mínimo:

### **1. Substituir App.tsx temporariamente:**

```tsx
export default function App() {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      fontSize: '2rem',
      fontWeight: 'bold',
      textAlign: 'center',
      padding: '2rem'
    }}>
      ✅ APP FUNCIONANDO!<br/>
      ALE-RR TOP 5
    </div>
  );
}
```

### **2. Build e teste:**

```bash
npm run build
npx cap sync android
# Build APK e instale
```

**SE FUNCIONAR:** O problema é no código React (contexts, components)
**SE NÃO FUNCIONAR:** O problema é no build/capacitor/android config

---

## 🆘 SE NADA FUNCIONAR

Envie para mim:

1. **Logs do Logcat** (Android Studio)
2. **Erros do Build** (console)
3. **Screenshots** da tela de erro (se aparecer)
4. **Versão do Android** do seu celular

Com essas informações consigo identificar o problema exato!

---

## ✅ PRÓXIMO PASSO

**TESTE AGORA:**

1. Baixe o projeto atualizado
2. Execute: `npm run build && npx cap sync android`
3. Build APK no Android Studio
4. Desinstale versão antiga
5. Instale novo APK
6. Abra e veja se mostra erro ou funciona!

Se mostrar erro, tire print e me envie! 📸

---

**Status:** ✅ Proteções contra crash adicionadas  
**Próximo:** Testar no celular e verificar logs
