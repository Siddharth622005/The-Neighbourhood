import { useEffect, useState } from "react";
import useScrollReveal from "../useScrollReveal.js";
import LogoIcon from "../LogoIcon.jsx";

/**
 * Section 5 — The Companion.
 *
 * A message thread. It follows the conventions people already read
 * fluently — your message dark and right-aligned, the reply white and
 * left-aligned — because a "restrained" version that drops every one of
 * those signals stops reading as a conversation at all.
 *
 * One squared corner on each bubble implies a tail without drawing one.
 * Body copy is Inter, not Playfair: an italic serif paragraph reads as a
 * literary epigraph, and the type doctrine reserves the serif for short
 * accents anyway — never whole paragraphs.
 *
 * The timestamp makes the headline's "11pm" literal, and the brand mark
 * identifies the replier — the small illustration doing identity work
 * rather than decoration.
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

      <div className="mt-12 md:mt-16 max-w-xl">
        {/* Parent — dark and right-aligned, the way your own sent messages read. */}
        <div className={`v3-fade ${inView ? "in-view" : ""} flex flex-col items-end`} data-delay="2">
          <div className="bg-charcoal rounded-3xl rounded-br-md px-5 py-4 max-w-[19rem] md:max-w-sm">
            <p className="text-[15px] md:text-base leading-relaxed text-surface-cream">
              Everyone says I should sleep-train. My mother says absolutely not.
              I don&rsquo;t know who&rsquo;s right.
            </p>
          </div>
          <p className="text-[11px] text-on-surface-variant/60 mt-2 mr-1">11:04 PM</p>
        </div>

        {/* The Neighbourhood — white, left-aligned, arriving after a beat. */}
        <div
          className="flex flex-col items-start mt-5 transition-all duration-700 ease-out"
          style={{
            opacity: answerIn ? 1 : 0,
            transform: answerIn ? "translateY(0)" : "translateY(12px)",
          }}
        >
          <div className="flex items-center gap-2 mb-2 ml-1">
            <LogoIcon className="w-3.5 h-3.5" color="#8B7355" />
            <span className="text-[11px] uppercase tracking-[0.16em] text-warm-taupe/80">
              The Neighbourhood
            </span>
          </div>
          <div className="bg-white rounded-3xl rounded-bl-md px-5 py-4 max-w-[22rem] md:max-w-md">
            <p className="text-[15px] md:text-base leading-relaxed text-charcoal">
              There&rsquo;s good evidence on both sides, and a lot depends on your
              family. Here&rsquo;s what the research actually says — and here&rsquo;s
              a way to talk to your mother about it that doesn&rsquo;t turn into an
              argument.
            </p>
          </div>
          <p className="text-[11px] text-on-surface-variant/60 mt-2 ml-1">11:04 PM</p>
        </div>
      </div>

      <p
        className={`v3-fade ${inView ? "in-view" : ""} v3-body-lg text-on-surface-variant mt-12 md:mt-16 max-w-xl`}
        data-delay="3"
      >
        Ask it anything, any hour. It already knows your child&rsquo;s age, what
        you&rsquo;ve tried, and what worked last time &mdash; so you never start
        from scratch. And it won&rsquo;t tell you what kind of parent to be.
      </p>
    </section>
  );
}
