/**
 * Pill button — the site's primary control. Geometry is the reference
 * system's: `pill` radius (22px), Body Small Bold label, spacing-token
 * padding.
 *
 * The colours are The Neighbourhood's. The brand's primary action has
 * always been a charcoal fill with cream type — high contrast, calm, no
 * bright accent — warming to taupe on hover. That pairing is 12.4:1, so
 * it clears WCAG AA comfortably.
 */
const VARIANTS = {
  primary:
    "bg-charcoal text-surface-cream hover:bg-warm-taupe hover:shadow-subtle-lift",
  secondary:
    "bg-surface-cream text-charcoal border-2 border-charcoal hover:bg-white hover:shadow-subtle-lift",
  outline:
    "bg-transparent text-charcoal border-2 border-lavender-mist hover:border-charcoal",
  quiet:
    "bg-transparent text-on-surface-variant hover:text-charcoal",
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
      className={`type-body-small-bold inline-flex items-center justify-center gap-sm rounded-pill whitespace-nowrap transition-all duration-200 hover:-translate-y-px disabled:pointer-events-none disabled:opacity-60 ${VARIANTS[variant]} ${SIZES[size]} ${className}`}
      {...props}
    >
      {children}
    </Tag>
  );
}
