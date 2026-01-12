/**
 * CORE - TIPOS DO ENGINE
 * Tipos internos do motor de estudos
 */

export interface EngineState {
  currentIndex: number;
  correct: number;
  wrong: number;
  answers: Record<
    string,
    {
      selected: number;
      correct: boolean;
      time: number;
    }
  >;
}

export interface EngineStats {
  total: number;
  correct: number;
  wrong: number;
  accuracy: number;
}
