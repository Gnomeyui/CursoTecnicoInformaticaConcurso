#!/bin/bash

# 🚀 BUILD FINAL LIMPO - LINUX/MAC
# Execute este arquivo para garantir que o Android Studio pegue a versão limpa

echo "========================================"
echo "🧹 LIMPANDO BUILD ANTIGO DO ANDROID..."
echo "========================================"
echo ""

# 1. Limpa o lixo antigo da build do Android
if [ -d "android/app/build" ]; then
    rm -rf android/app/build
    echo "✅ Pasta android/app/build removida!"
else
    echo "⚠️  Pasta android/app/build não existe (OK)"
fi

if [ -d "android/.gradle" ]; then
    rm -rf android/.gradle
    echo "✅ Pasta android/.gradle removida!"
else
    echo "⚠️  Pasta android/.gradle não existe (OK)"
fi

if [ -d "dist" ]; then
    rm -rf dist
    echo "✅ Pasta dist removida!"
else
    echo "⚠️  Pasta dist não existe (OK)"
fi

echo ""
echo "========================================"
echo "🔨 COMPILANDO CÓDIGO ATUALIZADO..."
echo "========================================"
echo ""

# 2. Compila o código limpo
npm run build

if [ $? -ne 0 ]; then
    echo ""
    echo "❌ ERRO: Falha ao compilar o projeto!"
    echo "Verifique se há erros de TypeScript/React no código."
    exit 1
fi

echo ""
echo "========================================"
echo "🔄 SINCRONIZANDO COM ANDROID..."
echo "========================================"
echo ""

# 3. Sincroniza com Android (copia arquivos atualizados)
npx cap sync android

if [ $? -ne 0 ]; then
    echo ""
    echo "❌ ERRO: Falha ao sincronizar com Android!"
    exit 1
fi

echo ""
echo "========================================"
echo "✅ BUILD LIMPO CONCLUÍDO COM SUCESSO!"
echo "========================================"
echo ""
echo "📱 PRÓXIMOS PASSOS NO ANDROID STUDIO:"
echo ""
echo "1. O Android Studio vai abrir agora..."
echo "2. Aguarde o Gradle Build terminar (barra inferior)"
echo "3. Vá em: Build > Clean Project"
echo "4. Aguarde concluir"
echo "5. Clique em Run (▶️) ou pressione Shift+F10"
echo "6. Selecione seu dispositivo Android"
echo "7. TESTE o app! Cores devem estar perfeitas! 🎨"
echo ""
echo "Abrindo Android Studio em 3 segundos..."
sleep 3

# 4. Abre o Android Studio
npx cap open android

echo ""
echo "🎉 Android Studio aberto! Siga os passos acima!"
echo ""
