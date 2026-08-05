# Where we got to

Written at the end of a session that was **part-way through a QA pass**. The
tree is in a clean, verified state — nothing is half-edited — but the QA pass
itself is not finished. Pick up from "Where to resume" below.

---

## State of the tree right now

- **13 routes clean** on desktop at 1280px: no console errors or warnings, no
  404s, no horizontal overflow.
- **No syntax problems** anywhere (backtick / brace / bracket parity checked
  across every `.js`).
- **No test residue**: no temporary stubs, no injected keys, no `console.log`.
- `js/auth/config.js` holds the real Supabase project keys (publishable — safe).
- `index.html` and `404.html` are in sync.
- Everything synced to `~/Desktop/ncea-study-hub/`.

---

## Done this session

### Fixes
- **Deep-link reload was fatal.** `index.html` used *relative* asset paths, so
  at `/subject/chemistry` the browser asked for `/subject/css/styles.css` → 404
  → no CSS, no JS, dead page. All asset paths are root-absolute now. This was
  the "site breaks on reload" bug.
- **Reset to blank looked destructive.** After a reset the page dropped into
  first-run mode, hiding the credit table and offering a picker that does not
  contain the six taught subjects — so they appeared deleted and unrecoverable.
  Root cause: "first run" was inferred from a state a reset also produces. Now
  gated on an explicit `progress.used` flag.
- **Modal could be invisible.** Visibility depended on a CSS *transition*
  completing; if it never ran you got an invisible dialog over a scroll-locked
  page. Now animates *from* hidden via a keyframe, so visible is the resting
  state.
- **`device_label` could break syncing.** Both push and pull referenced a column
  that may not exist. Now optional: detects the missing-column error once,
  retries without it, and the account page says so.

### Added
- Delete account data (cloud only; the local copy survives).
- Device label on syncs ("Mac · Chrome"), nothing identifying.
- Conflict recovery: the copy displaced by a sync is stashed and offered for
  download rather than silently destroyed.
- Route-aware first-paint skeleton (inline script, dependency-free).

### Removed (verified unused first)
- `syncNow()` — superseded by automatic sync plus the status line.
- `lastSyncedAt()` — superseded by the sync status stream.
- `deviceId()` and its storage — written, never read.

---

## Where to resume: the QA pass

The user asked for a full quality pass over the last day's work. **Sections 1, 2,
3 and 5 are largely done. Section 4 (visual polish) and 6 (performance) are
not.**

### Confirmed working (tested end to end, not just read)
| Area | Result |
|---|---|
| Empty / first-time user | 36 assessments, all blank, no internals, name empty |
| Loaded record + extras | 41 assessments, 11 internals, Economics dates propagate |
| Subject deletion | removes from assessments, externals, derived, What's coming, planner |
| Backup round trip | byte-identical; includes `hiddenstds`, `progress.used`, `personalrecord`; excludes `lastwrite` and `conflictcopy` |
| English restructure | 9 standards under one entry, zero duplicate catalogue entries |
| Welcome rotation | 3 windows × 3 messages, seed uses `+` not `*` |
| Reset to blank | table survives, 41 rows, credits read-only, subject names not codes |
| Assessments page | internals only, X uses the shared `.x-btn` animation |
| Console | zero errors or warnings across 13 routes |

### KNOWN ISSUE, found but not yet fixed
**Skeleton stat tiles are 87px; the real ones are 146px.** The real tile has
three lines (number, label, sub-label) and the skeleton only mocks two. This is
exactly the "shape doesn't match" complaint. One-line fix — give
`.sk-tile-real` a `min-height: 146px` and add a third bar — but it was not
applied before the session ended, so it is unverified. **Do this first.**

### Not yet done
1. **Visual polish sweep (section 4).** Spacing, alignment, hover states and
   animation smoothness across every page touched. Only the skeleton fidelity
   and focus rings were checked.
2. **Mobile pass** for this round's changes at 390px.
3. **Performance sanity check (section 6).** Nothing measured since the store
   read-cache work.
4. **Logged-in cross-feature test:** delete a subject while signed in, log out,
   log back in, confirm the deletion persisted. Needs a live session; the
   local half is verified but the round trip is not.

### Checked and deliberately NOT changed
- **Focus rings.** A global `:focus-visible` rule (styles.css:349 and :1267)
  already covers every interactive element including `.acct-item` and
  `.btn-danger`. An earlier probe suggested gaps; that probe was wrong —
  `.focus()` does not trigger `:focus-visible`, keyboard interaction does.
- **Two `createObjectURL` download paths** (`commandwords.js`, `account.js`).
  Both deliberate: the beta backup, and downloading your own displaced copy.

---

## Still outstanding for the user

1. **Optional:** add the `device_label` column, or don't — syncing works either
   way now:
   ```sql
   alter table public.user_data add column if not exists device_label text;
   ```
2. **Vercel Deployment Protection is still ON.** `study-hub-coder-chey.vercel.app`
   serves `<title>Login – Vercel</title>` for every path. Settings → Deployment
   Protection → Vercel Authentication → Disabled.
3. **`studyhubnz.com` points at `198.135.184.22`**, which is not Vercel and does
   not respond. Add the domain in Vercel → Settings → Domains and use the exact
   records it gives (the CNAME target is per-project now).
4. **The GitHub repo is public and its history contains the real NZQA record.**
   Making it private is worth doing regardless.
