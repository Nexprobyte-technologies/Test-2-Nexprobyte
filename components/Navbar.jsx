'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [hoveredNav, setHoveredNav] = useState(null);
  const [activeSection, setActiveSection] = useState('hero');
  const [servicesOpen, setServicesOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 40);

      // Top scroll progress bar
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? Math.min(Math.max(scrollY / docHeight, 0), 1) : 0;
      setScrollProgress(progress);

      // ScrollSpy active link detection
      const sections = [
        'hero',
        'principles',
        'platform',
        'services',
        'capabilities',
        'industries',
        'work',
        'ai-copilot',
        'approach',
        'tour',
        'pricing',
        'about',
        'blog',
        'careers',
        'faq',
        'contact',
      ];
      const scrollPos = scrollY + 160;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle escape key to close drawer
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setDrawerOpen(false);
        setServicesOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const navLinks = [
    { label: 'Services', href: '/services', id: 'services' },
    { label: 'Capabilities', href: '/#capabilities', id: 'capabilities' },
    { label: 'Industries', href: '/#industries', id: 'industries' },
    { label: 'Work', href: '/#work', id: 'work' },
    { label: 'Pricing', href: '/#pricing', id: 'pricing' },
    { label: 'About', href: '/about', id: 'about' },
    { label: 'Insights', href: '/blog', id: 'blog' },
    { label: 'Careers', href: '/careers', id: 'careers' },
    { label: 'FAQ', href: '/#faq', id: 'faq' },
  ];

  return (
    <>
      {/* Top Viewport Scroll Progress Bar */}
      <div
        className="scroll-progress-bar"
        id="scroll-progress"
        aria-hidden="true"
        style={{ transform: `scaleX(${scrollProgress})` }}
      />

      {/* Floating Navigation Dock */}
      <header className="nav-wrapper">
        <nav
          className="nav-dock"
          id="main-nav"
          style={{
            background: isScrolled ? 'rgba(255, 255, 255, 0.96)' : 'rgba(255, 255, 255, 0.88)',
            boxShadow: isScrolled
              ? '0 12px 36px rgba(0, 0, 0, 0.12), 0 0 1px rgba(0, 0, 0, 0.2)'
              : 'var(--shadow-dock)',
          }}
        >
          {/* Logo */}
          <Link href="/" className="nav-brand" aria-label="Nexprobyte Technologies">
            <div className="brand-icon">
              <img
                src="/assets/logo-transparent.png"
                alt="Nexprobyte Logo"
                className="brand-logo-img"
                width={28}
                height={18}
              />
            </div>
            <span>NEXPROBYTE</span>
          </Link>

          {/* Desktop Links */}
          <ul className="nav-links" onMouseLeave={() => setHoveredNav(null)}>
            {/* Services Dropdown */}
            <li
              className="nav-item"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <a
                href="#services"
                className={`nav-link ${activeSection === 'services' ? 'active' : ''}`}
                onClick={() => setServicesOpen(!servicesOpen)}
              >
                <span>Services</span>
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  style={{
                    transform: servicesOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.2s ease',
                  }}
                >
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </a>

              <AnimatePresence>
                {servicesOpen && (
                  <motion.div
                    className="nav-dropdown"
                    initial={{ opacity: 0, y: 10, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.96 }}
                    transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <a href="#service-va" className="dropdown-item" onClick={() => setServicesOpen(false)}>
                      <div className="dropdown-icon">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                          <circle cx="9" cy="7" r="4"></circle>
                          <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                        </svg>
                      </div>
                      <div>
                        <div className="dropdown-title">Virtual Assistance (10 Services)</div>
                        <div className="dropdown-desc">Executive, Admin, CRM, Real Estate &amp; E-Commerce VAs</div>
                      </div>
                    </a>

                    <a href="#service-dev" className="dropdown-item" onClick={() => setServicesOpen(false)}>
                      <div className="dropdown-icon">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polyline points="16 18 22 12 16 6"></polyline>
                          <polyline points="8 6 2 12 8 18"></polyline>
                        </svg>
                      </div>
                      <div>
                        <div className="dropdown-title">Software Development (12 Disciplines)</div>
                        <div className="dropdown-desc">Dedicated Full-Stack, Frontend, Mobile, QA &amp; DevOps Teams</div>
                      </div>
                    </a>

                    <a href="#service-ai" className="dropdown-item" onClick={() => setServicesOpen(false)}>
                      <div className="dropdown-icon">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <rect x="2" y="3" width="20" height="14" rx="2"></rect>
                          <line x1="8" y1="21" x2="16" y2="21"></line>
                        </svg>
                      </div>
                      <div>
                        <div className="dropdown-title">AI &amp; Automation VA (12 Disciplines)</div>
                        <div className="dropdown-desc">n8n, Zapier, Make, Chatbots &amp; Multi-Agent Workflows</div>
                      </div>
                    </a>

                    <a href="#service-support" className="dropdown-item" onClick={() => setServicesOpen(false)}>
                      <div className="dropdown-icon">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="12" cy="12" r="10"></circle>
                          <path d="M12 8v4l3 3"></path>
                        </svg>
                      </div>
                      <div>
                        <div className="dropdown-title">Web &amp; E-Commerce Support (10 Services)</div>
                        <div className="dropdown-desc">Shopify, WordPress, Speed &amp; 24/7 Security Maintenance</div>
                      </div>
                    </a>

                    <a href="#service-custom" className="dropdown-item" onClick={() => setServicesOpen(false)}>
                      <div className="dropdown-icon">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <rect x="3" y="3" width="18" height="18" rx="2"></rect>
                          <path d="M3 9h18"></path>
                        </svg>
                      </div>
                      <div>
                        <div className="dropdown-title">CRM &amp; Custom Software (8 Solutions)</div>
                        <div className="dropdown-desc">Custom ERP, Billing, SaaS Platforms &amp; API Integrations</div>
                      </div>
                    </a>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>

            {/* Standard Nav Items */}
            {navLinks.map((link) => (
              <li key={link.id} className="nav-item">
                <a
                  href={link.href}
                  className={`nav-link ${activeSection === link.id ? 'active' : ''}`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Right Action */}
          <div className="nav-actions">
            <a href="tel:+919500042426" className="nav-call-btn" title="Call Coimbatore Office">
              <span>📞 +91 95000 42426</span>
            </a>
            <a href="#contact" className="nav-cta-btn">
              <span>Consult Architect</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </a>

            {/* Mobile Hamburger */}
            <button
              type="button"
              className={`nav-hamburger ${drawerOpen ? 'open' : ''}`}
              id="nav-toggle"
              aria-label="Toggle navigation menu"
              onClick={() => setDrawerOpen(!drawerOpen)}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {drawerOpen && (
          <>
            <motion.div
              className="drawer-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDrawerOpen(false)}
            />
            <motion.div
              className="mobile-drawer open"
              id="mobile-drawer"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            >
              <div className="mobile-drawer-header">
                <a href="#hero" className="mobile-drawer-brand" onClick={() => setDrawerOpen(false)}>
                  <div className="brand-icon">
                    <img src="/assets/logo-transparent.png" alt="Nexprobyte Logo" className="brand-logo-img" width={28} height={18} />
                  </div>
                  <span>NEXPROBYTE</span>
                </a>
                <button
                  type="button"
                  className="mobile-drawer-close"
                  id="drawer-close"
                  aria-label="Close menu"
                  onClick={() => setDrawerOpen(false)}
                >
                  ✕
                </button>
              </div>

              <div className="mobile-drawer-body">
                <ul className="mobile-nav-list">
                  <li><Link href="/services" onClick={() => setDrawerOpen(false)}>Services Suite (8 Disciplines &amp; 52 PDF)</Link></li>
                  <li><Link href="/#capabilities" onClick={() => setDrawerOpen(false)}>Capabilities &amp; Stacks</Link></li>
                  <li><Link href="/#industries" onClick={() => setDrawerOpen(false)}>Industries We Empower</Link></li>
                  <li><Link href="/#work" onClick={() => setDrawerOpen(false)}>Signature Case Studies</Link></li>
                  <li><Link href="/#pricing" onClick={() => setDrawerOpen(false)}>Pricing &amp; Packages</Link></li>
                  <li><Link href="/about" onClick={() => setDrawerOpen(false)}>About Coimbatore Studio</Link></li>
                  <li><Link href="/blog" onClick={() => setDrawerOpen(false)}>Insights &amp; Guides</Link></li>
                  <li><Link href="/careers" onClick={() => setDrawerOpen(false)}>Careers (5 Openings)</Link></li>
                  <li><Link href="/interview-data" onClick={() => setDrawerOpen(false)}>Candidate Onboarding</Link></li>
                  <li><Link href="/#faq" onClick={() => setDrawerOpen(false)}>FAQ</Link></li>
                  <li><Link href="/contact" onClick={() => setDrawerOpen(false)}>Contact Us</Link></li>
                </ul>

                <div style={{ marginTop: '30px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <Link href="/contact" className="btn-primary-hero" style={{ justifyContent: 'center' }} onClick={() => setDrawerOpen(false)}>
                    Start Project Consultation &rarr;
                  </Link>
                  <a href="tel:+919500042426" className="btn-secondary-hero" style={{ justifyContent: 'center' }}>
                    📞 Call +91 95000 42426
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
