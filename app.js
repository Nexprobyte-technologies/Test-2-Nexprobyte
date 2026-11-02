/**
 * NEXPROBYTE TECHNOLOGIES - APPLICATION CONTROLLER
 * Reverse-Engineered Micro-Interactions, 3D Physics, State Machines, & Animations
 * Inspired by Framer High-End Fintech Architecture
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileDrawer();
  initScrollNav();
  initScrollProgress();
  initScrollReveals();
  initSpotlightCards();
  initAnimatedCounters();
  initButtonMicroInteractions();
  initLiveStreamTicker();
  initAICopilot();
  initTourTabs();
  initRoiCalculator();
  initTalentCustomizer();
  initPricingToggle();
  initFaqAccordion();
  initContactForm();
  initNewsletterForm();
  initHangingCord();
  initTechCords();
  initServicesTabs();
  initCapabilitiesShowcase();
  initBlogSystem();
  initCareersSystem();
  initNexiChatbot();
  initContactTopics();
  initModalBackdrops();
});

/* ==========================================================================
   1. MOBILE DRAWER CONTROLLER & ACCESSIBILITY
   ========================================================================== */
function initMobileDrawer() {
  const toggleBtn = document.getElementById('mobile-toggle');
  const drawer = document.getElementById('mobile-drawer');

  if (toggleBtn && drawer) {
    toggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = drawer.classList.toggle('open');
      toggleBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    // Close on click outside drawer content
    drawer.addEventListener('click', (e) => {
      if (e.target === drawer) {
        window.closeDrawer();
      }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && drawer.classList.contains('open')) {
        window.closeDrawer();
      }
    });
  }
}

window.closeDrawer = function() {
  const drawer = document.getElementById('mobile-drawer');
  const toggleBtn = document.getElementById('mobile-toggle');
  if (drawer) {
    drawer.classList.remove('open');
  }
  if (toggleBtn) {
    toggleBtn.setAttribute('aria-expanded', 'false');
  }
};

/* ==========================================================================
   2. STICKY DOCK SCROLL SPY & ELEVATION
   ========================================================================== */
function initScrollNav() {
  const navDock = document.getElementById('main-nav');
  const navLinksContainer = document.getElementById('nav-links');
  const hoverPill = document.getElementById('nav-hover-pill');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links .nav-link');
  const navItems = document.querySelectorAll('.nav-links .nav-item');

  if (!navDock) return;

  // 1. Sliding hover pill indicator across navigation dock links
  if (navLinksContainer && hoverPill && navItems.length > 0) {
    function movePillTo(element) {
      if (!element) return;
      const rect = element.getBoundingClientRect();
      const containerRect = navLinksContainer.getBoundingClientRect();
      const left = rect.left - containerRect.left;
      const top = rect.top - containerRect.top;
      hoverPill.style.width = `${rect.width}px`;
      hoverPill.style.height = `${rect.height}px`;
      hoverPill.style.transform = `translate3d(${left}px, ${top}px, 0)`;
      hoverPill.style.opacity = '1';
    }

    navItems.forEach(item => {
      item.addEventListener('mouseenter', () => {
        movePillTo(item);
      });
    });

    navLinksContainer.addEventListener('mouseleave', () => {
      const activeLink = navLinksContainer.querySelector('.nav-link.active');
      if (activeLink && activeLink.closest('.nav-item')) {
        movePillTo(activeLink.closest('.nav-item'));
      } else {
        hoverPill.style.opacity = '0';
      }
    });
  }

  function onScroll() {
    // Fixed dock scroll behavior: subtle scaling/elevation/blur shift on scroll
    if (window.scrollY > 30) {
      navDock.classList.add('scrolled');
      navDock.style.background = 'rgba(255, 255, 255, 0.94)';
      navDock.style.boxShadow = '0 16px 40px -15px rgba(20, 20, 20, 0.2), 0 2px 6px rgba(0, 0, 0, 0.05)';
    } else {
      navDock.classList.remove('scrolled');
      navDock.style.background = 'rgba(255, 255, 255, 0.85)';
      navDock.style.boxShadow = 'var(--shadow-dock)';
    }

    // ScrollSpy active link detection
    let currentSectionId = '';
    const scrollPos = window.scrollY + 120;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentSectionId = section.getAttribute('id');
      }
    });

    if (currentSectionId) {
      navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === `#${currentSectionId}`) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      });
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ==========================================================================
   2B. TOP VIEWPORT SCROLL PROGRESS INDICATOR
   ========================================================================== */
function initScrollProgress() {
  const progressBar = document.getElementById('scroll-progress');
  if (!progressBar) return;

  function updateProgress() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? Math.min(Math.max(scrollTop / docHeight, 0), 1) : 0;
    progressBar.style.transform = `scaleX(${progress})`;
  }

  window.addEventListener('scroll', updateProgress, { passive: true });
  window.addEventListener('resize', updateProgress, { passive: true });
  updateProgress();
}

/* ==========================================================================
   2C. FRAMER SCROLL ENTRANCE REVEALS & STAGGER ORCHESTRATION
   ========================================================================== */
function initScrollReveals() {
  const reveals = document.querySelectorAll('.reveal, .reveal-up, .reveal-scale, .reveal-fade');
  if (!reveals.length) return;

  if (!('IntersectionObserver' in window)) {
    reveals.forEach(el => el.classList.add('is-revealed'));
    return;
  }

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        obs.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.08,
    rootMargin: '0px 0px -30px 0px'
  });

  const aboveFold = [];

  reveals.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.95 && rect.bottom > 0) {
      aboveFold.push(el);
    } else {
      observer.observe(el);
    }
  });

  // Choreographed reveal for above-the-fold hero elements after initial paint
  requestAnimationFrame(() => {
    setTimeout(() => {
      aboveFold.forEach((el, idx) => {
        setTimeout(() => {
          el.classList.add('is-revealed');
        }, idx * 60);
      });
    }, 40);
  });
}

/* ==========================================================================
   2D. DYNAMIC CURSOR SPOTLIGHT TRACKING (BENTO & SERVICE CARDS)
   ========================================================================== */
function initSpotlightCards() {
  const cards = document.querySelectorAll('.spotlight-card, .platform-card, .service-card, .pricing-card, .feature-folder-card, .faq-card-support');

  cards.forEach(card => {
    let ticking = false;
    card.addEventListener('mousemove', (e) => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          card.style.setProperty('--mouse-x', `${x}px`);
          card.style.setProperty('--mouse-y', `${y}px`);
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  });
}

/* ==========================================================================
   2E. FRAMER METRIC COUNTUP & VALUE ANIMATOR
   ========================================================================== */
function initAnimatedCounters() {
  const counterElements = document.querySelectorAll('[data-counter-target]');
  if (!counterElements.length) return;

  function runCounter(el) {
    if (el.dataset.counterStarted === 'true') return;
    el.dataset.counterStarted = 'true';

    const target = parseFloat(el.getAttribute('data-counter-target'));
    const prefix = el.getAttribute('data-counter-prefix') || '';
    const suffix = el.getAttribute('data-counter-suffix') || '';
    const decimals = parseInt(el.getAttribute('data-counter-decimals') || '0', 10);
    const duration = 1200; // ms
    const startTime = performance.now();

    function update(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Framer cubic ease-out
      const ease = 1 - Math.pow(1 - progress, 3);
      const current = target * ease;
      const formatted = decimals > 0 ? current.toFixed(decimals) : Math.round(current).toLocaleString();
      el.textContent = `${prefix}${formatted}${suffix}`;

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        const finalFormatted = decimals > 0 ? target.toFixed(decimals) : target.toLocaleString();
        el.textContent = `${prefix}${finalFormatted}${suffix}`;
      }
    }

    requestAnimationFrame(update);
  }

  if (!('IntersectionObserver' in window)) {
    counterElements.forEach(runCounter);
    return;
  }

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        runCounter(entry.target);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  counterElements.forEach(el => observer.observe(el));
}

/* ==========================================================================
   2F. BUTTON MAGNETIC & SPRING PRESS MICRO-INTERACTIONS
   ========================================================================== */
function initButtonMicroInteractions() {
  const buttons = document.querySelectorAll('.btn-primary-hero, .btn-secondary-hero, .btn-primary-sm, .btn-submit, .service-link');
  buttons.forEach(btn => {
    const reset = () => {
      btn.style.transform = '';
    };
    btn.addEventListener('pointerdown', () => {
      btn.style.transform = 'scale(0.96) translateY(1px)';
    });
    btn.addEventListener('pointerup', reset);
    btn.addEventListener('pointercancel', reset);
    btn.addEventListener('pointerleave', reset);
    btn.addEventListener('blur', reset);
  });
}

/* ==========================================================================
   3. LIVE OPERATIONAL STREAM TICKER
   ========================================================================== */
function initLiveStreamTicker() {
  const streamContainer = document.getElementById('stream-container');
  if (!streamContainer) return;

  const mockTasks = [
    { title: 'Stripe Billing & Invoicing Webhook Synced', badge: 'Custom Software', result: '+142 Invoices Settled', color: 'metric-blue' },
    { title: 'PostgreSQL Database Query Optimization', badge: 'DevOps & Cloud', result: '-65% Latency Drop', color: '' },
    { title: 'Shopify Flash Sale Speed Monitoring', badge: 'Web Support', result: '99/100 PageSpeed', color: 'metric-blue' },
    { title: 'Executive Travel Booking & Itinerary', badge: 'Admin VA', result: 'Synced SFO &rarr; DXB', color: '' },
    { title: 'Lead Gen & Apollo Contact Scraping', badge: 'VA Services', result: '+850 High-Intent Leads', color: 'metric-blue' },
    { title: 'Flutter iOS Build Staging TestFlight', badge: 'Mobile Team', result: 'Build #114 Passed', color: '' },
    { title: 'WhatsApp Business AI Qualification Agent', badge: 'AI Automation', result: '24 Leads Routed in 2.1s', color: 'metric-blue' }
  ];

  let taskIndex = 0;

  setInterval(() => {
    const task = mockTasks[taskIndex % mockTasks.length];
    taskIndex++;

    const newItem = document.createElement('div');
    newItem.className = 'stream-item';
    newItem.style.opacity = '0';
    newItem.style.transform = 'translateY(-10px)';
    newItem.style.transition = 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)';

    newItem.innerHTML = `
      <div class="stream-left">
        <span class="stream-dot"></span>
        <span class="stream-name">${task.title}</span>
        <span class="stream-badge">${task.badge}</span>
      </div>
      <span class="stream-right ${task.color}">${task.result}</span>
    `;

    streamContainer.insertBefore(newItem, streamContainer.firstChild);

    requestAnimationFrame(() => {
      newItem.style.opacity = '1';
      newItem.style.transform = 'translateY(0)';
    });

    if (streamContainer.children.length > 4) {
      const last = streamContainer.lastElementChild;
      last.style.opacity = '0';
      setTimeout(() => {
        if (streamContainer.children.length > 4 && last.parentNode === streamContainer) {
          streamContainer.removeChild(last);
        }
      }, 300);
    }
  }, 4500);
}

/* ==========================================================================
   4. AI COPILOT INTERACTIVE PLAYGROUND
   ========================================================================== */
function initAICopilot() {
  const chips = document.querySelectorAll('.ai-chip[data-prompt]');
  const activePrompt = document.getElementById('ai-active-prompt');
  const statusText = document.getElementById('ai-status-text');
  const dynamicBody = document.getElementById('ai-dynamic-body');
  const m1 = document.getElementById('ai-metric-1');
  const m2 = document.getElementById('ai-metric-2');
  const m3 = document.getElementById('ai-metric-3');

  const scenarios = {
    leads: {
      prompt: '"Qualify all leads from LinkedIn & Web, enrich revenue, and schedule discovery call."',
      status: 'Workflow Executed • 3 Active Agents Triggered',
      body: 'Found 14 qualified prospects this hour. Filtered 3 enterprise targets (>$5M ARR). Dispatched personalized WhatsApp & calendar invite with dynamic booking link.',
      metrics: ['99.2%', '< 1.8s', '+42%']
    },
    support: {
      prompt: '"Deploy 24/7 autonomous customer support agent with order status tracking."',
      status: 'AI Customer Care Active • Live on Zendesk & WhatsApp',
      body: 'Resolved 84 tier-1 customer inquiries with 0 human handoffs. Escalated 2 enterprise returns directly to Senior VA. Customer satisfaction score maintained at 99.6%.',
      metrics: ['99.6%', '42s avg', '-78%']
    },
    sprint: {
      prompt: '"Analyze sprint velocity, GitHub PR cycle times, and commit bottlenecks."',
      status: 'Sprint Analytics Synced • 4 Senior Engineers Online',
      body: 'Active sprint #04 on track. Code review cycle time down to 2.4 hours. Zero deployment blockers detected on AWS production cluster.',
      metrics: ['99.8%', '2.4 hrs', '+68%']
    }
  };

  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      chips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');

      const key = chip.getAttribute('data-prompt');
      const data = scenarios[key];

      if (data && activePrompt && statusText && dynamicBody && m1 && m2 && m3) {
        const demoWindow = document.querySelector('.ai-demo-window');
        if (demoWindow) {
          demoWindow.classList.add('ai-window-active-pulse');
          setTimeout(() => demoWindow.classList.remove('ai-window-active-pulse'), 600);
        }

        activePrompt.style.opacity = '0.3';
        activePrompt.style.transform = 'translateY(4px)';
        dynamicBody.style.opacity = '0.3';
        dynamicBody.style.transform = 'translateY(4px)';

        setTimeout(() => {
          activePrompt.textContent = data.prompt;
          statusText.textContent = data.status;
          dynamicBody.textContent = data.body;
          m1.textContent = data.metrics[0];
          m2.textContent = data.metrics[1];
          m3.textContent = data.metrics[2];

          activePrompt.style.opacity = '1';
          activePrompt.style.transform = 'translateY(0)';
          dynamicBody.style.opacity = '1';
          dynamicBody.style.transform = 'translateY(0)';
        }, 160);
      }
    });
  });
}

