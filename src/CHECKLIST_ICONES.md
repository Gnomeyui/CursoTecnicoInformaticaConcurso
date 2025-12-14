# ✅ CHECKLIST - INSTALAR ÍCONES NO APP

## 📝 PASSO A PASSO COMPLETO

### ☐ ETAPA 1: Gerar os Ícones PNG

1. ☐ Abra o arquivo `/public/GERAR_ICONES_PNG.html` no navegador
   - Vá até a pasta do projeto
   - Entre em `/public/`
   - Clique duas vezes em `GERAR_ICONES_PNG.html`

2. ☐ Visualize os ícones gerados na página
   - Você verá dois ícones: 192x192 e 512x512
   - Ambos têm gradiente azul → roxo com troféu dourado

3. ☐ Baixe os ícones
   - Clique em "📦 Baixar Ambos os Ícones"
   - Ou baixe individualmente se preferir

### ☐ ETAPA 2: Mover os Arquivos

4. ☐ Localize os arquivos baixados
   - Geralmente estão na pasta "Downloads"
   - Nomes: `icon-192.png` e `icon-512.png`

5. ☐ Mova para a pasta correta
   - Copie/mova ambos para: `/public/` do projeto
   - Substitua o `icon-192.png` existente quando perguntado
   - O `icon-512.png` é novo, apenas adicione

6. ☐ Verifique se estão no lugar certo
   ```
   /public/icon-192.png  ✅
   /public/icon-512.png  ✅
   ```

### ☐ ETAPA 3: Rebuild do Projeto

**OPÇÃO A - Usando Script Automatizado (Recomendado):**

7. ☐ Execute o script de rebuild
   - **Windows:** Clique duas vezes em `REBUILD_COM_ICONES_NOVOS.bat`
   - **Linux/Mac:** Execute `./REBUILD_COM_ICONES_NOVOS.sh`
   - O script fará tudo automaticamente

**OPÇÃO B - Manualmente:**

7. ☐ Abra o terminal na pasta do projeto

8. ☐ Execute os comandos:
   ```bash
   npm run build
   npx cap sync android
   npx cap open android
   ```

### ☐ ETAPA 4: Compilar no Android Studio

9. ☐ Quando o Android Studio abrir:
   - ☐ Build → Clean Project
   - ☐ Build → Rebuild Project
   - ☐ Build → Build APK(s)

10. ☐ Aguarde a compilação terminar
    - Pode demorar alguns minutos
    - Aguarde até ver "BUILD SUCCESSFUL"

### ☐ ETAPA 5: Instalar no Celular

11. ☐ Localize o APK gerado
    - Caminho: `/android/app/build/outputs/apk/debug/app-debug.apk`

12. ☐ Desinstale a versão antiga do app no celular
    - Configurações → Apps → ALE-RR Top 5 → Desinstalar

13. ☐ Instale o novo APK
    - Transfira o APK para o celular (USB, email, etc.)
    - Abra o arquivo APK no celular
    - Toque em "Instalar"
    - Se necessário, permita instalação de fontes desconhecidas

### ☐ ETAPA 6: Verificação Final

14. ☐ Abra o app no celular

15. ☐ Verifique se os ícones estão corretos:
    - ☐ Ícone na tela inicial está bonito (troféu + gradiente)
    - ☐ Splash screen mostra o ícone ao abrir
    - ☐ Notificações mostram o ícone correto

---

## 🎉 SUCESSO!

Se todos os itens acima estão marcados ✅, seu app está com os ícones profissionais instalados!

---

## ❌ PROBLEMAS COMUNS

### Ícone não aparece na tela inicial:
- Desinstale completamente o app antigo
- Reinicie o celular
- Instale novamente o APK

### Erro ao compilar no Android Studio:
- Verifique se os arquivos PNG estão realmente em `/public/`
- Execute: Build → Clean Project → Rebuild Project

### Ícones com qualidade ruim:
- Certifique-se de ter baixado os ícones do gerador HTML
- Não use ícones redimensionados manualmente
- Use sempre os arquivos gerados pelo `GERAR_ICONES_PNG.html`

### Script de rebuild não funciona:
- Certifique-se de estar na pasta raiz do projeto
- Verifique se tem Node.js instalado: `node --version`
- Verifique se tem npm instalado: `npm --version`

---

## 📚 ARQUIVOS DE AJUDA

Se precisar de mais detalhes, consulte:

- `/COMO_GERAR_ICONES.md` - Guia completo de geração
- `/ICONS_GUIDE.md` - Métodos alternativos
- `/public/GERAR_ICONES_PNG.html` - Gerador automático

---

## 💡 DICA PROFISSIONAL

Sempre que fizer alterações nos ícones:
1. Desinstale o app antigo
2. Rebuild completo no Android Studio
3. Reinstale o APK novo
4. Reinicie o celular para garantir

---

**Boa sorte no concurso ALE-RR! 🏆📚**
