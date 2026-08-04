/* ============================================================================
   pages/account.js: your details, and the groundwork for sign-in.
   ----------------------------------------------------------------------------
   Two halves, deliberately separated:

     1. YOUR DETAILS. Live and working today. Name, school and contact email are
        saved to this device via store.profile(), which is what lets a visitor
        to the published site make the copy theirs without editing a file.

     2. SIGN-IN. Structure only. The fields are built and validated so the shape
        is settled, but nothing is stored and nothing authenticates. See
        PROFILES-PLAN.md for why: adding real accounts means a backend, and a
        backend means being responsible for other people's academic records.

   ⚠️ The password fields deliberately do NOT persist anything, not even
   hashed. Writing a password into localStorage would be worse than having no
   accounts at all: it is readable by any script on the origin, it would sync
   readable by any script on the origin, and students reuse passwords. The field exists
   so the form layout is right when a real auth provider is wired in later.

   YEAR AND LEVEL are not asked for. Everyone using this is a Year 13 student
   sitting NCEA Level 3, so asking is a question with one answer. The values
   still live in data/profile.js and can be overridden in code if that ever
   stops being true.
   ========================================================================== */
import { store } from '../store.js';
import { authConfigured } from '../auth/config.js';
import { signedIn, user, displayName, updateProfile, updatePassword,
         passwordChecks, passwordOk, logOut, syncNow } from '../auth/session.js';
import { openAuth } from '../auth/ui.js';
import { pageHead } from './common.js';
import { toast, esc } from '../ui.js';

/* Cheap client-side sanity checks. Deliberately permissive: this is a study
   planner, not a bank, and a student typing a school email with an unusual
   domain should not be blocked by a clever regex. */
const looksLikeEmail = (v) => !v || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());

/* Password rules live in js/auth/session.js so the modal, this page and the
   validator can never disagree about what a valid password is. */

