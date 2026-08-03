# NCEA Level 3 Study Hub

Chey's personal study site for NCEA Level 3 externals — **Chemistry, Physics, Calculus, Statistics, Biology and English**. Pure static site (HTML/CSS/vanilla JS), no build step, no backend. All progress is saved in your browser (localStorage).

---

## ▶️ Run it locally

You just need Python 3 (already on your Mac). From this folder:

```bash
python3 serve.py
```

Then open **http://localhost:8000** in your browser.

> **Why `serve.py` and not `python3 -m http.server`?** Both work, but `serve.py` sends no-cache headers. Browsers cache ES modules aggressively, so after you edit a content file the plain server can leave you staring at the old version. With `serve.py`, a normal refresh always shows your edits.
>
> **Why a server at all?** The site loads content as ES modules, which browsers block on the `file://` protocol — so double-clicking `index.html` won't work.

### Hosting it online later
Because everything is static and uses hash-based routing (`#/chemistry/...`), it drops straight onto **GitHub Pages**, **Netlify**, **Cloudflare Pages**, etc. — just upload the whole folder, no configuration needed.

---

## 🧭 What's built

- **Homepage dashboard** — greeting, exam countdown, study-streak tracker, flagged counter, and per-subject progress.
- **6 subjects**, each with an overview page listing its achievement standards (credits, External/Internal, descriptions).
- **A teaching page per standard** — notes, key concepts, formula/technique tables, worked examples, common-mistake callouts, curated NZQA + No Brain Too Small links, and a practice quiz.
- **A printable reference sheet per subject.**
- **A year calendar** (`#/calendar`) — every internal, derived-grade exam and external on one month grid, coloured by subject and shaped by assessment type.
- **Global search**, a **flagged-for-review dashboard**, **dark mode**, and a **fully responsive** layout (phone + laptop).

### Depth by subject
| Subject | Standards | Notes |
|---|---|---|
| **Chemistry** ⭐ | 91387, 91388, 91390–91393 (6) | Deepest build. Organic (91391) with **properly-drawn curly-arrow mechanisms**, mnemonics, pathways; Spectroscopy (91388) with combined MS/IR/NMR deduction. **Every topic opens with a "How this connects" panel** linking it to the other standards. ~153 flashcards. |
| **Physics** | 91521, 91523–91526 (5) | Waves, Mechanical Systems (SHM/pendulum/bifilar/orbital derivations), Electrical Systems. SHM cross-links to Calculus; nuclear decay cross-links to Statistics. |
| **Calculus** | 91577–91579 (3) | Complex numbers, differentiation, integration. u-substitution is taught inside 91579 Integration methods (first principles → changing limits), with the practice questions folded into that standard's bank. |
| **Statistics** | 91584–91586 | Reports, probability, distributions. |
| **Biology** | 91603, 91605, 91606 | ✅ NZQA-verified. **Key Definitions box** at the top of every topic, and **per-topic colour coding** (amber / blue / violet). |
| **English** | 91472, 91473 | ✅ NZQA-verified. Visual essay tailored to *Inception* / *Interstellar*. |

---

## ✏️ Editing content yourself

All content is **data, kept separate from the design code** — you never have to touch CSS/JS to add notes or questions.

```
data/
├── subjects.js          ← the master list: subjects, standards, credits, nav
├── exams.js             ← REAL 2026 exam + derived-grade dates
└── content/
    ├── chemistry.js      ← wires each standard to its content file
    ├── chemistry/        ← one file per Chemistry topic (organic.js, etc.)
    ├── physics.js  + physics/
    ├── calculus.js + calculus/
    ├── statistics.js + statistics/
    ├── biology.js  + biology/
    └── english.js  + english/
```

Each topic file is a plain object with `sections` (teaching content as "blocks"), `flashcards`, `links` (past papers) and `quiz` (questions). The block types (`p`, `key`, `note`, `table`, `formulas`, `example`, `reveals`, `rxnmap`, `figure`, …) are documented at the top of **`js/ui.js`**. To add a quiz question, just add an object to the topic's `quiz` array:

```js
{ type: 'mc', q: 'Question?', choices: ['A','B','C'], answer: 1, explanation: 'Why B is right.' }
// or short answer:
{ type: 'sa', q: 'Question?', accept: ['answer','alt'], answer: 'answer', explanation: '…' }
```

To add a flashcard, add to the topic's `flashcards` array — `explain` becomes the
"💡 Explain this answer" expander:

```js
{ q: 'Front of the card', a: 'Short answer', explain: 'The fuller reasoning.' }
```

Useful block types added recently: `definitions` (Key Definitions box),
`connects` (a "How this connects" cross-link panel), `video`, and `figure`.

---

## 📊 Your NZQA record

The **Progress** page is seeded from your actual Record of Learning (`data/results.js`), so the
numbers are real, not placeholders: **43 Level 3 credits** (17 A · 4 M · 22 E), literacy and
numeracy met, UE literacy met (Read 13 / Write 12). It also shows **63 credits still to sit**
and a **106 projected** total if you pass everything.

Your three **Calculus re-sits** (3.5 complex numbers, 3.6 differentiation, 3.7 integration —
17 credits, currently Achieved) are flagged with a 🔁 badge. Re-sitting can only *raise* those
grades; the credits are already banked and can't be lost, so they're pure endorsement upside.

