@echo off
chcp 65001 > nul
cls

echo.
echo ╔══════════════════════════════════════════════════════════════╗
echo ║                                                              ║
echo ║        🔥 REBUILD COMPLETO - CORRIGE HTML QUEBRADO 🔥        ║
echo ║                                                              ║
echo ╚══════════════════════════════════════════════════════════════╝
echo.
echo Este script vai:
echo   1. Limpar TODOS os builds antigos
echo   2. Buildar React do ZERO
echo   3. Sincronizar com Android
echo   4. Verificar que tudo foi copiado corretamente
echo   5. Abrir Android Studio
echo.
pause
echo.

REM ============================================================
REM PASSO 1: LIMPAR TUDO
REM ============================================================
echo.
echo ╔══════════════════════════════════════════════════════════════╗
echo ║  PASSO 1/5: Limpando builds antigos...                      ║
echo ╚══════════════════════════════════════════════════════════════╝
echo.

if exist dist (
    echo 🧹 Deletando dist/...
    rmdir /s /q dist
)

if exist android\app\build (
    echo 🧹 Deletando android/app/build...
    rmdir /s /q android\app\build
)

if exist android\build (
    echo 🧹 Deletando android/build...
    rmdir /s /q android\build
)

if exist android\.gradle (
    echo 🧹 Deletando android/.gradle...
    rmdir /s /q android\.gradle
)

if exist node_modules\.vite (
    echo 🧹 Deletando node_modules/.vite...
    rmdir /s /q node_modules\.vite
)

if exist android\app\src\main\assets\public (
    echo 🧹 Deletando assets antigos...
    rmdir /s /q android\app\src\main\assets\public
)

echo.
echo ✅ Limpeza completa!
timeout /t 2 > nul

REM ============================================================
REM PASSO 2: BUILD REACT
REM ============================================================
echo.
echo ╔══════════════════════════════════════════════════════════════╗
echo ║  PASSO 2/5: Buildando React...                              ║
echo ╚══════════════════════════════════════════════════════════════╝
echo.
echo ⚛️ Executando: npm run build
echo.

call npm run build

if errorlevel 1 (
    echo.
    echo ❌❌❌ ERRO NO BUILD! ❌❌❌
    echo.
    echo O comando "npm run build" falhou!
    echo Verifique os erros acima e tente novamente.
    echo.
    pause
    exit /b 1
)

REM ============================================================
REM PASSO 3: VERIFICAR DIST
REM ============================================================
echo.
echo ╔══════════════════════════════════════════════════════════════╗
echo ║  PASSO 3/5: Verificando dist/...                            ║
echo ╚══════════════════════════════════════════════════════════════╝
echo.

if exist dist\index.html (
    echo ✅ dist/index.html encontrado!
    
    if exist dist\assets (
        echo ✅ dist/assets/ encontrado!
        echo.
        echo 📂 Arquivos em dist/:
        dir /b dist
        echo.
        echo 📂 Arquivos em dist/assets/:
        dir /b dist\assets
        echo.
    ) else (
        echo ❌ ERRO: dist/assets/ NÃO ENCONTRADO!
        echo.
        echo O build não criou a pasta assets!
        echo Algo deu errado no Vite.
        echo.
        pause
        exit /b 1
    )
) else (
    echo ❌❌❌ ERRO CRÍTICO! ❌❌❌
    echo.
    echo dist/index.html NÃO FOI CRIADO!
    echo.
    echo Isso significa que o build React falhou.
    echo Volte e verifique os erros do "npm run build".
    echo.
    pause
    exit /b 1
)

timeout /t 3 > nul

REM ============================================================
REM PASSO 4: SYNC ANDROID
REM ============================================================
echo.
echo ╔══════════════════════════════════════════════════════════════╗
echo ║  PASSO 4/5: Sincronizando com Android...                    ║
echo ╚══════════════════════════════════════════════════════════════╝
echo.
echo 📱 Executando: npx cap sync android
echo.

call npx cap sync android

if errorlevel 1 (
    echo.
    echo ❌❌❌ ERRO NO SYNC! ❌❌❌
    echo.
    echo O comando "npx cap sync android" falhou!
    echo Verifique os erros acima.
    echo.
    pause
    exit /b 1
)

REM ============================================================
REM PASSO 5: VERIFICAR PUBLIC
REM ============================================================
echo.
echo ╔══════════════════════════════════════════════════════════════╗
echo ║  PASSO 5/5: Verificando assets copiados...                  ║
echo ╚══════════════════════════════════════════════════════════════╝
echo.

if exist android\app\src\main\assets\public\index.html (
    echo ✅ public/index.html encontrado!
    
    if exist android\app\src\main\assets\public\assets (
        echo ✅ public/assets/ encontrado!
        echo.
        echo 📂 Arquivos em public/:
        dir /b android\app\src\main\assets\public
        echo.
        echo 📂 Arquivos em public/assets/:
        dir /b android\app\src\main\assets\public\assets
        echo.
    ) else (
        echo ❌ ERRO: public/assets/ NÃO ENCONTRADO!
        echo.
        echo O sync copiou o index.html mas não os assets!
        echo Tente novamente: npx cap sync android
        echo.
        pause
        exit /b 1
    )
) else (
    echo ❌❌❌ ERRO CRÍTICO! ❌❌❌
    echo.
    echo android/app/src/main/assets/public/index.html NÃO EXISTE!
    echo.
    echo Isso significa que o "npx cap sync" não funcionou.
    echo Os arquivos NÃO foram copiados para o Android!
    echo.
    echo SOLUÇÃO:
    echo 1. Execute manualmente: npx cap sync android
    echo 2. Verifique se aparece: "Copying web assets from dist..."
    echo 3. Execute este script novamente
    echo.
    pause
    exit /b 1
)

timeout /t 3 > nul

REM ============================================================
REM SUCESSO!
REM ============================================================
echo.
echo ╔══════════════════════════════════════════════════════════════╗
echo ║                                                              ║
echo ║                  ✅ SUCESSO TOTAL! ✅                        ║
echo ║                                                              ║
echo ╚══════════════════════════════════════════════════════════════╝
echo.
echo 🎉 Build React criado com sucesso!
echo 🎉 Assets sincronizados com Android!
echo 🎉 Tudo pronto para compilar!
echo.
echo ╔══════════════════════════════════════════════════════════════╗
echo ║                 PRÓXIMOS PASSOS:                             ║
echo ╚══════════════════════════════════════════════════════════════╝
echo.
echo Abrindo Android Studio...
echo.
echo Quando o Android Studio abrir, execute NESTA ORDEM:
echo.
echo   1. File → Invalidate Caches → Restart
echo      (Aguarde reiniciar)
echo.
echo   2. Build → Clean Project
echo      (Aguarde terminar)
echo.
echo   3. Build → Rebuild Project
echo      (Aguarde terminar - pode demorar 5-10 min)
echo.
echo   4. Build → Build APK(s)
echo      (Aguarde gerar APK)
echo.
echo   5. NO CELULAR:
echo      - Desinstalar versão antiga (ALE-RR TOP 5)
echo      - Instalar novo APK
echo.
echo   6. TESTAR!
echo      - Interface deve ficar igual ao Figma
echo      - Layout perfeito
echo      - Cores, fontes, tudo bonito!
echo.
echo ╔══════════════════════════════════════════════════════════════╗
echo ║               🚀 ABRINDO ANDROID STUDIO...                   ║
echo ╚══════════════════════════════════════════════════════════════╝
echo.

timeout /t 3 > nul

call npx cap open android

echo.
echo ✅ Script concluído!
echo.
pause
