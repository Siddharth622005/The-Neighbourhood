import { useStaggerReveal } from "../useScrollReveal.js";

export default function AppPreview() {
  const { ref, inView } = useStaggerReveal(0.15);

  return (
    <section className="py-section-gap bg-background-alt overflow-hidden">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter">
        <div className="text-center mb-16">
          <h2 className="font-headline-h2 text-headline-h2 text-warm-taupe mb-4">
            Your Village in Your Pocket
          </h2>
          <p className="text-on-surface-variant max-w-xl mx-auto">
            Intuitive tools designed to reduce mental load, not add to it.
          </p>
        </div>

        <div ref={ref} className="grid md:grid-cols-3 gap-stack-lg items-end">
          {/* Copilot Chat */}
          <div className={`stagger-item bg-surface p-6 rounded-[32px] border border-soft-sand/20 shadow-lg transform translate-y-8 ${inView ? "in-view" : ""}`}>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-charcoal rounded-full flex items-center justify-center">
                <span className="material-symbols-outlined text-surface-cream text-xs">
                  auto_awesome
                </span>
              </div>
              <span className="font-body-strong text-charcoal">Copilot</span>
            </div>
            <div className="space-y-4">
              <div className="bg-surface-container-low p-3 rounded-2xl rounded-tl-none max-w-[85%] text-sm">
                "Is it normal for a 6-month-old to suddenly resist naps?"
              </div>
              <div className="bg-charcoal text-surface-cream p-3 rounded-2xl rounded-tr-none ml-auto max-w-[85%] text-sm">
                "It sounds like a common developmental shift. Around this age..."
              </div>
            </div>
          </div>

          {/* Milestone Tracker */}
          <div className={`stagger-item bg-surface p-6 rounded-[32px] border border-soft-sand/20 shadow-lg z-10 scale-110 ${inView ? "in-view" : ""}`}>
            <div className="text-center mb-6">
              <h4 className="font-body-strong text-charcoal">Milestones</h4>
              <p className="text-xs text-on-surface-variant">Samarth, 8 Months</p>
            </div>
            <div className="relative h-40 flex items-end justify-between px-4 pb-4">
              <div className="absolute inset-0 flex items-center justify-center p-4">
                <svg
                  className="w-full text-warm-taupe/20 fill-none stroke-current stroke-2"
                  viewBox="0 0 100 50"
                >
                  <path d="M0,45 Q25,5 50,45 T100,5" />
                </svg>
              </div>
              <div className="w-3 bg-secondary rounded-full h-1/2" />
              <div className="w-3 bg-secondary/60 rounded-full h-3/4" />
              <div className="w-3 bg-secondary rounded-full h-1/3" />
              <div className="w-3 bg-warm-taupe rounded-full h-4/5" />
            </div>
            <div className="mt-4 text-center">
              <span className="text-xs bg-secondary-container px-2 py-1 rounded-full text-on-secondary-container">
                Exploration Stage
              </span>
            </div>
          </div>

          {/* Daily Guidance Feed */}
          <div className={`stagger-item bg-surface p-6 rounded-[32px] border border-soft-sand/20 shadow-lg transform translate-y-8 ${inView ? "in-view" : ""}`}>
            <h4 className="font-body-strong text-charcoal mb-4">Daily Feed</h4>
            <div className="space-y-3">
              <div className="flex gap-3 items-center p-2 hover:bg-surface-container rounded-xl transition-colors">
                <span className="material-symbols-outlined text-warm-taupe">wb_sunny</span>
                <div>
                  <p className="text-xs font-bold">Morning Ritual</p>
                  <p className="text-[10px] text-on-surface-variant">
                    Try the 5-min floor play today.
                  </p>
                </div>
              </div>
              <div className="flex gap-3 items-center p-2 hover:bg-surface-container rounded-xl transition-colors border-t border-soft-sand/10 pt-3">
                <span className="material-symbols-outlined text-warm-taupe">local_library</span>
                <div>
                  <p className="text-xs font-bold">Read Aloud</p>
                  <p className="text-[10px] text-on-surface-variant">Why eye contact matters.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
