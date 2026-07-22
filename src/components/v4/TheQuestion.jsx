import useScrollReveal from "../useScrollReveal.js";

/**
 * Section 2 — The Question.
 *
 * Emotional recognition before any feature. The three fragments are the
 * parent's own voice; the turn reframes their anxiety as evidence of
 * their attention. No imagery, no CTA — the restraint here is what buys
 * permission for the product screenshot in the next section.
 */
const QUESTIONS = [
  { text: "Am I doing enough?", indent: "md:ml-0" },
  { text: "What should we even do today?", indent: "md:ml-16" },
  { text: "Is he supposed to be doing that by now?", indent: "md:ml-32" },
];

export default function TheQuestion() {
  const { ref, inView } = useScrollReveal(0.15);

  return (
    <section
      ref={ref}
      id="the-question"
      className="max-w-container-max mx-auto px-margin-mobile md:px-gutter py-28 md:py-40"
    >
      <div className="max-w-3xl">
        {QUESTIONS.map((q, i) => (
          <p
            key={q.text}
            className={`v3-fade ${inView ? "in-view" : ""} ${q.indent} v3-serif text-charcoal/80 text-3xl md:text-5xl leading-tight mb-10 md:mb-14`}
            data-delay={i === 0 ? undefined : String(i)}
          >
            &ldquo;{q.text}&rdquo;
          </p>
        ))}
      </div>

      {/* The turn arrives last, after a deliberate gap. */}
      <p
        className={`v3-fade ${inView ? "in-view" : ""} mt-8 md:mt-16 max-w-2xl text-xl md:text-2xl leading-relaxed text-charcoal font-medium`}
        data-delay="3"
      >
        None of these questions mean you&rsquo;re doing badly. They mean
        you&rsquo;re paying attention.
      </p>
    </section>
  );
}
