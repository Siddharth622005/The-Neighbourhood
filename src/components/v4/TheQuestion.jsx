import useScrollReveal from "../useScrollReveal.js";
import motherAndBaby from "../../assets/mother-and-baby.svg";

/**
 * Section 2 — The Question.
 *
 * Emotional recognition before any feature. The three fragments are the
 * parent's own voice; the turn reframes their anxiety as evidence of
 * their attention.
 *
 * The illustration sits opposite the questions rather than between them
 * and the turn — the anxiety → relief beat has to stay unbroken, so on
 * mobile it falls below the turn instead of interrupting it.
 */
const QUESTIONS = [
  { text: "Am I doing enough?", indent: "lg:ml-0" },
  { text: "What should we even do today?", indent: "lg:ml-10" },
  { text: "Is he supposed to be doing that by now?", indent: "lg:ml-20" },
];

export default function TheQuestion() {
  const { ref, inView } = useScrollReveal(0.15);

  return (
    <section
      ref={ref}
      id="the-question"
      className="max-w-container-max mx-auto px-margin-mobile md:px-gutter py-28 md:py-40"
    >
      <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        <div className="lg:col-span-7">
          {QUESTIONS.map((q, i) => (
            <p
              key={q.text}
              className={`v3-fade ${inView ? "in-view" : ""} ${q.indent} v3-serif text-charcoal/80 text-3xl md:text-4xl leading-tight mb-9 md:mb-12`}
              data-delay={i === 0 ? undefined : String(i)}
            >
              &ldquo;{q.text}&rdquo;
            </p>
          ))}

          {/* The turn arrives last, after a deliberate gap. */}
          <p
            className={`v3-fade ${inView ? "in-view" : ""} mt-10 md:mt-14 max-w-xl text-xl md:text-2xl leading-relaxed text-charcoal font-medium`}
            data-delay="3"
          >
            None of these questions mean you&rsquo;re doing badly. They mean
            you&rsquo;re paying attention.
          </p>
        </div>

        <div className={`v3-fade ${inView ? "in-view" : ""} lg:col-span-5 order-last`} data-delay="2">
          {/* The SVG declares width/height="100%" with no intrinsic size, so
              it collapses unless the box is given real dimensions. */}
          <div className="w-full max-w-[26rem] mx-auto aspect-square">
            <img
              src={motherAndBaby}
              alt=""
              aria-hidden="true"
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
