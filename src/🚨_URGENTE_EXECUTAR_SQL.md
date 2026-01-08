# 🚨 ERRO CRÍTICO CORRIGIDO - EXECUTAR SQL IMEDIATAMENTE

## ❌ **PROBLEMA IDENTIFICADO:**

```
Erro ao buscar questões: {
  "code": "PGRST202",
  "message": "Could not find the function public.get_smart_questions"
}
```

**CAUSA:** A função RPC `get_smart_questions` não existe no banco de dados Supabase.

---

## ✅ **SOLUÇÃO:**

Execute o SQL completo no **SQL Editor do Supabase**.

### 📋 **PASSO A PASSO:**

1. **Abra o Supabase Dashboard**
   - Vá para: https://supabase.com/dashboard
   - Selecione seu projeto **Gabaritoo**

2. **Abra o SQL Editor**
   - No menu lateral esquerdo, clique em **"SQL Editor"**
   - Clique em **"New Query"**

3. **Copie TODO o conteúdo do arquivo:**
   ```
   /supabase/migrations/002_create_rpc_functions.sql
   ```

4. **Cole no SQL Editor e execute**
   - Cole todo o código SQL
   - Clique no botão **"RUN"** (ou pressione `Ctrl+Enter`)

5. **Aguarde a confirmação**
   - Você deve ver: **"Success. No rows returned"**
   - Isso significa que as 4 funções foram criadas com sucesso!

---

## 🎯 **O QUE SERÁ CRIADO:**

### 1️⃣ **update_question_progress**
- Atualiza progresso individual de cada questão
- Aplica regras de masterização (>4 acertos)
- Marca questões críticas (>6 erros)

### 2️⃣ **update_user_profile**
- Atualiza XP do usuário
- Incrementa contador de questões respondidas
- Registra último acesso

### 3️⃣ **get_user_stats**
- Retorna estatísticas completas do dashboard
- Calcula acurácia (%)
- Conta questões masterizadas/críticas

### 4️⃣ **get_smart_questions** ⭐ **[NOVA - CORRIGE O ERRO]**
- **Algoritmo inteligente de seleção:**
  - 70% questões novas (nunca respondidas)
  - 30% questões erradas (para revisão)
  - Filtra por perfil de concurso
  - Exclui questões masterizadas
  - Prioriza questões com mais erros

---

## 🧪 **TESTE (Opcional):**

Após executar o SQL, você pode testar se funcionou:

```sql
-- Ver se as funções foram criadas
SELECT routine_name 
FROM information_schema.routines 
WHERE routine_schema = 'public' 
  AND routine_name LIKE '%smart%';

-- Deve retornar: get_smart_questions
```

---

## 🔒 **SEGURANÇA:**

As funções possuem permissões adequadas:
- ✅ `authenticated` users podem executar
- ✅ `anon` users podem executar (guest mode)
- ✅ RLS (Row Level Security) será aplicado automaticamente

---

## 🚀 **DEPOIS DE EXECUTAR:**

1. **Feche o app** (se estiver aberto)
2. **Abra novamente**
3. **Tente usar o Quiz Inteligente**
4. **Deve funcionar perfeitamente!** ✨

---

## 📞 **SE AINDA DER ERRO:**

Verifique:
1. Se o SQL foi executado no **projeto correto**
2. Se apareceu **"Success"** sem erros
3. Se as questões existem na tabela `questions`

---

## 🎉 **RESULTADO ESPERADO:**

Após executar o SQL:
- ✅ Quiz Inteligente funcionará
- ✅ Modo Simulado funcionará
- ✅ Sistema de revisão 70/30 ativo
- ✅ Filtro por perfil de concurso ativo

---

**🔥 EXECUTE AGORA E O ERRO DESAPARECERÁ IMEDIATAMENTE!**
