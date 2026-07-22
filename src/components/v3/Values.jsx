import useScrollReveal from "../useScrollReveal.js";
import WordReveal from "../WordReveal.jsx";

// Our values, spoken like a person instead of a values poster. The five
// words are Esther Wojcicki's TRICK framework — so the oversized taupe
// initial on each line isn't only a drop cap, it spells the acronym
// down the column.
const VALUES = [
  {
    word: "Trust",
    line: "We help you trust your child's pace instead of racing them against a milestone chart.",
  },
  {
    word: "Respect",
    line: "Your child's pace and personality are data, not a deviation to correct. We build guidance around who they actually are.",
  },
  {
    word: "Independence",
    line: "We nudge you toward letting your child try and stumble a little — not toward doing it for them, and not toward doing it for you either.",
  },
  {
    word: "Collaboration",
    line: "Guidance you shape with us, and with the neighbours around you — not instructions handed down from an app.",
  },
  {
    word: "Kindness",
    line: "No judgment for the days that don't go to plan. For your child, and for you.",
  },
];

export default function Values() {
  const { ref, inView } = useScrollReveal(0.2);

  return (
    <section id="values" className="py-section-gap md:py-32 px-margin-mobile md:px-gutter max-w-container-max mx-auto">
      <div className="grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-4">
          <p className="v3-eyebrow text-warm-taupe mb-6">How we behave</p>
          <WordReveal
            text="Values we live by."
            className="v3-h2 text-charcoal"
          />
          <p className="text-on-surface-variant leading-relaxed mt-6 max-w-xs">
            Built on <span className="text-charcoal font-medium">TRICK</span> &mdash; Esther
            Wojcicki&rsquo;s five principles for raising capable, grounded kids.
          </p>
        </div>

        <div ref={ref} className="lg:col-span-8">
          {VALUES.map((v, i) => (
            <div
              key={v.word}
              className={`v3-fade ${inView ? "in-view" : ""} py-6 border-t border-warm-taupe/15 last:border-b`}
              style={{ transitionDelay: `${i * 90}ms` }}
            >
              <div className="flex flex-col md:flex-row md:items-baseline md:gap-8">
                <p className="v3-serif text-charcoal text-xl md:w-52 flex-shrink-0">
                  <span className="text-3xl text-warm-taupe">{v.word[0]}</span>
                  <span>{v.word.slice(1)}</span>
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
