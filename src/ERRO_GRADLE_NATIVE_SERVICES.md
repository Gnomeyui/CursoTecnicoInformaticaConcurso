# 🔴 ERRO: Could not initialize native services

## ❌ Erro completo:
```
Could not initialize native services.
Caused by: java.lang.UnsatisfiedLinkError: 
C:\Users\Gnomo\.gradle\native\0.2.7\x86_64-windows-gnu\gradle-fileevents.dll: 
Não foi possível encontrar o procedimento especificado
```

---

## 🎯 SOLUÇÃO RÁPIDA (90% dos casos)

### **MÉTODO 1: Limpar cache do Gradle** ⚡ (RECOMENDADO)

```bash
# 1. Fechar Android Studio completamente

# 2. Excluir cache do Gradle
rmdir /s /q "%USERPROFILE%\.gradle\caches"
rmdir /s /q "%USERPROFILE%\.gradle\native"

# 3. Excluir daemon
rmdir /s /q "%USERPROFILE%\.gradle\daemon"

# 4. Navegar para a pasta do projeto
cd C:\Users\Gnomo\Desktop\ale-rr-top5\android

# 5. Limpar build do Android
rmdir /s /q app\build
rmdir /s /q build
rmdir /s /q .gradle

# 6. Voltar para raiz
cd ..

# 7. Rebuild
npm run build

# 8. Sincronizar
npx cap sync android

# 9. Abrir Android Studio novamente
npx cap open android
```

**Resultado esperado:** ✅ Gradle vai baixar tudo novamente (limpo!)

---

## 🔧 MÉTODO 2: Forçar versão específica do Gradle

O erro mostra que está tentando usar Gradle 8.14.3, mas nosso projeto usa 8.2.1.

### **Editar `gradle-wrapper.properties`:**

**Arquivo:** `android/gradle/wrapper/gradle-wrapper.properties`

```properties
distributionBase=GRADLE_USER_HOME
distributionPath=wrapper/dists
distributionUrl=https\://services.gradle.org/distributions/gradle-8.2.1-all.zip
networkTimeout=10000
validateDistributionUrl=true
zipStoreBase=GRADLE_USER_HOME
zipStorePath=wrapper/dists
```

**IMPORTANTE:** Certifique-se de que a linha `distributionUrl` está apontando para **8.2.1** (não 8.14.3)!

---

## 🔧 MÉTODO 3: Verificar/Atualizar JDK

### **1. Verificar versão do JDK:**

```bash
java -version
```

**Resultado esperado:**
```
openjdk version "17.0.x"
```

### **2. Se não for JDK 17:**

**Opção A: Usar JDK do Android Studio** (RECOMENDADO)

No Android Studio:
1. **File → Project Structure → SDK Location**
2. **JDK Location:** Deve apontar para `C:\Program Files\Android\Android Studio\jbr`
3. Se não estiver, altere para o JBR do Android Studio

**Opção B: Baixar JDK 17**

- Download: https://adoptium.net/temurin/releases/?version=17
- Escolha: **JDK 17 LTS** para Windows x64
- Instale e configure `JAVA_HOME`

---

## 🔧 MÉTODO 4: Configurar gradle.properties

### **Criar/Editar arquivo `gradle.properties` no projeto:**

**Arquivo:** `android/gradle.properties`

Adicione estas linhas:

```properties
# JVM Arguments
org.gradle.jvmargs=-Xmx2048m -XX:MaxMetaspaceSize=512m -XX:+HeapDumpOnOutOfMemoryError -Dfile.encoding=UTF-8

# Gradle Daemon
org.gradle.daemon=true
org.gradle.parallel=true
org.gradle.configureondemand=false
org.gradle.caching=true

# Android
android.useAndroidX=true
android.enableJetifier=false

# Kotlin
kotlin.code.style=official

# Gradle
org.gradle.warning.mode=all
```

---

## 🔧 MÉTODO 5: Desabilitar Antivírus temporariamente

**⚠️ CUIDADO: Faça isso por sua conta e risco!**

Alguns antivírus bloqueiam DLLs nativas do Gradle.

### **Passos:**

1. **Desabilitar Windows Defender** (temporariamente):
   - Windows Security → Virus & threat protection
   - Manage settings → Real-time protection: OFF

2. **Executar comandos do MÉTODO 1**

3. **Reativar Windows Defender**

**Alternativa:** Adicionar exceção no antivírus:
- Pasta: `C:\Users\Gnomo\.gradle`
- Pasta: `C:\Users\Gnomo\Desktop\ale-rr-top5`

---

## 🔧 MÉTODO 6: Baixar DLL manualmente

Se os métodos anteriores não funcionarem, pode ser que a DLL esteja corrompida.

### **Passos:**

1. **Excluir pasta native:**
   ```bash
   rmdir /s /q "%USERPROFILE%\.gradle\native"
   ```

2. **Forçar Gradle a baixar novamente:**
   ```bash
   cd C:\Users\Gnomo\Desktop\ale-rr-top5\android
   gradlew.bat clean --refresh-dependencies
   ```

---

## 🔧 MÉTODO 7: Reinstalar Android Studio

**⚠️ ÚLTIMO RECURSO (se nada funcionar)**

1. **Desinstalar Android Studio:**
   - Painel de Controle → Programas → Desinstalar
   - Excluir pastas residuais:
     - `C:\Program Files\Android`
     - `%APPDATA%\Google\AndroidStudio`
     - `%LOCALAPPDATA%\Android`

