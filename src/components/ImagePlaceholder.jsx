/**
 * Stand-in for real imagery. Pass `alt` describing the intended illustration
 * (kept from the original Stitch design briefs) so it's easy to brief an
 * illustrator/photographer or swap in the real asset later.
 *
 * Usage: <ImagePlaceholder alt="..." className="w-full h-full" />
 * To swap in a real image later, just replace this component's internals
 * with an <img src={...} /> or pass a `src` prop through.
 */
export default function ImagePlaceholder({ alt, className = "", icon = "image" }) {
  return (
    <div
      className={`flex items-center justify-center bg-surface-variant text-on-surface-variant/40 ${className}`}
      role="img"
      aria-label={alt}
      title={alt}
    >
      <span className="material-symbols-outlined text-5xl">{icon}</span>
    </div>
  );
}
