# Turning on accounts

Everything is built. **Nothing works until you do the steps below**, because
they need an account only you can create. Until then the site runs exactly as it
does today: local-only, with the Sign up / Log in buttons hidden.

Budget about 25 minutes. Steps 1–4 get you email accounts working; step 5 adds
Google; step 6 is deployment.

---

## What you're setting up, and why

| Need | Handled by |
|---|---|
| Password hashing | Supabase Auth (bcrypt, server-side — passwords never reach your code) |
| Verification emails | Supabase Auth |
| Google sign-in | Supabase Auth + Google Cloud OAuth |
| Storing results per user | Supabase Postgres, one row per user |
| Stopping user A reading user B | Postgres Row Level Security |

**Hosting does not change.** Vercel keeps serving static files. Supabase is
reached from the browser over HTTPS. There is no server to run, no build step,
and no npm install.

**Cost: £0.** Free tier is 50,000 monthly active users, 500 MB database,
unlimited API requests. A full student record is a few KB, so a whole school
would fit. Two caveats, both real:

- **Free projects pause after 7 days of no activity.** One visit wakes it, and
  waking takes a few seconds. Not a problem if you use the site; worth knowing
  if you leave it over a holiday.
- **No automatic backups on free.** This is exactly why Download my data still
  exists — keep using it.

---

## 1. Create the Supabase project

1. Go to <https://supabase.com> → **Start your project** → sign in with GitHub.
2. **New project**.
   - **Name:** `study-hub`
   - **Database password:** click Generate, then **save it in your password
     manager**. You will not need it for this site, but you cannot recover it.
   - **Region:** `Oceania (Sydney)` — `ap-southeast-2`. This is the region
     Supabase lists for Australia and New Zealand: about 2,200 km from
     Wellington against Singapore's 8,400, which is roughly 30–45 ms of round
     trip instead of 130–180.

     ⚠️ **The region cannot be changed after the project is created.** Moving
     later means a new project and migrating the data, so pick Sydney now.
3. Wait ~2 minutes while it provisions.

## 2. Copy your keys into the site

You need two values: the **Project URL** and the **publishable key**.

### The easy way: the Connect button

At the top of your project dashboard there is a **Connect** button. Click it and
it shows the Project URL and the key together, ready to copy. This is the
quickest route and works regardless of how the settings menu is arranged.

### Finding them in Settings

**The key:** left sidebar → **Settings** (cog) → **API Keys**.

**The Project URL:** same Settings area, under **API** or **Data API**
(the page name has moved around between dashboard versions).

### If you cannot find the Project URL at all

You can read it straight out of your browser's address bar. While you are in
the project, the address looks like:

```
https://supabase.com/dashboard/project/abcdefghijklmnop
                                        ^^^^^^^^^^^^^^^^
                                        this is your project ref
```

Your Project URL is always that ref with `.supabase.co` on the end:

```
https://abcdefghijklmnop.supabase.co
```

That is not a workaround, it is just how Supabase builds the URL, so it is
always correct.

### Which key?

⚠️ **Supabase changed key formats during 2026.** A new project shows the new
ones; an older project may still show the legacy pair. **Either works** — this
site accepts both.

| Take this one | Not this one |
|---|---|
| `sb_publishable_...` | `sb_secret_...` |
| *or the legacy* `anon` `public` (starts `eyJ`) | *or the legacy* `service_role` |

The rule regardless of format: **if it says publishable or anon, take it. If it
says secret or service_role, leave it.** The wrong one bypasses every security
rule and must never appear in browser code or a git repo.

The publishable key being visible is fine and intended — step 3 is what actually
protects the data.

### Paste them in

Open `js/auth/config.js`:

```js
export const SUPABASE_URL      = 'https://abcdefghijklmnop.supabase.co';
export const SUPABASE_ANON_KEY = 'sb_publishable_...';   // or a legacy eyJ... key
```

Save, reload the site, and the **Log in / Sign up** buttons appear in the top
right. If they do not, the keys have not been picked up — check for a stray
quote or a missing `https://`.

## 3. Create the place your results will live

### First, what this step actually is

