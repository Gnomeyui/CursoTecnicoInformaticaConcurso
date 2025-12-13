@echo off
REM ========================================
REM   Scripts para Gerar APK - Windows
REM   ALE-RR TOP 5 - Técnico em Informática
REM ========================================

:menu
cls
echo.
echo ╔════════════════════════════════════════════╗
echo ║                                            ║
echo ║       ALE-RR TOP 5 - Build Scripts        ║
echo ║                                            ║
echo ╚════════════════════════════════════════════╝
echo.
echo Escolha uma opção:
echo.
echo [1] Instalar Dependências (npm install)
echo [2] Buildar Projeto Web (npm run build)
echo [3] Adicionar Android (npx cap add android)
echo [4] Sincronizar (npx cap sync android)
echo [5] Abrir Android Studio (npx cap open android)
echo [6] Build Completo (Todas as etapas)
echo [7] Limpar Cache e Rebuildar
echo [8] Verificar Instalações
echo [9] Ver Status dos Arquivos
echo [0] Sair
echo.
set /p opcao="Digite o número da opção: "

if "%opcao%"=="1" goto instalar
if "%opcao%"=="2" goto build
if "%opcao%"=="3" goto android_add
if "%opcao%"=="4" goto sync
if "%opcao%"=="5" goto open_studio
if "%opcao%"=="6" goto completo
if "%opcao%"=="7" goto limpar
if "%opcao%"=="8" goto verificar
if "%opcao%"=="9" goto status
if "%opcao%"=="0" goto sair

echo Opção inválida!
timeout /t 2
goto menu

:instalar
cls
echo.
echo ╔════════════════════════════════════════════╗
echo ║    Instalando Dependências...              ║
echo ╚════════════════════════════════════════════╝
echo.
npm install
if %errorlevel% neq 0 (
    echo.
    echo ❌ ERRO ao instalar dependências!
    echo.
    echo Possíveis soluções:
    echo - Verifique se o Node.js está instalado: node --version
    echo - Tente executar como Administrador
    echo - Use: npm install --legacy-peer-deps
    echo.
    pause
    goto menu
)
echo.
echo ✅ Dependências instaladas com sucesso!
echo.
pause
goto menu

:build
cls
echo.
echo ╔════════════════════════════════════════════╗
echo ║    Buildando Projeto Web...                ║
echo ╚════════════════════════════════════════════╝
echo.
npm run build
if %errorlevel% neq 0 (
    echo.
    echo ❌ ERRO ao buildar projeto!
    echo.
    echo Possíveis soluções:
    echo - Execute primeiro: npm install
    echo - Verifique se há erros no código TypeScript
    echo.
    pause
    goto menu
)
echo.
echo ✅ Projeto buildado com sucesso!
echo ✅ Pasta 'dist' criada com sucesso!
echo.
pause
goto menu

:android_add
cls
echo.
echo ╔════════════════════════════════════════════╗
echo ║    Adicionando Plataforma Android...       ║
echo ╚════════════════════════════════════════════╝
echo.
echo ⚠️  ATENÇÃO: Este comando pode sobrescrever
echo     arquivos personalizados!
echo.
echo     Pressione CTRL+C para cancelar ou
set /p continuar="     qualquer tecla para continuar..."
echo.
npx cap add android
if %errorlevel% neq 0 (
    echo.
    echo ❌ ERRO ao adicionar Android!
    echo.
    echo Possíveis soluções:
    echo - Execute primeiro: npm install
    echo - Execute: npm run build
    echo.
    pause
    goto menu
)
echo.
echo ✅ Android adicionado com sucesso!
echo.
pause
goto menu

:sync
cls
echo.
echo ╔════════════════════════════════════════════╗
echo ║    Sincronizando com Android...            ║
echo ╚════════════════════════════════════════════╝
echo.
npx cap sync android
if %errorlevel% neq 0 (
    echo.
    echo ❌ ERRO ao sincronizar!
    echo.
    echo Possíveis soluções:
    echo - Execute: npm run build
    echo - Execute: npx cap add android
    echo.
    pause
    goto menu
)
echo.
echo ✅ Sincronização concluída!
echo.
pause
goto menu

:open_studio
cls
echo.
echo ╔════════════════════════════════════════════╗
echo ║    Abrindo Android Studio...               ║
echo ╚════════════════════════════════════════════╝
echo.
npx cap open android
if %errorlevel% neq 0 (
    echo.
    echo ❌ ERRO ao abrir Android Studio!
    echo.
    echo Possíveis soluções:
    echo - Verifique se o Android Studio está instalado
    echo - Configure a variável de ambiente ANDROID_HOME
    echo.
    pause
    goto menu
)
echo.
echo ✅ Android Studio aberto!
echo.
echo Agora no Android Studio:
echo 1. Aguarde Gradle sync terminar
echo 2. Build ^> Build APK(s)
echo.
pause
goto menu

:completo
cls
echo.
echo ╔════════════════════════════════════════════╗
echo ║    Build Completo - Todas as Etapas        ║
echo ╚════════════════════════════════════════════╝
echo.
echo Este script vai executar:
echo 1. npm install
echo 2. npm run build
echo 3. npx cap add android
echo 4. npx cap sync android
echo 5. npx cap open android
echo.
echo ⏱️  Tempo estimado: 10-15 minutos
echo.
set /p continuar="Pressione qualquer tecla para continuar ou CTRL+C para cancelar..."

echo.
echo ═══════════════════════════════════════
echo    Etapa 1/5: Instalando dependências
echo ═══════════════════════════════════════
echo.
call npm install
if %errorlevel% neq 0 goto erro_completo

echo.
echo ═══════════════════════════════════════
echo    Etapa 2/5: Buildando projeto web
echo ═══════════════════════════════════════
echo.
call npm run build
if %errorlevel% neq 0 goto erro_completo