/* ==========================================================================
   5. INTERACTIVE 5-TAB PRODUCT TOUR (100% PDF COVERAGE)
   ========================================================================== */
function initTourTabs() {
  const tabs = document.querySelectorAll('.tour-tab[data-tour]');
  const badge = document.getElementById('tour-badge');
  const heading = document.getElementById('tour-heading');
  const paragraph = document.getElementById('tour-paragraph');
  const list = document.getElementById('tour-list');
  const mockupHeader = document.getElementById('mockup-header');
  const mockupItems = document.getElementById('mockup-items');

  const tourData = {
    va: {
      badge: 'Elite Virtual Assistants',
      heading: 'Executive VAs Managing Your Core Workflows',
      paragraph: 'From calendar and email coordination to real estate CRM data entry and e-commerce catalogue management, our assistants work as a dedicated extension of your company.',
      list: [
        'Zero training curve with standard operating procedure (SOP) frameworks',
        'Direct Slack, Teams, and Email integration with daily accountability logs',
        'Weekly executive timesheet and task delivery digests'
      ],
      mockHeader: 'VA Operations Board • Synced Live',
      items: [
        { title: 'Inbox Zero Maintenance', sub: 'Filtered 140 emails, drafted 28 replies', status: 'Done', color: 'var(--accent-green)' },
        { title: 'Client Appointment Setting', sub: '8 Zoom meetings booked across EST & GMT', status: 'In Progress', color: 'var(--accent-blue)' },
        { title: 'Real Estate CRM Data Entry', sub: '65 MLS listings parsed and tagged', status: 'Done', color: 'var(--accent-green)' }
      ]
    },
    dev: {
      badge: 'Dedicated Tech Manpower',
      heading: 'Senior Engineers Embedded Directly in Your Sprints',
      paragraph: 'Full-stack, frontend, backend, Flutter, and DevOps engineers ready to push code in 48 hours. Zero recruiter fees, full IP ownership, and strict CI/CD discipline.',
      list: [
        'Top 1% senior talent vetted for algorithmic and architecture rigor',
        'Daily standups and GitHub PR reviews matching your exact time zone',
        'Dedicated remote pods with QA automation engineering included'
      ],
      mockHeader: 'Sprint Pod #04 • Git Commit Stream',
      items: [
        { title: 'PR #142: Real-Time Payment Webhook', sub: 'Approved by Tech Lead • 12 passing tests', status: 'Merged', color: 'var(--accent-purple)' },
        { title: 'Flutter iOS Build Deployment', sub: 'TestFlight build #88 generated for staging', status: 'Deployed', color: 'var(--accent-green)' },
        { title: 'Docker Container Optimization', sub: 'Reduced image footprint from 1.2GB to 180MB', status: 'Done', color: 'var(--accent-green)' }
      ]
    },
    ai: {
      badge: 'Autonomous AI Workflows',
      heading: 'Workflows That Run Themselves with Zero Bottlenecks',
      paragraph: 'Eliminate repetitive manual tasks. Connect n8n, Make, and Zapier with tailored AI agent layers for instant lead routing, customer booking, and automated reporting.',
      list: [
        'WhatsApp Business API & CRM bidirectional synchronization',
        'Autonomous customer inquiry qualification and routing',
        'Multi-platform executive metrics aggregated into daily Slack briefs'
      ],
      mockHeader: 'n8n & AI Pipeline • Execution Nodes',
      items: [
        { title: 'WhatsApp Inbound Webhook Listener', sub: 'Captured incoming voice note & transcribed via Whisper', status: '200 OK', color: 'var(--accent-green)' },
        { title: 'AI Sentiment & Priority Classifier', sub: 'Flagged as High-Value Corporate Buyer ($50k+)', status: 'Success', color: 'var(--accent-blue)' },
        { title: 'HubSpot Deal Creation & Calendar Ping', sub: 'Created Deal #9201 & scheduled partner intro', status: 'Triggered', color: 'var(--accent-purple)' }
      ]
    },
    web: {
      badge: 'E-Commerce & Web Support',
      heading: '24/7 Web Technical Support & Catalogue Operations',
      paragraph: 'Keep your Shopify, WordPress, or WooCommerce store fast, secure, and always updated. Product uploads, speed optimization, and agency white-label technical support.',
      list: [
        '24/7 security monitoring, malware scans, and instant bug fixes',
        'Continuous PageSpeed optimization maintaining 95+ Google scores',
        'High-converting landing page development and CRM integration'
      ],
      mockHeader: 'Store Health Monitor • 100% Uptime',
      items: [
        { title: 'Shopify Store Performance Check', sub: 'Load time: 0.82s • Core Web Vitals all green', status: '99/100', color: 'var(--accent-green)' },
        { title: 'Catalogue Bulk Upload (Fall Season)', sub: '450 new SKUs with high-res assets & variants', status: 'Published', color: 'var(--accent-blue)' },
        { title: 'SSL Certificate & Security Audit', sub: 'Zero vulnerabilities found • Daily backup complete', status: 'Passed', color: 'var(--accent-green)' }
      ]
    },
    custom: {
      badge: 'Custom Business Software',
      heading: 'Bespoke CRM, ERP & SaaS Portals Built for Scale',
      paragraph: 'Custom software engineered to automate your company’s unique workflows. Billing systems, customer portals, custom dashboards, and third-party API integrations.',
      list: [
        'Custom CRM & ERP software built around your exact business model',
        'Automated billing, subscription invoicing, and accounting sync',
        'Role-based permissions, bank-grade encryption, and real-time dashboards'
      ],
      mockHeader: 'Custom ERP Console • Live Metrics',
      items: [
        { title: 'Automated Monthly Invoicing Run', sub: 'Dispatched $184,200 across 34 corporate clients', status: 'Completed', color: 'var(--accent-green)' },
        { title: 'Live Executive Financial Dashboard', sub: 'Aggregated Stripe, PayPal & Wire balances in 1 panel', status: 'Live', color: 'var(--accent-blue)' },
        { title: 'Third-Party Logistics API Sync', sub: 'Real-time warehouse inventory sync with Shopify ERP', status: 'Synced', color: 'var(--accent-purple)' }
      ]
    }
  };

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const key = tab.getAttribute('data-tour');
      const data = tourData[key];

      if (data && badge && heading && paragraph && list && mockupHeader && mockupItems) {
        const display = document.getElementById('tour-display');
        if (display) display.classList.add('fade-transition-out');

        setTimeout(() => {
          badge.textContent = data.badge;
          heading.textContent = data.heading;
          paragraph.textContent = data.paragraph;

          list.innerHTML = data.list.map(item => `
            <li class="service-subitem">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              ${item}
            </li>
          `).join('');

          mockupHeader.textContent = data.mockHeader;

          mockupItems.innerHTML = data.items.map((item, idx) => `
            <div class="mockup-item-enter" style="animation-delay: ${idx * 0.08}s; background: #fff; padding: 14px; border-radius: var(--radius-md); border: 1px solid var(--border-subtle); display: flex; justify-content: space-between; align-items: center; box-shadow: var(--shadow-sm); transition: transform 0.2s ease;">
              <div>
                <strong style="font-size: 0.85rem;">${item.title}</strong>
                <div style="font-size: 0.75rem; color: var(--text-muted);">${item.sub}</div>
              </div>
              <span style="font-family: var(--font-mono); font-size: 0.8rem; color: ${item.color}; font-weight: 600;">${item.status}</span>
            </div>
          `).join('');

          if (display) {
            display.classList.remove('fade-transition-out');
            display.classList.add('fade-transition-in');
            setTimeout(() => display.classList.remove('fade-transition-in'), 350);
          }
        }, 150);
      }
    });
  });
}

/* ==========================================================================
   6. COST SAVINGS & ROI CALCULATOR WITH SMOOTH ANIMATION
   ========================================================================== */
function initRoiCalculator() {
  const roleSelect = document.getElementById('calc-role');
  const countRange = document.getElementById('calc-range');
  const countLabel = document.getElementById('calc-count-label');
  const savingsEl = document.getElementById('calc-savings');
  const inhouseEl = document.getElementById('calc-inhouse');
  const nexEl = document.getElementById('calc-nex');

  if (!roleSelect || !countRange) return;

  // Annual costs per specialist across all disciplines
  const rates = {
    dev: { inhouse: 135000, nex: 35988 },     // Full-Stack Developer
    mobile: { inhouse: 145000, nex: 38000 },   // React & Flutter Mobile
    va: { inhouse: 60000, nex: 15588 },       // Virtual Assistant
    ai: { inhouse: 160000, nex: 42000 },       // AI Specialist
    web: { inhouse: 85000, nex: 24000 },       // Web & E-Commerce Support
    custom: { inhouse: 175000, nex: 52000 }    // Custom ERP & Software Architect
  };

  let currentSavings = 180000;
  let currentInhouse = 240000;
  let currentNex = 60000;

  function animateNumber(element, start, end, prefix = '$', suffix = '') {
    if (!element) return;
    const duration = 280;
    const startTime = performance.now();

    function updateFrame(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3); // cubic ease-out
      const val = Math.round(start + (end - start) * ease);
      element.textContent = `${prefix}${val.toLocaleString()}${suffix}`;

      if (progress < 1) {
        requestAnimationFrame(updateFrame);
      } else {
        element.textContent = `${prefix}${end.toLocaleString()}${suffix}`;
      }
    }

    requestAnimationFrame(updateFrame);
  }

  function update() {
    const role = roleSelect.value;
    const count = parseInt(countRange.value, 10);
    if (countLabel) countLabel.textContent = count;

    const data = rates[role] || rates.dev;
    const totalInhouse = data.inhouse * count;
    const totalNex = data.nex * count;
    const targetSavings = totalInhouse - totalNex;

    animateNumber(savingsEl, currentSavings, targetSavings, '$', '');
    animateNumber(inhouseEl, currentInhouse, totalInhouse, '$', '/yr');
    animateNumber(nexEl, currentNex, totalNex, '$', '/yr');

    currentSavings = targetSavings;
    currentInhouse = totalInhouse;
    currentNex = totalNex;
  }

  roleSelect.addEventListener('change', update);
  countRange.addEventListener('input', update);

  // Initialize and synchronize values cleanly on mount
  update();
}

/* ==========================================================================
   7. DEDICATED TALENT 3D CARD CUSTOMIZER & MOUSE TILT PHYSICS
   ========================================================================== */
