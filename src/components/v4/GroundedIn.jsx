import useScrollReveal from "../useScrollReveal.js";

/**
 * Section 6 — Grounded In.
 *
 * Three signals, not six. No logo wall: there are no partner logos yet,
 * and a row of grey placeholders is worse than nothing.
 *
 * "Honest limits" is the unconventional one — admitting what the product
 * doesn't do is more persuasive than another credential, and it defuses
 * the PRD's own listed risk that parents expect medical advice.
 */
const SIGNALS = [
  {
    label: "Developmental science",
    body: "Milestones drawn from WHO and Indian Academy of Pediatrics frameworks — not internet consensus.",
  },
  {
    label: "Real classrooms",
    body: "Built alongside the educators in our own preschools, who see these children every day.",
  },
  {
    label: "Honest limits",
    body: "We're not a substitute for your paediatrician, and we'll say so whenever it matters.",
  },
];

export default function GroundedIn() {
  const { ref, inView } = useScrollReveal(0.15);

  return (
    <section
      ref={ref}
      id="grounded-in"
      className="max-w-container-max mx-auto px-margin-mobile md:px-gutter py-24 md:py-32"
    >
      <h2 className={`v3-fade ${inView ? "in-view" : ""} v3-h3 text-charcoal`}>
        Grounded in
      </h2>

      <div className="mt-10 grid md:grid-cols-3 gap-10 md:gap-8">
        {SIGNALS.map((s, i) => (
          <div
            key={s.label}
            className={`v3-fade ${inView ? "in-view" : ""} md:pr-8 ${
              i < SIGNALS.length - 1 ? "md:border-r md:border-soft-sand/30" : ""
            }`}
            data-delay={String(i + 1)}
          >
            <p className="v3-eyebrow text-warm-taupe">{s.label}</p>
            <p className="mt-4 text-base leading-relaxed text-on-surface-variant max-w-xs">
              {s.body}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
