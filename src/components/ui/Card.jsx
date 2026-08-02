import { forwardRef } from "react";

/**
 * Card surface — `card` radius (17px) on a White or Off White wash, with
 * a Lavender Mist hairline. DESIGN.md validates exactly one shadow, so
 * elevation is opt-in via `elevated` and never layered.
 *
 * Forwards its ref so the scroll-reveal hook can observe a card directly
 * without an extra wrapper element.
 */
// "white" resolves to the palette's warm card colour rather than true
// white: on a cream page, a pure-white card reads as a hole punched in
// the page. True white is reserved for genuinely elevated surfaces
// (the dialog, the sticky nav veil).
const SURFACES = {
  white: "bg-card",
  "off-white": "bg-surface",
  "cream-peach": "bg-background",
  "light-amber": "bg-light-amber",
};

const Card = forwardRef(function Card(
  {
    as: Tag = "div",
    surface = "white",
    bordered = true,
    elevated = false,
    className = "",
    children,
    ...props
  },
  ref
) {
  return (
    <Tag
      ref={ref}
      className={`rounded-card p-section-pad ${SURFACES[surface]} ${
        bordered ? "border border-lavender-mist" : ""
      } ${elevated ? "shadow-subtle-lift" : ""} ${className}`}
      {...props}
    >
      {children}
    </Tag>
  );
});

export default Card;
