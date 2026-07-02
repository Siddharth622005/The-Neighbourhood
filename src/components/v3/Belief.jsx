import useScrollReveal from "../useScrollReveal.js";

/**
 * The turn of the story: from "this is hard" to "here's what we believe."
 * One statement, held in a lot of quiet space. This is one of the few
 * places Playfair Display is allowed to speak.
 */
export default function Belief() {
  const { ref, inView } = useScrollReveal(0.45);

  return (
    <section className="py-28 md:py-40 px-margin-mobile md:px-gutter">
      <div
        ref={ref}
        className={`v3-fade ${inView ? "in-view" : ""} max-w-3xl mx-auto text-center`}
      >
        <p className="v3-eyebrow text-warm-taupe mb-8">What we believe</p>
        <p className="v3-h2 text-charcoal">
          The best thing you can do for a child is to{" "}
          <em className="v3-serif text-warm-taupe">take care of their parent.</em>
        </p>
        <p className="v3-body-lg text-on-surface-variant mt-8">
          So that's where we start.
        </p>
      </div>
    </section>
  );
}
