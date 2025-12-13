═══════════════════════════════════════════════════════════════════
  🤖 COMPILAR NO ANDROID STUDIO - GUIA CORRETO ALE-RR TOP 5
═══════════════════════════════════════════════════════════════════

⚡ APP ANDROID NATIVO PRONTO PARA COMPILAR!

───────────────────────────────────────────────────────────────────
  📋 REQUISITOS ANTES DE COMEÇAR:
───────────────────────────────────────────────────────────────────

✅ Node.js 18+        → https://nodejs.org/
✅ JDK 17             → https://adoptium.net/
✅ Android Studio     → https://developer.android.com/studio

⚠️ IMPORTANTE: Configure as variáveis de ambiente:

Windows (CMD como administrador):
──────────────────────────────────────
setx JAVA_HOME "C:\Program Files\Eclipse Adoptium\jdk-17.0.x"
setx ANDROID_HOME "%LOCALAPPDATA%\Android\Sdk"

Mac/Linux (~/.bashrc ou ~/.zshrc):
──────────────────────────────────────
export JAVA_HOME=/Library/Java/JavaVirtualMachines/temurin-17.jdk/Contents/Home
export ANDROID_HOME=$HOME/Library/Android/sdk

Reinicie o terminal depois!

───────────────────────────────────────────────────────────────────
  🚀 5 PASSOS PARA GERAR APK:
───────────────────────────────────────────────────────────────────

📦 PASSO 1: Instalar dependências
──────────────────────────────────────
cd seu-projeto
npm install

⏱️ Tempo: 2-3 minutos

───────────────────────────────────────────────────────────────────

🔧 PASSO 2: Limpar e sincronizar projeto
──────────────────────────────────────

⚠️ ATENÇÃO: NÃO execute "npx cap add android"!
   O projeto JÁ TEM a pasta /android configurada!

Execute apenas:
──────────────────────────────────────

# Linux/Mac:
rm -rf android/app/build android/build android/.gradle dist
npm run build
npx cap sync android

# Windows:
rmdir /s /q android\app\build android\build android\.gradle dist
npm run build
npx cap sync android

✅ Sincroniza código React com projeto Android

⏱️ Tempo: 2-3 minutos

───────────────────────────────────────────────────────────────────

📲 PASSO 3: Abrir no Android Studio
──────────────────────────────────────
npx cap open android

Ou manualmente:
  Android Studio → Open → Selecione pasta /android

Quando abrir:
  1. File → Invalidate Caches → Restart (aguarde 2 min)
  2. Build → Clean Project (aguarde 1 min)

⏱️ Tempo: 3-5 minutos

───────────────────────────────────────────────────────────────────

🔨 PASSO 4: Compilar APK
──────────────────────────────────────
No Android Studio:

1. Build → Rebuild Project (aguarde 5-10 min)
2. Build → Build Bundle(s) / APK(s) → Build APK(s)
3. Clique em "locate" quando aparecer a notificação

⏱️ Tempo: 10-15 minutos (primeira compilação)

✅ APK gerado em:
   /android/app/build/outputs/apk/debug/app-debug.apk

───────────────────────────────────────────────────────────────────

📱 PASSO 5: Instalar no celular
──────────────────────────────────────
Opção A: Via Android Studio
  1. Conecte celular via USB (ative Depuração USB)
  2. Clique em ▶️ (Run)
  3. Pronto!

Opção B: Via arquivo APK
  1. Copie app-debug.apk para o celular
  2. No celular: Configurações → Segurança → Fontes desconhecidas
  3. Abra o arquivo APK no celular
  4. Permitir instalação
  5. Instalar

───────────────────────────────────────────────────────────────────
  ⚡ COMANDOS ÚTEIS:
───────────────────────────────────────────────────────────────────

# Após fazer mudanças no código React:
npm run build
npx cap sync android

# Abrir no Android Studio:
npx cap open android

# Limpar tudo e recomeçar:
# Linux/Mac:
rm -rf android/app/build android/build android/.gradle dist node_modules
npm install
npm run build
npx cap sync android

