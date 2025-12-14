#!/bin/bash

clear

echo ""
echo "╔══════════════════════════════════════════════════════════════╗"
echo "║                                                              ║"
echo "║        🔥 REBUILD COMPLETO - CORRIGE HTML QUEBRADO 🔥        ║"
echo "║                                                              ║"
echo "╚══════════════════════════════════════════════════════════════╝"
echo ""
echo "Este script vai:"
echo "  1. Limpar TODOS os builds antigos"
echo "  2. Buildar React do ZERO"
echo "  3. Sincronizar com Android"
echo "  4. Verificar que tudo foi copiado corretamente"
echo "  5. Abrir Android Studio"
echo ""
read -p "Pressione ENTER para continuar..."
echo ""

# ============================================================
# PASSO 1: LIMPAR TUDO
# ============================================================
echo ""
echo "╔══════════════════════════════════════════════════════════════╗"
echo "║  PASSO 1/5: Limpando builds antigos...                      ║"
echo "╚══════════════════════════════════════════════════════════════╝"
echo ""

if [ -d "dist" ]; then
    echo "🧹 Deletando dist/..."
    rm -rf dist
fi

if [ -d "android/app/build" ]; then
    echo "🧹 Deletando android/app/build..."
    rm -rf android/app/build
fi

if [ -d "android/build" ]; then
    echo "🧹 Deletando android/build..."
    rm -rf android/build
fi

if [ -d "android/.gradle" ]; then
    echo "🧹 Deletando android/.gradle..."
    rm -rf android/.gradle
fi

if [ -d "node_modules/.vite" ]; then
    echo "🧹 Deletando node_modules/.vite..."
    rm -rf node_modules/.vite
fi

if [ -d "android/app/src/main/assets/public" ]; then
    echo "🧹 Deletando assets antigos..."
    rm -rf android/app/src/main/assets/public
fi

echo ""
echo "✅ Limpeza completa!"
sleep 2

# ============================================================
# PASSO 2: BUILD REACT
# ============================================================
echo ""
echo "╔══════════════════════════════════════════════════════════════╗"
echo "║  PASSO 2/5: Buildando React...                              ║"
echo "╚══════════════════════════════════════════════════════════════╝"
echo ""
echo "⚛️ Executando: npm run build"
echo ""

npm run build

if [ $? -ne 0 ]; then
    echo ""
    echo "❌❌❌ ERRO NO BUILD! ❌❌❌"
    echo ""
    echo "O comando 'npm run build' falhou!"
    echo "Verifique os erros acima e tente novamente."
    echo ""
    exit 1
fi

# ============================================================
# PASSO 3: VERIFICAR DIST
# ============================================================
echo ""
echo "╔══════════════════════════════════════════════════════════════╗"
echo "║  PASSO 3/5: Verificando dist/...                            ║"
echo "╚══════════════════════════════════════════════════════════════╝"
echo ""

if [ -f "dist/index.html" ]; then
    echo "✅ dist/index.html encontrado!"
    
    if [ -d "dist/assets" ]; then
        echo "✅ dist/assets/ encontrado!"
        echo ""
        echo "📂 Arquivos em dist/:"
        ls -la dist/
        echo ""
        echo "📂 Arquivos em dist/assets/:"
        ls -la dist/assets/
        echo ""
    else
        echo "❌ ERRO: dist/assets/ NÃO ENCONTRADO!"
        echo ""
        echo "O build não criou a pasta assets!"
        echo "Algo deu errado no Vite."
        echo ""
        exit 1
    fi
else
    echo "❌❌❌ ERRO CRÍTICO! ❌❌❌"
    echo ""
    echo "dist/index.html NÃO FOI CRIADO!"
    echo ""
    echo "Isso significa que o build React falhou."
    echo "Volte e verifique os erros do 'npm run build'."
    echo ""
    exit 1
fi

sleep 3

# ============================================================
# PASSO 4: SYNC ANDROID
# ============================================================
echo ""
echo "╔══════════════════════════════════════════════════════════════╗"
echo "║  PASSO 4/5: Sincronizando com Android...                    ║"
echo "╚══════════════════════════════════════════════════════════════╝"
echo ""
echo "📱 Executando: npx cap sync android"
echo ""

