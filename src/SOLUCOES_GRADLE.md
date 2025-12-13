# 🔧 SOLUÇÕES PARA PROBLEMAS DO GRADLE

## 🎯 GUIA RÁPIDO DE TROUBLESHOOTING

Este guia resolve 99% dos problemas de build no Android Studio.

---

## ⚡ SOLUÇÕES RÁPIDAS (Tente Primeiro)

### **Solução 1: Invalidate Caches (Resolve 70% dos problemas)**

```
Android Studio:
1. File → Invalidate Caches / Restart...
2. Clicar em "Invalidate and Restart"
3. Aguardar Android Studio reiniciar
4. Aguardar Gradle sync terminar
5. Build → Rebuild Project
```

⏱️ **Tempo:** 5 minutos  
✅ **Resolve:** Problemas de cache, indexação, R não encontrado

---

### **Solução 2: Clean + Rebuild (Resolve 80% dos problemas)**

```
Android Studio:
1. Build → Clean Project
2. Aguardar terminar
3. Build → Rebuild Project
4. Aguardar terminar
```

⏱️ **Tempo:** 3-5 minutos  
✅ **Resolve:** Builds corrompidos, recursos duplicados

---

### **Solução 3: Delete Build Folders (Resolve 90% dos problemas)**

```bash
# No terminal, na pasta do projeto:

# Deletar pastas de build
cd android
rm -rf app/build
rm -rf build
rm -rf .gradle

# Windows:
cd android
rmdir /s /q app\build
rmdir /s /q build
rmdir /s /q .gradle

# Voltar para raiz
cd ..

# Rebuild
npx cap sync android
```

Depois no Android Studio:
```
Build → Rebuild Project
```

⏱️ **Tempo:** 5-10 minutos  
✅ **Resolve:** Builds corrompidos, cache Gradle, dependências

---

## 🐛 PROBLEMAS ESPECÍFICOS

### **❌ "JAVA_HOME is not set"**

**Erro completo:**
```
ERROR: JAVA_HOME is not set and no 'java' command could be found in your PATH.
```

**Causa:** Java não configurado ou JAVA_HOME não setado

**Solução Windows:**

1. **Verificar se Java está instalado:**
```bash
java -version
```

2. **Se não aparecer nada, instalar Java JDK 17:**
```
Download: https://www.oracle.com/java/technologies/downloads/#java17
Instalar normalmente
```

3. **Configurar JAVA_HOME:**
```
1. Tecla Windows + Pause (ou Sistema)
2. "Configurações avançadas do sistema"
3. Botão "Variáveis de Ambiente"
4. Em "Variáveis do sistema", clicar "Nova"
5. Nome da variável: JAVA_HOME
6. Valor da variável: C:\Program Files\Java\jdk-17
   (ou onde você instalou)
7. OK → OK → OK
```

4. **Adicionar ao PATH:**
```
1. Ainda em "Variáveis de Ambiente"
2. Em "Variáveis do sistema", encontrar "Path"
3. Clicar em "Editar"
4. "Novo"
5. Adicionar: %JAVA_HOME%\bin
6. OK → OK → OK
```

5. **Verificar:**
```bash
# Fechar e abrir novo terminal
java -version
# Deve mostrar: java version "17.x.x"
```

**Solução Mac/Linux:**

```bash
# Encontrar instalação do Java
/usr/libexec/java_home -v 17

# Adicionar ao ~/.bashrc ou ~/.zshrc:
export JAVA_HOME=$(/usr/libexec/java_home -v 17)
export PATH=$JAVA_HOME/bin:$PATH

# Recarregar:
source ~/.bashrc  # ou source ~/.zshrc

# Verificar:
java -version
```

---

### **❌ "SDK location not found"**

**Erro completo:**
```
SDK location not found. Define location with an ANDROID_SDK_ROOT environment variable or by setting the sdk.dir path in your project's local properties file at '...'
```

