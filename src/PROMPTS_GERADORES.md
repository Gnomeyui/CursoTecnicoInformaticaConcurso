# 📚 PROMPTS GERADORES DE QUESTÕES - ALE-RR TOP 5

Use estes prompts no ChatGPT, Gemini ou qualquer IA para gerar questões no formato exato do seu app.

---

## 🔧 PROMPT BASE (COPIE E PERSONALIZE)

```
Aja como um examinador de banca de concurso nível DIFÍCIL (estilo FGV/Cebraspe/Vunesp) para o cargo de Técnico em Informática de Assembleia Legislativa.

Gere um Array TypeScript com 20 questões de múltipla escolha focadas no tema: [INSIRA O TEMA AQUI].

FORMATO OBRIGATÓRIO (TypeScript):

{
  id: [número sequencial único começando em 31],
  materia: "[Nome da Matéria]",
  pergunta: "[Enunciado técnico e desafiador]",
  opcoes: ["Opção A", "Opção B", "Opção C", "Opção D"],
  correta: [índice 0, 1, 2 ou 3],
  explicacao: "[Explicação detalhada: Por que a correta é correta E por que as outras estão erradas]"
}

REQUISITOS TÉCNICOS:
1. As questões devem ser de nível intermediário a avançado
2. Cobre detalhes específicos (números de portas, comandos exatos, velocidades)
3. Evite questões óbvias ou decoreba simples
4. A explicação deve ser didática e completa (mínimo 2 linhas)
5. Use situações práticas do dia a dia de um Técnico Legislativo
6. NÃO inclua texto antes ou depois, APENAS o array TypeScript válido

IMPORTANTE: Comece o ID em 31 (as primeiras 30 já existem no sistema).
```

---

## 📡 PROMPT 1: REDES DE COMPUTADORES (Prioridade Máxima)

**Copie e cole:**

```
Aja como um examinador de banca FGV para Técnico em Informática.

Gere 20 questões de REDES DE COMPUTADORES no formato TypeScript abaixo.

TÓPICOS OBRIGATÓRIOS (distribuir 20 questões):
- Modelo OSI e TCP/IP (camadas e funções) - 4 questões
- Protocolos e suas portas (HTTP, HTTPS, FTP, SSH, DNS, DHCP, SMTP, POP3, IMAP, RDP, Telnet) - 5 questões
- Equipamentos (Switch, Roteador, Hub, Bridge) - 3 questões
- Cabeamento (Par trançado Cat5e/6/6a, Fibra óptica) - 3 questões
- Endereçamento IP (IPv4, IPv6, Máscaras, CIDR) - 3 questões
- Wi-Fi (Padrões 802.11, Segurança WPA2/WPA3) - 2 questões

FORMATO:
{
  id: 31,
  materia: "Redes - [subtópico]",
  pergunta: "...",
  opcoes: ["...", "...", "...", "..."],
  correta: 0,
  explicacao: "..."
}

IDs: 31 a 50
NÃO adicione texto explicativo, APENAS o array TypeScript.
```

---

## 🛡️ PROMPT 2: SEGURANÇA DA INFORMAÇÃO (Alto Peso)

```
Aja como examinador Cebraspe especialista em Segurança da Informação.

Gere 20 questões de SEGURANÇA para concurso legislativo no formato TypeScript.

TÓPICOS OBRIGATÓRIOS:
- Tipos de Malware (Vírus, Worm, Trojan, Ransomware, Spyware, Rootkit) - 5 questões
- Ataques (Phishing, DDoS, Man-in-the-Middle, SQL Injection, XSS, Brute Force) - 5 questões
- Criptografia (Simétrica vs Assimétrica, Hash, Certificados Digitais) - 4 questões
- Defesas (Firewall, IDS/IPS, VPN, Antivírus) - 3 questões
- Backup (Full, Incremental, Diferencial) - 3 questões

FORMATO TypeScript:
{
  id: 51,
  materia: "Segurança - [subtópico]",
  pergunta: "...",
  opcoes: ["...", "...", "...", "..."],
  correta: 0,
  explicacao: "..."
}

IDs: 51 a 70
Apenas o código TypeScript, sem markdown.
```

