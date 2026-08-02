import useScrollReveal from "../../components/useScrollReveal.js";

export const FOUNDERS_EMAIL = "founders@theneighbourhood.co.in";

/**
 * Contact, in the legacy vocabulary.
 *
 * A mailto rather than a form — nothing is wired up to receive a form,
 * and an address that plainly works beats one that silently drops what a
 * parent writes.
 *
 * Outlined rather than filled, so it doesn't compete with the charcoal
 * "Start with your child" pill in the Invitation immediately above.
 */
export default function Contact() {
  const { ref, inView } = useScrollReveal(0.2);

  return (
    <section
      id="contact"
      className="py-section-gap md:py-32 px-margin-mobile md:px-gutter max-w-container-max mx-auto"
    >
      <div
        ref={ref}
        className={`v3-fade ${inView ? "in-view" : ""} max-w-[42rem] mx-auto text-center`}
      >
        <p className="v3-eyebrow text-warm-taupe mb-6">Contact</p>

        <h2 className="v3-h2 text-charcoal">
          Come and say <em className="v3-serif text-warm-taupe">hello.</em>
        </h2>

        <p className="v3-body-lg text-on-surface-variant mt-6">
          Questions about the spaces, the waitlist, or something we
          haven&rsquo;t thought of &mdash; we&rsquo;d like to hear from you.
        </p>

        <a
          href={`mailto:${FOUNDERS_EMAIL}`}
          className="inline-block mt-10 border border-warm-taupe/40 text-charcoal px-9 py-4 rounded-full font-medium text-lg hover:bg-charcoal hover:text-surface-cream hover:-translate-y-0.5 transition-all duration-200"
        >
          {FOUNDERS_EMAIL}
        </a>

        <p className="text-sm text-on-surface-variant/70 mt-6">Gurugram, India</p>
      </div>
    </section>
  );
}
