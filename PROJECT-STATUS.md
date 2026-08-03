# NCEA L3 Study Hub — build status

_Last updated: 2 August 2026 — all six phases complete._

Run locally with the no-cache server (browsers aggressively cache ES modules):

```bash
python3 serve.py 8280
```

---

## Phase status

| Phase | Scope | State |
|---|---|---|
| 1 | Math/chemistry notation through KaTeX | Complete |
| 2 | Animation + UX polish, menu button fix, search rebuild | Complete |
| 3 | Flashcard & question quality overhaul | Complete |
| 4 | Internal deadline planner + "What's due next" | Complete |
| 5 | Revision session mode | Complete |
| 6 | Final full-site review | **Complete** |

---

## Content totals

592 flashcards · 301 practice questions · 121 rendered fractions · 188 KaTeX expressions.

| Subject | Flashcards | Questions |
|---|---:|---:|
| Chemistry | 224 | 85 |
| Physics | 97 | 50 |
| Biology | 78 | 51 |
| Calculus | 66 | 41 |
| Statistics | 65 | 40 |
| English | 62 | 34 |

---

## Verified in the final review

- **Navigation** — 52 routes + 51 discovered internal links, zero 404s, zero console errors.
  No trace of removed content (Scholarship Physics, Statistics 91581 as a study topic).
- **NZQA past papers** — the URL pattern is live; all 17 externals that render paper
  tables were checked and return HTTP 200. Internals correctly render no table.
- **Maths** — 32 maths pages, zero KaTeX errors, zero unrendered expressions.
- **Responsive** — zero horizontal overflow across all 45 content pages at 375 px.
- **Fresh browser** — with localStorage empty, all 52 routes render with no crash.
- **Performance** — dashboard 67 ms DOMContentLoaded / 327 KB / 4 data files;
  heaviest topic page (Chemistry organic, 59 cards) 128 ms / 538 KB / 1050 nodes /
  8 MB heap. Content is lazy-loaded per subject; no images anywhere.

---

## Known placeholders — YOU need to fill/verify these

1. **YouTube videos are search links, not specific videos.** Every `video:` block
   builds a YouTube *search URL* (`ui.js → ytSearch`). This is deliberate — a
   hard-coded video id goes dead — but it means you pick the video each time. If you
   find ones you like, replace them with real URLs.
2. **42 external links are flagged `verify: true`** in the content files. They point at
   NZQA subject pages that change layout periodically. Worth a spot-check each term.
3. **2027 exam dates.** `data/exams.js` holds the real 2026 timetable. When NZQA
   publishes the 2027 timetable, update it there. Past-paper year ranges now roll
   forward automatically (`ui.js → recentExamYears`), so those need no maintenance.
4. **Term dates are generic NZ state-school dates** (`data/planner.js → TERMS_2026`).
   Check them against Wellington College's actual calendar — they only affect where
   "Term 3, Week 4" style rough deadlines sort.
5. **Credit values and grades** in `data/results.js` were transcribed from your NZQA
   Record of Learning screenshots. Worth one read-through against the real record,
   especially the two `pending` results (Chemistry 3.1, Physics 3.1).

---

## Recommended later, deliberately NOT done now

- **`js/pages/progress.js` is 630 lines** and the only file over 600. It mixes the
  credit table, donut, stacked bars, rank-score and ATAR modelling, and the goal
  picker. Splitting the ATAR/rank maths into `js/scoring.js` would help, but it is
  the most intricately tested logic on the site and a refactor this late risks
  breaking correct calculations for no user-visible gain.
- **Comment density in the larger page modules is 3–4%.** Fine for the top-of-file
  contracts, thinner inside the long render functions. Worth adding as you touch them.

---

---

## Dashboard & nav restructure (2 Aug 2026) — COMPLETE

**Unified "What's coming"**
- New `js/deadlines.js` merges internals + derived exams + externals into one
  date-ordered list. Previously the dashboard showed externals ONLY, so the
  September derived exams — the nearest assessments of the year — appeared
  nowhere on the home page.
- `js/pages/home.js` rewritten. The old externals-only countdown card and the
  "What's due next" strip were near-duplicates answering the same question;
  they are now a single filterable timeline (All / Internals / Derived /
  Externals), with the choice persisted via `store.dueFilter()`.
- Hero headline now counts down to the nearest assessment of ANY kind. It read
  "101 days to next exam"; it now reads "39 days to derived grade exam".
- Undated internals get their own "add dates →" line instead of being silently
  dropped from the list.
- Dashboard went from 6 blocks to 4: hero → what's coming → snapshot → subjects.
  Streak / flagged / reviewed % / weakest topics are now one combined card.

**Nav consolidated to 5 items**
1. Dashboard · 2. Revision session · 3. Exams & deadlines · 4. Progress & credits
· 5. Study tools  (+ the 6 subjects below).

Four pages now sit under two grouped items via a shared `sectionTabs()` helper
(`js/pages/common.js`, `NAV_GROUPS`):
- **Exams & deadlines** → My internals · Exam timetable
- **Study tools** → Command words · Flagged for review

The tabs are REAL LINKS to the existing routes, not JS-switched panes. That
keeps deep links and the back button working, means every old `#/internals`,
`#/flagged` etc. link across the site still resolves, and lets My Internals
re-render itself (add/edit/delete) without destroying the tab bar around it.
`router.js` maps those four routes to the group's `navKey` so the right sidebar
item highlights.

**Verified after the change:** all 52 routes render, every page highlights a nav
item, zero console errors, zero KaTeX errors, all pages still scroll to top, no
horizontal overflow at 375 px, and the internals form survives its own re-render
with tabs intact.

## Question-bank quality audit (2 Aug 2026) — COMPLETE

