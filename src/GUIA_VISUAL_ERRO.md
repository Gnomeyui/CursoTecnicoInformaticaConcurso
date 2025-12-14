# 🎯 GUIA VISUAL - COMO VER O ERRO EXATO

## 📱 SITUAÇÃO ATUAL

```
Android mostra:
┌─────────────────────────────────┐
│  ALE-RR TOP 5                   │
│                                 │
│  Este app fechou porque         │
│  tem um bug.                    │
│                                 │
│  [ Fechar ]    [ Informações ]  │
└─────────────────────────────────┘
```

**Precisamos descobrir QUAL é o bug!**

---

## 🔍 MÉTODO 1: CHROME DEVTOOLS (RECOMENDADO!)

### **📸 PASSO A PASSO COM IMAGENS:**

#### **1. Conectar celular no PC**

```
Celular:
  ├─ Configurações
  ├─ Sobre o telefone
  ├─ Tocar 7x em "Número da compilação"
  ├─ Voltar
  ├─ Opções do desenvolvedor
  └─ ✓ Depuração USB (ATIVAR)

PC:
  └─ Conectar cabo USB
```

#### **2. Abrir Chrome**

```
Chrome no PC:
  └─ Barra de endereço: chrome://inspect
  └─ Apertar Enter
```

#### **3. Você vai ver esta tela:**

```
═══════════════════════════════════════
  Devices
───────────────────────────────────────
  📱 [Nome do seu celular]
  
  com.alerr.top5
  http://localhost
  
  [ inspect ]  [ focus tab ]
───────────────────────────────────────
```

#### **4. Clicar em "inspect"**

Uma nova janela vai abrir!

#### **5. Na janela DevTools:**

```
╔═══════════════════════════════════╗
║ Elements  Console  Sources  ...  ║
╠═══════════════════════════════════╣
║                                   ║
║  >> Clique aqui na aba Console   ║
║                                   ║
╚═══════════════════════════════════╝
```

#### **6. ABRIR O APP NO CELULAR**

Agora que o DevTools está aberto, **abra o app no celular**!

#### **7. VER OS ERROS:**

Você vai ver algo assim:

```
Console:
┌─────────────────────────────────────────
│ 🔴 Error: Failed to fetch dynamically imported module
│    at index.js:1
│ 
│ 🔴 TypeError: Cannot read property 'map' of undefined
│    at App.tsx:42
│ 
│ 🔴 Uncaught ReferenceError: localStorage is not defined
│    at main.tsx:15
└─────────────────────────────────────────
```

**COPIE TODOS OS ERROS EM VERMELHO E ME ENVIE!**

---

## 🛠️ MÉTODO 2: ANDROID STUDIO LOGCAT

### **1. Abrir Android Studio**

```
Android Studio:
  └─ Abrir seu projeto
  └─ Menu: View → Tool Windows → Logcat
```

### **2. Tela do Logcat:**

```
╔═══════════════════════════════════════════╗
║ [Dispositivo ▼] [Filtro ▼] [🔍 Pesquisar]║
╠═══════════════════════════════════════════╣
║ I/chromium: ...                           ║
║ D/StatusBar: ...                          ║
║ 🔴 E/AndroidRuntime: FATAL EXCEPTION      ║
║ 🔴 E/chromium: TypeError: ...            ║
╚═══════════════════════════════════════════╝
```

### **3. Filtrar erros:**

Na caixa de pesquisa, digite:
```
Error
```

Ou clique no dropdown de nível e selecione:
```
Error ▼
```

### **4. LIMPAR E TESTAR:**

1. Clique no ícone 🗑️ (limpar logs)
2. **ABRA O APP no celular**
3. Veja os erros em vermelho
4. Copie e me envie!

---

## ⚡ MÉTODO 3: TESTE MÍNIMO (SEM LOGS)

Se você não consegue ver os logs, vamos testar assim:

### **1. Backup do código atual:**

```bash
copy src\main.tsx src\main.BACKUP.tsx
```

### **2. Criar versão ULTRA MÍNIMA:**

Edite `/src/main.tsx` e substitua TUDO por:

