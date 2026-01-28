# 🚀 COMO INSTALAR O ÍCONE DO GABARITOO (RÁPIDO!)

## ⚡ MÉTODO RÁPIDO (5 minutos)

### **PASSO 1: Baixar a imagem do ícone** 📥

A imagem oficial está disponível em:
```
figma:asset/ec2da47ce368cd06b0f175b6cadc2c46cf6f3898.png
```

**Como baixar:**
1. Abra o Figma onde está o ícone
2. Selecione o ícone
3. Botão direito → **Export**
4. Formato: **PNG**
5. Tamanho: **4x** (ou 1024x1024px)
6. Salve como `gabaritoo-icon.png`

---

### **PASSO 2: Android Asset Studio** 🔧

1. **Acesse:** https://romannurik.github.io/AndroidAssetStudio/icons-launcher.html

2. **Configure:**
   - Clique em **"Image"**
   - Faça upload de `gabaritoo-icon.png`
   - **Shape:** None
   - **Padding:** 0%
   - **Trim:** NO

3. **Download:**
   - Clique em **"Download .zip"**
   - Extraia o ZIP

---

### **PASSO 3: Copiar ícones** 📁

**Opção A: Script Automático** ⭐ (Recomendado)

```bash
# Dar permissão de execução
chmod +x scripts/setup-icon.sh

# Executar script
bash scripts/setup-icon.sh
```

O script vai:
1. ✅ Deletar ícones antigos (XML)
2. ✅ Copiar ícones novos (PNG)
3. ✅ Executar clean + build
4. ✅ Gerar APK pronto!

**Opção B: Manual**

1. Delete todos os `.xml` das pastas `mipmap-*`
2. Copie o conteúdo da pasta `res/` do ZIP para `android/app/src/main/res/`
3. Execute:
   ```bash
   cd android
   ./gradlew clean
   ./gradlew assembleDebug
   ```

---

### **PASSO 4: Instalar no celular** 📱

```bash
# Desinstalar app antigo
adb uninstall com.alerr.top5

# Instalar APK novo
adb install -r android/app/build/outputs/apk/debug/app-debug.apk
```

---

## ✅ PRONTO!

O ícone oficial do Gabaritoo deve aparecer:
- 🔵 Fundo azul marinho
- 🟢 Dois círculos verdes formando "oo"
- ✅ Checkmark branco no segundo círculo
- 📝 Logo "Gabaritoo"

---

## 📚 DOCUMENTAÇÃO COMPLETA

Para mais detalhes, veja:
- **Guia completo:** `/GUIA_ICONE_OFICIAL_GABARITOO.md`
- **Script helper:** `/scripts/setup-icon.sh`

---

## 🆘 PROBLEMAS?

### **Ícone não atualiza**
1. Desinstale o app completamente
2. Reinicie o celular
3. Instale o APK novamente

### **Erro no script**
Execute manualmente seguindo `/GUIA_ICONE_OFICIAL_GABARITOO.md`

---

🎉 **Boa sorte!**
