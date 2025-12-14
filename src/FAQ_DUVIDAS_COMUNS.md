# ❓ FAQ - DÚVIDAS COMUNS SOBRE COMPILAÇÃO

## Perguntas frequentes sobre o projeto ALE-RR TOP 5

---

## 📱 SOBRE NOTIFICAÇÕES

### **1. Preciso do arquivo google-services.json?**

**🔴 NÃO!**

Este projeto usa **notificações locais**, que funcionam 100% offline sem Firebase.

```
Notificações Locais (este projeto):
✅ Não precisa Firebase
✅ Não precisa google-services.json
✅ Não precisa internet
✅ Funciona offline
✅ Mais privacidade

Push Notifications (remoto):
❌ Precisa Firebase
❌ Precisa google-services.json
❌ Precisa servidor
❌ Precisa internet
```

**Conclusão:** Pode compilar sem o arquivo!

---

### **2. Por que tem este código no build.gradle?**

```groovy
try {
    def servicesJSON = file('google-services.json')
    if (servicesJSON.text) {
        apply plugin: 'com.google.gms.google-services'
    }
} catch(Exception e) { ... }
```

**É uma proteção!** Se o arquivo existir, usa. Se não existir, ignora e continua.

**NÃO causa erro de build!** ✅

---

### **3. As notificações vão funcionar?**

**✅ SIM, 100%!**

O app usa `@capacitor/local-notifications` que funciona nativamente no Android sem precisar de Firebase.

**Tipos de notificação suportados:**
- ✅ Lembrete único (ex: daqui 1 hora)
- ✅ Lembretes diários (ex: todo dia às 9h)
- ✅ Lembretes personalizados
- ✅ Com som e vibração
- ✅ Persistem após reboot do celular

---

## 🔒 SOBRE PERMISSÕES

### **4. A permissão SCHEDULE_EXACT_ALARM vai dar problema?**

**Depende de onde você vai instalar:**

| Situação | Status |
|----------|--------|
| Instalação local (seu celular) | ✅ Funciona 100% |
| Instalação em amigos | ✅ Funciona 100% |
| Distribução por APK | ✅ Funciona 100% |
| Publicação na Play Store | ⚠️ Precisa justificativa |

---

### **5. Como justificar para a Play Store?**

**Resposta no formulário da Play Store:**

> "O aplicativo ALE-RR TOP 5 é um app educacional de estudos para concursos públicos. A permissão SCHEDULE_EXACT_ALARM é essencial para garantir que os lembretes de estudo sejam disparados nos horários exatos configurados pelo usuário (exemplo: 9h, 14h, 20h), permitindo uma rotina de estudos consistente e eficaz para preparação para concurso público."

**Categoria do app:** Educação  
**Justificativa válida:** ✅ Aceita pelo Google

---

### **6. Quais permissões o app usa?**

```xml
✅ POST_NOTIFICATIONS
   → Exibir notificações no Android 13+

✅ SCHEDULE_EXACT_ALARM
   → Agendar lembretes em horários exatos

✅ RECEIVE_BOOT_COMPLETED
   → Recriar lembretes após reiniciar celular

✅ VIBRATE
   → Vibrar quando notificação chegar
```

**Todas são NECESSÁRIAS para o funcionamento correto!**

---

## 🔧 SOBRE COMPILAÇÃO

### **7. Preciso instalar o Android Studio?**

**✅ SIM!**

O Android Studio é necessário para:
- Compilar o código Android
- Gerar o APK
- Testar no emulador
- Assinar APK para distribuição

**Download:** https://developer.android.com/studio

---

### **8. Qual versão do JDK preciso?**

**JDK 17** (LTS - Long Term Support)

**Download:** https://adoptium.net/

**Verificar instalação:**
```bash
java --version
# Deve mostrar: openjdk version "17.x.x"
```

---

### **9. Qual versão do Node.js preciso?**

**Node.js 18+** (recomendado 20 LTS)

**Download:** https://nodejs.org/

**Verificar instalação:**
```bash
node --version
# Deve mostrar: v18.x.x ou v20.x.x
```

---

### **10. Por que preciso executar `npm run build`?**

O Capacitor precisa que o código React seja **compilado** antes de sincronizar com o Android.

