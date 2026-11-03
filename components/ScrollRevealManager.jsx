'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function ScrollRevealManager() {
  const pathname = usePathname();

  useEffect(() => {
    // 1. Reveal Animations Observer
    const reveals = document.querySelectorAll(
      '.reveal, .reveal-up, .reveal-scale, .reveal-fade'
    );

    if (reveals.length > 0) {
      if (!('IntersectionObserver' in window)) {
        reveals.forEach((el) => el.classList.add('is-revealed'));
      } else {
        const observer = new IntersectionObserver(
          (entries, obs) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                entry.target.classList.add('is-revealed');
                obs.unobserve(entry.target);
              }
            });
          },
          { threshold: 0.05, rootMargin: '0px 0px -20px 0px' }
        );

        reveals.forEach((el) => {
          const rect = el.getBoundingClientRect();
          // Reveal immediately if already in viewport
          if (rect.top < window.innerHeight * 0.95 && rect.bottom > 0) {
            el.classList.add('is-revealed');
          } else {
            observer.observe(el);
          }
        });

        // Safety fallback: ensure any element not yet revealed after 1.2s gets revealed
        const timer = setTimeout(() => {
          reveals.forEach((el) => el.classList.add('is-revealed'));
        }, 1200);

        return () => {
          observer.disconnect();
          clearTimeout(timer);
        };
      }
    }
  }, [pathname]);

  useEffect(() => {
    // 2. Spotlight Card Cursor Glow Tracker
    const cards = document.querySelectorAll(
      '.spotlight-card, .platform-card, .service-card, .pricing-card, .feature-folder-card'
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

    return () => {
      cards.forEach((card) => {
        card.removeEventListener('mousemove', handleMouseMove);
      });
    };
  }, [pathname]);

  return null;
}

