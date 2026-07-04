import useScrollReveal from "../useScrollReveal.js";
import WordReveal from "../WordReveal.jsx";

// Our values, spoken like a person instead of a values poster. Each word
// opens on an oversized serif initial — a drop cap, not an acronym legend.
const VALUES = [
  { word: "Trust", line: "Earned slowly, through honesty and consistency. Never assumed." },
  { word: "Respect", line: "For every family's structure, pace, and way of doing things." },
  { word: "Independence", line: "Children who can think for themselves. Parents who feel capable." },
  { word: "Collaboration", line: "None of this works alone. That's rather the point." },
  { word: "Kindness", line: "The default setting — for children, for parents, for each other." },
];

export default function Values() {
  const { ref, inView } = useScrollReveal(0.2);

  return (
    <section className="py-section-gap md:py-32 px-margin-mobile md:px-gutter max-w-container-max mx-auto">
      <div className="grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-4">
          <p className="v3-eyebrow text-warm-taupe mb-6">How we behave</p>
          <WordReveal
            text="Values we live by."
            className="v3-h2 text-charcoal"
          />
        </div>

        <div ref={ref} className="lg:col-span-8">
          {VALUES.map((v, i) => (
            <div
              key={v.word}
              className={`v3-fade ${inView ? "in-view" : ""} py-6 border-t border-warm-taupe/15 last:border-b`}
              style={{ transitionDelay: `${i * 90}ms` }}
            >
              <div className="flex flex-col md:flex-row md:items-baseline md:gap-8">
                <p className="text-charcoal text-lg md:w-52 flex-shrink-0">
                  <span className="v3-serif text-3xl text-warm-taupe">{v.word[0]}</span>
                  <span className="font-semibold">{v.word.slice(1)}</span>
                </p>
                <p className="text-on-surface-variant leading-relaxed">{v.line}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