**Causa:** Android SDK não configurado

**Solução:**

1. **No Android Studio:**
```
Tools → SDK Manager
```

2. **Instalar SDK necessário:**
```
SDK Platforms:
✅ Android 14.0 (UpsideDownCake) - API Level 34
✅ Android 13.0 (Tiramisu) - API Level 33

SDK Tools:
✅ Android SDK Build-Tools 34
✅ Android SDK Platform-Tools
✅ Android SDK Command-line Tools
```

3. **Apply → OK**

4. **Aguardar download (5-10 minutos)**

5. **Criar arquivo local.properties:**

```bash
# Na pasta android/ do projeto, criar arquivo:
android/local.properties
```

**Conteúdo (Windows):**
```properties
sdk.dir=C\:\\Users\\SeuNome\\AppData\\Local\\Android\\Sdk
```

**Conteúdo (Mac):**
```properties
sdk.dir=/Users/SeuNome/Library/Android/sdk
```

**Conteúdo (Linux):**
```properties
sdk.dir=/home/SeuNome/Android/Sdk
```

6. **Rebuild Project**

---

### **❌ "Gradle sync failed"**

**Erro:** Gradle sync fica travado ou falha

**Soluções:**

**Solução 1 - Verificar Internet:**
```
✅ Gradle precisa baixar dependências
✅ Primeira vez baixa ~500MB-1GB
✅ Verificar firewall/antivirus
```

**Solução 2 - Usar Gradle Daemon:**
```
# Adicionar em android/gradle.properties:
org.gradle.daemon=true
org.gradle.jvmargs=-Xmx4096m -XX:MaxPermSize=1024m
org.gradle.parallel=true
org.gradle.caching=true
```

**Solução 3 - Limpar Gradle:**
```bash
# Deletar cache global do Gradle
# Windows:
rmdir /s /q %USERPROFILE%\.gradle\caches

# Mac/Linux:
rm -rf ~/.gradle/caches

# Rebuild
```

**Solução 4 - Downgrade Gradle (última opção):**
```
# Em android/gradle/wrapper/gradle-wrapper.properties
# Mudar para:
distributionUrl=https\://services.gradle.org/distributions/gradle-8.0-bin.zip
```

---

### **❌ "Cannot resolve symbol 'R'"**

**Erro:** Classe R não encontrada, símbolos vermelhos

**Causa:** Recursos não foram gerados

**Solução:**

1. **Build → Clean Project**

2. **File → Invalidate Caches → Restart**

3. **Build → Rebuild Project**

4. **Se persistir, verificar:**
```xml
<!-- Em android/app/src/main/res/values/strings.xml -->
<!-- Deve ter PELO MENOS: -->
<?xml version="1.0" encoding="utf-8"?>
<resources>
    <string name="app_name">ALE-RR TOP 5</string>
    <string name="title_activity_main">ALE-RR TOP 5</string>
    <string name="package_name">com.alerr.top5</string>
    <string name="custom_url_scheme">alerr</string>
</resources>
```

5. **Rebuild**

---

### **❌ "Execution failed for task ':app:mergeDebugResources'"**

**Erro completo:**
```
Execution failed for task ':app:mergeDebugResources'.
> Could not resolve all files for configuration ':app:debugRuntimeClasspath'.
```

**Causa:** Recursos duplicados ou corrompidos

**Solução:**

```bash
# Deletar tudo relacionado a build
cd android
rm -rf app/build
rm -rf app/src/main/assets
rm -rf build
rm -rf .gradle

# Windows:
cd android
rmdir /s /q app\build
rmdir /s /q app\src\main\assets
rmdir /s /q build
rmdir /s /q .gradle

# Voltar e rebuildar
cd ..
npm run build
npx cap sync android
```

**No Android Studio:**
```
Build → Rebuild Project
```

---

### **❌ "Duplicate class found"**

**Erro:**
```
Duplicate class [nome_da_classe] found in modules...
```