function initTalentCustomizer() {
  const stage = document.getElementById('card-3d-stage');
  const card = document.getElementById('talent-card');
  const paletteBtns = document.querySelectorAll('.palette-btn');
  const roleBtns = document.querySelectorAll('.role-select-btn');
  const roleTitle = document.getElementById('card-role-title');
  const cardSkills = document.getElementById('card-skills');
  const glare = card ? card.querySelector('.card-glare') : null;

  if (!card) return;

  // 3D Mouse Tilt Physics with Lerp Inertia
  let currentRotateX = 0;
  let currentRotateY = 0;
  let targetRotateX = 0;
  let targetRotateY = 0;
  let isHovered = false;
  let animFrame = null;

  function updatePhysics() {
    currentRotateX += (targetRotateX - currentRotateX) * 0.15;
    currentRotateY += (targetRotateY - currentRotateY) * 0.15;

    const scale = isHovered ? 1.04 : 1;
    card.style.transform = `perspective(1000px) rotateX(${currentRotateX.toFixed(2)}deg) rotateY(${currentRotateY.toFixed(2)}deg) scale3d(${scale}, ${scale}, ${scale})`;

    if (isHovered) {
      card.style.boxShadow = `0 32px 64px rgba(0, 0, 0, 0.35), ${-currentRotateY * 2}px ${currentRotateX * 2}px 35px rgba(0, 102, 255, 0.22)`;
    } else {
      card.style.boxShadow = '0 24px 50px rgba(0, 0, 0, 0.25)';
    }

    if (Math.abs(targetRotateX - currentRotateX) > 0.02 || Math.abs(targetRotateY - currentRotateY) > 0.02 || isHovered) {
      animFrame = requestAnimationFrame(updatePhysics);
    } else {
      animFrame = null;
    }
  }

  function triggerCardSheen() {
    card.animate([
      { transform: `perspective(1000px) rotateY(${currentRotateY}deg) scale(1)` },
      { transform: `perspective(1000px) rotateY(${currentRotateY + 10}deg) scale(1.04)` },
      { transform: `perspective(1000px) rotateY(${currentRotateY}deg) scale(1)` }
    ], {
      duration: 320,
      easing: 'cubic-bezier(0.16, 1, 0.3, 1)'
    });
  }

  if (stage) {
    stage.addEventListener('mousemove', (e) => {
      isHovered = true;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      targetRotateY = ((x - centerX) / centerX) * 14;
      targetRotateX = -((y - centerY) / centerY) * 14;

      if (!animFrame) {
        animFrame = requestAnimationFrame(updatePhysics);
      }

      if (glare) {
        glare.style.opacity = '1';
        glare.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255, 255, 255, 0.32) 0%, transparent 65%)`;
      }
    });

    stage.addEventListener('mouseleave', () => {
      isHovered = false;
      targetRotateX = 0;
      targetRotateY = 0;
      if (!animFrame) {
        animFrame = requestAnimationFrame(updatePhysics);
      }
      if (glare) {
        glare.style.opacity = '0';
      }
    });
  }

  // Theme palettes
  paletteBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      paletteBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const theme = btn.getAttribute('data-theme');
      card.className = `virtual-badge-card card-theme-${theme}`;
      triggerCardSheen();
    });
  });

  // Role metadata profiles
  const roleProfiles = {
    fullstack: {
      title: 'Senior Full-Stack Engineer',
      skills: 'React • Node.js • TypeScript • PostgreSQL • AWS'
    },
    mobile: {
      title: 'Mobile App Engineer (React & Flutter)',
      skills: 'Flutter • React Native • Swift • Kotlin • Firebase'
    },
    va: {
      title: 'Executive Virtual Assistant',
      skills: 'Email/Calendar • CRM Hygiene • Customer Support • Research'
    },
    ai: {
      title: 'AI & Automations Architect',
      skills: 'n8n • Zapier • Make.com • LLMs • WhatsApp Business API'
    }
  };

  roleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      roleBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const role = btn.getAttribute('data-role');
      const data = roleProfiles[role];
      if (data && roleTitle && cardSkills) {
        roleTitle.textContent = data.title;
        cardSkills.textContent = data.skills;
        triggerCardSheen();
      }
    });
  });
}

/* ==========================================================================
   8. WORKING PRICING TOGGLE (MONTHLY VS YEARLY)
   ========================================================================== */
function initPricingToggle() {
  const toggle = document.getElementById('pricing-toggle');
  const labelMonthly = document.getElementById('label-monthly');
  const labelYearly = document.getElementById('label-yearly');
  const priceAmounts = document.querySelectorAll('.price-amount');

  if (!toggle) return;

  let isYearly = false;

  function setPricingMode(yearly) {
    isYearly = yearly;
    toggle.classList.toggle('yearly', isYearly);
    toggle.setAttribute('aria-checked', isYearly ? 'true' : 'false');

    if (labelMonthly) labelMonthly.classList.toggle('active', !isYearly);
    if (labelYearly) labelYearly.classList.toggle('active', isYearly);

    priceAmounts.forEach(el => {
      const val = isYearly ? el.getAttribute('data-yearly') : el.getAttribute('data-monthly');
      if (val) {
        el.style.opacity = '0';
        el.style.transform = 'scale(0.85) translateY(4px)';
        setTimeout(() => {
          el.textContent = val;
          el.style.opacity = '1';
          el.style.transform = 'scale(1) translateY(0)';
        }, 130);
      }
    });
  }

  toggle.addEventListener('click', () => setPricingMode(!isYearly));
  if (labelMonthly) labelMonthly.addEventListener('click', () => setPricingMode(false));
  if (labelYearly) labelYearly.addEventListener('click', () => setPricingMode(true));
}

/* ==========================================================================
   9. FAQ ACCORDION CONTROLLER & ACCESSIBILITY
   ========================================================================== */
function initFaqAccordion() {
  const items = document.querySelectorAll('.faq-accordion-item');

  // Initialize first active item if present
  items.forEach(item => {
    const trigger = item.querySelector('.faq-accordion-trigger');
    const body = item.querySelector('.faq-accordion-body');
    if (item.classList.contains('active') && body) {
      body.style.maxHeight = body.scrollHeight + 30 + 'px';
      if (trigger) trigger.setAttribute('aria-expanded', 'true');
    }
  });

  items.forEach(item => {
    const trigger = item.querySelector('.faq-accordion-trigger');
    const body = item.querySelector('.faq-accordion-body');

    if (trigger && body) {
      trigger.addEventListener('click', () => {
        const isActive = item.classList.contains('active');

        // Close all items
        items.forEach(other => {
          other.classList.remove('active');
          const otherTrigger = other.querySelector('.faq-accordion-trigger');
          const otherBody = other.querySelector('.faq-accordion-body');
          if (otherTrigger) otherTrigger.setAttribute('aria-expanded', 'false');
          if (otherBody) otherBody.style.maxHeight = '0px';
        });

        // If it was not active, open it
        if (!isActive) {
          item.classList.add('active');
          trigger.setAttribute('aria-expanded', 'true');
          body.style.maxHeight = body.scrollHeight + 30 + 'px';
        }
      });
    }
  });

  // Re-measure open accordion on window resize
  window.addEventListener('resize', () => {
    const activeItem = document.querySelector('.faq-accordion-item.active .faq-accordion-body');
    if (activeItem) {
      activeItem.style.maxHeight = activeItem.scrollHeight + 30 + 'px';
    }
  }, { passive: true });
}

/* ==========================================================================
   10. CONTACT FORM HANDLER
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const btn = document.getElementById('contact-submit-btn');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('contact-name').value.trim();
    const email = document.getElementById('contact-email').value.trim();

    if (!name || !email) return;

    // Loading state
    btn.disabled = true;
    const originalContent = btn.innerHTML;
    btn.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="animation: spin 1s linear infinite;">
        <circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle>
        <path d="M12 2a10 10 0 0 1 10 10"></path>
      </svg>
      <span>Deploying Request...</span>
    `;

    setTimeout(() => {
      btn.disabled = false;
      btn.innerHTML = originalContent;
      form.reset();
      const topicPills = document.querySelectorAll('.topic-pill');
      topicPills.forEach((p, idx) => {
        if (idx === 0) p.classList.add('is-active');
        else p.classList.remove('is-active');
      });

      showToast(`Thank you, ${name}! Your request was received. Our solutions team will contact you within 2 hours.`);
    }, 1100);
  });
}

/* ==========================================================================
   11. NEWSLETTER SUBSCRIPTION
   ========================================================================== */
function initNewsletterForm() {
  const form = document.getElementById('newsletter-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = form.querySelector('.newsletter-input');
    if (input && input.value) {
      showToast('Subscribed! Check your inbox for our latest tech playbooks.');
      input.value = '';
    }
  });
}

/* ==========================================================================
   HELPER: TOAST NOTIFICATION MODAL
   ========================================================================== */
function showToast(message) {
  const toast = document.getElementById('toast-modal');
  const toastMsg = document.getElementById('toast-message');

  if (toast && toastMsg) {
    toastMsg.textContent = message;
    toast.classList.add('show');

    setTimeout(() => {
      toast.classList.remove('show');
    }, 4500);
  }
}

/* ==========================================================================
   12. HERO HANGING THREAD / PULL CORD CONTROLLER (PHYSICS SIMULATION)
   ========================================================================== */
function initHangingCord() {
  const stage = document.getElementById('hanging-cord-stage');
  const cordSvg = document.getElementById('cord-svg');
  const cordPath = document.getElementById('cord-path');
  const cordPathGlow = document.getElementById('cord-path-glow');
  const cordBead1 = document.getElementById('cord-bead-1');
  const cordBead2 = document.getElementById('cord-bead-2');
  const bob = document.getElementById('cord-bob');
  const bobTag = document.getElementById('bob-tag');
  const bobState = document.getElementById('bob-state');
  const sparksContainer = document.getElementById('cord-sparks');
  const heroSection = document.getElementById('hero');
  const heroStatusBadge = document.getElementById('hero-status-badge');
  const heroBadgeText = document.getElementById('hero-badge-text');

  if (!stage || !cordPath || !bob) return;

  // Physical parameters (SVG space 0 0 160 280)
  const anchorX = 80;
  const anchorY = 0;
  const restLength = 170;
  const PULL_THRESHOLD = 55;
  const MAX_STRETCH = 90;

  // Dynamic simulation variables
  let px = anchorX;
  let py = restLength;
  let vx = 0;
  let vy = 0;
  let isDragging = false;
  let isPrimed = false;
  let isTurboActive = false;
  let pointerId = null;
  let magneticX = 0;
  let magneticY = 0;

  // Click vs Drag tracking
  let startPointerX = 0;
  let startPointerY = 0;
  let pointerStartTime = 0;
  let hasMovedFar = false;

  // Spring & ambient constants
  const stiffness = 0.045;
  const dampingLinear = 0.965;
  const dampingVertical = 0.91;
  const ambientSpeed = 0.0016;

  // Cubic Bezier interpolation helper
  function bezierPoint(p0, p1, p2, p3, t) {
    const mt = 1 - t;
    const mt2 = mt * mt;
    const mt3 = mt2 * mt;
    const t2 = t * t;
    const t3 = t2 * t;
    return {
      x: mt3 * p0.x + 3 * mt2 * t * p1.x + 3 * mt * t2 * p2.x + t3 * p3.x,
      y: mt3 * p0.y + 3 * mt2 * t * p1.y + 3 * mt * t2 * p2.y + t3 * p3.y
    };
  }

  // Audio click synthesizer with single context reuse
  let sharedAudioCtx = null;
  function getAudioContext() {
    if (!sharedAudioCtx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        sharedAudioCtx = new AudioCtx();
      }
    }
    if (sharedAudioCtx && sharedAudioCtx.state === 'suspended') {
      sharedAudioCtx.resume().catch(() => {});
    }
    return sharedAudioCtx;
  }

  function playTactileClick() {
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const now = ctx.currentTime;

      // Part 1: Metallic latch release ping
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.type = 'triangle';
      osc1.frequency.setValueAtTime(1200, now);
      osc1.frequency.exponentialRampToValueAtTime(340, now + 0.025);
      gain1.gain.setValueAtTime(0.08, now);
      gain1.gain.exponentialRampToValueAtTime(0.0001, now + 0.025);
      osc1.connect(gain1);
      gain1.connect(ctx.destination);
      osc1.start(now);
      osc1.stop(now + 0.025);

      // Part 2: Resonant mechanical switch contact clack
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(460, now + 0.02);
      osc2.frequency.exponentialRampToValueAtTime(130, now + 0.06);
      gain2.gain.setValueAtTime(0.06, now + 0.02);
      gain2.gain.exponentialRampToValueAtTime(0.0001, now + 0.06);
      osc2.connect(gain2);
      gain2.connect(ctx.destination);
      osc2.start(now + 0.02);
      osc2.stop(now + 0.06);
    } catch (_) {
      // Audio context blocked or unsupported
    }
  }

  // Spawn radial sparks on toggle release
  function emitSparks() {
    if (!sparksContainer) return;
    const count = 12;
    const colors = ['#0066ff', '#ff6b1a', '#00d6b2', '#ffd166', '#ffffff'];

    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.4;
      const distance = 30 + Math.random() * 45;
      const dx = Math.cos(angle) * distance;
      const dy = Math.sin(angle) * distance;

      const spark = document.createElement('span');
      spark.className = 'cord-spark-particle';
      spark.style.setProperty('--dx', `${dx.toFixed(1)}px`);
      spark.style.setProperty('--dy', `${dy.toFixed(1)}px`);
      spark.style.backgroundColor = colors[i % colors.length];
      spark.style.boxShadow = `0 0 6px ${colors[i % colors.length]}`;

      sparksContainer.appendChild(spark);
      setTimeout(() => spark.remove(), 600);
    }
  }

  // Update visual DOM representation via requestAnimationFrame
  function render(time) {
    if (!isDragging) {
      // Ambient pendulum swaying when idle
      const swayTime = time * ambientSpeed;
      const ambientSway = Math.sin(swayTime) * 3.8 + Math.cos(swayTime * 2.1) * 1.2;

      const curTargetX = anchorX + ambientSway + magneticX;
      const curTargetY = restLength + magneticY;

      // Separate horizontal and vertical spring forces with natural pendulum gravity restore
      const dxFromTarget = curTargetX - px;
      const dyFromTarget = curTargetY - py;

      // Angular pendulum restoration torque
      const angle = Math.atan2(px - anchorX, py - anchorY);
      const pendulumRestoreX = -Math.sin(angle) * 0.85;

      const ax = dxFromTarget * stiffness + pendulumRestoreX;
      const ay = dyFromTarget * (stiffness * 1.6);

      vx = (vx + ax) * dampingLinear;
      vy = (vy + ay) * dampingVertical;

      px += vx;
      py += vy;
    }

    // String sag and curvature calculation
    const dx = px - anchorX;
    const dy = py - anchorY;
    const len = Math.hypot(dx, dy);
    const sag = Math.max(0, 16 * (1 - Math.min(1, len / restLength)));
    const lagX = -vx * 0.08;

    // Cubic Bezier control points
    const cp1 = {
      x: anchorX + dx * 0.33 + lagX,
      y: anchorY + dy * 0.33 + sag
    };
    const cp2 = {
      x: anchorX + dx * 0.66 + lagX * 0.7,
      y: anchorY + dy * 0.66 + sag * 0.4
    };
    const p0 = { x: anchorX, y: anchorY };
    const p3 = { x: px, y: py };

    // Update dynamic SVG paths
    const pathData = `M ${anchorX},${anchorY} C ${cp1.x.toFixed(1)},${cp1.y.toFixed(1)} ${cp2.x.toFixed(1)},${cp2.y.toFixed(1)} ${px.toFixed(1)},${py.toFixed(1)}`;
    cordPath.setAttribute('d', pathData);
    if (cordPathGlow) {
      cordPathGlow.setAttribute('d', pathData);
    }

    // Position crimp beads along the curve
    if (cordBead1) {
      const b1 = bezierPoint(p0, cp1, cp2, p3, 0.33);
      cordBead1.setAttribute('cx', b1.x.toFixed(1));
      cordBead1.setAttribute('cy', b1.y.toFixed(1));
    }
    if (cordBead2) {
      const b2 = bezierPoint(p0, cp1, cp2, p3, 0.66);
      cordBead2.setAttribute('cx', b2.x.toFixed(1));
      cordBead2.setAttribute('cy', b2.y.toFixed(1));
    }

    // Orient and position bob handle
    const angleRad = Math.atan2(dx, dy);
    const angleDeg = (angleRad * (180 / Math.PI) * 0.65).toFixed(1);

    // Bob translate offset from (anchorX, restLength) = (80, 170)
    const offsetX = (px - anchorX).toFixed(1);
    const offsetY = (py - restLength).toFixed(1);

    bob.style.transform = `translate3d(${offsetX}px, ${offsetY}px, 0) rotate(${angleDeg}deg)`;

    requestAnimationFrame(render);
  }

  // Pointer drag interactions
  function onPointerDown(e) {
    if (e.button && e.button !== 0) return;
    isDragging = true;
    pointerId = e.pointerId;
    try {
      bob.setPointerCapture(pointerId);
    } catch (_) {}
    bob.classList.add('is-dragging');
    magneticX = 0;
    magneticY = 0;
    startPointerX = e.clientX;
    startPointerY = e.clientY;
    pointerStartTime = performance.now();
    hasMovedFar = false;
    updatePointerCoords(e);
  }

  function onPointerMove(e) {
    if (isDragging) {
      updatePointerCoords(e);
    } else {
      // Gentle proximity attraction when hovering near
      const rect = stage.getBoundingClientRect();
      const scaleX = rect.width > 0 ? (rect.width / 160) : 1;
      const scaleY = rect.height > 0 ? (rect.height / 340) : 1;
      const pointerX = (e.clientX - rect.left) / scaleX;
      const pointerY = (e.clientY - rect.top) / scaleY;
      const dist = Math.hypot(pointerX - px, pointerY - py);
      if (dist < 110) {
        magneticX = (pointerX - px) * 0.12;
        magneticY = Math.min(15, Math.max(0, (pointerY - py) * 0.12));
      } else {
        magneticX = 0;
        magneticY = 0;
      }
    }
  }

  function updatePointerCoords(e) {
    const rect = stage.getBoundingClientRect();
    const scaleX = rect.width > 0 ? (rect.width / 160) : 1;
    const scaleY = rect.height > 0 ? (rect.height / 340) : 1;
    const rawX = (e.clientX - rect.left) / scaleX;
    const rawY = (e.clientY - rect.top) / scaleY;

    const moveDist = Math.hypot(e.clientX - startPointerX, e.clientY - startPointerY);
    if (moveDist > 8) {
      hasMovedFar = true;
    }

    const dx = rawX - anchorX;
    const dy = Math.max(20, rawY - anchorY);
    const dist = Math.hypot(dx, dy);

    // Non-linear rubberized stretch resistance
    let effectiveDist = dist;
    if (dist > restLength) {
      const excess = dist - restLength;
      const resistedExcess = MAX_STRETCH * Math.tanh(excess / MAX_STRETCH);
      effectiveDist = restLength + resistedExcess;
    }

    // Clamp angle so string cannot be pushed above ceiling
    const angle = Math.max(-Math.PI / 2.6, Math.min(Math.PI / 2.6, Math.atan2(dx, dy)));

    px = anchorX + Math.sin(angle) * effectiveDist;
    py = anchorY + Math.cos(angle) * effectiveDist;

    const pullDelta = py - restLength;
    if (pullDelta >= PULL_THRESHOLD) {
      if (!isPrimed) {
        isPrimed = true;
        stage.classList.add('is-primed');
        if (bobTag) bobTag.textContent = 'RELEASE ⚡';
      }
    } else {
      if (isPrimed) {
        isPrimed = false;
        stage.classList.remove('is-primed');
        if (bobTag) bobTag.textContent = isTurboActive ? 'TURBO' : 'PULL';
      }
    }
  }

  function onPointerUp(e) {
    if (!isDragging) return;
    isDragging = false;
    bob.classList.remove('is-dragging');
    try {
      if (pointerId !== null) {
        bob.releasePointerCapture(pointerId);
      }
    } catch (_) {}
    pointerId = null;

    const pullDelta = py - restLength;
    const duration = performance.now() - pointerStartTime;
    const isQuickTap = !hasMovedFar && duration < 350;

    if (isQuickTap) {
      // Direct click / tap toggle: execute simulated spring pull & recoil cycle
      py = restLength + PULL_THRESHOLD + 12;
      isPrimed = true;
      stage.classList.add('is-primed');
      setTimeout(() => {
        toggleTurboMode();
        vy = -22;
        vx = (Math.random() - 0.5) * 8;
        isPrimed = false;
        stage.classList.remove('is-primed');
      }, 130);
      return;
    }

    if (isPrimed || pullDelta >= PULL_THRESHOLD) {
      // Toggle Turbo Sprint Mode!
      toggleTurboMode();
      // Upward recoil impulse kick
      vy = -Math.min(26, pullDelta * 0.32);
      vx = (anchorX - px) * 0.32;
    } else {
      // Normal spring release
      vy = -(pullDelta * 0.22);
      vx = (anchorX - px) * 0.25;
    }

    isPrimed = false;
    stage.classList.remove('is-primed');
  }

  function toggleTurboMode() {
    isTurboActive = !isTurboActive;
    stage.classList.toggle('turbo-active', isTurboActive);
    heroSection.classList.toggle('hero-turbo-mode', isTurboActive);
    bob.setAttribute('aria-pressed', isTurboActive ? 'true' : 'false');

    playTactileClick();
    emitSparks();

    if (isTurboActive) {
      if (bobTag) bobTag.textContent = 'TURBO';
      if (bobState) bobState.textContent = 'DEPLOYED ⚡';
      if (heroBadgeText) heroBadgeText.textContent = '⚡ Turbo Mode: 48-Hour Rapid Squads Deployed';
      if (heroStatusBadge) {
        heroStatusBadge.classList.add('badge-turbo');
      }
      showToast('⚡ Turbo Mode Activated! 48-Hour Sprint Squads Ready to Scale.');
    } else {
      if (bobTag) bobTag.textContent = 'PULL';
      if (bobState) bobState.textContent = '48H READY';
      if (heroBadgeText) heroBadgeText.textContent = 'Deploy Vetted Teams & AI in 48 Hours';
      if (heroStatusBadge) {
        heroStatusBadge.classList.remove('badge-turbo');
      }
      showToast('Calm Ecosystem Restored. Ready for Custom Deployments.');
    }
  }

  // Keyboard accessibility
  function onKeyDown(e) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      // Simulated spring pull & release cycle
      py = restLength + PULL_THRESHOLD + 15;
      isPrimed = true;
      stage.classList.add('is-primed');
      setTimeout(() => {
        toggleTurboMode();
        vy = -20;
        isPrimed = false;
        stage.classList.remove('is-primed');
      }, 140);
    }
  }

  bob.addEventListener('pointerdown', onPointerDown);
  window.addEventListener('pointermove', onPointerMove, { passive: true });
  window.addEventListener('pointerup', onPointerUp);
  window.addEventListener('pointercancel', onPointerUp);
  bob.addEventListener('keydown', onKeyDown);

  // Leave stage boundary resets magnetic tug
  stage.addEventListener('pointerleave', () => {
    magneticX = 0;
    magneticY = 0;
  });

  // Start animation loop
  requestAnimationFrame(render);
}

