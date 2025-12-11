export interface Flashcard {
  id: number;
  topico: string;
  frente: string;
  verso: string;
  dificuldade: 'Fácil' | 'Média' | 'Difícil';
}

export const flashcardsRegimento: Flashcard[] = [
  // TEMA: INSTALAÇÃO E MESA DIRETORA
  {
    id: 1,
    topico: "Instalação",
    frente: "Qual a data e hora da primeira Sessão Preparatória de cada Legislatura (Posse)?",
    verso: "Dia 1º de janeiro, às 10 horas. (Art. 3º)",
    dificuldade: "Fácil"
  },
  {
    id: 2,
    topico: "Mesa Diretora",
    frente: "Qual a composição exata da Mesa Diretora da ALE-RR?",
    verso: "1 Presidente, 3 Vice-Presidentes, 4 Secretários e 1 Corregedor-Geral. (Art. 13)",
    dificuldade: "Média"
  },
  {
    id: 3,
    topico: "Mesa Diretora",
    frente: "Qual a duração do mandato da Mesa Diretora?",
    verso: "2 anos. (Art. 7º)",
    dificuldade: "Fácil"
  },
  {
    id: 4,
    topico: "Eleição da Mesa",
    frente: "Em caso de empate na eleição da Mesa, quem é considerado eleito?",
    verso: "O candidato mais idoso. (Art. 8º, XV)",
    dificuldade: "Média"
  },
  {
    id: 5,
    topico: "Mesa Diretora",
    frente: "Qual a periodicidade das reuniões ordinárias da Mesa Diretora?",
    verso: "Quinzenalmente. (Art. 17)",
    dificuldade: "Difícil"
  },

  // TEMA: COMISSÕES
  {
    id: 6,
    topico: "Comissões",
    frente: "Qual o número máximo de membros efetivos nas Comissões Permanentes?",
    verso: "No máximo 7 membros efetivos. (Art. 34)",
    dificuldade: "Média"
  },
  {
    id: 7,
    topico: "Comissões",
    frente: "Qual o prazo para instalação das Comissões após sua organização?",
    verso: "5 dias. (Art. 47)",
    dificuldade: "Difícil"
  },
  {
    id: 8,
    topico: "CPI",
    frente: "Qual o quórum necessário para criar uma Comissão Parlamentar de Inquérito (CPI)?",
    verso: "Requerimento de 1/3 dos membros da Assembleia. (Art. 45)",
    dificuldade: "Média"
  },
  {
    id: 9,
    topico: "CPI",
    frente: "Qual o prazo de funcionamento de uma CPI?",
    verso: "90 dias, prorrogável por mais 30 dias. (Art. 45, §1º)",
    dificuldade: "Difícil"
  },
  {
    id: 10,
    topico: "Comissões",
    frente: "Quando ocorre a 'perda do lugar' de um membro na Comissão?",
    verso: "Quando faltar a 3 reuniões ordinárias consecutivas ou 6 alternadas na Sessão Legislativa. (Art. 51, §1º)",
    dificuldade: "Difícil"
  },

  // TEMA: SESSÕES PLENÁRIAS
  {
    id: 11,
    topico: "Sessões",
    frente: "Em quais dias da semana ocorrem as Sessões Ordinárias?",
    verso: "Terças, Quartas e Quintas-feiras. (Art. 143)",
    dificuldade: "Fácil"
  },
  {
    id: 12,
    topico: "Sessões",
    frente: "Qual o horário das Sessões Ordinárias?",
    verso: "Das 09h às 12h. (Art. 143)",
    dificuldade: "Fácil"
  },
  {
    id: 13,
    topico: "Sessões",
    frente: "Qual o quórum mínimo para ABERTURA da sessão?",
    verso: "1/3 dos membros da Assembleia. (Art. 144)",
    dificuldade: "Média"
  },
  {
    id: 14,
    topico: "Sessões",
    frente: "Qual a duração total do 'Expediente'?",
    verso: "80 minutos (20 min para leitura/votação ata + 60 min para oradores). (Art. 145)",
    dificuldade: "Difícil"
  },
  {
    id: 15,
    topico: "Sessões",
    frente: "Qual o quórum para transformar a sessão em Comissão Geral?",
    verso: "Maioria absoluta de votos. (Art. 153, §1º)",
    dificuldade: "Difícil"
  },

  // TEMA: PROCESSO LEGISLATIVO E PRAZOS
  {
    id: 16,
    topico: "Prazos",
    frente: "Qual o prazo para a Comissão emitir parecer em regime de URGÊNCIA?",
    verso: "10 dias. (Art. 61, I)",
    dificuldade: "Média"
  },
  {
    id: 17,
    topico: "Prazos",
    frente: "Qual o prazo para a Comissão emitir parecer em regime de TRAMITAÇÃO ORDINÁRIA?",
    verso: "18 dias. (Art. 61, III)",
    dificuldade: "Média"
  },
  {
    id: 18,
    topico: "Veto",
    frente: "Qual o prazo que o Governador tem para vetar um projeto?",
    verso: "15 dias úteis. (Art. 253)",
    dificuldade: "Média"
  },
  {
    id: 19,
    topico: "Veto",
    frente: "Se o Governador silenciar após 15 dias úteis, o que acontece?",
    verso: "Importará em sanção (aprovação tácita). (Art. 253, §2º)",
    dificuldade: "Fácil"
  },
  {
    id: 20,
    topico: "Veto",
    frente: "Qual o prazo para a Assembleia apreciar o Veto?",
    verso: "30 dias. (Art. 254)",
    dificuldade: "Média"
  },

  // TEMA: DEPUTADOS E PRERROGATIVAS
  {
    id: 21,
    topico: "Deputados",
    frente: "O Deputado pode ser preso?",
    verso: "Não, salvo em flagrante de crime inafiançável. (Art. 87, §1º)",
    dificuldade: "Fácil"
  },
  {
    id: 22,
    topico: "Licença",
    frente: "Qual o prazo máximo de licença para tratar de interesse particular (sem remuneração)?",
    verso: "120 dias por Sessão Legislativa. (Art. 93, IV)",
    dificuldade: "Média"
  },
  {
    id: 23,
    topico: "Suplente",
    frente: "Quando o Suplente é convocado?",
    verso: "Vaga, investidura em cargo executivo (Ministro/Secretário) ou licença superior a 120 dias. (Art. 101)",
    dificuldade: "Difícil"
  },
  {
    id: 24,
    topico: "Decoro",
    frente: "Quem supervisiona as atividades parlamentares quanto à ética e decoro?",
    verso: "O Corregedor Parlamentar. (Art. 28-A)",
    dificuldade: "Média"
  },

  // TEMA: PROPOSIÇÕES ESPECÍFICAS
  {
    id: 25,
    topico: "Emenda à Constituição",
    frente: "Qual o quórum para aprovar uma Emenda à Constituição (PEC)?",
    verso: "3/5 dos votos, em dois turnos. (Art. 180, §3º)",
    dificuldade: "Difícil"
  },
  {
    id: 26,
    topico: "Emenda à Constituição",
    frente: "Qual o intervalo mínimo (interstício) entre o 1º e o 2º turno de uma PEC?",
    verso: "2 dias. (Art. 183, §2º)",
    dificuldade: "Difícil"
  },
  {
    id: 27,
    topico: "Lei Complementar",
    frente: "Qual o quórum para aprovação de Lei Complementar?",
    verso: "Maioria Absoluta. (Art. 188)",
    dificuldade: "Média"
  },
  {
    id: 28,
    topico: "Orçamento",
    frente: "Até quando o projeto de prestação de contas do Governador deve dar entrada na Assembleia?",
    verso: "Até 60 dias após a abertura da sessão legislativa. (Art. 256)",
    dificuldade: "Difícil"
  },
  {
    id: 29,
    topico: "Convocação",
    frente: "Qual a consequência se um Secretário de Estado convocado faltar sem justificativa?",
    verso: "Crime de responsabilidade. (Art. 284, §2º)",
    dificuldade: "Média"
  },
  {
    id: 30,
    topico: "Polícia Interna",
    frente: "Deputado pode portar arma no Plenário?",
    verso: "Não. É vedado a qualquer Deputado portar arma no Plenário ou recinto da Assembleia. (Art. 276, §2º)",
    dificuldade: "Fácil"
  },

  // ========================================
  // MEGA LOTE 3: REGIMENTO INTERNO ALE-RR
  // IDs: 91 a 200 (110 flashcards)
  // Baseado no Regimento Interno Atualizado (PDF)
  // ========================================

  // --- MESA DIRETORA E COMPETÊNCIAS ---
  {
    id: 91,
    topico: "Mesa Diretora",
    frente: "Quem promulga as Emendas à Constituição Estadual?",
    verso: "A Mesa Diretora. (Art. 228)",
    dificuldade: "Média"
  },
  {
    id: 92,
    topico: "Mesa Diretora",
    frente: "Quem tem iniciativa privativa para propor projetos sobre a organização e funcionamento da Assembleia?",
    verso: "A Mesa Diretora. (Art. 232)",
    dificuldade: "Fácil"
  },
  {
    id: 93,
    topico: "Mesa Diretora",
    frente: "Como são preenchidas as vagas na Mesa Diretora ocorridas antes de 30 de novembro do 2º ano do mandato?",
    verso: "Mediante eleição suplementar. (Art. 166)",
    dificuldade: "Difícil"
  },
  {
    id: 94,
    topico: "Presidente",
    frente: "O Presidente da Assembleia pode votar nas sessões?",
    verso: "Apenas em escrutínio secreto ou para desempatar votação ostensiva (Voto de Minerva). (Art. 360, 366)",
    dificuldade: "Média"
  },
  {
    id: 95,
    topico: "Sucessão",
    frente: "Quem substitui o Presidente em suas ausências ou impedimentos?",
    verso: "Os Vice-Presidentes, na ordem (1º, 2º, 3º). (Art. 376)",
    dificuldade: "Fácil"
  },
  {
    id: 96,
    topico: "Secretários",
    frente: "Qual membro da Mesa inspeciona os serviços administrativos e fiscaliza despesas?",
    verso: "O 1º Secretário. (Art. 394)",
    dificuldade: "Média"
  },
  {
    id: 97,
    topico: "Secretários",
    frente: "Quem redige a ata das Sessões Secretas?",
    verso: "O 2º Secretário. (Art. 419)",
    dificuldade: "Difícil"
  },
  {
    id: 98,
    topico: "Corregedor",
    frente: "Quem tem poder para supervisionar a proibição de porte de arma e mandar revistar na Assembleia?",
    verso: "O Corregedor Parlamentar. (Art. 460)",
    dificuldade: "Média"
  },
  {
    id: 99,
    topico: "Comissões",
    frente: "Qual o prazo para nomeação dos membros das Comissões Permanentes no início da sessão legislativa?",
    verso: "5 dias. (Art. 473)",
    dificuldade: "Média"
  },
  {
    id: 100,
    topico: "Comissões",
    frente: "Quem preside a reunião conjunta de comissões?",
    verso: "O Presidente mais idoso entre os presidentes de comissão (salvo se a CCJ participar, aí é o da CCJ). (Art. 1013)",
    dificuldade: "Difícil"
  },

  // --- FUNCIONAMENTO DAS COMISSÕES ---
  {
    id: 101,
    topico: "Comissões",
    frente: "Qual o tempo de duração de uma reunião ordinária de Comissão?",
    verso: "2 horas, prorrogável por metade desse prazo. (Art. 1049)",
    dificuldade: "Média"
  },
  {
    id: 102,
    topico: "Relator",
    frente: "Qual o prazo para o Relator dar parecer (regra geral)?",
    verso: "Até 2/3 do prazo da Comissão. (Art. 1101)",
    dificuldade: "Difícil"
  },
  {
    id: 103,
    topico: "Relator",
    frente: "O que acontece se o Relator perder o prazo?",
    verso: "Será designado novo relator para emitir parecer em 2 dias. (Art. 1103)",
    dificuldade: "Média"
  },
  {
    id: 104,
    topico: "Comissões Temporárias",
    frente: "Quantos membros no MÁXIMO pode ter uma Comissão Temporária?",
    verso: "9 membros. (Art. 888)",
    dificuldade: "Média"
  },
  {
    id: 105,
    topico: "Comissões Temporárias",
    frente: "Quantos membros no MÍNIMO pode ter uma Comissão Temporária?",
    verso: "3 membros. (Art. 889)",
    dificuldade: "Média"
  },
  {
    id: 106,
    topico: "CPI",
    frente: "A quem é encaminhado o relatório final da CPI para responsabilidade civil/criminal?",
    verso: "Ao Ministério Público. (Art. 944)",
    dificuldade: "Fácil"
  },
  {
    id: 107,
    topico: "Comissão Representativa",
    frente: "Quem compõe a Comissão de Representação durante o recesso?",
    verso: "O Presidente da Assembleia e 1 membro de cada partido/bloco. (Art. 950)",
    dificuldade: "Média"
  },
  {
    id: 108,
    topico: "Comissão Representativa",
    frente: "O que acontece com a Comissão de Representação se houver convocação extraordinária?",
    verso: "Ela é interrompida. (Art. 966)",
    dificuldade: "Média"
  },
  {
    id: 109,
    topico: "CCJ",
    frente: "Qual comissão opina sobre intervenção nos municípios?",
    verso: "Comissão de Constituição, Justiça e Redação Final (CCJ). (Art. 593)",
    dificuldade: "Média"
  },
  {
    id: 110,
    topico: "Controle Externo",
    frente: "Qual comissão analisa anualmente as contas do Tribunal de Contas?",
    verso: "Comissão de Tomada de Contas. (Art. 692)",
    dificuldade: "Difícil"
  },

  // --- SESSÕES E RITOS ---
  {
    id: 111,
    topico: "Sessões",
    frente: "Qual a tolerância de atraso para abrir a sessão se não houver quórum?",
    verso: "15 minutos. (Art. 1894)",
    dificuldade: "Fácil"
  },
  {
    id: 112,
    topico: "Sessões",
    frente: "Se não houver sessão por falta de quórum, o que acontece com o expediente?",
    verso: "O 1º Secretário despacha a correspondência para publicação. (Art. 1899)",
    dificuldade: "Média"
  },
  {
    id: 113,
    topico: "Sessões",
    frente: "Quando a sessão pode ser levantada (encerrada) antes do prazo?",
    verso: "Tumulto grave, falecimento de Deputado/Chefe de Poder ou quórum < 1/3. (Art. 1880, 1882)",
    dificuldade: "Média"
  },
  {
    id: 114,
    topico: "Sessão Extraordinária",
    frente: "Qual a duração máxima de uma Sessão Extraordinária?",
    verso: "2 horas. (Art. 1845)",
    dificuldade: "Fácil"
  },
  {
    id: 115,
    topico: "Sessão Itinerante",
    frente: "Qual o quórum para realizar uma Sessão Itinerante?",
    verso: "1/3 dos membros (presença obrigatória). (Art. 1870)",
    dificuldade: "Difícil"
  },
  {
    id: 116,
    topico: "Sessão Itinerante",
    frente: "Qual o traje recomendado para Sessão Itinerante?",
    verso: "Traje passeio. (Art. 1875)",
    dificuldade: "Fácil"
  },
  {
    id: 117,
    topico: "Ordem do Dia",
    frente: "Quando a Ordem do Dia é distribuída aos deputados?",
    verso: "Antes de iniciar-se a subseção respectiva (após o expediente). (Art. 2048)",
    dificuldade: "Média"
  },
  {
    id: 118,
    topico: "Ordem do Dia",
    frente: "Qual a duração da Ordem do Dia?",
    verso: "60 minutos (prorrogáveis). (Art. 1837)",
    dificuldade: "Fácil"
  },
  {
    id: 119,
    topico: "Explicação Pessoal",
    frente: "Quanto tempo um deputado tem para falar na 'Explicação Pessoal'?",
    verso: "5 minutos (prorrogáveis por igual tempo). (Art. 2097)",
    dificuldade: "Fácil"
  },
  {
    id: 120,
    topico: "Debates",
    frente: "Como o deputado deve se dirigir a um colega em plenário?",
    verso: "Tratamento de 'Excelência'. (Art. 1925)",
    dificuldade: "Fácil"
  },
  {
    id: 121,
    topico: "Apartes",
    frente: "Qual o tempo máximo de um aparte?",
    verso: "2 minutos. (Art. 2001)",
    dificuldade: "Fácil"
  },
  {
    id: 122,
    topico: "Apartes",
    frente: "É permitido apartear o Presidente?",
    verso: "Não. (Art. 2004)",
    dificuldade: "Média"
  },
  {
    id: 123,
    topico: "Questão de Ordem",
    frente: "Quanto tempo o deputado tem para formular uma Questão de Ordem?",
    verso: "5 minutos. (Art. 2140)",
    dificuldade: "Média"
  },
  {
    id: 124,
    topico: "Questão de Ordem",
    frente: "De quem é a competência para resolver Questões de Ordem?",
    verso: "Do Presidente (soberanamente). (Art. 2139)",
    dificuldade: "Fácil"
  },
  {
    id: 125,
    topico: "Recurso",
    frente: "Caberá recurso da decisão do Presidente em Questão de Ordem para quem?",
    verso: "Para o Plenário (ouvindo a CCJ). (Art. 2146)",
    dificuldade: "Difícil"
  },
  {
    id: 126,
    topico: "Ata",
    frente: "Quem presta esclarecimentos em caso de reclamação sobre a Ata?",
    verso: "O 2º Secretário. (Art. 2033)",
    dificuldade: "Difícil"
  },
  {
    id: 127,
    topico: "Público",
    frente: "O público nas galerias pode aplaudir ou vaiar?",
    verso: "Não. Deve guardar silêncio sem sinal de aplauso ou reprovação. (Art. 1932)",
    dificuldade: "Fácil"
  },
  {
    id: 128,
    topico: "Prorrogação",
    frente: "Qual o limite máximo de tempo para prorrogação da sessão?",
    verso: "Metade do prazo regimental da sessão. (Art. 1891)",
    dificuldade: "Média"
  },
  {
    id: 129,
    topico: "Comissão Geral",
    frente: "Qual o prazo para discutir requerimento de transformação em Comissão Geral?",
    verso: "24 horas após apresentação. (Art. 2118)",
    dificuldade: "Difícil"
  },
  {
    id: 130,
    topico: "Sessão Secreta",
    frente: "Quem pode requerer Sessão Secreta?",
    verso: "O Presidente (de ofício) ou 1/3 dos membros. (Art. 2123)",
    dificuldade: "Média"
  },

  // --- PROPOSIÇÕES E TRAMITAÇÃO ---
  {
    id: 131,
    topico: "Proposições",
    frente: "Quantas vias devem ser apresentadas de uma proposição?",
    verso: "2 vias. (Art. 2191)",
    dificuldade: "Fácil"
  },
  {
    id: 132,
    topico: "Autoria",
    frente: "Quem é considerado o autor de uma proposição coletiva?",
    verso: "O primeiro signatário. (Art. 2194)",
    dificuldade: "Fácil"
  },
  {
    id: 133,
    topico: "Admissibilidade",
    frente: "O que a Mesa faz com proposições manifestamente inconstitucionais?",
    verso: "Deixa de admitir (não aceita). (Art. 2183)",
    dificuldade: "Média"
  },
  {
    id: 134,
    topico: "Recurso",
    frente: "Se a Mesa recusar uma proposição, o autor recorre a quem?",
    verso: "À Presidência, para audiência da CCJ. (Art. 2190)",
    dificuldade: "Difícil"
  },
  {
    id: 135,
    topico: "Indicação",
    frente: "A Indicação precisa de parecer das comissões?",
    verso: "Não, independe de parecer (salvo deliberação em contrário). (Art. 2295)",
    dificuldade: "Média"
  },
  {
    id: 136,
    topico: "Requerimento",
    frente: "Um requerimento de 'Voto de Pesar' sujeita-se a despacho ou deliberação?",
    verso: "Deliberação do Plenário. (Art. 2323)",
    dificuldade: "Média"
  },
  {
    id: 137,
    topico: "Requerimento",
    frente: "Um requerimento de 'Retirada de Proposição' da Ordem do Dia sujeita-se a despacho ou deliberação?",
    verso: "Deliberação do Plenário. (Art. 2315)",
    dificuldade: "Difícil"
  },
  {
    id: 138,
    topico: "Votação",
    frente: "Quando ocorre o 'Empate' na votação ostensiva, quem decide?",
    verso: "O Presidente (Voto de Minerva). (Art. 2443)",
    dificuldade: "Fácil"
  },
  {
    id: 139,
    topico: "Votação",
    frente: "Qual o tempo que o painel eletrônico fica aberto para votação nominal?",
    verso: "3 minutos. (Art. 2468)",
    dificuldade: "Média"
  },
  {
    id: 140,
    topico: "Votação",
    frente: "Se o parlamentar não votar no prazo do painel, como é computado?",
    verso: "Como Abstenção. (Art. 2474)",
    dificuldade: "Média"
  },
  {
    id: 141,
    topico: "Votação",
    frente: "É permitido encaminhamento de votação na apreciação de Veto?",
    verso: "Não. (Art. 2748)",
    dificuldade: "Difícil"
  },
  {
    id: 142,
    topico: "Voto Secreto",
    frente: "Qual o tempo do painel para votação secreta?",
    verso: "3 minutos. (Art. 2487)",
    dificuldade: "Difícil"
  },
  {
    id: 143,
    topico: "Votação",
    frente: "Emendas com pareceres divergentes das comissões são votadas como?",
    verso: "Uma a uma. (Art. 2543)",
    dificuldade: "Difícil"
  },
  {
    id: 144,
    topico: "Votação",
    frente: "O que é 'Destaque'?",
    verso: "Ato de separar uma parte da proposição para votação isolada. (Art. 2508)",
    dificuldade: "Fácil"
  },
  {
    id: 145,
    topico: "Adiamento",
    frente: "Quantas vezes a votação de uma matéria pode ser adiada?",
    verso: "Uma vez. (Art. 2517)",
    dificuldade: "Média"
  },
  {
    id: 146,
    topico: "Redação Final",
    frente: "Cabe emenda na Redação Final?",
    verso: "Só para corrigir vício de linguagem ou erro manifesto. (Art. 2521)",
    dificuldade: "Média"
  },
  {
    id: 147,
    topico: "Autógrafos",
    frente: "Quem assina os autógrafos de lei?",
    verso: "O Presidente e dois Secretários. (Art. 2528)",
    dificuldade: "Média"
  },
  {
    id: 148,
    topico: "Preferência",
    frente: "Qual matéria tem preferência absoluta na votação?",
    verso: "Prorrogação da sessão. (Art. 2534)",
    dificuldade: "Difícil"
  },
  {
    id: 149,
    topico: "Preferência",
    frente: "Qual emenda tem preferência na votação: Supressiva ou Substitutiva?",
    verso: "Supressiva. (Art. 2536)",
    dificuldade: "Difícil"
  },
  {
    id: 150,
    topico: "Preferência",
    frente: "Emendas de Comissão têm preferência sobre emendas de Deputados?",
    verso: "Sim. (Art. 2539)",
    dificuldade: "Média"
  },

  // --- VETOS E PECs ---
  {
    id: 151,
    topico: "Veto",
    frente: "O Veto Parcial pode abranger apenas palavras isoladas?",
    verso: "Não. Deve abranger texto integral de artigo, parágrafo, inciso ou alínea. (Art. 2586)",
    dificuldade: "Média"
  },
  {
    id: 152,
    topico: "Veto",
    frente: "Qual o prazo para a Comissão emitir parecer sobre o Veto?",
    verso: "15 dias. (Art. 2589)",
    dificuldade: "Média"
  },
  {
    id: 153,
    topico: "Veto",
    frente: "Se a Comissão não der parecer no veto em 15 dias, o que acontece?",
    verso: "O Presidente designa Relator Especial (prazo de 3 dias). (Art. 2591)",
    dificuldade: "Difícil"
  },
  {
    id: 154,
    topico: "PEC",
    frente: "Quem pode propor Emenda à Constituição (PEC)?",
    verso: "1/3 dos deputados, Governador ou >50% das Câmaras Municipais. (Art. 2236)",
    dificuldade: "Média"
  },
  {
    id: 155,
    topico: "PEC",
    frente: "Pode haver PEC durante Intervenção Federal?",
    verso: "Não. (Art. 2240)",
    dificuldade: "Fácil"
  },
  {
    id: 156,
    topico: "PEC",
    frente: "Qual o prazo para Comissão Especial dar parecer em PEC?",
    verso: "10 dias. (Art. 2245)",
    dificuldade: "Média"
  },
  {
    id: 157,
    topico: "PEC",
    frente: "PEC rejeitada pode ser reapresentada na mesma sessão legislativa?",
    verso: "Não. (Art. 2255)",
    dificuldade: "Média"
  },
  {
    id: 158,
    topico: "Códigos",
    frente: "Qual o prazo para recebimento de sugestões em projetos de Código?",
    verso: "30 dias. (Art. 2664)",
    dificuldade: "Difícil"
  },
  {
    id: 159,
    topico: "Tribunal de Contas",
    frente: "Qual o prazo para a Comissão Especial opinar sobre indicação de Conselheiro?",
    verso: "10 dias. (Art. 2669)",
    dificuldade: "Média"
  },
  {
    id: 160,
    topico: "Tribunal de Contas",
    frente: "Qual o quórum para aprovar nome de Conselheiro?",
    verso: "Maioria absoluta (escrutínio secreto). (Art. 2674)",
    dificuldade: "Difícil"
  },
  {
    id: 161,
    topico: "Licença Governador",
    frente: "Qual o prazo para a CCJ opinar sobre pedido de licença do Governador?",
    verso: "3 dias. (Art. 2684)",
    dificuldade: "Difícil"
  },
  {
    id: 162,
    topico: "Licença Governador",
    frente: "Qual o quórum para aprovar licença do Governador?",
    verso: "Maioria dos presentes (simbólica). (Art. 2687)",
    dificuldade: "Média"
  },
  {
    id: 163,
    topico: "Orçamento",
    frente: "Qual o prazo para o Relator dar parecer na prestação de contas do Governador?",
    verso: "30 dias. (Art. 2620)",
    dificuldade: "Difícil"
  },
  {
    id: 164,
    topico: "Orçamento",
    frente: "O parecer da Comissão de Finanças sobre contas conclui por qual tipo de projeto?",
    verso: "Projeto de Decreto Legislativo. (Art. 2623)",
    dificuldade: "Média"
  },
  {
    id: 165,
    topico: "Orçamento",
    frente: "Qual o prazo para apresentar emendas ao Projeto de Orçamento Anual?",
    verso: "Primeiros 10 dias do prazo da comissão. (Art. 2636)",
    dificuldade: "Média"
  },
  {
    id: 166,
    topico: "Urgência (Gov)",
    frente: "O prazo de 45 dias para urgência solicitada pelo Governador corre durante o recesso?",
    verso: "Não. (Art. 2656)",
    dificuldade: "Média"
  },
  {
    id: 167,
    topico: "Urgência (Gov)",
    frente: "Projetos de Código podem tramitar no rito de urgência do Governador (45 dias)?",
    verso: "Não. (Art. 2656)",
    dificuldade: "Difícil"
  },
  {
    id: 168,
    topico: "Interstício",
    frente: "O que é interstício?",
    verso: "Prazo decorrente entre dois atos consecutivos da mesma proposição. (Art. 2577)",
    dificuldade: "Fácil"
  },
  {
    id: 169,
    topico: "Interstício",
    frente: "O interstício pode ser dispensado?",
    verso: "Sim, pelo Plenário, mas não se pode votar e discutir na mesma sessão. (Art. 2582)",
    dificuldade: "Média"
  },
  {
    id: 170,
    topico: "Tramitação",
    frente: "O que acontece com proposições não votadas ao fim da legislatura?",
    verso: "São arquivadas (salvo exceções como iniciativa popular). (Art. 2205)",
    dificuldade: "Média"
  },

  // --- CRIMES DE RESPONSABILIDADE (GOVERNADOR) ---
  {
    id: 171,
    topico: "Crime Resp.",
    frente: "Qual o prazo para o Governador apresentar defesa prévia após notificado da denúncia?",
    verso: "10 sessões (perante a Comissão Especial). (Art. 2735)",
    dificuldade: "Difícil"
  },
  {
    id: 172,
    topico: "Crime Resp.",
    frente: "Qual o prazo para a Comissão Especial emitir parecer sobre a denúncia contra o Governador?",
    verso: "10 dias. (Art. 2737)",
    dificuldade: "Média"
  },
  {
    id: 173,
    topico: "Crime Resp.",
    frente: "Qual o tempo de sustentação oral na sessão de julgamento da admissibilidade (Plenário)?",
    verso: "15 minutos para acusação e 15 para defesa. (Art. 2744)",
    dificuldade: "Média"
  },
  {
    id: 174,
    topico: "Crime Resp.",
    frente: "Como é a votação para autorizar processo contra o Governador?",
    verso: "Nominal (chamada dos deputados). (Art. 2747)",
    dificuldade: "Média"
  },
  {
    id: 175,
    topico: "Tribunal Especial",
    frente: "Como são escolhidos os 5 deputados do Tribunal Especial?",
    verso: "Eleição em votação aberta no Plenário. (Art. 2755)",
    dificuldade: "Difícil"
  },
  {
    id: 176,
    topico: "Tribunal Especial",
    frente: "Como são escolhidos os 5 desembargadores do Tribunal Especial?",
    verso: "Sorteio. (Art. 2754)",
    dificuldade: "Média"
  },
  {
    id: 177,
    topico: "Tribunal Especial",
    frente: "Quem é o Relator do processo no Tribunal Especial?",
    verso: "Escolhido por sorteio entre os membros (excluído o Presidente). (Art. 2757)",
    dificuldade: "Média"
  },
  {
    id: 178,
    topico: "Tribunal Especial",
    frente: "Qual o prazo para o Relator apresentar voto de instauração?",
    verso: "10 dias. (Art. 2758)",
    dificuldade: "Média"
  },
  {
    id: 179,
    topico: "Crime Comum",
    frente: "Qual o prazo para a Comissão Especial dar parecer em crime comum do Governador?",
    verso: "15 dias (após instrução). (Art. 2781)",
    dificuldade: "Difícil"
  },
  {
    id: 180,
    topico: "Crime Comum",
    frente: "Se o Governador não apresentar defesa em crime comum, o que acontece?",
    verso: "Nomeia-se defensor dativo (prazo 15 dias). (Art. 2780)",
    dificuldade: "Média"
  },
  {
    id: 181,
    topico: "Crime Comum",
    frente: "Qual o quórum para autorizar processo por crime comum contra o Governador?",
    verso: "2/3 dos membros (escrutínio secreto). (Art. 2785)",
    dificuldade: "Difícil"
  },
  {
    id: 182,
    topico: "Secretários",
    frente: "Quantas vezes um Secretário pode ser convocado simultaneamente por Comissões?",
    verso: "Não se admite convocação simultânea por mais de uma comissão. (Art. 2797)",
    dificuldade: "Média"
  },
  {
    id: 183,
    topico: "Secretários",
    frente: "Qual o tempo adicional (prorrogação) de fala de um Secretário convocado?",
    verso: "15 minutos. (Art. 2801)",
    dificuldade: "Fácil"
  },
  {
    id: 184,
    topico: "Secretários",
    frente: "O Secretário convocado deve enviar sumário da matéria?",
    verso: "Sim, até a véspera. (Art. 2800)",
    dificuldade: "Média"
  },
  {
    id: 185,
    topico: "CPI",
    frente: "A quem cabe a responsabilidade civil/criminal apurada na CPI?",
    verso: "Ao Ministério Público. (Art. 944)",
    dificuldade: "Fácil"
  },

  // --- ÉTICA, DECORO E DIVERSOS ---
  {
    id: 186,
    topico: "Decoro",
    frente: "Quem aplica a penalidade de Perda de Mandato?",
    verso: "A Mesa declara (faltas/sentença) ou Plenário decide (conduta). (Art. 1447, 1448)",
    dificuldade: "Difícil"
  },
  {
    id: 187,
    topico: "Decoro",
    frente: "O que é considerado procedimento incompatível com o decoro?",
    verso: "Abuso de prerrogativas, vantagens indevidas, irregularidades graves. (Art. 1677)",
    dificuldade: "Média"
  },
  {
    id: 188,
    topico: "Ética",
    frente: "Qual o prazo para instrução de processo de decoro na Corregedoria?",
    verso: "45 dias úteis. (Art. 1513)",
    dificuldade: "Difícil"
  },
  {
    id: 189,
    topico: "Procuradoria Mulher",
    frente: "Qual o mandato da Procuradora Especial da Mulher?",
    verso: "2 anos. (Art. 1262)",
    dificuldade: "Fácil"
  },
  {
    id: 190,
    topico: "Procuradoria Mulher",
    frente: "A Procuradoria da Mulher é subordinada à Consultoria Jurídica?",
    verso: "Não. (Art. 1279)",
    dificuldade: "Fácil"
  },
  {
    id: 191,
    topico: "CHAME",
    frente: "O que é o CHAME?",
    verso: "Centro Humanitário de Apoio à Mulher (prevenção à violência). (Art. 1314)",
    dificuldade: "Fácil"
  },
  {
    id: 192,
    topico: "Símbolos",
    frente: "Quais livros devem permanecer sobre a mesa do Plenário?",
    verso: "Bíblia, Constituição Federal, Constituição Estadual e Regimento Interno. (Art. 2836)",
    dificuldade: "Fácil"
  },
  {
    id: 193,
    topico: "Nomes",
    frente: "É permitido dar nome de pessoas vivas a dependências da Assembleia?",
    verso: "Não. É vedado. (Art. 2834)",
    dificuldade: "Fácil"
  },
  {
    id: 194,
    topico: "Omissão",
    frente: "Qual Regimento é usado subsidiariamente nos casos omissos?",
    verso: "O Regimento Interno da Câmara dos Deputados. (Art. 2835)",
    dificuldade: "Difícil"
  },
  {
    id: 195,
    topico: "Imprensa",
    frente: "O Comitê de Imprensa tem vínculo empregatício com a Assembleia?",
    verso: "Não. (Art. 2818)",
    dificuldade: "Fácil"
  },
  {
    id: 196,
    topico: "Deputado",
    frente: "Deputado é obrigado a testemunhar sobre informações do mandato?",
    verso: "Não. (Art. 1415)",
    dificuldade: "Média"
  },
  {
    id: 197,
    topico: "Deputado",
    frente: "O que acontece se o Deputado se desvincular do partido?",
    verso: "Perde cargos da bancada (líder, comissão), salvo Mesa Diretora. (Art. 1417)",
    dificuldade: "Difícil"
  },
  {
    id: 198,
    topico: "Suplente",
    frente: "Suplente convocado pode ser eleito para a Mesa?",
    verso: "Não. (Art. 1663)",
    dificuldade: "Média"
  },
  {
    id: 199,
    topico: "Licença",
    frente: "Quem concede licença para tratamento de saúde ao Deputado?",
    verso: "O Presidente (de ofício). (Art. 1571)",
    dificuldade: "Média"
  },
  {
    id: 200,
    topico: "Licença",
    frente: "Quem concede licença para interesse particular?",
    verso: "A Mesa da Assembleia. (Art. 1572)",
    dificuldade: "Média"
  }
];

export const FLASHCARDS = flashcardsRegimento;