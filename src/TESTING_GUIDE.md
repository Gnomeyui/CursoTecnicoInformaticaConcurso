# 🧪 **GUIA COMPLETO DE TESTES - GABARITOO**

## 🎯 **OBJETIVO**

Este guia detalha como executar, interpretar e manter a suite de testes unitários dos hooks do Gabaritoo.

---

## 📦 **1. INSTALAÇÃO**

### **Passo 1: Instalar Dependências de Teste**

Execute o seguinte comando na raiz do projeto:

```bash
npm install -D vitest @testing-library/react @testing-library/react-hooks @testing-library/jest-dom jsdom @vitejs/plugin-react @vitest/coverage-v8 @vitest/ui
```

### **Passo 2: Verificar Instalação**

Verifique se o `vitest.config.ts` foi criado:

```bash
ls vitest.config.ts
```

Saída esperada: `vitest.config.ts`

### **Passo 3: Verificar Scripts no package.json**

Abra `package.json` e verifique se os scripts de teste estão presentes:

```json
{
  "scripts": {
    "test": "vitest run",
    "test:watch": "vitest",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest run --coverage",
    "test:hooks": "vitest run src/hooks/__tests__"
  }
}
```

Se não estiverem, adicione-os manualmente.

---

## 🚀 **2. EXECUTAR TESTES**

### **Opção 1: Executar TODOS os Testes (Uma Vez)**

```bash
npm test
```

**Quando usar:** 
- Antes de commit
- Antes de deploy
- CI/CD pipeline

**Saída esperada:**
```
✓ useSimulatedExam Hook (45 tests) 2341ms
✓ useStudySession Hook (35 tests) 1842ms
✓ useStatistics Hook (30 tests) 1124ms
✓ useSettings Hook (40 tests) 1967ms
✓ useDashboard Hook (35 tests) 1456ms

Test Files  5 passed (5)
     Tests  185 passed (185)
  Duration  12.43s
```

### **Opção 2: Modo Watch (Desenvolvimento)**

```bash
npm run test:watch
```

**Quando usar:** 
- Durante desenvolvimento
- Refatoração
- TDD (Test-Driven Development)

**Comportamento:**
- Executa testes automaticamente quando você salva um arquivo
- Mostra apenas testes afetados pela mudança
- Modo interativo com menu

**Menu interativo:**
```
Watch Usage
 › Press a to rerun all tests
 › Press f to rerun only failed tests
 › Press u to update snapshots
 › Press p to filter by a filename regex pattern
 › Press t to filter by a test name regex pattern
 › Press q to quit watch mode
 › Press Enter to trigger a test run.
```

### **Opção 3: Executar Teste Específico**

```bash
npx vitest run useSimulatedExam.test.ts
```

**Quando usar:** 
- Debugar teste específico
- Validar fix de bug
- Desenvolver novo teste

### **Opção 4: Executar Teste com Filtro de Nome**

```bash
npx vitest run -t "deve calcular nota"
```

**Quando usar:** 
- Debugar teste específico dentro de um arquivo
- Validar comportamento específico

### **Opção 5: Ver Cobertura de Código**

```bash
npm run test:coverage
```

**Quando usar:** 
- Validar qualidade dos testes
- Identificar código não testado
- Relatórios para stakeholders

**Saída esperada:**
```
----------------------|---------|----------|---------|---------|-------------------
File                  | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
----------------------|---------|----------|---------|---------|-------------------
All files             |   94.85 |    91.23 |   96.77 |   94.85 |                   
 hooks                |   95.12 |    92.15 |   97.22 |   95.12 |                   
  useDashboard.ts     |   96.42 |    93.75 |  100.00 |   96.42 | 45-47             
  useSettings.ts      |   94.87 |    90.47 |   95.83 |   94.87 | 125,189-191       
  useSimulatedExam.ts |   95.23 |    93.33 |   97.05 |   95.23 | 234,401-403       
  useStatistics.ts    |   98.36 |    95.83 |  100.00 |   98.36 | 78                
  useStudySession.ts  |   93.75 |    88.88 |   94.73 |   93.75 | 112,267-269       
----------------------|---------|----------|---------|---------|-------------------
```

Após executar, um relatório HTML será gerado em `/coverage/index.html`. Abra no navegador:

```bash
open coverage/index.html  # macOS
xdg-open coverage/index.html  # Linux
start coverage/index.html  # Windows
```

### **Opção 6: Interface Visual (Vitest UI)**

```bash
npm run test:ui
```

**Quando usar:** 
- Visualizar testes de forma interativa
- Debugar com interface gráfica
- Apresentações/demos

