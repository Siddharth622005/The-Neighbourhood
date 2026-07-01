const D = "13s";

const hands = [
  { src: "/hand-1yr.png",  label: "1 year",   left: "26%", top: "83%", w: "20%", cls: "st1", lcls: "l1", lx: "3%",  ly: "92%" },
  { src: "/hand-4yr.png",  label: "4 years",  left: "64%", top: "67%", w: "28%", cls: "st2", lcls: "l2", lx: "74%", ly: "84%" },
  { src: "/hand-8yr.png",  label: "8 years",  left: "30%", top: "48%", w: "37%", cls: "st3", lcls: "l3", lx: "1%",  ly: "37%" },
  { src: "/hand-12yr.png", label: "12 years", left: "65%", top: "31%", w: "46%", cls: "st4", lcls: "l4", lx: "40%", ly: "6%" },
];

export default function ChildGrowthAnimation() {
  return (
    <div className="relative w-full aspect-square max-w-sm mx-auto select-none">
      <style>{`
        .tn-hand {
          position:absolute;
          opacity:0;
          transform-origin:center;
          filter: drop-shadow(1px 3px 3px rgba(92,74,50,0.18));
          will-change: transform, opacity;
        }

        /* Each hand stamps in at its own moment, all hold, then fade together. */
        @keyframes st1 {
          0%,2%    { transform:translate(-50%,-50%) rotate(-13deg) scale(0);    opacity:0; }
          5%       { transform:translate(-50%,-50%) rotate(-13deg) scale(1.18); opacity:.9; }
          8%       { transform:translate(-50%,-50%) rotate(-13deg) scale(0.95); opacity:1; }
          11%,86%  { transform:translate(-50%,-50%) rotate(-13deg) scale(1);    opacity:1; }
          93%,100% { transform:translate(-50%,-50%) rotate(-13deg) scale(1);    opacity:0; }
        }
        @keyframes st2 {
          0%,17%   { transform:translate(-50%,-50%) rotate(11deg) scale(0);    opacity:0; }
          20%      { transform:translate(-50%,-50%) rotate(11deg) scale(1.18); opacity:.9; }
          23%      { transform:translate(-50%,-50%) rotate(11deg) scale(0.95); opacity:1; }
          26%,86%  { transform:translate(-50%,-50%) rotate(11deg) scale(1);    opacity:1; }
          93%,100% { transform:translate(-50%,-50%) rotate(11deg) scale(1);    opacity:0; }
        }
        @keyframes st3 {
          0%,32%   { transform:translate(-50%,-50%) rotate(-7deg) scale(0);    opacity:0; }
          35%      { transform:translate(-50%,-50%) rotate(-7deg) scale(1.18); opacity:.9; }
          38%      { transform:translate(-50%,-50%) rotate(-7deg) scale(0.95); opacity:1; }
          41%,86%  { transform:translate(-50%,-50%) rotate(-7deg) scale(1);    opacity:1; }
          93%,100% { transform:translate(-50%,-50%) rotate(-7deg) scale(1);    opacity:0; }
        }
        @keyframes st4 {
          0%,47%   { transform:translate(-50%,-50%) rotate(8deg) scale(0);    opacity:0; }
          50%      { transform:translate(-50%,-50%) rotate(8deg) scale(1.18); opacity:.9; }
          53%      { transform:translate(-50%,-50%) rotate(8deg) scale(0.95); opacity:1; }
          56%,86%  { transform:translate(-50%,-50%) rotate(8deg) scale(1);    opacity:1; }
          93%,100% { transform:translate(-50%,-50%) rotate(8deg) scale(1);    opacity:0; }
        }
        .st1 { animation: st1 ${D} ease-in-out infinite; }
        .st2 { animation: st2 ${D} ease-in-out infinite; }
        .st3 { animation: st3 ${D} ease-in-out infinite; }
        .st4 { animation: st4 ${D} ease-in-out infinite; }

        .tn-lbl { position:absolute; font-family:Georgia,serif; font-style:italic;
                  font-size:0.72rem; color:#8B7355; opacity:0; white-space:nowrap; }
        @keyframes lf1 { 0%,8%{opacity:0} 11%,86%{opacity:.85} 93%,100%{opacity:0} }
        @keyframes lf2 { 0%,23%{opacity:0} 26%,86%{opacity:.85} 93%,100%{opacity:0} }
        @keyframes lf3 { 0%,38%{opacity:0} 41%,86%{opacity:.85} 93%,100%{opacity:0} }
        @keyframes lf4 { 0%,53%{opacity:0} 56%,86%{opacity:.85} 93%,100%{opacity:0} }
        .l1 { animation: lf1 ${D} ease-in-out infinite; }
        .l2 { animation: lf2 ${D} ease-in-out infinite; }
        .l3 { animation: lf3 ${D} ease-in-out infinite; }
        .l4 { animation: lf4 ${D} ease-in-out infinite; }
      `}</style>

      <p className="absolute left-1/2 -translate-x-1/2 top-0 font-tagline-handwritten
                    text-[0.7rem] italic tracking-[0.2em] text-warm-taupe/60">
        watch them grow
      </p>

      {hands.map((h) => (
        <img
          key={h.src}
          src={h.src}
          alt=""
          aria-hidden="true"
          className={`tn-hand ${h.cls}`}
          style={{ left: h.left, top: h.top, width: h.w }}
        />
      ))}

      {hands.map((h) => (
        <span
          key={h.label}
          className={`tn-lbl ${h.lcls}`}
          style={{ left: h.lx, top: h.ly }}
        >
          {h.label}
        </span>
      ))}
    </div>
  );
}
