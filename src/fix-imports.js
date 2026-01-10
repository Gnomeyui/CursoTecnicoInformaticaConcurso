// Script para corrigir importações com versões grudadas
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const componentsDir = path.join(__dirname, 'components', 'ui');

// Padrões a serem substituídos
const patterns = [
  { from: /@radix-ui\/([a-z-]+)@[\d.]+/g, to: '@radix-ui/$1' },
  { from: /class-variance-authority@[\d.]+/g, to: 'class-variance-authority' },
  { from: /lucide-react@[\d.]+/g, to: 'lucide-react' },
  { from: /react-hook-form@[\d.]+/g, to: 'react-hook-form' }
];

function fixFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf-8');
    let modified = false;

    patterns.forEach(({ from, to }) => {
      if (from.test(content)) {
        content = content.replace(from, to);
        modified = true;
      }
    });

    if (modified) {
      fs.writeFileSync(filePath, content, 'utf-8');
      console.log(`✅ Corrigido: ${path.basename(filePath)}`);
      return true;
    }
    return false;
  } catch (error) {
    console.error(`❌ Erro em ${filePath}:`, error.message);
    return false;
  }
}

function processDirectory(dir) {
  let totalFixed = 0;

  try {
    const files = fs.readdirSync(dir);

    files.forEach(file => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);

      if (stat.isDirectory()) {
        totalFixed += processDirectory(filePath);
      } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
        if (fixFile(filePath)) {
          totalFixed++;
        }
      }
    });
  } catch (error) {
    console.error(`❌ Erro ao processar diretório ${dir}:`, error.message);
  }

  return totalFixed;
}

console.log('🔧 Iniciando correção de importações...\n');

const fixed = processDirectory(componentsDir);

console.log(`\n✨ Total de arquivos corrigidos: ${fixed}`);
console.log('\n🎉 Correção concluída!');