**Problem:** some items tested assessment structure ("What should the conclusion
of a 91602 report do?", "The A/M/E descriptor words", "The TEEL paragraph")
rather than subject content. Separately, the Phase 3 expansion had created real
DUPLICATES — terse cue cards that a later ⚖️ discrimination card covered better.

**Changes**
- **22 assessment-structure items rewritten** as subject-content questions.
  Worst offenders were English (12) and Biology 91602/91603 (7).
- **5 borderline items reworded** rather than replaced — titration uncertainty,
  u-substitution choice and integral-checking ARE real content, they were just
  framed as exam technique or had fronts that didn't signal the answer form.
- **21 duplicate cards removed** where a later card strictly dominated. Concept
  coverage is unchanged: the surviving card covers the same ground better.
- Verified: 0 assessment-structure question fronts remain site-wide.

**Counts:** flashcards 592 → 570, quiz 301 → 301 (all quiz changes were 1-for-1
replacements). The 22-card drop is entirely de-duplication, not lost coverage.

## Revision-session scope for finished internals — COMPLETE

New `js/revision-scope.js`. Every internal topic declares `stillExaminedIn: [...]`
in its content file, listing standards whose EXAM draws on the same material.

Three outcomes per topic:
- `normal` — not an internal, or the internal is not finished
- `deprioritised` — internal done, but content still examined elsewhere →
  kept at ×0.25 weight
- `excluded` — internal done and nothing else examines it → dropped entirely

"Finished" is read in priority order: planner status (submitted/graded) →
credit-record override → the NZQA record baseline. The planner wins, so your own
setting always overrides a stale record.

Verified against the real record: Chemistry 3.1 and 3.7 → deprioritised (still
examined in 91392 / 91390+91391); Physics 3.1 → excluded (practical method is
not externally examined). Marking Chemistry 3.2 graded flips spectroscopy to
deprioritised (overlaps organic), while Physics 3.5 flips to excluded. The
session summary names any skipped topics.

## Flashcard/question front clarity pass (2 Aug 2026) — COMPLETE

Every one of the 870 flashcard and quiz fronts was checked against a single
test: does the front make clear what FORM of answer is expected?

**113 fronts rewritten** (answers untouched). Patterns:
- Bare formula names → `State the...` / `Write the formula for...`
  ("Centripetal force" → "Write the formula for centripetal force")
- Bare expressions → an explicit instruction
  ("d/dx (sin x)" → "Differentiate: sin x"; "∫ xⁿ dx" → "Integrate: ∫ xⁿ dx")
- Reaction cue cards → `State the reagent and conditions: A → B`
- Spectra cue cards → `Identify the functional group: IR shows ...`
- Bare noun phrases → `Describe the trend in...`, `List the...`, `Name the...`,
  `Rank ... in order of ...`, `Calculate the oxidation number of ...`
- `X vs Y` (non-discrimination cards) → `Compare X and Y, with an example of each`

**4 answers enriched** where the clarified front then promised more than the
answer delivered (three types of selection, complex conjugate, u-substitution
choice, Gibbs equation terms).

Deliberately left alone: multichoice stems ending in ":" (the options
disambiguate), fill-in-the-blank items, and fronts ending in "…" (completion
cue). Counts unchanged at 570 flashcards / 301 questions — this pass only
reworded fronts.

Re-audit: 0 fronts lacking a clear cue.

## Revision session options (2 Aug 2026)

- Lengths extended: 5 / 10 / 15 / 20 / 30 / 40 / 60 items (was 10 / 20 / 30).
- **Mode**: Mixed · Flashcards only · Questions only.
- **Draw from**: Everything · Weakest topics (quiz avg < 70%) · Flagged only ·
  Due cards (Leitner-due only). Every filter falls back to the unfiltered pool
  if it would otherwise leave nothing, so a session never starts empty.
- All four settings persist via `store.reviseCfg()`.

Confirmed: sessions already exclude internals awaiting results. `revisionScope`
treats record status `pending` (submitted, not yet marked) the same as `graded`,
so Chemistry 3.1 → deprioritised (content still examined in 91392) and
Physics 3.1 → excluded. Only `todo` internals stay at normal weight.

## Study-tracking overhaul (2 Aug 2026)

**"I don't know" button** on flashcards, multichoice and short answer. It reveals
the answer and grades the item WRONG (card drops to Box 1). Guessing blind on a
multichoice inflates your average and hides the gap; this doesn't.

**Finished internals fully excluded (bug fix).** `revisionScope` previously
returned 'deprioritised' for a finished internal whose content overlapped an
external — so Chemistry 3.1 questions still appeared after 3.1 was submitted.
Now any submitted/graded internal is excluded outright. `stillExaminedIn` is
kept, but only to say WHERE to revise that material instead.

**Deadline urgency weighting.** A topic's sampling weight is now multiplied by
how soon its subject is assessed: ×3.0 within a week, ×2.2 within 3 weeks,
×1.6 within 6 weeks, ×1.2 within 3 months. The setup screen shows the current
multipliers and what is being skipped.

**Session lengths**: 15 / 20 / 30 / 40 / 60 (5 and 10 removed).

**Streak now has to be earned.** `touchStreak()` on page load is gone —
opening the site no longer counts. `store.recordStudy(n)` fires from every
graded flashcard and every quiz/session answer; a day counts once you reach
STREAK_TARGET (10) answered items. Progress shows as "3/10 today" on the
dashboard. A gap of more than a day lapses the run to 0.

**Auto-review and auto-flag** (`store.autoTriage`). The tracking systems now
talk to each other:
- ≥6 answered items on a topic averaging ≥80% → marked reviewed automatically
- ≥2 attempts averaging <50% → auto-flagged, shown with an "auto" badge
Both are advisory and can be undone by hand.

**Backup & restore** on the Study tools page. `store.exportAll()` dumps every
`ncea.` key to a dated JSON file; import replaces them after a confirm.
Round-trip verified.

**Date-based spaced repetition.** `BOX_DAYS = {1:1, 2:3, 3:7, 4:16}` — cards
now become due by CALENDAR days since last seen, not by how many times the deck
was opened. Cards graded before this change fall back to the old session rule,
so existing progress isn't invalidated.

## Notation keys + flashcard grading (2 Aug 2026)

**"Reading the notation" sections** added as section 0 of the five most
symbol-dense standards: Chemistry spectroscopy, thermochemistry and aqueous
equilibria; Physics mechanics; Statistics distributions. Each defines every
symbol the page then uses — including the ones nobody explains: the superscript
isotope number in ¹³C/¹H, δ (chemical shift), ppm, Δδ, m/z, M⁺, cm⁻¹, Σ, the
"p" in pH/pKa, and the Greek-vs-Roman population/sample convention.
Spectroscopy sections renumbered 0–6.

**Three-grade flashcards.** `nextBox()` now takes 'wrong' | 'nearly' | 'right'
(booleans still accepted for back-compat):
  wrong  → Box 1
  nearly → HOLD the current box, re-dated so it returns on that box's interval
  right  → promote one box
"Nearly" exists because a binary right/wrong forces you to lie in the middle:
calling a near-miss WRONG throws away a card you almost know, calling it RIGHT
buries it for a fortnight.

**"I don't know" now on both faces** — front (reveals + grades wrong) and back
("Didn't know"). Same scheduling outcome as wrong, kept separate because after
seeing the answer "I never knew this" and "I tried and missed" are different
things to admit.

**Skip button removed.** It let you dodge a card without recording anything,
which is exactly the behaviour spaced repetition needs to see.

**Sidebar progress widget fixed.** It read `store.reviewedCount()` (every
reviewed id) against a denominator of standards only — so marking a study guide
reviewed produced "27 / 26" and a 104% bar. Now uses `reviewedCountIn(ids)`
restricted to actual standards, caps at 100%, is relabelled "Standards
reviewed", links to Progress, and carries a tooltip explaining what counts.

## Credits, links and scrollspy (2 Aug 2026)

**"Credits still to sit" was under-counting resits.** It read 91 while the
internals page showed 8 pending + 20 to do. The gap was exactly the three
Calculus externals being resat (91577 5cr + 91578 6cr + 91579 6cr = 17), which
sit on the record as `achieved` and so were excluded. Those exams are still
ahead, so they now count: **91 → 108**, labelled "includes 17 being resat".

Deliberately NOT changed: "Projected if all passed" stays 134. Resit credits are
already inside `got`, so `projected = got + coming − resitCredits` — resitting
an external you have passed can raise the GRADE but cannot bank the same credits
twice. Adding them naively would have shown 151.

**All 16 No Brain Too Small links were dead (404).** The site had reorganised.
Chemistry and Physics repointed to the real `/html/senior_*/NCEA3_*.html` pages.
NBTS has no maths section at all, so the Calculus and Statistics entries were
replaced with the NZQA Mathematics & Statistics subject page. All 33 unique
external links now return 200 (42 NZQA + NBTS, re-verified).

**Scrollspy fixed.** `initScrollSpy` used an IntersectionObserver with
`rootMargin: '-80px 0px -70% 0px'`, i.e. a detection band in the top 30% of the
viewport. The LAST section can never enter that band — once the page bottoms out
it stops moving — so "Past exams" never highlighted. Rewritten to compute the
active section from scroll position, with an explicit at-the-bottom case.
Also: rAF is coalesced but falls back to a timer when `document.hidden` (rAF
never fires in a hidden tab), and the listener detaches when the router replaces
`#content`. Verified on all six subjects.

**TOC animation smoothed** — 220ms cubic-bezier on colour/background/border plus
a small padding nudge on the active item, and `prefers-reduced-motion` respected.

## Links, TOC, notation and u-substitution (2 Aug 2026)

**All 16 No Brain Too Small links were dead**, not just the spectroscopy one.
The site had reorganised. Chemistry and Physics repointed to the real
`/html/senior_*/NCEA3_*.html` pages; NBTS has no maths section at all, so the
Calculus and Statistics entries were swapped for the NZQA Mathematics &
Statistics subject page. All 33 unique external links now return 200.

**Sticky TOC restored.** `.toc` had `position: sticky` on one line and
`position: relative` on the next — the second silently cancelled the first (my
own regression from the animation pass). Now sticky with `max-height` +
`overflow-y:auto` so a long list stays usable, and a sticky sub-heading.
⚠️ Do not add a second `.toc { position: … }` rule.

**Scrollspy** rewritten (see previous entry) — verified on all six subjects.

**Notation keys** now on 14 topics: all six Chemistry standards, four Physics,
three Calculus, and four Statistics. Biology already has Key Definitions boxes;
English has no symbol notation, so both were left alone.

**u-substitution folded into 91579 Integration methods.** The standalone study
guide (`calc-usub`) is deleted: its 6 sections became sections 6–11 of
integration.js, and its 15 flashcards + 11 questions merged into that topic's
banks. Removed from `data/subjects.js` (the `guides` key is gone entirely),
`data/content/calculus.js`, and the "deep dive" pointer. Calculus now has
exactly 3 topics, all externals. Totals unchanged at 570 cards / 301 questions —
nothing was lost, it just moved.

## ATAR model research — findings only, model NOT changed

Sources: NZQA's own Australia page, ANU's indicative-entry page, and several
NZ/AU education sites. No verifiable first-hand student data points were found
(the med-students forum blocks automated access, and Reddit results were not
retrievable), so this rests on published methodology rather than anecdote.

**Confirmed correct in the current model:** best 90 credits, max 24 per subject,
60-credit minimum eligibility, externals weighted above internals. NZQA states
all four explicitly.

**Confirmed as genuinely unpublished:** NZQA says it uses "independent weighting
for each standard and result, using statistical analysis to decide its relative
difficulty", that this changes annually, and that it "does not predict ATAR
scores in advance". So no fixed formula can be exact — the "indicative" label is
honest and should stay.

**The problem found.** Secondary sources consistently report a per-credit
average of E=5, M=3.5, A=2.5 over the best 90 credits. Running that against
Chey's record versus the current model, on a COMPLETE hypothetical record:

| remaining grades | current model quality | current model ATAR | reported-method quality |
|---|---|---|---|
| all Excellence | 97.5% | 99.55 | 100% |
| all Merit | 94.1% | 99.00 | 77.3% |
| all Achieved | 87.9% | 97.45 | 63.1% |

The current model is **far too generous in the middle and bottom**: an
all-Achieved finish maps to ATAR 97.45, where published endorsement bands put
Achieved-level results around 50–69. The cause is the invented interpolation
table in `atarFor()` (0.88 quality → 97.5 ATAR) combined with normalising
against the student's own all-Excellence ceiling, which compresses the range.

**Proposed fix (not applied):** replace the ceiling-normalised quality with the
published-style per-credit average (E=5 / M=3.5 / A=2.5, best 90, cap 24), then
anchor the curve to the published endorsement bands — avg 5.0 → ~99+,
~4.25 → 85–95, ~3.5 → 70–84, ~2.5 → 50–69. Keep the 60-credit gate and the
"indicative" wording.

## YouTube links — recommendation: keep as searches

31 video blocks build YouTube *search* URLs rather than pinning video IDs. Having
just repaired 16 dead links, hardcoding IDs would reintroduce exactly that
failure mode — and worse, a deleted video still looks like a working link until
clicked. NCEA-specific content also comes from small channels that appear and
disappear. The existing queries are already tightly scoped
("NCEA Level 3 chemistry redox standard electrode potentials cells").

## Handing this site to another student

**See `SETUP.md` for the step-by-step handover checklist.** Summary below.

**~98% of the site is already generic.** Only four files carry anything
personal, totalling about 24 KB against ~1.16 MB of reusable content and code:

| File | What to change |
|---|---|
| `data/profile.js` | Name, school, year. **NEW** — drives the dashboard greeting and sidebar strapline, so no HTML edit is needed. |
| `data/results.js` | Their NZQA Record of Learning — every standard, credits, status, grade. This drives the whole credit tracker, ATAR/rank models and revision scoping. |
| `data/exams.js` | Their external and derived-grade timetables. |
| `data/planner.js` | Their school's term dates (only affects "Term 3, Week 4" style rough deadlines). |

**Leave everything else alone:**
- `data/content/**` — 756 KB of teaching notes, 570 flashcards, 301 questions.
  None of it is student-specific.
- `js/**`, `css/**` — the app.
- `data/subjects.js` — **no longer needs editing for a different subject mix.**
  Enrolment is now DERIVED from `data/results.js` (`enrolledSubjects` /
  `enrolledStandards` / `myExternalExams` / `myDerivedExams` in
  `js/registry.js`): a subject with no rows on the record drops out of the
  sidebar, the dashboard tiles, the standards count, the exam tables and the
  calendar, while its pages still resolve so shared links never 404. Verified by
  temporarily cutting `results.js` down to Chemistry/Physics/Calculus — nav
  showed 3 subjects, sidebar counted 0/14 not 0/26, both timetables showed 3
  rows, and `#/subject/biology` still rendered. An empty `results.js` falls back
  to showing all six rather than an empty sidebar.

**Also worth knowing:**
- All progress lives in `localStorage` under `ncea.`, so a fresh copy starts
  clean. They do not inherit any of Chey's streak, flags or Leitner boxes.
- If they take a subject not covered here, they get the subject page and credit
  tracking but no teaching content until someone writes it.
- One residual: `data/content/english/visual.js` is written around Inception /
  Interstellar. Another student studying different films would need that page
  rewritten — it is the only content file tied to a specific text choice.

## ATAR model — recalibrated (2 Aug 2026)

Acting on the research from the previous round. The old model normalised against
the student's own all-Excellence ceiling, which compressed the scale badly.

Now: quality = average value per credit over the best 90 credits, as a fraction
of Excellence-on-an-external, using the widely-reported Australian weighting
E=5 / M=3.5 / A=2.5. The curve is pinned to the published endorsement bands.

| If remaining grades were… | Old ATAR | New ATAR | Published band |
|---|---|---|---|
| all Excellence | 99.55 | **97.55** | Excellence ≈ 85–95+ |
| all Merit | 99.00 | **80.55** | Merit ≈ 70–84 |
| all Achieved | 97.45 | **67.45** | Achieved ≈ 50–69 |

All three now sit inside the published bands; previously all three sat at 97+.
The 60-credit eligibility gate and the "indicative" wording are unchanged —
NZQA scales per standard, recalculates annually and does not publish weightings,
so this remains an estimate.

## Credit counting — two sources reconciled

The headline "L3 credits banked" is computed live from `data/results.js` plus any
Progress-page edits. The line under the donut previously quoted
`qualification.byLevel`, a fixed transcription of the NZQA record, and claimed
"Matches your record" unconditionally — so after any edit it could assert a match
that was no longer true. It now compares the two and either confirms the match or
shows both figures with a "reset edits" link.

## English 91474 added as dropped

`13ENU 3.3 — Respond critically to unfamiliar written texts` (4 credits,
External) added to the record with `status: 'notassessed'`. It appears in the
"not being assessed" breakdown (now 4 credits) and is excluded from banked,
still-to-sit and projected totals. Switch it on later from the Progress page if
it gets picked up.

## Internal-status propagation — verified

Changing an internal from `notstarted` to `graded (E)` was checked across every
surface that reads internal data:

| Surface | Before | After |
|---|---|---|
| Sidebar nav badge | 8 | 7 |
| Progress: credits banked | 43 | 46 |
| Progress: still to sit | 108 | 105 |
| Progress: projected | 134 | 134 (correct — it moved, not appeared) |
| My Internals: outstanding | 8 | 7 |
| My Internals: graded | 0 | 1 |
| My Internals: credits riding | 28 | 25 |
| Topic page due button | "no date yet" | "Thu, 20 Aug" |
| Revision scope for chem-91388 | normal | excluded |

All correct. The propagation works because every page derives its numbers from
the store at render time rather than caching them, and `refreshSidebar` is
subscribed to every store change.

## Notes

- Not a git repository. No commits made.
- All state is `localStorage` under the `ncea.` namespace.
- Test data used during the review has been cleared.

## Calendar, data sync and portability (3 Aug 2026)

### The calendar (`#/calendar`)

A month grid of every dated assessment, sitting under **Exams & deadlines**
alongside *My internals* and *Exam timetable*. It reads the same three sources
as the dashboard strip — planner internals, derived-grade exams, externals — so
the two can never disagree.

**Colour language (no new palette invented):**

| Signal | Meaning |
|---|---|
| Dot / border colour | the SUBJECT accent from `data/subjects.js` |
| Filled tint | internal |
| Dashed outline | derived-grade exam |
| Solid + bold | external |
| Amber outline | today |
| Struck through, faded | internal already submitted or graded |
| `≈` prefix | placed from a rough "Term 3, Week 4" estimate |
| Multi-day bar | an assessment spanning several days |

**Deliberate design decisions:**

- **Past months are kept**, dimmed — `upcomingDeadlines()` drops anything past,
  which is wrong for a calendar. You still want to see when Chemistry 3.1 went
  in. `allEvents()` rebuilds from the same sources with no time filter.
- **No auto-scroll to today.** The router resets every page to the top on
  purpose (`positionPage`); an automatic scroll here would fight it. There's a
  *Jump to today* button instead.
- **A per-month list on phones.** At 375px a cell is ~44px — it can hold a dot
  and nothing else, and a dot with no hover (touch has none) tells you nothing.
  Below 640px the grid shows dots for shape and a list underneath carries the
  labels, dates and status. CSS shows one or the other, never both.
- **Undated internals aren't dropped silently** — they're listed underneath with
  a link to add dates.
- All user-entered text goes through `esc()`; internal titles are free text.

### Data sync audit — clean

Cross-checked in the browser against the live modules:

- every `results.js` row maps to a known subject and, where it has a `topicId`,
  to a real standard;
- credits, Internal/External and AS number agree between `results.js` and
  `subjects.js` for all 26 standards;
- every AS number on an exam row exists in `results.js`, is marked External, and
  belongs to that row's subject — and every external standard appears on exactly
  one exam row;
- the internals catalogue matches the outstanding internals on the record.

**Zero discrepancies** across 33 result rows, 26 standards, 6 subjects, 6
externals and 6 derived exams.

**Live propagation** was re-verified with the calendar in the loop. Marking
Chemistry 3.2 graded moved every surface together and reverting restored all of
them: nav badge 8→7→8, deadline counts internal 4→3→4, revision scope
normal→excluded→normal, calendar struck-through events 2→6→2 (it's a four-day
span, so 2 + 4 = 6).

### Portability: enrolment is now derived

The one thing `SETUP.md` could not previously promise was "you don't have to
delete the subjects you don't take". Now it can.

`js/registry.js` derives `enrolledSubjects`, `enrolledStandards`,
`myExternalExams` and `myDerivedExams` from `data/results.js` — the one file a
new student has to edit anyway. A subject with no rows on their record drops out
of the sidebar, dashboard tiles, standards count, both exam tables and the
calendar. `subjects` / `allStandards` / `subjectById` stay complete, so direct
links and search still resolve for everything — nothing 404s.

Verified by temporarily cutting `results.js` to Chemistry/Physics/Calculus: nav
showed 3 subjects, the sidebar counted 0/14 rather than 0/26, home said "3
subjects", both timetables and the calendar showed 3 subjects' exams, and
`#/subject/biology` still rendered. `results.js` restored byte-identical after.

An empty `results.js` falls back to showing all six rather than an empty
sidebar.

### `SETUP.md`

New file — the step-by-step handover checklist: the four personal files in
order, a field-by-field table for `results.js`, what to leave alone, and four
things to eyeball afterwards to confirm it took.

### Also fixed

- README claimed a standalone u-substitution study guide; it was folded into
  91579 last round. Corrected, and the calendar added to the feature list.
- `qsa` was imported but unused in `js/app.js`.
- Empty months on the calendar were `opacity: .55`, near-invisible in dark mode.
  Raised to `.72`.

**Full regression:** all 52 routes (8 app pages + 6 subjects × 3 + 26 standards)
render from a cleared `localStorage` with zero console errors, in light and dark,
at 375px and desktop. Credits still read 43/60 banked · 108 still to sit
(includes 17 being resat) · 134 projected.

## Two bug fixes (3 Aug 2026)

### Revision session endings were broken — not just the button

Reported as *"the end session button on flashcards doesn't work"*. The button
was wired correctly; `finish()` was throwing:

```
Uncaught TypeError: store.touchStreak is not a function
```

`store.touchStreak()` never existed — the streak API is `recordStudy(n)`. The
call sat above the line that renders the summary, so the exception killed
`finish()` before anything was drawn. **This broke every ending, not just the
early exit** — playing a session all the way through showed nothing either.

The call was also redundant. Every graded item already counts as it happens:
`fcGrade()` for flashcards and `saveQuiz()` for questions both call
`recordStudy()` internally. So the fix is to delete the line, not to rename it —
a session-level call would have double-counted.

Verified: early exit renders "Session ended"; a full 15-card run renders
"Session complete · 100% · 15 items"; the streak advanced to 1 at the 10-item
target with the item count exact (no double-count).

### Dropped credits are out of the charts

*"Don't count the dropped credits in the pie chart at all."* They were a
segment of the "Level 3 credits by grade" ring, which directly contradicted the
note underneath — that note already said they're "excluded from every total".

- **Ring**: `segments` is now just `buckets(rows)`. `buckets()` never included
  dropped credits; they were bolted on afterwards.
- **"By class" legend**: also dropped a phantom *Dropped* key. The group bars
  filter `notassessed`/`na` rows out, so the legend was advertising a colour
  that never appeared in any bar.

Dropped standards are still visible where they're informative — the "what are
the N not-being-assessed credits?" disclosure, greyed out in the standards
table, and still selectable as a status so a student can switch one back on.

Ring now reads 22 E · 4 M · 17 A · 8 awaiting · 83 to sit, centre 43 earned.

## Spectroscopy page rebuilt from the workbook (3 Aug 2026)

Chey supplied 43 photographs of the Year 13 Chemistry NCEA L3 Workbook, Chemistry
3.2, including the AS91388 data sheet. `data/content/chemistry/spectroscopy.js`
was rebuilt from those images only — no general chemistry knowledge was used to
fill gaps, and nothing was carried over that the workbook does not contain.

**The scope decision that drove everything else:** explanatory note 3 limits the
standard to **mass spectrometry, IR and ¹³C NMR**. There is no ¹H NMR. The old
page taught it heavily, so it came out — along with three leaks elsewhere in the
site that pointed at it (see below).

### Page structure (8 sections, was 7)
0 Reading the notation · 1 How this connects · 2 Spectroscopy and spectrometry ·
3 Infrared · 4 Carbon-13 NMR · 5 Mass spectrometry · 6 Solving structures ·
7 Practice bank. Workbook teaching order (IR → NMR → MS), with the workbook's own
*analysis* order (MS → ¹³C → IR) taught in section 6.

### Reproduced verbatim from the data sheet / book
12 tables: IR stretching (19 rows) · IR bending (6) · ¹³C data sheet (14) ·
three major divisions (3) · saturated breakdown (6) · student NMR table (9) ·
MS fragment ions (10) · fragment losses (6) · EM regions · the six 4-carbon IR
compounds · 4-carbon ¹³C shifts · worked fragmentation examples.

### Removed as unsupported by the images
- All ¹H NMR: n+1 rule, integration, ¹H shift table, the ethyl triplet/quartet
  pattern, δ 9.7 aldehyde proton, propan-1-ol vs propan-2-ol.
- `m/z 77 C₆H₅⁺` (phenyl) and all aromatic/benzene content — not on the data
  sheet and aromatics are not in the standard's scope.
- `C≡N 2200–2260` from the chemistry reference sheet — not on the data sheet.
- Degree-of-unsaturation questions posed as assessable; DBE is now present but
  carries the workbook's own "there will be no questions related to this content".
- An invented bromine example (m/z 108/110), replaced with the workbook's own
  150/152 case.

### Leaks fixed outside the page
- `data/subjects.js` — standard blurb said "¹H/¹³C NMR".
- `data/content/chemistry/reference.js` — the printable sheet carried a ¹H shift
  table and the n+1 rule. Replaced with the student NMR table, the MS fragment
  ion table and the fragment-loss table, and the IR rows realigned to the data
  sheet.
- `data/content/chemistry/organic.js` — cross-link cited "an aldehyde H at δ9.7
  in NMR"; now cites the aldehyde carbon at δ 190–200 in ¹³C.

### Flashcards and quiz
Rebuilt: **53 flashcards** (was 50) and **32 quiz questions** (was 21). Every
¹H-NMR card and question removed; new coverage added for the A/M/E verbs, EI vs
ESI, the magnetic sector, base peak vs molecular ion, isotopic analysis for
Cl/Br/I, the CDCl₃ 77.0 peak, peak height meaning nothing, the symmetric-C=C
deduction, "absence of a fragment proves nothing", and the marking criteria.

### Verification
Automated cross-check of **232 required strings across 74 topics** drawn from the
notes taken off all 43 images — all present. Reverse scan for unsupported terms
came back clean. All routes render with zero console errors; 12 tables; the one
KaTeX element (the DBE formula) renders.

## Themes, standards library and the ATAR ceiling (3 Aug 2026)

### Colour schemes — five, from a dropdown
The single light/dark toggle became a picker. `js/themes.js` is the one source of
truth (id, label, hint, `dark` flag, two-tone swatch); the picker, the pre-paint
script and the store all read it.

| | |
|---|---|
| **Light** / **Dark** | unchanged — the original phthalo green pair |
| **Midnight** | deep indigo, lowest glare for night study |
| **Sepia** | warm paper, green ink — for long reading |
| **High contrast** | black on white, visible borders, AAA text pairs |

**The change that made this possible:** the sidebar, hero, toast and brand mark
hardcoded `--phthalo-*` values, so a new theme could only restyle the content
area and left a green hero stranded on an indigo page. Those 20 usages now go
through five new **brand tokens** (`--brand-deep`, `--brand-mid`,
`--brand-bright`, `--brand-line`, `--brand-on-dim`) which default to exactly the
old phthalo values — light and dark are pixel-identical — and which each theme
overrides. Dark-family themes are listed in `:is()` selectors so they inherit the
dark per-subject accents.

### Standards library — 25 subjects, 129 standards
`data/nzqa-catalogue.js` adds NCEA Level 3 standards for subjects the site does
not teach: Economics, Accounting, Business Studies, History, Geography, Classical
Studies, Media Studies, Te Reo Māori, French, Spanish, German, Japanese, Chinese,
Drama, Music, Visual Arts, Art History, PE, Health, Digital Technologies, DVC,
Earth & Space Science, Agriculture & Horticulture, plus the Maths and English
standards this site doesn't cover. **No teaching content** — credit counting and
deadline tracking only, as specified.

Plumbing:
- `store.extraStandards()` / `addExtraStandard(s)` / `removeExtraStandard` /
  `removeExtraSubject` / `confirmExtraStandard` — user additions live in
  `localStorage`, never in the shipped `results.js`
- Progress page merges `[...results, ...store.extraStandards()]`, so added rows
  flow into credits, rank score, ATAR, the goal tracker and the class bars with
  no special-casing
- A browsable library (filter by area, search by subject/AS/title, add one or a
  whole subject) plus an **add-by-hand form** for anything missing
- Added subjects appear in the internals planner under "Your other subjects",
  offering only their **Internal** standards, and flow onto the calendar
- `subjectMeta()` in registry.js gives added subjects a stable, distinct colour
  derived from their group code, deliberately outside the phthalo hue band

**Honesty measure:** every catalogue row is flagged `unverified` and renders a
`check against NZQA` badge with a *confirm* action, because the catalogue was
compiled from general knowledge of the framework rather than a live NZQA feed.
The file header says so too.

### ATAR ceiling corrected to 99.95
The curve topped out at **99.60**, which was wrong: the ATAR scale runs
**0.00–99.95 in 0.05 steps**, and 99.95 is the maximum. Fixed, with the
second-highest anchor nudged 97.00 → 97.60 to keep the top of the curve smooth.
The published-band anchors (0.70 → 78, 0.50 → 57) are untouched.

Note that `quality = 1.00` is not merely "all Excellence" — externals carry a
×1.15 weight, so 1.00 requires every one of the best 90 credits to be Excellence
**and** externally assessed. Chey's own all-Excellence ceiling is **99.25**,
because their programme contains internals.

### Verification
46 routes with added standards present, then again from a cleared
`localStorage` — zero console errors both times. All five themes apply, persist
and survive reload. Adding Economics moved still-to-sit 108 → 132 and projected
134 → 158 (+24 = Economics' credit total), and the end-to-end path
library → planner → calendar was tested with a real dated internal.

### Also written
`PROFILES-PLAN.md` — a four-phase plan for letting anyone use the published site
with their own record, without adding a backend. Plan only; nothing built.

### ATAR weighting corrected again — external was over-modelled (3 Aug 2026)

Chey asked whether a Calculus internal credit should outrank an Economics or
History external credit. It should, and the model had it backwards.

**What was wrong.** `EXTERNAL_WEIGHT = 1.15` multiplied the VALUE of every
externally assessed credit. So an Economics external at Excellence scored
5.75/credit while a Calculus internal at Excellence scored 5.00 — the easier
subject's credit outranked the harder one purely for being sat in an exam room.

**Two separate faults:**

1. **Over-modelling.** NZQA's published method ranks standards by grade first
   and prefers an external over an internal *of the same grade* when choosing
   which credits make the best-90 cut. That is a selection tie-breaker, not a
   value multiplier. Replaced with `EXTERNAL_TIEBREAK = 0.001`, applied to the
   sort key only; `pts` now carries grade value alone, and `maxPerCredit` is
   plain `ATAR_MAX_VALUE`.
2. **No subject scaling at all** — which is the effect Chey was actually asking
   about, and in the real Australian system it is much larger than any
   internal/external difference. Calculus, Physics and Chemistry typically scale
   up; Business Studies, PE and Media typically scale down.

**No scaling factors were invented.** NZQA does not publish them, so encoding
numbers would dress a guess up as precision. Instead the limitation is stated in
the code and, more importantly, in a callout on the Progress page: a maths and
science heavy programme is probably *under*-estimated by this column, a
humanities/commerce one *over*-estimated.

**Recalibration check** — pure single-grade programmes (5 subjects x 24 credits):

| Programme | quality | ATAR | Published band |
|---|---|---|---|
| all Achieved | 0.50 | 57.00 | Achieved ~50-69 |
| all Merit | 0.70 | 78.00 | Merit ~70-84 |
| all Excellence | 1.00 | 99.95 | top of scale |

Internal and external now give **identical** results at the same grade, which
was the whole point. Chey's own scenarios moved 67.45/80.90/99.25 to
71.10/83.15/99.95 — the rise is the denominator no longer normalising against an
all-external ceiling that no real programme can reach.

## Catalogue verified, themes swapped, ATAR scaling, profile groundwork (3 Aug 2026)

### Catalogue verified against NZQA — and it was badly wrong
All 25 subjects were checked individually against NZQA's standard search.
**19 of 25 had errors.** Examples: Accounting 91404/91405 were swapped AND one was
internal when it is external; French, Spanish, German and Japanese were all off
by one across the whole block; Te Reo Māori was shifted by one and used the wrong
wording ("torotoro" for "whānui"); History, Geography, Media, Drama, Music, PE,
DigiTech and Visual Arts were each missing standards entirely.

Now 175 verified standards across 25 subjects (up from 129). Visual Arts is
listed per field (design/painting/photography/printmaking/sculpture) because the
standards are genuinely parallel. `unverified` flags, the "check against NZQA"
badge and `store.confirmExtraStandard()` are all gone.

### Both warning callouts removed by verifying, not hiding
- "Worth double-checking" → replaced with a note confirming the AS numbers,
  credits and UE rule are all checked, and stating the two things that DO remain
  uncertain (NZQA revises standards; the approved-subject list is NZQA's).
- The library's "check these before you rely on them" → replaced with the
  verification date and source.

### University Entrance — explained rather than just shown
Verified against NZQA: Level 3, **14 credits in each of three approved
subjects**, plus literacy (10 at L2+, 5 reading / 5 writing) and numeracy (10 at
L1+). **English is not required** — the site previously implied nothing either
way. The goal now returns a breakdown and the UI shows it:

| | |
|---|---|
| 13MAC | 14 / 14 — 27 banked, 13 above the cap don't help UE |
| 13ENU | 6 / 14 — needs 8 more |
| 13MAS | 4 / 14 — needs 10 more |

which is exactly where Chey's 24 comes from, plus a line noting Chemistry and
Biology also have 3 banked and could displace a subject later. It also says
plainly that only *banked* credits count, which is why the number stays low
until results are released.

### Themes: sepia and high contrast out, sandstone and ocean in
- **Sandstone** — warm clay and sand (#F4EFE4 ground, #A8623A clay accent), built
  from the standard sand family. A light theme that isn't white.
- **Ocean** — deep blue (#0A1826 / #4FA3D1), cooler and less saturated than
  Midnight, and registered as a dark-family theme so it picks up the dark
  per-subject accents.
Anyone already on a retired theme is migrated (sepia → sandstone,
contrast → light) rather than dumped back to the OS preference.

### ATAR subject scaling
Three coarse tiers — 1.10 (sciences, both maths lines, academic humanities and
languages), 1.00 (arts and technology), 0.92 (PE, Health) — normalised so the
ceiling is Excellence in a top-tier subject.

Chey's requested target is met exactly: **all externals at Excellence plus the
Calculus internals = quality 1.000 → ATAR 99.95**, over 87 counted credits.
A five-subject all-Excellence programme in the *lowest* tier reaches 93.55
instead, so the scaling does real work. Also fixed a float artefact that printed
93.55000000000001.

The tiers are labelled in code and UI as illustrative, because NZQA does not
publish its factors. The old "this model ignores subject difficulty" callout —
now false — was rewritten.

### Profile groundwork (PROFILES-PLAN.md phase 1, partial)
`store.profile()` / `setProfile()` / `hasOwnProfile()` / `resetProfile()`.
`data/profile.js` is now a **seed only**: anything saved on the device wins, so a
visitor to the published site can set their own name, school, year and level from
a form on the Progress page without editing a file. Verified end-to-end —
greeting, sidebar strapline and exam-page copy all follow, and the strapline now
re-paints on store change instead of only at boot. `displayName()` removed as
dead code.

**Still to do for full multi-user:** the record itself (`data/results.js`) behind
the same pattern, per-profile key namespacing, and export/import. Internals and
credit edits were already per-device.

### Verification
17 routes with data present and 7 more from a cleared `localStorage` — zero
console errors. Progress page numbers independently recomputed from
`data/results.js`: banked 43, grade split 22E/4M/17A, pending 8, not-sat 83,
resits 17, still-to-sit 108, projected 134 — all cross-check. No unused imports,
no dead code (`STATUS_HINT` was unused and is now wired in as status tooltips).

## Phase 1 — reload / scroll-reset bugs (3 Aug 2026)

**Root cause, and it was site-wide.** `store.setDueFilter()` and `setCalFilter()`
called `emit()`. The app-level subscriber in `js/app.js` re-renders the entire
route on any store change while you are on `#/` or `#/flagged`, and the router
then forces scroll-to-top. So touching a filter chip re-rendered the whole
dashboard and threw the reader back to the top.

Fixed at three levels so it cannot recur:

1. **View preferences no longer emit.** A filter choice is not progress data.
   The page that owns the filter re-renders its own card.
2. **`renderRoute({ keepScroll: true })`** — the app-level subscriber now says
   "this is a refresh of the page I'm on", and `positionPage()` restores the
   saved offset instead of jumping to the top. Navigation still scrolls to top.
3. **`overflow-anchor: none`** on the two cards that change height on filter, so
   the browser's own scroll-anchoring cannot nudge the page either.

Individual fixes:
- **What's coming** replaced only its own card but then called
  `renderHome().onMount()`, rebuilding every handler on the dashboard. Now uses
  a delegated `wireWhatsComing()` that swaps one element and re-binds itself.
- **Calendar filter** replaced all of `#content`. Now `repaintCalendar()` swaps
  `.content-inner` and restores scroll.
- **Adding a standard** rebuilt the page, losing scroll, collapsing every open
  subject in the library, and clearing the area filter and search box. All four
  are now preserved, plus focus, so you can add several in a row.
- **topic.js** called `location.reload()` twice — on saving and on removing a
  planner due date. Replaced with `repaintDuePanel()`, which rebuilds just the
  toolbar button and the panel.
- **internals.js** rerender now holds scroll, except when opening the form.

One `location.reload()` remains, in `commandwords.js` after a full backup
restore. That one is correct: `importAll()` has just replaced the whole of
localStorage, so every module's in-memory mirror is stale. Documented in place.

Verified: dashboard filter across 4 chips and calendar filter across 3 chips both
hold scroll to the pixel; adding two standards in a row holds scroll, keeps the
subject expanded and keeps the area filter; the topic due-date save holds scroll
and does not reload (checked with a `Symbol` that would not survive a reload).

## Phase 2 — layout and chart rendering

**Donut chart.** Rewritten from `stroke-dasharray` circles to explicit
annular-sector `<path>` elements. The old version accumulated a floating-point
`offset` across the segments, so by the last one the running total could exceed
the circumference and the final arc wrapped past 12 o'clock, painting over the
first. That is exactly the reported symptom: the red "Not sat yet" band bleeding
into the gold "Excellence" band. Arc paths compute each sector's angles from the
running fraction with no accumulation, and a ~1° gap between sectors gives every
boundary a clean radial edge. A single 100% segment falls back to a plain ring,
since it has no boundaries to draw.

**"What's coming".** Seven stacked rows ran to 676px on a 720px viewport, so the
card swallowed the screen. Now a responsive grid
(`auto-fill, minmax(310px, 1fr)`), six items instead of seven so it divides
evenly into 1/2/3 columns, tighter padding, and titles that ellipsis rather than
wrap. Result: **350px instead of 676px** at 1280×800, two columns, and it drops
back to one column under 640px.

## Phase 3 — em dashes removed (1,542 of them)

Not a blind find-and-replace. A context-aware converter picks the punctuation
that actually fits, in this order:

1. **Paired dash** ("X, parenthetical, Y") tracked across both halves, so a
   parenthetical never ends up with a colon at one end and a comma at the other.
2. **Caption / label** (short noun phrase both sides) becomes a **colon**.
3. **Adverbial or prepositional opener** (particularly, in, for, with…) becomes a
   **comma**, since those can never start a sentence.
4. **Conjunction** (and, but, so, because…) becomes a **comma**.
5. **Indirect question** ("which frequencies…", "what each shows…") becomes a
   **colon**; a relative "which/that" clause becomes a comma.
6. **Independent clause follows** becomes a **full stop**, with the next word
   capitalised.
7. Everything else becomes a comma.

Result: 650 commas, 536 colons, 348 full stops. Clause detection stops at the JS
string boundary, so a dash in the next string can never be mistaken for the
closing half of a pair.

**Re-read pass.** Scanned the output for comma splices, fragments after a full
stop, doubled punctuation and lowercase sentence starts. Most hits were false
positives (`e.g.`, spread operators, regex character classes). Six genuine comma
splices were found and repaired, four automatically and two by hand
("gaining 5 electrons. That is reduction.").

Verified: all 46 routes render with zero console errors, and byte-count deltas
match the arithmetic exactly (175 replacements × 3 bytes in spectroscopy.js), so
no content was lost.

## Phase 4 — subject management

Every subject now carries a small square **X** on its header row in the credit
table: 24×24, 6px radius, an inline SVG cross, ghosted at 55% until you hover
the row, and on hover it turns red and rotates 90° with a scale bump (and
scales down on click). `prefers-reduced-motion` disables the movement.

**The six taught subjects are no longer special.** A fresh copy still starts
with all six, but any of them can be removed with the same control, exactly like
a subject added from the library. Removal is a *hide*, not a delete: teaching
content stays on disk and a "Removed subjects" panel offers a one-click restore.

Plumbing: `store.hiddenGroups()` / `hideGroup()` / `unhideGroup()`, plus
`visibleSubjects()` and `visibleStandards()` in registry.js. Those two are
FUNCTIONS rather than constants because removals happen at runtime, and
`enrolledSubjects` is fixed at import. The sidebar, dashboard tiles, revision
scope chips and sidebar progress all read the live list, and `store.on(buildNav)`
repaints the sidebar when a subject is added or removed.

Verified: removing Biology took banked 43→40, still-to-sit 108→92 and the
sidebar 6→5 subjects; restoring put all three back exactly.

## Phase 5 — verification popups removed

- "25 subjects, verified against NZQA" (Progress page)
- "Checked against NZQA" (Progress page)
- "Standards to confirm" (subject pages, driven by the `verify` flag)
- The per-link **verified** / **check latest** chips on topic pages and the
  NZQA resources row

The audit found four of these, not one. They were all doing the same unhelpful
job: a "verified" tag tells the reader nothing, and a "check latest" tag
undermines confidence in a link that is fine.

## Phase 6 — calendar and exam data

**One month at a time.** The calendar showed every month of the year stacked, so
finding the one you wanted meant scrolling past four grids. Now a single month
with `‹` / `›` navigation, a **Today** button that appears once you have moved
away, and left/right arrow keys. The viewed month is remembered between visits
(`store.calMonth()`), and navigating repaints in place without touching scroll.

**Dates set**, via a `SEED_DATES` map in `data/planner.js`:

| Internal | Date |
|---|---|
| Physics 3.5 (Modern Physics) | Fri 7 Aug 2026 (this Friday) |
| Chemistry 3.2 (Spectroscopy) | Fri 14 Aug 2026 (next Friday) |
| Statistics 3.10 | rough: Term 3, Week 6 |

Applied two ways so they land for everyone: `itemFromCatalogue()` stamps them
when the planner is seeded, and `store.applySeedDates()` migrates them **once**
onto any existing planner item that has no date yet. It never overwrites a date
the student has already set.

**Exam coverage checked across every subject**, not spot-fixed: all six have both
an external and a derived-grade entry, and the merged deadline count is 6
external + 6 derived + 3 internal.

### A mistake worth recording
The first attempt at Phase 5 used a regex with `.*?` across `re.S` to delete the
verification callouts. It matched from the callout opening to a `</div></div>`
much further down, swallowing the re-sits callout AND the entire standards
table, and left an unterminated template literal that broke `progress.js` (and
therefore `router.js`, and therefore the whole app). Caught by a backtick-parity
check. `progress.js` was restored from the pre-Phase-3 backup and Phases 2, 4
and 5 re-applied with exact bounded matching instead of a greedy regex.

## Phases 7, 9, 10, 11 (3 Aug 2026)

### Phase 7 — account page and onboarding
New `#/account` page (`js/pages/account.js`), linked from the sidebar. Two
halves, deliberately separated:

- **Your details** — live. Name, school and email save through
  `store.profile()`. Moved off the Progress page, which now just links across.
- **Sign in** — structure only. Email, password and confirm fields with a live
  strength checklist, submit disabled and clearly labelled as not switched on.

**Year and qualification level are no longer asked.** Everyone using this is a
Year 13 student sitting NCEA Level 3, so the question had one answer. They are
shown as read-only facts instead, still overridable in `data/profile.js`.

⚠️ The password fields deliberately persist **nothing**, not even hashed.
Writing a password to `localStorage` would be worse than having no accounts:
readable by any script on the origin, and it would ride along in the
export/backup file. Verified: after typing a password and submitting, no trace
of it appears anywhere in storage.

### Phase 9 — emoji cleanup
933 → 84. Removed 177 decorative ones across two passes: the `⚖️` prefix on 111
"TELL THEM APART" flashcards, and heading/button decorations
(`📖 Key definitions`, `🔗 How this connects`, `🧠 Mnemonic`, `★`,
`💡 Explain this answer`, `🎯 Revision session`, `📈 Credit tracker`,
`🗓 What's coming`, `🖨 Print flashcards`, `👋`, `🎉` …).

Kept, because they carry meaning or aid scanning: subject icons (🧪 ⚛️ 🧬 …),
the three deadline-kind icons (📝 internal / 📋 derived / 📄 external), the
streak flame, empty-state illustrations, nav tab wayfinding, 🚩 flagged, and
every LaTeX symbol in `math.js`.

### Phase 10 — typography and logo
**Headings only** moved from Fraunces to **Newsreader**: drawn for screens, full
variable weight range, authoritative rather than quirky, which suits dense
reference pages. Body text stays on Inter and JetBrains Mono is untouched.

Big **figures** were silently inheriting the display font. They are data, not
display type, so a new `--font-figure` token moves all 11 of them (hero stats,
stat tiles, donut centre, goal number, streak, quiz score, session ring …) back
to Inter with `tabular-nums`, so columns of numbers line up.

**Logo** replaced. The serif "N" turned to mush at favicon size. Now an SVG
mark: three climbing bars (credits accumulating) under an arc (the goal being
tracked toward), in the phthalo gradient. Same artwork drives the sidebar mark
and the favicon, and it lifts slightly on hover.

### Phase 11 — verification
- **47 routes** render with zero console errors
- **Dashboard filters** hold scroll to the pixel across all four chips
- **Donut**: 5 sectors, all valid arc paths, no `stroke-dasharray` anywhere
- **Subject remove/restore**: no reload, scroll held, sidebar 6→5→6
- **Calendar**: one grid, ‹ › navigation works, scroll held on month change
- **Dates**: Physics 3.5 → 2026-08-07, Chemistry 3.2 → 2026-08-14,
  Statistics 3.10 → Term 3 Week 6
- **Account page**: details + sign-in present, does not ask year/level, shows
  Year 13, headings on Newsreader
- **0 em dashes**, all template literals balanced, no unused imports
- One `location.reload()` remains, after a full backup restore, which is correct

### Late fix during Phase 11
Form inputs inside `.field` relied on each page adding `.sa-input`. The account
page did not, so it rendered browser-default white boxes on a dark background.
Styled `.field > input/select/textarea` globally instead, with a focus ring in
the accent colour. Checked that the internals form, which does use `.sa-input`,
is unaffected.

## Follow-up fixes (3 Aug 2026)

1. **"Exams & deadlines" renamed to "Assessments"** — the section holds internals
   as well as the two exam timetables, so the old name was wrong.
2. **Dropdown placeholders repaired.** The em-dash pass had turned every
   `<option value="">— … —</option>` into stray commas, so the grade selector
   showed a bare `,`. Grade placeholders now read **N/A**; the subject and
   internal pickers read properly again ("Pick a subject first", "No internals in
   this subject", "Something else, not on my record").
3. **Sidebar no longer un-highlights on edit.** `store.on(buildNav)`, added when
   subjects became removable, rewrote `#nav-subjects` and wiped the `.active`
   class the router had set. A new `markActiveNav()` re-derives the active item
   from the current route after every rebuild. Verified on dashboard, progress,
   account, subject, study tools, revision and both assessment tabs.
4. **Grade clears when the status leaves "graded".** Applied in all three places
   a status can be changed: the credit table, the internals planner form and the
   topic due-date panel. A stale Excellence next to "still to do" reads as a real
   result, and would have counted if the status were flipped back.
5. **Pie chart sectors now meet.** The 1° separating gap is gone; sectors share
   their boundary like a normal donut. They still cannot overlap, because each
   sector's angles come from the running fraction rather than an accumulating
   dasharray offset.
6. **X moved from subjects to individual standards.** Subject headers are back to
   their original formatting. Each standard row has its own X in a dedicated
   right-hand cell, **invisible until that row is hovered** (or the button is
   focused), with the rotate-and-redden animation kept. Touch devices, which have
   no hover, show it faintly at all times. Hiding is now keyed per standard
   (`store.hiddenStandards()`); a subject only leaves the sidebar once every one
   of its standards is hidden, and a "Removed standards" panel restores any of
   them.
7. **Account page "Backup and restore"** no longer navigates to Study tools. It is
   a disabled button with a note that it arrives alongside sign-in.

Verified: 47 routes, zero console errors, backticks balanced, no em dashes.

## Progress page trimmed (3 Aug 2026)

Removed the **"Removed standards"** panel and the **"Your details"** card from
the Progress page. Details already live on the Account page, and the restore
panel was clutter for something most people will never use.

Removing a standard would then have been a one-way door, so **"Reset to my NZQA
record" now also restores every removed standard**. Its confirm message says so
when there is something to bring back ("…This also brings back the 2 standards
you removed"), and the button carries a matching tooltip.

Verified: both panels gone, remove still works, reset brings the standard back,
`hiddenstds` cleared, no console errors.

## Internal dates seeded, UE compacted, X repositioned (3 Aug 2026)

### All eight internals now ship with a date and a status
`SEED_DATES` in `data/planner.js`:

| Internal | Due | Status |
|---|---|---|
| Chemistry 3.1 | Term 2, Week 9 | submitted |
| Physics 3.1 | Term 2, Week 9 | submitted |
| Physics 3.5 | Fri 7 Aug | in progress |
| Chemistry 3.2 | Fri 14 Aug | in progress |
| English 3.9 | Term 3, Week 5 | in progress |
| Statistics 3.10 | Term 3, Week 6 | in progress |
| Biology 3.2 | Term 3, Week 8 | not started |
| English 3.7 | Term 3, Week 9 | not started |

⚠️ Term 2 Week 9 resolves to 29 Jun 2026, which is three days past the Term 2
end date in `TERMS_2026`. Wellington College's Term 2 evidently runs slightly
longer than the typical dates shipped. It does not matter for these two (both
already submitted), but adjust `TERMS_2026` if exact calendar placement matters.

### UE goal card compacted
It ran to 529px, well past the donut beside it. The table became three thin
progress bars, the long explanation was cut to one line, and the detail (cap
arithmetic, other banked subjects, the literacy and numeracy requirement) moved
into a collapsed `<details>`. Now 466px, in line with the other goal views
(314 to 427). Also removed the `🎯` that survived the emoji pass.

### X moved outside the row
Previously it had its own table column, so it sat *inside* the standard's box.
It is now absolutely positioned in a 38px gutter to the right of the table,
vertically centred on its row, invisible until that row is hovered or focused.
Measured: 10px clear of the table's right edge, centred to within 3px, opacity 0
at rest. `.table-wrap` clips with `overflow-x: auto`, so the credit table gets
its own non-clipping wrapper; under 720px (and on touch, which has no hover) it
falls back to an always-visible inline button and the wrapper scrolls again.

## Hover bridge for the remove control (3 Aug 2026)

The X sits in the gutter outside the row, so travelling to it meant crossing a
dead gap: the pointer left the row, `tr:hover` stopped matching, the button
faded out and could never be reached.

Fixed with a **bridge**: the button is now wrapped in `.cr-xzone`, a transparent
strip that spans the full height of the row and the whole width of the gutter,
and is always interactive. Because the strip is a DESCENDANT of the row,
`tr:hover` stays true the entire way across, so the button never disappears
mid-journey.

### Testing note worth keeping
Synthetic `dispatchEvent(new MouseEvent('mouseover'))` does **not** trigger CSS
`:hover` (that is driven by real pointer position). The first pass "verified"
the fix that way and was actually measuring the button's fade-OUT transition
caught mid-way at 0.5 opacity. Re-tested with the browser's real pointer:

| Pointer at | row `:hover` | opacity | pointer-events |
|---|---|---|---|
| inside the row | true | fading in | auto |
| in the gutter | true | 0.6 | auto |
| on the button | true | 1.0, red, rotated | auto |

A real click then removed 13CHE:3.1: row gone, still-to-sit 108 → 104 (4
credits), banked unchanged at 43 (it was pending, not achieved). "Reset to my
NZQA record" restored it and put the total back to 108.

Under 720px, and where `(hover: none)`, the zone collapses to a static inline
button that is always visible, since a hover bridge is meaningless on touch.
