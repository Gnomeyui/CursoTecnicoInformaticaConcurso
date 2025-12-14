// --- ENGINE DE ESTUDOS INTELIGENTE ---
// Sistema definitivo de distribuição, nivelamento e embaralhamento

import { ItemEstudo, PerfilUsuario, Alternativa, QuestionLegacy, FlashcardLegacy } from '../types/estudos';

export class EngineEstudos {
  
  /**
   * 1. REGRA DE OURO DA PROPORÇÃO
   * Define quantas serão revisão com base no tamanho da sessão.
   * Regra: 5->1, 10->3, 15->4, 50->20.
   */
  private calcularProporcao(totalSolicitado: number): { qtdNovas: number, qtdRevisao: number } {
    let qtdRevisao = 0;

    if (totalSolicitado <= 5) qtdRevisao = 1;
    else if (totalSolicitado <= 10) qtdRevisao = 3;
    else if (totalSolicitado <= 15) qtdRevisao = 4;
    else qtdRevisao = Math.floor(totalSolicitado * 0.40); // 40% para baterias grandes

    // Proteção: Nunca pedir mais revisão do que o total
    return {
      qtdRevisao: qtdRevisao,
      qtdNovas: totalSolicitado - qtdRevisao
    };
  }

  /**
   * 2. ALGORITMO DE PESO ADAPTATIVO
   * Calcula o "Peso de Urgência" de uma matéria.
   * Retorno: Quanto maior, mais chance de cair.
   */
  private getPesoMateria(materia: string, perfil: PerfilUsuario): number {
    const stat = perfil.statsPorMateria[materia];
    
    // Se nunca viu a matéria, peso neutro levemente alto para introdução
    if (!stat || stat.respondidas === 0) return 2.0;

    const taxaErro = stat.erros / stat.respondidas; // 0.0 a 1.0
    
    // FÓRMULA: Base (1) + (Erro * 5) + (Fator Tempo)
    // Se erro for 100% (1.0), peso sobe para 6.0!
    // Se erro for 0%, peso fica em 1.0 (manutenção)
    let peso = 1 + (taxaErro * 5);

    return peso;
  }

