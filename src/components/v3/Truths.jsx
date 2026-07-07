import useScrollReveal from "../useScrollReveal.js";
import WordReveal from "../WordReveal.jsx";

// The "overwhelming" beat of the arc. No cards, no scroll-jacking — three
// numbered editorial truths a parent will recognise, then a line that takes
// the blame off their shoulders. Empathy first; the product waits its turn.
const TRUTHS = [
  {
    number: "01",
    title: "The village has scattered.",
    body: "Grandparents might live a flight away. Neighbours stay strangers. The question you would have asked over a cup of chai becomes a 2am search — and a search engine doesn't know your child.",
  },
  {
    number: "02",
    title: "Plenty of advice. Limited context.",
    body: "Books, apps, reels, relatives — every answer is written for an average child who doesn't exist. Advice that ignores your child's temperament, your home, your reality isn't guidance. It's noise.",
  },
  {
    number: "03",
    title: "Childhood moved indoors.",
    body: "The courtyards and streets where children once wandered freely became screens. Play got quieter, more supervised, more alone — and children feel the difference, even if they can't name it.",
  },
];

function Truth({ truth }) {
  const { ref, inView } = useScrollReveal(0.3);
  return (
    <div
      ref={ref}
      className={`v3-fade ${inView ? "in-view" : ""} grid md:grid-cols-12 gap-4 md:gap-8 py-12 md:py-14 border-t border-warm-taupe/15`}
    >
      <span className="md:col-span-2 v3-eyebrow text-soft-sand pt-2" aria-hidden="true">{truth.number}</span>
      <h3 className="md:col-span-4 -ml-3 v3-h3 text-charcoal">{truth.title}</h3>
      <p className="md:col-span-6 v3-body-lg text-on-surface-variant max-w-xl">{truth.body}</p>
    </div>
  );
}

export default function Truths() {
  const closing = useScrollReveal(0.4);

  return (
    <section id="why" className="py-section-gap md:py-32 px-margin-mobile md:px-gutter max-w-container-max mx-auto">
      <div className="max-w-3xl mb-16 md:mb-20">
        <p className="v3-eyebrow text-warm-taupe mb-6">Why we exist</p>
        <WordReveal
          text="You love your child more than anything. Some days, raising them is still a lot."
          className="v3-h2 text-charcoal"
        />
        <p className="v3-body-lg text-on-surface-variant mt-6 max-w-2xl">
          That's not a contradiction, and it isn't a failing. Parenting today
          asks one person — sometimes two — to do what an entire
          neighbourhood once did together.
        </p>
      </div>

      <div>
        {TRUTHS.map((truth) => (
          <Truth key={truth.number} truth={truth} />
        ))}
      </div>

      <div
        ref={closing.ref}
        className={`v3-fade ${closing.inView ? "in-view" : ""} border-t border-warm-taupe/15 pt-14 md:pt-16 max-w-3xl`}
      >
        <p className="v3-serif text-2xl md:text-[1.75rem] leading-relaxed text-charcoal">
          None of this is your fault. The support systems were dismantled long
          before you became a parent.
        </p>
      </div>
    </section>
  );
}
