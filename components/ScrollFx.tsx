'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Ports the original site's two purely-cosmetic vanilla-JS effects:
 *  1. Reveal-on-scroll: elements with class "reveal" get class "in" added
 *     once they scroll into view (IntersectionObserver).
 *  2. Counter animation: numeric stat values count up from 0 once visible.
 *
 * Both only ever ADD a class or change textContent on elements React does
 * not otherwise control the state of, so running them imperatively here is
 * safe and avoids rewriting ~50 markup blocks into a wrapper component.
 * Re-runs on every route change so newly-mounted page content is picked up.
 */
export default function ScrollFx() {
  const pathname = usePathname();

  useEffect(() => {
    const revealEls = Array.from(document.querySelectorAll<HTMLElement>('.reveal:not(.in)'));
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    revealEls.forEach((el) => revealObserver.observe(el));

    const counterEls = Array.from(
      document.querySelectorAll<HTMLElement>('.stat .num, .astat b')
    ).filter((el) => !el.dataset.counted);

    const counterObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLElement;
          const raw = el.textContent?.trim() ?? '';
          const match = raw.match(/[\d.]+/);
          if (!match) return;
          const target = parseFloat(match[0]);
          const suffix = raw.replace(match[0], '');
          const decimals = match[0].includes('.') ? 1 : 0;
          let start: number | null = null;
          const dur = 1200;
          el.dataset.counted = 'true';
          function step(ts: number) {
            if (start === null) start = ts;
            const p = Math.min((ts - start) / dur, 1);
            const val = target * p;
            el.textContent = (decimals ? val.toFixed(1) : Math.round(val).toString()) + suffix;
            if (p < 1) requestAnimationFrame(step);
          }
          requestAnimationFrame(step);
          counterObserver.unobserve(el);
        });
      },
      { threshold: 0.4 }
    );
    counterEls.forEach((el) => counterObserver.observe(el));

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.documentElement.classList.add('reduce-motion');
      revealEls.forEach((el) => el.classList.add('in'));
    }

    return () => {
      revealObserver.disconnect();
      counterObserver.disconnect();
    };
  }, [pathname]);

  return null;
}