```tsx
import React from 'react';
import ReactDOM from 'react-dom/client';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <div style={{
    minHeight: '100vh',
    background: '#3B82F6',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontSize: '3rem',
    fontWeight: 'bold',
    textAlign: 'center'
  }}>
    ✅ FUNCIONOU!<br/>
    ALE-RR TOP 5
  </div>
);
```

### **3. Rebuild:**

```bash
npm run build
npx cap sync android
```

### **4. Build APK e instalar**

### **5. RESULTADO:**

**SE MOSTRAR "✅ FUNCIONOU!":**
```
→ Build está OK
→ Problema é no código React
→ Vou criar versão gradual
```

**SE CONTINUAR CRASHANDO:**
```
→ Problema é no build/config
→ Ver logs (método 1 ou 2)
```

---

## 📋 ERROS COMUNS E SOLUÇÕES

### **ERRO #1: "Failed to fetch dynamically imported module"**

**No Console/Logcat:**
```
Failed to fetch dynamically imported module
https://localhost/assets/index-abc123.js
```

**CAUSA:** `vite.config.ts` sem `base: './'`

**SOLUÇÃO:**
```typescript
// vite.config.ts
export default defineConfig({
  base: './',  // ← ADICIONAR ISSO!
  plugins: [react()],
  // ...
});
```

**DEPOIS:**
```bash
npm run build
npx cap sync android
# Rebuild APK
```

---

### **ERRO #2: "Cannot read property 'map' of undefined"**

**No Console:**
```
TypeError: Cannot read property 'map' of undefined
at QuizScreen.tsx:42
```

**CAUSA:** Código React tentando usar dados que não existem

**SOLUÇÃO:**
Vou corrigir o componente específico

---

### **ERRO #3: "localStorage is not defined"**

**No Console:**
```
ReferenceError: localStorage is not defined
```

**CAUSA:** localStorage sendo usado antes de estar disponível

**SOLUÇÃO:**
Vou adicionar proteção no código

---

### **ERRO #4: "Module not found: recharts"**

**No Console:**
```
Module not found: Can't resolve 'recharts'
```

**CAUSA:** Dependência não instalada

**SOLUÇÃO:**
```bash
npm install
npm run build
```

---

### **ERRO #5: "Plugin not available"**

**No Console:**
```
Capacitor plugin LocalNotifications not available
```

**CAUSA:** Plugin não sincronizado

**SOLUÇÃO:**
```bash
npx cap sync android
# Rebuild APK
```

---

## 🎯 FAÇA AGORA (ESCOLHA UM):

### **OPÇÃO A: CHROME DEVTOOLS** ⭐ Recomendado!
```
1. chrome://inspect
2. Clicar "inspect"
3. Aba Console
4. Abrir app
5. Copiar erros e me enviar
```

### **OPÇÃO B: TESTE MÍNIMO** ⚡ Mais rápido!
```
1. Usar /src/main.MINIMAL.tsx
2. npm run build
3. Build APK
4. Testar
5. Me dizer resultado
```

### **OPÇÃO C: ANDROID STUDIO**
```
1. Logcat
2. Filtrar "Error"
3. Abrir app
4. Copiar erros e me enviar
```

---

## 📞 ME ENVIE:

Para resolver rápido, preciso de:

1. **Erros do Console** (método A ou C)
   - Texto completo dos erros em vermelho
   
2. **OU resultado do teste** (método B)
   - Funcionou ou crashou?
   
3. **Informações extras:**
   - `npm run build` teve erro? (sim/não)
   - Versão do Android do celular
   - Tamanho do APK (MB)

---

## ⏱️ TEMPO:

- Chrome DevTools: **3-5 minutos**
- Teste Mínimo: **5 minutos**
- Android Studio: **5 minutos**

**Total: ~5 minutos para descobrir o bug!**

---

## 💡 DICA:

O Chrome DevTools (Método 1) é o MELHOR porque:
- ✅ Mostra erro exato em JavaScript
- ✅ Mostra linha do código
- ✅ Mostra stack trace completo
- ✅ Fácil de copiar/colar

**Use o Método 1 se possível!**

---

**🚀 COMECE AGORA E ME ENVIE OS ERROS!**

Com o erro exato, vou corrigir em 5 minutos! 🎯