# Windows:
rmdir /s /q android\app\build android\build android\.gradle dist node_modules
npm install
npm run build
npx cap sync android

───────────────────────────────────────────────────────────────────
  📊 ESTRUTURA DO PROJETO:
───────────────────────────────────────────────────────────────────

ale-rr-top5/
├── android/                     ← Projeto Android Studio ✅
│   ├── app/
│   │   ├── build.gradle         ← Configurações Gradle ✅
│   │   ├── src/main/
│   │   │   ├── AndroidManifest.xml        ← Corrigido ✅
│   │   │   ├── java/.../MainActivity.java ← Corrigido ✅
│   │   │   └── res/xml/file_paths.xml     ← Criado ✅
│   │   └── build/
│   │       └── outputs/
│   │           └── apk/
│   │               └── debug/
│   │                   └── app-debug.apk  ← SEU APK!
│   └── build.gradle
├── capacitor.config.json        ← Config Capacitor ✅
├── components/                  ← Componentes React ✅
├── data/                        ← 2000+ questões ✅
└── package.json                 ← Dependências ✅

───────────────────────────────────────────────────────────────────
  🎨 PERSONALIZAR O APP (JÁ CONFIGURADO):
───────────────────────────────────────────────────────────────────

✅ Nome do app: "ALE-RR TOP 5"
   /android/app/src/main/res/values/strings.xml

✅ Package: com.alerr.top5
   /android/app/build.gradle

✅ Ícone do app: Usar icon.kitchen para gerar
   /android/app/src/main/res/mipmap-*/ic_launcher.png

✅ Splash screen:
   /android/app/src/main/res/drawable/splash.xml
   /android/app/src/main/res/values/styles.xml

✅ Permissões (já configuradas):
   /android/app/src/main/AndroidManifest.xml
   - POST_NOTIFICATIONS (notificações)
   - VIBRATE (vibração)

───────────────────────────────────────────────────────────────────
  ⚠️ PROBLEMAS COMUNS:
───────────────────────────────────────────────────────────────────

❌ "JAVA_HOME is not set"
   → Instale JDK 17: https://adoptium.net/
   → Configure variável JAVA_HOME
   → Reinicie terminal

❌ "Android SDK not found"
   → Instale Android Studio
   → Configure variável ANDROID_HOME
   → Abra Android Studio → More Actions → SDK Manager
   → Install Android SDK
   → Reinicie terminal

❌ "Gradle build failed"
   → Leia: SOLUCOES_GRADLE.md
   → cd android
   → ./gradlew clean (Linux/Mac) ou gradlew.bat clean (Windows)
   → cd ..
   → Tente novamente

❌ App abre tela branca
   → npm run build
   → npx cap sync android
   → Rebuild no Android Studio

❌ "Unable to load script"
   → Verifique se pasta dist/ existe
   → npm run build
   → npx cap sync android

❌ APK não instala no celular
   → Leia: ERRO_INSTALACAO_CELULAR.md
   → Todas as correções já foram aplicadas!
   → Verifique se tem espaço no celular
   → Habilite "Fontes desconhecidas"

───────────────────────────────────────────────────────────────────
  🔥 GERAR APK ASSINADO (PARA DISTRIBUIR):
───────────────────────────────────────────────────────────────────

1. Android Studio → Build → Generate Signed Bundle / APK
2. Escolha: APK
3. Create new keystore:
   Path: /caminho/alerr-top5-keystore.jks
   Password: ******** (ANOTE!)
   Alias: alerrtop5
   Validity: 25 years
4. Next → Release → Finish

✅ APK gerado em:
   /android/app/release/app-release.apk

⚠️ GUARDE O KEYSTORE E SENHA! Sem eles não pode atualizar o app!

───────────────────────────────────────────────────────────────────
  📦 PUBLICAR NA PLAY STORE:
───────────────────────────────────────────────────────────────────

1. Crie conta: https://play.google.com/console/signup ($25)
2. Gere .aab: Build → Generate Signed Bundle (AAB, não APK)
3. Upload na Play Console
4. Preencha informações:
   - Nome: ALE-RR TOP 5
   - Descrição: App de estudos para concurso ALE-RR
   - Categoria: Educação
   - Screenshots (obrigatório)
