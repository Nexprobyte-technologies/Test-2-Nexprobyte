const fs = require('fs');

const code = fs.readFileSync('test_nexprobyte_bundle.js', 'utf8');

const targets = ['_c', 'bc', 'wc', 'Cc', 'Ec', 'jc', 'Sc', 'Pc', 'yi', 'Ac', 'kc'];

targets.forEach(t => {
  const patterns = [
    `function ${t}(`,
    `function ${t} `,
    `const ${t}=`,
    `let ${t}=`,
    `var ${t}=`
  ];
  console.log(`\n=== Target: ${t} ===`);
  for (const p of patterns) {
    const idx = code.indexOf(p);
    if (idx !== -1) {
      console.log(`Found pattern "${p}" at index ${idx}:`);
      console.log(code.substring(idx, Math.min(code.length, idx + 800)));
      break;
    }
  }
});