```bash
npm run build  →  Gera pasta /dist
                  ↓
npx cap sync   →  Copia /dist para /android/app/src/main/assets
                  ↓
Android Studio →  Compila APK com os assets
```

**Sem `npm run build`, o app vai abrir tela branca!**

---

### **11. O que faz `npx cap sync android`?**

**Sincroniza 3 coisas:**

1. **Código web** (/dist) → Copia para Android
2. **Plugins Capacitor** → Instala no Android
3. **Configurações** (capacitor.config.json) → Aplica no Android

**IMPORTANTE:** Não confundir com `npx cap add android`!

```bash
❌ npx cap add android    → Cria pasta Android DO ZERO (sobrescreve!)
✅ npx cap sync android   → Sincroniza projeto existente (seguro!)
```

---

## 📦 SOBRE O APK

### **12. Qual o tamanho do APK?**

```
APK Debug (para testes):    15-25 MB
APK Release (otimizado):    8-15 MB
```

**Tamanho razoável para um app educacional completo!**

---

### **13. Qual versão do Android é compatível?**

```
Mínimo:  Android 5.1 (API 22)  →  ~99% dos dispositivos
Alvo:    Android 14 (API 34)   →  Versão mais recente
```

**Quase todos os celulares modernos vão rodar!** ✅

---

### **14. Onde fica o APK gerado?**

**Caminho completo:**
```
/android/app/build/outputs/apk/debug/app-debug.apk
```

**Depois de compilar:**
- Android Studio mostra notificação "APK generated"
- Clique em "locate" para abrir a pasta

---

### **15. Posso distribuir o APK para amigos?**

**✅ SIM!**

O APK debug pode ser instalado em qualquer celular Android.

**Instrua seus amigos:**
1. Habilitar "Fontes desconhecidas" nas Configurações
2. Copiar APK para o celular
3. Abrir o arquivo e instalar

---

## 🔐 SOBRE PUBLICAÇÃO

### **16. Preciso assinar o APK?**

**Depende:**

```
Para testes e uso pessoal:     ❌ Não precisa (APK debug)
Para distribuir para amigos:   ❌ Não precisa (APK debug)
Para publicar na Play Store:   ✅ Precisa (APK release assinado)
```

---

### **17. Como gerar APK assinado?**

**No Android Studio:**

```
1. Build → Generate Signed Bundle / APK
2. Escolher: APK
3. Create new keystore:
   - Caminho: /seu-caminho/alerr-keystore.jks
   - Senha: ******** (ANOTE!)
   - Alias: alerrtop5
   - Validade: 25 anos
4. Next → Release → Finish
```

**⚠️ IMPORTANTE:** Guarde o keystore e a senha! Sem eles, não pode atualizar o app na Play Store!

---

### **18. Quanto custa publicar na Play Store?**

**Taxa única de $25 USD** (paga uma vez, vale para sempre)

**Link:** https://play.google.com/console/signup

---

## 🐛 SOBRE ERROS

### **19. APK não instala no celular, o que fazer?**

**Leia:** [ERRO_INSTALACAO_CELULAR.md](ERRO_INSTALACAO_CELULAR.md)

**Causas comuns:**
1. ❌ Assinatura inválida → Correções já aplicadas! ✅
2. ❌ Espaço insuficiente → Libere 50+ MB
3. ❌ Fontes desconhecidas → Habilite nas Configurações
4. ❌ Android muito antigo → Precisa 5.1+

---

### **20. Build falha no Android Studio, o que fazer?**

**Leia:** [SOLUCOES_GRADLE.md](SOLUCOES_GRADLE.md)

**Soluções rápidas:**

```bash
# 1. Limpar cache Gradle
cd android
./gradlew clean  # Linux/Mac
gradlew.bat clean  # Windows
cd ..

# 2. Invalidar cache do Android Studio
File → Invalidate Caches → Restart

# 3. Limpar tudo e recomeçar
rm -rf android/app/build android/build android/.gradle
npx cap sync android
```

---

### **21. App abre tela branca, o que fazer?**

**Causas:**

1. ❌ Esqueceu de executar `npm run build`
2. ❌ Esqueceu de executar `npx cap sync android`
3. ❌ Pasta /dist não existe ou está vazia

**Solução:**

```bash
npm run build
npx cap sync android
# Depois rebuilde no Android Studio
```

