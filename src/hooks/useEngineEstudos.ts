import { useState, useEffect, useCallback } from 'react';
import { engineEstudos } from '../lib/EngineEstudos';
import { PerfilUsuario, ItemEstudo, EstatisticaMateria } from '../types/estudos';

const STORAGE_KEY = 'ale_rr_perfil_estudos';

/**
 * Hook customizado para gerenciar o perfil de estudos
 */
export function useEngineEstudos() {
  const [perfil, setPerfil] = useState<PerfilUsuario>(() => {
    // Tenta carregar do localStorage
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          return {
            questoesRespondidasIds: new Set(parsed.questoesRespondidasIds || []),
            statsPorMateria: parsed.statsPorMateria || {}
          };
        } catch (e) {
          console.error('Erro ao carregar perfil:', e);
        }
      }
    }
    
    // Perfil inicial
    return {
      questoesRespondidasIds: new Set<string>(),
      statsPorMateria: {}
    };
  });

  // Salva no localStorage sempre que o perfil mudar
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const toSave = {
        questoesRespondidasIds: Array.from(perfil.questoesRespondidasIds),
        statsPorMateria: perfil.statsPorMateria
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
    }
  }, [perfil]);

  /**
   * Gera uma sessão inteligente
   */
  const gerarSessao = useCallback((
    bancoQuestoes: ItemEstudo[],
    quantidade: number
  ): ItemEstudo[] => {
    return engineEstudos.gerarSessaoDeEstudos(bancoQuestoes, perfil, quantidade);
  }, [perfil]);

  /**
   * Registra uma resposta
   */
  const registrarResposta = useCallback((
    materia: string,
    idQuestao: string,
    acertou: boolean
  ) => {
    setPerfil(prev => {
      const novoPerfil = {
        questoesRespondidasIds: new Set(prev.questoesRespondidasIds),
        statsPorMateria: { ...prev.statsPorMateria }
      };
      
      engineEstudos.registrarResposta(novoPerfil, materia, idQuestao, acertou);
      return novoPerfil;
    });
  }, []);

  /**
   * Reseta o perfil (útil para testes)
   */
  const resetarPerfil = useCallback(() => {
    setPerfil({
      questoesRespondidasIds: new Set<string>(),
      statsPorMateria: {}
    });
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  /**
   * Obter estatísticas gerais
   */
  const getEstatisticas = useCallback(() => {
    return engineEstudos.getEstatisticasGerais(perfil);
  }, [perfil]);

  /**
   * Verifica se uma questão já foi respondida
   */
  const jaRespondeu = useCallback((idQuestao: string): boolean => {
    return perfil.questoesRespondidasIds.has(idQuestao);
  }, [perfil]);

  /**
   * Obter estatística de uma matéria específica
   */
  const getStatMateria = useCallback((materia: string): EstatisticaMateria | null => {
    return perfil.statsPorMateria[materia] || null;
  }, [perfil]);

  return {
    perfil,
    gerarSessao,
    registrarResposta,
    resetarPerfil,
    getEstatisticas,
    jaRespondeu,
    getStatMateria
  };
}
