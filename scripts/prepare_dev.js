const fs = require('fs');
const path = require('path');

// Target only stale production prerender manifests instead of wiping the entire .next build cache
// This keeps Webpack and SWC compiler caches intact for instant 1-second dev server launches
const manifests = [
  path.resolve(__dirname, '..', '.next', 'prerender-manifest.json'),
  path.resolve(__dirname, '..', '.next', 'server', 'prerender-manifest.json')
];

for (const m of manifests) {
  if (fs.existsSync(m)) {
    try {
      fs.unlinkSync(m);
      console.log(`✓ Cleared stale ${path.basename(m)} for rapid dev server launch.`);
    } catch (_) {}
  }
}
