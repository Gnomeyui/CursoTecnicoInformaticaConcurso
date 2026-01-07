import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface ConcursoProfile {
  id: string;
  nome: string; // Ex: "Técnico em Informática"
  nivel: 'fundamental' | 'medio' | 'superior'; // Nível de escolaridade
  orgao: string; // Ex: "ALE-RR", "TRE-RO"
  materias: string[]; // Matérias específicas do concurso
  ativo: boolean; // Se está sendo estudado atualmente
  criadoEm: string;
}

// Perfis pré-definidos comuns - TODOS OS CARGOS DE CONCURSOS PÚBLICOS
export const perfisPredefinidos: Omit<ConcursoProfile, 'id' | 'ativo' | 'criadoEm'>[] = [
  // ========================================
  // NÍVEL FUNDAMENTAL
  // ========================================
  { nome: 'Agente Comunitário de Saúde', nivel: 'fundamental', orgao: 'Concursos Públicos', materias: ['Português', 'Matemática', 'Conhecimentos Gerais'] },
  { nome: 'Agente de Combate as Endemias', nivel: 'fundamental', orgao: 'Concursos Públicos', materias: ['Português', 'Matemática', 'Conhecimentos Gerais'] },
  { nome: 'Agente de Endemias', nivel: 'fundamental', orgao: 'Concursos Públicos', materias: ['Português', 'Matemática', 'Conhecimentos Gerais'] },
  { nome: 'Agente de Portaria', nivel: 'fundamental', orgao: 'Concursos Públicos', materias: ['Português', 'Matemática'] },
  { nome: 'Agente de Serviços Gerais', nivel: 'fundamental', orgao: 'Concursos Públicos', materias: ['Português', 'Matemática'] },
  { nome: 'Atendente', nivel: 'fundamental', orgao: 'Concursos Públicos', materias: ['Português', 'Matemática'] },
  { nome: 'Auxiliar de Almoxarifado', nivel: 'fundamental', orgao: 'Concursos Públicos', materias: ['Português', 'Matemática'] },
  { nome: 'Auxiliar de Biblioteca', nivel: 'fundamental', orgao: 'Concursos Públicos', materias: ['Português', 'Matemática'] },
  { nome: 'Auxiliar de Cozinha', nivel: 'fundamental', orgao: 'Concursos Públicos', materias: ['Português', 'Matemática'] },
  { nome: 'Auxiliar de Creche', nivel: 'fundamental', orgao: 'Concursos Públicos', materias: ['Português', 'Matemática'] },
  { nome: 'Auxiliar de Manutenção', nivel: 'fundamental', orgao: 'Concursos Públicos', materias: ['Português', 'Matemática'] },
  { nome: 'Auxiliar de Mecânico', nivel: 'fundamental', orgao: 'Concursos Públicos', materias: ['Português', 'Matemática'] },
  { nome: 'Auxiliar de Serviços', nivel: 'fundamental', orgao: 'Concursos Públicos', materias: ['Português', 'Matemática'] },
  { nome: 'Auxiliar de Serviços Gerais', nivel: 'fundamental', orgao: 'Concursos Públicos', materias: ['Português', 'Matemática'] },
  { nome: 'Auxiliar Operacional', nivel: 'fundamental', orgao: 'Concursos Públicos', materias: ['Português', 'Matemática'] },
  { nome: 'Bombeiro Hidráulico', nivel: 'fundamental', orgao: 'Concursos Públicos', materias: ['Português', 'Matemática'] },
  { nome: 'Borracheiro', nivel: 'fundamental', orgao: 'Concursos Públicos', materias: ['Português', 'Matemática'] },
  { nome: 'Calceteiro', nivel: 'fundamental', orgao: 'Concursos Públicos', materias: ['Português', 'Matemática'] },
  { nome: 'Carpinteiro', nivel: 'fundamental', orgao: 'Concursos Públicos', materias: ['Português', 'Matemática'] },
  { nome: 'Contínuo', nivel: 'fundamental', orgao: 'Concursos Públicos', materias: ['Português', 'Matemática'] },
  { nome: 'Coveiro', nivel: 'fundamental', orgao: 'Concursos Públicos', materias: ['Português', 'Matemática'] },
  { nome: 'Cozinheira', nivel: 'fundamental', orgao: 'Concursos Públicos', materias: ['Português', 'Matemática'] },
  { nome: 'Cozinheiro', nivel: 'fundamental', orgao: 'Concursos Públicos', materias: ['Português', 'Matemática'] },
  { nome: 'Eletricista', nivel: 'fundamental', orgao: 'Concursos Públicos', materias: ['Português', 'Matemática'] },
  { nome: 'Encanador', nivel: 'fundamental', orgao: 'Concursos Públicos', materias: ['Português', 'Matemática'] },
  { nome: 'Gari', nivel: 'fundamental', orgao: 'Concursos Públicos', materias: ['Português', 'Matemática'] },
  { nome: 'Jardineiro', nivel: 'fundamental', orgao: 'Concursos Públicos', materias: ['Português', 'Matemática'] },
  { nome: 'Marceneiro', nivel: 'fundamental', orgao: 'Concursos Públicos', materias: ['Português', 'Matemática'] },
  { nome: 'Mecânico', nivel: 'fundamental', orgao: 'Concursos Públicos', materias: ['Português', 'Matemática'] },
  { nome: 'Merendeira', nivel: 'fundamental', orgao: 'Concursos Públicos', materias: ['Português', 'Matemática'] },
  { nome: 'Mestre de Obras', nivel: 'fundamental', orgao: 'Concursos Públicos', materias: ['Português', 'Matemática'] },
  { nome: 'Monitor de Creche', nivel: 'fundamental', orgao: 'Concursos Públicos', materias: ['Português', 'Matemática'] },
  { nome: 'Motorista', nivel: 'fundamental', orgao: 'Concursos Públicos', materias: ['Português', 'Matemática', 'Legislação de Trânsito'] },
  { nome: 'Motorista "D"', nivel: 'fundamental', orgao: 'Concursos Públicos', materias: ['Português', 'Matemática', 'Legislação de Trânsito'] },
  { nome: 'Motorista de Ambulância', nivel: 'fundamental', orgao: 'Concursos Públicos', materias: ['Português', 'Matemática', 'Legislação de Trânsito'] },
  { nome: 'Motorista de Veículos Leves', nivel: 'fundamental', orgao: 'Concursos Públicos', materias: ['Português', 'Matemática', 'Legislação de Trânsito'] },
  { nome: 'Motorista de Veículos Pesados', nivel: 'fundamental', orgao: 'Concursos Públicos', materias: ['Português', 'Matemática', 'Legislação de Trânsito'] },
  { nome: 'Operador de Máquina', nivel: 'fundamental', orgao: 'Concursos Públicos', materias: ['Português', 'Matemática'] },
  { nome: 'Operador de máquinas agrícolas', nivel: 'fundamental', orgao: 'Concursos Públicos', materias: ['Português', 'Matemática'] },
  { nome: 'Operador de Máquinas Pesadas', nivel: 'fundamental', orgao: 'Concursos Públicos', materias: ['Português', 'Matemática'] },
  { nome: 'Operário', nivel: 'fundamental', orgao: 'Concursos Públicos', materias: ['Português', 'Matemática'] },
  { nome: 'Pedreiro', nivel: 'fundamental', orgao: 'Concursos Públicos', materias: ['Português', 'Matemática'] },
  { nome: 'Pintor', nivel: 'fundamental', orgao: 'Concursos Públicos', materias: ['Português', 'Matemática'] },
  { nome: 'Porteiro', nivel: 'fundamental', orgao: 'Concursos Públicos', materias: ['Português', 'Matemática'] },
  { nome: 'Serralheiro', nivel: 'fundamental', orgao: 'Concursos Públicos', materias: ['Português', 'Matemática'] },
  { nome: 'Servente', nivel: 'fundamental', orgao: 'Concursos Públicos', materias: ['Português', 'Matemática'] },
  { nome: 'Servente de Pedreiro', nivel: 'fundamental', orgao: 'Concursos Públicos', materias: ['Português', 'Matemática'] },
  { nome: 'Serviços Gerais', nivel: 'fundamental', orgao: 'Concursos Públicos', materias: ['Português', 'Matemática'] },
  { nome: 'Soldador', nivel: 'fundamental', orgao: 'Concursos Públicos', materias: ['Português', 'Matemática'] },
  { nome: 'Tratorista', nivel: 'fundamental', orgao: 'Concursos Públicos', materias: ['Português', 'Matemática'] },
  { nome: 'Vigia', nivel: 'fundamental', orgao: 'Concursos Públicos', materias: ['Português', 'Matemática'] },
  { nome: 'Vigilante', nivel: 'fundamental', orgao: 'Concursos Públicos', materias: ['Português', 'Matemática'] },
  { nome: 'Zelador', nivel: 'fundamental', orgao: 'Concursos Públicos', materias: ['Português', 'Matemática'] },

  // ========================================
  // NÍVEL MÉDIO / TÉCNICO
  // ========================================
  { nome: 'Agente Administrativo', nivel: 'medio', orgao: 'Concursos Públicos', materias: ['Português', 'Matemática', 'Informática', 'Legislação'] },
  { nome: 'Agente Administrativo I', nivel: 'medio', orgao: 'Concursos Públicos', materias: ['Português', 'Matemática', 'Informática', 'Legislação'] },
  { nome: 'Agente de Defesa Civil', nivel: 'medio', orgao: 'Concursos Públicos', materias: ['Português', 'Matemática', 'Conhecimentos Gerais'] },
  { nome: 'Agente de Fiscalização', nivel: 'medio', orgao: 'Concursos Públicos', materias: ['Português', 'Legislação'] },
  { nome: 'Agente de Polícia', nivel: 'medio', orgao: 'Concursos Públicos', materias: ['Português', 'Direito', 'Legislação'] },
  { nome: 'Agente de Saúde', nivel: 'medio', orgao: 'Concursos Públicos', materias: ['Português', 'Conhecimentos em Saúde'] },
  { nome: 'Agente de Trânsito', nivel: 'medio', orgao: 'Concursos Públicos', materias: ['Português', 'Legislação de Trânsito'] },
  { nome: 'Agente de Vigilância Sanitária', nivel: 'medio', orgao: 'Concursos Públicos', materias: ['Português', 'Vigilância Sanitária'] },
  { nome: 'Agente Fiscal', nivel: 'medio', orgao: 'Concursos Públicos', materias: ['Português', 'Legislação Tributária'] },
  { nome: 'Agente Municipal de Trânsito', nivel: 'medio', orgao: 'Concursos Públicos', materias: ['Português', 'Legislação de Trânsito'] },
  { nome: 'Agente Operacional', nivel: 'medio', orgao: 'Concursos Públicos', materias: ['Português', 'Matemática'] },
  { nome: 'Agente Penitenciário', nivel: 'medio', orgao: 'Concursos Públicos', materias: ['Português', 'Direito', 'Legislação Penal'] },
  { nome: 'Agente Social', nivel: 'medio', orgao: 'Concursos Públicos', materias: ['Português', 'Conhecimentos Gerais'] },
  { nome: 'Almoxarife', nivel: 'medio', orgao: 'Concursos Públicos', materias: ['Português', 'Matemática', 'Administração'] },
  { nome: 'Assistente Administrativo', nivel: 'medio', orgao: 'ALE-RR', materias: ['Português', 'Legislação', 'Informática'] },
  { nome: 'Assistente Administrativo I', nivel: 'medio', orgao: 'Concursos Públicos', materias: ['Português', 'Informática', 'Legislação'] },
  { nome: 'Assistente de Administração', nivel: 'medio', orgao: 'Concursos Públicos', materias: ['Português', 'Administração'] },
  { nome: 'Assistente de Alunos', nivel: 'medio', orgao: 'Concursos Públicos', materias: ['Português', 'Conhecimentos Pedagógicos'] },
  { nome: 'Assistente de Informática', nivel: 'medio', orgao: 'Concursos Públicos', materias: ['Informática', 'Português'] },
  { nome: 'Assistente de Laboratório', nivel: 'medio', orgao: 'Concursos Públicos', materias: ['Português', 'Química', 'Biologia'] },
  { nome: 'Assistente em Administração', nivel: 'medio', orgao: 'Concursos Públicos', materias: ['Português', 'Administração'] },
  { nome: 'Assistente Jurídico', nivel: 'medio', orgao: 'Concursos Públicos', materias: ['Português', 'Direito'] },
  { nome: 'Assistente Legislativo', nivel: 'medio', orgao: 'Concursos Públicos', materias: ['Português', 'Legislação'] },
  { nome: 'Assistente Técnico', nivel: 'medio', orgao: 'Concursos Públicos', materias: ['Português', 'Conhecimentos Específicos'] },
  { nome: 'Assistente Técnico Administrativo', nivel: 'medio', orgao: 'Concursos Públicos', materias: ['Português', 'Administração'] },
  { nome: 'Atendente de Consultório Dentário', nivel: 'medio', orgao: 'Concursos Públicos', materias: ['Português', 'Saúde Bucal'] },
  { nome: 'Atendente de Farmácia', nivel: 'medio', orgao: 'Concursos Públicos', materias: ['Português', 'Farmácia'] },
  { nome: 'Auxiliar Administrativo', nivel: 'medio', orgao: 'Concursos Públicos', materias: ['Português', 'Matemática', 'Informática'] },
  { nome: 'Auxiliar de Administração', nivel: 'medio', orgao: 'Concursos Públicos', materias: ['Português', 'Administração'] },
  { nome: 'Auxiliar de Consultório Dentário', nivel: 'medio', orgao: 'Concursos Públicos', materias: ['Português', 'Saúde Bucal'] },
  { nome: 'Auxiliar de Consultório Odontológico', nivel: 'medio', orgao: 'Concursos Públicos', materias: ['Português', 'Saúde Bucal'] },
  { nome: 'Auxiliar de Contabilidade', nivel: 'medio', orgao: 'Concursos Públicos', materias: ['Português', 'Contabilidade'] },
  { nome: 'Auxiliar de Dentista', nivel: 'medio', orgao: 'Concursos Públicos', materias: ['Português', 'Saúde Bucal'] },
  { nome: 'Auxiliar de Enfermagem', nivel: 'medio', orgao: 'Concursos Públicos', materias: ['Português', 'Enfermagem'] },
  { nome: 'Auxiliar de Enfermagem do Trabalho', nivel: 'medio', orgao: 'Concursos Públicos', materias: ['Português', 'Enfermagem', 'Segurança do Trabalho'] },
  { nome: 'Auxiliar de Farmácia', nivel: 'medio', orgao: 'Concursos Públicos', materias: ['Português', 'Farmácia'] },
  { nome: 'Auxiliar de Laboratório', nivel: 'medio', orgao: 'Concursos Públicos', materias: ['Português', 'Química', 'Biologia'] },
  { nome: 'Auxiliar de Odontologia', nivel: 'medio', orgao: 'Concursos Públicos', materias: ['Português', 'Saúde Bucal'] },
  { nome: 'Auxiliar de Saúde Bucal', nivel: 'medio', orgao: 'Concursos Públicos', materias: ['Português', 'Saúde Bucal'] },
  { nome: 'Auxiliar de Secretária', nivel: 'medio', orgao: 'Concursos Públicos', materias: ['Português', 'Administração'] },
  { nome: 'Auxiliar de Secretária Escolar', nivel: 'medio', orgao: 'Concursos Públicos', materias: ['Português', 'Conhecimentos Pedagógicos'] },
  { nome: 'Auxiliar em Administração', nivel: 'medio', orgao: 'Concursos Públicos', materias: ['Português', 'Administração'] },
  { nome: 'Auxiliar em Enfermagem', nivel: 'medio', orgao: 'Concursos Públicos', materias: ['Português', 'Enfermagem'] },
  { nome: 'Auxiliar em Saúde Bucal', nivel: 'medio', orgao: 'Concursos Públicos', materias: ['Português', 'Saúde Bucal'] },
  { nome: 'Auxiliar Odontológico', nivel: 'medio', orgao: 'Concursos Públicos', materias: ['Português', 'Saúde Bucal'] },
  { nome: 'Coordenador Pedagógico', nivel: 'medio', orgao: 'Concursos Públicos', materias: ['Português', 'Pedagogia'] },
  { nome: 'Desenhista', nivel: 'medio', orgao: 'Concursos Públicos', materias: ['Português', 'Desenho Técnico'] },
  { nome: 'Desenhista Projetista', nivel: 'medio', orgao: 'Concursos Públicos', materias: ['Português', 'Desenho Técnico'] },
  { nome: 'Digitador', nivel: 'medio', orgao: 'Concursos Públicos', materias: ['Português', 'Informática'] },
  { nome: 'Educador Infantil', nivel: 'medio', orgao: 'Concursos Públicos', materias: ['Português', 'Pedagogia'] },
  { nome: 'Educador Social', nivel: 'medio', orgao: 'Concursos Públicos', materias: ['Português', 'Conhecimentos Gerais'] },
  { nome: 'Escriturário', nivel: 'medio', orgao: 'Concursos Públicos', materias: ['Português', 'Matemática', 'Informática'] },
  { nome: 'Fiscal', nivel: 'medio', orgao: 'Concursos Públicos', materias: ['Português', 'Legislação'] },
  { nome: 'Fiscal Ambiental', nivel: 'medio', orgao: 'Concursos Públicos', materias: ['Português', 'Legislação Ambiental'] },
  { nome: 'Fiscal de Meio Ambiente', nivel: 'medio', orgao: 'Concursos Públicos', materias: ['Português', 'Legislação Ambiental'] },
  { nome: 'Fiscal de Obras', nivel: 'medio', orgao: 'Concursos Públicos', materias: ['Português', 'Legislação'] },
  { nome: 'Fiscal de Obras e Posturas', nivel: 'medio', orgao: 'Concursos Públicos', materias: ['Português', 'Legislação'] },
  { nome: 'Fiscal de Posturas', nivel: 'medio', orgao: 'Concursos Públicos', materias: ['Português', 'Legislação'] },
  { nome: 'Fiscal de Tributos', nivel: 'medio', orgao: 'Concursos Públicos', materias: ['Português', 'Legislação Tributária'] },
  { nome: 'Fiscal de Vigilância Sanitária', nivel: 'medio', orgao: 'Concursos Públicos', materias: ['Português', 'Vigilância Sanitária'] },
  { nome: 'Fiscal Municipal', nivel: 'medio', orgao: 'Concursos Públicos', materias: ['Português', 'Legislação'] },
  { nome: 'Fiscal Sanitário', nivel: 'medio', orgao: 'Concursos Públicos', materias: ['Português', 'Vigilância Sanitária'] },
  { nome: 'Fiscal Tributário', nivel: 'medio', orgao: 'Concursos Públicos', materias: ['Português', 'Legislação Tributária'] },
  { nome: 'Fotógrafo', nivel: 'medio', orgao: 'Concursos Públicos', materias: ['Português', 'Fotografia'] },
  { nome: 'Guarda Municipal', nivel: 'medio', orgao: 'Concursos Públicos', materias: ['Português', 'Direito', 'Legislação'] },
  { nome: 'Inspetor de Alunos', nivel: 'medio', orgao: 'Concursos Públicos', materias: ['Português', 'Conhecimentos Pedagógicos'] },
  { nome: 'Instrutor de Informática', nivel: 'medio', orgao: 'Concursos Públicos', materias: ['Informática', 'Português'] },
  { nome: 'Instrutor de Libras', nivel: 'medio', orgao: 'Concursos Públicos', materias: ['Libras', 'Português'] },
  { nome: 'Intérprete de Libras', nivel: 'medio', orgao: 'Concursos Públicos', materias: ['Libras', 'Português'] },
  { nome: 'Monitor', nivel: 'medio', orgao: 'Concursos Públicos', materias: ['Português', 'Conhecimentos Gerais'] },
  { nome: 'Monitor de Informática', nivel: 'medio', orgao: 'Concursos Públicos', materias: ['Informática', 'Português'] },
  { nome: 'Músico', nivel: 'medio', orgao: 'Concursos Públicos', materias: ['Português', 'Música'] },
  { nome: 'Oficial', nivel: 'medio', orgao: 'Concursos Públicos', materias: ['Português', 'Conhecimentos Específicos'] },
  { nome: 'Oficial Administrativo', nivel: 'medio', orgao: 'Concursos Públicos', materias: ['Português', 'Administração'] },
  { nome: 'Operador de Computador', nivel: 'medio', orgao: 'Concursos Públicos', materias: ['Informática', 'Português'] },
  { nome: 'Orientador Social', nivel: 'medio', orgao: 'Concursos Públicos', materias: ['Português', 'Conhecimentos Gerais'] },
  { nome: 'Programador de Computador', nivel: 'medio', orgao: 'Concursos Públicos', materias: ['Informática', 'Programação'] },
  { nome: 'Programador Visual', nivel: 'medio', orgao: 'Concursos Públicos', materias: ['Informática', 'Design'] },
  { nome: 'Recepcionista', nivel: 'medio', orgao: 'Concursos Públicos', materias: ['Português', 'Atendimento'] },
  { nome: 'Secretária', nivel: 'medio', orgao: 'Concursos Públicos', materias: ['Português', 'Administração'] },
  { nome: 'Secretário de Escola', nivel: 'medio', orgao: 'Concursos Públicos', materias: ['Português', 'Conhecimentos Pedagógicos'] },
  { nome: 'Secretário Escolar', nivel: 'medio', orgao: 'Concursos Públicos', materias: ['Português', 'Conhecimentos Pedagógicos'] },
  { nome: 'Técnico Administrativo', nivel: 'medio', orgao: 'Concursos Públicos', materias: ['Português', 'Administração', 'Informática'] },
  { nome: 'Técnico Agrícola', nivel: 'medio', orgao: 'Concursos Públicos', materias: ['Português', 'Agricultura'] },
  { nome: 'Técnico de Enfermagem', nivel: 'medio', orgao: 'Concursos Públicos', materias: ['Português', 'Enfermagem'] },
  { nome: 'Técnico de Informática', nivel: 'medio', orgao: 'ALE-RR', materias: ['Informática', 'Legislação', 'Português', 'LGPD', 'Governança de TI'] },
  { nome: 'Técnico de Laboratório', nivel: 'medio', orgao: 'Concursos Públicos', materias: ['Português', 'Química', 'Biologia'] },
  { nome: 'Técnico de Segurança do Trabalho', nivel: 'medio', orgao: 'Concursos Públicos', materias: ['Português', 'Segurança do Trabalho'] },
  { nome: 'Técnico em Radiologia', nivel: 'medio', orgao: 'Concursos Públicos', materias: ['Português', 'Radiologia'] },
  { nome: 'Técnico em Saúde Bucal', nivel: 'medio', orgao: 'Concursos Públicos', materias: ['Português', 'Saúde Bucal'] },
  { nome: 'Técnico Judiciário', nivel: 'medio', orgao: 'TRE-RO', materias: ['Informática', 'Português', 'Legislação'] },
  { nome: 'Telefonista', nivel: 'medio', orgao: 'Concursos Públicos', materias: ['Português', 'Atendimento'] },
  { nome: 'Tesoureiro', nivel: 'medio', orgao: 'Concursos Públicos', materias: ['Português', 'Matemática', 'Contabilidade'] },

  // ========================================
  // NÍVEL SUPERIOR
  // ========================================
  { nome: 'Administração', nivel: 'superior', orgao: 'Concursos Públicos', materias: ['Português', 'Administração', 'Legislação'] },
  { nome: 'Administrador', nivel: 'superior', orgao: 'Concursos Públicos', materias: ['Português', 'Administração', 'Legislação'] },
  { nome: 'Administrador Hospitalar', nivel: 'superior', orgao: 'Concursos Públicos', materias: ['Português', 'Administração Hospitalar'] },
  { nome: 'Administrador Júnior', nivel: 'superior', orgao: 'Concursos Públicos', materias: ['Português', 'Administração'] },
  { nome: 'Advogado', nivel: 'superior', orgao: 'Concursos Públicos', materias: ['Direito Constitucional', 'Direito Administrativo', 'Direito Civil'] },
  { nome: 'Advogado Júnior', nivel: 'superior', orgao: 'Concursos Públicos', materias: ['Direito Constitucional', 'Direito Administrativo', 'Direito Civil'] },
  { nome: 'Analista Administrativo', nivel: 'superior', orgao: 'Concursos Públicos', materias: ['Português', 'Administração', 'Informática'] },
  { nome: 'Analista Ambiental', nivel: 'superior', orgao: 'Concursos Públicos', materias: ['Português', 'Legislação Ambiental', 'Meio Ambiente'] },
  { nome: 'Analista Contábil', nivel: 'superior', orgao: 'Concursos Públicos', materias: ['Português', 'Contabilidade', 'Legislação'] },
  { nome: 'Analista de Controle Interno', nivel: 'superior', orgao: 'Concursos Públicos', materias: ['Português', 'Administração', 'Contabilidade'] },
  { nome: 'Analista de Informática', nivel: 'superior', orgao: 'Concursos Públicos', materias: ['Informática', 'Português', 'Legislação'] },
  { nome: 'Analista de Recursos Humanos', nivel: 'superior', orgao: 'Concursos Públicos', materias: ['Português', 'Recursos Humanos', 'Legislação'] },
  { nome: 'Analista de Sistema', nivel: 'superior', orgao: 'Concursos Públicos', materias: ['Informática', 'Programação', 'Banco de Dados'] },
  { nome: 'Analista de Sistemas', nivel: 'superior', orgao: 'ALE-RR', materias: ['Informática', 'Legislação', 'Português', 'LGPD', 'Governança de TI'] },
  { nome: 'Analista de Suporte', nivel: 'superior', orgao: 'Concursos Públicos', materias: ['Informática', 'Português'] },
  { nome: 'Analista de Tecnologia da Informação', nivel: 'superior', orgao: 'Concursos Públicos', materias: ['Informática', 'Português', 'Legislação'] },
  { nome: 'Analista Judiciário - Administrativa', nivel: 'superior', orgao: 'Concursos Públicos', materias: ['Português', 'Administração', 'Direito'] },
  { nome: 'Analista Judiciário - Análise de Sistemas', nivel: 'superior', orgao: 'Concursos Públicos', materias: ['Informática', 'Português', 'Direito'] },
  { nome: 'Analista Judiciário - Arquitetura', nivel: 'superior', orgao: 'Concursos Públicos', materias: ['Arquitetura', 'Português', 'Direito'] },
  { nome: 'Analista Judiciário - Arquivologia', nivel: 'superior', orgao: 'Concursos Públicos', materias: ['Arquivologia', 'Português', 'Direito'] },
  { nome: 'Analista Judiciário - Assistente Social', nivel: 'superior', orgao: 'Concursos Públicos', materias: ['Serviço Social', 'Português', 'Direito'] },
  { nome: 'Analista Judiciário - Biblioteconomia', nivel: 'superior', orgao: 'Concursos Públicos', materias: ['Biblioteconomia', 'Português', 'Direito'] },
  { nome: 'Analista Judiciário - Contabilidade', nivel: 'superior', orgao: 'Concursos Públicos', materias: ['Contabilidade', 'Português', 'Direito'] },
  { nome: 'Analista Judiciário - Engenharia Civil', nivel: 'superior', orgao: 'Concursos Públicos', materias: ['Engenharia Civil', 'Português', 'Direito'] },
  { nome: 'Analista Judiciário - Engenharia Elétrica', nivel: 'superior', orgao: 'Concursos Públicos', materias: ['Engenharia Elétrica', 'Português', 'Direito'] },
  { nome: 'Analista Judiciário - Estatística', nivel: 'superior', orgao: 'Concursos Públicos', materias: ['Estatística', 'Português', 'Direito'] },
  { nome: 'Analista Judiciário - Execução de Mandados', nivel: 'superior', orgao: 'Concursos Públicos', materias: ['Direito', 'Português', 'Legislação'] },
  { nome: 'Analista Judiciário - Medicina', nivel: 'superior', orgao: 'Concursos Públicos', materias: ['Medicina', 'Português', 'Direito'] },
  { nome: 'Analista Judiciário - Odontologia', nivel: 'superior', orgao: 'Concursos Públicos', materias: ['Odontologia', 'Português', 'Direito'] },
  { nome: 'Analista Judiciário - Psicologia', nivel: 'superior', orgao: 'Concursos Públicos', materias: ['Psicologia', 'Português', 'Direito'] },
  { nome: 'Analista Jurídico', nivel: 'superior', orgao: 'Concursos Públicos', materias: ['Direito', 'Português', 'Legislação'] },
  { nome: 'Arquiteto', nivel: 'superior', orgao: 'Concursos Públicos', materias: ['Arquitetura', 'Português', 'Legislação'] },
  { nome: 'Arquiteto e Urbanista', nivel: 'superior', orgao: 'Concursos Públicos', materias: ['Arquitetura', 'Urbanismo', 'Legislação'] },
  { nome: 'Arquivista', nivel: 'superior', orgao: 'Concursos Públicos', materias: ['Arquivologia', 'Português'] },
  { nome: 'Arquivologista', nivel: 'superior', orgao: 'Concursos Públicos', materias: ['Arquivologia', 'Português'] },
  { nome: 'Assessor Jurídico', nivel: 'superior', orgao: 'Concursos Públicos', materias: ['Direito', 'Português', 'Legislação'] },
  { nome: 'Assistente Social', nivel: 'superior', orgao: 'Concursos Públicos', materias: ['Serviço Social', 'Português', 'Legislação'] },
  { nome: 'Auditor', nivel: 'superior', orgao: 'Concursos Públicos', materias: ['Auditoria', 'Contabilidade', 'Direito'] },
  { nome: 'Auditor Fiscal', nivel: 'superior', orgao: 'Concursos Públicos', materias: ['Direito Tributário', 'Contabilidade', 'Auditoria'] },
  { nome: 'Bibliotecário', nivel: 'superior', orgao: 'Concursos Públicos', materias: ['Biblioteconomia', 'Português'] },
  { nome: 'Bibliotecário-Documentalista', nivel: 'superior', orgao: 'Concursos Públicos', materias: ['Biblioteconomia', 'Português'] },
  { nome: 'Biblioteconomista', nivel: 'superior', orgao: 'Concursos Públicos', materias: ['Biblioteconomia', 'Português'] },
  { nome: 'Biólogo', nivel: 'superior', orgao: 'Concursos Públicos', materias: ['Biologia', 'Português'] },
  { nome: 'Biomédico', nivel: 'superior', orgao: 'Concursos Públicos', materias: ['Biomedicina', 'Português'] },
  { nome: 'Bioquímico', nivel: 'superior', orgao: 'Concursos Públicos', materias: ['Bioquímica', 'Português'] },
  { nome: 'Bombeiro', nivel: 'superior', orgao: 'Concursos Públicos', materias: ['Português', 'Legislação', 'Conhecimentos Específicos'] },
  { nome: 'Ciências Contábeis', nivel: 'superior', orgao: 'Concursos Públicos', materias: ['Contabilidade', 'Português', 'Legislação'] },
  { nome: 'Cirurgião-Dentista', nivel: 'superior', orgao: 'Concursos Públicos', materias: ['Odontologia', 'Português'] },
  { nome: 'Contador', nivel: 'superior', orgao: 'Concursos Públicos', materias: ['Contabilidade', 'Português', 'Legislação'] },
  { nome: 'Contador Júnior', nivel: 'superior', orgao: 'Concursos Públicos', materias: ['Contabilidade', 'Português'] },
  { nome: 'Controlador Interno', nivel: 'superior', orgao: 'Concursos Públicos', materias: ['Contabilidade', 'Administração', 'Direito'] },
  { nome: 'Defensor Público', nivel: 'superior', orgao: 'Concursos Públicos', materias: ['Direito Constitucional', 'Direito Penal', 'Direito Civil'] },
  { nome: 'Delegado de Polícia', nivel: 'superior', orgao: 'Concursos Públicos', materias: ['Direito Penal', 'Direito Processual Penal', 'Direito Constitucional'] },
  { nome: 'Dentista', nivel: 'superior', orgao: 'Concursos Públicos', materias: ['Odontologia', 'Português'] },
  { nome: 'Direito', nivel: 'superior', orgao: 'Concursos Públicos', materias: ['Direito Constitucional', 'Direito Administrativo', 'Direito Civil'] },
  { nome: 'Economista', nivel: 'superior', orgao: 'Concursos Públicos', materias: ['Economia', 'Português', 'Matemática'] },
  { nome: 'Economista Júnior', nivel: 'superior', orgao: 'Concursos Públicos', materias: ['Economia', 'Português', 'Matemática'] },
  { nome: 'Educação Física', nivel: 'superior', orgao: 'Concursos Públicos', materias: ['Educação Física', 'Português'] },
  { nome: 'Educador Físico', nivel: 'superior', orgao: 'Concursos Públicos', materias: ['Educação Física', 'Português'] },
  { nome: 'Enfermagem', nivel: 'superior', orgao: 'Concursos Públicos', materias: ['Enfermagem', 'Português', 'SUS'] },
  { nome: 'Enfermeiro', nivel: 'superior', orgao: 'Concursos Públicos', materias: ['Enfermagem', 'Português', 'SUS'] },
  { nome: 'Enfermeiro PSF', nivel: 'superior', orgao: 'Concursos Públicos', materias: ['Enfermagem', 'Português', 'SUS'] },
  { nome: 'Enfermeiro do Trabalho', nivel: 'superior', orgao: 'Concursos Públicos', materias: ['Enfermagem', 'Segurança do Trabalho'] },
  { nome: 'Enfermeiro Padrão', nivel: 'superior', orgao: 'Concursos Públicos', materias: ['Enfermagem', 'Português', 'SUS'] },
  { nome: 'Enfermeiro Plantonista', nivel: 'superior', orgao: 'Concursos Públicos', materias: ['Enfermagem', 'Português', 'SUS'] },
  { nome: 'Engenharia Civil', nivel: 'superior', orgao: 'Concursos Públicos', materias: ['Engenharia Civil', 'Português', 'Legislação'] },
  { nome: 'Engenharia Elétrica', nivel: 'superior', orgao: 'Concursos Públicos', materias: ['Engenharia Elétrica', 'Português', 'Legislação'] },
  { nome: 'Engenharia Mecânica', nivel: 'superior', orgao: 'Concursos Públicos', materias: ['Engenharia Mecânica', 'Português', 'Legislação'] },
  { nome: 'Engenheiro', nivel: 'superior', orgao: 'Concursos Públicos', materias: ['Engenharia', 'Português', 'Legislação'] },
  { nome: 'Engenheiro Agrimensor', nivel: 'superior', orgao: 'Concursos Públicos', materias: ['Agrimensura', 'Português', 'Legislação'] },
  { nome: 'Engenheiro Agrônomo', nivel: 'superior', orgao: 'Concursos Públicos', materias: ['Agronomia', 'Português', 'Legislação'] },
  { nome: 'Engenheiro Ambiental', nivel: 'superior', orgao: 'Concursos Públicos', materias: ['Engenharia Ambiental', 'Legislação Ambiental'] },
  { nome: 'Engenheiro Cartográfico', nivel: 'superior', orgao: 'Concursos Públicos', materias: ['Cartografia', 'Português', 'Legislação'] },
  { nome: 'Engenheiro Civil', nivel: 'superior', orgao: 'Concursos Públicos', materias: ['Engenharia Civil', 'Português', 'Legislação'] },
  { nome: 'Engenheiro Civil Júnior', nivel: 'superior', orgao: 'Concursos Públicos', materias: ['Engenharia Civil', 'Português'] },
  { nome: 'Engenheiro de alimentos', nivel: 'superior', orgao: 'Concursos Públicos', materias: ['Engenharia de Alimentos', 'Português'] },
  { nome: 'Engenheiro de Pesca', nivel: 'superior', orgao: 'Concursos Públicos', materias: ['Engenharia de Pesca', 'Português'] },
  { nome: 'Engenheiro de Producão', nivel: 'superior', orgao: 'Concursos Públicos', materias: ['Engenharia de Produção', 'Português'] },
  { nome: 'Engenheiro de Segurança do Trabalho', nivel: 'superior', orgao: 'Concursos Públicos', materias: ['Engenharia', 'Segurança do Trabalho'] },
  { nome: 'Engenheiro de Telecomunicações', nivel: 'superior', orgao: 'Concursos Públicos', materias: ['Telecomunicações', 'Português'] },
  { nome: 'Engenheiro Eletricista', nivel: 'superior', orgao: 'Concursos Públicos', materias: ['Engenharia Elétrica', 'Português'] },
  { nome: 'Engenheiro Elétrico', nivel: 'superior', orgao: 'Concursos Públicos', materias: ['Engenharia Elétrica', 'Português'] },
  { nome: 'Engenheiro Eletrônico', nivel: 'superior', orgao: 'Concursos Públicos', materias: ['Engenharia Eletrônica', 'Português'] },
  { nome: 'Engenheiro Florestal', nivel: 'superior', orgao: 'Concursos Públicos', materias: ['Engenharia Florestal', 'Português'] },
  { nome: 'Engenheiro Mecânico', nivel: 'superior', orgao: 'Concursos Públicos', materias: ['Engenharia Mecânica', 'Português'] },
  { nome: 'Engenheiro Químico', nivel: 'superior', orgao: 'Concursos Públicos', materias: ['Engenharia Química', 'Português'] },
  { nome: 'Engenheiro Sanitarista', nivel: 'superior', orgao: 'Concursos Públicos', materias: ['Engenharia Sanitária', 'Português'] },
  { nome: 'Especialista em Educação', nivel: 'superior', orgao: 'Concursos Públicos', materias: ['Pedagogia', 'Português'] },
  { nome: 'Estatístico', nivel: 'superior', orgao: 'Concursos Públicos', materias: ['Estatística', 'Matemática', 'Português'] },
  { nome: 'Farmacêutico', nivel: 'superior', orgao: 'Concursos Públicos', materias: ['Farmácia', 'Português'] },
  { nome: 'Físico', nivel: 'superior', orgao: 'Concursos Públicos', materias: ['Física', 'Matemática', 'Português'] },
  { nome: 'Fisioterapeuta', nivel: 'superior', orgao: 'Concursos Públicos', materias: ['Fisioterapia', 'Português'] },
  { nome: 'Fisioterapia', nivel: 'superior', orgao: 'Concursos Públicos', materias: ['Fisioterapia', 'Português'] },
  { nome: 'Geógrafo', nivel: 'superior', orgao: 'Concursos Públicos', materias: ['Geografia', 'Português'] },
  { nome: 'Geológo', nivel: 'superior', orgao: 'Concursos Públicos', materias: ['Geologia', 'Português'] },
  { nome: 'Historiador', nivel: 'superior', orgao: 'Concursos Públicos', materias: ['História', 'Português'] },
  { nome: 'Jornalista', nivel: 'superior', orgao: 'Concursos Públicos', materias: ['Jornalismo', 'Português'] },
  { nome: 'Juiz', nivel: 'superior', orgao: 'Concursos Públicos', materias: ['Direito Constitucional', 'Direito Civil', 'Direito Penal'] },
  { nome: 'Juiz do Trabalho', nivel: 'superior', orgao: 'Concursos Públicos', materias: ['Direito do Trabalho', 'Direito Processual do Trabalho'] },
  { nome: 'Juiz do Trabalho Substituto', nivel: 'superior', orgao: 'Concursos Públicos', materias: ['Direito do Trabalho', 'Direito Processual do Trabalho'] },
  { nome: 'Juiz Federal Substituto', nivel: 'superior', orgao: 'Concursos Públicos', materias: ['Direito Constitucional', 'Direito Civil', 'Direito Penal'] },
  { nome: 'Juiz Substituto', nivel: 'superior', orgao: 'Concursos Públicos', materias: ['Direito Constitucional', 'Direito Civil', 'Direito Penal'] },
  { nome: 'Médico', nivel: 'superior', orgao: 'Concursos Públicos', materias: ['Medicina', 'Português', 'SUS'] },
  { nome: 'Médico - Cardiologia', nivel: 'superior', orgao: 'Concursos Públicos', materias: ['Medicina', 'Cardiologia', 'SUS'] },
  { nome: 'Médico - Cirurgia Geral', nivel: 'superior', orgao: 'Concursos Públicos', materias: ['Medicina', 'Cirurgia Geral', 'SUS'] },
  { nome: 'Médico - Cirurgia Pediátrica', nivel: 'superior', orgao: 'Concursos Públicos', materias: ['Medicina', 'Cirurgia Pediátrica', 'SUS'] },
  { nome: 'Médico Clínica Médica', nivel: 'superior', orgao: 'Concursos Públicos', materias: ['Medicina', 'Clínica Médica', 'SUS'] },
  { nome: 'Médico - Dermatologia', nivel: 'superior', orgao: 'Concursos Públicos', materias: ['Medicina', 'Dermatologia', 'SUS'] },
  { nome: 'Médico - Endocrinologia', nivel: 'superior', orgao: 'Concursos Públicos', materias: ['Medicina', 'Endocrinologia', 'SUS'] },
  { nome: 'Médico - Medicina do Trabalho', nivel: 'superior', orgao: 'Concursos Públicos', materias: ['Medicina', 'Medicina do Trabalho'] },
  { nome: 'Médico - Neurocirurgia', nivel: 'superior', orgao: 'Concursos Públicos', materias: ['Medicina', 'Neurocirurgia', 'SUS'] },
  { nome: 'Médico - Neurologia', nivel: 'superior', orgao: 'Concursos Públicos', materias: ['Medicina', 'Neurologia', 'SUS'] },
  { nome: 'Médico - Oftalmologia', nivel: 'superior', orgao: 'Concursos Públicos', materias: ['Medicina', 'Oftalmologia', 'SUS'] },
  { nome: 'Médico - Otorrinolaringologia', nivel: 'superior', orgao: 'Concursos Públicos', materias: ['Medicina', 'Otorrinolaringologia', 'SUS'] },
  { nome: 'Médico - Pediatria', nivel: 'superior', orgao: 'Concursos Públicos', materias: ['Medicina', 'Pediatria', 'SUS'] },
  { nome: 'Médico - Pneumologia', nivel: 'superior', orgao: 'Concursos Públicos', materias: ['Medicina', 'Pneumologia', 'SUS'] },
  { nome: 'Médico PSF', nivel: 'superior', orgao: 'Concursos Públicos', materias: ['Medicina', 'Saúde da Família', 'SUS'] },
  { nome: 'Médico - Psiquiatria', nivel: 'superior', orgao: 'Concursos Públicos', materias: ['Medicina', 'Psiquiatria', 'SUS'] },
  { nome: 'Médico - Urologia', nivel: 'superior', orgao: 'Concursos Públicos', materias: ['Medicina', 'Urologia', 'SUS'] },
  { nome: 'Médico Anestesiologista', nivel: 'superior', orgao: 'Concursos Públicos', materias: ['Medicina', 'Anestesiologia', 'SUS'] },
  { nome: 'Médico Cardiologista', nivel: 'superior', orgao: 'Concursos Públicos', materias: ['Medicina', 'Cardiologia', 'SUS'] },
  { nome: 'Médico-Cirurgião Geral', nivel: 'superior', orgao: 'Concursos Públicos', materias: ['Medicina', 'Cirurgia Geral', 'SUS'] },
  { nome: 'Médico Clínico Geral', nivel: 'superior', orgao: 'Concursos Públicos', materias: ['Medicina', 'Clínica Geral', 'SUS'] },
  { nome: 'Médico da Família', nivel: 'superior', orgao: 'Concursos Públicos', materias: ['Medicina', 'Saúde da Família', 'SUS'] },
  { nome: 'Médico Ginecologista', nivel: 'superior', orgao: 'Concursos Públicos', materias: ['Medicina', 'Ginecologia', 'SUS'] },
  { nome: 'Médico Ginecologista e Obstetra', nivel: 'superior', orgao: 'Concursos Públicos', materias: ['Medicina', 'Ginecologia e Obstetrícia', 'SUS'] },
  { nome: 'Médico Hematologista', nivel: 'superior', orgao: 'Concursos Públicos', materias: ['Medicina', 'Hematologia', 'SUS'] },
  { nome: 'Médico Infectologista', nivel: 'superior', orgao: 'Concursos Públicos', materias: ['Medicina', 'Infectologia', 'SUS'] },
  { nome: 'Médico Intensivista', nivel: 'superior', orgao: 'Concursos Públicos', materias: ['Medicina', 'Terapia Intensiva', 'SUS'] },
  { nome: 'Médico Nefrologista', nivel: 'superior', orgao: 'Concursos Públicos', materias: ['Medicina', 'Nefrologia', 'SUS'] },
  { nome: 'Médico Neurologista', nivel: 'superior', orgao: 'Concursos Públicos', materias: ['Medicina', 'Neurologia', 'SUS'] },
  { nome: 'Médico Obstetra', nivel: 'superior', orgao: 'Concursos Públicos', materias: ['Medicina', 'Obstetrícia', 'SUS'] },
  { nome: 'Médico Oftalmologista', nivel: 'superior', orgao: 'Concursos Públicos', materias: ['Medicina', 'Oftalmologia', 'SUS'] },
  { nome: 'Médico Ortopedista', nivel: 'superior', orgao: 'Concursos Públicos', materias: ['Medicina', 'Ortopedia', 'SUS'] },
  { nome: 'Médico Pediatra', nivel: 'superior', orgao: 'Concursos Públicos', materias: ['Medicina', 'Pediatria', 'SUS'] },
  { nome: 'Médico Plantonista', nivel: 'superior', orgao: 'Concursos Públicos', materias: ['Medicina', 'Urgência e Emergência', 'SUS'] },
  { nome: 'Médico Psiquiatra', nivel: 'superior', orgao: 'Concursos Públicos', materias: ['Medicina', 'Psiquiatria', 'SUS'] },
  { nome: 'Médico Radiologista', nivel: 'superior', orgao: 'Concursos Públicos', materias: ['Medicina', 'Radiologia', 'SUS'] },
  { nome: 'Médico Veterinário', nivel: 'superior', orgao: 'Concursos Públicos', materias: ['Medicina Veterinária', 'Português'] },
  { nome: 'Nutricionista', nivel: 'superior', orgao: 'Concursos Públicos', materias: ['Nutrição', 'Português'] },
  { nome: 'Odontólogo', nivel: 'superior', orgao: 'Concursos Públicos', materias: ['Odontologia', 'Português', 'SUS'] },
  { nome: 'Odontólogo - Endodontia', nivel: 'superior', orgao: 'Concursos Públicos', materias: ['Odontologia', 'Endodontia', 'SUS'] },
  { nome: 'Odontólogo - PSF', nivel: 'superior', orgao: 'Concursos Públicos', materias: ['Odontologia', 'Saúde da Família', 'SUS'] },
  { nome: 'Oficial de Justiça', nivel: 'superior', orgao: 'Concursos Públicos', materias: ['Direito', 'Português', 'Legislação'] },
  { nome: 'Orientador Educacional', nivel: 'superior', orgao: 'Concursos Públicos', materias: ['Pedagogia', 'Português'] },
  { nome: 'Orientador Pedagógico', nivel: 'superior', orgao: 'Concursos Públicos', materias: ['Pedagogia', 'Português'] },
  { nome: 'Pedagogo', nivel: 'superior', orgao: 'Concursos Públicos', materias: ['Pedagogia', 'Português'] },
  { nome: 'Perito Criminal', nivel: 'superior', orgao: 'Concursos Públicos', materias: ['Perícia Criminal', 'Português', 'Direito'] },
  { nome: 'Procurador', nivel: 'superior', orgao: 'Concursos Públicos', materias: ['Direito Constitucional', 'Direito Administrativo', 'Direito Civil'] },
  { nome: 'Procurador do Estado', nivel: 'superior', orgao: 'Concursos Públicos', materias: ['Direito Constitucional', 'Direito Administrativo', 'Direito Civil'] },
  { nome: 'Procurador Jurídico', nivel: 'superior', orgao: 'Concursos Públicos', materias: ['Direito Constitucional', 'Direito Administrativo', 'Direito Civil'] },
  { nome: 'Professor', nivel: 'superior', orgao: 'Concursos Públicos', materias: ['Pedagogia', 'Português', 'Conhecimentos Pedagógicos'] },
  { nome: 'Professor - Artes', nivel: 'superior', orgao: 'Concursos Públicos', materias: ['Artes', 'Pedagogia'] },
  { nome: 'Professor - Biologia', nivel: 'superior', orgao: 'Concursos Públicos', materias: ['Biologia', 'Pedagogia'] },
  { nome: 'Professor - Ciências', nivel: 'superior', orgao: 'Concursos Públicos', materias: ['Ciências', 'Pedagogia'] },
  { nome: 'Professor - Educação Física', nivel: 'superior', orgao: 'Concursos Públicos', materias: ['Educação Física', 'Pedagogia'] },
  { nome: 'Professor Educação Infantil', nivel: 'superior', orgao: 'Concursos Públicos', materias: ['Pedagogia', 'Educação Infantil'] },
  { nome: 'Professor - Ensino Religioso', nivel: 'superior', orgao: 'Concursos Públicos', materias: ['Ensino Religioso', 'Pedagogia'] },
  { nome: 'Professor - Espanhol', nivel: 'superior', orgao: 'Concursos Públicos', materias: ['Espanhol', 'Pedagogia'] },
  { nome: 'Professor - Física', nivel: 'superior', orgao: 'Concursos Públicos', materias: ['Física', 'Pedagogia'] },
  { nome: 'Professor - Geografia', nivel: 'superior', orgao: 'Concursos Públicos', materias: ['Geografia', 'Pedagogia'] },
  { nome: 'Professor - História', nivel: 'superior', orgao: 'Concursos Públicos', materias: ['História', 'Pedagogia'] },
  { nome: 'Professor - Informática', nivel: 'superior', orgao: 'Concursos Públicos', materias: ['Informática', 'Pedagogia'] },
  { nome: 'Professor - Inglês', nivel: 'superior', orgao: 'Concursos Públicos', materias: ['Inglês', 'Pedagogia'] },
  { nome: 'Professor - Língua Inglesa', nivel: 'superior', orgao: 'Concursos Públicos', materias: ['Inglês', 'Pedagogia'] },
  { nome: 'Professor - Língua Portuguesa', nivel: 'superior', orgao: 'Concursos Públicos', materias: ['Português', 'Pedagogia'] },
  { nome: 'Professor - Matemática', nivel: 'superior', orgao: 'Concursos Públicos', materias: ['Matemática', 'Pedagogia'] },
  { nome: 'Professor - Português', nivel: 'superior', orgao: 'Concursos Públicos', materias: ['Português', 'Pedagogia'] },
  { nome: 'Professor - Química', nivel: 'superior', orgao: 'Concursos Públicos', materias: ['Química', 'Pedagogia'] },
  { nome: 'Professor - Séries Iniciais', nivel: 'superior', orgao: 'Concursos Públicos', materias: ['Pedagogia', 'Alfabetização'] },
  { nome: 'Professor de 1ª a 4ª séries', nivel: 'superior', orgao: 'Concursos Públicos', materias: ['Pedagogia', 'Alfabetização'] },
  { nome: 'Professor de Arte', nivel: 'superior', orgao: 'Concursos Públicos', materias: ['Artes', 'Pedagogia'] },
  { nome: 'Professor de Artes', nivel: 'superior', orgao: 'Concursos Públicos', materias: ['Artes', 'Pedagogia'] },
  { nome: 'Professor de Biologia', nivel: 'superior', orgao: 'Concursos Públicos', materias: ['Biologia', 'Pedagogia'] },
  { nome: 'Professor de Ciências', nivel: 'superior', orgao: 'Concursos Públicos', materias: ['Ciências', 'Pedagogia'] },
  { nome: 'Professor de Educação Artística', nivel: 'superior', orgao: 'Concursos Públicos', materias: ['Artes', 'Pedagogia'] },
  { nome: 'Professor de Educação Básica', nivel: 'superior', orgao: 'Concursos Públicos', materias: ['Pedagogia', 'Português'] },
  { nome: 'Professor de Educação Básica I', nivel: 'superior', orgao: 'Concursos Públicos', materias: ['Pedagogia', 'Alfabetização'] },
  { nome: 'Professor de Educação Básica II - Matemática', nivel: 'superior', orgao: 'Concursos Públicos', materias: ['Matemática', 'Pedagogia'] },
  { nome: 'Professor de Educação Especial', nivel: 'superior', orgao: 'Concursos Públicos', materias: ['Pedagogia', 'Educação Especial'] },
  { nome: 'Professor de Educação Física', nivel: 'superior', orgao: 'Concursos Públicos', materias: ['Educação Física', 'Pedagogia'] },
  { nome: 'Professor de Educação Infantil', nivel: 'superior', orgao: 'Concursos Públicos', materias: ['Pedagogia', 'Educação Infantil'] },
  { nome: 'Professor de Ensino Fundamental', nivel: 'superior', orgao: 'Concursos Públicos', materias: ['Pedagogia', 'Português'] },
  { nome: 'Professor de Ensino Religioso', nivel: 'superior', orgao: 'Concursos Públicos', materias: ['Ensino Religioso', 'Pedagogia'] },
  { nome: 'Professor de Espanhol', nivel: 'superior', orgao: 'Concursos Públicos', materias: ['Espanhol', 'Pedagogia'] },
  { nome: 'Professor de Filosofia', nivel: 'superior', orgao: 'Concursos Públicos', materias: ['Filosofia', 'Pedagogia'] },
  { nome: 'Professor de Física', nivel: 'superior', orgao: 'Concursos Públicos', materias: ['Física', 'Pedagogia'] },
  { nome: 'Professor de Geografia', nivel: 'superior', orgao: 'Concursos Públicos', materias: ['Geografia', 'Pedagogia'] },
  { nome: 'Professor de História', nivel: 'superior', orgao: 'Concursos Públicos', materias: ['História', 'Pedagogia'] },
  { nome: 'Professor de Informática', nivel: 'superior', orgao: 'Concursos Públicos', materias: ['Informática', 'Pedagogia'] },
  { nome: 'Professor de Inglês', nivel: 'superior', orgao: 'Concursos Públicos', materias: ['Inglês', 'Pedagogia'] },
  { nome: 'Professor de Libras', nivel: 'superior', orgao: 'Concursos Públicos', materias: ['Libras', 'Pedagogia'] },
  { nome: 'Professor de Matemática', nivel: 'superior', orgao: 'Concursos Públicos', materias: ['Matemática', 'Pedagogia'] },
  { nome: 'Professor de Música', nivel: 'superior', orgao: 'Concursos Públicos', materias: ['Música', 'Pedagogia'] },
  { nome: 'Professor de Português', nivel: 'superior', orgao: 'Concursos Públicos', materias: ['Português', 'Pedagogia'] },
  { nome: 'Professor de Química', nivel: 'superior', orgao: 'Concursos Públicos', materias: ['Química', 'Pedagogia'] },
  { nome: 'Professor de Sociologia', nivel: 'superior', orgao: 'Concursos Públicos', materias: ['Sociologia', 'Pedagogia'] },
  { nome: 'Programador', nivel: 'superior', orgao: 'Concursos Públicos', materias: ['Informática', 'Programação'] },
  { nome: 'Psicólogo', nivel: 'superior', orgao: 'Concursos Públicos', materias: ['Psicologia', 'Português'] },
  { nome: 'Psicólogo Clínico', nivel: 'superior', orgao: 'Concursos Públicos', materias: ['Psicologia', 'Português'] },
  { nome: 'Psicopedagogo', nivel: 'superior', orgao: 'Concursos Públicos', materias: ['Psicopedagogia', 'Pedagogia'] },
  { nome: 'Públicitário', nivel: 'superior', orgao: 'Concursos Públicos', materias: ['Publicidade', 'Português'] },
  { nome: 'Relações Públicas', nivel: 'superior', orgao: 'Concursos Públicos', materias: ['Relações Públicas', 'Português'] },
  { nome: 'Sanitarista', nivel: 'superior', orgao: 'Concursos Públicos', materias: ['Saúde Pública', 'SUS'] },
  { nome: 'Secretário Executivo', nivel: 'superior', orgao: 'Concursos Públicos', materias: ['Secretariado', 'Português'] },
  { nome: 'Sociólogo', nivel: 'superior', orgao: 'Concursos Públicos', materias: ['Sociologia', 'Português'] },
  { nome: 'Supervisor de Ensino', nivel: 'superior', orgao: 'Concursos Públicos', materias: ['Pedagogia', 'Português'] },
  { nome: 'Terapeuta Ocupacional', nivel: 'superior', orgao: 'Concursos Públicos', materias: ['Terapia Ocupacional', 'Português'] },
  { nome: 'Topógrafo', nivel: 'superior', orgao: 'Concursos Públicos', materias: ['Topografia', 'Português'] },
  { nome: 'Veterinário', nivel: 'superior', orgao: 'Concursos Públicos', materias: ['Medicina Veterinária', 'Português'] },

  // ========================================
  // ESTÁGIO
  // ========================================
  { nome: 'Estágio em Direito', nivel: 'superior', orgao: 'Concursos Públicos', materias: ['Direito', 'Português'] },
];

