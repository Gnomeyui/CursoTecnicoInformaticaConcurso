# ✅ CHECKLIST DE VALIDAÇÃO - Gabaritoo Android

Use este checklist após fazer o build para validar se todas as correções foram aplicadas com sucesso.

---

## 📱 TELA: DASHBOARD (Home)

### Card Principal (Gradiente)
- [ ] Fundo com gradiente colorido visível (azul → roxo, ou verde, conforme tema)
- [ ] Badge de streak (🔥 X dias) com fundo branco translúcido
- [ ] Título **"Vamos Estudar!"** em **BRANCO** (não preto/cinza)
- [ ] Texto motivacional em **BRANCO/CLARO** (abaixo do título)
- [ ] Botão "Começar Estudos" com fundo branco translúcido e texto branco
- [ ] Ícone de raio (⚡) visível ao fundo (opacidade baixa)

### Top Bar
- [ ] Texto "Foco Atual" em cinza claro/400
- [ ] Nome do cargo em **PRETO/CINZA ESCURO 800**
- [ ] Ícone chevron (>) visível
- [ ] Ícones de calendário e configurações em cinza

### Cards de Estatísticas (2 colunas)
- [ ] **Card "Nível X":**
  - [ ] Fundo branco limpo (não translúcido)
  - [ ] Texto "Nível X" em cinza 400
  - [ ] Número de XP em **PRETO/CINZA 800** (grande, bold)
  - [ ] "XP" em cinza 400 (pequeno)
  - [ ] Barra de progresso com cor do tema
  - [ ] Ícone de troféu ao fundo (cinza claro, opacidade 10%)

- [ ] **Card "Precisão":**
  - [ ] Fundo branco limpo (não translúcido)
  - [ ] Texto "Precisão" em cinza 400
  - [ ] Porcentagem em **PRETO/CINZA 800** (grande, bold)
  - [ ] Badge verde "GERAL" visível
  - [ ] Ícone de alvo ao fundo (cinza claro, opacidade 10%)

### Seção "Seu Progresso" / "Suas Matérias"
- [ ] Título em **PRETO/CINZA 800**
- [ ] Card branco com bordas visíveis
- [ ] Nomes das matérias em **PRETO/CINZA 800**
- [ ] Porcentagens em **PRETO/CINZA 800**
- [ ] Sem elementos esbranquiçados/lavados

### Menu Inferior (Bottom Navigation)
- [ ] Fundo branco com blur
- [ ] Borda cinza visível
- [ ] Botão ativo (Estudar) com fundo colorido do tema
- [ ] Ícone e texto do botão ativo em cor vibrante
- [ ] Botões inativos em cinza 400
- [ ] Todos os ícones visíveis (não lavados)

---

## 📝 TELA: QUIZ

### Cabeçalho
- [ ] Fundo branco
- [ ] Título da matéria em **PRETO/CINZA 800**
- [ ] Contador de questões em **PRETO/CINZA 800**
- [ ] Botão voltar visível

### Área da Questão
- [ ] Fundo branco/claro
- [ ] Texto da questão em **PRETO/CINZA 800**
- [ ] Enunciado legível (contraste adequado)

### Alternativas
- [ ] Fundo branco com bordas visíveis
- [ ] Texto das alternativas em **PRETO/CINZA 800**
- [ ] Letras (A, B, C, D) em **PRETO/CINZA 800**
- [ ] Hover/seleção com fundo colorido visível
- [ ] Alternativa selecionada claramente destacada

### Feedback (após responder)
- [ ] Alternativa correta com fundo VERDE visível
- [ ] Alternativa errada (se houver) com fundo VERMELHO visível
- [ ] Textos em branco sobre fundos coloridos

### Botões
- [ ] Botão "Confirmar" com cor vibrante do tema
- [ ] Botão "Próxima" com cor vibrante do tema
- [ ] Texto dos botões em branco
- [ ] Sem botões esbranquiçados/lavados

---

