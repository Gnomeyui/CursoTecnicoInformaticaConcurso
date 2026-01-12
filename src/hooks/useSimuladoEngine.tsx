/**
 * HOOK - SIMULADO ENGINE
 * Hook para gerenciar simulados
 */

import { useState } from 'react';
import { Question } from '../domain/Question';
import { SimuladoEngine } from '../core/SimuladoEngine';
import { SimuladoResultado } from '../domain/Simulado';

export function useSimuladoEngine(questions: Question[]) {
  const [engine] = useState(() => new SimuladoEngine(questions));
  const [index, setIndex] = useState(0);
  const [resultado, setResultado] = useState<SimuladoResultado | null>(null);

  function responder(resposta: number, tempo: number) {
    engine.responder(questions[index], resposta, tempo);
    
    if (index + 1 >= questions.length) {
      // Finaliza simulado
      setResultado(engine.finalizar());
    } else {
      setIndex(i => i + 1);
    }
  }

  function finalizar() {
    setResultado(engine.finalizar());
  }

  return {
    questaoAtual: questions[index],
    index,
    total: questions.length,
    responder,
    finalizar,
    resultado,
    acabou: resultado !== null
  };
}
