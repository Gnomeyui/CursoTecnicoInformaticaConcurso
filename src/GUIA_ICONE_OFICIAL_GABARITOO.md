# 🎯 GUIA OFICIAL: Ícone do Gabaritoo (Versão Final)

## 🎨 ÍCONE OFICIAL IDENTIFICADO

✅ **Design:** Dois círculos verdes formando "oo" com checkmark branco  
✅ **Fundo:** Azul marinho (#2C3E78 / #324B8E)  
✅ **Logo:** "Gabaritoo" (branco + "oo" verde)  
✅ **Arquivo:** `figma:asset/ec2da47ce368cd06b0f175b6cadc2c46cf6f3898.png`  

---

## 📥 PASSO 1: BAIXAR A IMAGEM

### **Opção A: Direto do Figma**
Se você tem a imagem no Figma:
1. Selecione o ícone no Figma
2. Clique com botão direito → **Export**
3. Formato: **PNG**
4. Resolução: **4x** ou **1024x1024px**
5. Salve como `gabaritoo-icon-1024.png`

### **Opção B: Screenshot da imagem que você enviou**
Se você não tem acesso ao Figma:
1. Abra a imagem que você me enviou
2. Tire um screenshot ou salve a imagem
3. Certifique-se que é **quadrada** (1:1)
4. Salve como `gabaritoo-icon.png`

---

## 🔧 PASSO 2: GERAR TODAS AS RESOLUÇÕES

### **MÉTODO RECOMENDADO: Android Asset Studio** ⭐

#### **2.1 - Acessar a ferramenta**
```
https://romannurik.github.io/AndroidAssetStudio/icons-launcher.html
```

#### **2.2 - Configurar**
1. **Source:** Clique em "Image"
2. **Upload:** Selecione `gabaritoo-icon.png` (ou a imagem de 1024px)
3. **Configurações:**
   - ✅ **Shape:** None (manter quadrado)
   - ✅ **Padding:** 0% (sem padding)
   - ✅ **Background Color:** Transparent (ou #2C3E78 se quiser fundo)
   - ✅ **Trim:** NO (não cortar)

#### **2.3 - Download**
1. Clique em **"Download .zip"**
2. Extraia o arquivo ZIP
3. Você terá uma pasta `res/` com todas as resoluções! 🎉

---

## 📁 PASSO 3: ESTRUTURA DO ZIP

O ZIP contém:

```
res/
├── mipmap-mdpi/
│   ├── ic_launcher.png (48x48)
│   └── ic_launcher_foreground.png
│
├── mipmap-hdpi/
│   ├── ic_launcher.png (72x72)
│   └── ic_launcher_foreground.png
│
├── mipmap-xhdpi/
│   ├── ic_launcher.png (96x96)
│   └── ic_launcher_foreground.png
│
├── mipmap-xxhdpi/
│   ├── ic_launcher.png (144x144)
│   └── ic_launcher_foreground.png
│
├── mipmap-xxxhdpi/
│   ├── ic_launcher.png (192x192)
│   └── ic_launcher_foreground.png
│
└── mipmap-anydpi-v26/
    ├── ic_launcher.xml
    └── ic_launcher_round.xml
```

---

## 🗑️ PASSO 4: DELETAR ÍCONES ANTIGOS

No Android Studio, navegue até:
```
android/app/src/main/res/
```

**DELETE TODOS estes arquivos e pastas:**

```bash
# Deletar arquivos XML antigos
rm mipmap-mdpi/ic_launcher.xml
rm mipmap-mdpi/ic_launcher_round.xml
rm mipmap-hdpi/ic_launcher.xml
rm mipmap-hdpi/ic_launcher_round.xml
rm mipmap-xhdpi/ic_launcher.xml
rm mipmap-xhdpi/ic_launcher_round.xml
rm mipmap-xxhdpi/ic_launcher.xml
rm mipmap-xxhdpi/ic_launcher_round.xml
rm mipmap-xxxhdpi/ic_launcher.xml
rm mipmap-xxxhdpi/ic_launcher_round.xml

# Deletar pasta anydpi se existir
rm -rf mipmap-anydpi-v26/
```

Ou manualmente no Android Studio:
1. Clique com botão direito em cada arquivo `.xml`
2. **Delete**

---

## 📋 PASSO 5: COPIAR ÍCONES NOVOS

### **Método A: Copiar tudo do ZIP** ⭐ (Recomendado)

```bash
# No terminal, dentro da pasta do projeto:
cp -r caminho/para/AndroidAssetStudio-Output/res/* android/app/src/main/res/
```

### **Método B: Copiar manualmente**

No Android Studio:

1. **Arraste** a pasta `mipmap-mdpi/` do ZIP → `android/app/src/main/res/`
2. **Arraste** a pasta `mipmap-hdpi/` do ZIP → `android/app/src/main/res/`
3. **Arraste** a pasta `mipmap-xhdpi/` do ZIP → `android/app/src/main/res/`
4. **Arraste** a pasta `mipmap-xxhdpi/` do ZIP → `android/app/src/main/res/`
5. **Arraste** a pasta `mipmap-xxxhdpi/` do ZIP → `android/app/src/main/res/`

Quando perguntado **"Replace?"**, clique em **YES (Substituir)**

---

## ⚙️ PASSO 6: CRIAR VERSÃO "ROUND"

Alguns launchers Android usam ícones arredondados. Você precisa criar `ic_launcher_round.png`:

### **Opção A: Usar o mesmo ícone**
```bash
# Em cada pasta mipmap-*, copie o ic_launcher.png como round:
cp android/app/src/main/res/mipmap-mdpi/ic_launcher.png android/app/src/main/res/mipmap-mdpi/ic_launcher_round.png
cp android/app/src/main/res/mipmap-hdpi/ic_launcher.png android/app/src/main/res/mipmap-hdpi/ic_launcher_round.png
cp android/app/src/main/res/mipmap-xhdpi/ic_launcher.png android/app/src/main/res/mipmap-xhdpi/ic_launcher_round.png
cp android/app/src/main/res/mipmap-xxhdpi/ic_launcher.png android/app/src/main/res/mipmap-xxhdpi/ic_launcher_round.png
cp android/app/src/main/res/mipmap-xxxhdpi/ic_launcher.png android/app/src/main/res/mipmap-xxxhdpi/ic_launcher_round.png
```

### **Opção B: Android Asset Studio gera automaticamente**
O Android Asset Studio já cria `ic_launcher_round.png` se você selecionar "Circle" em Shape!

---

## 🔄 PASSO 7: CLEAN + REBUILD

No terminal:
```bash
cd android
./gradlew clean
./gradlew assembleDebug
```

Ou no Android Studio:
1. **Build → Clean Project**
2. **Build → Rebuild Project**

---

## 📦 PASSO 8: GERAR APK

```bash
cd android
./gradlew assembleRelease
```

O APK estará em:
```
android/app/build/outputs/apk/release/app-release-unsigned.apk
```

---

## 📱 PASSO 9: INSTALAR E TESTAR

### **Desinstalar app antigo:**
```bash
adb uninstall com.alerr.top5
```

### **Instalar APK novo:**
```bash
adb install android/app/build/outputs/apk/debug/app-debug.apk
```

### **Verificar:**
1. Abra a tela inicial do celular
2. Procure o ícone do Gabaritoo
3. Deve aparecer: **2 círculos verdes + checkmark + logo** 🎉

---

## 🎯 ESTRUTURA FINAL ESPERADA

Depois de tudo, suas pastas devem conter:

```
android/app/src/main/res/
├── mipmap-mdpi/
│   ├── ic_launcher.png (48x48) ✅
│   └── ic_launcher_round.png (48x48) ✅
│
├── mipmap-hdpi/
│   ├── ic_launcher.png (72x72) ✅
│   └── ic_launcher_round.png (72x72) ✅
│
├── mipmap-xhdpi/
│   ├── ic_launcher.png (96x96) ✅
│   └── ic_launcher_round.png (96x96) ✅
│
├── mipmap-xxhdpi/
│   ├── ic_launcher.png (144x144) ✅
│   └── ic_launcher_round.png (144x144) ✅
│
└── mipmap-xxxhdpi/
    ├── ic_launcher.png (192x192) ✅
    └── ic_launcher_round.png (192x192) ✅
```

**⚠️ IMPORTANTE:** Nenhum arquivo `.xml` deve existir nas pastas `mipmap-*`!

---

## ⚠️ PROBLEMAS COMUNS

### **Ícone não atualiza após instalar**
✅ **Solução:**
1. Desinstale o app completamente
2. Reinicie o celular
3. Instale o APK novamente
4. Limpe cache do launcher:
   ```
   Ajustes → Apps → Launcher → Limpar Cache
   ```

### **Ícone fica pixelado ou desfocado**
✅ **Solução:**
- Certifique-se que a imagem original é **pelo menos 1024x1024px**
- Use o Android Asset Studio que gera as resoluções corretas
- Não use imagens comprimidas/jpeg

### **Erro: "ic_launcher not found"**
✅ **Solução:**
- Verifique que TODAS as pastas mipmap-* têm `ic_launcher.png`
- Execute `./gradlew clean` novamente
- Rebuild o projeto

### **Ícone aparece com fundo branco**
✅ **Solução:**
- No Android Asset Studio, escolha **Background Color** como **Transparent**
- Ou use a cor azul marinho: `#2C3E78`

---

## 🎨 PARA PLAY STORE

### **Ícone da loja (512x512px)**
1. Use a mesma imagem de 1024x1024px
2. Redimensione para 512x512px
3. Upload no **Play Console → Ficha da loja → Ícone do app**

### **Feature Graphic (1024x500px)**
Você pode criar uma versão wide:
1. Canvas: 1024x500px
2. Fundo: Azul marinho (#2C3E78)
3. Centralizar o logo "oo + checkmark"
4. Adicionar texto "Gabaritoo" embaixo

---

## ✅ CHECKLIST FINAL

- [ ] Baixei a imagem do ícone oficial (1024x1024px)
- [ ] Acessei o Android Asset Studio
- [ ] Fiz upload da imagem e configurei (Shape: None, Padding: 0%)
- [ ] Baixei o ZIP gerado
- [ ] Deletei todos os arquivos `.xml` das pastas mipmap-*
- [ ] Copiei o conteúdo do ZIP para `android/app/src/main/res/`
- [ ] Verifiquei que cada pasta tem `ic_launcher.png` E `ic_launcher_round.png`
- [ ] Executei `./gradlew clean`
- [ ] Executei `./gradlew assembleDebug`
- [ ] Desinstalei o app antigo do celular
- [ ] Instalei o novo APK
- [ ] O ícone oficial do Gabaritoo apareceu! 🎉

---

## 🚀 TEMPO ESTIMADO

⏱️ **5-10 minutos** no total:
- 2 min: Baixar imagem
- 2 min: Android Asset Studio
- 2 min: Copiar arquivos
- 3 min: Clean + Rebuild + Instalar

---

## 🎯 RESULTADO ESPERADO

Quando você abrir a tela inicial do celular, o ícone do Gabaritoo deve ser:

✅ **Fundo:** Azul marinho  
✅ **Símbolo:** Dois círculos verdes ("oo")  
✅ **Check:** Marca branca no segundo "o"  
✅ **Logo:** "Gabaritoo" embaixo (se visível na resolução)  

🎉 **Pronto! Ícone oficial instalado com sucesso!**
