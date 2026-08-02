import AccentLabel from "./AccentLabel.jsx";
import useScrollReveal from "../useScrollReveal.js";

/**
 * The reference's section-opening pattern: accent label, Section Heading
 * in Capriola, then a Body Large lead. Reused by every section so the
 * information hierarchy never drifts between them.
 */
export default function SectionHeading({
  label,
  title,
  lead,
  align = "left",
  className = "",
}) {
  const { ref, inView } = useScrollReveal(0.25);
  const centered = align === "center";

  return (
    <div
      ref={ref}
      className={`${centered ? "mx-auto text-center" : ""} max-w-measure-lg ${className}`}
    >
      {label && (
        <AccentLabel className={`reveal ${inView ? "in-view" : ""} mb-md`}>
          {label}
        </AccentLabel>
      )}

      <h2
        className={`reveal ${inView ? "in-view" : ""} type-section-heading text-deep-purple`}
        data-delay="1"
      >
        {title}
      </h2>

      {lead && (
        <p
          className={`reveal ${inView ? "in-view" : ""} type-body-large mt-lg text-slate-blue`}
          data-delay="2"
        >
          {lead}
        </p>
      )}
    </div>
  );
}