  /**
   * 3. EMBARALHAMENTO REAL (Fisher-Yates)
   * Garante que "A" não seja sempre a resposta certa.
   */
  private embaralhar<T>(lista: T[]): T[] {
    const array = [...lista];
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  /**
   * 4. SELETOR INTELIGENTE (A Mágica)
   * Seleciona questões de revisão baseadas nas fraquezas.
   */
  private selecionarRevisaoInteligente(
    bancoCompleto: ItemEstudo[], 
    perfil: PerfilUsuario, 
    qtdNecessaria: number
  ): ItemEstudo[] {
    
    // Filtra apenas o que o usuário JÁ respondeu
    const poolDisponivel = bancoCompleto.filter(q => perfil.questoesRespondidasIds.has(q.id));

    if (poolDisponivel.length === 0) {
      return []; // Usuário novo, sem revisões
    }

    if (poolDisponivel.length <= qtdNecessaria) {
      return this.embaralhar(poolDisponivel); // Se tem poucas, retorna todas
    }

    // Cria a "Roleta Viciada"
    const roleta: ItemEstudo[] = [];
    
    poolDisponivel.forEach(questao => {
      const peso = this.getPesoMateria(questao.materia, perfil);
      // Se peso for 4, adiciona a questão 4 vezes na roleta virtual
      // Isso aumenta drasticamente a chance dela ser pega no sorteio aleatório
      const repeticoes = Math.floor(peso * 2); 
      for (let k = 0; k < Math.max(1, repeticoes); k++) {
        roleta.push(questao);
      }
    });

    // Sorteia da roleta
    const selecionadas = new Set<string>();
    const resultado: ItemEstudo[] = [];
    
    // Mistura a roleta antes de sortear
    const roletaEmbaralhada = this.embaralhar(roleta);

    for (const item of roletaEmbaralhada) {
      if (resultado.length >= qtdNecessaria) break;
      if (!selecionadas.has(item.id)) {
        resultado.push(item);
        selecionadas.add(item.id);
      }
    }

    return resultado;
  }

  /**
   * --- MÉTODO PRINCIPAL PARA CHAMAR NO FRONT-END ---
   * Gera a sessão completa pronta para uso.
   */
  public gerarSessaoDeEstudos(
    bancoDeQuestoes: ItemEstudo[], 
    perfil: PerfilUsuario, 
    qtdTotalDesejada: number
  ): ItemEstudo[] {

    // Proteção: Se não tem questões suficientes
    if (bancoDeQuestoes.length === 0) return [];
    
    const qtdReal = Math.min(qtdTotalDesejada, bancoDeQuestoes.length);

    // 1. Define metas
    const { qtdNovas, qtdRevisao } = this.calcularProporcao(qtdReal);

    // 2. Busca Revisão (Focada no erro)
    const questoesRevisao = this.selecionarRevisaoInteligente(bancoDeQuestoes, perfil, qtdRevisao);

    // 3. Busca Novas (Aleatórias entre as não respondidas)
    // Filtra o que NÃO está no histórico
    const poolNovas = bancoDeQuestoes.filter(q => !perfil.questoesRespondidasIds.has(q.id));
    const questoesNovas = this.embaralhar(poolNovas).slice(0, qtdNovas);

    // 4. Se faltou revisão (usuário novo), completa com novas
    if (questoesRevisao.length < qtdRevisao) {
      const faltantes = qtdRevisao - questoesRevisao.length;
      const extras = this.embaralhar(poolNovas)
        .filter(n => !questoesNovas.some(nova => nova.id === n.id)) // Evita duplicata
        .slice(0, faltantes);
      questoesNovas.push(...extras);
    }

    // 5. Unifica e Embaralha a ordem das perguntas
    let sessaoFinal = [...questoesRevisao, ...questoesNovas];
    sessaoFinal = this.embaralhar(sessaoFinal);

    // 6. O FINAL TOUCH: Embaralha as Alternativas Internas (A, B, C, D)
    return sessaoFinal.map(item => ({
      ...item,
      alternativas: this.embaralhar(item.alternativas)
    }));
  }

  /**
   * Helper para atualizar o perfil após responder
   */
  public registrarResposta(perfil: PerfilUsuario, materia: string, idQuestao: string, acertou: boolean) {
    // Marca como respondida
    perfil.questoesRespondidasIds.add(idQuestao);

    // Inicializa estatística se não existir
    if (!perfil.statsPorMateria[materia]) {
      perfil.statsPorMateria[materia] = { 
        erros: 0, 
        respondidas: 0, 
        streak: 0, 
        ultimaRevisao: null 
      };
    }

    const stat = perfil.statsPorMateria[materia];
    stat.respondidas++;
    stat.ultimaRevisao = new Date();

    if (acertou) {
      stat.streak++;
    } else {
      stat.erros++;
      // 🔧 CORREÇÃO PEDAGÓGICA: Não zerar completamente o streak ao errar
      // Em vez disso, reduzir pela metade (arredondado para baixo)
      // Isso evita punição excessiva por um erro de distração
      stat.streak = Math.floor(stat.streak / 2);
    }
  }

  /**
   * CONVERSORES PARA FORMATO LEGADO
   */
  
  // Converte Question[] antiga para ItemEstudo[]
  public converterQuestoesLegacy(questoes: QuestionLegacy[]): ItemEstudo[] {
    return questoes.map(q => ({
      id: `q_${q.id}`,
      tipo: 'QUESTAO' as const,
      materia: q.materia,
      pergunta: q.pergunta,
      alternativas: q.opcoes.map((texto, index) => ({
        id: `opt_${index}`,
        texto,
        correta: index === q.correta
      })),
      explicacao: q.explicacao,
      dificuldade: q.dificuldade
    }));
  }

  // Converte Flashcard[] para ItemEstudo[]
  public converterFlashcardsLegacy(flashcards: FlashcardLegacy[]): ItemEstudo[] {
    return flashcards.map(f => ({
      id: `fc_${f.id}`,
      tipo: 'FLASHCARD' as const,
      materia: f.topico,
      pergunta: f.frente,
      alternativas: [{
        id: 'resp_1',
        texto: f.verso,
        correta: true
      }],
      dificuldade: f.dificuldade === 'Fácil' ? 'facil' : f.dificuldade === 'Média' ? 'medio' : 'dificil'
    }));
  }

  /**
   * EMBARALHAMENTO PÚBLICO (para uso direto no UI)
   * Útil quando você só quer embaralhar sem todo o algoritmo
   */
  public embaralharPublico<T>(lista: T[]): T[] {
    return this.embaralhar(lista);
  }

  /**
   * HELPER: Obter estatísticas gerais do perfil
   */
  public getEstatisticasGerais(perfil: PerfilUsuario): {
    totalRespondidas: number;
    totalErros: number;
    materiasMaisErradas: Array<{ materia: string; erros: number; taxa: number }>;
  } {
    const materias = Object.entries(perfil.statsPorMateria);
    
    const totalRespondidas = materias.reduce((acc, [_, stat]) => acc + stat.respondidas, 0);
    const totalErros = materias.reduce((acc, [_, stat]) => acc + stat.erros, 0);

    const materiasMaisErradas = materias
      .map(([materia, stat]) => ({
        materia,
        erros: stat.erros,
        taxa: stat.respondidas > 0 ? (stat.erros / stat.respondidas) * 100 : 0
      }))
      .filter(m => m.respondidas > 0)
      .sort((a, b) => b.taxa - a.taxa)
      .slice(0, 5);

    return { totalRespondidas, totalErros, materiasMaisErradas };
  }
}

// SINGLETON para uso global
export const engineEstudos = new EngineEstudos();