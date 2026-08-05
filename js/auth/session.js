/* ============================================================================
   auth/session.js: who is signed in, and keeping their data with them.
   ----------------------------------------------------------------------------
   The rule this file exists to enforce: AN ACCOUNT IS AN ENHANCEMENT, NEVER A
   GATE. Signed out, unconfigured, or offline, the site behaves exactly as it
   always has and everything saves to this browser. Signing in adds a second
   home for the same data so it follows you to another device.

   How syncing works, and why it is this shape:

     • localStorage stays the working copy. Every existing page reads and writes
       through store.js and none of them had to change. Making the cloud the
       working copy would have meant every read becoming async, which is a
       rewrite of the whole app for no benefit to a student on one device.
     • On sign-in we RECONCILE rather than overwrite. Whichever side was written
       most recently wins, and if the local copy is the newer one it is pushed
       up. Blindly pulling would erase an evening's work done before logging in;
       blindly pushing would erase the work done on the other device.
     • After that, every store change is debounced and pushed up in the
       background. A failed push is not fatal: the local copy is still correct
       and the next successful push carries everything, because we send the
       whole record rather than a diff.

   One row per user, holding the same `ncea.` blob the backup file uses. That
   keeps the cloud format, the backup format and the local format identical, so
   there is one shape to reason about instead of three.
   ========================================================================== */
import { client, friendlyError } from './supabase.js';
import { authConfigured, redirectTo } from './config.js';
import { store } from '../store.js';

const listeners = new Set();
let current = null;          // the Supabase user, or null
let syncTimer = null;
let lastPushedAt = 0;
let suppressPush = false;    // true while we are applying a pull

/* 'idle' | 'saving' | 'saved' | 'error'. Reported in the UI instead of a
   "Sync now" button: syncing is automatic, so the useful thing to show is
   whether it is working, not a control for something that already happens. */
let syncState = 'idle';
const syncListeners = new Set();
export const onSync = (fn) => { syncListeners.add(fn); fn(syncState); return () => syncListeners.delete(fn); };
export const syncStatus = () => syncState;
/** False if the optional device_label column is not in the database. */
export const deviceColumnPresent = () => hasDeviceColumn;
function setSync(state) {
  syncState = state;
  syncListeners.forEach(fn => { try { fn(state); } catch (e) { console.error(e); } });
}

/** Subscribe to sign-in / sign-out. Returns an unsubscribe function. */
export function onAuth(fn) {
  listeners.add(fn);
  fn(current);
  return () => listeners.delete(fn);
}
const emit = () => listeners.forEach(fn => { try { fn(current); } catch (e) { console.error(e); } });

export const user = () => current;
export const signedIn = () => !!current;

/** Display name, falling back through the places Supabase might put it. */
export function displayName(u = current) {
  if (!u) return '';
  const m = u.user_metadata || {};
  return (m.name || m.full_name || '').trim() || (u.email || '').split('@')[0];
}

/* ---- boot ---------------------------------------------------------------- */

export async function initAuth() {
  if (!authConfigured()) return null;
  const sb = await client();
  if (!sb) return null;

  const { data } = await sb.auth.getSession();
  current = data?.session?.user || null;

  sb.auth.onAuthStateChange(async (event, session) => {
    const was = current?.id || null;
    current = session?.user || null;
    emit();
    if (current && current.id !== was) await reconcile();
    if (!current) stopSync();
  });

  if (current) await reconcile();
  emit();
  return current;
}

/* ---- the cloud copy ------------------------------------------------------ */

/* ---- which device is this? ------------------------------------------------
   "Saved to your account" never said WHERE from. If two devices disagree you
   could not tell which one last wrote, which is the one fact you need to judge
   whether a sync did the right thing. A stable random id per browser, plus a
   human label guessed from the user agent. Nothing identifying: no IP, no
   fingerprinting, just "MacBook · Chrome" so you recognise your own machine. */
export function deviceLabel() {
  const ua = navigator.userAgent;
  const os = /iPhone|iPad/.test(ua) ? 'iPhone/iPad'
           : /Android/.test(ua)     ? 'Android'
           : /Mac OS X/.test(ua)    ? 'Mac'
           : /Windows/.test(ua)     ? 'Windows'
           : /Linux/.test(ua)       ? 'Linux' : 'This device';
  const br = /Edg\//.test(ua)      ? 'Edge'
           : /OPR\//.test(ua)      ? 'Opera'
           : /Chrome\//.test(ua)   ? 'Chrome'
           : /Firefox\//.test(ua)  ? 'Firefox'
           : /Safari\//.test(ua)   ? 'Safari' : 'browser';
  return `${os} · ${br}`;
}

/** Everything under the `ncea.` namespace, the same blob the backup file uses. */
function localSnapshot() {
  const payload = store.exportAll();
  return payload.data;
}

