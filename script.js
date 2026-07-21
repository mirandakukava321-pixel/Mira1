/**
 * script.js — Bulletproof button wiring for Chronicle: Temporal Navigation Engine
 *
 * This file runs AFTER all inline JS (deferred). It handles:
 *   1. Play Mini Game  → opens #mini-game-modal
 *   2. Initiate Portal Jump → runs portal warp → shows main app
 *   3. Passport → opens #passport-modal
 *
 * Strategy: directly manipulate modals here. Also delegates to the
 * inline functions (openTimeExplorerModal, toggleTimePassport,
 * initiatePortalJump) if they are available — with a try/catch so a
 * crash in the inline script NEVER prevents this script from working.
 */

document.addEventListener('DOMContentLoaded', () => {

  /* ─── 1. PLAY MINI GAME ─────────────────────────────────────── */
  const miniGameBtn   = document.getElementById('play-mini-game-btn');
  const miniGameModal = document.getElementById('mini-game-modal');

  if (miniGameBtn) {
    miniGameBtn.addEventListener('click', (e) => {
      e.preventDefault();
      console.log('[script.js] Play Mini Game clicked');
      // Try the inline helper first
      try {
        if (typeof openTimeExplorerModal === 'function') {
          openTimeExplorerModal();
          return;
        }
      } catch (err) {
        console.warn('[script.js] openTimeExplorerModal() threw:', err);
      }
      // Fallback: show directly
      if (miniGameModal) {
        miniGameModal.classList.remove('hidden');
        miniGameModal.style.display = 'flex';
        console.log('[script.js] Mini-game modal shown directly');
      }
    });
    console.log('[script.js] ✓ play-mini-game-btn wired');
  } else {
    console.warn('[script.js] ✗ play-mini-game-btn not found in DOM');
  }

  /* ─── 2. INITIATE PORTAL JUMP ───────────────────────────────── */
  // Wire every portal button (hero + nav)
  document.querySelectorAll('[data-action="portal"], #portal-jump-btn, #navWarpButton').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      console.log('[script.js] Portal Jump clicked');
      // Try the inline engine first
      try {
        if (typeof initiatePortalJump === 'function') {
          initiatePortalJump();
          return;
        }
      } catch (err) {
        console.warn('[script.js] initiatePortalJump() threw:', err);
      }
      // Fallback: show portal-modal overlay then hide homepage
      const portalModal = document.getElementById('portal-modal');
      const homepage    = document.getElementById('homepage-container');
      const main        = document.getElementById('main-container');
      if (portalModal) {
        portalModal.classList.add('active');
        portalModal.style.opacity = '1';
        portalModal.style.visibility = 'visible';
        portalModal.style.pointerEvents = 'auto';
        console.log('[script.js] Portal modal shown directly');
      }
      // After 1.2 s: hide homepage, reveal main
      setTimeout(() => {
        if (portalModal) {
          portalModal.classList.remove('active');
          portalModal.style.opacity = '';
          portalModal.style.visibility = '';
          portalModal.style.pointerEvents = '';
        }
        if (homepage) homepage.classList.add('hidden');
        if (main)     { main.classList.remove('hidden'); window.dispatchEvent(new Event('resize')); }
      }, 1200);
    });
  });
  console.log('[script.js] ✓ Portal-jump buttons wired:', document.querySelectorAll('[data-action="portal"]').length);

  /* ─── 3. PASSPORT ───────────────────────────────────────────── */
  // Wire every passport button (nav + hero progress section)
  document.querySelectorAll('[data-action="passport"], #passport-btn, #main-passport-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      console.log('[script.js] Passport clicked');
      // Try inline helper first
      try {
        if (typeof toggleTimePassport === 'function') {
          toggleTimePassport(true);
          return;
        }
      } catch (err) {
        console.warn('[script.js] toggleTimePassport() threw:', err);
      }
      // Fallback: show directly
      const passportModal = document.getElementById('passport-modal');
      if (passportModal) {
        passportModal.classList.add('open');
        passportModal.classList.remove('hidden');
        passportModal.style.display = 'flex';
        console.log('[script.js] Passport modal shown directly');
      }
    });
  });
  console.log('[script.js] ✓ Passport buttons wired:', document.querySelectorAll('[data-action="passport"]').length);

  /* ─── 4. CLOSE BUTTONS ──────────────────────────────────────── */

  // Generic close: any element with class .close-btn inside a modal
  document.querySelectorAll('.close-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const modal = btn.closest('[id$="-modal"]');
      if (modal) _closeModal(modal);
    });
  });

  // Close mini-game modal
  const miniGameClose = miniGameModal && miniGameModal.querySelector('button[onclick*="close"], button[onclick*="Close"], header button');
  if (miniGameClose) {
    miniGameClose.addEventListener('click', () => _closeModal(miniGameModal));
  }

  // Close passport modal: buttons with onclick="toggleTimePassport(false)"
  document.querySelectorAll('[onclick*="toggleTimePassport(false)"]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const passportModal = document.getElementById('passport-modal');
      if (passportModal) {
        try { toggleTimePassport(false); } catch(_) {}
        _closeModal(passportModal);
      }
    });
  });

  // Backdrop click: click outside inner content of any open modal
  [miniGameModal, document.getElementById('passport-modal')].forEach(modal => {
    if (!modal) return;
    modal.addEventListener('click', (e) => {
      if (e.target === modal) _closeModal(modal);
    });
  });

  // dialog close (Escape key / backdrop) — already handled by native dialog API
  document.querySelectorAll('dialog').forEach(dlg => {
    dlg.addEventListener('click', (e) => {
      const rect = dlg.getBoundingClientRect();
      const inside = rect.top <= e.clientY && e.clientY <= rect.bottom
                  && rect.left <= e.clientX && e.clientX <= rect.right;
      if (!inside) dlg.close();
    });
  });

  console.log('[script.js] ✓ All button wiring complete');
});

/* ─── HELPER ──────────────────────────────────────────────────── */
function _closeModal(modal) {
  if (!modal) return;
  modal.classList.add('hidden');
  modal.classList.remove('open', 'active');
  modal.style.display = 'none';
}
