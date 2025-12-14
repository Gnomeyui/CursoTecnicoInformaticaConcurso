@echo off
echo ========================================
echo  DELETAR ICONES PNG DUPLICADOS
echo ========================================
echo.
echo Este script vai DELETAR todos os arquivos PNG
echo ic_launcher das pastas mipmap.
echo.
echo Vamos manter apenas os arquivos XML.
echo.
pause

cd /d "%~dp0"

echo.
echo Deletando ic_launcher.png...
echo.

del /F /Q "android\app\src\main\res\mipmap-mdpi\ic_launcher.png" 2>nul
if %ERRORLEVEL% == 0 (echo ✓ Deletado: mipmap-mdpi\ic_launcher.png) else (echo - Não encontrado: mipmap-mdpi\ic_launcher.png)

del /F /Q "android\app\src\main\res\mipmap-hdpi\ic_launcher.png" 2>nul
if %ERRORLEVEL% == 0 (echo ✓ Deletado: mipmap-hdpi\ic_launcher.png) else (echo - Não encontrado: mipmap-hdpi\ic_launcher.png)

del /F /Q "android\app\src\main\res\mipmap-xhdpi\ic_launcher.png" 2>nul
if %ERRORLEVEL% == 0 (echo ✓ Deletado: mipmap-xhdpi\ic_launcher.png) else (echo - Não encontrado: mipmap-xhdpi\ic_launcher.png)

del /F /Q "android\app\src\main\res\mipmap-xxhdpi\ic_launcher.png" 2>nul
if %ERRORLEVEL% == 0 (echo ✓ Deletado: mipmap-xxhdpi\ic_launcher.png) else (echo - Não encontrado: mipmap-xxhdpi\ic_launcher.png)

del /F /Q "android\app\src\main\res\mipmap-xxxhdpi\ic_launcher.png" 2>nul
if %ERRORLEVEL% == 0 (echo ✓ Deletado: mipmap-xxxhdpi\ic_launcher.png) else (echo - Não encontrado: mipmap-xxxhdpi\ic_launcher.png)

echo.
echo Deletando ic_launcher_round.png...
echo.

del /F /Q "android\app\src\main\res\mipmap-mdpi\ic_launcher_round.png" 2>nul
if %ERRORLEVEL% == 0 (echo ✓ Deletado: mipmap-mdpi\ic_launcher_round.png) else (echo - Não encontrado: mipmap-mdpi\ic_launcher_round.png)

del /F /Q "android\app\src\main\res\mipmap-hdpi\ic_launcher_round.png" 2>nul
if %ERRORLEVEL% == 0 (echo ✓ Deletado: mipmap-hdpi\ic_launcher_round.png) else (echo - Não encontrado: mipmap-hdpi\ic_launcher_round.png)

del /F /Q "android\app\src\main\res\mipmap-xhdpi\ic_launcher_round.png" 2>nul
if %ERRORLEVEL% == 0 (echo ✓ Deletado: mipmap-xhdpi\ic_launcher_round.png) else (echo - Não encontrado: mipmap-xhdpi\ic_launcher_round.png)

del /F /Q "android\app\src\main\res\mipmap-xxhdpi\ic_launcher_round.png" 2>nul
if %ERRORLEVEL% == 0 (echo ✓ Deletado: mipmap-xxhdpi\ic_launcher_round.png) else (echo - Não encontrado: mipmap-xxhdpi\ic_launcher_round.png)

del /F /Q "android\app\src\main\res\mipmap-xxxhdpi\ic_launcher_round.png" 2>nul
if %ERRORLEVEL% == 0 (echo ✓ Deletado: mipmap-xxxhdpi\ic_launcher_round.png) else (echo - Não encontrado: mipmap-xxxhdpi\ic_launcher_round.png)

echo.
echo ========================================
echo  ✓ CONCLUÍDO!
echo ========================================
echo.
echo Arquivos PNG deletados!
echo Agora você pode rebuildar o projeto.
echo.
pause
