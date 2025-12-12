# 📱 COMO GERAR O APK DO APP ANDROID

## 🎯 OBJETIVO
Transformar o app em um arquivo **APK** que você pode instalar em qualquer celular Android (seu e dos seus amigos).

---

## 📋 REQUISITOS (INSTALAR NO SEU COMPUTADOR)

### **1. Node.js** (Essencial)
```
🌐 Site: https://nodejs.org/

1. Baixe a versão LTS (recomendada)
2. Instale normalmente (Next, Next, Finish)
3. Teste no terminal:
   > node --version
   Deve mostrar: v20.x.x ou similar
```

### **2. Android Studio** (Essencial para gerar APK)
```
🌐 Site: https://developer.android.com/studio

1. Baixe o Android Studio
2. Instale (pode levar 30-60 minutos)
3. Na primeira abertura:
   - Instale o Android SDK
   - Instale o Android SDK Platform-Tools
   - Instale Android SDK Build-Tools
   - Aceite as licenças
```

### **3. Java JDK 17** (Necessário)
```
🌐 Site: https://www.oracle.com/java/technologies/downloads/#java17

1. Baixe o JDK 17
2. Instale normalmente
3. Configure a variável JAVA_HOME:
   
   Windows:
   - Painel de Controle → Sistema → Configurações Avançadas
   - Variáveis de Ambiente → Nova (Sistema)
   - Nome: JAVA_HOME
   - Valor: C:\Program Files\Java\jdk-17
```

---

## 🚀 PASSO A PASSO COMPLETO

### **ETAPA 1: Preparar o Projeto**

#### **1.1 - Baixar o código do projeto**
```bash
# Se estiver no Figma Make, você precisa exportar os arquivos
# Copie todos os arquivos para uma pasta no seu computador
# Exemplo: C:\Users\SeuNome\Desktop\alerr-app
```

#### **1.2 - Abrir terminal na pasta**
```
Windows:
1. Abra a pasta do projeto
2. Clique na barra de endereços (onde mostra C:\Users\...)
3. Digite "cmd" e pressione Enter
4. Terminal abre na pasta certa

Ou:
1. Shift + Botão direito na pasta
2. "Abrir janela do PowerShell aqui"
```

#### **1.3 - Instalar dependências**
```bash
npm install
```
**Aguarde 2-5 minutos** (vai baixar tudo que precisa)

---

### **ETAPA 2: Configurar Capacitor**

#### **2.1 - Instalar Capacitor CLI**
```bash
npm install -g @capacitor/cli
```

#### **2.2 - Inicializar Capacitor**
```bash
npx cap init "ALE-RR TOP 5" "com.alerr.top5" --web-dir=dist
```

#### **2.3 - Adicionar plataforma Android**
```bash
npx cap add android
```
**Isso cria a pasta `/android` com todo o projeto Android**

---

### **ETAPA 3: Buildar o Projeto Web**

```bash
npm run build
```
**Isso cria a pasta `/dist` com os arquivos otimizados**

---

### **ETAPA 4: Sincronizar com Android**

```bash
npx cap sync android
```
**Isso copia os arquivos web para dentro do projeto Android**

---

### **ETAPA 5: Gerar o APK**

#### **OPÇÃO A: APK de DEBUG (Mais Rápido)** ✅ RECOMENDADO PARA COMEÇAR

```bash
# 1. Abrir o projeto no Android Studio
npx cap open android

# No Android Studio que abriu:
# 2. Menu → Build → Build Bundle(s) / APK(s) → Build APK(s)
# 3. Aguarde 3-10 minutos (primeira vez demora mais)
# 4. Quando terminar, clica em "locate" para encontrar o APK
# 5. O APK estará em:
#    android/app/build/outputs/apk/debug/app-debug.apk
```

**Pronto! Você tem um APK funcionando!** 🎉

---

#### **OPÇÃO B: APK de RELEASE (Para Distribuir)** ⭐ VERSÃO FINAL

Este APK é menor, mais rápido e profissional.

**5.1 - Gerar keystore (chave de assinatura)**
```bash
# No terminal, dentro da pasta do projeto:
cd android/app

# Gerar keystore:
keytool -genkey -v -keystore release.keystore -alias alerr-key -keyalg RSA -keysize 2048 -validity 10000

# Vai pedir informações:
# - Senha: (escolha uma senha forte, EX: AleRR2024@Top5)
# - Nome: Seu Nome
# - Organização: ALE-RR
# - Cidade: Boa Vista
# - Estado: RR
# - País: BR
```

**⚠️ IMPORTANTE: Guarde essa senha! Você vai precisar dela sempre que gerar novo APK!**

