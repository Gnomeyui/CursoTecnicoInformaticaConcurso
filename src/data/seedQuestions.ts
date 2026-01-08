/**
 * Seed de Questões - Dados Iniciais para Popular o Banco
 * 
 * MODELO HÍBRIDO:
 * - JSON fácil de editar
 * - Estrutura separada (exam + questions)
 * - Formato brasileiro de questões (A, B, C, D, E)
 */

export const seedData = {
  exam: {
    banca: 'FGV',
    orgao: 'Prefeitura de Macaé (Macaeprev)',
    cargo: 'Assistente Previdenciário - Informática',
    ano: 2024,
    nivel: 'Médio/Técnico'
  },
  
  questions: [
    // ========== LÍNGUA PORTUGUESA ==========
    {
      question_number: 1,
      discipline: 'Língua Portuguesa',
      statement: 'A finalidade principal desse texto é',
      options: {
        'A': 'auxiliar na pesquisa por preços mais baixos.',
        'B': 'ajudar a controlar os gastos do mês.',
        'C': 'mostrar como investir algum dinheiro.',
        'D': 'indicar caminhos para se ganhar mais.',
        'E': 'aconselhar a como procurar melhores preços.'
      },
      correct_option: 'B'
    },
    {
      question_number: 2,
      discipline: 'Língua Portuguesa',
      statement: 'Assinale a opção que não apresenta um exemplo de linguagem informal.',
      options: {
        'A': 'Sempre dá para separar um dinheirinho para o futuro.',
        'B': 'Sempre pesquise preços e pechinche.',
        'C': 'A internet é um prato cheio para compradores compulsivos.',
        'D': 'Passe longe das liquidações.',
        'E': 'Estabeleça um limite em dinheiro para carregar na carteira.'
      },
      correct_option: 'E'
    },
    {
      question_number: 4,
      discipline: 'Língua Portuguesa',
      statement: '"Sempre dá para separar um dinheirinho para o futuro." Sobre a significação ou estruturação dessa frase, assinale o comentário incorreto.',
      options: {
        'A': 'O segmento "para separar" pode ser adequadamente substituído por "para que se separe".',
        'B': 'A expressão "para o futuro" significa para as futuras despesas do mês.',
        'C': 'A expressão "Sempre dá para" equivale semanticamente a "Sempre há a possibilidade de".',
        'D': 'O termo "dinheirinho", no diminutivo, mostra valor afetivo.',
        'E': 'O restante do texto vai explicar como fazer o que é dito nessa frase inicial.'
      },
      correct_option: 'B'
    },

    // ========== RACIOCÍNIO LÓGICO ==========
    {
      question_number: 11,
      discipline: 'Raciocínio Lógico-Matemático',
      statement: 'A figura a seguir ilustra um dos algoritmos utilizados para multiplicar números. A letra A representa um mesmo algarismo que é diferente de 2, de 8 e do algarismo representado pela letra B. Nessas condições, é correto afirmar que a diferença positiva entre A e B é igual a',
      options: {
        'A': '6.',
        'B': '5.',
        'C': '4.',
        'D': '3.',
        'E': '2.'
      },
      correct_option: 'D'
    },

    // ========== NOÇÕES DE INFORMÁTICA ==========
    {
      question_number: 21,
      discipline: 'Noções de Informática',
      statement: 'O mundo da computação ou informática está presente na nossa vida praticamente todos os dias. Assinale a opção que melhor define a diferença entre hardware e software.',
      options: {
        'A': 'O hardware é a parte física de um sistema de computação, enquanto o software são os componentes responsáveis pelo armazenamento e processamento de dados.',
        'B': 'O hardware refere-se aos componentes físicos de um computador, enquanto o software é o conjunto de instruções que permitem que o hardware funcione de maneira controlada.',
        'C': 'O hardware abrange dispositivos como monitores e impressoras, enquanto o software inclui apenas sistemas operacionais.',
        'D': 'O hardware é imutável e nunca precisa de atualizações, enquanto o software é atualizado regularmente para corrigir erros e melhorar o desempenho.',
        'E': 'O hardware executa as funções do sistema de forma independente, enquanto o software só é necessário para interfaces de usuário.'
      },
      correct_option: 'B'
    },

    // ========== LEGISLAÇÃO MUNICIPAL ==========
    {
      question_number: 31,
      discipline: 'Legislação Municipal',
      statement: 'Levando em consideração a Lei Orgânica do Município de Macaé/RJ, analise as afirmativas a seguir: I. São Poderes do Município, independentes e harmoniosos entre si, o Legislativo, o Executivo e o Judiciário. II. Os dois símbolos do Município previstos em lei são a Bandeira e o Hino. III. É obrigatória a execução integral do Hino de Macaé nas solenidades em que for tocado. Está correto o que se afirma em',
      options: {
        'A': 'I, apenas.',
        'B': 'II, apenas.',
        'C': 'III, apenas.',
        'D': 'I e II, apenas.',
        'E': 'I e III, apenas.'
      },
      correct_option: 'B'
    },

    // ========== CONHECIMENTOS ESPECÍFICOS ==========
    {
      question_number: 41,
      discipline: 'Conhecimentos Específicos - Informática',
      statement: 'A organização de computadores refere-se à forma como os componentes internos de um computador são estruturados e interagem entre si. Assinale a opção que descreve corretamente o papel do processador em um sistema de computador.',
      options: {
        'A': 'O processador é responsável apenas pelo armazenamento de dados e arquivos no computador.',
        'B': 'O processador é o componente que gerencia as conexões de rede e os dispositivos de entrada e saída.',
        'C': 'O processador executa as instruções dos programas, realiza cálculos e controla o fluxo de dados entre os diferentes componentes do computador.',
        'D': 'O processador armazena o sistema operacional e os aplicativos, permitindo que eles sejam carregados na memória quando necessário.',
        'E': 'O processador é um tipo de dispositivo de entrada, responsável por capturar e enviar dados para o computador.'
      },
      correct_option: 'C'
    },
    {
      question_number: 50,
      discipline: 'Conhecimentos Específicos - Informática',
      statement: 'Topologia de rede refere-se à estrutura ou layout físico e lógico de uma rede de computadores. Em relação a topologias de rede é correto afirmar que',
      options: {
        'A': 'na topologia em estrela, todos os dispositivos são conectados diretamente a um único ponto central, que é o roteador ou switch, e a falha neste ponto pode causar a interrupção de toda a rede.',
        'B': 'a topologia em malha é caracterizada por cada dispositivo se conectar diretamente a todos os outros dispositivos na rede, resultando em altos custos de implementação e manutenção.',
        'C': 'na topologia em barramento, os dispositivos são conectados a um único cabo central, e a falha em qualquer dispositivo pode interromper toda a rede.',
        'D': 'a topologia em anel é uma configuração onde os dispositivos são conectados em uma linha reta, sem formar um circuito fechado.',
        'E': 'a topologia em árvore combina as topologias em estrela e barramento, mas não permite a expansão da rede.'
      },
      correct_option: 'A'
    },
    {
      question_number: 58,
      discipline: 'Conhecimentos Específicos - Informática',
      statement: 'Um certificado digital é, em essência, uma identidade eletrônica que confirma a autenticidade de uma pessoa, organização ou site na internet. Assinale a afirmativa correta sobre a certificação digital.',
      options: {
        'A': 'Certificados digitais são utilizados para garantir a identidade de uma pessoa ou organização na internet, e são emitidos por uma autoridade certificadora (CA) confiável.',
        'B': 'Certificados digitais são usados exclusivamente para criptografar e-mails e não têm outras aplicações.',
        'C': 'Certificados digitais não podem ser utilizados para autenticação em websites seguros.',
        'D': 'Certificados digitais são gerados automaticamente por navegadores da web e não requerem validação externa.',
        'E': 'Certificados digitais são aplicáveis apenas a sites governamentais e não são utilizados por empresas privadas.'
      },
      correct_option: 'A'
    },
    {
      question_number: 60,
      discipline: 'Conhecimentos Específicos - Informática',
      statement: 'Um backup de dados é uma cópia de segurança dos seus arquivos, criada para protegê-los contra perda acidental, corrupção ou desastres. Assinale a opção que descreve corretamente um conceito de backup e os diferentes tipos de backup.',
      options: {
        'A': 'Backup completo copia todos os arquivos e pastas do sistema, enquanto backup incremental copia apenas os arquivos que foram modificados desde o último backup completo ou incremental.',
        'B': 'Backup diferencial copia todos os arquivos alterados desde o último backup completo, e backup incremental copia todos os arquivos alterados desde o último backup diferencial.',
        'C': 'Backup contínuo é uma técnica onde todos os arquivos são copiados a cada hora, independentemente de terem sido modificados ou não.',
        'D': 'Backup completo é sempre mais rápido e consome menos espaço do que backup incremental ou diferencial.',
        'E': 'Backup incremental realiza uma cópia de todos os arquivos do sistema a cada vez que é executado, tornando-o o método mais lento.'
      },
      correct_option: 'A'
    }
  ]
};

/**
 * COMO ADICIONAR MAIS QUESTÕES:
 * 
 * 1. Copie o template abaixo
 * 2. Cole no array questions (dentro do { })
 * 3. Preencha os campos
 * 
 * Template:
 * {
 *   question_number: 99,
 *   discipline: 'Nome da Matéria',
 *   statement: 'Texto da questão aqui...',
 *   options: {
 *     'A': 'Primeira alternativa',
 *     'B': 'Segunda alternativa',
 *     'C': 'Terceira alternativa',
 *     'D': 'Quarta alternativa',
 *     'E': 'Quinta alternativa'
 *   },
 *   correct_option: 'B'  // Letra da resposta correta
 * },
 */
