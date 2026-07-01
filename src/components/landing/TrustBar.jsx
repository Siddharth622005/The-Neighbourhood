import { useStaggerReveal } from "../useScrollReveal.js";

export default function TrustBar() {
  const { ref, inView } = useStaggerReveal(0.2);

  return (
    <section className="w-full py-12 px-margin-mobile border-y border-soft-sand/20">
      <div
        ref={ref}
        className="max-w-container-max mx-auto flex flex-col md:flex-row items-center justify-center gap-stack-md md:gap-stack-lg text-center"
      >
        <p className={`stagger-item font-label-sm text-label-sm text-warm-taupe uppercase tracking-widest ${inView ? "in-view" : ""}`}>
          Built for modern Indian families
        </p>
        <div className="flex items-center gap-stack-md">
          <div className="h-6 w-px bg-soft-sand hidden md:block" />
          <div className="flex gap-stack-lg">
            <span className={`stagger-item font-label-sm text-label-sm text-warm-taupe uppercase tracking-widest ${inView ? "in-view" : ""}`}>
              Play-Based Spaces
            </span>
            <span className={`stagger-item font-label-sm text-label-sm text-warm-taupe uppercase tracking-widest ${inView ? "in-view" : ""}`}>
              Hyper-Local Community
            </span>
            <span className={`stagger-item font-label-sm text-label-sm text-warm-taupe uppercase tracking-widest ${inView ? "in-view" : ""}`}>
              AI Parenting Copilot
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
