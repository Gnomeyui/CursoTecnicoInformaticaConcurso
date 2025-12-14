#!/bin/bash

# Cores para output
GREEN='\033[0;32m'
RED='\033[0;31m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

clear

echo -e "${BLUE}"
echo "╔════════════════════════════════════════════════════════════════╗"
echo "║                                                                ║"
echo "║   🎨 REBUILD COM ÍCONES NOVOS - ALE-RR TOP 5                 ║"
echo "║                                                                ║"
echo "╚════════════════════════════════════════════════════════════════╝"
echo -e "${NC}"

echo "📋 Este script irá:"
echo "   1. Verificar se os ícones PNG existem"
echo "   2. Fazer build do projeto"
echo "   3. Sincronizar com Android"
echo "   4. Abrir Android Studio"
echo ""

read -p "Pressione ENTER para continuar..."

echo ""
echo -e "${BLUE}═══════════════════════════════════════════════════════════${NC}"
echo -e "${BLUE}🔍 VERIFICANDO ÍCONES...${NC}"
echo -e "${BLUE}═══════════════════════════════════════════════════════════${NC}"
echo ""

if [ ! -f "public/icon-192.png" ]; then
    echo -e "${RED}❌ ERRO: icon-192.png não encontrado em /public/${NC}"
    echo ""
    echo "📝 AÇÃO NECESSÁRIA:"
    echo "   1. Abra o arquivo /public/GERAR_ICONES_PNG.html no navegador"
    echo "   2. Clique em 'Baixar Ambos os Ícones'"
    echo "   3. Mova os arquivos baixados para a pasta /public/"
    echo "   4. Execute este script novamente"
    echo ""
    read -p "Pressione ENTER para sair..."
    exit 1
else
    echo -e "${GREEN}✅ icon-192.png encontrado${NC}"
fi

if [ ! -f "public/icon-512.png" ]; then
    echo -e "${RED}❌ ERRO: icon-512.png não encontrado em /public/${NC}"
    echo ""
    echo "📝 AÇÃO NECESSÁRIA:"
    echo "   1. Abra o arquivo /public/GERAR_ICONES_PNG.html no navegador"
    echo "   2. Clique em 'Baixar Ambos os Ícones'"
    echo "   3. Mova os arquivos baixados para a pasta /public/"
    echo "   4. Execute este script novamente"
    echo ""
    read -p "Pressione ENTER para sair..."
    exit 1
else
    echo -e "${GREEN}✅ icon-512.png encontrado${NC}"
fi

echo ""
echo -e "${BLUE}═══════════════════════════════════════════════════════════${NC}"
echo -e "${BLUE}📦 FAZENDO BUILD DO PROJETO...${NC}"
echo -e "${BLUE}═══════════════════════════════════════════════════════════${NC}"
echo ""

npm run build
if [ $? -ne 0 ]; then
    echo ""
    echo -e "${RED}❌ ERRO ao fazer build do projeto!${NC}"
    echo "   Verifique os erros acima e tente novamente."
    echo ""
    read -p "Pressione ENTER para sair..."
    exit 1
fi

echo ""
echo -e "${GREEN}✅ Build concluído com sucesso!${NC}"
echo ""

echo -e "${BLUE}═══════════════════════════════════════════════════════════${NC}"
echo -e "${BLUE}🔄 SINCRONIZANDO COM ANDROID...${NC}"
echo -e "${BLUE}═══════════════════════════════════════════════════════════${NC}"
echo ""

npx cap sync android
if [ $? -ne 0 ]; then
    echo ""
    echo -e "${RED}❌ ERRO ao sincronizar com Android!${NC}"
    echo "   Verifique os erros acima e tente novamente."
    echo ""
    read -p "Pressione ENTER para sair..."
    exit 1
fi

echo ""
echo -e "${GREEN}✅ Sincronização concluída!${NC}"
echo ""

echo -e "${BLUE}═══════════════════════════════════════════════════════════${NC}"
echo -e "${BLUE}🚀 ABRINDO ANDROID STUDIO...${NC}"
echo -e "${BLUE}═══════════════════════════════════════════════════════════${NC}"
echo ""

npx cap open android

echo ""
echo -e "${GREEN}"
echo "╔════════════════════════════════════════════════════════════════╗"
echo "║                                                                ║"
echo "║   ✅ PROCESSO CONCLUÍDO COM SUCESSO!                          ║"
echo "║                                                                ║"
echo "╚════════════════════════════════════════════════════════════════╝"
echo -e "${NC}"
echo ""
echo "📝 PRÓXIMOS PASSOS NO ANDROID STUDIO:"
echo ""
echo "   1. Build → Clean Project"
echo "   2. Build → Rebuild Project"
echo "   3. Build → Build APK(s)"
echo "   4. Instalar o APK no celular"
echo ""
echo "💡 DICA: Desinstale a versão antiga do app antes de instalar o novo APK"
echo ""
echo -e "${BLUE}═══════════════════════════════════════════════════════════${NC}"
echo ""

read -p "Pressione ENTER para sair..."
