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
   into the export/backup file, and students reuse passwords. The field exists
   so the form layout is right when a real auth provider is wired in later.

   YEAR AND LEVEL are not asked for. Everyone using this is a Year 13 student
   sitting NCEA Level 3, so asking is a question with one answer. The values
   still live in data/profile.js and can be overridden in code if that ever
   stops being true.
   ========================================================================== */
import { store } from '../store.js';
import { pageHead } from './common.js';
import { toast, esc } from '../ui.js';

/* Cheap client-side sanity checks. Deliberately permissive: this is a study
   planner, not a bank, and a student typing a school email with an unusual
   domain should not be blocked by a clever regex. */
const looksLikeEmail = (v) => !v || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());

function passwordNotes(pw) {
  const checks = [
    { ok: pw.length >= 8,          label: 'at least 8 characters' },
    { ok: /[a-z]/.test(pw) && /[A-Z]/.test(pw), label: 'upper and lower case' },
    { ok: /\d/.test(pw),           label: 'a number' },
  ];
  return checks;
}

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
            <em class="xs muted">optional, used only to label a backup file</em></span>
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
        <a href="#/progress" data-link>Progress and credits</a>.</p>
      <div class="course-facts">
        <div><span class="cf-label">Year level</span><span class="cf-val">Year 13</span></div>
        <div><span class="cf-label">Qualification</span><span class="cf-val">${esc(p.level || 'NCEA Level 3')}</span></div>
        <div><span class="cf-label">Year</span><span class="cf-val">${esc(String(p.year || ''))}</span></div>
      </div>
    </div>

    <h2 class="mt-5 mb-3">Sign in</h2>
    <div class="callout callout-note mb-4"><div class="co-icon">i</div><div class="co-body">
      <h4>Not switched on yet</h4>
      <p>There are no accounts on this site today. Your progress, subjects and internals live in
        <strong>this browser</strong>, which means they do not follow you to your phone and they
        disappear if you clear site data. The form below is the shape a future sign-in will take,
        so nothing has to be redesigned when it arrives.</p>
      <p class="xs muted">Nothing you type here is saved. Passwords in particular are never written
        to this device, not even scrambled.</p>
    </div></div>

    <form class="card mb-5" id="acct-signin" novalidate aria-describedby="acct-signin-note">
      <div class="grid-2">
        <label class="field" style="grid-column:1/-1"><span>Email address</span>
          <input type="email" name="email" placeholder="you@school.nz" autocomplete="username"></label>
        <label class="field"><span>Create a password</span>
          <input type="password" name="pw" autocomplete="new-password"></label>
        <label class="field"><span>Confirm password</span>
          <input type="password" name="pw2" autocomplete="new-password"></label>
      </div>
      <ul class="pw-checks" id="pw-checks" aria-live="polite">
        ${passwordNotes('').map(c => `<li data-ok="false">${c.label}</li>`).join('')}
      </ul>
      <p class="int-error hidden" id="signin-error" role="alert"></p>
      <div class="flex gap-3 mt-4 wrap items-center">
        <button class="btn btn-primary btn-sm" type="submit" disabled>Create account</button>
        <span class="xs muted" id="acct-signin-note">Disabled until accounts are switched on.</span>
      </div>
    </form>

    <div class="card">
      <h3 class="mb-3">Your data</h3>
      <p class="muted small mb-3">Because everything is stored in this browser, a backup is the only
        way to move to another device or recover from clearing site data.</p>
      <button class="btn btn-ghost btn-sm" disabled title="Coming once accounts are switched on">Backup and restore</button>
      <p class="xs muted mt-3">Not wired up yet. It will land alongside sign-in.</p>
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

      /* ---- sign-in: validates, stores nothing ---- */
      const si = document.getElementById('acct-signin');
      const sierr = document.getElementById('signin-error');
      const list = document.getElementById('pw-checks');

      const paintChecks = () => {
        const notes = passwordNotes(si.pw.value);
        [...list.children].forEach((li, i) => li.dataset.ok = String(notes[i].ok));
      };
      si?.pw.addEventListener('input', paintChecks);

      si?.addEventListener('submit', (e) => {
        e.preventDefault();
        sierr.classList.remove('hidden');
        sierr.textContent = 'Accounts are not switched on yet, so nothing was created and nothing was saved.';
      });
    },
  };
}
