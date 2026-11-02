const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;

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

  // 1. Root index route
  if (cleanPath === '/' || cleanPath === '\\' || cleanPath === '' || cleanPath === '.') {
    const outIndex = path.join(__dirname, 'out', 'index.html');
    if (fs.existsSync(outIndex)) return outIndex;
    const rootIndex = path.join(__dirname, 'index.html');
    if (fs.existsSync(rootIndex)) return rootIndex;
  }

  // Potential search locations in priority order
  const candidates = [
    // Direct file in out/
    path.join(__dirname, 'out', cleanPath),
    // Directory index in out/ (e.g. /about -> out/about/index.html)
    path.join(__dirname, 'out', cleanPath, 'index.html'),
    // HTML extension in out/ (e.g. /about -> out/about.html)
    path.join(__dirname, 'out', `${cleanPath}.html`),
    // Direct file in root
    path.join(__dirname, cleanPath),
    // Directory index in root
    path.join(__dirname, cleanPath, 'index.html'),
    // HTML extension in root
    path.join(__dirname, `${cleanPath}.html`),
    // Public directory
    path.join(__dirname, 'public', cleanPath)
  ];

  for (const candidate of candidates) {
    if (fs.existsSync(candidate)) {
      try {
        const stats = fs.statSync(candidate);
        if (stats.isFile()) {
          return candidate;
        }
      } catch (_) {}
    }
  }

  return null;
}

const server = http.createServer((req, res) => {
  const targetFile = resolveFile(req.url);

  if (!targetFile) {
    // 404 handler
    const notFoundPage = path.join(__dirname, 'out', '404', 'index.html');
    if (fs.existsSync(notFoundPage)) {
      res.writeHead(404, { 'Content-Type': 'text/html; charset=UTF-8' });
      fs.createReadStream(notFoundPage).pipe(res);
      return;
    }
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=UTF-8' });
    res.end('404 Page Not Found - Nexprobyte Technologies');
    return;
  }

  const ext = path.extname(targetFile).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  res.writeHead(200, {
    'Content-Type': contentType,
    'Cache-Control': ext === '.html' ? 'no-cache' : 'public, max-age=31536000, immutable',
    'Access-Control-Allow-Origin': '*'
  });

  fs.createReadStream(targetFile).pipe(res);
});

server.listen(PORT, () => {
  console.log(`Nexprobyte Technologies Multi-Page Server running at http://localhost:${PORT}`);
  console.log(`- Dedicated Routes: /about, /services, /blog, /careers, /contact, /interview-data, /services/[slug], /blog/[slug], /careers/[slug]`);
});
