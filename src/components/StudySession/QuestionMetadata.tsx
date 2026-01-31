/**
 * @file QuestionMetadata.tsx
 * @description Metadados da questão (banca, ano, concurso)
 */

import React from 'react';

interface QuestionMetadataProps {
  banca?: string;
  ano?: string;
  concurso?: string;
}

export const QuestionMetadata: React.FC<QuestionMetadataProps> = ({
  banca,
  ano,
  concurso
}) => {
  // Não renderizar se não houver dados
  if (!banca && !ano && !concurso) return null;

  return (
    <div className="mb-4 pb-4 border-b border-border">
      <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
        {banca && (
          <span className="flex items-center gap-1">
            <span className="font-semibold">Banca:</span>
            <span>{banca}</span>
          </span>
        )}
        {ano && (
          <span className="flex items-center gap-1">
            <span className="font-semibold">Ano:</span>
            <span>{ano}</span>
          </span>
        )}
      </div>
      {concurso && (
        <div className="mt-1 text-xs text-muted-foreground">
          <span className="font-semibold">Concurso:</span> {concurso}
        </div>
      )}
    </div>
  );
};
