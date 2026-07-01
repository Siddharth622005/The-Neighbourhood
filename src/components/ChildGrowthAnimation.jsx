const D = "9s";

// Two hands (mirrored pair), each with a "presser" (the hand coming down)
// and a "print" (the paint mark it leaves behind).
const PRESSER_SRC = "/hand-1yr.png";  // pale tone reads as a bare hand
const PRINT_SRC = "/hand-8yr.png";    // warm ochre paint mark

export default function ChildGrowthAnimation() {
  return (
    <div className="relative w-full aspect-square max-w-sm mx-auto select-none">
      <style>{`
        .tn-wrap {
          position:absolute;
          transform:translate(-50%,-50%);
        }
        .tn-tilt { position:relative; }
        .tn-print, .tn-presser {
          position:absolute;
          top:0; left:0;
          transform-origin:center;
          opacity:0;
          will-change: transform, opacity;
        }
        .tn-print {
          filter: drop-shadow(1px 2px 2px rgba(92,74,50,0.15));
        }
        .tn-presser {
          filter: drop-shadow(2px 6px 6px rgba(92,74,50,0.25));
        }

        /* LEFT hand: presses down first */
        @keyframes press-L {
          0%,4%    { transform: translateY(-46px) scale(1.08); opacity:0; }
          20%      { transform: translateY(-46px) scale(1.08); opacity:.92; }
          27%      { transform: translateY(0)      scale(0.96); opacity:1; }
          32%,50%  { transform: translateY(0)      scale(1);    opacity:1; }
          58%      { transform: translateY(-40px)  scale(1.04); opacity:0; }
          100%     { transform: translateY(-40px)  scale(1.04); opacity:0; }
        }
        @keyframes print-L {
          0%,26%   { opacity:0; transform: scale(0.92); }
          31%,90%  { opacity:1; transform: scale(1); }
          97%,100% { opacity:0; transform: scale(1); }
        }

        /* RIGHT hand: presses a beat later */
        @keyframes press-R {
          0%,18%   { transform: translateY(-46px) scale(1.08); opacity:0; }
          34%      { transform: translateY(-46px) scale(1.08); opacity:.92; }
          41%      { transform: translateY(0)      scale(0.96); opacity:1; }
          46%,62%  { transform: translateY(0)      scale(1);    opacity:1; }
          70%      { transform: translateY(-40px)  scale(1.04); opacity:0; }
          100%     { transform: translateY(-40px)  scale(1.04); opacity:0; }
        }
        @keyframes print-R {
          0%,40%   { opacity:0; transform: scale(0.92); }
          45%,90%  { opacity:1; transform: scale(1); }
          97%,100% { opacity:0; transform: scale(1); }
        }

        .presser-L { animation: press-L ${D} cubic-bezier(.4,0,.2,1) infinite; }
        .print-L   { animation: print-L ${D} ease-out infinite; }
        .presser-R { animation: press-R ${D} cubic-bezier(.4,0,.2,1) infinite; }
        .print-R   { animation: print-R ${D} ease-out infinite; }

        .tn-caption {
          position:absolute; left:50%; bottom:6%; transform:translateX(-50%);
          font-family:Georgia,serif; font-style:italic; font-size:0.72rem;
          letter-spacing:0.18em; color:#8B7355; opacity:0.65; white-space:nowrap;
        }
      `}</style>

      {/* LEFT hand */}
      <div className="tn-wrap" style={{ left: "30%", top: "52%", width: "26%" }}>
        <div className="tn-tilt" style={{ transform: "rotate(-16deg)" }}>
          <img src={PRINT_SRC}   alt="" aria-hidden="true" className="tn-print print-L" style={{ width: "100%" }} />
          <img src={PRESSER_SRC} alt="" aria-hidden="true" className="tn-presser presser-L" style={{ width: "100%" }} />
        </div>
      </div>

      {/* RIGHT hand — mirrored */}
      <div className="tn-wrap" style={{ left: "70%", top: "52%", width: "26%" }}>
        <div className="tn-tilt" style={{ transform: "rotate(16deg) scaleX(-1)" }}>
          <img src={PRINT_SRC}   alt="" aria-hidden="true" className="tn-print print-R" style={{ width: "100%" }} />
          <img src={PRESSER_SRC} alt="" aria-hidden="true" className="tn-presser presser-R" style={{ width: "100%" }} />
        </div>
      </div>

      <p className="tn-caption">little hands, lasting marks</p>
    </div>
  );
}
