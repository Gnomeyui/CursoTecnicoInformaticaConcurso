# 🧠 GUIA COMPLETO: Engine de Estudos Inteligente

## 📚 **O QUE É?**

Um sistema **definitivo** de distribuição inteligente de questões que:

✅ **Distribui** novas vs antigas (proporção adaptativa)  
✅ **Nivela** focando nas matérias com mais erros  
✅ **Embaralha** perguntas E alternativas (anti-decoreba)  
✅ **Persiste** histórico e estatísticas no localStorage  
✅ **Funciona** com suas 1.950 questões + flashcards  

---

## 🎯 **COMO FUNCIONA?**

### 1. **Proporção Adaptativa**
```
5 questões  → 1 revisão + 4 novas
10 questões → 3 revisão + 7 novas
15 questões → 4 revisão + 11 novas
50 questões → 20 revisão + 30 novas (40%)
```

### 2. **Peso por Matéria (O Cérebro)**
```typescript
Peso = 1 + (Taxa de Erro × 5)

Exemplo:
- Nunca viu: Peso 2.0 (introdução suave)
- 100% acerto: Peso 1.0 (manutenção)
- 50% erro: Peso 3.5 (atenção!)
- 100% erro: Peso 6.0 (URGENTE! Vai repetir muito)
```

### 3. **Roleta Viciada**
O sistema cria uma "roleta" onde matérias com mais erros aparecem **várias vezes**, aumentando a chance de serem sorteadas.

```typescript
// Se "Linux - Permissões" tem peso 4.0
// Ela é adicionada 8 vezes (4 × 2) na roleta
// Se "Português" tem peso 1.0
// Ela é adicionada 2 vezes (1 × 2) na roleta
```

### 4. **Embaralhamento Fisher-Yates**
- **Perguntas**: Ordem aleatória
- **Alternativas**: A, B, C, D embaralhados

---

## 🚀 **COMO USAR?**

### **Opção 1: Hook Simples (Recomendado)**

```typescript
import { useEngineEstudos } from '../hooks/useEngineEstudos';
import { getTodosBancoQuestoes } from '../lib/adaptadores';

function MeuComponente() {
  const { gerarSessao, registrarResposta, getEstatisticas } = useEngineEstudos();
  const banco = getTodosBancoQuestoes(); // Suas 1.950 questões

  // Gerar 10 questões inteligentes
  const handleIniciar = () => {
    const sessao = gerarSessao(banco, 10);
    console.log('Sessão gerada:', sessao);
    // Renderizar sessao[0], sessao[1]...
  };

  // Quando o usuário responder
  const handleResposta = (materia: string, idQuestao: string, acertou: boolean) => {
    registrarResposta(materia, idQuestao, acertou);
  };

  // Ver estatísticas
  const stats = getEstatisticas();
  console.log('Matérias com mais erros:', stats.materiasMaisErradas);

  return <div>...</div>;
}
```

### **Opção 2: Uso Direto (Avançado)**

```typescript
import { engineEstudos } from '../lib/EngineEstudos';
import { PerfilUsuario } from '../types/estudos';

// 1. Criar/Carregar perfil
const perfil: PerfilUsuario = {
  questoesRespondidasIds: new Set(['q_1', 'q_2', 'q_50']),
  statsPorMateria: {
    'Linux - Permissões': { 
      respondidas: 10, 
      erros: 8, 
      streak: 0, 
      ultimaRevisao: new Date() 
    }
  }
};

// 2. Gerar sessão
const sessao = engineEstudos.gerarSessaoDeEstudos(banco, perfil, 50);

// 3. Registrar resposta
engineEstudos.registrarResposta(perfil, 'Redes - TCP/IP', 'q_999', true);

// 4. Salvar perfil
localStorage.setItem('perfil', JSON.stringify({
  questoesRespondidasIds: Array.from(perfil.questoesRespondidasIds),
  statsPorMateria: perfil.statsPorMateria
}));
```

---

## 📦 **ADAPTADORES**

### Converter Formato Antigo → Novo

```typescript
import { getTodosBancoQuestoes, getTodosBancoFlashcards } from '../lib/adaptadores';

// Suas 1.950 questões no formato novo
const questoes = getTodosBancoQuestoes();

// Seus flashcards no formato novo
const flashcards = getTodosBancoFlashcards();

// Tudo junto
const tudo = [...questoes, ...flashcards];

// Filtrar por matéria
import { filtrarPorMateria } from '../lib/adaptadores';
const soProgramacao = filtrarPorMateria(questoes, 'Linux - Comandos');

// Listar matérias
import { getTodasMaterias } from '../lib/adaptadores';
const materias = getTodasMaterias(questoes); // ['Todas', 'Linux - Comandos', ...]
```

---

## 🎨 **FORMATO DOS DADOS**

