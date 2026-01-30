# 🎫 CÓDIGOS DE VOUCHER ATIVOS

## 📋 **LISTA DE CUPONS DISPONÍVEIS**

Última atualização: **30/01/2025**

---

## 🎁 **VOUCHERS DE 1 MÊS** (30 dias de premium)

| Código | Descrição | Status |
|--------|-----------|--------|
| `GABARITOO2024` | Cupom de lançamento - 1 mês grátis | ✅ Ativo |
| `PROMO30DIAS` | Cupom promocional - 30 dias premium | ✅ Ativo |
| `BEMVINDO` | Cupom de boas-vindas | ✅ Ativo |

---

## 👑 **VOUCHERS DE 1 ANO** (365 dias de premium)

| Código | Descrição | Status |
|--------|-----------|--------|
| `GABARITOO1ANO` | Cupom especial - 1 ano grátis | ✅ Ativo |
| `CONCURSEIRO2024` | Cupom anual para concurseiros | ✅ Ativo |

---

## 📱 **COMO USAR:**

1. Abra o app **Gabaritoo**
2. Toque em **⚙️ Ajustes** (engrenagem no topo)
3. Role até a seção **"Tem um cupom?"**
4. Digite um dos códigos acima (sem espaços)
5. Toque em **"🎁 Resgatar Cupom"**
6. Pronto! Premium ativado! 🎉

---

## ⚠️ **REGRAS:**

- ✅ Cada código pode ser usado **1 vez por dispositivo**
- ✅ Códigos são **case-insensitive** (maiúsculas/minúsculas)
- ✅ Ativação é **instantânea**
- ❌ Não é possível acumular vouchers
- ❌ Se já for premium, o voucher não pode ser usado

---

## 🎯 **EXEMPLOS DE USO:**

### **Para Instagram/Facebook:**
```
🎁 CUPOM GRÁTIS! 🎁

Ganhe 1 MÊS de premium no Gabaritoo!

Use o código: GABARITOO2024

👉 Baixe o app e resgate agora!
```

### **Para WhatsApp:**
```
🚀 Oi! Tá estudando pra concurso?

Usa esse cupom no Gabaritoo:
BEMVINDO

Ganha 30 dias de premium GRÁTIS! 🎁
```

### **Para E-mail:**
```
Olá, concurseiro(a)!

Preparamos um presente especial para você:

Código: GABARITOO2024
Benefício: 1 mês de acesso premium

Para resgatar:
1. Baixe o app Gabaritoo
2. Vá em Ajustes > Tem um cupom?
3. Digite o código acima
4. Aproveite todos os recursos premium!

Bons estudos! 📚
```

---

## 🔧 **PARA ADMINISTRADORES:**

### **Como adicionar novos códigos:**

Edite o arquivo `/services/VoucherService.ts` e adicione no array `VOUCHERS`:

```typescript
{
  code: 'NOVOCODIGO',
  type: 'monthly', // ou 'annual'
  description: 'Descrição do cupom'
},
```

### **Como desativar um código:**

Remova ou comente a linha do código no array `VOUCHERS`.

### **Como ver quais códigos foram usados:**

Abra o DevTools → Application → LocalStorage → `gabaritoo_used_vouchers`

---

## 📊 **ESTATÍSTICAS DE USO**

*(Para implementar no futuro)*

- Total de vouchers criados: **5**
- Vouchers mensais: **3**
- Vouchers anuais: **2**
- Vouchers usados: *Consultar localStorage*

---

## 🎁 **IDEIAS DE CAMPANHAS:**

### **1. Lançamento do App:**
- Código: `LANCAMENTO2024`
- Duração: 1 mês
- Público: Primeiros 100 usuários

### **2. Parceria com Influencer:**
- Código: `INFLUENCER_NOME`
- Duração: 1 mês
- Público: Seguidores do influencer

### **3. Sorteio nas Redes:**
- Código: `SORTEIO_JAN`
- Duração: 1 ano
- Público: Vencedor do sorteio

### **4. Programa de Indicação:**
- Código: `INDIQUE_GANHE`
- Duração: 1 mês
- Público: Quem indicar 3 amigos

### **5. Black Friday:**
- Código: `BLACKFRIDAY2024`
- Duração: 1 ano
- Público: Geral (limitado a 500 usos)

---

## 📞 **SUPORTE:**

Problemas com voucher?
- WhatsApp: (95) 99123-4567
- E-mail: suporte@gabaritoo.com

---

**Versão:** 1.0  
**Última atualização:** 30/01/2025  
**Vouchers ativos:** 5  