---

## 💻 PROMPT 3: SISTEMAS OPERACIONAIS (Linux + Windows)

```
Aja como examinador para Técnico de TI com foco em Sistemas Operacionais.

Gere 20 questões divididas entre LINUX e WINDOWS no formato TypeScript.

DISTRIBUIÇÃO:
LINUX (12 questões):
- Comandos essenciais (ls, cd, mkdir, rm, cp, mv, cat, grep, find) - 4 questões
- Permissões (chmod, chown, cálculo octal) - 3 questões
- Estrutura de diretórios (/etc, /home, /var, /bin) - 2 questões
- Gerenciamento de processos (ps, top, kill, nice) - 3 questões

WINDOWS (8 questões):
- CMD/PowerShell (ipconfig, ping, tracert, netstat) - 3 questões
- Active Directory (GPO, Usuários, Grupos) - 2 questões
- Sistema de arquivos (NTFS, Permissões) - 2 questões
- Registro do Windows - 1 questão

FORMATO:
{
  id: 71,
  materia: "Linux - [subtópico]" ou "Windows - [subtópico]",
  pergunta: "...",
  opcoes: ["...", "...", "...", "..."],
  correta: 0,
  explicacao: "..."
}

IDs: 71 a 90
```

---

## 🖥️ PROMPT 4: HARDWARE E MANUTENÇÃO

```
Gere 15 questões de HARDWARE para concurso de Técnico Legislativo (Vunesp/FCC).

TÓPICOS:
- Componentes (CPU, RAM, Placa-mãe, Chipset) - 4 questões
- Armazenamento (HDD, SSD, NVMe, RAID 0/1/5/6/10) - 4 questões
- Barramentos e Interfaces (USB, SATA, PCIe, M.2) - 3 questões
- Periféricos (Impressoras Laser/Jato/Térmica, Monitores) - 2 questões
- BIOS/UEFI e Diagnóstico - 2 questões

FORMATO TypeScript:
{
  id: 91,
  materia: "Hardware - [subtópico]",
  pergunta: "...",
  opcoes: ["...", "...", "...", "..."],
  correta: 0,
  explicacao: "..."
}

IDs: 91 a 105
```

---

## ⚖️ PROMPT 5: LEGISLAÇÃO E DIREITO ADMINISTRATIVO

```
Aja como professor de Direito Administrativo para concursos.

Gere 20 questões de LEGISLAÇÃO para Assembleia Legislativa Estadual.

TÓPICOS:
- Direito Constitucional (Art. 37 - Administração Pública) - 5 questões
- Regime Jurídico dos Servidores (Estágio probatório, Estabilidade, Acumulação) - 5 questões
- Processo Legislativo (Iniciativa de Leis, Quórum, Votações) - 4 questões
- Regimento Interno (Mesa Diretora, Comissões, Sessões) - 3 questões
- Licitações (Lei 14.133/2021 - foco em TI) - 3 questões

FORMATO:
{
  id: 106,
  materia: "Legislação - [subtópico]",
  pergunta: "...",
  opcoes: ["...", "...", "...", "..."],
  correta: 0,
  explicacao: "..."
}

IDs: 106 a 125
IMPORTANTE: Use linguagem jurídica precisa.
```

---

## 📝 PROMPT 6: PORTUGUÊS (Estilo FGV/Cebraspe)

```
Aja como professor de Português para concursos públicos de nível superior.

Gere 15 questões de LÍNGUA PORTUGUESA (nível FGV).

TÓPICOS:
- Crase (casos obrigatórios e proibidos) - 4 questões
- Concordância Verbal e Nominal - 3 questões
- Regência Verbal e Nominal - 3 questões
- Pontuação (vírgula, ponto e vírgula) - 2 questões
- Interpretação de Texto (coesão, coerência) - 3 questões

FORMATO:
{
  id: 126,
  materia: "Português - [subtópico]",
  pergunta: "...",
  opcoes: ["...", "...", "...", "..."],
  correta: 0,
  explicacao: "..."
}

IDs: 126 a 140
Use exemplos do contexto da administração pública.
```

