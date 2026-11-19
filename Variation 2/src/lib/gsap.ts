import { useEffect, type RefObject } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger };

/**
 * Animates elements matching `[data-gsap="reveal"]`, `[data-gsap="bento"]`,
 * and `[data-gsap="hero"]` inside a container ref using GSAP & ScrollTrigger.
 * Automatically respects `prefers-reduced-motion`.
 */
export function useSwissAnimations(
  containerRef: RefObject<HTMLElement | null>,
  deps: unknown[] = []
) {
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      // Hero instant stagger entrance
      const heroItems = el.querySelectorAll('[data-gsap="hero"]');
      if (heroItems.length > 0) {
        gsap.fromTo(
          heroItems,
          { y: 24, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.75,
            stagger: 0.08,
            ease: 'power3.out',
            clearProps: 'transform',
          }
        );
      }

      // Section headers scroll reveal
      const reveals = el.querySelectorAll('[data-gsap="reveal"]');
      reveals.forEach((node) => {
        gsap.fromTo(
          node,
          { y: 28, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: 'power3.out',
            clearProps: 'transform',
            scrollTrigger: {
              trigger: node,
              start: 'top 88%',
              toggleActions: 'play none none none',
            },
          }
        );
      });

      // Bento grids batch reveal
      const grids = el.querySelectorAll('[data-gsap-grid]');
      grids.forEach((grid) => {
        const cards = grid.querySelectorAll('[data-gsap="bento"]');
        if (cards.length > 0) {
          gsap.fromTo(
            cards,
            { y: 30, opacity: 0, scale: 0.985 },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 0.65,
              stagger: 0.06,
              ease: 'power3.out',
              clearProps: 'transform',
              scrollTrigger: {
                trigger: grid,
                start: 'top 86%',
                toggleActions: 'play none none none',
              },
            }
          );
        }
      });
    }, el);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
