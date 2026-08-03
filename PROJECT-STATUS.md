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
