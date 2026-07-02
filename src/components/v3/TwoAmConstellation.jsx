/**
 * The 2am Constellation — the V3 hero visual.
 *
 * A field of warm window-lights in the dark: abstracted lit windows with no
 * house outlines, scattered like a hillside at night. Each light breathes on
 * its own slow cycle. One window — yours, lower-center, largest and warmest —
 * periodically brightens, and a distant light answers within a second.
 * The image says what the headline says: someone else is awake too.
 *
 * All motion is CSS (see "2am Constellation" block in index.css); honours
 * prefers-reduced-motion by rendering every light steady.
 */

// x/y are centers in a 400x400 viewBox. dur/delay drive the independent
// breathing cycles (negative delays start each light mid-cycle). Roles:
// "call" = the viewer's window, "answer" = the light that responds each
// cycle, "answer-slow" = a farther light that answers occasionally.
const WINDOWS = [
  // lower-left cluster (the dense part of the hillside)
  { x: 52, y: 322, w: 13, h: 17, dur: 11, delay: -3 },
  { x: 84, y: 300, w: 10, h: 13, dur: 9, delay: -6 },
  { x: 64, y: 270, w: 8, h: 10, dur: 13, delay: -1 },
  { x: 112, y: 334, w: 15, h: 19, dur: 8, delay: -4 },
  { x: 134, y: 292, w: 9, h: 12, dur: 12, delay: -9 },
  { x: 98, y: 252, w: 11, h: 14, dur: 10, delay: -2 },
  { x: 154, y: 326, w: 10, h: 13, dur: 14, delay: -7 },
  { x: 176, y: 286, w: 12, h: 15, dur: 9, delay: -5 },
  { x: 126, y: 228, w: 8, h: 10, dur: 11, delay: -8 },
  { x: 164, y: 248, w: 9, h: 11, dur: 13, delay: -3 },
  { x: 88, y: 186, w: 9, h: 11, dur: 10, delay: -6 },
  // the viewer's window: lower-center, largest, warmest
  { x: 204, y: 312, w: 19, h: 25, role: "call" },
  // center band
  { x: 238, y: 334, w: 10, h: 13, dur: 12, delay: -4 },
  { x: 256, y: 290, w: 12, h: 15, dur: 8, delay: -1 },
  { x: 222, y: 258, w: 8, h: 10, dur: 14, delay: -10 },
  { x: 210, y: 198, w: 9, h: 11, dur: 11, delay: -5 },
  { x: 178, y: 162, w: 8, h: 9, dur: 9, delay: -2 },
  // right mid
  { x: 288, y: 318, w: 9, h: 12, dur: 13, delay: -7 },
  { x: 306, y: 270, w: 11, h: 14, dur: 10, delay: -3 },
  { x: 270, y: 234, w: 8, h: 10, dur: 12, delay: -9 },
  { x: 336, y: 302, w: 8, h: 11, dur: 9, delay: -4 },
  { x: 302, y: 210, w: 10, h: 12, dur: 11, delay: -1 },
  { x: 350, y: 240, w: 8, h: 10, dur: 14, delay: -6 },
  // upper, sparse (the hill thins out)
  { x: 252, y: 172, w: 8, h: 10, dur: 10, delay: -8 },
  { x: 322, y: 150, w: 9, h: 11, role: "answer" },
  { x: 134, y: 130, w: 8, h: 10, dur: 12, delay: -5 },
  { x: 278, y: 98, w: 7, h: 9, role: "answer-slow" },
  { x: 354, y: 92, w: 7, h: 9, dur: 13, delay: -2 },
  { x: 70, y: 116, w: 7, h: 9, dur: 11, delay: -7 },
];

const ROLE_CLASS = {
  call: "constellation-call",
  answer: "constellation-answer",
  "answer-slow": "constellation-answer-slow",
};

export default function TwoAmConstellation({ className = "" }) {
  return (
    <svg
      viewBox="0 0 400 400"
      xmlns="http://www.w3.org/2000/svg"
      className={`w-full h-full ${className}`}
      role="img"
      aria-label="A night scene of warm window lights — one glows brighter, and a distant light answers. Somewhere, another parent is awake too."
    >
      <defs>
        <linearGradient id="tn2am-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#31261E" />
          <stop offset="1" stopColor="#221A14" />
        </linearGradient>
        <linearGradient id="tn2am-light" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#F5E6C8" />
          <stop offset="1" stopColor="#E8B87D" />
        </linearGradient>
        <radialGradient id="tn2am-glow">
          <stop offset="0" stopColor="#E8B87D" stopOpacity="0.45" />
          <stop offset="1" stopColor="#E8B87D" stopOpacity="0" />
        </radialGradient>
        <clipPath id="tn2am-frame">
          <rect x="0" y="0" width="400" height="400" rx="28" />
        </clipPath>
      </defs>

      <rect x="0" y="0" width="400" height="400" rx="28" fill="url(#tn2am-sky)" />

      <g clipPath="url(#tn2am-frame)">
        {WINDOWS.map(({ x, y, w, h, dur, delay, role }) => (
          <g
            key={`${x}-${y}`}
            className={role ? ROLE_CLASS[role] : "constellation-window"}
            style={role ? undefined : { "--dur": `${dur}s`, "--delay": `${delay}s` }}
          >
            <ellipse cx={x} cy={y} rx={w * 1.9} ry={h * 1.6} fill="url(#tn2am-glow)" />
            <rect
              x={x - w / 2}
              y={y - h / 2}
              width={w}
              height={h}
              rx={role === "call" ? 2 : 1.5}
              fill="url(#tn2am-light)"
            />
          </g>
        ))}
      </g>
    </svg>
  );
}
