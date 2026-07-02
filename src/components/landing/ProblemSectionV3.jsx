import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import WordReveal from "../WordReveal.jsx";

gsap.registerPlugin(ScrollTrigger);

// The signature kihealth-style interaction: as you scroll through a tall
// pinned section, a single "active" card advances 0 -> 1 -> 2 in lockstep
// with scroll progress. Each problem here maps 1:1 to a solution delivered
// later in the page (village -> Community, generic advice -> AI Copilot,
// indoor screen time -> Physical Spaces), so Problem and Solution bookend
// each other with matching 01/02/03 numbering.
const PROBLEMS = [
  {
    icon: "group_off",
    title: "The village disappeared.",
    body: "Nuclear families, no relatives next door, and a generation of parents figuring it out through 2am searches instead of a neighbour's knock on the door.",
  },
  {
    icon: "content_copy",
    title: "Advice stopped listening.",
    body: "Parenting books and generic apps hand every family the same script, regardless of your child's temperament, your context, or what's actually happening in your home.",
  },
  {
    icon: "smartphone",
    title: "Play moved indoors.",
    body: "Screens filled the space where streets, courtyards, and safe wandering used to be, and childhood got quieter, more solitary, and more sedentary.",
  },
];

export default function ProblemSectionV3() {
  const sectionRef = useRef(null);
  const fillRefs = useRef([]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Scroll-jacked pin/scrub only kicks in on md+ — on small screens the
      // 300vh scroll-jack section would just feel like dead, laggy scroll
      // space, so cards fall back to normal stacked flow there instead
      // (matches the responsive matchMedia branching kihealth itself uses).
      ScrollTrigger.matchMedia({
        "(min-width: 768px)": function () {
          const st = ScrollTrigger.create({
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 1,
            onUpdate: (self) => {
              const per = self.progress * PROBLEMS.length;
              const idx = Math.min(PROBLEMS.length - 1, Math.floor(per));
              setActive(idx);
              // Progress rail fills continuously with scroll (not binary),
              // driven via refs so scroll ticks never re-render React.
              fillRefs.current.forEach((el, i) => {
                if (el) el.style.transform = `scaleX(${Math.min(1, Math.max(0, per - i))})`;
              });
            },
          });

          return () => st.kill();
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="problem" ref={sectionRef} className="relative md:h-[300vh]">
      <div className="md:sticky md:top-0 md:h-screen relative flex flex-col justify-center py-section-gap md:py-0 px-margin-mobile md:px-gutter max-w-container-max mx-auto">
        {/* Giant watermark number, re-mounted per switch so it rises in again */}
        <span
          key={active}
          aria-hidden="true"
          className="v3-watermark hidden md:block pointer-events-none select-none absolute top-6 right-0 font-headline-h1 font-bold leading-none text-[11rem] text-soft-sand/25"
        >
          0{active + 1}
        </span>

        <div className="max-w-2xl mb-stack-lg relative">
          <p className="font-tagline-handwritten text-tagline-handwritten text-soft-sand uppercase tracking-widest mb-4">
            the problem
          </p>
          <WordReveal
            text="Modern parenting broke something the village used to hold."
            className="font-headline-h2 text-headline-h2 text-charcoal"
          />
        </div>

        <div className="grid md:grid-cols-3 gap-6 relative">
          {PROBLEMS.map((p, i) => {
            const isActive = i === active;
            return (
              <div
                key={p.title}
                className={`rounded-[32px] p-8 border transition-all duration-500 ease-out ${
                  isActive
                    ? "bg-charcoal border-charcoal md:scale-100 md:-translate-y-2 opacity-100 shadow-xl"
                    : "bg-surface-container/40 border-transparent md:scale-[0.96] md:translate-y-0 opacity-100 md:opacity-60"
                }`}
              >
                {/* Lottie slot: once animation JSON files are provided, swap
                    the <span className="material-symbols-outlined"> below for
                    a <Lottie animationData={p.lottie} loop={isActive} />.
                    Keep this wrapper's size/background classes so the
                    active/inactive transition keeps working unchanged. */}
                <div
                  className={`w-14 h-14 rounded-full flex items-center justify-center mb-6 transition-colors duration-500 ${
                    isActive ? "v3-icon-pop bg-secondary" : "bg-surface-container"
                  }`}
                >
                  <span
                    className={`material-symbols-outlined text-2xl ${
                      isActive ? "text-on-secondary" : "text-warm-taupe"
                    }`}
                  >
                    {p.icon}
                  </span>
                </div>

                <span
                  className={`font-headline-h1 font-bold block mb-3 ${
                    isActive ? "text-white/20" : "text-soft-sand/40"
                  }`}
                >
                  0{i + 1}
                </span>
                <h3
                  className={`font-headline-h3 text-headline-h3 mb-3 ${
                    isActive ? "text-surface-cream" : "text-warm-taupe"
                  }`}
                >
                  {p.title}
                </h3>
                <p
                  className={`text-base leading-relaxed ${
                    isActive ? "text-surface-cream/80" : "text-on-surface-variant"
                  }`}
                >
                  {p.body}
                </p>
              </div>
            );
          })}
        </div>

        {/* Scrub-linked progress rail: each segment fills continuously as you
            scroll through its card's third of the section. */}
        <div className="hidden md:flex gap-2 mt-stack-lg max-w-xs" aria-hidden="true">
          {PROBLEMS.map((_, i) => (
            <div key={i} className="h-1 flex-1 rounded-full bg-soft-sand/30 overflow-hidden">
              <div
                ref={(el) => (fillRefs.current[i] = el)}
                className="h-full w-full rounded-full bg-charcoal origin-left"
                style={{ transform: "scaleX(0)" }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