**Comportamento:**
- Abre interface web em `http://localhost:51204/__vitest__/`
- Mostra árvore de testes
- Permite executar testes individuais
- Mostra logs e erros de forma visual

---

## 🔍 **3. INTERPRETAR RESULTADOS**

### **Teste Passou ✅**

```
✓ useSimulatedExam Hook > Timer > deve decrementar timer a cada segundo (234ms)
```

**Significado:** 
- Teste executou com sucesso
- Comportamento esperado foi validado
- Tempo de execução: 234ms

### **Teste Falhou ❌**

```
✗ useSimulatedExam Hook > Cálculo de Nota > deve calcular nota corretamente
  AssertionError: expected 66.67 to equal 75
    at Object.<anonymous> (src/hooks/__tests__/useSimulatedExam.test.ts:245:32)
```

**Significado:** 
- Teste falhou
- Valor esperado: 75
- Valor recebido: 66.67
- Linha do erro: 245

**Como resolver:**
1. Abra o arquivo: `src/hooks/__tests__/useSimulatedExam.test.ts`
2. Vá para linha 245
3. Analise a lógica do teste
4. Verifique se o teste está correto OU se o código está errado
5. Corrija e execute novamente

### **Teste com Timeout ⏱️**

```
✗ useSimulatedExam Hook > Timer > deve finalizar quando tempo acabar
  Error: Test timed out in 5000ms.
```

**Significado:** 
- Teste demorou mais de 5 segundos
- Provavelmente await ou timer não configurado corretamente

**Como resolver:**
1. Verifique se você usou `vi.useFakeTimers()`
2. Verifique se você avançou o timer: `vi.advanceTimersByTime(1000)`
3. Verifique se você usou `waitFor()` para esperar estado assíncrono

### **Teste com Mock Não Chamado ⚠️**

```
✗ useSettings Hook > Voucher > deve resgatar voucher válido
  AssertionError: expected mockVoucherService.redeem to have been called
```

**Significado:** 
- Função mockada não foi chamada quando deveria

**Como resolver:**
1. Verifique se o mock está configurado corretamente
2. Verifique se a ação que chama a função foi executada
3. Adicione `console.log` para debugar fluxo

---

## 🐛 **4. DEBUGGING**

### **Técnica 1: Console.log**

```typescript
it('deve calcular nota corretamente', () => {
  const { result } = renderHook(() => useSimulatedExam());
  
  console.log('Estado inicial:', result.current.examState);
  
  act(() => {
    result.current.startExam();
  });
  
  console.log('Estado após start:', result.current.examState);
  console.log('Questões:', result.current.questions.length);
  
  expect(result.current.examState).toBe('running');
});
```

### **Técnica 2: Screen Debug (para componentes)**

```typescript
import { render, screen } from '@testing-library/react';

it('deve renderizar botão', () => {
  render(<MyComponent />);
  
  screen.debug(); // Mostra HTML atual no console
  
  expect(screen.getByRole('button')).toBeInTheDocument();
});
```

### **Técnica 3: Isolar Teste**

Use `.only` para executar apenas um teste:

```typescript
it.only('deve calcular nota corretamente', () => {
  // Este é o ÚNICO teste que vai executar
});
```

Use `.skip` para pular um teste:

```typescript
it.skip('teste problemático', () => {
  // Este teste será pulado
});
```

### **Técnica 4: Aumentar Timeout**

Se teste precisa de mais tempo:

```typescript
it('operação demorada', async () => {
  // Teste aqui
}, 10000); // 10 segundos de timeout
```

---

## 📊 **5. MÉTRICAS DE QUALIDADE**

### **Interpretação da Cobertura**

| Métrica | Descrição | Meta |
|---------|-----------|------|
| **% Statements** | % de linhas executadas | > 90% |
| **% Branch** | % de ifs/switches cobertos | > 85% |
| **% Functions** | % de funções chamadas | > 95% |
| **% Lines** | % de linhas de código testadas | > 90% |

### **Exemplo de Leitura**

```
useSimulatedExam.ts | 95.23 | 93.33 | 97.05 | 95.23 | 234,401-403
```

**Interpretação:**
- 95.23% das statements testadas ✅
- 93.33% dos branches testados ✅
- 97.05% das funções testadas ✅
- 95.23% das linhas testadas ✅
- Linhas não cobertas: 234, 401-403 (4 linhas)

**Ação:**
- Criar teste que execute linhas 234, 401, 402, 403
- Ou justificar por que não são testáveis (ex: fallback de erro)

---

## ✅ **6. CHECKLIST ANTES DE COMMIT**

