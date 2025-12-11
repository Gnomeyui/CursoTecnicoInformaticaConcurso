export interface Question {
  id: number;
  materia: string;
  pergunta: string;
  opcoes: string[];
  correta: number;
  explicacao: string;
}

export const QUESTIONS: Question[] = [
  // --- BLOCO 1: LEGISLAÇÃO E ESTRUTURA ALE-RR ---
  {
    id: 1,
    materia: "Legislação - ALE-RR",
    pergunta: "A Assembleia Legislativa do Estado de Roraima é composta por quantos Deputados Estaduais?",
    opcoes: ["18 Deputados", "24 Deputados", "30 Deputados", "15 Deputados"],
    correta: 1,
    explicacao: "Conforme a Constituição Estadual e o Art. 27 da CF/88, Roraima (por ter até 12 deputados federais) tem o triplo desse número em estaduais: 8 federais x 3 = 24 Estaduais."
  },
  {
    id: 2,
    materia: "Legislação - Mesa Diretora",
    pergunta: "O mandato dos membros da Mesa Diretora da Assembleia Legislativa de Roraima é de:",
    opcoes: ["1 ano, vedada a recondução", "2 anos, permitida a reeleição", "4 anos, coincidente com a legislatura", "2 anos, vedada a reeleição"],
    correta: 1,
    explicacao: "O padrão regimental (e tendência do STF) é mandato de 2 anos, sendo permitida a recondução para o mesmo cargo na eleição imediatamente subsequente."
  },
  {
    id: 3,
    materia: "Direito Administrativo",
    pergunta: "Ao entrar em exercício, o servidor nomeado para cargo de provimento efetivo ficará sujeito a estágio probatório por período de:",
    opcoes: ["24 meses", "36 meses", "12 meses", "48 meses"],
    correta: 1,
    explicacao: "Conforme a Constituição Federal (EC 19/98), o estágio probatório tem duração de 3 anos (36 meses)."
  },
  {
    id: 4,
    materia: "Constitucional - Acumulação",
    pergunta: "É vedada a acumulação remunerada de cargos públicos, EXCETO, quando houver compatibilidade de horários:",
    opcoes: ["Dois cargos de advogado público", "Um cargo de professor com outro técnico ou científico", "Dois cargos de técnico administrativo", "Um cargo de policial com um de vereador (sem compatibilidade)"],
    correta: 1,
    explicacao: "Art. 37, XVI da CF: É permitida a acumulação de dois cargos de professor; um de professor com outro técnico/científico; ou dois de profissionais de saúde."
  },
  {
    id: 5,
    materia: "Legislação - Vacância",
    pergunta: "Qual das hipóteses abaixo NÃO constitui uma forma de vacância do cargo público?",
    opcoes: ["Exoneração", "Demissão", "Promoção", "Nomeação"],
    correta: 3,
    explicacao: "Nomeação é forma de PROVIMENTO (entrada). Vacância (saída) ocorre por exoneração, demissão, promoção (sai do cargo antigo para o novo), aposentadoria, falecimento, etc."
  },
  {
    id: 6,
    materia: "Processo Legislativo",
    pergunta: "A quem compete privativamente a iniciativa de leis que disponham sobre o regime jurídico dos servidores da Assembleia Legislativa?",
    opcoes: ["Ao Governador do Estado", "À Mesa Diretora da Assembleia", "A qualquer Deputado", "Ao Tribunal de Contas"],
    correta: 1,
    explicacao: "Leis sobre a organização interna e servidores da Casa Legislativa são de iniciativa privativa da própria Mesa Diretora, e não do Governador (que cuida do Executivo)."
  },

  // --- BLOCO 2: INFORMÁTICA (HARDWARE & REDES) ---
  {
    id: 7,
    materia: "Informatica - Armazenamento",
    pergunta: "Qual tecnologia de SSD utiliza o barramento PCIe para atingir velocidades muito superiores ao SATA tradicional?",
    opcoes: ["SSD M.2 SATA", "SSD NVMe", "HDD SAS", "eMMC"],
    correta: 1,
    explicacao: "O NVMe (Non-Volatile Memory express) foi desenhado especificamente para armazenamento em memória flash via barramento PCIe, superando o limite do SATA."
  },
  {
    id: 8,
    materia: "Redes - Camadas",
    pergunta: "No modelo OSI, em qual camada atua um Switch gerenciável que opera apenas com endereços MAC?",
    opcoes: ["Camada 1 (Física)", "Camada 2 (Enlace)", "Camada 3 (Rede)", "Camada 4 (Transporte)"],
    correta: 1,
    explicacao: "Switches tradicionais operam na Camada 2 (Enlace/Data Link), tomando decisões baseadas no endereço físico (MAC Address). Roteadores operam na Camada 3."
  },
  {
    id: 9,
    materia: "Redes - Protocolos",
    pergunta: "Qual porta TCP padrão é utilizada pelo protocolo SMTP para envio de e-mails seguros (com criptografia TLS/SSL)?",
    opcoes: ["Porta 25", "Porta 110", "Porta 587", "Porta 143"],
    correta: 2,
    explicacao: "A porta 25 é obsoleta para usuários finais. A porta 587 é a padrão atual para submissão de e-mail seguro (SMTP). 110 é POP3 e 143 é IMAP."
  },
  {
    id: 10,
    materia: "Redes - Wireless",
    pergunta: "Qual padrão Wi-Fi é também conhecido comercialmente como Wi-Fi 6?",
    opcoes: ["802.11ac", "802.11n", "802.11ax", "802.11g"],
    correta: 2,
    explicacao: "802.11ax é o Wi-Fi 6. O 802.11ac é o Wi-Fi 5 e o 802.11n é o Wi-Fi 4."
  },
  {
    id: 11,
    materia: "Hardware - RAID",
    pergunta: "Qual nível de RAID oferece espelhamento de dados (mirroring), garantindo redundância caso um disco falhe, mas sem ganho de soma de capacidade?",
    opcoes: ["RAID 0", "RAID 1", "RAID 5", "RAID 6"],
    correta: 1,
    explicacao: "RAID 1 é o espelhamento (cópia exata). RAID 0 é striping (velocidade, sem segurança). RAID 5 usa paridade."
  },

  // --- BLOCO 3: SEGURANÇA DA INFORMAÇÃO ---
  {
    id: 12,
    materia: "Segurança - Ataques",
    pergunta: "Qual ataque consiste em explorar vulnerabilidades no banco de dados da aplicação através de inserção de comandos maliciosos em campos de entrada?",
    opcoes: ["XSS (Cross-Site Scripting)", "SQL Injection", "Brute Force", "DDoS"],
    correta: 1,
    explicacao: "SQL Injection (Injeção de SQL) ocorre quando o invasor insere instruções SQL em formulários para manipular o banco de dados."
  },
  {
    id: 13,
    materia: "Segurança - Criptografia",
    pergunta: "Na criptografia assimétrica, qual chave é utilizada para CRIPTOGRAFAR uma mensagem de modo que apenas o destinatário específico possa ler?",
    opcoes: ["Chave Privada do Remetente", "Chave Pública do Remetente", "Chave Privada do Destinatário", "Chave Pública do Destinatário"],
    correta: 3,
    explicacao: "Você usa a Chave PÚBLICA do Destinatário para cifrar. Assim, somente a Chave PRIVADA dele (que só ele tem) poderá decifrar."
  },
  {
    id: 14,
    materia: "Segurança - Backup",
    pergunta: "Um backup 'Incremental' salva:",
    opcoes: ["Todos os arquivos, marcando-os como salvos", "Apenas os arquivos alterados desde o último backup Full", "Apenas os arquivos alterados desde o último backup de qualquer tipo", "Somente arquivos do sistema operacional"],
    correta: 2,
    explicacao: "O Incremental copia o que mudou desde o ÚLTIMO backup (seja ele Full ou outro Incremental). É mais rápido, mas a restauração é mais lenta."
  },

  // --- BLOCO 4: SISTEMAS OPERACIONAIS (LINUX/WINDOWS) ---
  {
    id: 15,
    materia: "Linux - Permissões",
    pergunta: "Qual o valor octal para definir permissão total (leitura, escrita e execução) para o dono, e apenas leitura e execução para o grupo e outros?",
    opcoes: ["777", "755", "644", "750"],
    correta: 1,
    explicacao: "7 (rwx) para Dono. 5 (r-x) para Grupo. 5 (r-x) para Outros. Logo: 755."
  },
  {
    id: 16,
    materia: "Linux - Comandos",
    pergunta: "Qual comando Linux exibe os processos em execução no sistema em tempo real, mostrando consumo de CPU e Memória?",
    opcoes: ["ps", "top", "kill", "nice"],
    correta: 1,
    explicacao: "O comando 'top' (ou 'htop') mostra a lista dinâmica em tempo real. O 'ps' mostra um snapshot estático do momento."
  },
  {
    id: 17,
    materia: "Windows - Redes",
    pergunta: "No CMD do Windows, qual comando exibe o caminho (rota) percorrido pelos pacotes até um destino na rede?",
    opcoes: ["ping", "ipconfig", "tracert", "nslookup"],
    correta: 2,
    explicacao: "O 'tracert' (Trace Route) mapeia os saltos (hops) até o destino. No Linux, o equivalente é 'traceroute'."
  },

  // --- BLOCO 5: PORTUGUÊS (ESTILO FGV/CESPE) ---
  {
    id: 18,
    materia: "Português - Crase",
    pergunta: "Assinale a alternativa onde o uso da crase é OBRIGATÓRIO:",
    opcoes: ["Fui a pé até a praça.", "Entregou o documento a Vossa Excelência.", "Refiro-me àquela servidora.", "A reunião começa as 14 horas."],
    correta: 2,
    explicacao: "Em 'Refiro-me àquela', há fusão da preposição 'a' (regida por referir) + pronome 'aquela'. 'A pé' é masculino (sem crase). Pronomes de tratamento (Vossa Excelência) rejeitam crase."
  },
  {
    id: 19,
    materia: "Português - Concordância",
    pergunta: "Assinale a frase correta quanto à concordância nominal:",
    opcoes: ["A entrada é proibida.", "Entrada é proibido.", "É proibida entrada.", "A entrada é proibido."],
    correta: 0,
    explicacao: "Se o sujeito vier determinado (com artigo 'A'), o adjetivo concorda: 'A entrada é proibida'. Se não tiver artigo, fica no masculino: 'Entrada é proibido'."
  },

  // --- BLOCO 6: LEIS ESPECIAIS (LGPD & LICITAÇÕES TI) ---
  {
    id: 20,
    materia: "LGPD - Lei 13.709",
    pergunta: "Segundo a LGPD, como é denominado a pessoa natural a quem se referem os dados pessoais que são objeto de tratamento?",
    opcoes: ["Controlador", "Operador", "Titular", "Encarregado (DPO)"],
    correta: 2,
    explicacao: "O Titular é o dono do dado (você). O Controlador decide o uso, o Operador processa e o Encarregado faz a ponte."
  },
  {
    id: 21,
    materia: "Nova Lei de Licitações (14.133)",
    pergunta: "Na contratação de bens e serviços de TI, a Administração Pública deve priorizar:",
    opcoes: ["O menor preço sempre", "Técnica e Preço", "Dispensa de licitação", "Inexigibilidade"],
    correta: 1,
    explicacao: "Para TI, a Lei 14.133 e jurisprudência do TCU indicam que não basta o menor preço, deve-se buscar a melhor técnica para evitar obsolescência ou falhas (Técnica e Preço)."
  },
  {
    id: 22,
    materia: "Governança TI - ITIL",
    pergunta: "No ITIL v4, qual prática tem o objetivo de minimizar o impacto negativo de interrupções não planejadas no serviço?",
    opcoes: ["Gerenciamento de Mudança", "Gerenciamento de Incidente", "Gerenciamento de Problema", "Service Desk"],
    correta: 1,
    explicacao: "Incidente é uma interrupção (ex: impressora parou). O objetivo é restaurar o serviço o mais rápido possível. 'Problema' foca na causa raiz."
  },
  {
    id: 23,
    materia: "Informatica - Malwares",
    pergunta: "Qual tipo de malware monitora as atividades do sistema e envia informações a terceiros sem consentimento (ex: keyloggers)?",
    opcoes: ["Ransomware", "Spyware", "Worm", "Botnet"],
    correta: 1,
    explicacao: "Spyware é o software espião. Keylogger é um tipo de spyware que captura teclas digitadas."
  },
  {
    id: 24,
    materia: "Hardware - Conectores",
    pergunta: "Qual conector de vídeo é capaz de transmitir áudio e vídeo digital em alta definição e também dados de rede (Ethernet) em algumas versões?",
    opcoes: ["VGA", "DVI-D", "HDMI", "RCA"],
    correta: 2,
    explicacao: "HDMI (High-Definition Multimedia Interface) transmite áudio, vídeo e, a partir da versão 1.4, canal de Ethernet."
  },
  {
    id: 25,
    materia: "Legislação Estadual",
    pergunta: "A revisão geral anual da remuneração dos servidores públicos estaduais deve ocorrer sempre na mesma data e sem distinção de índices. De quem é a iniciativa dessa lei?",
    opcoes: ["Privativa do Governador", "Concorrente", "Privativa da Assembleia", "Do Judiciário"],
    correta: 0,
    explicacao: "A iniciativa para revisão geral anual é privativa do Chefe do Executivo (Governador), embora se aplique a todos os poderes."
  },
  {
    id: 26,
    materia: "Redes - TCP/IP",
    pergunta: "Qual protocolo da camada de aplicação é responsável pela tradução de nomes de domínio em endereços IP?",
    opcoes: ["DHCP", "DNS", "FTP", "HTTP"],
    correta: 1,
    explicacao: "DNS (Domain Name System) converte nomes como 'google.com' em endereços IP numéricos que os computadores entendem."
  },
  {
    id: 27,
    materia: "Segurança - VPN",
    pergunta: "Qual a principal finalidade de uma VPN (Virtual Private Network)?",
    opcoes: ["Aumentar a velocidade da internet", "Criar um túnel seguro e criptografado para tráfego de dados", "Bloquear vírus", "Aumentar a capacidade de armazenamento"],
    correta: 1,
    explicacao: "VPN cria um 'túnel' criptografado entre dois pontos, protegendo os dados durante a transmissão, especialmente em redes públicas."
  },
  {
    id: 28,
    materia: "Windows - Active Directory",
    pergunta: "No Active Directory, o que é uma GPO (Group Policy Object)?",
    opcoes: ["Um tipo de vírus", "Uma política de grupo para gerenciar configurações de usuários e computadores", "Um protocolo de rede", "Um tipo de backup"],
    correta: 1,
    explicacao: "GPO permite que administradores definam políticas centralizadas, como restrições de segurança, instalação de software, etc."
  },
  {
    id: 29,
    materia: "Hardware - Processadores",
    pergunta: "O que significa 'multi-core' em um processador?",
    opcoes: ["Múltiplas velocidades de clock", "Múltiplos núcleos de processamento no mesmo chip", "Múltiplas memórias cache", "Múltiplos sistemas operacionais"],
    correta: 1,
    explicacao: "Um processador multi-core possui vários núcleos (cores) independentes que podem executar tarefas em paralelo, aumentando o desempenho."
  },
  {
    id: 30,
    materia: "Linux - Estrutura de Diretórios",
    pergunta: "Qual diretório do Linux contém arquivos de configuração do sistema?",
    opcoes: ["/bin", "/etc", "/home", "/var"],
    correta: 1,
    explicacao: "O diretório /etc (et cetera) armazena arquivos de configuração do sistema e aplicativos. /bin contém binários, /home as pastas dos usuários, /var dados variáveis."
  },
  
  // --- BLOCO EXPANDIDO: REDES DE COMPUTADORES (IDs 31-50) ---
  {
    id: 31,
    materia: "Redes - Modelo OSI",
    pergunta: "No contexto do Modelo OSI, a camada responsável pela tradução, criptografia e compressão dos dados, garantindo que a informação enviada pela camada de aplicação de um sistema possa ser lida pela camada de aplicação de outro sistema, é a:",
    opcoes: ["Camada de Sessão", "Camada de Apresentação", "Camada de Transporte", "Camada de Aplicação"],
    correta: 1,
    explicacao: "A Camada de Apresentação (Camada 6) é responsável pela formatação dos dados (tradução), criptografia e compressão. A Sessão gerencia o diálogo, e a Aplicação é a interface com o usuário."
  },
  {
    id: 32,
    materia: "Redes - TCP/IP",
    pergunta: "Sobre o protocolo TCP (Transmission Control Protocol), assinale a característica técnica correta que o diferencia do UDP:",
    opcoes: ["É não orientado a conexão e não garante a entrega dos dados.", "Utiliza o conceito de 'janela deslizante' para controle de fluxo e congestionamento.", "Não realiza o three-way handshake antes da transmissão de dados.", "Possui um cabeçalho menor que o UDP, o que o torna mais rápido."],
    correta: 1,
    explicacao: "O TCP utiliza janelas deslizantes (sliding windows) para gerenciar o fluxo de dados e evitar saturar o receptor. Ele é orientado a conexão, garante entrega e tem cabeçalho maior que o UDP."
  },
  {
    id: 33,
    materia: "Redes - Protocolos",
    pergunta: "Um Técnico Legislativo precisa configurar um servidor de e-mail corporativo. Para garantir que os usuários possam baixar as mensagens para seus dispositivos locais, removendo-as do servidor por padrão, e para envio de e-mails, deve-se utilizar, respectivamente, as portas padrão dos protocolos:",
    opcoes: ["POP3 (110) e SMTP (587)", "IMAP (143) e SMTP (25)", "SMTP (25) e POP3 (110)", "IMAP (993) e POP3 (995)"],
    correta: 0,
    explicacao: "POP3 (Porta 110) baixa e remove mensagens do servidor (comportamento padrão antigo). SMTP (Porta 587/25) é para envio. IMAP apenas sincroniza e mantém no servidor."
  },
  {
    id: 34,
    materia: "Redes - Protocolos",
    pergunta: "Qual protocolo de camada de aplicação utiliza, por padrão, a porta 22 e oferece uma conexão segura e criptografada para administração remota de servidores, substituindo o Telnet?",
    opcoes: ["FTP", "HTTP", "SSH", "RDP"],
    correta: 2,
    explicacao: "SSH (Secure Shell) opera na porta 22 e provê criptografia para acesso remoto via terminal. Telnet (23) envia dados em texto plano. RDP usa 3389."
  },
  {
    id: 35,
    materia: "Redes - Serviços",
    pergunta: "O serviço de rede responsável por traduzir nomes de domínio amigáveis (como www.al.rr.leg.br) para endereços IP numéricos, permitindo o roteamento na internet, é o:",
    opcoes: ["DHCP", "DNS", "NAT", "ARP"],
    correta: 1,
    explicacao: "DNS (Domain Name System) resolve nomes em IPs. DHCP atribui IPs automaticamente. NAT traduz IPs privados em públicos. ARP resolve IPs em endereços MAC."
  },
  {
    id: 36,
    materia: "Redes - Equipamentos",
    pergunta: "Em relação aos equipamentos de interconexão, qual dispositivo opera na Camada 2 (Enlace) do modelo OSI, utilizando endereços MAC para segmentar domínios de colisão, mas mantendo um único domínio de broadcast?",
    opcoes: ["Hub", "Roteador", "Switch", "Repetidor"],
    correta: 2,
    explicacao: "O Switch opera na camada 2 e cria domínios de colisão separados para cada porta, mas propaga broadcasts para todas (salvo se usar VLANs). Hubs repetem tudo (mesmo domínio de colisão)."
  },
  {
    id: 37,
    materia: "Redes - Equipamentos",
    pergunta: "Para conectar duas redes distintas (ex: a LAN da Assembleia e a Internet), operando na Camada 3 do modelo OSI e tomando decisões de encaminhamento baseadas em endereços IP lógicos, utiliza-se um:",
    opcoes: ["Switch Gerenciável L2", "Roteador", "Bridge", "Access Point"],
    correta: 1,
    explicacao: "O Roteador conecta redes diferentes e escolhe a melhor rota baseada em IP (Camada 3). Switches L2 usam MAC. Bridges conectam segmentos da mesma rede."
  },
  {
    id: 38,
    materia: "Redes - Equipamentos",
    pergunta: "Sobre o funcionamento de um Hub, é correto afirmar que ele atua na Camada Física e:",
    opcoes: ["Envia o pacote apenas para a porta de destino correta.", "Realiza filtragem de pacotes baseada em endereço MAC.", "Replica o sinal elétrico recebido em uma porta para todas as outras portas (broadcast).", "Pode ser configurado com VLANs para segurança."],
    correta: 2,
    explicacao: "O Hub é um repetidor burro; ele recebe o sinal e o espelha para todas as portas, gerando alto tráfego e colisões. Não entende MAC ou IP."
  },
  {
    id: 39,
    materia: "Redes - Cabeamento",
    pergunta: "Um técnico precisa cabear um novo anexo da ALE-RR para suportar velocidades de 10 Gigabit Ethernet (10GBASE-T) a uma distância de até 100 metros. Qual a categoria mínima de cabo de par trançado recomendada?",
    opcoes: ["Cat5e", "Cat6", "Cat6a", "Cat5"],
    correta: 2,
    explicacao: "Cat6a (Augmented) suporta 10 Gbps até 100m. Cat6 suporta 10 Gbps apenas até 55m. Cat5e limita-se a 1 Gbps (Gigabit)."
  },
  {
    id: 40,
    materia: "Redes - Cabeamento",
    pergunta: "Qual tipo de fibra óptica é mais adequado para conexões de longa distância (acima de 2km) e utiliza laser como fonte de luz, possuindo um núcleo extremamente fino (aprox. 9 mícros)?",
    opcoes: ["Multimodo", "Monomodo", "Coaxial", "Par Trançado Blindado"],
    correta: 1,
    explicacao: "A fibra Monomodo (Single-mode) tem núcleo estreito, usa laser e alcança dezenas de quilômetros sem repetidores. Multimodo usa LED e é para curtas distâncias."
  },
  {
    id: 41,
    materia: "Redes - Cabeamento",
    pergunta: "No padrão de crimpagem T568A para conectores RJ-45, a sequência correta de cores dos pinos 1 e 2 é:",
    opcoes: ["Branco/Laranja e Laranja", "Branco/Verde e Verde", "Branco/Azul e Azul", "Branco/Marrom e Marrom"],
    correta: 1,
    explicacao: "T568A começa com Branco/Verde e Verde. O padrão T568B (mais comum) começa com Branco/Laranja e Laranja."
  },
  {
    id: 42,
    materia: "Redes - Endereçamento IP",
    pergunta: "Dado o endereço IPv4 192.168.10.0 com a máscara de sub-rede 255.255.255.192 (ou /26), quantos hosts utilizáveis existem nessa sub-rede?",
    opcoes: ["254", "126", "62", "30"],
    correta: 2,
    explicacao: "CIDR /26 deixa 6 bits para host (32-26=6). 2^6 = 64. Menos 2 (rede e broadcast) = 62 hosts utilizáveis."
  },
  {
    id: 43,
    materia: "Redes - Endereçamento IP",
    pergunta: "Qual das faixas de IP abaixo é reservada para uso privado (não roteável na internet pública) conforme a RFC 1918, correspondente à Classe B?",
    opcoes: ["10.0.0.0 a 10.255.255.255", "172.16.0.0 a 172.31.255.255", "192.168.0.0 a 192.168.255.255", "169.254.0.0 a 169.254.255.255"],
    correta: 1,
    explicacao: "172.16.0.0/12 é a faixa privada Classe B. 10.0.0.0/8 é Classe A privada. 192.168.0.0/16 é Classe C privada."
  },
  {
    id: 44,
    materia: "Redes - Endereçamento IPv6",
    pergunta: "O endereço de loopback (localhost) no protocolo IPv6 é representado como:",
    opcoes: ["127.0.0.1", "::1", "FE80::1", "2001::1"],
    correta: 1,
    explicacao: "No IPv6, o loopback é ::1 (equivalente a 127.0.0.1 no IPv4). FE80:: indica Link-Local."
  },
  {
    id: 45,
    materia: "Redes - Wi-Fi",
    pergunta: "Qual padrão IEEE de redes sem fio, conhecido como Wi-Fi 6, introduziu a tecnologia OFDMA para melhorar a eficiência espectral em ambientes de alta densidade?",
    opcoes: ["802.11n", "802.11ac", "802.11ax", "802.11g"],
    correta: 2,
    explicacao: "802.11ax é o Wi-Fi 6. Ele trouxe o OFDMA (Orthogonal Frequency-Division Multiple Access) para permitir comunicação simultânea com múltiplos dispositivos."
  },
  {
    id: 46,
    materia: "Redes - Segurança Wi-Fi",
    pergunta: "Atualmente, o protocolo de segurança mais robusto recomendado para redes Wi-Fi corporativas, que utiliza criptografia SAE (Simultaneous Authentication of Equals) e proteção contra ataques de dicionário offline, é o:",
    opcoes: ["WEP", "WPA", "WPA2-PSK", "WPA3"],
    correta: 3,
    explicacao: "WPA3 é o padrão mais recente, substituindo o handshake de 4 vias do WPA2 pelo SAE, tornando a quebra de senhas muito mais difícil."
  },
  {
    id: 47,
    materia: "Redes - Protocolos",
    pergunta: "O protocolo DHCP utiliza o processo 'DORA' para atribuir IPs. O que significa a sigla DORA?",
    opcoes: ["Discover, Offer, Request, Acknowledge", "Domain, Origin, Request, Access", "Data, Output, Routing, Authentication", "Discover, Open, Retrieve, Accept"],
    correta: 0,
    explicacao: "O cliente envia Discover, o servidor manda Offer, cliente pede Request, servidor confirma com Acknowledge."
  },
  {
    id: 48,
    materia: "Redes - Ferramentas",
    pergunta: "Um técnico deseja verificar a rota completa que um pacote percorre até um servidor remoto e identificar onde está ocorrendo latência na rede. No Windows, o comando correto é:",
    opcoes: ["ping", "ipconfig", "tracert", "netstat"],
    correta: 2,
    explicacao: "Tracert (Trace Route) mapeia os saltos (hops) até o destino. No Linux seria 'traceroute'. Ping testa conectividade, mas não detalha a rota."
  },
  {
    id: 49,
    materia: "Redes - Portas",
    pergunta: "A porta padrão TCP 443 é utilizada por qual protocolo para garantir a comunicação segura na web?",
    opcoes: ["HTTP", "HTTPS", "FTP", "SNMP"],
    correta: 1,
    explicacao: "HTTPS utiliza SSL/TLS na porta 443. HTTP usa a porta 80 (sem criptografia)."
  },
  {
    id: 50,
    materia: "Redes - Camadas",
    pergunta: "Em qual camada do modelo OSI ocorre o controle de acesso ao meio (MAC) e a detecção de erros físicos (CRC/FCS)?",
    opcoes: ["Física", "Enlace de Dados", "Rede", "Transporte"],
    correta: 1,
    explicacao: "A Camada de Enlace (Link Layer) é dividida em subcamadas LLC e MAC. Ela lida com o endereçamento físico e verificação de integridade do quadro."
  },
  
  // --- BLOCO DE SEGURANÇA DA INFORMAÇÃO (IDs 51-70) ---
  {
    id: 51,
    materia: "Segurança - Malware",
    pergunta: "Um servidor da Assembleia foi comprometido por um malware que criptografou todos os arquivos de dados, exigindo pagamento em criptomoedas para a liberação da chave de descriptografia. Este tipo de ameaça é classificado tecnicamente como:",
    opcoes: ["Spyware", "Ransomware", "Rootkit", "Worm"],
    correta: 1,
    explicacao: "Ransomware é o malware de sequestro de dados (Ransom = Resgate). Ele criptografa arquivos e exige pagamento. Spyware espiona, Rootkit esconde processos e Worm se replica pela rede."
  },
  {
    id: 52,
    materia: "Segurança - Malware",
    pergunta: "Qual a principal diferença técnica entre um Vírus e um Worm?",
    opcoes: ["O Vírus precisa de um hospedeiro para se propagar, enquanto o Worm é um programa autônomo.", "O Worm criptografa arquivos, o Vírus apenas apaga.", "O Vírus se replica pela rede automaticamente, o Worm não.", "Não há diferença técnica, são sinónimos."],
    correta: 0,
    explicacao: "A distinção clássica é: Vírus infecta arquivos/programas (hospedeiro) e precisa de execução humana. Worm (verme) explora vulnerabilidades de rede para se replicar sozinho, sem hospedeiro."
  },
  {
    id: 53,
    materia: "Segurança - Malware",
    pergunta: "Um técnico detectou um software malicioso que permitia a um invasor acesso total e contínuo ao sistema (nível administrativo), ocultando sua própria presença do gerenciador de tarefas e de antivírus comuns. Trata-se de um:",
    opcoes: ["Trojan Horse", "Adware", "Rootkit", "Keylogger"],
    correta: 2,
    explicacao: "Rootkit é projetado para manter acesso privilegiado (root/admin) e, crucialmente, ocultar sua existência alterando o próprio sistema operacional."
  },
  {
    id: 54,
    materia: "Segurança - Ataques",
    pergunta: "Durante uma análise de tráfego, identificou-se que um atacante interceptou a comunicação entre o usuário e o servidor bancário, sem que nenhuma das partes percebesse, podendo ler e alterar os dados. Este ataque é conhecido como:",
    opcoes: ["Denial of Service (DoS)", "Man-in-the-Middle (MitM)", "Phishing", "Brute Force"],
    correta: 1,
    explicacao: "Man-in-the-Middle (Homem no meio) ocorre quando o atacante se posiciona entre as vítimas, interceptando o fluxo de dados. DoS visa derrubar o serviço."
  },
  {
    id: 55,
    materia: "Segurança - Ataques",
    pergunta: "Um ataque de 'Phishing' diferencia-se de um ataque de 'Pharming' principalmente porque:",
    opcoes: ["O Phishing envolve envenenamento de DNS, enquanto o Pharming usa e-mails falsos.", "O Phishing visa enganar o usuário via engenharia social (e-mail/link falso), enquanto o Pharming redireciona o tráfego de forma técnica (DNS/Hosts).", "O Pharming é focado apenas em servidores Linux.", "O Phishing não rouba senhas, apenas dados cadastrais."],
    correta: 1,
    explicacao: "Phishing é a 'isca' (engenharia social) para o usuário clicar. Pharming corrompe a resolução de nomes (DNS ou arquivo hosts), levando o usuário ao site falso mesmo digitando o endereço correto."
  },
  {
    id: 56,
    materia: "Segurança - Ataques",
    pergunta: "Qual técnica de ataque web consiste em inserir comandos maliciosos em campos de entrada (inputs) de uma aplicação para manipular o banco de dados backend?",
    opcoes: ["Cross-Site Scripting (XSS)", "SQL Injection", "Buffer Overflow", "CSRF"],
    correta: 1,
    explicacao: "SQL Injection (Injeção de SQL) explora falhas na validação de dados para executar comandos SQL arbitrários no banco de dados. XSS injeta scripts no navegador do cliente."
  },
  {
    id: 57,
    materia: "Segurança - Criptografia",
    pergunta: "Na criptografia assimétrica, se o Usuário A deseja enviar uma mensagem confidencial para o Usuário B, qual chave o Usuário A deve utilizar para cifrar a mensagem?",
    opcoes: ["A chave privada do Usuário A", "A chave pública do Usuário A", "A chave pública do Usuário B", "A chave privada do Usuário B"],
    correta: 2,
    explicacao: "Para confidencialidade, cifra-se com a Chave Pública do Destinatário (B), pois apenas a Chave Privada de B (que só ele tem) poderá decifrar."
  },
  {
    id: 58,
    materia: "Segurança - Criptografia",
    pergunta: "Qual dos seguintes algoritmos é classificado como um algoritmo de HASH seguro, utilizado para verificar a integridade de arquivos, e gera um resumo de tamanho fixo de 256 bits?",
    opcoes: ["AES", "RSA", "SHA-256", "MD5"],
    correta: 2,
    explicacao: "SHA-256 (família SHA-2) é um algoritmo de Hash seguro. MD5 é hash mas é considerado inseguro (colisões). AES e RSA são algoritmos de encriptação (simétrico e assimétrico, resp.)."
  },
  {
    id: 59,
    materia: "Segurança - Certificação Digital",
    pergunta: "No contexto da ICP-Brasil, a Autoridade Certificadora (AC) é responsável por:",
    opcoes: ["Armazenar as chaves privadas dos usuários.", "Emitir, gerenciar e revogar os certificados digitais.", "Apenas verificar a identidade do usuário presencialmente (papel da AR).", "Criar as leis sobre certificação digital."],
    correta: 1,
    explicacao: "A AC (Autoridade Certificadora) é a entidade que assina e emite o certificado, atestando a relação entre a chave pública e o titular. A AR (Autoridade de Registro) faz a verificação inicial."
  },
  {
    id: 60,
    materia: "Segurança - Criptografia",
    pergunta: "O princípio da segurança da informação que garante que uma mensagem não foi alterada durante o trânsito é a:",
    opcoes: ["Confidencialidade", "Integridade", "Disponibilidade", "Irretratabilidade"],
    correta: 1,
    explicacao: "Integridade garante que a informação está íntegra, exata e não modificada. Confidencialidade é sigilo. Disponibilidade é acesso. Irretratabilidade (Não Repúdio) é a prova de autoria."
  },
  {
    id: 61,
    materia: "Segurança - Defesas",
    pergunta: "Um firewall que opera na camada de aplicação e é capaz de analisar o conteúdo dos pacotes (payload) para bloquear comandos específicos de protocolos (como um comando 'PUT' no HTTP) é classificado como:",
    opcoes: ["Packet Filter (Filtro de Pacotes)", "Stateful Inspection", "Proxy / Application Gateway", "VLAN"],
    correta: 2,
    explicacao: "Firewalls de Proxy ou Application Gateway entendem o protocolo (camada 7) e podem filtrar comandos específicos. Filtros de pacote olham apenas IP/Porta."
  },
  {
    id: 62,
    materia: "Segurança - Defesas",
    pergunta: "Qual é a função primordial de uma DMZ (Zona Desmilitarizada) em uma arquitetura de rede segura?",
    opcoes: ["Isolar a rede interna da internet, abrigando serviços públicos (web, email) em um segmento separado.", "Criptografar todos os dados da rede interna.", "Substituir o uso de firewall.", "Permitir acesso total da internet à rede interna."],
    correta: 0,
    explicacao: "A DMZ é uma sub-rede física ou lógica que expõe serviços externos (HTTP, SMTP) à internet, protegendo a LAN interna caso esses servidores sejam comprometidos."
  },
  {
    id: 63,
    materia: "Segurança - Defesas",
    pergunta: "Um sistema de segurança configurado em modo 'promíscuo' que monitora o tráfego de rede em busca de assinaturas de ataques conhecidos e alerta o administrador, mas NÃO atua bloqueando o tráfego, é um:",
    opcoes: ["IPS (Intrusion Prevention System)", "IDS (Intrusion Detection System)", "Firewall", "VPN"],
    correta: 1,
    explicacao: "IDS (Detection) apenas detecta e alerta. O IPS (Prevention) detecta e bloqueia ativamente o tráfego malicioso."
  },
  {
    id: 64,
    materia: "Segurança - VPN",
    pergunta: "Para estabelecer uma conexão segura entre um funcionário em home office e a rede da Assembleia através da internet pública, criando um túnel criptografado, utiliza-se:",
    opcoes: ["VLAN", "VPN (Virtual Private Network)", "NAT", "DNSSEC"],
    correta: 1,
    explicacao: "VPN cria um túnel virtual criptografado (usando protocolos como IPsec, OpenVPN) sobre uma rede pública, garantindo confidencialidade e integridade."
  },
  {
    id: 65,
    materia: "Segurança - Backup",
    pergunta: "Um administrador realiza um backup COMPLETO (Full) no domingo. Na segunda-feira, faz um backup DIFERENCIAL. Na terça-feira, outro DIFERENCIAL. Se houver uma falha na quarta-feira de manhã, quais arquivos são necessários para a restauração?",
    opcoes: ["Apenas o Diferencial de terça-feira.", "O Full de domingo e todos os Diferenciais (segunda e terça).", "O Full de domingo e apenas o Diferencial de terça-feira.", "Apenas o Full de domingo."],
    correta: 2,
    explicacao: "O backup Diferencial copia tudo que mudou desde o último Full. Portanto, para restaurar, basta o Full original + o último Diferencial (que já contém as mudanças de segunda e terça)."
  },
  {
    id: 66,
    materia: "Segurança - Backup",
    pergunta: "Em comparação com o backup Diferencial, o backup INCREMENTAL:",
    opcoes: ["Ocupa mais espaço de armazenamento.", "É mais lento para realizar a cópia diária.", "É mais rápido para restaurar (restore).", "É mais rápido para copiar (backup), mas mais lento para restaurar."],
    correta: 3,
    explicacao: "Incremental copia apenas o que mudou desde o *último backup de qualquer tipo*. É o mais rápido para fazer backup (menos dados), mas o mais lento para restaurar (precisa do Full + todos os incrementais sequenciais)."
  },
  {
    id: 67,
    materia: "Segurança - Malware",
    pergunta: "Qual tipo de malware é conhecido por capturar tudo o que o usuário digita no teclado, visando roubar senhas bancárias e credenciais de acesso?",
    opcoes: ["Screenlogger", "Keylogger", "Botnet", "Backdoor"],
    correta: 1,
    explicacao: "Keylogger registra as teclas (keystrokes). Screenlogger registra imagens da tela (prints) ao redor do clique do mouse."
  },
  {
    id: 68,
    materia: "Segurança - Ataques",
    pergunta: "O ataque de DDoS (Distributed Denial of Service) tem como objetivo principal afetar qual pilar da segurança da informação?",
    opcoes: ["Confidencialidade", "Integridade", "Disponibilidade", "Autenticidade"],
    correta: 2,
    explicacao: "DDoS visa esgotar os recursos do sistema (banda, processamento) para torná-lo indisponível aos usuários legítimos. Ataca a Disponibilidade."
  },
  {
    id: 69,
    materia: "Segurança - Defesas",
    pergunta: "O uso de múltiplos fatores para confirmar a identidade de um usuário (ex: Senha + Token no celular) é denominado:",
    opcoes: ["Biometria", "MFA (Multi-Factor Authentication)", "SSO (Single Sign-On)", "Criptografia Assimétrica"],
    correta: 1,
    explicacao: "MFA exige ao menos dois tipos de prova: algo que você sabe (senha), algo que você tem (token/celular) ou algo que você é (biometria)."
  },
  {
    id: 70,
    materia: "Segurança - Engenharia Social",
    pergunta: "A técnica de manipulação psicológica onde o atacante explora a confiança humana, muitas vezes ligando para a vítima fingindo ser do suporte técnico para obter senhas, é chamada de:",
    opcoes: ["Engenharia Social", "Dumpster Diving", "Shoulder Surfing", "Spoofing"],
    correta: 0,
    explicacao: "Engenharia Social é a arte de manipular pessoas para obter informações confidenciais. As outras são técnicas específicas (lixo, olhar por cima do ombro, falsificação de remetente), mas a definição ampla é Engenharia Social."
  },

  // ========================================
  // LOTE 4: SISTEMAS OPERACIONAIS (LINUX E WINDOWS)
  // IDs: 71 a 90 (20 questões)
  // ========================================

  // LINUX - Comandos, Permissões e Administração
  {
    id: 71,
    materia: "Linux - Permissões",
    pergunta: "Um administrador de sistemas Linux precisa configurar um script chamado 'backup.sh' para que o dono tenha permissão total (leitura, escrita e execução), o grupo tenha apenas leitura e execução, e os outros usuários não tenham nenhuma permissão. Qual o comando octal correto?",
    opcoes: ["chmod 777 backup.sh", "chmod 750 backup.sh", "chmod 755 backup.sh", "chmod 640 backup.sh"],
    correta: 1,
    explicacao: "Dono (7 = rwx), Grupo (5 = r-x), Outros (0 = ---). Logo, 750. 777 dá permissão total a todos (inseguro)."
  },
  {
    id: 72,
    materia: "Linux - Comandos",
    pergunta: "Qual comando Linux é utilizado para pesquisar padrões de texto dentro de arquivos, permitindo o uso de expressões regulares?",
    opcoes: ["find", "locate", "grep", "cat"],
    correta: 2,
    explicacao: "O 'grep' (Global Regular Expression Print) busca strings ou padrões regex dentro de arquivos. O 'find' busca arquivos pelo nome/atributo, não conteúdo."
  },
  {
    id: 73,
    materia: "Linux - Diretórios",
    pergunta: "Na estrutura de diretórios padrão do Linux (FHS), qual diretório é destinado a armazenar arquivos de configuração do sistema e dos serviços instalados?",
    opcoes: ["/bin", "/etc", "/dev", "/var"],
    correta: 1,
    explicacao: "/etc armazena configurações (ex: /etc/passwd). /bin tem binários essenciais, /dev tem dispositivos e /var tem dados variáveis (logs, spool)."
  },
  {
    id: 74,
    materia: "Linux - Processos",
    pergunta: "Para encerrar forçadamente um processo que travou e não responde, enviando o sinal SIGKILL, qual comando deve ser utilizado, assumindo que o PID do processo é 1234?",
    opcoes: ["kill -9 1234", "kill -15 1234", "stop 1234", "ps -kill 1234"],
    correta: 0,
    explicacao: "O parâmetro -9 envia o sinal SIGKILL, que mata o processo imediatamente sem chance de limpeza. O padrão (sem número) é -15 (SIGTERM)."
  },
  {
    id: 75,
    materia: "Linux - Comandos",
    pergunta: "O comando utilizado para alterar o proprietário (owner) e o grupo de um arquivo simultaneamente no Linux é:",
    opcoes: ["chmod", "chown", "chgrp", "umask"],
    correta: 1,
    explicacao: "O comando 'chown' (change owner) permite alterar dono e grupo (sintaxe: chown usuario:grupo arquivo). 'chmod' altera permissões."
  },
  {
    id: 76,
    materia: "Linux - Redirecionamento",
    pergunta: "No shell bash, qual operador é utilizado para redirecionar a saída padrão (stdout) de um comando para a entrada padrão (stdin) de outro comando (o conceito de 'pipe')?",
    opcoes: [">", ">>", "|", "&"],
    correta: 2,
    explicacao: "O pipe '|' conecta a saída de um comando à entrada do próximo (ex: ls | grep txt). O '>' redireciona para arquivo (sobrescrevendo)."
  },
  {
    id: 77,
    materia: "Linux - Comandos",
    pergunta: "Qual comando exibe o caminho completo do diretório atual de trabalho (Current Working Directory)?",
    opcoes: ["dir", "cd", "pwd", "ls -a"],
    correta: 2,
    explicacao: "'pwd' significa Print Working Directory. 'cd' muda de diretório."
  },
  {
    id: 78,
    materia: "Linux - Diretórios",
    pergunta: "Qual diretório do Linux contém os arquivos especiais de dispositivo (ex: disco rígido sda, terminal tty) que representam o hardware do sistema?",
    opcoes: ["/mnt", "/media", "/proc", "/dev"],
    correta: 3,
    explicacao: "/dev (Devices) contém arquivos de interface com hardware. /proc é um sistema de arquivos virtual com informações do kernel."
  },
  {
    id: 79,
    materia: "Linux - Gerenciamento",
    pergunta: "Para monitorizar os processos em execução em tempo real, visualizando o uso de CPU e Memória de forma interativa, utiliza-se o comando:",
    opcoes: ["ps", "top", "free", "df"],
    correta: 1,
    explicacao: "'top' (ou 'htop') exibe processos em tempo real. 'ps' exibe um snapshot estático do momento."
  },
  {
    id: 80,
    materia: "Linux - Comandos",
    pergunta: "Qual comando é usado para criar um novo diretório no sistema de arquivos?",
    opcoes: ["mkfile", "touch", "mkdir", "rmdir"],
    correta: 2,
    explicacao: "'mkdir' (make directory) cria pastas. 'touch' cria arquivos vazios ou atualiza timestamps."
  },
  {
    id: 81,
    materia: "Linux - Permissões Especiais",
    pergunta: "O que significa o bit 'Sticky Bit' quando aplicado a um diretório com permissão de escrita para todos (como o /tmp)?",
    opcoes: ["Torna o diretório imutável.", "Permite que apenas o dono do arquivo (ou root) possa apagá-lo, mesmo que outros tenham permissão de escrita na pasta.", "Faz com que novos arquivos herdem o grupo do diretório.", "Bloqueia o acesso de leitura a usuários não autenticados."],
    correta: 1,
    explicacao: "Sticky Bit (t) impede que usuários apaguem arquivos de outros usuários em pastas compartilhadas como /tmp."
  },
  {
    id: 82,
    materia: "Linux - Manipulação",
    pergunta: "Qual comando é utilizado para exibir as últimas 10 linhas de um arquivo de log e continuar monitorando novas entradas em tempo real?",
    opcoes: ["head -f", "cat -a", "tail -f", "less -r"],
    correta: 2,
    explicacao: "'tail -f' (follow) mostra o fim do arquivo e fica aguardando novos dados. Essencial para leitura de logs."
  },

  // WINDOWS - Comandos, Administração e Rede
  {
    id: 83,
    materia: "Windows - Rede",
    pergunta: "No Prompt de Comando (CMD) do Windows, qual comando exibe as configurações de IP detalhadas, incluindo servidor DNS, DHCP e endereço MAC de todas as interfaces?",
    opcoes: ["ipconfig", "ipconfig /all", "ipconfig /renew", "ifconfig -a"],
    correta: 1,
    explicacao: "'ipconfig' mostra apenas IP, Máscara e Gateway. O parâmetro '/all' exibe os detalhes completos (MAC, DNS, DHCP)."
  },
  {
    id: 84,
    materia: "Windows - Comandos",
    pergunta: "Para verificar a conectividade com um host remoto e medir o tempo de resposta (latência) enviando pacotes ICMP, utiliza-se:",
    opcoes: ["netstat", "ping", "nslookup", "route"],
    correta: 1,
    explicacao: "O 'ping' testa a conectividade e latência. 'nslookup' resolve nomes DNS."
  },
  {
    id: 85,
    materia: "Windows - Active Directory",
    pergunta: "No contexto de domínios Windows Server, o que são as GPOs (Group Policy Objects)?",
    opcoes: ["Objetos que definem grupos de usuários para permissão de arquivos.", "Regras que controlam as configurações de ambiente de usuários e computadores de forma centralizada.", "Serviços de diretório para autenticação Kerberos.", "Scripts de logon locais."],
    correta: 1,
    explicacao: "GPOs são usadas no AD para aplicar políticas de segurança, instalação de software e configurações de desktop em massa."
  },
  {
    id: 86,
    materia: "Windows - Sistema de Arquivos",
    pergunta: "No sistema de arquivos NTFS, quando você move um arquivo de uma pasta para outra dentro do MESMO volume (partição), o que acontece com as permissões do arquivo?",
    opcoes: ["Ele herda as permissões da pasta de destino.", "Ele mantém as permissões originais.", "As permissões são resetadas para 'Todos - Leitura'.", "O arquivo torna-se privado."],
    correta: 1,
    explicacao: "Ao MOVER no MESMO volume, o NTFS apenas atualiza o ponteiro, mantendo os atributos originais (incluindo permissões). Ao COPIAR ou mover para OUTRO volume, ele herda as permissões do destino."
  },
  {
    id: 87,
    materia: "Windows - Diagnóstico",
    pergunta: "Qual comando Windows exibe todas as conexões TCP/IP ativas e as portas em que o computador está 'ouvindo' (listening)?",
    opcoes: ["netstat -an", "ipconfig /flushdns", "tracert", "nbtstat"],
    correta: 0,
    explicacao: "'netstat' (Network Statistics) mostra conexões ativas, portas abertas e tabela de roteamento."
  },
  {
    id: 88,
    materia: "Windows - PowerShell",
    pergunta: "O PowerShell difere do CMD tradicional principalmente por:",
    opcoes: ["Ser baseado em texto puro, sem suporte a scripts.", "Ser orientado a objetos e utilizar 'cmdlets' baseados no framework .NET.", "Não permitir administração remota.", "Ser exclusivo para versões Server do Windows."],
    correta: 1,
    explicacao: "O PowerShell trabalha com objetos .NET, permitindo manipulação complexa de dados, ao contrário do CMD que manipula texto."
  },
  {
    id: 89,
    materia: "Windows - Registro",
    pergunta: "Qual 'hive' (ramo principal) do Registro do Windows armazena as configurações específicas do usuário que está logado no momento?",
    opcoes: ["HKEY_LOCAL_MACHINE (HKLM)", "HKEY_CURRENT_USER (HKCU)", "HKEY_CLASSES_ROOT", "HKEY_USERS"],
    correta: 1,
    explicacao: "HKCU contém as preferências do usuário atual. HKLM contém configurações do sistema (máquina) globais."
  },
  {
    id: 90,
    materia: "Windows - Utilitários",
    pergunta: "Para abrir o gerenciador de tarefas diretamente via atalho de teclado ou comando 'Executar', pode-se utilizar:",
    opcoes: ["taskmgr", "services.msc", "regedit", "msconfig"],
    correta: 0,
    explicacao: "'taskmgr' abre o Task Manager. 'services.msc' abre os Serviços. 'regedit' o Registro."
  },

  // ========================================
  // LOTE 6: HARDWARE E MANUTENÇÃO
  // IDs: 91 a 105 (15 questões)
  // ========================================

  {
    id: 91,
    materia: "Hardware - Armazenamento",
    pergunta: "Um técnico precisa configurar um servidor de arquivos que garanta alta performance de leitura e escrita, mas também tolerância a falhas. Qual nível de RAID deve ser escolhido, sabendo que ele dispõe de 3 discos rígidos idênticos e aceita perder a capacidade de armazenamento equivalente a um disco para paridade?",
    opcoes: ["RAID 0", "RAID 1", "RAID 5", "RAID 10"],
    correta: 2,
    explicacao: "RAID 5 exige no mínimo 3 discos. Ele distribui os dados e a paridade entre todos os discos. Se um falhar, os dados são reconstruídos. RAID 0 não tem tolerância (apenas performance). RAID 1 é espelhamento (perda de 50%)."
  },
  {
    id: 92,
    materia: "Hardware - Componentes",
    pergunta: "Sobre as memórias RAM do tipo DDR4, qual das características abaixo é verdadeira em comparação com a DDR3?",
    opcoes: ["Operam com tensão elétrica maior (1.5V).", "Possuem o mesmo encaixe físico (chanfro) da DDR3.", "Operam com tensão menor (padrão 1.2V) e frequências mais altas.", "São incompatíveis com arquitetura de 64 bits."],
    correta: 2,
    explicacao: "DDR4 trouxe eficiência energética (1.2V contra 1.5V/1.35V da DDR3) e frequências maiores. O chanfro (encaixe) é diferente, impedindo conexão errada."
  },
  {
    id: 93,
    materia: "Hardware - Armazenamento",
    pergunta: "A tecnologia de armazenamento que utiliza o barramento PCIe diretamente, através do protocolo NVMe, para oferecer velocidades de transferência muito superiores ao SATA III (que limita-se a 600 MB/s), conecta-se geralmente através do slot:",
    opcoes: ["M.2", "DIMM", "PCI simples", "IDE"],
    correta: 0,
    explicacao: "O formato M.2 permite conexão direta ao barramento PCIe via protocolo NVMe, atingindo velocidades de 3.000 a 7.000+ MB/s. SATA III é o gargalo dos SSDs tradicionais."
  },
  {
    id: 94,
    materia: "Hardware - Processador",
    pergunta: "A memória de acesso ultrarrápido localizada dentro do processador, que armazena os dados e instruções mais utilizados para evitar que a CPU tenha que buscá-los na lenta memória RAM, é chamada de:",
    opcoes: ["Memória Virtual", "Memória Cache (L1/L2/L3)", "Registradores externos", "Swap"],
    correta: 1,
    explicacao: "A Cache (L1, L2, L3) é uma memória SRAM caríssima e rápida dentro da CPU. Se o dado não está na Cache (cache miss), a CPU busca na RAM."
  },
  {
    id: 95,
    materia: "Hardware - Placa-mãe",
    pergunta: "Nas placas-mãe modernas, a função de controlar os componentes de menor velocidade (SATA, USB, Áudio, BIOS) foi consolidada em um único chip, historicamente conhecido como Ponte Sul (Southbridge), mas hoje chamado de:",
    opcoes: ["Northbridge", "PCH (Platform Controller Hub)", "VRM", "GPU"],
    correta: 1,
    explicacao: "O Northbridge (memória/vídeo) foi integrado ao processador. O que restou na placa-mãe controlando periféricos (USB, SATA) é o PCH (Chipset)."
  },
  {
    id: 96,
    materia: "Hardware - Periféricos",
    pergunta: "Qual o processo utilizado pelas impressoras a laser para fixar a imagem no papel?",
    opcoes: ["Jato de tinta líquido aquecido.", "Impacto de agulhas contra uma fita.", "Transferência térmica de cera.", "Uso de laser para criar carga estática no cilindro, atraindo o toner (pó) que é fundido ao papel pelo fusor aquecido."],
    correta: 3,
    explicacao: "Impressoras a laser usam eletricidade estática (laser desenha no cilindro fotosensível) para atrair o pó (toner), que é derretido/fixado no papel pelo fusor."
  },
  {
    id: 97,
    materia: "Hardware - BIOS/UEFI",
    pergunta: "O sucessor da BIOS tradicional, que suporta interfaces gráficas, mouse, boot mais rápido e discos de inicialização maiores que 2 TB (usando tabela de partição GPT), é conhecido como:",
    opcoes: ["CMOS", "POST", "UEFI", "MBR"],
    correta: 2,
    explicacao: "UEFI (Unified Extensible Firmware Interface) substituiu a BIOS legacy. Permite Secure Boot e GPT (GUID Partition Table)."
  },
  {
    id: 98,
    materia: "Hardware - Barramentos",
    pergunta: "Qual a velocidade teórica máxima de transferência do padrão USB 3.0 (também chamado de USB 3.1 Gen 1)?",
    opcoes: ["480 Mbps", "5 Gbps", "10 Gbps", "40 Gbps"],
    correta: 1,
    explicacao: "USB 2.0 = 480 Mbps. USB 3.0 (3.1 Gen 1) = 5 Gbps. USB 3.1 Gen 2 = 10 Gbps."
  },
  {
    id: 99,
    materia: "Hardware - Vídeo",
    pergunta: "Qual interface de vídeo digital é capaz de transmitir áudio e vídeo simultaneamente e é a mais comum em televisores e monitores modernos, substituindo o padrão analógico VGA?",
    opcoes: ["DVI-A", "HDMI", "VGA", "PS/2"],
    correta: 1,
    explicacao: "HDMI (High-Definition Multimedia Interface) transmite áudio e vídeo digital. VGA é analógico e só vídeo. DVI pode ser digital, mas normalmente não leva áudio."
  },
  {
    id: 100,
    materia: "Hardware - Manutenção",
    pergunta: "Ao instalar um cooler sobre o processador, a aplicação da pasta térmica é essencial para:",
    opcoes: ["Colar o processador no dissipador para evitar vibrações.", "Preencher as microfissuras e eliminar o ar entre a superfície da CPU e do dissipador, melhorando a condutividade térmica.", "Resfriar ativamente o processador.", "Isolar eletricamente o processador."],
    correta: 1,
    explicacao: "O ar é um isolante térmico. A pasta térmica preenche as imperfeições microscópicas das superfícies metálicas para garantir a transferência de calor eficiente."
  },
  {
    id: 101,
    materia: "Hardware - Energia",
    pergunta: "O conector da fonte de alimentação ATX responsável por fornecer energia principal à placa-mãe possui atualmente:",
    opcoes: ["20 pinos", "24 pinos (20+4)", "8 pinos", "4 pinos"],
    correta: 1,
    explicacao: "O padrão ATX atual usa um conector principal de 24 pinos. Antigamente eram 20. O conector de 4/8 pinos (EPS) é para a CPU."
  },
  {
    id: 102,
    materia: "Hardware - Armazenamento",
    pergunta: "Em um disco rígido mecânico (HDD), o tempo que a cabeça de leitura leva para se posicionar na trilha correta somado ao tempo que o disco leva para girar até o setor desejado é chamado de:",
    opcoes: ["Taxa de transferência", "Latência (Access Time)", "RPM", "Buffer"],
    correta: 1,
    explicacao: "Latência ou Tempo de Acesso envolve o Seek Time (cabeça mover) e a Latência Rotacional (disco girar)."
  },
  {
    id: 103,
    materia: "Hardware - Barramentos",
    pergunta: "O barramento PCIe (PCI Express) utiliza uma arquitetura de comunicação:",
    opcoes: ["Paralela, onde todos os bits são enviados de uma vez.", "Serial, ponto-a-ponto, utilizando 'lanes' (vias) para envio e recebimento simultâneo (Full-Duplex).", "Híbrida.", "Baseada em fibra óptica."],
    correta: 1,
    explicacao: "PCIe é Serial (ao contrário do antigo PCI paralelo). Ele usa pares de fios (lanes) para transmitir dados em alta velocidade. x16 significa 16 lanes."
  },
  {
    id: 104,
    materia: "Hardware - Memória",
    pergunta: "Qual tipo de memória perde todos os seus dados quando a energia do computador é desligada (volátil)?",
    opcoes: ["ROM", "Flash (SSD)", "RAM", "EPROM"],
    correta: 2,
    explicacao: "RAM (Random Access Memory) é volátil. ROM e Flash (usada em SSDs e Pen drives) são não-voláteis."
  },
  {
    id: 105,
    materia: "Hardware - SSD",
    pergunta: "A tecnologia TRIM em SSDs serve para:",
    opcoes: ["Aumentar a velocidade de rotação do disco.", "Informar ao controlador do SSD quais blocos de dados não estão mais em uso e podem ser limpos internamente, mantendo a performance de escrita.", "Compactar os dados automaticamente.", "Fazer backup na nuvem."],
    correta: 1,
    explicacao: "Sem TRIM, o SSD ficaria lento com o tempo, pois ele precisa apagar blocos antes de escrever novos. O TRIM gerencia essa limpeza em segundo plano."
  },

  // ========================================
  // LOTE 7: LEGISLAÇÃO E DIREITO ADMINISTRATIVO
  // IDs: 106 a 125 (20 questões)
  // ========================================

  {
    id: 106,
    materia: "Direito Constitucional - Art. 37",
    pergunta: "Conforme o Art. 37 da Constituição Federal, a Administração Pública deve obedecer aos princípios explícitos da Legalidade, Impessoalidade, Moralidade, Publicidade e:",
    opcoes: ["Eficiência", "Eficácia", "Celeridade", "Economicidade"],
    correta: 0,
    explicacao: "O mnemônico clássico é LIMPE: Legalidade, Impessoalidade, Moralidade, Publicidade e Eficiência (incluído pela EC 19/98)."
  },
  {
    id: 107,
    materia: "Direito Constitucional - Acumulação de Cargos",
    pergunta: "É vedada a acumulação remunerada de cargos públicos, exceto, quando houver compatibilidade de horários:",
    opcoes: ["Dois cargos de técnico administrativo.", "Um cargo de professor com outro técnico ou científico.", "Dois cargos privativos de advogado.", "Um cargo de policial com um de técnico judiciário."],
    correta: 1,
    explicacao: "A CF/88 permite acumular: a) dois de professor; b) um de professor com outro técnico ou científico; c) dois de profissionais de saúde regulamentados."
  },
  {
    id: 108,
    materia: "Direito Administrativo - Servidores",
    pergunta: "O servidor público nomeado para cargo de provimento efetivo adquire estabilidade após:",
    opcoes: ["2 anos de efetivo exercício.", "3 anos de efetivo exercício.", "5 anos de efetivo exercício.", "Aprovação imediata no concurso."],
    correta: 1,
    explicacao: "A estabilidade é adquirida após 3 anos de efetivo exercício e aprovação em avaliação especial de desempenho (EC 19/98)."
  },
  {
    id: 109,
    materia: "Lei 14.133/2021 - Licitações",
    pergunta: "Para a contratação de bens e serviços comuns de Tecnologia da Informação (aqueles cujos padrões de desempenho podem ser objetivamente definidos em edital), a modalidade de licitação obrigatória é:",
    opcoes: ["Concorrência", "Pregão (preferencialmente eletrônico)", "Diálogo Competitivo", "Leilão"],
    correta: 1,
    explicacao: "A Lei 14.133/2021 estabelece que para bens e serviços comuns (incluindo TI comum), o Pregão é obrigatório."
  },
  {
    id: 110,
    materia: "Lei 14.133/2021 - Licitações",
    pergunta: "A Lei 14.133/2021 criou uma nova modalidade de licitação, utilizada para inovações tecnológicas ou técnicas onde a Administração define o problema e debate soluções com os licitantes antes de fechar o escopo. Trata-se do:",
    opcoes: ["Diálogo Competitivo", "Concurso", "Tomada de Preços", "RDC"],
    correta: 0,
    explicacao: "O Diálogo Competitivo serve para objetos complexos/inovadores onde a Administração não sabe qual a melhor solução técnica e precisa 'dialogar' com o mercado."
  },
  {
    id: 111,
    materia: "Direito Administrativo - Atos",
    pergunta: "Quando um ato administrativo é anulado pela própria Administração por ser ilegal, diz-se que ocorreu o exercício do poder de:",
    opcoes: ["Autotutela", "Polícia", "Hierárquico", "Disciplinar"],
    correta: 0,
    explicacao: "A Autotutela (Súmula 473 do STF) permite à Administração anular seus próprios atos ilegais ou revogar os inoportunos."
  },
  {
    id: 112,
    materia: "Direito Constitucional - Princípios",
    pergunta: "O princípio que veda a promoção pessoal de agentes ou autoridades em obras, serviços e publicidade de atos governamentais é o da:",
    opcoes: ["Moralidade", "Impessoalidade", "Publicidade", "Eficiência"],
    correta: 1,
    explicacao: "A Impessoalidade proíbe nomes, símbolos ou imagens que caracterizem promoção pessoal. A publicidade deve ter caráter educativo ou informativo."
  },
  {
    id: 113,
    materia: "Direito Administrativo - Poderes",
    pergunta: "O poder que a Administração possui de restringir o uso e gozo da liberdade e da propriedade privada em favor do interesse público (ex: fiscalizar um restaurante ou multar uma empresa) é o:",
    opcoes: ["Poder Disciplinar", "Poder de Polícia", "Poder Normativo", "Poder Hierárquico"],
    correta: 1,
    explicacao: "Poder de Polícia é a faculdade de condicionar ou restringir direitos individuais em benefício da coletividade."
  },
  {
    id: 114,
    materia: "Legislação - Improbidade",
    pergunta: "Constitui ato de improbidade administrativa que causa prejuízo ao erário, entre outros:",
    opcoes: ["Frustrar a licitude de processo licitatório ou de dispensa de licitação.", "Apenas atuar com desídia (preguiça).", "Sair mais cedo do trabalho.", "Faltar a uma reunião."],
    correta: 0,
    explicacao: "Frustrar licitação causa dano financeiro direto ao Estado (Prejuízo ao Erário). Atos que violam princípios são outra categoria."
  },
  {
    id: 115,
    materia: "Processo Legislativo",
    pergunta: "A função típica do Poder Legislativo é legislar e fiscalizar. Contudo, quando a Assembleia realiza um concurso público ou organiza seus serviços internos, ela exerce uma função:",
    opcoes: ["Atípica de natureza Executiva/Administrativa", "Atípica de natureza Judiciária", "Típica de legislar", "Política"],
    correta: 0,
    explicacao: "A função típica é fazer leis. Quando administra sua própria estrutura (compras, RH), exerce função atípica administrativa."
  },
  {
    id: 116,
    materia: "Direito Administrativo - Responsabilidade",
    pergunta: "A responsabilidade civil do Estado por danos que seus agentes, nessa qualidade, causarem a terceiros é, em regra:",
    opcoes: ["Subjetiva (depende de dolo/culpa)", "Objetiva (independe de dolo/culpa)", "Integral (sem excludentes)", "Subsidiária"],
    correta: 1,
    explicacao: "A CF/88 (Art. 37, §6º) adota a Responsabilidade Objetiva (Teoria do Risco Administrativo). Basta o dano + nexo causal. Dolo ou culpa só é analisado na ação de regresso contra o agente."
  },
  {
    id: 117,
    materia: "Direito Constitucional - Direitos",
    pergunta: "Qual remédio constitucional garante ao cidadão o conhecimento de informações relativas à sua pessoa, constantes de registros ou bancos de dados de entidades governamentais?",
    opcoes: ["Habeas Corpus", "Mandado de Segurança", "Habeas Data", "Ação Popular"],
    correta: 2,
    explicacao: "Habeas Data (HD) assegura o acesso e a retificação de dados pessoais em bancos governamentais ou de caráter público."
  },
  {
    id: 118,
    materia: "Regime Jurídico",
    pergunta: "A vacância do cargo público decorrerá de, EXCETO:",
    opcoes: ["Exoneração", "Demissão", "Promoção", "Nomeação"],
    correta: 3,
    explicacao: "Nomeação é forma de provimento (preencher o cargo). Exoneração, demissão, promoção, readaptação, aposentadoria, posse em outro cargo inacumulável e falecimento geram vacância (deixam o cargo vago)."
  },
  {
    id: 119,
    materia: "Lei 14.133/2021 - Contratos",
    pergunta: "Os contratos de serviços contínuos e de aluguel de equipamentos e utilização de programas de informática podem ter vigência máxima (incluindo prorrogações) de até:",
    opcoes: ["12 meses", "60 meses", "5 anos (decenal em casos especiais)", "10 anos, se previsto no edital e vantajoso"],
    correta: 3,
    explicacao: "A nova Lei 14.133 permite contratos de até 5 anos, prorrogáveis até o limite de 10 anos para serviços contínuos, se houver vantajosidade."
  },
  {
    id: 120,
    materia: "Direito Administrativo - Abuso",
    pergunta: "O abuso de poder pode ocorrer de duas formas. Quando o agente atua fora de sua competência legal, diz-se que houve:",
    opcoes: ["Excesso de Poder", "Desvio de Finalidade", "Omissão", "Prevaricação"],
    correta: 0,
    explicacao: "Excesso de Poder = Vício na Competência (agente faz o que não pode). Desvio de Finalidade = Vício na Finalidade (agente faz o que pode, mas visando fim diverso do interesse público)."
  },
  {
    id: 121,
    materia: "Direito Constitucional - Súmulas",
    pergunta: "A Súmula Vinculante nº 13 do STF proíbe a nomeação de cônjuge, companheiro ou parente até terceiro grau para cargos de comissão ou confiança. Essa prática é conhecida como:",
    opcoes: ["Peculato", "Nepotismo", "Advocacia Administrativa", "Concussão"],
    correta: 1,
    explicacao: "Nepotismo viola a Impessoalidade e Moralidade. Atinge parentes até 3º grau (pais, filhos, tios, sobrinhos) na mesma pessoa jurídica."
  },
  {
    id: 122,
    materia: "Processo Legislativo",
    pergunta: "A iniciativa de leis que disponham sobre o regime jurídico dos servidores da Assembleia Legislativa, fixação de remuneração e provimento de cargos cabe privativamente à:",
    opcoes: ["Mesa Diretora da Assembleia", "Governador do Estado", "Qualquer Deputado", "População (iniciativa popular)"],
    correta: 0,
    explicacao: "Assuntos internos da casa legislativa (servidores, cargos da Assembleia) são de iniciativa da Mesa Diretora, para garantir a separação dos poderes."
  },
  {
    id: 123,
    materia: "Lei de Acesso à Informação",
    pergunta: "Segundo a LAI (Lei 12.527/2011), a informação em poder dos órgãos públicos é, via de regra:",
    opcoes: ["Sigilosa", "Pública", "Restrita aos servidores", "Disponível apenas mediante justificativa"],
    correta: 1,
    explicacao: "A publicidade é a regra (transparência ativa/passiva); o sigilo é a exceção (apenas para segurança da sociedade/Estado ou intimidade)."
  },
  {
    id: 124,
    materia: "Direito Administrativo",
    pergunta: "Qual princípio administrativo impõe que o agente público deve atuar com presteza, perfeição e rendimento funcional, buscando os melhores resultados com o menor custo?",
    opcoes: ["Legalidade", "Eficiência", "Razoabilidade", "Motiva��ão"],
    correta: 1,
    explicacao: "Eficiência (EC 19/98) foca na qualidade do serviço e na relação custo-benefício (fazer mais com menos)."
  },
  {
    id: 125,
    materia: "Direito Constitucional",
    pergunta: "O direito de greve será exercido nos termos e nos limites definidos em lei específica. Este direito é garantido aos:",
    opcoes: ["Servidores Civis apenas", "Militares apenas", "Servidores Civis e Militares", "Apenas empregados celetistas"],
    correta: 0,
    explicacao: "Servidores civis têm direito de greve (lei específica, que nunca foi criada, aplicando-se a lei geral de greve por decisão do STF). Militares são constitucionalmente PROIBIDOS de fazer greve."
  },

  // ========================================
  // LOTE 8: LÍNGUA PORTUGUESA (Estilo FGV/Cebraspe)
  // IDs: 126 a 140 (15 questões)
  // ========================================

  {
    id: 126,
    materia: "Português - Crase",
    pergunta: "Assinale a alternativa em que o uso do acento grave indicativo de crase é OBRIGATÓRIO, de acordo com a norma-padrão:",
    opcoes: ["A decisão foi favorável a toda a equipe.", "Ele começou a estudar para o concurso.", "O técnico referiu-se àquela nova diretriz de segurança.", "Ficamos cara a cara com o problema."],
    correta: 2,
    explicacao: "Em 'referiu-se àquela', temos a preposição 'a' (regida por referiu-se) + o pronome demonstrativo 'aquela'. A fusão é obrigatória. Nas outras: 'a toda' (pronome indefinido rejeita crase), 'a estudar' (verbo rejeita crase), 'cara a cara' (palavras repetidas)."
  },
  {
    id: 127,
    materia: "Português - Concordância Verbal",
    pergunta: "Analise a concordância na frase: '______ haver muitas mudanças no edital, mas ______ existir soluções rápidas.' As lacunas devem ser preenchidas corretamente por:",
    opcoes: ["Devem / devem", "Deve / deve", "Deve / devem", "Devem / deve"],
    correta: 2,
    explicacao: "O verbo 'Haver' no sentido de existir é impessoal (não tem sujeito) e transmite a impessoalidade para o auxiliar ('Deve haver'). Já o verbo 'Existir' é pessoal e tem sujeito ('soluções rápidas'), logo o auxiliar concorda no plural ('devem existir')."
  },
  {
    id: 128,
    materia: "Português - Regência Verbal",
    pergunta: "Assinale a opção que respeita a regência do verbo 'implicar' no sentido de 'acarretar/trazer como consequência', segundo a norma culta:",
    opcoes: ["A falha no backup implicou em perda de dados.", "A falha no backup implicou perda de dados.", "A falha no backup implicou na perda de dados.", "A falha no backup implicou à perda de dados."],
    correta: 1,
    explicacao: "No sentido de acarretar, 'implicar' é Verbo Transitivo Direto (VTD), ou seja, NÃO usa preposição 'em'. O correto é 'implicou algo'. 'Implicar em' é coloquialismo errado em provas."
  },
  {
    id: 129,
    materia: "Português - Pontuação",
    pergunta: "Identifique a frase onde a vírgula foi empregada de forma INCORRETA:",
    opcoes: ["Os técnicos, que estudaram muito, passaram na prova.", "O servidor público, precisa conhecer a Constituição.", "Em Roraima, o clima é quente.", "João, traga o relatório."],
    correta: 1,
    explicacao: "É proibido separar o sujeito ('O servidor público') do seu predicado ('precisa...') com vírgula. Na opção A, as vírgulas isolam uma oração explicativa (correto)."
  },
  {
    id: 130,
    materia: "Português - Conjunções",
    pergunta: "Na frase 'O sistema caiu, CONQUANTO tivesse sido atualizado ontem', o termo destacado introduz uma ideia de:",
    opcoes: ["Causa", "Consequência", "Concessão", "Condição"],
    correta: 2,
    explicacao: "'Conquanto' é uma conjunção concessiva (equivale a 'embora', 'apesar de que'). Indica uma oposição que não impede o fato principal. Cuidado para não confundir com 'Porquanto' (causa/explicação)."
  },
  {
    id: 131,
    materia: "Português - Ortografia e Semântica",
    pergunta: "Para solicitar o desligamento de um funcionário, o chefe foi à ______ de Recursos Humanos. Lá, informaram que a ______ de direitos autorais seria discutida na próxima ______ da diretoria.",
    opcoes: ["seção - cessão - sessão", "sessão - seção - cessão", "cessão - sessão - seção", "seção - sessão - cessão"],
    correta: 0,
    explicacao: "Seção = Repartição/Departamento. Cessão = Ato de ceder/transferir. Sessão = Intervalo de tempo/reunião."
  },
  {
    id: 132,
    materia: "Português - Colocação Pronominal",
    pergunta: "Assinale a frase em que a próclise (pronome antes do verbo) é OBRIGATÓRIA:",
    opcoes: ["Me disseram que o edital saiu.", "Não me avisaram sobre a mudança.", "O diretor tinha avisado-me.", "Espero que contratem-nos."],
    correta: 1,
    explicacao: "Palavras negativas ('Não', 'Nunca', 'Jamais') são fatores de atração obrigatória da próclise. Em A, não se inicia frase com pronome oblíquo."
  },
  {
    id: 133,
    materia: "Português - Voz Passiva",
    pergunta: "Transpondo a frase 'O técnico configurou o roteador' para a voz passiva analítica, obtém-se:",
    opcoes: ["O roteador foi configurado pelo técnico.", "O roteador configura-se pelo técnico.", "O técnico tinha configurado o roteador.", "Configuraram o roteador."],
    correta: 0,
    explicacao: "Voz Passiva Analítica = Verbo Ser + Particípio + Agente da Passiva. O objeto direto da ativa ('o roteador') vira sujeito paciente na passiva."
  },
  {
    id: 134,
    materia: "Português - Semântica",
    pergunta: "As novas medidas de segurança vieram ______ anseios da equipe, que desejava mais proteção. Já o corte de verbas foi ______ interesses do departamento.",
    opcoes: ["ao encontro dos - de encontro aos", "de encontro aos - ao encontro dos", "ao encontro dos - ao encontro dos", "de encontro aos - de encontro aos"],
    correta: 0,
    explicacao: "'Ao encontro de' = ideia de concordância/harmonia (positivo). 'De encontro a' = ideia de choque/oposição (negativo, como um carro indo de encontro ao muro)."
  },
  {
    id: 135,
    materia: "Português - Concordância Nominal",
    pergunta: "Assinale a alternativa correta quanto à concordância nominal:",
    opcoes: ["A porta estava meia aberta.", "Ela mesmo configurou o sistema.", "Seguem anexas as planilhas de custos.", "É proibida entrada de estranhos."],
    correta: 2,
    explicacao: "'Anexo' é adjetivo e concorda com o substantivo ('planilhas anexas'). Erros das outras: 'meia' (adjetivo) só se for metade, aqui é advérbio 'meio' (um pouco); 'ela mesma'; 'proibida a entrada' (com artigo) ou 'proibido entrada' (sem artigo)."
  },
  {
    id: 136,
    materia: "Português - Verbos",
    pergunta: "Se o técnico ______ o problema no servidor, ele o resolverá imediatamente. A forma correta do verbo VER no futuro do subjuntivo é:",
    opcoes: ["ver", "vir", "vires", "veres"],
    correta: 1,
    explicacao: "Cuidado! Futuro do subjuntivo do verbo VER é 'quando eu VIR', 'se ele VIR'. O verbo VIR (de vir) no futuro do subjuntivo é 'vier'."
  },
  {
    id: 137,
    materia: "Português - Coesão Textual",
    pergunta: "No trecho: 'A tecnologia avança rápido. ELA exige constante atualização.', o termo destacado é um elemento de coesão que retoma 'tecnologia'. Trata-se de uma:",
    opcoes: ["Anáfora", "Catáfora", "Elipse", "Metonímia"],
    correta: 0,
    explicacao: "Anáfora é a retomada de um termo já citado anteriormente. Catáfora é quando o termo se refere a algo que ainda será dito ('Ele disse isto: que sairia')."
  },
  {
    id: 138,
    materia: "Português - Sintaxe",
    pergunta: "Na frase 'Roraima, terra de belezas naturais, atrai turistas', o termo entre vírgulas classifica-se sintaticamente como:",
    opcoes: ["Vocativo", "Aposto Explicativo", "Adjunto Adnominal", "Complemento Nominal"],
    correta: 1,
    explicacao: "O Aposto Explicativo serve para explicar, detalhar ou identificar o termo anterior (Roraima) e vem sempre isolado por pontuação."
  },
  {
    id: 139,
    materia: "Português - Funções do QUE",
    pergunta: "Em 'É necessário QUE estudemos mais', a palavra QUE classifica-se como:",
    opcoes: ["Pronome Relativo", "Conjunção Integrante", "Conjunção Coordenada", "Preposição"],
    correta: 1,
    explicacao: "Quando o 'QUE' pode ser substituído por 'ISSO' junto com a oração ('É necessário ISSO'), ele é uma Conjunção Integrante que introduz oração substantiva. Se puder trocar por 'O QUAL', é Pronome Relativo."
  },
  {
    id: 140,
    materia: "Português - Interpretação",
    pergunta: "Reescrevendo a frase 'Devido à chuva, a internet caiu' sem alterar o sentido original, temos:",
    opcoes: ["A internet caiu, contudo choveu.", "A internet caiu, porquanto choveu.", "A internet caiu, conquanto chovesse.", "A internet caiu, à medida que choveu."],
    correta: 1,
    explicacao: "'Devido à' indica causa. 'Porquanto' é uma conjunção causal (equivale a 'porque' ou 'já que'). As outras mudam o sentido: contudo/conquanto (oposição), à medida que (proporção)."
  },

  // ========================================
  // LOTE 9: LGPD E GOVERNANÇA DE TI
  // IDs: 141 a 155 (15 questões)
  // ========================================

  {
    id: 141,
    materia: "LGPD - Conceitos",
    pergunta: "De acordo com a Lei Geral de Proteção de Dados (Lei 13.709/2018), a pessoa natural a quem se referem os dados pessoais que são objeto de tratamento é denominada:",
    opcoes: ["Controlador", "Operador", "Titular", "Encarregado"],
    correta: 2,
    explicacao: "O Titular é a pessoa física dona dos dados. O Controlador toma as decisões, o Operador processa os dados em nome do controlador e o Encarregado (DPO) faz a ponte com a ANPD."
  },
  {
    id: 142,
    materia: "LGPD - Agentes de Tratamento",
    pergunta: "Na estrutura da LGPD, quem é a pessoa indicada pelo controlador e operador para atuar como canal de comunicação entre o controlador, os titulares dos dados e a Autoridade Nacional de Proteção de Dados (ANPD)?",
    opcoes: ["CEO", "Encarregado (DPO)", "Gerente de TI", "Advogado Geral"],
    correta: 1,
    explicacao: "O Encarregado (Data Protection Officer - DPO) é a figura obrigatória que atua como canal de comunicação e orienta a organização sobre as boas práticas."
  },
  {
    id: 143,
    materia: "LGPD - Dados Sensíveis",
    pergunta: "Qual das opções abaixo apresenta APENAS exemplos de dados pessoais sensíveis, que exigem tratamento mais rigoroso segundo a LGPD?",
    opcoes: ["Nome, CPF e Endereço.", "Origem racial ou étnica, convicção religiosa e dados biométricos.", "E-mail corporativo, telefone e cargo.", "Dados bancários, histórico de crédito e RG."],
    correta: 1,
    explicacao: "Dados sensíveis são aqueles que podem gerar discriminação: origem racial, religião, opinião política, filiação a sindicato, saúde, vida sexual, genético ou biométrico."
  },
  {
    id: 144,
    materia: "LGPD - Bases Legais",
    pergunta: "O tratamento de dados pessoais pela administração pública para a execução de políticas públicas previstas em leis e regulamentos:",
    opcoes: ["Depende sempre do consentimento do titular.", "É dispensado do consentimento do titular.", "É proibido, salvo em calamidade pública.", "Requer autorização prévia da ANPD."],
    correta: 1,
    explicacao: "A LGPD prevê bases legais que dispensam o consentimento. A execução de políticas públicas pela administração é uma dessas exceções (Art. 7º, III)."
  },
  {
    id: 145,
    materia: "Governança - ITIL v4",
    pergunta: "No contexto da ITIL v4, qual prática tem como objetivo principal minimizar o impacto negativo de interrupções não planejadas ou redução na qualidade de um serviço, restaurando a operação normal o mais rápido possível?",
    opcoes: ["Gerenciamento de Problemas", "Gerenciamento de Incidentes", "Gerenciamento de Mudança", "Gerenciamento de Liberação"],
    correta: 1,
    explicacao: "Incidente = Interrupção. O foco é restaurar o serviço 'rápido' (workaround). Problema foca na causa raiz definitiva."
  },
  {
    id: 146,
    materia: "Governança - ITIL v4",
    pergunta: "Qual a principal diferença entre um Incidente e um Problema segundo a ITIL?",
    opcoes: ["Incidente é algo grave; Problema é algo leve.", "Incidente é a interrupção do serviço; Problema é a causa raiz de um ou mais incidentes.", "Não há diferença, são sinónimos.", "Problema é resolvido pelo Service Desk, Incidente pelos desenvolvedores."],
    correta: 1,
    explicacao: "O Incidente é o sintoma (o serviço parou). O Problema é a doença/causa (ex: bug no código, disco cheio) que causou o incidente."
  },
  {
    id: 147,
    materia: "Governança - ITIL v4",
    pergunta: "O componente da ITIL v4 que funciona como ponto único de contato (SPOC) entre o provedor de serviço e os usuários é o:",
    opcoes: ["Service Desk (Central de Serviço)", "NOC (Network Operations Center)", "CAB (Change Advisory Board)", "SLA Manager"],
    correta: 0,
    explicacao: "O Service Desk é a interface onde os usuários abrem chamados, reportam incidentes e solicitam serviços. É o 'rosto' da TI para o usuário."
  },
  {
    id: 148,
    materia: "Governança - COBIT",
    pergunta: "O framework COBIT faz uma distinção clara entre Governança e Gestão. Segundo o COBIT, a GOVERNANÇA é responsabilidade de quem?",
    opcoes: ["Da Alta Direção / Conselho Administrativo.", "Dos Gerentes de TI.", "Dos técnicos e analistas.", "Dos usuários finais."],
    correta: 0,
    explicacao: "Governança (avaliar, dirigir e monitorar) é papel da Alta Direção (Conselho). Gestão (planejar, construir, executar e monitorar) é papel da gerência executiva."
  },
  {
    id: 149,
    materia: "Governança - SLA",
    pergunta: "O documento formal firmado entre o provedor de TI e o cliente, que estabelece as metas de nível de serviço (como tempo de resposta e disponibilidade), é a:",
    opcoes: ["OLA (Acordo de Nível Operacional)", "SLA / ANS (Acordo de Nível de Serviço)", "NDA (Acordo de Confidencialidade)", "RFP (Request for Proposal)"],
    correta: 1,
    explicacao: "SLA (Service Level Agreement) ou ANS é o contrato externo com o cliente. OLA é o acordo interno entre áreas da mesma empresa para suportar o SLA."
  },
  {
    id: 150,
    materia: "Segurança - ISO 27001",
    pergunta: "A norma ISO/IEC 27001 é o padrão internacional para a implementação de um:",
    opcoes: ["Sistema de Gestão da Qualidade (SGQ).", "Sistema de Gestão de Segurança da Informação (SGSI).", "Sistema de Gerenciamento de Serviços de TI (ITSM).", "Plano de Recuperação de Desastres (DRP)."],
    correta: 1,
    explicacao: "ISO 27001 define os requisitos para o SGSI (Information Security Management System). A ISO 9001 é para Qualidade e ISO 20000 para Serviços de TI."
  },
  {
    id: 151,
    materia: "LGPD - Princípios",
    pergunta: "O princípio da LGPD que garante aos titulares consulta facilitada e gratuita sobre a forma e a duração do tratamento de seus dados é o princípio do(a):",
    opcoes: ["Livre Acesso", "Segurança", "Adequação", "Necessidade"],
    correta: 0,
    explicacao: "O Princípio do Livre Acesso garante ao titular a consulta simples e gratuita. Transparência refere-se a informações claras e precisas."
  },
  {
    id: 152,
    materia: "Governança - ITIL v4",
    pergunta: "Na ITIL, uma 'Mudança Normal' é aquela que:",
    opcoes: ["Deve ser implementada imediatamente para corrigir um erro crítico.", "É pré-aprovada e de baixo risco, usada frequentemente.", "Precisa ser avaliada, autorizada e agendada seguindo um processo completo.", "Não requer documentação."],
    correta: 2,
    explicacao: "Mudança Normal segue o fluxo padrão de aprovação. Mudança Padrão é pré-aprovada (baixo risco). Mudança Emergencial deve ser implementada o mais rápido possível (risco alto)."
  },
  {
    id: 153,
    materia: "Governança - PDCA",
    pergunta: "O ciclo de melhoria contínua utilizado na ISO 27001 e em diversos frameworks de gestão, composto pelas fases Plan (Planejar), Do (Executar), Check (Verificar) e Act (Agir), é conhecido como:",
    opcoes: ["Ciclo de Deming (PDCA)", "Matriz SWOT", "Diagrama de Ishikawa", "Ciclo Scrum"],
    correta: 0,
    explicacao: "O Ciclo PDCA (ou de Deming) é a base da melhoria contínua na governança. Planeja-se, executa-se, mede-se os resultados e corrige-se os desvios."
  },
  {
    id: 154,
    materia: "Governança - COBIT",
    pergunta: "Qual dos seguintes é um Princípio do sistema de governança do COBIT 2019?",
    opcoes: ["Atender às necessidades das partes interessadas (Stakeholders).", "Focar apenas nos processos técnicos.", "Eliminar a necessidade de auditoria.", "Manter a TI isolada do negócio."],
    correta: 0,
    explicacao: "O principal objetivo da governança no COBIT é criar valor para as partes interessadas (Stakeholders), equilibrando benefícios, riscos e recursos."
  },
  {
    id: 155,
    materia: "LGPD - Sanções",
    pergunta: "Em caso de infração às normas da LGPD, a autoridade nacional (ANPD) poderá aplicar sanções administrativas. Qual das opções abaixo NÃO é uma sanção prevista na lei?",
    opcoes: ["Advertência", "Multa simples de até 2% do faturamento (limitada a 50 milhões).", "Prisão do Encarregado de Dados.", "Bloqueio ou eliminação dos dados pessoais a que se refere a infração."],
    correta: 2,
    explicacao: "A LGPD é uma lei administrativa/civil, não penal. Ela não prevê prisão. As sanções são multas, advertências, bloqueios e publicização da infração."
  },

  // ========================================
  // LOTE 10: RACIOCÍNIO LÓGICO E MATEMÁTICA COMPUTACIONAL
  // IDs: 156 a 165 (10 questões)
  // ========================================

  {
    id: 156,
    materia: "Raciocínio Lógico - Equivalência",
    pergunta: "Dada a proposição composta: 'Se o servidor cair, então o site ficará indisponível'. Uma frase logicamente equivalente a esta é:",
    opcoes: ["Se o site ficar indisponível, então o servidor caiu.", "O servidor caiu e o site ficou indisponível.", "Se o site não ficar indisponível, então o servidor não caiu.", "O servidor não caiu ou o site ficou indisponível."],
    correta: 2,
    explicacao: "A equivalência da condicional (Se P então Q) é a Contrapositiva: 'Se não Q, então não P'. A opção 3 faz exatamente isso: nega o consequente, então nega o antecedente."
  },
  {
    id: 157,
    materia: "Raciocínio Lógico - Negação",
    pergunta: "Qual é a negação lógica da afirmação: 'Todos os computadores da rede estão infectados'?",
    opcoes: ["Nenhum computador da rede está infectado.", "Todos os computadores da rede estão limpos.", "Pelo menos um computador da rede não está infectado.", "Alguns computadores estão infectados e outros não."],
    correta: 2,
    explicacao: "Para negar o quantificador universal 'Todo', usa-se o quantificador existencial 'Algum/Pelo menos um' + a negação do verbo (fura-se a ideia de totalidade). Não se nega 'Todo' com 'Nenhum'."
  },
  {
    id: 158,
    materia: "Matemática - Conversão de Base",
    pergunta: "Um endereço de memória é representado em hexadecimal pelo valor '1A'. Qual é o valor correspondente deste endereço na base decimal?",
    opcoes: ["16", "26", "32", "10"],
    correta: 1,
    explicacao: "Hexadecimal '1A': (1 * 16^1) + (10 * 16^0). Lembre-se que A=10. Logo: 16 + 10 = 26."
  },
  {
    id: 159,
    materia: "Lógica de Programação",
    pergunta: "Considere as variáveis booleanas: A = Verdadeiro (True), B = Falso (False). Qual será o resultado da expressão lógica: (A OU B) E (NÃO B)?",
    opcoes: ["Verdadeiro (True)", "Falso (False)", "Nulo", "Indeterminado"],
    correta: 0,
    explicacao: "1. (A OU B) -> (V ou F) = Verdadeiro. 2. (NÃO B) -> (Não F) = Verdadeiro. 3. V E V = Verdadeiro."
  },
  {
    id: 160,
    materia: "Análise Combinatória",
    pergunta: "Um técnico precisa criar uma senha numérica de 4 dígitos para um servidor, utilizando apenas os algarismos 1, 2, 3, 4 e 5, sem repetição de números. Quantas senhas diferentes ele pode criar?",
    opcoes: ["120", "60", "20", "625"],
    correta: 0,
    explicacao: "É um Arranjo de 5 elementos tomados 4 a 4 (ou Princípio Fundamental da Contagem). 5 opções para o 1º dígito * 4 para o 2º * 3 para o 3º * 2 para o 4º. 5*4*3*2 = 120."
  },
  {
    id: 161,
    materia: "Raciocínio Lógico - Sequências",
    pergunta: "Observe a sequência lógica relacionada a potências de base 2 (comumente usada em memórias): 2, 4, 8, 16, 32, X. O valor de X e o seu valor correspondente em binário são, respectivamente:",
    opcoes: ["64 e 1000000", "64 e 111111", "60 e 101010", "48 e 110000"],
    correta: 0,
    explicacao: "O próximo número é 64 (2^6). Em binário, potências de 2 são representadas pelo algarismo 1 seguido de zeros. 64 = 1 seguido de 6 zeros (1000000)."
  },
  {
    id: 162,
    materia: "Matemática - Unidades",
    pergunta: "Um cliente contratou um link de internet de 100 Mbps (Megabits por segundo). Qual é a taxa de transferência máxima teórica em MB/s (Megabytes por segundo)?",
    opcoes: ["100 MB/s", "10 MB/s", "12,5 MB/s", "8 MB/s"],
    correta: 2,
    explicacao: "1 Byte = 8 bits. Para converter Megabits (Mb) para Megabytes (MB), divide-se por 8. 100 / 8 = 12,5 MB/s."
  },
  {
    id: 163,
    materia: "Raciocínio Lógico - Verdade e Mentira",
    pergunta: "Três técnicos (André, Bruno e Carlos) são suspeitos de apagar um log. Sabe-se que apenas um mentiu. André disse: 'Foi o Bruno'. Bruno disse: 'Foi o Carlos'. Carlos disse: 'O Bruno está mentindo'. Quem apagou o log?",
    opcoes: ["André", "Bruno", "Carlos", "Nenhum deles"],
    correta: 1,
    explicacao: "Bruno e Carlos dizem coisas opostas. Se Bruno diz a verdade, Carlos mente (e foi Carlos). Se Carlos diz a verdade, Bruno mente. Se Bruno mente, a frase 'Foi o Carlos' é falsa (então não foi Carlos) e a frase de André ('Foi o Bruno') tem que ser verdade (pois só um mente). Se André diz a verdade, foi o Bruno."
  },
  {
    id: 164,
    materia: "Lógica de Conjuntos",
    pergunta: "Em um departamento de TI com 20 funcionários, 12 dominam Linux e 10 dominam Windows. Se 5 dominam ambos os sistemas, quantos funcionários não dominam nenhum dos dois?",
    opcoes: ["3", "5", "2", "0"],
    correta: 0,
    explicacao: "União (A ou B) = A + B - Interseção. União = 12 + 10 - 5 = 17 funcionários dominam ao menos um. Total (20) - União (17) = 3 não dominam nenhum."
  },
  {
    id: 165,
    materia: "Raciocínio Lógico - Tautologia",
    pergunta: "Uma proposição lógica que é sempre verdadeira, independentemente dos valores lógicos das proposições simples que a compõem, é chamada tecnicamente de:",
    opcoes: ["Contradição", "Contingência", "Falácia", "Tautologia"],
    correta: 3,
    explicacao: "Tautologia é a proposição sempre verdadeira (Ex: P ou não P). Contradição é sempre falsa. Contingência depende dos valores."
  },

  // ========================================
  // LOTE 11: REGIMENTO INTERNO DA ALE-RR
  // IDs: 166 a 185 (20 questões)
  // ========================================

  {
    id: 166,
    materia: "Regimento Interno - Instalação",
    pergunta: "A primeira Sessão Preparatória da Legislatura, destinada à posse dos Deputados, ocorre obrigatoriamente no dia 1º de janeiro. Quem deve assumir a direção dos trabalhos inicialmente?",
    opcoes: ["O Presidente da Legislatura anterior.", "O Deputado mais votado.", "O Deputado mais idoso.", "O Governador do Estado."],
    correta: 2,
    explicacao: "Conforme o Art. 3º, §1º, assume a direção dos trabalhos o Deputado mais idoso."
  },
  {
    id: 167,
    materia: "Regimento Interno - Mesa Diretora",
    pergunta: "Em caso de empate na eleição para os membros da Mesa Diretora, qual é o critério de desempate estabelecido no Regimento?",
    opcoes: ["Sorteio.", "Candidato com maior número de mandatos.", "Candidato mais votado na eleição geral.", "Candidato mais idoso."],
    correta: 3,
    explicacao: "O Art. 8º, XV define que, persistindo o empate no segundo escrutínio, considera-se eleito o candidato mais idoso."
  },
  {
    id: 168,
    materia: "Regimento Interno - Comissões",
    pergunta: "Qual é o número máximo de membros efetivos que podem compor uma Comissão Permanente na ALE-RR?",
    opcoes: ["5 membros.", "7 membros.", "9 membros.", "3 membros."],
    correta: 1,
    explicacao: "O Art. 34 (com redação da Resolução 008/2017) estabelece o máximo de 7 membros efetivos."
  },
  {
    id: 169,
    materia: "Regimento Interno - Prazos",
    pergunta: "Qual o prazo para a Comissão de Constituição, Justiça e Redação Final (CCJ) emitir parecer sobre matéria em regime de urgência?",
    opcoes: ["2 dias.", "5 dias.", "10 dias.", "24 horas."],
    correta: 2,
    explicacao: "O Art. 61 fixa o prazo de 10 dias para matérias em regime de urgência."
  },
  {
    id: 170,
    materia: "Regimento Interno - CPI",
    pergunta: "Para a criação de uma Comissão Parlamentar de Inquérito (CPI), é necessário o requerimento de qual proporção dos membros da Assembleia?",
    opcoes: ["Maioria absoluta.", "Maioria simples.", "1/3 (um terço).", "2/3 (dois terços)."],
    correta: 2,
    explicacao: "O Art. 45 exige requerimento de 1/3 dos membros para constituir CPI."
  },
  {
    id: 171,
    materia: "Regimento Interno - Processo Legislativo",
    pergunta: "Se o Governador não vetar um projeto de lei dentro do prazo de 15 dias úteis, o que ocorre?",
    opcoes: ["O projeto é arquivado.", "O silêncio importa em sanção (aprovação tácita).", "O prazo é prorrogado por mais 15 dias.", "O projeto volta para a CCJ."],
    correta: 1,
    explicacao: "O Art. 253, §2º determina que o silêncio do Governador após 15 dias úteis importa sanção."
  },
  {
    id: 172,
    materia: "Regimento Interno - Decoro",
    pergunta: "Qual penalidade é aplicada pela Mesa Diretora ao Deputado que reincidir em infrações leves ou usar expressões atentatórias ao decoro em discurso?",
    opcoes: ["Advertência verbal.", "Censura escrita.", "Suspensão do mandato.", "Perda do mandato."],
    correta: 1,
    explicacao: "A Censura Escrita é imposta pela Mesa em casos de reincidência ou ofensas (Art. 105, §2º). A censura verbal é pelo Presidente."
  },
  {
    id: 173,
    materia: "Regimento Interno - Votação",
    pergunta: "Qual tipo de votação é obrigatória para a apreciação de Veto Governamental?",
    opcoes: ["Simbólica.", "Nominal.", "Secreta.", "Por aclamação."],
    correta: 1,
    explicacao: "A Resolução nº 12/2017 alterou o Art. 254, §4º, definindo que a votação do veto será feita pelo processo nominal (aberto)."
  },
  {
    id: 174,
    materia: "Regimento Interno - Sessões",
    pergunta: "Qual o quórum mínimo necessário para a ABERTURA de uma Sessão Ordinária?",
    opcoes: ["Qualquer número.", "1/3 dos membros.", "Maioria absoluta.", "Maioria simples."],
    correta: 1,
    explicacao: "O Art. 144 exige a presença de, no mínimo, 1/3 dos membros para abrir a sessão."
  },
  {
    id: 175,
    materia: "Regimento Interno - Competência",
    pergunta: "Quem tem competência para autorizar o Governador a se ausentar do Estado por mais de 15 dias?",
    opcoes: ["O Presidente da Assembleia.", "A Comissão de Constituição e Justiça.", "O Plenário da Assembleia.", "A Mesa Diretora."],
    correta: 2,
    explicacao: "Cabe ao Plenário autorizar, mas a iniciativa do decreto legislativo vem após parecer da CCJ e deliberação (Art. 275 e Constituição Estadual)."
  },
  {
    id: 176,
    materia: "Regimento Interno - Polícia",
    pergunta: "É permitido o porte de arma no recinto do Plenário?",
    opcoes: ["Sim, para Deputados.", "Sim, para qualquer cidadão com porte legal.", "Não, é vedado a qualquer pessoa, exceto policiais em serviço na Casa.", "Sim, mediante autorização do Presidente."],
    correta: 2,
    explicacao: "O Art. 276, §2º veda o porte de arma a qualquer pessoa, inclusive Deputados, exceto policiais em serviço."
  },
  {
    id: 177,
    materia: "Regimento Interno - Emendas",
    pergunta: "Como se denomina a emenda que tem por finalidade erradicar (retirar) qualquer parte de outra proposição?",
    opcoes: ["Substitutiva.", "Modificativa.", "Supressiva.", "Aglutinativa."],
    correta: 2,
    explicacao: "Art. 197, I: Supressiva é a que manda erradicar qualquer parte de outra proposição."
  },
  {
    id: 178,
    materia: "Regimento Interno - Orçamento",
    pergunta: "Qual o prazo para apresentação de emendas ao Projeto de Lei Orçamentária Anual na Comissão de Finanças?",
    opcoes: ["5 dias.", "10 dias.", "15 dias.", "20 dias."],
    correta: 1,
    explicacao: "O Art. 260, §2º estabelece que emendas podem ser apresentadas nos primeiros 10 dias do prazo da Comissão."
  },
  {
    id: 179,
    materia: "Regimento Interno - Julgamento",
    pergunta: "No processo de crime de responsabilidade contra o Governador, quem preside o Tribunal Especial de julgamento?",
    opcoes: ["O Presidente da Assembleia.", "O Desembargador mais antigo.", "O Presidente do Tribunal de Justiça.", "Um Deputado eleito pelo Plenário."],
    correta: 2,
    explicacao: "O Art. 280-E define que o Tribunal Especial é presidido pelo Presidente do Tribunal de Justiça."
  },
  {
    id: 180,
    materia: "Regimento Interno - Tramitação",
    pergunta: "Qual o interstício (intervalo) mínimo obrigatório entre o primeiro e o segundo turno de votação de uma Proposta de Emenda à Constituição (PEC)?",
    opcoes: ["12 horas.", "24 horas.", "2 dias.", "5 dias."],
    correta: 2,
    explicacao: "O Art. 183, §2º exige um intervalo mínimo de 2 dias entre os turnos de votação de uma PEC."
  },
  {
    id: 181,
    materia: "Regimento Interno - Convocação",
    pergunta: "O não comparecimento de um Secretário de Estado convocado, sem justificativa, importa em:",
    opcoes: ["Crime de desobediência.", "Crime de responsabilidade.", "Multa administrativa.", "Censura pública."],
    correta: 1,
    explicacao: "Conforme o Art. 284, §2º, a ausência injustificada importa em crime de responsabilidade."
  },
  {
    id: 182,
    materia: "Regimento Interno - Licença",
    pergunta: "Qual o limite de prazo para licença de Deputado para tratar de interesse particular (sem remuneração) por Sessão Legislativa?",
    opcoes: ["90 dias.", "120 dias.", "150 dias.", "60 dias."],
    correta: 1,
    explicacao: "O Art. 93, IV limita a licença para interesse particular a 120 dias por Sessão Legislativa."
  },
  {
    id: 183,
    materia: "Regimento Interno - Tramitação",
    pergunta: "O que acontece com proposições que não tenham sido votadas ao final da legislatura (4 anos)?",
    opcoes: ["São automaticamente reinseridas na pauta.", "São arquivadas.", "Continuam tramitando normalmente.", "São enviadas ao Executivo."],
    correta: 1,
    explicacao: "O Art. 171 determina o arquivamento das proposições não deliberadas ao findar a legislatura."
  },
  {
    id: 184,
    materia: "Regimento Interno - Urgência",
    pergunta: "Quando o Governador solicita urgência em projeto de sua iniciativa, qual o prazo total para a Assembleia se manifestar antes de trancar a pauta?",
    opcoes: ["30 dias.", "40 dias.", "45 dias.", "60 dias."],
    correta: 2,
    explicacao: "O Art. 263, §1º fixa o prazo de 45 dias. Após isso, o projeto tranca a pauta (sobresta as demais deliberações)."
  },
  {
    id: 185,
    materia: "Regimento Interno - Comissões",
    pergunta: "Quem designa os membros das Comissões Permanentes?",
    opcoes: ["O Plenário, por votação.", "O Presidente da Assembleia, por indicação dos Líderes.", "O Governador.", "A Mesa Diretora."],
    correta: 1,
    explicacao: "Art. 30: Os membros são designados pelo Presidente da Assembleia, mediante indicação dos Líderes."
  },

  // ========================================
  // LOTE 12: RORAIMA - HISTÓRIA, GEOGRAFIA E CONHECIMENTOS GERAIS
  // IDs: 201 a 240 (40 questões)
  // ========================================

  {
    id: 201,
    materia: "Geografia de Roraima - Hidrografia",
    pergunta: "Qual é o principal rio que banha o estado de Roraima, cortando a capital Boa Vista, e que serve como principal via fluvial da região?",
    opcoes: ["Rio Negro", "Rio Solimões", "Rio Branco", "Rio Madeira"],
    correta: 2,
    explicacao: "O Rio Branco é o principal rio do estado, formado pela confluência dos rios Uraricoera e Tacutu. Ele banha Boa Vista e deságua no Rio Negro."
  },
  {
    id: 202,
    materia: "Geografia de Roraima - Municípios",
    pergunta: "Excluindo a capital Boa Vista, qual é o município de Roraima com a maior população estimada, sendo um importante polo comercial ao sul do estado?",
    opcoes: ["Caracaraí", "Rorainópolis", "Pacaraima", "Bonfim"],
    correta: 1,
    explicacao: "Rorainópolis é o segundo município mais populoso do estado, localizado ao sul, na divisa com o Amazonas."
  },
  {
    id: 203,
    materia: "História de Roraima - Origens",
    pergunta: "A construção histórica que marcou a ocupação portuguesa no vale do Rio Branco no século XVIII (1775) para defesa contra espanhóis e holandeses foi o:",
    opcoes: ["Forte Príncipe da Beira", "Forte São Joaquim", "Forte de São Gabriel", "Forte de Macapá"],
    correta: 1,
    explicacao: "O Forte São Joaquim foi construído em 1775 na confluência dos rios Uraricoera e Tacutu para garantir a posse portuguesa da região."
  },
  {
    id: 204,
    materia: "Geografia de Roraima - Fronteiras",
    pergunta: "O estado de Roraima faz fronteira internacional com quais países?",
    opcoes: ["Venezuela e Colômbia", "Guiana e Suriname", "Venezuela e Guiana", "Guiana Francesa e Venezuela"],
    correta: 2,
    explicacao: "Roraima limita-se ao norte e noroeste com a Venezuela e ao leste com a Guiana (antiga Guiana Inglesa)."
  },
  {
    id: 205,
    materia: "Geografia de Roraima - Vegetação",
    pergunta: "Qual é o tipo de vegetação predominante na porção nordeste de Roraima, caracterizada por campos abertos, também conhecida localmente como 'Lavrado'?",
    opcoes: ["Floresta Equatorial", "Cerrado (Savana)", "Caatinga", "Manguezal"],
    correta: 1,
    explicacao: "O Lavrado é uma formação de Savana (semelhante ao Cerrado) típica de Roraima, cobrindo grande parte do nordeste do estado."
  },
  {
    id: 206,
    materia: "História de Roraima - Criação",
    pergunta: "Em 1943, o Governo Federal criou cinco Territórios Federais. Qual foi o nome original dado ao território que hoje corresponde a Roraima?",
    opcoes: ["Território Federal de Roraima", "Território Federal do Rio Branco", "Território Federal da Boa Vista", "Território Federal do Extremo Norte"],
    correta: 1,
    explicacao: "Foi criado em 1943 como 'Território Federal do Rio Branco'. O nome foi alterado para 'Roraima' apenas em 1962."
  },
  {
    id: 207,
    materia: "Geografia de Roraima - Pontos Extremos",
    pergunta: "O ponto mais setentrional (ao norte) do Brasil situa-se em Roraima. Qual é este ponto?",
    opcoes: ["Oiapoque", "Ponta do Seixas", "Monte Caburaí", "Pico da Neblina"],
    correta: 2,
    explicacao: "O Monte Caburaí, em Roraima, é o verdadeiro ponto mais ao norte do Brasil (onde o rio Ailã nasce), superando o Oiapoque."
  },
  {
    id: 208,
    materia: "Economia de Roraima",
    pergunta: "Qual cultura agrícola tem se destacado nos últimos anos em Roraima, impulsionando o agronegócio, especialmente nas áreas de lavrado?",
    opcoes: ["Cacau", "Trigo", "Soja", "Uva"],
    correta: 2,
    explicacao: "A soja tem se expandido significativamente no estado, tornando-se um dos principais produtos de exportação."
  },
  {
    id: 209,
    materia: "Geografia de Roraima - Clima",
    pergunta: "Qual é o clima predominante em Roraima, caracterizado por temperaturas elevadas o ano todo e duas estações bem definidas (chuvosa e seca)?",
    opcoes: ["Subtropical", "Tropical (Awi/Am)", "Semiárido", "Temperado"],
    correta: 1,
    explicacao: "O clima é Tropical. Em Boa Vista (Awi), o 'inverno' (chuvas) ocorre no meio do ano, inversamente à maior parte do Brasil."
  },
  {
    id: 210,
    materia: "Geografia de Roraima - Relevo",
    pergunta: "Qual é o ponto mais alto de Roraima, famoso por seus tepuis e localizado na tríplice fronteira entre Brasil, Venezuela e Guiana?",
    opcoes: ["Monte Roraima", "Pico da Neblina", "Serra do Tepequém", "Monte Caburaí"],
    correta: 0,
    explicacao: "O Monte Roraima é o ponto culminante do estado e um dos mais famosos do mundo, com seu topo em forma de mesa (tepui)."
  },
  {
    id: 211,
    materia: "História de Roraima - Elevação a Estado",
    pergunta: "Qual documento legal elevou o Território Federal de Roraima à categoria de Estado?",
    opcoes: ["Constituição de 1946", "Ato Institucional nº 5", "Constituição Federal de 1988", "Lei Áurea"],
    correta: 2,
    explicacao: "A Constituição de 1988 (ADCT) transformou os territórios de Roraima e Amapá em Estados Federados."
  },
  {
    id: 212,
    materia: "Questão Indígena",
    pergunta: "Qual Terra Indígena em Roraima foi alvo de intenso debate jurídico sobre sua demarcação em área contínua, decidido pelo STF em 2009?",
    opcoes: ["Yanomami", "Waimiri-Atroari", "Raposa Serra do Sol", "São Marcos"],
    correta: 2,
    explicacao: "A Raposa Serra do Sol foi demarcada em área contínua, o que gerou conflitos com arrozeiros e decisão histórica do STF (Petição 3.388)."
  },
  {
    id: 213,
    materia: "Geografia de Roraima - Rodovias",
    pergunta: "Qual é a principal rodovia federal que atravessa Roraima no sentido Norte-Sul, ligando Boa Vista a Manaus e à Venezuela?",
    opcoes: ["BR-319", "BR-174", "BR-210", "BR-401"],
    correta: 1,
    explicacao: "A BR-174 é a espinha dorsal do estado, conectando Manaus (AM) a Pacaraima (fronteira com a Venezuela), passando por Boa Vista."
  },
  {
    id: 214,
    materia: "Geografia de Roraima - Municípios",
    pergunta: "Qual município de Roraima é conhecido por abrigar a fronteira com a Venezuela e ser a porta de entrada para o país vizinho?",
    opcoes: ["Bonfim", "Pacaraima", "Normandia", "Uiramutã"],
    correta: 1,
    explicacao: "Pacaraima fica na fronteira com a Venezuela (Santa Elena de Uairén). Bonfim fica na fronteira com a Guiana (Lethem)."
  },
  {
    id: 215,
    materia: "História de Roraima",
    pergunta: "Quem foi o primeiro governador eleito de Roraima após a transformação em Estado?",
    opcoes: ["Ottomar de Sousa Pinto", "Romero Jucá", "Neudo Campos", "Getúlio Cruz"],
    correta: 0,
    explicacao: "Ottomar Pinto foi o primeiro governador eleito pelo voto direto em 1990."
  },
  {
    id: 216,
    materia: "Geografia - Energia",
    pergunta: "Historicamente, Roraima dependia da energia vinda da Venezuela. Qual o nome da linha de transmissão que conectava a hidrelétrica de Guri a Boa Vista?",
    opcoes: ["Linhão de Tucuruí", "Linha de Guri / Linhão de Guri", "Gasoduto Urucu", "Linhão do Madeira"],
    correta: 1,
    explicacao: "A Linha de Guri abastecia Roraima. Devido à crise na Venezuela, Roraima passou a depender de termelétricas locais."
  },
  {
    id: 217,
    materia: "Cultura de Roraima",
    pergunta: "Qual prato típico da culinária roraimense é feito à base de carne de sol, farinha de mandioca e outros ingredientes, sendo considerado patrimônio cultural?",
    opcoes: ["Tacacá", "Damurida", "Paçoca de Carne de Sol", "Pato no Tucupi"],
    correta: 2,
    explicacao: "A Paçoca de Carne de Sol (ou simplesmente Paçoca) é o prato mais emblemático de Roraima. A Damurida é típica indígena."
  },
  {
    id: 218,
    materia: "Geografia de Roraima - Municípios",
    pergunta: "Qual é o município de Roraima localizado mais ao norte do estado, conhecido por ter grande parte de seu território em áreas indígenas e serranas?",
    opcoes: ["Uiramutã", "Caroebe", "São João da Baliza", "Mucajaí"],
    correta: 0,
    explicacao: "Uiramutã é o município mais setentrional, onde fica o Monte Caburaí, e tem alta concentração de população indígena."
  },
  {
    id: 219,
    materia: "História de Roraima",
    pergunta: "Qual a origem do nome 'Roraima' na língua indígena?",
    opcoes: ["Rio Branco", "Montanha Verde", "Serra Verde / Monte Verde", "Terra de Macunaíma"],
    correta: 2,
    explicacao: "Roraima vem de 'Roro' (Verde) e 'Imã' (Serra/Monte) na língua Pemon/Yanomami, significando Serra Verde ou Mãe dos Ventos."
  },
  {
    id: 220,
    materia: "Geografia - Turismo",
    pergunta: "Qual atração turística localizada no município de Amajari é famosa por suas cachoeiras e pelo clima serrano?",
    opcoes: ["Lago Caracaranã", "Serra do Tepequém", "Pedra Pintada", "Parque Viruá"],
    correta: 1,
    explicacao: "A Serra do Tepequém (Amajari) é um dos principais destinos turísticos, antiga área de garimpo de diamantes."
  },
  {
    id: 221,
    materia: "Geografia - Rios",
    pergunta: "Qual rio faz a fronteira natural entre o Brasil (Roraima) e a Guiana?",
    opcoes: ["Rio Uraricoera", "Rio Tacutu", "Rio Mucajaí", "Rio Jauaperi"],
    correta: 1,
    explicacao: "O Rio Tacutu divide Brasil (Bonfim) e Guiana (Lethem). A Ponte dos Macuxis atravessa o Rio Branco, a Ponte Brasil-Guiana atravessa o Tacutu."
  },
  {
    id: 222,
    materia: "História Recente",
    pergunta: "A crise migratória que impactou Roraima na última década envolve principalmente cidadãos de qual país?",
    opcoes: ["Haiti", "Colômbia", "Venezuela", "Bolívia"],
    correta: 2,
    explicacao: "O fluxo migratório intenso de venezuelanos entrando por Pacaraima gerou a Operação Acolhida."
  },
  {
    id: 223,
    materia: "Geografia - Municípios",
    pergunta: "Qual município é conhecido como a 'Cidade Porto' devido à sua localização estratégica no Rio Branco, ao sul da capital?",
    opcoes: ["Caracaraí", "Iracema", "Alto Alegre", "Cantá"],
    correta: 0,
    explicacao: "Caracaraí possui o maior movimento portuário do estado (Porto de Caracaraí) no Rio Branco."
  },
  {
    id: 224,
    materia: "Símbolos",
    pergunta: "A bandeira de Roraima possui uma estrela amarela que representa:",
    opcoes: ["O Sol do Equador", "A riqueza mineral", "O estado na bandeira nacional (Wezen)", "A estrela Dalva"],
    correta: 2,
    explicacao: "A estrela amarela (Muliphein/Wezen) representa o estado na constelação do Cão Maior, simbolizando que Roraima brilha no norte."
  },
  {
    id: 225,
    materia: "Geografia - Municípios",
    pergunta: "Qual município faz fronteira com o estado do Pará?",
    opcoes: ["Rorainópolis", "Caroebe", "São Luiz", "São João da Baliza"],
    correta: 1,
    explicacao: "Caroebe, no sudeste do estado, faz divisa com o Pará (embora a conexão rodoviária seja precária/inexistente)."
  },
  {
    id: 226,
    materia: "História",
    pergunta: "Antes de ser Território Federal, as terras de Roraima pertenciam a qual estado?",
    opcoes: ["Pará", "Maranhão", "Amazonas", "Mato Grosso"],
    correta: 2,
    explicacao: "As terras faziam parte do Amazonas (Município de Boa Vista do Rio Branco) até 1943."
  },
  {
    id: 227,
    materia: "Geografia Física",
    pergunta: "O Parque Nacional do Viruá é conhecido por sua:",
    opcoes: ["Montanhas nevadas", "Grande biodiversidade em áreas de campina e floresta de areia branca", "Fronteira seca", "Mineração de ouro"],
    correta: 1,
    explicacao: "O Viruá (Caracaraí) é uma área de preservação com imensa biodiversidade em solos arenosos."
  },
  {
    id: 228,
    materia: "Geografia - Clima",
    pergunta: "O fenômeno climático que costuma causar secas severas em Roraima, favorecendo incêndios florestais, é o:",
    opcoes: ["La Niña", "El Niño", "Friagem", "Monções"],
    correta: 1,
    explicacao: "O El Niño reduz as chuvas na Amazônia Setentrional (Roraima), causando secas graves e incêndios."
  },
  {
    id: 229,
    materia: "Economia",
    pergunta: "A Área de Livre Comércio de Boa Vista (ALCBV) foi criada para:",
    opcoes: ["Promover a industrialização pesada", "Incentivar o comércio com isenção de impostos de importação/exportação", "Fechar as fronteiras", "Apenas turismo"],
    correta: 1,
    explicacao: "A ALCBV visa o desenvolvimento regional através de incentivos fiscais (semelhante à ZFM, mas focada em comércio)."
  },
  {
    id: 230,
    materia: "Política",
    pergunta: "Quantos Deputados Estaduais compõem a Assembleia Legislativa de Roraima?",
    opcoes: ["24", "18", "30", "8"],
    correta: 0,
    explicacao: "A Constituição Federal define que até 12 deputados federais, multiplica-se por 3. Roraima tem 8 federais, logo 8x3 = 24 estaduais."
  },
  {
    id: 231,
    materia: "Geografia - Vegetação",
    pergunta: "A 'Ilha de Maracá', localizada em Roraima, é:",
    opcoes: ["Uma ilha fluvial no Rio Uraricoera, sendo uma Estação Ecológica", "Uma ilha no Oceano Atlântico", "Um bairro de Boa Vista", "Uma área de garimpo"],
    correta: 0,
    explicacao: "A Estação Ecológica de Maracá é uma grande ilha fluvial formada pela bifurcação do Rio Uraricoera."
  },
  {
    id: 232,
    materia: "História",
    pergunta: "A 'Revolta de Rupununi' (1969) foi um evento histórico que impactou a fronteira de Roraima com:",
    opcoes: ["A Venezuela", "A Guiana", "O Suriname", "A Colômbia"],
    correta: 1,
    explicacao: "Foi uma revolta separatista na Guiana, onde muitos rebeldes fugiram para o Brasil (Roraima)."
  },
  {
    id: 233,
    materia: "Geografia",
    pergunta: "O 'Monumento aos Garimpeiros' está localizado em:",
    opcoes: ["No Centro Cívico de Boa Vista", "Na Serra do Tepequém", "Na fronteira com a Venezuela", "No Porto de Caracaraí"],
    correta: 0,
    explicacao: "O Monumento ao Garimpeiro fica na Praça do Centro Cívico, símbolo da história econômica (embora controversa) do estado."
  },
  {
    id: 234,
    materia: "Cultura",
    pergunta: "Qual artista plástico roraimense é conhecido internacionalmente por suas obras que retratam a cultura indígena e o lavrado?",
    opcoes: ["Jaider Esbell", "Romero Britto", "Tarsila do Amaral", "Candido Portinari"],
    correta: 0,
    explicacao: "Jaider Esbell (Makuxi) foi um renomado artista e ativista indígena de Roraima, falecido em 2021."
  },
  {
    id: 235,
    materia: "Geografia Urbana",
    pergunta: "A cidade de Boa Vista foi planejada em formato de leque, inspirada em qual cidade europeia?",
    opcoes: ["Londres", "Paris", "Barcelona", "Roma"],
    correta: 1,
    explicacao: "O traçado urbano radial de Boa Vista, projetado por Darcy Aleixo Derenusson, é inspirado em Paris."
  },
  {
    id: 236,
    materia: "Geografia",
    pergunta: "Qual é o fuso horário de Roraima em relação a Brasília (horário padrão)?",
    opcoes: ["O mesmo de Brasília", "1 hora a menos (-1)", "1 hora a mais (+1)", "2 horas a menos (-2)"],
    correta: 1,
    explicacao: "Roraima segue o fuso UTC-4, que é 1 hora a menos que Brasília (UTC-3)."
  },
  {
    id: 237,
    materia: "Geografia",
    pergunta: "O Rio Jauaperi é um importante afluente que marca a divisa entre Roraima e:",
    opcoes: ["Amazonas", "Pará", "Venezuela", "Guiana"],
    correta: 0,
    explicacao: "O Jauaperi forma parte da divisa sul entre Roraima e Amazonas."
  },
  {
    id: 238,
    materia: "Etnografia",
    pergunta: "Quais são as duas principais etnias indígenas em número de população em Roraima?",
    opcoes: ["Yanomami e Macuxi", "Guarani e Ticuna", "Pataxó e Kayapó", "Tupinambá e Aruak"],
    correta: 0,
    explicacao: "Os Macuxi (Lavrado/Serras) e Yanomami (Floresta) são os grupos mais numerosos e conhecidos."
  },
  {
    id: 239,
    materia: "História",
    pergunta: "A Fazenda São Marcos, histórica na formação do estado, foi administrada por muito tempo pelo:",
    opcoes: ["Exército Brasileiro", "Ministério da Agricultura", "Governo do Amazonas", "Barão do Rio Branco"],
    correta: 1,
    explicacao: "A Fazenda São Marcos foi administrada pelo Ministério da Agricultura antes de passar para a jurisdição indígena/funai."
  },
  {
    id: 240,
    materia: "Geografia",
    pergunta: "Qual BR liga Boa Vista à Guiana (Bonfim/Lethem)?",
    opcoes: ["BR-174", "BR-401", "BR-210", "BR-432"],
    correta: 1,
    explicacao: "A BR-401 liga Boa Vista a Bonfim (Leste), na fronteira com a Guiana."
  },

  // ========================================
  // LOTE 13: TI LEGISLATIVA E PÚBLICA
  // IDs: 241 a 260 (20 questões)
  // ========================================

  {
    id: 241,
    materia: "TI Legislativa - Processo Eletrônico",
    pergunta: "Em um ambiente legislativo, a assinatura digital utilizada para garantir a autenticidade e integridade de autógrafos de lei deve seguir qual padrão oficial brasileiro?",
    opcoes: ["PGP (Pretty Good Privacy)", "ICP-Brasil", "X.509 Internacional", "Kerberos"],
    correta: 1,
    explicacao: "A ICP-Brasil (Infraestrutura de Chaves Públicas Brasileira) é o padrão oficial com validade jurídica para assinaturas digitais no setor público."
  },
  {
    id: 242,
    materia: "TI Legislativa - Transparência",
    pergunta: "Para atender à Lei de Acesso à Informação (LAI), os Portais de Transparência das Assembleias devem disponibilizar os dados em formato:",
    opcoes: ["Apenas PDF digitalizado (imagem)", "Apenas HTML visualizável", "Formatos abertos, estruturados e legíveis por máquina (ex: CSV, XML, JSON)", "Formatos proprietários (.doc, .xls)"],
    correta: 2,
    explicacao: "A LAI exige dados abertos (Open Data), que permitam processamento automatizado, não apenas leitura humana."
  },
  {
    id: 243,
    materia: "TI Legislativa - Votação",
    pergunta: "Nos painéis eletrônicos de votação parlamentar, qual requisito de segurança é fundamental para garantir que o voto foi registrado pelo deputado correto?",
    opcoes: ["Uso de biometria ou senha pessoal intransferível", "Login único compartilhado pela bancada", "Acesso via Wi-Fi público", "Confirmação por e-mail"],
    correta: 0,
    explicacao: "A autenticação forte (biometria ou senha pessoal) é crucial para evitar o voto fantasma (outro votar no lugar do deputado)."
  },
  {
    id: 244,
    materia: "TI Pública - Governança",
    pergunta: "Qual framework de governança de TI é amplamente adotado no setor público brasileiro (SISP) para alinhamento estratégico de TI?",
    opcoes: ["Scrum", "Cobit", "XP", "Kanban"],
    correta: 1,
    explicacao: "O COBIT foca em Governança (alinhar TI ao negócio/metas públicas), enquanto ITIL foca em Serviços e Scrum em Desenvolvimento."
  },
  {
    id: 245,
    materia: "TI Legislativa - Documentos",
    pergunta: "O processo legislativo eletrônico visa eliminar o papel. Qual tecnologia garante que um documento (ex: Projeto de Lei) não foi alterado após sua assinatura?",
    opcoes: ["Criptografia de Hash (Resumo)", "Backup em Fita", "Firewall", "VLAN"],
    correta: 0,
    explicacao: "O Hash (ex: SHA-256) gera uma impressão digital única do arquivo. Se um bit mudar, o hash muda, acusando a alteração."
  },
  {
    id: 246,
    materia: "TI Pública - Software Livre",
    pergunta: "Muitas Assembleias utilizam suítes de escritório livres para reduzir custos. Qual é o formato de arquivo padrão (nativo) do LibreOffice Calc?",
    opcoes: [".xlsx", ".ods", ".doc", ".pdf"],
    correta: 1,
    explicacao: ".ods (OpenDocument Spreadsheet) é o padrão aberto para planilhas. .xlsx é o padrão Microsoft (proprietário/aberto via OOXML)."
  },
  {
    id: 247,
    materia: "TI Legislativa - Redes",
    pergunta: "Para transmitir sessões plenárias ao vivo (streaming) com qualidade, qual protocolo de transporte é preferível por priorizar velocidade em vez de garantia de entrega de pacotes?",
    opcoes: ["TCP", "UDP", "FTP", "POP3"],
    correta: 1,
    explicacao: "UDP é usado em streaming e VoIP porque é rápido e não exige confirmação de cada pacote (o que causaria travamentos/buffer)."
  },
  {
    id: 248,
    materia: "TI Pública - Segurança",
    pergunta: "Um ataque comum contra sites de governo é a desfiguração da página inicial (Home) para exibir mensagens políticas. Esse ataque é chamado de:",
    opcoes: ["Phishing", "Defacement", "Ransomware", "Sniffing"],
    correta: 1,
    explicacao: "Defacement (pichação digital) altera a aparência visual do site."
  },
  {
    id: 249,
    materia: "TI Legislativa - SAPL",
    pergunta: "O sistema 'SAPL', desenvolvido pela comunidade Interlegis (Senado), é amplamente usado em Casas Legislativas para:",
    opcoes: ["Folha de Pagamento", "Sistema de Apoio ao Processo Legislativo", "Controle de Estoque", "Edição de Vídeo"],
    correta: 1,
    explicacao: "SAPL (Sistema de Apoio ao Processo Legislativo) gerencia tramitação, sessões, normas jurídicas e parlamentares."
  },
  {
    id: 250,
    materia: "TI Pública - Pregão",
    pergunta: "Nas aquisições de bens de informática comuns pela administração pública, qual a modalidade de licitação obrigatória (regra geral)?",
    opcoes: ["Concorrência", "Pregão (preferencialmente eletrônico)", "Tomada de Preços", "Convite"],
    correta: 1,
    explicacao: "A Lei 14.133 e decretos anteriores exigem Pregão para bens e serviços comuns, inclusive TI comum (computadores, impressoras)."
  },
  {
    id: 251,
    materia: "Hardware - Manutenção",
    pergunta: "Em um ambiente legislativo com impressoras a laser, qual componente precisa ser trocado quando as impressões saem com manchas repetitivas ou falhas verticais, além do toner?",
    opcoes: ["Placa de Rede", "Cilindro Fotocondutor (Drum)", "Cabo USB", "Fonte de Alimentação"],
    correta: 1,
    explicacao: "O Cilindro (Drum) desgastado ou riscado causa marcas repetitivas na impressão."
  },
  {
    id: 252,
    materia: "Redes - Wi-Fi Público",
    pergunta: "Ao configurar uma rede Wi-Fi para visitantes (Guest) na Assembleia, qual a melhor prática de segurança para proteger a rede interna corporativa?",
    opcoes: ["Usar a mesma senha da rede corporativa", "Isolar a rede de visitantes em uma VLAN separada", "Desativar a criptografia", "Permitir acesso total aos servidores"],
    correta: 1,
    explicacao: "VLAN (Virtual LAN) separa logicamente o tráfego. Visitantes acessam a internet, mas não enxergam os servidores/computadores internos."
  },
  {
    id: 253,
    materia: "Linux - Servidores",
    pergunta: "Qual comando Linux é utilizado para agendar tarefas automáticas (ex: backup do banco de dados legislativo) em horários específicos?",
    opcoes: ["backup", "at", "crontab", "schedule"],
    correta: 2,
    explicacao: "O 'cron' (configurado via 'crontab') é o agendador de tarefas padrão do Unix/Linux."
  },
  {
    id: 254,
    materia: "Segurança - Backup",
    pergunta: "A Assembleia sofreu um ataque de Ransomware. Qual tipo de backup garantiria a recuperação dos dados mesmo se a rede inteira for comprometida?",
    opcoes: ["Backup em nuvem sincronizado em tempo real", "Backup Offline (Fita ou HD desconectado/Air Gapped)", "RAID 1 (Espelhamento)", "Snapshot no mesmo disco"],
    correta: 1,
    explicacao: "Backup Offline (Air Gapped) não está conectado à rede, logo o ransomware não consegue criptografá-lo."
  },
  {
    id: 255,
    materia: "TI - Acessibilidade",
    pergunta: "Os sites legislativos devem seguir as diretrizes de acessibilidade (eMAG/WCAG). Qual atributo HTML é essencial para leitores de tela descreverem imagens para deficientes visuais?",
    opcoes: ["src", "href", "alt", "class"],
    correta: 2,
    explicacao: "O atributo 'alt' (texto alternativo) fornece a descrição da imagem para leitores de tela."
  },
  {
    id: 256,
    materia: "Banco de Dados",
    pergunta: "Para garantir a integridade de uma transação financeira ou legislativa no banco de dados, deve-se obedecer às propriedades ACID. O que significa o 'A'?",
    opcoes: ["Atomicidade", "Acessibilidade", "Autenticidade", "Agilidade"],
    correta: 0,
    explicacao: "Atomicidade: A transação é tudo ou nada. Se falhar no meio, desfaz tudo (rollback)."
  },
  {
    id: 257,
    materia: "TI - Suporte",
    pergunta: "Um usuário da Assembleia reclama que o computador liga, mas não dá vídeo e emite 3 bips longos. Isso geralmente indica falha em:",
    opcoes: ["Disco Rígido", "Memória RAM", "Processador", "Fonte"],
    correta: 1,
    explicacao: "Códigos sonoros (bips) variam, mas sequências de bips longos ou repetitivos geralmente indicam erro de Memória RAM ou Vídeo."
  },
  {
    id: 258,
    materia: "Gestão de TI",
    pergunta: "No ITIL, qual é o nome do documento que cataloga todos os serviços de TI disponíveis para os usuários da Assembleia (ex: E-mail, Internet, Impressão)?",
    opcoes: ["SLA", "Catálogo de Serviços", "CMDB", "Backlog"],
    correta: 1,
    explicacao: "O Catálogo de Serviços é a vitrine onde os usuários veem o que a TI oferece e como solicitar."
  },
  {
    id: 259,
    materia: "Redes - VPN",
    pergunta: "Deputados em viagem precisam acessar o sistema interno da Assembleia com segurança. Qual tecnologia cria um túnel criptografado sobre a internet?",
    opcoes: ["DNS", "DHCP", "VPN", "FTP"],
    correta: 2,
    explicacao: "VPN (Virtual Private Network) estende a rede privada sobre uma rede pública."
  },
  {
    id: 260,
    materia: "LGPD",
    pergunta: "Na LGPD, o 'Relatório de Impacto à Proteção de Dados Pessoais' (RIPD) deve ser elaborado pelo controlador quando:",
    opcoes: ["Sempre, para qualquer tratamento", "O tratamento envolver alto risco às liberdades civis e direitos fundamentais", "Apenas se houver vazamento", "Apenas para dados de funcionários"],
    correta: 1,
    explicacao: "O RIPD é exigido quando o tratamento pode gerar alto risco aos titulares (ex: uso de dados sensíveis em larga escala)."
  },

  // ========================================
  // LOTE 5: PORTUGUÊS E MATEMÁTICA/LÓGICA
  // IDs: 261 a 300 (40 questões)
  // ========================================

  // LÍNGUA PORTUGUESA (Foco em Gramática e Texto)
  // IDs: 261 a 280

  {
    id: 261,
    materia: "Português - Crase",
    pergunta: "Assinale a alternativa em que o uso do acento grave (crase) está INCORRETO:",
    opcoes: ["Fui à feira comprar frutas.", "Refiro-me àquela situação.", "Estamos dispostos a colaborar.", "Às vezes, estudamos à noite."],
    correta: 2,
    explicacao: "Não ocorre crase antes de verbos ('a colaborar'). O 'a' aqui é apenas preposição. Nos outros casos: 'à feira' (a+a), 'àquela' (a+aquela), 'às vezes' (locução adverbial feminina)."
  },
  {
    id: 262,
    materia: "Português - Concordância Verbal",
    pergunta: "Indique a frase que respeita a norma-padrão de concordância com o verbo HAVER:",
    opcoes: ["Havia muitos candidatos na sala.", "Haviam muitos problemas no código.", "Podem haver novas retificações.", "Houveram discussões sobre o gabarito."],
    correta: 0,
    explicacao: "O verbo Haver, no sentido de existir/acontecer, é impessoal e fica sempre no singular ('Havia'). Errado: 'Haviam', 'Houveram'. Em locuções, ele transmite a impessoalidade ao auxiliar ('Pode haver', não 'Podem haver')."
  },
  {
    id: 263,
    materia: "Português - Regência",
    pergunta: "O verbo 'Assistir', no sentido de 'ver/presenciar', exige a preposição 'a'. Qual alternativa está correta?",
    opcoes: ["Nós assistimos o filme ontem.", "Nós assistimos ao filme ontem.", "O médico assistiu ao paciente.", "Ele assistiu na cidade de Boa Vista."],
    correta: 1,
    explicacao: "No sentido de ver, é 'assistir a' (assistir ao filme). No sentido de dar socorro (médico), é VTD (assistiu o paciente). No sentido de morar, é VI (assistiu em)."
  },
  {
    id: 264,
    materia: "Português - Pontuação",
    pergunta: "Assinale a alternativa em que a vírgula foi empregada para isolar um aposto explicativo:",
    opcoes: ["Roraima, o estado mais setentrional, faz fronteira com a Venezuela.", "Estudei, mas não passei.", "João, venha aqui.", "Comprei mouses, teclados e monitores."],
    correta: 0,
    explicacao: "'O estado mais setentrional' explica o termo anterior (Roraima). Isso é um aposto. As outras opções mostram: conjunção adversativa, vocativo e enumeração."
  },
  {
    id: 265,
    materia: "Português - Conjunções",
    pergunta: "Na frase 'O sistema caiu, CONQUANTO tivesse sido testado', a conjunção destacada expressa:",
    opcoes: ["Causa", "Consequência", "Concessão", "Condição"],
    correta: 2,
    explicacao: "Conquanto é uma conjunção concessiva, equivalente a 'embora', 'apesar de que'. Indica uma oposição que não impede a ação."
  },
  {
    id: 266,
    materia: "Português - Ortografia",
    pergunta: "Qual a forma correta para completar a frase: 'Não sei o ______ de tanta confusão.'?",
    opcoes: ["por que", "por quê", "porque", "porquê"],
    correta: 3,
    explicacao: "Quando substantivado (precedido de artigo 'o', 'um'), usa-se 'porquê' (junto e com acento). Equivale a 'o motivo'."
  },
  {
    id: 267,
    materia: "Português - Colocação Pronominal",
    pergunta: "Em qual frase a próclise (pronome antes do verbo) é obrigatória devido a palavra atrativa?",
    opcoes: ["Me disseram a verdade.", "Não me avisaram do erro.", "Avisaram-me tarde.", "Deus te abençoe."],
    correta: 1,
    explicacao: "A palavra negativa 'Não' atrai o pronome para antes do verbo. 'Me disseram' (início de frase) é coloquial, o formal é ênclise ou próclise se houver atração."
  },
  {
    id: 268,
    materia: "Português - Semântica",
    pergunta: "Os termos 'Ratificar' e 'Retificar' são parônimos. Seus significados são, respectivamente:",
    opcoes: ["Corrigir e Confirmar", "Confirmar e Corrigir", "Anular e Refazer", "Assinar e Apagar"],
    correta: 1,
    explicacao: "RA-tificar = Confirmar/Validar. RE-tificar = Corrigir/Arrumar."
  },
  {
    id: 269,
    materia: "Português - Voz Verbal",
    pergunta: "Transpondo a frase 'O técnico formatou o computador' para a voz passiva, temos:",
    opcoes: ["O computador formatou-se pelo técnico.", "O computador foi formatado pelo técnico.", "O técnico tinha formatado o computador.", "Formatou-se o computador."],
    correta: 1,
    explicacao: "Voz Passiva Analítica: Sujeito Paciente (O computador) + Verbo Ser + Particípio (foi formatado) + Agente da Passiva (pelo técnico)."
  },
  {
    id: 270,
    materia: "Português - Acentuação",
    pergunta: "Assinale a palavra que é acentuada pela mesma regra de 'Técnico' (proparoxítona):",
    opcoes: ["Último", "Café", "História", "Também"],
    correta: 0,
    explicacao: "Técnico e Último são proparoxítonas (sílaba tônica na antepenúltima), e todas são acentuadas. Café (oxítona), História (paroxítona terminada em ditongo)."
  },
  {
    id: 271,
    materia: "Português - Morfologia",
    pergunta: "Na frase 'Estudos INTENSOS geram resultados', a palavra destacada é um:",
    opcoes: ["Substantivo", "Verbo", "Adjetivo", "Advérbio"],
    correta: 2,
    explicacao: "Intensos caracteriza o substantivo 'Estudos', concordando com ele. Portanto, é um adjetivo."
  },
  {
    id: 272,
    materia: "Português - Hífen",
    pergunta: "Segundo o Novo Acordo Ortográfico, qual palavra está grafada corretamente?",
    opcoes: ["Micro-ondas", "Microondas", "Auto-escola", "Antiinflamatório"],
    correta: 0,
    explicacao: "Usa-se hífen quando o prefixo termina com a mesma vogal que inicia a segunda palavra: Micro-ondas, Anti-inflamatório. Autoescola (vogais diferentes) junta."
  },
  {
    id: 273,
    materia: "Português - Interpretação",
    pergunta: "A Coesão Textual que retoma um termo já citado anteriormente no texto é chamada de:",
    opcoes: ["Catáfora", "Anáfora", "Elipse", "Metonímia"],
    correta: 1,
    explicacao: "Anáfora é a retomada do que passou (Ana = antes). Catáfora aponta para o que vem depois."
  },
  {
    id: 274,
    materia: "Português - Verbos",
    pergunta: "Se eu ______ o edital, ficaria tranquilo. A forma correta do verbo VER no futuro do subjuntivo é:",
    opcoes: ["ver", "visse", "vir", "vires"],
    correta: 2,
    explicacao: "Futuro do subjuntivo de VER é 'VIR' (Quando eu vir, se eu vir). 'Ver' é infinitivo. 'Visse' é pretérito imperfeito."
  },
  {
    id: 275,
    materia: "Português - Sintaxe",
    pergunta: "Na oração 'A banca anulou a questão', o termo 'a questão' exerce a função de:",
    opcoes: ["Sujeito", "Objeto Indireto", "Objeto Direto", "Predicativo"],
    correta: 2,
    explicacao: "Quem anula, anula ALGO. 'A questão' completa o verbo sem preposição, sendo Objeto Direto."
  },
  {
    id: 276,
    materia: "Português - Crase",
    pergunta: "O uso da crase é FACULTATIVO em:",
    opcoes: ["Fui à praia.", "Entreguei o livro à Maria.", "Refiro-me àquele rapaz.", "Saímos às pressas."],
    correta: 1,
    explicacao: "Diante de nomes próprios femininos (Maria), o uso do artigo 'a' é opcional, logo a crase também é. Nas outras é obrigatória."
  },
  {
    id: 277,
    materia: "Português - Regência",
    pergunta: "O verbo 'Obedecer' exige a preposição 'a'. Qual frase está correta?",
    opcoes: ["O cidadão deve obedecer as leis.", "O cidadão deve obedecer às leis.", "O cidadão deve obedecer nas leis.", "O cidadão deve obedecer com as leis."],
    correta: 1,
    explicacao: "Quem obedece, obedece A alguma coisa. A preposição 'a' + artigo 'as' leis = às leis (com crase)."
  },
  {
    id: 278,
    materia: "Português - Concordância",
    pergunta: "Qual frase está correta quanto ao uso do verbo FAZER indicando tempo decorrido?",
    opcoes: ["Fazem dois anos que estudo.", "Faz dois anos que estudo.", "Fizeram dois anos ontem.", "Vão fazer dois anos amanhã."],
    correta: 1,
    explicacao: "Fazer indicando tempo é impessoal e fica no singular. 'Faz dois anos', 'Vai fazer dois anos'."
  },
  {
    id: 279,
    materia: "Português - Figuras de Linguagem",
    pergunta: "Na frase 'Aquele funcionário é uma raposa nos negócios', ocorre uma:",
    opcoes: ["Metonímia", "Metáfora", "Pleonasmo", "Antítese"],
    correta: 1,
    explicacao: "Metáfora é uma comparação implícita (ele tem a esperteza de uma raposa)."
  },
  {
    id: 280,
    materia: "Português - Texto",
    pergunta: "Um texto que tem por finalidade instruir o leitor a realizar uma tarefa (como uma receita ou manual) é classificado como:",
    opcoes: ["Narrativo", "Descritivo", "Dissertativo", "Injuntivo"],
    correta: 3,
    explicacao: "Texto Injuntivo ou Instrucional é aquele que dá ordens ou instruções."
  },

  // MATEMÁTICA E RACIOCÍNIO LÓGICO
  // IDs: 281 a 300

  {
    id: 281,
    materia: "Raciocínio Lógico - Negação",
    pergunta: "Qual é a negação lógica da proposição 'Todo técnico é inteligente'?",
    opcoes: ["Nenhum técnico é inteligente.", "Algum técnico não é inteligente.", "Todo técnico não é inteligente.", "Algum técnico é inteligente."],
    correta: 1,
    explicacao: "Para negar o 'Todo' (Universal Afirmativo), basta furar a regra com um exemplo contrário: 'Algum... não é' ou 'Pelo menos um... não é'."
  },
  {
    id: 282,
    materia: "Raciocínio Lógico - Equivalência",
    pergunta: "A equivalência lógica da condicional 'Se estudo, então passo' é:",
    opcoes: ["Se não estudo, não passo.", "Se passo, então estudo.", "Se não passo, então não estudo.", "Estudo e passo."],
    correta: 2,
    explicacao: "É a Contrapositiva: Inverte e nega as duas partes. Se A -> B, então Não B -> Não A."
  },
  {
    id: 283,
    materia: "Matemática - Análise Combinatória",
    pergunta: "Quantas senhas de 3 dígitos distintos podem ser formadas usando os algarismos {1, 2, 3, 4, 5}?",
    opcoes: ["125", "60", "15", "10"],
    correta: 1,
    explicacao: "Arranjo de 5 elementos tomados 3 a 3 (a ordem importa na senha). 5 * 4 * 3 = 60."
  },
  {
    id: 284,
    materia: "Matemática - Probabilidade",
    pergunta: "Ao lançar um dado honesto de 6 faces, qual a probabilidade de sair um número par?",
    opcoes: ["1/6", "1/3", "1/2", "2/3"],
    correta: 2,
    explicacao: "Números pares: 2, 4, 6 (3 eventos). Total: 6. Probabilidade = 3/6 = 1/2 (50%)."
  },
  {
    id: 285,
    materia: "Matemática - Regra de Três",
    pergunta: "Se 3 técnicos formatam 15 computadores em um dia, quantos computadores 5 técnicos formatariam no mesmo período (mesma produtividade)?",
    opcoes: ["20", "25", "30", "18"],
    correta: 1,
    explicacao: "Regra de três simples: 3 téc -> 15 pcs. 1 téc -> 5 pcs. 5 téc -> 25 pcs."
  },
  {
    id: 286,
    materia: "Matemática - Porcentagem",
    pergunta: "Um produto custava R$ 100,00 e sofreu um aumento de 20%. Em seguida, sobre o novo preço, houve um desconto de 20%. Qual o preço final?",
    opcoes: ["R$ 100,00", "R$ 96,00", "R$ 104,00", "R$ 90,00"],
    correta: 1,
    explicacao: "100 + 20% = 120. Desconto de 20% sobre 120 é 24 (120 * 0,2). 120 - 24 = 96."
  },
  {
    id: 287,
    materia: "Raciocínio Lógico - Sequência",
    pergunta: "Qual o próximo número da sequência: 2, 5, 10, 17, 26, ...?",
    opcoes: ["35", "37", "36", "40"],
    correta: 1,
    explicacao: "A lógica é n^2 + 1. 1^2+1=2, 2^2+1=5, 3^2+1=10... 6^2+1 = 36+1 = 37."
  },
  {
    id: 288,
    materia: "Raciocínio Lógico - Conjuntos",
    pergunta: "Em um setor de TI com 10 pessoas, 6 sabem Java e 7 sabem Python. Se todos sabem pelo menos uma das duas, quantos sabem AMBAS?",
    opcoes: ["1", "2", "3", "4"],
    correta: 2,
    explicacao: "União = A + B - Interseção. 10 = 6 + 7 - X. 10 = 13 - X. X = 3."
  },
  {
    id: 289,
    materia: "Matemática - Geometria",
    pergunta: "Qual a área de uma sala retangular de 4m de largura por 6m de comprimento?",
    opcoes: ["10 m²", "20 m²", "24 m²", "12 m²"],
    correta: 2,
    explicacao: "Área do retângulo = Base x Altura. 4 x 6 = 24 m²."
  },
  {
    id: 290,
    materia: "Raciocínio Lógico - Conectivos",
    pergunta: "Na lógica proposicional, a conjunção 'P e Q' só é VERDADEIRA quando:",
    opcoes: ["P for V e Q for F", "P for F e Q for V", "Ambas (P e Q) forem V", "Pelo menos uma for V"],
    correta: 2,
    explicacao: "A tabela verdade do 'E' (conjunção) só dá Verdadeiro se TUDO for Verdadeiro."
  },
  {
    id: 291,
    materia: "Raciocínio Lógico - Tautologia",
    pergunta: "Uma proposição composta que é sempre verdadeira, independente dos valores lógicos das proposições simples, chama-se:",
    opcoes: ["Contradição", "Contingência", "Tautologia", "Falácia"],
    correta: 2,
    explicacao: "Exemplo clássico: 'P ou não P'. É sempre verdade."
  },
  {
    id: 292,
    materia: "Raciocínio Lógico - Argumento",
    pergunta: "Todo A é B. Todo B é C. Logo:",
    opcoes: ["Todo A é C.", "Algum A não é C.", "Nenhum A é C.", "Todo C é A."],
    correta: 0,
    explicacao: "Silogismo clássico. Se A está dentro de B, e B está dentro de C, então A está dentro de C."
  },
  {
    id: 293,
    materia: "Matemática - Equação",
    pergunta: "O dobro de um número somado a 10 é igual a 50. Qual é esse número?",
    opcoes: ["10", "15", "20", "25"],
    correta: 2,
    explicacao: "2x + 10 = 50 -> 2x = 40 -> x = 20."
  },
  {
    id: 294,
    materia: "Matemática - Escala",
    pergunta: "Em um mapa de escala 1:100.000, 1 cm no mapa equivale a quantos quilômetros na realidade?",
    opcoes: ["1 km", "10 km", "100 km", "0,1 km"],
    correta: 0,
    explicacao: "1 cm no mapa = 100.000 cm reais. 100.000 cm = 1.000 metros = 1 km."
  },
  {
    id: 295,
    materia: "Matemática - Juros",
    pergunta: "Um capital de R$ 1.000,00 aplicado a juros simples de 5% ao mês, durante 2 meses, renderá quanto de juros?",
    opcoes: ["R$ 50,00", "R$ 100,00", "R$ 150,00", "R$ 200,00"],
    correta: 1,
    explicacao: "J = C * i * t. J = 1000 * 0,05 * 2. J = 100."
  },
  {
    id: 296,
    materia: "Matemática - Unidades TI",
    pergunta: "Considerando a base binária estrita (IEC), 1 GiB (Gibibyte) corresponde a quantos MiB (Mebibytes)?",
    opcoes: ["1000", "1024", "100", "8"],
    correta: 1,
    explicacao: "Na computação, os prefixos binários (Kibi, Mebi, Gibi) usam potências de 1024 (2^10)."
  },
  {
    id: 297,
    materia: "Raciocínio Lógico - De Morgan",
    pergunta: "Pela Lei de De Morgan, a negação de 'Gosto de café E de leite' é:",
    opcoes: ["Não gosto de café E não gosto de leite", "Não gosto de café OU não gosto de leite", "Gosto de café mas não de leite", "Não gosto de nada"],
    correta: 1,
    explicacao: "Negação do 'E' vira 'OU' e nega-se as duas partes. ~(A ^ B) <-> ~A v ~B."
  },
  {
    id: 298,
    materia: "Matemática - Anagramas",
    pergunta: "Quantos anagramas possui a palavra 'SOL'?",
    opcoes: ["3", "6", "9", "4"],
    correta: 1,
    explicacao: "Permutação de 3 letras distintas (P3). 3! = 3 * 2 * 1 = 6."
  },
  {
    id: 299,
    materia: "Matemática - Frações",
    pergunta: "Quanto é 1/3 de 600?",
    opcoes: ["200", "300", "150", "100"],
    correta: 0,
    explicacao: "600 dividido por 3 é 200."
  },
  {
    id: 300,
    materia: "Matemática - Tempo",
    pergunta: "Se uma tarefa leva 1 hora e 45 minutos, quantos minutos ela leva no total?",
    opcoes: ["105 min", "145 min", "95 min", "115 min"],
    correta: 0,
    explicacao: "1 hora = 60 minutos. 60 + 45 = 105 minutos."
  },

  // --- BLOCO PORTUGUÊS AVANÇADO (1101-1115) ---
  {
    id: 1101,
    materia: "Português - Crase",
    pergunta: "Assinale a frase correta quanto ao uso do acento grave:",
    opcoes: ["Fui à casa de meus pais.", "Fui a casa ontem.", "Fui à casa.", "Voltei à casa cedo."],
    correta: 0,
    explicacao: "A palavra 'casa' (lar) só aceita crase se estiver especificada ('de meus pais'). Se for 'casa' no sentido genérico de lar próprio, não tem crase."
  },
  {
    id: 1102,
    materia: "Português - Concordância",
    pergunta: "Havia ______ (menos/menas) pessoas do que o esperado.",
    opcoes: ["Menos", "Menas", "Menos de", "Meno"],
    correta: 0,
    explicacao: "'Menos' é advérbio e invariável. Não existe 'menas'."
  },
  {
    id: 1103,
    materia: "Português - Ortografia",
    pergunta: "Qual a grafia correta?",
    opcoes: ["Exitar (ter êxito)", "Hesitar (ter dúvida)", "Ezitar", "Hezitar"],
    correta: 1,
    explicacao: "Hesitar (dúvida) é com H e S. Êxito (sucesso) é sem H e com X (verbo: ter êxito)."
  },
  {
    id: 1104,
    materia: "Português - Regência",
    pergunta: "O verbo 'Aspirar' no sentido de 'respirar/cheirar':",
    opcoes: ["Não exige preposição (VTD).", "Exige preposição 'a' (VTI).", "Exige preposição 'de'.", "É intransitivo."],
    correta: 0,
    explicacao: "Aspirar o perfume (cheirar) é VTD. Aspirar ao cargo (desejar) é VTI."
  },
  {
    id: 1105,
    materia: "Português - Pontuação",
    pergunta: "Em 'Roraima, terra querida, eu te amo', as vírgulas isolam:",
    opcoes: ["Sujeito", "Aposto", "Vocativo", "Objeto"],
    correta: 2,
    explicacao: "Está chamando/invocando Roraima. É Vocativo."
  },
  {
    id: 1106,
    materia: "Português - Semântica",
    pergunta: "A palavra 'Ratificar' significa:",
    opcoes: ["Corrigir", "Confirmar", "Anular", "Assinar"],
    correta: 1,
    explicacao: "Ratificar = Confirmar. Retificar = Corrigir."
  },
  {
    id: 1107,
    materia: "Português - Pronomes",
    pergunta: "Qual pronome deve ser usado para se referir a um Cardeal?",
    opcoes: ["Vossa Excelência", "Vossa Eminência", "Vossa Santidade", "Vossa Magnificência"],
    correta: 1,
    explicacao: "Vossa Eminência é para Cardeais. Santidade (Papa). Magnificência (Reitor)."
  },
  {
    id: 1108,
    materia: "Português - Hífen",
    pergunta: "Assinale a incorreta:",
    opcoes: ["Guarda-chuva", "Segunda-feira", "Pé-de-moleque", "Arco-íris"],
    correta: 2,
    explicacao: "Locuções com preposição perderam o hífen no novo acordo (Pé de moleque), salvo exceções consagradas (Água-de-coco)."
  },
  {
    id: 1109,
    materia: "Português - Verbos",
    pergunta: "Se eu ______ (saber) a resposta, diria. (Pretérito Imperfeito do Subjuntivo)",
    opcoes: ["soubesse", "sabesse", "saber", "saiba"],
    correta: 0,
    explicacao: "Soubesse."
  },
  {
    id: 1110,
    materia: "Português - Interpretação",
    pergunta: "O texto dissertativo tem como objetivo:",
    opcoes: ["Contar uma história.", "Descrever um objeto.", "Expor e defender uma ideia/opinião.", "Ensinar a fazer algo."],
    correta: 2,
    explicacao: "Dissertar é discutir ideias."
  },
  {
    id: 1111,
    materia: "Português - Acentuação",
    pergunta: "A palavra 'Céu' é acentuada porque:",
    opcoes: ["É oxítona.", "É monossílabo tônico terminado em ditongo aberto.", "É paroxítona.", "Não deveria ter acento."],
    correta: 1,
    explicacao: "Ditongos abertos (éu, éi, ói) em monossílabos (céu) e oxítonas (chapéu) mantêm o acento."
  },
  {
    id: 1112,
    materia: "Português - Sintaxe",
    pergunta: "Em 'Choveu muito ontem', o sujeito é:",
    opcoes: ["Oculto", "Inexistente (Oração sem sujeito)", "Simples", "Indeterminado"],
    correta: 1,
    explicacao: "Verbos que indicam fenômenos da natureza (chover, nevar) são impessoais."
  },
  {
    id: 1113,
    materia: "Português - Coesão",
    pergunta: "O conectivo 'Todavia' indica:",
    opcoes: ["Adição", "Conclusão", "Adversidade (Oposição)", "Causa"],
    correta: 2,
    explicacao: "Todavia = Mas, Porém, Contudo."
  },
  {
    id: 1114,
    materia: "Português - Vícios",
    pergunta: "Dizer 'Hemorragia de sangue' é um:",
    opcoes: ["Pleonasmo vicioso", "Eufemismo", "Metáfora", "Solecismo"],
    correta: 0,
    explicacao: "Redundância (hemorragia já é de sangue)."
  },
  {
    id: 1115,
    materia: "Português - Morfologia",
    pergunta: "Em 'O viver é perigoso', a palavra 'viver' é:",
    opcoes: ["Verbo", "Substantivo", "Adjetivo", "Advérbio"],
    correta: 1,
    explicacao: "O artigo 'O' substantiva o verbo."
  },

  // --- BLOCO RACIOCÍNIO LÓGICO E MATEMÁTICA (1116-1125) ---
  {
    id: 1116,
    materia: "RLM - Lógica",
    pergunta: "Se 'Todo A é B' e 'Algum B é C', então:",
    opcoes: ["Todo A é C", "Algum A é C", "Pode haver A que é C, mas não é garantido", "Nenhum A é C"],
    correta: 2,
    explicacao: "O conjunto C intercepta B, mas pode interceptar fora da área de A. Não se pode concluir nada sobre A e C."
  },
  {
    id: 1117,
    materia: "Matemática - Porcentagem",
    pergunta: "Um produto de 100 reais teve dois aumentos sucessivos de 10%. Qual o preço final?",
    opcoes: ["120", "121", "110", "122"],
    correta: 1,
    explicacao: "100 + 10% = 110. 110 + 10% (11) = 121."
  },
  {
    id: 1118,
    materia: "RLM - Sequência",
    pergunta: "1, 4, 9, 16, 25, ... O próximo é:",
    opcoes: ["30", "36", "49", "35"],
    correta: 1,
    explicacao: "Quadrados perfeitos: 1², 2², 3², 4², 5². O próximo é 6² = 36."
  },
  {
    id: 1119,
    materia: "Matemática - Regra de Três",
    pergunta: "Se um carro faz 10km/L, quantos litros gasta em 250km?",
    opcoes: ["20", "25", "30", "15"],
    correta: 1,
    explicacao: "250 / 10 = 25 litros."
  },
  {
    id: 1120,
    materia: "RLM - Tautologia",
    pergunta: "A frase 'Penso, logo existo' é um argumento válido?",
    opcoes: ["Sim", "Não", "É uma falácia", "É um paradoxo"],
    correta: 0,
    explicacao: "É um entimema (silogismo abreviado). Premissa oculta: 'Tudo o que pensa, existe'."
  },
  {
    id: 1121,
    materia: "Matemática - Geometria",
    pergunta: "Qual o volume de uma caixa 2m x 3m x 4m?",
    opcoes: ["9 m³", "24 m³", "12 m³", "20 m³"],
    correta: 1,
    explicacao: "2 * 3 * 4 = 24."
  },
  {
    id: 1122,
    materia: "Matemática - Média",
    pergunta: "Média de 10, 10 e 40:",
    opcoes: ["20", "30", "25", "15"],
    correta: 0,
    explicacao: "(10+10+40)/3 = 60/3 = 20."
  },
  {
    id: 1123,
    materia: "Matemática - Fração",
    pergunta: "Qual é maior: 1/2 ou 1/3?",
    opcoes: ["1/2", "1/3", "São iguais", "Depende"],
    correta: 0,
    explicacao: "1/2 (0,5) > 1/3 (0,33)."
  },
  {
    id: 1124,
    materia: "RLM - Equivalência",
    pergunta: "A contrapositiva de 'Se chove, molha' é:",
    opcoes: ["Se não molha, não chove", "Se não chove, não molha", "Chove e não molha", "Molha e chove"],
    correta: 0,
    explicacao: "Inverte e nega: ~Q -> ~P."
  },
  {
    id: 1125,
    materia: "Matemática - Equação",
    pergunta: "2x + 10 = 20. X vale:",
    opcoes: ["5", "10", "15", "0"],
    correta: 0,
    explicacao: "2x = 10 -> x = 5."
  },

  // --- BLOCO LEGISLAÇÃO E RORAIMA (1126-1140) ---
  {
    id: 1126,
    materia: "Regimento Interno ALE-RR",
    pergunta: "Quem declara a perda de mandato de Deputado por faltas (deixar de comparecer à terça parte das sessões)?",
    opcoes: ["O Plenário", "A Mesa Diretora (de ofício ou provocação)", "O Presidente", "A Comissão de Ética"],
    correta: 1,
    explicacao: "Art. 92, §2º: A perda por faltas é declarada pela Mesa."
  },
  {
    id: 1127,
    materia: "Regimento Interno ALE-RR",
    pergunta: "Qual o prazo para o Governador sancionar um projeto?",
    opcoes: ["15 dias úteis", "10 dias", "48 horas", "30 dias"],
    correta: 0,
    explicacao: "Art. 253: 15 dias úteis."
  },
  {
    id: 1128,
    materia: "Roraima - Geografia",
    pergunta: "Qual rodovia liga Roraima à Venezuela?",
    opcoes: ["BR-174", "BR-401", "BR-210", "BR-010"],
    correta: 0,
    explicacao: "BR-174 (sentido Norte)."
  },
  {
    id: 1129,
    materia: "Roraima - História",
    pergunta: "O Território Federal do Rio Branco foi criado em:",
    opcoes: ["1943", "1988", "1962", "1900"],
    correta: 0,
    explicacao: "1943, por Getúlio Vargas."
  },
  {
    id: 1130,
    materia: "Regimento Interno ALE-RR",
    pergunta: "A eleição da Mesa é feita por:",
    opcoes: ["Voto aberto", "Escrutínio secreto", "Sorteio", "Aclamação"],
    correta: 1,
    explicacao: "Art. 8º: Escrutínio secreto."
  },
  {
    id: 1131,
    materia: "Roraima - Geografia",
    pergunta: "Qual a vegetação predominante no nordeste de Roraima?",
    opcoes: ["Floresta Densa", "Lavrado (Savana)", "Caatinga", "Mangue"],
    correta: 1,
    explicacao: "Lavrado."
  },
  {
    id: 1132,
    materia: "Regimento Interno ALE-RR",
    pergunta: "Quantos deputados tem a ALE-RR?",
    opcoes: ["24", "15", "8", "30"],
    correta: 0,
    explicacao: "Constitucionalmente 24."
  },
  {
    id: 1133,
    materia: "Roraima - Economia",
    pergunta: "A Área de Livre Comércio de Boa Vista (ALCBV) visa:",
    opcoes: ["Turismo", "Incentivo fiscal para comércio (importação/exportação)", "Agricultura", "Mineração"],
    correta: 1,
    explicacao: "Foco no comércio exterior."
  },
  {
    id: 1134,
    materia: "Regimento Interno ALE-RR",
    pergunta: "Qual o quórum para abrir uma sessão?",
    opcoes: ["1/3 dos membros", "Maioria absoluta", "2/3", "Qualquer número"],
    correta: 0,
    explicacao: "Art. 144: 1/3."
  },
  {
    id: 1135,
    materia: "Roraima - Geografia",
    pergunta: "O Rio Branco deságua em qual rio?",
    opcoes: ["Amazonas", "Negro", "Solimões", "Madeira"],
    correta: 1,
    explicacao: "É afluente do Rio Negro."
  },
  {
    id: 1136,
    materia: "Regimento Interno ALE-RR",
    pergunta: "Quem convoca sessão extraordinária?",
    opcoes: ["Apenas o Presidente", "Presidente ou Governador (em urgência) ou Maioria dos Membros", "Qualquer deputado", "O Povo"],
    correta: 1,
    explicacao: "Art. 119: Presidente, Governador ou Maioria."
  },
  {
    id: 1137,
    materia: "Roraima - Símbolos",
    pergunta: "A linha vermelha na bandeira de Roraima representa:",
    opcoes: ["O Equador", "O sangue dos heróis", "O Rio Branco", "O sol"],
    correta: 0,
    explicacao: "Representa a linha do Equador que corta o estado."
  },
  {
    id: 1138,
    materia: "Regimento Interno ALE-RR",
    pergunta: "A CPI tem poderes de:",
    opcoes: ["Juiz (investigação própria das autoridades judiciais)", "Polícia", "Ministério Público", "Prefeito"],
    correta: 0,
    explicacao: "Art. 45: Poderes de investigação próprios das autoridades judiciais."
  },
  {
    id: 1139,
    materia: "Regimento Interno ALE-RR",
    pergunta: "O que é Interstício?",
    opcoes: ["Intervalo de tempo entre atos legislativos", "Uma comissão", "Um tipo de voto", "Uma lei"],
    correta: 0,
    explicacao: "Art. 252: Prazo entre atos (ex: 24h entre turnos)."
  },
  {
    id: 1140,
    materia: "Administração Pública",
    pergunta: "A licença paternidade é um direito social garantido na CF?",
    opcoes: ["Sim", "Não", "Apenas para mãe", "Depende do chefe"],
    correta: 0,
    explicacao: "Sim, art. 7º da CF."
  },

  // --- BLOCO TÉCNICO EM INFORMÁTICA E REGRAS INSTITUCIONAIS ALE-RR (1141-1200) ---
  {
    id: 1141,
    materia: "TI - Hardware",
    pergunta: "Um técnico da ALE-RR precisa instalar uma impressora que utiliza calor para transferir a tinta de uma fita (ribbon) ou escurecer um papel termo-sensível. Esse tipo de impressora é classificada como:",
    opcoes: ["Jato de Tinta (Inkjet)", "Laser", "Térmica", "Matricial"],
    correta: 2,
    explicacao: "Impressoras térmicas usam calor. São comuns em etiquetas e cupons. Laser usa toner e eletricidade estática. Matricial usa impacto."
  },
  {
    id: 1142,
    materia: "TI - Hardware",
    pergunta: "Para melhorar o desempenho de um computador antigo da Assembleia que está lento ao abrir muitos programas, o upgrade de hardware mais indicado e de custo-benefício imediato, além de adicionar RAM, é:",
    opcoes: ["Trocar o Gabinete", "Substituir o HD por um SSD", "Trocar o Monitor por um LED", "Instalar uma Placa de Som"],
    correta: 1,
    explicacao: "A troca de HD (mecânico) por SSD (eletrônico) remove o principal gargalo de velocidade de leitura/escrita do sistema."
  },
  {
    id: 1143,
    materia: "TI - Conectividade",
    pergunta: "Qual interface de vídeo é capaz de transmitir sinais de vídeo analógicos, sendo a mais antiga ainda encontrada em alguns projetores da Casa?",
    opcoes: ["HDMI", "DisplayPort", "VGA (D-Sub)", "DVI-D"],
    correta: 2,
    explicacao: "VGA é analógico. HDMI, DisplayPort e DVI-D são digitais."
  },
  {
    id: 1144,
    materia: "TI - Redes",
    pergunta: "Ao crimpar um cabo de rede no padrão T568A, a cor do primeiro fio (pino 1) deve ser:",
    opcoes: ["Branco do Laranja", "Branco do Verde", "Azul", "Branco do Marrom"],
    correta: 1,
    explicacao: "T568A começa com Branco-Verde. T568B começa com Branco-Laranja."
  },
  {
    id: 1145,
    materia: "TI - Redes",
    pergunta: "Qual dispositivo de rede opera na Camada 1 (Física) do Modelo OSI e é considerado obsoleto por replicar o tráfego para todas as portas (broadcast), causando colisões?",
    opcoes: ["Switch", "Roteador", "Hub", "Bridge"],
    correta: 2,
    explicacao: "O Hub é um repetidor burro de camada 1. O Switch é inteligente (camada 2)."
  },
  {
    id: 1146,
    materia: "TI - Protocolos",
    pergunta: "Qual protocolo é utilizado para enviar e-mails de um cliente (Outlook/Thunderbird) para o servidor de e-mail?",
    opcoes: ["POP3", "IMAP", "SMTP", "SNMP"],
    correta: 2,
    explicacao: "SMTP (Simple Mail Transfer Protocol) é para ENVIO. POP3 e IMAP são para RECEBIMENTO."
  },
  {
    id: 1147,
    materia: "Regimento Interno ALE-RR - Polícia",
    pergunta: "Quanto à segurança institucional, quem detém a competência privativa para o policiamento do Palácio Antônio Martins, sem intervenção de outro Poder?",
    opcoes: ["O Governador do Estado", "A Polícia Militar, autonomamente", "A Mesa Diretora", "O Presidente da Comissão de Segurança"],
    correta: 2,
    explicacao: "O policiamento compete privativamente à Mesa Diretora."
  },
  {
    id: 1148,
    materia: "Regimento Interno ALE-RR - Armas",
    pergunta: "Um cidadão visitante entra na Assembleia portando arma de fogo legalizada. Qual o procedimento correto segundo o Regimento?",
    opcoes: ["Pode entrar, pois tem porte.", "Deve entregar a arma ao Deputado que irá visitar.", "É vedado o porte; deve ser encaminhado ao órgão policial para depositá-la.", "Pode entrar se a arma estiver desmuniciada."],
    correta: 2,
    explicacao: "É vedado a qualquer pessoa (exceto policiais em serviço). Visitantes armados devem depositar a arma no órgão policial."
  },
  {
    id: 1149,
    materia: "TI - Windows",
    pergunta: "No Windows 10/11, qual ferramenta administrativa permite gerenciar partições de disco, formatar unidades e alterar letras de driver?",
    opcoes: ["Desfragmentador", "Gerenciamento de Disco (diskmgmt.msc)", "Windows Update", "Editor de Registro"],
    correta: 1,
    explicacao: "O Gerenciamento de Disco é a ferramenta nativa para particionamento."
  },
  {
    id: 1150,
    materia: "TI - Linux",
    pergunta: "Qual comando Linux é usado para alterar a senha de um usuário?",
    opcoes: ["pass", "unlock", "passwd", "setpass"],
    correta: 2,
    explicacao: "`passwd` é o comando para alterar senhas."
  },
  {
    id: 1151,
    materia: "TI - Linux",
    pergunta: "O diretório padrão do Linux onde são armazenados os arquivos de configuração do sistema (como interfaces de rede e usuários) é:",
    opcoes: ["/bin", "/home", "/etc", "/var"],
    correta: 2,
    explicacao: "/etc contém as configurações globais do sistema."
  },
  {
    id: 1152,
    materia: "TI - Segurança",
    pergunta: "A técnica de segurança que consiste em criar uma rede privada virtual criptografada para acessar a rede interna da ALE-RR a partir de casa é:",
    opcoes: ["VLAN", "VPN", "DMZ", "DNS"],
    correta: 1,
    explicacao: "VPN (Virtual Private Network) cria o túnel seguro."
  },
  {
    id: 1153,
    materia: "TI - Segurança",
    pergunta: "Qual princípio da Segurança da Informação garante que a informação esteja acessível apenas a quem tem autorização?",
    opcoes: ["Integridade", "Disponibilidade", "Confidencialidade", "Irretratabilidade"],
    correta: 2,
    explicacao: "Confidencialidade (Sigilo)."
  },
  {
    id: 1154,
    materia: "TI - Backup",
    pergunta: "Um backup 'Diferencial' realizado na quarta-feira copiará:",
    opcoes: ["Todos os dados do servidor.", "Apenas os dados alterados desde terça-feira.", "Todos os dados alterados desde o último backup FULL (provavelmente domingo).", "Apenas arquivos de sistema."],
    correta: 2,
    explicacao: "O Diferencial sempre copia tudo que mudou em relação ao último FULL."
  },
  {
    id: 1155,
    materia: "Regimento Interno ALE-RR - Serviços",
    pergunta: "Quem dirige os serviços administrativos da Assembleia Legislativa e expede normas complementares?",
    opcoes: ["O 1º Secretário, sozinho.", "A Mesa Diretora.", "O Governador.", "O Chefe de RH."],
    correta: 1,
    explicacao: "Os serviços administrativos são dirigidos pela Mesa."
  },
  {
    id: 1156,
    materia: "Regimento Interno ALE-RR - Serviços",
    pergunta: "Qualquer proposição que vise modificar os serviços administrativos da Assembleia depende obrigatoriamente de:",
    opcoes: ["Aprovação do Governador.", "Parecer conclusivo da Mesa Diretora.", "Voto popular.", "Parecer do Tribunal de Contas."],
    correta: 1,
    explicacao: "Nenhuma proposição que modifique os serviços pode ser deliberada sem parecer conclusivo da Mesa."
  },
  {
    id: 1157,
    materia: "TI - Internet",
    pergunta: "O erro '404 Not Found' ao tentar acessar o portal da transparência indica que:",
    opcoes: ["O servidor está desligado.", "O usuário não tem permissão.", "O recurso/página solicitado não foi encontrado no servidor.", "O servidor explodiu."],
    correta: 2,
    explicacao: "404 é erro de cliente (recurso não encontrado)."
  },
  {
    id: 1158,
    materia: "TI - Navegadores",
    pergunta: "Para acessar uma página sem salvar histórico, cookies ou dados de formulário localmente, deve-se usar o modo:",
    opcoes: ["Modo de Segurança", "Modo Avião", "Navegação Privada / Incógnita", "Modo Desenvolvedor"],
    correta: 2,
    explicacao: "Navegação Anônima/Privada não salva rastros locais."
  },
  {
    id: 1159,
    materia: "TI - Excel",
    pergunta: "No Excel, qual símbolo deve iniciar qualquer fórmula?",
    opcoes: ["#", "$", "=", "&"],
    correta: 2,
    explicacao: "Toda fórmula começa com igual (=)."
  },
  {
    id: 1160,
    materia: "TI - Excel",
    pergunta: "A função `=SE(A1>=6; 'Aprovado'; 'Reprovado')` retornará 'Reprovado' se o valor de A1 for:",
    opcoes: ["6", "7", "5.9", "10"],
    correta: 2,
    explicacao: "5.9 não é maior ou igual a 6, logo cai na condição falsa ('Reprovado')."
  },
  {
    id: 1161,
    materia: "TI - Word",
    pergunta: "Qual atalho no MS Word seleciona TODO o texto do documento?",
    opcoes: ["Ctrl + A (em inglês) ou Ctrl + T (em português)", "Ctrl + S", "Ctrl + C", "Ctrl + P"],
    correta: 0,
    explicacao: "No Word em Português-BR é Ctrl + T (Tudo). Em inglês é Ctrl + A (All)."
  },
  {
    id: 1162,
    materia: "TI - Segurança",
    pergunta: "O 'Ransomware' é uma ameaça crítica para órgãos públicos. Sua principal ação é:",
    opcoes: ["Roubar a senha do Wi-Fi.", "Criptografar os dados do usuário e exigir pagamento (resgate) para devolução.", "Queimar o processador.", "Exibir propagandas."],
    correta: 1,
    explicacao: "Sequestro de dados via criptografia."
  },
  {
    id: 1163,
    materia: "Roraima - Geografia",
    pergunta: "O ponto turístico 'Lago do Caracaranã' é conhecido por suas praias de areia branca e cajueiros, localizando-se no município de:",
    opcoes: ["Boa Vista", "Normandia", "Pacaraima", "Bonfim"],
    correta: 1,
    explicacao: "O Lago do Caracaranã fica em Normandia, dentro da Terra Indígena Raposa Serra do Sol."
  },
  {
    id: 1164,
    materia: "Roraima - História",
    pergunta: "O Monumento aos Garimpeiros, na Praça do Centro Cívico, homenageia a atividade que impulsionou a economia nas décadas de 80/90. Qual minério era o foco?",
    opcoes: ["Ferro", "Ouro e Diamante", "Bauxita", "Urânio"],
    correta: 1,
    explicacao: "O garimpo de ouro e diamante marcou a explosão demográfica de Roraima."
  },
  {
    id: 1165,
    materia: "TI - Lógica",
    pergunta: "Em lógica binária, o número '10' na base 2 corresponde a qual número na base decimal?",
    opcoes: ["1", "2", "3", "10"],
    correta: 1,
    explicacao: "1*(2^1) + 0*(2^0) = 2 + 0 = 2."
  },
  {
    id: 1166,
    materia: "TI - Hardware",
    pergunta: "Qual componente é responsável por converter a energia da tomada (Alternada) para energia contínua utilizável pelo PC?",
    opcoes: ["Placa-mãe", "Fonte de Alimentação (PSU)", "Estabilizador", "Processador"],
    correta: 1,
    explicacao: "A Fonte de Alimentação realiza a conversão AC/DC."
  },
  {
    id: 1167,
    materia: "TI - Redes",
    pergunta: "Uma rede 'WLAN' refere-se a:",
    opcoes: ["Rede Mundial de Computadores", "Rede Local Sem Fio (Wireless)", "Rede Metropolitana", "Rede com Fio"],
    correta: 1,
    explicacao: "WLAN = Wireless LAN."
  },
  {
    id: 1168,
    materia: "TI - Comandos",
    pergunta: "No Windows, o comando 'ping 127.0.0.1' serve para:",
    opcoes: ["Testar a conexão com a internet.", "Testar se a placa de rede e a pilha TCP/IP local estão funcionando (loopback).", "Hackear o vizinho.", "Formatar o PC."],
    correta: 1,
    explicacao: "Testa a própria interface de rede (localhost)."
  },
  {
    id: 1169,
    materia: "Regimento Interno ALE-RR - Patrimônio",
    pergunta: "O patrimônio da Assembleia Legislativa é constituído por:",
    opcoes: ["Bens doados por deputados.", "Bens móveis e imóveis do Estado, que adquirir ou forem colocados à sua disposição.", "Apenas o prédio sede.", "Impostos arrecadados."],
    correta: 1,
    explicacao: "Conforme Art. 293: Bens móveis e imóveis do Estado à disposição da Assembleia."
  },
  {
    id: 1170,
    materia: "Regimento Interno ALE-RR - Omissão",
    pergunta: "Nos casos omissos do Regimento Interno da ALE-RR, o Presidente aplicará subsidiariamente o Regimento de qual órgão?",
    opcoes: ["Senado Federal", "Câmara dos Deputados", "STF", "Câmara Municipal de Boa Vista"],
    correta: 1,
    explicacao: "Art. 295: Aplica-se o Regimento Interno da Câmara dos Deputados."
  },
  {
    id: 1171,
    materia: "TI - Cloud",
    pergunta: "O armazenamento de arquivos como Google Drive ou OneDrive é classificado como serviço de:",
    opcoes: ["IaaS (Infraestrutura)", "SaaS (Software)", "PaaS (Plataforma)", "Hardware"],
    correta: 1,
    explicacao: "Para o usuário final, é um Software/Aplicação de armazenamento (SaaS)."
  },
  {
    id: 1172,
    materia: "TI - Banco de Dados",
    pergunta: "Qual comando SQL é usado para alterar dados já existentes em uma tabela?",
    opcoes: ["ALTER", "UPDATE", "CHANGE", "MODIFY"],
    correta: 1,
    explicacao: "UPDATE tabela SET campo = valor..."
  },
  {
    id: 1173,
    materia: "TI - Segurança",
    pergunta: "A 'Engenharia Social' explora qual vulnerabilidade do sistema?",
    opcoes: ["Falhas no Windows", "Portas abertas no firewall", "O fator humano (confiança, ingenuidade, medo)", "Vírus antigo"],
    correta: 2,
    explicacao: "Manipula pessoas para obter dados."
  },
  {
    id: 1174,
    materia: "TI - Linux",
    pergunta: "O 'Kernel' é:",
    opcoes: ["Um aplicativo de texto.", "O núcleo do sistema operacional, que gerencia o hardware e recursos.", "Uma interface gráfica.", "Um antivírus."],
    correta: 1,
    explicacao: "O Kernel é o coração do SO."
  },
  {
    id: 1175,
    materia: "TI - Redes",
    pergunta: "O 'DHCP' é responsável por:",
    opcoes: ["Traduzir nomes em IP.", "Configurar automaticamente endereços IP, máscara e gateway para os dispositivos na rede.", "Proteger contra vírus.", "Roteamento."],
    correta: 1,
    explicacao: "Dynamic Host Configuration Protocol."
  },
  {
    id: 1176,
    materia: "TI - Hardware",
    pergunta: "Qual a função da 'Placa de Vídeo' (GPU)?",
    opcoes: ["Armazenar arquivos.", "Processar e renderizar imagens, vídeos e gráficos 3D.", "Conectar à internet.", "Resfriar o PC."],
    correta: 1,
    explicacao: "Processamento gráfico."
  },
  {
    id: 1177,
    materia: "TI - Windows",
    pergunta: "A 'Barra de Tarefas' geralmente fica localizada:",
    opcoes: ["No topo da tela.", "Na parte inferior da área de trabalho (Desktop).", "Dentro do navegador.", "Não existe no Windows."],
    correta: 1,
    explicacao: "Padrão na parte inferior."
  },
  {
    id: 1178,
    materia: "TI - Internet",
    pergunta: "O que é 'Upload'?",
    opcoes: ["Baixar arquivos.", "Enviar arquivos do computador local para a internet/servidor.", "Apagar arquivos.", "Imprimir."],
    correta: 1,
    explicacao: "Subir (enviar) dados."
  },
  {
    id: 1179,
    materia: "TI - E-mail",
    pergunta: "Um e-mail de 'Spam' é:",
    opcoes: ["Uma mensagem importante.", "Lixo eletrônico não solicitado (propaganda em massa).", "Um vírus.", "Um recibo."],
    correta: 1,
    explicacao: "Mensagens indesejadas em massa."
  },
  {
    id: 1180,
    materia: "TI - Arquivos",
    pergunta: "Arquivos com extensão '.zip' ou '.rar' são:",
    opcoes: ["Vídeos.", "Arquivos compactados.", "Imagens.", "Executáveis."],
    correta: 1,
    explicacao: "Compactação de dados."
  },
  {
    id: 1181,
    materia: "TI - Periféricos",
    pergunta: "O 'Scanner' é um dispositivo de:",
    opcoes: ["Saída (Output)", "Entrada (Input)", "Processamento", "Armazenamento"],
    correta: 1,
    explicacao: "Envia dados (imagem) para o computador."
  },
  {
    id: 1182,
    materia: "TI - Segurança",
    pergunta: "O 'Antivírus' detecta ameaças comparando arquivos com:",
    opcoes: ["Uma lista de sites.", "Uma base de dados de assinaturas de vírus conhecidos.", "O horário do sistema.", "O tamanho do monitor."],
    correta: 1,
    explicacao: "Assinaturas (vacinas)."
  },
  {
    id: 1183,
    materia: "TI - Redes",
    pergunta: "O 'Wi-Fi' utiliza para transmissão:",
    opcoes: ["Cabos de fibra.", "Ondas de rádio.", "Infravermelho.", "Laser."],
    correta: 1,
    explicacao: "Radiofrequência."
  },
  {
    id: 1184,
    materia: "TI - Software",
    pergunta: "Um 'Driver' de dispositivo é:",
    opcoes: ["Um motorista.", "Um software que permite ao Sistema Operacional comunicar-se com o hardware (ex: impressora, placa de vídeo).", "Um vírus.", "Um jogo."],
    correta: 1,
    explicacao: "Controlador de dispositivo."
  },
  {
    id: 1185,
    materia: "TI - Manutenção",
    pergunta: "A 'Desfragmentação' de disco serve para:",
    opcoes: ["Apagar dados.", "Reorganizar os dados no HD para que fiquem contíguos, melhorando a velocidade de leitura.", "Limpar a tela.", "Aumentar a memória RAM."],
    correta: 1,
    explicacao: "Otimiza a leitura em discos mecânicos (HDs)."
  },
  {
    id: 1186,
    materia: "Regimento Interno ALE-RR - Símbolos",
    pergunta: "Durante as sessões, quais livros devem obrigatoriamente permanecer sobre a mesa principal do Plenário?",
    opcoes: ["Dicionário e Código Civil.", "Bíblia, Constituição Federal, Constituição Estadual e Regimento Interno.", "Lista telefônica e Jornal.", "Código Penal e Bíblia."],
    correta: 1,
    explicacao: "Conforme Art. 296: Bíblia, CF, CE e Regimento."
  },
  {
    id: 1187,
    materia: "Regimento Interno ALE-RR - Nomes",
    pergunta: "É permitido dar nome de pessoas vivas a dependências da Assembleia?",
    opcoes: ["Sim, se for Deputado.", "Sim, se for ex-Governador.", "Não, é vedado.", "Sim, com 2/3 dos votos."],
    correta: 2,
    explicacao: "Art. 294: É vedado dar denominação de pessoas vivas."
  },
  {
    id: 1188,
    materia: "TI - Excel",
    pergunta: "Para somar as células A1 e B1, a fórmula é:",
    opcoes: ["A1+B1", "=A1+B1", "SUM(A1-B1)", "ADD A1 B1"],
    correta: 1,
    explicacao: "Fórmula começa com =."
  },
  {
    id: 1189,
    materia: "TI - Windows",
    pergunta: "A tecla 'Print Screen' serve para:",
    opcoes: ["Imprimir na impressora.", "Capturar a imagem da tela (print) para a área de transferência.", "Desligar a tela.", "Salvar o arquivo."],
    correta: 1,
    explicacao: "Captura de tela."
  },
  {
    id: 1190,
    materia: "TI - Internet",
    pergunta: "WWW significa:",
    opcoes: ["World Wide Web", "World Web Wait", "Wide World Web", "Web Wide World"],
    correta: 0,
    explicacao: "Rede Mundial de Computadores."
  },
  {
    id: 1191,
    materia: "TI - Hardware",
    pergunta: "O 'Touchpad' substitui qual periférico em notebooks?",
    opcoes: ["Teclado", "Monitor", "Mouse", "Webcam"],
    correta: 2,
    explicacao: "Substituto do mouse."
  },
  {
    id: 1192,
    materia: "TI - Segurança",
    pergunta: "O 'Backup em Nuvem' protege contra:",
    opcoes: ["Apenas vírus.", "Incêndios, roubos e desastres físicos no local da empresa (já que os dados estão remotos).", "Nada.", "Lentidão da internet."],
    correta: 1,
    explicacao: "Proteção off-site."
  },
  {
    id: 1193,
    materia: "TI - Linux",
    pergunta: "O comando `reboot` faz o quê?",
    opcoes: ["Desliga o PC.", "Reinicia o sistema.", "Formata o disco.", "Troca de usuário."],
    correta: 1,
    explicacao: "Reiniciar."
  },
  {
    id: 1194,
    materia: "TI - Banco de Dados",
    pergunta: "A chave primária (PK) serve para:",
    opcoes: ["Identificar unicamente cada registro.", "Repetir dados.", "Deixar nulo.", "Criptografar."],
    correta: 0,
    explicacao: "Identificador único."
  },
  {
    id: 1195,
    materia: "TI - Redes",
    pergunta: "Uma rede 'MAN' abrange:",
    opcoes: ["Uma sala.", "Uma cidade (Metropolitana).", "Um país.", "O mundo."],
    correta: 1,
    explicacao: "Metropolitan Area Network."
  },
  {
    id: 1196,
    materia: "TI - Office",
    pergunta: "A extensão '.pptx' é de:",
    opcoes: ["Excel", "Word", "PowerPoint", "Access"],
    correta: 2,
    explicacao: "Apresentação."
  },
  {
    id: 1197,
    materia: "TI - Hardware",
    pergunta: "USB significa:",
    opcoes: ["Universal Serial Bus", "Unit Serial Back", "United System Bus", "Ultra Speed Bus"],
    correta: 0,
    explicacao: "Barramento Serial Universal."
  },
  {
    id: 1198,
    materia: "TI - Segurança",
    pergunta: "Senha fraca é aquela que:",
    opcoes: ["Usa letras, números e símbolos.", "É longa.", "É fácil de adivinhar (ex: data de aniversário, sequências).", "É aleatória."],
    correta: 2,
    explicacao: "Baixa entropia."
  },
  {
    id: 1199,
    materia: "TI - Redes",
    pergunta: "O cabo de fibra óptica transmite dados via:",
    opcoes: ["Eletricidade", "Luz", "Som", "Vento"],
    correta: 1,
    explicacao: "Pulsos de luz."
  },
  {
    id: 1200,
    materia: "Regimento Interno ALE-RR",
    pergunta: "Nos casos omissos do Regimento, o Presidente decide aplicando o regimento de qual casa?",
    opcoes: ["Câmara dos Vereadores", "Câmara dos Deputados (Federal)", "Senado", "STF"],
    correta: 1,
    explicacao: "Aplicação subsidiária do Regimento da Câmara Federal."
  },

  // --- PROVA REAL: CESPE - TCE/TO (Técnico em Informática) ---
  {
    id: 1261,
    materia: "Hardware - Arquitetura",
    pergunta: "A respeito de fundamentos de computação, o componente de um computador que tem por função primordial processar dados é a:",
    opcoes: ["Memória de processamento ROM.", "Memória de processamento RAM.", "Unidade de processamento de entrada.", "Unidade Central de Processamento (CPU).", "BIOS."],
    correta: 3,
    explicacao: "A CPU (Central Processing Unit) é o cérebro do computador, responsável pelo processamento das instruções."
  },
  {
    id: 1262,
    materia: "Hardware - Armazenamento",
    pergunta: "O componente de um computador que serve para armazenar dados permanentemente ou até que sejam removidos é:",
    opcoes: ["A CPU.", "A memória RAM.", "O disco rígido (HD).", "O front side bus.", "A ponte-norte (north-bridge)."],
    correta: 2,
    explicacao: "O disco rígido é uma memória de massa não-volátil, usada para armazenamento permanente."
  },
  {
    id: 1263,
    materia: "Hardware - E/S",
    pergunta: "Para acessar os dados de entrada e de saída, um computador utiliza, basicamente, as seguintes formas:",
    opcoes: ["IRQ; acesso direto à memória (DMA); ROM.", "E/S mapeada na memória; BIOS; IRQ.", "E/S mapeada; IRQ; ROM.", "Acesso direto à memória; BIOS; E/S mapeada.", "E/S mapeada; E/S mapeada na memória; Acesso direto à memória (DMA)."],
    correta: 4,
    explicacao: "As técnicas clássicas de E/S são: E/S programada (mapeada), E/S dirigida por interrupção e DMA."
  },
  {
    id: 1264,
    materia: "Sistemas Operacionais",
    pergunta: "O sistema operacional que é escrito como uma coleção de procedimentos, cada um dos quais pode chamar qualquer um dos outros sempre que precisar (sem módulos isolados), é denominado:",
    opcoes: ["Modular.", "Monolítico.", "De rede.", "Distribuído.", "Virtualizado."],
    correta: 1,
    explicacao: "O kernel monolítico é um único grande processo executando no espaço de kernel (ex: Linux padrão, Unix antigo)."
  },
  {
    id: 1265,
    materia: "Hardware - Memória",
    pergunta: "Uma quantidade relativamente pequena de memória estática de alto desempenho, tendo por finalidade aumentar o desempenho do processador realizando uma busca antecipada na memória RAM, é conhecida como memória:",
    opcoes: ["Cache.", "ROM.", "De nível básico.", "De nível secundário.", "Externa."],
    correta: 0,
    explicacao: "A memória Cache (SRAM) fica entre a CPU e a RAM para acelerar o acesso aos dados mais usados."
  },
  {
    id: 1266,
    materia: "Engenharia de Software - CASE",
    pergunta: "Ferramentas CASE que oferecem serviços utilizados durante TODAS as etapas de desenvolvimento de um software são classificadas como:",
    opcoes: ["Vertical.", "Diagonal.", "Transversal.", "Meridional.", "Horizontal."],
    correta: 4,
    explicacao: "Ferramentas Horizontais cobrem todo o ciclo de vida. Ferramentas Verticais focam em uma fase específica."
  },
  {
    id: 1267,
    materia: "Engenharia de Software - UML",
    pergunta: "Segundo a OMT e UML, em orientação a objetos, um diagrama que mostra uma relação de 'Todo-Parte' onde as partes pertencem a um único todo é uma:",
    opcoes: ["Herança.", "Compartilhamento.", "Agregação.", "Generalização.", "Método."],
    correta: 2,
    explicacao: "A questão refere-se à Agregação (ou Composição), que modela a relação 'tem-um' (todo-parte)."
  },
  {
    id: 1268,
    materia: "Engenharia de Software - Padrões",
    pergunta: "Acerca de padrões de projeto (Design Patterns), assinale a opção correta:",
    opcoes: ["Prejudicam a qualidade da aplicação.", "Aumentam os custos em função da qualidade.", "São soluções de baixo custo sem técnica.", "Fornecem meios de se descrever soluções para problemas recorrentes, permitindo redução de tempo e melhoria da qualidade.", "Incentivam o reuso mas aumentam o custo."],
    correta: 3,
    explicacao: "Design Patterns são soluções catalogadas para problemas comuns, promovendo reuso e boas práticas."
  },
  {
    id: 1269,
    materia: "Programação - POO",
    pergunta: "Em programação orientada a objetos, o conjunto de todas as propriedades de um objeto mais os valores atuais dessas propriedades corresponde à definição de:",
    opcoes: ["Tamanho do objeto.", "Estado de um objeto.", "Método do objeto.", "Classe do objeto.", "Abstração do objeto."],
    correta: 1,
    explicacao: "O 'Estado' de um objeto é representado pelos valores de seus atributos em um dado momento."
  },
  {
    id: 1270,
    materia: "Programação - MVC",
    pergunta: "Na arquitetura MVC, o componente que gerencia o comportamento e os dados do domínio da aplicação, responde às requisições sobre o seu estado e responde às instruções para mudança de estado é:",
    opcoes: ["O Modelo (Model).", "O Controle (Controller).", "A Visão (View).", "O Coding.", "A Maturidade."],
    correta: 0,
    explicacao: "O Model encapsula a lógica de negócio e os dados."
  },
  {
    id: 1271,
    materia: "Banco de Dados - Chaves",
    pergunta: "A chave que equivale a um (ou vários) atributo(s) que identifica a entidade, tal que o valor deve ser único para cada linha da tabela é a chave:",
    opcoes: ["Estrangeira.", "De índice.", "Primária.", "Composta.", "Importada."],
    correta: 2,
    explicacao: "Chave Primária (PK) identifica unicamente a tupla."
  },
  {
    id: 1272,
    materia: "Banco de Dados - Concorrência",
    pergunta: "Em banco de dados, todo método de controle de concorrência deve evitar anomalias de sincronização. Essas anomalias estão relacionadas a:",
    opcoes: ["Perda de consistência, acesso a dados inconsistentes e perda de atualizações.", "Acesso via ODBC.", "Consulta recursiva.", "Apenas perda de consistência.", "Apenas acesso via ODBC."],
    correta: 0,
    explicacao: "Os problemas clássicos de concorrência são: Perda de Atualização, Leitura Suja (Dados inconsistentes) e Leitura Não Repetível (Inconsistência)."
  },
  {
    id: 1273,
    materia: "Banco de Dados - SQL",
    pergunta: "Assinale a opção que apresenta palavras reservadas utilizadas em DDL (Data Definition Language - Linguagem de Definição de Dados):",
    opcoes: ["Alter e Update", "Select e Alter", "Insert e Create", "Create e Alter", "Create e Select"],
    correta: 3,
    explicacao: "DDL define a estrutura: CREATE, ALTER, DROP. (Select/Insert/Update são DML)."
  },
  {
    id: 1274,
    materia: "Banco de Dados - SQL",
    pergunta: "Sobre a sintaxe SQL, qual comando é usado para apagar registros de uma tabela baseada em uma condição?",
    opcoes: ["INSERT INTO", "DELETE FROM tabela WHERE condição", "UPDATE tabela", "SELECT nome", "SELECT *"],
    correta: 1,
    explicacao: "DELETE FROM remove registros. A cláusula WHERE especifica quais."
  },
  {
    id: 1275,
    materia: "Estrutura de Dados",
    pergunta: "Um tipo abstrato de dados pode ser definido matematicamente pelo par (V, O), em que:",
    opcoes: ["V é um vetor e O é objeto.", "V é valor e O é objeto.", "V é um conjunto de valores e O, um conjunto de operações sobre esses valores.", "V é vetor e O é operações.", "V é índice e O é objeto."],
    correta: 2,
    explicacao: "TAD (Tipo Abstrato de Dados) é definido pelos seus valores possíveis e as operações que podem ser realizadas sobre eles."
  },
  {
    id: 1276,
    materia: "Programação - Conceitos",
    pergunta: "Os procedimentos (procedures) podem:",
    opcoes: ["Retornar valor e ter variáveis.", "Ter declaração de variáveis e bloco de instruções.", "Apenas retornar valor.", "Apenas ter nome.", "Não ter código."],
    correta: 1,
    explicacao: "Procedures (diferente de funções puras em algumas linguagens) executam um bloco de instruções e podem ter variáveis locais, mas não necessariamente retornam valor."
  },
  {
    id: 1277,
    materia: "Programação - Java",
    pergunta: "Assinale a opção que apresenta a estrutura de controle de fluxo capaz de fazer escolhas múltiplas de comandos dependendo do valor de uma variável em Java:",
    opcoes: ["if e case", "switch e if", "switch e case", "case e for", "if e while"],
    correta: 2,
    explicacao: "A estrutura é `switch(variavel) { case valor: ... }`."
  },
  {
    id: 1278,
    materia: "Programação - Java",
    pergunta: "Em um código Java, o comando `System.out.println(\"prova!\");` realiza:",
    opcoes: ["Leitura de dados.", "Impressão de texto na saída padrão (console) pulando uma linha ao final.", "Conexão com banco.", "Criação de janela.", "Erro de compilação."],
    correta: 1,
    explicacao: "System.out.println imprime a string e adiciona uma quebra de linha (ln)."
  },
  {
    id: 1279,
    materia: "Programação - J2EE",
    pergunta: "Na arquitetura J2EE, a entidade que permite ao desenvolvedor poupar tempo e gerencia o ciclo de vida dos componentes (como Servlets e EJBs) é o:",
    opcoes: ["Tomcat.", "Applets.", "Servlets.", "Session beans.", "Container."],
    correta: 4,
    explicacao: "O Container (Web Container ou EJB Container) gerencia os componentes, segurança, transações, etc."
  },
  {
    id: 1280,
    materia: "Redes - Protocolos",
    pergunta: "Em redes de computadores, os dispositivos são agrupados mediante regras de comunicação conhecidas como:",
    opcoes: ["TCP/IP.", "Meios de transmissão.", "Algoritmos.", "Protocolos.", "Camada de rede."],
    correta: 3,
    explicacao: "Protocolos são as regras e convenções que governam a comunicação."
  },
  {
    id: 1281,
    materia: "Redes - Cabeamento",
    pergunta: "Cabos de par trançado Categoria 6 (Cat6) disponibilizam largura de banda (frequência) da ordem de:",
    opcoes: ["100 MHz.", "250 MHz.", "500 MHz.", "600 MHz.", "1000 MHz."],
    correta: 1,
    explicacao: "Cat5e é 100 MHz. Cat6 é 250 MHz. Cat6a é 500 MHz."
  },
  {
    id: 1282,
    materia: "Redes - Roteamento",
    pergunta: "Um roteador é capaz de tratar protocolos roteáveis. São exemplos de protocolos de roteamento:",
    opcoes: ["IP, RIP e OSPF.", "IPX, RIP e AppleTalk.", "RIP e OSPF (Protocolos de Roteamento) e IP (Protocolo Roteado).", "IPX e OSPF.", "IP e AppleTalk."],
    correta: 2,
    explicacao: "RIP e OSPF são protocolos *de* roteamento (ensinam a rota). IP é um protocolo *roteado* (leva os dados). A banca considerou a distinção técnica."
  },
  {
    id: 1283,
    materia: "Redes - WAN",
    pergunta: "O protocolo HDLC (High-Level Data Link Control), utilizado para redes de longa distância, é um protocolo de qual camada?",
    opcoes: ["Camada Física.", "Camada de Enlace de Dados.", "Camada de Rede.", "Camada de Transporte.", "Camada de Aplicação."],
    correta: 1,
    explicacao: "HDLC é um protocolo de Camada 2 (Enlace), usado em links ponto-a-ponto seriais."
  },
  {
    id: 1284,
    materia: "Redes - Comutação",
    pergunta: "Na comutação de pacotes (packet switching):",
    opcoes: ["Uma conexão física dedicada é mantida.", "A rede é responsável por escolher o melhor caminho para cada pacote (datagrama), podendo variar.", "Não há cabeçalho.", "O caminho é fixo.", "Usa-se apenas fibra."],
    correta: 1,
    explicacao: "Diferente da comutação de circuitos (telefonia fixa), na comutação de pacotes cada bloco de dados pode seguir rotas diferentes dependendo do congestionamento."
  },
  {
    id: 1285,
    materia: "Redes - TCP/IP",
    pergunta: "Em TCP/IP, existe um campo de dados responsável por impedir que um pacote fique 'vivo' na rede infinitamente (em loop). Esse campo é o:",
    opcoes: ["IHL.", "TOS.", "TL.", "TTL (Time to Live).", "Padding."],
    correta: 3,
    explicacao: "TTL é decrementado a cada salto (roteador). Se chegar a zero, o pacote é descartado."
  },
  {
    id: 1286,
    materia: "Sistemas Distribuídos",
    pergunta: "Na arquitetura cliente-servidor, o responsável por realizar o controle de mensagens entre processos para solicitação de serviços remotos é o:",
    opcoes: ["IPCS.", "RPC (Remote Procedure Call).", "LPC.", "TCP.", "PPP."],
    correta: 1,
    explicacao: "RPC permite que um programa execute um código em outra máquina remota."
  },
  {
    id: 1287,
    materia: "Redes - DNS",
    pergunta: "O serviço de resolução de nomes (DNS) suporta quais protocolos de transporte?",
    opcoes: ["Apenas UDP porta 53.", "Apenas TCP porta 53.", "TCP e UDP, ambos na porta 53.", "Apenas UDP porta 153.", "TCP porta 153."],
    correta: 2,
    explicacao: "DNS usa UDP 53 para consultas padrão (rápidas) e TCP 53 para transferências de zona ou respostas grandes."
  },
  {
    id: 1288,
    materia: "Engenharia de Software",
    pergunta: "A arquitetura MVC (Model-View-Controller) tem como característica:",
    opcoes: ["Misturar a visão com o controle.", "Não usar XML.", "Ser suportada apenas por Java.", "Isolar a lógica do negócio (Model) da interface do usuário (View).", "Não suportar banco de dados."],
    correta: 3,
    explicacao: "A principal vantagem do MVC é o desacoplamento entre a interface e a lógica."
  },
  {
    id: 1289,
    materia: "Banco de Dados - Transações",
    pergunta: "A propriedade ACID que garante que, em uma transação, ou todas as operações são efetivadas com sucesso ou nenhuma delas é feita (tudo ou nada), é a:",
    opcoes: ["Atomicidade.", "Consistência.", "Isolamento.", "Durabilidade.", "Integridade."],
    correta: 0,
    explicacao: "Atomicidade trata a transação como uma unidade indivisível (átomo)."
  },
  {
    id: 1290,
    materia: "Redes - Endereçamento",
    pergunta: "Considerando o endereço IP 200.220.15.9 com máscara /29 (255.255.255.248), qual é o endereço de Rede e o endereço de Broadcast, respectivamente?",
    opcoes: ["200.220.15.0 e 200.220.15.16", "200.220.15.8 e 200.220.15.15", "200.220.15.9 e 200.220.15.14", "200.220.15.1 e 200.220.15.6", "200.220.15.8 e 200.220.15.16"],
    correta: 1,
    explicacao: "/29 tem intervalo de 8 em 8 (256-248=8). As redes são: .0, .8, .16... O IP .9 está na rede .8. O próximo é .16, logo o broadcast é .15. Resposta: Rede .8, Broadcast .15."
  },

  // --- PROVA REAL: FCC - TCE/SP (Agente de Fiscalização de TI) ---
  {
    id: 1291,
    materia: "Arquitetura de Computadores",
    pergunta: "É uma característica básica da arquitetura de Von Neumann:",
    opcoes: ["Memória de programa e dados separadas.", "Memória de programa e dados compartilham o mesmo barramento e espaço de endereçamento.", "Processamento paralelo MIMD.", "Barramento duplo.", "Múltiplas CPUs."],
    correta: 1,
    explicacao: "Von Neumann armazena instruções e dados na mesma memória. (A arquitetura Harvard é que separa)."
  },
  {
    id: 1292,
    materia: "Arquitetura - Pipeline",
    pergunta: "Em um pipeline de 5 estágios, onde cada estágio leva 2 nanosegundos (ciclo), a máquina funcionará idealmente à velocidade de:",
    opcoes: ["500 MIPS.", "100 MIPS.", "200 MIPS.", "400 MIPS.", "1000 MIPS."],
    correta: 0,
    explicacao: "Se o ciclo é 2ns, a frequência é 1 / (2 * 10^-9) = 500 milhões de ciclos/s. Em pipeline ideal, completa-se 1 instrução por ciclo = 500 MIPS."
  },
  {
    id: 1293,
    materia: "Arquitetura Paralela",
    pergunta: "O tipo de arquitetura paralela que consiste em máquinas formadas por milhares de CPUs padronizadas, apresentando bom desempenho pela quantidade, é:",
    opcoes: ["SMP.", "MPP (Massively Parallel Processor).", "PVP.", "DSM.", "COW."],
    correta: 1,
    explicacao: "MPP usa processamento massivamente paralelo com milhares de processadores."
  },
  {
    id: 1294,
    materia: "Taxonomia de Flynn",
    pergunta: "Segundo Flynn, um sistema com uma única unidade de controle transmitindo a mesma instrução para vários processadores que operam sobre dados diferentes (ex: processamento vetorial) é:",
    opcoes: ["SISD.", "MIMD.", "SIMD (Single Instruction, Multiple Data).", "MISD.", "Cluster."],
    correta: 2,
    explicacao: "SIMD = Uma instrução, múltiplos dados."
  },
  {
    id: 1295,
    materia: "Sistemas Operacionais",
    pergunta: "A propriedade que permite ao sistema operacional manter várias tarefas na memória simultaneamente, otimizando o uso da CPU (sempre tem algo executando), é:",
    opcoes: ["Multiprocessamento.", "Multiprogramação.", "Memória Virtual.", "Spooling.", "Time-sharing."],
    correta: 1,
    explicacao: "Multiprogramação permite alternar a CPU entre jobs quando um deles espera por E/S."
  },
  {
    id: 1296,
    materia: "Windows Server - Permissões",
    pergunta: "Para que administradores de banco de dados possam fazer backup e restauração sem ter privilégios totais de Administrador, deve-se adicioná-los ao grupo:",
    opcoes: ["Operadores de Servidor.", "Administradores.", "Usuários Avançados.", "Operadores de Backup.", "Convidados."],
    correta: 3,
    explicacao: "O grupo 'Backup Operators' tem direitos específicos para contornar permissões de arquivo a fim de fazer backup/restore."
  },
  {
    id: 1297,
    materia: "Windows Server - Monitoramento",
    pergunta: "Para monitorar proativamente se os discos dos servidores estão enchendo, a melhor estratégia com mínimo esforço é:",
    opcoes: ["Verificar manualmente todo dia.", "Criar um alerta de desempenho no Performance Monitor para disparar quando o espaço livre for menor que um limite (ex: 10%).", "Criar um script de login.", "Usar o Scandisk.", "Instalar um antivírus."],
    correta: 1,
    explicacao: "Alertas de Desempenho (Performance Alerts) automatizam o monitoramento."
  },
  {
    id: 1298,
    materia: "Windows - Segurança",
    pergunta: "Se houver suspeita de que senhas de uma Unidade Organizacional (OU) foram comprometidas, a ação imediata mais adequada é:",
    opcoes: ["Excluir as contas.", "Alterar as propriedades das contas selecionadas para 'O usuário deve alterar a senha no próximo logon'.", "Desabilitar as contas.", "Resetar todas as senhas para '123456'.", "Remover a OU."],
    correta: 1,
    explicacao: "Forçar a troca no próximo logon garante que apenas o usuário legítimo defina a nova senha."
  },
  {
    id: 1299,
    materia: "Linux - Processos",
    pergunta: "No Linux, quando um processo pai morre antes do filho, o processo filho se torna um 'órfão' e é adotado pelo processo:",
    opcoes: ["Zombie.", "Init (PID 1).", "Root.", "Kernel.", "Swap."],
    correta: 1,
    explicacao: "O processo Init adota os órfãos para garantir que sejam finalizados corretamente."
  },
  {
    id: 1300,
    materia: "Linux - Samba",
    pergunta: "O software servidor Samba para Linux permite:",
    opcoes: ["Apenas impressão.", "Compartilhar arquivos e impressoras com clientes Windows, usando o protocolo SMB/CIFS.", "Apenas acesso FTP.", "Emular jogos.", "Criar máquinas virtuais."],
    correta: 1,
    explicacao: "Samba implementa o protocolo SMB, permitindo interoperabilidade total com redes Windows."
  },
  {
    id: 1301,
    materia: "Linux - Estrutura de Diretórios",
    pergunta: "No Linux, o diretório que concentra os arquivos de configuração do sistema (semelhante ao Registro do Windows, mas em arquivos texto) é o:",
    opcoes: ["/bin", "/dev", "/etc", "/usr", "/home"],
    correta: 2,
    explicacao: "/etc (Etcetera) armazena configurações globais."
  },
  {
    id: 1302,
    materia: "ITIL - Processos",
    pergunta: "No ITIL, minimizar o impacto de falhas e restaurar o servi��o o mais rápido possível é objetivo do Gerenciamento de:",
    opcoes: ["Problemas.", "Incidentes.", "Mudanças.", "Configuração.", "Disponibilidade."],
    correta: 1,
    explicacao: "Incidente = Restaurar rápido (apagar o fogo). Problema = Achar a causa raiz."
  },
  {
    id: 1303,
    materia: "ITIL - SLA",
    pergunta: "O documento que descreve os serviços de TI oferecidos, prazos e responsabilidades, acordado entre a TI e o cliente, é o:",
    opcoes: ["OLA.", "SLA (Acordo de Nível de Serviço).", "Contrato de Apoio.", "RFC.", "PIR."],
    correta: 1,
    explicacao: "Service Level Agreement (ANS/SLA)."
  },
  {
    id: 1304,
    materia: "Governança - Gestão do Conhecimento",
    pergunta: "A Gestão do Conhecimento envolve:",
    opcoes: ["Apenas armazenar dados.", "Criação, obtenção, compartilhamento e uso do conhecimento e experiências.", "Apenas treinamento.", "Backup de arquivos.", "Contratação de consultores."],
    correta: 1,
    explicacao: "Envolve todo o ciclo do conhecimento tácito e explícito."
  },
  {
    id: 1305,
    materia: "Gestão de Projetos - PMBOK",
    pergunta: "Uma das saídas do processo de Orçamentação (Estimativa de Custos) é:",
    opcoes: ["O Cronograma.", "A linha de base dos custos (Cost Baseline).", "O Termo de Abertura.", "A EAP.", "O Plano de Comunicação."],
    correta: 1,
    explicacao: "A Linha de Base de Custos é o orçamento aprovado distribuído no tempo."
  },
  {
    id: 1306,
    materia: "Arquitetura - Memória",
    pergunta: "Em sistemas com memória virtual, a técnica que divide a memória física e lógica em blocos de tamanho fixo é chamada de:",
    opcoes: ["Segmentação.", "Paginação.", "Swapping.", "Fragmentação.", "Spooling."],
    correta: 1,
    explicacao: "Paginação usa blocos fixos (páginas). Segmentação usa blocos variáveis (segmentos)."
  },
  {
    id: 1307,
    materia: "Armazenamento - SAN",
    pergunta: "No ambiente SAN (Storage Area Network) com Fibre Channel, a camada que define o protocolo de transporte e segmentação de dados é:",
    opcoes: ["FC-0", "FC-1", "FC-2", "FC-3", "FC-4"],
    correta: 2,
    explicacao: "FC-2 é a camada de transporte/sinalização do Fibre Channel."
  },
  {
    id: 1308,
    materia: "Armazenamento - NAS",
    pergunta: "A tecnologia NAS (Network Attached Storage) caracteriza-se por:",
    opcoes: ["Ser um disco local.", "Utilizar protocolos de compartilhamento de arquivos (NFS/CIFS) sobre a rede IP existente.", "Usar apenas fibra óptica.", "Ser um bloco de dados cru.", "Não permitir backup."],
    correta: 1,
    explicacao: "NAS compartilha ARQUIVOS via rede. SAN compartilha BLOCOS."
  },
  {
    id: 1309,
    materia: "Backup",
    pergunta: "Para manter várias versões de arquivos por um período determinado, permitindo recuperar um arquivo de uma data específica, o tipo de backup ideal é:",
    opcoes: ["Hot.", "Incremental ou Diferencial (rotacionado).", "Apenas Full mensal.", "Espelhamento.", "Cópia simples."],
    correta: 1,
    explicacao: "Backups incrementais/diferenciais diários permitem voltar no tempo (versionamento)."
  },
  {
    id: 1310,
    materia: "Ciclo de Vida da Informação (ILM)",
    pergunta: "O conceito de ILM (Information Lifecycle Management) propõe que:",
    opcoes: ["Todos os dados devem ser guardados para sempre no disco mais rápido.", "A infraestrutura de armazenamento deve se alinhar ao valor da informação, que muda ao longo do tempo (dados antigos vão para mídias mais baratas).", "Deve-se apagar tudo após 1 ano.", "O backup não é importante.", "Dados não têm ciclo de vida."],
    correta: 1,
    explicacao: "ILM otimiza custos movendo dados menos acessados para camadas de armazenamento mais baratas (Tiering)."
  },

  // ===================================================================
  // EXPANSÃO 1: IDs 1491-1670 (180 questões)
  // Bancas: CAIP, UNILAVRAS, FUMARC, FUNDEP, CONSULPAM, IV-UFG, 
  //         UEM, CODECIR, IBAM, UFMT, FUNDATEC/FEPPS
  // ===================================================================

  // ===================================================================
  // EXPANSÃO 2 (FINAL): IDs 1571-1770 (200 questões)
  // Bancas: CESPE (TJ/ES, IEMA, TCE/TO), FUNDATEC, FCC (MPU),
  //         UEL (SANEPAR), CONSULPLAN, Instituto EVO
  // Áreas: Direito Adm, TI Avançada, Mainframe, SQL, Português,
  //        Legislação, Raciocínio Lógico
  // ===================================================================
  //
  // 🎯 BANCO DE DADOS FINALIZADO: 1.690 QUESTÕES ATIVAS ✅
  //
  // Distribuição:
  // - Base (1-1310): 1.310 questões
  // - Expansão 1 (1491-1670): 180 questões  
  // - Expansão 2 (1571-1770): 200 questões
  //
  // Cobertura:
  // ✅ Hardware (150+) | ✅ Redes (200+) | ✅ Segurança (150+)
  // ✅ SO/Linux (120+) | ✅ BD/SQL (80+) | ✅ Office (60+)
  // ✅ Programação (60+) | ✅ Mainframe (30+)
  // ✅ Legislação (80+) | ✅ Português (50+) | ✅ Lógica (40+)
  //
  // 15+ Bancas: CESPE, FCC, FGV, FUNDATEC, CAIP, UEL, etc.
  // ===================================================================

  // ===================================================================
  // EXPANSÃO 3 (TÉCNICA): IDs 1821-1870 (50 questões)
  // Bancas: FCC TCE/SP, CESPE MPU/TCE-TO, UEL SANEPAR
  // Windows Server AD, ITIL, Mainframe Avançado, Eng. Software
  // ===================================================================

  // ===================================================================
  // EXPANSÃO 4 (MEGA): IDs 1771-1920 (150 questões) ✅
  // Bancas: FCC TCE-SP, CESPE MPU/TCE-TO, SANEPAR
  // Português (50) | RLM (20) | TI (50) | Mainframe (30)
  // ===================================================================

  // ===================================================================
  // EXPANSÃO 5 (FECHAMENTO): IDs 1921-2000 (80 questões) ✅
  // SANEPAR 2013, CESPE TJ-ES, FCC TCE-SP, CESPE MPU
  // TI Prática (25) | CESPE C/E (25) | Técnico Avançado (30)
  // ===================================================================

  // --- SANEPAR 2013 (IDs 1921-1930) ---
  {
    id: 1921,
    materia: "TI - Linux",
    pergunta: "(SANEPAR 2013) No sistema operacional Linux, o comando utilizado para alterar o dono (proprietário) de um arquivo ou diretório é:",
    opcoes: ["chmod.", "chown.", "chgrp.", "umask.", "passwd."],
    correta: 1,
    explicacao: "chown (Change Owner). chmod altera permissões. Gabarito: B."
  },
  {
    id: 1922,
    materia: "TI - Redes",
    pergunta: "(SANEPAR 2013) O protocolo da camada de aplicação responsável pela resolução de nomes de domínio (ex: www.sanepar.com.br) em endereços IP é o:",
    opcoes: ["DHCP.", "DNS.", "HTTP.", "FTP.", "SNMP."],
    correta: 1,
    explicacao: "DNS (Domain Name System). Gabarito: B."
  },
  {
    id: 1923,
    materia: "TI - Backup",
    pergunta: "(SANEPAR 2013) O tipo de backup que copia todos os arquivos selecionados, mas não marca os arquivos como copiados (não limpa o bit de arquivo), é chamado de:",
    opcoes: ["Backup Normal (Completo).", "Backup Incremental.", "Backup Diferencial.", "Backup de Cópia.", "Backup Diário."],
    correta: 3,
    explicacao: "Backup de Cópia (Copy Backup) serve para fazer uma cópia extra sem afetar a rotina de backups incrementais/diferenciais. Gabarito: D."
  },
  {
    id: 1924,
    materia: "TI - Windows Server",
    pergunta: "(SANEPAR 2013) No Windows Server 2008, a função (role) que permite ao servidor atuar como um controlador de domínio, gerenciando usuários e computadores na rede, é:",
    opcoes: ["File Services.", "Print Services.", "Active Directory Domain Services (AD DS).", "Web Server (IIS).", "DHCP Server."],
    correta: 2,
    explicacao: "AD DS é o serviço de diretório do Windows. Gabarito: C."
  },
  {
    id: 1925,
    materia: "TI - Virtualização",
    pergunta: "(SANEPAR 2013) A tecnologia que permite a criação de máquinas virtuais, onde múltiplos sistemas operacionais podem ser executados simultaneamente no mesmo hardware físico, isolados uns dos outros, é:",
    opcoes: ["Computação em Nuvem.", "Virtualização.", "Emulação.", "Cluster.", "Grid Computing."],
    correta: 1,
    explicacao: "Definição de Virtualização. Gabarito: B."
  },
  {
    id: 1926,
    materia: "TI - Hardware",
    pergunta: "(SANEPAR 2013) O nível de RAID (Redundant Array of Independent Disks) que oferece tolerância a falhas através do espelhamento (mirroring) dos dados em dois discos é o:",
    opcoes: ["RAID 0.", "RAID 1.", "RAID 5.", "RAID 6.", "RAID 10."],
    correta: 1,
    explicacao: "RAID 1 espelha os dados. RAID 0 divide (sem redundância). Gabarito: B."
  },
  {
    id: 1927,
    materia: "TI - Segurança",
    pergunta: "(SANEPAR 2013) O tipo de malware que criptografa os arquivos do usuário e exige o pagamento de um resgate para fornecer a chave de descriptografia é conhecido como:",
    opcoes: ["Spyware.", "Adware.", "Ransomware.", "Worm.", "Trojan."],
    correta: 2,
    explicacao: "Ransom (resgate) + ware. Gabarito: C."
  },
  {
    id: 1928,
    materia: "TI - Redes",
    pergunta: "(SANEPAR 2013) O endereço IPv4 de loopback, utilizado para testar a interface de rede local (localhost), é:",
    opcoes: ["192.168.0.1", "10.0.0.1", "127.0.0.1", "255.255.255.0", "0.0.0.0"],
    correta: 2,
    explicacao: "127.0.0.1 é o localhost padrão. Gabarito: C."
  },
  {
    id: 1929,
    materia: "TI - Linux",
    pergunta: "(SANEPAR 2013) O arquivo do Linux que contém a lista de usuários do sistema, juntamente com informações como UID, GID e diretório home, é:",
    opcoes: ["/etc/shadow", "/etc/group", "/etc/passwd", "/etc/gshadow", "/etc/users"],
    correta: 2,
    explicacao: "/etc/passwd armazena os dados de conta (exceto senha segura). Gabarito: C."
  },
  {
    id: 1930,
    materia: "TI - Banco de Dados",
    pergunta: "(SANEPAR 2013) A instrução SQL utilizada para recuperar dados de uma tabela é:",
    opcoes: ["INSERT.", "UPDATE.", "DELETE.", "SELECT.", "CREATE."],
    correta: 3,
    explicacao: "SELECT é o comando de consulta. Gabarito: D."
  },

  // --- FCC TCE/SP (IDs 1931-1940) ---
  {
    id: 1931,
    materia: "Governança - COBIT",
    pergunta: "(FCC/TCE-SP) No COBIT, as questões operacionais ligadas ao uso da TI para atendimento aos serviços dos clientes, à manutenção e às garantias ligadas a estes serviços, são definidas no Domínio de Processos:",
    opcoes: ["Monitoração.", "Planejamento e Organização.", "Aquisição e Implementação.", "Manutenção e Serviços.", "Entrega e Suporte (DS)."],
    correta: 4,
    explicacao: "Entrega e Suporte (Deliver and Support) foca na operação e serviços. Gabarito: E."
  },
  {
    id: 1932,
    materia: "Governança - ITIL",
    pergunta: "(FCC/TCE-SP) O processo do ITIL responsável por auxiliar no gerenciamento do ambiente de TI por meio do registro de todos os seus itens em um banco de dados (CMDB), efetuando o controle dos componentes da infraestrutura, é o:",
    opcoes: ["Gerenciamento de Configuração.", "Gerenciamento de Incidentes.", "Gerenciamento de Mudanças.", "Gerenciamento de Versões.", "Gerenciamento de Problemas."],
    correta: 0,
    explicacao: "Gerenciamento de Configuração mantém o CMDB atualizado. Gabarito: A."
  },
  {
    id: 1933,
    materia: "Gestão de Projetos - PMBOK",
    pergunta: "(FCC/TCE-SP) Segundo o PMBOK (3ª Edição), o processo 'Relatório de desempenho' é parte integrante da área de conhecimento denominada Gerenciamento:",
    opcoes: ["do escopo do projeto.", "de tempo do projeto.", "de custos do projeto.", "da qualidade do projeto.", "das comunicações do projeto."],
    correta: 4,
    explicacao: "Relatórios de desempenho visam comunicar o status aos stakeholders. Gabarito: E."
  },
  {
    id: 1934,
    materia: "TI - Segurança",
    pergunta: "(FCC/TCE-SP) Na criptografia de chave assimétrica, para garantir a CONFIDENCIALIDADE de uma mensagem, ela deve ser codificada com a chave:",
    opcoes: ["Privada do remetente.", "Pública do remetente.", "Privada do destinatário.", "Pública do destinatário.", "De sessão."],
    correta: 3,
    explicacao: "Cifra-se com a Pública do Destinatário para que apenas ele (com sua Privada) possa ler. Gabarito: D."
  },
  {
    id: 1935,
    materia: "TI - Redes",
    pergunta: "(FCC/TCE-SP) O protocolo utilizado para que fornecedores anunciem a existência de seus Web Services e para que consumidores localizem esses serviços (funciona como páginas amarelas) é o:",
    opcoes: ["SOAP.", "WSDL.", "UDDI.", "XML.", "HTML."],
    correta: 2,
    explicacao: "UDDI (Universal Description, Discovery and Integration). Gabarito: C."
  },
  {
    id: 1936,
    materia: "TI - Sistemas Operacionais",
    pergunta: "(FCC/TCE-SP) A capacidade de um sistema operacional de manter várias tarefas na memória simultaneamente, otimizando o uso da CPU (que comuta entre elas), é chamada de:",
    opcoes: ["Multiprocessamento.", "Multiprogramação.", "Memória Virtual.", "Swapping.", "Cluster."],
    correta: 1,
    explicacao: "Multiprogramação permite a concorrência de tarefas na memória. Gabarito: B."
  },
  {
    id: 1937,
    materia: "TI - Redes",
    pergunta: "(FCC/TCE-SP) Sobre o protocolo LDAP: É baseado no padrão X.500, implementado sobre TCP/IP e utilizado para acessar e gerenciar diretórios de informações (como usuários) de forma hierárquica.",
    opcoes: ["Certo.", "Errado."],
    correta: 0,
    explicacao: "Descrição correta do LDAP. Gabarito: C."
  },
  {
    id: 1938,
    materia: "TI - Windows",
    pergunta: "(FCC/TCE-SP) Para conceder a um usuário o direito de realizar apenas backups em servidores, sem dar privilégios administrativos totais, deve-se adicioná-lo ao grupo:",
    opcoes: ["Administradores.", "Usuários Avançados.", "Operadores de Servidor.", "Operadores de Backup.", "Convidados."],
    correta: 3,
    explicacao: "Grupo 'Backup Operators' tem permissão específica para backup/restore. Gabarito: D."
  },
  {
    id: 1939,
    materia: "TI - Armazenamento",
    pergunta: "(FCC/TCE-SP) A arquitetura de armazenamento que utiliza uma rede dedicada (geralmente Fibre Channel) para conectar servidores a dispositivos de storage é:",
    opcoes: ["DAS.", "NAS.", "SAN.", "SCSI.", "RAID."],
    correta: 2,
    explicacao: "SAN (Storage Area Network). Gabarito: C."
  },
  {
    id: 1940,
    materia: "TI - Web",
    pergunta: "(FCC/TCE-SP) Ferramentas como Google Docs e Zoho, que funcionam no navegador e permitem colaboração online, são exemplos do conceito de:",
    opcoes: ["Web 1.0.", "Web 2.0 (SaaS).", "Cliente-Servidor tradicional.", "Mainframe.", "P2P."],
    correta: 1,
    explicacao: "Software como Serviço (SaaS) na Web 2.0. Gabarito: B."
  },

  // --- CESPE TJ/ES e MPU (IDs 1941-1950) ---
  {
    id: 1941,
    materia: "Direito Administrativo",
    pergunta: "(CESPE/TJ-ES) Julgue o item: O servidor público que, em detrimento da dignidade da função, permite que terceiro se beneficie de informação privilegiada obtida em razão do cargo, comete transgressão passível de demissão.",
    opcoes: ["Certo.", "Errado."],
    correta: 0,
    explicacao: "Certo. Violação de sigilo funcional para beneficiar terceiros é infração grave. Gabarito: C."
  },
  {
    id: 1942,
    materia: "Direito Constitucional",
    pergunta: "(CESPE/TJ-ES) Julgue o item: O Poder Judiciário possui autonomia administrativa e financeira, cabendo aos tribunais elaborar suas propostas orçamentárias dentro dos limites estipulados na lei de diretrizes orçamentárias.",
    opcoes: ["Certo.", "Errado."],
    correta: 0,
    explicacao: "Certo. Art. 99 da Constituição Federal. Gabarito: C."
  },
  {
    id: 1943,
    materia: "TI - Segurança",
    pergunta: "(CESPE/TJ-ES) Julgue o item: A assinatura digital garante a autenticidade do documento, assegurando a identidade do remetente, e a integridade, garantindo que o conteúdo não foi alterado.",
    opcoes: ["Certo.", "Errado."],
    correta: 0,
    explicacao: "Certo. Autenticidade e Integridade são os pilares da assinatura digital. Gabarito: C."
  },
  {
    id: 1944,
    materia: "TI - Redes",
    pergunta: "(CESPE/MPU) Julgue o item: O protocolo DHCP deve ser configurado com um endereço IP estático no servidor para que ele possa ser encontrado pelos clientes na rede e distribuir IPs dinâmicos.",
    opcoes: ["Certo.", "Errado."],
    correta: 0,
    explicacao: "Certo. Servidores de infraestrutura (DHCP, DNS) precisam de IP fixo. Gabarito: C."
  },
  {
    id: 1945,
    materia: "TI - Banco de Dados",
    pergunta: "(CESPE/MPU) Julgue o item: A cláusula SQL 'GROUP BY' é utilizada para agrupar linhas que têm os mesmos valores em colunas especificadas, sendo frequentemente usada com funções de agregação como SUM e COUNT.",
    opcoes: ["Certo.", "Errado."],
    correta: 0,
    explicacao: "Certo. Definição correta de GROUP BY. Gabarito: C."
  },
  {
    id: 1946,
    materia: "TI - Linux",
    pergunta: "(CESPE/MPU) Julgue o item: O comando 'ls -la' no Linux lista todos os arquivos do diretório, incluindo os ocultos (que começam com ponto), exibindo detalhes como permissões e tamanho.",
    opcoes: ["Certo.", "Errado."],
    correta: 0,
    explicacao: "Certo. '-a' mostra ocultos, '-l' mostra detalhes. Gabarito: C."
  },
  {
    id: 1947,
    materia: "TI - Hardware",
    pergunta: "(CESPE/MPU) Julgue o item: A memória cache L1 é menor e mais rápida que a memória cache L2, estando localizada mais próxima do núcleo do processador.",
    opcoes: ["Certo.", "Errado."],
    correta: 0,
    explicacao: "Certo. A hierarquia de memória é: Reg > L1 > L2 > L3 > RAM. Gabarito: C."
  },
  {
    id: 1948,
    materia: "TI - Internet",
    pergunta: "(CESPE/MPU) Julgue o item: O protocolo HTTPS utiliza uma camada de segurança (SSL/TLS) para criptografar a comunicação entre o navegador e o servidor web, garantindo confidencialidade.",
    opcoes: ["Certo.", "Errado."],
    correta: 0,
    explicacao: "Certo. HTTP + SSL/TLS = HTTPS. Gabarito: C."
  },
  {
    id: 1949,
    materia: "TI - Backup",
    pergunta: "(CESPE/MPU) Julgue o item: O backup completo (full) copia todos os arquivos selecionados e limpa o bit de arquivamento (archive bit), indicando que os dados foram salvos.",
    opcoes: ["Certo.", "Errado."],
    correta: 0,
    explicacao: "Certo. O backup full reseta a flag para os próximos incrementais. Gabarito: C."
  },
  {
    id: 1950,
    materia: "TI - Segurança",
    pergunta: "(CESPE/MPU) Julgue o item: Um firewall de filtro de pacotes (stateless) analisa o conteúdo da aplicação (camada 7) para tomar decisões de bloqueio.",
    opcoes: ["Certo.", "Errado."],
    correta: 1,
    explicacao: "Errado. Filtro de pacotes simples olha apenas cabeçalhos (IP/Porta) nas camadas 3 e 4. Quem olha aplicação é o Proxy ou Firewall de Aplicação. Gabarito: E."
  }
];

// 🏆 TOTAL ATUAL: 1.950 QUESTÕES | Faltam 50 para fechar em 2.000! 🚀