/* ============================================================================
   confirm.js: the site's own confirmation dialog.
   ----------------------------------------------------------------------------
   Replaces window.confirm() for destructive actions. The browser's own box is
   jarring in a way that is easy to underrate: it is chrome-styled rather than
   site-styled, it says "localhost:8765 says", it cannot be styled or laid out,
   and on some browsers it offers to suppress all future dialogs, which would
   silently disable every safety check on the site.

   Same accessibility rules as the auth modal: focus moves in, Tab is trapped,
   Escape cancels, the backdrop cancels, and focus returns to whatever opened
   it. Returns a promise resolving true/false, so call sites read almost the
   same as the confirm() they replaced:

       if (!await confirmAction({ ... })) return;
   ========================================================================== */
import { esc } from './ui.js';

const FOCUSABLE = 'button:not([disabled]),[href],input,select,textarea,[tabindex]:not([tabindex="-1"])';

export function confirmAction({
  title,
  body = '',
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  danger = false,
} = {}) {
  return new Promise((resolve) => {
    const lastFocused = document.activeElement;
    const root = document.createElement('div');
    root.className = 'auth-root confirm-root';
    root.innerHTML = `
      <div class="auth-backdrop" data-cancel></div>
      <div class="auth-dialog confirm-dialog" role="alertdialog" aria-modal="true"
           aria-labelledby="confirm-title" aria-describedby="confirm-body">
        <h2 id="confirm-title">${esc(title)}</h2>
        <div id="confirm-body" class="confirm-body">${body}</div>
        <div class="confirm-actions">
          <button class="btn btn-ghost" data-cancel>${esc(cancelLabel)}</button>
          <button class="btn ${danger ? 'btn-danger' : 'btn-primary'}" data-ok>${esc(confirmLabel)}</button>
        </div>
      </div>`;
    document.body.appendChild(root);
    document.body.classList.add('auth-open');
    document.getElementById('app')?.setAttribute('aria-hidden', 'true');
    /* Visible as soon as it is in the DOM; the entrance is a keyframe, not a
       transition, so nothing can leave it stuck invisible. */
    root.classList.add('is-open');

    const done = (val) => {
      document.removeEventListener('keydown', onKey, true);
      document.body.classList.remove('auth-open');
      document.getElementById('app')?.removeAttribute('aria-hidden');
      root.classList.remove('is-open');
      setTimeout(() => root.remove(), 180);
      lastFocused?.focus?.();
      resolve(val);
    };

    function onKey(e) {
      if (e.key === 'Escape') { e.preventDefault(); done(false); return; }
      if (e.key !== 'Tab') return;
      const items = [...root.querySelectorAll(FOCUSABLE)].filter(el => el.offsetParent !== null);
      if (!items.length) return;
      const first = items[0], last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }

    root.querySelectorAll('[data-cancel]').forEach(el => el.addEventListener('click', () => done(false)));
    root.querySelector('[data-ok]').addEventListener('click', () => done(true));
    document.addEventListener('keydown', onKey, true);
    /* Focus lands on Cancel, not Confirm: a stray Enter should not delete
       somebody's subject. */
    setTimeout(() => root.querySelector('[data-cancel]')?.focus(), 60);
  });
}
