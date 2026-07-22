/**
 * Regenerates src/data/timelineSummary.js from src/data/journeyStages.json.
 *
 * The homepage timeline only needs each stage's label plus one milestone per
 * domain. Importing the full journeyStages.json put a 181KB chunk (~57KB
 * gzip) on a marketing page to render ~45 short strings — this keeps the
 * derived file honest without paying that cost.
 *
 *   npm run gen:timeline
 */
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const SRC = resolve(here, "../src/data/journeyStages.json");
const OUT = resolve(here, "../src/data/timelineSummary.js");

const stages = JSON.parse(readFileSync(SRC, "utf8"));

const rows = stages.map((s) => ({
  id: s.id,
  label: s.label,
  highlights: s.domains
    .slice(0, 3)
    .filter((d) => d.milestones?.length)
    .map((d) => ({ domain: d.name, milestone: d.milestones[0].text })),
}));

const file = `/**
 * Timeline summary for the homepage — derived from src/data/journeyStages.json.
 *
 * Generated file. Do not edit by hand.
 * Regenerate with: npm run gen:timeline
 */
const TIMELINE_STAGES = ${JSON.stringify(rows, null, 2)};

export default TIMELINE_STAGES;
`;

writeFileSync(OUT, file);
console.log(`Wrote ${OUT} — ${rows.length} stages.`);
