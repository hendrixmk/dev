/**
 * nav.js
 * Handles:
 *  - Scroll-based nav class toggling
 *  - Mobile hamburger menu open/close
 *  - Active link tracking via IntersectionObserver (scroll-spy)
 */

(function () {
  'use strict';

  const nav       = document.getElementById('nav');
  const menuBtn   = document.getElementById('menuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  const navLinks  = document.querySelectorAll('.nav__link');
  const sections  = document.querySelectorAll('main [id]');

  // ── Scroll class ────────────────────────────────────────────
  function onScroll() {
    const scrolled = window.scrollY > 12;
    nav.classList.toggle('scrolled', scrolled);
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // init

  // ── Mobile menu ─────────────────────────────────────────────
  function toggleMenu() {
    const open = menuBtn.getAttribute('aria-expanded') === 'true';
    menuBtn.setAttribute('aria-expanded', String(!open));
    mobileMenu.setAttribute('aria-hidden', String(open));
    mobileMenu.classList.toggle('open', !open);
  }

  menuBtn && menuBtn.addEventListener('click', toggleMenu);

  // Close mobile menu on link click
  mobileMenu && mobileMenu.querySelectorAll('.nav__mobile-link').forEach(link => {
    link.addEventListener('click', () => {
      menuBtn.setAttribute('aria-expanded', 'false');
      mobileMenu.setAttribute('aria-hidden', 'true');
      mobileMenu.classList.remove('open');
    });
  });

  // ── Scroll-spy ──────────────────────────────────────────────
  if (!sections.length || !navLinks.length) return;

  const OFFSET = 80; // px from top to consider section "active"

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const id = entry.target.id;
        navLinks.forEach(link => {
          const href = link.getAttribute('href');
          link.classList.toggle('active', href === `#${id}`);
        });
      });
    },
    {
      rootMargin: `-${OFFSET}px 0px -60% 0px`,
      threshold: 0,
    }
  );

  sections.forEach(s => observer.observe(s));

})();
