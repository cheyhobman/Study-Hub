# Changelog

Written for GitHub. Newest first.

---

## Accounts, exam data and a pile of fixes

**Real user accounts.** Sign up, email verification, log in, password reset and
Google sign-in, backed by Supabase. Results, subjects and settings sync to the
account so they follow you between devices; signed out, the site works exactly
as before on local storage. Row Level Security means a row can only ever be read
by the account that owns it. Setup lives in `SETUP-AUTH.md`; without keys the
site runs local-only and the auth buttons stay hidden.

**Every subject has real exam dates.** All 24 catalogue subjects now carry their
2026 NZQA external and Wellington College derived-grade sittings, up from 6.
A sitting only appears if you hold an un-removed external in that subject.

**One source of truth for assessments** (`js/assessments.js`). Five views were
each deriving "what have I got" separately and disagreeing; they are all filters
over one derivation now.

**Clean URLs.** History routing, so `/progress` not `/#/progress`. Host configs
for Vercel, Netlify and GitHub Pages ship with the repo.

**Blank slate for new users.** `data/results.js` is course structure only; one
student's grades moved to `data/my-record.js`, loaded on request.

**ATAR corrected.** Quality is divided by the full 90 credits rather than by
credits held, so 60 Excellence credits no longer scores the same as 90.

**Fixes:** reset on Progress cleared credits but left the planner behind, which
made re-adding look like a duplicate; the standards library rebuilt a ~100-entry
Set once per catalogue standard (175 times per paint); added subjects showed as
lowercase ids like `aghort`; mobile grid tracks were wider than a phone; delete
crosses were 20px on touch.

**Other:** skeleton loading across every view including first paint, school
holidays and study leave on the calendar, subject deletion from Progress,
rotating dashboard greetings, favourite-star for goals and colour themes,
credits shown as fixed NZQA values rather than editable fields, and destructive
confirmations moved from browser dialogs to the site's own.

---

## Design pass: six changes from DESIGN-NOTES.md

**The dashboard hero is now a year bar.** It used to be a greeting, a blurb and
three stats in a row — the answer any dashboard would give, saying nothing about
NCEA. It now draws the one thing only this site can: the shape of your year.
Terms, both holiday blocks, study leave and every assessment you are carrying,
on one band, with today marked. Colour is the subject, shape is the kind,
internals hang below the band and exams sit above it. Every value comes from
data the site already holds (`data/planner.js`, `data/exams.js`, the planner),
so it cannot disagree with the calendar. Inline SVG on a 0–100 viewBox, so x
positions are literally percentages of the year and it reflows with no JS.

**Display figures moved to Newsreader.** The display face was doing almost
nothing — page titles and little else — while the numbers a student opens the
site to look at all sat on Inter. The hero caption, donut centre, goal figure,
stat tiles and snapshot are now Newsreader. Everything inside `table.data` stays
on Inter, where tabular numerals have to line up down a column. That split is
deliberate.

**One channel per fact.** A dashboard row carried four encodings for two facts:
subject dot, status pill, due pill, and a kind style on the calendar. Now
subject is colour, kind is shape (filled / dashed / solid, the language the
calendar already used), and urgency is the due pill — which only earns colour
when something is due today or overdue. The status pill is gone; What's coming
excludes submitted and graded work, so it could only ever have read "not
started" or "in progress", which is now plain text in the sub-line.

**Subject names, not class codes.** The credit table was headed `13CHE` while
every other page said *Chemistry*. Name first, code secondary.

**A real first run.** A fresh copy showed a full table of blank dropdowns under
"0 / 60 banked" and "148 still to sit" — correct, and a wall of failure. An
untouched record now collapses the page to one question, "Which subjects are you
taking?", and the picker. The stat row, donut, goal and table appear the moment
there is something to put in them.

**The hero gradient is gone.** Green-on-green with a light bloom in the corner
was the one generic surface on an otherwise disciplined site, and it competed
with the year bar for the same space. Flat `--brand-deep`; the bar is the
ornament.

---

## Exam timetables for every subject

**All 24 catalogue subjects now have real exam dates**, transcribed from the
official 2026 NZQA Examination Timetable and Wellington College's 2026 CAA &
Derived Grade sheet. Previously only the six taught subjects had sittings, so
adding, say, Economics gave you the credits but no exam anywhere on the site.

- `data/exams.js` — 6 → 26 external sittings, 6 → 26 derived-grade sittings.
  The six that already existed were checked against the official timetable and
  were all correct; nothing was changed.
