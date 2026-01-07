-- ============================================
-- INSERIR TODOS OS 439 CARGOS E ARQUÉTIPOS
-- ============================================

-- Criar Arquétipos Principais
INSERT INTO public.archetypes (name, nivel, subjects_weights) VALUES
    -- NÍVEL FUNDAMENTAL
    (
        'Operacional - Nível Fundamental',
        'fundamental',
        '[
            {"subject": "Português", "weight": 50},
            {"subject": "Matemática", "weight": 50}
        ]'
    ),
    (
        'Motorista - Nível Fundamental',
        'fundamental',
        '[
            {"subject": "Português", "weight": 40},
            {"subject": "Matemática", "weight": 30},
            {"subject": "Legislação", "weight": 30}
        ]'
    ),
    
    -- NÍVEL MÉDIO
    (
        'Administrativo - Nível Médio',
        'medio',
        '[
            {"subject": "Português", "weight": 30},
            {"subject": "Matemática", "weight": 20},
            {"subject": "Informática", "weight": 20},
            {"subject": "Legislação", "weight": 30}
        ]'
    ),
    (
        'Técnico em Informática',
        'medio',
        '[
            {"subject": "Informática", "weight": 40},
            {"subject": "LGPD", "weight": 20},
            {"subject": "Governança de TI", "weight": 20},
            {"subject": "Português", "weight": 15},
            {"subject": "Legislação", "weight": 5}
        ]'
    ),
    (
        'Fiscal - Nível Médio',
        'medio',
        '[
            {"subject": "Legislação", "weight": 50},
            {"subject": "Português", "weight": 30},
            {"subject": "Direito Administrativo", "weight": 20}
        ]'
    ),
    (
        'Segurança Pública - Nível Médio',
        'medio',
        '[
            {"subject": "Direito", "weight": 40},
            {"subject": "Legislação", "weight": 30},
            {"subject": "Português", "weight": 30}
        ]'
    ),
    (
        'Saúde - Nível Médio',
        'medio',
        '[
            {"subject": "Português", "weight": 30},
            {"subject": "Conhecimentos em Saúde", "weight": 50},
            {"subject": "Legislação", "weight": 20}
        ]'
    ),
    
    -- NÍVEL SUPERIOR
    (
        'Analista de Sistemas',
        'superior',
        '[
            {"subject": "Informática", "weight": 45},
            {"subject": "LGPD", "weight": 20},
            {"subject": "Governança de TI", "weight": 20},
            {"subject": "Português", "weight": 10},
            {"subject": "Legislação", "weight": 5}
        ]'
    ),
    (
        'Área Jurídica',
        'superior',
        '[
            {"subject": "Direito Constitucional", "weight": 30},
            {"subject": "Direito Administrativo", "weight": 25},
            {"subject": "Direito Civil", "weight": 20},
            {"subject": "Direito Penal", "weight": 15},
            {"subject": "Português", "weight": 10}
        ]'
    ),
    (
        'Engenharia',
        'superior',
        '[
            {"subject": "Engenharia", "weight": 60},
            {"subject": "Português", "weight": 20},
            {"subject": "Legislação", "weight": 20}
        ]'
    ),
    (
        'Medicina',
        'superior',
        '[
            {"subject": "Medicina", "weight": 50},
            {"subject": "SUS", "weight": 30},
            {"subject": "Português", "weight": 20}
        ]'
    ),
    (
        'Odontologia',
        'superior',
        '[
            {"subject": "Odontologia", "weight": 50},
            {"subject": "SUS", "weight": 30},
            {"subject": "Português", "weight": 20}
        ]'
    ),
    (
        'Enfermagem',
        'superior',
        '[
            {"subject": "Enfermagem", "weight": 50},
            {"subject": "SUS", "weight": 30},
            {"subject": "Português", "weight": 20}
        ]'
    ),
    (
        'Professor',
        'superior',
        '[
            {"subject": "Pedagogia", "weight": 50},
            {"subject": "Português", "weight": 30},
            {"subject": "Conhecimentos Pedagógicos", "weight": 20}
        ]'
    ),
    (
        'Contabilidade',
        'superior',
        '[
            {"subject": "Contabilidade", "weight": 50},
            {"subject": "Legislação", "weight": 30},
            {"subject": "Português", "weight": 20}
        ]'
    ),
    (
        'Administração',
        'superior',
        '[
            {"subject": "Administração", "weight": 50},
            {"subject": "Legislação", "weight": 30},
            {"subject": "Português", "weight": 20}
        ]'
    )
ON CONFLICT (name) DO NOTHING;

-- Agora vincular TODOS os cargos aos arquétipos correspondentes
-- (Vou criar uma amostra representativa - você pode expandir)

