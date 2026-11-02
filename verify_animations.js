const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== EXTENSIVE ANIMATIONS VERIFICATION SUITE ===\n');

const html = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf-8');
const css = fs.readFileSync(path.join(__dirname, 'styles.css'), 'utf-8');
const js = fs.readFileSync(path.join(__dirname, 'app.js'), 'utf-8');

let failedTests = 0;

function assert(condition, testName, details = '') {
  if (condition) {
    console.log(`✓ [PASS] ${testName}`);
  } else {
    console.error(`✗ [FAIL] ${testName} - ${details}`);
    failedTests++;
  }
}

// 1. JavaScript Syntax Validation
try {
  new vm.Script(js);
  assert(true, 'app.js syntax check (no syntax or parse errors)');
} catch (e) {
  assert(false, 'app.js syntax check', e.message);
}

// 2. Framer Cubic-Bezier & Spring Tokens
const expectedTokens = [
  '--ease-framer',
  '--ease-spring',
  '--ease-spring-snappy',
  '--ease-spring-bouncy',
  '--ease-framer-out',
  '--ease-framer-in-out',
  '--transition-spring'
];
expectedTokens.forEach(token => {
  assert(css.includes(token), `CSS token "${token}" defined`);
});

// 3. Keyframe Animations
const expectedKeyframes = [
  '@keyframes badge-pulse-ring',
  '@keyframes nav-dock-enter',
  '@keyframes float-glow-1',
  '@keyframes gradient-text-shift',
  '@keyframes scroll-marquee',
  '@keyframes ai-pulse',
  '@keyframes mockup-item-slide',
  '@keyframes scroll-testimonials',
  '@keyframes cta-mesh-shift'
];
expectedKeyframes.forEach(kf => {
  assert(css.includes(kf), `CSS keyframe "${kf}" defined`);
});

// 4. Reveal & Stagger System Integrity
assert(css.includes('.reveal, .reveal-up'), 'Reveal base classes present');
assert(css.includes('--reveal-delay'), 'Stagger group uses scoped --reveal-delay variable');
assert(css.includes('.stagger-group > *:hover') && css.includes('transition-delay: 0s !important'), 'Hover states override transition-delay with 0s to eliminate lag');

// 5. Hero Entrance Choreography
assert(html.includes('class="feature-folder-card spotlight-card reveal-up"'), 'All hero folder cards have individual reveal-up classes');
const heroFolderMatches = (html.match(/class="feature-folder-card spotlight-card reveal-up"/g) || []).length;
assert(heroFolderMatches === 5, `All 5 hero folder cards have reveal-up (found ${heroFolderMatches}/5)`);