Right now your results live in your browser. This step creates the **table** in
Supabase that will hold them instead, and then locks it so that each person can
only ever see their own.

Some words you will meet:

- **Database** — a store of information, organised into tables.
- **Table** — a grid, like a spreadsheet. Columns are the kinds of information;
  each row is one record. Yours will have one row per user.
- **SQL** — the language you use to talk to a database. "Structured Query
  Language". You are not learning it here; you are pasting three commands.
- **SQL Editor** — a page in the Supabase dashboard that is just a big text box
  and a Run button. You paste SQL in, press Run, and it does it. That is all it
  is.
- **RLS (Row Level Security)** — the rule system that decides who is allowed to
  touch which rows. **This is the part that stops one student reading another's
  grades.** Without it, the table is readable by anyone.

### 3a. Open the SQL Editor

1. In your Supabase project, look at the **narrow icon strip down the far left**
   of the screen.
2. Find the icon that looks like a **database / terminal symbol**, labelled
   **SQL Editor** when you hover over it. It sits in the group with Table
   Editor and Database.
3. Click it. You get a mostly empty page with a large text area.
4. If there is already a tab open with something in it, click **+ New query**
   (top left of that panel) so you have an empty one.

### 3b. Paste and run

Copy this **entire block** — all of it in one go, do not run it line by line —
paste it into the empty text area, then click the green **Run** button (bottom
right of the editor, or press Ctrl/Cmd + Enter).

```sql
-- 1. THE TABLE.
--    user_id     which account the row belongs to. Links to Supabase's own
--                list of users, and "on delete cascade" means deleting an
--                account deletes its data too, rather than leaving it orphaned.
--    data        the results themselves, as JSON. Same shape as the backup
--                file, so the cloud copy, the local copy and the download all
--                match.
--    updated_at  when it last changed. The site uses this to work out whether
--                this browser or the account holds the newer copy.
create table if not exists public.user_data (
  user_id    uuid primary key references auth.users(id) on delete cascade,
  data       jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

-- 2. TURN THE LOCK ON.
--    With RLS enabled and no policies, NOBODY can read anything, not even you.
--    That is the safe starting point. The policies below then open up exactly
--    one thing and nothing else.
alter table public.user_data enable row level security;

-- 3. THE POLICIES.
--    auth.uid() is "the id of whoever is asking, right now".
--    Every rule says: allowed, but only where the row's user_id is your own id.
--    There is no way to phrase "let me see someone else's row", so there is no
--    way to do it, even if someone had your publishable key.
create policy "read own data"   on public.user_data
  for select using (auth.uid() = user_id);

create policy "insert own data" on public.user_data
  for insert with check (auth.uid() = user_id);

create policy "update own data" on public.user_data
  for update using (auth.uid() = user_id)
           with check (auth.uid() = user_id);

create policy "delete own data" on public.user_data
  for delete using (auth.uid() = user_id);
```

**What you should see:** a green **Success. No rows returned** message near the
bottom. That is correct — you created things rather than looked anything up, so
there are no rows to show.

If you see red text instead, read the message. `already exists` is harmless (you
have run it twice). Anything else, check you pasted the whole block.

### 3c. Check the lock is actually on

**Do not skip this.** If RLS is off, every user's results are readable by
anyone with the key, and the key is in your public source code.

#### The reliable way: ask the database

You are already in the SQL Editor from 3b, so stay there. Open a **+ New query**
and run this. It does not change anything, it just reports back.

```sql
select
  case when c.relrowsecurity then 'YES' else 'NO -- NOT SAFE' end as rls_on,
  (select count(*) from pg_policies
     where schemaname = 'public' and tablename = 'user_data')      as policies,
  case
    when c.relrowsecurity
     and (select count(*) from pg_policies
            where schemaname = 'public' and tablename = 'user_data') = 4
    then 'ALL GOOD'
    else 'SOMETHING IS MISSING -- re-run the block in 3b'
  end                                                              as verdict
from pg_class c
join pg_namespace n on n.oid = c.relnamespace
where n.nspname = 'public' and c.relname = 'user_data';
```

This time you get an actual result table underneath. You want:

| rls_on | policies | verdict |
|---|---|---|
| YES | 4 | ALL GOOD |

