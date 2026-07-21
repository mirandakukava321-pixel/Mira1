/**
 * script.js — Chronicle: Temporal Navigation Engine
 *
 * WHAT THIS FILE DOES:
 *   All button onclick handlers are defined inline in index.html and work
 *   via direct function calls (triggerDefaultWarp, openTimeExplorerModal,
 *   toggleTimePassport, etc.). This file does NOT duplicate those handlers.
 *
 *   This file only handles two things that were genuinely missing:
 *     1. Booting Three.js particle system (initThreeJS) when the Chronicle
 *        main view becomes visible — this was never called, causing black screen
 *     2. Instantiating TemporalEngine (window.chronicle) — also never called,
 *        causing dead era columns
 *
 *   It also applies pointer-events safety to decorative layers.
 */

document.addEventListener('DOMContentLoaded', () => {

  /* ─── Pointer-events: decorative layers must not block clicks ── */
  const decorativeSelectors = [
    '.portal-effect', '.particles', '.background-animation',
    '.glow-layer', '.decorative-overlay'
  ];
  decorativeSelectors.forEach(sel => {
    document.querySelectorAll(sel).forEach(el => {
      el.style.pointerEvents = 'none';
    });
  });

  /* ─── Back-to-Home button (added to main-container header) ───── */
  const backBtn = document.getElementById('back-to-home-btn');
  if (backBtn) {
    backBtn.addEventListener('click', (e) => {
      e.preventDefault();
      try {
        if (typeof showHomepage === 'function') showHomepage(e);
      } catch (err) {
        const hp = document.getElementById('homepage-container');
        const mc = document.getElementById('main-container');
        if (hp) { hp.classList.remove('hidden'); hp.scrollTop = 0; }
        if (mc) mc.classList.add('hidden');
      }
    });
  }

  console.log('[script.js] Ready — inline onclick handlers drive all navigation');
});

/* ═══════════════════════════════════════════════════════════════
 *  Called by triggerDefaultWarp() → initiatePortalJump() callback.
 *  Boots the Three.js scene and TemporalEngine the first time the
 *  Chronicle main view becomes visible.
 * ═══════════════════════════════════════════════════════════════ */
let _threeJSBooted   = false;
let _engineBooted    = false;

window.bootChronicleView = function () {
  _bootThreeJS();
  _bootTemporalEngine();
};

function _bootThreeJS() {
  if (_threeJSBooted) {
    window.dispatchEvent(new Event('resize'));
    return;
  }
  try {
    if (typeof initThreeJS === 'function') {
      initThreeJS();
      _threeJSBooted = true;
      console.log('[script.js] ✓ Three.js particle system started');
    }
  } catch (err) {
    console.warn('[script.js] initThreeJS() threw (applying CSS fallback):', err);
    _applyFallbackBackground();
  }
}

function _bootTemporalEngine() {
  if (_engineBooted) return;
  try {
    if (typeof TemporalEngine === 'function' && !window.chronicle) {
      window.chronicle = new TemporalEngine();
      _engineBooted = true;
      console.log('[script.js] ✓ TemporalEngine instantiated');
    } else if (window.chronicle) {
      _engineBooted = true;
    }
  } catch (err) {
    console.warn('[script.js] TemporalEngine() threw:', err);
  }
}

function _applyFallbackBackground() {
  const c = document.getElementById('threejs-container-ANIMATION_50');
  if (c) c.style.background = 'radial-gradient(ellipse at center,#0a1628 0%,#090b0e 60%,#000 100%)';
}