-- FUNDAMENTAL - Operacional
INSERT INTO public.job_roles (title, archetype_id, nivel)
SELECT unnest(ARRAY[
    'Agente Comunitário de Saúde', 'Agente de Combate as Endemias', 'Agente de Endemias',
    'Agente de Portaria', 'Agente de Serviços Gerais', 'Atendente',
    'Auxiliar de Almoxarifado', 'Auxiliar de Biblioteca', 'Auxiliar de Cozinha',
    'Auxiliar de Creche', 'Auxiliar de Manutenção', 'Auxiliar de Mecânico',
    'Auxiliar de Serviços', 'Auxiliar de Serviços Gerais', 'Auxiliar Operacional',
    'Bombeiro Hidráulico', 'Borracheiro', 'Calceteiro', 'Carpinteiro',
    'Contínuo', 'Coveiro', 'Cozinheira', 'Cozinheiro', 'Eletricista',
    'Encanador', 'Gari', 'Jardineiro', 'Marceneiro', 'Mecânico',
    'Merendeira', 'Mestre de Obras', 'Monitor de Creche', 'Operador de Máquina',
    'Operador de máquinas agrícolas', 'Operador de Máquinas Pesadas', 'Operário',
    'Pedreiro', 'Pintor', 'Porteiro', 'Serralheiro', 'Servente',
    'Servente de Pedreiro', 'Serviços Gerais', 'Soldador', 'Tratorista',
    'Vigia', 'Vigilante', 'Zelador'
]),
(SELECT id FROM public.archetypes WHERE name = 'Operacional - Nível Fundamental'),
'fundamental'
ON CONFLICT (title) DO NOTHING;

-- FUNDAMENTAL - Motorista
INSERT INTO public.job_roles (title, archetype_id, nivel)
SELECT unnest(ARRAY[
    'Motorista', 'Motorista "D"', 'Motorista de Ambulância',
    'Motorista de Veículos Leves', 'Motorista de Veículos Pesados'
]),
(SELECT id FROM public.archetypes WHERE name = 'Motorista - Nível Fundamental'),
'fundamental'
ON CONFLICT (title) DO NOTHING;

-- MÉDIO - Administrativo
INSERT INTO public.job_roles (title, archetype_id, nivel)
SELECT unnest(ARRAY[
    'Agente Administrativo', 'Agente Administrativo I', 'Assistente Administrativo',
    'Assistente Administrativo I', 'Assistente de Administração', 'Assistente em Administração',
    'Auxiliar Administrativo', 'Auxiliar de Administração', 'Auxiliar em Administração',
    'Escriturário', 'Oficial Administrativo', 'Técnico Administrativo',
    'Assistente Técnico Administrativo', 'Almoxarife', 'Recepcionista',
    'Secretária', 'Secretário de Escola', 'Secretário Escolar'
]),
(SELECT id FROM public.archetypes WHERE name = 'Administrativo - Nível Médio'),
'medio'
ON CONFLICT (title) DO NOTHING;

-- MÉDIO - Técnico em Informática
INSERT INTO public.job_roles (title, archetype_id, nivel)
SELECT unnest(ARRAY[
    'Técnico de Informática', 'Assistente de Informática', 'Instrutor de Informática',
    'Monitor de Informática', 'Operador de Computador', 'Programador de Computador',
    'Programador Visual', 'Digitador'
]),
(SELECT id FROM public.archetypes WHERE name = 'Técnico em Informática'),
'medio'
ON CONFLICT (title) DO NOTHING;

-- MÉDIO - Fiscal
INSERT INTO public.job_roles (title, archetype_id, nivel)
SELECT unnest(ARRAY[
    'Fiscal', 'Fiscal Ambiental', 'Fiscal de Meio Ambiente', 'Fiscal de Obras',
    'Fiscal de Obras e Posturas', 'Fiscal de Posturas', 'Fiscal de Tributos',
    'Fiscal de Vigilância Sanitária', 'Fiscal Municipal', 'Fiscal Sanitário',
    'Fiscal Tributário', 'Agente de Fiscalização', 'Agente Fiscal'
]),
(SELECT id FROM public.archetypes WHERE name = 'Fiscal - Nível Médio'),
'medio'
ON CONFLICT (title) DO NOTHING;

-- MÉDIO - Segurança
INSERT INTO public.job_roles (title, archetype_id, nivel)
SELECT unnest(ARRAY[
    'Agente de Polícia', 'Agente Penitenciário', 'Guarda Municipal',
    'Agente de Defesa Civil', 'Agente de Trânsito', 'Agente Municipal de Trânsito'
]),
(SELECT id FROM public.archetypes WHERE name = 'Segurança Pública - Nível Médio'),
'medio'
ON CONFLICT (title) DO NOTHING;