Two internals you're not doing were removed: **Chemistry 3.3 (91389 Chemical processes)** and
**Physics 3.2 (91522 Application of Physics)** — consistent with your record, where neither appears.

---

## ⚠️ Placeholder content — please verify / fill in

1. **Exam dates are now the REAL 2026 dates** transcribed from your Wellington College timetables (see the **Exams timetable** tab). One caveat to confirm: the **derived-grade** dates for **Calculus (13MAC)** and **Statistics (13MAS)** were placed from class codes — double-check they're yours. Everything lives in `data/exams.js`.
2. **English written-text essay (91472)** — the technique examples use generic patterns because I don't know your studied written text. **Swap in your text's title, quotations, and specific examples.** (The visual-text page is already tailored to Inception/Interstellar.)
3. **YouTube videos** are curated *search links* (they open a YouTube search for that topic, so they never go stale). Watch a couple and pin your favourites if you like.
4. **Past-paper tables** auto-link to the last 5 years of official NZQA exam PDFs + marking schedules. If a specific year 404s (occasionally a paper sits under a different code), the note under the table points you to the NZQA subject page.
5. **ATAR vs rank score are different calculations.** Rank score (NZ unis incl. Auckland) = best **80** L3 credits, max 5 subjects, 24/subject, E=4 M=3 A=2, max 320 — the site computes this exactly. ATAR (Australian unis, calculated by NZQA) = best **90** L3 credits, max 24/subject, with externals ranked above internals and a **60-credit minimum** before NZQA will calculate one. NZQA also applies annual difficulty scaling and does not predict ATAR in advance, so the ATAR column is an indicator of direction only.
6. **Credit values in the Progress tracker** are pre-filled from the standards list. **Check them against your NZQA Record of Learning** before trusting the totals — and note the UE calculation is a simplified "14 credits × 3 subjects" model, not NZQA's full rule set (it ignores the literacy/numeracy requirements).
6. **Exam durations for timed practice** (in `js/timer.js`) are per-standard estimates, since NCEA papers are timetabled per subject (typically 3 hours for a whole subject paper). Adjust `EXAM_MINUTES` if your teacher gives you different figures.
7. **Content is revision-level, not a textbook** — accurate and exam-focused, but always cross-check anything crucial against your class notes and the official NZQA assessment specifications.

### ✅ Already verified against NZQA (31 Jul 2026)
- **Biology** externals: **91603** *Responses of plants and animals to their external environment* (5 cr), **91605** *Evolutionary processes leading to speciation* (4 cr), **91606** *Trends in human evolution* (4 cr). *(Note: 91607 is an internal, so it's not included as an external.)*
- **English** externals: **91472** *Respond critically to studied written text(s)* (4 cr), **91473** *Respond critically to studied visual or oral text(s)* (4 cr).
- The Chemistry, Physics, Calculus and Statistics standard numbers are the ones you supplied — double-check them against your NZQA login if the Level 3 standards change.

---

## ✨ Features reference

**Study tools**
- **Flashcards with spaced repetition** — a Leitner system: grade yourself ✓/✗ after each card. Wrong cards return next session; cards you know keep moving to longer intervals (boxes 1→4). Each answer has an optional **"💡 Explain this answer"** expander.
- **Randomised quizzes** — question order *and* multiple-choice options shuffle every attempt.
- **Timed exam practice** — the ⏱ button on any past paper opens the PDF and starts a floating countdown matching that standard's exam length, with a warning in the last 5 minutes and a chime at zero.
- **"Focus on this"** — the homepage automatically surfaces your 5 weakest topics based on quiz history.
- **Command-word glossary** — what *describe / explain / discuss / evaluate / justify* actually demand, with the same content answered three ways.

**Tracking**
- **Progress & credits** — record every standard as not sat / awaiting result / achieved (A, M, E), see a donut of credits by grade, per-subject bars, and progress toward a goal (UE, L3 certificate, Merit/Excellence endorsement, or a custom target).
- **Exams timetable** — your real 2026 externals and the September derived-grade trials, with countdowns.
- **Mark reviewed / flag for review** — flagged topics collect on their own dashboard.
- **Study streak** — counts consecutive days.

**Content**
- **"How this connects"** panels on every Chemistry topic explaining how the standards feed each other.
- **"Related in other subjects"** cross-links where they're genuinely useful (SHM ↔ Calculus derivatives, radioactive decay ↔ Poisson, the two English essays).
- **Mnemonics** for the rules worth memorising ("the rich get richer" for Markovnikov, "broad and low = acid" for IR, "OIL RIG", and more).
- **Real-world "Why this actually matters"** panel on every subject overview.
- **Explainer videos** — topic-specific YouTube search links throughout.
- **Past-exam tables** — last 5 years of official NZQA papers + marking schedules per external.

**Interface**
- Global search (`/` to focus) · dark mode · print-friendly reference sheets · fully responsive.


## 🎨 Design
Phthalo-green palette defined as CSS custom properties in `css/styles.css` (top of file — easy to retune). Fonts: **Fraunces** (headings) + **Inter** (body) + **JetBrains Mono** (formulas), loaded from Google Fonts. Each subject has its own accent within the green family.
