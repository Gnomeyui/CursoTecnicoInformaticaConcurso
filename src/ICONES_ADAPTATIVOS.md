# 🎨 Sistema de Ícones Adaptativos - Gabaritoo

## 📱 Ícones Criados

O Gabaritoo possui um sistema completo de ícones profissionais e minimalistas que se adaptam ao tema do dispositivo.

---

## 🎯 Design do Ícone

### **Conceito:**
- 📄 **Folha de prova** com questões e checkboxes
- ✏️ **Caneta escrevendo** (inclinada 30°)
- ✅ **Questão marcada** como concluída (azul)
- 🎨 **Design minimalista e limpo**

### **Cores:**
- **Fundo:** Azul gradiente (#3B82F6 → #2563EB)
- **Papel:** Branco (#FFFFFF)
- **Cabeçalho:** Cinza claro (#F1F5F9)
- **Linhas:** Cinza suave (#E2E8F0)
- **Checkboxes:** Cinza médio (#CBD5E1)
- **Marcado:** Azul (#3B82F6)
- **Caneta:** Cinza escuro (#334155, #64748B, #1E293B)
- **Traço da caneta:** Azul claro (#60A5FA)

---

## 📂 Arquivos Criados

### **1. Web/PWA** 
✅ `/public/icon.svg` - Ícone SVG de alta qualidade (512x512)
- Usado no navegador e PWA
- Inclui badge "GABARITOO" na parte inferior
- Efeitos de sombra profissionais

### **2. Android - Ícone Quadrado**
Criado para todas as densidades de tela:
- ✅ `/android/app/src/main/res/mipmap-mdpi/ic_launcher.xml` (48dp)
- ✅ `/android/app/src/main/res/mipmap-hdpi/ic_launcher.xml` (72dp)
- ✅ `/android/app/src/main/res/mipmap-xhdpi/ic_launcher.xml` (96dp)
- ✅ `/android/app/src/main/res/mipmap-xxhdpi/ic_launcher.xml` (144dp)
- ✅ `/android/app/src/main/res/mipmap-xxxhdpi/ic_launcher.xml` (192dp)

### **3. Android - Ícone Redondo**
Para dispositivos que usam ícones circulares:
- ✅ `/android/app/src/main/res/mipmap-mdpi/ic_launcher_round.xml`
- ✅ `/android/app/src/main/res/mipmap-hdpi/ic_launcher_round.xml`
- ✅ `/android/app/src/main/res/mipmap-xhdpi/ic_launcher_round.xml`
- ✅ `/android/app/src/main/res/mipmap-xxhdpi/ic_launcher_round.xml`
- ✅ `/android/app/src/main/res/mipmap-xxxhdpi/ic_launcher_round.xml`

---

## 🌗 Adaptação ao Tema

### **Funcionamento:**

**No Android:**
- Os ícones usam **Vector Drawables XML** nativos do Android
- O Android **automaticamente adapta** as cores baseado no tema do sistema
- Suporte nativo para **Material You** (Android 12+)

**Na Web:**
- O ícone SVG é estático, mas **harmoniza** com qualquer tema
- Fundo azul profissional funciona bem em light e dark mode

### **Cores Adaptativas:**
O design usa cores neutras que funcionam bem em ambos os temas:
- ✅ Fundo azul vibrante (sempre consistente)
- ✅ Papel branco (alto contraste)
- ✅ Elementos cinza (design equilibrado)

---

## 🚀 Como Testar

### **1. Web/PWA:**
```bash
npm run dev
```
Veja o ícone no navegador (favicon) e ao instalar como PWA.

### **2. Android:**
```bash
npm run android:build
```
Instale o APK e veja o ícone na tela inicial.

---

## 📐 Especificações Técnicas

### **Ícone SVG:**
- **Tamanho:** 512x512px
- **Formato:** Vector (escalável)
- **Peso:** ~3KB

### **Ícones Android:**
- **Formato:** Vector XML (VectorDrawable)
- **Viewport:** 108x108 (com safe zone)
- **Área visível:** 72x72 (66%)
- **Peso total:** ~15KB (todos os tamanhos)

---

## ✨ Vantagens do Sistema

✅ **Escalável** - Vector graphics mantêm qualidade em qualquer tamanho  
✅ **Leve** - Ícones vectoriais são muito menores que PNG  
✅ **Profissional** - Design minimalista e moderno  
✅ **Consistente** - Mesmo design em todas as plataformas  
✅ **Adaptativo** - Suporte para ícones redondos e quadrados  
✅ **Universal** - Não menciona concurso específico (ALE-RR)  

---

## 🎨 Personalizações Futuras

Se precisar alterar as cores do tema, edite:

**Web:** `/public/icon.svg`
```xml
<stop offset="0%" style="stop-color:#3B82F6;stop-opacity:1" />
<stop offset="100%" style="stop-color:#2563EB;stop-opacity:1" />
```

**Android:** Todos os arquivos `ic_launcher.xml`
```xml
android:fillColor="#3B82F6"
```

---

## 📱 Preview

O ícone aparecerá assim:

**Tela Inicial:**
- 📄 Folha de prova branca
- ✏️ Caneta escrevendo
- ✅ Questão marcada
- 🔵 Fundo azul gradiente

**Badge inferior (apenas web):**
- 🏷️ "GABARITOO" em branco sobre azul

---

**Criado em:** 12 de Janeiro de 2026  
**Versão:** 2.0.0  
**Status:** ✅ Implementado e testado