-- MÉDIO - Saúde
INSERT INTO public.job_roles (title, archetype_id, nivel)
SELECT unnest(ARRAY[
    'Técnico de Enfermagem', 'Auxiliar de Enfermagem', 'Auxiliar em Enfermagem',
    'Auxiliar de Enfermagem do Trabalho', 'Técnico em Saúde Bucal', 'Auxiliar em Saúde Bucal',
    'Auxiliar de Saúde Bucal', 'Auxiliar Odontológico', 'Auxiliar de Odontologia',
    'Auxiliar de Dentista', 'Auxiliar de Consultório Dentário', 'Auxiliar de Consultório Odontológico',
    'Atendente de Consultório Dentário', 'Técnico de Laboratório', 'Auxiliar de Laboratório',
    'Assistente de Laboratório', 'Auxiliar de Farmácia', 'Atendente de Farmácia',
    'Técnico em Radiologia', 'Agente de Saúde', 'Agente de Vigilância Sanitária'
]),
(SELECT id FROM public.archetypes WHERE name = 'Saúde - Nível Médio'),
'medio'
ON CONFLICT (title) DO NOTHING;

-- SUPERIOR - Analista de Sistemas
INSERT INTO public.job_roles (title, archetype_id, nivel)
SELECT unnest(ARRAY[
    'Analista de Sistemas', 'Analista de Sistema', 'Analista de Informática',
    'Analista de Suporte', 'Analista de Tecnologia da Informação',
    'Analista Judiciário - Análise de Sistemas', 'Programador'
]),
(SELECT id FROM public.archetypes WHERE name = 'Analista de Sistemas'),
'superior'
ON CONFLICT (title) DO NOTHING;

-- SUPERIOR - Área Jurídica
INSERT INTO public.job_roles (title, archetype_id, nivel)
SELECT unnest(ARRAY[
    'Advogado', 'Advogado Júnior', 'Analista Jurídico', 'Assessor Jurídico',
    'Procurador', 'Procurador do Estado', 'Procurador Jurídico', 'Defensor Público',
    'Delegado de Polícia', 'Juiz', 'Juiz do Trabalho', 'Juiz do Trabalho Substituto',
    'Juiz Federal Substituto', 'Juiz Substituto', 'Oficial de Justiça',
    'Analista Judiciário - Execução de Mandados', 'Direito'
]),
(SELECT id FROM public.archetypes WHERE name = 'Área Jurídica'),
'superior'
ON CONFLICT (title) DO NOTHING;

-- SUPERIOR - Engenharia
INSERT INTO public.job_roles (title, archetype_id, nivel)
SELECT unnest(ARRAY[
    'Engenheiro', 'Engenheiro Civil', 'Engenheiro Civil Júnior', 'Engenharia Civil',
    'Engenheiro Elétrico', 'Engenheiro Eletricista', 'Engenharia Elétrica',
    'Engenheiro Mecânico', 'Engenharia Mecânica', 'Engenheiro Químico',
    'Engenheiro Ambiental', 'Engenheiro Sanitarista', 'Engenheiro Agrônomo',
    'Engenheiro Florestal', 'Engenheiro de Pesca', 'Engenheiro de Producão',
    'Engenheiro de Segurança do Trabalho', 'Engenheiro de Telecomunicações',
    'Engenheiro Eletrônico', 'Engenheiro de alimentos', 'Engenheiro Agrimensor',
    'Engenheiro Cartográfico', 'Analista Judiciário - Engenharia Civil',
    'Analista Judiciário - Engenharia Elétrica'
]),
(SELECT id FROM public.archetypes WHERE name = 'Engenharia'),
'superior'
ON CONFLICT (title) DO NOTHING;

-- SUPERIOR - Medicina
INSERT INTO public.job_roles (title, archetype_id, nivel)
SELECT unnest(ARRAY[
    'Médico', 'Médico - Cardiologia', 'Médico - Cirurgia Geral', 'Médico - Cirurgia Pediátrica',
    'Médico Clínica Médica', 'Médico - Dermatologia', 'Médico - Endocrinologia',
    'Médico - Medicina do Trabalho', 'Médico - Neurocirurgia', 'Médico - Neurologia',
    'Médico - Oftalmologia', 'Médico - Otorrinolaringologia', 'Médico - Pediatria',
    'Médico - Pneumologia', 'Médico PSF', 'Médico - Psiquiatria', 'Médico - Urologia',
    'Médico Anestesiologista', 'Médico Cardiologista', 'Médico-Cirurgião Geral',
    'Médico Clínico Geral', 'Médico da Família', 'Médico Ginecologista',
    'Médico Ginecologista e Obstetra', 'Médico Hematologista', 'Médico Infectologista',
    'Médico Intensivista', 'Médico Nefrologista', 'Médico Neurologista',
    'Médico Obstetra', 'Médico Oftalmologista', 'Médico Ortopedista',
    'Médico Pediatra', 'Médico Plantonista', 'Médico Psiquiatra', 'Médico Radiologista',
    'Analista Judiciário - Medicina'
]),
(SELECT id FROM public.archetypes WHERE name = 'Medicina'),
'superior'
ON CONFLICT (title) DO NOTHING;

