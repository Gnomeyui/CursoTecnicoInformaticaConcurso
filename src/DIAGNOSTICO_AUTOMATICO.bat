@echo off
echo ════════════════════════════════════════════════════════════
echo    DIAGNOSTICO AUTOMATICO - ALE-RR TOP 5
echo ════════════════════════════════════════════════════════════
echo.

echo [1/5] Verificando arquivos essenciais...
echo.

if exist "package.json" (
    echo [OK] package.json existe
) else (
    echo [ERRO] package.json NAO encontrado!
    goto :erro
)

if exist "index.html" (
    echo [OK] index.html existe
) else (
    echo [ERRO] index.html NAO encontrado!
    goto :erro
)

if exist "vite.config.ts" (
    echo [OK] vite.config.ts existe
) else (
    echo [ERRO] vite.config.ts NAO encontrado!
    goto :erro
)

if exist "src\main.tsx" (
    echo [OK] src\main.tsx existe
) else (
    echo [ERRO] src\main.tsx NAO encontrado!
    goto :erro
)

echo.
echo [2/5] Verificando node_modules...
echo.

if exist "node_modules" (
    echo [OK] node_modules existe
) else (
    echo [AVISO] node_modules NAO existe! Execute: npm install
)

echo.
echo [3/5] Verificando pasta dist (build)...
echo.

if exist "dist" (
    echo [OK] Pasta dist existe
    if exist "dist\index.html" (
        echo [OK] dist\index.html existe
    ) else (
        echo [AVISO] dist\index.html NAO existe! Execute: npm run build
    )
) else (
    echo [AVISO] Pasta dist NAO existe! Execute: npm run build
)

echo.
echo [4/5] Verificando Android...
echo.

if exist "android" (
    echo [OK] Pasta android existe
    if exist "android\app\build.gradle" (
        echo [OK] android\app\build.gradle existe
    ) else (
        echo [ERRO] android\app\build.gradle NAO encontrado!
    )
) else (
    echo [AVISO] Pasta android NAO existe! Execute: npx cap add android
)

echo.
echo [5/5] Verificando capacitor.config.json...
echo.

if exist "capacitor.config.json" (
    echo [OK] capacitor.config.json existe
    findstr /C:"webDir" capacitor.config.json >nul
    if %errorlevel%==0 (
        echo [OK] webDir configurado
    ) else (
        echo [AVISO] webDir pode estar incorreto
    )
) else (
    echo [ERRO] capacitor.config.json NAO encontrado!
    goto :erro
)

echo.
echo ════════════════════════════════════════════════════════════
echo    DIAGNOSTICO COMPLETO!
echo ════════════════════════════════════════════════════════════
echo.
echo PROXIMOS PASSOS:
echo.
echo 1. Se houver ERROS acima, corrija-os primeiro
echo 2. Execute: npm install
echo 3. Execute: npm run build
echo 4. Verifique se pasta dist foi criada
echo 5. Execute: npx cap sync android
echo 6. Abra Android Studio e compile
echo.
echo ════════════════════════════════════════════════════════════
echo.
pause
exit /b 0

:erro
echo.
echo ════════════════════════════════════════════════════════════
echo    ERRO CRITICO ENCONTRADO!
echo ════════════════════════════════════════════════════════════
echo.
echo O projeto esta incompleto ou corrompido.
echo Baixe novamente do Figma Make!
echo.
pause
exit /b 1
