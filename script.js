/**
 * script.js — Anomaly click delegation + pointer-events safety
 *
 * PRIMARY FIX in index.html:
 *   The duplicate solveAnomaly(placeId, clickX, clickY) that was overwriting
 *   the correct solveAnomaly(placeId, era, clickX, clickY) has been removed.
 *   That was the root cause of anomaly clicks doing nothing.
 *
 * THIS FILE adds:
 *   1. Document-level event delegation for .anomaly-target-node clicks —
 *      works even when the node is dynamically recreated after a listener attaches.
 *   2. Pointer-events safety for decorative layers.
 */
document.addEventListener('DOMContentLoaded', () => {

  /* ─── Pointer-events: decorative layers must not block clicks ── */
  [
    '.portal-effect', '.particles', '.background-animation',
    '.glow-layer', '.decorative-overlay'
  ].forEach(sel => {
    document.querySelectorAll(sel).forEach(el => {
      el.style.pointerEvents = 'none';
    });
  });

  /* ─── Decorative animated divs in hero section ───────────────── */
  const heroSection = document.querySelector('section');
  if (heroSection) {
    heroSection.querySelectorAll('div[class*="animate-spin"], div[class*="animate-ping"]').forEach(el => {
      if (!el.onclick && el.children.length === 0 && !el.textContent.trim()) {
        el.style.pointerEvents = 'none';
      }
    });
  }

  /* ─── Document-level event delegation for anomaly clicks ─────── */
  document.addEventListener('click', (event) => {
    // Walk up from the clicked element to find the anomaly node
    const anomalyNode = event.target.closest('#inspection-anomaly-target-node, .anomaly-target-node');
    if (!anomalyNode) return;

    // Don't double-fire if the direct listener already handled it
    // (The direct listener calls e.stopPropagation(), so this only fires
    //  if the direct listener wasn't attached or was bypassed)
    console.log('[Anomaly] Delegation caught click on:', anomalyNode.id || anomalyNode.className);

    // The direct handler on the node calls triggerSolve which calls solveAnomaly.
    // This delegation layer is a safety net — if we reach here the direct
    // listener didn't stop propagation, meaning it was missing or didn't fire.
    // We handle it here using the data stored on the node.
    const placeId  = anomalyNode.dataset.placeId;
    const era      = anomalyNode.dataset.era;
    const isSolved = anomalyNode.classList.contains('solved');

    if (!placeId || !era) {
      // Node doesn't have data attributes — the direct listener should handle it.
      return;
    }

    event.preventDefault();
    event.stopPropagation();

    console.log('[Anomaly] Delegation handling: placeId=', placeId, 'era=', era);

    if (isSolved) {
      if (typeof showToast === 'function') {
        showToast('Timeline Stable', 'You have already restored this anomaly!', 'info');
      }
      return;
    }

    // Use the existing foundAnomalies localStorage key (matches user spec)
    const anomalyId = `${placeId}_${era}`;
    const found = JSON.parse(localStorage.getItem('foundAnomalies') || '[]');
    if (found.includes(anomalyId)) return;
    found.push(anomalyId);
    localStorage.setItem('foundAnomalies', JSON.stringify(found));

    // Delegate to the inline solveAnomaly if available
    if (typeof solveAnomaly === 'function') {
      solveAnomaly(placeId, era, event.clientX, event.clientY);
    }
  });

  console.log('[script.js] Anomaly delegation listener attached');
});
