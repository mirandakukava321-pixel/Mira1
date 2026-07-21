/**
 * script.js — Chronicle: Temporal Navigation Engine
 * Bulletproof button wiring + canvas/scene initialization on portal jump.
 *
 * Critical fixes in this version:
 *  1. initThreeJS() called when main-container becomes visible (was NEVER called)
 *  2. window.chronicle (TemporalEngine) instantiated on first portal jump
 *  3. initPortalCanvas() called to wire portal-warp-modal canvas
 *  4. startPortalWarpAnimation() called directly for the warp effect
 *  5. Proper view swap: homepage hidden, main-container shown
 *  6. Back-to-Home button wired
 */

document.addEventListener('DOMContentLoaded', () => {

  /* ─────────────────────────────────────────────────────────────
   *  1. INITIATE PORTAL JUMP — hero + nav buttons
   *  This is the main fix: ensures Three.js and TemporalEngine start
   * ───────────────────────────────────────────────────────────── */
  const allPortalBtns = document.querySelectorAll(
    '#initiate-portal-jump-btn, #navWarpButton, [data-action="portal"]'
  );

  allPortalBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      console.log('[script.js] Portal Jump clicked — starting warp sequence');
      _launchPortalJump();
    });
  });
  console.log('[script.js] ✓ Portal buttons wired:', allPortalBtns.length);

  /* ─────────────────────────────────────────────────────────────
   *  2. PLAY MINI GAME — hero button
   * ───────────────────────────────────────────────────────────── */
  const playBtn   = document.getElementById('hero-play-minigame-btn');
  const gameOverlay = document.getElementById('mini-game-overlay');

  if (playBtn && gameOverlay) {
    playBtn.addEventListener('click', (e) => {
      e.preventDefault();
      console.log('[script.js] Play Mini Game clicked');
      gameOverlay.classList.remove('hidden');
      gameOverlay.style.display = 'flex';
      try {
        if (typeof openTimeExplorerModal === 'function') openTimeExplorerModal();
      } catch (err) {
        console.warn('[script.js] openTimeExplorerModal() threw:', err);
      }
    });
    console.log('[script.js] ✓ hero-play-minigame-btn wired');
  } else {
    console.error('[script.js] ✗ play-mini-game-btn or mini-game-overlay not found');
  }

  /* ─────────────────────────────────────────────────────────────
   *  3. PASSPORT — nav + section buttons
   * ───────────────────────────────────────────────────────────── */
  document.querySelectorAll(
    '#passport-btn, #main-passport-btn, [data-action="passport"]'
  ).forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      console.log('[script.js] Passport clicked');
      try {
        if (typeof toggleTimePassport === 'function') { toggleTimePassport(true); return; }
      } catch (err) {
        console.warn('[script.js] toggleTimePassport() threw:', err);
      }
      const pm = document.getElementById('passport-modal');
      if (pm) { pm.classList.add('open'); pm.classList.remove('hidden'); pm.style.display = 'flex'; }
    });
  });
  console.log('[script.js] ✓ Passport buttons wired:',
    document.querySelectorAll('#passport-btn, #main-passport-btn, [data-action="passport"]').length);

  /* ─────────────────────────────────────────────────────────────
   *  4. BACK TO HOME button
   * ───────────────────────────────────────────────────────────── */
  const backBtn = document.getElementById('back-to-home-btn');
  if (backBtn) {
    backBtn.addEventListener('click', (e) => {
      e.preventDefault();
      console.log('[script.js] Back to Home clicked');
      try {
        if (typeof showHomepage === 'function') { showHomepage(); return; }
      } catch (err) {
        console.warn('[script.js] showHomepage() threw:', err);
      }
      _showHomepage();
    });
  }

  /* ─────────────────────────────────────────────────────────────
   *  5. CLOSE BUTTONS
   * ───────────────────────────────────────────────────────────── */
  // Passport close
  document.querySelectorAll('[onclick*="toggleTimePassport(false)"]').forEach(btn => {
    btn.addEventListener('click', () => {
      try { toggleTimePassport(false); } catch (_) {}
      const pm = document.getElementById('passport-modal');
      if (pm) _closeModal(pm);
    });
  });
  // Mini-game close
  if (gameOverlay) {
    gameOverlay.addEventListener('click', (e) => {
      if (e.target === gameOverlay) _closeModal(gameOverlay);
    });
  }
  // Generic .close-btn
  document.querySelectorAll('.close-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const m = btn.closest('[id$="-modal"], [id$="-overlay"]');
      if (m) _closeModal(m);
    });
  });
  // Native <dialog> backdrop
  document.querySelectorAll('dialog').forEach(dlg => {
    dlg.addEventListener('click', (e) => {
      const r = dlg.getBoundingClientRect();
      if (!(r.top <= e.clientY && e.clientY <= r.bottom && r.left <= e.clientX && e.clientX <= r.right)) {
        dlg.close();
      }
    });
  });

  console.log('[script.js] ✓ All DOMContentLoaded handlers attached');
});

/* ═══════════════════════════════════════════════════════════════
 *  PORTAL JUMP — Full sequence with canvas/scene initialization
 * ═══════════════════════════════════════════════════════════════ */
