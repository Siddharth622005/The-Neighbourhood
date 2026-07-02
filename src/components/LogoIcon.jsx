/**
 * "The Neighbourhood" mark: a house outline whose walls sweep inward to
 * form a heart, then cross and flare back out into a wide base — like a
 * ribbon tied under the roof. Every stroke is its own <path>/<circle>
 * with a stable data-part name, and every stroke carries pathLength="1"
 * with stroke-dasharray/dashoffset already wired to "0" (fully drawn).
 * That makes it a drop-in target for the same GSAP draw-in recipe already
 * used on HeroV3's underline: flip a part's dashoffset to 1, then tween
 * it back to 0 (see HeroV3.jsx / .v3-hero-underline for the pattern).
 * Dots are plain circles, so they animate with a simple scale/opacity
 * tween instead (transform-origin: center via CSS).
 *
 * Parts: roof-left, roof-right, heart-lobe-left, heart-lobe-right,
 * heart-flare-left, heart-flare-right, dot-left, dot-center, dot-right.
 */
export default function LogoIcon({ className = "", color = "#4A3323" }) {
  return (
    <svg
      viewBox="0 0 200 190"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      className={`logo-icon ${className}`}
    >
      <g
        stroke={color}
        strokeWidth="7"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <g data-group="roof">
          <path
            data-part="roof-left"
            d="M 6 88 Q 8 82 14 77 L 100 14"
            pathLength="1"
            strokeDasharray="1"
            strokeDashoffset="0"
          />
          <path
            data-part="roof-right"
            d="M 194 88 Q 192 82 186 77 L 100 14"
            pathLength="1"
            strokeDasharray="1"
            strokeDashoffset="0"
          />
        </g>

        <g data-group="heart">
          {/* Left wall drops from the eave and bulges wide, becoming the
              heart's left lobe, down to the shared point at bottom-center. */}
          <path
            data-part="heart-lobe-left"
            d="M 38 76 C 15 95, 18 130, 100 155"
            pathLength="1"
            strokeDasharray="1"
            strokeDashoffset="0"
          />
          <path
            data-part="heart-lobe-right"
            d="M 162 76 C 185 95, 182 130, 100 155"
            pathLength="1"
            strokeDasharray="1"
            strokeDashoffset="0"
          />
          {/* Past the heart's point, each strand crosses to the far side
              and curls into a short tail, like a ribbon tied off. */}
          <path
            data-part="heart-flare-left"
            d="M 100 155 C 125 165, 138 155, 132 137"
            pathLength="1"
            strokeDasharray="1"
            strokeDashoffset="0"
          />
          <path
            data-part="heart-flare-right"
            d="M 100 155 C 75 165, 62 155, 68 137"
            pathLength="1"
            strokeDasharray="1"
            strokeDashoffset="0"
          />
        </g>
      </g>

      <g data-group="dots" fill={color}>
        <circle data-part="dot-left" cx="82" cy="178" r="6" />
        <circle data-part="dot-center" cx="100" cy="180" r="6" />
        <circle data-part="dot-right" cx="118" cy="178" r="6" />
      </g>
    </svg>
  );
}
