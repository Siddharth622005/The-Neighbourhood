import { useEffect, useState } from "react";
import useScrollReveal from "../useScrollReveal.js";

/**
 * Section 5 — The Companion.
 *
 * Rendered as editorial typography, not a chat UI: no bubbles, no avatar,
 * no sparkle icon. But avoiding AI *clichés* is not the same as hiding
 * that it's AI — without naming it, a visitor reads this as a nice quote
 * and misses the product entirely. So the eyebrow, the speaker label and
 * the closing line all say it plainly, in words rather than iconography.
 *
 * The example is deliberately a sleep-training-vs-grandmother conflict —
 * a culturally Indian parenting negotiation no US or LatAm competitor can
 * speak to credibly, and the exact situation the PRD's nuclear-family
 * parent is actually in.
 */
export default function Companion() {
  const { ref, inView } = useScrollReveal(0.2);
  const [answerIn, setAnswerIn] = useState(false);

  // One beat of silence before the reply — someone thinking, not a bot typing.
  useEffect(() => {
    if (!inView) return;
    const t = setTimeout(() => setAnswerIn(true), 600);
    return () => clearTimeout(t);
  }, [inView]);

  return (
    <section
      ref={ref}
      id="companion"
      className="max-w-container-max mx-auto px-margin-mobile md:px-gutter py-24 md:py-36"
    >
      <p className={`v3-fade ${inView ? "in-view" : ""} v3-eyebrow text-warm-taupe mb-6`}>
        Your AI parenting companion
      </p>
      <h2 className={`v3-fade ${inView ? "in-view" : ""} v3-h2 text-charcoal max-w-xl`} data-delay="1">
        The question you&rsquo;d text a friend at 11pm.
      </h2>

      <div className="mt-12 md:mt-16 max-w-3xl">
        <p
          className={`v3-fade ${inView ? "in-view" : ""} text-xl md:text-2xl leading-relaxed font-medium text-charcoal`}
          data-delay="1"
        >
          &ldquo;Everyone says I should sleep-train. My mother says absolutely
          not. I don&rsquo;t know who&rsquo;s right.&rdquo;
        </p>

        <div
          className="mt-8 md:mt-10 md:pl-12 transition-all duration-700 ease-out"
          style={{
            opacity: answerIn ? 1 : 0,
            transform: answerIn ? "translateY(0)" : "translateY(12px)",
          }}
        >
          {/* Names the speaker without a bubble, avatar or sparkle. */}
          <p className="text-xs uppercase tracking-[0.18em] text-warm-taupe/80 mb-3">
            The Neighbourhood
          </p>
          <p className="v3-serif text-warm-taupe text-xl md:text-2xl leading-relaxed">
            There&rsquo;s good evidence on both sides, and a lot depends on your
            family. Here&rsquo;s what the research actually says — and here&rsquo;s
            a way to talk to your mother about it that doesn&rsquo;t turn into an
            argument.
          </p>
        </div>
      </div>

      <p
        className={`v3-fade ${inView ? "in-view" : ""} v3-body-lg text-on-surface-variant mt-12 md:mt-16 max-w-xl`}
        data-delay="3"
      >
        That&rsquo;s the AI companion built into The Neighbourhood. Ask it
        anything, any hour. It already knows your child&rsquo;s age, what
        you&rsquo;ve tried, and what worked last time &mdash; so you never start
        from scratch. And it won&rsquo;t tell you what kind of parent to be.
      </p>
    </section>
  );
}
