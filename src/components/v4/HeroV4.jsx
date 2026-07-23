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
          <div className="v3-enter lg:col-span-5 px-margin-mobile md:px-gutter lg:pl-0" data-delay="3">
            <img
              src={neighboursCircle}
              alt="Parents sitting together, mid-conversation"
              className="w-full h-[320px] md:h-[440px] lg:h-[540px] object-cover rounded-3xl"
              loading="eager"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
