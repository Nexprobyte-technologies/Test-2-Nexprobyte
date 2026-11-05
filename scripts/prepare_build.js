const fs = require('fs');
const path = require('path');

// Skip directory mutation on Vercel deployment containers to avoid permission conflicts
if (process.env.VERCEL || process.env.VERCEL_ENV || process.env.NOW_BUILDER) {
  console.log('✓ Vercel build environment detected - skipping local Windows pre-build setup.');
  process.exit(0);
}

const appDir = path.join(__dirname, '..', 'app');
const nextDir = path.join(__dirname, '..', '.next');
const outDir = path.join(__dirname, '..', 'out');

function getSubDirs(dir, base = '') {
  let subDirs = [base];
  const items = fs.readdirSync(dir, { withFileTypes: true });
  for (const item of items) {
    if (item.isDirectory()) {
      const rel = path.join(base, item.name);
      subDirs.push(rel);
      subDirs = subDirs.concat(getSubDirs(path.join(dir, item.name), rel));
    }
  }
  return subDirs;
}

// Mirror exact directory hierarchy from app folder to prevent Windows libuv mkdir race conditions
const appSubDirs = getSubDirs(appDir);

const targets = [
  path.join(nextDir, 'server', 'app'),
  path.join(nextDir, 'static', 'chunks', 'app'),
  path.join(nextDir, 'types', 'app'),
  outDir,
];

for (const target of targets) {
  for (const sub of appSubDirs) {
    const full = path.join(target, sub);
    try {
      fs.mkdirSync(full, { recursive: true });
    } catch (_) {}
  }
}

console.log(`✓ Build environment initialized (${appSubDirs.length} route targets prepared)`);
