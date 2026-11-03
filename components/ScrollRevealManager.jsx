'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function ScrollRevealManager() {
  const pathname = usePathname();

  useEffect(() => {
    // -------------------------------------------------------------
    // 1. ROBUST, ROUTE-AWARE SCROLL REVEAL OBSERVER
    // -------------------------------------------------------------
    let observer = null;
    let mutationObserver = null;
    let safetyTimer = null;
    let scheduledTimers = [];

    function revealElement(el) {
      if (!el || el.classList.contains('is-revealed')) return;
      el.classList.add('is-revealed');
      if (observer) {
        try {
          observer.unobserve(el);
        } catch (_) {}
      }
    }

    function scanAndReveal() {
      const reveals = document.querySelectorAll(
        '.reveal, .reveal-up, .reveal-scale, .reveal-fade'
      );

      if (reveals.length === 0) return;

      const viewportHeight = window.innerHeight || document.documentElement.clientHeight || 800;

      reveals.forEach((el) => {
        if (el.classList.contains('is-revealed')) return;

        const rect = el.getBoundingClientRect();
        // If element is in viewport or very close to it, reveal immediately
        if (rect.top <= viewportHeight * 0.95 && rect.bottom >= -50) {
          revealElement(el);
        } else if (observer) {
          observer.observe(el);
        } else {
          // If no IntersectionObserver, reveal immediately
          revealElement(el);
        }
      });
    }

    // Initialize IntersectionObserver with forgiving margins
    if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting || entry.intersectionRatio > 0) {
              revealElement(entry.target);
            }
          });
        },
        { threshold: 0.01, rootMargin: '40px 0px 40px 0px' }
      );
    }

    // Initialize MutationObserver to catch any asynchronously mounted components on route transitions
    if (typeof window !== 'undefined' && 'MutationObserver' in window) {
      mutationObserver = new MutationObserver(() => {
        scanAndReveal();
      });
      mutationObserver.observe(document.body, {
        childList: true,
        subtree: true,
      });
    }

    // Staged scans to eliminate any blank-screen delays during React 19 hydration & navigation transitions
    scanAndReveal();
    const t0 = requestAnimationFrame(scanAndReveal);
    const t1 = setTimeout(scanAndReveal, 60);
    const t2 = setTimeout(scanAndReveal, 160);
    const t3 = setTimeout(scanAndReveal, 320);

    // Absolute failsafe: after 450ms, guarantee all elements on screen are revealed
    // so user NEVER sees stuck opacity: 0 content under any circumstances
    safetyTimer = setTimeout(() => {
      const remaining = document.querySelectorAll(
        '.reveal:not(.is-revealed), .reveal-up:not(.is-revealed), .reveal-scale:not(.is-revealed), .reveal-fade:not(.is-revealed)'
      );
      remaining.forEach(revealElement);
    }, 450);

    scheduledTimers = [t1, t2, t3];

    // Scroll and resize listeners as secondary triggers
    const handleScrollOrResize = () => {
      scanAndReveal();
    };
    window.addEventListener('scroll', handleScrollOrResize, { passive: true });
    window.addEventListener('resize', handleScrollOrResize, { passive: true });

    // -------------------------------------------------------------
    // 2. SPOTLIGHT CARD CURSOR GLOW TRACKER (Unified for All Pages)
    // -------------------------------------------------------------
    const cards = document.querySelectorAll(
      '.spotlight-card, .platform-card, .service-card, .pricing-card, .feature-folder-card, .service-catalog-card, .about-stat-card, .value-card, .career-job-card, .post-card-full'
    );

    let rafId = null;
    const handleMouseMove = (e) => {
      if (rafId) return;
      const card = e.currentTarget;
      rafId = requestAnimationFrame(() => {
        const rect = card.getBoundingClientRect();
        card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
        card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
        rafId = null;
      });
    };

    cards.forEach((card) => {
      card.addEventListener('mousemove', handleMouseMove, { passive: true });
    });

    // Cleanup on route change or unmount
    return () => {
      cancelAnimationFrame(t0);
      scheduledTimers.forEach(clearTimeout);
      if (safetyTimer) clearTimeout(safetyTimer);
      if (observer) observer.disconnect();
      if (mutationObserver) mutationObserver.disconnect();
      window.removeEventListener('scroll', handleScrollOrResize);
      window.removeEventListener('resize', handleScrollOrResize);
      cards.forEach((card) => {
        card.removeEventListener('mousemove', handleMouseMove);
      });
    };
  }, [pathname]);

  return null;
}