function _launchPortalJump() {
  const portalModal = document.getElementById('portal-warp-modal');
  const homepage    = document.getElementById('homepage-container');
  const main        = document.getElementById('main-container');

  // --- Step 1: Show the portal warp overlay ---
  if (portalModal) {
    portalModal.classList.add('active');
    portalModal.style.opacity = '1';
    portalModal.style.visibility = 'visible';
    portalModal.style.pointerEvents = 'auto';
  }

  // --- Step 2: Try the inline portal animation engine ---
  let inlineWorked = false;
  try {
    if (typeof startPortalWarpAnimation === 'function') {
      startPortalWarpAnimation(() => {
        _revealMainView(portalModal, homepage, main);
      });
      inlineWorked = true;
    }
  } catch (err) {
    console.warn('[script.js] startPortalWarpAnimation() threw:', err);
  }

  // --- Step 3: Fallback — time-based transition if inline engine failed ---
  if (!inlineWorked) {
    setTimeout(() => {
      _revealMainView(portalModal, homepage, main);
    }, 1200);
  }

  // --- Step 4: Safety net — always reveal main after 2.5s max ---
  setTimeout(() => {
    if (main && main.classList.contains('hidden')) {
      console.warn('[script.js] Safety timeout: forcing main-container visible');
      _revealMainView(portalModal, homepage, main);
    }
  }, 2500);
}

/* ═══════════════════════════════════════════════════════════════
 *  REVEAL MAIN VIEW — hides homepage, shows Chronicle view,
 *  then BOOTS Three.js particle system + TemporalEngine
 * ═══════════════════════════════════════════════════════════════ */
function _revealMainView(portalModal, homepage, main) {
  // Hide portal overlay
  if (portalModal) {
    portalModal.classList.remove('active');
    portalModal.style.opacity   = '';
    portalModal.style.visibility = '';
    portalModal.style.pointerEvents = '';
  }

  // Swap views
  if (homepage) homepage.classList.add('hidden');
  if (main) {
    main.classList.remove('hidden');
    main.style.display = '';

    // Force a resize event so Three.js can measure the canvas correctly
    window.dispatchEvent(new Event('resize'));
  }

  // --- Boot Three.js particle system (only once) ---
  _bootThreeJS();

  // --- Boot TemporalEngine (only once) ---
  _bootTemporalEngine();

  // --- Swap location content safely ---
  try {
    if (typeof places !== 'undefined' && places && places.length) {
      const idx = typeof selectedPlaceIndex !== 'undefined' ? selectedPlaceIndex : 0;
      const place = places[idx] || places[0];
      if (typeof swapLocationContent === 'function') swapLocationContent(place);
      if (typeof recordVisit === 'function') recordVisit(place.id, typeof currentEra !== 'undefined' ? currentEra : '2024');
    }
  } catch (err) {
    console.warn('[script.js] swapLocationContent threw (non-fatal):', err);
  }

  console.log('[script.js] ✓ Main Chronicle view revealed');
}

/* ═══════════════════════════════════════════════════════════════
 *  THREE.JS BOOT — initializes particle background (was never called)
 * ═══════════════════════════════════════════════════════════════ */
let _threeJSBooted = false;
function _bootThreeJS() {
  if (_threeJSBooted) {
    // Already running — just trigger a resize to ensure correct dimensions
    window.dispatchEvent(new Event('resize'));
    return;
  }
  try {
    if (typeof initThreeJS === 'function') {
      initThreeJS();
      _threeJSBooted = true;
      console.log('[script.js] ✓ Three.js particle system initialized');
    } else {
      console.warn('[script.js] initThreeJS not defined — particle background unavailable');
    }
  } catch (err) {
    console.warn('[script.js] initThreeJS() threw:', err);
    // Render a CSS fallback background so the screen isn't black
    _applyFallbackBackground();
  }
}

/* ═══════════════════════════════════════════════════════════════
 *  TEMPORAL ENGINE BOOT — sets up era column interactivity
 * ═══════════════════════════════════════════════════════════════ */
let _engineBooted = false;
function _bootTemporalEngine() {
  if (_engineBooted) return;
  try {
    if (typeof TemporalEngine === 'function' && !window.chronicle) {
      window.chronicle = new TemporalEngine();
      _engineBooted = true;
      console.log('[script.js] ✓ TemporalEngine instantiated');
    } else if (window.chronicle) {
      _engineBooted = true;
      console.log('[script.js] ✓ TemporalEngine already exists');
    } else {
      console.warn('[script.js] TemporalEngine class not found');
    }
  } catch (err) {
    console.warn('[script.js] TemporalEngine() threw:', err);
  }
}

/* ═══════════════════════════════════════════════════════════════
 *  FALLBACK BACKGROUND — CSS gradient so screen is never pure black
 * ═══════════════════════════════════════════════════════════════ */
function _applyFallbackBackground() {
  const container = document.getElementById('threejs-container-ANIMATION_50');
  if (container) {
    container.style.background =
      'radial-gradient(ellipse at center, #0a1628 0%, #090b0e 60%, #000 100%)';
    container.style.zIndex = '-1';
  }
  document.body.style.background = '#090b0e';
}

/* ═══════════════════════════════════════════════════════════════
 *  HELPERS
 * ═══════════════════════════════════════════════════════════════ */
function _showHomepage() {
  const homepage = document.getElementById('homepage-container');
  const main     = document.getElementById('main-container');
  if (homepage) { homepage.classList.remove('hidden'); homepage.style.display = ''; homepage.scrollTop = 0; }
  if (main)     { main.classList.add('hidden'); }
  try { if (typeof updateProgressUI === 'function') updateProgressUI(); } catch (_) {}
  try { if (typeof updateHomepageBadges === 'function') updateHomepageBadges(); } catch (_) {}
}

function _closeModal(modal) {
  if (!modal) return;
  modal.classList.add('hidden');
  modal.classList.remove('open', 'active');
  modal.style.display = 'none';
}