**5.2 - Criar arquivo de configuração de assinatura**

Crie o arquivo: `android/key.properties`
```properties
storePassword=SUA_SENHA_AQUI
keyPassword=SUA_SENHA_AQUI
keyAlias=alerr-key
storeFile=release.keystore
```

**5.3 - Modificar build.gradle**

Edite: `android/app/build.gradle`

Adicione ANTES de `android {`:
```gradle
def keystoreProperties = new Properties()
def keystorePropertiesFile = rootProject.file('key.properties')
if (keystorePropertiesFile.exists()) {
    keystoreProperties.load(new FileInputStream(keystorePropertiesFile))
}
```

Dentro de `android {`, adicione:
```gradle
signingConfigs {
    release {
        keyAlias keystoreProperties['keyAlias']
        keyPassword keystoreProperties['keyPassword']
        storeFile file(keystoreProperties['storeFile'])
        storePassword keystoreProperties['storePassword']
    }
}
```

Dentro de `buildTypes {`, modifique `release`:
```gradle
buildTypes {
    release {
        signingConfig signingConfigs.release
        minifyEnabled true
        proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'
    }
}
```

**5.4 - Gerar APK assinado**
```bash
cd ../.. # Voltar para raiz do projeto
npx cap open android

# No Android Studio:
# Menu → Build → Generate Signed Bundle / APK
# → APK → Next
# → Create new... (se primeira vez) ou Choose existing...
# → Navegue até android/app/release.keystore
# → Digite a senha
# → Next → release → Finish

# Ou use o terminal:
cd android
./gradlew assembleRelease

# APK final estará em:
# android/app/build/outputs/apk/release/app-release.apk
```

**Este é o APK profissional para distribuir!** 🏆

---

## 📲 INSTALAR O APK NO CELULAR

### **MÉTODO 1: USB** ✅ MAIS FÁCIL

```
1. HABILITAR INSTALAÇÃO DE APPS DESCONHECIDOS:
   Android → Configurações → Segurança
   → "Fontes desconhecidas" ou "Instalar apps desconhecidos"
   → Ativar

2. CONECTAR CELULAR NO PC VIA USB

3. COPIAR APK:
   - Abrir pasta do celular no PC
   - Copiar app-debug.apk (ou app-release.apk)
   - Colar na pasta Downloads do celular

4. NO CELULAR:
   - Abrir "Arquivos" ou "Gerenciador de arquivos"
   - Ir em Downloads
   - Tocar em app-debug.apk
   - "Instalar"
   - "Abrir"
   - 🎉 APP INSTALADO!
```

---

### **MÉTODO 2: Compartilhar via WhatsApp/Telegram**

```
1. ENVIAR APK PARA VOCÊ MESMO:
   - WhatsApp Web no PC
   - Envie o arquivo .apk para você mesmo
   
2. NO CELULAR:
   - Abra a mensagem
   - Baixe o APK
   - Toque no arquivo baixado
   - Instalar
   - 🎉 PRONTO!
```

---

### **MÉTODO 3: Google Drive / Dropbox**

```
1. FAZER UPLOAD:
   - Upload do .apk no Google Drive
   - Gerar link de compartilhamento

2. NO CELULAR:
   - Abrir link
   - Baixar APK
   - Instalar
```

---

### **MÉTODO 4: QR Code** (PROFISSA!)

```
1. GERAR QR CODE:
   - Site: https://www.qr-code-generator.com/
   - Type: File Upload
   - Upload do .apk
   - Gerar QR Code

2. IMPRIMIR OU MOSTRAR NA TELA

3. AMIGOS ESCANEIAM:
   - Câmera do celular
   - Escanear QR Code
   - Download automático
   - Instalar
```

---

## 🎁 COMPARTILHAR COM AMIGOS

### **OPÇÃO 1: Grupo do WhatsApp**
```
1. Crie um grupo "ALE-RR Estudos"
2. Mande o APK no grupo
3. Todos baixam e instalam
4. ✅ Todo mundo estudando junto!
```

### **OPÇÃO 2: Google Drive Compartilhado**
```
1. Upload do APK no Drive
2. Compartilhar link (acesso aberto)
3. Copiar link encurtado: https://bit.ly/alerr-app
4. Enviar link para amigos
5. Eles baixam e instalam
```

### **OPÇÃO 3: Site próprio**
```
1. Criar página HTML simples:
   <a href="app-release.apk">Baixar ALE-RR TOP 5</a>
2. Hospedar no Netlify/Vercel (grátis)
3. Compartilhar link: https://alerr-top5.netlify.app
```

---

## ✅ CHECKLIST COMPLETO

