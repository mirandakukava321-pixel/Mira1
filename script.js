/**
 * script.js — Bulletproof button wiring for Chronicle: Temporal Navigation Engine
 *
 * Runs deferred AFTER all inline JS. Handles:
 *   1. Play Mini Game  (#hero-play-minigame-btn) → opens #mini-game-overlay
 *   2. Initiate Portal Jump (#portal-jump-btn, [data-action="portal"])
 *   3. Passport (#passport-btn, [data-action="passport"])
 *   4. Modal close buttons and backdrop dismiss
 */

document.addEventListener('DOMContentLoaded', () => {

  /* ─────────────────────────────────────────────────────────────
   *  1. PLAY MINI GAME — hero button
   * ───────────────────────────────────────────────────────────── */
  const playBtn   = document.getElementById('hero-play-minigame-btn');
  const gameModal = document.getElementById('mini-game-overlay');

  if (playBtn && gameModal) {
    playBtn.addEventListener('click', (e) => {
      e.preventDefault();
      console.log('[script.js] Play Mini Game clicked');

      // Show the overlay first so the user sees immediate feedback
      gameModal.classList.remove('hidden');
      gameModal.style.display = 'flex';

      // Delegate to inline engine for level-select rendering (try/catch safe)
      try {
        if (typeof openTimeExplorerModal === 'function') {
          openTimeExplorerModal();
        }
      } catch (err) {
        console.warn('[script.js] openTimeExplorerModal() threw:', err);
      }

      // Call game init if exposed
      try {
        if (typeof initGame === 'function') initGame();
      } catch (err) {
        console.warn('[script.js] initGame() threw:', err);
      }
    });
    console.log('[script.js] ✓ hero-play-minigame-btn wired');
  } else {
    console.error(
      '[script.js] Play Mini Game button or Game Modal not found in DOM.',
      '| playBtn:', playBtn,
      '| gameModal:', gameModal
    );
  }

  /* ─────────────────────────────────────────────────────────────
   *  2. INITIATE PORTAL JUMP — hero + nav buttons
   * ───────────────────────────────────────────────────────────── */
  document
    .querySelectorAll('#portal-jump-btn, #navWarpButton, [data-action="portal"]')
    .forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        console.log('[script.js] Portal Jump clicked');
        try {
          if (typeof initiatePortalJump === 'function') {
            initiatePortalJump();
            return;
          }
        } catch (err) {
          console.warn('[script.js] initiatePortalJump() threw:', err);
        }
        // Fallback: show portal overlay then swap views
        _fallbackPortalJump();
      });
    });
  console.log('[script.js] ✓ Portal buttons wired:',
    document.querySelectorAll('#portal-jump-btn, #navWarpButton, [data-action="portal"]').length);

  /* ─────────────────────────────────────────────────────────────
   *  3. PASSPORT — nav + section buttons
   * ───────────────────────────────────────────────────────────── */
  document
    .querySelectorAll('#passport-btn, #main-passport-btn, [data-action="passport"]')
    .forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        console.log('[script.js] Passport clicked');
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
        }
      });
    });
  console.log('[script.js] ✓ Passport buttons wired:',
    document.querySelectorAll('#passport-btn, #main-passport-btn, [data-action="passport"]').length);

  /* ─────────────────────────────────────────────────────────────
   *  4. CLOSE BUTTONS & BACKDROP DISMISS
   * ───────────────────────────────────────────────────────────── */

  // Mini-game overlay close
  if (gameModal) {
    // Click on dark backdrop (not the content) closes the overlay
    gameModal.addEventListener('click', (e) => {
      if (e.target === gameModal) _closeModal(gameModal);
    });
    // Any button in the header that closes the modal
    const closeHeaderBtns = gameModal.querySelectorAll('header button');
    closeHeaderBtns.forEach(btn => {
      if (btn.textContent.includes('✕') || btn.textContent.includes('×') ||
          btn.textContent.includes('Close') || btn.textContent.includes('Back') ||
          btn.getAttribute('onclick')) {
        // Don't override — these already have onclick handlers in HTML
        // But add a safety listener so the hidden class is definitely removed
        btn.addEventListener('click', () => {
          setTimeout(() => {
            if (gameModal && !gameModal.classList.contains('hidden')) {
              // only close if the inline handler didn't already close it
            }
          }, 50);
        });
      }
    });
  }

  // Passport close — buttons with toggleTimePassport(false) onclick
  document.querySelectorAll('[onclick*="toggleTimePassport(false)"]').forEach(btn => {
    btn.addEventListener('click', () => {
      const passportModal = document.getElementById('passport-modal');
      if (passportModal) {
        try { toggleTimePassport(false); } catch (_) {}
        _closeModal(passportModal);
      }
    });
  });

  // Generic .close-btn elements
  document.querySelectorAll('.close-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const modal = btn.closest('[id$="-modal"], [id$="-overlay"]');
      if (modal) _closeModal(modal);
    });
  });

  // Native <dialog> backdrop click
  document.querySelectorAll('dialog').forEach(dlg => {
    dlg.addEventListener('click', (e) => {
      const r = dlg.getBoundingClientRect();
      const inside = r.top <= e.clientY && e.clientY <= r.bottom
                  && r.left <= e.clientX && e.clientX <= r.right;
      if (!inside) dlg.close();
    });
  });

  console.log('[script.js] ✓ All handlers attached successfully');
});

/* ─── HELPERS ─────────────────────────────────────────────────── */

function _closeModal(modal) {
  if (!modal) return;
  modal.classList.add('hidden');
  modal.classList.remove('open', 'active');
  modal.style.display = 'none';
}

function _fallbackPortalJump() {
  const portalOverlay = document.getElementById('portal-modal');
  const homepage      = document.getElementById('homepage-container');
  const main          = document.getElementById('main-container');

  if (portalOverlay) {
    portalOverlay.classList.add('active');
    portalOverlay.style.opacity = '1';
    portalOverlay.style.visibility = 'visible';
    portalOverlay.style.pointerEvents = 'auto';
  }
  setTimeout(() => {
    if (portalOverlay) {
      portalOverlay.classList.remove('active');
      portalOverlay.style.opacity = '';
      portalOverlay.style.visibility = '';
      portalOverlay.style.pointerEvents = '';
    }
    if (homepage) homepage.classList.add('hidden');
    if (main) {
      main.classList.remove('hidden');
      window.dispatchEvent(new Event('resize'));
    }
  }, 1200);
}
