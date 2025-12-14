#!/bin/bash

clear
echo "╔════════════════════════════════════════════════════════════════╗"
echo "║                                                                ║"
echo "║         🚀 ALE-RR TOP 5 - BUILD ANDROID COMPLETO 🚀           ║"
echo "║                                                                ║"
echo "╚════════════════════════════════════════════════════════════════╝"
echo ""
echo "Este script vai:"
echo "  1. Limpar builds anteriores"
echo "  2. Buildar o projeto React/Vite"
echo "  3. Sincronizar com Android (Capacitor)"
echo "  4. Abrir Android Studio para compilação final"
echo ""
read -p "Pressione ENTER para continuar..."
echo ""

echo "┌────────────────────────────────────────────────────────────────┐"
echo "│ [1/4] Limpando builds anteriores...                           │"
echo "└────────────────────────────────────────────────────────────────┘"
rm -rf dist
rm -rf android/app/build
echo "✓ Limpeza concluída"
echo ""

echo "┌────────────────────────────────────────────────────────────────┐"
echo "│ [2/4] Buildando projeto React/Vite...                         │"
echo "└────────────────────────────────────────────────────────────────┘"
npm run build
if [ $? -ne 0 ]; then
    echo "✗ Erro ao buildar! Verifique os erros acima."
    exit 1
fi
echo "✓ Build concluído"
echo ""

echo "┌────────────────────────────────────────────────────────────────┐"
echo "│ [3/4] Sincronizando com Android...                            │"
echo "└────────────────────────────────────────────────────────────────┘"
npx cap sync android
if [ $? -ne 0 ]; then
    echo "✗ Erro ao sincronizar! Verifique os erros acima."
    exit 1
fi
echo "✓ Sincronização concluída"
echo ""

echo "┌────────────────────────────────────────────────────────────────┐"
echo "│ [4/4] Abrindo Android Studio...                               │"
echo "└────────────────────────────────────────────────────────────────┘"
echo ""
echo "⚠️  NO ANDROID STUDIO, FAÇA:"
echo ""
echo "  1. Aguarde o Gradle Sync terminar"
echo "  2. Build > Clean Project"
echo "  3. Build > Rebuild Project"
echo "  4. Conecte seu celular via USB"
echo "  5. Clique em Run (botão verde ▶️)"
echo ""
echo ""

npx cap open android

echo ""
echo "╔════════════════════════════════════════════════════════════════╗"
echo "║                    ✓ PROCESSO CONCLUÍDO!                      ║"
echo "╚════════════════════════════════════════════════════════════════╝"
echo ""
echo "Próximos passos no Android Studio:"
echo "  → Clean Project"
echo "  → Rebuild Project"
echo "  → Run no celular"
echo ""
echo "Boa sorte no TOP 5 da ALE-RR! 🎯"
echo ""
