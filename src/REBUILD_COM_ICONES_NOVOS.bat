@echo off
chcp 65001 >nul
color 0A
cls

echo ╔════════════════════════════════════════════════════════════════╗
echo ║                                                                ║
echo ║   🎨 REBUILD COM ÍCONES NOVOS - ALE-RR TOP 5                 ║
echo ║                                                                ║
echo ╚════════════════════════════════════════════════════════════════╝
echo.

echo 📋 Este script irá:
echo    1. Verificar se os ícones PNG existem
echo    2. Fazer build do projeto
echo    3. Sincronizar com Android
echo    4. Abrir Android Studio
echo.

pause

echo.
echo ═══════════════════════════════════════════════════════════
echo 🔍 VERIFICANDO ÍCONES...
echo ═══════════════════════════════════════════════════════════
echo.

if not exist "public\icon-192.png" (
    echo ❌ ERRO: icon-192.png não encontrado em /public/
    echo.
    echo 📝 AÇÃO NECESSÁRIA:
    echo    1. Abra o arquivo /public/GERAR_ICONES_PNG.html no navegador
    echo    2. Clique em "Baixar Ambos os Ícones"
    echo    3. Mova os arquivos baixados para a pasta /public/
    echo    4. Execute este script novamente
    echo.
    pause
    exit /b 1
) else (
    echo ✅ icon-192.png encontrado
)

if not exist "public\icon-512.png" (
    echo ❌ ERRO: icon-512.png não encontrado em /public/
    echo.
    echo 📝 AÇÃO NECESSÁRIA:
    echo    1. Abra o arquivo /public/GERAR_ICONES_PNG.html no navegador
    echo    2. Clique em "Baixar Ambos os Ícones"
    echo    3. Mova os arquivos baixados para a pasta /public/
    echo    4. Execute este script novamente
    echo.
    pause
    exit /b 1
) else (
    echo ✅ icon-512.png encontrado
)

echo.
echo ═══════════════════════════════════════════════════════════
echo 📦 FAZENDO BUILD DO PROJETO...
echo ═══════════════════════════════════════════════════════════
echo.

call npm run build
if errorlevel 1 (
    echo.
    echo ❌ ERRO ao fazer build do projeto!
    echo    Verifique os erros acima e tente novamente.
    echo.
    pause
    exit /b 1
)

echo.
echo ✅ Build concluído com sucesso!
echo.

echo ═══════════════════════════════════════════════════════════
echo 🔄 SINCRONIZANDO COM ANDROID...
echo ═══════════════════════════════════════════════════════════
echo.

call npx cap sync android
if errorlevel 1 (
    echo.
    echo ❌ ERRO ao sincronizar com Android!
    echo    Verifique os erros acima e tente novamente.
    echo.
    pause
    exit /b 1
)

echo.
echo ✅ Sincronização concluída!
echo.

echo ═══════════════════════════════════════════════════════════
echo 🚀 ABRINDO ANDROID STUDIO...
echo ═══════════════════════════════════════════════════════════
echo.

call npx cap open android

echo.
echo ╔════════════════════════════════════════════════════════════════╗
echo ║                                                                ║
echo ║   ✅ PROCESSO CONCLUÍDO COM SUCESSO!                          ║
echo ║                                                                ║
echo ╚════════════════════════════════════════════════════════════════╝
echo.
echo 📝 PRÓXIMOS PASSOS NO ANDROID STUDIO:
echo.
echo    1. Build → Clean Project
echo    2. Build → Rebuild Project  
echo    3. Build → Build APK(s)
echo    4. Instalar o APK no celular
echo.
echo 💡 DICA: Desinstale a versão antiga do app antes de instalar o novo APK
echo.
echo ═══════════════════════════════════════════════════════════
echo.

pause