### **Preparação:**
- [ ] Node.js instalado
- [ ] Android Studio instalado
- [ ] Java JDK 17 instalado
- [ ] Código do projeto baixado

### **Build:**
- [ ] `npm install` executado
- [ ] `npx cap add android` executado
- [ ] `npm run build` executado
- [ ] `npx cap sync android` executado

### **APK:**
- [ ] APK gerado (debug ou release)
- [ ] APK testado no seu celular
- [ ] App abre e funciona
- [ ] Notificações funcionam

### **Distribuição:**
- [ ] APK compartilhado com amigos
- [ ] Amigos conseguiram instalar
- [ ] Todo mundo estudando! 🚀

---

## 🔧 TROUBLESHOOTING

### **❌ "npm não é reconhecido"**
```
Problema: Node.js não instalado ou não está no PATH

Solução:
1. Baixe e instale: https://nodejs.org/
2. Reinicie o terminal
3. Teste: node --version
```

### **❌ "JAVA_HOME not found"**
```
Problema: Java não configurado

Solução Windows:
1. Painel de Controle → Sistema → Avançado
2. Variáveis de Ambiente → Nova
3. Nome: JAVA_HOME
4. Valor: C:\Program Files\Java\jdk-17
5. Reinicie terminal
```

### **❌ "Android SDK not found"**
```
Problema: Android Studio não configurado

Solução:
1. Abra Android Studio
2. Menu → Tools → SDK Manager
3. Instale:
   - Android SDK Platform-Tools
   - Android SDK Build-Tools 34
4. Configure ANDROID_HOME:
   - Variável de ambiente
   - Valor: C:\Users\SeuNome\AppData\Local\Android\Sdk
```

### **❌ "Build failed"**
```
Problema: Erro durante compilação

Soluções:
1. Limpar cache:
   cd android
   ./gradlew clean

2. Atualizar Gradle:
   Android Studio → File → Sync Project with Gradle Files

3. Verificar versões:
   - compileSdkVersion 34
   - targetSdkVersion 34
   - minSdkVersion 22
```

### **❌ "App não instala no celular"**
```
Problema: Segurança bloqueando

Solução:
1. Configurações → Segurança
2. "Fontes desconhecidas" → Ativar
3. Ou: "Instalar apps desconhecidos" → Chrome/Arquivos → Permitir
4. Tentar instalar novamente
```

### **❌ "Notificações não funcionam"**
```
Problema: Permissões não concedidas

Solução:
1. Abrir app
2. Configurações do Android → Apps → ALE-RR TOP 5
3. Permissões → Notificações → Permitir
4. Testar novamente
```

---

## 📊 TAMANHO DO APK

**APK Debug:** ~15-25 MB  
**APK Release (minificado):** ~8-15 MB  

**Para reduzir mais:**
- Remova imagens não usadas
- Use ProGuard (já configurado no release)
- Comprima assets

---

## 🚀 PRÓXIMOS PASSOS (OPCIONAL)

### **1. Publicar na Play Store** (Alcance milhões)
```
Custo: $25 (taxa única)
Tempo: 2-7 dias para aprovação

Passos:
1. Criar conta Google Play Developer
2. Pagar taxa de $25
3. Criar ficha do app
4. Upload do app-release.aab (Bundle)
5. Preencher informações
6. Enviar para revisão
7. Aguardar aprovação
8. ✅ App público na Play Store!
```

### **2. Atualizações automáticas**
```
Adicione sistema de verificação de updates:
- Checar versão no servidor
- Notificar usuário se houver update
- Download automático do novo APK
```

### **3. Analytics**
```
Adicionar Firebase Analytics:
- Ver quantos usuários ativos
- Quais matérias mais estudadas
- Tempo médio de uso
- Taxa de aprovação
```

---

## 🎉 RESUMO RÁPIDO

**5 comandos para gerar APK:**

```bash
# 1. Instalar dependências
npm install

# 2. Adicionar Android
npx cap add android

# 3. Buildar projeto
npm run build

# 4. Sincronizar
npx cap sync android

# 5. Abrir Android Studio
npx cap open android
# Depois: Build → Build APK
```

**APK fica em:**
```
android/app/build/outputs/apk/debug/app-debug.apk
```

**Instalar:**
```
1. Copiar .apk para celular
2. Tocar no arquivo
3. Instalar
4. 🎉 PRONTO!
```

---

## 💪 VOCÊ CONSEGUE!

Este processo pode parecer complexo na primeira vez, mas depois de fazer uma vez, você consegue gerar novos APKs em **5 minutos**!

**Qualquer dúvida, revise este guia passo a passo!**

**Boa sorte e rumo ao TOP 5 da ALE-RR! 🏆📱🚀**
