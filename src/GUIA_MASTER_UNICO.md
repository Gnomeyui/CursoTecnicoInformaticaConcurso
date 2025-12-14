# 🎯 GUIA MASTER ÚNICO - ALE-RR TOP 5

**📱 Compilar APK Android do ZERO ao SUCESSO em 15 minutos!**

---

## 📋 ÍNDICE RÁPIDO

1. [🚀 Início Rápido (5 min)](#-início-rápido)
2. [📦 Instalação Completa (10 min)](#-instalação-completa)
3. [🔨 Compilação do APK (5 min)](#-compilação-do-apk)
4. [❌ Solução de Erros Comuns](#-solução-de-erros-comuns)
5. [❓ FAQ - Perguntas Frequentes](#-faq)

---

## 🚀 INÍCIO RÁPIDO

### **🎯 Você precisa de:**

```
✅ Windows 10/11
✅ Node.js 18+ instalado
✅ Android Studio instalado
✅ Java JDK 17 instalado
✅ 5GB de espaço livre
✅ 15 minutos
```

### **⚡ 3 Comandos Mágicos:**

```bash
# 1. Baixe e extraia o projeto
cd C:\Users\SEU_USUARIO\Desktop
# (Baixe do Figma Make e extraia aqui)

# 2. Entre na pasta e instale
cd ale-rr-top5
npm install

# 3. Compile e abra
npm run android:rebuild
```

**PRONTO!** O Android Studio vai abrir. Agora vá para [Compilação do APK](#-compilação-do-apk).

---

## 📦 INSTALAÇÃO COMPLETA

### **Passo 1: Instalar Ferramentas Necessárias** ⬇️

#### **A) Node.js 18+**

1. Baixe: https://nodejs.org/
2. Instale (Next → Next → Finish)
3. Teste no CMD:
   ```bash
   node --version
   # Deve mostrar: v18.x.x ou superior
   ```

#### **B) Java JDK 17**

1. Baixe: https://adoptium.net/
2. Escolha: **JDK 17 (LTS)**
3. Instale
4. Configure variável de ambiente:
   - Painel de Controle → Sistema → Variáveis de Ambiente
   - Nova variável do sistema:
     - Nome: `JAVA_HOME`
     - Valor: `C:\Program Files\Eclipse Adoptium\jdk-17.x.x-hotspot`
   - Editar PATH → Adicionar: `%JAVA_HOME%\bin`
5. Teste:
   ```bash
   java -version
   # Deve mostrar: openjdk version "17.x.x"
   ```

#### **C) Android Studio**

1. Baixe: https://developer.android.com/studio
2. Instale (marcando **Android SDK**, **Android SDK Platform** e **Android Virtual Device**)
3. Abra Android Studio
4. SDK Manager (ícone de cubo) → Configure:
   - ✅ Android SDK Platform 34
   - ✅ Android SDK Build-Tools 34
   - ✅ Android SDK Command-line Tools
5. Configure variável de ambiente:
   - Nova variável do sistema:
     - Nome: `ANDROID_HOME`
     - Valor: `C:\Users\SEU_USUARIO\AppData\Local\Android\Sdk`
   - Editar PATH → Adicionar:
     - `%ANDROID_HOME%\platform-tools`
     - `%ANDROID_HOME%\cmdline-tools\latest\bin`
6. Teste:
   ```bash
   adb version
   # Deve mostrar a versão do ADB
   ```

---

### **Passo 2: Baixar o Projeto** 📥

1. No Figma Make, clique em **"Download Project"**
2. Extraia o ZIP para: `C:\Users\SEU_USUARIO\Desktop\ale-rr-top5`

---

### **Passo 3: Instalar Dependências** 📦

```bash
cd C:\Users\SEU_USUARIO\Desktop\ale-rr-top5

# Instalar dependências Node
npm install

# Isso vai instalar:
# - React 18
# - Vite 5
# - Capacitor 6
# - Tailwind CSS 4
# - Recharts
# - Lucide Icons
```

**Tempo:** ~2 minutos

---

## 🔨 COMPILAÇÃO DO APK

### **Método 1: Comando Automático** ⚡ (RECOMENDADO)

```bash
cd C:\Users\SEU_USUARIO\Desktop\ale-rr-top5

npm run android:rebuild
```

**O que acontece:**
1. ✅ Build do Vite (cria pasta `dist/`)
2. ✅ Sync do Capacitor (copia para `android/`)
3. ✅ Abre Android Studio automaticamente

**Tempo:** ~1 minuto

---

### **Método 2: Passo a Passo Manual** 🔧

```bash
# 1. Build web
npm run build

# 2. Sync Android
npx cap sync android

# 3. Abrir Android Studio
npx cap open android
```

---

### **No Android Studio:**

#### **1. Limpar Cache (PRIMEIRA VEZ)**

```
File → Invalidate Caches... → Invalidate and Restart
```

Aguarde o Android Studio reiniciar (~30s).

#### **2. Rebuild Project**

```
Build → Clean Project
(aguarde terminar)

Build → Rebuild Project
(aguarde terminar - ~2-3 min)
```

#### **3. Gerar APK**

```
Build → Build Bundle(s) / APK(s) → Build APK(s)
```

**Aguarde:** ~2 minutos

#### **4. Localizar APK**

Quando terminar, aparecerá notificação:

```
APK(s) generated successfully
```

Clique em **"locate"** ou vá para:

```
C:\Users\SEU_USUARIO\Desktop\ale-rr-top5\android\app\build\outputs\apk\debug\app-debug.apk
```

---

### **Instalação no Celular:** 📱

#### **Opção A: Via Cabo USB**

1. Conecte celular no PC via USB
2. Ative **Depuração USB** no celular:
   - Configurações → Sobre o telefone
   - Toque 7x em "Número da compilação"
   - Volte → Opções do desenvolvedor
   - Ative "Depuração USB"
3. No Android Studio:
   ```
   Run → Run 'app'
   ```
   Ou clique no ▶️ verde

4. Escolha seu dispositivo e aguarde

**Tempo:** ~30s

#### **Opção B: Via APK (SEM cabo)**

1. Copie o APK para seu celular (Google Drive, WhatsApp, etc.)
2. No celular, abra o arquivo
3. Permita "Instalar apps de fontes desconhecidas"
4. Instale

**PRONTO!** 🎉

---

## ❌ SOLUÇÃO DE ERROS COMUNS

### **🔴 Erro 1: "HTML todo quebrado no celular"**

**Causa:** `vite.config.ts` sem `base: './'`

**✅ Solução:**

Verifique se o arquivo `/vite.config.ts` tem:

```typescript
export default defineConfig({
  plugins: [react()],
  base: './', // ← ISSO É CRÍTICO!
  // ... resto
});
```

Se não tiver, adicione e rebuilde:

```bash
npm run build
npx cap sync android
npx cap open android
```

**Tempo:** 3 minutos

---

### **🔴 Erro 2: "resource mipmap/ic_launcher not found"**

**Causa:** Faltam ícones nas pastas mipmap

**✅ Solução:**

Baixe o projeto ATUALIZADO do Figma Make. Os ícones já estão incluídos!

Se ainda faltar, os ícones devem estar em:

```
android/app/src/main/res/
  ├── drawable/
  │   ├── ic_launcher.xml
  │   └── splash.xml
  └── mipmap-*/
      ├── ic_launcher.xml
      └── ic_launcher_round.xml
```

**Tempo:** 1 minuto (baixar projeto novo)

---

### **🔴 Erro 3: "Duplicate resources (ic_launcher.png e ic_launcher.xml)"**

**Causa:** Existem PNGs antigos + XMLs novos com mesmo nome

**✅ Solução Automática:**

Execute o script:

```bash
cd C:\Users\SEU_USUARIO\Desktop\ale-rr-top5
DELETAR_ICONES_PNG.bat
```

**✅ Solução Manual:**

Delete TODOS os arquivos PNG de:

```
android/app/src/main/res/mipmap-*/
  ❌ ic_launcher.png
  ❌ ic_launcher_round.png
```

**Mantenha apenas os XML!**

Depois:

```bash
cd android
rmdir /s /q app\build
rmdir /s /q build
rmdir /s /q .gradle

cd ..
npx cap open android
```

No Android Studio:
```
File → Invalidate Caches → Restart
Build → Rebuild Project
```

**Tempo:** 5 minutos

---

### **🔴 Erro 4: "Gradle sync failed: Could not initialize class"**

**Causa:** Versão do Gradle incompatível com Java

**✅ Solução:**

Edite `/android/gradle/wrapper/gradle-wrapper.properties`:

```properties
distributionUrl=https\://services.gradle.org/distributions/gradle-8.5-bin.zip
```

Ou use Java 17:

1. Baixe Java 17: https://adoptium.net/
2. Configure `JAVA_HOME` para Java 17
3. Reinicie Android Studio

**Tempo:** 5 minutos

---

### **🔴 Erro 5: "SDK location not found"**

**Causa:** Variável `ANDROID_HOME` não configurada

**✅ Solução:**

1. Crie arquivo `/android/local.properties`:

```properties
sdk.dir=C:\\Users\\SEU_USUARIO\\AppData\\Local\\Android\\Sdk
```

**OU**

2. Configure variável de ambiente:
   - Painel de Controle → Sistema → Variáveis de Ambiente
   - Nova variável:
     - Nome: `ANDROID_HOME`
     - Valor: `C:\Users\SEU_USUARIO\AppData\Local\Android\Sdk`

3. Reinicie Android Studio

**Tempo:** 2 minutos

---

### **🔴 Erro 6: "Unable to resolve dependency"**

**Causa:** Cache do Gradle corrompido

**✅ Solução:**

```bash
cd android

# Windows
rmdir /s /q .gradle
rmdir /s /q build
rmdir /s /q app\build

cd ..
npx cap sync android
npx cap open android
```

No Android Studio:
```
File → Invalidate Caches → Restart
```

**Tempo:** 5 minutos

---

### **🔴 Erro 7: "Build failed: Cannot find symbol"**

**Causa:** Código Java ou imports errados

**✅ Solução:**

1. Clean Project:
   ```
   Build → Clean Project
   ```

2. Rebuild:
   ```
   Build → Rebuild Project
   ```

3. Se persistir, verifique `/android/app/src/main/java/com/alerr/top5/MainActivity.java`:

```java
package com.alerr.top5;

import android.os.Bundle;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
}
```

**Tempo:** 3 minutos

---

## ❓ FAQ - PERGUNTAS FREQUENTES

### **1. Preciso do Android Studio?**

**Sim!** É obrigatório para compilar APKs Android.

---

### **2. Funciona no Linux ou Mac?**

**Sim!** Mas os comandos são diferentes:

**Linux/Mac:**
```bash
cd ~/Desktop/ale-rr-top5
rm -rf android/app/build android/build android/.gradle
npm run android:rebuild
```

---

### **3. Posso usar Windows 7?**

**Não recomendado.** Android Studio funciona melhor no Windows 10+.

---

### **4. Quanto tempo demora o primeiro build?**

**~5 minutos** (download de dependências + compilação)

Builds seguintes: **~2 minutos**

---

### **5. O APK é muito grande?**

APK debug: **~15MB**  
APK release (minified): **~8MB**

---

### **6. Como adicionar mais questões?**

Edite `/data/questions.ts`:

```typescript
export const QUESTIONS: Question[] = [
  {
    id: 201, // Incremente o ID
    materia: "Segurança",
    pergunta: "Sua pergunta aqui?",
    opcoes: ["A", "B", "C", "D"],
    correta: 0, // Índice da resposta correta
    explicacao: "Explicação detalhada..."
  },
  // ... adicione mais
];
```

Depois rebuilde:
```bash
npm run build
npx cap sync android
```

---

### **7. Como mudar o nome do app?**

Edite `/android/app/src/main/res/values/strings.xml`:

```xml
<string name="app_name">MEU NOVO NOME</string>
```

Rebuilde.

---

### **8. Como mudar o ícone?**

Substitua os arquivos em:
```
/android/app/src/main/res/
  ├── drawable/ic_launcher.xml
  └── mipmap-*/ic_launcher.xml
```

Use uma ferramenta online: https://romannurik.github.io/AndroidAssetStudio/

---

### **9. Como publicar na Play Store?**

1. Gere APK **signed** (assinado):
   ```
   Build → Generate Signed Bundle/APK
   ```

2. Crie uma keystore

3. Siga: https://developer.android.com/studio/publish

---

### **10. O app funciona offline?**

**Sim!** Todos os dados estão no LocalStorage.

---

## 🎯 CHECKLIST PRÉ-COMPILAÇÃO

Antes de compilar, verifique:

- [ ] Node.js 18+ instalado (`node --version`)
- [ ] Java 17 instalado (`java -version`)
- [ ] Android Studio instalado
- [ ] `ANDROID_HOME` configurado
- [ ] `JAVA_HOME` configurado
- [ ] Projeto baixado e extraído
- [ ] `npm install` executado
- [ ] Arquivo `vite.config.ts` tem `base: './'`
- [ ] Ícones XML existem (sem PNGs)
- [ ] 5GB de espaço livre

---

## 🏆 COMPILAÇÃO EM 3 ETAPAS

### **Etapa 1: Preparar (1x apenas)**

```bash
cd C:\Users\SEU_USUARIO\Desktop\ale-rr-top5
npm install
```

### **Etapa 2: Buildar**

```bash
npm run build
npx cap sync android
```

### **Etapa 3: Compilar**

```bash
npx cap open android
```

No Android Studio:
```
Build → Build APK(s)
```

**PRONTO!** 🎉

---

## 📞 AJUDA EXTRA

### **Se nada funcionar:**

1. **Delete tudo e recomece:**

```bash
cd C:\Users\SEU_USUARIO\Desktop\ale-rr-top5

# Deletar builds
rmdir /s /q dist
rmdir /s /q node_modules
rmdir /s /q android\app\build
rmdir /s /q android\build
rmdir /s /q android\.gradle

# Reinstalar
npm install
npm run android:rebuild
```

2. **Verifique versões:**

```bash
node --version    # Deve ser 18+
java -version     # Deve ser 17
npm --version     # Deve ser 9+
```

3. **Reinicie o PC** (sério, às vezes resolve!)

---

## 🎓 RESUMO ULTRA-RÁPIDO

```bash
# 1. Instale: Node.js 18, Java 17, Android Studio
# 2. Configure: JAVA_HOME, ANDROID_HOME
# 3. Baixe e extraia o projeto
# 4. Execute:

cd ale-rr-top5
npm install
npm run android:rebuild

# 5. No Android Studio: Build → Build APK(s)
# 6. Instale o APK no celular
# 7. SUCESSO! 🏆
```

---

## 🚀 PRÓXIMO PASSO

**BAIXE O PROJETO E COMPILE AGORA!**

**Tempo total:** 15 minutos  
**Dificuldade:** Fácil ⭐⭐  
**Resultado:** APK funcionando no celular! 📱✨

---

**🏆 BOA SORTE NO CONCURSO ALE-RR! RUMO AO TOP 5! 🎯🔥**