/* ==========================================================================
   18. HERO SUSPENDED TECHNOLOGY CORDS PHYSICS & PARALLAX ENGINE
   Framer-accurate 7-cord suspended technology squircle framing system
   ========================================================================== */
function initTechCords() {
  const stage = document.getElementById('tech-cords-stage');
  const svg = document.getElementById('tech-cords-svg');
  const hero = document.getElementById('hero');

  if (!stage || !svg || !hero) return;

  // 7 Technology Cords Framing Configuration
  // 0: Center, 1: Top-Left, 2: Mid-Left, 3: Bottom-Left, 4: Top-Right, 5: Mid-Right, 6: Bottom-Right
  const cordDefs = [
    {
      id: 'tech-badge-0',
      pathId: 'tech-cord-path-0',
      mountId: 'tech-cord-mount-0',
      sparksId: 'tech-sparks-0',
      name: 'ERP & Analytics',
      slot: 'center',
      phase: 0.0,
      depth: 1.0,
      sparkColors: ['#818cf8', '#6366f1', '#c7d2fe', '#ffffff'],
      targetHash: '#service-custom'
    },
    {
      id: 'tech-badge-1',
      pathId: 'tech-cord-path-1',
      mountId: 'tech-cord-mount-1',
      sparksId: 'tech-sparks-1',
      name: 'Full-Stack Developers',
      slot: 'top-left',
      phase: 1.25,
      depth: 1.2,
      sparkColors: ['#38bdf8', '#94a3b8', '#ffffff', '#0066ff'],
      targetHash: '#service-dev'
    },
    {
      id: 'tech-badge-2',
      pathId: 'tech-cord-path-2',
      mountId: 'tech-cord-mount-2',
      sparksId: 'tech-sparks-2',
      name: 'AI Automation & Agents',
      slot: 'mid-left',
      phase: 2.5,
      depth: 1.45,
      sparkColors: ['#ff7b1a', '#ea580c', '#fdba74', '#ffffff'],
      targetHash: '#service-ai'
    },
    {
      id: 'tech-badge-3',
      pathId: 'tech-cord-path-3',
      mountId: 'tech-cord-mount-3',
      sparksId: 'tech-sparks-3',
      name: 'Virtual Assistants',
      slot: 'bottom-left',
      phase: 3.75,
      depth: 0.95,
      sparkColors: ['#10b981', '#34d399', '#a7f3d0', '#ffffff'],
      targetHash: '#service-va'
    },
    {
      id: 'tech-badge-4',
      pathId: 'tech-cord-path-4',
      mountId: 'tech-cord-mount-4',
      sparksId: 'tech-sparks-4',
      name: 'Dedicated Dev Teams',
      slot: 'top-right',
      phase: 4.8,
      depth: 1.15,
      sparkColors: ['#22c55e', '#4ade80', '#bbf7d0', '#ffffff'],
      targetHash: '#service-dev'
    },
    {
      id: 'tech-badge-5',
      pathId: 'tech-cord-path-5',
      mountId: 'tech-cord-mount-5',
      sparksId: 'tech-sparks-5',
      name: 'DevOps & APIs',
      slot: 'mid-right',
      phase: 5.65,
      depth: 1.4,
      sparkColors: ['#3b82f6', '#60a5fa', '#bfdbfe', '#ffffff'],
      targetHash: '#service-support'
    },
    {
      id: 'tech-badge-6',
      pathId: 'tech-cord-path-6',
      mountId: 'tech-cord-mount-6',
      sparksId: 'tech-sparks-6',
      name: 'E-Commerce Management',
      slot: 'bottom-right',
      phase: 0.65,
      depth: 0.95,
      sparkColors: ['#a3e635', '#bef264', '#d9f99d', '#ffffff'],
      targetHash: '#service-support'
    }
  ];

  // Initialize runtime state for each cord
  const cords = cordDefs.map(def => {
    const badgeEl = document.getElementById(def.id);
    const pathEl = document.getElementById(def.pathId);
    const mountEl = document.getElementById(def.mountId);
    const sparksEl = document.getElementById(def.sparksId);

    return {
      ...def,
      badgeEl,
      pathEl,
      mountEl,
      sparksEl,
      anchorX: 0,
      anchorY: 0,
      restX: 0,
      restY: 0,
      px: 0,
      py: 0,
      vx: 0,
      vy: 0,
      isDragging: false,
      pointerId: null,
      grabOffsetX: 0,
      grabOffsetY: 0,
      startPointerX: 0,
      startPointerY: 0,
      startTime: 0,
      hasMoved: false
    };
  }).filter(c => c.badgeEl && c.pathEl && c.mountEl);

  let stageWidth = 0;
  let stageHeight = 0;

  // Mouse Parallax variables
  let targetParallaxX = 0;
  let targetParallaxY = 0;
  let currentParallaxX = 0;
  let currentParallaxY = 0;

  // Sound synthesizer for squircle springs (safely reusing shared AudioContext)
  function getSquircleAudio() {
    if (window.__sharedAudioCtx) {
      if (window.__sharedAudioCtx.state === 'suspended') {
        window.__sharedAudioCtx.resume().catch(() => {});
      }
      return window.__sharedAudioCtx;
    }
    const Audio = window.AudioContext || window.webkitAudioContext;
    if (Audio) {
      window.__sharedAudioCtx = new Audio();
      return window.__sharedAudioCtx;
    }
    return null;
  }

  function playSquirclePing(freq = 900) {
    try {
      const ctx = getSquircleAudio();
      if (!ctx) return;
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now);
      osc.frequency.exponentialRampToValueAtTime(260, now + 0.035);
      gain.gain.setValueAtTime(0.06, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.035);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.035);
    } catch (_) {}
  }

  // Radial spark emissions on cord release
  function emitCordSparks(cord) {
    if (!cord.sparksEl) return;
    const count = 12;
    const colors = cord.sparkColors;
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.5;
      const dist = 24 + Math.random() * 38;
      const dx = Math.cos(angle) * dist;
      const dy = Math.sin(angle) * dist;

      const spark = document.createElement('span');
      spark.className = 'squircle-spark-particle';
      spark.style.setProperty('--dx', `${dx.toFixed(1)}px`);
      spark.style.setProperty('--dy', `${dy.toFixed(1)}px`);
      spark.style.backgroundColor = colors[i % colors.length];
      spark.style.boxShadow = `0 0 6px ${colors[i % colors.length]}`;
      cord.sparksEl.appendChild(spark);
      setTimeout(() => spark.remove(), 550);
    }
  }

  // Check reduced motion preference
  const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Responsive Layout & Anchor Calculation
  function updateLayout() {
    stageWidth = stage.clientWidth || window.innerWidth;
    stageHeight = stage.clientHeight || hero.clientHeight || 900;
    const centerX = stageWidth * 0.5;

    // Detect screen tiers
    const isMobile = stageWidth < 768;
    const isTablet = stageWidth >= 768 && stageWidth < 1024;
    const isDesktop = stageWidth >= 1024;

    cords.forEach(cord => {
      const prevRestX = cord.restX;
      const prevRestY = cord.restY;
      const radius = cord.badgeEl.offsetWidth ? (cord.badgeEl.offsetWidth * 0.5) : 28;

      let targetX = centerX;
      let targetY = 110;

      if (isDesktop) {
        // Desktop: Generously frame the hero title (max-width 900px) from the outside
        // Avoid collision with turbo cord on the far right (at right - 48px)
        switch (cord.slot) {
          case 'center': // 0: Top-Center (Purple)
            targetX = centerX;
            targetY = 108; // In the gap above status badge (150px)
            break;
          case 'top-left': // 1: Top-Left (Obsidian)
            targetX = Math.max(radius + 20, centerX - 460);
            targetY = 220; // Flanking "Scale Your Business With"
            break;
          case 'mid-left': // 2: Mid-Left (Orange)
            targetX = Math.max(radius + 20, centerX - 560);
            targetY = 345; // Flanking "Dedicated Teams & AI Automation"
            break;
          case 'bottom-left': // 3: Bottom-Left (Mint)
            targetX = Math.max(radius + 20, centerX - 470);
            targetY = 485; // Flanking CTA buttons
            break;
          case 'top-right': // 4: Top-Right (Green)
            targetX = Math.min(stageWidth - radius - 20, centerX + 460);
            targetY = 220; // Flanking "Scale Your Business With"
            break;
          case 'mid-right': // 5: Mid-Right (Blue)
            targetX = Math.min(stageWidth - radius - 20, centerX + 560);
            targetY = 345; // Flanking "Dedicated Teams & AI Automation"
            break;
          case 'bottom-right': // 6: Bottom-Right (Lime)
            targetX = Math.min(stageWidth - radius - 20, centerX + 470);
            targetY = 485; // Flanking CTA buttons
            break;
        }
      } else if (isTablet) {
        // Tablet (768px - 1023px)
        const maxOffset = Math.min(stageWidth * 0.44, 380);
        switch (cord.slot) {
          case 'center':
            targetX = centerX;
            targetY = 100;
            break;
          case 'top-left':
            targetX = Math.max(radius + 16, centerX - maxOffset * 0.82);
            targetY = 205;
            break;
          case 'mid-left':
            targetX = Math.max(radius + 16, centerX - maxOffset);
            targetY = 325;
            break;
          case 'bottom-left':
            targetX = Math.max(radius + 16, centerX - maxOffset * 0.84);
            targetY = 460;
            break;
          case 'top-right':
            targetX = Math.min(stageWidth - radius - 16, centerX + maxOffset * 0.82);
            targetY = 205;
            break;
          case 'mid-right':
            targetX = Math.min(stageWidth - radius - 16, centerX + maxOffset);
            targetY = 325;
            break;
          case 'bottom-right':
            targetX = Math.min(stageWidth - radius - 16, centerX + maxOffset * 0.84);
            targetY = 460;
            break;
        }
      } else {
        // Mobile (< 768px): Neatly placed in outer gutters so headline & text remain 100% legible
        const marginX = Math.max(radius + 10, stageWidth * 0.08);
        switch (cord.slot) {
          case 'center':
            targetX = centerX;
            targetY = 88; // Above status badge
            break;
          case 'top-left':
            targetX = marginX;
            targetY = 185;
            break;
          case 'mid-left':
            targetX = marginX + 8;
            targetY = 295;
            break;
          case 'bottom-left':
            targetX = marginX;
            targetY = 415;
            break;
          case 'top-right':
            targetX = stageWidth - marginX;
            targetY = 185;
            break;
          case 'mid-right':
            targetX = stageWidth - marginX - 8;
            targetY = 295;
            break;
          case 'bottom-right':
            targetX = stageWidth - marginX;
            targetY = 415;
            break;
        }
      }

      cord.anchorX = targetX;
      cord.anchorY = 0;
      cord.restX = targetX;
      cord.restY = targetY;

      // Position ceiling mount
      cord.mountEl.style.left = `${cord.anchorX.toFixed(1)}px`;

      // Smooth position initialization & resize delta compensation
      if (cord.px === 0 && cord.py === 0) {
        cord.px = cord.restX;
        cord.py = cord.restY;
      } else if (!cord.isDragging) {
        const deltaX = cord.restX - prevRestX;
        const deltaY = cord.restY - prevRestY;
        cord.px += deltaX;
        cord.py += deltaY;
      }
    });
  }

  window.addEventListener('resize', updateLayout, { passive: true });
  updateLayout();

  // Mouse Parallax across Hero section
  hero.addEventListener('pointermove', (e) => {
    if (prefersReducedMotion) return;
    const heroRect = hero.getBoundingClientRect();
    if (heroRect.width <= 0 || heroRect.height <= 0) return;
    const nx = ((e.clientX - heroRect.left) / heroRect.width - 0.5) * 2;
    const ny = ((e.clientY - heroRect.top) / heroRect.height - 0.5) * 2;
    targetParallaxX = nx * 16;
    targetParallaxY = ny * 10;
  }, { passive: true });

  hero.addEventListener('pointerleave', () => {
    targetParallaxX = 0;
    targetParallaxY = 0;
  });

  // Pointer drag interaction handlers per cord
  cords.forEach(cord => {
    const badge = cord.badgeEl;

    badge.addEventListener('pointerdown', (e) => {
      if (e.button && e.button !== 0) return;
      cord.isDragging = true;
      cord.pointerId = e.pointerId;
      try {
        badge.setPointerCapture(e.pointerId);
      } catch (_) {}
      badge.classList.add('is-dragging');

      const stageRect = stage.getBoundingClientRect();
      const rawX = e.clientX - stageRect.left;
      const rawY = e.clientY - stageRect.top;

      // Compensate for initial click offset within the badge (zero jump on grab)
      cord.grabOffsetX = cord.px - rawX;
      cord.grabOffsetY = cord.py - rawY;

      cord.startPointerX = e.clientX;
      cord.startPointerY = e.clientY;
      cord.startTime = performance.now();
      cord.hasMoved = false;
      updateDragPosition(cord, e);
    });

    // Keyboard navigation (Enter / Space)
    badge.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        cord.vy = 26;
        playSquirclePing(1100);
        emitCordSparks(cord);
        setTimeout(() => {
          cord.vy = -34;
          if (cord.targetHash) {
            const target = document.querySelector(cord.targetHash);
            if (target) target.scrollIntoView({ behavior: 'smooth' });
          }
        }, 120);
      }
    });
  });

  function updateDragPosition(cord, e) {
    const stageRect = stage.getBoundingClientRect();
    const rawX = e.clientX - stageRect.left;
    const rawY = e.clientY - stageRect.top;

    const moveDist = Math.hypot(e.clientX - cord.startPointerX, e.clientY - cord.startPointerY);
    if (moveDist > 6) {
      cord.hasMoved = true;
    }

    const targetPx = rawX + cord.grabOffsetX;
    const targetPy = rawY + cord.grabOffsetY;

    const dx = targetPx - cord.anchorX;
    const dy = Math.max(25, targetPy - cord.anchorY);
    const dist = Math.hypot(dx, dy);

    // Non-linear elastomeric resistance
    const MAX_STRETCH = 85;
    let effectiveDist = dist;
    if (dist > cord.restY) {
      const excess = dist - cord.restY;
      effectiveDist = cord.restY + MAX_STRETCH * Math.tanh(excess / MAX_STRETCH);
    }

    const angle = Math.max(-Math.PI / 2.5, Math.min(Math.PI / 2.5, Math.atan2(dx, dy)));
    cord.px = cord.anchorX + Math.sin(angle) * effectiveDist;
    cord.py = cord.anchorY + Math.cos(angle) * effectiveDist;
  }

  function finishDrag(cord, e) {
    cord.isDragging = false;
    cord.badgeEl.classList.remove('is-dragging');
    try {
      if (cord.pointerId !== null) {
        cord.badgeEl.releasePointerCapture(cord.pointerId);
      }
    } catch (_) {}
    cord.pointerId = null;

    const duration = performance.now() - cord.startTime;
    const isQuickTap = !cord.hasMoved && duration < 320;

    if (isQuickTap) {
      // Direct click / tap toggle: execute simulated spring pull & recoil
      cord.vy = 26;
      playSquirclePing(1050);
      emitCordSparks(cord);
      setTimeout(() => {
        cord.vy = -32;
        cord.vx = (Math.random() - 0.5) * 6;
        if (cord.targetHash) {
          const target = document.querySelector(cord.targetHash);
          if (target) target.scrollIntoView({ behavior: 'smooth' });
        }
      }, 120);
      return;
    }

    // Dragged release: bidirectional elastic recoil impulse
    const pullDeltaY = cord.py - cord.restY;
    const pullDeltaX = cord.px - cord.anchorX;
    if (pullDeltaY > 0) {
      cord.vy = -Math.min(34, Math.max(12, pullDeltaY * 0.35));
    } else {
      cord.vy = Math.min(34, Math.max(12, Math.abs(pullDeltaY) * 0.35));
    }
    cord.vx = -pullDeltaX * 0.32;
    playSquirclePing(950);
    emitCordSparks(cord);
  }

  // Window-level listeners ensure drag never gets stuck even if pointer capture drops
  window.addEventListener('pointermove', (e) => {
    cords.forEach(cord => {
      if (cord.isDragging && (cord.pointerId === null || cord.pointerId === e.pointerId)) {
        updateDragPosition(cord, e);
      }
    });
  }, { passive: true });

  window.addEventListener('pointerup', (e) => {
    cords.forEach(cord => {
      if (cord.isDragging && (cord.pointerId === null || cord.pointerId === e.pointerId)) {
        finishDrag(cord, e);
      }
    });
  }, { passive: true });

  window.addEventListener('pointercancel', (e) => {
    cords.forEach(cord => {
      if (cord.isDragging && (cord.pointerId === null || cord.pointerId === e.pointerId)) {
        finishDrag(cord, e);
      }
    });
  }, { passive: true });

  // Animation Loop via requestAnimationFrame
  function render(time) {
    if (!prefersReducedMotion) {
      // Smoothly lerp parallax offsets
      currentParallaxX += (targetParallaxX - currentParallaxX) * 0.08;
      currentParallaxY += (targetParallaxY - currentParallaxY) * 0.08;
    } else {
      currentParallaxX = 0;
      currentParallaxY = 0;
    }

    const swayTime = time * 0.0016;

    cords.forEach(cord => {
      if (!cord.isDragging) {
        // Multi-frequency harmonic ambient sway (suppressed if prefers-reduced-motion)
        const sway = prefersReducedMotion ? 0 : (Math.sin(swayTime + cord.phase) * 3.2 + Math.cos(swayTime * 1.8 + cord.phase) * 1.2);
        const curTargetX = cord.restX + sway + (currentParallaxX * cord.depth);
        const curTargetY = cord.restY + (currentParallaxY * cord.depth);

        const dx = curTargetX - cord.px;
        const dy = curTargetY - cord.py;

        // Angular pendulum restoration torque
        const angle = Math.atan2(cord.px - cord.anchorX, cord.py - cord.anchorY);
        const restoreTorque = -Math.sin(angle) * 0.75;

        const ax = dx * 0.045 + restoreTorque;
        const ay = dy * 0.055;

        cord.vx = (cord.vx + ax) * 0.94;
        cord.vy = (cord.vy + ay) * 0.92;

        cord.px += cord.vx;
        cord.py += cord.vy;
      }

      // Responsive half-width / radius
      const radius = cord.badgeEl.offsetWidth ? (cord.badgeEl.offsetWidth * 0.5) : 28;

      // String curvature & tension sag calculation
      const cordDx = cord.px - cord.anchorX;
      const cordDy = Math.max(10, cord.py - radius);
      const cordLen = Math.hypot(cordDx, cordDy);
      const sag = Math.max(0, 14 * (1 - Math.min(1, cordLen / cord.restY)));
      const lagX = -cord.vx * 0.08;

      // Cubic Bezier curve control points
      const cp1X = cord.anchorX + cordDx * 0.33 + lagX;
      const cp1Y = cordDy * 0.33 + sag;
      const cp2X = cord.anchorX + cordDx * 0.66 + lagX * 0.7;
      const cp2Y = cordDy * 0.66 + sag * 0.4;

      const pathData = `M ${cord.anchorX.toFixed(1)},0 C ${cp1X.toFixed(1)},${cp1Y.toFixed(1)} ${cp2X.toFixed(1)},${cp2Y.toFixed(1)} ${cord.px.toFixed(1)},${cordDy.toFixed(1)}`;
      cord.pathEl.setAttribute('d', pathData);

      // Squircle orientation and translation (dynamically offset by element radius)
      const angleRad = Math.atan2(cordDx, cordDy);
      const angleDeg = (angleRad * (180 / Math.PI) * 0.45).toFixed(1);
      const badgeX = (cord.px - radius).toFixed(1);
      const badgeY = (cord.py - radius).toFixed(1);

      cord.badgeEl.style.transform = `translate3d(${badgeX}px, ${badgeY}px, 0) rotate(${angleDeg}deg)`;
    });

    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);
}

