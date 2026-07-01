const D = "16s";

const hands = [
  { src: "/hand-1yr.png",  label: "1 year",   left: "26%", top: "83%", w: "20%", rot: -13, cls: "st1", lcls: "l1", lx: "3%",  ly: "92%" },
  { src: "/hand-4yr.png",  label: "4 years",  left: "64%", top: "67%", w: "28%", rot: 11,  cls: "st2", lcls: "l2", lx: "74%", ly: "84%" },
  { src: "/hand-8yr.png",  label: "8 years",  left: "30%", top: "48%", w: "37%", rot: -7,  cls: "st3", lcls: "l3", lx: "1%",  ly: "37%" },
  { src: "/hand-12yr.png", label: "12 years", left: "65%", top: "31%", w: "46%", rot: 8,   cls: "st4", lcls: "l4", lx: "40%", ly: "6%" },
];

export default function ChildGrowthAnimation() {
  return (
    <div className="relative w-full aspect-square max-w-sm mx-auto select-none">
      <style>{`
        .tn-hand {
          position:absolute;
          transform:translate(-50%,-50%) scale(0);
          transform-origin:center;
          opacity:0;
          filter: drop-shadow(1px 3px 3px rgba(92,74,50,0.18));
          will-change: transform, opacity;
        }
        @keyframes tn-stamp {
          0%,1%    { transform:translate(-50%,-50%) rotate(var(--r)) scale(0);    opacity:0; }
          4%       { transform:translate(-50%,-50%) rotate(var(--r)) scale(1.18); opacity:.85; }
          8%       { transform:translate(-50%,-50%) rotate(var(--r)) scale(0.94); opacity:1; }
          11%,82%  { transform:translate(-50%,-50%) rotate(var(--r)) scale(1);    opacity:1; }
          88%      { transform:translate(-50%,-50%) rotate(var(--r)) scale(1);    opacity:0; }
          100%     { transform:translate(-50%,-50%) rotate(var(--r)) scale(0);    opacity:0; }
        }
        .st1 { animation: tn-stamp ${D} ease-in-out infinite;              }
        .st2 { animation: tn-stamp ${D} ease-in-out -0.8s infinite;        }
        .st3 { animation: tn-stamp ${D} ease-in-out -1.6s infinite;        }
        .st4 { animation: tn-stamp ${D} ease-in-out -2.4s infinite;        }

        .tn-lbl { position:absolute; font-family:Georgia,serif; font-style:italic;
                  font-size:0.72rem; color:#8B7355; opacity:0; white-space:nowrap; }
        @keyframes tn-fade { 0%,10%{opacity:0} 14%,82%{opacity:.85} 88%,100%{opacity:0} }
        .l1 { animation: tn-fade ${D} ease-in-out infinite;        }
        .l2 { animation: tn-fade ${D} ease-in-out -0.8s infinite;  }
        .l3 { animation: tn-fade ${D} ease-in-out -1.6s infinite;  }
        .l4 { animation: tn-fade ${D} ease-in-out -2.4s infinite;  }
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
          style={{ left: h.left, top: h.top, width: h.w, "--r": `${h.rot}deg` }}
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
