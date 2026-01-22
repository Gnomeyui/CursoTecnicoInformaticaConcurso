# 🚀 BUILD FINAL LIMPO - WINDOWS POWERSHELL
# Execute este arquivo para garantir que o Android Studio pegue a versão limpa

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "🧹 LIMPANDO BUILD ANTIGO DO ANDROID..." -ForegroundColor Yellow
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# 1. Limpa o lixo antigo da build do Android
if (Test-Path "android\app\build") {
    Remove-Item -Path "android\app\build" -Recurse -Force
    Write-Host "✅ Pasta android\app\build removida!" -ForegroundColor Green
} else {
    Write-Host "⚠️  Pasta android\app\build não existe (OK)" -ForegroundColor Yellow
}

if (Test-Path "android\.gradle") {
    Remove-Item -Path "android\.gradle" -Recurse -Force
    Write-Host "✅ Pasta android\.gradle removida!" -ForegroundColor Green
} else {
    Write-Host "⚠️  Pasta android\.gradle não existe (OK)" -ForegroundColor Yellow
}

if (Test-Path "dist") {
    Remove-Item -Path "dist" -Recurse -Force
    Write-Host "✅ Pasta dist removida!" -ForegroundColor Green
} else {
    Write-Host "⚠️  Pasta dist não existe (OK)" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "🔨 COMPILANDO CÓDIGO ATUALIZADO..." -ForegroundColor Yellow
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# 2. Compila o código limpo
npm run build

if ($LASTEXITCODE -ne 0) {
    Write-Host ""
    Write-Host "❌ ERRO: Falha ao compilar o projeto!" -ForegroundColor Red
    Write-Host "Verifique se há erros de TypeScript/React no código." -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "🔄 SINCRONIZANDO COM ANDROID..." -ForegroundColor Yellow
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# 3. Sincroniza com Android (copia arquivos atualizados)
npx cap sync android

if ($LASTEXITCODE -ne 0) {
    Write-Host ""
    Write-Host "❌ ERRO: Falha ao sincronizar com Android!" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "✅ BUILD LIMPO CONCLUÍDO COM SUCESSO!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "📱 PRÓXIMOS PASSOS NO ANDROID STUDIO:" -ForegroundColor Cyan
Write-Host ""
Write-Host "1. O Android Studio vai abrir agora..." -ForegroundColor White
Write-Host "2. Aguarde o Gradle Build terminar (barra inferior)" -ForegroundColor White
Write-Host "3. Vá em: Build > Clean Project" -ForegroundColor Yellow
Write-Host "4. Aguarde concluir" -ForegroundColor White
Write-Host "5. Clique em Run (▶️) ou pressione Shift+F10" -ForegroundColor White
Write-Host "6. Selecione seu dispositivo Android" -ForegroundColor White
Write-Host "7. TESTE o app! Cores devem estar perfeitas! 🎨" -ForegroundColor White
Write-Host ""
Write-Host "Abrindo Android Studio em 3 segundos..." -ForegroundColor Cyan
Start-Sleep -Seconds 3

# 4. Abre o Android Studio
npx cap open android

Write-Host ""
Write-Host "🎉 Android Studio aberto! Siga os passos acima!" -ForegroundColor Green
Write-Host ""