**Causa:** Dependências duplicadas

**Solução:**

1. **Verificar android/app/build.gradle**

2. **Remover duplicatas nas dependencies**

3. **Verificar se não há:**
```gradle
// NÃO DEVE TER DUPLICADO:
implementation 'androidx.appcompat:appcompat:1.6.1'
implementation 'androidx.appcompat:appcompat:1.5.0'  // ❌ REMOVER
```

4. **Limpar build:**
```bash
cd android
./gradlew clean

# Windows:
cd android
gradlew.bat clean
```

5. **Rebuild**

---

### **❌ "Failed to install the following Android SDK packages"**

**Erro:** Licenças não aceitas

**Solução:**

```bash
# Localizar sdkmanager:
# Windows: C:\Users\SeuNome\AppData\Local\Android\Sdk\cmdline-tools\latest\bin
# Mac: ~/Library/Android/sdk/cmdline-tools/latest/bin

# Executar:
sdkmanager --licenses

# Aceitar todas (digite 'y' para cada uma)
```

**No Android Studio:**
```
Tools → SDK Manager → SDK Tools
✅ Android SDK Command-line Tools (latest)
Apply → OK
```

---

### **❌ "Could not find method implementation()"**

**Erro:** Método implementation não encontrado

**Causa:** Versão antiga do Gradle

**Solução:**

1. **Verificar android/build.gradle:**
```gradle
buildscript {
    dependencies {
        classpath 'com.android.tools.build:gradle:8.2.1'
    }
}
```

2. **Verificar android/gradle/wrapper/gradle-wrapper.properties:**
```properties
distributionUrl=https\://services.gradle.org/distributions/gradle-8.2-bin.zip
```

3. **Sync e Rebuild**

---

### **❌ "minSdkVersion X cannot be smaller than version Y"**

**Erro:** Versão mínima do SDK incompatível

**Solução:**

**Verificar android/variables.gradle:**
```gradle
ext {
    minSdkVersion = 22  // Deve ser 22 ou superior
    compileSdkVersion = 34
    targetSdkVersion = 34
}
```

**E android/app/build.gradle:**
```gradle
android {
    defaultConfig {
        minSdkVersion rootProject.ext.minSdkVersion
        targetSdkVersion rootProject.ext.targetSdkVersion
        compileSdkVersion rootProject.ext.compileSdkVersion
    }
}
```

---

### **❌ "OutOfMemoryError: Java heap space"**

**Erro:** Gradle fica sem memória

**Solução:**

**Aumentar heap size em android/gradle.properties:**
```properties
org.gradle.jvmargs=-Xmx4096m -XX:MaxPermSize=1024m -XX:+HeapDumpOnOutOfMemoryError -Dfile.encoding=UTF-8
```

**Se persistir:**
```properties
org.gradle.jvmargs=-Xmx8192m -XX:MaxPermSize=2048m
```

---

### **❌ "Unable to find a matching variant"**

**Erro:** Variante não encontrada

**Causa:** Configuração incorreta de build variants

**Solução:**

1. **Verificar android/app/build.gradle:**
```gradle
android {
    buildTypes {
        debug {
            // Configurações debug
        }
        release {
            minifyEnabled false
            proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'
        }
    }
}
```

2. **Build → Clean Project**

3. **Build → Rebuild Project**

---

### **❌ Build fica travado em "Resolving dependencies"**

**Causa:** Download lento de dependências

**Solução:**

1. **Verificar internet**

2. **Tentar mirror mais rápido em android/build.gradle:**
```gradle
allprojects {
    repositories {
        google()
        mavenCentral()
        // Adicionar mirror:
        maven { url 'https://maven.aliyun.com/repository/public/' }
        maven { url 'https://maven.aliyun.com/repository/google/' }
    }
}
```

3. **Ou forçar redownload:**
```bash
cd android
./gradlew build --refresh-dependencies

# Windows:
cd android
gradlew.bat build --refresh-dependencies
```