## 📊 TELA: STATISTICS (Stats)

### Cabeçalho
- [ ] Título "Estatísticas" em **PRETO/CINZA 800**
- [ ] Botão voltar visível

### Cards de Resumo
- [ ] Fundos brancos limpos
- [ ] Títulos em **PRETO/CINZA 800**
- [ ] Números/valores em **PRETO/CINZA 800** (grandes, bold)
- [ ] Ícones com cores vibrantes (azul, verde, roxo)

### Gráficos
- [ ] Barras/linhas com cores definidas (não pastéis lavados)
- [ ] Labels em **PRETO/CINZA 800**
- [ ] Eixos visíveis
- [ ] Legendas legíveis

### Lista de Matérias
- [ ] Nomes em **PRETO/CINZA 800**
- [ ] Porcentagens em **PRETO/CINZA 800**
- [ ] Barras de progresso com cores vibrantes

---

## 🏆 TELA: ACHIEVEMENTS (Conquistas)

### Badges Desbloqueadas
- [ ] Ícones com cores vibrantes (dourado, azul, verde, etc.)
- [ ] Títulos em **PRETO/CINZA 800**
- [ ] Descrições em cinza 600
- [ ] Fundos brancos limpos

### Badges Bloqueadas
- [ ] Ícones em cinza (não pretos)
- [ ] Títulos em cinza 400
- [ ] Descrições visíveis
- [ ] Sem elementos esbranquiçados

---

## ⚙️ TELA: SETTINGS (Configurações)

### Lista de Opções
- [ ] Títulos em **PRETO/CINZA 800**
- [ ] Subtítulos/descrições em cinza 600
- [ ] Ícones com cores definidas
- [ ] Fundos brancos limpos
- [ ] Divisores visíveis

### Seção Assinatura
- [ ] Card de plano atual com fundo colorido
- [ ] Texto visível (branco sobre colorido)
- [ ] Botão "Gerenciar" visível

---

## 🎯 TELA: SIMULADO

### Timer
- [ ] Números em **PRETO/CINZA 800** ou vermelho (se acabando)
- [ ] Fundo branco/claro

### Cards de Questões
- [ ] Numeração em **PRETO/CINZA 800**
- [ ] Status (respondida/não respondida) com cores vibrantes
- [ ] Fundos brancos limpos

---

## 🔴 PROBLEMAS COMUNS SE AINDA ESTIVER ERRADO

Se qualquer item acima NÃO estiver correto:

### Sintoma: Textos em branco/cinza claro sobre fundo branco
**Causa:** Cache do dispositivo ou build antigo  
**Solução:**
```bash
# Limpar e rebuildar:
rm -rf android/app/build android/.gradle dist
npm run build
npx cap sync android
```

### Sintoma: Gradientes aparecem cinzas
**Causa:** WebView desatualizado  
**Solução:** Atualizar "Android System WebView" na Play Store

### Sintoma: Tudo ainda esbranquiçado
**Causa:** App data antigo no dispositivo  
**Solução:** Configurações > Apps > Gabaritoo > Limpar dados

---

## ✅ VALIDAÇÃO COMPLETA

Se **TODOS** os itens acima estiverem marcados:

🎉 **PARABÉNS! AS CORREÇÕES FORAM APLICADAS COM SUCESSO!**

O app agora está com:
- ✅ Cores vibrantes e corretas
- ✅ Contraste adequado em todos os elementos
- ✅ Modo claro forçado (ignora dark mode do sistema)
- ✅ Experiência visual consistente no Android

---

## 📊 PONTUAÇÃO (Opcional)

Total de itens: **~60**  
Sua pontuação: **___/60**

- 60/60: ✅ Perfeito!
- 50-59: ⚠️ Bom, mas verifique os itens faltando
- 40-49: ⚠️ Precisa de ajustes
- <40: ❌ Execute o build limpo novamente

---

_Use este checklist para validar o app após cada build._  
_Guarde este arquivo para referência futura._
