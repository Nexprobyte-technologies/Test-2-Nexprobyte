const fs = require('fs');
const path = require('path');

const chunkDir = 'old_site_chunks';

function analyzeFile(filename) {
  const filePath = path.join(chunkDir, filename);
  if (!fs.existsSync(filePath)) return;
  const content = fs.readFileSync(filePath, 'utf8');

  console.log(`\n======================================================`);
  console.log(`FILE: ${filename} (Size: ${content.length} bytes)`);
  console.log(`======================================================`);

  // Extract all literal strings longer than 20 chars
  const strings = [];
  const strRegex = /"([^"\\]*(?:\\.[^"\\]*)*)"|'([^'\\]*(?:\\.[^'\\]*)*)'|`([^`\\]*(?:\\.[^`\\]*)*)`/g;
  let match;
  while ((match = strRegex.exec(content)) !== null) {
    const s = match[1] || match[2] || match[3] || '';
    if (s.length > 25 && !s.startsWith('M ') && !s.includes('calc(') && !s.includes('xmlns') && !s.includes('cubic-bezier')) {
      strings.push(s);
    }
  }

  // Remove duplicates
  const unique = Array.from(new Set(strings));
  console.log(`Found ${unique.length} content strings:`);
  unique.forEach((s, i) => {
    console.log(`[${i+1}] ${s.substring(0, 120)}${s.length > 120 ? '...' : ''}`);
  });
}

const files = fs.readdirSync(chunkDir).filter(f => f.endsWith('.js'));
files.forEach(analyzeFile);

