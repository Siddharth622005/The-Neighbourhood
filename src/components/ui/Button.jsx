/**
 * Pill button — the reference system's primary control.
 *
 * Radius is `pill` (22px), the label is Body Small Bold (14px/700), and
 * the fill is Golden Amber, which DESIGN.md assigns to "Primary CTA
 * button fill". Per the do's-and-don'ts, the amber fill is reserved for
 * the single most important action on a screen; everything else uses
 * `secondary` or `quiet`.
 *
 * Label colour on the amber fill is Deep Purple rather than White. The
 * token description names white as the CTA label colour, but white on
 * #ffbd59 is a 1.9:1 contrast ratio, and the same document requires
 * WCAG AA (4.5:1). Deep Purple on amber clears it at 6.6:1 and keeps the
 * button inside the palette.
 */
const VARIANTS = {
  primary:
    "bg-golden-amber text-deep-purple hover:bg-warm-orange hover:shadow-subtle-lift",
  secondary:
    "bg-white text-deep-purple border-2 border-deep-purple hover:bg-cream-peach hover:shadow-subtle-lift",
  outline:
    "bg-transparent text-deep-purple border-2 border-lavender-mist hover:border-deep-purple",
  quiet:
    "bg-transparent text-slate-blue hover:text-deep-purple",
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
