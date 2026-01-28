#!/bin/bash

# 🎨 Script de Instalação do Ícone Oficial do Gabaritoo
# Autor: Assistente IA
# Data: 28/01/2026

echo "🎯 SETUP DO ÍCONE OFICIAL DO GABARITOO"
echo "======================================"
echo ""

# Cores para output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Verificar se estamos na raiz do projeto
if [ ! -d "android" ]; then
    echo -e "${RED}❌ Erro: Execute este script na raiz do projeto!${NC}"
    echo "   Exemplo: bash scripts/setup-icon.sh"
    exit 1
fi

echo -e "${YELLOW}📋 PASSO 1: Verificação de dependências${NC}"
echo ""

# Verificar se o Android Studio está instalado
if [ ! -d "android/app/src/main/res" ]; then
    echo -e "${RED}❌ Pasta android/app/src/main/res não encontrada!${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Pasta res encontrada!${NC}"
echo ""

# PASSO 2: Deletar ícones antigos
echo -e "${YELLOW}📋 PASSO 2: Deletando ícones antigos (XML)${NC}"
echo ""

# Lista de arquivos para deletar
FILES_TO_DELETE=(
    "android/app/src/main/res/mipmap-mdpi/ic_launcher.xml"
    "android/app/src/main/res/mipmap-mdpi/ic_launcher_round.xml"
    "android/app/src/main/res/mipmap-hdpi/ic_launcher.xml"
    "android/app/src/main/res/mipmap-hdpi/ic_launcher_round.xml"
    "android/app/src/main/res/mipmap-xhdpi/ic_launcher.xml"
    "android/app/src/main/res/mipmap-xhdpi/ic_launcher_round.xml"
    "android/app/src/main/res/mipmap-xxhdpi/ic_launcher.xml"
    "android/app/src/main/res/mipmap-xxhdpi/ic_launcher_round.xml"
    "android/app/src/main/res/mipmap-xxxhdpi/ic_launcher.xml"
    "android/app/src/main/res/mipmap-xxxhdpi/ic_launcher_round.xml"
)

for file in "${FILES_TO_DELETE[@]}"; do
    if [ -f "$file" ]; then
        rm "$file"
        echo -e "   ${GREEN}✅ Deletado:${NC} $file"
    else
        echo -e "   ${YELLOW}⚠️  Não encontrado:${NC} $file (ok, pode não existir)"
    fi
done

# Deletar pasta anydpi se existir
if [ -d "android/app/src/main/res/mipmap-anydpi-v26" ]; then
    rm -rf "android/app/src/main/res/mipmap-anydpi-v26"
    echo -e "   ${GREEN}✅ Deletado:${NC} mipmap-anydpi-v26/"
fi

echo ""

# PASSO 3: Verificar se o usuário tem o ZIP do Android Asset Studio
echo -e "${YELLOW}📋 PASSO 3: Copiar ícones do Android Asset Studio${NC}"
echo ""
echo -e "${YELLOW}⚠️  ATENÇÃO:${NC} Você precisa primeiro:"
echo "   1. Acessar: https://romannurik.github.io/AndroidAssetStudio/icons-launcher.html"
echo "   2. Fazer upload da imagem do ícone (1024x1024px)"
echo "   3. Baixar o ZIP gerado"
echo "   4. Extrair o ZIP em alguma pasta"
echo ""

# Perguntar ao usuário onde está o ZIP extraído
read -p "📁 Digite o caminho da pasta 'res/' do ZIP extraído: " ICON_SOURCE

# Verificar se a pasta existe
if [ ! -d "$ICON_SOURCE" ]; then
    echo -e "${RED}❌ Erro: Pasta não encontrada: $ICON_SOURCE${NC}"
    echo "   Certifique-se de apontar para a pasta 'res/' dentro do ZIP extraído"
    exit 1
fi

# Verificar se a pasta contém os mipmap
if [ ! -d "$ICON_SOURCE/mipmap-mdpi" ]; then
    echo -e "${RED}❌ Erro: Pasta não contém mipmap-mdpi!${NC}"
    echo "   Certifique-se de apontar para a pasta 'res/' (não a raiz do ZIP)"
    exit 1
fi

echo ""
echo -e "${GREEN}✅ Pasta válida encontrada!${NC}"
echo ""

# Copiar ícones
echo -e "${YELLOW}📋 Copiando ícones...${NC}"
echo ""

MIPMAP_FOLDERS=("mipmap-mdpi" "mipmap-hdpi" "mipmap-xhdpi" "mipmap-xxhdpi" "mipmap-xxxhdpi")