5. Aguarde aprovação (1-7 dias)

───────────────────────────────────────────────────────────────────
  ⏱️ TEMPO TOTAL:
───────────────────────────────────────────────────────────────────

Primeira vez:
  Instalar Android Studio:    20 min
  Configurar ambiente:        10 min
  npm install:                 3 min
  Build e sync:                3 min
  Compilar primeira vez:      15 min
  ─────────────────────────────────
  TOTAL:                      51 min

Compilações seguintes:
  Fazer mudanças:             X min
  npm run build:              1 min
  npx cap sync android:       30 seg
  Rebuild + Build APK:        3 min
  ─────────────────────────────────
  TOTAL:                      5 min

───────────────────────────────────────────────────────────────────
  📚 MAIS GUIAS:
───────────────────────────────────────────────────────────────────

Leia também:
  ✅ COMECE_AQUI_AGORA.md          → Guia rápido 3 passos
  ✅ TESTE_RAPIDO.md               → Comandos detalhados
  ✅ ERRO_INSTALACAO_CELULAR.md    → Troubleshooting completo
  ✅ SOLUCOES_GRADLE.md            → Erros Gradle
  ✅ ANDROID_STUDIO_DIRETO.md      → Guia Android Studio
  ✅ CORRECOES_REALIZADAS.md       → O que foi corrigido

───────────────────────────────────────────────────────────────────
  🎯 RESUMO ULTRA-RÁPIDO:
───────────────────────────────────────────────────────────────────

1. npm install
2. npm run build
3. npx cap sync android
4. npx cap open android
5. Android Studio → Build → Build APK(s)
6. ✅ APK pronto!

───────────────────────────────────────────────────────────────────
  🔗 LINKS ÚTEIS:
───────────────────────────────────────────────────────────────────

📥 Node.js:          https://nodejs.org/
☕ JDK 17:           https://adoptium.net/
🤖 Android Studio:   https://developer.android.com/studio
📖 Capacitor Docs:   https://capacitorjs.com/docs
🎨 Ícone Generator:  https://icon.kitchen/
📦 Play Console:     https://play.google.com/console

───────────────────────────────────────────────────────────────────
  ✅ CORREÇÕES JÁ APLICADAS NO PROJETO:
───────────────────────────────────────────────────────────────────

✅ AndroidManifest.xml       → Otimizado e corrigido
✅ MainActivity.java          → Simplificado
✅ capacitor.config.json      → Configurado
✅ file_paths.xml             → Criado
✅ build.gradle               → Dependências corretas
✅ Projeto limpo              → 41 arquivos removidos
✅ Documentação focada        → 7 guias essenciais

⚠️ NÃO execute "npx cap add android" - vai sobrescrever correções!

───────────────────────────────────────────────────────────────────
  ⚠️ DIFERENÇAS DO GUIA GENÉRICO:
───────────────────────────────────────────────────────────────────

GUIA GENÉRICO (errado):           GUIA ALE-RR TOP 5 (correto):
─────────────────────────────     ─────────────────────────────
❌ npx cap add android            ✅ Pasta /android já existe
❌ manga-reader-pdf               ✅ ALE-RR TOP 5
❌ Scripts npm personalizados     ✅ Comandos Capacitor diretos
❌ Acesso a arquivos PDF          ✅ App de Quiz/Estudos
❌ Sem correções aplicadas        ✅ Correções já aplicadas

───────────────────────────────────────────────────────────────────
  🎊 PRONTO PARA COMPILAR!
───────────────────────────────────────────────────────────────────

Seu projeto ALE-RR TOP 5 está 100% configurado!

Execute:
  npm install
  npm run build
  npx cap sync android
  npx cap open android

E compile no Android Studio! 🚀📱

═══════════════════════════════════════════════════════════════════

Para mais detalhes:
  → COMECE_AQUI_AGORA.md (guia rápido)
  → TESTE_RAPIDO.md (comandos completos)

🏆 BOA SORTE NO CONCURSO! RUMO AO TOP 5! 🎯