- **`rls_on` says NO** → run `alter table public.user_data enable row level
  security;` on its own, then re-run the check.
- **`policies` is less than 4** → the `create policy` lines did not all run.
  Re-run the whole block from 3b; `already exists` errors on the table are
  harmless.
- **No rows come back at all** → the table was never created. Re-run 3b.

#### The visual way, if you would rather see it

The dashboard moves things between versions, so this is a guide rather than an
exact path:

1. Far-left icon strip → the **grid / spreadsheet icon**, labelled **Table
   Editor** on hover. It is usually the top icon of the group.
2. A panel opens on the left listing your tables. Make sure the **schema**
   selector at the top of that panel says **public**, then click **user_data**.
3. The badge sits near the table name at the top of the main area. Green
   **RLS enabled** is what you want; orange **RLS disabled** is not.

Some dashboard versions show it instead under **Database → Tables**, or as a
shield icon in the row for `user_data`. If you cannot find it, use the SQL check
above and move on — it is the same information and it cannot be misread.

The table itself will be empty. That is expected; nobody has signed up yet.

---

## How to get anywhere in Supabase (read this once)

Forget hunting for icons. **Every page in the Supabase dashboard has a direct
web address**, and they all follow the same pattern:

```
https://supabase.com/dashboard/project/YOURREF/...
```

`YOURREF` is the random-looking string already in your address bar whenever you
are in your project. It looks something like `abcdefghijklmnopqrst`.

**Copy it once and keep it handy.** Then to go anywhere, paste one of these into
your browser's address bar with your own ref swapped in:

| Where you want to go | Paste this |
|---|---|
| SQL Editor (new query) | `.../project/YOURREF/sql/new` |
| Table Editor | `.../project/YOURREF/editor` |
| Auth providers (step 4a) | `.../project/YOURREF/auth/providers` |
| URL configuration (step 4b) | `.../project/YOURREF/auth/url-configuration` |
| List of signed-up users | `.../project/YOURREF/auth/users` |
| API keys | `.../project/YOURREF/settings/api` |

(`...` = `https://supabase.com/dashboard`)

If a link ever 404s, Supabase has moved that page — fall back to the left-hand
menu. But these have been stable for a long time.

---

## 4. Turn on email accounts

**What this step does:** makes sign-up send a real verification email, and tells
Supabase which websites it is allowed to send people back to afterwards.

| | Default | Need to change it? |
|---|---|---|
| **4a** Email on + Confirm email | already on | **No** — just check |
| **4b** Site URL + Redirect URLs | `http://localhost:3000` | **YES, required** |

### 4a. Check email sign-up is on

**Go to:** `https://supabase.com/dashboard/project/YOURREF/auth/providers`

**What you will see:** a list of sign-in methods — Email, Phone, Apple, Azure,
Bitbucket, Discord, Facebook, GitHub, GitLab, Google, and so on. Each is a row
you can click to expand.

**Do this:**

1. Click the row that says **Email** (it is at or near the top).
2. It expands. Look for two switches:

   - **Enable Email provider** — should be **green / on**
   - **Confirm email** — should be **green / on**

   > **What "Confirm email" means:** with it ON, a new account does not work
   > until the person clicks the link in the email Supabase sends them. That is
   > the entire point of email verification — it proves they own the address.
   >
   > With it OFF, anyone could sign up as `principal@wellingtoncollege.school.nz`
   > and be logged straight in. You want it ON.

3. If you changed anything, click **Save** at the bottom of the expanded panel.
   If both were already on, change nothing and move on.

**Note:** you may also see "Secure email change" and "Secure password change"
toggles. Leave them at their defaults — the site works either way.

### 4b. Tell Supabase which sites are allowed — REQUIRED

**Go to:** `https://supabase.com/dashboard/project/YOURREF/auth/url-configuration`

**Why this is required:** a brand new project has **Site URL** set to
`http://localhost:3000`. Every verification and password-reset email points
there. That is not your site and not even your local port, so links in those
emails go nowhere until you change it.

**What you will see:** two boxes. A single-line **Site URL** field, and a
**Redirect URLs** section with an **Add URL** button.

