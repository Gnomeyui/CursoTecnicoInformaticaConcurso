# ⚡ INSTRUÇÕES RÁPIDAS - Corrigir Cores no Android

## 🎯 O que foi feito?
Corrigido o problema de **cores esbranquiçadas/lavadas** no Android causado por conflito de dark mode.

---

## 🚀 COMO TESTAR (3 PASSOS)

### Passo 1: Rodar o Script
Escolha o comando adequado para seu sistema:

#### Linux/Mac:
```bash
bash BUILD_ANDROID_LIMPO.sh
```

#### Windows PowerShell:
```powershell
.\BUILD_ANDROID_LIMPO.ps1
```

#### Manualmente (se scripts não funcionarem):
```bash
rm -rf android/app/build android/.gradle dist
npm run build
npx cap sync android
npx cap open android
```

---

### Passo 2: Android Studio
1. Aguarde **Gradle Build** terminar (barra inferior)
2. Clique em **Run** (▶️) ou `Shift+F10`
3. Selecione seu dispositivo Android
4. Aguarde instalação

---

### Passo 3: Validar
Abra o app e verifique:

✅ **Dashboard:**
- Card principal com gradiente colorido (azul/roxo/verde)
- Título "Vamos Estudar!" em **BRANCO**
- Textos em **PRETO/CINZA ESCURO** (não claro)
- Cards de estatísticas brancos com bordas visíveis

✅ **Quiz:**
- Alternativas com fundo branco e texto escuro
- Botão de confirmar com cor vibrante

✅ **Geral:**
- Sem elementos esbranquiçados/lavados
- Contraste perfeito em todos os textos

---

## ❌ SE AINDA ESTIVER ESBRANQUIÇADO

### Opção 1: Limpar Cache do Dispositivo
1. Configurações do Android
2. Apps > Gabaritoo
3. Armazenamento > **Limpar dados**
4. Rodar o app novamente

### Opção 2: Reinstalar
```bash
# Desinstalar manualmente do dispositivo
# Depois:
bash BUILD_ANDROID_LIMPO.sh
```

---

## 📄 DOCUMENTAÇÃO COMPLETA

Leia os arquivos criados para mais detalhes:

- **`CORRECAO_CORES_ANDROID.md`** - Explicação técnica completa
- **`RESUMO_CORRECOES_APLICADAS.md`** - Resumo executivo

---

## 🆘 PROBLEMAS?

### Erro ao rodar script:
```bash
# Tente dar permissão de execução (Linux/Mac):
chmod +x BUILD_ANDROID_LIMPO.sh
bash BUILD_ANDROID_LIMPO.sh
```

### Gradle falha:
```bash
# Limpar cache do Gradle:
cd android
./gradlew clean
cd ..
```

### WebView desatualizado:
- Play Store > Buscar "Android System WebView" > Atualizar

---

## ✅ PRONTO!

**Tempo estimado:** 5-10 minutos  
**Dificuldade:** Fácil  
**Resultado:** Cores corretas no Android 🎨

---

_Criado em: 22/01/2025_
