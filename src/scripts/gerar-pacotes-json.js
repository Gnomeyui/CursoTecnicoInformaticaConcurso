#!/usr/bin/env node
/**
 * ========================================
 * GERADOR DE PACOTES DE QUESTÕES
 * ========================================
 * 
 * OBJETIVO:
 * - Ler questões do banco de dados ou arquivo local
 * - Filtrar por perfil (cargo + banca + nível)
 * - Gerar arquivos JSON otimizados para download
 * - Organizar em estrutura de pastas por banca
 * 
 * USO:
 * node scripts/gerar-pacotes-json.js
 * 
 * OUTPUT:
 * public/downloads/
 *   ├── cespe/
 *   │   ├── tecnico-medio.json
 *   │   └── analista-superior.json
 *   └── fcc/
 *       └── tecnico-medio.json
 */

const fs = require('fs');
const path = require('path');

// ========================================
// CONFIGURAÇÃO
// ========================================

const OUTPUT_DIR = path.join(__dirname, '../public/downloads');
const DATA_SOURCE = path.join(__dirname, '../data/questions.ts');

// ========================================
// CARREGAR QUESTÕES
// ========================================

/**
 * Carrega questões do arquivo de dados
 * 
 * OPÇÕES:
 * 1. Ler de arquivo TypeScript (conversão necessária)
 * 2. Conectar ao banco de dados
 * 3. Importar de CSV/Excel
 * 4. Mock data para testes
 */
