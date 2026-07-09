import { useState } from "react";

function ActivityCard({ activity, highlighted }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={`rounded-[20px] border transition-colors duration-300 overflow-hidden ${
        highlighted ? "border-warm-taupe/50 bg-surface-container-low/60" : "border-warm-taupe/15 bg-white/40"
      }`}
    >
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full text-left px-5 py-4 flex items-start gap-3"
      >
        <span className="text-2xl flex-shrink-0 leading-none mt-0.5" aria-hidden="true">
          {activity.icon}
        </span>
        <span className="flex-1">
          <span className="block text-[15px] font-medium text-charcoal mb-1">{activity.name}</span>
          <span className="block v3-serif text-sm text-on-surface-variant italic">{activity.tagline}</span>
        </span>
        <span
          className={`material-symbols-outlined text-warm-taupe/60 text-lg flex-shrink-0 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
          aria-hidden="true"
        >
          expand_more
        </span>
      </button>

      {open && (
        <div className="px-5 pb-5 space-y-4 border-t border-warm-taupe/10 pt-4">
          <p className="text-sm leading-relaxed text-on-surface-variant">{activity.why}</p>
          <ul className="space-y-2">
            {activity.steps.map((step, i) => (
              <li key={i} className="flex gap-3 text-sm leading-relaxed text-on-surface-variant">
                <span className="text-warm-taupe flex-shrink-0">{i + 1}.</span>
                {step}
              </li>
            ))}
          </ul>
          <p className="text-sm leading-relaxed text-warm-taupe/90 v3-serif italic">
            {activity.parentNote}
          </p>
        </div>
      )}
    </div>
  );
}

export default function ActivitySection({ stage, highlightDomain, sectionRef }) {
  return (
    <section ref={sectionRef}>
      <p className="v3-eyebrow text-warm-taupe mb-3">Ways to Support This Stage</p>
      <p className="text-on-surface-variant leading-relaxed mb-8 max-w-xl">
        Small, gentle ways to spend time together this stage &mdash; no preparation
        needed, no right way to do them.
      </p>

      <div className="space-y-8">
        {stage.activityThemes.map((themeGroup) => (
          <div key={themeGroup.theme}>
            <h3 className="v3-h3 text-charcoal mb-4">{themeGroup.theme}</h3>
            <div className="space-y-3">
              {themeGroup.activities.map((activity, i) => (
                <ActivityCard
                  key={i}
                  activity={activity}
                  highlighted={
                    highlightDomain &&
                    activity.pills.some((p) =>
                      p.toLowerCase().includes(highlightDomain.toLowerCase().split(" ")[0])
                    )
                  }
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
