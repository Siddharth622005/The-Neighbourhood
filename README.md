# The Neighbourhood — website

Vite + React + Tailwind. Deployed to Vercel.

- `src/pages` — routes (`/`, `/story`, `/values`, `/faq`, `/today`, `/day`)
- `src/components/v3`, `src/components/v4` — page sections
- `src/data/journeyStages.json` — the 15-stage milestone dataset, also the
  source for the mobile app's seeded `milestones` table
- `npm run gen:timeline` — regenerates `src/data/timelineSummary.js`

## Database schema lives in the mobile repo

**Do not add migrations here.** The website and the mobile app share one
Supabase project, and its schema is now owned by:

    the-neighbourhood-mobile/supabase/migrations/

The waitlist migrations that used to live in this repo were moved there
verbatim (same filenames — Supabase tracks applied migrations by filename,
so renaming any of them would make the CLI try to re-run them against a
database where they've already run).

The website still reads the `waitlist` table and its RPCs
(`get_queue_position`, `get_total_signups`, `find_my_spot`) through
`src/lib/supabaseClient.js`. That hasn't changed — only where the SQL that
defines them is kept.

`supabase/schema.sql` remains here as a historical snapshot of the
waitlist tables. It is **not** applied by the CLI and is not authoritative;
the migrations in the mobile repo are.
