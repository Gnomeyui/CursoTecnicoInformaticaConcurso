#!/bin/bash

# ==================================================
# SCRIPT 1: LIMPAR RAIZ - Mover .md para /docs/
# ==================================================
# 
# Este script move TODOS os arquivos .md (exceto README.md)
# da raiz para /docs/ organizados por categoria.
#
# Uso: chmod +x scripts/1-limpar-raiz.sh && ./scripts/1-limpar-raiz.sh

set -e  # Para na primeira falha

echo "🧹 INICIANDO LIMPEZA DA RAIZ..."
echo ""

# ==================================================
# 1. CRIAR ESTRUTURA DE PASTAS
# ==================================================

echo "📁 Criando estrutura /docs/..."

mkdir -p docs/{auditorias,builds,guias,sistema,vouchers,refatoracao,outros}

echo "✅ Estrutura criada!"
echo ""

# ==================================================
# 2. MOVER SCRIPTS DE BUILD
# ==================================================

echo "🔨 Movendo scripts de build..."

if [ -f "BUILD_FINAL_LINUX_MAC.sh" ]; then
  mv BUILD_FINAL_LINUX_MAC.sh docs/builds/
  echo "  ✓ BUILD_FINAL_LINUX_MAC.sh"
fi

if [ -f "BUILD_FINAL_WINDOWS.ps1" ]; then
  mv BUILD_FINAL_WINDOWS.ps1 docs/builds/
  echo "  ✓ BUILD_FINAL_WINDOWS.ps1"
fi

echo ""

# ==================================================
# 3. MOVER AUDITORIAS E CORREÇÕES
# ==================================================

echo "🔍 Movendo auditorias e correções..."

mv AUDITORIA_*.md docs/auditorias/ 2>/dev/null || true
mv CORRECAO_*.md docs/auditorias/ 2>/dev/null || true
mv RESUMO_*.md docs/auditorias/ 2>/dev/null || true
mv RELATORIO_*.md docs/auditorias/ 2>/dev/null || true
mv TESTE_*.md docs/auditorias/ 2>/dev/null || true
mv TOAST_*.md docs/auditorias/ 2>/dev/null || true
mv VIBRACAO_*.md docs/auditorias/ 2>/dev/null || true

echo "  ✓ Auditorias movidas"
echo ""

# ==================================================
# 4. MOVER GUIAS
# ==================================================

echo "📖 Movendo guias..."

mv COMO_*.md docs/guias/ 2>/dev/null || true
mv GUIA_*.md docs/guias/ 2>/dev/null || true
mv PASSOS_*.md docs/guias/ 2>/dev/null || true
mv COMECE_AQUI.md docs/guias/ 2>/dev/null || true
mv EXECUTE_AGORA.md docs/guias/ 2>/dev/null || true

echo "  ✓ Guias movidos"
echo ""

# ==================================================
# 5. MOVER ARQUITETURA E SISTEMA
# ==================================================

echo "🏗️  Movendo arquitetura e sistema..."

mv APRESENTACAO_*.md docs/sistema/ 2>/dev/null || true
mv ARQUITETURA_*.md docs/sistema/ 2>/dev/null || true
mv COMPATIBILIDADE_*.md docs/sistema/ 2>/dev/null || true

echo "  ✓ Sistema movido"
echo ""

# ==================================================
# 6. MOVER VOUCHERS
# ==================================================

echo "💎 Movendo documentação de vouchers..."

mv CODIGOS_VOUCHER_*.md docs/vouchers/ 2>/dev/null || true
mv VOUCHER_*.md docs/vouchers/ 2>/dev/null || true

echo "  ✓ Vouchers movidos"
echo ""

# ==================================================
# 7. MOVER REFATORAÇÃO
# ==================================================

echo "🚀 Movendo documentação de refatoração..."

mv REFATORACAO_*.md docs/refatoracao/ 2>/dev/null || true
mv MOVER_DOCUMENTACAO.md docs/refatoracao/ 2>/dev/null || true
mv PLANO_LIMPEZA_REAL.md docs/refatoracao/ 2>/dev/null || true

echo "  ✓ Refatoração movida"
echo ""

# ==================================================
# 8. MOVER OUTROS
# ==================================================

echo "📦 Movendo outros arquivos..."

mv LIMPEZA_*.md docs/outros/ 2>/dev/null || true
mv INDICE_*.md docs/outros/ 2>/dev/null || true
mv INICIO_RAPIDO.txt docs/outros/ 2>/dev/null || true
mv README_FINAL.md docs/outros/ 2>/dev/null || true
mv Attributions.md docs/outros/ 2>/dev/null || true

echo "  ✓ Outros movidos"
echo ""

# ==================================================
# 9. CRIAR README.md PRINCIPAL DO /docs/
# ==================================================

echo "📝 Criando /docs/README.md..."

cat > docs/README.md << 'EOF'
# 📚 Documentação do Gabaritoo

Toda a documentação do projeto organizada por categoria.

## 📂 Estrutura:

### 🔍 Auditorias e Correções
`/auditorias/` - Auditorias técnicas, correções e testes

### 🔨 Build e Deploy
`/builds/` - Scripts de build (Linux/Mac/Windows)

### 📖 Guias e Tutoriais
`/guias/` - Guias de uso, instalação e configuração

### 🏗️ Arquitetura e Sistema
`/sistema/` - Documentação de arquitetura e compatibilidade

### 💎 Sistema de Vouchers
`/vouchers/` - Códigos promocionais e documentação

### 🚀 Refatoração
`/refatoracao/` - Planos e guias de refatoração (10/10)

### 📦 Outros
`/outros/` - Documentação geral e utilitários

---

**Organizado em:** 30/01/2025  
**Status:** ✅ Limpo e Profissional
EOF

echo "  ✓ README criado"
echo ""

# ==================================================
# 10. VALIDAR
# ==================================================

echo "🔍 Validando limpeza..."
echo ""

REMAINING_MD=$(find . -maxdepth 1 -name "*.md" ! -name "README.md" | wc -l)
REMAINING_SH=$(find . -maxdepth 1 -name "*.sh" | wc -l)
REMAINING_PS1=$(find . -maxdepth 1 -name "*.ps1" | wc -l)

if [ $REMAINING_MD -eq 0 ] && [ $REMAINING_SH -eq 0 ] && [ $REMAINING_PS1 -eq 0 ]; then
  echo "✅ RAIZ LIMPA COM SUCESSO!"
  echo ""
  echo "📊 Resultado:"
  echo "  - Arquivos .md na raiz: 1 (README.md)"
  echo "  - Arquivos organizados em /docs/"
  echo ""
  echo "📂 Estrutura:"
  ls -la docs/
else
  echo "⚠️  Ainda existem arquivos para limpar:"
  echo "  - .md: $REMAINING_MD"
  echo "  - .sh: $REMAINING_SH"
  echo "  - .ps1: $REMAINING_PS1"
fi

echo ""
echo "🎉 FASE 1 CONCLUÍDA!"
echo ""
echo "Próximo passo: ./scripts/2-reorganizar-components.sh"
