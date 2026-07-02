import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ImagePlaceholder from "../ImagePlaceholder.jsx";
import { useStaggerReveal } from "../useScrollReveal.js";

gsap.registerPlugin(ScrollTrigger);

// Bridges Problem -> Solution: not what's broken, not what we built, but WHY
// we built it this way. Grounded in the same immunopsychiatry framing
// already used in FeatureRows, expanded here rather than invented fresh.
// Beat 3 deliberately echoes the "2am" language from ProblemSectionV3's
// first card, answering it directly.
const BEATS = [
  {
    icon: "spa",
    title: "Calm environments",
    body: "The Aangan and The Verandah are designed around what calms a child's nervous system: natural materials, soft light, room to move. A regulated child is a child who can actually learn and play.",
  },
  {
    icon: "groups",
    title: "Consistent relationships",
    body: "The same neighbours, the same faces, week after week. Consistency, not novelty, is what makes a space feel safe enough to actually be yourself in.",
  },
  {
    icon: "psychology",
    title: "Responsive guidance",
    body: "Support that meets you in the moment, at 2pm or 2am, informed by expertise but never generic, because context is most of what good parenting advice actually needs.",
  },
];

// Parallax speeds (yPercent) for the staggered image collage — kept subtle
// on purpose. Positive drifts down relative to scroll, negative drifts up.
const IMAGES = [
  { alt: "A parent and toddler sitting calmly on a low wooden bench inside The Aangan, soft natural light through large windows", icon: "spa", speed: -14, className: "w-3/5 aspect-[4/5]" },
  { alt: "Neighbours chatting warmly at a community gathering, children playing nearby, golden hour light", icon: "groups", speed: 20, className: "w-4/5 aspect-square ml-auto -mt-16" },
  { alt: "Close-up of a phone screen showing a gentle, empathetic AI chat response to a parent's late-night question", icon: "psychology", speed: -9, className: "w-3/5 aspect-[4/5] mt-8" },
];

export default function ApproachSectionV3() {
  const sectionRef = useRef(null);
  const { ref: textRef, inView } = useStaggerReveal(0.15);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const panels = gsap.utils.toArray(".approach-parallax-img");
      panels.forEach((panel) => {
        gsap.to(panel, {
          yPercent: Number(panel.dataset.speed) || 0,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="approach"
      ref={sectionRef}
      className="py-section-gap px-margin-mobile md:px-gutter max-w-container-max mx-auto"
    >
      <div className="grid lg:grid-cols-2 gap-stack-lg items-center">
        <div>
          <p className="font-tagline-handwritten text-tagline-handwritten text-soft-sand uppercase tracking-widest mb-4">
            our approach
          </p>
          <h2 className="font-headline-h2 text-headline-h2 text-charcoal mb-6 max-w-lg">
            Why calm, connected environments come first.
          </h2>

          <div ref={textRef} className="space-y-stack-lg">
            {BEATS.map((b) => (
              <div key={b.title} className={`stagger-item flex gap-4 ${inView ? "in-view" : ""}`}>
                <div className="w-12 h-12 flex-shrink-0 rounded-full bg-surface-container flex items-center justify-center">
                  <span className="material-symbols-outlined text-warm-taupe text-2xl">
                    {b.icon}
                  </span>
                </div>
                <div>
                  <p className="font-body-strong text-charcoal mb-1">{b.title}</p>
                  <p className="text-on-surface-variant leading-relaxed">{b.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative overflow-hidden py-12 hidden lg:block" aria-hidden="false">
          <div className="flex flex-col gap-6">
            {IMAGES.map((img) => (
              <div
                key={img.alt}
                data-speed={img.speed}
                className={`approach-parallax-img rounded-[32px] overflow-hidden bg-secondary-container/20 ${img.className}`}
              >
                <ImagePlaceholder className="w-full h-full" alt={img.alt} icon={img.icon} />
              </div>
            ))}
          </div>
        </div>

        {/* Mobile: same 3 images, simple stacked layout, no parallax scrub. */}
        <div className="grid grid-cols-2 gap-4 lg:hidden">
          {IMAGES.map((img, i) => (
            <div
              key={img.alt}
              className={`rounded-[24px] overflow-hidden bg-secondary-container/20 aspect-square ${
                i === 0 ? "col-span-2" : ""
              }`}
            >
              <ImagePlaceholder className="w-full h-full" alt={img.alt} icon={img.icon} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
