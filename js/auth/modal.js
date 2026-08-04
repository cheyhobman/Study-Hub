/* ============================================================================
   auth/modal.js: the sign up / log in dialog.
   ----------------------------------------------------------------------------
   One modal, several views (log in, sign up, verify, set password, forgot,
   sent), switched in place so signing up after landing on the log in form never
   closes and reopens the box.

   Accessibility is not an afterthought here: the dialog takes focus on open,
   traps Tab inside itself while open, closes on Escape or a backdrop click,
   marks the page behind it inert to screen readers, and returns focus to
   whatever opened it. Those are the things that make a modal usable rather than
   a trap, and they are cheap.
   ========================================================================== */
import { esc, toast } from '../ui.js';
import {
  signUp, logIn, signInWithGoogle, requestPasswordReset, resendVerification,
  verifyCode, updatePassword, passwordChecks, passwordOk, hasLocalData,
} from './session.js';
import { authConfigured } from './config.js';

let root = null;
let lastFocused = null;
let view = 'login';
let ctx = {};                 // carries email between views

const FOCUSABLE = 'a[href],button:not([disabled]),input:not([disabled]),select,textarea,[tabindex]:not([tabindex="-1"])';

/* ---- views ---------------------------------------------------------------- */

const googleButton = () => `
  <button type="button" class="btn btn-google" data-act="google">
    <svg width="17" height="17" viewBox="0 0 48 48" aria-hidden="true">
      <path fill="#4285F4" d="M45.1 24.5c0-1.6-.1-2.7-.4-3.9H24v7.1h12.1c-.2 1.8-1.6 4.6-4.5 6.5l6.9 5.3c4.1-3.8 6.6-9.4 6.6-15z"/>
      <path fill="#34A853" d="M24 46c5.9 0 10.9-2 14.5-5.3l-6.9-5.3c-1.9 1.3-4.4 2.2-7.6 2.2-5.8 0-10.7-3.8-12.5-9.700000000000001l-7.1 5.5C7.9 40.8 15.4 46 24 46z"/>
      <path fill="#FBBC05" d="M11.5 27.9c-.5-1.4-.7-2.9-.7-4.4s.3-3 .7-4.4l-7.1-5.5C2.9 16.6 2 20.2 2 23.5s.9 6.9 2.4 9.9l7.1-5.5z"/>
      <path fill="#EA4335" d="M24 10.5c4.1 0 6.9 1.8 8.5 3.3l6.1-6C34.9 4.4 29.9 2 24 2 15.4 2 7.9 7.2 4.4 14.1l7.1 5.5C13.3 14.3 18.2 10.5 24 10.5z"/>
    </svg>
    Continue with Google
  </button>
  <div class="auth-or"><span>or</span></div>`;

const err = (id) => `<p class="auth-error hidden" id="${id}" role="alert" aria-live="polite"></p>`;

