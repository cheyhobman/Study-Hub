/* ============================================================================
   auth/config.js: YOUR Supabase project keys. Edit this file, nothing else.
   ----------------------------------------------------------------------------
   👉 SETUP-AUTH.md has the step-by-step. The short version:

     1. supabase.com → New project (free tier, region: Oceania (Sydney))
     2. The "Connect" button at the top of the dashboard shows both values at
        once. Otherwise: Settings → API Keys for the key, and the Project URL is
        always https://<ref>.supabase.co where <ref> is the string in your
        dashboard address bar (.../dashboard/project/<ref>).
     3. Paste them into the two blanks below.

   WHICH KEY: Supabase changed formats during 2026, so you may see either pair.
   Both work here.
       take:  sb_publishable_...   or the legacy  anon / public  (starts eyJ)
       never: sb_secret_...        or the legacy  service_role

   ⚠️ THE PUBLISHABLE KEY IS MEANT TO BE PUBLIC. It goes in client-side code on purpose
   and is visible to anyone who views source. It is not a secret and it is not a
   password. What actually protects the data is Row Level Security in Postgres:
   every row carries a user_id, and the policies in SETUP-AUTH.md let a request
   touch a row only when that user_id matches the signed-in user's own id. Even
   with the anon key, one student cannot read another's results.

   ⛔ NEVER put a SECRET key here (`sb_secret_...` or `service_role`). Those
   bypass RLS entirely and belong only on a server, in an environment variable.
   They sit on the same settings page as the publishable key, which is exactly
   why people paste the wrong one. If a key is labelled "secret" or
   "service_role", it does not go in this file.

   Leave the blanks empty and the site runs exactly as it does today: everything
   saves to this browser only and the Sign up / Log in buttons are hidden. That
   is the intended fallback, not a broken state.
   ========================================================================== */

export const SUPABASE_URL  = 'https://wbcokcappsrgxczimwed.supabase.co';      /* e.g. 'https://abcdefgh.supabase.co' */
export const SUPABASE_ANON_KEY = 'sb_publishable_P5v0vMsvRi5DjrPGdls0kQ_60D7KTvk';  /* e.g. 'sb_publishable_...' or 'eyJhbGciOiJI...' */

/** Is the site wired to a backend at all? Everything auth-related checks this
    first, so an unconfigured copy degrades to local-only rather than erroring. */
export const authConfigured = () => {
  const url = String(SUPABASE_URL || '').trim();
  const key = String(SUPABASE_ANON_KEY || '').trim();
  if (!url || !key) return false;

  /* Loud, early warnings for the two mistakes that otherwise present as
     "accounts just don't work" with nothing in the console to explain why. */
  if (/^sb_secret_|^service_role/i.test(key) || key.length > 20 && /secret/i.test(key)) {
    console.error('[auth] That looks like a SECRET key. Use the publishable / anon key '
                + 'instead: a secret key bypasses Row Level Security and must never be '
                + 'in browser code. Accounts are disabled until this is fixed.');
    return false;
  }
  if (!/^https:\/\//.test(url)) {
    console.error('[auth] SUPABASE_URL must start with https:// and look like '
                + 'https://yourref.supabase.co — accounts are disabled until it does.');
    return false;
  }
  return true;
};

/* Where Supabase should send people back to after they click a link in an email
   or finish signing in with Google. Derived from wherever the site is actually
   running, so localhost and studyhubnz.com both work with no extra config. */
export const redirectTo = () => `${location.origin}/account`;
