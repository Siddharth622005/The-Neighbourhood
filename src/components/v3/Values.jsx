import Section from "../ui/Section.jsx";
import SectionHeading from "../ui/SectionHeading.jsx";
import Card from "../ui/Card.jsx";
import AccentLabel from "../ui/AccentLabel.jsx";
import useScrollReveal from "../useScrollReveal.js";

// Our values, spoken like a person instead of a values poster. The five
// words are Esther Wojcicki's TRICK framework — so the oversized amber
// initial on each card isn't only a drop cap, it spells the acronym
// down the column.
const VALUES = [
  {
    word: "Trust",
    line: "We help you trust your child's pace instead of racing them against a milestone chart.",
  },
  {
    word: "Respect",
    line: "Your child's pace and personality are data, not a deviation to correct. We build guidance around who they actually are.",
  },
  {
    word: "Independence",
    line: "We nudge you toward letting your child try and stumble a little — not toward doing it for them, and not toward doing it for you either.",
  },
  {
    word: "Collaboration",
    line: "Guidance you shape with us, and with the neighbours around you — not instructions handed down from an app.",
  },
  {
    word: "Kindness",
    line: "No judgment for the days that don't go to plan. For your child, and for you.",
  },
];

export default function Values() {
  const { ref, inView } = useScrollReveal(0.15);

  return (
    <Section id="values">
      <SectionHeading
        label="How we behave"
        title="Values we live by."
        lead="Built on TRICK — Esther Wojcicki's five principles for raising capable, grounded kids."
        align="center"
      />

      <div ref={ref} className="mt-3xl grid gap-component-gap md:grid-cols-2 lg:grid-cols-3">
        {VALUES.map((v, i) => (
          <Card
            key={v.word}
            surface="white"
            elevated
            className={`reveal ${inView ? "in-view" : ""} h-full`}
            data-delay={String((i % 4) + 1)}
          >
            <h3 className="type-section-heading text-deep-purple">
              <span className="text-warm-orange">{v.word[0]}</span>
              {v.word.slice(1)}
            </h3>
            <p className="type-body-regular mt-sm text-slate-blue">{v.line}</p>
          </Card>
        ))}

        <Card surface="light-amber" bordered={false} className="flex h-full items-center justify-center">
          <AccentLabel tone="deep-purple" className="text-center">
            T R I C K
          </AccentLabel>
        </Card>
      </div>
    </Section>
  );
}
