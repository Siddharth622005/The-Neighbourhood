const D = "16s";

export default function ChildGrowthAnimation() {
  return (
    <div className="relative w-full h-full flex items-center justify-center select-none">
      <style>{`
        @keyframes hp-baby {
          0%,1%    { transform:translate(70px,268px) rotate(-12deg) scale(0);    opacity:0; }
          5%       { transform:translate(70px,268px) rotate(-12deg) scale(1.22); opacity:0.8; }
          9%       { transform:translate(70px,268px) rotate(-12deg) scale(0.93); opacity:1; }
          12%,82%  { transform:translate(70px,268px) rotate(-12deg) scale(1);   opacity:1; }
          87%      { transform:translate(70px,268px) rotate(-12deg) scale(1);   opacity:0; }
          100%     { transform:translate(70px,268px) rotate(-12deg) scale(0);   opacity:0; }
        }
        @keyframes hp-toddler {
          0%,6%    { transform:translate(192px,247px) rotate(9deg) scale(0);    opacity:0; }
          10%      { transform:translate(192px,247px) rotate(9deg) scale(1.22); opacity:0.8; }
          14%      { transform:translate(192px,247px) rotate(9deg) scale(0.93); opacity:1; }
          17%,82%  { transform:translate(192px,247px) rotate(9deg) scale(1);   opacity:1; }
          87%      { transform:translate(192px,247px) rotate(9deg) scale(1);   opacity:0; }
          100%     { transform:translate(192px,247px) rotate(9deg) scale(0);   opacity:0; }
        }
        @keyframes hp-child {
          0%,11%   { transform:translate(68px,153px) rotate(-5deg) scale(0);    opacity:0; }
          15%      { transform:translate(68px,153px) rotate(-5deg) scale(1.22); opacity:0.8; }
          19%      { transform:translate(68px,153px) rotate(-5deg) scale(0.93); opacity:1; }
          22%,82%  { transform:translate(68px,153px) rotate(-5deg) scale(1);   opacity:1; }
          87%      { transform:translate(68px,153px) rotate(-5deg) scale(1);   opacity:0; }
          100%     { transform:translate(68px,153px) rotate(-5deg) scale(0);   opacity:0; }
        }
        @keyframes hp-teen {
          0%,16%   { transform:translate(185px,108px) rotate(7deg) scale(0);    opacity:0; }
          20%      { transform:translate(185px,108px) rotate(7deg) scale(1.22); opacity:0.8; }
          24%      { transform:translate(185px,108px) rotate(7deg) scale(0.93); opacity:1; }
          27%,82%  { transform:translate(185px,108px) rotate(7deg) scale(1);   opacity:1; }
          87%      { transform:translate(185px,108px) rotate(7deg) scale(1);   opacity:0; }
          100%     { transform:translate(185px,108px) rotate(7deg) scale(0);   opacity:0; }
        }

        @keyframes lbl-baby    { 0%,10%{opacity:0} 14%,82%{opacity:1} 87%,100%{opacity:0} }
        @keyframes lbl-toddler { 0%,15%{opacity:0} 19%,82%{opacity:1} 87%,100%{opacity:0} }
        @keyframes lbl-child   { 0%,20%{opacity:0} 24%,82%{opacity:1} 87%,100%{opacity:0} }
        @keyframes lbl-teen    { 0%,25%{opacity:0} 29%,82%{opacity:1} 87%,100%{opacity:0} }

        .hp-baby    { animation: hp-baby    ${D} ease-in-out infinite; }
        .hp-toddler { animation: hp-toddler ${D} ease-in-out infinite; }
        .hp-child   { animation: hp-child   ${D} ease-in-out infinite; }
        .hp-teen    { animation: hp-teen    ${D} ease-in-out infinite; }

        .lbl-baby    { animation: lbl-baby    ${D} ease-in-out infinite; opacity:0; }
        .lbl-toddler { animation: lbl-toddler ${D} ease-in-out infinite; opacity:0; }
        .lbl-child   { animation: lbl-child   ${D} ease-in-out infinite; opacity:0; }
        .lbl-teen    { animation: lbl-teen    ${D} ease-in-out infinite; opacity:0; }
      `}</style>

      <svg viewBox="0 0 260 315" xmlns="http://www.w3.org/2000/svg" className="w-full h-full max-w-xs">

        <filter id="hp-shadow">
          <feDropShadow dx="1" dy="2" stdDeviation="2.5" floodOpacity="0.12" />
        </filter>

        {/* subtle heading */}
        <text x="130" y="28" textAnchor="middle" fontSize="10" fontFamily="Georgia,serif"
              fontStyle="italic" letterSpacing="2" fill="#C4A882" opacity="0.6">
          growing up
        </text>

        {/* ── BABY (1yr) — all elements at palm-center (0,0) ── */}
        <g className="hp-baby" filter="url(#hp-shadow)">
          {/* palm */}
          <ellipse cx="0"  cy="0"   rx="15"  ry="12"  fill="#E8D5C4"/>
          {/* thumb */}
          <ellipse cx="-14" cy="-5" rx="5"   ry="8.5" fill="#E8D5C4" transform="rotate(-40,-14,-5)"/>
          {/* index */}
          <ellipse cx="-7" cy="-20" rx="4.5" ry="11"  fill="#E8D5C4" transform="rotate(-7,-7,-20)"/>
          {/* middle */}
          <ellipse cx="0"  cy="-22" rx="5"   ry="12"  fill="#E8D5C4"/>
          {/* ring */}
          <ellipse cx="7"  cy="-20" rx="4.5" ry="11"  fill="#E8D5C4" transform="rotate(7,7,-20)"/>
          {/* pinky */}
          <ellipse cx="14" cy="-14" rx="3.5" ry="8"   fill="#E8D5C4" transform="rotate(18,14,-14)"/>
        </g>

        {/* ── TODDLER (4yrs) ── */}
        <g className="hp-toddler" filter="url(#hp-shadow)">
          <ellipse cx="0"   cy="0"   rx="21"  ry="17"  fill="#D4B896"/>
          <ellipse cx="-20" cy="-7"  rx="7"   ry="12"  fill="#D4B896" transform="rotate(-40,-20,-7)"/>
          <ellipse cx="-10" cy="-28" rx="6"   ry="15.5"fill="#D4B896" transform="rotate(-7,-10,-28)"/>
          <ellipse cx="0"   cy="-31" rx="6.5" ry="17"  fill="#D4B896"/>
          <ellipse cx="10"  cy="-28" rx="6"   ry="15.5"fill="#D4B896" transform="rotate(7,10,-28)"/>
          <ellipse cx="19"  cy="-20" rx="5"   ry="11"  fill="#D4B896" transform="rotate(18,19,-20)"/>
        </g>

        {/* ── CHILD (8yrs) ── */}
        <g className="hp-child" filter="url(#hp-shadow)">
          <ellipse cx="0"   cy="0"   rx="29"  ry="23"  fill="#C4A882"/>
          <ellipse cx="-28" cy="-10" rx="9.5" ry="16"  fill="#C4A882" transform="rotate(-40,-28,-10)"/>
          <ellipse cx="-13" cy="-38" rx="8"   ry="21"  fill="#C4A882" transform="rotate(-7,-13,-38)"/>
          <ellipse cx="0"   cy="-42" rx="9"   ry="23"  fill="#C4A882"/>
          <ellipse cx="13"  cy="-38" rx="8"   ry="21"  fill="#C4A882" transform="rotate(7,13,-38)"/>
          <ellipse cx="27"  cy="-28" rx="7"   ry="15"  fill="#C4A882" transform="rotate(18,27,-28)"/>
        </g>

        {/* ── TEEN (12yrs) ── */}
        <g className="hp-teen" filter="url(#hp-shadow)">
          <ellipse cx="0"   cy="0"   rx="37"  ry="30"  fill="#8B7355"/>
          <ellipse cx="-35" cy="-12" rx="12"  ry="21"  fill="#8B7355" transform="rotate(-40,-35,-12)"/>
          <ellipse cx="-17" cy="-48" rx="10.5"ry="28"  fill="#8B7355" transform="rotate(-7,-17,-48)"/>
          <ellipse cx="0"   cy="-53" rx="11.5"ry="30"  fill="#8B7355"/>
          <ellipse cx="17"  cy="-48" rx="10.5"ry="28"  fill="#8B7355" transform="rotate(7,17,-48)"/>
          <ellipse cx="34"  cy="-36" rx="9"   ry="20"  fill="#8B7355" transform="rotate(18,34,-36)"/>
        </g>

        {/* Age labels */}
        <text className="lbl-baby"    x="93"  y="288" fontSize="11" fontFamily="Georgia,serif" fontStyle="italic" fill="#8B7355">1yr</text>
        <text className="lbl-toddler" x="210" y="272" fontSize="11" fontFamily="Georgia,serif" fontStyle="italic" fill="#8B7355">4yrs</text>
        <text className="lbl-child"   x="94"  y="185" fontSize="11" fontFamily="Georgia,serif" fontStyle="italic" fill="#8B7355">8yrs</text>
        <text className="lbl-teen"    x="210" y="142" fontSize="11" fontFamily="Georgia,serif" fontStyle="italic" fill="#8B7355">12yrs</text>

      </svg>
    </div>
  );
}
