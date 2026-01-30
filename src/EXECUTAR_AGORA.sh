#!/bin/bash

# ============================================
# LIMPEZA AUTOMÁTICA - OPÇÃO A
# ============================================

set -e

echo "🚀 INICIANDO LIMPEZA AUTOMÁTICA..."
echo ""

# Dar permissão ao script
chmod +x scripts/1-limpar-raiz.sh

# Executar script
./scripts/1-limpar-raiz.sh

echo ""
echo "✅ LIMPEZA CONCLUÍDA!"
echo ""
echo "📊 Próximos passos:"
echo "  1. git status  (ver mudanças)"
echo "  2. git add .   (adicionar mudanças)"
echo "  3. git commit -m 'chore: limpar raiz do projeto'"
echo ""
echo "🎉 Raiz do projeto está limpa!"
