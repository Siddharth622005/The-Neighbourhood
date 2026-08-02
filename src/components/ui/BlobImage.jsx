/**
 * Organic blob-shaped photo frame — one of the three signature traits
 * DESIGN.md names, alongside the pill buttons and the dashed outlines.
 *
 * An optional dashed Warm Orange outline sits behind the photo, offset,
 * so the frame reads as a hand-drawn illustration rather than a cropped
 * rectangle. `variant` alternates the blob's asymmetry so two frames on
 * the same page never trace the same silhouette.
 */
export default function BlobImage({
  src,
  alt,
  variant = "a",
  outlined = true,
  aspect = "aspect-square",
  className = "",
  imgClassName = "",
  children,
}) {
  const shape = variant === "a" ? "blob-frame" : "blob-frame-alt";

  return (
    <div className={`relative ${className}`}>
      {outlined && (
        <div
          aria-hidden="true"
          className={`${shape} dashed-outline pointer-events-none absolute inset-0 translate-x-lg translate-y-lg`}
        />
      )}

      <div className={`${shape} relative w-full bg-light-amber ${aspect}`}>
        {src ? (
          <img
            src={src}
            alt={alt}
            loading="lazy"
            className={`h-full w-full object-cover ${imgClassName}`}
          />
        ) : (
          children
        )}
      </div>
    </div>
  );
}