2. **Excluir cache do Gradle:**
   ```bash
   rmdir /s /q "%USERPROFILE%\.gradle"
   ```

3. **Baixar versão mais recente:**
   - https://developer.android.com/studio

4. **Instalar novamente**

5. **Configurar:**
   - SDK Android API 34
   - Build Tools 34.0.0
   - Android SDK Platform-Tools

---

## 🎯 SOLUÇÃO PASSO A PASSO (COMPLETA)

Execute na ordem:

### **PASSO 1: Fechar tudo**
```bash
# Fechar Android Studio
# Fechar terminais
# Fechar processos Java (Ctrl+Shift+Esc → Processos → Encerrar java.exe)
```

### **PASSO 2: Limpar cache**
```bash
# Copie e cole TUDO de uma vez no PowerShell (como Administrador):

Remove-Item -Recurse -Force "$env:USERPROFILE\.gradle\caches" -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force "$env:USERPROFILE\.gradle\native" -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force "$env:USERPROFILE\.gradle\daemon" -ErrorAction SilentlyContinue
```

### **PASSO 3: Limpar projeto**
```bash
cd C:\Users\Gnomo\Desktop\ale-rr-top5\android

Remove-Item -Recurse -Force "app\build" -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force "build" -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force ".gradle" -ErrorAction SilentlyContinue

cd ..
```

### **PASSO 4: Verificar gradle-wrapper.properties**
```bash
# Abrir arquivo:
notepad android\gradle\wrapper\gradle-wrapper.properties

# Verificar se tem:
# distributionUrl=https\://services.gradle.org/distributions/gradle-8.2.1-all.zip
# Se tiver 8.14.3, mudar para 8.2.1!
```

### **PASSO 5: Rebuild**
```bash
npm run build
npx cap sync android
```

### **PASSO 6: Abrir Android Studio**
```bash
npx cap open android
```

### **PASSO 7: No Android Studio**
```
1. File → Invalidate Caches → Restart
2. Aguardar reiniciar
3. Aguardar Gradle Sync (barra inferior)
4. Build → Clean Project
5. Build → Rebuild Project
```

---

## 🔍 DIAGNÓSTICO: Qual é o problema?

O erro mostra:
```
gradle-8.14.3
```

Mas nosso projeto usa:
```
gradle-8.2.1
```

**Causa:** Algum processo anterior instalou Gradle 8.14.3 e está tentando usá-lo.

**Solução:** Limpar cache e forçar uso do 8.2.1.

---

## ✅ VERIFICAR SE RESOLVEU

Depois de aplicar as soluções:

```bash
# No terminal do Android Studio (ou PowerShell na pasta android):
cd android
.\gradlew.bat --version

# Deve mostrar:
# Gradle 8.2.1
```

Se mostrar outra versão, repita MÉTODO 2.

---

## 📋 CHECKLIST DE VERIFICAÇÃO

Antes de tentar novamente:

- [ ] Android Studio fechado
- [ ] Cache do Gradle limpo (`%USERPROFILE%\.gradle\caches`)
- [ ] Native limpo (`%USERPROFILE%\.gradle\native`)
- [ ] Daemon limpo (`%USERPROFILE%\.gradle\daemon`)
- [ ] Build do Android limpo (`android/build`, `android/app/build`, `android/.gradle`)
- [ ] `gradle-wrapper.properties` aponta para 8.2.1
- [ ] JDK 17 instalado (`java -version`)
- [ ] Antivírus com exceção para `.gradle` e projeto
- [ ] `npm run build` executado
- [ ] `npx cap sync android` executado

**Tudo OK?** Abra Android Studio: `npx cap open android`

---

## 🆘 SE AINDA NÃO FUNCIONAR

### **Teste usando linha de comando:**

```bash
cd C:\Users\Gnomo\Desktop\ale-rr-top5\android

# Limpar
.\gradlew.bat clean

# Verificar versão
.\gradlew.bat --version

# Tentar build
.\gradlew.bat assembleDebug
```

**Se falhar, copie o erro completo e veja:**
- [SOLUCOES_GRADLE.md](SOLUCOES_GRADLE.md)
- [FAQ_DUVIDAS_COMUNS.md](FAQ_DUVIDAS_COMUNS.md)

---

## 🎯 RESUMO: O que fazer

```
1. Fechar Android Studio
   ↓
2. Limpar cache Gradle (MÉTODO 1)
   ↓
3. Verificar gradle-wrapper.properties (MÉTODO 2)
   ↓
4. Limpar build do projeto
   ↓
5. npm run build
   ↓
6. npx cap sync android
   ↓
7. npx cap open android
   ↓
8. File → Invalidate Caches → Restart
   ↓
9. Build → Rebuild Project
```

---

## 🔗 LINKS ÚTEIS

- Gradle Daemon: https://docs.gradle.org/current/userguide/gradle_daemon.html
- JDK 17: https://adoptium.net/temurin/releases/?version=17
- Android Studio: https://developer.android.com/studio

---

## 📚 MAIS AJUDA

- [SOLUCOES_GRADLE.md](SOLUCOES_GRADLE.md) → Outros erros Gradle
- [COMECE_AQUI_AGORA.md](COMECE_AQUI_AGORA.md) → Guia completo
- [FAQ_DUVIDAS_COMUNS.md](FAQ_DUVIDAS_COMUNS.md) → Perguntas frequentes

---

**🏆 DEPOIS DE RESOLVER, VOCÊ ESTARÁ PRONTO PARA COMPILAR! 🎯📱🚀**
