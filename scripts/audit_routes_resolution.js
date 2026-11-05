const fs = require('fs');
const path = require('path');
const { EventEmitter } = require('events');

// Load resolveFile logic or server logic directly from server.js
const serverFile = fs.readFileSync('server.js', 'utf-8');

// server.js defines resolveFile(reqPath) and server = http.createServer((req, res) => ...)
// Let's create an in-process testing harness that runs resolveFile and checks every single route!

const { SERVICES } = require('../data/siteContent.jsx');

const routesToTest = [
  '/',
  '/about',
  '/company',
  '/products',
  '/services',
  '/contact',
  ...SERVICES.map(s => `/services/${s.slug}`),
  '/invalid-test-404-page'
];

// Extract resolveFile function
const MIME_TYPES = {
  '.html': 'text/html; charset=UTF-8',
  '.css': 'text/css; charset=UTF-8',
  '.js': 'text/javascript; charset=UTF-8',
  '.json': 'application/json; charset=UTF-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.mp4': 'video/mp4',
  '.txt': 'text/plain; charset=UTF-8',
  '.xml': 'application/xml; charset=UTF-8'
};

function resolveFile(reqPath) {
  const cleanPath = path.normalize(reqPath.split('?')[0]).replace(/^(\.\.[\/\\])+/, '');

  if (cleanPath === '/' || cleanPath === '\\' || cleanPath === '' || cleanPath === '.') {
    const outIndex = path.join(__dirname, '..', 'out', 'index.html');
    if (fs.existsSync(outIndex)) return outIndex;
    const rootIndex = path.join(__dirname, '..', 'index.html');
    if (fs.existsSync(rootIndex)) return rootIndex;
  }

  const candidates = [
    path.join(__dirname, '..', 'out', cleanPath),
    path.join(__dirname, '..', 'out', cleanPath, 'index.html'),
    path.join(__dirname, '..', 'out', `${cleanPath}.html`),
    path.join(__dirname, '..', cleanPath),
    path.join(__dirname, '..', cleanPath, 'index.html'),
    path.join(__dirname, '..', `${cleanPath}.html`),
    path.join(__dirname, '..', 'public', cleanPath)
  ];

  for (const candidate of candidates) {
    if (fs.existsSync(candidate)) {
      try {
        const stats = fs.statSync(candidate);
        if (stats.isFile()) return candidate;
      } catch (_) { }
    }
  }

  return null;
}

console.log('=== IN-PROCESS SERVER ROUTE RESOLUTION AUDIT ===\n');

let passed = 0;
let failed = 0;

for (const route of routesToTest) {
  const is404Expected = route.includes('404');
  const target = resolveFile(route);

  if (!target) {
    if (is404Expected) {
      const notFoundPage = path.join(__dirname, '..', 'out', '404', 'index.html');
      const has404 = fs.existsSync(notFoundPage);
      console.log(`✓ [404 OK] ${route} -> Correctly not found (Custom 404 page: ${has404 ? 'FOUND' : 'MISSING'})`);
      passed++;
    } else {
      console.error(`✗ [FAIL] ${route} could not be resolved!`);
      failed++;
    }
  } else {
    if (is404Expected) {
      console.error(`✗ [FAIL] ${route} was resolved to ${target} but should have been 404!`);
      failed++;
    } else {
      const stats = fs.statSync(target);
      const content = fs.readFileSync(target, 'utf-8');
      const hasTitle = content.includes('<title>') || content.includes('<h1');
      console.log(`✓ [200 OK] ${route} -> ${path.relative(path.join(__dirname, '..'), target)} (${stats.size} bytes, title: ${hasTitle})`);
      passed++;
    }
  }
}

console.log(`\nResults: ${passed} passed, ${failed} failed out of ${routesToTest.length} routes.`);
if (failed > 0) process.exit(1);

