export default function FamilyIllustration({ className = "" }) {
  return (
    <svg
      viewBox="0 0 220 280"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Parent body */}
      <ellipse cx="90" cy="90" rx="28" ry="28" fill="#8B7355" opacity="0.9" />
      <path
        d="M62 160 C62 118 118 118 118 160 L118 230 Q118 240 108 240 L72 240 Q62 240 62 230 Z"
        fill="#8B7355" opacity="0.9"
      />
      {/* Parent arm reaching down */}
      <path
        d="M118 175 Q148 190 155 215"
        stroke="#8B7355" strokeWidth="14" strokeLinecap="round" fill="none" opacity="0.9"
      />

      {/* Child */}
      <ellipse cx="163" cy="195" rx="18" ry="18" fill="#C9A58E" opacity="0.9" />
      <path
        d="M145 240 C145 213 181 213 181 240 L181 268 Q181 276 173 276 L153 276 Q145 276 145 268 Z"
        fill="#C9A58E" opacity="0.9"
      />
      {/* Child arm up */}
      <path
        d="M145 228 Q130 210 130 195"
        stroke="#C9A58E" strokeWidth="10" strokeLinecap="round" fill="none" opacity="0.9"
      />

      {/* Holding hands join dot */}
      <circle cx="142" cy="212" r="7" fill="#E8DDD1" />

      {/* Small leaf/plant at base */}
      <path
        d="M20 270 Q35 240 55 255 Q40 275 20 270Z"
        fill="#8B7355" opacity="0.3"
      />
      <path
        d="M10 265 Q30 245 45 260 Q28 278 10 265Z"
        fill="#C9A58E" opacity="0.25"
      />
    </svg>
  );
}
