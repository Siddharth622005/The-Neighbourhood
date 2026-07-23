import neighboursCircle from "../../assets/neighbours-circle.jpg";

/**
 * Section 1 — Hero.
 *
 * The headline stays emotional (it's the brand line, and the mobile app's
 * welcome screen opens with the same words). The subhead carries the
 * promise, so the H1 never has to do two jobs at once.
 *
 * One clause per layer — physical spaces, community, digital guidance —
 * because a subhead that only described the daily plan shrank a
 * three-layer company to one feature, and contradicted a headline that
 * promises a village. "What today is for" belongs to the Today section.
 *
 * One CTA. "Start with your child" rather than "Join the waitlist" —
 * personalization begins immediately, the button should feel like it's
 * about their child, not our mailing list.
 *
 * The photo sits fully inside its column rather than bleeding off the
 * right edge — a previous version clipped it against the viewport.
 *
 * Two soft blob shapes sit behind the photo, stacked like cards — the
 * same layered-circle idea sites like Huckleberry use behind an
 * illustration, borrowed as a shape technique only: ours are large,
 * pale, brand-coloured (soft sand / sage) rather than saturated, since
 * the page is photography-led and editorial, not flat-illustration led.
 * Paired with a small grounding caption card that names a moment, not a
 * fabricated fact — no invented location.
 */
export default function HeroV4({ onJoin }) {
  return (
    <header id="top" className="relative overflow-hidden">
      <div className="max-w-container-max mx-auto pt-36 pb-20 md:pt-44 md:pb-28">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Type first — on mobile the words land before any image. */}
          <div className="lg:col-span-7 px-margin-mobile md:px-gutter">
            <h1 className="v3-enter v3-display text-charcoal max-w-2xl">
              Raising a child was never meant to be{" "}
              <em className="v3-serif text-warm-taupe">done alone.</em>
            </h1>

            <p
              className="v3-enter v3-body-lg text-on-surface-variant mt-7 max-w-md"
              data-delay="2"
            >
              Real spaces. Real neighbours. Guidance that knows your child.
            </p>

            <div className="v3-enter mt-10 flex flex-wrap items-center gap-x-7 gap-y-4" data-delay="3">
              <button
                onClick={onJoin}
                className="bg-charcoal text-surface-cream px-9 py-4 rounded-full font-medium text-lg hover:opacity-90 hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200"
              >
                Start with your child
              </button>
              <span className="text-sm text-on-surface-variant/70">
                Takes less than 30 seconds
              </span>
            </div>
          </div>

          {/* Photograph stays fully inside its column — no viewport-edge
              clipping on the right. */}
          <div
            className="v3-enter lg:col-span-5 px-margin-mobile md:px-gutter lg:pl-0 relative"
            data-delay="3"
          >
            {/* Two soft blobs stacked behind the photo like cards, both
                pushed fully outside a corner so they actually read as
                shapes rather than mostly hiding behind the rectangle. */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-16 -left-16 w-56 h-56 md:-bottom-20 md:-left-20 md:w-72 md:h-72 rounded-full bg-soft-sand/45 z-0"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -top-10 -right-10 w-40 h-40 md:-top-14 md:-right-14 md:w-52 md:h-52 rounded-full bg-sage/35 z-0"
            />

            <div className="relative z-10">
              <img
                src={neighboursCircle}
                alt="Parents sitting together, mid-conversation"
                className="w-full h-[320px] md:h-[440px] lg:h-[540px] object-cover rounded-3xl"
                loading="eager"
              />

              {/* Grounding caption card — names the moment, not an
                  unverifiable fact like a specific city. */}
              <div className="absolute -bottom-5 left-5 md:-bottom-6 md:left-8 bg-white rounded-2xl shadow-lg shadow-charcoal/10 px-5 py-3.5 max-w-[15rem]">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sage opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-sage" />
                  </span>
                  <span className="v3-eyebrow text-warm-taupe">Real families</span>
                </div>
                <p className="text-charcoal text-sm mt-1.5 leading-snug">
                  A weekday evening, together.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
