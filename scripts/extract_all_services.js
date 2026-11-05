const fs = require('fs');

const code = fs.readFileSync('test_nexprobyte_bundle.js', 'utf8');

// Find all occurrences of /services/ in the code
const serviceRoutes = new Set();
const sRegex = /["']\/services\/([a-zA-Z0-9_-]+)["']/g;
let m;
while ((m = sRegex.exec(code)) !== null) {
  serviceRoutes.add(m[1]);
}

console.log('All /services/:slug found in bundle:');
console.log(Array.from(serviceRoutes));

// Let's search where these slugs are defined with their content
Array.from(serviceRoutes).forEach(slug => {
  const idx = code.indexOf(`"${slug}"`) !== -1 ? code.indexOf(`"${slug}"`) : code.indexOf(`'${slug}'`);
  console.log(`\n=== SLUG: ${slug} (index: ${idx}) ===`);
  if (idx !== -1) {
    // print 500 characters around it
    console.log(code.substring(Math.max(0, idx - 100), Math.min(code.length, idx + 600)));
  }
});