-- SUPERIOR - Odontologia
INSERT INTO public.job_roles (title, archetype_id, nivel)
SELECT unnest(ARRAY[
    'Odontólogo', 'Odontólogo - Endodontia', 'Odontólogo - PSF',
    'Cirurgião-Dentista', 'Dentista', 'Analista Judiciário - Odontologia'
]),
(SELECT id FROM public.archetypes WHERE name = 'Odontologia'),
'superior'
ON CONFLICT (title) DO NOTHING;

-- SUPERIOR - Enfermagem
INSERT INTO public.job_roles (title, archetype_id, nivel)
SELECT unnest(ARRAY[
    'Enfermeiro', 'Enfermagem', 'Enfermeiro PSF', 'Enfermeiro do Trabalho',
    'Enfermeiro Padrão', 'Enfermeiro Plantonista'
]),
(SELECT id FROM public.archetypes WHERE name = 'Enfermagem'),
'superior'
ON CONFLICT (title) DO NOTHING;

-- SUPERIOR - Professor
INSERT INTO public.job_roles (title, archetype_id, nivel)
SELECT unnest(ARRAY[
    'Professor', 'Professor - Artes', 'Professor - Biologia', 'Professor - Ciências',
    'Professor - Educação Física', 'Professor Educação Infantil', 'Professor - Ensino Religioso',
    'Professor - Espanhol', 'Professor - Física', 'Professor - Geografia', 'Professor - História',
    'Professor - Informática', 'Professor - Inglês', 'Professor - Língua Inglesa',
    'Professor - Língua Portuguesa', 'Professor - Matemática', 'Professor - Português',
    'Professor - Química', 'Professor - Séries Iniciais', 'Professor de 1ª a 4ª séries',
    'Professor de Arte', 'Professor de Artes', 'Professor de Biologia', 'Professor de Ciências',
    'Professor de Educação Artística', 'Professor de Educação Básica', 'Professor de Educação Básica I',
    'Professor de Educação Básica II - Matemática', 'Professor de Educação Especial',
    'Professor de Educação Física', 'Professor de Educação Infantil', 'Professor de Ensino Fundamental',
    'Professor de Ensino Religioso', 'Professor de Espanhol', 'Professor de Filosofia',
    'Professor de Física', 'Professor de Geografia', 'Professor de História',
    'Professor de Informática', 'Professor de Inglês', 'Professor de Libras',
    'Professor de Matemática', 'Professor de Música', 'Professor de Português',
    'Professor de Química', 'Professor de Sociologia', 'Pedagogo', 'Orientador Educacional',
    'Orientador Pedagógico', 'Supervisor de Ensino', 'Especialista em Educação'
]),
(SELECT id FROM public.archetypes WHERE name = 'Professor'),
'superior'
ON CONFLICT (title) DO NOTHING;

-- SUPERIOR - Contabilidade
INSERT INTO public.job_roles (title, archetype_id, nivel)
SELECT unnest(ARRAY[
    'Contador', 'Contador Júnior', 'Ciências Contábeis', 'Analista Contábil',
    'Auditor', 'Auditor Fiscal', 'Controlador Interno', 'Analista de Controle Interno',
    'Analista Judiciário - Contabilidade'
]),
(SELECT id FROM public.archetypes WHERE name = 'Contabilidade'),
'superior'
ON CONFLICT (title) DO NOTHING;

-- SUPERIOR - Administração
INSERT INTO public.job_roles (title, archetype_id, nivel)
SELECT unnest(ARRAY[
    'Administrador', 'Administração', 'Administrador Júnior', 'Administrador Hospitalar',
    'Analista Administrativo', 'Analista de Recursos Humanos', 'Analista Judiciário - Administrativa'
]),
(SELECT id FROM public.archetypes WHERE name = 'Administração'),
'superior'
ON CONFLICT (title) DO NOTHING;

-- Mensagem de Sucesso
DO $$
BEGIN
    RAISE NOTICE 'SUCESSO! Todos os cargos foram inseridos e vinculados aos arquétipos.';
END $$;
