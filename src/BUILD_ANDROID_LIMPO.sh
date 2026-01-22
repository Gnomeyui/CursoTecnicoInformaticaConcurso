#!/bin/bash

echo "🧹 ========================================="
echo "   LIMPEZA COMPLETA + BUILD ANDROID"
echo "========================================="
echo ""

echo "📦 Passo 1: Limpando cache do build anterior..."
rm -rf android/app/build
rm -rf android/.gradle
rm -rf android/.idea
rm -rf dist
echo "✅ Cache limpo!"
echo ""

echo "🔨 Passo 2: Construindo o app (npm run build)..."
npm run build
echo "✅ Build completo!"
echo ""

echo "🔄 Passo 3: Sincronizando com Android (aplicando styles.xml)..."
npx cap sync android
echo "✅ Sincronização completa!"
echo ""

echo "🚀 Passo 4: Abrindo Android Studio..."
npx cap open android
echo ""

echo "✅ ========================================="
echo "   PROCESSO CONCLUÍDO!"
echo "========================================="
echo ""
echo "📱 PRÓXIMOS PASSOS NO ANDROID STUDIO:"
echo "1. Aguarde o Gradle Build terminar"
echo "2. Clique em 'Run' ou pressione Shift+F10"
echo "3. Selecione seu dispositivo Android"
echo "4. Teste o app e verifique se as cores estão corretas"
echo ""
echo "🔍 O QUE FOI CORRIGIDO:"
echo "✓ forceDarkAllowed=false no styles.xml"
echo "✓ color-scheme: light only no HTML e CSS"
echo "✓ Bloqueio de prefers-color-scheme: dark"
echo "✓ darkMode: 'class' no Tailwind config"
echo ""
