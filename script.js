/**
 * script.js — Pointer-events safety layer only.
 *
 * All button logic, portal jump, passport, Three.js initialization, and
 * TemporalEngine are handled by the inline script in index.html exactly as
 * they were in the original pre-mini-game version.
 *
 * This file only applies pointer-events:none to decorative overlay elements
 * that were previously blocking button clicks (the spinning portal ring divs).
 */
document.addEventListener('DOMContentLoaded', () => {
  // Decorative layers must not intercept clicks
  [
    '.portal-effect', '.particles', '.background-animation',
    '.glow-layer', '.decorative-overlay'
  ].forEach(sel => {
    document.querySelectorAll(sel).forEach(el => {
      el.style.pointerEvents = 'none';
    });
  });

  // Safety: ensure all portal ring / decorative spin divs inside
  // the hero section cannot block button clicks
  const heroSection = document.querySelector('section');
  if (heroSection) {
    heroSection.querySelectorAll('div[class*="animate-spin"], div[class*="animate-ping"], div[class*="animate-pulse"]').forEach(el => {
      // Only apply to purely decorative elements (no text content, no onclick)
      if (!el.onclick && el.children.length === 0 && !el.textContent.trim()) {
        el.style.pointerEvents = 'none';
      }
    });
  }
});
