import { useState } from "react";
import Section from "../ui/Section.jsx";
import SectionHeading from "../ui/SectionHeading.jsx";
import useScrollReveal from "../useScrollReveal.js";

// Honest answers only. Where we don't know something yet (like pricing),
// we say so — that IS the trust strategy.
const FAQS = [
  {
    q: "Where is The Neighbourhood?",
    a: "Two places — on your phone, and in your neighbourhood. The guidance and community start everywhere, from day one. The first physical spaces are taking shape in Gurugram — the first of many. Join from wherever you are; you're not early to someone else's city, you're early to yours.",
  },
  {
    q: "What actually happens when I join the waitlist?",
    a: "You get a place among our founding families and a link to invite neighbours — people near you who might want to be part of this too. We'll write when something opens near you or when something we've built feels worth sharing. That's the whole of it. No inbox clutter, no nudges, no noise.",
  },
  {
    q: "How much will it cost?",
    a: "Joining the waitlist is free, and it stays free. We'll share pricing openly and early — before anything launches, before you need to decide anything. No surprises.",
  },
  {
    q: "Who is behind this?",
    a: "Sakshi and Rachit — a couple in Gurugram, parents to Mehr and Rudr. They spent months visiting spaces that had warm teachers but thin philosophy, beautiful rooms but no real community. Never all three in one place. So they started building it. Rudr arrived while they were mid-build — which made it less of a project and more of a necessity.",
  },
  {
    q: "Is this just for Gurugram parents right now?",
    a: "Right now, yes — the physical spaces are Gurugram first. But the digital layer and community are being built for parents everywhere from day one. If you're in Delhi, Mumbai, Bangalore, or anywhere else — join. You're not on a backup list. You're a founding member of your city's Neighbourhood.",
  },
  {
    q: "Is this for younger or older kids too?",
    a: "The Neighbourhood is built around the first six years — from the first weeks home to starting school. If your child is somewhere in that window, this is for you. If they're not quite there yet or just past it, join anyway — what we're building grows with families, not just children.",
  },
  {
    q: "What if it doesn't open near me for a long time?",
    a: "We can't promise a date for every city — and we won't pretend otherwise. What we can promise: you'll hear from us before anyone else, pricing will never change on you between now and then, and the digital layer starts working for you from day one, wherever you are.",
  },
];

function FaqItem({ item, open, onToggle }) {
  return (
    <div className="border-b border-lavender-mist">
      <button
        onClick={onToggle}
        aria-expanded={open}
        className="group flex w-full items-center justify-between gap-lg py-lg text-left"
      >
        <span className="type-sub-heading text-deep-purple transition-colors duration-200 group-hover:text-warm-orange">
          {item.q}
        </span>
        <span
          className={`material-symbols-outlined shrink-0 text-warm-orange transition-transform duration-300 ${
            open ? "rotate-45" : ""
          }`}
          aria-hidden="true"
        >
          add
        </span>
      </button>

      <div
        className={`grid transition-[grid-template-rows] duration-300 ease-out ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <p className="type-body-regular max-w-measure-xl pb-lg text-slate-blue">
            {item.a}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(0);
  const { ref, inView } = useScrollReveal(0.15);

  return (
    <Section id="faq">
      <SectionHeading
        label="Questions"
        title="You're right to ask."
        align="center"
      />

      <div
        ref={ref}
        className={`reveal ${inView ? "in-view" : ""} mx-auto mt-2xl max-w-measure-xl border-t border-lavender-mist`}
      >
        {FAQS.map((item, i) => (
          <FaqItem
            key={item.q}
            item={item}
            open={openIndex === i}
            onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
          />
        ))}
      </div>
    </Section>
  );
}