const VIEWS = {
  login: () => `
    <h2 id="auth-title">Log in</h2>
    <p class="auth-lede">Your results and deadlines follow you to any device.</p>
    ${googleButton()}
    <form id="auth-form" novalidate>
      <label class="field"><span>Email</span>
        <input type="email" name="email" autocomplete="email" required value="${esc(ctx.email || '')}"></label>
      <label class="field"><span>Password</span>
        <input type="password" name="password" autocomplete="current-password" required></label>
      ${err('auth-err')}
      <button class="btn btn-primary btn-block" type="submit">Log in</button>
    </form>
    <div class="auth-foot">
      <button class="linklike" data-view="forgot">Forgot password?</button>
      <span>New here? <button class="linklike" data-view="signup">Create an account</button></span>
    </div>`,

  signup: () => `
    <h2 id="auth-title">Create an account</h2>
    <p class="auth-lede">We will email you a code to confirm it is you. No results needed yet.</p>
    ${googleButton()}
    <form id="auth-form" novalidate>
      <label class="field"><span>Your name</span>
        <input type="text" name="name" autocomplete="given-name" required
               placeholder="What you want to be called" value="${esc(ctx.name || '')}"></label>
      <label class="field"><span>Email</span>
        <input type="email" name="email" autocomplete="email" required
               placeholder="you@school.nz" value="${esc(ctx.email || '')}"></label>
      <label class="field"><span>Password</span>
        <input type="password" name="password" autocomplete="new-password" required></label>
      <ul class="pw-checks" id="pw-checks" aria-live="polite">
        ${passwordChecks('').map(c => `<li data-ok="false">${c.label}</li>`).join('')}
      </ul>
      ${err('auth-err')}
      <button class="btn btn-primary btn-block" type="submit">Create account</button>
    </form>
    <div class="auth-foot">
      <span>Already have one? <button class="linklike" data-view="login">Log in</button></span>
    </div>`,

  verify: () => `
    <h2 id="auth-title">Check your email</h2>
    <p class="auth-lede">We sent a 6-digit code to <strong>${esc(ctx.email || '')}</strong>.
      Enter it below, or click the link in the email.</p>
    <form id="auth-form" novalidate>
      <label class="field"><span>Verification code</span>
        <input type="text" name="token" inputmode="numeric" autocomplete="one-time-code"
               maxlength="8" required placeholder="123456" class="auth-code"></label>
      ${err('auth-err')}
      <button class="btn btn-primary btn-block" type="submit">Verify</button>
    </form>
    <div class="auth-foot">
      <button class="linklike" data-act="resend">Send another code</button>
      <button class="linklike" data-view="login">Back to log in</button>
    </div>`,

  forgot: () => `
    <h2 id="auth-title">Reset your password</h2>
    <p class="auth-lede">Enter your email and we will send you a reset link.</p>
    <form id="auth-form" novalidate>
      <label class="field"><span>Email</span>
        <input type="email" name="email" autocomplete="email" required value="${esc(ctx.email || '')}"></label>
      ${err('auth-err')}
      <button class="btn btn-primary btn-block" type="submit">Send reset link</button>
    </form>
    <div class="auth-foot">
      <button class="linklike" data-view="login">Back to log in</button>
    </div>`,

  sent: () => `
    <h2 id="auth-title">Check your email</h2>
    <p class="auth-lede">If there is an account for <strong>${esc(ctx.email || '')}</strong>,
      a reset link is on its way. The link expires in an hour.</p>
    <p class="xs muted">Nothing arrived? Check spam, and make sure you typed the same address you
      signed up with.</p>
    <button class="btn btn-primary btn-block" data-view="login">Back to log in</button>`,

  setpassword: () => `
    <h2 id="auth-title">Choose a new password</h2>
    <p class="auth-lede">You are signed in from the link in your email. Set a password to finish.</p>
    <form id="auth-form" novalidate>
      <label class="field"><span>New password</span>
        <input type="password" name="password" autocomplete="new-password" required></label>
      <ul class="pw-checks" id="pw-checks" aria-live="polite">
        ${passwordChecks('').map(c => `<li data-ok="false">${c.label}</li>`).join('')}
      </ul>
      ${err('auth-err')}
      <button class="btn btn-primary btn-block" type="submit">Save password</button>
    </form>`,
};

/* ---- shell ---------------------------------------------------------------- */

function shell() {
  return `
  <div class="auth-backdrop" data-close></div>
  <div class="auth-dialog" role="dialog" aria-modal="true" aria-labelledby="auth-title">
    <button class="auth-close icon-btn" data-close aria-label="Close">
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor"
           stroke-width="2.2" stroke-linecap="round"><path d="M5 5l14 14M19 5L5 19"/></svg>
    </button>
    <div class="auth-body" id="auth-body">${VIEWS[view]()}</div>
    ${hasLocalData() && (view === 'signup' || view === 'login') ? `
      <p class="auth-note">This browser already has study data saved. It will be added to your
        account when you sign in, not replaced.</p>` : ''}
  </div>`;
}

function paint() {
  root.querySelector('.auth-dialog').innerHTML = '';
  root.innerHTML = shell();
  wire();
  const first = root.querySelector('input, button:not([data-close])');
  (first || root.querySelector('.auth-dialog')).focus?.();
}

export function setView(v, next = {}) {
  view = v; ctx = { ...ctx, ...next };
  if (root) paint();
}

export function openAuth(v = 'login', next = {}) {
  if (!authConfigured()) {
    toast('Accounts are not set up on this copy of the site.');
    return;
  }
  view = v; ctx = { ...ctx, ...next };
  lastFocused = document.activeElement;
  root = document.createElement('div');
  root.className = 'auth-root';
  root.innerHTML = shell();
  document.body.appendChild(root);
  document.body.classList.add('auth-open');
  /* Hide the page from assistive tech while the dialog owns the screen. */
  document.getElementById('app')?.setAttribute('aria-hidden', 'true');
  /* Force a reflow, then add the class synchronously. requestAnimationFrame
     does not fire in a background or hidden tab, and the dialog starts at
     opacity 0 — so an rAF-gated class could leave it permanently invisible. A
     forced reflow makes the browser commit the starting styles, and the
     transition still runs from there. */
  void root.offsetWidth;
  root.classList.add('is-open');
  wire();
  setTimeout(() => root.querySelector('input, button:not([data-close])')?.focus(), 60);
  document.addEventListener('keydown', onKey, true);
}

