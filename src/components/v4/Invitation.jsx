import useScrollReveal from "../useScrollReveal.js";

/**
 * Section 7 — The Invitation.
 *
 * The page's one inverted moment: a charcoal card at the end, after
 * ~7,000px of cream. Restores the card treatment from the earlier
 * ClosingInvite — "one warm room at the end of the page, a single door
 * in" — which the flat v4 version had lost. The colour flip is what makes
 * the final ask feel like arriving somewhere, rather than scrolling past
 * one more section on the same background.
 *
 * Two soft blobs sit behind it, the same shape vocabulary as the hero, so
 * the page opens and closes on the same visual idea. Kept at very low
 * contrast so the type stays the loudest thing in the card.
 *
 * CTA label matches the hero deliberately: by here the parent has been
 * asked the same simple thing three times, in three different emotional
 * states. No countdown, no "spots remaining", no urgency device.
 */
export default function Invitation({ onJoin }) {
  const { ref, inView } = useScrollReveal(0.2);

  return (
    <section
      id="invitation"
      className="px-margin-mobile md:px-gutter pt-12 pb-16 md:pt-20 md:pb-24"
    >
      <div
        ref={ref}
        className={`v3-fade ${inView ? "in-view" : ""} max-w-container-max mx-auto bg-charcoal rounded-[40px] px-8 py-24 md:py-32 text-center relative overflow-hidden`}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 -right-16 w-72 h-72 md:w-96 md:h-96 rounded-full bg-soft-sand/[0.06]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-28 -left-20 w-64 h-64 md:w-80 md:h-80 rounded-full bg-sage/[0.06]"
        />

        <div className="relative z-10 max-w-2xl mx-auto">
          <p className="v3-eyebrow text-soft-sand/70 mb-8">An invitation</p>

          <h2 className="v3-h2 text-surface-cream">
            There&rsquo;s a place here for{" "}
            <em className="v3-serif text-soft-sand">your family.</em>
          </h2>

          <p className="v3-body-lg text-surface-cream/70 mt-7 max-w-lg mx-auto">
            Be among the founding families of The Neighbourhood. We&rsquo;ll
            write to you as the doors open.
          </p>

          <button
            onClick={onJoin}
            className="mt-10 bg-surface-cream text-charcoal px-10 py-4 rounded-full font-medium text-lg hover:bg-white hover:-translate-y-0.5 hover:shadow-xl transition-all duration-200"
          >
            Start with your child
          </button>

          <p className="text-sm text-surface-cream/50 mt-6">
            Less than 30 seconds &middot; Free during early access &middot; A quiet
            inbox, promised
          </p>
        </div>
      </div>
    </section>
  );
}
