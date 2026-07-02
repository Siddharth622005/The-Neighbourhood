import { useStaggerReveal } from "../useScrollReveal.js";

// The trust/credibility beat kihealth fills with advisor headshots and
// credentials. We deliberately don't fabricate a team or advisor board we
// don't have — instead this leans on the two things that are actually true:
// a real named founder's lived experience (same source as OurStory's quote,
// condensed here) and the real immunopsychiatry grounding already
// referenced in FeatureRows. OurStory tells the full founding story right
// after this section; this is the short, honest version.
const PILLARS = [
  {
    icon: "auto_stories",
    title: "Lived experience",
    body: "Founded by a parent who spent weeks searching Gurugram for a preschool that got teachers, safety, and warmth right, all at once, and couldn't find one. So we built it.",
    attribution: "— Sakshi, Founder",
  },
  {
    icon: "biotech",
    title: "Real science",
    body: "Our physical spaces and programs are grounded in immunopsychiatry, the study of how calm, connected environments shape a child's developing mind and immune system alike. Not trends. Research.",
    attribution: null,
  },
];

export default function GroundedIn() {
  const { ref, inView } = useStaggerReveal(0.2);

  return (
    <section
      id="grounded"
      className="py-section-gap px-margin-mobile md:px-gutter max-w-container-max mx-auto"
    >
      <div className="text-center max-w-2xl mx-auto mb-stack-lg">
        <p className="font-tagline-handwritten text-tagline-handwritten text-soft-sand uppercase tracking-widest mb-4">
          grounded in
        </p>
        <h2 className="font-headline-h2 text-headline-h2 text-charcoal">
          Not theory. Lived experience and real science.
        </h2>
      </div>

      <div ref={ref} className="grid md:grid-cols-2 gap-6">
        {PILLARS.map((p) => (
          <div
            key={p.title}
            className={`stagger-item ${inView ? "in-view" : ""} rounded-[32px] bg-surface-container/40 border border-soft-sand/25 p-8 md:p-10`}
          >
            <div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center mb-6">
              <span className="material-symbols-outlined text-warm-taupe text-2xl">{p.icon}</span>
            </div>
            <h3 className="font-headline-h3 text-headline-h3 text-warm-taupe mb-3">{p.title}</h3>
            <p className="text-on-surface-variant text-lg leading-relaxed">{p.body}</p>
            {p.attribution && (
              <p className="mt-4 text-warm-taupe font-body-strong">{p.attribution}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
