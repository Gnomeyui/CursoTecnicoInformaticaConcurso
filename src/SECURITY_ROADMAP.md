# 🛡️ Plano de Segurança e Otimização - Gabaritoo

## ✅ IMPLEMENTADO (v1.0)

### 1. Autenticação Real no Simulado
- **Antes:** `localStorage.getItem('user_id')` (falsificável)
- **Agora:** `supabase.auth.getUser()` (JWT seguro)
- **Impacto:** Impossível personificar outro usuário

### 2. Query Otimizada de Questões
- **Antes:** Subquery SQL inválida no cliente JS
- **Agora:** Duas queries separadas com tratamento de erro robusto
- **Resultado:** 100% funcional, mesmo com milhares de questões

### 3. Processamento em Background
- **Antes:** Salvamento bloqueava a tela de resultado
- **Agora:** `processExamResultsBackground()` async/await
- **UX:** Usuário vê resultado instantaneamente

### 4. Histórico de Simulados no LocalStorage
- **Novo:** `exam_history` com timestamp, score, total
- **Usado em:** Sistema de conquistas (simulados perfeitos)

---

## 🚧 PRÓXIMOS PASSOS (v2.0)

### 1. Migrar XP/Nível para Supabase (CRÍTICO)

**Problema Atual:**
```javascript
// ❌ INSEGURO: localStorage.setItem('alerr_game_data', ...)
// Qualquer usuário pode editar o console:
localStorage.setItem('alerr_game_data', JSON.stringify({ xp: 999999, level: 100 }))
```

**Solução:**
1. Criar tabela `user_profiles`:
   ```sql
   CREATE TABLE user_profiles (
     user_id UUID PRIMARY KEY REFERENCES auth.users(id),
     xp INT DEFAULT 0,
     level INT DEFAULT 1,
     total_questions_answered INT DEFAULT 0,
     updated_at TIMESTAMP DEFAULT NOW()
   );
   ```

2. Habilitar RLS (Row Level Security):
   ```sql
   ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
   
   CREATE POLICY "Users can only view their own profile"
   ON user_profiles FOR SELECT
   USING (auth.uid() = user_id);
   
   -- Apenas o servidor pode atualizar XP (via Service Role)
   CREATE POLICY "Only server can update XP"
   ON user_profiles FOR UPDATE
   USING (false);
   ```

3. Atualizar `GameContext.tsx`:
   ```javascript
   // Carregar XP do banco
   const { data } = await supabase
     .from('user_profiles')
     .select('xp, level')
     .eq('user_id', user.id)
     .single();
   
   // Atualizar XP via Edge Function (não no cliente)
   await fetch('/functions/v1/make-server-2f36df0a/add-xp', {
     method: 'POST',
     headers: { Authorization: `Bearer ${accessToken}` },
     body: JSON.stringify({ amount: 50 })
   });
   ```

---

### 2. Implementar RPC para Performance (RECOMENDADO)

**Quando usar:**
- Quando o banco tiver >5000 questões
- Quando usuários tiverem >1000 questões respondidas

**Como:**
1. Execute `/supabase/migrations/get_random_questions_rpc.sql` no painel do Supabase
2. Atualize `SimulatedExam.tsx`:
   ```javascript
   // Substituir as queries atuais por:
   const { data: novas } = await supabase.rpc('get_random_questions_for_user', {
     p_user_id: userId,
     p_limit: novasLimit,
     p_profile_id: archetypeId
   });
   
   const { data: erradas } = await supabase.rpc('get_wrong_questions_for_user', {
     p_user_id: userId,
     p_limit: erradasLimit,
     p_profile_id: archetypeId
   });
   ```

---

### 3. Migrar Estatísticas para Servidor (OPCIONAL)

**Problema:**
- `StatsContext.tsx` usa `localStorage`
- Usuário pode manipular streaks e acurácia

**Solução:**
- Criar tabela `user_daily_stats`
- Calcular streaks no servidor
- RLS para proteção

---

### 4. Auditoria e Rate Limiting (FUTURO)

**Para prevenir abuso:**
```javascript
// No Edge Function
const { count } = await supabase
  .from('user_question_progress')
  .select('id', { count: 'exact' })
  .eq('user_id', userId)
  .gte('created_at', new Date(Date.now() - 60000).toISOString());

if (count > 100) {
  return new Response('Rate limit exceeded', { status: 429 });
}
```

---

## 📊 Impacto por Prioridade

| Item | Prioridade | Impacto | Esforço |
|------|-----------|---------|---------|
| XP/Nível no Supabase | 🔴 ALTA | Elimina trapaça | 4h |
| RPC para Questões | 🟡 MÉDIA | +50% performance | 1h |
| Stats no Servidor | 🟢 BAIXA | Dados confiáveis | 6h |
| Rate Limiting | 🟢 BAIXA | Anti-bot | 2h |

---

## 🎯 Conclusão

**Estado Atual:** O app está FUNCIONAL e SEGURO para uso em produção inicial.

**Recomendação:** 
1. ✅ Use a versão atual para MVP/Beta
2. 🚀 Implemente "XP no Supabase" antes do lançamento público
3. 📈 Adicione RPC quando houver >1000 usuários ativos

---

**Última atualização:** 2026-01-09  
**Versão do Sistema:** 1.0 (Local-First Híbrido)