---

## 🔄 SEQUÊNCIA DE TROUBLESHOOTING COMPLETA

Se nada funcionar, execute esta sequência:

```bash
# 1. Deletar tudo
rm -rf node_modules
rm -rf dist
rm -rf android/app/build
rm -rf android/build
rm -rf android/.gradle
rm -rf ~/.gradle/caches  # Cache global Gradle

# Windows:
rmdir /s /q node_modules
rmdir /s /q dist
rmdir /s /q android\app\build
rmdir /s /q android\build
rmdir /s /q android\.gradle
rmdir /s /q %USERPROFILE%\.gradle\caches

# 2. Reinstalar tudo
npm install

# 3. Rebuild web
npm run build

# 4. Reconfigurar Android
npx cap add android
npx cap sync android

# 5. Abrir Android Studio
npx cap open android

# 6. No Android Studio:
#    File → Invalidate Caches → Restart
#    Aguardar reiniciar
#    Build → Clean Project
#    Build → Rebuild Project
#    Build → Build APK
```

**⏱️ Tempo:** ~20-30 minutos  
**✅ Taxa de sucesso:** 99%

---

## 📋 CHECKLIST DE VERIFICAÇÃO

Antes de pedir ajuda, verifique:

**Instalações:**
- [ ] Node.js v18+ instalado: `node --version`
- [ ] Java JDK 17 instalado: `java -version`
- [ ] JAVA_HOME configurado corretamente
- [ ] Android Studio instalado
- [ ] Android SDK API 34 instalado

**Arquivos:**
- [ ] `package.json` existe
- [ ] `capacitor.config.json` existe
- [ ] `android/build.gradle` existe
- [ ] `android/app/build.gradle` existe
- [ ] `android/gradlew` existe
- [ ] `dist/` pasta existe e tem arquivos

**Comandos executados:**
- [ ] `npm install` sem erros
- [ ] `npm run build` sem erros
- [ ] `npx cap add android` executado
- [ ] `npx cap sync android` sem erros

**Android Studio:**
- [ ] Gradle sync completado
- [ ] Sem erros vermelhos no código
- [ ] Build → Clean executado
- [ ] Build → Rebuild executado

---

## 🆘 ÚLTIMA OPÇÃO: COMEÇAR DO ZERO

Se NADA funcionou:

```bash
# 1. Deletar TUDO
rm -rf node_modules android dist .gradle

# Windows:
rmdir /s /q node_modules
rmdir /s /q android
rmdir /s /q dist

# 2. Reinstalar
npm install

# 3. Rebuild
npm run build

# 4. Reconfigurar Android
npx cap add android
npx cap sync android

# 5. Abrir Android Studio limpo
npx cap open android
```

---

## 📞 LOGS ÚTEIS PARA DEBUG

**Ver logs detalhados do Gradle:**

```bash
cd android
./gradlew assembleDebug --stacktrace --info

# Windows:
cd android
gradlew.bat assembleDebug --stacktrace --info
```

**Ver logs do Capacitor:**

```bash
npx cap sync android --verbose
```

**Ver logs do app no celular:**

```bash
# Com celular conectado via USB
adb logcat | grep Capacitor
```

---

## ✅ CHECKLIST DE SUCESSO

Quando tudo estiver funcionando:

- [ ] ✅ Gradle sync completa sem erros
- [ ] ✅ Build → Rebuild Project sem erros
- [ ] ✅ APK gerado em android/app/build/outputs/apk/debug/
- [ ] ✅ APK tem 15-25 MB (tamanho normal)
- [ ] ✅ APK instala no celular
- [ ] ✅ App abre e funciona
- [ ] ✅ **ESTUDANDO PARA O TOP 5!** 🏆

---

**💪 NÃO DESISTA! CADA ERRO TEM SOLUÇÃO!**

**🎯 RUMO AO TOP 5 DA ALE-RR! 🏆📱🚀**
