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
    body: "One evening, watching her daughter play, Sakshi remembered the neighbourhood where she grew up — where aunties looked out for every child, where you could knock on any door. That's when it hit her: we haven't just lost our padosis. We've lost the entire village it takes to raise a child.",
  },
  {
    number: "03",
    heading: "So we rebuilt it.",
    body: "The Neighbourhood was born as a complete support system for the modern family — warm physical spaces where children don't just learn, they belong; a community that restores the culture of shared trust; and a digital layer so parents never feel like they're figuring it out in the dark.",
  },
];

function StoryChapter({ chapter }) {
  const { ref, inView } = useScrollReveal(0.2);
  return (
    <div
      ref={ref}
      className={`reveal ${inView ? "in-view" : ""} flex gap-8 items-start`}
    >
      <span className="font-headline-h1 text-soft-sand/30 font-bold text-5xl leading-none pt-1 select-none">
        {chapter.number}
      </span>
      <div>
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
  return (
    <section id="mission" className="py-section-gap px-margin-mobile md:px-gutter max-w-container-max mx-auto">
      <div className="mb-16">
        <p className="font-tagline-handwritten text-tagline-handwritten text-soft-sand uppercase tracking-widest mb-4">
          Our Story
        </p>
        <h2 className="font-headline-h2 text-headline-h2 text-charcoal max-w-2xl">
          Every great village starts with one parent asking — <span className="text-warm-taupe italic">why does this feel so hard?</span>
        </h2>
      </div>

      <div className="flex flex-col gap-16">
        {chapters.map((chapter) => (
          <StoryChapter key={chapter.number} chapter={chapter} />
        ))}
      </div>

      <div className="mt-16 pl-20 border-l-2 border-soft-sand/30">
        <p className="text-xl text-charcoal font-headline-h3 italic leading-relaxed max-w-2xl">
          "The Neighbourhood isn't trying to replicate the past. We're reimagining it for today's families — bringing back the village, one child, one parent, and one connection at a time."
        </p>
        <p className="mt-4 text-warm-taupe font-body-strong">— Sakshi, Founder</p>
      </div>
    </section>
  );
}
