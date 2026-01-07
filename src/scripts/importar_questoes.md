# 📚 Como Importar Questões para o Gabaritoo

## Opção 1: Import Manual via SQL (Recomendado para testes)

### Formato JSON das Questões

```sql
INSERT INTO public.questions (text, options, correct_option_id, subject_id, difficulty_level)
VALUES (
    'Texto da questão aqui?',
    '[
        {"id": "a", "text": "Opção A"},
        {"id": "b", "text": "Opção B"},
        {"id": "c", "text": "Opção C"},
        {"id": "d", "text": "Opção D"}
    ]'::jsonb,
    'b',  -- ID da opção correta
    (SELECT id FROM public.subjects WHERE name = 'Português'),
    'medio'
);
```

### Exemplo Completo (10 questões de Informática)

```sql
-- Buscar ID da matéria
DO $$
DECLARE
    v_subject_id UUID;
BEGIN
    SELECT id INTO v_subject_id FROM public.subjects WHERE name = 'Informática';

    -- Inserir 10 questões
    INSERT INTO public.questions (text, options, correct_option_id, subject_id, difficulty_level) VALUES
    
    -- Questão 1
    (
        'Qual das alternativas abaixo NÃO é um sistema operacional?',
        '[
            {"id": "a", "text": "Windows"},
            {"id": "b", "text": "Linux"},
            {"id": "c", "text": "Oracle"},
            {"id": "d", "text": "macOS"}
        ]'::jsonb,
        'c',
        v_subject_id,
        'facil'
    ),
    
    -- Questão 2
    (
        'Em redes de computadores, o que significa a sigla IP?',
        '[
            {"id": "a", "text": "Internal Protocol"},
            {"id": "b", "text": "Internet Protocol"},
            {"id": "c", "text": "Integrated Protocol"},
            {"id": "d", "text": "Information Protocol"}
        ]'::jsonb,
        'b',
        v_subject_id,
        'medio'
    ),
    
    -- Questão 3
    (
        'Qual linguagem de programação é conhecida como "A linguagem da web"?',
        '[
            {"id": "a", "text": "Python"},
            {"id": "b", "text": "Java"},
            {"id": "c", "text": "JavaScript"},
            {"id": "d", "text": "C++"}
        ]'::jsonb,
        'c',
        v_subject_id,
        'facil'
    ),
    
    -- Questão 4
    (
        'O que é um firewall?',
        '[
            {"id": "a", "text": "Um tipo de vírus"},
            {"id": "b", "text": "Um software antivírus"},
            {"id": "c", "text": "Um sistema de segurança de rede"},
            {"id": "d", "text": "Um navegador web"}
        ]'::jsonb,
        'c',
        v_subject_id,
        'medio'
    ),
    
    -- Questão 5
    (
        'Qual é a função do DNS (Domain Name System)?',
        '[
            {"id": "a", "text": "Proteger contra vírus"},
            {"id": "b", "text": "Traduzir nomes de domínio em endereços IP"},
            {"id": "c", "text": "Comprimir arquivos"},
            {"id": "d", "text": "Gerenciar e-mails"}
        ]'::jsonb,
        'b',
        v_subject_id,
        'medio'
    ),
    
    -- Questão 6
    (
        'O que é cloud computing?',
        '[
            {"id": "a", "text": "Armazenamento de dados na nuvem"},
            {"id": "b", "text": "Computação distribuída via internet"},
            {"id": "c", "text": "Um tipo de software antivírus"},
            {"id": "d", "text": "Um protocolo de rede"}
        ]'::jsonb,
        'b',
        v_subject_id,
        'facil'
    ),
    
    -- Questão 7
    (
        'Qual das seguintes NÃO é uma linguagem de programação?',
        '[
            {"id": "a", "text": "Python"},
            {"id": "b", "text": "HTML"},
            {"id": "c", "text": "Java"},
            {"id": "d", "text": "C#"}
        ]'::jsonb,
        'b',
        v_subject_id,
        'medio'
    ),
    
    -- Questão 8
    (
        'O que é um banco de dados relacional?',
        '[
            {"id": "a", "text": "Um banco que armazena dados em tabelas relacionadas"},
            {"id": "b", "text": "Um banco que armazena apenas textos"},
            {"id": "c", "text": "Um banco que armazena apenas imagens"},
            {"id": "d", "text": "Um banco que não permite relacionamentos"}
        ]'::jsonb,
        'a',
        v_subject_id,
        'dificil'
    ),
    
    -- Questão 9
    (
        'Qual é a extensão padrão de arquivos do Microsoft Excel?',
        '[
            {"id": "a", "text": ".doc"},
            {"id": "b", "text": ".xls ou .xlsx"},
            {"id": "c", "text": ".ppt"},
            {"id": "d", "text": ".pdf"}
        ]'::jsonb,
        'b',
        v_subject_id,
        'facil'
    ),
    
    -- Questão 10
    (
        'O que é SQL?',
        '[
            {"id": "a", "text": "Uma linguagem de marcação"},
            {"id": "b", "text": "Uma linguagem de consulta estruturada"},
            {"id": "c", "text": "Um sistema operacional"},
            {"id": "d", "text": "Um protocolo de rede"}
        ]'::jsonb,
        'b',
        v_subject_id,
        'medio'
    );
    
    RAISE NOTICE 'Sucesso! 10 questões de Informática foram inseridas.';
END $$;
```

