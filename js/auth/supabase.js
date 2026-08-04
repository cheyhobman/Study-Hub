/* ============================================================================
   auth/supabase.js: the Supabase client, loaded only if the site is configured.
   ----------------------------------------------------------------------------
   The library is imported dynamically from a CDN the first time anything needs
   it. Two reasons:

     • an unconfigured copy (no keys in config.js) never downloads it at all, so
       the site stays exactly as fast as it was before accounts existed;
     • it keeps the "no build step" promise. There is no npm install and no
       bundler here, and adding one for a single dependency would change how the
       whole project is developed and deployed.

   If the CDN is unreachable the import rejects, `client()` returns null, and
   every caller falls back to local-only mode rather than throwing. Being
   offline should cost you your account, not your study notes.
   ========================================================================== */
import { SUPABASE_URL, SUPABASE_ANON_KEY, authConfigured } from './config.js';

const CDN = 'https://esm.sh/@supabase/supabase-js@2';

let clientPromise = null;

/** The shared Supabase client, or null when the site has no keys. */
export async function client() {
  if (!authConfigured()) return null;
  if (!clientPromise) {
    clientPromise = import(/* @vite-ignore */ CDN)
      .then(({ createClient }) => createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
        auth: {
          /* Sessions persist in localStorage and refresh themselves. Supabase
             issues a short-lived access token plus a refresh token; the library
             rotates them, so a login survives a reload without us ever handling
             a raw credential. */
          persistSession: true,
          autoRefreshToken: true,
          /* Needed so the tokens in a magic-link / OAuth redirect are read out
             of the URL and then cleaned off it. */
          detectSessionInUrl: true,
        },
      }))
      .catch((e) => {
        console.error('Supabase failed to load; running local-only.', e);
        return null;
      });
  }
  return clientPromise;
}

/* ---- error messages -------------------------------------------------------
   Provider errors are written for developers and occasionally leak more than
   they should. Everything shown to a student goes through here first.

   ⚠️ The password-reset and sign-up paths deliberately DO NOT tell you whether
   an email address exists. "No user found" would turn the reset form into a
   tool for checking whether a classmate has an account. */
const FRIENDLY = [
  [/invalid login credentials/i, 'That email and password do not match. Check both and try again.'],
  [/email not confirmed/i,       'Check your email and click the verification link before logging in.'],
  [/user already registered/i,   'There is already an account with that email. Try logging in instead.'],
  [/password should be at least/i, 'That password is too short.'],
  [/rate limit|too many requests/i, 'Too many attempts. Wait a minute and try again.'],
  [/network|fetch/i,             'Could not reach the server. Check your connection and try again.'],
  [/token has expired|expired/i, 'That link or code has expired. Request a new one.'],
];

export function friendlyError(err) {
  const msg = String((err && (err.message || err.error_description)) || err || '');
  for (const [re, out] of FRIENDLY) if (re.test(msg)) return out;
  /* Anything unrecognised is deliberately vague: an unfiltered provider string
     is the most likely place for something sensitive to escape. */
  return 'Something went wrong. Please try again.';
}
