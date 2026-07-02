import useScrollReveal from "../useScrollReveal.js";

/**
 * The invitation, not the pitch. One warm room at the end of the page —
 * charcoal, quiet, a single door in.
 */
export default function ClosingInvite({ onJoin }) {
  const { ref, inView } = useScrollReveal(0.3);

  return (
    <section className="px-margin-mobile md:px-gutter pb-6">
      <div
        ref={ref}
        className={`v3-fade ${inView ? "in-view" : ""} max-w-container-max mx-auto bg-charcoal rounded-[40px] px-8 py-24 md:py-32 text-center relative overflow-hidden`}
      >
        <div className="relative z-10 max-w-2xl mx-auto">
          <p className="v3-eyebrow text-soft-sand/70 mb-8">An invitation</p>
          <h2 className="v3-h2 text-surface-cream">
            There's a place here for{" "}
            <em className="v3-serif text-soft-sand">your family.</em>
          </h2>
          <p className="v3-body-lg text-surface-cream/70 mt-7 max-w-lg mx-auto">
            Join the waitlist and be among the founding families of The
            Neighbourhood. We'll write to you when we open near you.
          </p>
          <button
            onClick={onJoin}
            className="mt-10 bg-surface-cream text-charcoal px-10 py-4 rounded-full font-medium text-lg hover:bg-white hover:-translate-y-0.5 hover:shadow-xl transition-all duration-200"
          >
            Join the Waitlist
          </button>
          <p className="text-sm text-surface-cream/50 mt-6">
            Free &middot; Gurugram first &middot; We'll only write when it matters
          </p>
        </div>
      </div>
    </section>
  );
}
