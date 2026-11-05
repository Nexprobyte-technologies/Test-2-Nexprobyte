const fs = require('fs');
const path = require('path');

console.log('===============================================================');
console.log('   NEXPROBYTE PRODUCTION RELIABILITY & FULL QA TEST SUITE');
console.log('===============================================================\n');

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;

function assert(condition, message) {
  totalTests++;
  if (condition) {
    passedTests++;
    console.log(`✓ [PASS] ${message}`);
  } else {
    failedTests++;
    console.error(`✗ [FAIL] ${message}`);
  }
}

// 1. Verify build artifacts
const outDir = path.join(__dirname, '..', 'out');
assert(fs.existsSync(outDir), 'Output directory "out" exists');
assert(fs.existsSync(path.join(outDir, 'index.html')), 'Home page out/index.html generated');
assert(fs.existsSync(path.join(outDir, 'about', 'index.html')), 'About page out/about/index.html generated');
assert(fs.existsSync(path.join(outDir, 'company', 'index.html')), 'Company page out/company/index.html generated');
assert(fs.existsSync(path.join(outDir, 'products', 'index.html')), 'Products page out/products/index.html generated');
assert(fs.existsSync(path.join(outDir, 'services', 'index.html')), 'Services catalog out/services/index.html generated');
assert(fs.existsSync(path.join(outDir, 'careers', 'index.html')), 'Careers page out/careers/index.html generated');
assert(fs.existsSync(path.join(outDir, 'careers', 'apply', 'index.html')), 'Career application out/careers/apply/index.html generated');
assert(fs.existsSync(path.join(outDir, 'contact', 'index.html')), 'Contact page out/contact/index.html generated');
assert(fs.existsSync(path.join(outDir, 'blog', 'index.html')), 'Blog catalog out/blog/index.html generated');
assert(fs.existsSync(path.join(outDir, 'interview-data', 'index.html')), 'Interview portal out/interview-data/index.html generated');
assert(fs.existsSync(path.join(outDir, '404', 'index.html')) || fs.existsSync(path.join(outDir, '404.html')), 'Custom 404 error page generated');

// 2. Verify all 12 services
const { SERVICES, JOBS, POSTS } = require('../data/siteContent.jsx');
assert(SERVICES.length === 12, `Services array has 12 disciplines (found ${SERVICES.length})`);

SERVICES.forEach(s => {
  const serviceFile = path.join(outDir, 'services', s.slug, 'index.html');
  const exists = fs.existsSync(serviceFile);
  assert(exists, `Service detail route "/services/${s.slug}" statically rendered`);
  if (exists) {
    const html = fs.readFileSync(serviceFile, 'utf-8');
    const htmlTitle = s.title.replace(/&/g, '&amp;');
    assert(html.includes(htmlTitle) || html.includes(s.title), `Service "${s.title}" contains title`);
    assert(html.includes('Breadcrumbs') || html.includes('Home') && html.includes('Services'), `Service "${s.slug}" contains breadcrumb navigation`);
    assert(html.includes('DEL-01') || html.includes('DEL-0'), `Service "${s.slug}" renders project deliverables`);
  }
});

// 3. Verify all 5 jobs
assert(JOBS.length === 5, `Jobs array has 5 positions (found ${JOBS.length})`);
JOBS.forEach(j => {
  const jobFile = path.join(outDir, 'careers', j.slug, 'index.html');
  const exists = fs.existsSync(jobFile);
  assert(exists, `Career job detail route "/careers/${j.slug}" statically rendered`);
  if (exists) {
    const html = fs.readFileSync(jobFile, 'utf-8');
    assert(html.includes(j.title), `Job "${j.title}" contains verbatim title`);
    assert(html.includes(j.salary), `Job "${j.title}" displays salary (${j.salary})`);
  }
});

// 4. Verify all 6 blog articles
assert(POSTS.length === 6, `Blog posts array has 6 articles (found ${POSTS.length})`);
POSTS.forEach(p => {
  const postFile = path.join(outDir, 'blog', p.slug, 'index.html');
  const exists = fs.existsSync(postFile);
  assert(exists, `Blog article route "/blog/${p.slug}" statically rendered`);
  if (exists) {
    const html = fs.readFileSync(postFile, 'utf-8');
    const htmlTitle = p.title.replace(/&/g, '&amp;');
    assert(html.includes(htmlTitle) || html.includes(p.title), `Blog post contains title`);
    assert(html.includes('Nexprobyte Engineering'), `Blog post contains author credentials`);
  }
});

