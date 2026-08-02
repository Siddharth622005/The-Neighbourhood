import AccentLabel from "./AccentLabel.jsx";
import useScrollReveal from "../useScrollReveal.js";

// The measure a heading block is set to. `lg` is the default reading
// measure; `xl` is for the occasional long title that would otherwise
// take an extra line. Set as a prop rather than passed through
// `className`, because two competing max-w-* utilities would be resolved
// by stylesheet order rather than by intent.
const MEASURES = {
  lg: "max-w-measure-lg",
  xl: "max-w-measure-xl",
};

/**
 * The reference's section-opening pattern: accent label, Section Heading,
 * then a Body Large lead. Reused by every section so the information
 * hierarchy never drifts between them.
 *
 * `title` accepts a node as well as a string, so a section can pin its
 * own line breaks (see Today.jsx).
 */
export default function SectionHeading({
  label,
  title,
  lead,
  align = "left",
  measure = "lg",
  className = "",
}) {
  const { ref, inView } = useScrollReveal(0.25);
  const centered = align === "center";

  return (
    <div
      ref={ref}
      className={`${centered ? "mx-auto text-center" : ""} ${MEASURES[measure]} ${className}`}
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
