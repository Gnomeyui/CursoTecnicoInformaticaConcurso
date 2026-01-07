import React, { useState, useMemo } from 'react';
import { 
  ArrowLeft, 
  Plus, 
  Check, 
  Trash2, 
  GraduationCap, 
  Building2, 
  Search,
  BookOpen,
  Briefcase,
  X
} from 'lucide-react';
import { useConcursoProfile, perfisPredefinidos, ConcursoProfile } from '../context/ConcursoProfileContext';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';

interface ProfileSelectorProps {
  onBack: () => void;
}

export function ProfileSelector({ onBack }: ProfileSelectorProps) {
  const { profiles, activeProfile, createProfile, setActiveProfile, deleteProfile } = useConcursoProfile();
  
  // Estados locais
  const [searchTerm, setSearchTerm] = useState('');
  const [isCreatingCustom, setIsCreatingCustom] = useState(false);
  const [customProfile, setCustomProfile] = useState({
    nome: '',
    nivel: 'medio' as 'fundamental' | 'medio' | 'superior',
    orgao: '',
    materias: [] as string[],
  });

  // Filtro inteligente: Busca na lista gigante de cargos
  const filteredPredefined = useMemo(() => {
    if (!searchTerm) return perfisPredefinidos.slice(0, 5); // Mostra 5 sugestões se vazio
    
    const term = searchTerm.toLowerCase().trim();
    return perfisPredefinidos.filter(p => 
      p.nome.toLowerCase().includes(term) || 
      p.orgao.toLowerCase().includes(term)
    ).slice(0, 15); // Limita a 15 resultados para não travar
  }, [searchTerm]);

  const allMaterias = [
    'Informática', 
    'Legislação', 
    'Português', 
    'Raciocínio Lógico', 
    'Direito Adm.', 
    'Direito Const.',
    'Matemática',
    'Atualidades',
    'LGPD',
    'Governança de TI'
  ];

  // Handlers
  const handleCreateCustom = () => {
    if (customProfile.nome) {
      createProfile({
        ...customProfile,
        orgao: customProfile.orgao || 'Geral', // Valor padrão se vazio
        materias: customProfile.materias.length > 0 ? customProfile.materias : ['Português'] // Mínimo 1 matéria
      });
      setIsCreatingCustom(false);
      setCustomProfile({ nome: '', nivel: 'medio', orgao: '', materias: [] });
      setSearchTerm(''); // Limpa busca
    }
  };

  const handleAddPredefined = (cargo: typeof perfisPredefinidos[0]) => {
    createProfile(cargo);
    setSearchTerm(''); // Limpa busca após adicionar
  };

  const toggleMateria = (materia: string) => {
    setCustomProfile(prev => ({
      ...prev,
      materias: prev.materias.includes(materia)
        ? prev.materias.filter(m => m !== materia)
        : [...prev.materias, materia]
    }));
  };

  // Cores por nível
  const getNivelBadge = (nivel: string) => {
    switch(nivel) {
      case 'superior': return 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 border-purple-200 dark:border-purple-800';
      case 'medio': return 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-800';
      default: return 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800';
    }
  };

  const getNivelLabel = (nivel: string) => {
    switch(nivel) {
      case 'superior': return 'Superior';
      case 'medio': return 'Médio';
      default: return 'Fundamental';
    }
  };

  return (
    <div className="min-h-screen bg-app pb-20 animate-in slide-in-from-right duration-300">
      
      {/* 1. Header Fixo */}
      <div className="bg-card-theme p-4 sticky top-0 z-10 shadow-sm flex items-center gap-4 border-b border-gray-200 dark:border-gray-700">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="h-6 w-6" />
        </Button>
        <div>
          <h1 className="text-xl font-bold text-app">Gerenciar Perfis</h1>
          <p className="text-xs text-gray-500 dark:text-gray-400">Selecione seu foco de estudo</p>
        </div>
      </div>

      <div className="p-4 space-y-6 max-w-xl mx-auto">

        {/* 2. Perfil Ativo (Destaque) */}
        {activeProfile && (
          <section>
            <h2 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase mb-2 ml-1">
              Estudando Agora
            </h2>
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-5 text-white shadow-lg relative overflow-hidden">
              <Building2 className="absolute right-[-20px] bottom-[-20px] h-32 w-32 text-white opacity-10" />
              
              <div className="relative z-10">
                <div className="flex justify-between items-start">
                  <div>
                    <Badge className="bg-white/20 hover:bg-white/30 text-white border-0 mb-2">
                      {activeProfile.orgao}
                    </Badge>
                    <h2 className="text-2xl font-bold">{activeProfile.nome}</h2>
                    <p className="text-blue-100 text-sm flex items-center gap-1 mt-1">
                      <GraduationCap size={14} /> 
                      Nível {getNivelLabel(activeProfile.nivel)}
                    </p>
                    {activeProfile.materias && activeProfile.materias.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-3">
                        {activeProfile.materias.slice(0, 4).map((materia, idx) => (
                          <span 
                            key={idx}
                            className="text-xs bg-white/10 px-2 py-1 rounded text-blue-50"
                          >
                            {materia}
                          </span>
                        ))}
                        {activeProfile.materias.length > 4 && (
                          <span className="text-xs bg-white/10 px-2 py-1 rounded text-blue-50">
                            +{activeProfile.materias.length - 4}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                  <div className="bg-white text-blue-600 rounded-full p-2 shadow-md">
                    <Check size={20} strokeWidth={3} />
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* 3. Lista de Perfis Salvos (se houver mais além do ativo) */}
        {profiles.length > 1 && (
          <section>
            <h2 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase mb-2 ml-1">
              Meus Outros Perfis
            </h2>
            <div className="space-y-3">
              {profiles.filter(p => !p.ativo).map(profile => (
                <Card 
                  key={profile.id} 
                  className="border-l-4 border-l-gray-300 dark:border-l-gray-600 hover:border-l-blue-400 transition-all active:scale-[0.98] cursor-pointer"
                  onClick={() => setActiveProfile(profile.id)}
                >
                  <CardContent className="p-4 flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-800 dark:text-gray-200">{profile.nome}</h3>
                      <div className="flex items-center gap-2 mt-1 flex-wrap">
                        <Badge variant="outline" className="text-xs">
                          {profile.orgao}
                        </Badge>
                        <Badge variant="outline" className={`text-xs ${getNivelBadge(profile.nivel)}`}>
                          {getNivelLabel(profile.nivel)}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-1">
                      <Button 
                        size="icon" 
                        variant="ghost" 
                        className="text-red-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (window.confirm(`Deseja realmente excluir o perfil "${profile.nome}"?`)) {
                            deleteProfile(profile.id);
                          }
                        }}
                      >
                        <Trash2 size={18} />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* 4. Adicionar Novo (Busca Inteligente) */}
        <section className="pt-4 border-t border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
            <div className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full p-1">
              <Plus size={20} />
            </div>
            Adicionar Novo Objetivo
          </h2>

          {/* Barra de Busca */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <Input 
              placeholder="Busque seu cargo (ex: Agente, Técnico, Analista)..." 
              className="pl-10 pr-10 h-12 text-base"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <X size={20} />
              </button>
            )}
          </div>

          {/* Indicador de resultados */}
          {searchTerm && (
            <div className="mb-3 text-sm text-gray-500 dark:text-gray-400">
              {filteredPredefined.length > 0 ? (
                <span>Encontrados {filteredPredefined.length} resultados</span>
              ) : (
                <span>Nenhum resultado encontrado</span>
              )}
            </div>
          )}

          {/* Lista de Resultados da Busca */}
          <div className="space-y-2 mb-6">
            {filteredPredefined.map((cargo, idx) => (
              <button
                key={idx}
                onClick={() => handleAddPredefined(cargo)}
                className="w-full text-left bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/10 transition-all shadow-sm flex justify-between items-center group"
              >
                <div className="flex-1">
                  <p className="font-bold text-gray-800 dark:text-gray-200 group-hover:text-blue-700 dark:group-hover:text-blue-400">
                    {cargo.nome}
                  </p>
                  <div className="flex gap-2 mt-1 flex-wrap">
                    <Badge variant="outline" className="text-xs font-normal text-gray-600 dark:text-gray-400">
                      {cargo.orgao}
                    </Badge>
                    <Badge variant="outline" className={`text-xs font-normal border ${getNivelBadge(cargo.nivel)}`}>
                      {getNivelLabel(cargo.nivel)}
                    </Badge>
                  </div>
                </div>
                <Plus className="text-gray-300 group-hover:text-blue-500 dark:group-hover:text-blue-400 flex-shrink-0 ml-2" />
              </button>
            ))}
            
            {searchTerm && filteredPredefined.length === 0 && (
              <div className="text-center p-8 bg-gray-50 dark:bg-gray-800 rounded-xl">
                <BookOpen className="mx-auto h-12 w-12 text-gray-300 mb-3" />
                <p className="text-gray-500 dark:text-gray-400 mb-1">Nenhum cargo encontrado</p>
                <p className="text-sm text-gray-400 dark:text-gray-500">
                  Tente termos como "Técnico", "Agente" ou "Analista"
                </p>
              </div>
            )}

            {!searchTerm && filteredPredefined.length > 0 && (
              <div className="text-center py-2">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  💡 Digite acima para buscar entre 439+ cargos
                </p>
              </div>
            )}
          </div>

          {/* Botão para criar Personalizado (se não achar na busca) */}
          <div className="text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Não encontrou o que procurava?</p>
            {!isCreatingCustom ? (
              <Button 
                variant="outline" 
                className="w-full border-dashed border-2 h-12"
                onClick={() => {
                  setIsCreatingCustom(true);
                  setSearchTerm(''); // Limpa busca
                }}
              >
                <Plus className="mr-2" size={18} />
                Criar Cargo Personalizado
              </Button>
            ) : (
              <Card className="border-blue-200 dark:border-blue-800 shadow-sm text-left animate-in fade-in zoom-in duration-200">
                <CardContent className="p-4">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="font-bold text-gray-800 dark:text-gray-200">Novo Cargo Personalizado</h3>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => {
                        setIsCreatingCustom(false);
                        setCustomProfile({ nome: '', nivel: 'medio', orgao: '', materias: [] });
                      }}
                    >
                      <X size={18} />
                    </Button>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="text-xs font-bold text-gray-600 dark:text-gray-400 mb-1 block">
                        Nome do Cargo *
                      </label>
                      <Input 
                        placeholder="Ex: Auditor Fiscal" 
                        value={customProfile.nome}
                        onChange={e => setCustomProfile({...customProfile, nome: e.target.value})}
                      />
                    </div>
                    
                    <div>
                      <label className="text-xs font-bold text-gray-600 dark:text-gray-400 mb-1 block">
                        Órgão / Banca
                      </label>
                      <Input 
                        placeholder="Ex: FGV, CESPE, Prefeitura..." 
                        value={customProfile.orgao}
                        onChange={e => setCustomProfile({...customProfile, orgao: e.target.value})}
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-gray-600 dark:text-gray-400 mb-2 block">
                        Nível de Escolaridade
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {(['fundamental', 'medio', 'superior'] as const).map(nivel => (
                          <button
                            key={nivel}
                            onClick={() => setCustomProfile({...customProfile, nivel})}
                            className={`text-sm px-3 py-2 rounded-lg border transition-all ${
                              customProfile.nivel === nivel
                                ? 'bg-blue-100 dark:bg-blue-900/30 border-blue-400 text-blue-700 dark:text-blue-400 font-bold'
                                : 'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400'
                            }`}
                          >
                            {getNivelLabel(nivel)}
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <label className="text-xs font-bold text-gray-600 dark:text-gray-400 mb-2 block">
                        Matérias Principais (opcional)
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {allMaterias.map(m => (
                          <button
                            key={m}
                            onClick={() => toggleMateria(m)}
                            className={`text-xs px-3 py-1.5 rounded-full border transition-all ${
                              customProfile.materias.includes(m)
                                ? 'bg-blue-100 dark:bg-blue-900/30 border-blue-400 text-blue-700 dark:text-blue-400 font-medium'
                                : 'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400'
                            }`}
                          >
                            {customProfile.materias.includes(m) && <Check size={12} className="inline mr-1" />}
                            {m}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <Button 
                        variant="ghost" 
                        className="flex-1" 
                        onClick={() => {
                          setIsCreatingCustom(false);
                          setCustomProfile({ nome: '', nivel: 'medio', orgao: '', materias: [] });
                        }}
                      >
                        Cancelar
                      </Button>
                      <Button 
                        className="flex-1 bg-blue-600 hover:bg-blue-700" 
                        onClick={handleCreateCustom}
                        disabled={!customProfile.nome}
                      >
                        <Check size={18} className="mr-2" />
                        Criar Perfil
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

        </section>

      </div>
    </div>
  );
}