interface ConcursoProfileContextType {
  profiles: ConcursoProfile[];
  activeProfile: ConcursoProfile | null;
  createProfile: (profile: Omit<ConcursoProfile, 'id' | 'ativo' | 'criadoEm'>) => void;
  setActiveProfile: (profileId: string) => void;
  deleteProfile: (profileId: string) => void;
  updateProfile: (profileId: string, updates: Partial<ConcursoProfile>) => void;
  getActiveProfileSubjects: () => string[];
}

const ConcursoProfileContext = createContext<ConcursoProfileContextType | undefined>(undefined);

export function ConcursoProfileProvider({ children }: { children: ReactNode }) {
  const [profiles, setProfiles] = useState<ConcursoProfile[]>([]);
  const [activeProfile, setActiveProfileState] = useState<ConcursoProfile | null>(null);

  // Carregar dados salvos
  useEffect(() => {
    const savedProfiles = localStorage.getItem('concurso_profiles');
    const savedActiveId = localStorage.getItem('concurso_active_profile');
    
    if (savedProfiles) {
      try {
        const data = JSON.parse(savedProfiles);
        setProfiles(data);
        
        if (savedActiveId) {
          const active = data.find((p: ConcursoProfile) => p.id === savedActiveId);
          if (active) {
            setActiveProfileState(active);
          }
        }
      } catch (e) {
        console.error('Erro ao carregar perfis:', e);
      }
    }
  }, []);

  // Salvar dados
  useEffect(() => {
    if (profiles.length > 0) {
      localStorage.setItem('concurso_profiles', JSON.stringify(profiles));
    }
  }, [profiles]);

  useEffect(() => {
    if (activeProfile) {
      localStorage.setItem('concurso_active_profile', activeProfile.id);
    }
  }, [activeProfile]);

  const createProfile = (profile: Omit<ConcursoProfile, 'id' | 'ativo' | 'criadoEm'>) => {
    const newProfile: ConcursoProfile = {
      ...profile,
      id: `profile_${Date.now()}`,
      ativo: false,
      criadoEm: new Date().toISOString(),
    };

    setProfiles(prev => [...prev, newProfile]);
  };

  const setActiveProfile = (profileId: string) => {
    setProfiles(prev => 
      prev.map(p => ({
        ...p,
        ativo: p.id === profileId
      }))
    );

    const profile = profiles.find(p => p.id === profileId);
    if (profile) {
      setActiveProfileState({ ...profile, ativo: true });
    }
  };

  const deleteProfile = (profileId: string) => {
    setProfiles(prev => prev.filter(p => p.id !== profileId));
    
    if (activeProfile?.id === profileId) {
      setActiveProfileState(null);
    }
  };

  const updateProfile = (profileId: string, updates: Partial<ConcursoProfile>) => {
    setProfiles(prev =>
      prev.map(p => (p.id === profileId ? { ...p, ...updates } : p))
    );

    if (activeProfile?.id === profileId) {
      setActiveProfileState(prev => 
        prev ? { ...prev, ...updates } : null
      );
    }
  };

  const getActiveProfileSubjects = (): string[] => {
    return activeProfile?.materias || [];
  };

  return (
    <ConcursoProfileContext.Provider
      value={{
        profiles,
        activeProfile,
        createProfile,
        setActiveProfile,
        deleteProfile,
        updateProfile,
        getActiveProfileSubjects,
      }}
    >
      {children}
    </ConcursoProfileContext.Provider>
  );
}

export function useConcursoProfile() {
  const context = useContext(ConcursoProfileContext);
  if (!context) {
    throw new Error('useConcursoProfile deve ser usado dentro de ConcursoProfileProvider');
  }
  return context;
}
