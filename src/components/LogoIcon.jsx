export default function LogoIcon({ className = "", color = "#3D2514" }) {
  return (
    <svg
      viewBox="0 0 100 118"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      className={className}
    >
      {/* Roof */}
      <path
        d="M10 47 L50 10 L90 47"
        stroke={color}
        strokeWidth="5.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Left wall + bottom curve */}
      <path
        d="M23 47 L23 84 Q23 96 36 96"
        stroke={color}
        strokeWidth="5.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Right wall + bottom curve */}
      <path
        d="M77 47 L77 84 Q77 96 64 96"
        stroke={color}
        strokeWidth="5.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Bottom connector */}
      <path
        d="M36 96 L64 96"
        stroke={color}
        strokeWidth="5.5"
        strokeLinecap="round"
      />
      {/* Ribbon heart - left lobe */}
      <path
        d="M50 70 C44 62 30 60 31 50 C32 43 39 41 44 46 C47 49 49 53 50 56"
        stroke={color}
        strokeWidth="4.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Ribbon heart - right lobe */}
      <path
        d="M50 70 C56 62 70 60 69 50 C68 43 61 41 56 46 C53 49 51 53 50 56"
        stroke={color}
        strokeWidth="4.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Ribbon cross strands */}
      <path
        d="M44 63 C46 65 50 67 54 65"
        stroke={color}
        strokeWidth="4.5"
        strokeLinecap="round"
      />
      {/* Three dots */}
      <circle cx="38" cy="107" r="3.5" fill={color} />
      <circle cx="50" cy="107" r="3.5" fill={color} />
      <circle cx="62" cy="107" r="3.5" fill={color} />
    </svg>
  );
}
