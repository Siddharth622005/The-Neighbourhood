import ImagePlaceholder from "../ImagePlaceholder.jsx";
import { useStaggerReveal } from "../useScrollReveal.js";

const principles = [
  { letter: "T", title: "Trust", description: "The foundation of every meaningful relationship — earned through honesty, consistency, and genuine care." },
  { letter: "R", title: "Respect", description: "Honouring different perspectives, family structures, and journeys. Meeting people where they are, not where we expect them to be." },
  { letter: "I", title: "Independence", description: "Cultivating self-reliance and life skills, empowering children to think for themselves — and helping parents feel capable and unhurried." },
  { letter: "C", title: "Collaboration", description: "Fostering teamwork and community, because together we can achieve more than alone." },
  { letter: "K", title: "Kindness", description: "Leading with empathy and compassion, nurturing warm hearts that care for others and the world around them." },
];

export default function TrickFramework() {
  const { ref, inView } = useStaggerReveal(0.15);

  return (
    <section
      id="trick"
      className="py-section-gap px-margin-mobile md:px-gutter max-w-container-max mx-auto"
    >
      <div className="flex flex-col md:flex-row gap-stack-lg items-center">
        <div className="md:w-1/2">
          <h2 className="font-headline-h2 text-headline-h2 text-warm-taupe mb-6">
            The Values We Live By
          </h2>
          <p className="text-on-surface-variant text-lg mb-8 leading-relaxed">
            <span className="text-secondary font-bold">TRICK</span> defines who we are. These are not aspirational statements — they are present-tense commitments that every interaction, decision, and product must reflect.
          </p>

          <div ref={ref} className="space-y-stack-md">
            {principles.map((p) => (
              <div
                key={p.letter}
                className={`stagger-item flex items-center gap-4 group ${inView ? "in-view" : ""}`}
              >
                <div className="w-12 h-12 flex-shrink-0 rounded-full border border-soft-sand flex items-center justify-center font-bold text-warm-taupe group-hover:bg-warm-taupe group-hover:text-white transition-all duration-300">
                  {p.letter}
                </div>
                <div>
                  <p className="font-body-strong text-charcoal">{p.title}</p>
                  <p className="text-sm text-on-surface-variant">{p.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="md:w-1/2 relative p-8">
          <div className="aspect-square bg-surface-container-highest rounded-full overflow-hidden flex items-center justify-center border-8 border-surface-cream shadow-inner">
            <ImagePlaceholder
              className="w-full h-full"
              alt="Child building a tower of wooden blocks with focused determination, soft earthy illustration style, sunlight through a window"
              icon="extension"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