**Do this:**

1. **Site URL** — clear out `http://localhost:3000` and put in:
   ```
   https://studyhubnz.com
   ```
   Click **Save** for that box.

2. **Redirect URLs** — click **Add URL**, paste one, confirm. Repeat for all
   three. They must be added one at a time.
   ```
   https://studyhubnz.com/account
   https://study-hub-coder-chey.vercel.app/account
   http://localhost:8765/account
   ```

   - The first is your real site.
   - The second is the Vercel address, in case you use it directly.
   - The third is your own computer, so you can test before deploying.
   - The `/account` on the end matters. That is the page the site listens on for
     people arriving from an email link.

3. Make sure all three appear in the list, then you are done with step 4.

**Test it now:** put your keys in `js/auth/config.js`, run the site, click
**Sign up**, use your own email. A verification email should arrive within a
minute. If it does not, check spam.

---

## 5. Google sign-in — OPTIONAL, SKIP IF YOU LIKE

**You do not need this.** Email accounts already work after step 4. This only
adds the "Continue with Google" button. Until you do it, that button shows an
error; everything else is unaffected.

It is the longest step because it involves a second company. Come back to it
another day if you want.

**What is actually happening:** Google will not let an unknown website ask for
someone's Google account. You register your site with Google, Google gives you
two strings (an ID and a secret), and you hand those to Supabase. Supabase then
talks to Google on your behalf.

### 5a. Make a Google Cloud project

**Go to:** <https://console.cloud.google.com> and sign in with your normal
Google account.

1. At the very top of the page, to the right of the "Google Cloud" logo, there
   is a **project dropdown** — it might say "Select a project".
2. Click it → a dialog opens → **New Project** (top right of that dialog).
3. **Project name:** `Study Hub`. Leave Location as "No organisation".
4. **Create**. Wait ~10 seconds.
5. Click the project dropdown again and **select `Study Hub`**. Everything below
   must happen inside this project — check the dropdown says "Study Hub" before
   continuing.

### 5b. Fill in the consent screen

This is the "Study Hub wants to access your Google Account" box people see.
Google will not give you credentials until it exists.

**Go to:** left menu (the ☰ hamburger, top left) → **APIs & Services** →
**OAuth consent screen**.

1. **User Type: External** → **Create**.
   (Internal only exists if you have a Google Workspace organisation.)
2. **App information:**
   - **App name:** `Study Hub`
   - **User support email:** pick your own email from the dropdown
   - **Developer contact information → Email addresses:** your own email again

   Everything else on this page is optional. Leave logo, domain and links blank.
   → **Save and Continue**

3. **Scopes** page → **Add or Remove Scopes** → a panel slides out with a long
   list. Tick these two:
   - `.../auth/userinfo.email` — described as "See your primary email address"
   - `.../auth/userinfo.profile` — described as "See your personal info"

   → **Update** → **Save and Continue**

4. **Test users** page → **+ Add Users** → type your own Gmail address →
   **Add** → **Save and Continue**.
5. **Summary** page → **Back to Dashboard**.

> **Leave the app in "Testing" mode.** You will see a "Publish App" button —
> ignore it. Publishing sends your site for Google review, which takes days and
> is only needed if strangers will sign in. In Testing, the Gmail addresses on
> your test-user list work fine, which is all you need.

### 5c. Create the credentials

**Go to:** left menu → **APIs & Services** → **Credentials**.

1. **+ Create Credentials** (near the top) → **OAuth client ID**.
2. **Application type:** **Web application**.
3. **Name:** `Study Hub Web` (only you see this).
4. **Authorised JavaScript origins** → **+ Add URI**, twice:
   ```
   https://studyhubnz.com
   http://localhost:8765
   ```
5. **Authorised redirect URIs** → **+ Add URI**. **Add exactly one**:
   ```
   https://YOURREF.supabase.co/auth/v1/callback
   ```

   > ⚠️ **Read this bit twice.** That URL points at **Supabase**, not at your
   > own website. Google sends the person to Supabase, and Supabase sends them
   > on to you. Putting `studyhubnz.com` here is the single most common mistake
   > and produces an error called `redirect_uri_mismatch`.
   >
   > `YOURREF` is the same string from your Supabase address bar. If you would
   > rather copy it exactly, open the Supabase Google page in 5d first — it
   > displays the precise URL for you to copy.

