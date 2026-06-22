/**
 * main.js
 * Entry point — orchestrates the terminal boot sequence in the hero,
 * wires up all page-level interactions.
 *
 * Sequence:
 *   1. whoami  → type "Hendrix Marak"
 *   2. role    → type role string
 *   3. sys     → type uname string
 */

(function () {
  'use strict';

  // ── DOM refs ─────────────────────────────────────────────────
  const nameEl = document.getElementById('heroNameText');
  const roleEl = document.getElementById('heroRole');
  const sysEl  = document.getElementById('heroSys');
  const nameCursor = document.querySelector('.hero__name-cursor');

  // ── Terminal lines ───────────────────────────────────────────
  const LINES = {
    name: 'Hendrix Marak',
    role: 'Systems Programmer · C / C++ / JS · Low-level engineering',
    sys:  'Linux arch 6.9.3-arch1-1 x86_64 GNU/Linux — KDE Plasma',
  };

  // ── Boot sequence ────────────────────────────────────────────
  function bootTerminal() {
    if (!nameEl || !roleEl || !sysEl) return;

    // Show cursor immediately
    HeroCursor.init('.hero__name-cursor').show();

    // Step 1 — type name
    const nameTW = new Typewriter(nameEl, { speed: 70, jitter: 40, delay: 320 });
    nameTW.type(LINES.name, () => {
      // Cursor stays blinking in name while role types
      typeRole();
    });
  }

  function typeRole() {
    const roleTW = new Typewriter(roleEl, { speed: 22, jitter: 10, delay: 280 });
    roleTW.type(LINES.role, () => {
      typeSys();
    });
  }

  function typeSys() {
    const sysTW = new Typewriter(sysEl, { speed: 18, jitter: 8, delay: 200 });
    sysTW.type(LINES.sys);
  }

  // ── Smooth scroll anchors ─────────────────────────────────────
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', e => {
        const target = document.querySelector(anchor.getAttribute('href'));
        if (!target) return;
        e.preventDefault();
        const navH = parseInt(getComputedStyle(document.documentElement)
          .getPropertyValue('--nav-h'), 10) || 56;
        const top = target.getBoundingClientRect().top + window.scrollY - navH;
        window.scrollTo({ top, behavior: 'smooth' });
      });
    });
  }

  // ── Init ─────────────────────────────────────────────────────
  function init() {
    bootTerminal();
    initSmoothScroll();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
