import useScrollReveal from "../useScrollReveal.js";

const chapters = [
  {
    number: "01",
    heading: "Something was missing.",
    body: "Like many parents in Gurugram, Sakshi spent weeks visiting preschools for her daughter. She met passionate teachers. She saw well-run centres. She found warm caregivers. But never all three together, never in one place.",
  },
  {
    number: "02",
    heading: "We've lost the village.",
    body: "One evening, watching her daughter play, Sakshi remembered the neighbourhood where she grew up, where aunties looked out for every child, where you could knock on any door. That's when it hit her: we haven't just lost our padosis. We've lost the entire village it takes to raise a child.",
  },
  {
    number: "03",
    heading: "So we rebuilt it.",
    body: "The Neighbourhood was born as a complete support system for the modern family: warm physical spaces where children don't just learn, they belong; a community that restores the culture of shared trust; and a digital layer so parents never feel like they're figuring it out in the dark.",
  },
];

function StoryChapter({ chapter, index }) {
  const { ref, inView } = useScrollReveal(0.3);
  return (
    <div ref={ref} className="relative flex gap-6 md:gap-8 items-start">
      <span
        className={`story-badge ${inView ? "in-view" : ""} relative z-10 flex-shrink-0 w-14 h-14 md:w-16 md:h-16
                    rounded-full bg-surface-cream border-2 border-soft-sand/50 shadow-sm
                    flex items-center justify-center font-headline-h3 font-bold text-warm-taupe`}
        style={{ transitionDelay: `${index * 120}ms` }}
      >
        {chapter.number}
      </span>
      <div
        className={`reveal ${inView ? "in-view" : ""} pt-2 md:pt-3`}
        style={{ transitionDelay: `${index * 120 + 80}ms` }}
      >
        <h3 className="font-headline-h2 text-headline-h3 text-warm-taupe mb-3">
          {chapter.heading}
        </h3>
        <p className="text-on-surface-variant text-lg leading-relaxed max-w-xl">
          {chapter.body}
        </p>
      </div>
    </div>
  );
}

export default function OurStory() {
  const header = useScrollReveal(0.3);
  const timeline = useScrollReveal(0.15);
  const quote = useScrollReveal(0.3);

  return (
    <section
      id="our-story"
      className="relative py-section-gap px-margin-mobile md:px-gutter max-w-container-max mx-auto overflow-hidden"
    >
      {/* soft decorative blob, consistent with hero */}
      <div
        className="blob-float-slow pointer-events-none absolute -top-10 -left-16 w-72 h-72 text-soft-sand opacity-10"
        aria-hidden="true"
      >
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <path
            d="M48,-57C60.6,-46.3,68.1,-29.6,70.2,-12.2C72.3,5.2,69,23.3,59.4,37.1C49.8,50.9,33.9,60.4,16.1,65.5C-1.7,70.6,-21.4,71.3,-37.4,63.7C-53.4,56.1,-65.7,40.2,-70.1,22.5C-74.5,4.8,-71,-14.7,-61,-29.8C-51,-44.9,-34.5,-55.6,-18,-62.5C-1.5,-69.4,15,-67.7,29.3,-62.3C43.6,-56.9,55.7,-47.9,48,-57Z"
            fill="currentColor"
            transform="translate(100 100)"
          />
        </svg>
      </div>

      <div ref={header.ref} className={`reveal ${header.inView ? "in-view" : ""} mb-16 relative z-10`}>
        <p className="font-tagline-handwritten text-tagline-handwritten text-soft-sand uppercase tracking-widest mb-4">
          Our Story
        </p>
        <h2 className="font-headline-h2 text-headline-h2 text-charcoal max-w-2xl">
          Every great village starts with one parent asking,{" "}
          <span className="text-warm-taupe italic">why does this feel so hard?</span>
        </h2>
      </div>

      <div ref={timeline.ref} className="relative flex flex-col gap-14 md:gap-16">
        {/* connecting line, centred on the badges (w-14/16 -> left-7/8) */}
        <div
          className={`story-line ${timeline.inView ? "in-view" : ""} absolute top-2 bottom-2
                      left-7 md:left-8 w-px bg-gradient-to-b from-soft-sand/60 via-warm-taupe/40 to-soft-sand/10`}
          aria-hidden="true"
        />
        {chapters.map((chapter, i) => (
          <StoryChapter key={chapter.number} chapter={chapter} index={i} />
        ))}
      </div>

      <div
        ref={quote.ref}
        className={`reveal ${quote.inView ? "in-view" : ""} relative mt-16 md:mt-20 ml-0 md:ml-24
                    max-w-2xl rounded-[28px] bg-surface-container/40 border border-soft-sand/25
                    p-8 md:p-10`}
        style={{ transitionDelay: "200ms" }}
      >
        <span
          className="absolute -top-5 left-8 text-6xl font-headline-h1 text-soft-sand/40 select-none"
          aria-hidden="true"
        >
          &ldquo;
        </span>
        <p className="text-xl text-charcoal font-headline-h3 italic leading-relaxed">
          The Neighbourhood isn't trying to replicate the past. We're reimagining it for today's
          families, bringing back the village, one child, one parent, and one connection at a time.
        </p>
        <p className="mt-4 text-warm-taupe font-body-strong">— Sakshi, Founder</p>
      </div>
    </section>
  );
}
