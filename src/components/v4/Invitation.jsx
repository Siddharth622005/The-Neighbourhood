import useScrollReveal from "../useScrollReveal.js";

/**
 * Section 7 — The Invitation.
 *
 * The page's only centered composition, with more whitespace than feels
 * comfortable — the excess is the design, letting the last line sit alone.
 *
 * Same CTA label as the hero: the parent has now been asked the same
 * simple thing three times, in three different emotional states.
 * No countdown, no "spots remaining", no urgency device of any kind.
 */
export default function Invitation({ onJoin }) {
  const { ref, inView } = useScrollReveal(0.2);

  return (
    <section
      ref={ref}
      id="invitation"
      className="px-margin-mobile md:px-gutter py-32 md:py-48"
    >
      <div className={`v3-fade ${inView ? "in-view" : ""} max-w-2xl mx-auto text-center`}>
        <p className="v3-serif text-charcoal text-3xl md:text-5xl leading-tight">
          You don&rsquo;t have to figure this out alone.
        </p>

        <div className="mt-12">
          <button
            onClick={onJoin}
            className="bg-charcoal text-surface-cream px-10 py-4 rounded-full font-medium text-lg hover:opacity-90 hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200"
          >
            Start with your child
          </button>
        </div>

        <p className="mt-6 text-sm text-on-surface-variant/70">
          Less than 30 seconds. No cost during early access.
        </p>
      </div>
    </section>
  );
}