---

## Opção 2: Import via CSV (Para grandes volumes)

### 2.1. Preparar o CSV

Crie um arquivo `questoes.csv` com este formato:

```csv
text,option_a,option_b,option_c,option_d,correct,subject,difficulty
"Qual é a capital do Brasil?","Rio de Janeiro","São Paulo","Brasília","Salvador","c","Conhecimentos Gerais","facil"
"Quanto é 2 + 2?","3","4","5","6","b","Matemática","facil"
```

### 2.2. Script Node.js para importar

```javascript
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const csv = require('csv-parser');

const supabase = createClient(
  'https://gcetjuilvhryduzchoow.supabase.co',
  'SEU_SUPABASE_KEY'
);

const importQuestions = async () => {
  const questions = [];
  
  // Ler CSV
  fs.createReadStream('questoes.csv')
    .pipe(csv())
    .on('data', (row) => {
      questions.push({
        text: row.text,
        options: [
          { id: 'a', text: row.option_a },
          { id: 'b', text: row.option_b },
          { id: 'c', text: row.option_c },
          { id: 'd', text: row.option_d }
        ],
        correct_option_id: row.correct,
        subject: row.subject,
        difficulty_level: row.difficulty
      });
    })
    .on('end', async () => {
      console.log(`${questions.length} questões lidas do CSV.`);
      
      // Buscar IDs das matérias
      const { data: subjects } = await supabase
        .from('subjects')
        .select('id, name');
      
      const subjectMap = {};
      subjects.forEach(s => subjectMap[s.name] = s.id);
      
      // Inserir questões
      for (const q of questions) {
        const { error } = await supabase
          .from('questions')
          .insert({
            text: q.text,
            options: q.options,
            correct_option_id: q.correct_option_id,
            subject_id: subjectMap[q.subject],
            difficulty_level: q.difficulty_level
          });
        
        if (error) {
          console.error('Erro:', error);
        } else {
          console.log('✓ Questão inserida:', q.text.substring(0, 50) + '...');
        }
      }
      
      console.log('Import concluído!');
    });
};

importQuestions();
```

---

## Opção 3: Scraping de Provas Anteriores

### 3.1. Estrutura de um scraper (Exemplo com Puppeteer)

```javascript
const puppeteer = require('puppeteer');
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  'https://gcetjuilvhryduzchoow.supabase.co',
  'SEU_SUPABASE_KEY'
);

const scrapeConcursoQuestions = async (url) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);
  
  // Exemplo: Extrair questões de uma página de prova
  const questions = await page.evaluate(() => {
    const results = [];
    
    // Selecionar elementos da página (ajuste conforme o site)
    document.querySelectorAll('.questao').forEach((q) => {
      const text = q.querySelector('.enunciado').innerText;
      const options = Array.from(q.querySelectorAll('.alternativa'))
        .map((opt, idx) => ({
          id: String.fromCharCode(97 + idx), // a, b, c, d
          text: opt.innerText
        }));
      const correctIdx = parseInt(q.dataset.correta);
      
      results.push({
        text,
        options,
        correct_option_id: String.fromCharCode(97 + correctIdx)
      });
    });
    
    return results;
  });
  
  await browser.close();
  
  // Inserir no banco
  for (const q of questions) {
    await supabase.from('questions').insert({
      ...q,
      subject_id: 'ID_DA_MATERIA',
      difficulty_level: 'medio'
    });
  }
  
  console.log(`${questions.length} questões importadas!`);
};

scrapeConcursoQuestions('https://site-de-provas.com/prova');
```

---

## Opção 4: API de Bancos de Questões

Alguns sites oferecem APIs para acesso a questões de concursos:

- QConcursos (API paga)
- Gran Cursos (API paga)
- PCI Concursos (scraping permitido)

---

## Dicas para Qualidade das Questões

1. **Sempre revisar manualmente** antes de importar
2. **Verificar a resposta correta** (erros são comuns)
3. **Classificar a dificuldade** corretamente
4. **Associar à matéria certa**
5. **Remover duplicatas**

---

## Estrutura Recomendada de Pastas

```
/data
  /questoes
    /portugues
      - questoes_portugues_1000.csv
    /matematica
      - questoes_matematica_500.csv
    /informatica
      - questoes_informatica_800.csv
    /direito
      - questoes_direito_1200.csv
```

---

## Checklist de Importação

- [ ] Criar matérias no banco (subjects)
- [ ] Preparar arquivo CSV ou JSON com questões
- [ ] Validar formato das questões
- [ ] Executar script de importação
- [ ] Verificar no Supabase se importou corretamente
- [ ] Testar no quiz algumas questões
- [ ] Ajustar dificuldade conforme feedback

---

## 🚀 Próximo Passo

Após importar as questões, o sistema estará 100% funcional!

O algoritmo vai:
1. Buscar as questões de acordo com o arquétipo do cargo
2. Embaralhar as opções
3. Rastrear o progresso individual
4. Aplicar a revisão forçada
5. Masterizar questões acertadas 4+ vezes
6. Marcar como críticas questões erradas 6+ vezes

**Tudo automaticamente!** 🎯
