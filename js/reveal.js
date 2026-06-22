/**
 * reveal.js
 * Scroll-triggered reveal animation using IntersectionObserver.
 * Adds `.revealed` to elements marked with [data-reveal].
 */

(function () {
  'use strict';

  const THRESHOLD = 0.12;
  const ROOT_MARGIN = '0px 0px -48px 0px';

  // Respect reduced motion
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) {
    document.querySelectorAll('[data-reveal]').forEach(el => el.classList.add('revealed'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target); // fire once only
        }
      });
    },
    { threshold: THRESHOLD, rootMargin: ROOT_MARGIN }
  );

  document.querySelectorAll('[data-reveal]').forEach(el => observer.observe(el));

})();
