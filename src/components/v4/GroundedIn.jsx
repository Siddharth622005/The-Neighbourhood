import Section from "../ui/Section.jsx";
import Card from "../ui/Card.jsx";
import AccentLabel from "../ui/AccentLabel.jsx";
import useScrollReveal from "../useScrollReveal.js";

/**
 * Section 5 — Grounded In.
 *
 * Three signals, not six. No logo wall: there are no partner logos yet,
 * and a row of grey placeholders is worse than nothing.
 *
 * "Honest limits" is the unconventional one — admitting what the product
 * doesn't do is more persuasive than another credential.
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
    <Section id="grounded-in">
      <div ref={ref}>
        {/* "Grounded in" is the heading itself, not an eyebrow over one.
            It completes as a sentence with the three card labels below —
            grounded in developmental science, real classrooms, honest
            limits — so a line in between only restated the idea. It also
            claimed trust, where the section's persuasive move is
            admitting a limit.

            Still an <h2> so the section keeps its place in the document
            outline, but set at accent-label scale: quieter than the
            pillars either side, which suits a supporting trust beat. */}
        <AccentLabel
          as="h2"
          className={`reveal ${inView ? "in-view" : ""} text-center`}
        >
          Grounded in
        </AccentLabel>

        <div className="mt-2xl grid gap-component-gap md:grid-cols-3">
          {SIGNALS.map((s, i) => (
            <Card
              key={s.label}
              surface="cream-peach"
              className={`reveal ${inView ? "in-view" : ""} h-full text-center`}
              data-delay={String(i + 1)}
            >
              <AccentLabel>{s.label}</AccentLabel>
              <p className="type-body-regular mt-md text-slate-blue">{s.body}</p>
            </Card>
          ))}
        </div>
      </div>
    </Section>
  );
}
