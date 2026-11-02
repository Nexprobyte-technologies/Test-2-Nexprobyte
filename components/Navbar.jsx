'use client';

import React, { useState, useEffect } from 'react';
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
      const sections = ['hero', 'statement', 'platform', 'services', 'ai-copilot', 'tour', 'pricing', 'faq', 'contact'];
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
      if (e.key === 'Escape') setDrawerOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const navLinks = [
    { label: 'Platform', href: '#platform', id: 'platform' },
    { label: 'AI Copilot', href: '#ai-copilot', id: 'ai-copilot' },
    { label: 'Tour', href: '#tour', id: 'tour' },
    { label: 'Pricing', href: '#pricing', id: 'pricing' },
    { label: 'FAQ', href: '#faq', id: 'faq' },
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
            background: isScrolled ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.85)',
            boxShadow: isScrolled
              ? '0 12px 36px rgba(0, 0, 0, 0.12), 0 0 1px rgba(0, 0, 0, 0.2)'
              : 'var(--shadow-dock)',
          }}
        >
          {/* Logo */}
          <a href="#hero" className="nav-brand" aria-label="Nexprobyte Technologies">
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
          </a>

          {/* Desktop Links */}
          <ul className="nav-links" onMouseLeave={() => setHoveredNav(null)}>
            {/* Services Dropdown */}
            <li
              className="nav-item"
              onMouseEnter={() => {
                setHoveredNav('services');
                setServicesOpen(true);
              }}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <a
                href="#services"
                className={`nav-link ${activeSection === 'services' ? 'active' : ''}`}
                aria-expanded={servicesOpen}
              >
                <span>Services</span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </a>

              {hoveredNav === 'services' && (
                <motion.div
                  layoutId="nav-pill"
                  className="nav-hover-pill"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    borderRadius: '9999px',
                    backgroundColor: 'rgba(0, 102, 255, 0.08)',
                    zIndex: -1,
                  }}
                />
              )}

              {/* Spring Animated Dropdown Menu */}
              <AnimatePresence>
                {servicesOpen && (
                  <motion.div
                    className="nav-dropdown"
                    initial={{ opacity: 0, y: 10, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.96 }}
                    transition={{ type: 'spring', stiffness: 420, damping: 28 }}
                    style={{ display: 'block' }}
                  >
                    <a href="#service-va" className="dropdown-item" onClick={() => setServicesOpen(false)}>
                      <div className="dropdown-icon">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                          <circle cx="9" cy="7" r="4"></circle>
                          <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                          <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                        </svg>
                      </div>
                      <div>
                        <div className="dropdown-title">Virtual Assistance</div>
                        <div className="dropdown-desc">Executive, Admin, CRM & E-Commerce VAs</div>
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
                        <div className="dropdown-title">Software Development</div>
                        <div className="dropdown-desc">Dedicated Full-Stack, Mobile, QA & DevOps</div>
                      </div>
                    </a>

                    <a href="#service-ai" className="dropdown-item" onClick={() => setServicesOpen(false)}>
                      <div className="dropdown-icon">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                          <line x1="8" y1="21" x2="16" y2="21"></line>
                          <line x1="12" y1="17" x2="12" y2="21"></line>
                        </svg>
                      </div>
                      <div>
                        <div className="dropdown-title">AI & Automations</div>
                        <div className="dropdown-desc">n8n, Zapier, Chatbots & Autonomous Agents</div>
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
                        <div className="dropdown-title">Web & E-Commerce Support</div>
                        <div className="dropdown-desc">Shopify, WordPress, Speed & 24/7 Security</div>
                      </div>
                    </a>

                    <a href="#service-custom" className="dropdown-item" onClick={() => setServicesOpen(false)}>
                      <div className="dropdown-icon">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                          <line x1="2" y1="10" x2="22" y2="10"></line>
                        </svg>
                      </div>
                      <div>
                        <div className="dropdown-title">Custom Software & ERP</div>
                        <div className="dropdown-desc">SaaS Applications, Dashboards & CRM Systems</div>
                      </div>
                    </a>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>

            {navLinks.map((link) => (
              <li
                key={link.id}
                className="nav-item"
                onMouseEnter={() => setHoveredNav(link.id)}
              >
                <a
                  href={link.href}
                  className={`nav-link ${activeSection === link.id ? 'active' : ''}`}
                >
                  {link.label}
                </a>
                {hoveredNav === link.id && (
                  <motion.div
                    layoutId="nav-pill"
                    className="nav-hover-pill"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    style={{
                      position: 'absolute',
                      inset: 0,
                      borderRadius: '9999px',
                      backgroundColor: 'rgba(0, 102, 255, 0.08)',
                      zIndex: -1,
                    }}
                  />
                )}
              </li>
            ))}
          </ul>

          {/* Action Button */}
          <div className="nav-actions">
            <a href="#contact" className="btn-primary-sm">
              <span>Get Started</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </a>

            {/* Mobile Menu Toggle */}
            <button
              className="mobile-toggle"
              id="mobile-toggle"
              aria-label="Toggle menu"
              aria-expanded={drawerOpen}
              onClick={() => setDrawerOpen(!drawerOpen)}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                {drawerOpen ? (
                  <>
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </>
                ) : (
                  <>
                    <line x1="3" y1="12" x2="21" y2="12"></line>
                    <line x1="3" y1="6" x2="21" y2="6"></line>
                    <line x1="3" y1="18" x2="21" y2="18"></line>
                  </>
                )}
              </svg>
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Drawer */}
      <div
        className={`mobile-drawer ${drawerOpen ? 'open' : ''}`}
        id="mobile-drawer"
        onClick={(e) => {
          if (e.target.id === 'mobile-drawer') setDrawerOpen(false);
        }}
      >
        <div className="mobile-drawer-brand">
          <a href="#hero" className="nav-brand" onClick={() => setDrawerOpen(false)} aria-label="Nexprobyte Technologies">
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
          </a>
          <button
            className="mobile-drawer-close"
            onClick={() => setDrawerOpen(false)}
            aria-label="Close menu"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <ul className="mobile-nav-list">
          <li><a href="#services" className="mobile-nav-link" onClick={() => setDrawerOpen(false)}>Services <span>&rarr;</span></a></li>
          <li><a href="#platform" className="mobile-nav-link" onClick={() => setDrawerOpen(false)}>Platform <span>&rarr;</span></a></li>
          <li><a href="#ai-copilot" className="mobile-nav-link" onClick={() => setDrawerOpen(false)}>AI Copilot <span>&rarr;</span></a></li>
          <li><a href="#tour" className="mobile-nav-link" onClick={() => setDrawerOpen(false)}>Tour <span>&rarr;</span></a></li>
          <li><a href="#pricing" className="mobile-nav-link" onClick={() => setDrawerOpen(false)}>Pricing <span>&rarr;</span></a></li>
          <li><a href="#testimonials" className="mobile-nav-link" onClick={() => setDrawerOpen(false)}>Testimonials <span>&rarr;</span></a></li>
          <li><a href="#faq" className="mobile-nav-link" onClick={() => setDrawerOpen(false)}>FAQ <span>&rarr;</span></a></li>
          <li><a href="#contact" className="mobile-nav-link" onClick={() => setDrawerOpen(false)}>Contact Us <span>&rarr;</span></a></li>
        </ul>

        <div>
          <a
            href="#contact"
            className="btn-primary-hero"
            style={{ width: '100%', justifyContent: 'center' }}
            onClick={() => setDrawerOpen(false)}
          >
            Deploy Dedicated Team
          </a>
        </div>
      </div>
    </>
  );
}
