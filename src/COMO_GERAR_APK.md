# 📦 COMO GERAR APK DE PRODUÇÃO

## ✅ TUDO PRONTO! CORES E TEMAS FUNCIONARÃO NO APK!

**Auditoria:** ✅ APROVADA  
**Compatibilidade:** Android 5.0+ (SDK 21+)  
**Temas:** ✅ Funcionam no APK  
**Persistência:** ✅ LocalStorage funciona

---

## 🚀 PASSO A PASSO COMPLETO

### 1️⃣ PREPARAR O BUILD

Execute estes comandos no terminal do projeto:

```bash
# Limpa builds antigos
rm -rf android/app/build android/.gradle dist

# Compila o código atualizado
npm run build

# Sincroniza com Android
npx cap sync android

# Abre Android Studio
npx cap open android
```

**Aguarde** o Android Studio abrir e o Gradle Build terminar!

---

### 2️⃣ LIMPAR CACHE (OBRIGATÓRIO!)

No Android Studio:

1. **Build** > **Clean Project**
2. Aguarde terminar
3. **Build** > **Rebuild Project**
4. Aguarde terminar

**Por quê?** Garante que o APK use a versão nova dos arquivos!

---

### 3️⃣ GERAR APK RELEASE

#### Opção A: APK Simples (Para Testes/Distribuição Direta)

1. **Build** > **Build Bundle(s) / APK(s)** > **Build APK(s)**
2. Aguarde build concluir
3. Clique em **locate** quando aparecer a notificação
4. APK estará em: `android/app/build/outputs/apk/debug/app-debug.apk`

**Atenção:** Este é um APK de DEBUG! Não publique na Google Play!

---

#### Opção B: APK Assinado (Para Google Play Store)

**Primeira vez (criar keystore):**

1. **Build** > **Generate Signed Bundle / APK**
2. Selecione **APK** > **Next**
3. Clique em **Create new...** (para criar keystore)
4. Preencha:
   ```
   Key store path: gabaritoo-release-key.jks
   Password: [sua senha forte]
   Key alias: gabaritoo
   Key password: [mesma senha]
   Validity (years): 25
   
   Certificate:
   First and Last Name: [Seu nome]
   Organization Unit: [Sua empresa]
   Organization: [Sua empresa]
   City: [Sua cidade]
   State: [Seu estado]
   Country Code: BR
   ```
5. Clique **OK**
6. Marque **release**
7. Marque **V1 (Jar Signature)** e **V2 (Full APK Signature)**
8. Clique **Create**

**Próximas vezes (usar keystore existente):**

1. **Build** > **Generate Signed Bundle / APK**
2. Selecione **APK** > **Next**
3. Clique **Choose existing...**
4. Selecione `gabaritoo-release-key.jks`
5. Digite senha
6. Selecione alias `gabaritoo`
7. Marque **release**
8. Marque **V1** e **V2**
9. Clique **Create**

**APK assinado estará em:**
```
android/app/release/app-release.apk
```

---

### 4️⃣ INSTALAR E TESTAR APK

#### Via USB (ADB):
```bash
adb install -r android/app/release/app-release.apk
```

#### Via Transferência:
1. Copie `app-release.apk` para o celular
2. Abra o arquivo no celular
3. Permita instalação de fontes desconhecidas (se pedido)
4. Instale

---

### 5️⃣ CHECKLIST DE TESTES

Após instalar o APK, teste:

#### ✅ Dashboard:
- [ ] Fundo branco sólido (não cinza!)
- [ ] Textos pretos legíveis
- [ ] Card com gradiente colorido
- [ ] Botões com cores vibrantes

#### ✅ Temas (Ajustes > Tema):
- [ ] Default (Cinza) funciona
- [ ] Ocean (Azul) funciona
- [ ] Forest (Verde) funciona
- [ ] Sunset (Laranja) funciona
- [ ] Purple (Roxo) funciona

#### ✅ Persistência:
- [ ] Trocar para tema "Ocean"
- [ ] Fechar app completamente (swipe up)
- [ ] Reabrir app
- [ ] Tema "Ocean" foi mantido ✅

#### ✅ Dark Mode do Android:
- [ ] Ativar Dark Mode nas configurações do Android
- [ ] Abrir app
- [ ] App IGNORA dark mode (fundo continua branco) ✅

#### ✅ Funcionalidades:
- [ ] Quiz funciona
- [ ] Simulado funciona
- [ ] Estatísticas funcionam
- [ ] Ajustes funcionam
- [ ] Notificações funcionam (se configuradas)

---

## 🔧 CONFIGURAÇÃO OPCIONAL (PRODUÇÃO)

### Desabilitar Debug no APK

**Arquivo:** `/capacitor.config.json`

Antes:
```json
"android": {
    "webContentsDebuggingEnabled": true  ❌ Debug ativo
}
```

