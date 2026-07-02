import useScrollReveal from "./useScrollReveal.js";

/**
 * Staggered word-by-word headline reveal (kihealth-style), built on the
 * same IntersectionObserver hook the rest of the site uses. Each word
 * rises out of its own overflow-hidden slot with a small per-word delay.
 *
 * Screen readers get the intact sentence via aria-label; the visual
 * word fragments are aria-hidden.
 */
export default function WordReveal({
  text,
  as: Tag = "h2",
  className = "",
  threshold = 0.35,
  stagger = 50, // ms per word
}) {
  const { ref, inView } = useScrollReveal(threshold);
  const words = text.split(" ");

  return (
    <Tag
      ref={ref}
      className={`word-reveal ${inView ? "in-view" : ""} ${className}`}
      aria-label={text}
    >
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          aria-hidden="true"
          className="inline-block overflow-hidden align-bottom"
          style={i < words.length - 1 ? { marginRight: "0.28em" } : undefined}
        >
          <span className="word-reveal-inner" style={{ transitionDelay: `${i * stagger}ms` }}>
            {word}
          </span>
        </span>
      ))}
    </Tag>
  );
}
