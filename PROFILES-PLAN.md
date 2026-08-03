# Plan: multiple profiles / anyone can use the site

**Status: proposal only. Nothing in this document has been built.**

Now the site is published, the assumption baked into it — *"this is Chey's copy"* —
is the thing that has to go. This is how I'd unpick it, in the order I'd do it.

---

## The core problem

There are three different kinds of data in the site today, and only one of them
is currently per-user:

| Kind | Where it lives now | Per-user today? |
|---|---|---|
| Progress — streak, flags, Leitner boxes, quiz scores | `localStorage` under `ncea.` | Yes, per browser |
| The student's record — standards, credits, grades | **`data/results.js`, shipped in the repo** | **No — it's Chey's** |
| Teaching content — notes, flashcards, questions | `data/content/**` | Shared, correctly |

So a visitor today gets *Chey's NZQA record* as their starting point and has to
edit 33 rows to make it theirs. That's the thing to fix.

**Design principle: keep it backendless.** The site's whole advantage is that it
is static, free to host and has no account to lose. A login server would fix
this but would cost money, need privacy handling for minors' academic records,
and break the "just push it to Vercel" story. Everything below stays static.

---

## Phase 1 — Separate "the record" from "the app" *(the essential change)*

`data/results.js` stops being the source of truth and becomes a **seed** that is
only used if the profile has no record of its own.

```
store.profile()          → { id, name, school, year, level }
store.record()           → the student's own standards array
store.hasRecord()        → false on a brand-new profile
```

On first visit, a **setup flow** runs instead of the dashboard:

1. *What's your name?* → profile
2. *What subjects are you taking?* → pick from the six taught subjects **plus the
   NZQA catalogue already built** (`data/nzqa-catalogue.js`, 25 subjects)
3. *Paste or enter your standards* → pre-filled from the picks, all statuses
   default to "not sat yet"
4. Done → dashboard

**Chey's data becomes a demo profile,** loadable with one click ("try it with
sample data"), which is genuinely useful for showing someone what the site does.

*Estimated size:* the biggest single change. Every read of `results` becomes a
read of `store.record()` — 6 files, roughly 20 call sites.

---

## Phase 2 — Multiple profiles in one browser

Namespace the storage key by profile id:

```
ncea.p.<profileId>.reviewed
ncea.p.<profileId>.streak
ncea.p.<profileId>.record
...
ncea.profiles        → [{ id, name, lastUsed }]
ncea.activeProfile   → 'p_a81f'
```

A profile switcher goes in the sidebar footer. This covers the realistic cases:
siblings sharing a laptop, or a student keeping a "what if I got Merit in
everything" scenario next to their real one.

**Migration matters.** Anyone already using the site has data under the old flat
keys. On first load after this ships, move every `ncea.<key>` to
`ncea.p.<firstProfileId>.<key>` once, and leave a marker so it never runs twice.
Get this wrong and people lose their streak.

---

## Phase 3 — Export / import / share

Because there's no server, the profile has to be portable by hand:

- **Export** → downloads `my-ncea-profile.json` (record + progress + settings)
- **Import** → drag the file back in, on any device
- **Backup reminder** — `localStorage` is genuinely fragile: clearing site data,
  Safari's 7-day eviction of unused sites, or switching browsers all wipe it.
  A prompt every ~30 days ("back up your profile?") is worth the nag.

This also solves cross-device: the URL is public, so the student opens it on
their phone and imports the file.

⚠️ **Say plainly in the UI that progress is per-browser and not synced.** Right
now someone could reasonably assume a published site remembers them. It doesn't.

---

## Phase 4 — Make the teaching content optional

Once anyone can use it, most visitors will take subjects the site doesn't teach.
The site should degrade honestly:

- Subjects with content → full experience (already works via `enrolledSubjects`)
- Subjects from the catalogue → credits, deadlines, calendar, ATAR — **but the
  revision session and flashcards should say "no content for this subject yet"
  rather than silently offering nothing**
- Don't let the "Standards reviewed 0 / 0" sidebar appear for someone taking no
  taught subjects — hide it instead

---

## What NOT to do

- **No accounts, no backend, no database.** It would cost money, need a privacy
  policy for storing minors' academic records, and remove the main reason this
  thing is easy to host and share.
- **Don't put the record in the URL.** Tempting for sharing, but it puts grades
  in browser history, referrer headers and anyone's screen-share.
- **Don't auto-sync to a third-party service** (Firebase, Supabase) without
  thinking hard about who is legally responsible for that data. A student's
  NZQA record is sensitive.

---

## Suggested order

1. **Phase 1** — this is the one that actually makes the site usable by someone
   who isn't Chey. Everything else is comfort.
2. **Phase 3 export/import** — next, because without it people *will* lose data
   and won't come back.
3. **Phase 2 multiple profiles** — nice, not urgent.
4. **Phase 4 polish** — do it as the rough edges get reported.

---

## Already done that this plan builds on

- `data/profile.js` — name/school/year already lifted out of the code
- `enrolledSubjects` / `enrolledStandards` — the site already narrows itself to
  the subjects on the record, so a 3-subject student gets a 3-subject site
- `data/nzqa-catalogue.js` + the standards library — 25 subjects and 129
  standards that any student can already add to their credit tracking and
  calendar without touching a file
- `store.extraStandards()` — user-added standards already live in `localStorage`
  rather than the repo, which is exactly the pattern Phase 1 generalises
