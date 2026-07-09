import { useState } from "react";

const DOMAIN_ICON = {
  "Motor": "directions_run",
  "Communication": "chat_bubble",
  "Social & Emotional": "favorite",
  "Cognitive": "psychology",
};

function Milestone({ stageId, domainName, domainIndex, milestone, index, isNoticed, onToggle }) {
  const [open, setOpen] = useState(false);
  const key = `${stageId}_${domainIndex}_${index}`;

  return (
    <div className="border-t border-warm-taupe/15 first:border-t-0">
      <div className="flex items-start gap-3 py-4">
        <button
          onClick={() => onToggle(key)}
          aria-pressed={isNoticed}
          aria-label={isNoticed ? "Marked as noticed" : "Mark as noticed"}
          className={`mt-0.5 w-5 h-5 rounded-full border flex-shrink-0 transition-colors duration-200 ${
            isNoticed
              ? "bg-warm-taupe border-warm-taupe"
              : "border-warm-taupe/30 hover:border-warm-taupe/60"
          }`}
        />
        <button
          onClick={() => setOpen((o) => !o)}
          className="flex-1 text-left flex items-start justify-between gap-3 group"
        >
          <span className={`text-[15px] leading-relaxed ${isNoticed ? "text-charcoal" : "text-on-surface-variant"}`}>
            {milestone.text}
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
      </div>

      {open && (
        <div className="pb-5 pl-8 space-y-3 v3-fade in-view">
          <p className="text-sm leading-relaxed text-on-surface-variant">
            <span className="text-warm-taupe font-medium">A way to try it: </span>
            {milestone.guide.try}
          </p>
          <p className="text-sm leading-relaxed text-on-surface-variant">
            <span className="text-warm-taupe font-medium">Signs to look for: </span>
            {milestone.guide.watch}
          </p>
          {milestone.guide.see && (
            <p className="text-sm leading-relaxed text-on-surface-variant/80 italic">
              {milestone.guide.see}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default function MilestoneSection({ stage, noticed, onToggle, onSeeActivities }) {
  return (
    <section>
      <p className="v3-eyebrow text-warm-taupe mb-3">What You&rsquo;ve Noticed</p>
      <p className="text-on-surface-variant leading-relaxed mb-8 max-w-xl">
        Every child grows at their own pace. Here&rsquo;s what tends to unfold around
        now &mdash; and what you might have already noticed.
      </p>

      <div className="space-y-10">
        {stage.domains.map((domain, di) => (
          <div key={domain.name}>
            <div className="flex items-center gap-2 mb-2">
              <span className="material-symbols-outlined text-warm-taupe text-xl" aria-hidden="true">
                {DOMAIN_ICON[domain.name] || "spa"}
              </span>
              <h3 className="v3-h3 text-charcoal">{domain.name}</h3>
            </div>

            <div>
              {domain.milestones.map((m, mi) => (
                <Milestone
                  key={mi}
                  stageId={stage.id}
                  domainName={domain.name}
                  domainIndex={di}
                  milestone={m}
                  index={mi}
                  isNoticed={!!noticed[`${stage.id}_${di}_${mi}`]}
                  onToggle={onToggle}
                />
              ))}
            </div>

            {domain.relatedActivities.length > 0 && (
              <button
                onClick={() => onSeeActivities(domain.name)}
                className="mt-3 text-sm text-warm-taupe hover:text-charcoal transition-colors underline underline-offset-4 decoration-soft-sand"
              >
                Here&rsquo;s something that might help &rarr;
              </button>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
