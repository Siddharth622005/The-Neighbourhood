import { useState } from "react";
import useScrollReveal from "../useScrollReveal.js";
import WordReveal from "../WordReveal.jsx";

// Honest answers only. Where we don't know something yet (like pricing),
// we say so — that IS the trust strategy.
const FAQS = [
  {
    q: "Where is The Neighbourhood?",
    a: "Two places: on your phone, and on the ground. The guidance and community are being built for parents everywhere, from day one. The first physical spaces are taking shape in Gurugram — the first neighbourhood of many. Join from wherever you are; you're not early to someone else's city, you're early to yours.",
  },
  {
    q: "What actually happens when I join the waitlist?",
    a: "You get a place in line and a link to invite neighbours. We'll write to you when we open near you — that's it. No newsletters you didn't ask for, no daily nudges.",
  },
  {
    q: "How much will it cost?",
    a: "The waitlist is free. We'll share pricing openly and early, before anything launches — you'll never be surprised into paying for something.",
  },
  {
    q: "Who is behind this?",
    a: "A small team led by Sakshi, a parent in Gurugram who spent weeks looking for a place that got safety, warmth, and learning right at the same time — and couldn't find one. So she started building it.",
  },
];

function FaqItem({ item, open, onToggle }) {
  return (
    <div className="border-t border-warm-taupe/15 last:border-b">
      <button
        onClick={onToggle}
        aria-expanded={open}
        className="w-full flex items-center justify-between gap-6 py-6 text-left group"
      >
        <span className="v3-h3 text-charcoal group-hover:text-warm-taupe transition-colors duration-200">
          {item.q}
        </span>
        <span
          className={`material-symbols-outlined text-warm-taupe flex-shrink-0 transition-transform duration-300 ${
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
          <p className="v3-body-lg text-on-surface-variant max-w-2xl pb-7">{item.a}</p>
        </div>
      </div>
    </div>
  );
}

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(0);
  const { ref, inView } = useScrollReveal(0.2);

  return (
    <section id="faq" className="py-section-gap md:py-32 px-margin-mobile md:px-gutter max-w-container-max mx-auto">
      <div className="grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-4">
          <p className="v3-eyebrow text-warm-taupe mb-6">Questions</p>
          <WordReveal text="You're right to ask." className="v3-h2 text-charcoal" />
        </div>
        <div ref={ref} className={`v3-fade ${inView ? "in-view" : ""} lg:col-span-8`}>
          {FAQS.map((item, i) => (
            <FaqItem
              key={item.q}
              item={item}
              open={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
