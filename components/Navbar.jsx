'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [hoveredNav, setHoveredNav] = useState(null);
  const [whatWeDoOpen, setWhatWeDoOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 25);

      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? Math.min(Math.max(scrollY / docHeight, 0), 1) : 0;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent background scroll when mobile drawer is open
  useEffect(() => {
    if (drawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [drawerOpen]);

  const whatWeDoLinks = [
    {
      title: 'Website Development',
      desc: 'High-conversion marketing & e-commerce websites',
      href: '/services/website-development',
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <line x1="2" y1="12" x2="22" y2="12" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
      )
    },
    {
      title: 'Mobile App Development',
      desc: 'Cross-platform iOS & Android apps with React Native & Flutter',
      href: '/services/mobile-app-development',
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
          <line x1="12" y1="18" x2="12.01" y2="18" />
        </svg>
      )
    },
    {
      title: 'Application Development',
      desc: 'Scalable SaaS platforms, APIs & custom cloud systems',
      href: '/services/application-development',
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
        </svg>
      )
    },
    {
      title: 'UI/UX Design',
      desc: 'Design systems, Figma prototypes & conversion-focused interfaces',
      href: '/services/ui-ux-design',
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      )
    },
    {
      title: 'Digital Marketing & SEO',
      desc: 'Rank on Google, build authority & scale customer acquisition',
      href: '/services/digital-marketing',
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M23 6l-9.5 9.5-5-5L1 18" />
          <polyline points="17 6 23 6 23 12" />
        </svg>
      )
    },
    {
      title: 'Dedicated Engineering & AI',
      desc: 'Senior developers, AI agents & n8n workflow automation',
      href: '/services#service-dev',
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polygon points="12 2 2 7 12 12 22 7 12 2" />
          <polyline points="2 17 12 22 22 17" />
          <polyline points="2 12 12 17 22 12" />
        </svg>
      )
    }
  ];

  const resourcesLinks = [
    {
      title: 'Insights & Journal',
      desc: 'Engineering articles, SEO playbooks & technical case studies',
      href: '/blog',
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
          <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
        </svg>
      )
    },
    {
      title: 'Careers & Open Roles',
      desc: 'Join our Coimbatore engineering & design studio',
      href: '/careers',
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
        </svg>
      )
    },
    {
      title: 'Candidate Onboarding Portal',
      desc: 'Skill assessments, interview profiles & candidate pipeline',
      href: '/interview-data',
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <polyline points="16 11 18 13 22 9" />
        </svg>
      )
    }
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
      <motion.header
        className={`nav-wrapper ${isScrolled ? 'scrolled' : ''}`}
        initial={{ y: -45, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <nav
          className={`nav-dock ${isScrolled ? 'scrolled' : ''}`}
          id="main-nav"
        >
          {/* 1. Brand: Logo & Company Name */}
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
            <span className="brand-title">NEXPROBYTE</span>
          </Link>

          {/* 2. Middle Navigation Links (Collapsed when scrolled) */}
          <div className="nav-links-container">
            <ul className="nav-links" onMouseLeave={() => setHoveredNav(null)}>
              {/* Home */}
              <li className="nav-item">
                <Link
                  href="/"
                  className="nav-link"
                  onMouseEnter={() => setHoveredNav('home')}
                >
                  <span>Home</span>
                  {hoveredNav === 'home' && (
                    <motion.span
                      layoutId="navbar-hover-indicator"
                      className="nav-hover-pill"
                      transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                    />
                  )}
                </Link>
              </li>

              {/* About */}
              <li className="nav-item">
                <Link
                  href="/about"
                  className="nav-link"
                  onMouseEnter={() => setHoveredNav('about')}
                >
                  <span>About</span>
                  {hoveredNav === 'about' && (
                    <motion.span
                      layoutId="navbar-hover-indicator"
                      className="nav-hover-pill"
                      transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                    />
                  )}
                </Link>
              </li>

              {/* What We Do Dropdown */}
              <li
                className="nav-item"
                onMouseEnter={() => {
                  setWhatWeDoOpen(true);
                  setResourcesOpen(false);
                  setHoveredNav('what-we-do');
                }}
                onMouseLeave={() => setWhatWeDoOpen(false)}
              >
                <Link
                  href="/services"
                  className="nav-link"
                  onClick={(e) => {
                    if (typeof window !== 'undefined' && window.location.pathname === '/') {
                      setWhatWeDoOpen(!whatWeDoOpen);
                    }
                  }}
                >
                  <span>What We Do</span>
                  <svg
                    width="11"
                    height="11"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.4"
                    style={{
                      transform: whatWeDoOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.2s ease',
                      marginLeft: 3
                    }}
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                  {hoveredNav === 'what-we-do' && (
                    <motion.span
                      layoutId="navbar-hover-indicator"
                      className="nav-hover-pill"
                      transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                    />
                  )}
                </Link>

                <AnimatePresence>
                  {whatWeDoOpen && (
                    <motion.div
                      className="nav-dropdown"
                      initial={{ opacity: 0, y: 10, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 6, scale: 0.97 }}
                      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <div className="dropdown-grid">
                        {whatWeDoLinks.map((item, idx) => (
                          <Link
                            key={idx}
                            href={item.href}
                            className="dropdown-item"
                            onClick={() => setWhatWeDoOpen(false)}
                          >
                            <div className="dropdown-icon">{item.icon}</div>
                            <div>
                              <div className="dropdown-title">{item.title}</div>
                              <div className="dropdown-desc">{item.desc}</div>
                            </div>
                          </Link>
                        ))}
                      </div>
                      <div className="dropdown-footer">
                        <Link
                          href="/services"
                          className="dropdown-footer-link"
                          onClick={() => setWhatWeDoOpen(false)}
                        >
                          <span>Explore Full 52-Service Catalog &rarr;</span>
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>

              {/* Resources Dropdown */}
              <li
                className="nav-item"
                onMouseEnter={() => {
                  setResourcesOpen(true);
                  setWhatWeDoOpen(false);
                  setHoveredNav('resources');
                }}
                onMouseLeave={() => setResourcesOpen(false)}
              >
                <Link
                  href="/blog"
                  className="nav-link"
                  onClick={(e) => {
                    if (typeof window !== 'undefined' && window.location.pathname === '/') {
                      setResourcesOpen(!resourcesOpen);
                    }
                  }}
                >
                  <span>Resources</span>
                  <svg
                    width="11"
                    height="11"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.4"
                    style={{
                      transform: resourcesOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.2s ease',
                      marginLeft: 3
                    }}
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                  {hoveredNav === 'resources' && (
                    <motion.span
                      layoutId="navbar-hover-indicator"
                      className="nav-hover-pill"
                      transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                    />
                  )}
                </Link>

                <AnimatePresence>
                  {resourcesOpen && (
                    <motion.div
                      className="nav-dropdown"
                      initial={{ opacity: 0, y: 10, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 6, scale: 0.97 }}
                      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <div className="dropdown-grid">
                        {resourcesLinks.map((item, idx) => (
                          <Link
                            key={idx}
                            href={item.href}
                            className="dropdown-item"
                            onClick={() => setResourcesOpen(false)}
                          >
                            <div className="dropdown-icon">{item.icon}</div>
                            <div>
                              <div className="dropdown-title">{item.title}</div>
                              <div className="dropdown-desc">{item.desc}</div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>

              {/* Contact */}
              <li className="nav-item">
                <Link
                  href="/contact"
                  className="nav-link"
                  onMouseEnter={() => setHoveredNav('contact')}
                >
                  <span>Contact</span>
                  {hoveredNav === 'contact' && (
                    <motion.span
                      layoutId="navbar-hover-indicator"
                      className="nav-hover-pill"
                      transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                    />
                  )}
                </Link>
              </li>
            </ul>
          </div>

          {/* 3. Right Action Area */}
          <div className="nav-actions">
            {/* Direct Contact Bar (Hidden when scrolled) */}
            <div className="nav-contact-bar">
              <a
                href="mailto:info@nexprobyte.com"
                className="nav-contact-link"
                title="Send official inquiry email"
              >
                info@nexprobyte.com
              </a>
              <span className="nav-contact-sep">|</span>
              <a
                href="tel:+919500042426"
                className="nav-contact-link"
                title="Direct telephone to Coimbatore studio"
              >
                +91 95000 42426
              </a>
            </div>

            {/* Always visible Primary CTA: Get a Quote */}
            <Link href="/contact" className="nav-cta-btn">
              <span className="cta-shimmer-sweep" />
              <span>Get a Quote</span>
              <svg className="cta-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>

            {/* Mobile Hamburger (Only on mobile) */}
            <button
              type="button"
              className={`nav-hamburger ${drawerOpen ? 'open' : ''}`}
              id="nav-toggle"
              aria-label="Toggle navigation menu"
              aria-expanded={drawerOpen}
              onClick={() => setDrawerOpen(!drawerOpen)}
            >
              <span className="ham-line ham-top" />
              <span className="ham-line ham-bottom" />
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Luxurious Frosted Mobile Navigation Drawer */}
      <AnimatePresence>
        {drawerOpen && (
          <>
            <motion.div
              className="drawer-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setDrawerOpen(false)}
            />
            <motion.div
              className="mobile-drawer saro-mobile-drawer open"
              id="mobile-drawer"
              initial={{ opacity: 0, y: -20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -15, scale: 0.98 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="mobile-drawer-header">
                <Link href="/" className="mobile-drawer-brand" onClick={() => setDrawerOpen(false)}>
                  <div className="brand-icon">
                    <img src="/assets/logo-transparent.png" alt="Nexprobyte Logo" className="brand-logo-img" width={28} height={18} />
                  </div>
                  <div>
                    <div className="drawer-brand-name">NEXPROBYTE</div>
                    <div className="drawer-brand-sub">Coimbatore • Global Delivery</div>
                  </div>
                </Link>
                <button
                  type="button"
                  className="mobile-drawer-close"
                  onClick={() => setDrawerOpen(false)}
                  aria-label="Close menu"
                >
                  ✕
                </button>
              </div>

              <div className="mobile-drawer-contact-strip">
                <a href="mailto:info@nexprobyte.com">✉ info@nexprobyte.com</a>
                <a href="tel:+919500042426">📞 +91 95000 42426</a>
              </div>

              <ul className="drawer-links-list">
                <li>
                  <Link href="/" className="drawer-link-item" onClick={() => setDrawerOpen(false)}>
                    <span>Home</span>
                    <span className="drawer-link-num">01</span>
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="drawer-link-item" onClick={() => setDrawerOpen(false)}>
                    <span>About Studio</span>
                    <span className="drawer-link-num">02</span>
                  </Link>
                </li>
                <li>
                  <Link href="/services" className="drawer-link-item" onClick={() => setDrawerOpen(false)}>
                    <span>What We Do (Services)</span>
                    <span className="drawer-link-num">03</span>
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="drawer-link-item" onClick={() => setDrawerOpen(false)}>
                    <span>Resources &amp; Journal</span>
                    <span className="drawer-link-num">04</span>
                  </Link>
                </li>
                <li>
                  <Link href="/careers" className="drawer-link-item" onClick={() => setDrawerOpen(false)}>
                    <span>Careers</span>
                    <span className="drawer-link-num">05</span>
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="drawer-link-item" onClick={() => setDrawerOpen(false)}>
                    <span>Contact</span>
                    <span className="drawer-link-num">06</span>
                  </Link>
                </li>
              </ul>

              <div className="drawer-cta-wrap">
                <Link
                  href="/contact"
                  className="btn-primary-hero"
                  style={{ width: '100%', justifyContent: 'center' }}
                  onClick={() => setDrawerOpen(false)}
                >
                  Get a Quote &rarr;
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
