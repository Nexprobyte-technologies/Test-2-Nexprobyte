const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, 'out');
const rootDir = __dirname;

const routes = [
  { outPath: 'about/index.html', rootPath: 'about.html' },
  { outPath: 'services/index.html', rootPath: 'services.html' },
  { outPath: 'blog/index.html', rootPath: 'blog.html' },
  { outPath: 'careers/index.html', rootPath: 'careers.html' },
  { outPath: 'careers/apply/index.html', rootPath: 'careers-apply.html' },
  { outPath: 'contact/index.html', rootPath: 'contact.html' },
  { outPath: 'interview-data/index.html', rootPath: 'interview-data.html' },
  
  // Services slugs
  { outPath: 'services/website-development/index.html', rootPath: 'services/website-development.html' },
  { outPath: 'services/application-development/index.html', rootPath: 'services/application-development.html' },
  { outPath: 'services/mobile-app-development/index.html', rootPath: 'services/mobile-app-development.html' },
  { outPath: 'services/digital-marketing/index.html', rootPath: 'services/digital-marketing.html' },
  { outPath: 'services/seo-services/index.html', rootPath: 'services/seo-services.html' },
  { outPath: 'services/social-media-marketing/index.html', rootPath: 'services/social-media-marketing.html' },
  { outPath: 'services/ui-ux-design/index.html', rootPath: 'services/ui-ux-design.html' },
  { outPath: 'services/branding-identity/index.html', rootPath: 'services/branding-identity.html' },

  // Blog slugs
  { outPath: 'blog/why-every-business-needs-a-website-in-2026/index.html', rootPath: 'blog/why-every-business-needs-a-website-in-2026.html' },
  { outPath: 'blog/seo-basics-that-actually-move-the-needle/index.html', rootPath: 'blog/seo-basics-that-actually-move-the-needle.html' },
  { outPath: 'blog/mobile-first-design-is-not-optional/index.html', rootPath: 'blog/mobile-first-design-is-not-optional.html' },
  { outPath: 'blog/social-media-strategy-for-smes/index.html', rootPath: 'blog/social-media-strategy-for-smes.html' },
  { outPath: 'blog/web-performance-is-a-business-metric/index.html', rootPath: 'blog/web-performance-is-a-business-metric.html' },
  { outPath: 'blog/what-is-a-digital-agency-and-how-to-choose-one/index.html', rootPath: 'blog/what-is-a-digital-agency-and-how-to-choose-one.html' },

  // Career slugs
  { outPath: 'careers/frontend-developer/index.html', rootPath: 'careers/frontend-developer.html' },
  { outPath: 'careers/fullstack-developer/index.html', rootPath: 'careers/fullstack-developer.html' },
  { outPath: 'careers/ui-ux-designer/index.html', rootPath: 'careers/ui-ux-designer.html' },
  { outPath: 'careers/seo-analyst/index.html', rootPath: 'careers/seo-analyst.html' },
  { outPath: 'careers/digital-marketing-specialist/index.html', rootPath: 'careers/digital-marketing-specialist.html' }
];

// Ensure directories exist
['services', 'blog', 'careers'].forEach(dir => {
  const p = path.join(rootDir, dir);
  if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true });
});

let count = 0;
for (const r of routes) {
  const src = path.join(outDir, r.outPath);
  const dest = path.join(rootDir, r.rootPath);
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dest);
    console.log(`✓ Copied: ${r.outPath} -> ${r.rootPath}`);
    count++;
  } else {
    console.warn(`! Missing source: ${src}`);
  }
}

// Copy _next static assets to root _next if not existing
const srcNext = path.join(outDir, '_next');
const destNext = path.join(rootDir, '_next');
if (fs.existsSync(srcNext)) {
  fs.cpSync(srcNext, destNext, { recursive: true });
  console.log('✓ Synchronized _next directory into root');
}

console.log(`\n=== ALL ${count} DEDICATED MULTI-PAGE HTML ROUTES SUCCESSFULLY CREATED ===`);