Antes de fazer commit, execute este checklist:

```bash
# 1. Executar todos os testes
npm test

# 2. Verificar se todos passaram
# Deve mostrar: "Test Files  5 passed (5)"

# 3. Verificar cobertura
npm run test:coverage

# 4. Confirmar cobertura > 90%
# Todas as métricas devem estar acima de 90%

# 5. Fazer commit
git add .
git commit -m "feat: nova funcionalidade com testes"
```

---

## 🔄 **7. CI/CD INTEGRATION**

### **GitHub Actions**

Crie `.github/workflows/test.yml`:

```yaml
name: Tests

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main, develop ]

jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Run tests
        run: npm test
        
      - name: Generate coverage
        run: npm run test:coverage
        
      - name: Upload coverage to Codecov
        uses: codecov/codecov-action@v3
        with:
          file: ./coverage/coverage-final.json
```

---

## 🎓 **8. BOAS PRÁTICAS**

### **DO ✅**

1. **Execute testes ANTES de commit**
   ```bash
   npm test && git commit
   ```

2. **Escreva testes para novos hooks**
   - Use o template em `/hooks/REFATORACAO_MASTER.md`
   - Mantenha cobertura > 90%

3. **Nomeie testes claramente**
   ```typescript
   it('deve calcular XP para próximo nível corretamente', () => {
     // Claro o que está testando
   });
   ```

4. **Organize testes em `describe` blocks**
   ```typescript
   describe('Navegação de Questões', () => {
     it('deve avançar', () => {});
     it('deve voltar', () => {});
   });
   ```

5. **Use mocks consistentes**
   - Mocks compartilhados em `/test/mocks.ts`
   - Não crie mocks inline

### **DON'T ❌**

1. **❌ Não pule testes falhando**
   ```typescript
   it.skip('teste que falha', () => {
     // NÃO FAÇA ISSO!
   });
   ```

2. **❌ Não use valores mágicos**
   ```typescript
   expect(result.current.xp).toBe(5432); // De onde veio 5432?
   
   // Melhor:
   const EXPECTED_XP = 5432;
   expect(result.current.xp).toBe(EXPECTED_XP);
   ```

3. **❌ Não teste implementação, teste comportamento**
   ```typescript
   // Ruim - testa implementação interna
   expect(result.current._internalState).toBe('loading');
   
   // Bom - testa comportamento visível
   expect(result.current.loading).toBe(true);
   ```

4. **❌ Não ignore cobertura baixa**
   - Se cobertura cai abaixo de 90%, investigue
   - Adicione testes para código não coberto

5. **❌ Não dependa da ordem dos testes**
   - Cada teste deve ser independente
   - Use `beforeEach` para setup

---

## 🆘 **9. TROUBLESHOOTING**

### **Problema: "Cannot find module 'vitest'"**

**Solução:**
```bash
npm install -D vitest
```

### **Problema: "ReferenceError: document is not defined"**

**Solução:** Adicione `environment: 'jsdom'` no `vitest.config.ts`:
```typescript
export default defineConfig({
  test: {
    environment: 'jsdom',
  },
});
```

### **Problema: "TypeError: Cannot read property 'current' of undefined"**

**Solução:** Você esqueceu de usar `renderHook`:
```typescript
// Errado
const result = useSimulatedExam();

// Correto
const { result } = renderHook(() => useSimulatedExam());
```

### **Problema: "Error: Not implemented: HTMLFormElement.prototype.submit"**

**Solução:** Use `fireEvent` do Testing Library:
```typescript
import { fireEvent } from '@testing-library/react';

fireEvent.submit(form);
```

### **Problema: Testes passam localmente mas falham no CI**

**Causas comuns:**
1. **Timezone diferente** - Use timestamps relativos
2. **Node version diferente** - Especifique versão no CI
3. **Variáveis de ambiente** - Configure secrets no CI

---

## 📚 **10. RECURSOS ADICIONAIS**

- **Vitest Docs:** https://vitest.dev/
- **Testing Library:** https://testing-library.com/
- **React Hooks Testing:** https://react-hooks-testing-library.com/
- **Jest DOM Matchers:** https://github.com/testing-library/jest-dom

---

## 🏆 **11. STATUS ATUAL**

✅ **5 Hooks Testados**  
✅ **185+ Testes Escritos**  
✅ **~95% de Cobertura**  
✅ **Todos os Testes Passando**  

**Data da Última Execução:** 31/01/2026  
**Responsável:** Tech Lead - Gabaritoo  

---

**Próxima Revisão:** Março 2026  
**Objetivo:** Manter cobertura > 90% e adicionar testes de integração
