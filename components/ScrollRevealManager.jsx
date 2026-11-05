'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function ScrollRevealManager() {
  const pathname = usePathname();

  useEffect(() => {
    // -------------------------------------------------------------
    // HIGH-PERFORMANCE, ZERO-LAYOUT-THRASH SCROLL REVEAL OBSERVER
    // -------------------------------------------------------------
    let observer = null;
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

    // Initialize IntersectionObserver with forgiving margins to reveal off-thread
    if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting || entry.intersectionRatio > 0) {
              revealElement(entry.target);
            }
          });
        },
        { threshold: 0.01, rootMargin: '60px 0px 60px 0px' }
      );
    }

    function scanAndObserve() {
      const reveals = document.querySelectorAll(
        '.reveal:not(.is-revealed), .reveal-up:not(.is-revealed), .reveal-scale:not(.is-revealed), .reveal-fade:not(.is-revealed)'
      );

      if (reveals.length === 0) return;

      reveals.forEach((el) => {
        if (observer) {
          observer.observe(el);
        } else {
          revealElement(el);
        }
      });
    }

    // Staged passive observations after DOM is ready
    scanAndObserve();
    const t0 = requestAnimationFrame(scanAndObserve);
    const t1 = setTimeout(scanAndObserve, 80);
    const t2 = setTimeout(scanAndObserve, 250);

    // Failsafe: reveal any remaining visible elements after initial render
    const safetyTimer = setTimeout(() => {
      const remaining = document.querySelectorAll(
        '.reveal:not(.is-revealed), .reveal-up:not(.is-revealed), .reveal-scale:not(.is-revealed), .reveal-fade:not(.is-revealed)'
      );
      remaining.forEach(revealElement);
    }, 450);

    scheduledTimers = [t1, t2, safetyTimer];

    // Throttled resize observer
    let resizeTimer = null;
    const handleResize = () => {
      if (resizeTimer) return;
      resizeTimer = setTimeout(() => {
        resizeTimer = null;
        scanAndObserve();
      }, 150);
    };
    window.addEventListener('resize', handleResize, { passive: true });

    // -------------------------------------------------------------
    // OPTIMIZED SPOTLIGHT CARD CURSOR GLOW TRACKER
    // -------------------------------------------------------------
    const cards = document.querySelectorAll(
      '.spotlight-card, .platform-card, .service-card, .pricing-card, .feature-folder-card, .service-catalog-card, .about-stat-card, .value-card, .career-job-card, .post-card-full'
    );

    const cardCleanups = [];
    cards.forEach((card) => {
      let isHovered = false;
      let rafId = null;

      const onMouseEnter = () => {
        isHovered = true;
      };

      const onMouseLeave = () => {
        isHovered = false;
        if (rafId) {
          cancelAnimationFrame(rafId);
          rafId = null;
        }
      };

      const onMouseMove = (e) => {
        if (!isHovered || rafId) return;
        const clientX = e.clientX;
        const clientY = e.clientY;

        rafId = requestAnimationFrame(() => {
          rafId = null;
          if (!isHovered || !card) return;
          const rect = card.getBoundingClientRect();
          card.style.setProperty('--mouse-x', `${clientX - rect.left}px`);
          card.style.setProperty('--mouse-y', `${clientY - rect.top}px`);
        });
      };

      card.addEventListener('mouseenter', onMouseEnter, { passive: true });
      card.addEventListener('mouseleave', onMouseLeave, { passive: true });
      card.addEventListener('mousemove', onMouseMove, { passive: true });

      cardCleanups.push(() => {
        card.removeEventListener('mouseenter', onMouseEnter);
        card.removeEventListener('mouseleave', onMouseLeave);
        card.removeEventListener('mousemove', onMouseMove);
        if (rafId) cancelAnimationFrame(rafId);
      });
    });

    return () => {
      cancelAnimationFrame(t0);
      scheduledTimers.forEach(clearTimeout);
      if (observer) observer.disconnect();
      window.removeEventListener('resize', handleResize);
      cardCleanups.forEach((cleanup) => cleanup());
    };
  }, [pathname]);

  return null;
}