for folder in "${MIPMAP_FOLDERS[@]}"; do
    if [ -d "$ICON_SOURCE/$folder" ]; then
        # Copiar ic_launcher.png
        if [ -f "$ICON_SOURCE/$folder/ic_launcher.png" ]; then
            cp "$ICON_SOURCE/$folder/ic_launcher.png" "android/app/src/main/res/$folder/"
            echo -e "   ${GREEN}✅ Copiado:${NC} $folder/ic_launcher.png"
        fi
        
        # Copiar ic_launcher_round.png (ou criar a partir do ic_launcher.png)
        if [ -f "$ICON_SOURCE/$folder/ic_launcher_round.png" ]; then
            cp "$ICON_SOURCE/$folder/ic_launcher_round.png" "android/app/src/main/res/$folder/"
            echo -e "   ${GREEN}✅ Copiado:${NC} $folder/ic_launcher_round.png"
        elif [ -f "$ICON_SOURCE/$folder/ic_launcher.png" ]; then
            # Se não tem round, usa o mesmo arquivo
            cp "$ICON_SOURCE/$folder/ic_launcher.png" "android/app/src/main/res/$folder/ic_launcher_round.png"
            echo -e "   ${YELLOW}⚠️  Criado round a partir do launcher:${NC} $folder/ic_launcher_round.png"
        fi
    else
        echo -e "   ${RED}❌ Pasta não encontrada:${NC} $folder"
    fi
done

echo ""

# PASSO 4: Verificar estrutura final
echo -e "${YELLOW}📋 PASSO 4: Verificando estrutura final${NC}"
echo ""

ALL_OK=true

for folder in "${MIPMAP_FOLDERS[@]}"; do
    LAUNCHER="android/app/src/main/res/$folder/ic_launcher.png"
    ROUND="android/app/src/main/res/$folder/ic_launcher_round.png"
    
    if [ -f "$LAUNCHER" ] && [ -f "$ROUND" ]; then
        echo -e "   ${GREEN}✅ $folder:${NC} ic_launcher.png + ic_launcher_round.png"
    else
        echo -e "   ${RED}❌ $folder:${NC} Faltando arquivos!"
        ALL_OK=false
    fi
done

echo ""

if [ "$ALL_OK" = true ]; then
    echo -e "${GREEN}✅ Todos os ícones foram copiados com sucesso!${NC}"
else
    echo -e "${RED}❌ Alguns ícones estão faltando. Verifique os erros acima.${NC}"
    exit 1
fi

echo ""

# PASSO 5: Clean + Rebuild
echo -e "${YELLOW}📋 PASSO 5: Clean + Rebuild do projeto Android${NC}"
echo ""

read -p "🔧 Deseja executar './gradlew clean' agora? (s/n): " DO_CLEAN

if [ "$DO_CLEAN" = "s" ] || [ "$DO_CLEAN" = "S" ]; then
    echo ""
    echo -e "${YELLOW}🔧 Executando clean...${NC}"
    cd android
    ./gradlew clean
    
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✅ Clean executado com sucesso!${NC}"
    else
        echo -e "${RED}❌ Erro ao executar clean${NC}"
        exit 1
    fi
    
    cd ..
    echo ""
    
    read -p "🔧 Deseja executar './gradlew assembleDebug' agora? (s/n): " DO_BUILD
    
    if [ "$DO_BUILD" = "s" ] || [ "$DO_BUILD" = "S" ]; then
        echo ""
        echo -e "${YELLOW}🔧 Executando assembleDebug...${NC}"
        cd android
        ./gradlew assembleDebug
        
        if [ $? -eq 0 ]; then
            echo -e "${GREEN}✅ Build executado com sucesso!${NC}"
            echo ""
            echo -e "${GREEN}📦 APK gerado em:${NC}"
            echo "   android/app/build/outputs/apk/debug/app-debug.apk"
        else
            echo -e "${RED}❌ Erro ao executar build${NC}"
            exit 1
        fi
        
        cd ..
    fi
fi

echo ""
echo -e "${GREEN}🎉 ÍCONE DO GABARITOO INSTALADO COM SUCESSO!${NC}"
echo ""
echo -e "${YELLOW}📋 Próximos passos:${NC}"
echo "   1. Desinstale o app antigo do celular"
echo "   2. Instale o APK novo:"
echo "      adb install -r android/app/build/outputs/apk/debug/app-debug.apk"
echo "   3. Verifique o ícone na tela inicial! 🎯"
echo ""
echo -e "${GREEN}✅ Tudo pronto!${NC}"
