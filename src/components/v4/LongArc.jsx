import { useState } from "react";
import useScrollReveal from "../useScrollReveal.js";
import stages from "../../data/timelineSummary.js";

/**
 * Section 4 — The Long Arc. (Timeline + Progress Insights, merged.)
 *
 * Two sections in the brief made the same point — "we show growth over
 * time" — so they're one section here. The timeline covers the road
 * ahead; the anti-comparison line covers progress honestly, without
 * mocking up a dashboard for a product that has no users yet.
 *
 * Milestones are real — derived from src/data/journeyStages.json, the same
 * fifteen stages the product uses. The page reads a generated summary
 * (npm run gen:timeline) rather than the full dataset, which would put a
 * ~57KB gzip chunk on a marketing page to render 45 short strings.
 */

// Only a few labels are drawn, so fifteen nodes never read as clutter.
const LABELLED = new Set([0, 4, 8, 12, 14]);

export default function LongArc() {
  const { ref, inView } = useScrollReveal(0.15);
  const [active, setActive] = useState(4); // 12–15 months: first steps, a recognisable moment

  const stage = stages[active];
  const highlights = stage.highlights;

  return (
    <section
      ref={ref}
      id="long-arc"
      className="max-w-container-max mx-auto px-margin-mobile md:px-gutter py-24 md:py-36"
    >
      <div className="max-w-2xl">
        <h2 className={`v3-fade ${inView ? "in-view" : ""} v3-h2 text-charcoal`}>
          Every child on their own clock.
        </h2>
        <p
          className={`v3-fade ${inView ? "in-view" : ""} v3-serif text-warm-taupe text-xl md:text-2xl mt-5`}
          data-delay="1"
        >
          Development isn&rsquo;t a checklist. It&rsquo;s a long, uneven,
          beautiful line.
        </p>
        <p
          className={`v3-fade ${inView ? "in-view" : ""} v3-body-lg text-on-surface-variant mt-6`}
          data-delay="2"
        >
          The Neighbourhood follows fifteen stages from birth to six years —
          across motor, communication, social and cognitive growth — and
          remembers all of it, so you don&rsquo;t have to.
        </p>
      </div>

      {/* Timeline */}
      <div className={`v3-fade ${inView ? "in-view" : ""} mt-16 md:mt-20`} data-delay="2">
        <div className="relative">
          {/* The line draws itself, once. */}
          <div className="absolute left-0 right-0 top-[7px] h-px bg-soft-sand/40" aria-hidden="true" />
          <div
            aria-hidden="true"
            className="absolute left-0 right-0 top-[7px] h-px bg-warm-taupe origin-left transition-transform duration-[900ms] ease-out"
            style={{ transform: inView ? "scaleX(1)" : "scaleX(0)" }}
          />

          <ul className="relative flex justify-between items-start">
            {stages.map((s, i) => {
              const isActive = i === active;
              return (
                <li key={s.id} className="flex-1 flex flex-col items-center">
                  <button
                    onClick={() => setActive(i)}
                    onMouseEnter={() => setActive(i)}
                    aria-label={`Show milestones for ${s.label}`}
                    aria-pressed={isActive}
                    className="group p-2 -m-2"
                  >
                    <span
                      className={`block rounded-full transition-all duration-300 ${
                        isActive
                          ? "w-[15px] h-[15px] bg-warm-taupe"
                          : "w-[9px] h-[9px] bg-soft-sand group-hover:bg-warm-taupe/60"
                      }`}
                    />
                  </button>
                  {LABELLED.has(i) && (
                    <span className="mt-3 hidden md:block text-[11px] tracking-wide text-on-surface-variant whitespace-nowrap">
                      {s.label}
                    </span>
                  )}
                </li>
              );
            })}
          </ul>
        </div>

        {/* Selected stage */}
        <div className="mt-12 md:mt-14 min-h-[190px]">
          <p className="v3-eyebrow text-warm-taupe">{stage.label}</p>
          <div className="mt-5 grid sm:grid-cols-3 gap-8 sm:gap-10 max-w-4xl">
            {highlights.map((h) => (
              <div key={h.domain}>
                <p className="text-[11px] uppercase tracking-[0.16em] text-on-surface-variant/70">
                  {h.domain}
                </p>
                <p className="mt-2 text-lg leading-snug text-charcoal">{h.milestone}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* The position, stated plainly. */}
      <p
        className={`v3-fade ${inView ? "in-view" : ""} mt-14 md:mt-16 text-xl md:text-2xl font-medium text-charcoal`}
        data-delay="3"
      >
        No percentiles. No rankings. No other children.
      </p>
    </section>
  );
}