### **ItemEstudo (Novo Formato Universal)**
```typescript
{
  id: "q_1",
  tipo: "QUESTAO", // ou "FLASHCARD"
  materia: "Linux - Permissões",
  pergunta: "Qual comando altera o dono?",
  alternativas: [
    { id: "opt_0", texto: "chmod", correta: false },
    { id: "opt_1", texto: "chown", correta: true },
    { id: "opt_2", texto: "chgrp", correta: false },
    { id: "opt_3", texto: "umask", correta: false }
  ],
  explicacao: "chown = change owner",
  dificuldade: "medio"
}
```

### **PerfilUsuario**
```typescript
{
  questoesRespondidasIds: Set<string>, // IDs já respondidos
  statsPorMateria: {
    "Linux - Permissões": {
      respondidas: 10,
      erros: 8,
      streak: 0, // Sequência de acertos
      ultimaRevisao: Date
    }
  }
}
```

---

## 🔧 **INTEGRAÇÃO COM StudySession.tsx**

### **Passo 1: Importar**
```typescript
import { useEngineEstudos } from '../hooks/useEngineEstudos';
import { getTodosBancoQuestoes } from '../lib/adaptadores';
import { ItemEstudo } from '../types/estudos';
```

### **Passo 2: No Componente**
```typescript
export function StudySession({ onBack, onScoreUpdate }: Props) {
  const { gerarSessao, registrarResposta } = useEngineEstudos();
  const [sessaoAtual, setSessaoAtual] = useState<ItemEstudo[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Ao iniciar
  const iniciarSessao = () => {
    const banco = getTodosBancoQuestoes();
    const sessao = gerarSessao(banco, 10); // 10 questões
    setSessaoAtual(sessao);
  };

  // Ao responder
  const handleResposta = (alternativaId: string) => {
    const questaoAtual = sessaoAtual[currentIndex];
    const alternativa = questaoAtual.alternativas.find(a => a.id === alternativaId);
    
    if (!alternativa) return;

    // Registrar no perfil
    registrarResposta(
      questaoAtual.materia,
      questaoAtual.id,
      alternativa.correta
    );

    // Atualizar score
    if (alternativa.correta) {
      onScoreUpdate(dailyScore + 1, sessionTotal + 1);
    }

    // Próxima
    setCurrentIndex(prev => prev + 1);
  };

  // Renderizar
  const questao = sessaoAtual[currentIndex];
  return (
    <div>
      <h2>{questao?.pergunta}</h2>
      {questao?.alternativas.map(alt => (
        <button key={alt.id} onClick={() => handleResposta(alt.id)}>
          {alt.texto}
        </button>
      ))}
    </div>
  );
}
```

---

## 🐛 **PAINEL DE DEBUG**

Adicione ao Dashboard para testar:

```typescript
import { EngineDebugPanel } from '../components/EngineDebugPanel';

function Dashboard() {
  return (
    <div>
      {/* Seus componentes */}
      
      {/* Painel de Debug (remova em produção) */}
      <EngineDebugPanel />
    </div>
  );
}
```

O painel mostra:
- ✅ Total de questões no banco
- ✅ Seu progresso (respondidas, erros, taxa de acerto)
- ✅ Top 5 matérias com mais erros
- ✅ Botão para testar sessão
- ✅ Botão para resetar perfil

---

## 📊 **ESTATÍSTICAS**

```typescript
const { getEstatisticas, getStatMateria } = useEngineEstudos();

// Geral
const geral = getEstatisticas();
console.log(geral.materiasMaisErradas); // Top 5

// Específica
const linuxStat = getStatMateria('Linux - Permissões');
if (linuxStat) {
  console.log(`Você fez ${linuxStat.respondidas} questões`);
  console.log(`Errou ${linuxStat.erros} (${linuxStat.erros/linuxStat.respondidas*100}%)`);
  console.log(`Streak atual: ${linuxStat.streak}`);
}
```

---

## 🎯 **EXEMPLO REAL COM SUAS QUESTÕES**

```typescript
import { useEngineEstudos } from '../hooks/useEngineEstudos';
import { getTodosBancoQuestoes } from '../lib/adaptadores';

function QuizALERR() {
  const { gerarSessao, registrarResposta } = useEngineEstudos();
  
  const iniciarQuiz50Questoes = () => {
    const banco = getTodosBancoQuestoes(); // 1.950 questões
    const sessao = gerarSessao(banco, 50);
    
    // RESULTADO:
    // - 20 questões de revisão (matérias com mais erros)
    // - 30 questões novas
    // - Ordem embaralhada
    // - Alternativas embaralhadas (A não é sempre a resposta)
    
    return sessao;
  };

  const responder = (idQuestao: string, acertou: boolean) => {
    // Exemplo: questão "q_999" da matéria "Redes - TCP/IP"
    registrarResposta('Redes - TCP/IP', idQuestao, acertou);
    
    // O perfil é salvo automaticamente no localStorage
    // Na próxima sessão, se você errou muito "Redes - TCP/IP"
    // O algoritmo vai puxar mais questões dessa matéria!
  };

  return <div>...</div>;
}
```

