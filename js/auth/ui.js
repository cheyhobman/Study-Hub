/* ============================================================================
   auth/ui.js: the Sign up / Log in controls in the top bar, and the signed-in
   menu that replaces them.
   ----------------------------------------------------------------------------
   Renders nothing at all when the site has no Supabase keys. That is
   deliberate: a copy of the site handed to someone without a backend should not
   show buttons that cannot work.
   ========================================================================== */
import { esc, toast } from '../ui.js';
import { authConfigured } from './config.js';
import { onAuth, user, displayName, logOut, syncNow, lastSyncedAt, reconcileResult } from './session.js';
import { openAuth, setView } from './modal.js';

function initials(name) {
  const parts = String(name || '').trim().split(/\s+/).filter(Boolean);
  if (!parts.length) return '?';
  return (parts[0][0] + (parts[1]?.[0] || '')).toUpperCase();
}

function render(u) {
  const host = document.getElementById('auth-actions');
  if (!host) return;
  if (!authConfigured()) { host.hidden = true; host.innerHTML = ''; return; }
  host.hidden = false;

  if (!u) {
    host.innerHTML = `
      <button class="btn btn-ghost btn-sm" id="auth-login">Log in</button>
      <button class="btn btn-primary btn-sm" id="auth-signup">Sign up</button>`;
    host.querySelector('#auth-login').onclick = () => openAuth('login');
    host.querySelector('#auth-signup').onclick = () => openAuth('signup');
    return;
  }

  const name = displayName(u);
  host.innerHTML = `
    <div class="acct-menu">
      <button class="acct-trigger" id="acct-trigger" aria-haspopup="menu" aria-expanded="false"
              title="${esc(u.email || '')}">
        <span class="acct-avatar" aria-hidden="true">${esc(initials(name))}</span>
        <span class="acct-name">${esc(name)}</span>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor"
             stroke-width="2.5" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>
      </button>
      <div class="acct-pop" id="acct-pop" role="menu" hidden>
        <div class="acct-head">
          <strong>${esc(name)}</strong>
          <span class="xs muted">${esc(u.email || '')}</span>
        </div>
        <a class="acct-item" href="/account" data-link role="menuitem">Account settings</a>
        <button class="acct-item" id="acct-sync" role="menuitem">Sync now</button>
        <button class="acct-item acct-danger" id="acct-out" role="menuitem">Log out</button>
      </div>
    </div>`;

  const trigger = host.querySelector('#acct-trigger');
  const pop = host.querySelector('#acct-pop');
  const close = () => { pop.hidden = true; trigger.setAttribute('aria-expanded', 'false'); };
  trigger.onclick = (e) => {
    e.stopPropagation();
    const open = pop.hidden;
    pop.hidden = !open;
    trigger.setAttribute('aria-expanded', String(open));
  };
  document.addEventListener('click', close);
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });

  host.querySelector('#acct-sync').onclick = async () => {
    close();
    const res = await syncNow();
    toast(res.ok ? 'Saved to your account' : 'Could not sync. Your work is still saved on this device.');
  };
  host.querySelector('#acct-out').onclick = async () => {
    close();
    await logOut();
    toast('Logged out. Your work stays on this device.');
  };
}

/** Called once at boot. Re-renders itself whenever auth state changes. */
export function initAuthUI() {
  onAuth((u) => {
    render(u);
    /* Tell the student what reconcile decided, rather than silently swapping
       their data. Only on an actual sign-in, and only when it mattered. */
    const r = reconcileResult();
    if (u && r && r.action === 'pulled' && r.conflict) {
      toast('Loaded the newer copy from your account.');
    } else if (u && r && r.action === 'uploaded-local') {
      toast('Your existing work has been added to your account.');
    }
  });

  /* A password-reset or email-confirmation link lands on /account with tokens
     in the URL. Supabase consumes them, and `type=recovery` means the student
     arrived specifically to choose a new password. */
  const params = new URLSearchParams(location.hash.replace(/^#/, '') || location.search);
  if (params.get('type') === 'recovery') {
    setTimeout(() => openAuth('setpassword'), 400);
    history.replaceState({}, '', location.pathname);
  }
}

export { openAuth };
