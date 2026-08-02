/**
 * The decorative accent label — Love Ya Like A Sister at 16px with 4px
 * tracking. In the reference this carries credential badges and section
 * eyebrows; it is the only place the second display face appears, which
 * is what keeps the dual-typeface system legible rather than noisy.
 */
const TONES = {
  "warm-orange": "text-warm-orange",
  "golden-amber": "text-golden-amber",
  "deep-purple": "text-deep-purple",
  "slate-blue": "text-slate-blue",
};

export default function AccentLabel({
  as: Tag = "p",
  tone = "warm-orange",
  className = "",
  children,
  ...props
}) {
  return (
    <Tag className={`type-accent-label ${TONES[tone]} ${className}`} {...props}>
      {children}
    </Tag>
  );
}
