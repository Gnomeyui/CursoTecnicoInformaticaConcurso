# ⚠️ CONFIGURAÇÃO PENDENTE - WhatsApp Suporte

## 📞 Número do WhatsApp de Suporte

**ATENÇÃO:** O botão "Ajuda e Suporte" nas configurações do app está configurado com um número de exemplo.

### 📍 Localização do Código:
**Arquivo:** `/components/Settings.tsx`  
**Linha:** 235

```typescript
const phoneNumber = '5595991234567'; // ⚠️ SUBSTITUIR PELO NÚMERO REAL
```

---

## 🔧 Como Configurar:

### 1️⃣ **Obter o Número Completo:**
Formato: `[Código País][DDD][Número]`

**Exemplo Brasil:**
- Código do país: `55`
- DDD: `95` (Roraima)
- Número: `991234567`
- **Resultado:** `5595991234567`

### 2️⃣ **Editar o Código:**

Abra `/components/Settings.tsx` e localize a linha 235:

```typescript
// ANTES (exemplo):
const phoneNumber = '5595991234567';

// DEPOIS (substitua pelo seu número):
const phoneNumber = '5511987654321'; // Seu número real aqui
```

### 3️⃣ **Testar:**

Após alterar, teste clicando em:
**Configurações → Ajuda e Suporte**

O WhatsApp deve abrir com a mensagem pré-preenchida:
> "Olá! Preciso de ajuda com o Gabaritoo."

---

## 📝 Customizar a Mensagem (Opcional):

Se quiser alterar a mensagem padrão, edite a linha 236:

```typescript
// Mensagem atual:
const message = encodeURIComponent('Olá! Preciso de ajuda com o Gabaritoo.');

// Exemplo personalizado:
const message = encodeURIComponent('Olá! Tenho uma dúvida sobre o app Gabaritoo.');
```

---

## ✅ Checklist de Configuração:

- [ ] Substituir número do WhatsApp na linha 235
- [ ] Testar no navegador (`npm run dev`)
- [ ] Testar no Android (`npm run android:build`)
- [ ] Verificar se o WhatsApp abre corretamente
- [ ] Confirmar mensagem pré-preenchida

---

## 🚨 Importante:

- ⚠️ Não esqueça de remover o número de exemplo antes de publicar na Play Store
- ✅ Use um número dedicado ao suporte (não pessoal)
- 📱 Certifique-se que o número tem WhatsApp ativo
- 🌍 Inclua o código do país (55 para Brasil)

---

**Última atualização:** 12 de Janeiro de 2026  
**Status:** ⚠️ PENDENTE - Número de exemplo configurado