/* ==========================================================================
   19. UNIFIED SERVICES SWITCHER (52 PDF SERVICES vs 8 CORE DISCIPLINES)
   ========================================================================== */
function initServicesTabs() {
  const tabPdf = document.getElementById('tab-btn-pdf');
  const tabCore = document.getElementById('tab-btn-core');
  const panelPdf = document.getElementById('panel-pdf-services');
  const panelCore = document.getElementById('panel-core-disciplines');

  if (!tabPdf || !tabCore || !panelPdf || !panelCore) return;

  function switchTab(showCore) {
    if (showCore) {
      tabCore.classList.add('active');
      tabPdf.classList.remove('active');
      panelCore.classList.add('active');
      panelCore.style.display = 'block';
      panelPdf.classList.remove('active');
      panelPdf.style.display = 'none';
    } else {
      tabPdf.classList.add('active');
      tabCore.classList.remove('active');
      panelPdf.classList.add('active');
      panelPdf.style.display = 'block';
      panelCore.classList.remove('active');
      panelCore.style.display = 'none';
    }
  }

  tabPdf.addEventListener('click', () => switchTab(false));
  tabCore.addEventListener('click', () => switchTab(true));
}

/* ==========================================================================
   20. CAPABILITIES SHOWCASE SYSTEM (SYS-01 TO SYS-06)
   ========================================================================== */
