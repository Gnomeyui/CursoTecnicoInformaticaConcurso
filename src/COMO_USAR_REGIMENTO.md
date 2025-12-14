# 📖 Como Usar o Regimento Interno no App ALE-RR TOP 1

## ✅ Implementação Concluída

O sistema de leitura do Regimento Interno está **100% funcional** e integrado ao app!

## 🎯 Funcionalidades Disponíveis

### 1. **Visualização Estruturada**
- ✅ Navegação por Títulos → Capítulos → Artigos
- ✅ Interface hierárquica expansível
- ✅ Breadcrumb para localização

### 2. **Busca Inteligente**
- ✅ Busca por número de artigo (ex: "Art. 25")
- ✅ Busca por palavra-chave
- ✅ Busca em parágrafos e incisos
- ✅ Destaque visual dos resultados

### 3. **Sistema de Favoritos**
- ✅ Marcar artigos importantes com estrela
- ✅ Acesso rápido aos artigos favoritos
- ✅ Persistência local

### 4. **Leitura Otimizada**
- ✅ Visualização completa de artigos
- ✅ Exibição de parágrafos e incisos
- ✅ Tema personalizado por cor
- ✅ Modo escuro/claro

## 📁 Estrutura de Arquivos

```
/data/regimento-interno-ale-rr.json  ← JSON com o regimento
/components/RegimentoReader.tsx      ← Componente de leitura
/components/RegimentoInterno.tsx     ← Wrapper integrado ao app
```

## 📝 Formato do JSON

O arquivo `/data/regimento-interno-ale-rr.json` contém o regimento estruturado:

```json
{
  "documento": {
    "titulo": "Regimento Interno da Assembleia Legislativa do Estado de Roraima",
    "ultima_atualizacao": "Resolução Legislativa N° 002/2021",
    "fonte_arquivo": "..."
  },
  "conteudo": [
    {
      "titulo": "TÍTULO I - DISPOSIÇÕES PRELIMINARES",
      "capitulos": [
        {
          "nome": "CAPÍTULO I - DA SEDE",
          "artigos": [
            {
              "numero": "1",
              "texto": "A Assembleia Legislativa...",
              "paragrafos": ["§1º ...", "§2º ..."],
              "incisos": ["I - ...", "II - ..."]
            }
          ]
        }
      ]
    }
  ]
}
```

## 🔧 Como Adicionar Mais Artigos

### Opção 1: Editar JSON Diretamente

1. Abra `/data/regimento-interno-ale-rr.json`
2. Adicione novos títulos/capítulos/artigos seguindo o formato
3. Salve o arquivo

### Opção 2: Colar Regimento Completo

Eu já criei um JSON com alguns artigos de exemplo. Você pode:

1. **Copiar o regimento completo em PDF**
2. **Converter para JSON** usando o formato acima
3. **Substituir** o conteúdo do arquivo

### Exemplo de Adição de Artigo

```json
{
  "numero": "84",
  "texto": "Aos Deputados, aplicam-se, no que couber, as prerrogativas e deveres contidas nas Constituições Federal e Estadual.",
  "paragrafos": [],
  "incisos": []
}
```

## 🎨 Personalização por Tema

O componente se adapta automaticamente aos 5 temas do app:
- 🔵 Azul (padrão)
- 🟢 Verde
- 🟣 Roxo
- 🟠 Laranja
- 🌸 Rosa

Cores são aplicadas em:
- Header principal
- Bordas dos cards de artigos
- Fundo de leitura
- Ícones de navegação

## 🚀 Como Acessar no App

1. **Dashboard** → Toque no card "Regimento Interno"
2. **Navegue** pelos títulos e capítulos
3. **Busque** artigos específicos
4. **Favorite** artigos importantes
5. **Leia** com formatação otimizada

## 📊 Estatísticas do Regimento Atual

- ✅ **3 Títulos** implementados
- ✅ **4 Capítulos** organizados
- ✅ **15 Artigos** de exemplo
- ✅ Sistema preparado para **296 artigos completos**

## 💡 Dicas de Uso para Estudantes

1. **Use a busca** para encontrar artigos rapidamente
2. **Favorite** os artigos mais cobrados em provas
3. **Leia na ordem** para entender a estrutura
4. **Compare** com as questões do quiz
5. **Revise** artigos favoritos antes da prova

## 🔗 Integração com Quiz

O sistema está preparado para:
- ✅ Link direto de questões para artigos relacionados
- ✅ Referência cruzada entre quiz e regimento
- ✅ Botão "Ver no Regimento" nas respostas das questões

## 🎯 Próximos Passos

Para completar o regimento:

1. **Obter PDF oficial** do Regimento Interno ALE-RR
2. **Converter para JSON** seguindo o formato
3. **Adicionar todos os 296 artigos**
4. **Revisar** formatação e parágrafos
5. **Testar** busca e navegação

## 📞 Suporte

Se tiver dúvidas sobre como adicionar o regimento completo, me avise!
Posso ajudar a:
- Converter PDF para JSON
- Formatar artigos específicos
- Adicionar funcionalidades extras
- Otimizar a busca

---

**Desenvolvido para o concurso ALE-RR 2025 - Rumo ao TOP 1! 🏆**
