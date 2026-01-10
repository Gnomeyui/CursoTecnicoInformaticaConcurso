/**
 * FUNÇÃO HELPER PARA ESCOLHER FRASE MOTIVACIONAL ALEATÓRIA
 * 
 * Escolhe uma frase diferente do array de CTAs motivacionais
 * a cada renderização para manter o conteúdo fresco
 */

import { COPY } from './copy';

export function getRandomMotivationalCTA(): string {
  const ctas = COPY.home.motivationalCTA;
  const randomIndex = Math.floor(Math.random() * ctas.length);
  return ctas[randomIndex];
}
