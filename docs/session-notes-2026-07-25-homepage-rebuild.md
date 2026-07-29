# Session notes — 2026-07-25 — Homepage rebuild & cleanup

## Summary

Rebuilt the homepage (previously staged at `/next` on the `homepage-v4`
branch) and promoted it to be the site's only homepage at `/`. Fixed
several content and UI bugs along the way, connected the production
Supabase waitlist, and cleaned up branches so only one version of the
site exists.

## What changed

### Homepage content
- Hero photo replaced with an autoplaying family video.
- "The Question" section rewritten into a "Why We Exist" section
  (three numbered truths: the village has scattered, plenty of advice
  with limited context, childhood moved indoors).
- "Today" section rewritten into three pillars — The Guidance, The
  Neighbours, The Spaces — each with real photography.
- Removed the "Your AI parenting companion" section entirely.
- Removed the "Grounded in real science" card from the Our Story page.

### Navigation
- Added a hamburger menu with a full-screen overlay for mobile, since
  the nav links were previously `hidden lg:flex` with no fallback —
  mobile visitors had no way to reach them at all.
- Fixed a real CSS bug found while building the overlay:
  `backdrop-filter` on `<nav>` was creating a new containing block for
  its `position: fixed` children, collapsing the overlay's height down
  to the navbar's own ~72px instead of the full viewport. Moved the
  blur onto an inner wrapper instead.
- Removed the "Today" link from the navbar on every page (it was still
  showing up on `/story` and elsewhere).

### Site structure
- Promoted the new homepage from `/next` to `/` and deleted the old
  landing page (`LandingPageV3`) and its exclusive section components
  (`HeroV3`, `Truths`, `Belief`, `Pillars`, `LifeInside`,
  `ClosingInvite`) — nothing else referenced them.
- `/next`, `/next/story`, `/next/values`, `/next/faq` now redirect to
  their new root-level paths for old links.
- Discovered `main` on GitHub had its own independent `/next` rebuild
  (9 commits, likely from a separate Vercel/codex agent process) —
  confirmed with the user, then overwrote `main` with this branch's
  work and deleted the now-redundant `homepage-v4` branch.

### Data bugs fixed (milestone timeline, "Every child on their own clock")
- 12–15 months' Motor milestone duplicated 10–12 months' verbatim
  ("Stands alone briefly") — reordered the source data so the more
  advanced milestone ("Takes first independent steps") shows first.
- Communication milestone word-count was regressing between stages
  (10–12mo: "1–3 words" → 12–15mo: "1–2 words", before jumping to
  "5–10 words" at 15–18mo). Swapped the two phrases so the count rises
  monotonically.
- The section copy promised milestones "across motor, communication,
  social and cognitive growth," but the generator script
  (`scripts/gen-timeline-summary.mjs`) only ever kept 3 of the 4
  domains, silently dropping Cognitive. Fixed the generator to include
  all four, and widened the section's grid from 3 to 4 columns.

### Infrastructure
- Confirmed Supabase is fully wired (waitlist insert + queue position
  + referral link + "find your spot" lookup), all via RLS-protected
  `security definer` RPC functions so contact details stay private.
- Found `the-neighbourhood-six.vercel.app` (the GitHub-integrated
  auto-deploy) is on a Vercel account this session isn't logged into,
  so its env vars can't be set from here. Standardized on
  `the-neighbourhood-eta.vercel.app` instead — the project this
  session controls, which already has Supabase's production env vars
  configured and confirmed working end-to-end.

## Known open items
- `the-neighbourhood-six.vercel.app` still exists as a separate,
  Supabase-disconnected deployment on another account. Not resolved —
  either log that Vercel account into this CLI, add the env vars
  there manually, or stop using that domain.
- Two local git worktrees (`codex/deploy-next`,
  `codex/production-next-video`) still exist under `/private/tmp/`,
  likely owned by another agent/process. Left untouched.
- Mobile app repo (`the-neighbourhood-mobile`) has an uncommitted
  `TEMP-PREVIEW` mock in `AuthProvider.tsx`, unrelated to this
  session's work — flagged earlier, not addressed here.

## Current state
- `main` branch on GitHub ([Siddharth622005/The-Neighbourhood](https://github.com/Siddharth622005/The-Neighbourhood))
  is the single source of truth — no alternate homepage branch exists.
- Production: [the-neighbourhood-eta.vercel.app](https://the-neighbourhood-eta.vercel.app)
