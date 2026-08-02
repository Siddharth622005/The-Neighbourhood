/**
 * Pill button — the site's primary control. Geometry is the reference
 * system's: `pill` radius (22px), Body Small Bold label, spacing-token
 * padding.
 *
 * The primary action carries the palette's terracotta rather than the
 * heading espresso. Those were one token until the palette refresh
 * separated "the darkest ink" from "the thing you should click", which
 * is what lets the CTA read as warm and inviting while headings stay
 * calm. White on terracotta is 6.0:1, deepening to 7.5:1 on hover.
 */
const VARIANTS = {
  primary:
    "bg-primary text-white hover:bg-primary-hover hover:shadow-subtle-lift",
  secondary:
    "bg-card text-heading border-2 border-heading hover:bg-elevated hover:shadow-subtle-lift",
  outline:
    "bg-transparent text-heading border-2 border-border hover:border-primary",
  quiet:
    "bg-transparent text-muted hover:text-primary",
};

const SIZES = {
  sm: "px-lg py-xs",
  md: "px-xl py-sm",
  lg: "px-3xl py-md",
};

export default function Button({
  as: Tag = "button",
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...props
}) {
  return (
    <Tag
      // Exposed so an edition can restyle a variant from CSS without
      // depending on the utility classes above.
      data-variant={variant}
      className={`type-body-small-bold inline-flex items-center justify-center gap-sm rounded-pill whitespace-nowrap transition-all duration-200 hover:-translate-y-px disabled:pointer-events-none disabled:opacity-60 ${VARIANTS[variant]} ${SIZES[size]} ${className}`}
      {...props}
    >
      {children}
    </Tag>
  );
}