npx cap sync android

if [ $? -ne 0 ]; then
    echo ""
    echo "❌❌❌ ERRO NO SYNC! ❌❌❌"
    echo ""
    echo "O comando 'npx cap sync android' falhou!"
    echo "Verifique os erros acima."
    echo ""
    exit 1
fi

# ============================================================
# PASSO 5: VERIFICAR PUBLIC
# ============================================================
echo ""
echo "╔══════════════════════════════════════════════════════════════╗"
echo "║  PASSO 5/5: Verificando assets copiados...                  ║"
echo "╚══════════════════════════════════════════════════════════════╝"
echo ""

if [ -f "android/app/src/main/assets/public/index.html" ]; then
    echo "✅ public/index.html encontrado!"
    
    if [ -d "android/app/src/main/assets/public/assets" ]; then
        echo "✅ public/assets/ encontrado!"
        echo ""
        echo "📂 Arquivos em public/:"
        ls -la android/app/src/main/assets/public/
        echo ""
        echo "📂 Arquivos em public/assets/:"
        ls -la android/app/src/main/assets/public/assets/
        echo ""
    else
        echo "❌ ERRO: public/assets/ NÃO ENCONTRADO!"
        echo ""
        echo "O sync copiou o index.html mas não os assets!"
        echo "Tente novamente: npx cap sync android"
        echo ""
        exit 1
    fi
else
    echo "❌❌❌ ERRO CRÍTICO! ❌❌❌"
    echo ""
    echo "android/app/src/main/assets/public/index.html NÃO EXISTE!"
    echo ""
    echo "Isso significa que o 'npx cap sync' não funcionou."
    echo "Os arquivos NÃO foram copiados para o Android!"
    echo ""
    echo "SOLUÇÃO:"
    echo "1. Execute manualmente: npx cap sync android"
    echo "2. Verifique se aparece: 'Copying web assets from dist...'"
    echo "3. Execute este script novamente"
    echo ""
    exit 1
fi

sleep 3

# ============================================================
# SUCESSO!
# ============================================================
echo ""
echo "╔══════════════════════════════════════════════════════════════╗"
echo "║                                                              ║"
echo "║                  ✅ SUCESSO TOTAL! ✅                        ║"
echo "║                                                              ║"
echo "╚══════════════════════════════════════════════════════════════╝"
echo ""
echo "🎉 Build React criado com sucesso!"
echo "🎉 Assets sincronizados com Android!"
echo "🎉 Tudo pronto para compilar!"
echo ""
echo "╔══════════════════════════════════════════════════════════════╗"
echo "║                 PRÓXIMOS PASSOS:                             ║"
echo "╚══════════════════════════════════════════════════════════════╝"
echo ""
echo "Abrindo Android Studio..."
echo ""
echo "Quando o Android Studio abrir, execute NESTA ORDEM:"
echo ""
echo "  1. File → Invalidate Caches → Restart"
echo "     (Aguarde reiniciar)"
echo ""
echo "  2. Build → Clean Project"
echo "     (Aguarde terminar)"
echo ""
echo "  3. Build → Rebuild Project"
echo "     (Aguarde terminar - pode demorar 5-10 min)"
echo ""
echo "  4. Build → Build APK(s)"
echo "     (Aguarde gerar APK)"
echo ""
echo "  5. NO CELULAR:"
echo "     - Desinstalar versão antiga (ALE-RR TOP 5)"
echo "     - Instalar novo APK"
echo ""
echo "  6. TESTAR!"
echo "     - Interface deve ficar igual ao Figma"
echo "     - Layout perfeito"
echo "     - Cores, fontes, tudo bonito!"
echo ""
echo "╔══════════════════════════════════════════════════════════════╗"
echo "║               🚀 ABRINDO ANDROID STUDIO...                   ║"
echo "╚══════════════════════════════════════════════════════════════╝"
echo ""

sleep 3

npx cap open android

echo ""
echo "✅ Script concluído!"
echo ""