- `js/assessments.js` — `SUBJECT_OF_GROUP` extended from 8 to 31 class codes.
  This was the actual blocker: a catalogue subject resolved to a blank subject
  id, so it could never be matched to a sitting and silently had no exams.
- Visual Arts and DVC are marked `PORTFOLIO_SUBJECTS`. Their externals are
  submitted folios with no NZQA exam, so the timetable now says
  "submitted, not sat" rather than implying a missing date.

**A sitting only ever appears if you hold at least one un-removed external in
that subject.** Verified: adding one Economics external surfaces both its
sittings and puts them in What's coming; adding an internal-only subject (PE)
surfaces nothing; removing the external again clears both.

---

## Assessments: one source of truth

Five views each derived "what assessments do I have" separately, and disagreed
constantly. Deleting a standard on Progress left it on the calendar; grading an
internal left it in the planner; a subject added from the catalogue never gained
its exam sittings. All one bug: five copies of one derivation.

- **New `js/assessments.js`** holds the derivation. Every view is now a filter
  over it, so the views cannot drift apart.
- Externals appear on the Assessments page for the first time.
- Grading a row keeps it visible for the rest of that page session and it
  disappears on navigation, rather than vanishing under the cursor.
- Externals stay on the calendar, What's coming and the timetable once graded —
  the exam date is a fact about your year.

---

## Clean URLs

Routing is history-based: `studyhubnz.com/progress`, not
`studyhubnz.com/#/progress`.

- `vercel.json` — rewrites every non-asset path to `/index.html` (**this is the
  one that matters for deployment**).
- `_redirects` (Netlify) and `404.html` (GitHub Pages) ship too, so the site can
  change hosts without breaking.
- `serve.py` got a matching SPA fallback so local testing behaves like production.
- Old `#/...` links are rewritten to the clean path once, in place, so anything
  bookmarked or shared still works.

⚠️ Clean URLs need the app at the domain root. A GitHub Pages *project* path
(`/Study-Hub/`) will not work; use the custom domain.

---

## A blank slate for new users

`data/results.js` mixed the course structure with one student's grades, so
anyone opening the site saw someone else's record.

- `data/results.js` is now **structure only**: which standards exist, what
  they're worth, internal or external. Every credit starts blank.
- `data/my-record.js` holds the personal results, applied only when you click
  "Load that record". Empty this file before handing the site to someone else.
- `data/profile.js` ships with a blank name; the greeting falls back to neutral.

---

## Backup and restore

The site is in beta and everything lives in one browser, so an update can take a
whole record with it.

- Dashboard nudge with Download / Restore, dismissible (7-day snooze; 14 days
  after a backup). It reuses the Study Tools handler rather than duplicating it.
- The export takes the whole `ncea.` namespace rather than a whitelist, so it
  cannot silently miss a new feature. Round trip verified byte-identical.

---

## ATAR model corrections

- **Quality is divided by the full 90 credits, never by what you hold.** It was
  dividing by credits held, so 60 Excellence credits scored the same 99.95 as a
  full 90. A friend's 60-credit programme now lands at ~74.65.
- The estimate keeps calculating below 60 credits (with a caveat) instead of
  going blank.
- Four scaling tiers instead of three: maths/sciences/English at the top on
  their own, humanities and languages one tier below, arts and technology at
  baseline, PE and Health lowest.

---

## Smaller changes

- **Skeleton loading** across every view, built from the real card/grid/table
  containers and measured against the real components, cutting layout jump from
  103–244px to 16–27px. Only shown after 140ms so cached pages never flash.
- **School holidays and study leave** on the calendar. Term 2's end date was
  corrected from 26 Jun to 3 Jul (the holidays start 4 Jul). Study leave is
  estimated: end derived from the real exam timetable, start assumes senior
  classes finish 30 Oct — change `SENIOR_LAST_DAY` if the school says otherwise.
- **Delete a whole subject** from Progress, via a cross that appears on hover.
  Removal propagates everywhere.
- **English restructure**: 3.5 / 3.6 / 3.8 are defaults now; the duplicate
  "English: other standards" catalogue entry is gone.
- **Rotating welcome messages**: three time windows, three messages each, with
  and without a name.
- **Mobile overflow fixed** in What's coming. `minmax(310px, 1fr)` forced a grid
  track wider than a phone; it is `minmax(min(310px, 100%), 1fr)` now, and the
  same fix was applied to every other auto-fill grid on the site.
- "Add a standard by hand" removed; "Reset to my NZQA record" renamed
  **"Reset to blank"**, which is what it actually does.
- No export of results data existed for one release; it is back by request, as
  the backup feature above.
