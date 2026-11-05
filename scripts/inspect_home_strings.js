const fs = require('fs');

const code = fs.readFileSync('old_site_chunks/Home-CsrFNAcI.js', 'utf8');

// Extract all literal strings longer than 20 chars
const strings = [];
const strRegex = /"([^"\\]*(?:\\.[^"\\]*)*)"|'([^'\\]*(?:\\.[^'\\]*)*)'|`([^`\\]*(?:\\.[^`\\]*)*)`/g;
let match;
while ((match = strRegex.exec(code)) !== null) {
  const s = match[1] || match[2] || match[3] || '';
  if (s.length > 25 && !s.startsWith('M ') && !s.includes('calc(') && !s.includes('xmlns') && !s.includes('cubic-bezier') && !s.includes('data:image')) {
    strings.push(s);
  }
}

const unique = Array.from(new Set(strings));
console.log(`Home-CsrFNAcI.js has ${unique.length} strings:`);
unique.forEach((s, i) => {
  console.log(`[${i+1}] ${s}`);
});