const SITE_CAPABILITIES = [
  {
    code: 'SYS-01 // SEARCH-DOMINANCE',
    badge: 'RANKING #1',
    title: 'SEO & Search Dominance',
    subtitle: 'Dominate Google #1 For Commercial High-Intent Queries',
    desc: 'Technical audits, Core Web Vitals optimization, semantic schema markup, and high-authority link architectures engineered to climb Google rankings sustainably and drive qualified commercial inbound traffic.',
    bullets: [
      'Technical Core Web Vitals Audit (95+ Score)',
      'High-Intent Keyword Mapping & Content Clusters',
      'Google Business Profile & Local Map Pack Dominance',
      'White-Hat Authority Backlink Acquisition'
    ],
    chips: [
      { label: 'ORGANIC LIFT', val: '+280%' },
      { label: 'CORE VITALS', val: '99/100' },
      { label: 'PENALTIES', val: 'Zero' }
    ],
    btnText: 'Deploy SEO Architecture',
    systemStatus: 'STAGING // GOOGLE_INDEX_v4',
    telemetry: 'ORGANIC LIFT: +280%',
    img: 'images/srv-seo.jpg'
  },
  {
    code: 'SYS-02 // GROWTH-ENGINE',
    badge: '4.8X AVG ROAS',
    title: 'Performance Marketing & CRO',
    subtitle: 'Turn Paid Ad Spend into Predictable, Compounding Revenue',
    desc: 'High-performance multi-channel ad campaigns across Google Ads, Meta, and Instagram, paired with bespoke landing pages, automated lead capture, and ruthless conversion rate optimization.',
    bullets: [
      'Google Search, Display & Performance Max Campaigns',
      'Meta & Instagram High-ROAS Funnel Architecture',
      'Custom High-Conversion CRO Landing Pages',
      'Full-Funnel Attribution & Google Analytics 4 Setup'
    ],
    chips: [
      { label: 'AVERAGE ROAS', val: '4.8x' },
      { label: 'LEAD INFLUX', val: '+340%' },
      { label: 'OPTIMIZATION', val: '24/7 Live' }
    ],
    btnText: 'Launch Growth Campaign',
    systemStatus: 'CAMPAIGN_ENGINE // AD_STREAMS',
    telemetry: 'CONVERSION LIFT: 3.8X',
    img: 'images/srv-marketing.jpg'
  },
  {
    code: 'SYS-03 // CORE-ENGINEERING',
    badge: '99.98% SLA',
    title: 'Full-Stack Web & Mobile App Development',
    subtitle: 'Enterprise Platforms, Microservices & Native Mobile Apps',
    desc: 'From high-concurrency cloud web apps to native iOS & Android applications. We write clean, test-driven modular code architectures with 99.98% SLA uptime, automated CI/CD, and sub-16ms latency.',
    bullets: [
      'React & Next.js 15 Scalable Cloud Frontends',
      'Node.js, Python & High-Concurrency Microservices',
      'Cross-Platform Mobile Apps (React Native & Flutter)',
      'Enterprise REST API & PostgreSQL / MongoDB Datastores'
    ],
    chips: [
      { label: 'UPTIME SLA', val: '99.98%' },
      { label: 'THROUGHPUT', val: '18K req/s' },
      { label: 'API LATENCY', val: '<16ms' }
    ],
    btnText: 'Embed Dedicated Engineers',
    systemStatus: 'RUNTIME_PROD // K8S_NODE_01',
    telemetry: 'THROUGHPUT: 18K req/s',
    img: 'images/srv-app.jpg'
  },
  {
    code: 'SYS-04 // INTERFACE-DESIGN',
    badge: 'PIXEL-PERFECT',
    title: 'UI/UX Design Systems & Interfaces',
    subtitle: 'Human-Centered Design Systems Built For Maximum Conversions',
    desc: 'Research-backed user journeys, comprehensive Figma component libraries, and accessible interaction designs that eliminate cognitive friction, delight customers, and convert users effortlessly.',
    bullets: [
      'User Research & Journey Friction Mapping',
      'Scalable Figma Design Systems & Design Token Kits',
      'High-Fidelity Clickable Interactive Prototypes',
      'WCAG 2.1 AAA Accessibility & Mobile Optimization'
    ],
    chips: [
      { label: 'USER RETENTION', val: '+64%' },
      { label: 'ACCESSIBILITY', val: 'WCAG AAA' },
      { label: 'SPECIFICATION', val: 'Tokenized' }
    ],
    btnText: 'Initiate UX Architecture',
    systemStatus: 'FIGMA_CANVAS // DESIGN_SYSTEM',
    telemetry: 'RETENTION: +64%',
    img: 'images/cover-design.jpg'
  },
  {
    code: 'SYS-05 // AUTONOMOUS-OPS',
    badge: '400+ CONNECTORS',
    title: 'n8n Workflow Automation & Pipelines',
    subtitle: 'Eliminate Repetitive Work with Multi-System Autonomous Flows',
    desc: 'Autonomous workflow pipelines connecting over 400+ enterprise applications, CRM platforms, customer support systems, and internal databases with zero manual overhead.',
    bullets: [
      'n8n, Make & Zapier Multi-Branch Autonomous Flows',
      'WhatsApp Business API & CRM Live Event Triggers',
      'Instant Lead Capture & Automated SMS/Email Sequences',
      'Automated PDF Invoicing & Accounting Pipeline Sync'
    ],
    chips: [
      { label: 'HUMAN HOURS SAVED', val: '120h/mo' },
      { label: 'SYNC LATENCY', val: '<250ms' },
      { label: 'REDUNDANCY', val: 'Dual Fallback' }
    ],
    btnText: 'Automate Internal Workflows',
    systemStatus: 'EVENT_BUS // 412_NODES_ACTIVE',
    telemetry: 'SAVED HOURS: 120H/MO',
    img: 'images/new-automation.jpg'
  },
  {
    code: 'SYS-06 // INTELLIGENT-AI',
    badge: 'SUB-SECOND RAG',
    title: 'AI Copilots, Custom RAG & Autonomous Agents',
    subtitle: 'Transform Proprietary Company Knowledge into 24/7 Intelligence',
    desc: 'Enterprise generative AI architectures combining Retrieval-Augmented Generation (RAG), vector embeddings, and autonomous agent loops for 24/7 customer support and internal decision intelligence.',
    bullets: [
      'Proprietary Document RAG & Vector Database Search',
      'Multi-Turn Conversational AI Concierge & Chatbots',
      'Local LLM Deployment & Secure Private VPC Inference',
      'Automated Ticket Classification & Intent Parsing'
    ],
    chips: [
      { label: 'QUERY LATENCY', val: '380ms' },
      { label: 'ACCURACY', val: '99.4%' },
      { label: 'VECTOR INDEX', val: 'Milvus / pgvector' }
    ],
    btnText: 'Deploy AI Copilot System',
    systemStatus: 'LLM_INFRA // VECTOR_CLUSTER',
    telemetry: 'ACCURACY: 99.4%',
    img: 'images/ai/ai-brain-neural.jpg'
  }
];

