import useScrollReveal from "../useScrollReveal.js";
import WordReveal from "../WordReveal.jsx";

/**
 * "Show, don't sell": three quiet product moments rendered as UI vignettes.
 * All copy inside the mockups is illustrative product UI — no invented
 * users, no invented numbers.
 */
export default function LifeInside() {
  const { ref, inView } = useScrollReveal(0.2);

  return (
    <section className="py-section-gap md:py-32 bg-surface-container-low">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter">
        <div className="max-w-3xl mb-16 md:mb-20">
          <p className="v3-eyebrow text-warm-taupe mb-6">Life inside</p>
          <WordReveal
            text="A quiet app, for loud days."
            className="v3-h2 text-charcoal"
          />
          <p className="v3-body-lg text-on-surface-variant mt-6 max-w-xl">
            Built to reduce the mental load, never add to it. No streaks, no
            noise, no guilt — just help when you reach for it.
          </p>
        </div>

        <div ref={ref} className="grid md:grid-cols-3 gap-6 items-start">
          {/* The 2am answer */}
          <div className={`v3-fade ${inView ? "in-view" : ""} bg-surface-cream rounded-[28px] border border-warm-taupe/10 shadow-sm p-7`}>
            <p className="v3-eyebrow text-warm-taupe mb-6">The 2am answer</p>
            <div className="space-y-4">
              <div className="bg-surface-container p-4 rounded-2xl rounded-tl-md max-w-[90%] text-sm leading-relaxed text-charcoal">
                She's suddenly fighting every nap. Did I break something?
              </div>
              <div className="bg-charcoal text-surface-cream p-4 rounded-2xl rounded-tr-md ml-auto max-w-[90%] text-sm leading-relaxed">
                You didn't break anything. Around this age, sleep often shifts
                for a few weeks — here's what usually helps, given how she
                responds to routine&hellip;
              </div>
            </div>
            <p className="text-xs text-on-surface-variant/70 mt-6">
              Answers shaped by your child, not an average one.
            </p>
          </div>

          {/* This week */}
          <div className={`v3-fade ${inView ? "in-view" : ""} bg-surface-cream rounded-[28px] border border-warm-taupe/10 shadow-sm p-7`} data-delay="1">
            <p className="v3-eyebrow text-warm-taupe mb-6">This week, nearby</p>
            <div className="space-y-3">
              <div className="flex gap-3 items-start p-3 rounded-xl bg-surface-container/60">
                <span className="material-symbols-outlined text-warm-taupe text-xl mt-0.5">wb_sunny</span>
                <div>
                  <p className="text-sm font-medium text-charcoal">Saturday morning at The Aangan</p>
                  <p className="text-xs text-on-surface-variant mt-0.5">Open play, 9–11am. Three families from your circle are going.</p>
                </div>
              </div>
              <div className="flex gap-3 items-start p-3 rounded-xl">
                <span className="material-symbols-outlined text-warm-taupe text-xl mt-0.5">forum</span>
                <div>
                  <p className="text-sm font-medium text-charcoal">Your circle</p>
                  <p className="text-xs text-on-surface-variant mt-0.5">A question about starting solids — two neighbours replied.</p>
                </div>
              </div>
            </div>
            <p className="text-xs text-on-surface-variant/70 mt-6">
              Your neighbourhood, gently kept in one place.
            </p>
          </div>

          {/* Growing, not graded */}
          <div className={`v3-fade ${inView ? "in-view" : ""} bg-surface-cream rounded-[28px] border border-warm-taupe/10 shadow-sm p-7`} data-delay="2">
            <p className="v3-eyebrow text-warm-taupe mb-6">Growing, not graded</p>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs text-on-surface-variant mb-1.5">
                  <span>Exploring on her own</span>
                  <span className="text-warm-taupe">unfolding</span>
                </div>
                <div className="h-1.5 rounded-full bg-surface-container overflow-hidden">
                  <div className="h-full w-2/3 rounded-full bg-soft-sand" />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs text-on-surface-variant mb-1.5">
                  <span>First words</span>
                  <span className="text-warm-taupe">taking her time</span>
                </div>
                <div className="h-1.5 rounded-full bg-surface-container overflow-hidden">
                  <div className="h-full w-1/3 rounded-full bg-soft-sand" />
                </div>
              </div>
              <p className="text-sm text-charcoal leading-relaxed pt-2">
                Every child unfolds at their own pace. We help you notice —
                without turning your child into a scoreboard.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
