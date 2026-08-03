# Setting this up for a different student

This site was built for one Year 13 student, but almost none of it is *about*
them. The teaching content, the flashcards, the questions, the credit maths and
the whole app are generic NCEA Level 3 material.

**Four data files carry everything personal — about 24 KB against ~1.16 MB of
reusable content.** Work through them in this order and you're done. No build
step, no npm install, nothing to compile.

---

## 1. `data/profile.js` — who this copy belongs to

```js
export const profile = {
  name: 'Chey',                    // dashboard greeting
  school: 'Wellington College',    // explanatory copy only
  year: 2026,
  level: 'NCEA Level 3',
};
```

Change four strings. That's the whole file.

---

## 2. `data/results.js` — their NZQA Record of Learning

**This is the important one, and it does more than you'd expect.** Everything
downstream reads it:

- the Progress & credits page (banked / still to sit / projected)
- the rank-score and indicative-ATAR models
- which internals the planner offers to load
- whether a revision session includes a topic or skips it
- **which subjects appear anywhere in the site** (see below)

Log in to NZQA, open the Record of Learning, and transcribe every Level 3 row.
Each row looks like this:

```js
{ group: '13CHE', subject: 'Chemistry', code: '3.5', as: '91391',
  topicId: 'chem-91391',
  title: 'The properties of organic compounds',
  credits: 5, status: 'external', assess: 'External' },
```

| Field | Notes |
|---|---|
| `group` | The school class code (`13CHE`). Cosmetic — used for grouping the table. |
| `subject` | **Must match a `name` in `data/subjects.js` exactly** (`Chemistry`, not `Chem`). This is what links a row to a subject. |
| `code` | The NCEA code as written on the record (`3.5`). |
| `as` | The five-digit achievement standard number. Leave `''` if unsure — don't guess. |
| `topicId` | Links the row to teaching content. Use the id from `data/subjects.js`, or `null` for a standard this site doesn't teach. |
| `credits`, `assess` | Must agree with `data/subjects.js` for any standard that has a `topicId`. |
| `status` | `achieved` · `pending` · `todo` · `external` · `notassessed` · `na` |
| `grade` | `'A'` / `'M'` / `'E'` — only on `achieved` rows. |
| `resit: true` | Already achieved but being re-sat to lift the grade. Credits are banked, so a resit can only improve things. |

Also update the `qualification` block at the top (numeracy, literacy, UE
literacy, and the credit totals by level) straight off the record's summary
panel.

### Subjects they don't take

**You don't have to delete anything.** Enrolment is derived from this file: a
subject with no rows on the record simply doesn't appear in the sidebar, the
dashboard tiles, the standards count, the exam tables or the calendar. Its
pages still resolve if someone follows a direct link, so nothing 404s.

So a student taking Chemistry, Physics and Calculus gets a three-subject site
just by transcribing their own record. Biology, Statistics and English go quiet
on their own. (If `results.js` were left completely empty, all six show — that's
the deliberate fallback, not a bug.)

### Subjects this site doesn't teach

Add the rows anyway with `topicId: null`. They'll count toward credits, rank
score and ATAR correctly; they just won't have a teaching page.

---

## 3. `data/exams.js` — their timetables

Two lists: the real NCEA externals (November) and the school's derived-grade /
trial exams (September).

```js
{ subject: 'chemistry', standards: 'AS 91390 · 91391 · 91392',
  date: '2026-11-20T14:00', session: 'PM' },
```

`subject` is the **id** from `data/subjects.js` (lowercase: `chemistry`), not
the display name. Dates are local time, `YYYY-MM-DDTHH:MM`. NZQA morning exams
start 9:30, afternoons 14:00.

You can leave subjects in here that the student doesn't take — they're filtered
out against the record automatically.

---

## 4. `data/planner.js` — their school's term dates

```js
const TERMS_2026 = {
  4: { start: '2026-10-12', end: '2026-12-11', label: 'Term 4' },
};
```

Only affects internals entered as a rough *"Term 3, Week 4"* rather than a firm
date — those get placed on the calendar approximately, marked `≈`.

---

## That's it

Everything below this line is generic and should be left alone:

- `data/content/**` — the teaching notes, flashcards and questions
- `data/subjects.js` — the standards structure *(only edit if a standard's
  credits or Internal/External status genuinely changed)*
- `js/**`, `css/**` — the app itself

### A few things worth knowing

- **All progress is per-browser.** It lives in `localStorage` under the `ncea.`
  prefix, so a fresh copy starts completely clean — no inherited streak, flags,
  Leitner boxes or quiz scores.
- **Internals aren't in any data file.** The student adds them on the *My
  internals* page, or clicks "Load my N outstanding internals" to seed them from
  the record in one go. They start with no dates; adding dates puts them on the
  calendar.
- **One content file is tied to a specific text choice:**
  `data/content/english/visual.js` is written around *Inception* and
  *Interstellar*. A student studying different films needs that page rewritten.
  It's the only such file.
- **To run it:** `python3 serve.py` and open <http://localhost:8000>. Use
  `serve.py` rather than `python3 -m http.server` — it sends no-cache headers,
  and browsers cache ES modules hard enough that you'll otherwise keep seeing
  your old edits.

### Checking your work

After editing, open the site and look at:

1. **Sidebar** — only their subjects listed?
2. **Progress & credits** — do the banked / still-to-sit totals match the real
   record?
3. **Calendar** (`#/calendar`) — are the right exams on the right dates?
4. **Exams & deadlines** — does the badge count look right?

If a standard's credits disagree between `results.js` and `subjects.js`, the
Progress page trusts `results.js`. Make them agree rather than relying on that.
