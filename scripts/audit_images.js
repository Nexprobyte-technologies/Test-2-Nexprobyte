const fs = require('fs');
const path = require('path');

function findImages(dir) {
  let results = [];
  const files = fs.readdirSync(dir);
  for (const f of files) {
    const full = path.join(dir, f);
    if (fs.statSync(full).isDirectory()) {
      results = results.concat(findImages(full));
    } else if (f.endsWith('.jsx') || f.endsWith('.js')) {
      const content = fs.readFileSync(full, 'utf-8');
      const matches = content.matchAll(/['"]((\/(?:images|assets)\/[^'"]+?\.(?:png|jpg|jpeg|webp|svg|ico|gif|mp4)))['"]/g);
      for (const m of matches) {
        results.push({ file: full, img: m[1] });
      }
    }
  }
  return results;
}

const found = findImages('app').concat(findImages('components')).concat(findImages('data'));
const missing = [];
const existing = [];
for (const item of found) {
  const pubPath = path.join('public', item.img);
  if (!fs.existsSync(pubPath)) {
    missing.push(item);
  } else {
    existing.push(item.img);
  }
}
console.log('Unique images found:', new Set(found.map(i => i.img)).size);
console.log('Missing images count:', missing.length);
if (missing.length > 0) {
  console.log('Missing images details:', missing);
}

