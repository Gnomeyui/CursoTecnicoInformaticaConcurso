import React, { useState, useMemo } from 'react';
import { BookOpen, Search, Star, ChevronRight, ChevronDown, X } from 'lucide-react';
import { regimentoData } from '../data/regimento-interno';

interface RegimentoReaderProps {
  onClose: () => void;
  theme: string;
}

interface Artigo {
  numero: string;
  texto: string;
  paragrafos?: string[];
  incisos?: string[];
}

interface Capitulo {
  nome: string;
  artigos: Artigo[];
}

interface Titulo {
  titulo: string;
  capitulos: Capitulo[];
}

export default function RegimentoReader({ onClose, theme }: RegimentoReaderProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedTitulos, setExpandedTitulos] = useState<Set<number>>(new Set([0]));
  const [expandedCapitulos, setExpandedCapitulos] = useState<Set<string>>(new Set());
  const [selectedArtigo, setSelectedArtigo] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [viewMode, setViewMode] = useState<'index' | 'reading'>('index');

  const themeColors = {
    azul: { primary: '#2563eb', light: '#dbeafe', dark: '#1e40af' },
    verde: { primary: '#16a34a', light: '#dcfce7', dark: '#15803d' },
    roxo: { primary: '#9333ea', light: '#f3e8ff', dark: '#7e22ce' },
    laranja: { primary: '#ea580c', light: '#ffedd5', dark: '#c2410c' },
    rosa: { primary: '#db2777', light: '#fce7f3', dark: '#be185d' }
  };

  const currentTheme = themeColors[theme as keyof typeof themeColors] || themeColors.azul;

  // Busca de artigos
  const filteredContent = useMemo(() => {
    if (!searchQuery.trim()) return regimentoData.conteudo;

    const query = searchQuery.toLowerCase();
    return regimentoData.conteudo.map((titulo: Titulo) => ({
      ...titulo,
      capitulos: titulo.capitulos.map((capitulo: Capitulo) => ({
        ...capitulo,
        artigos: capitulo.artigos.filter((artigo: Artigo) =>
          artigo.numero.includes(query) ||
          artigo.texto.toLowerCase().includes(query) ||
          (artigo.paragrafos?.some(p => p.toLowerCase().includes(query))) ||
          (artigo.incisos?.some(i => i.toLowerCase().includes(query)))
        )
      })).filter((capitulo: Capitulo) => capitulo.artigos.length > 0)
    })).filter((titulo: Titulo) => titulo.capitulos.length > 0);
  }, [searchQuery]);

  const toggleTitulo = (index: number) => {
    const newExpanded = new Set(expandedTitulos);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedTitulos(newExpanded);
  };

  const toggleCapitulo = (id: string) => {
    const newExpanded = new Set(expandedCapitulos);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedCapitulos(newExpanded);
  };

  const toggleFavorite = (artigoId: string) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(artigoId)) {
      newFavorites.delete(artigoId);
    } else {
      newFavorites.add(artigoId);
    }
    setFavorites(newFavorites);
  };

  const viewArtigo = (artigoNumero: string) => {
    setSelectedArtigo(artigoNumero);
    setViewMode('reading');
  };

  const renderArtigo = (artigo: Artigo, tituloIndex: number, capituloIndex: number) => {
    const artigoId = `${tituloIndex}-${capituloIndex}-${artigo.numero}`;
    const isFavorite = favorites.has(artigoId);

    return (
      <div
        key={artigo.numero}
        onClick={() => viewArtigo(artigo.numero)}
        className="bg-white dark:bg-gray-800 p-3 rounded-lg border-l-4 cursor-pointer hover:shadow-md transition-shadow"
        style={{ borderLeftColor: currentTheme.primary }}
      >
        <div className="flex items-center justify-between mb-2">
          <span className="font-semibold text-sm" style={{ color: currentTheme.primary }}>
            Art. {artigo.numero}º
          </span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleFavorite(artigoId);
            }}
            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
          >
            <Star
              size={18}
              className={isFavorite ? 'text-yellow-500 fill-yellow-500' : 'text-gray-400'}
            />
          </button>
        </div>
        <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-3">
          {artigo.texto}
        </p>
        {artigo.paragrafos && artigo.paragrafos.length > 0 && (
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
            {artigo.paragrafos.length} parágrafo(s)
          </p>
        )}
      </div>
    );
  };

  const renderArtigoCompleto = () => {
    if (!selectedArtigo) return null;

    let artigoEncontrado: Artigo | null = null;
    let tituloNome = '';
    let capituloNome = '';

    regimentoData.conteudo.forEach((titulo: Titulo) => {
      titulo.capitulos.forEach((capitulo: Capitulo) => {
        const artigo = capitulo.artigos.find(a => a.numero === selectedArtigo);
        if (artigo) {
          artigoEncontrado = artigo;
          tituloNome = titulo.titulo;
          capituloNome = capitulo.nome;
        }
      });
    });

    if (!artigoEncontrado) return null;

    return (
      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="bg-card border-b border-border p-4 sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setViewMode('index')}
              className="p-2 hover:bg-accent rounded-lg transition-colors"
            >
              <X size={24} className="text-foreground" />
            </button>
            <h1 className="text-xl font-semibold text-foreground">
              Art. {artigoEncontrado.numero}º
            </h1>
          </div>
        </div>

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 px-4 py-3 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 text-xs text-gray-600 dark:text-gray-400">
          <span className="line-clamp-1">{tituloNome}</span>
          <ChevronRight size={14} />
          <span className="line-clamp-1">{capituloNome}</span>
        </div>

        {/* Content */}
        <div className="p-4 max-w-4xl mx-auto">
          <div className="rounded-lg p-6" style={{ backgroundColor: currentTheme.light }}>
            <p className="text-base leading-relaxed mb-4" style={{ color: currentTheme.dark }}>
              {artigoEncontrado.texto}
            </p>

            {artigoEncontrado.paragrafos && artigoEncontrado.paragrafos.length > 0 && (
              <div className="space-y-3 mt-6">
                {artigoEncontrado.paragrafos.map((paragrafo, index) => (
                  <p
                    key={index}
                    className="text-sm pl-4 border-l-2 leading-relaxed"
                    style={{ 
                      color: currentTheme.dark,
                      borderLeftColor: currentTheme.primary 
                    }}
                  >
                    {paragrafo}
                  </p>
                ))}
              </div>
            )}

            {artigoEncontrado.incisos && artigoEncontrado.incisos.length > 0 && (
              <div className="space-y-2 mt-6">
                {artigoEncontrado.incisos.map((inciso, index) => (
                  <p key={index} className="text-sm pl-4" style={{ color: currentTheme.dark }}>
                    {inciso}
                  </p>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  if (viewMode === 'reading') {
    return renderArtigoCompleto();
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="p-4 sticky top-0 z-10" style={{ backgroundColor: currentTheme.primary }}>
        <div className="flex items-center justify-between text-white mb-4">
          <div className="flex items-center gap-3">
            <BookOpen size={24} />
            <h1 className="text-lg font-semibold">Regimento Interno</h1>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
            <X size={24} />
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4">
        <h2 className="text-base font-semibold text-gray-900 dark:text-white">
          {regimentoData.documento.titulo}
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          Última atualização: {regimentoData.documento.ultima_atualizacao}
        </p>
      </div>

      {/* Search */}
      <div className="p-4">
        <div className="relative">
          <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar artigo, palavra-chave..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-10 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
            >
              <X size={18} className="text-gray-400" />
            </button>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="px-4 pb-6 space-y-2">
        {filteredContent.map((titulo: Titulo, tituloIndex: number) => (
          <div key={tituloIndex}>
            <button
              onClick={() => toggleTitulo(tituloIndex)}
              className="w-full flex items-center gap-2 p-4 rounded-lg transition-colors"
              style={{ backgroundColor: currentTheme.light }}
            >
              {expandedTitulos.has(tituloIndex) ? (
                <ChevronDown size={20} style={{ color: currentTheme.primary }} />
              ) : (
                <ChevronRight size={20} style={{ color: currentTheme.primary }} />
              )}
              <span className="flex-1 text-left text-sm font-semibold" style={{ color: currentTheme.dark }}>
                {titulo.titulo}
              </span>
            </button>

            {expandedTitulos.has(tituloIndex) && (
              <div className="ml-2 mt-2 space-y-2">
                {titulo.capitulos.map((capitulo: Capitulo, capituloIndex: number) => {
                  const capituloId = `${tituloIndex}-${capituloIndex}`;
                  return (
                    <div key={capituloIndex}>
                      <button
                        onClick={() => toggleCapitulo(capituloId)}
                        className="w-full flex items-center gap-2 p-3 bg-white dark:bg-gray-800 rounded-lg hover:shadow-sm transition-shadow"
                      >
                        {expandedCapitulos.has(capituloId) ? (
                          <ChevronDown size={18} className="text-gray-600 dark:text-gray-400" />
                        ) : (
                          <ChevronRight size={18} className="text-gray-600 dark:text-gray-400" />
                        )}
                        <span className="flex-1 text-left text-sm text-gray-700 dark:text-gray-300">
                          {capitulo.nome}
                        </span>
                      </button>

                      {expandedCapitulos.has(capituloId) && (
                        <div className="ml-6 mt-2 space-y-2">
                          {capitulo.artigos.map((artigo: Artigo) =>
                            renderArtigo(artigo, tituloIndex, capituloIndex)
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        ))}

        {searchQuery && filteredContent.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 text-gray-500 dark:text-gray-400">
            <Search size={48} className="mb-4" />
            <p className="text-center text-sm">
              Nenhum artigo encontrado para "{searchQuery}"
            </p>
          </div>
        )}
      </div>
    </div>
  );
}