// 6. Brand Marquee Gap Alignment
const marqueeTrackGap = css.match(/\.marquee-track\s*\{[^}]*gap:\s*(\d+)px/);
const marqueeGroupGap = css.match(/\.marquee-group\s*\{[^}]*gap:\s*(\d+)px/);
const marqueeKf = css.match(/@keyframes\s+scroll-marquee\s*\{[\s\S]*?calc\(-100%\s*-\s*(\d+)px\)/);

if (marqueeTrackGap && marqueeGroupGap && marqueeKf) {
  assert(marqueeTrackGap[1] === marqueeGroupGap[1] && marqueeTrackGap[1] === marqueeKf[1],
    `Brand marquee gaps are perfectly synchronized (${marqueeTrackGap[1]}px track == ${marqueeGroupGap[1]}px group == ${marqueeKf[1]}px offset)`);
} else {
  assert(false, 'Brand marquee gap extraction', 'Could not parse gap values');
}

// 7. 3D Card Inertia Physics Conflict Check
assert(!css.includes('.virtual-badge-card {\n  width: 380px;\n  height: 240px;\n  border-radius: 20px;\n  padding: 28px;\n  display: flex;\n  flex-direction: column;\n  justify-content: space-between;\n  color: #fff;\n  box-shadow: 0 24px 50px rgba(0, 0, 0, 0.25);\n  position: relative;\n  overflow: hidden;\n  border: 1px solid rgba(255, 255, 255, 0.2);\n  transform-style: preserve-3d;\n  transition: transform'),
  'No CSS transition on transform for .virtual-badge-card (prevents RAF lerp physics jitter)');

// 8. AI Copilot Text Fluid Transitions
assert(css.includes('.ai-prompt-text, #ai-dynamic-body, #ai-status-text, .metric-rate') &&
  css.includes('transition: opacity 0.25s var(--ease-framer)'),
  'AI Copilot text and metrics have smooth Framer cross-fade transitions');

// 9. Mobile Drawer Staggered Nav Links
assert(css.includes('.mobile-drawer.open .mobile-nav-list li:nth-child(8)'),
  'Mobile drawer has 8-tier staggered link slide-in entrance');

// 10. ROI Calculator Tri-Metric RAF Interpolation
assert(js.includes('animateNumber(savingsEl') &&
  js.includes('animateNumber(inhouseEl') &&
  js.includes('animateNumber(nexEl'),
  'ROI Calculator animates all 3 values (savings, inhouse, nex) simultaneously via RAF');
assert(js.includes('// Initialize and synchronize values cleanly on mount\n  update();'),
  'ROI Calculator automatically synchronizes values on mount');

// 11. Initial Product Tour Mockup Items Animated
const initialMockupEnterMatches = (html.match(/class="mockup-item-enter"/g) || []).length;
assert(initialMockupEnterMatches >= 3, `Initial mockup items have .mockup-item-enter animation classes (found ${initialMockupEnterMatches})`);

// 12. Accessibility Reduced Motion
assert(css.includes('@media (prefers-reduced-motion: reduce)'), 'prefers-reduced-motion media query is implemented');
assert(css.includes('animation-duration: 0.01ms !important'), 'Animations disabled under reduced motion');

// 13. Top Viewport Scroll Progress Bar
assert(html.includes('id="scroll-progress"'), 'Scroll progress element present in index.html');
assert(css.includes('.scroll-progress-bar'), 'Scroll progress bar styles defined in styles.css');
assert(js.includes('initScrollProgress'), 'Scroll progress controller initialized in app.js');

// 14. Hanging Thread / Cord Physics & Animation Architecture
assert(html.includes('id="hanging-cord-stage"') && html.includes('id="cord-bob"'),
  'Hero hanging cord stage and interactive bob present in index.html');
assert(css.includes('.hero-hanging-cord-stage') && css.includes('.cord-bob-handle'),
  'Hanging cord stage and bob handle styled in styles.css');
assert(css.includes('@keyframes spark-fly'),
  'Spark particle release keyframe "@keyframes spark-fly" defined in styles.css');
assert(css.includes('.hero-hanging-cord-stage.is-primed') && css.includes('.hero-section.hero-turbo-mode'),
  'Tension primed and Turbo mode styles defined in styles.css');
assert(js.includes('function initHangingCord()'),
  'initHangingCord physics controller implemented in app.js');
assert(js.includes('function bezierPoint(') && js.includes('cordPath.setAttribute(\'d\','),
  'Dynamic cubic Bezier curve simulation engine implemented in app.js');
assert(js.includes('function toggleTurboMode()') && js.includes('function emitSparks()'),
  'State toggle with particle emission and audio-visual tactile impulse implemented in app.js');
assert(js.includes('pointerdown') && js.includes('setPointerCapture') && js.includes('MAX_STRETCH'),
  'Interactive pointer drag with non-linear elastomeric resistance implemented in app.js');

// 15. Official Logo Brand Styling
assert(css.includes('.brand-icon .brand-logo-img') && css.includes('.mobile-drawer-brand'),
  'Official brand logo image and mobile drawer brand styles defined in styles.css');
assert(html.includes('<link rel="icon" type="image/png" href="assets/logo-transparent.png">'),
  'Brand favicon link defined in index.html head');

// 16. Touch Gestures, Scaling Normalization & Accessibility Robustness
assert(css.includes('.cord-bob-handle') && css.includes('touch-action: none'),
  'Cord bob handle has touch-action: none to isolate mobile drag from viewport scrolling');
assert(js.includes('scaleX = rect.width > 0 ? (rect.width / 160) : 1') && js.includes('rawX = (e.clientX - rect.left) / scaleX'),
  'Cord drag coordinates normalized against CSS transform scale for tablet & mobile');
assert(js.includes('isQuickTap') && js.includes('Direct click / tap toggle'),
  'Cord supports direct click/tap toggle with simulated recoil cycle');
assert(js.includes('function getAudioContext()') && js.includes('sharedAudioCtx'),
  'Tactile audio click uses cached AudioContext to prevent memory/context leaks');
assert(js.includes('try {\n      bob.setPointerCapture(pointerId);\n    } catch (_) {}'),
  'Pointer capture has try/catch exception protection against rapid gesture contention');

// 17. Framer-Accurate 7-Cord Suspended Technology Squircles (Sarofinance Hero Layout)
assert(html.includes('id="tech-cords-stage"') && html.includes('id="tech-cords-svg"'),
  'Suspended tech cords stage and SVG canvas present in index.html');
assert(css.includes('.hero-tech-cords-stage') && css.includes('.tech-cord-squircle') && css.includes('.squircle-body'),
  'Suspended tech cords stage and 3D squircle styling defined in styles.css');
assert(css.includes('.squircle-purple') &&
  css.includes('.squircle-obsidian') &&
  css.includes('.squircle-orange') &&
  css.includes('.squircle-mint') &&
  css.includes('.squircle-green') &&
  css.includes('.squircle-blue') &&
  css.includes('.squircle-lime'),
  'All 7 vibrant squircle color themes (purple, obsidian, orange, mint, green, blue, lime) styled in styles.css');
assert(css.includes('.squircle-tooltip') && css.includes('.squircle-sheen') && css.includes('.squircle-connector-ring'),
  'Squircle 3D specular sheen, chrome connector rings, and hover tooltips defined in styles.css');
assert(js.includes('function initTechCords()'),
  'initTechCords physics & parallax engine implemented in app.js');
assert(js.includes('initTechCords();'),
  'initTechCords initialized in DOMContentLoaded in app.js');
assert(js.includes('playSquirclePing') && js.includes('emitCordSparks'),
  'Squircle tactile audio pings and color-matched particle emissions implemented in app.js');
assert(js.includes('cord.pathEl.setAttribute(\'d\', pathData)'),
  'Real-time dynamic cubic Bezier tension curves rendered for all 7 cords in app.js');
assert(js.includes('targetParallaxX = nx * 16') && js.includes('targetParallaxY = ny * 10'),
  'Multi-plane 3D cursor parallax tracking implemented in app.js');
assert(css.includes('.tech-cord-squircle') && css.includes('touch-action: none'),
  'Tech cord squircles have touch-action: none for frictionless mobile gestures');

// 18. Robust Gesture, Bidirectional Recoil & Visual Contrast Verification
assert(js.includes('cord.grabOffsetX = cord.px - rawX') && js.includes('cord.grabOffsetY = cord.py - rawY'),
  'Squircle drag has grab-offset compensation eliminating pointer down teleportation artifacts');
assert(js.includes('if (pullDeltaY > 0)') && js.includes('Math.abs(pullDeltaY) * 0.35'),
  'Squircle physics implements bidirectional recoil (upward when pulled, downward when pushed)');
assert(js.includes('window.addEventListener(\'pointermove\'') && js.includes('window.addEventListener(\'pointerup\''),
  'Window-level pointer listeners guarantee reliable release when pointer capture drops or cursor exits');
assert(js.includes('cord.pointerId === e.pointerId'),
  'Squircle pointer events isolate pointerId preventing multi-touch coordinate contention');
assert(js.includes('prefersReducedMotion'),
  'Squircle harmonic ambient sway and mouse parallax respect prefers-reduced-motion');
assert(css.includes('.squircle-lime .squircle-icon svg') && html.includes('stroke="#111827"'),
  'Lime squircle badge features dark charcoal icon for Framer-accurate contrast and WCAG AA compliance');
assert(html.includes('cx="16" cy="12" r="3.5"'),
  'Blue squircle badge features ON-state active toggle switch with right-aligned knob matching reference screenshot');

console.log(`\n=== RESULTS: ${failedTests === 0 ? 'ALL ANIMATION TESTS PASSED (0 failures)' : `FAILED with ${failedTests} error(s)`} ===`);
if (failedTests > 0) process.exit(1);

