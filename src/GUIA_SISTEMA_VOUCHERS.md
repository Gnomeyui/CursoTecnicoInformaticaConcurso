# 🎫 SISTEMA DE VOUCHERS - GUIA COMPLETO

## 📋 **ÍNDICE**

1. [O que é?](#o-que-é)
2. [Como funciona?](#como-funciona)
3. [Como usar?](#como-usar)
4. [Como adicionar novos vouchers?](#como-adicionar-novos-vouchers)
5. [Segurança e Limitações](#segurança-e-limitações)
6. [Melhorias Futuras](#melhorias-futuras)

---

## 🎯 **O QUE É?**

Sistema de **cupons promocionais** que permite ativar **1 mês ou 1 ano** de acesso premium gratuitamente através de códigos especiais.

### **Recursos:**
- ✅ Validação de códigos em tempo real
- ✅ Proteção contra reutilização (uso único por dispositivo)
- ✅ Ativação automática de plano premium
- ✅ Interface moderna na seção "Ajustes"
- ✅ Notificações de sucesso/erro
- ✅ Suporte para vouchers mensais e anuais

---

## 🔧 **COMO FUNCIONA?**

### **Fluxo do usuário:**

1. **Usuário FREE** acessa **Ajustes**
2. Vê a seção **"Tem um cupom?"**
3. Digite o código (ex: `GABARITOO2024`)
4. Clica em **"🎁 Resgatar Cupom"**
5. Sistema valida:
   - ✅ Código existe?
   - ✅ Código já foi usado?
   - ✅ Formato válido?
6. Se válido:
   - ✅ Ativa premium (1 mês ou 1 ano)
   - ✅ Marca código como usado
   - ✅ Mostra notificação de sucesso
   - ✅ Recarrega página (mostra status premium)
7. Se inválido:
   - ❌ Mostra mensagem de erro

---

## 📱 **COMO USAR?**

### **Para o usuário final:**

1. Abra o app **Gabaritoo**
2. Vá em **Ajustes** (ícone de engrenagem)
3. Role até **"Tem um cupom?"**
4. Digite o código no campo
5. Clique em **"🎁 Resgatar Cupom"**
6. Aguarde a validação
7. Pronto! Premium ativado! 🎉

### **Códigos de exemplo disponíveis:**

#### **Vouchers de 1 mês:**
- `GABARITOO2024` - Cupom de lançamento
- `ALERR30DIAS` - Cupom promocional
- `BEMVINDO` - Cupom de boas-vindas

#### **Vouchers de 1 ano:**
- `GABARITOO1ANO` - Cupom especial anual
- `CONCURSEIRO2024` - Cupom anual para concurseiros

---

## ➕ **COMO ADICIONAR NOVOS VOUCHERS?**

### **Passo 1: Editar o arquivo**

Abra o arquivo `/services/VoucherService.ts`

### **Passo 2: Encontrar a lista de vouchers**

Procure por:
```typescript
const VOUCHERS: Voucher[] = [
```

### **Passo 3: Adicionar novo voucher**

```typescript
const VOUCHERS: Voucher[] = [
  // ... vouchers existentes ...
  
  // 🎁 SEU NOVO CUPOM AQUI:
  {
    code: 'SEUCUPOM2024',           // Código (MAIÚSCULAS)
    type: 'monthly',                 // 'monthly' ou 'annual'
    description: 'Descrição do cupom' // Opcional
  },
];
```

### **Exemplo prático:**

```typescript
// Adicionar cupom de Natal (1 mês)
{
  code: 'NATAL2024',
  type: 'monthly',
  description: 'Promoção de Natal - 1 mês grátis'
},

// Adicionar cupom para influencer (1 ano)
{
  code: 'INFLUENCER123',
  type: 'annual',
  description: 'Cupom exclusivo para @seuperfil'
},
```

### **Passo 4: Salvar e testar**

1. Salve o arquivo
2. Recompile o app (se necessário)
3. Teste o novo código no app

---

## 🔐 **SEGURANÇA E LIMITAÇÕES**

### **⚠️ IMPORTANTE - AMBIENTE DE DESENVOLVIMENTO:**

Este sistema foi projetado para **testes e protótipos**. 

### **Limitações atuais:**

| Item | Status | Problema |
|------|--------|----------|
| Códigos visíveis no código-fonte | ⚠️ **SIM** | Qualquer pessoa pode ver os códigos |
| Validação no cliente (localStorage) | ⚠️ **SIM** | Pode ser burlado via DevTools |
| Proteção contra força bruta | ❌ **NÃO** | Pode tentar infinitos códigos |
| Uso único real (servidor) | ❌ **NÃO** | Apenas por dispositivo |
| Rastreamento de origem | ❌ **NÃO** | Não sabe quem gerou o código |

### **O que está protegido:**

✅ **Uso único por dispositivo** - Código marcado como usado no localStorage  
✅ **Validação de formato** - Apenas códigos da lista funcionam  
✅ **Feedback visual** - Usuário sabe se código é válido  

### **O que NÃO está protegido:**

❌ **Código visível** - Qualquer dev pode ver os códigos no código-fonte  
❌ **localStorage editável** - Usuário pode limpar localStorage e reusar  
❌ **Múltiplos dispositivos** - Mesmo código funciona em vários aparelhos  
❌ **Força bruta** - Pode tentar códigos infinitamente  

---

## 🚀 **MELHORIAS FUTURAS (PRODUÇÃO)**

### **Para implementar em produção:**

#### **1. Backend de validação:**
```
✅ Mover lista de vouchers para banco de dados
✅ API REST para validação de códigos
✅ Registro de uso (usuário + data + IP)
✅ Limite de uso por código (ex: primeiros 100 usuários)
```

#### **2. Segurança:**
```
✅ Códigos gerados via UUID/nanoid
✅ Rate limiting (máximo 5 tentativas por minuto)
✅ Captcha após 3 tentativas erradas
✅ Criptografia dos códigos no banco
```

#### **3. Analytics:**
```
✅ Rastrear conversão por código
✅ Saber qual influencer/campanha gerou mais conversões
✅ Dashboard de vouchers ativos/usados
✅ Relatório de uso por período
```

#### **4. Features avançadas:**
```
✅ Vouchers com data de expiração
✅ Vouchers com limite de uso (ex: máximo 50 pessoas)
✅ Vouchers para recursos específicos (ex: apenas simulados)
✅ Vouchers com desconto percentual
✅ Sistema de afiliados com códigos únicos
```

### **Exemplo de implementação segura (Backend):**

```typescript
// ❌ NÃO FAÇA (atual - client-side)
const VOUCHERS = [
  { code: 'GABARITOO2024', type: 'monthly' }
];

// ✅ FAÇA (produção - server-side)
// Backend API
POST /api/vouchers/validate
Body: { code: 'GABARITOO2024', userId: 'user123' }

Response:
{
  valid: true,
  type: 'monthly',
  expiresAt: '2024-12-31'
}
```

---

## 📚 **RECURSOS ADICIONAIS**

### **Arquivos relacionados:**
- `/services/VoucherService.ts` - Lógica de validação
- `/services/AuthService.ts` - Ativação de planos
- `/components/Settings.tsx` - Interface do usuário
- `/domain/services/EntitlementService.ts` - Controle de acesso

### **Chaves do localStorage:**
- `gabaritoo_used_vouchers` - Lista de códigos já usados
- `gabaritoo_user` - Dados do usuário (incluindo status premium)

---

## ❓ **FAQ**

### **1. Posso usar o mesmo código em vários celulares?**
✅ **SIM** - Atualmente sim, pois a validação é por dispositivo (localStorage).  
⚠️ Em produção, isso deve ser corrigido com validação no servidor.

### **2. O que acontece se eu limpar os dados do app?**
❌ **Perde o histórico** - Se limpar localStorage, os códigos podem ser reutilizados.  
✅ **Mantém o premium** - O status premium está salvo em `gabaritoo_user`.

### **3. Posso criar códigos ilimitados?**
✅ **SIM** - Basta adicionar no array `VOUCHERS` do arquivo `VoucherService.ts`.

### **4. Como desativar um código?**
🔧 **Remova da lista** - Delete o objeto do array `VOUCHERS`.

### **5. Posso mudar a duraç��o do voucher?**
✅ **SIM** - Altere o campo `type` para `'monthly'` (1 mês) ou `'annual'` (1 ano).

---

## 🎁 **CASOS DE USO**

### **1. Campanha de lançamento:**
```typescript
{
  code: 'LANCAMENTO2024',
  type: 'monthly',
  description: 'Campanha de lançamento - 30 dias grátis'
}
```

### **2. Parceria com influencer:**
```typescript
{
  code: 'INFLUENCER_MARIA',
  type: 'annual',
  description: 'Cupom exclusivo @maria.concurseira - 1 ano grátis'
}
```

### **3. Sorteio nas redes sociais:**
```typescript
{
  code: 'SORTEIO123',
  type: 'monthly',
  description: 'Cupom do sorteio de Instagram - 1 mês grátis'
}
```

### **4. Programa de indicação:**
```typescript
{
  code: 'INDIQUE_GANHE',
  type: 'monthly',
  description: 'Cupom de indicação - 1 mês para indicado'
}
```

---

## ✅ **CHECKLIST DE IMPLEMENTAÇÃO**

- [x] ✅ Criar VoucherService
- [x] ✅ Integrar com AuthService
- [x] ✅ Criar interface na tela de Ajustes
- [x] ✅ Adicionar validação de códigos
- [x] ✅ Implementar proteção contra reutilização
- [x] ✅ Adicionar notificações de sucesso/erro
- [x] ✅ Criar documentação
- [ ] 🔲 Migrar para backend (produção)
- [ ] 🔲 Adicionar analytics
- [ ] 🔲 Implementar rate limiting
- [ ] 🔲 Adicionar expiração de vouchers

---

## 🎯 **RESUMO**

O sistema de vouchers está **100% funcional** para testes e protótipos!

✅ **Use agora para:**
- Testes internos
- Demonstrações
- Promoções pequenas (até 100 pessoas)

⚠️ **NÃO use para:**
- Produção em larga escala
- Vouchers de alto valor
- Campanhas com milhares de usuários

🚀 **Próximo passo:**
Migrar para backend antes de lançamento oficial!

---

**Criado em:** 30/01/2025  
**Versão:** 1.0  
**Status:** ✅ Completo e funcional  
