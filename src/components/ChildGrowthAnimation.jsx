const D = "16s";

// A single realistic child handprint outline — palm + five connected fingers.
// Authored fingers-up; centred via the -46,-78 translate on <use>.
const HAND_PATH =
  "M34,150 C22,132 18,116 21,100 C17,94 7,92 4,83 C2,78 6,73 12,75 " +
  "C18,77 22,82 26,86 C26,74 26,66 28,60 L26,22 Q25,11 31,12 Q37,13 37,24 " +
  "L39,58 Q41,62 43,58 L45,16 Q47,5 51,6 Q55,7 54,18 L55,57 Q57,61 59,57 " +
  "L62,20 Q64,10 68,12 Q72,14 70,25 L71,59 Q73,63 76,60 L80,34 Q83,25 86,30 " +
  "Q89,34 86,44 L84,66 C88,82 88,116 78,134 C70,144 54,150 42,149 Z";

export default function ChildGrowthAnimation() {
  return (
    <div className="relative w-full h-full flex items-center justify-center select-none">
      <style>{`
        .hp { transform-box: fill-box; transform-origin: center; }

        @keyframes hp-baby {
          0%,1%    { transform:translate(70px,262px)  rotate(-13deg) scale(0);    opacity:0; }
          5%       { transform:translate(70px,262px)  rotate(-13deg) scale(0.47); opacity:.85; }
          9%       { transform:translate(70px,262px)  rotate(-13deg) scale(0.38); opacity:1; }
          12%,82%  { transform:translate(70px,262px)  rotate(-13deg) scale(0.41); opacity:1; }
          88%      { transform:translate(70px,262px)  rotate(-13deg) scale(0.41); opacity:0; }
          100%     { transform:translate(70px,262px)  rotate(-13deg) scale(0);    opacity:0; }
        }
        @keyframes hp-toddler {
          0%,6%    { transform:translate(200px,214px) rotate(11deg)  scale(0);    opacity:0; }
          10%      { transform:translate(200px,214px) rotate(11deg)  scale(0.66); opacity:.85; }
          14%      { transform:translate(200px,214px) rotate(11deg)  scale(0.55); opacity:1; }
          17%,82%  { transform:translate(200px,214px) rotate(11deg)  scale(0.58); opacity:1; }
          88%      { transform:translate(200px,214px) rotate(11deg)  scale(0.58); opacity:0; }
          100%     { transform:translate(200px,214px) rotate(11deg)  scale(0);    opacity:0; }
        }
        @keyframes hp-child {
          0%,11%   { transform:translate(84px,150px)  rotate(-7deg)  scale(0);    opacity:0; }
          15%      { transform:translate(84px,150px)  rotate(-7deg)  scale(0.9);  opacity:.85; }
          19%      { transform:translate(84px,150px)  rotate(-7deg)  scale(0.76); opacity:1; }
          22%,82%  { transform:translate(84px,150px)  rotate(-7deg)  scale(0.8);  opacity:1; }
          88%      { transform:translate(84px,150px)  rotate(-7deg)  scale(0.8);  opacity:0; }
          100%     { transform:translate(84px,150px)  rotate(-7deg)  scale(0);    opacity:0; }
        }
        @keyframes hp-teen {
          0%,16%   { transform:translate(212px,96px)  rotate(9deg)   scale(0);    opacity:0; }
          20%      { transform:translate(212px,96px)  rotate(9deg)   scale(1.16); opacity:.85; }
          24%      { transform:translate(212px,96px)  rotate(9deg)   scale(0.98); opacity:1; }
          27%,82%  { transform:translate(212px,96px)  rotate(9deg)   scale(1.04); opacity:1; }
          88%      { transform:translate(212px,96px)  rotate(9deg)   scale(1.04); opacity:0; }
          100%     { transform:translate(212px,96px)  rotate(9deg)   scale(0);    opacity:0; }
        }

        @keyframes lbl-baby    { 0%,10%{opacity:0} 14%,82%{opacity:.85} 88%,100%{opacity:0} }
        @keyframes lbl-toddler { 0%,15%{opacity:0} 19%,82%{opacity:.85} 88%,100%{opacity:0} }
        @keyframes lbl-child   { 0%,20%{opacity:0} 24%,82%{opacity:.85} 88%,100%{opacity:0} }
        @keyframes lbl-teen    { 0%,25%{opacity:0} 29%,82%{opacity:.85} 88%,100%{opacity:0} }

        .hp-baby    { animation: hp-baby    ${D} ease-in-out infinite; }
        .hp-toddler { animation: hp-toddler ${D} ease-in-out infinite; }
        .hp-child   { animation: hp-child   ${D} ease-in-out infinite; }
        .hp-teen    { animation: hp-teen    ${D} ease-in-out infinite; }

        .lbl-baby    { animation: lbl-baby    ${D} ease-in-out infinite; opacity:0; }
        .lbl-toddler { animation: lbl-toddler ${D} ease-in-out infinite; opacity:0; }
        .lbl-child   { animation: lbl-child   ${D} ease-in-out infinite; opacity:0; }
        .lbl-teen    { animation: lbl-teen    ${D} ease-in-out infinite; opacity:0; }
      `}</style>

      <svg viewBox="0 0 300 330" xmlns="http://www.w3.org/2000/svg" className="w-full h-full max-w-xs">
        <defs>
          <path id="tn-hand" d={HAND_PATH} />
          <filter id="tn-hand-shadow" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="1.5" dy="3" stdDeviation="3" floodColor="#5C4A32" floodOpacity="0.18" />
          </filter>
        </defs>

        <text x="150" y="26" textAnchor="middle" fontSize="10" fontFamily="Georgia,serif"
              fontStyle="italic" letterSpacing="3" fill="#B49A72" opacity="0.7">
          watch them grow
        </text>

        <g filter="url(#tn-hand-shadow)">
          <use className="hp hp-baby"    href="#tn-hand" transform="translate(-46,-78)" fill="#E7D3BC" />
          <use className="hp hp-toddler" href="#tn-hand" transform="translate(-46,-78)" fill="#D4B78F" />
          <use className="hp hp-child"   href="#tn-hand" transform="translate(-46,-78)" fill="#B9986B" />
          <use className="hp hp-teen"    href="#tn-hand" transform="translate(-46,-78)" fill="#8B7355" />
        </g>

        <text className="lbl-baby"    x="88"  y="292" fontSize="11" fontFamily="Georgia,serif" fontStyle="italic" fill="#8B7355">1 year</text>
        <text className="lbl-toddler" x="214" y="268" fontSize="11" fontFamily="Georgia,serif" fontStyle="italic" fill="#8B7355">4 years</text>
        <text className="lbl-child"   x="96"  y="192" fontSize="11" fontFamily="Georgia,serif" fontStyle="italic" fill="#8B7355">8 years</text>
        <text className="lbl-teen"    x="214" y="120" fontSize="11" fontFamily="Georgia,serif" fontStyle="italic" fill="#8B7355">12 years</text>
      </svg>
    </div>
  );
}
