/**
 * Section shell — the single centred column the whole reference layout
 * is built from. Gutters and vertical rhythm come from spacing tokens
 * only, stepping up across the mobile → tablet → desktop tiers exactly
 * as DESIGN.md's responsive strategy describes.
 */
const SURFACES = {
  none: "",
  "cream-peach": "bg-cream-peach",
  "off-white": "bg-off-white",
  "light-amber": "bg-light-amber",
  white: "bg-white",
};

export function Container({ className = "", children }) {
  return (
    <div
      className={`mx-auto w-full max-w-page px-lg md:px-xl lg:px-2xl ${className}`}
    >
      {children}
    </div>
  );
}

export default function Section({
  as: Tag = "section",
  surface = "none",
  className = "",
  containerClassName = "",
  children,
  ...props
}) {
  return (
    <Tag
      className={`py-2xl md:py-3xl ${SURFACES[surface]} ${className}`}
      {...props}
    >
      <Container className={containerClassName}>{children}</Container>
    </Tag>
  );
}
