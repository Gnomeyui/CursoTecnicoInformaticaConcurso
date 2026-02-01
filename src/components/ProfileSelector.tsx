import React, { useState, useMemo, useEffect, useRef } from 'react';
import { ArrowLeft, Plus, Check, Trash2, GraduationCap, Building2, Search, X } from 'lucide-react';
import { useConcursoProfile, perfisPredefinidos } from '../context/ConcursoProfileContext';
import { useCustomization } from '../context/CustomizationContext';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { sqliteService } from '../lib/database/SQLiteService';

interface ProfileSelectorProps {
  onBack: () => void;
}

export function ProfileSelector({ onBack }: ProfileSelectorProps) {
  const { profiles, activeProfile, createProfile, setActiveProfile, deleteProfile } = useConcursoProfile();
  const { theme } = useCustomization(); // Obter tema ativo
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Estados para autocomplete de cargo
  const [availableCargos, setAvailableCargos] = useState<string[]>([]);
  const [showCargoSuggestions, setShowCargoSuggestions] = useState(false);
  const [filteredCargos, setFilteredCargos] = useState<string[]>([]);
  const cargoInputRef = useRef<HTMLInputElement>(null);
  const cargoDropdownRef = useRef<HTMLDivElement>(null);
  
  // Estado para novo perfil
  const [customProfile, setCustomProfile] = useState({
    nome: '',
    nivel: 'medio' as 'fundamental' | 'medio' | 'superior',
    orgao: '',
    materias: [] as string[],
  });

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

  // Lógica de Filtro (Busca Inteligente)
  const filteredPredefined = useMemo(() => {
    if (!searchTerm.trim()) {
      return perfisPredefinidos.slice(0, 8); // 8 sugestões iniciais
    }
    
    const term = searchTerm.toLowerCase();
    return perfisPredefinidos.filter(p => 
      p.nome.toLowerCase().includes(term) || 
      p.orgao.toLowerCase().includes(term)
    ).slice(0, 20); // Máximo 20 resultados
  }, [searchTerm]);

  const handleCreateCustom = () => {
    if (customProfile.nome) {
      createProfile({
        ...customProfile,
        orgao: customProfile.orgao || 'Personalizado',
        materias: customProfile.materias.length > 0 ? customProfile.materias : ['Português']
      });
      setShowCreateForm(false);
      setSearchTerm('');
      setCustomProfile({ nome: '', nivel: 'medio', orgao: '', materias: [] });
    }
  };

  const toggleMateria = (materia: string) => {
    setCustomProfile(prev => ({
      ...prev,
      materias: prev.materias.includes(materia)
        ? prev.materias.filter(m => m !== materia)
        : [...prev.materias, materia]
    }));
  };

  // Helpers de UI
  const getNivelLabel = (nivel: string) => ({
    fundamental: 'Fundamental', 
    medio: 'Médio', 
    superior: 'Superior'
  }[nivel] || nivel);

  const getNivelColor = (nivel: string) => ({
    fundamental: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800',
    medio: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-800',
    superior: 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 border-purple-200 dark:border-purple-800',
  }[nivel] || 'bg-gray-100 dark:bg-gray-800');

  // Buscar cargos disponíveis do banco de dados
  useEffect(() => {
    const fetchCargos = async () => {
      try {
        console.log('📚 Tentando carregar cargos do banco...');
        await sqliteService.initialize();
        const result = await sqliteService.query(
          'SELECT DISTINCT cargo FROM exams ORDER BY cargo ASC',
          []
        );
        const cargos = result.map((row: any) => row.cargo).filter(Boolean);
        console.log('🔍 Cargos carregados do banco:', cargos.length, cargos.slice(0, 5));
        
        // Se não houver cargos no banco, usar os perfis predefinidos como fallback
        if (cargos.length === 0) {
          console.log('⚠️ Banco vazio, usando perfis predefinidos como fallback');
          const cargosPredefinidos = perfisPredefinidos.map(p => p.nome);
          setAvailableCargos(cargosPredefinidos);
        } else {
          setAvailableCargos(cargos);
        }
      } catch (error) {
        console.error('❌ Erro ao buscar cargos:', error);
        // Fallback: usar perfis predefinidos
        console.log('🔄 Usando perfis predefinidos como fallback');
        const cargosPredefinidos = perfisPredefinidos.map(p => p.nome);
        setAvailableCargos(cargosPredefinidos);
      }
    };
    
    if (showCreateForm) {
      fetchCargos();
    }
  }, [showCreateForm]);

  // Filtrar cargos conforme digitação
  useEffect(() => {
    console.log('🔎 Filtrando cargos:', {
      nomeDigitado: customProfile.nome,
      cargosDisponiveis: availableCargos.length
    });
    
    if (customProfile.nome.trim() && availableCargos.length > 0) {
      const term = customProfile.nome.toLowerCase();
      const filtered = availableCargos
        .filter(cargo => cargo.toLowerCase().includes(term))
        .slice(0, 8); // Máximo 8 sugestões
      
      console.log('✅ Cargos filtrados:', filtered.length, filtered);
      setFilteredCargos(filtered);
      setShowCargoSuggestions(filtered.length > 0);
    } else {
      setFilteredCargos([]);
      setShowCargoSuggestions(false);
    }
  }, [customProfile.nome, availableCargos]);

  // Fechar dropdown ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      const clickedInput = cargoInputRef.current && cargoInputRef.current.contains(target);
      const clickedDropdown = cargoDropdownRef.current && cargoDropdownRef.current.contains(target);
      
      if (!clickedInput && !clickedDropdown) {
        setShowCargoSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header Fixo */}
      <div className="sticky top-0 bg-background z-10 pb-4 pt-4 px-4 border-b border-border">
        <div className="flex items-center gap-4 mb-4">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft className="size-6" />
          </Button>
          <div>
            <h1 className="text-xl font-bold text-foreground">Gerenciar Perfis</h1>
            <p className="text-xs text-muted-foreground">Qual o seu foco hoje?</p>
          </div>
        </div>

        {/* Barra de Busca - Sempre visível quando não está criando */}
        {!showCreateForm && (
          <div className="relative">
            <Search className="absolute left-3 top-3.5 h-5 w-5 text-muted-foreground" />
            <input 
              placeholder="Buscar cargo (ex: Técnico, Agente, Analista)..." 
              className="w-full pl-10 pr-10 py-3 rounded-xl border-none shadow-sm bg-card text-foreground focus:ring-2 focus:ring-primary placeholder:text-muted-foreground"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-3 p-0.5 hover:bg-accent rounded-full transition-colors"
              >
                <X className="h-5 w-5 text-muted-foreground" />
              </button>
            )}
          </div>
        )}
      </div>

      <div className="p-4 space-y-6">
        {/* Formulário de Criação (Overlay limpo) */}
        {showCreateForm ? (
          <Card className="border-blue-200 dark:border-blue-800 shadow-lg animate-in slide-in-from-bottom-4 duration-200">
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-lg text-foreground">Novo Objetivo</h3>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => {
                    setShowCreateForm(false);
                    setCustomProfile({ nome: '', nivel: 'medio', orgao: '', materias: [] });
                  }}
                >
                  <X className="text-muted-foreground" />
                </Button>
              </div>
              
              <div className="space-y-4">
                <div className="relative">
                  <label className="text-xs font-bold text-muted-foreground uppercase mb-1 block">
                    Cargo *
                  </label>
                  <input 
                    value={customProfile.nome}
                    onChange={e => setCustomProfile({...customProfile, nome: e.target.value})}
                    onFocus={() => customProfile.nome && setShowCargoSuggestions(true)}
                    placeholder="Ex: Auditor Fiscal"
                    className="w-full p-3 rounded-lg border border-border bg-background text-foreground focus:ring-2 focus:ring-primary"
                    ref={cargoInputRef}
                  />
                  {showCargoSuggestions && filteredCargos.length > 0 && (
                    <div className="absolute z-50 mt-1 w-full bg-card border border-border shadow-lg rounded-lg max-h-48 overflow-y-auto" ref={cargoDropdownRef}>
                      {filteredCargos.map((cargo, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => {
                            setCustomProfile({...customProfile, nome: cargo});
                            setShowCargoSuggestions(false);
                          }}
                          className="w-full text-left px-4 py-2.5 text-sm text-foreground hover:bg-accent transition-colors first:rounded-t-lg last:rounded-b-lg border-b border-border last:border-b-0"
                        >
                          {cargo}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                
                <div>
                  <label className="text-xs font-bold text-muted-foreground uppercase mb-1 block">
                    Órgão / Banca
                  </label>
                  <input 
                    value={customProfile.orgao}
                    onChange={e => setCustomProfile({...customProfile, orgao: e.target.value})}
                    placeholder="Ex: FGV, CESPE, Prefeitura..."
                    className="w-full p-3 rounded-lg border border-border bg-background text-foreground focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-muted-foreground uppercase mb-2 block">
                    Nível de Escolaridade
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {(['fundamental', 'medio', 'superior'] as const).map(nivel => (
                      <button
                        key={nivel}
                        onClick={() => setCustomProfile({...customProfile, nivel})}
                        className={`text-sm px-3 py-2.5 rounded-lg border-2 font-medium transition-all ${
                          customProfile.nivel === nivel
                            ? 'bg-blue-100 dark:bg-blue-500/20 border-blue-500 text-blue-700 dark:text-blue-400'
                            : 'bg-muted border-border text-muted-foreground hover:border-primary/50'
                        }`}
                      >
                        {getNivelLabel(nivel)}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="text-xs font-bold text-muted-foreground uppercase mb-2 block">
                    Matérias Principais (opcional)
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {allMaterias.map(m => (
                      <button
                        key={m}
                        onClick={() => toggleMateria(m)}
                        className={`text-xs px-3 py-2 rounded-full border transition-all ${
                          customProfile.materias.includes(m)
                            ? 'bg-blue-100 dark:bg-blue-500/20 border-blue-400 text-blue-700 dark:text-blue-400 font-semibold'
                            : 'bg-muted border-border text-muted-foreground hover:border-primary/50'
                        }`}
                      >
                        {customProfile.materias.includes(m) && <Check size={12} className="inline mr-1" />}
                        {m}
                      </button>
                    ))}
                  </div>
                </div>

                <Button 
                  onClick={handleCreateCustom}
                  disabled={!customProfile.nome}
                  className="w-full py-6 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Check size={18} className="mr-2" />
                  Salvar Perfil
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          /* Listas de Perfis */
          <div className="space-y-6">
            
            {/* Seus Perfis Salvos */}
            {profiles.length > 0 && !searchTerm && (
              <section>
                <h2 className="text-sm font-bold text-muted-foreground uppercase mb-3 ml-1">
                  Meus Perfis
                </h2>
                <div className="space-y-3">
                  {profiles.map(profile => (
                    <div 
                      key={profile.id}
                      onClick={() => {
                        if (profile.ativo) {
                          // Se já está ativo, desseleciona (passa null)
                          setActiveProfile(null);
                        } else {
                          // Se não está ativo, seleciona
                          setActiveProfile(profile.id);
                        }
                      }}
                      className={`relative p-4 rounded-xl border-2 transition-all group overflow-hidden cursor-pointer active:scale-[0.98] ${ 
                        profile.ativo 
                          ? `border-2 ${theme.border} bg-card` 
                          : 'bg-card border-border hover:border-primary/50'
                      }`}
                    >
                      {/* Efeito de brilho de fundo sutil baseado na cor do tema (apenas para perfil ativo) */}
                      {profile.ativo && (
                        <div className={`absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity ${theme.bgLight}`} />
                      )}
                      
                      <div className="flex justify-between items-start relative z-10">
                        <div className="flex-1">
                          {profile.ativo && (
                            <span className="text-[10px] font-extrabold uppercase tracking-widest mb-1 block text-black dark:text-black">
                              Foco Atual
                            </span>
                          )}
                          <h3 className={`font-bold ${profile.ativo ? 'text-xl' : ''} text-foreground`}>
                            {profile.nome}
                          </h3>
                          <p className="text-xs text-muted-foreground mt-0.5">{profile.orgao}</p>
                          {profile.materias && profile.materias.length > 0 && (
                            <div className="flex flex-wrap gap-1 mt-2">
                              {profile.materias.slice(0, 3).map((mat, idx) => (
                                <span 
                                  key={idx}
                                  className="text-xs bg-muted px-2 py-0.5 rounded text-black dark:text-black"
                                >
                                  {mat}
                                </span>
                              ))}
                              {profile.materias.length > 3 && (
                                <span className="text-xs text-black dark:text-black">
                                  +{profile.materias.length - 3}
                                </span>
                              )}
                            </div>
                          )}
                        </div>
                        
                        {profile.ativo ? (
                          <div className={`h-10 w-10 rounded-full bg-gradient-to-br ${theme.gradient} flex items-center justify-center text-white shadow-md`}>
                            <Check size={20} strokeWidth={3} />
                          </div>
                        ) : (
                          <button 
                            onClick={(e) => { 
                              e.stopPropagation(); 
                              if (window.confirm(`Deseja realmente excluir "${profile.nome}"?`)) {
                                deleteProfile(profile.id);
                              }
                            }}
                            className="text-muted-foreground hover:text-red-500 dark:hover:text-red-400 p-1 transition-colors"
                          >
                            <Trash2 size={18} />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Sugestões / Resultados da Busca */}
            <section>
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-sm font-bold text-muted-foreground uppercase ml-1">
                  {searchTerm ? `Resultados (${filteredPredefined.length})` : `Todos os Cargos (${perfisPredefinidos.length})`}
                </h2>
                <button 
                  onClick={() => {
                    setShowCreateForm(true);
                    setSearchTerm('');
                  }}
                  className="text-blue-600 dark:text-blue-400 text-sm font-bold flex items-center gap-1 hover:text-blue-700 dark:hover:text-blue-300"
                >
                  <Plus size={16} /> Criar Outro
                </button>
              </div>
              
              <div className="space-y-3">
                {(searchTerm ? filteredPredefined : perfisPredefinidos).map((perfil, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      createProfile(perfil);
                      setSearchTerm('');
                    }}
                    className={`w-full text-left bg-card p-4 rounded-xl shadow-sm border transition-all flex justify-between items-center group active:scale-[0.98] border-border hover:${theme.border.replace('border-', 'border-')} hover:shadow-sm hover:bg-accent/50`}
                  >
                    <div className="flex-1">
                      <div className={`font-bold text-foreground group-hover:${theme.primaryText} transition-colors`}>
                        {perfil.nome}
                      </div>
                      <div className="flex gap-2 mt-1.5 flex-wrap">
                        <Badge variant="outline" className="text-xs font-normal text-black dark:text-black">
                          {perfil.orgao}
                        </Badge>
                        <Badge variant="outline" className="text-xs font-normal border text-black dark:text-black">
                          {getNivelLabel(perfil.nivel)}
                        </Badge>
                      </div>
                    </div>
                    <div className={`p-2 rounded-full transition-colors ml-3 text-muted-foreground bg-muted group-hover:${theme.bgLight} group-hover:${theme.primaryText}`}>
                      <Plus size={20} />
                    </div>
                  </button>
                ))}
                
                {searchTerm && filteredPredefined.length === 0 && (
                  <div className="text-center py-10 px-4">
                    <div className="bg-muted rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                      <Search className="text-muted-foreground" size={32} />
                    </div>
                    <p className="text-foreground mb-2">Nenhum cargo encontrado</p>
                    <p className="text-sm text-muted-foreground mb-4">
                      Tente termos como "Técnico", "Agente" ou "Analista"
                    </p>
                    <button 
                      onClick={() => {
                        setShowCreateForm(true);
                        setCustomProfile({...customProfile, nome: searchTerm});
                      }}
                      className="text-blue-600 dark:text-blue-400 font-bold hover:underline"
                    >
                      Criar "{searchTerm}" manualmente
                    </button>
                  </div>
                )}

                {!searchTerm && perfisPredefinidos.length === 0 && (
                  <div className="text-center py-4">
                    <p className="text-sm text-muted-foreground">
                      Nenhum cargo disponível no momento
                    </p>
                  </div>
                )}
              </div>
            </section>
          </div>
        )}
      </div>
    </div>
  );
}