/* `device_label` is an OPTIONAL column. It was added after the first setup
   instructions went out, so an existing project may not have it — and a
   cosmetic "which device synced last" must never be able to break syncing
   itself. Both calls below try with the column, detect the specific
   "column does not exist" failure, remember it, and carry on without.
   Adding the column later needs no code change; the flag just stops being set. */
let hasDeviceColumn = true;
const missingColumn = (error) =>
  error && (error.code === '42703' || /column .*device_label.* does not exist/i.test(error.message || ''));

async function pull() {
  const sb = await client();
  if (!sb || !current) return null;
  const cols = hasDeviceColumn ? 'data, updated_at, device_label' : 'data, updated_at';
  const { data, error } = await sb
    .from('user_data').select(cols).eq('user_id', current.id).maybeSingle();
  if (error) {
    if (missingColumn(error) && hasDeviceColumn) {
      hasDeviceColumn = false;
      return pull();                       // one retry, without the column
    }
    console.error('pull failed', error);
    return null;
  }
  return data || null;
}

async function push() {
  const sb = await client();
  if (!sb || !current) return { ok: false };
  setSync('saving');
  const body = {
    user_id: current.id,
    data: localSnapshot(),
    updated_at: new Date().toISOString(),
  };
  if (hasDeviceColumn) body.device_label = deviceLabel();
  let { error } = await sb.from('user_data').upsert(body, { onConflict: 'user_id' });
  if (error && missingColumn(error) && hasDeviceColumn) {
    hasDeviceColumn = false;
    delete body.device_label;
    ({ error } = await sb.from('user_data').upsert(body, { onConflict: 'user_id' }));
  }
  if (error) {
    console.error('push failed', error);
    setSync('error');
    return { ok: false, error };
  }
  lastPushedAt = Date.now();
  setSync('saved');
  return { ok: true };
}

/** Local edits go up, but not on every keystroke. */
function schedulePush() {
  if (!current || suppressPush) return;
  clearTimeout(syncTimer);
  syncTimer = setTimeout(() => { push(); }, 1500);
}

let unsubscribeStore = null;
function startSync() {
  if (unsubscribeStore) return;
  unsubscribeStore = store.on(schedulePush);
}
function stopSync() {
  clearTimeout(syncTimer);
  if (unsubscribeStore) { unsubscribeStore(); unsubscribeStore = null; }
  setSync('idle');
}

/* ---- reconcile ----------------------------------------------------------- */

/** True if this browser holds anything a student would miss. */
export function hasLocalData() {
  const d = localSnapshot();
  const meaningful = ['credits', 'internals', 'extras', 'hiddenstds', 'profile',
                      'reviewed', 'flagged', 'leitner', 'quizhistory'];
  return meaningful.some(k => {
    const v = d[k];
    if (v == null) return false;
    try {
      const parsed = JSON.parse(v);
      if (Array.isArray(parsed)) return parsed.length > 0;
      if (parsed && typeof parsed === 'object') return Object.keys(parsed).length > 0;
      return Boolean(parsed);
    } catch (e) { return false; }
  });
}

/* What reconcile() decided, so the UI can explain itself rather than silently
   changing someone's data underneath them. */
let lastReconcile = null;
export const reconcileResult = () => lastReconcile;

async function reconcile() {
  const remote = await pull();
  const localHas = hasLocalData();

  if (!remote) {
    /* First sign-in on this account. Whatever is in this browser becomes the
       account's starting state, which is the "import my existing data" case
       handled without asking: there is nothing to overwrite. */
    await push();
    lastReconcile = { action: localHas ? 'uploaded-local' : 'empty-start' };
    startSync();
    return lastReconcile;
  }

  const remoteAt = new Date(remote.updated_at || 0).getTime();
  const localAt = Number(store.lastLocalWrite() || 0);

  if (!localHas || remoteAt >= localAt) {
    /* About to replace local work with the account's copy. If there WAS local
       work, stash it first: last-write-wins is a reasonable default, but
       silently destroying the losing side is not. The student can download it
       from the account page for as long as it is there. */
    const conflict = localHas && localAt > 0;
    if (conflict) {
      store.stashConflict({
        savedAt: new Date().toISOString(),
        device: deviceLabel(),
        data: localSnapshot(),
      });
    }
    await applyRemote(remote.data);
    lastReconcile = { action: 'pulled', conflict,
                      remoteDevice: remote.device_label || null };
  } else {
    await push();
    lastReconcile = { action: 'pushed-newer-local', remoteDevice: remote.device_label || null };
  }
  startSync();
  return lastReconcile;
}

/** Replace the local copy with the account's, without echoing it back up. */
async function applyRemote(data) {
  suppressPush = true;
  try {
    store.importAll({ app: 'ncea-study-hub', version: 2, data }, { silent: true });
  } finally {
    /* Released on the next tick so the store's own emit has already run. */
    setTimeout(() => { suppressPush = false; }, 0);
  }
}


/* ---- auth actions ---------------------------------------------------------
   Every one returns { ok, error?, ...} and never throws, so callers can render
   an inline message instead of wrapping each call in try/catch. */

