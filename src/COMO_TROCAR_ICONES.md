# 🎨 GUIA COMPLETO: Como Trocar os Ícones do Gabaritoo

## ❌ PROBLEMA IDENTIFICADO

Os **5 ícones PNG** que você enviou (mipmap-mdpi, hdpi, xhdpi, xxhdpi, xxxhdpi) **não estão sendo usados** porque:

1. Os arquivos atuais nas pastas são **XML vetoriais** (ic_launcher.xml)
2. Você precisa **substituir os XML por PNG** manualmente

---

## 📱 ÍCONE ATUAL (Antigo)

O ícone atual é um **Vector Drawable XML** que mostra:
- 📄 Folha de prova com checkboxes
- ✏️ Caneta escrevendo
- 🔵 Fundo azul

---

## 🎯 ÍCONES NOVOS (Que você enviou)

Você enviou **5 versões PNG** do ícone oficial do Gabaritoo:
- ✅ `mipmap-mdpi/ic_launcher.png` (48x48px)
- ✅ `mipmap-hdpi/ic_launcher.png` (72x72px)
- ✅ `mipmap-xhdpi/ic_launcher.png` (96x96px)
- ✅ `mipmap-xxhdpi/ic_launcher.png` (144x144px)
- ✅ `mipmap-xxxhdpi/ic_launcher.png` (192x192px)

---

## 🛠️ PASSO A PASSO PARA SUBSTITUIR

### **ETAPA 1: Deletar arquivos XML antigos**

No Android Studio, delete estes arquivos:

```
android/app/src/main/res/mipmap-mdpi/ic_launcher.xml
android/app/src/main/res/mipmap-hdpi/ic_launcher.xml
android/app/src/main/res/mipmap-xhdpi/ic_launcher.xml
android/app/src/main/res/mipmap-xxhdpi/ic_launcher.xml
android/app/src/main/res/mipmap-xxxhdpi/ic_launcher.xml
```

### **ETAPA 2: Deletar arquivos ROUND também**

```
android/app/src/main/res/mipmap-mdpi/ic_launcher_round.xml
android/app/src/main/res/mipmap-hdpi/ic_launcher_round.xml
android/app/src/main/res/mipmap-xhdpi/ic_launcher_round.xml
android/app/src/main/res/mipmap-xxhdpi/ic_launcher_round.xml
android/app/src/main/res/mipmap-xxxhdpi/ic_launcher_round.xml
```

### **ETAPA 3: Copiar ícones PNG novos**

Copie os **5 arquivos PNG** que você tem para cada pasta correspondente:

1. Copie `ic_launcher.png` (48x48) → `android/app/src/main/res/mipmap-mdpi/`
2. Copie `ic_launcher.png` (72x72) → `android/app/src/main/res/mipmap-hdpi/`
3. Copie `ic_launcher.png` (96x96) → `android/app/src/main/res/mipmap-xhdpi/`
4. Copie `ic_launcher.png` (144x144) → `android/app/src/main/res/mipmap-xxhdpi/`
5. Copie `ic_launcher.png` (192x192) → `android/app/src/main/res/mipmap-xxxhdpi/`

### **ETAPA 4: (Opcional) Copiar versão ROUND**

Se você tem versões **arredondadas** do ícone, copie como `ic_launcher_round.png` em cada pasta.

**Se NÃO tiver versão round:** Copie o mesmo ícone quadrado com o nome `ic_launcher_round.png`.

---

## 🔧 LIMPEZA NECESSÁRIA

Depois de substituir os ícones, execute:

```bash
# No terminal dentro do Android Studio
cd android
./gradlew clean

# Depois rebuilde o projeto
./gradlew assembleDebug
```

Ou no Android Studio:
1. **Build → Clean Project**
2. **Build → Rebuild Project**

---

## 📱 TESTANDO

Depois de rebuildar:
1. Desinstale o app antigo do celular
2. Instale o novo APK
3. O novo ícone deve aparecer na tela inicial! 🎉

---

## ⚠️ IMPORTANTE

- Os arquivos devem se chamar **exatamente** `ic_launcher.png` (não `ic_launcher (1).png` ou outro nome)
- Todos devem estar no formato **PNG**
- Respeite as resoluções corretas para cada pasta
- Após trocar, sempre faça **Clean + Rebuild**

---

## 🐛 SE O ÍCONE NÃO ATUALIZAR

1. Desinstale completamente o app do celular
2. Limpe o cache do celular (Ajustes → Apps → Gabaritoo → Limpar Cache)
3. Reinicie o celular
4. Instale o APK novamente

---

## 🎨 ESTRUTURA FINAL

Depois da substituição, as pastas devem conter:

```
mipmap-mdpi/
  ├── ic_launcher.png (48x48)
  └── ic_launcher_round.png (48x48)

mipmap-hdpi/
  ├── ic_launcher.png (72x72)
  └── ic_launcher_round.png (72x72)

mipmap-xhdpi/
  ├── ic_launcher.png (96x96)
  └── ic_launcher_round.png (96x96)

mipmap-xxhdpi/
  ├── ic_launcher.png (144x144)
  └── ic_launcher_round.png (144x144)

mipmap-xxxhdpi/
  ├── ic_launcher.png (192x192)
  └── ic_launcher_round.png (192x192)
```

---

## ✅ CHECKLIST

- [ ] Deletei todos os arquivos `.xml` das pastas mipmap
- [ ] Copiei os 5 arquivos PNG para as pastas corretas
- [ ] Os arquivos se chamam exatamente `ic_launcher.png`
- [ ] Executei `./gradlew clean`
- [ ] Executei `./gradlew assembleDebug`
- [ ] Desinstalei o app antigo do celular
- [ ] Instalei o novo APK
- [ ] O ícone novo apareceu! 🎉

---

## 🎯 RESULTADO ESPERADO

Depois destes passos, quando você instalar o APK, o **ícone oficial do Gabaritoo** (que você enviou) deve aparecer na tela inicial do celular, substituindo o ícone antigo da folha de prova com caneta.
