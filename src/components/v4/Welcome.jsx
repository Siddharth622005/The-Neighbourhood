import useScrollReveal from "../useScrollReveal.js";

/**
 * Section 2 — Welcome.
 *
 * A founder-style intro, styled after the reference: big centred welcome
 * line, soft decorative shapes, a video block. We have no video yet, so
 * this is an honest, styled placeholder — a caption strip and play
 * button, not a fake thumbnail pretending footage exists. Swap the
 * `<button>` block for a real <video>/embed once one is shot.
 *
 * Shapes use the brand palette at low opacity (sage, warm taupe) rather
 * than the reference's saturated orange/green — same structural idea,
 * calmer execution.
 */
export default function Welcome() {
  const { ref, inView } = useScrollReveal(0.2);

  return (
    <section
      ref={ref}
      id="welcome"
      className="relative max-w-container-max mx-auto px-margin-mobile md:px-gutter py-28 md:py-40 overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="hidden md:block absolute left-0 bottom-4 w-40 h-40 rounded-full opacity-70"
        style={{
          backgroundImage: "radial-gradient(circle, #8B7355 1.6px, transparent 1.6px)",
          backgroundSize: "11px 11px",
        }}
      />
      <div
        aria-hidden="true"
        className="hidden md:block absolute right-[6%] top-6 w-52 h-52 rounded-full bg-sage/20"
      />

      <div className="relative text-center max-w-2xl mx-auto">
        <p className={`v3-fade ${inView ? "in-view" : ""} v3-eyebrow text-warm-taupe mb-6`}>
          Welcome
        </p>
        <h2 className={`v3-fade ${inView ? "in-view" : ""} v3-h2 text-charcoal`} data-delay="1">
          Welcome to <span className="v3-serif text-warm-taupe">The Neighbourhood.</span>
        </h2>
        <p
          className={`v3-fade ${inView ? "in-view" : ""} v3-body-lg text-on-surface-variant mt-6`}
          data-delay="2"
        >
          A quick hello from us, before you begin.
        </p>
      </div>

      <div
        className={`v3-fade ${inView ? "in-view" : ""} relative mt-14 md:mt-16 max-w-3xl mx-auto`}
        data-delay="3"
      >
        <div className="relative aspect-video rounded-3xl bg-white border border-warm-taupe/15 flex items-center justify-center overflow-hidden">
          <button
            type="button"
            aria-label="Play welcome video"
            className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-charcoal text-surface-cream flex items-center justify-center hover:opacity-90 hover:scale-105 transition-all duration-200"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" className="ml-1">
              <path d="M8 5v14l11-7z" />
            </svg>
          </button>
          <div className="absolute bottom-0 inset-x-0 bg-charcoal/85 backdrop-blur-sm px-5 py-3">
            <p className="text-surface-cream text-sm md:text-base">
              A hello from the founders — video coming soon.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
