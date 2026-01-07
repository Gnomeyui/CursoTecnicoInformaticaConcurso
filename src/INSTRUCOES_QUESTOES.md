# 📝 INSTRUÇÕES PARA ADICIONAR QUESTÕES

## 📊 Estrutura da Questão

Cada questão no arquivo `/data/questions.ts` deve seguir este formato:

```typescript
{
  id: 1,                              // ID único (número sequencial)
  subject: 'Informática',             // Matéria (ver opções abaixo)
  difficulty: 'medium',               // Dificuldade: 'easy', 'medium' ou 'hard'
  question: 'Qual protocolo é...',    // Texto da pergunta
  options: [                          // 4 alternativas
    'Opção A',
    'Opção B',
    'Opção C',
    'Opção D'
  ],
  correctAnswer: 2,                   // Índice da resposta correta (0-3)
  explanation: 'Explicação...',       // Explicação da resposta correta
  
  // ⭐ NOVOS CAMPOS (OPCIONAIS) ⭐
  banca: 'CESPE/CEBRASPE',           // Banca organizadora (opcional)
  ano: 2024,                          // Ano da prova (opcional)
  concurso: 'ALE-RR - Técnico'       // Nome do concurso (opcional)
}
```

---

## 📚 Matérias Disponíveis

Escolha uma destas opções para o campo `subject`:

- `'Informática'`
- `'Legislação'`
- `'Português'`
- `'LGPD'`
- `'Governança de TI'`

---

## 🎯 Níveis de Dificuldade

- `'easy'` - Questões básicas/introdutórias
- `'medium'` - Questões intermediárias
- `'hard'` - Questões avançadas/complexas

---

## 🏛️ Bancas Organizadoras Comuns

Use uma destas para o campo `banca` (opcional):

- `'CESPE/CEBRASPE'`
- `'FCC'`
- `'FGV'`
- `'VUNESP'`
- `'IBFC'`
- `'AOCP'`
- `'IDECAN'`
- `'QUADRIX'`
- `'IADES'`
- `'CONSULPLAN'`
- `'Outra'`

---

## ✅ Exemplo Completo COM Dados da Prova

```typescript
{
  id: 25,
  subject: 'Informática',
  difficulty: 'hard',
  question: 'Qual algoritmo de criptografia é considerado assimétrico?',
  options: [
    'AES',
    'DES',
    'RSA',
    'Blowfish'
  ],
  correctAnswer: 2,
  explanation: 'RSA é um algoritmo de criptografia assimétrica que usa par de chaves pública/privada.',
  banca: 'CESPE/CEBRASPE',
  ano: 2024,
  concurso: 'ALE-RR - Técnico em Informática'
}
```

---

## ✅ Exemplo Completo SEM Dados da Prova

Para questões genéricas ou de estudo, você pode OMITIR os campos `banca`, `ano` e `concurso`:

```typescript
{
  id: 26,
  subject: 'Português',
  difficulty: 'easy',
  question: 'Qual é o plural de "irmão"?',
  options: [
    'Irmãos',
    'Irmães',
    'Irmões',
    'Irmans'
  ],
  correctAnswer: 0,
  explanation: 'O plural de "irmão" é "irmãos".'
  // Sem banca, ano ou concurso - campos opcionais!
}
```

---

## 🎨 Como os Dados Aparecem no App

### Na Tela de Quiz:

Quando uma questão tem os campos preenchidos, aparece assim:

```
┌─────────────────────────────────────┐
│ 📘 Informática  🟡 Médio           │
│                                     │
│ Banca: CESPE/CEBRASPE  Ano: 2024   │
│ Concurso: ALE-RR - Técnico         │
│ ─────────────────────────────────  │
│                                     │
│ Qual protocolo é usado para...     │
│                                     │
│ ○ A) FTP                           │
│ ○ B) HTTP                          │
│ ● C) SFTP                          │
│ ○ D) SMTP                          │
└─────────────────────────────────────┘
```

---

## 📋 Checklist para Adicionar Questão

- [ ] ID único e sequencial
- [ ] Matéria válida (uma das 5 opções)
- [ ] Dificuldade definida (easy/medium/hard)
- [ ] Pergunta clara e objetiva
- [ ] Exatamente 4 alternativas
- [ ] Índice da resposta correta (0 a 3)
- [ ] Explicação detalhada
- [ ] (Opcional) Banca organizadora
- [ ] (Opcional) Ano da prova
- [ ] (Opcional) Nome do concurso

---

## 💡 Dicas Importantes

1. **IDs Únicos**: Sempre use o próximo número disponível
2. **Alternativas Balanceadas**: Distribua respostas corretas entre A, B, C e D
3. **Explicações Claras**: Sempre explique POR QUE a resposta está correta
4. **Dados da Prova**: Preencha quando souber a origem da questão
5. **Embaralhamento Automático**: As alternativas são embaralhadas automaticamente no app!

---

## 🔄 Sistema Inteligente

O app possui um **sistema de revisão automática**:

- ✅ Questões erradas aparecem novamente (até 2 vezes)
- ✅ 30% das questões de cada sessão são revisões
- ✅ Alternativas são embaralhadas a cada vez
- ✅ Badge "🔄 Revisão" indica questões para revisar

---

## 🚀 Pronto para Adicionar!

Agora você pode adicionar quantas questões quiser no arquivo `/data/questions.ts`!

**Boa sorte nos estudos para ALE-RR TOP 1! 🏆**
