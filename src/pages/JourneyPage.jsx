import { useMemo, useRef, useState } from "react";
import NavbarV3 from "../components/v3/NavbarV3.jsx";
import FooterV3 from "../components/v3/FooterV3.jsx";
import WaitlistDialogV3 from "../components/v3/WaitlistDialogV3.jsx";
import StageNav from "../components/journey/StageNav.jsx";
import MilestoneSection from "../components/journey/MilestoneSection.jsx";
import ActivitySection from "../components/journey/ActivitySection.jsx";
import useNoticed from "../components/journey/useNoticed.js";
import journeyStages from "../data/journeyStages.json";

/**
 * Your Child's Journey — one page per stage, two gentle lenses:
 * what you've noticed (reflection) and ways to support this stage (action).
 * Quarterly through 3 years, yearly through 6 — same spine as the two
 * source tools, merged into a single calm scroll rather than two apps.
 */
export default function JourneyPage() {
  const [stageId, setStageId] = useState(0);
  const [highlightDomain, setHighlightDomain] = useState(null);
  const [waitlistOpen, setWaitlistOpen] = useState(false);
  const activitiesRef = useRef(null);
  const { noticed, toggle } = useNoticed();

  const stage = useMemo(() => journeyStages.find((s) => s.id === stageId), [stageId]);

  const handleSelectStage = (id) => {
    setStageId(id);
    setHighlightDomain(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSeeActivities = (domainName) => {
    setHighlightDomain(domainName);
    activitiesRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    setTimeout(() => setHighlightDomain(null), 4000);
  };

  return (
    <div className="overflow-x-clip bg-surface-cream">
      <NavbarV3 onJoin={() => setWaitlistOpen(true)} />

      <header className="pt-32 md:pt-40 pb-12 px-margin-mobile md:px-gutter">
        <div className="max-w-container-max mx-auto">
          <p className="v3-eyebrow text-warm-taupe mb-4">Your Child&rsquo;s Journey</p>
          <h1 className="v3-display text-charcoal max-w-2xl">
            A guide beside you, not a checklist ahead of you.
          </h1>
          <p className="v3-body-lg text-on-surface-variant mt-6 max-w-xl">
            Choose the stage your child is in. You&rsquo;ll find what tends to
            unfold around now, and gentle ways to spend time together
            through it.
          </p>
        </div>
      </header>

      <div className="px-margin-mobile md:px-gutter mb-10">
        <div className="max-w-container-max mx-auto">
          <StageNav stages={journeyStages} activeId={stageId} onSelect={handleSelectStage} />
        </div>
      </div>

      <main className="px-margin-mobile md:px-gutter pb-24">
        <div className="max-w-container-max mx-auto">
          <div className="rounded-[28px] bg-surface-container-low/60 border border-warm-taupe/10 p-8 md:p-10 mb-14">
            <p className="v3-eyebrow text-warm-taupe mb-3">{stage.label}</p>
            <h2 className="v3-h2 text-charcoal mb-4">{stage.title}</h2>
            <p className="text-on-surface-variant leading-relaxed max-w-2xl">{stage.note}</p>
          </div>

          <div className="grid lg:grid-cols-12 gap-14 lg:gap-20">
            <div className="lg:col-span-6">
              <MilestoneSection
                stage={stage}
                noticed={noticed}
                onToggle={toggle}
                onSeeActivities={handleSeeActivities}
              />
            </div>
            <div className="lg:col-span-6">
              <ActivitySection
                stage={stage}
                highlightDomain={highlightDomain}
                sectionRef={activitiesRef}
              />
            </div>
          </div>

          <div className="mt-20 pt-10 border-t border-warm-taupe/15 max-w-2xl">
            <p className="v3-serif text-xl md:text-2xl leading-relaxed text-charcoal">
              Stages shift gradually, not all at once. When you&rsquo;re ready,
              your child&rsquo;s next stage is waiting &mdash; not before.
            </p>
          </div>
        </div>
      </main>

      <FooterV3 />
      <WaitlistDialogV3 open={waitlistOpen} onClose={() => setWaitlistOpen(false)} />
    </div>
  );
}
