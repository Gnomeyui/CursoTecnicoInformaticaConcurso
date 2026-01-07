import React, { useState } from 'react';
import { ArrowLeft, Plus, Check, Trash2, GraduationCap, BookOpen, Building2 } from 'lucide-react';
import { useConcursoProfile, perfisPredefinidos, ConcursoProfile } from '../context/ConcursoProfileContext';

interface ProfileSelectorProps {
  onBack: () => void;
}

export function ProfileSelector({ onBack }: ProfileSelectorProps) {
  const { profiles, activeProfile, createProfile, setActiveProfile, deleteProfile } = useConcursoProfile();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [customProfile, setCustomProfile] = useState({
    nome: '',
    nivel: 'medio' as 'fundamental' | 'medio' | 'superior',
    orgao: 'ALE-RR',
    materias: [] as string[],
  });

  const allMaterias = ['Informática', 'Legislação', 'Português', 'LGPD', 'Governança de TI'];

  const handleCreateFromPredefined = (perfil: typeof perfisPredefinidos[0]) => {
    createProfile(perfil);
  };

  const handleCreateCustom = () => {
    if (customProfile.nome && customProfile.materias.length > 0) {
      createProfile(customProfile);
      setShowCreateForm(false);
      setCustomProfile({
        nome: '',
        nivel: 'medio',
        orgao: 'ALE-RR',
        materias: [],
      });
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

  const getNivelLabel = (nivel: string) => {
    const labels = {
      fundamental: 'Fundamental',
      medio: 'Médio',
      superior: 'Superior',
    };
    return labels[nivel as keyof typeof labels] || nivel;
  };

  const getNivelColor = (nivel: string) => {
    const colors = {
      fundamental: 'bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400',
      medio: 'bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400',
      superior: 'bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400',
    };
    return colors[nivel as keyof typeof colors] || colors.medio;
  };

  return (
    <div className="min-h-screen p-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={onBack}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
        >
          <ArrowLeft className="size-6 text-gray-700 dark:text-gray-300" />
        </button>
        <div>
          <h1 className="text-2xl text-gray-900 dark:text-gray-100">Perfis de Concurso</h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Escolha ou crie o concurso que está estudando
          </p>
        </div>
      </div>

      {/* Perfil Ativo Atual */}
      {activeProfile && (
        <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl p-6 mb-6 text-white">
          <div className="flex items-start justify-between mb-3">
            <div>
              <p className="text-sm opacity-90 mb-1">Estudando para:</p>
              <h2 className="text-2xl font-bold">{activeProfile.nome}</h2>
            </div>
            <Check className="size-8 bg-white/20 rounded-full p-1.5" />
          </div>
          <div className="flex items-center gap-3 text-sm">
            <span className="bg-white/20 px-3 py-1 rounded-full flex items-center gap-1">
              <Building2 className="size-4" />
              {activeProfile.orgao}
            </span>
            <span className="bg-white/20 px-3 py-1 rounded-full flex items-center gap-1">
              <GraduationCap className="size-4" />
              Nível {getNivelLabel(activeProfile.nivel)}
            </span>
          </div>
          <div className="mt-4 pt-4 border-t border-white/20">
            <p className="text-xs opacity-90 mb-2">Matérias:</p>
            <div className="flex flex-wrap gap-2">
              {activeProfile.materias.map(materia => (
                <span key={materia} className="text-xs bg-white/20 px-2 py-1 rounded-lg">
                  {materia}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Meus Perfis */}
      {profiles.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg mb-3 text-gray-900 dark:text-gray-100">Meus Perfis</h3>
          <div className="space-y-3">
            {profiles.map(profile => (
              <div
                key={profile.id}
                className={`bg-white dark:bg-gray-800 rounded-xl p-4 border-2 transition-all ${
                  profile.ativo
                    ? 'border-blue-500'
                    : 'border-gray-200 dark:border-gray-700'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h4 className="text-gray-900 dark:text-gray-100 mb-1">{profile.nome}</h4>
                    <div className="flex items-center gap-2 text-xs">
                      <span className="text-gray-600 dark:text-gray-400">{profile.orgao}</span>
                      <span className={`px-2 py-0.5 rounded-full ${getNivelColor(profile.nivel)}`}>
                        {getNivelLabel(profile.nivel)}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {profile.materias.map(materia => (
                        <span
                          key={materia}
                          className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-0.5 rounded"
                        >
                          {materia}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {!profile.ativo && (
                      <button
                        onClick={() => setActiveProfile(profile.id)}
                        className="px-3 py-1.5 bg-blue-500 hover:bg-blue-600 text-white text-sm rounded-lg transition-colors"
                      >
                        Ativar
                      </button>
                    )}
                    <button
                      onClick={() => deleteProfile(profile.id)}
                      className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                    >
                      <Trash2 className="size-4 text-red-500" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Criar Novo Perfil */}
      <div className="mb-6">
        <button
          onClick={() => setShowCreateForm(!showCreateForm)}
          className="w-full bg-white dark:bg-gray-800 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl p-4 hover:border-blue-500 dark:hover:border-blue-500 transition-colors flex items-center justify-center gap-2 text-gray-700 dark:text-gray-300"
        >
          <Plus className="size-5" />
          <span>Criar Perfil Personalizado</span>
        </button>
      </div>

      {/* Formulário Criar Perfil Personalizado */}
      {showCreateForm && (
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 mb-6 border-2 border-blue-500">
          <h3 className="text-lg mb-4 text-gray-900 dark:text-gray-100">Novo Perfil Personalizado</h3>
          
          <div className="space-y-4">
            {/* Nome do Cargo */}
            <div>
              <label className="block text-sm mb-2 text-gray-700 dark:text-gray-300">
                Nome do Cargo
              </label>
              <input
                type="text"
                value={customProfile.nome}
                onChange={(e) => setCustomProfile(prev => ({ ...prev, nome: e.target.value }))}
                placeholder="Ex: Técnico em Informática"
                className="w-full px-4 py-2 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:border-blue-500 outline-none"
              />
            </div>

            {/* Órgão */}
            <div>
              <label className="block text-sm mb-2 text-gray-700 dark:text-gray-300">
                Órgão
              </label>
              <input
                type="text"
                value={customProfile.orgao}
                onChange={(e) => setCustomProfile(prev => ({ ...prev, orgao: e.target.value }))}
                placeholder="Ex: ALE-RR, TRE-RO"
                className="w-full px-4 py-2 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:border-blue-500 outline-none"
              />
            </div>

            {/* Nível */}
            <div>
              <label className="block text-sm mb-2 text-gray-700 dark:text-gray-300">
                Nível de Escolaridade
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['fundamental', 'medio', 'superior'] as const).map(nivel => (
                  <button
                    key={nivel}
                    onClick={() => setCustomProfile(prev => ({ ...prev, nivel }))}
                    className={`py-2 rounded-lg border-2 transition-all text-sm ${
                      customProfile.nivel === nivel
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                        : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    {getNivelLabel(nivel)}
                  </button>
                ))}
              </div>
            </div>

            {/* Matérias */}
            <div>
              <label className="block text-sm mb-2 text-gray-700 dark:text-gray-300">
                Matérias do Concurso
              </label>
              <div className="grid grid-cols-2 gap-2">
                {allMaterias.map(materia => (
                  <button
                    key={materia}
                    onClick={() => toggleMateria(materia)}
                    className={`py-2 px-3 rounded-lg border-2 transition-all text-sm text-left ${
                      customProfile.materias.includes(materia)
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                        : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    {materia}
                  </button>
                ))}
              </div>
            </div>

            {/* Botões */}
            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setShowCreateForm(false)}
                className="flex-1 py-2 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleCreateCustom}
                disabled={!customProfile.nome || customProfile.materias.length === 0}
                className="flex-1 py-2 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 dark:disabled:bg-gray-700 text-white rounded-lg transition-colors disabled:cursor-not-allowed"
              >
                Criar Perfil
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Perfis Pré-definidos */}
      <div>
        <h3 className="text-lg mb-3 text-gray-900 dark:text-gray-100 flex items-center gap-2">
          <BookOpen className="size-5" />
          Perfis Sugeridos
        </h3>
        <div className="grid gap-3">
          {perfisPredefinidos.map((perfil, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-xl p-4 border-2 border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="text-gray-900 dark:text-gray-100 mb-1">{perfil.nome}</h4>
                  <div className="flex items-center gap-2 text-xs mb-2">
                    <span className="text-gray-600 dark:text-gray-400">{perfil.orgao}</span>
                    <span className={`px-2 py-0.5 rounded-full ${getNivelColor(perfil.nivel)}`}>
                      {getNivelLabel(perfil.nivel)}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {perfil.materias.map(materia => (
                      <span
                        key={materia}
                        className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-0.5 rounded"
                      >
                        {materia}
                      </span>
                    ))}
                  </div>
                </div>
                <button
                  onClick={() => handleCreateFromPredefined(perfil)}
                  className="px-3 py-1.5 bg-blue-500 hover:bg-blue-600 text-white text-sm rounded-lg transition-colors whitespace-nowrap ml-2"
                >
                  Adicionar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