function carregarQuestoes() {
  // OPÇÃO 1: Mock data para testes
  console.log('📚 Carregando questões (modo mock)...');
  
  return [
    // Questões CESPE - Técnico
    {
      id: 'q_cespe_tec_001',
      banca: 'CESPE',
      cargo: 'Técnico',
      nivel: 'Médio',
      materia: 'Informática',
      dificuldade: 'medio',
      pergunta: 'No sistema operacional Linux, qual comando é utilizado para listar todos os arquivos de um diretório, incluindo os ocultos?',
      opcoes: [
        'ls -l',
        'ls -a',
        'ls -h',
        'ls -r'
      ],
      correta: 1, // Índice 1 = "ls -a"
      explicacao: 'O comando "ls -a" lista todos os arquivos, incluindo os ocultos (que começam com ponto). A opção -l mostra detalhes, -h mostra tamanhos legíveis, e -r inverte a ordem.'
    },
    {
      id: 'q_cespe_tec_002',
      banca: 'CESPE',
      cargo: 'Técnico',
      nivel: 'Médio',
      materia: 'Português',
      dificuldade: 'facil',
      pergunta: 'Assinale a alternativa em que todas as palavras estão corretamente acentuadas.',
      opcoes: [
        'Saúde, econômico, útil',
        'Político, médico, hífen',
        'Público, ônibus, fácil',
        'Rápido, nível, dificíl'
      ],
      correta: 2,
      explicacao: 'Apenas a opção C está totalmente correta. Em D, "difícil" tem acento na antepenúltima sílaba (proparoxítona).'
    },
    {
      id: 'q_cespe_tec_003',
      banca: 'CESPE',
      cargo: 'Técnico',
      nivel: 'Médio',
      materia: 'Informática',
      dificuldade: 'dificil',
      pergunta: 'Em relação aos protocolos de rede, qual é a principal diferença entre TCP e UDP?',
      opcoes: [
        'TCP é orientado a conexão, UDP não',
        'UDP é mais rápido que TCP em todas as situações',
        'TCP não garante entrega, UDP sim',
        'UDP usa três vias de handshake'
      ],
      correta: 0,
      explicacao: 'TCP (Transmission Control Protocol) é orientado a conexão e garante a entrega ordenada dos pacotes. UDP (User Datagram Protocol) não estabelece conexão e não garante entrega, sendo mais rápido mas menos confiável.'
    },

    // Questões CESPE - Analista
    {
      id: 'q_cespe_ana_001',
      banca: 'CESPE',
      cargo: 'Analista',
      nivel: 'Superior',
      materia: 'Legislação',
      dificuldade: 'dificil',
      pergunta: 'De acordo com a Lei 8.112/90, o servidor público federal em estágio probatório pode ser exonerado?',
      opcoes: [
        'Sim, a qualquer momento, sem necessidade de justificativa',
        'Não, durante o estágio probatório há estabilidade provisória',
        'Sim, se não satisfazer as condições estabelecidas para o cargo',
        'Não, apenas após confirmação no cargo'
      ],
      correta: 2,
      explicacao: 'O servidor em estágio probatório pode ser exonerado se não satisfizer os requisitos do cargo, conforme avaliação de desempenho.'
    },

    // Questões FCC - Técnico
    {
      id: 'q_fcc_tec_001',
      banca: 'FCC',
      cargo: 'Técnico',
      nivel: 'Médio',
      materia: 'Matemática',
      dificuldade: 'medio',
      pergunta: 'Um produto que custava R$ 100,00 teve um aumento de 20% e depois um desconto de 20%. Qual é o preço final?',
      opcoes: [
        'R$ 100,00',
        'R$ 96,00',
        'R$ 104,00',
        'R$ 92,00'
      ],
      correta: 1,
      explicacao: 'Após aumento: 100 × 1,20 = 120. Após desconto: 120 × 0,80 = 96. O preço final é R$ 96,00.'
    },

    // Questões VUNESP - Técnico
    {
      id: 'q_vunesp_tec_001',
      banca: 'VUNESP',
      cargo: 'Técnico',
      nivel: 'Médio',
      materia: 'Informática',
      dificuldade: 'facil',
      pergunta: 'Qual é a função da tecla F5 no Microsoft Word?',
      opcoes: [
        'Salvar o documento',
        'Abrir a caixa de diálogo Localizar e Substituir',
        'Imprimir o documento',
        'Abrir um novo documento'
      ],
      correta: 1,
      explicacao: 'No Microsoft Word, F5 abre a caixa de diálogo "Localizar e Substituir", permitindo navegar rapidamente pelo documento.'
    }
  ];

  // OPÇÃO 2: Carregar do arquivo real (descomente quando tiver)
  /*
  try {
    // Se usar TypeScript, precisa compilar primeiro ou usar ts-node
    const questionsModule = require(DATA_SOURCE);
    return questionsModule.questions || [];
  } catch (error) {
    console.error('❌ Erro ao carregar questões:', error.message);
    return [];
  }
  */
}

// ========================================
// AGRUPAR POR PERFIL
// ========================================

/**
 * Agrupa questões por perfil (banca + cargo + nível)
 */
function agruparPorPerfil(questoes) {
  console.log('📊 Agrupando questões por perfil...');
  
  const grupos = {};

  questoes.forEach(questao => {
    // Normalizar strings
    const banca = normalizar(questao.banca);
    const cargo = normalizar(questao.cargo);
    const nivel = normalizar(questao.nivel);

    // Criar chave única
    const chave = `${banca}/${cargo}-${nivel}`;

    if (!grupos[chave]) {
      grupos[chave] = {
        metadata: {
          perfil: `${questao.cargo} Judiciário`,
          banca: questao.banca,
          cargo: questao.cargo,
          nivel: questao.nivel,
          versao: new Date().toISOString().split('T')[0], // YYYY-MM-DD
          total: 0
        },
        questoes: []
      };
    }

    // Adicionar questão (removendo campos de metadados)
    grupos[chave].questoes.push({
      id: questao.id,
      materia: questao.materia,
      dificuldade: questao.dificuldade,
      pergunta: questao.pergunta,
      opcoes: questao.opcoes,
      correta: questao.correta,
      explicacao: questao.explicacao
    });

    grupos[chave].metadata.total++;
  });

  return grupos;
}

/**
 * Normaliza string para usar em nomes de arquivo
 */