---

## 💻 SOBRE O CÓDIGO

### **22. Posso modificar o código React?**

**✅ SIM!**

**Fluxo:**

```bash
1. Modificar arquivos .tsx
2. npm run build
3. npx cap sync android
4. Rebuildar no Android Studio
```

---

### **23. Posso adicionar mais questões?**

**✅ SIM!**

Edite os arquivos em `/data/`:
- questions.ts
- questions_201_260.ts
- questions-lote-14-23.ts

**Depois:**
```bash
npm run build
npx cap sync android
```

---

### **24. Posso mudar o nome do app?**

**✅ SIM!**

**Arquivos a modificar:**

1. `/android/app/src/main/res/values/strings.xml`
   ```xml
   <string name="app_name">SEU NOME</string>
   ```

2. `capacitor.config.json`
   ```json
   "appName": "SEU NOME"
   ```

**Depois:**
```bash
npx cap sync android
```

---

### **25. Posso mudar o ícone do app?**

**✅ SIM!**

**Ferramentas:**
- https://icon.kitchen/ (recomendado)
- https://easyappicon.com/
- https://makeappicon.com/

**Gere os ícones e substitua em:**
```
/android/app/src/main/res/mipmap-*/ic_launcher.png
```

---

## 📊 SOBRE O PROJETO

### **26. Quantas questões o app tem?**

**2000+ questões** no nível FGV/Cebraspe

**Distribuição:**
- Informática (Redes, Segurança, Hardware, SO)
- Legislação (Direito Administrativo, Regimento ALE-RR)
- Português
- LGPD
- Governança de TI

---

### **27. O app funciona offline?**

**✅ SIM, 100%!**

Após instalação:
- ✅ Todas as questões estão no app
- ✅ Notificações funcionam offline
- ✅ Progresso salvo localmente
- ✅ Estatísticas salvas localmente
- ✅ Não precisa internet

---

### **28. Os dados são sincronizados na nuvem?**

**❌ NÃO**

Este projeto usa **LocalStorage** (armazenamento local).

**Vantagens:**
- ✅ Mais privacidade
- ✅ Funciona offline
- ✅ Mais rápido
- ✅ Sem custo de servidor

**Desvantagem:**
- ⚠️ Se desinstalar, perde progresso

---

## 🎯 SOBRE FUNCIONALIDADES

### **29. Quais funcionalidades o app tem?**

✅ **Quiz inteligente** com anti-repetição  
✅ **Gamificação** (XP, níveis, badges, streaks)  
✅ **Estatísticas** com gráficos (Recharts)  
✅ **Notificações** nativas Android  
✅ **Flashcards** de aquecimento  
✅ **Modo simulado** cronometrado  
✅ **5 temas** personalizáveis  
✅ **Dashboard** analítico  
✅ **Sistema de conquistas**  
✅ **100% offline**  

---

### **30. Como adicionar mais funcionalidades?**

**Estrutura do projeto:**

```
/components/     → Componentes React
/context/        → Estado global (Game, Stats, Theme, etc.)
/data/           → Questões e flashcards
/utils/          → Funções auxiliares
```

**Para adicionar:**
1. Criar componente em `/components/`
2. Importar no `/App.tsx`
3. `npm run build`
4. `npx cap sync android`

---

## 📚 MAIS AJUDA

### **Leia também:**

- [INSTRUCOES_FINAIS.md](INSTRUCOES_FINAIS.md) → Resumo completo
- [COMECE_AQUI_AGORA.md](COMECE_AQUI_AGORA.md) → Guia rápido
- [TESTE_RAPIDO.md](TESTE_RAPIDO.md) → Comandos detalhados
- [GUIA_COMPILACAO_CORRETO.md](GUIA_COMPILACAO_CORRETO.md) → Android Studio
- [ANALISE_CONFIRMADA.md](ANALISE_CONFIRMADA.md) → Análise técnica
- [ERRO_INSTALACAO_CELULAR.md](ERRO_INSTALACAO_CELULAR.md) → Troubleshooting
- [SOLUCOES_GRADLE.md](SOLUCOES_GRADLE.md) → Erros Gradle

---

**🏆 Se ainda tiver dúvidas, consulte os guias acima! RUMO AO TOP 5! 🎯📱🚀**