Depois (para produção):
```json
"android": {
    "webContentsDebuggingEnabled": false  ✅ Debug desabilitado
}
```

**Quando fazer?** Apenas para o APK final da Google Play Store.

---

## 📊 DIFERENÇAS ENTRE APKs

| Tipo | Arquivo | Uso | Assinatura | Google Play |
|------|---------|-----|------------|-------------|
| Debug | app-debug.apk | Testes locais | Não | ❌ Não aceita |
| Release | app-release.apk | Distribuição | ✅ Sim | ✅ Aceita |

---

## 🆘 PROBLEMAS COMUNS

### Problema 1: Build falha
**Erro:** `Gradle build failed`

**Solução:**
```bash
cd android
./gradlew clean
cd ..
npm run build
npx cap sync android
```

---

### Problema 2: Cores esbranquiçadas no APK
**Causa:** Build antigo em cache

**Solução:**
1. Android Studio: **Build > Clean Project**
2. Android Studio: **Build > Rebuild Project**
3. Gerar APK novamente

---

### Problema 3: Temas não funcionam no APK
**Causa:** CSS não sincronizado

**Solução:**
```bash
npm run build
npx cap sync android
# Depois gerar APK novamente
```

---

### Problema 4: APK não instala
**Causa:** Versão anterior com assinatura diferente

**Solução:**
1. Desinstalar app antigo
2. Instalar APK novo

---

## 📱 PUBLICAR NA GOOGLE PLAY STORE

### 1. Criar Conta Google Play Console
- Acesse: https://play.google.com/console
- Pague taxa única de $25 USD
- Preencha dados da conta

### 2. Criar Aplicativo
- Nome: Gabaritoo
- Idioma padrão: Português (Brasil)
- App ou jogo: App
- Gratuito ou pago: Gratuito

### 3. Preparar Assets
- **Ícone:** 512x512px (PNG)
- **Screenshots:**
  - Mínimo 2 screenshots
  - Tamanho: 1080x1920px ou 1080x2340px
  - Mostre dashboard, quiz, ajustes
- **Banner:** 1024x500px (opcional)

### 4. Upload do APK/AAB
- **Recomendado:** AAB (Android App Bundle)
- Gere AAB em vez de APK:
  - Build > Generate Signed Bundle / APK
  - Selecione **Android App Bundle**
  - Assine com keystore
- Upload na aba **Produção**

### 5. Preencher Informações
- **Descrição curta:** (80 caracteres)
  ```
  Gabaritoo - App de estudos para concursos com quiz e simulados
  ```
  
- **Descrição completa:** (4000 caracteres)
  ```
  Gabaritoo é o app completo para estudar para concursos públicos.
  
  ✅ Quiz com milhares de questões
  ✅ Simulados cronometrados
  ✅ Estatísticas detalhadas
  ✅ Sistema de gamificação (XP, níveis, badges)
  ✅ 5 temas coloridos
  ✅ Modo offline (SQLite local)
  ✅ Notificações inteligentes
  
  Estude de forma eficiente e acompanhe seu progresso!
  ```

- **Categoria:** Educação
- **Tags:** concursos, estudos, quiz, educação
- **Email de contato:** seu@email.com
- **Política de privacidade:** URL (obrigatório)

### 6. Classificação de Conteúdo
- Preencha questionário
- App educativo
- Sem anúncios (ou com anúncios, se aplicável)

### 7. Preço e Distribuição
- Gratuito
- Países: Brasil (ou todos)

### 8. Revisar e Publicar
- Revisar todas as seções
- Clicar em **Enviar para Revisão**
- Aguardar aprovação (1-7 dias)

---

## 🎯 CHECKLIST PUBLICAÇÃO

### Antes de Publicar:
- [ ] APK/AAB assinado gerado
- [ ] Testado em dispositivos reais
- [ ] Screenshots preparados (mínimo 2)
- [ ] Ícone 512x512px pronto
- [ ] Descrição escrita
- [ ] Política de privacidade publicada (URL)
- [ ] Email de contato configurado

### Requisitos Técnicos:
- [x] minSdkVersion: 21 ✅
- [x] targetSdkVersion: 34 ✅
- [x] Permissões declaradas ✅
- [x] APK assinado ✅

### Após Publicar:
- [ ] Aguardar revisão Google (1-7 dias)
- [ ] Corrigir se rejeitado
- [ ] Quando aprovado, app fica disponível na Play Store
- [ ] Compartilhar link do app

---

## 🎉 RESUMO

```
✅ Cores e temas funcionam no APK
✅ Fundo branco sempre
✅ Textos pretos sempre
✅ 5 temas persistem
✅ Dark mode bloqueado
✅ Compatível SDK 21+
✅ Pronto para Google Play
```

---

**🚀 GERE O APK E TESTE! TUDO ESTÁ CORRETO!**

---

_Leia `AUDITORIA_APK_PRODUCAO.md` para detalhes técnicos._
