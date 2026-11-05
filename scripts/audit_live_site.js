const https = require('https');
const fs = require('fs');

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      // Follow redirect
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return fetchUrl(res.headers.location).then(resolve).catch(reject);
      }
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, body: data, headers: res.headers }));
    }).on('error', reject);
  });
}

async function audit() {
  const baseUrl = 'https://test-nexprobyte.vercel.app';
  console.log('Auditing:', baseUrl);

  const pagesToAudit = [
    '/',
    '/about',
    '/services',
    '/careers',
    '/contact',
    '/blog',
    '/interview-data'
  ];

  const results = {};

  for (const page of pagesToAudit) {
    try {
      console.log('Fetching', page);
      const res = await fetchUrl(baseUrl + page);
      results[page] = {
        status: res.status,
        length: res.body.length
      };

      // Extract all internal links
      const linkRegex = /href=["'](\/[^"'#\s]*)["']/g;
      const links = new Set();
      let match;
      while ((match = linkRegex.exec(res.body)) !== null) {
        links.add(match[1]);
      }
      results[page].links = Array.from(links);

      // Save body to disk for deep inspection
      const safeName = page.replace(/\//g, '_') || 'root';
      fs.writeFileSync(`live_${safeName}.html`, res.body, 'utf8');
    } catch (err) {
      console.error('Failed to fetch', page, err.message);
    }
  }

  console.log('=== AUDIT RESULTS ===');
  console.log(JSON.stringify(results, null, 2));

  // Find all service links across all fetched pages
  const allServiceLinks = new Set();
  for (const page in results) {
    if (results[page].links) {
      results[page].links.forEach(l => {
        if (l.startsWith('/services/')) {
          allServiceLinks.add(l);
        }
      });
    }
  }
  console.log('Discovered Service Links:', Array.from(allServiceLinks));

  // Audit each discovered service link
  for (const sLink of Array.from(allServiceLinks)) {
    try {
      console.log('Fetching Service:', sLink);
      const sRes = await fetchUrl(baseUrl + sLink);
      console.log(`Service ${sLink} status:`, sRes.status, 'body length:', sRes.body.length);
      const safeName = sLink.replace(/\//g, '_');
      fs.writeFileSync(`live_${safeName}.html`, sRes.body, 'utf8');
    } catch (err) {
      console.error('Failed to fetch service', sLink, err.message);
    }
  }
}

audit();

