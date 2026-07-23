import { useEffect, useState } from "react";
import useScrollReveal from "../useScrollReveal.js";

/**
 * Section 3 — Today. The page's thesis.
 *
 * The phone is rendered as real DOM rather than a screenshot: it stays
 * crisp at any size, and it lets the activity card cross-fade between
 * three ages — showing personalization instead of describing it.
 *
 * The card mirrors the mobile app's dashboard tokens and "why" line, so
 * the preview reads as the page continuing into the product rather than an
 * image pasted on top.
 */
const PLANS = [
  {
    age: "8 months",
    title: "Peek-a-boo, three ways",
    why: "At eight months, object permanence is just clicking into place — this is that idea, as a game.",
    mins: 10,
    materials: "A scarf and your hands",
  },
  {
    age: "2 years, 3 months",
    title: "The mystery bag",
    why: "You said curiosity matters right now — this is ten quiet minutes of it.",
    mins: 10,
    materials: "A cloth bag and 3 everyday objects",
  },
  {
    age: "4 years",
    title: "What floats, what sinks?",
    why: "Four-year-olds are ready to guess before they test — that's the beginning of real reasoning.",
    mins: 15,
    materials: "A bowl of water and a few small things",
  },
];

const ANNOTATIONS = [
  "A few ideas, not an endless list.",
  "The reason each one was chosen — in plain language.",
  "Short activities, with things already in your kitchen.",
];

export default function Today({ onJoin }) {
  const { ref, inView } = useScrollReveal(0.15);
  const [index, setIndex] = useState(1); // start on the middle age
  const [visible, setVisible] = useState(true);

  // Slow cross-fade between ages. Only runs once the section is on screen,
  // and pauses entirely for reduced-motion users.
  useEffect(() => {
    if (!inView) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;

    const cycle = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIndex((i) => (i + 1) % PLANS.length);
        setVisible(true);
      }, 420);
    }, 4200);

    return () => clearInterval(cycle);
  }, [inView]);

  const plan = PLANS[index];

  return (
    <section
      ref={ref}
      id="today"
      className="max-w-container-max mx-auto px-margin-mobile md:px-gutter py-24 md:py-36"
    >
      <div className="grid lg:grid-cols-12 gap-14 lg:gap-16 items-center">
        {/* Copy */}
        <div className="lg:col-span-6">
          <h2 className={`v3-fade ${inView ? "in-view" : ""} v3-h2 text-charcoal max-w-lg`}>
            Simple ideas for today, chosen with care.
          </h2>
          <p
            className={`v3-fade ${inView ? "in-view" : ""} v3-body-lg text-on-surface-variant mt-6 max-w-md`}
            data-delay="1"
          >
            Every morning, a small set of activities chosen for your
            child&rsquo;s exact age and where they are right now. Ten minutes.
            Things you already have at home.
          </p>
          <p
            className={`v3-fade ${inView ? "in-view" : ""} mt-5 text-lg text-charcoal max-w-md`}
            data-delay="2"
          >
            And underneath each one, the reason why.
          </p>

          {/* Annotations — the three things the card is doing. */}
          <ul className={`v3-fade ${inView ? "in-view" : ""} mt-10 space-y-4 max-w-sm`} data-delay="3">
            {ANNOTATIONS.map((note) => (
              <li key={note} className="flex gap-4 items-baseline">
                <span aria-hidden="true" className="h-px w-6 bg-soft-sand shrink-0 translate-y-[-0.35rem]" />
                <span className="text-base text-on-surface-variant">{note}</span>
              </li>
            ))}
          </ul>

          <button
            onClick={onJoin}
            className={`v3-fade ${inView ? "in-view" : ""} mt-10 bg-charcoal text-surface-cream px-8 py-4 rounded-full font-medium hover:opacity-90 hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200`}
            data-delay="3"
          >
            See today&rsquo;s ideas for your child
          </button>
        </div>

        {/* The product */}
        <div className={`v3-fade ${inView ? "in-view" : ""} lg:col-span-6 flex justify-center`} data-delay="2">
          <PhoneFrame>
            <div className="px-5 pt-8 pb-6 h-full flex flex-col">
              <p className="text-[13px] font-semibold text-charcoal">
                Tuesday
                <span className="text-on-surface-variant font-normal">
                  {" · "}
                  <span
                    className="transition-opacity duration-300"
                    style={{ opacity: visible ? 1 : 0 }}
                  >
                    {plan.age}
                  </span>
                </span>
              </p>

              <div className="flex-1 flex items-center">
                <div
                  className="w-full bg-white rounded-2xl p-5 transition-opacity duration-400"
                  style={{ opacity: visible ? 1 : 0 }}
                >
                  <p className="text-[10px] font-semibold tracking-[0.16em] text-warm-taupe">
                    TODAY&rsquo;S IDEAS
                  </p>
                  <p className="mt-2 text-[22px] leading-tight font-bold text-charcoal">
                    {plan.title}
                  </p>
                  <p className="mt-2 text-[13px] leading-relaxed text-on-surface-variant">
                    {plan.why}
                  </p>
                  <div className="mt-4 flex items-baseline gap-2 text-[12px] font-medium text-charcoal">
                    <span className="whitespace-nowrap">{plan.mins} min</span>
                    <span className="text-on-surface-variant">·</span>
                    <span className="text-on-surface-variant font-normal">{plan.materials}</span>
                  </div>
                  <div className="mt-5 bg-charcoal text-surface-cream text-center rounded-full py-3 text-sm font-semibold">
                    See how
                  </div>
                </div>
              </div>
            </div>
          </PhoneFrame>
        </div>
      </div>
    </section>
  );
}

function PhoneFrame({ children }) {
  return (
    <div
      className="relative w-[300px] h-[610px] rounded-[2.75rem] bg-[#0e0d0c] p-3 shadow-[0_40px_80px_-30px_rgba(60,47,32,0.35)]"
      aria-hidden="false"
    >
      <div className="absolute top-3 left-1/2 -translate-x-1/2 w-[104px] h-6 bg-[#0e0d0c] rounded-b-2xl z-10" />
      <div className="w-full h-full rounded-[2.15rem] overflow-hidden bg-surface-cream">
        {children}
      </div>
    </div>
  );
}