---

## 🔥 **BENEFÍCIOS**

| Recurso | Antes | Depois |
|---------|-------|--------|
| **Distribuição** | Aleatória pura | Inteligente (novas vs antigas) |
| **Foco** | Sem prioridade | Foca nas matérias com erro |
| **Decoreba** | Possível (A sempre certa) | Impossível (embaralhamento) |
| **Persistência** | Manual | Automática (localStorage) |
| **Estatísticas** | Básicas | Avançadas (por matéria) |
| **Performance** | OK | Otimizada (até 2.000+ questões) |

---

## 💾 **ARMAZENAMENTO**

### **LocalStorage (Automático)**
```
Key: "ale_rr_perfil_estudos"
Tamanho: ~50-200 KB (depende do progresso)

Estrutura:
{
  questoesRespondidasIds: ["q_1", "q_2", ...],
  statsPorMateria: {
    "Linux - Permissões": { ... },
    "Português - Crase": { ... }
  }
}
```

### **Migração de Dados Antigos**
Se você já tem dados salvos em outro formato, crie um script de migração:

```typescript
// Carregar dados antigos
const dadosAntigos = localStorage.getItem('ale_rr_old_stats');

// Converter para novo formato
const perfil: PerfilUsuario = {
  questoesRespondidasIds: new Set(dadosAntigos.questoesRespondidas || []),
  statsPorMateria: convertStats(dadosAntigos)
};

// Salvar no novo formato
// (o hook useEngineEstudos faz isso automaticamente)
```

---

## 🧪 **TESTES**

### **Teste 1: Sessão de Usuário Novo**
```typescript
const perfil: PerfilUsuario = {
  questoesRespondidasIds: new Set(),
  statsPorMateria: {}
};

const sessao = engineEstudos.gerarSessaoDeEstudos(banco, perfil, 10);
// Deve retornar 10 questões novas (nenhuma revisão)
```

### **Teste 2: Usuário com Histórico**
```typescript
const perfil: PerfilUsuario = {
  questoesRespondidasIds: new Set(['q_1', 'q_2', 'q_3', 'q_4', 'q_5']),
  statsPorMateria: {
    'Linux - Permissões': { respondidas: 3, erros: 3, streak: 0, ultimaRevisao: new Date() },
    'Português': { respondidas: 2, erros: 0, streak: 2, ultimaRevisao: new Date() }
  }
};

const sessao = engineEstudos.gerarSessaoDeEstudos(banco, perfil, 10);
// Deve retornar:
// - 3 revisões (maioria "Linux - Permissões")
// - 7 novas
```

### **Teste 3: Embaralhamento**
```typescript
const questao = sessao[0];
const primeiraAlternativa = questao.alternativas[0];

// Execute gerarSessao várias vezes
// A alternativa correta deve aparecer em posições diferentes
```

---

## 🎓 **FAQ**

### **P: Preciso modificar minhas questões?**
R: **NÃO!** Os adaptadores convertem automaticamente.

### **P: Funciona com flashcards?**
R: **SIM!** Use `getTodosBancoFlashcards()`.

### **P: E se o usuário desinstalar o app?**
R: Os dados estão no localStorage. Serão perdidos. Para persistência em nuvem, integre com Supabase.

### **P: Quanto espaço ocupa?**
R: ~50-200 KB no localStorage (negligível).

### **P: Funciona offline?**
R: **SIM!** Tudo é local.

### **P: Como resetar tudo?**
R: `resetarPerfil()` do hook ou limpe o localStorage.

---

## 🚀 **PRÓXIMOS PASSOS**

1. ✅ Arquivos criados e prontos
2. 🔧 Integre no `StudySession.tsx`
3. 🎨 Adicione `<EngineDebugPanel />` ao Dashboard
4. 🧪 Teste com `const sessao = gerarSessao(banco, 10)`
5. 📊 Veja as estatísticas funcionando
6. 🎯 Deploy e conquiste o TOP 1!

---

## 📞 **SUPORTE**

Dúvidas? Olhe o código dos exemplos:
- `/hooks/useEngineEstudos.ts` (Hook)
- `/lib/EngineEstudos.ts` (Engine)
- `/lib/adaptadores.ts` (Conversores)
- `/components/EngineDebugPanel.tsx` (UI de teste)

---

**🏆 Agora você tem um sistema de estudos de NÍVEL PROFISSIONAL! 🏆**