// 5. Verify Performance & Asset Optimizations
const homeHtml = fs.readFileSync(path.join(outDir, 'index.html'), 'utf-8');
assert(!homeHtml.includes('Archivo:wght'), 'Render-blocking Archivo font request removed from HTML');
assert(!homeHtml.includes('Instrument+Serif'), 'Render-blocking Instrument Serif font request removed from HTML');
assert(homeHtml.includes('display=swap'), 'Font stylesheet uses display=swap to prevent FOIT (Flash of Invisible Text)');

const emblemPath = path.join(__dirname, '..', 'public', 'assets', 'cbe-emblem.png');
const emblemSize = fs.existsSync(emblemPath) ? fs.statSync(emblemPath).size : 999999;
assert(emblemSize < 50000, `Footer emblem compressed from 736KB down to ${Math.round(emblemSize / 1024)}KB (< 50KB)`);

const teamImgSize = fs.statSync(path.join(__dirname, '..', 'public', 'images', 'about-team.jpg')).size;
assert(teamImgSize < 300000, `Team photograph compressed down to ${Math.round(teamImgSize / 1024)}KB (< 300KB)`);

const workspaceImgSize = fs.statSync(path.join(__dirname, '..', 'public', 'images', 'about-workspace.jpg')).size;
assert(workspaceImgSize < 250000, `Workspace photograph compressed down to ${Math.round(workspaceImgSize / 1024)}KB (< 250KB)`);

// 6. Verify Critical UI & Stability Components
assert(homeHtml.includes('id="hanging-cord-stage"'), 'Hero hanging cord switch interactive stage rendered');
assert(homeHtml.includes('id="tech-badge-0"'), 'Suspended squircle tech cords rendered');
assert(homeHtml.includes('id="talent-visualizer"') || homeHtml.includes('id="card-3d-stage"'), '3D Talent Card Customizer stage rendered');
assert(homeHtml.includes('id="roi-calculator"'), 'ROI Cost Savings Calculator rendered');
assert(homeHtml.includes('id="nexi-fab-root"'), 'Global Nexi AI Chatbot root rendered');
assert(homeHtml.includes('id="floating-call-root"'), 'Floating direct phone hotline root rendered');
assert(homeHtml.includes('scroll-progress'), 'Scroll progress indicator element rendered');

// 7. Verify All 52 Services Coverage in Production Output
const all52Services = [
  "Virtual Administrative Assistant", "Data Entry & Data Management", "Email & Calendar Management",
  "Customer Support & Live Chat Support", "Lead Generation & Business Research", "Appointment Setting & Follow-ups",
  "CRM Management", "Social Media Management", "E-commerce Store Management", "Real Estate Virtual Assistance",
  "Full-Stack Developers", "Frontend Developers", "Backend Developers", "WordPress Developers",
  "Mobile App Developers — Android & iOS", "React & Flutter Developers", "UI/UX Designers",
  "Software Testers & QA Engineers", "DevOps & Cloud Support Engineers", "Dedicated Remote Development Teams",
  "Software Maintenance & Bug Fixing", "White-Label Development Support", "AI Virtual Assistant Setup",
  "AI Chatbot Development & Integration", "AI Customer Support Automation", "Email & WhatsApp Automation",
  "Workflow Automation Using Zapier, Make & n8n", "CRM & Sales Pipeline Automation", "Lead Collection & Follow-up Automation",
  "Appointment Booking Automation", "Automated Reporting & Data Processing", "AI-Powered Business Process Automation",
  "API Integration & Third-Party Integrations", "Automated Testing & QA Workflows", "Website Updates & Maintenance",
  "WordPress Website Management", "Shopify & WooCommerce Management", "Product Uploads & Catalogue Management",
  "Website Performance Monitoring", "Website Bug Fixing & Troubleshooting", "Website Backup & Security Maintenance",
  "Landing Page Development", "Website-to-CRM Integration", "Technical Support for Digital Agencies",
  "CRM Software Development", "Billing & Invoicing Software", "ERP Software Development",
  "Custom Business Software", "SaaS Application Development", "Database Management & Reporting",
  "Business Dashboard Development", "Third-Party Software Integration"
];

const normHome = homeHtml.toLowerCase().replace(/&amp;/g, '&').replace(/[—–-]/g, '-').replace(/\s+/g, ' ');
let missingServices = [];
all52Services.forEach(s => {
  const normS = s.toLowerCase().replace(/&amp;/g, '&').replace(/[—–-]/g, '-').replace(/\s+/g, ' ');
  if (!normHome.includes(normS)) {
    missingServices.push(s);
  }
});

assert(missingServices.length === 0, `All 52 of 52 PDF specification services present in production homepage (missing: ${missingServices.length})`);

console.log('\n===============================================================');
console.log(`   QA RESULTS: ${passedTests} PASSED, ${failedTests} FAILED (TOTAL: ${totalTests})`);
console.log('===============================================================\n');

if (failedTests > 0) {
  process.exit(1);
}
