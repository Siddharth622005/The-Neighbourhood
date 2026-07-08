import ChildGrowthAnimation from "../ChildGrowthAnimation.jsx";

/**
 * Opening beat: empathy before product. One emotional headline (the only
 * place Playfair touches the hero), one plain-spoken promise, one calm
 * invitation. Load-in is CSS-only (.v3-enter) — no scroll hijacking here.
 */
export default function HeroV3({ onJoin }) {
  return (
    <header id="top" className="relative overflow-hidden">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter pt-40 pb-24 md:pt-48 md:pb-32">
        <div className="grid lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-7 max-w-2xl">
            <p className="v3-enter v3-eyebrow text-warm-taupe mb-6">
              The village, rebuilt.
            </p>
            <h1 className="v3-enter v3-display text-charcoal" data-delay="1">
              Raising a child was never meant to be done{" "}
              <em className="v3-serif text-warm-taupe">alone.</em>
            </h1>
            <p className="v3-enter v3-body-lg text-on-surface-variant mt-7 max-w-lg" data-delay="2">
              Real neighbours. Calm spaces built around your child. Guidance
              that actually knows your family — built for the way we live
              now.
            </p>
            <div className="v3-enter mt-10 flex flex-wrap items-center gap-6" data-delay="3">
              <button
                onClick={onJoin}
                className="bg-charcoal text-surface-cream px-9 py-4 rounded-full font-medium text-lg hover:opacity-90 hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200"
              >
                Join the Village
              </button>
              <a
                href="#why"
                className="text-charcoal/70 hover:text-charcoal text-base underline underline-offset-4 decoration-soft-sand transition-colors"
              >
                Read why we built this
              </a>
            </div>
            <p className="v3-enter text-sm text-on-surface-variant/70 mt-6" data-delay="4">
              Joining is free &mdash; wherever you&rsquo;re raising a child.
            </p>
          </div>

          <div className="v3-enter lg:col-span-5 hidden md:block" data-delay="3">
            <div className="w-full max-w-md mx-auto aspect-square">
              <ChildGrowthAnimation />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