---

## 📊 PROMPT 7: LGPD E GOVERNANÇA DE TI

```
Gere 15 questões sobre LGPD e GOVERNANÇA DE TI para concurso legislativo.

TÓPICOS:
- LGPD (Lei 13.709) - Conceitos, Titular, Controlador, Operador - 6 questões
- ITIL v4 (Gerenciamento de Incidente, Problema, Mudança) - 5 questões
- Cobit (Conceitos básicos) - 2 questões
- ISO 27001 (Segurança da Informação) - 2 questões

FORMATO:
{
  id: 141,
  materia: "Governança - [subtópico]",
  pergunta: "...",
  opcoes: ["...", "...", "...", "..."],
  correta: 0,
  explicacao: "..."
}

IDs: 141 a 155
```

---

## 🧮 PROMPT 8: RACIOCÍNIO LÓGICO (Complemento)

```
Gere 10 questões de RACIOCÍNIO LÓGICO aplicado à Informática.

TÓPICOS:
- Lógica Proposicional (Tabela Verdade, Conectivos) - 4 questões
- Lógica de Programação (Estruturas condicionais, Laços) - 3 questões
- Análise Combinatória aplicada a TI - 2 questões
- Conversão de Bases (Binário, Hexadecimal, Decimal) - 1 questão

FORMATO:
{
  id: 156,
  materia: "Raciocínio Lógico - [subtópico]",
  pergunta: "...",
  opcoes: ["...", "...", "...", "..."],
  correta: 0,
  explicacao: "..."
}

IDs: 156 a 165
```

---

## 🎯 COMO USAR OS PROMPTS

### **PASSO 1:** Copie um prompt acima
### **PASSO 2:** Cole no ChatGPT ou Gemini
### **PASSO 3:** Copie APENAS o código TypeScript gerado
### **PASSO 4:** Cole no arquivo `/data/questions.ts` (antes do `];` final)

### **EXEMPLO DE RESULTADO ESPERADO:**

```typescript
{
  id: 31,
  materia: "Redes - Protocolos",
  pergunta: "Qual protocolo da camada de aplicação utiliza a porta TCP 143 por padrão?",
  opcoes: ["SMTP", "POP3", "IMAP", "HTTP"],
  correta: 2,
  explicacao: "IMAP (Internet Message Access Protocol) usa a porta 143. SMTP usa 25/587, POP3 usa 110."
}
```

---

## 🚀 ESTRATÉGIA TOP 5

1. **Prioridade 1:** Gere questões de REDES (use Prompt 1) - são 30-40% da prova
2. **Prioridade 2:** SEGURANÇA (Prompt 2) - sempre cai
3. **Prioridade 3:** LEGISLAÇÃO (Prompt 5) - quando sair o edital, adapte para a ALE-RR específica
4. **Prioridade 4:** Português (Prompt 6) - é o diferencial (muitos técnicos perdem aqui)
5. **Meta:** 200-300 questões no total para garantir o Top 5

---

## 💡 DICA BÔNUS: PROMPT PARA EDITAL ESPECÍFICO

```
Quando o edital da ALE-RR sair, use este prompt:

"Analise este edital de concurso para Técnico em Informática da ALE-RR:

[COLE O CONTEÚDO PROGRAMÁTICO DO EDITAL AQUI]

Gere 30 questões TypeScript cobrindo OS TÓPICOS MAIS COBRADOS deste edital específico, seguindo o formato:

{
  id: 200,
  materia: "...",
  pergunta: "...",
  opcoes: ["...", "...", "...", "..."],
  correta: 0,
  explicacao: "..."
}

IDs: 200 a 229
Foque nos tópicos que têm maior peso no edital."
```

---

**BOA SORTE NA JORNADA PARA O TOP 5! 🏆**

Cada questão respondida é um passo mais perto da aprovação.