function normalizar(str) {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove acentos
    .replace(/\s+/g, '-') // Espaços -> hífens
    .replace(/[^a-z0-9-]/g, ''); // Remove caracteres especiais
}

// ========================================
// SALVAR ARQUIVOS
// ========================================

/**
 * Salva pacotes em arquivos JSON
 */
function salvarPacotes(grupos) {
  console.log('💾 Salvando pacotes...');

  // Criar diretório de output
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  let totalArquivos = 0;
  let totalQuestoes = 0;

  Object.entries(grupos).forEach(([chave, pacote]) => {
    // Separar banca e nome do arquivo
    const [banca, nomeArquivo] = chave.split('/');
    
    // Criar pasta da banca
    const bancaDir = path.join(OUTPUT_DIR, banca);
    if (!fs.existsSync(bancaDir)) {
      fs.mkdirSync(bancaDir, { recursive: true });
    }

    // Caminho completo do arquivo
    const filePath = path.join(bancaDir, `${nomeArquivo}.json`);

    // Salvar JSON (formatado para legibilidade)
    const json = JSON.stringify(pacote, null, 2);
    fs.writeFileSync(filePath, json, 'utf-8');

    // Estatísticas
    const tamanhoKB = (json.length / 1024).toFixed(2);
    console.log(`  ✅ ${chave}.json (${pacote.questoes.length} questões, ${tamanhoKB} KB)`);

    totalArquivos++;
    totalQuestoes += pacote.questoes.length;
  });

  return { totalArquivos, totalQuestoes };
}

// ========================================
// GERAR INDEX (OPCIONAL)
// ========================================

/**
 * Gera arquivo index.json com lista de todos os pacotes
 */
function gerarIndex(grupos) {
  const index = {
    versao: '1.0.0',
    gerado_em: new Date().toISOString(),
    total_pacotes: Object.keys(grupos).length,
    pacotes: Object.entries(grupos).map(([chave, pacote]) => ({
      url: `/${chave}.json`,
      banca: pacote.metadata.banca,
      cargo: pacote.metadata.cargo,
      nivel: pacote.metadata.nivel,
      total: pacote.metadata.total,
      versao: pacote.metadata.versao
    }))
  };

  const indexPath = path.join(OUTPUT_DIR, 'index.json');
  fs.writeFileSync(indexPath, JSON.stringify(index, null, 2), 'utf-8');
  
  console.log(`\n📋 Índice gerado: index.json`);
}

// ========================================
// MAIN
// ========================================

function main() {
  console.log('🚀 Iniciando geração de pacotes de questões...\n');

  try {
    // 1. Carregar questões
    const questoes = carregarQuestoes();
    console.log(`  📚 ${questoes.length} questões carregadas\n`);

    if (questoes.length === 0) {
      console.error('❌ Nenhuma questão encontrada!');
      process.exit(1);
    }

    // 2. Agrupar por perfil
    const grupos = agruparPorPerfil(questoes);
    console.log(`  📊 ${Object.keys(grupos).length} perfis identificados\n`);

    // 3. Salvar arquivos
    const { totalArquivos, totalQuestoes } = salvarPacotes(grupos);

    // 4. Gerar índice
    gerarIndex(grupos);

    // 5. Resumo final
    console.log('\n✅ Geração concluída com sucesso!');
    console.log(`\n📊 Resumo:`);
    console.log(`  - Arquivos gerados: ${totalArquivos}`);
    console.log(`  - Total de questões: ${totalQuestoes}`);
    console.log(`  - Diretório: ${OUTPUT_DIR}`);
    console.log(`\n🚀 Próximo passo:`);
    console.log(`  1. Fazer upload da pasta 'public/downloads' para seu servidor`);
    console.log(`  2. Atualizar SERVER_URL em /services/SyncService.ts`);
    console.log(`  3. Testar download no app`);

  } catch (error) {
    console.error('❌ Erro durante a geração:', error);
    process.exit(1);
  }
}

// Executar
main();
