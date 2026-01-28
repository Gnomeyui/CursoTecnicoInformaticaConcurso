# 🎨 GUIA OFICIAL: Substituir Ícones do Gabaritoo

## 📱 ÍCONES RECEBIDOS

Você enviou **6 versões** do ícone oficial do Gabaritoo:

| Imagem | Tamanho Detectado | Uso Recomendado |
|--------|------------------|-----------------|
| 1️⃣ **Feature Graphic** | 1024x1024px | Play Store (Feature Graphic) |
| 2️⃣ **xxxhdpi** | ~512x512px | mipmap-xxxhdpi (192x192) |
| 3️⃣ **xxhdpi** | ~256x256px | mipmap-xxhdpi (144x144) |
| 4️⃣ **xhdpi** | ~192x192px | mipmap-xhdpi (96x96) |
| 5️⃣ **hdpi** | ~128x128px | mipmap-hdpi (72x72) |
| 6️⃣ **mdpi** | ~96x96px | mipmap-mdpi (48x48) |

---

## 🎯 DESIGN DO ÍCONE

O ícone oficial do Gabaritoo possui:

✅ **Fundo:** Azul marinho (#2C3E78)  
✅ **Elementos principais:** 
   - 2 círculos verdes (#7CDE8D) formando "oo"
   - Checkmark branco no segundo "o"
✅ **Logo:** "Gabaritoo" em branco (com "oo" em verde)

---

## 🛠️ ESTRUTURA ANDROID NECESSÁRIA

O Android precisa de **5 resoluções** diferentes:

```
android/app/src/main/res/
├── mipmap-mdpi/
│   ├── ic_launcher.png          (48x48px)
│   └── ic_launcher_round.png    (48x48px)
│
├── mipmap-hdpi/
│   ├── ic_launcher.png          (72x72px)
│   └── ic_launcher_round.png    (72x72px)
│
├── mipmap-xhdpi/
│   ├── ic_launcher.png          (96x96px)
│   └── ic_launcher_round.png    (96x96px)
│
├── mipmap-xxhdpi/
│   ├── ic_launcher.png          (144x144px)
│   └── ic_launcher_round.png    (144x144px)
│
└── mipmap-xxxhdpi/
    ├── ic_launcher.png          (192x192px)
    └── ic_launcher_round.png    (192x192px)
```

---

## 📋 PASSO A PASSO COMPLETO

### **PASSO 1: Preparar as imagens no tamanho correto**

Como você enviou imagens de tamanhos variados, você precisa **redimensionar** cada uma para os tamanhos exatos do Android:

#### **Opção A: Usar Android Asset Studio (Recomendado)**
1. Acesse: https://romannurik.github.io/AndroidAssetStudio/icons-launcher.html
2. Faça upload da **imagem 1** (1024x1024) na opção "Image"
3. Ajuste:
   - **Trim:** NO
   - **Padding:** 0%
   - **Shape:** None (ou Circle para round)
4. Clique em **Download ZIP**
5. Extraia o ZIP - ele já cria todas as pastas corretas!

#### **Opção B: Redimensionar manualmente (Photoshop/GIMP)**
Use a **imagem 1** (1024x1024) como base e crie 5 versões:

| Resolução | Tamanho |
|-----------|---------|
| mdpi | 48x48px |
| hdpi | 72x72px |
| xhdpi | 96x96px |
| xxhdpi | 144x144px |
| xxxhdpi | 192x192px |

---

### **PASSO 2: Deletar ícones antigos**

No Android Studio, navegue até:
```
android/app/src/main/res/
```

**Delete TODOS estes arquivos:**

```
mipmap-mdpi/ic_launcher.xml
mipmap-mdpi/ic_launcher_round.xml

mipmap-hdpi/ic_launcher.xml
mipmap-hdpi/ic_launcher_round.xml

mipmap-xhdpi/ic_launcher.xml
mipmap-xhdpi/ic_launcher_round.xml

mipmap-xxhdpi/ic_launcher.xml
mipmap-xxhdpi/ic_launcher_round.xml

mipmap-xxxhdpi/ic_launcher.xml
mipmap-xxxhdpi/ic_launcher_round.xml
```

⚠️ **IMPORTANTE:** Delete os arquivos `.xml`, NÃO as pastas!

---

### **PASSO 3: Copiar ícones novos**

Copie os arquivos PNG redimensionados para as pastas correspondentes:

#### **Se usou Android Asset Studio (Recomendado):**
O ZIP já contém tudo organizado! Basta copiar:
```bash
# Extrair ZIP e copiar tudo
cp -r AndroidAssetStudio-Output/res/* android/app/src/main/res/
```

#### **Se redimensionou manualmente:**
Copie cada arquivo para a pasta correta:

```
ic_launcher_48x48.png   → mipmap-mdpi/ic_launcher.png
ic_launcher_48x48.png   → mipmap-mdpi/ic_launcher_round.png

ic_launcher_72x72.png   → mipmap-hdpi/ic_launcher.png
ic_launcher_72x72.png   → mipmap-hdpi/ic_launcher_round.png

ic_launcher_96x96.png   → mipmap-xhdpi/ic_launcher.png
ic_launcher_96x96.png   → mipmap-xhdpi/ic_launcher_round.png

ic_launcher_144x144.png → mipmap-xxhdpi/ic_launcher.png
ic_launcher_144x144.png → mipmap-xxhdpi/ic_launcher_round.png

ic_launcher_192x192.png → mipmap-xxxhdpi/ic_launcher.png
ic_launcher_192x192.png → mipmap-xxxhdpi/ic_launcher_round.png
```

---

### **PASSO 4: Verificar AndroidManifest.xml**

Certifique-se que o `AndroidManifest.xml` está correto:

```xml
<application
    android:icon="@mipmap/ic_launcher"
    android:roundIcon="@mipmap/ic_launcher_round"
    ...>
```

✅ **Já está correto!** (verificado anteriormente)

---

### **PASSO 5: Clean + Rebuild**

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

### **PASSO 6: Gerar APK**

```bash
cd android
./gradlew assembleRelease
```

O APK estará em:
```
android/app/build/outputs/apk/release/app-release-unsigned.apk
```

---

### **PASSO 7: Instalar e testar**

```bash
# Desinstalar app antigo
adb uninstall com.alerr.top5

# Instalar APK novo
adb install -r android/app/build/outputs/apk/debug/app-debug.apk
```

Ou manualmente:
1. Copie o APK para o celular
2. Desinstale o Gabaritoo antigo
3. Instale o APK novo
4. Verifique o ícone na tela inicial! 🎉

---

## 🎨 ÍCONE DA PLAY STORE

A **imagem 1** (1024x1024) é perfeita para a Play Store!

### **Onde usar:**
1. **Play Console → Ficha da loja → Recursos gráficos**
2. **Ícone do app:** 512x512px (redimensionar de 1024x1024)
3. **Feature Graphic:** 1024x500px (criar versão wide)

---

## ⚠️ PROBLEMAS COMUNS

### **Ícone não atualiza depois de instalar**
✅ **Solução:**
1. Desinstale o app completamente
2. Reinicie o celular
3. Instale o APK novamente
4. Limpe cache do launcher:
   ```
   Ajustes → Apps → Launcher → Limpar Cache
   ```

### **Ícone fica pixelado**
✅ **Solução:**
- Certifique-se que cada PNG está no tamanho exato:
  - mdpi: 48x48
  - hdpi: 72x72
  - xhdpi: 96x96
  - xxhdpi: 144x144
  - xxxhdpi: 192x192

### **Arquivos .xml ainda aparecem**
✅ **Solução:**
- Delete os `.xml` manualmente no Android Studio
- Faça **Clean Project** depois

---

## 🎯 CHECKLIST FINAL

- [ ] Deletei todos os arquivos `.xml` das pastas mipmap
- [ ] Criei/redimensionei os 5 PNG nos tamanhos corretos
- [ ] Copiei os PNG para as pastas mipmap-*
- [ ] Cada pasta tem `ic_launcher.png` E `ic_launcher_round.png`
- [ ] Executei `./gradlew clean`
- [ ] Executei `./gradlew assembleDebug`
- [ ] Desinstalei o app antigo do celular
- [ ] Instalei o novo APK
- [ ] O ícone oficial do Gabaritoo apareceu! ✅

---

## 🚀 FERRAMENTAS ÚTEIS

### **Android Asset Studio**
https://romannurik.github.io/AndroidAssetStudio/icons-launcher.html
**→ Gera automaticamente todas as resoluções!**

### **Online Image Resizer**
https://imageresizer.com/
**→ Redimensiona manualmente**

### **APK Icon Editor**
https://github.com/kefir500/apk-icon-editor
**→ Edita ícones direto no APK (não recomendado para produção)**

---

## 📱 RESULTADO ESPERADO

Depois de seguir todos os passos, quando você instalar o APK, o ícone oficial do Gabaritoo deve aparecer:

🎯 **Ícone com:**
- Fundo azul marinho
- Dois círculos verdes formando "oo"
- Checkmark branco no segundo círculo
- Logo "Gabaritoo" embaixo (em versões maiores)

---

## ✅ CONFIRMAÇÃO

Para confirmar que deu certo:
1. Abra a tela inicial do celular
2. O ícone do Gabaritoo deve ter o design oficial (azul + verde + check)
3. NÃO deve mais aparecer o ícone antigo (folha de prova com caneta)

🎉 **Pronto! Ícones atualizados com sucesso!**
