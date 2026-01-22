# Script PowerShell para Windows
Write-Host "🧹 =========================================" -ForegroundColor Cyan
Write-Host "   LIMPEZA COMPLETA + BUILD ANDROID" -ForegroundColor Cyan
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "📦 Passo 1: Limpando cache do build anterior..." -ForegroundColor Yellow
Remove-Item -Recurse -Force -ErrorAction SilentlyContinue "android/app/build"
Remove-Item -Recurse -Force -ErrorAction SilentlyContinue "android/.gradle"
Remove-Item -Recurse -Force -ErrorAction SilentlyContinue "android/.idea"
Remove-Item -Recurse -Force -ErrorAction SilentlyContinue "dist"
Write-Host "✅ Cache limpo!" -ForegroundColor Green
Write-Host ""

Write-Host "🔨 Passo 2: Construindo o app (npm run build)..." -ForegroundColor Yellow
npm run build
Write-Host "✅ Build completo!" -ForegroundColor Green
Write-Host ""

Write-Host "🔄 Passo 3: Sincronizando com Android (aplicando styles.xml)..." -ForegroundColor Yellow
npx cap sync android
Write-Host "✅ Sincronização completa!" -ForegroundColor Green
Write-Host ""

Write-Host "🚀 Passo 4: Abrindo Android Studio..." -ForegroundColor Yellow
npx cap open android
Write-Host ""

Write-Host "✅ =========================================" -ForegroundColor Green
Write-Host "   PROCESSO CONCLUÍDO!" -ForegroundColor Green
Write-Host "=========================================" -ForegroundColor Green
Write-Host ""
Write-Host "📱 PRÓXIMOS PASSOS NO ANDROID STUDIO:" -ForegroundColor Cyan
Write-Host "1. Aguarde o Gradle Build terminar"
Write-Host "2. Clique em 'Run' ou pressione Shift+F10"
Write-Host "3. Selecione seu dispositivo Android"
Write-Host "4. Teste o app e verifique se as cores estão corretas"
Write-Host ""
Write-Host "🔍 O QUE FOI CORRIGIDO:" -ForegroundColor Cyan
Write-Host "✓ forceDarkAllowed=false no styles.xml"
Write-Host "✓ color-scheme: light only no HTML e CSS"
Write-Host "✓ Bloqueio de prefers-color-scheme: dark"
Write-Host "✓ darkMode: 'class' no Tailwind config"
Write-Host ""
