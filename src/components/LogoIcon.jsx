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
            d="M 5 92 Q 9 85 15 80 L 100 15"
            pathLength="1"
            strokeDasharray="1"
            strokeDashoffset="0"
          />
          <path
            data-part="roof-right"
            d="M 195 92 Q 191 85 185 80 L 100 15"
            pathLength="1"
            strokeDasharray="1"
            strokeDashoffset="0"
          />
        </g>

        <g data-group="heart">
          {/* Left wall drops from the eave and bulges inward, becoming the
              heart's left lobe, down to the shared point at bottom-center. */}
          <path
            data-part="heart-lobe-left"
            d="M 34 76 C 14 104, 34 138, 100 150"
            pathLength="1"
            strokeDasharray="1"
            strokeDashoffset="0"
          />
          <path
            data-part="heart-lobe-right"
            d="M 166 76 C 186 104, 166 138, 100 150"
            pathLength="1"
            strokeDasharray="1"
            strokeDashoffset="0"
          />
          {/* Past the heart's point, each strand crosses to the far side
              and curls into a short tail, like a ribbon tied off. */}
          <path
            data-part="heart-flare-left"
            d="M 100 150 C 148 162, 160 148, 150 132"
            pathLength="1"
            strokeDasharray="1"
            strokeDashoffset="0"
          />
          <path
            data-part="heart-flare-right"
            d="M 100 150 C 52 162, 40 148, 50 132"
            pathLength="1"
            strokeDasharray="1"
            strokeDashoffset="0"
          />
        </g>
      </g>

      <g data-group="dots" fill={color}>
        <circle data-part="dot-left" cx="76" cy="180" r="5" />
        <circle data-part="dot-center" cx="100" cy="182" r="5" />
        <circle data-part="dot-right" cx="124" cy="180" r="5" />
      </g>
    </svg>
  );
}