echo.
echo ═══════════════════════════════════════
echo    Etapa 3/5: Adicionando Android
echo ═══════════════════════════════════════
echo.
call npx cap add android
if %errorlevel% neq 0 goto erro_completo

echo.
echo ═══════════════════════════════════════
echo    Etapa 4/5: Sincronizando
echo ═══════════════════════════════════════
echo.
call npx cap sync android
if %errorlevel% neq 0 goto erro_completo

echo.
echo ═══════════════════════════════════════
echo    Etapa 5/5: Abrindo Android Studio
echo ═══════════════════════════════════════
echo.
call npx cap open android

echo.
echo ╔════════════════════════════════════════════╗
echo ║                                            ║
echo ║    ✅ BUILD COMPLETO FINALIZADO!          ║
echo ║                                            ║
echo ║    Agora no Android Studio:                ║
echo ║    1. Aguarde Gradle sync                  ║
echo ║    2. Build ^> Build APK(s)                ║
echo ║                                            ║
echo ╚════════════════════════════════════════════╝
echo.
pause
goto menu

:erro_completo
echo.
echo ❌ ERRO durante o build completo!
echo    Verifique os logs acima para mais detalhes.
echo.
pause
goto menu

:limpar
cls
echo.
echo ╔════════════════════════════════════════════╗
echo ║    Limpando Cache...                       ║
echo ╚════════════════════════════════════════════╝
echo.
echo ⚠️  ATENÇÃO: Isso vai deletar:
echo     - node_modules
echo     - android\app\build
echo     - dist
echo.
set /p continuar="Continuar? (S/N): "
if /i not "%continuar%"=="S" goto menu

echo.
echo Removendo node_modules...
if exist node_modules rmdir /s /q node_modules

echo Removendo android\app\build...
if exist android\app\build rmdir /s /q android\app\build

echo Removendo dist...
if exist dist rmdir /s /q dist

echo.
echo ✅ Cache limpo!
echo.
echo Deseja reinstalar dependências agora? (S/N)
set /p reinstalar=": "
if /i "%reinstalar%"=="S" (
    echo.
    echo Reinstalando dependências...
    call npm install
    echo.
    echo ✅ Dependências reinstaladas!
)
echo.
pause
goto menu

:verificar
cls
echo.
echo ╔════════════════════════════════════════════╗
echo ║    Verificando Instalações...              ║
echo ╚════════════════════════════════════════════╝
echo.

echo Verificando Node.js...
node --version
if %errorlevel% neq 0 (
    echo ❌ Node.js não instalado
) else (
    echo ✅ Node.js instalado
)
echo.

echo Verificando NPM...
npm --version
if %errorlevel% neq 0 (
    echo ❌ NPM não instalado
) else (
    echo ✅ NPM instalado
)
echo.

echo Verificando Java...
java -version
if %errorlevel% neq 0 (
    echo ❌ Java não instalado ou JAVA_HOME não configurado
) else (
    echo ✅ Java instalado
)
echo.

echo Verificando Capacitor CLI...
call npx cap --version
if %errorlevel% neq 0 (
    echo ❌ Capacitor CLI não disponível
) else (
    echo ✅ Capacitor CLI disponível
)
echo.

echo ══════════════════════════════════════
echo           VERIFICAÇÃO DE ARQUIVOS
echo ══════════════════════════════════════
echo.

if exist package.json (echo ✅ package.json) else (echo ❌ package.json)
if exist capacitor.config.json (echo ✅ capacitor.config.json) else (echo ❌ capacitor.config.json)
if exist vite.config.ts (echo ✅ vite.config.ts) else (echo ❌ vite.config.ts)
if exist tsconfig.json (echo ✅ tsconfig.json) else (echo ❌ tsconfig.json)
if exist App.tsx (echo ✅ App.tsx) else (echo ❌ App.tsx)
if exist android\build.gradle (echo ✅ android\build.gradle) else (echo ❌ android\build.gradle)
if exist android\app\build.gradle (echo ✅ android\app\build.gradle) else (echo ❌ android\app\build.gradle)

echo.
pause
goto menu

:status
cls
echo.
echo ╔════════════════════════════════════════════╗
echo ║    Status dos Arquivos                     ║
echo ╚════════════════════════════════════════════╝
echo.

if exist node_modules (
    echo ✅ node_modules - Dependências instaladas
) else (
    echo ❌ node_modules - Execute: npm install
)
echo.

if exist dist (
    echo ✅ dist - Projeto buildado
) else (
    echo ❌ dist - Execute: npm run build
)
echo.

if exist android\gradlew (
    echo ✅ android\gradlew - Android configurado
) else (
    echo ⚠️  android\gradlew - Execute: npx cap add android
)
echo.

if exist android\app\build\outputs\apk\debug\app-debug.apk (
    echo ✅ APK Debug gerado!
    echo    Localização: android\app\build\outputs\apk\debug\app-debug.apk
) else (
    echo ⚠️  APK ainda não gerado
    echo    Execute build no Android Studio
)
echo.

if exist android\app\build\outputs\apk\release\app-release.apk (
    echo ✅ APK Release gerado!
    echo    Localização: android\app\build\outputs\apk\release\app-release.apk
) else (
    echo ⚠️  APK Release não gerado
)
echo.

pause
goto menu

:sair
cls
echo.
echo ╔════════════════════════════════════════════╗
echo ║                                            ║
echo ║    Até logo! Boa sorte nos estudos!       ║
echo ║                                            ║
echo ║         🏆 RUMO AO TOP 5! 🚀              ║
echo ║                                            ║
echo ╚════════════════════════════════════════════╝
echo.
timeout /t 2
exit
