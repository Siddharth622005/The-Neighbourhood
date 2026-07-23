import useScrollReveal from "../useScrollReveal.js";
import WordReveal from "../WordReveal.jsx";
import aanganSpace from "../../assets/aangan-space.jpg";
import neighboursCircle from "../../assets/neighbours-circle.jpg";
import guidancePhone from "../../assets/guidance-phone.jpg";

const PILLARS = [
  {
    number: "01",
    eyebrow: "The Guidance",
    title: "Answers that know your child.",
    body: "One quiet app. Ask anything at 2pm or 2am and get an answer shaped by your child — their age, their temperament, their history. Grounded in real expertise, spoken like a friend, never a script.",
    image: {
      src: guidancePhone,
      alt: "A phone held up at night showing a gentle, reassuring reply to a parent's question, with a sleeping baby softly visible below in warm lamplight",
    },
  },
  {
    number: "02",
    eyebrow: "The Neighbours",
    title: "The same faces, week after week.",
    body: "Small circles of parents who live near you, matched by your child's age and stage. Not another group chat — real people you'll actually see, until they stop being strangers and start being the aunties and uncles your child grows up around.",
    image: {
      src: neighboursCircle,
      alt: "Parents sitting on floor cushions in easy conversation beneath a tree-shaped bookshelf, while two children read together on a rug nearby",
    },
  },
  {
    number: "03",
    eyebrow: "The Spaces",
    title: "Places where children belong, not just attend.",
    body: "The Aangan and The Verandah are calm, beautiful spaces near you — natural materials, soft light, room to move. Designed around a child's nervous system, not a brochure. A regulated child is a child who can truly play, learn, and grow.",
    image: {
      src: aanganSpace,
      alt: "Inside The Aangan: a child absorbed in a wooden activity tray on the floor of a calm Montessori room — low shelves, pale wood, soft morning light",
    },
  },
];

function PillarRow({ pillar, index }) {
  const { ref, inView } = useScrollReveal(0.25);
  const flipped = index % 2 === 1;

  return (
    <div
      ref={ref}
      className={`v3-fade ${inView ? "in-view" : ""} grid md:grid-cols-2 gap-10 md:gap-16 items-center`}
    >
      <div className={flipped ? "md:order-2" : ""}>
        <div className="flex items-baseline gap-4 mb-5">
          <span className="v3-eyebrow text-soft-sand">{pillar.number}</span>
          <span className="v3-eyebrow text-warm-taupe">{pillar.eyebrow}</span>
        </div>
        <h3 className="v3-h2 text-charcoal mb-5 max-w-md">{pillar.title}</h3>
        <p className="v3-body-lg text-on-surface-variant max-w-lg">{pillar.body}</p>
      </div>

      <div className={flipped ? "md:order-1" : ""}>
        <div className="rounded-[28px] overflow-hidden aspect-[4/3] bg-surface-container/60">
          <img
            src={pillar.image.src}
            alt={pillar.image.alt}
            loading="lazy"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}

/**
 * Section 4 — What We're Building.
 *
 * Mirrors the main homepage section while preserving /next#today for the
 * V4 navbar.
 */
export default function Today() {
  return (
    <section
      id="today"
      className="py-section-gap md:py-32 px-margin-mobile md:px-gutter max-w-container-max mx-auto"
    >
      <div className="max-w-3xl mb-20 md:mb-24">
        <p className="v3-eyebrow text-warm-taupe mb-6">What we're building</p>
        <WordReveal
          text="We're rebuilding the Neighbourhood. All three parts of it."
          className="v3-h2 text-charcoal"
        />
      </div>

      <div className="space-y-24 md:space-y-32">
        {PILLARS.map((pillar, index) => (
          <PillarRow key={pillar.number} pillar={pillar} index={index} />
        ))}
      </div>
    </section>
  );
}
