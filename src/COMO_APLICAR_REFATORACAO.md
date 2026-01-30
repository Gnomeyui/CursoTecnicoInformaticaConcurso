# 🚀 COMO APLICAR A REFATORAÇÃO 10/10

## ⚡ **INÍCIO RÁPIDO:**

### **1. Mover Documentação (PRIMEIRO!)**

Execute no terminal:

```bash
# Unix/Linux/Mac
chmod +x MOVER_DOCUMENTACAO.md
# Depois copie e execute os comandos do arquivo

# OU use o script diretamente:
mkdir -p docs && \
mv *.md docs/ 2>/dev/null; \
mv INICIO_RAPIDO.txt docs/ 2>/dev/null

# Mover de volta apenas os essenciais:
mv docs/README.md . && \
mv docs/MOVER_DOCUMENTACAO.md . && \
mv docs/REFATORACAO_10_10_GUIA.md . && \
mv docs/COMO_APLICAR_REFATORACAO.md .
```

---

### **2. Substituir AppShell por Versão Refatorada**

**Opção A: Testar lado a lado (Recomendado)**

```bash
# 1. Renomear o antigo
mv app/AppShell.tsx app/AppShell.old.tsx

# 2. Renomear o novo
mv app/AppShell.refactored.tsx app/AppShell.tsx

# 3. Testar
npm run dev

# 4. Se funcionar, deletar o antigo:
rm app/AppShell.old.tsx
```

**Opção B: Substituir direto**

```bash
rm app/AppShell.tsx
mv app/AppShell.refactored.tsx app/AppShell.tsx
```

---

### **3. Validar que funciona**

```bash
# Compilar TypeScript
npm run build

# Se tiver erros, ajuste os tipos
# Se compilar OK, testar o app:
npm run dev
```

---

## 🎯 **APLICAR EM OUTROS COMPONENTES:**

### **Template para Refatoração:**

Use este template para refatorar qualquer componente:

#### **1. Criar o Hook**

```typescript
// /hooks/useSeuComponente.ts

import { useState, useEffect, useCallback } from 'react';

// TIPOS
export interface UseSeuComponenteReturn {
  // Estado
  data: YourDataType | null;
  loading: boolean;
  error: Error | null;
  
  // Handlers
  handleAction: () => void;
  handleRefresh: () => void;
}

// HOOK
export function useSeuComponente(): UseSeuComponenteReturn {
  const [data, setData] = useState<YourDataType | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // Lógica aqui
  useEffect(() => {
    // ...
  }, []);

  const handleAction = useCallback(() => {
    // ...
  }, []);

  return {
    data,
    loading,
    error,
    handleAction,
    handleRefresh: () => {},
  };
}
```

#### **2. Refatorar o Componente**

```typescript
// /components/SeuComponente.tsx

import React, { memo } from 'react';
import { useSeuComponente } from '../hooks/useSeuComponente';
import { ErrorBoundary } from './ErrorBoundary';

export const SeuComponente = memo(() => {
  const { 
    data, 
    loading, 
    error, 
    handleAction 
  } = useSeuComponente();

  if (loading) return <div>Carregando...</div>;
  if (error) return <div>Erro: {error.message}</div>;

  return (
    <ErrorBoundary>
      <div>
        {/* SEU JSX AQUI */}
      </div>
    </ErrorBoundary>
  );
});

SeuComponente.displayName = 'SeuComponente';
```

---

## 📝 **CHECKLIST POR COMPONENTE:**

Ao refatorar cada componente, marque:

- [ ] ✅ Criar hook customizado
- [ ] ✅ Mover toda lógica para o hook
- [ ] ✅ Componente só tem JSX
- [ ] ✅ TypeScript estrito (zero `any`)
- [ ] ✅ Usar `memo` no componente
- [ ] ✅ Usar `useCallback` nos handlers
- [ ] ✅ Adicionar ErrorBoundary
- [ ] ✅ Testar no navegador
- [ ] ✅ Build sem erros

---

## 🎯 **ORDEM DE REFATORAÇÃO SUGERIDA:**

Comece pelos mais usados:

1. ✅ **AppShell** (FEITO!)
2. 🔲 **Dashboard** - Tela principal
3. 🔲 **StudySession** - Sessão de estudo
4. 🔲 **Settings** - Configurações
5. 🔲 **Statistics** - Estatísticas
6. 🔲 **SimulatedExam** - Simulados
7. 🔲 **Achievements** - Conquistas
8. 🔲 **ProfileSelector** - Seletor de perfil

---

## 🐛 **RESOLUÇÃO DE PROBLEMAS:**

### **Erro: "Cannot find module"**

```bash
# Verificar imports relativos
# Antes: import { X } from '../hooks/useX'
# Depois: import { X } from '@/hooks/useX'

# Configurar paths no tsconfig.json:
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

### **Erro: "Type 'any' is not assignable"**

```typescript
// ❌ Antes
const data: any = fetchData();

// ✅ Depois
interface MyData {
  id: string;
  name: string;
}

const data: MyData = fetchData();
```

### **App não compila após refatoração**

```bash
# 1. Limpar cache
rm -rf node_modules
rm -rf dist
npm install

# 2. Verificar imports quebrados
npm run build 2>&1 | grep "error"

# 3. Corrigir um por um
```

---

## 💡 **DICAS:**

### **Performance:**

```typescript
// ✅ BOM: Memoizar componentes pesados
const HeavyComponent = memo(({ data }) => {
  // ...
});

// ✅ BOM: useCallback em handlers
const handleClick = useCallback(() => {
  // ...
}, [dependencies]);

// ✅ BOM: useMemo em cálculos pesados
const expensiveValue = useMemo(() => {
  return complexCalculation(data);
}, [data]);
```

### **TypeScript:**

```typescript
// ✅ BOM: Tipos estritos
interface User {
  id: string;
  name: string;
  email: string;
}

// ❌ RUIM: any
const user: any = getUser();

// ✅ BOM: Type guards
function isUser(obj: unknown): obj is User {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'id' in obj &&
    'name' in obj
  );
}
```

---

## 🎉 **RESULTADO FINAL:**

Após refatorar todos os componentes:

```
Antes:
- 📄 200 linhas por componente
- 🐌 Re-renders desnecessários
- ❌ any em todo lugar
- 🔥 Erros não tratados

Depois:
- ✅ 50-80 linhas por componente
- ⚡ Performance otimizada
- 💎 TypeScript estrito
- 🛡️ Error boundaries
- 🧪 Fácil de testar
```

---

**Boa sorte na refatoração! 🚀**
