# 🔧 Troubleshooting - ALE-RR TOP 5

Guia rápido para resolver problemas comuns.

## 🚨 Problema: App não instala no celular

### Causa Provável
- Receivers com `exported="true"` (agora corrigido)
- Build antiga ainda no celular
- Permissões USB incorretas

### Solução

**1. Desinstale a versão antiga:**
```bash
# Via USB conectado
adb uninstall com.alerr.top5

# Ou manualmente no celular:
# Configurações > Apps > ALE-RR TOP 5 > Desinstalar
```

**2. Limpe completamente o projeto:**
```bash
# Limpe builds anteriores
rm -rf dist
rm -rf android/app/build
rm -rf android/.gradle
rm -rf android/.idea

# Reconstrua do zero
npm run build
npx cap sync android
```

**3. No Android Studio:**
```
File > Invalidate Caches / Restart
Build > Clean Project
Build > Rebuild Project
```

**4. Instale novamente:**
```
Run > Run 'app'
```

---

## 🔔 Problema: Notificações não funcionam

### Verificar Permissões

**No celular:**
```
Configurações > Apps > ALE-RR TOP 5 > Permissões > Notificações
```
- Deve estar **ATIVADO**

**Otimização de Bateria:**
```
Configurações > Bateria > Otimização de Bateria
```
- Procure "ALE-RR TOP 5"
- Selecione **"Não otimizar"**

### Verificar Logs

**No Android Studio > Logcat:**
```
Filtro: com.alerr.top5
```

Procure por:
- ✅ "Sistema de notificações inicializado"
- ✅ "X notificações agendadas"
- ❌ Erros relacionados a "notification" ou "permission"

### Testar Manualmente

1. Abra o app
2. Configurações > Notificações de Estudo
3. Ative a chave
4. Configure um horário **daqui a 2 minutos**
5. Aguarde
6. A notificação DEVE aparecer

---

## 🏗️ Problema: Erro de Build Gradle

### Erro: "Could not resolve dependencies"

**Solução:**
```bash
cd android
./gradlew clean
./gradlew --stop
cd ..
npm run build
npx cap sync android
```

### Erro: "Duplicate resources"

**Causa:** Ícones PNG e XML duplicados

**Solução:** Os ícones agora são apenas XML (já corrigido)

### Erro: "Task failed with exit code 1"

**Solução:**
```bash
# Limpe TUDO
rm -rf node_modules
rm -rf dist
rm -rf android/app/build
rm -rf android/.gradle

# Reinstale
npm install
npm run build
npx cap sync android
```

---

## 📱 Problema: App fecha sozinho (crash)

### Verificar Memória

**Logs no Logcat:**
Procure por "OutOfMemoryError" ou "Fatal exception"

### Reduzir Uso de Memória

No código, o app já está otimizado, mas se crashar:

1. Feche outros apps
2. Reinicie o celular
3. Reinstale o app

### Ver Stack Trace

**Android Studio > Logcat:**
Quando crashar, copie o stack trace completo e analise

---

## 🎨 Problema: Ícones não aparecem

### Verificar Recursos

```bash
# Lista os ícones
ls -la android/app/src/main/res/mipmap-*/ic_launcher*
ls -la android/app/src/main/res/drawable/ic_launcher*
```

Deve existir:
- `drawable/ic_launcher.xml`
- `mipmap-*/ic_launcher.xml` (hdpi, mdpi, xhdpi, xxhdpi, xxxhdpi)
- `mipmap-*/ic_launcher_round.xml`

### Rebuild Ícones

Se faltarem ícones, todos os XMLs já estão criados. Apenas:
```bash
npx cap sync android
```

---

## 🔌 Problema: USB não detecta celular

### Windows

**Instalar Driver ADB:**
1. Baixe SDK Platform Tools
2. Adicione ao PATH
3. Execute `adb devices`

### Linux/Mac

**Permissões:**
```bash
sudo usermod -aG plugdev $USER
```

**Verificar Conexão:**
```bash
adb devices
```

Deve mostrar:
```
List of devices attached
ABC123XYZ   device
```

Se mostrar "unauthorized", aceite no celular.

---

## 🌐 Problema: App não carrega no navegador (dev)

### Porta Ocupada

**Erro:** "Port 5173 is already in use"

**Solução:**
```bash
# Windows
netstat -ano | findstr :5173
taskkill /PID <PID> /F

# Linux/Mac
lsof -ti:5173 | xargs kill -9
```

### Reconstruir

```bash
npm run dev
```

---

## 📊 Problema: Gráficos não aparecem

### Recharts não carrega

**Verificar:**
```bash
npm list recharts
```

Deve mostrar versão 2.x

**Reinstalar:**
```bash
npm uninstall recharts
npm install recharts@^2.10.0
npm run build
```

---

## 💾 Problema: Dados não salvam

### LocalStorage bloqueado

**Navegador:** Pode estar em modo privado

**Android:** Não deve ter esse problema

**Testar:**
```javascript
// No console do navegador
localStorage.setItem('teste', 'ok')
localStorage.getItem('teste') // Deve retornar 'ok'
```

---

## 🚀 Rebuild Completo (Solução Universal)

Se nada funcionar, reconstrua TUDO do zero:

```bash
# 1. Limpe tudo
rm -rf node_modules
rm -rf dist
rm -rf android/app/build
rm -rf android/.gradle
rm -rf android/.idea

# 2. Reinstale dependências
npm install

# 3. Build
npm run build

# 4. Sync Android
npx cap sync android

# 5. Abra Android Studio
npx cap open android

# 6. No Android Studio:
# - File > Invalidate Caches / Restart
# - Build > Clean Project
# - Build > Rebuild Project
# - Run > Run 'app'
```

---

## 📞 Comandos Úteis

### Ver logs em tempo real
```bash
adb logcat -s ReactNativeJS:V AndroidRuntime:E
```

### Desinstalar app
```bash
adb uninstall com.alerr.top5
```

### Instalar APK manualmente
```bash
adb install android/app/build/outputs/apk/debug/app-debug.apk
```

### Limpar dados do app
```bash
adb shell pm clear com.alerr.top5
```

### Ver pacotes instalados
```bash
adb shell pm list packages | grep alerr
```

---

## ✅ Checklist Final

Antes de reportar problema, confirme:

- [ ] Node.js 18+ instalado
- [ ] JDK 17+ instalado
- [ ] Android Studio atualizado
- [ ] Gradle Sync terminou sem erros
- [ ] Clean + Rebuild executado
- [ ] Celular em modo desenvolvedor
- [ ] USB em modo transferência
- [ ] `adb devices` detecta o celular
- [ ] App desinstalado antes de reinstalar

---

**Se o problema persistir após seguir TODOS os passos acima, revise o README.md para instruções básicas.**
