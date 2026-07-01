import { useStaggerReveal } from "../useScrollReveal.js";

const pillars = [
  { icon: "cottage", label: "Play-Based Spaces", sub: "Where children discover and belong" },
  { icon: "groups", label: "Hyper-Local Community", sub: "Neighbours who become family" },
  { icon: "auto_awesome", label: "AI Parenting Copilot", sub: "Support that never sleeps" },
];

export default function TrustBar() {
  const { ref, inView } = useStaggerReveal(0.2);

  return (
    <section className="w-full py-16 px-margin-mobile md:px-gutter bg-charcoal">
      <div className="max-w-container-max mx-auto">
        <p className="text-center text-soft-sand/60 uppercase tracking-widest text-xs font-label-sm mb-10">
          Built for modern Indian families
        </p>
        <div ref={ref} className="grid md:grid-cols-3 gap-8">
          {pillars.map((p) => (
            <div
              key={p.label}
              className={`stagger-item flex flex-col items-center text-center gap-4 ${inView ? "in-view" : ""}`}
            >
              <div className="w-14 h-14 rounded-full bg-soft-sand/10 flex items-center justify-center">
                <span className="material-symbols-outlined text-soft-sand text-2xl">{p.icon}</span>
              </div>
              <div>
                <p className="font-body-strong text-surface-cream text-lg">{p.label}</p>
                <p className="text-soft-sand/60 text-sm mt-1">{p.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
