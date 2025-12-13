# ⚡ COMANDOS RÁPIDOS - GERAR APK

## 🎯 COMANDOS ESSENCIAIS (Copie e Cole)

### **1️⃣ Instalar Dependências**
```bash
npm install
```
⏱️ Tempo: 3-5 minutos  
✅ Resultado: "added XXXX packages"

---

### **2️⃣ Buildar Projeto Web**
```bash
npm run build
```
⏱️ Tempo: 30 segundos  
✅ Resultado: "✓ built in XXXXms"

---

### **3️⃣ Adicionar Android (Primeira vez apenas)**
```bash
npx cap add android
```
⏱️ Tempo: 1-2 minutos  
✅ Resultado: "✅ android added!"

**⚠️ ATENÇÃO:** Este comando pode sobrescrever alguns arquivos personalizados.

**Se isso acontecer, você precisará restaurar:**
- `android/app/src/main/AndroidManifest.xml` (copie do backup)
- `android/app/build.gradle` (copie do backup)

**Melhor forma de evitar problemas:**
```bash
# Fazer backup antes
cp -r android android_backup

# Windows:
xcopy android android_backup /E /I
```

---

### **4️⃣ Sincronizar com Android**
```bash
npx cap sync android
```
⏱️ Tempo: 10-20 segundos  
✅ Resultado: "✅ Syncing completed"

---

### **5️⃣ Abrir Android Studio**
```bash
npx cap open android
```
⏱️ Tempo: 5 segundos (abre o Android Studio)  
✅ Resultado: Android Studio abre automaticamente

---

### **6️⃣ Gerar APK (No Android Studio)**

**Opção 1: Menu (Mais Fácil)**
```
Build → Build Bundle(s) / APK(s) → Build APK(s)
```

**Opção 2: Terminal**
```bash
cd android
./gradlew assembleDebug

# Windows:
gradlew.bat assembleDebug
```

⏱️ Tempo: 5-10 minutos (primeira vez)  
✅ Resultado: APK em `android/app/build/outputs/apk/debug/app-debug.apk`

---

## 🔄 FLUXO COMPLETO (Primeira Vez)

```bash
# 1. Instalar
npm install

# 2. Buildar
npm run build

# 3. Adicionar Android
npx cap add android

# 4. Sincronizar
npx cap sync android

# 5. Abrir Android Studio
npx cap open android

# 6. No Android Studio:
#    Build → Build APK(s)
```

**Tempo total:** 15-20 minutos primeira vez

---

## 🚀 FLUXO RÁPIDO (Após mudanças no código)

```bash
# 1. Rebuildar web
npm run build

# 2. Sincronizar
npx cap sync android

# 3. Abrir Android Studio (ou usar o já aberto)
npx cap open android

# 4. No Android Studio:
#    Build → Build APK(s)
```

**Tempo total:** 3-5 minutos

---

## 🧹 LIMPAR TUDO E RECOMEÇAR

```bash
# Remover builds antigos
rm -rf node_modules
rm -rf android/app/build
rm -rf dist

# Windows:
rmdir /s /q node_modules
rmdir /s /q android\app\build
rmdir /s /q dist

# Reinstalar
npm install
npm run build
npx cap sync android
```

---

## 🔍 VERIFICAR INSTALAÇÕES

### **Node.js**
```bash
node --version
# Esperado: v18.x.x ou superior
```

### **NPM**
```bash
npm --version
# Esperado: 9.x.x ou superior
```

### **Java**
```bash
java -version
# Esperado: java version "17.x.x"
```

### **Capacitor CLI**
```bash
npx cap --version
# Esperado: @capacitor/cli 6.x.x
```

---

## 📱 INSTALAR APK NO CELULAR

### **Método 1: USB**
```bash
# 1. Conectar celular via USB
# 2. Ativar "Depuração USB" no celular
# 3. Instalar via ADB (se disponível)

adb install android/app/build/outputs/apk/debug/app-debug.apk
```

### **Método 2: Copiar arquivo**
```
1. Conectar celular via USB
2. Copiar app-debug.apk para o celular
3. No celular: Arquivos → Tocar no APK → Instalar
```

### **Método 3: WhatsApp**
```
1. Enviar APK para você mesmo no WhatsApp
2. No celular: Baixar → Instalar
```

---

## 🐛 RESOLVER PROBLEMAS RÁPIDOS

### **Gradle sync failed**
```bash
# No Android Studio:
File → Invalidate Caches → Restart
```

