#!/bin/bash

echo "🧹 LIMPANDO BUILD..."

# Remove node_modules e dist
rm -rf node_modules
rm -rf dist

# Remove build do Android
cd android
./gradlew clean
cd ..

echo "📦 INSTALANDO DEPENDÊNCIAS..."
npm install

echo "🔨 BUILDANDO..."
npm run build

echo "🔄 SINCRONIZANDO COM CAPACITOR..."
npx cap sync android

echo "✅ BUILD LIMPO CONCLUÍDO!"
echo ""
echo "Agora execute:"
echo "npx cap open android"
echo ""
echo "E no Android Studio:"
echo "1. Build > Clean Project"
echo "2. Build > Rebuild Project"
echo "3. Run (▶️)"
