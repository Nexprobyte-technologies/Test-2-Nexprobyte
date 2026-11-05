const fs = require('fs');

const code = fs.readFileSync('test_nexprobyte_bundle.js', 'utf8');

const slugs = [
  'website-development',
  'mobile-app-development',
  'application-development',
  'ui-ux-design',
  'branding-identity',
  'digital-marketing',
  'seo-services'
];

slugs.forEach(slug => {
  let pos = 0;
  console.log(`\n================== ${slug} ==================`);
  while ((pos = code.indexOf(slug, pos)) !== -1) {
    console.log(`Match at ${pos}:`);
    console.log(code.substring(Math.max(0, pos - 100), Math.min(code.length, pos + 400)));
    console.log('---');
    pos += slug.length;
  }
});