### **Build failed**
```bash
# Limpar e rebuildar
cd android
./gradlew clean

# Windows:
gradlew.bat clean

# Depois no Android Studio:
Build → Rebuild Project
```

### **APK não instala**
```
# No celular Android:
Configurações → Segurança
→ Fontes desconhecidas → Ativar

# Android 8+:
Configurações → Apps → Acesso especial
→ Instalar apps desconhecidos
→ Chrome/Arquivos → Permitir
```

---

## 📊 COMANDOS ÚTEIS ADICIONAIS

### **Ver logs do app em tempo real**
```bash
adb logcat | grep Capacitor
```

### **Limpar logs**
```bash
adb logcat -c
```

### **Listar dispositivos conectados**
```bash
adb devices
```

### **Desinstalar app do celular**
```bash
adb uninstall com.alerr.top5
```

### **Reinstalar app**
```bash
adb install -r android/app/build/outputs/apk/debug/app-debug.apk
```

---

## 🎯 COMANDOS PARA APK RELEASE (Assinado)

### **1. Criar Keystore (Primeira vez apenas)**
```bash
cd android/app
keytool -genkey -v -keystore release.keystore -alias alerr-key -keyalg RSA -keysize 2048 -validity 10000
```

### **2. Gerar APK Release**
```bash
cd android
./gradlew assembleRelease

# Windows:
gradlew.bat assembleRelease
```

✅ APK em: `android/app/build/outputs/apk/release/app-release.apk`

---

## 📦 COMANDOS PARA AAB (Google Play Store)

### **Gerar Bundle para Play Store**
```bash
cd android
./gradlew bundleRelease

# Windows:
gradlew.bat bundleRelease
```

✅ AAB em: `android/app/build/outputs/bundle/release/app-release.aab`

---

## 🔄 ATUALIZAR VERSÃO DO APP

### **1. Editar version em `package.json`**
```json
{
  "version": "1.0.1"
}
```

### **2. Editar versionCode e versionName em `android/app/build.gradle`**
```gradle
defaultConfig {
    versionCode 2
    versionName "1.0.1"
}
```

### **3. Rebuildar**
```bash
npm run build
npx cap sync android
# Gerar novo APK no Android Studio
```

---

## 💡 DICAS RÁPIDAS

### **Acelerar builds**
```bash
# Adicionar em android/gradle.properties:
org.gradle.daemon=true
org.gradle.parallel=true
org.gradle.caching=true
org.gradle.configureondemand=true
```

### **Ver tamanho do APK**
```bash
# Linux/Mac:
du -h android/app/build/outputs/apk/debug/app-debug.apk

# Windows:
dir android\app\build\outputs\apk\debug\app-debug.apk
```

### **Comparar tamanhos (debug vs release)**
```bash
# Debug (maior, não otimizado)
# ~15-25 MB

# Release (menor, otimizado)
# ~8-15 MB
```

---

## 🎓 SCRIPTS PERSONALIZADOS

Você pode adicionar estes scripts em `package.json` para facilitar:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "android:build": "npm run build && npx cap sync android && npx cap open android",
    "android:run": "npx cap run android",
    "android:sync": "npx cap sync android",
    "android:clean": "cd android && ./gradlew clean",
    "android:debug": "cd android && ./gradlew assembleDebug",
    "android:release": "cd android && ./gradlew assembleRelease",
    "android:bundle": "cd android && ./gradlew bundleRelease"
  }
}
```

**Usar assim:**
```bash
npm run android:build    # Build completo e abre Android Studio
npm run android:debug    # Gera APK debug via terminal
npm run android:release  # Gera APK release via terminal
npm run android:bundle   # Gera AAB para Play Store
```

---

## 📋 CHECKLIST RÁPIDO

Antes de gerar APK:
- [ ] `npm install` executado com sucesso
- [ ] `npm run build` gerou pasta /dist
- [ ] `npx cap sync android` sem erros
- [ ] Android Studio aberto
- [ ] Gradle sync completado
- [ ] Pronto para Build → Build APK

---

## 🏆 COMANDO ÚNICO (All-in-One)

Se você adicionou os scripts acima em `package.json`:

```bash
npm run android:build
```

Este comando faz TUDO automaticamente:
1. ✅ Build do projeto web
2. ✅ Sync com Android
3. ✅ Abre Android Studio
4. ✅ Você só precisa clicar em "Build APK"

---

**🚀 BOA SORTE E RUMO AO TOP 5! 🏆**