export function renderAccount() {
  const p = store.profile();

  const html = `
  <div class="content-inner">
    ${pageHead({
      eyebrow: 'Account',
      title: 'Your details',
      lede: 'Everything here is stored on this device only. Nothing is uploaded, and nothing is shared.',
    })}

    <form class="card mb-5" id="acct-details" novalidate>
      <h3 class="mb-3">About you</h3>
      <div class="grid-2">
        <label class="field"><span>Name</span>
          <input name="name" value="${esc(p.name || '')}" placeholder="What you want to be called"
                 autocomplete="given-name"></label>
        <label class="field"><span>School</span>
          <input name="school" value="${esc(p.school || '')}" placeholder="Your school"
                 autocomplete="organization"></label>
        <label class="field" style="grid-column:1/-1"><span>Email
            <em class="xs muted">optional, stored on this device only</em></span>
          <input type="email" name="email" value="${esc(p.email || '')}"
                 placeholder="you@school.nz" autocomplete="email"></label>
      </div>
      <p class="int-error hidden" id="acct-error" role="alert"></p>
      <div class="flex gap-3 mt-4 wrap">
        <button class="btn btn-primary btn-sm" type="submit">Save details</button>
        ${store.hasOwnProfile()
          ? '<button class="btn btn-ghost btn-sm" type="button" id="acct-reset">Reset to default</button>' : ''}
      </div>
    </form>

    <div class="card mb-5">
      <h3 class="mb-3">Your course</h3>
      <p class="muted small">This site is built for <strong>Year 13, NCEA Level 3</strong>, so it does not
        ask. Your subjects come from your own record: add or remove them on
        <a href="/progress" data-link>Progress and credits</a>.</p>
      <div class="course-facts">
        <div><span class="cf-label">Year level</span><span class="cf-val">Year 13</span></div>
        <div><span class="cf-label">Qualification</span><span class="cf-val">${esc(p.level || 'NCEA Level 3')}</span></div>
        <div><span class="cf-label">Year</span><span class="cf-val">${esc(String(p.year || ''))}</span></div>
      </div>
    </div>

    <h2 class="mt-5 mb-3">Account</h2>
    ${(() => {
      if (!authConfigured()) return `
        <div class="callout callout-note mb-5"><div class="co-icon">i</div><div class="co-body">
          <h4>Accounts are not switched on for this copy</h4>
          <p>This copy of the site has no backend configured, so everything is saved in this
            browser only. See <code>SETUP-AUTH.md</code> if you want to connect one.</p>
        </div></div>`;

      const u = user();
      if (!u) return `
        <div class="card mb-5">
          <h3 class="mb-2">You are not logged in</h3>
          <p class="muted small mb-3">Everything you record is saved in this browser. Create an
            account and it follows you to any device, and your work here comes with it.</p>
          <div class="flex gap-3 wrap">
            <button class="btn btn-primary btn-sm" id="acct-open-signup">Create an account</button>
            <button class="btn btn-ghost btn-sm" id="acct-open-login">Log in</button>
          </div>
        </div>`;

      return `
        <form class="card mb-5" id="acct-account" novalidate>
          <h3 class="mb-3">Your account</h3>
          <div class="grid-2">
            <label class="field"><span>Name</span>
              <input name="name" value="${esc(displayName(u))}" autocomplete="name"></label>
            <label class="field"><span>Email</span>
              <input type="email" name="email" value="${esc(u.email || '')}" autocomplete="email"></label>
          </div>
          <p class="int-error hidden" id="acct-account-err" role="alert"></p>
          <p class="xs muted">Changing your email sends a confirmation to both addresses. It only
            takes effect once you click the link in the new one.</p>
          <div class="flex gap-3 mt-4 wrap">
            <button class="btn btn-primary btn-sm" type="submit">Save changes</button>
            <button class="btn btn-ghost btn-sm" type="button" id="acct-sync-now">Sync now</button>
            <button class="btn btn-ghost btn-sm" type="button" id="acct-logout">Log out</button>
          </div>
        </form>

        <form class="card mb-5" id="acct-pw" novalidate>
          <h3 class="mb-3">Change password</h3>
          <label class="field"><span>New password</span>
            <input type="password" name="password" autocomplete="new-password"></label>
          <ul class="pw-checks" id="acct-pw-checks" aria-live="polite">
            ${passwordChecks('').map(c => `<li data-ok="false">${c.label}</li>`).join('')}
          </ul>
          <p class="int-error hidden" id="acct-pw-err" role="alert"></p>
          <button class="btn btn-primary btn-sm" type="submit">Update password</button>
        </form>`;
    })()}

    <div class="card">
      <h3 class="mb-3">Your data</h3>
      <p class="muted small">Everything you record, your results, deadlines, flashcard boxes and
        streak, is stored in <strong>this browser on this device</strong>. It is never uploaded and
        never shared.</p>
      <p class="muted small mt-3">There is <strong>no download or export</strong>. Results are your own
        academic record, so nothing here produces a file of them that could be passed on or opened
        somewhere else. Anyone using their own copy enters their own results.</p>
      <p class="xs muted mt-3">Clearing your browsing data for this site erases everything, and it
        cannot be recovered.</p>
    </div>
  </div>`;

  return {
    html,
    onMount() {
      /* ---- details: live and saving ---- */
      const form = document.getElementById('acct-details');
      const err = document.getElementById('acct-error');
      const fail = (msg) => { err.textContent = msg; err.classList.remove('hidden'); };

      form?.addEventListener('submit', (e) => {
        e.preventDefault();
        err.classList.add('hidden');
        const email = form.email.value.trim();
        if (!looksLikeEmail(email)) return fail('That email address does not look right. Leave it blank if you would rather not give one.');
        store.setProfile({
          name: form.name.value.trim(),
          school: form.school.value.trim(),
          email,
        });
        toast('Details saved');
      });

      document.getElementById('acct-reset')?.addEventListener('click', () => {
        if (!confirm('Reset your name, school and email back to the defaults?')) return;
        store.resetProfile();
        toast('Reset to the default details');
        const v = renderAccount();
        document.getElementById('content').innerHTML = v.html;
        v.onMount();
      });

      /* ---- account: real, when a backend is configured ---- */
      const rerender = () => {
        const v = renderAccount();
        document.getElementById('content').innerHTML = v.html;
        v.onMount();
      };

      document.getElementById('acct-open-signup')?.addEventListener('click', () => openAuth('signup'));
      document.getElementById('acct-open-login')?.addEventListener('click', () => openAuth('login'));

      document.getElementById('acct-logout')?.addEventListener('click', async () => {
        await logOut();
        toast('Logged out. Your work stays on this device.');
        rerender();
      });

      document.getElementById('acct-sync-now')?.addEventListener('click', async (e) => {
        e.target.disabled = true;
        const res = await syncNow();
        e.target.disabled = false;
        toast(res.ok ? 'Saved to your account'
                     : 'Could not sync. Your work is still saved on this device.');
      });

      const accForm = document.getElementById('acct-account');
      const accErr = document.getElementById('acct-account-err');
      accForm?.addEventListener('submit', async (e) => {
        e.preventDefault();
        accErr.classList.add('hidden');
        const name = accForm.name.value.trim();
        const email = accForm.email.value.trim();
        if (!looksLikeEmail(email) || !email) {
          accErr.textContent = 'That email address does not look right.';
          accErr.classList.remove('hidden');
          return;
        }
        const btn = accForm.querySelector('button[type=submit]');
        btn.disabled = true;
        const res = await updateProfile({ name, email });
        btn.disabled = false;
        if (!res.ok) {
          accErr.textContent = res.error;
          accErr.classList.remove('hidden');
          return;
        }
        /* Keep the local profile in step so the dashboard greeting updates
           without waiting for a round trip. */
        store.setProfile({ ...store.profile(), name });
        toast(res.emailPending
          ? 'Saved. Check your new email to confirm the change.'
          : 'Account updated');
      });

      const pwForm = document.getElementById('acct-pw');
      const pwErr = document.getElementById('acct-pw-err');
      const pwList = document.getElementById('acct-pw-checks');
      if (pwForm && pwList) {
        pwForm.password.addEventListener('input', () => {
          const checks = passwordChecks(pwForm.password.value);
          [...pwList.children].forEach((li, i) => { li.dataset.ok = String(checks[i].ok); });
        });
        pwForm.addEventListener('submit', async (e) => {
          e.preventDefault();
          pwErr.classList.add('hidden');
          const pw = pwForm.password.value;
          if (!passwordOk(pw)) {
            pwErr.textContent = 'Your password does not meet the requirements above yet.';
            pwErr.classList.remove('hidden');
            return;
          }
          const btn = pwForm.querySelector('button[type=submit]');
          btn.disabled = true;
          const res = await updatePassword(pw);
          btn.disabled = false;
          if (!res.ok) {
            pwErr.textContent = res.error;
            pwErr.classList.remove('hidden');
            return;
          }
          pwForm.reset();
          [...pwList.children].forEach(li => { li.dataset.ok = 'false'; });
          toast('Password updated');
        });
      }
    },
  };
}