function initCapabilitiesShowcase() {
  const buttons = document.querySelectorAll('.cap-nav-btn[data-cap]');
  const capCode = document.getElementById('cap-code');
  const capBadge = document.getElementById('cap-badge');
  const capTitle = document.getElementById('cap-title');
  const capSubtitle = document.getElementById('cap-subtitle');
  const capDesc = document.getElementById('cap-desc');
  const capBullets = document.getElementById('cap-bullets');
  const capChips = document.getElementById('cap-chips');
  const capBtnText = document.getElementById('cap-btn-text');
  const capImg = document.getElementById('cap-img');
  const capTelemetry = document.getElementById('cap-telemetry');
  const capSystemStatus = document.getElementById('cap-system-status');

  if (!buttons.length || !capCode) return;

  function renderCapability(index) {
    const data = SITE_CAPABILITIES[index];
    if (!data) return;

    buttons.forEach((btn, idx) => {
      if (idx === index) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    if (capCode) capCode.textContent = data.code;
    if (capBadge) capBadge.textContent = data.badge;
    if (capTitle) capTitle.textContent = data.title;
    if (capSubtitle) capSubtitle.textContent = data.subtitle;
    if (capDesc) capDesc.textContent = data.desc;
    if (capBtnText) capBtnText.textContent = data.btnText;
    if (capImg) {
      capImg.src = data.img;
      capImg.alt = data.title;
    }
    if (capTelemetry) capTelemetry.textContent = data.telemetry;
    if (capSystemStatus) capSystemStatus.textContent = data.systemStatus;

    if (capBullets) {
      capBullets.innerHTML = data.bullets.map(b => `
        <div class="cap-bullet-item">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent-blue)" stroke-width="2.5"><polyline points="20 6 9 17 4 12" /></svg>
          <span>${b}</span>
        </div>
      `).join('');
    }

    if (capChips) {
      capChips.innerHTML = data.chips.map(c => `
        <div class="cap-chip"><span class="cap-chip-val">${c.val}</span><span class="cap-chip-label">${c.label}</span></div>
      `).join('');
    }
  }

  buttons.forEach((btn, idx) => {
    btn.addEventListener('click', () => {
      renderCapability(idx);
    });
  });
}

/* ==========================================================================
   21. 8 CORE DISCIPLINES & MODAL SYSTEM
   ========================================================================== */
const SITE_CORE_SERVICES = [
  {
    slug: 'website-development',
    num: '01',
    title: 'Website Development',
    serif: 'Performance',
    blurb: 'Modern, responsive and SEO-friendly websites that convert visitors into customers.',
    image: 'images/srv-web.jpg',
    headline: 'Your website is your digital storefront.',
    overview: 'We design and build fast, secure and beautiful websites — from marketing sites to full e-commerce storefronts — engineered to convert.',
    features: [
      'Responsive, mobile-first builds',
      'SEO-friendly architecture',
      'CMS powered (WordPress / headless)',
      'Speed & Core Web Vitals optimisation',
      'E-commerce, payments & bookings',
      'Ongoing care plans'
    ],
    deliverables: [
      'UI/UX wireframes',
      'Pixel-perfect frontend',
      'CMS training',
      '3 months free support'
    ]
  },
  {
    slug: 'application-development',
    num: '02',
    title: 'Application Development',
    serif: 'Scalable',
    blurb: 'Scalable and secure web applications built for performance and growth.',
    image: 'images/srv-app.jpg',
    headline: 'Built for performance and enterprise scale.',
    overview: 'From internal dashboards to customer-facing SaaS, we build robust web applications with clean code, solid architecture and an eye for what your users actually need.',
    features: [
      'React / Node / Python stacks',
      'API design & integrations',
      'Cloud deployment (AWS / Azure)',
      'Data pipelines & reporting',
      'Role-based access & security',
      'Agile delivery sprints'
    ],
    deliverables: [
      'Architecture plan',
      'Source code + docs',
      'CI/CD setup',
      'Training handover'
    ]
  },
  {
    slug: 'mobile-app-development',
    num: '03',
    title: 'Mobile App Development',
    serif: 'Native Feel',
    blurb: 'Feature-rich mobile apps for Android and iOS platforms.',
    image: 'images/srv-mobile.jpg',
    headline: 'Reach your customers wherever they are.',
    overview: 'We build cross-platform and native mobile apps that feel fast, look polished and keep users coming back across iOS and Android.',
    features: [
      'React Native & Flutter',
      'Native iOS & Android',
      'Push notifications & offline sync',
      'App store publishing',
      'Analytics & crash reporting',
      'Iterative release cycles'
    ],
    deliverables: [
      'Prototype & design',
      'Play/App Store listing',
      'Backend integration',
      'Maintenance plan'
    ]
  },
  {
    slug: 'digital-marketing',
    num: '04',
    title: 'Digital Marketing',
    serif: 'Data-Driven',
    blurb: 'Data-driven marketing strategies that bring measurable growth.',
    image: 'images/srv-marketing.jpg',
    headline: 'We don\'t guess — we measure.',
    overview: 'Our campaigns are built on data, tested relentlessly and optimised to deliver a real return on every rupee you spend.',
    features: [
      'Performance marketing (Google, Meta)',
      'Landing page funnels',
      'Conversion rate optimisation',
      'Email & automation flows',
      'Attribution & reporting',
      'Monthly strategy reviews'
    ],
    deliverables: [
      'Audit & roadmap',
      'Campaign setup',
      'Creative + copy',
      'Monthly reports'
    ]
  },
  {
    slug: 'seo-services',
    num: '05',
    title: 'SEO Services',
    serif: 'Visibility',
    blurb: 'Improve ranking, organic traffic and online visibility.',
    image: 'images/srv-seo.jpg',
    headline: 'Own your search results on Google.',
    overview: 'We combine technical SEO, content and authority building to move your business to the top of Google — sustainably, not with shortcuts.',
    features: [
      'Technical site audits',
      'Keyword & competitor research',
      'On-page & content strategy',
      'Local SEO (Google Business Profile)',
      'Link building',
      'Ranking & traffic tracking'
    ],
    deliverables: [
      'Audit report',
      'Keyword roadmap',
      'Monthly content calendar',
      'Quarterly wins deck'
    ]
  },
  {
    slug: 'social-media-marketing',
    num: '06',
    title: 'Social Media Marketing',
    serif: 'Brand Voice',
    blurb: 'Engaging content and campaigns that build your brand.',
    image: 'images/srv-social.jpg',
    headline: 'Turn followers into lifelong customers.',
    overview: 'We plan, design and publish content that gives your brand a consistent, confident voice across every platform.',
    features: [
      'Platform strategy (Ig, Fb, Ln, X)',
      'Content calendars & design',
      'Reels & short-form video',
      'Community management',
      'Paid social boosting',
      'Monthly analytics'
    ],
    deliverables: [
      'Brand content kit',
      '30-day calendars',
      'Monthly reports',
      'Growth roadmap'
    ]
  },
  {
    slug: 'ui-ux-design',
    num: '07',
    title: 'UI/UX Design',
    serif: 'Human-Centric',
    blurb: 'Intuitive, engaging interfaces and seamless experiences designed to convert visitors.',
    image: 'images/srv-web.jpg',
    headline: 'Design isn\'t just how it looks — it\'s how it works.',
    overview: 'We craft intuitive user journeys, wireframes, interactive Figma prototypes, and conversion-focused digital experiences that delight users and drive real business outcomes.',
    features: [
      'User Research & Journey Mapping',
      'Wireframing & Interactive Prototypes (Figma)',
      'Design Systems & Component Libraries',
      'Mobile & Web App Interface Design',
      'Usability Testing & Conversion Rate Optimization',
      'Design-to-Developer Handoff'
    ],
    deliverables: [
      'Complete Figma Design System',
      'Interactive Prototype',
      'User Journey Maps',
      'Production Asset Kit'
    ]
  },
  {
    slug: 'branding-identity',
    num: '08',
    title: 'Branding & Identity',
    serif: 'Memorable',
    blurb: 'Crafting distinctive brand identities, logos, and visual systems that make your business unforgettable.',
    image: 'images/srv-marketing.jpg',
    headline: 'Your brand is your business promise.',
    overview: 'We help startups and established brands build distinctive, memorable visual identities — from logo design and typography to comprehensive brand guideline decks.',
    features: [
      'Brand Strategy & Positioning',
      'Logo Design & Visual Identity Systems',
      'Typography & Color Palette Guidelines',
      'Marketing Collateral & Packaging Design',
      'Social Media Kits & Brand Assets',
      'Comprehensive Brand Style Guides'
    ],
    deliverables: [
      'Vector Logo Master Files',
      'Brand Style Guide PDF',
      'Social Media Asset Kit',
      'Business Stationery Templates'
    ]
  }
];

window.openCoreServiceModal = function(slug) {
  const service = SITE_CORE_SERVICES.find(s => s.slug === slug);
  if (!service) return;

  const modal = document.getElementById('core-service-modal');
  const badge = document.getElementById('modal-service-badge');
  const title = document.getElementById('modal-service-title');
  const meta = document.getElementById('modal-service-meta');
  const body = document.getElementById('modal-service-body');

  if (badge) badge.textContent = `Discipline ${service.num} • ${service.serif}`;
  if (title) title.textContent = service.title;
  if (meta) meta.textContent = `${service.headline} • Nexprobyte Studio`;

  if (body) {
    const featuresHtml = service.features.map(f => `<li style="display:flex; align-items:center; gap:8px; margin-bottom:8px;"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0066FF" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg> <span>${f}</span></li>`).join('');
    const deliverablesHtml = service.deliverables.map(d => `<li style="display:flex; align-items:center; gap:8px; margin-bottom:8px;"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#00d6b2" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg> <span>${d}</span></li>`).join('');

    body.innerHTML = `
      <img src="${service.image}" alt="${service.title}" class="site-modal-cover-img" />
      <div class="article-block">
        <h4 class="article-heading">${service.headline}</h4>
        <p class="article-para">${service.overview}</p>
      </div>
      <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap:20px; margin-top:20px;">
        <div style="background:#f8fafc; padding:18px; border-radius:12px; border:1px solid var(--border-subtle);">
          <h5 style="font-family:var(--font-display); font-size:0.95rem; font-weight:700; margin-bottom:12px; color:var(--text-primary);">Capabilities Included:</h5>
          <ul style="list-style:none; padding:0; margin:0; font-size:0.88rem;">${featuresHtml}</ul>
        </div>
        <div style="background:#f8fafc; padding:18px; border-radius:12px; border:1px solid var(--border-subtle);">
          <h5 style="font-family:var(--font-display); font-size:0.95rem; font-weight:700; margin-bottom:12px; color:var(--text-primary);">Client Deliverables:</h5>
          <ul style="list-style:none; padding:0; margin:0; font-size:0.88rem;">${deliverablesHtml}</ul>
        </div>
      </div>
    `;
  }

  if (modal) {
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }
};

/* ==========================================================================
   21. BLOG JOURNAL SYSTEM & COMPLETE ARTICLE READER
   ========================================================================== */
const SITE_POSTS = [
  {
    slug: 'why-every-business-needs-a-website-in-2026',
    title: 'Why Every Business Still Needs a Website in 2026',
    category: 'Web',
    date: 'Aug 18, 2026',
    read: '5 min',
    image: 'images/cover-web.jpg',
    excerpt: 'Social media borrows your audience; a website owns it. Here\'s why your own corner of the internet still matters more than ever.',
    content: [
      { h: 'The audience you rent vs the one you own', p: 'Social platforms are powerful — but they can change their algorithm, their pricing or their rules overnight. A website is the one place where you control the experience, the content and the relationship. It\'s the home base every other channel points back to.' },
      { h: 'Credibility is decided in 5 seconds', p: 'Before a customer buys, they check. A fast, clean and professional website tells them you\'re a serious business. In 2026 that first impression still happens on a company\'s own domain more than anywhere else.' },
      { h: 'It compounds, everything else doesn\'t', p: 'Every blog post, product page and service explainer you publish becomes an asset that keeps working — appearing in search results, answering questions and closing sales while you sleep. That\'s leverage social posts rarely give you.' },
      { h: 'Digital marketing starts at your domain', p: 'Whether you run Google Ads, post on social media or publish content, every digital marketing channel should land on a page you own. A fast-loading website built for conversion is the foundation every Coimbatore business needs before scaling marketing spend.' },
      { h: 'The takeaway', p: 'You don\'t need a website because it\'s trendy. You need one because it\'s the only channel you fully own. Build it well, keep it fast, and let every other channel feed it.' }
    ],
    links: [
      { label: 'Google — How to make a website that converts', href: 'https://support.google.com/google-ads/answer/7477785' },
      { label: 'WordPress.com — Build a website for your business', href: 'https://wordpress.com/go' }
    ]
  },
  {
    slug: 'seo-basics-that-actually-move-the-needle',
    title: 'SEO Basics That Actually Move the Needle',
    category: 'SEO',
    date: 'Jul 30, 2026',
    read: '6 min',
    image: 'images/cover-seo.jpg',
    excerpt: 'Skip the gimmicks. These practical, on-page fundamentals consistently improve rankings for small and mid-size businesses.',
    content: [
      { h: 'Start with the search behind the click', p: 'People don\'t search for you, they search for a solution. Find the phrases your customers type when they have a problem you solve — and build content around exactly those phrases, not vague keywords.' },
      { h: 'Speed is a ranking factor and a conversion factor', p: 'Google punishes slow sites and so do users. Compress images, minimise scripts and move to fast hosting. A one-second improvement in load time can lift both rankings and conversions.' },
      { h: 'Length isn\'t the goal — clarity is', p: 'A page that answers one question completely beats ten pages that answer it halfway. Structure content with clear headings so both Google and readers understand it instantly.' },
      { h: 'Backlinks still decide who wins', p: 'On-page SEO gets you in the game; backlinks win it. A focused backlink building strategy — earning links from authentic, relevant websites — remains one of the strongest ranking signals Google uses. Quality beats quantity: one link from a trusted industry site is worth more than dozens of low-authority directory links.' },
      { h: 'Consistency compounds', p: 'SEO is not a one-month project. Publish useful content monthly, keep technical health in check, and give it time. The businesses that win are simply the ones that kept showing up. For startups and SMEs in Coimbatore, a local SEO strategy combined with steady content publishing tends to outperform expensive one-off campaigns.' }
    ],
    links: [
      { label: 'Google Search Central — SEO Starter Guide', href: 'https://developers.google.com/search/docs/fundamentals/seo-starter-guide' },
      { label: 'Google Best Practices for backlinks', href: 'https://developers.google.com/search/docs/crawling-indexing/qualify-outbound-links' },
      { label: 'Moz — Beginner\'s Guide to Link Building', href: 'https://moz.com/beginners-guide-to-link-building' }
    ]
  },
  {
    slug: 'mobile-first-design-is-not-optional',
    title: 'Mobile-First Design Is Not Optional',
    category: 'Design',
    date: 'Jul 12, 2026',
    read: '4 min',
    image: 'images/cover-design.jpg',
    excerpt: 'More than 70% of web traffic now comes from phones. Design for the small screen first and the large screen will thank you.',
    content: [
      { h: 'Small screen, big decisions', p: 'When you design for mobile first, you\'re forced to make decisions about what\'s truly important. That clarity carries over to the desktop experience — stripping away the noise before it ever gets added back.' },
      { h: 'Thumb-friendly interactions', p: 'Buttons should sit where thumbs naturally reach, tap targets need to be generously sized, and forms should ask for the least possible input. The friction you remove on mobile is friction you remove everywhere.' },
      { h: 'Performance is part of the design', p: 'A beautiful layout that loads slowly feels broken on a phone. Optimise images, defer heavy scripts and test on real devices, not just desktop browsers.' },
      { h: 'The takeaway', p: 'Mobile-first isn\'t a compromise — it\'s a discipline. Get the experience right on the constrained canvas and every other screen becomes easier.' }
    ],
    links: [
      { label: 'web.dev — Responsive web design basics', href: 'https://web.dev/responsive-web-design-basics/' }
    ]
  },
  {
    slug: 'social-media-strategy-for-smes',
    title: 'A Realistic Social Media Strategy for SMEs',
    category: 'Marketing',
    date: 'Jun 21, 2026',
    read: '7 min',
    image: 'images/cover-marketing.jpg',
    excerpt: 'Posting more isn\'t the strategy. Here\'s a simple, sustainable system for small teams to build a brand people actually follow.',
    content: [
      { h: 'Pick two platforms, not six', p: 'Small teams can\'t be everywhere. Choose the one or two platforms where your customers actually spend time, commit to them, and go deep instead of spreading thin. Most SMEs in Coimbatore see the strongest returns from a mix of Instagram and LinkedIn.' },
      { h: 'Content that serves, not just sells', p: 'Strike a balance: teach something useful, share behind-the-scenes moments, and occasionally ask for the sale. The ratio that works for most SMEs is roughly 4:1 — four value posts for every promotional one.' },
      { h: 'Batching beats burnout', p: 'Set aside one morning a month to create 8–10 pieces of content. Batch creation removes the daily anxiety and gives you a consistent presence without the daily scramble.' },
      { h: 'Backlinks and authority belong in the mix', p: 'Social feeds are rented, but your blog is owned. When you publish genuinely useful articles and earn backlinks from other websites, your social profiles start sending real search traffic too. Every social post should point back to a blog page built to rank for what your customers search in Google.' },
      { h: 'Measure the right things', p: 'Likes are vanity; conversations and booked enquiries are what matter. Watch what content leads to messages and calls, then make more of that.' }
    ],
    links: [
      { label: 'HubSpot — Social Media Marketing Guide', href: 'https://blog.hubspot.com/marketing/social-media-marketing' },
      { label: 'Meta for Business — Getting Started', href: 'https://www.facebook.com/business/ads' }
    ]
  },
  {
    slug: 'what-is-a-digital-agency-and-how-to-choose-one',
    title: 'What Is a Digital Agency (and How to Choose One)',
    category: 'Business',
    date: 'May 29, 2026',
    read: '6 min',
    image: 'images/cover-business.jpg',
    excerpt: 'Before you hire an agency, you should know what to look for — and what to avoid. A practical guide for first-time buyers.',
    content: [
      { h: 'What an agency actually does', p: 'A digital agency is a team that handles the parts of your business you don\'t have skills or time for — building websites, apps, marketing and design as one coordinated unit rather than disconnected freelancers.' },
      { h: 'Look for process, not promises', p: 'Avoid agencies that guarantee \'number one on Google\' or \'10x sales overnight\'. The good ones talk about process: research, build, test, measure, improve. That\'s the language of people who deliver.' },
      { h: 'Ask who you\'ll actually speak to', p: 'Will you interact with the people doing the work, or a salesperson who disappears after the contract is signed? Clear, direct communication is the single best predictor of a good project.' },
      { h: 'Local context matters for digital marketing agencies', p: 'For businesses in India, an agency that understands local search behaviour is a major advantage. A digital marketing agency in Coimbatore that knows how local businesses rank, what Indian audiences click, and how to combine SEO with performance ads will usually beat a generic national firm on cost and results.' },
      { h: 'Look at work in your industry', p: 'Relevant case studies matter more than impressive portfolios. Past context in your sector means less ramp-up time and fewer expensive lessons.' }
    ],
    links: [
      { label: 'Google Ads Help — How to choose a digital agency', href: 'https://support.google.com/google-ads/answer/7476683' }
    ]
  },
  {
    slug: 'web-performance-is-a-business-metric',
    title: 'Web Performance Is a Business Metric',
    category: 'Web',
    date: 'May 05, 2026',
    read: '5 min',
    image: 'images/cover-speed.jpg',
    excerpt: 'Every second of load time is revenue leaking out the door. Why speed should be a board-room topic, not just a developer concern.',
    content: [
      { h: 'The seconds have a price tag', p: 'Studies consistently show that conversion rates drop sharply as load time increases — often several percent per second. For a business doing meaningful traffic, that translates into real, countable revenue.' },
      { h: 'Speed shapes perception', p: 'Users can\'t articulate why, but a slow site makes a brand feel outdated and untrustworthy. Speed is a branding decision wearing technical clothes.' },
      { h: 'Where to start', p: 'Measure first. Use tools like Google PageSpeed Insights and real-user monitoring to identify the biggest offenders, then fix images, caching and server response times in that order.' },
      { h: 'The takeaway', p: 'Treat web performance like any other business KPI: set targets, measure them, and expect them to improve. The payoff is straightforward and compounding — and it\'s the same discipline top digital agencies in Coimbatore apply to every client site they ship.' }
    ],
    links: [
      { label: 'web.dev — Core Web Vitals explained by Google', href: 'https://web.dev/learn-core-web-vitals' },
      { label: 'PageSpeed Insights by Google', href: 'https://pagespeed.web.dev/' }
    ]
  }
];

function initBlogSystem() {
  const filterPills = document.querySelectorAll('.blog-filter-pill');
  const blogCards = document.querySelectorAll('.blog-card');

  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      filterPills.forEach(p => p.classList.remove('is-active'));
      pill.classList.add('is-active');

      const selectedCat = pill.getAttribute('data-cat');
      blogCards.forEach(card => {
        const cardCat = card.getAttribute('data-category');
        if (selectedCat === 'all' || cardCat === selectedCat) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

window.openBlogReaderModal = function(slug) {
  const post = SITE_POSTS.find(p => p.slug === slug);
  if (!post) return;

  const modal = document.getElementById('blog-reader-modal');
  const cat = document.getElementById('modal-blog-cat');
  const title = document.getElementById('modal-blog-title');
  const meta = document.getElementById('modal-blog-meta');
  const body = document.getElementById('modal-blog-body');

  if (cat) cat.textContent = post.category;
  if (title) title.textContent = post.title;
  if (meta) meta.textContent = `${post.read} read • Published ${post.date}`;

  if (body) {
    const sectionsHtml = post.content.map(c => `
      <div class="article-block">
        <h4 class="article-heading">${c.h}</h4>
        <p class="article-para">${c.p}</p>
      </div>
    `).join('');

    let linksHtml = '';
    if (post.links && post.links.length > 0) {
      const items = post.links.map(l => `
        <li class="prose-link-item">
          <a href="${l.href}" target="_blank" rel="noopener noreferrer">${l.label} &rarr;</a>
        </li>
      `).join('');
      linksHtml = `
        <div class="prose-links-box">
          <span class="prose-links-title">Outbound References &amp; Official Documentation:</span>
          <ul class="prose-links-list">${items}</ul>
        </div>
      `;
    }

    body.innerHTML = `
      <img src="${post.image}" alt="${post.title}" class="site-modal-cover-img" />
      <div class="article-block" style="font-size:1.05rem; font-weight:500; color:var(--text-primary); margin-bottom:20px; line-height:1.5;">
        ${post.excerpt}
      </div>
      ${sectionsHtml}
      ${linksHtml}
    `;
  }

  if (modal) {
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }
};

/* ==========================================================================
   22. CAREERS SYSTEM & APPLICATION MODALS
   ========================================================================== */
const SITE_JOBS = [
  {
    slug: 'frontend-developer',
    title: 'Frontend Developer',
    dept: 'Engineering',
    location: 'Coimbatore / Remote',
    type: 'Full-time',
    salary: '₹3L – ₹6L / year',
    excerpt: 'Turn beautiful designs into fast, accessible interfaces using React and modern CSS. Work across client websites and internal products.',
    responsibilities: [
      'Build responsive UI with React, Next.js and modern CSS',
      'Translate Figma designs into clean, accessible components',
      'Optimise Core Web Vitals and page performance',
      'Collaborate with designers and backend engineers',
      'Participate in code reviews and testing'
    ],
    requirements: [
      '2+ years building production React applications',
      'Strong HTML, CSS and JavaScript fundamentals',
      'Experience with REST APIs and Git workflows',
      'An eye for detail and performance',
      'Bonus: motion/animation libraries, TypeScript'
    ]
  },
  {
    slug: 'fullstack-developer',
    title: 'Full Stack Developer',
    dept: 'Engineering',
    location: 'Coimbatore / Remote',
    type: 'Full-time',
    salary: '₹3.5L – ₹7L / year',
    excerpt: 'Build high-performance web applications, scalable REST APIs, and modern user interfaces using React, Node.js, and modern databases.',
    responsibilities: [
      'Architect and build robust web applications end-to-end',
      'Develop responsive frontends with React, Next.js and modern CSS',
      'Design and maintain scalable RESTful APIs with Node.js & Express',
      'Integrate PostgreSQL, MongoDB, and Redis caching systems',
      'Implement authentication, security best practices, and CI/CD pipelines'
    ],
    requirements: [
      '2+ years experience in full-stack JavaScript / TypeScript development',
      'Strong proficiency in React, Node.js, Express, and modern ES6+',
      'Experience with relational (PostgreSQL) or NoSQL (MongoDB) databases',
      'Proficient in REST API design, state management, and Git workflows',
      'Bonus: Docker, AWS/cloud deployment, Tailwind or Motion libraries'
    ]
  },
  {
    slug: 'ui-ux-designer',
    title: 'UI/UX Designer',
    dept: 'Design',
    location: 'Coimbatore',
    type: 'Full-time',
    salary: '₹3L – ₹6.5L / year',
    excerpt: 'Design intuitive, beautiful interfaces for websites and apps — from whiteboard sketches to polished, hand-off-ready systems.',
    responsibilities: [
      'Own UX flows, wireframes and prototypes',
      'Design high-fidelity UI and design systems',
      'Run user research and usability testing',
      'Partner with developers through delivery',
      'Present and defend design decisions'
    ],
    requirements: [
      'Portfolio of shipped web or mobile products',
      'Strong Figma skills (components, auto-layout)',
      'Solid typography, colour and layout sense',
      'Understanding of HTML/CSS constraints',
      'Motion design experience is a big plus'
    ]
  },
  {
    slug: 'digital-marketing-specialist',
    title: 'Digital Marketing Specialist',
    dept: 'Marketing',
    location: 'Coimbatore',
    type: 'Full-time',
    salary: '₹2.5L – ₹5L / year',
    excerpt: 'Plan and run performance campaigns across Google and Meta — and turn the numbers into clear recommendations for clients.',
    responsibilities: [
      'Plan, launch and optimise Google/Meta campaigns',
      'Write ad copy and brief designers on creatives',
      'Track ROI and prepare monthly performance reports',
      'Manage client budgets transparently',
      'Run SEO and content initiatives'
    ],
    requirements: [
      '1.5+ years in performance marketing',
      'Hands-on Google Ads and Meta Ads experience',
      'Comfortable with GA4 and Looker Studio',
      'Strong written communication',
      'Certifications (Google/Bing) are a plus'
    ]
  },
  {
    slug: 'seo-analyst',
    title: 'SEO Analyst',
    dept: 'Marketing',
    location: 'Remote',
    type: 'Full-time',
    salary: '₹2L – ₹4.5L / year',
    excerpt: 'Own rankings for a portfolio of client websites — technical fixes, content strategy and link building, all measured with data.',
    responsibilities: [
      'Conduct technical and content audits',
      'Build keyword roadmaps and content briefs',
      'Implement on-page optimisations',
      'Report on rankings, traffic and conversions',
      'Stay current with Google algorithm changes'
    ],
    requirements: [
      '1.5+ years hands-on SEO experience',
      'Comfortable with Search Console, Ahrefs/Semrush',
      'Working knowledge of HTML and schema markup',
      'Analytical and detail-oriented mindset',
      'Local SEO experience is a plus'
    ]
  }
];

window.openJobDetailModal = function(slug) {
  const job = SITE_JOBS.find(j => j.slug === slug);
  if (!job) return;

  const modal = document.getElementById('job-detail-modal');
  const badge = document.getElementById('modal-job-badge');
  const title = document.getElementById('modal-job-title');
  const meta = document.getElementById('modal-job-meta');
  const body = document.getElementById('modal-job-body');
  const applyTrigger = document.getElementById('modal-job-apply-trigger');

  if (badge) badge.textContent = `${job.dept} • ${job.type}`;
  if (title) title.textContent = job.title;
  if (meta) meta.textContent = `📍 ${job.location} • Compensation: ${job.salary}`;

  if (body) {
    const respHtml = job.responsibilities.map(r => `<li style="display:flex; align-items:flex-start; gap:8px; margin-bottom:8px;"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0066FF" stroke-width="2.5" style="margin-top:4px; flex-shrink:0;"><polyline points="20 6 9 17 4 12"></polyline></svg> <span>${r}</span></li>`).join('');
    const reqHtml = job.requirements.map(rq => `<li style="display:flex; align-items:flex-start; gap:8px; margin-bottom:8px;"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#00d6b2" stroke-width="2.5" style="margin-top:4px; flex-shrink:0;"><polyline points="20 6 9 17 4 12"></polyline></svg> <span>${rq}</span></li>`).join('');

    body.innerHTML = `
      <p style="font-size:1.05rem; color:var(--text-primary); margin-bottom:20px; line-height:1.6;">${job.excerpt}</p>
      <div style="margin-bottom:20px;">
        <h4 class="article-heading">Key Responsibilities:</h4>
        <ul style="list-style:none; padding:0; margin:0; font-size:0.92rem;">${respHtml}</ul>
      </div>
      <div>
        <h4 class="article-heading">Candidate Requirements:</h4>
        <ul style="list-style:none; padding:0; margin:0; font-size:0.92rem;">${reqHtml}</ul>
      </div>
    `;
  }

  if (applyTrigger) {
    applyTrigger.onclick = () => {
      window.openJobApplyModal(job.title, job.location, job.salary);
    };
  }

  if (modal) {
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }
};

window.openJobApplyModal = function(roleTitle, location, salary) {
  const detailModal = document.getElementById('job-detail-modal');
  if (detailModal) detailModal.style.display = 'none';

  const modal = document.getElementById('job-apply-modal');
  const badge = document.getElementById('modal-apply-badge');
  const title = document.getElementById('modal-apply-title');
  const hiddenRole = document.getElementById('apply-role-name');

  if (badge) badge.textContent = `${location || 'Coimbatore / Remote'} • ${salary || 'Full-time'}`;
  if (title) title.textContent = `Apply for ${roleTitle}`;
  if (hiddenRole) hiddenRole.value = roleTitle;

  if (modal) {
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }
};

function initCareersSystem() {
  const applyForm = document.getElementById('career-apply-form');
  const toast = document.getElementById('toast-modal');
  const toastMsg = document.getElementById('toast-message');

  if (applyForm) {
    applyForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const role = document.getElementById('apply-role-name')?.value || 'Engineering Role';
      const name = document.getElementById('apply-fullname')?.value || 'Applicant';

      if (toast && toastMsg) {
        toastMsg.textContent = `Thank you ${name}! Your application for ${role} has been received. Our studio lead will contact you within 24 hours.`;
        toast.classList.add('visible');
        setTimeout(() => toast.classList.remove('visible'), 5000);
      }

      applyForm.reset();
      const applyModal = document.getElementById('job-apply-modal');
      if (applyModal) {
        applyModal.style.display = 'none';
        document.body.style.overflow = '';
      }
    });
  }
}

/* ==========================================================================
   23. FLOATING INTERACTIVE NEXI AI CHATBOT
   ========================================================================== */
function initNexiChatbot() {
  const fabBtn = document.getElementById('nexi-fab-btn');
  const windowEl = document.getElementById('nexi-window');
  const closeBtn = document.getElementById('nexi-close-btn');
  const messagesBox = document.getElementById('nexi-messages');
  const chips = document.querySelectorAll('.nexi-chip');
  const form = document.getElementById('nexi-form');
  const input = document.getElementById('nexi-user-input');

  if (!fabBtn || !windowEl) return;

  function toggleChat() {
    const isVisible = windowEl.style.display === 'flex';
    windowEl.style.display = isVisible ? 'none' : 'flex';
    if (!isVisible && input) {
      setTimeout(() => input.focus(), 100);
    }
  }

  fabBtn.addEventListener('click', toggleChat);
  if (closeBtn) closeBtn.addEventListener('click', () => { windowEl.style.display = 'none'; });

  function appendMessage(text, isUser = false) {
    if (!messagesBox) return;
    const row = document.createElement('div');
    row.className = `nexi-message-row ${isUser ? 'is-user' : 'is-bot'}`;

    const avatar = isUser ? '' : '<div class="nexi-msg-avatar">✦</div>';
    row.innerHTML = `
      ${avatar}
      <div class="nexi-bubble">
        ${text}
        <span class="nexi-time">Just now</span>
      </div>
    `;
    messagesBox.appendChild(row);
    messagesBox.scrollTop = messagesBox.scrollHeight;
  }

  function handlePrompt(promptText) {
    appendMessage(promptText, true);

    const norm = promptText.toLowerCase();
    let reply = "";

    if (norm.includes('product') || norm.includes('go drive')) {
      reply = `<strong>Nexprobyte Products:</strong> Our flagship SaaS includes <em>GO Drive</em> — high-speed secure cloud storage & enterprise document synchronizer. We also engineer bespoke CRM/ERP platforms tailored to client workflows.`;
    } else if (norm.includes('hire') || norm.includes('developer') || norm.includes('dev')) {
      reply = `<strong>Dedicated Developers:</strong> Onboard senior Full-Stack (React/Node), Mobile (Flutter/iOS), or AI engineers within 48 hours. 100% time-zone overlap, 14-day trial, and direct GitHub/Slack integration.`;
    } else if (norm.includes('service') || norm.includes('engineer')) {
      reply = `<strong>Engineering Services:</strong> We offer 8 Core Studio Disciplines (Web, Apps, Mobile, SEO, Marketing, UI/UX, Branding) alongside 52 specialized PDF services across automation, CRM, and technical support.`;
    } else if (norm.includes('studio') || norm.includes('location') || norm.includes('coimbatore') || norm.includes('phone') || norm.includes('contact')) {
      reply = `<strong>Coimbatore Studio:</strong><br>📍 1st Floor, Nanjiammal Complex, Maniyakarampalayam, Coimbatore - 641006.<br>📞 Phone: <a href="tel:+919500042426" style="color:#0066FF; text-decoration:underline;">+91 95000 42426</a><br>⏰ Mon – Sat: 9:00 AM – 7:00 PM.`;
    } else {
      reply = `Thank you for your message! Our solutions architect is available right now. You can call our Coimbatore Studio directly at <a href="tel:+919500042426" style="color:#0066FF; text-decoration:underline;">+91 95000 42426</a> or continue via the WhatsApp button below for instant project estimation.`;
    }

    setTimeout(() => {
      appendMessage(reply, false);
    }, 450);
  }

  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      const prompt = chip.getAttribute('data-nexi-prompt');
      if (prompt) handlePrompt(prompt);
    });
  });

  if (form && input) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const val = input.value.trim();
      if (!val) return;
      input.value = '';
      handlePrompt(val);
    });
  }
}

