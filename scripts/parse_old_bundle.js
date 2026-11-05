const fs = require('fs');

const code = fs.readFileSync('test_nexprobyte_bundle.js', 'utf8');

// 1. Find all strings in bundle that look like paths
const pathMatches = code.match(/path:\s*["'][^"']+["']/g) || [];
console.log('Routes in bundle:', pathMatches);

// 2. Find services array
// Look for slug definitions
const slugMatches = code.match(/slug:\s*["'][^"']+["']/g) || [];
console.log('All slugs in bundle:', slugMatches);

// 3. Find navigation / pages
const navMatches = code.match(/label:\s*["'][^"']+["']/g) || [];
console.log('Labels in bundle:', navMatches);

// 4. Find all objects with title, overview, features, etc.
// Let's search for "SERVICES" or array of services
console.log('\nSearching for service objects:');
const srvKeywords = ['website-development', 'mobile-app', 'seo', 'marketing', 'application-development', 'branding'];
srvKeywords.forEach(kw => {
  const idx = code.indexOf(kw);
  console.log(`Keyword "${kw}" at index:`, idx);
  if (idx !== -1) {
    console.log(code.substring(idx - 150, idx + 350));
    console.log('---');
  }
});