6. **Create**. A dialog appears showing **Client ID** and **Client secret**.
   Leave it open, or copy both into a scratch note for the next minute.

### 5d. Hand them to Supabase

**Go to:** `https://supabase.com/dashboard/project/YOURREF/auth/providers`

1. Scroll down the provider list to **Google** and click it to expand.
2. Turn on **Enable Sign in with Google**.
3. **Client IDs** — paste the Client ID from 5c.
4. **Client Secret (for OAuth)** — paste the Client secret from 5c.
5. **Save**.

Also on that page you will see the **Callback URL (for OAuth)** — that is the
exact string step 5c wanted. If you guessed it earlier, compare them now and fix
5c if they differ by even one character.

> The Google client secret lives in Supabase and never in your repository. That
> is correct: Supabase does the token exchange on its own servers, which is what
> a secret is for.

---

## 6. Put it live

Nothing about hosting changes. `js/auth/config.js` is an ordinary file, so it
ships like any other edit.

In Terminal, from your project folder:

```bash
git add .
git commit -m "Add accounts"
git push
```

Vercel sees the push and rebuilds on its own, usually within a minute. You can
watch it at <https://vercel.com/dashboard>.

> **Why the key is committed instead of hidden:** there is no build step in this
> project to substitute one in. The publishable key is *designed* to be visible,
> so committing it is safe **provided step 3's RLS is on** — that is what
> actually protects the data. If it still makes you uneasy, make the GitHub repo
> private, which is worth doing anyway because its history still contains your
> real NZQA record.

---

## Checking it all actually works

Six checks. Each proves a different piece.

**1. Sign-up and verification**
Open the site → **Sign up** → your name, your real email, a password meeting the
three rules on screen → the modal changes to "Check your email" → the email
arrives → type the code in → you are logged in and your name shows top right.

**2. Your password was never stored as text**
Go to `https://supabase.com/dashboard/project/YOURREF/auth/users`. Your account
is listed. There is nowhere in Supabase, or in this site, that can show you your
actual password — only a scrambled hash exists. That is correct and is how it
should be.

**3. Results reach the account**
Logged in, go to **Progress**, set one standard to Achieved with a grade. Wait
about three seconds. Then open
`https://supabase.com/dashboard/project/YOURREF/editor` and click **user_data**.
There is now one row, and the `data` column is full of text starting with `{`.

**4. It follows you to another device**
Open the site in a private/incognito window and log in with the same account.
Your grade is there. This is the entire point of the feature.

**5. Logged out still works**
Log out. The site keeps working on this browser's own data, and the Sign up /
Log in buttons come back. Nothing is locked behind an account.

**6. The security check worth doing**
Make a second account with a different email and enter a different grade. Then
look at **user_data** again: two rows, different `user_id` values, and neither
account can see the other's grades anywhere in the site. If both accounts show
the same data, RLS is not on — go back to step 3c.

---

## Troubleshooting

| What you see | What it means |
|---|---|
| No Sign up / Log in buttons at all | `config.js` is still blank or has a typo. Press F12 → Console; it will say which |
| Console: "That looks like a SECRET key" | You copied `sb_secret_` / `service_role`. Use the publishable / anon one |
| Console: "SUPABASE_URL must start with https://" | The Project URL is missing its `https://` |
| "Accounts are not set up on this copy of the site" | Same as the first row |
| Email never arrives | **Confirm email** off in 4a, or you hit the hourly limit. Check spam first |
| Email link errors or lands somewhere odd | A redirect URL is missing from 4b |
| Google: `redirect_uri_mismatch` | 5c's redirect URI must be the **Supabase** callback, not your own domain |
| Google: "app has not been verified" / blocked | The Gmail you are using is not on the test-user list from 5b |
| Logs in fine but results never sync | RLS policies missing. Re-run step 3, then the check in 3c |
| Slow on the first visit after a week away | Free project waking from pause. A few seconds, once |