export async function signUp({ email, password, name }) {
  const sb = await client();
  if (!sb) return { ok: false, error: 'Accounts are not set up on this copy of the site.' };
  const { data, error } = await sb.auth.signUp({
    email: String(email).trim(),
    password,
    options: { data: { name: String(name || '').trim() }, emailRedirectTo: redirectTo() },
  });
  if (error) return { ok: false, error: friendlyError(error) };
  /* With email confirmation on, Supabase returns a user but no session. That is
     the expected path, not a failure. */
  return { ok: true, needsVerification: !data.session, email };
}

export async function logIn({ email, password }) {
  const sb = await client();
  if (!sb) return { ok: false, error: 'Accounts are not set up on this copy of the site.' };
  const { error } = await sb.auth.signInWithPassword({
    email: String(email).trim(), password,
  });
  if (error) return { ok: false, error: friendlyError(error) };
  return { ok: true };
}

export async function signInWithGoogle() {
  const sb = await client();
  if (!sb) return { ok: false, error: 'Accounts are not set up on this copy of the site.' };
  const { error } = await sb.auth.signInWithOAuth({
    provider: 'google',
    options: { redirectTo: redirectTo() },
  });
  if (error) return { ok: false, error: friendlyError(error) };
  return { ok: true, redirecting: true };
}

export async function requestPasswordReset(email) {
  const sb = await client();
  if (!sb) return { ok: false, error: 'Accounts are not set up on this copy of the site.' };
  await sb.auth.resetPasswordForEmail(String(email).trim(), { redirectTo: redirectTo() });
  /* ⚠️ Deliberately ok:true whatever happened. Reporting "no such user" would
     turn this form into a way to find out whether someone has an account. */
  return { ok: true };
}

export async function resendVerification(email) {
  const sb = await client();
  if (!sb) return { ok: false, error: 'Accounts are not set up on this copy of the site.' };
  await sb.auth.resend({ type: 'signup', email: String(email).trim(),
                         options: { emailRedirectTo: redirectTo() } });
  return { ok: true };                      // same non-disclosure rule
}

export async function verifyCode({ email, token }) {
  const sb = await client();
  if (!sb) return { ok: false, error: 'Accounts are not set up on this copy of the site.' };
  const { error } = await sb.auth.verifyOtp({
    email: String(email).trim(), token: String(token).trim(), type: 'email',
  });
  if (error) return { ok: false, error: friendlyError(error) };
  return { ok: true };
}

export async function updatePassword(password) {
  const sb = await client();
  if (!sb) return { ok: false, error: 'Accounts are not set up on this copy of the site.' };
  const { error } = await sb.auth.updateUser({ password });
  if (error) return { ok: false, error: friendlyError(error) };
  return { ok: true };
}

export async function updateProfile({ name, email }) {
  const sb = await client();
  if (!sb) return { ok: false, error: 'Accounts are not set up on this copy of the site.' };
  const patch = {};
  if (name != null) patch.data = { name: String(name).trim() };
  if (email && email !== current?.email) patch.email = String(email).trim();
  if (!Object.keys(patch).length) return { ok: true, unchanged: true };
  const { error } = await sb.auth.updateUser(patch);
  if (error) return { ok: false, error: friendlyError(error) };
  /* Changing an email sends a confirmation to BOTH addresses and does not take
     effect until the new one is clicked. */
  return { ok: true, emailPending: Boolean(patch.email) };
}

export async function logOut() {
  const sb = await client();
  stopSync();
  if (sb) await sb.auth.signOut();
  current = null;
  emit();
  return { ok: true };
}

/* ---- password rules -------------------------------------------------------
   Length is the requirement that actually matters; the character classes are
   there because students are used to seeing them and their absence reads as a
   site that is not taking it seriously. Checked live in the modal so the rules
   are visible while typing rather than announced on submit. */
export function passwordChecks(pw = '') {
  return [
    { ok: pw.length >= 8,                            label: 'at least 8 characters' },
    { ok: /[a-z]/.test(pw) && /[A-Z]/.test(pw),      label: 'upper and lower case' },
    { ok: /\d/.test(pw),                              label: 'a number' },
  ];
}
export const passwordOk = (pw) => passwordChecks(pw).every(c => c.ok);

/* ---- delete account -------------------------------------------------------
   Two halves, and the order matters. The row goes first: while the session is
   still valid, RLS lets the student delete their OWN row, which is the data
   that actually matters. Removing the auth user itself needs admin rights the
   browser correctly does not have, so that half is a request rather than an
   action — see SETUP-AUTH.md for the one function that completes it.

   Deleting the cloud copy does NOT touch this browser. Somebody removing their
   account should not also lose the notes on the machine in front of them. */
export async function deleteAccountData() {
  const sb = await client();
  if (!sb || !current) return { ok: false, error: 'Not signed in.' };
  const { error } = await sb.from('user_data').delete().eq('user_id', current.id);
  if (error) return { ok: false, error: friendlyError(error) };
  stopSync();
  return { ok: true };
}