export function closeAuth() {
  if (!root) return;
  const node = root;
  root = null;
  document.removeEventListener('keydown', onKey, true);
  document.body.classList.remove('auth-open');
  document.getElementById('app')?.removeAttribute('aria-hidden');
  node.classList.remove('is-open');
  /* Let the exit animation finish; matches --transition elsewhere on the site. */
  setTimeout(() => node.remove(), 180);
  lastFocused?.focus?.();
}

function onKey(e) {
  if (!root) return;
  if (e.key === 'Escape') { e.preventDefault(); closeAuth(); return; }
  if (e.key !== 'Tab') return;
  /* Focus trap: Tab off either end wraps to the other. */
  const items = [...root.querySelectorAll(FOCUSABLE)].filter(el => el.offsetParent !== null);
  if (!items.length) return;
  const first = items[0], last = items[items.length - 1];
  if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
  else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
}

/* ---- behaviour ------------------------------------------------------------ */

const showErr = (msg) => {
  const el = root?.querySelector('#auth-err');
  if (!el) return;
  el.textContent = msg;
  el.classList.remove('hidden');
};
const clearErr = () => root?.querySelector('#auth-err')?.classList.add('hidden');

function busy(on, label) {
  const btn = root?.querySelector('#auth-form button[type=submit]');
  if (!btn) return;
  btn.disabled = on;
  if (on) { btn.dataset.label = btn.textContent; btn.innerHTML = `<span class="spinner spinner-sm"></span>${label || 'Working…'}`; }
  else if (btn.dataset.label) btn.textContent = btn.dataset.label;
}

function wire() {
  if (!root) return;

  root.querySelectorAll('[data-close]').forEach(el =>
    el.addEventListener('click', closeAuth));

  root.querySelectorAll('[data-view]').forEach(el =>
    el.addEventListener('click', () => setView(el.dataset.view)));

  root.querySelector('[data-act="google"]')?.addEventListener('click', async (e) => {
    e.target.disabled = true;
    const res = await signInWithGoogle();
    if (!res.ok) { e.target.disabled = false; showErr(res.error); }
    /* On success the browser is already navigating to Google. */
  });

  root.querySelector('[data-act="resend"]')?.addEventListener('click', async () => {
    await resendVerification(ctx.email);
    toast('Another code is on its way.');
  });

  /* live password rules */
  const form = root.querySelector('#auth-form');
  const pw = form?.querySelector('[name=password]');
  const list = root.querySelector('#pw-checks');
  if (pw && list) {
    const paintChecks = () => {
      const checks = passwordChecks(pw.value);
      [...list.children].forEach((li, i) => { li.dataset.ok = String(checks[i].ok); });
    };
    pw.addEventListener('input', paintChecks);
  }

  form?.addEventListener('submit', async (e) => {
    e.preventDefault();
    clearErr();
    const f = new FormData(form);
    const email = String(f.get('email') || ctx.email || '').trim();
    const password = String(f.get('password') || '');
    const name = String(f.get('name') || '').trim();

    if (view === 'login') {
      if (!email || !password) return showErr('Enter your email and password.');
      busy(true, 'Logging in…');
      const res = await logIn({ email, password });
      busy(false);
      if (!res.ok) return showErr(res.error);
      toast('Logged in');
      closeAuth();
      return;
    }

    if (view === 'signup') {
      if (!name) return showErr('Tell us what to call you.');
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return showErr('That email address does not look right.');
      if (!passwordOk(password)) return showErr('Your password does not meet the requirements above yet.');
      busy(true, 'Creating…');
      const res = await signUp({ email, password, name });
      busy(false);
      if (!res.ok) return showErr(res.error);
      if (res.needsVerification) { setView('verify', { email, name }); return; }
      toast('Account created');
      closeAuth();
      return;
    }

    if (view === 'verify') {
      const token = String(f.get('token') || '').trim();
      if (!token) return showErr('Enter the code from your email.');
      busy(true, 'Verifying…');
      const res = await verifyCode({ email: ctx.email, token });
      busy(false);
      if (!res.ok) return showErr(res.error);
      toast('Email verified');
      closeAuth();
      return;
    }

    if (view === 'forgot') {
      if (!email) return showErr('Enter the email you signed up with.');
      busy(true, 'Sending…');
      await requestPasswordReset(email);
      busy(false);
      setView('sent', { email });
      return;
    }

    if (view === 'setpassword') {
      if (!passwordOk(password)) return showErr('Your password does not meet the requirements above yet.');
      busy(true, 'Saving…');
      const res = await updatePassword(password);
      busy(false);
      if (!res.ok) return showErr(res.error);
      toast('Password saved');
      closeAuth();
    }
  });
}
