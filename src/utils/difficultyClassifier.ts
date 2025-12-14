// Utilitário para classificar questões por dificuldade automaticamente
// Baseado em palavras-chave e complexidade da pergunta

export function classifyDifficulty(question: string, materia: string): 'facil' | 'medio' | 'dificil' {
  const perguntaLower = question.toLowerCase();
  const materiaLower = materia.toLowerCase();

  //  🟢 FÁCIL: Conceitos básicos, definições diretas, perguntas simples
  const facilKeywords = [
    'o que é', 'qual é', 'significa', 'definição',
    'quantos', 'qual comando', 'qual porta',
    'responsável por', 'utiliza', 'função',
    'tipo de', 'exemplo de', 'usado para'
  ];

  // 🟡 MÉDIO: Aplicações práticas, comparações, cenários reais
  const medioKeywords = [
    'diferença', 'comparação', 'quando', 'como',
    'cenário', 'técnico', 'administrador',
    'configurar', 'implementar', 'gerenciar',
    'melhor', 'adequado', 'recomendado'
  ];

  // 🔴 DIFÍCIL: Análise profunda, múltiplos conceitos, jurisprudência
  const dificilKeywords = [
    'considerando', 'analise', 'conforme',
    'jurisprudência', 'stf', 'tcu',
    'múltiplos', 'complexo', 'avançado',
    'exceto', 'incorreto', 'não'
  ];

  // Contagem de caracteres (questões mais longas tendem a ser mais difíceis)
  const isLong = question.length > 200;
  const isVeryLong = question.length > 300;

  // Verificar palavras-chave
  const hasFacilKeyword = facilKeywords.some(kw => perguntaLower.includes(kw));
  const hasMedioKeyword = medioKeywords.some(kw => perguntaLower.includes(kw));
  const hasDificilKeyword = dificilKeywords.some(kw => perguntaLower.includes(kw));

  // Matérias que geralmente são mais difíceis
  const isDificultMateria = materiaLower.includes('jurisprudência') || 
                             materiaLower.includes('constitucional') ||
                             materiaLower.includes('administrativo');

  // Lógica de classificação
  if (hasDificilKeyword || isVeryLong || (isDificultMateria && isLong)) {
    return 'dificil';
  }

  if (hasMedioKeyword || isLong || isDificultMateria) {
    return 'medio';
  }

  if (hasFacilKeyword) {
    return 'facil';
  }

  // Padrão: médio
  return 'medio';
}
