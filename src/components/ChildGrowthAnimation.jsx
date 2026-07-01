export default function ChildGrowthAnimation() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <style>{`
        @keyframes cg-baby {
          0%   { opacity: 0; transform: translateY(10px); }
          5%   { opacity: 1; transform: translateY(0); }
          22%  { opacity: 1; transform: translateY(0); }
          27%  { opacity: 0; transform: translateY(-4px); }
          100% { opacity: 0; }
        }
        @keyframes cg-toddler {
          0%, 24%  { opacity: 0; transform: translateY(10px); }
          29%      { opacity: 1; transform: translateY(0); }
          47%      { opacity: 1; transform: translateY(0); }
          52%      { opacity: 0; transform: translateY(-4px); }
          100%     { opacity: 0; }
        }
        @keyframes cg-child {
          0%, 49%  { opacity: 0; transform: translateY(10px); }
          54%      { opacity: 1; transform: translateY(0); }
          72%      { opacity: 1; transform: translateY(0); }
          77%      { opacity: 0; transform: translateY(-4px); }
          100%     { opacity: 0; }
        }
        @keyframes cg-teen {
          0%, 74%  { opacity: 0; transform: translateY(10px); }
          79%      { opacity: 1; transform: translateY(0); }
          95%      { opacity: 1; transform: translateY(0); }
          100%     { opacity: 0; transform: translateY(-4px); }
        }
        @keyframes cg-mark-baby    { 0%{opacity:0} 5%{opacity:1} 22%{opacity:1} 27%{opacity:0} 100%{opacity:0} }
        @keyframes cg-mark-toddler { 0%,24%{opacity:0} 29%{opacity:1} 47%{opacity:1} 52%{opacity:0} 100%{opacity:0} }
        @keyframes cg-mark-child   { 0%,49%{opacity:0} 54%{opacity:1} 72%{opacity:1} 77%{opacity:0} 100%{opacity:0} }
        @keyframes cg-mark-teen    { 0%,74%{opacity:0} 79%{opacity:1} 95%{opacity:1} 100%{opacity:0} }

        .cg-baby    { animation: cg-baby    12s ease-in-out infinite; opacity: 0; }
        .cg-toddler { animation: cg-toddler 12s ease-in-out infinite; opacity: 0; }
        .cg-child   { animation: cg-child   12s ease-in-out infinite; opacity: 0; }
        .cg-teen    { animation: cg-teen    12s ease-in-out infinite; opacity: 0; }
        .cg-mark-baby    { animation: cg-mark-baby    12s ease-in-out infinite; opacity: 0; }
        .cg-mark-toddler { animation: cg-mark-toddler 12s ease-in-out infinite; opacity: 0; }
        .cg-mark-child   { animation: cg-mark-child   12s ease-in-out infinite; opacity: 0; }
        .cg-mark-teen    { animation: cg-mark-teen    12s ease-in-out infinite; opacity: 0; }
      `}</style>

      <svg viewBox="0 0 280 430" xmlns="http://www.w3.org/2000/svg" className="w-full h-full max-w-xs">

        {/* Ruler */}
        <line x1="78" y1="135" x2="78" y2="393" stroke="#C4A882" strokeWidth="1.5" opacity="0.4" />

        {/* Height marks */}
        <g className="cg-mark-baby">
          <line x1="68" y1="322" x2="92" y2="322" stroke="#8B7355" strokeWidth="1.5" strokeLinecap="round" />
          <text x="60" y="326" textAnchor="end" fontSize="10" fontFamily="Georgia,serif" fontStyle="italic" fill="#8B7355">1yr</text>
        </g>
        <g className="cg-mark-toddler">
          <line x1="68" y1="270" x2="92" y2="270" stroke="#8B7355" strokeWidth="1.5" strokeLinecap="round" />
          <text x="60" y="274" textAnchor="end" fontSize="10" fontFamily="Georgia,serif" fontStyle="italic" fill="#8B7355">4yrs</text>
        </g>
        <g className="cg-mark-child">
          <line x1="68" y1="210" x2="92" y2="210" stroke="#8B7355" strokeWidth="1.5" strokeLinecap="round" />
          <text x="60" y="214" textAnchor="end" fontSize="10" fontFamily="Georgia,serif" fontStyle="italic" fill="#8B7355">8yrs</text>
        </g>
        <g className="cg-mark-teen">
          <line x1="68" y1="140" x2="92" y2="140" stroke="#8B7355" strokeWidth="1.5" strokeLinecap="round" />
          <text x="60" y="144" textAnchor="end" fontSize="10" fontFamily="Georgia,serif" fontStyle="italic" fill="#8B7355">12yrs</text>
        </g>

        {/* Ground */}
        <line x1="78" y1="392" x2="220" y2="392" stroke="#C4A882" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
        <ellipse cx="152" cy="394" rx="40" ry="5" fill="#C4A882" opacity="0.12" />

        {/* ── BABY (1yr) — height ~70px, top y=322 ── */}
        <g className="cg-baby">
          <circle cx="152" cy="340" r="18" fill="#E8D5C4" />
          <circle cx="146" cy="338" r="2"   fill="#6B5744" />
          <circle cx="158" cy="338" r="2"   fill="#6B5744" />
          <path d="M148 345 Q152 349 156 345" stroke="#6B5744" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          <path d="M147 323 Q152 318 157 323" stroke="#8B6E58" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          <rect x="138" y="357" width="28" height="21" rx="11" fill="#C4A882" />
          <line x1="138" y1="363" x2="127" y2="371" stroke="#D4B896" strokeWidth="8" strokeLinecap="round" />
          <line x1="166" y1="363" x2="177" y2="371" stroke="#D4B896" strokeWidth="8" strokeLinecap="round" />
          <rect x="140" y="377" width="11" height="15" rx="5" fill="#C4A882" />
          <rect x="153" y="377" width="11" height="15" rx="5" fill="#C4A882" />
          <text x="152" y="416" textAnchor="middle" fontSize="11" fontFamily="Georgia,serif" fontStyle="italic" fill="#8B7355">baby steps</text>
        </g>

        {/* ── TODDLER (4yrs) — height ~122px, top y=270 ── */}
        <g className="cg-toddler">
          <circle cx="152" cy="292" r="22" fill="#E8D5C4" />
          <circle cx="145" cy="290" r="2.5" fill="#6B5744" />
          <circle cx="159" cy="290" r="2.5" fill="#6B5744" />
          <path d="M147 298 Q152 303 157 298" stroke="#6B5744" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          <path d="M134 277 Q152 268 170 277" stroke="#8B6E58" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          <rect x="136" y="314" width="32" height="34" rx="12" fill="#C4A882" />
          <line x1="136" y1="322" x2="123" y2="335" stroke="#D4B896" strokeWidth="9" strokeLinecap="round" />
          <line x1="168" y1="322" x2="181" y2="335" stroke="#D4B896" strokeWidth="9" strokeLinecap="round" />
          <rect x="138" y="347" width="13" height="45" rx="6" fill="#C4A882" />
          <rect x="153" y="347" width="13" height="45" rx="6" fill="#C4A882" />
          <text x="152" y="416" textAnchor="middle" fontSize="11" fontFamily="Georgia,serif" fontStyle="italic" fill="#8B7355">curious explorer</text>
        </g>

        {/* ── CHILD (8yrs) — height ~182px, top y=210 ── */}
        <g className="cg-child">
          <circle cx="152" cy="234" r="24" fill="#E8D5C4" />
          <circle cx="144" cy="232" r="3"   fill="#6B5744" />
          <circle cx="160" cy="232" r="3"   fill="#6B5744" />
          <path d="M146 241 Q152 247 158 241" stroke="#6B5744" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          <path d="M130 219 Q152 208 174 219" stroke="#8B6E58" strokeWidth="3" fill="none" strokeLinecap="round" />
          <rect x="132" y="258" width="40" height="56" rx="14" fill="#C4A882" />
          <rect x="168" y="262" width="12" height="22" rx="5" fill="#B49A72" />
          <line x1="132" y1="268" x2="117" y2="284" stroke="#D4B896" strokeWidth="9" strokeLinecap="round" />
          <line x1="172" y1="268" x2="181" y2="288" stroke="#D4B896" strokeWidth="9" strokeLinecap="round" />
          <rect x="135" y="312" width="15" height="80" rx="7" fill="#C4A882" />
          <rect x="154" y="312" width="15" height="80" rx="7" fill="#C4A882" />
          <text x="152" y="416" textAnchor="middle" fontSize="11" fontFamily="Georgia,serif" fontStyle="italic" fill="#8B7355">school days</text>
        </g>

        {/* ── TEEN (12yrs) — height ~252px, top y=140 ── */}
        <g className="cg-teen">
          <circle cx="152" cy="164" r="24" fill="#E8D5C4" />
          <circle cx="144" cy="162" r="3"   fill="#6B5744" />
          <circle cx="160" cy="162" r="3"   fill="#6B5744" />
          <path d="M146 170 Q152 176 158 170" stroke="#6B5744" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          <path d="M130 149 Q152 138 174 149" stroke="#8B6E58" strokeWidth="3" fill="none" strokeLinecap="round" />
          <rect x="130" y="188" width="44" height="80" rx="16" fill="#C4A882" />
          <rect x="170" y="192" width="14" height="32" rx="5" fill="#B49A72" />
          <line x1="130" y1="200" x2="113" y2="220" stroke="#D4B896" strokeWidth="10" strokeLinecap="round" />
          <line x1="174" y1="200" x2="183" y2="224" stroke="#D4B896" strokeWidth="10" strokeLinecap="round" />
          <rect x="133" y="266" width="17" height="126" rx="8" fill="#C4A882" />
          <rect x="154" y="266" width="17" height="126" rx="8" fill="#C4A882" />
          <text x="152" y="416" textAnchor="middle" fontSize="11" fontFamily="Georgia,serif" fontStyle="italic" fill="#8B7355">growing up</text>
        </g>

      </svg>
    </div>
  );
}
