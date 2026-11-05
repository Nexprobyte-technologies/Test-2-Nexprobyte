const fs = require('fs');
const path = require('path');

// Defined routes in Next.js app
const definedStaticRoutes = [
  '/',
  '/about',
  '/company',
  '/products',
  '/services',
  '/contact'
];

const { SERVICES } = require('../data/siteContent.jsx');

const dynamicRoutes = [
  ...SERVICES.map(s => `/services/${s.slug}`)
];

const allValidRoutes = new Set([
  ...definedStaticRoutes,
  ...dynamicRoutes,
  // normalized with trailing slash as well
  ...definedStaticRoutes.map(r => r === '/' ? '/' : r + '/'),
  ...dynamicRoutes.map(r => r + '/')
]);

function findLinks(dir) {
  let results = [];
  const files = fs.readdirSync(dir);
  for (const f of files) {
    const full = path.join(dir, f);
    if (fs.statSync(full).isDirectory()) {
      results = results.concat(findLinks(full));
    } else if (f.endsWith('.jsx') || f.endsWith('.js')) {
      const content = fs.readFileSync(full, 'utf-8');
      // match href="..." or to="..."
      const matches = content.matchAll(/(?:href|to)=['"](\/[^'"#?]*)/g);
      for (const m of matches) {
        results.push({ file: full, link: m[1] });
      }
    }
  }
  return results;
}

const found = findLinks('app').concat(findLinks('components'));
const broken = [];
for (const item of found) {
  const normLink = item.link.replace(/\/$/, '') || '/';
  if (!allValidRoutes.has(normLink) && !item.link.startsWith('/assets') && !item.link.startsWith('/images') && !item.link.startsWith('/favicon.ico')) {
    broken.push(item);
  }
}

console.log('Total valid routes:', allValidRoutes.size);
console.log('Total internal links scanned:', found.length);
console.log('Broken internal links count:', broken.length);
if (broken.length > 0) {
  console.log('Broken links:', broken);
}