/* ==========================================================================
   24. CONTACT TOPIC PILLS & PROJECT SELECTION
   ========================================================================== */
function initContactTopics() {
  const pills = document.querySelectorAll('.topic-pill');
  pills.forEach(pill => {
    pill.addEventListener('click', () => {
      pill.classList.toggle('is-active');
    });
  });
}

/* ==========================================================================
   25. GENERIC SITE MODALS BACKDROP & DISMISSAL
   ========================================================================== */
function initModalBackdrops() {
  const backdrops = document.querySelectorAll('.site-modal-backdrop');
  backdrops.forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.style.display = 'none';
        document.body.style.overflow = '';
      }
    });

    const closeBtns = modal.querySelectorAll('.site-modal-close-btn, #modal-blog-close-btn, #modal-job-close-btn, #modal-service-close-btn, #modal-apply-cancel-btn');
    closeBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        modal.style.display = 'none';
        document.body.style.overflow = '';
      });
    });

    // Close modal when any in-modal anchor link (e.g. href="#contact") is clicked
    const actionLinks = modal.querySelectorAll('a[href^="#"]');
    actionLinks.forEach(link => {
      link.addEventListener('click', () => {
        modal.style.display = 'none';
        document.body.style.overflow = '';
      });
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      backdrops.forEach(m => { m.style.display = 'none'; });
      document.body.style.overflow = '';
      const nexiWin = document.getElementById('nexi-window');
      if (nexiWin) nexiWin.style.display = 'none';
    }
  });
}

