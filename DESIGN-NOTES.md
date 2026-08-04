# Design review

Audit of the site as it stands, and where the design could go. Ordered by value,
not by effort.

> **Status: all six are implemented.** This file is kept as the reasoning behind
> them — what the problem was and why the fix takes the shape it does.

The phthalo-green identity, Newsreader/Inter pairing and card rhythm are
genuinely good and worth protecting. Everything below builds on them rather than
replacing them.

---

## 1. The hero is a greeting where it should be a thesis

**What's there now:** a rotating welcome line, a one-sentence blurb, then three
stats in a row (days / topics reviewed / external credits), then a white pill
button, on a green radial gradient.

That stat row is the single most templated thing on the site. A big number with
a small label, two supporting stats, a gradient — it is the answer you would get
for any dashboard, for any product, and it says nothing about NCEA.

**What the site actually knows that nothing else does: the shape of your year.**
Four terms, two holiday blocks, study leave, 26 exam sittings, and your own
internal due dates — all of it already lives in `data/planner.js`,
`data/exams.js` and the planner. Nobody else can draw your year. That is the
thesis, and it should be the hero.

```
┌─────────────────────────────────────────────────────────────────────┐
│  AUG          SEP           OCT           NOV           DEC         │
│  ────────────┬─────────────┬──┬──────────┬─────────────┬──────       │
│   TERM 3     │   holidays  │  TERM 4     │▨ study leave ▨│           │
│      ▲   ● ●       ● ●             │        ▮  ▮ ▮   ▮  ▮           │
│    today  internals   derived              externals                │
└─────────────────────────────────────────────────────────────────────┘
       36 days to your first derived grade exam
```

One horizontal band, today as a bright marker, terms as tonal blocks, holidays
lighter, study leave hatched, assessments as ticks coloured by subject. The
"36 days" becomes a caption *on* the bar rather than a stat in a row.

This is the **signature element**: the one thing the site would be remembered
by. Spend the boldness here and keep everything around it quiet.

---

## 2. Newsreader is carrying about 2% of the design

It appears on page titles, card headings, the flashcard question and the
calendar month. That's it — eight rules in the whole stylesheet.

Meanwhile the site's actual substance is **numbers**: credits banked, grades,
rank score, indicative ATAR, days remaining. Those all sit on Inter.

The stylesheet explains why, and it is right *for tables*: Inter's tabular
figures line up in columns where a serif's proportional ones do not. But the
hero figures, the donut centre and the goal number are not in columns. They are
display type, and they are the emotional moments of the page — the number a
student actually came to look at.

**Proposal:** move display-scale figures to Newsreader, keep every figure inside
`table.data` on Inter.

| Class | Where | Change |
|---|---|---|
| `.hs-num` | hero stats | → `--font-display` |
| `.gf-num` | goal figure | → `--font-display` |
| `.stt-num` | stat tiles | → `--font-display` |
| `.snap-num` | snapshot | → `--font-display` |
| everything in `table.data` | credit table, timetables | **unchanged** |

Cheapest change on this list, and it changes the feel most per line of CSS.

---

## 3. Four colour languages competing on one row

A single "What's coming" row currently carries:

- a **subject dot** (colour = subject)
- a **status pill** (colour = status)
- a **due pill** (colour = urgency)
- and on the calendar, a **kind style** (internal / derived / external)

Four encodings for what a reader processes as two facts: *what is it* and *how
soon*. They compete, and colour is doing three different jobs at once.

**Proposal — give each fact its own channel:**

- **Subject → colour.** The dot only. It is the one thing colour is genuinely
  good at here, and subjects already have stable hues.
- **Kind → shape.** Internal = filled chip, external = outlined, derived =
  dashed outline. The calendar already half does this; finish it and drop the
  legend.
- **Urgency → weight and position.** Overdue and today earn colour; everything
  else is a plain right-aligned figure. If everything is coloured, nothing is
  urgent.

Chanel's rule applies: the status pill is the accessory to remove.

---

## 4. The credit table is grouped by a code, not a subject

Group headers read **13CHE**, **13PHY**, **13ENU**. The rest of the site — the
sidebar, the calendar, the timetable, the dashboard — says *Chemistry*,
*Physics*, *English*.

The class code matters (it is what the school and the DGE timetable use) but it
is secondary information. Swap the hierarchy:

```
● Chemistry            13CHE
```

Subject name at body weight, code in `--font-mono` at `--fs-xs` in `--muted`.
One line of markup in `js/pages/progress.js`, and the table stops speaking a
different language from every other page.

---

## 5. First run reads as failure

A new student lands on Progress and sees **0 / 60 credits banked** and **148
credits still to sit**, with a full table of blank dropdowns.

Every number is correct and the whole screen says *you have done nothing*. An
empty screen should be an invitation to act.

**Proposal:** when nothing has been entered, replace the table with a single
step — "Which subjects are you taking?" and the subject picker. The stat row,
the donut and the table appear once there is something to put in them. Same
components, just sequenced.

---

## 6. The one thing I would cut

The hero's radial gradient. Green-on-green with a soft light bloom in the corner
is the most generic surface on an otherwise disciplined site, and it is fighting
the year-bar idea in §1 for the same space.

Flat `--brand-deep`, the year bar as the only ornament, and the CTA as the only
bright element. That is a hero with a point of view instead of a background
effect.

---

## Order they were done in

1. **§2 typography** — an afternoon, biggest visible change per line.
2. **§4 subject names** — ten minutes, removes a real papercut.
3. **§3 colour channels** — half a day, makes every list calmer.
4. **§1 the year bar** — the real project, and the thing worth doing properly.
5. **§5 first run** — do it alongside §1, since both are about sequencing.
6. **§6 cut the gradient** — falls out of §1 for free.
