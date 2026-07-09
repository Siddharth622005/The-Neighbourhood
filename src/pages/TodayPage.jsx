import { useMemo, useState } from "react";
import NavbarV3 from "../components/v3/NavbarV3.jsx";
import FooterV3 from "../components/v3/FooterV3.jsx";
import WaitlistDialogV3 from "../components/v3/WaitlistDialogV3.jsx";
import OpeningGesture from "../components/today/OpeningGesture.jsx";
import useChildProfile, { stageIdForDob } from "../components/today/useChildProfile.js";
import useDailyMoments from "../components/today/useDailyMoments.js";
import useCompanionMeta from "../components/today/useCompanionMeta.js";
import journeyStages from "../data/journeyStages.json";

const REASSURANCE =
  "There is no perfect way to do today. A few minutes of presence can be enough.";

const STAGE_MOODS = [
  "A tender season of bonding.",
  "A beautiful season of noticing.",
  "A beautiful season of curiosity.",
  "A beautiful season of exploration.",
  "A lively season of movement.",
  "A joyful season of trying.",
  "A bright season of discovery.",
  "A playful season of independence.",
  "A thoughtful season of expression.",
  "A busy season of imagination.",
  "A growing season of confidence.",
  "A social season of becoming.",
  "A brave season of storytelling.",
  "A big-hearted season of wonder.",
  "A capable season of learning.",
];

function timeGreeting(parentName) {
  const hour = new Date().getHours();
  const name = parentName ? `, ${parentName}` : "";
  if (hour < 12) return `Good morning${name}`;
  if (hour < 17) return `Good afternoon${name}`;
  return `Good evening${name}`;
}

function stageMood(stage) {
  return STAGE_MOODS[stage.id] || "A beautiful season of growing.";
}

function shortWhy(activity) {
  const match = activity.why?.match(/^.*?[.!?](\s|$)/);
  return (match ? match[0] : activity.tagline || activity.why || "").trim();
}

function estimate(activity) {
  return activity.pills?.find((pill) => /min|time|meal|bath|walk|any/i.test(pill)) || "A few minutes";
}

function getRecommended(stage) {
  return stage.activityThemes
    .flatMap((themeGroup) => themeGroup.activities.map((activity) => ({ ...activity, theme: themeGroup.theme })))
    .slice(0, 4);
}

function findObservation(stage, activityName) {
  const domain = stage.domains.find((item) =>
    item.relatedActivities.some((activity) => activity.name === activityName)
  );
  const milestone = domain?.milestones?.[0];
  return milestone?.guide?.watch?.replace(/\.$/, "").toLowerCase() || "how your child responded to you";
}

function PrimaryButton({ children, className = "", ...props }) {
  return (
    <button
      className={`bg-charcoal text-surface-cream px-8 py-3.5 rounded-full font-medium text-base md:text-lg hover:opacity-90 active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

function GhostButton({ children, className = "", ...props }) {
  return (
    <button
      className={`text-sm text-warm-taupe hover:text-charcoal underline underline-offset-4 decoration-soft-sand active:scale-[0.98] transition-all duration-200 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

function Onboarding({ onSave }) {
  const [step, setStep] = useState(0);
  const [parentName, setParentName] = useState("");
  const [childName, setChildName] = useState("");
  const [dob, setDob] = useState("");

  const stage = useMemo(() => {
    if (!dob) return null;
    return journeyStages.find((item) => item.id === stageIdForDob(dob));
  }, [dob]);

  const finish = () => {
    if (!childName.trim() || !dob) return;
    onSave(childName, dob, parentName);
  };

  return (
    <div className="min-h-screen bg-surface-cream overflow-hidden">
      <div className="max-w-container-max mx-auto min-h-screen px-margin-mobile md:px-gutter pt-28 pb-16 flex items-center">
        <div className="w-full max-w-xl mx-auto">
          <OpeningGesture />
          <div key={step} className="onboarding-screen rounded-[28px] bg-surface-container-low/55 border border-warm-taupe/10 p-8 md:p-12 shadow-[0_24px_80px_rgba(139,115,85,0.10)]">
            {step === 0 && (
              <>
                <p className="v3-eyebrow text-warm-taupe mb-5">The Neighbourhood</p>
                <h1 className="v3-h2 text-charcoal mb-5">Welcome to The Neighbourhood.</h1>
                <p className="v3-body-lg text-on-surface-variant mb-9">
                  We&rsquo;re here to help you enjoy every stage of your child&rsquo;s early years.
                </p>
                <PrimaryButton onClick={() => setStep(1)}>Get Started</PrimaryButton>
              </>
            )}

            {step === 1 && (
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  if (childName.trim()) setStep(2);
                }}
              >
                <p className="v3-eyebrow text-warm-taupe mb-5">A small hello</p>
                <h1 className="v3-h2 text-charcoal mb-4">What should we call your little one?</h1>
                <p className="text-on-surface-variant leading-relaxed mb-8">
                  You can add your name too, if you&rsquo;d like the app to greet you personally.
                </p>
                <div className="space-y-4 mb-9">
                  <label className="sr-only" htmlFor="parent-name">Parent&rsquo;s first name</label>
                  <input
                    id="parent-name"
                    type="text"
                    value={parentName}
                    onChange={(event) => setParentName(event.target.value)}
                    placeholder="Your first name (optional)"
                    className="w-full px-5 py-3.5 rounded-full border border-warm-taupe/25 bg-white/60 text-charcoal placeholder:text-on-surface-variant/50 focus:outline-none focus:ring-2 focus:ring-warm-taupe/40 focus:border-transparent"
                  />
                  <label className="sr-only" htmlFor="child-name">Child&rsquo;s name</label>
                  <input
                    id="child-name"
                    type="text"
                    required
                    autoFocus
                    value={childName}
                    onChange={(event) => setChildName(event.target.value)}
                    placeholder="Child's name"
                    className="w-full px-5 py-3.5 rounded-full border border-warm-taupe/25 bg-white/60 text-charcoal placeholder:text-on-surface-variant/50 focus:outline-none focus:ring-2 focus:ring-warm-taupe/40 focus:border-transparent"
                  />
                </div>
                <div className="flex items-center justify-between gap-4">
                  <GhostButton type="button" onClick={() => setStep(0)}>Back</GhostButton>
                  <PrimaryButton type="submit" disabled={!childName.trim()}>Continue</PrimaryButton>
                </div>
              </form>
            )}

            {step === 2 && (
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  if (dob) setStep(3);
                }}
              >
                <p className="v3-eyebrow text-warm-taupe mb-5">Their stage</p>
                <h1 className="v3-h2 text-charcoal mb-4">When were they born?</h1>
                <p className="text-on-surface-variant leading-relaxed mb-8">
                  We&rsquo;ll use this to gently place {childName.trim() || "your child"} in the right stage.
                </p>
                <label className="sr-only" htmlFor="child-dob">Date of birth</label>
                <input
                  id="child-dob"
                  type="date"
                  required
                  autoFocus
                  value={dob}
                  max={new Date().toISOString().slice(0, 10)}
                  onChange={(event) => setDob(event.target.value)}
                  className="w-full px-5 py-3.5 rounded-full border border-warm-taupe/25 bg-white/60 text-charcoal focus:outline-none focus:ring-2 focus:ring-warm-taupe/40 focus:border-transparent mb-9"
                />
                <div className="flex items-center justify-between gap-4">
                  <GhostButton type="button" onClick={() => setStep(1)}>Back</GhostButton>
                  <PrimaryButton type="submit" disabled={!dob}>Continue</PrimaryButton>
                </div>
              </form>
            )}

            {step === 3 && stage && (
              <>
                <p className="v3-eyebrow text-warm-taupe mb-5">{stage.label}</p>
                <h1 className="v3-h2 text-charcoal mb-4">
                  {childName.trim()} is in {stageMood(stage).replace("A ", "a ")}
                </h1>
                <p className="text-on-surface-variant leading-relaxed mb-4">
                  This stage is filled with small changes, new discoveries and plenty of ordinary magic.
                </p>
                <p className="v3-serif italic text-xl text-charcoal leading-relaxed mb-9">
                  {stage.note}
                </p>
                <div className="flex items-center justify-between gap-4">
                  <GhostButton type="button" onClick={() => setStep(2)}>Back</GhostButton>
                  <PrimaryButton onClick={finish}>Let&rsquo;s begin</PrimaryButton>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function MomentCard({ activity, index, isPicked, onPick }) {
  return (
    <div
      className={`today-moment-card today-stagger rounded-[24px] border border-warm-taupe/15 bg-white/45 p-6 md:p-7 shadow-[0_18px_60px_rgba(139,115,85,0.08)] ${
        isPicked ? "today-card-picked border-warm-taupe/30 bg-surface-container-low/70" : ""
      }`}
      style={{ animationDelay: `${index * 110}ms` }}
    >
      <div className="flex items-start justify-between gap-5 mb-6">
        <span className="text-3xl leading-none" aria-hidden="true">{activity.icon}</span>
        <span className="rounded-full bg-surface-cream/80 border border-warm-taupe/10 px-3 py-1 text-xs text-warm-taupe">
          {estimate(activity)}
        </span>
      </div>
      <p className="text-lg font-semibold text-charcoal mb-3">{activity.name}</p>
      <p className="text-sm leading-relaxed text-on-surface-variant mb-7">{shortWhy(activity)}</p>
      {isPicked ? (
        <div className="today-pick-label inline-flex items-center gap-2 rounded-full bg-surface-cream/80 border border-warm-taupe/15 px-4 py-2 text-sm text-warm-taupe">
          <span className="material-symbols-outlined text-base" aria-hidden="true">check</span>
          <span className="v3-serif italic">Held gently for today</span>
        </div>
      ) : (
        <button
          onClick={() => onPick(activity.name)}
          className="today-pick-button inline-flex items-center gap-2 text-sm font-medium text-charcoal hover:text-warm-taupe active:scale-[0.98] transition-all duration-200"
        >
          We&rsquo;ll try this
          <span className="material-symbols-outlined text-base" aria-hidden="true">arrow_forward</span>
        </button>
      )}
    </div>
  );
}

function ReflectionChoice({ name, checked, onToggle }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="w-full flex items-center gap-4 py-4 text-left border-t border-warm-taupe/15 first:border-t-0 active:scale-[0.99] transition-transform duration-200"
    >
      <span
        className={`today-notice-dot${checked ? " on" : ""} w-5 h-5 rounded-full border flex-shrink-0 ${
          checked ? "border-warm-taupe" : "border-warm-taupe/30"
        }`}
      />
      <span className={`today-notice-label text-[15px] ${checked ? "text-charcoal" : "text-on-surface-variant"}`}>
        {name}
      </span>
    </button>
  );
}

function TomorrowPreview({ childName, stage, activities, onClose }) {
  const [step, setStep] = useState("select");
  const [checked, setChecked] = useState(() => new Set());
  const selectedNames = [...checked];
  const observedName = selectedNames[0];
  const watchText = observedName ? findObservation(stage, observedName) : "";

  const toggle = (name) => {
    setChecked((prev) => {
      const next = new Set(prev);
      next.has(name) ? next.delete(name) : next.add(name);
      return next;
    });
  };

  if (step === "empty") {
    return (
      <PreviewShell onClose={onClose}>
        <p className="v3-eyebrow text-warm-taupe mb-4">Tomorrow preview</p>
        <h2 className="v3-h2 text-charcoal mb-4">That&rsquo;s completely okay.</h2>
        <p className="text-on-surface-variant leading-relaxed mb-3">Some days are simply fuller than others.</p>
        <p className="v3-serif italic text-xl text-charcoal leading-relaxed mb-9">We&rsquo;ll be here tomorrow.</p>
        <PrimaryButton onClick={onClose}>Back to today</PrimaryButton>
      </PreviewShell>
    );
  }

  if (step === "confirm") {
    return (
      <PreviewShell onClose={onClose}>
        <p className="v3-eyebrow text-warm-taupe mb-4">A small reflection</p>
        <h2 className="v3-h2 text-charcoal mb-4">Those little moments matter.</h2>
        <p className="text-on-surface-variant leading-relaxed mb-9">
          Children learn through thousands of tiny interactions with the people they love.
        </p>
        <PrimaryButton onClick={() => setStep("observe")}>Continue</PrimaryButton>
      </PreviewShell>
    );
  }

  if (step === "observe") {
    return (
      <PreviewShell onClose={onClose}>
        <p className="v3-eyebrow text-warm-taupe mb-4">While sharing {observedName}</p>
        <h2 className="v3-h3 text-charcoal mb-8 leading-snug">
          Did you notice {childName} {watchText}?
        </h2>
        <div className="flex flex-wrap gap-3">
          {["Yes", "Not yet", "I wasn't sure"].map((option) => (
            <button
              key={option}
              onClick={onClose}
              className="px-6 py-3 rounded-full border border-warm-taupe/25 text-charcoal hover:bg-warm-taupe/10 active:scale-[0.98] transition-all duration-200"
            >
              {option}
            </button>
          ))}
        </div>
      </PreviewShell>
    );
  }

  return (
    <PreviewShell onClose={onClose}>
      <p className="v3-eyebrow text-warm-taupe mb-4">Yesterday&rsquo;s moments</p>
      <h2 className="v3-h3 text-charcoal mb-4">
        Which of these moments did you get to share yesterday?
      </h2>
      <p className="text-on-surface-variant leading-relaxed mb-7">
        No scoring, no catching up. Just a gentle look back.
      </p>
      <div className="mb-8">
        {activities.map((activity) => (
          <ReflectionChoice
            key={activity.name}
            name={activity.name}
            checked={checked.has(activity.name)}
            onToggle={() => toggle(activity.name)}
          />
        ))}
      </div>
      <div className="flex items-center justify-between gap-4">
        <GhostButton onClick={onClose}>Back to today</GhostButton>
        <PrimaryButton onClick={() => setStep(checked.size > 0 ? "confirm" : "empty")}>Continue</PrimaryButton>
      </div>
    </PreviewShell>
  );
}

function PreviewShell({ children, onClose }) {
  return (
    <div className="today-preview-enter max-w-xl rounded-[28px] bg-surface-container-low/65 border border-warm-taupe/10 p-8 md:p-10 shadow-[0_24px_80px_rgba(139,115,85,0.10)]">
      <div className="flex justify-end mb-2">
        <button
          onClick={onClose}
          aria-label="Close preview"
          className="text-warm-taupe hover:text-charcoal transition-colors"
        >
          <span className="material-symbols-outlined">close</span>
        </button>
      </div>
      {children}
    </div>
  );
}

export default function TodayPage() {
  const { profile, saveProfile } = useChildProfile();
  const { record, addTodaysPick } = useDailyMoments();
  const { markCreated, noteStageSeen } = useCompanionMeta();
  const [waitlistOpen, setWaitlistOpen] = useState(false);
  const [pickedToday, setPickedToday] = useState(() => new Set(record?.activityNames || []));
  const [previewOpen, setPreviewOpen] = useState(false);

  const stageId = profile ? stageIdForDob(profile.dob) : 0;
  const stage = useMemo(() => journeyStages.find((item) => item.id === stageId), [stageId]);
  const recommended = useMemo(() => getRecommended(stage), [stage]);

  const handleOnboardingSave = (childName, dob, parentName) => {
    saveProfile(childName, dob, parentName);
    markCreated();
    noteStageSeen(stageIdForDob(dob));
  };

  const handlePickToday = (activityName) => {
    addTodaysPick(activityName);
    setPickedToday((prev) => new Set(prev).add(activityName));
    if (navigator.vibrate) navigator.vibrate(8);
  };

  if (!profile) {
    return <Onboarding onSave={handleOnboardingSave} />;
  }

  return (
    <div className="overflow-x-clip bg-surface-cream min-h-screen">
      <NavbarV3 onJoin={() => setWaitlistOpen(true)} />

      <main className="pt-32 md:pt-40 pb-24 px-margin-mobile md:px-gutter">
        <div className="max-w-container-max mx-auto">
          <div className="flex items-start justify-between gap-6 mb-10">
            <div>
              <OpeningGesture />
              <p className="today-fade in v3-eyebrow text-warm-taupe mb-4">
                {timeGreeting(profile.parentName)} <span aria-hidden="true">☀️</span>
              </p>
              <h1 className="today-fade in v3-display text-charcoal max-w-2xl">
                Today with {profile.name}
              </h1>
            </div>
            <button
              onClick={() => setPreviewOpen(true)}
              className="hidden sm:inline-flex items-center gap-2 rounded-full border border-warm-taupe/20 bg-white/35 px-5 py-3 text-sm font-medium text-charcoal hover:bg-white/55 active:scale-[0.98] transition-all duration-200"
            >
              Tomorrow
              <span className="material-symbols-outlined text-base" aria-hidden="true">arrow_forward</span>
            </button>
          </div>

          <button
            onClick={() => setPreviewOpen(true)}
            className="sm:hidden mb-8 inline-flex items-center gap-2 rounded-full border border-warm-taupe/20 bg-white/35 px-5 py-3 text-sm font-medium text-charcoal active:scale-[0.98] transition-all duration-200"
          >
            Preview Tomorrow
            <span className="material-symbols-outlined text-base" aria-hidden="true">arrow_forward</span>
          </button>

          {previewOpen ? (
            <TomorrowPreview
              childName={profile.name}
              stage={stage}
              activities={recommended}
              onClose={() => setPreviewOpen(false)}
            />
          ) : (
            <>
              <section className="today-fade in max-w-3xl rounded-[28px] bg-surface-container-low/60 border border-warm-taupe/10 p-8 md:p-10 mb-14">
                <p className="v3-eyebrow text-warm-taupe mb-3">{stage.label}</p>
                <h2 className="v3-h3 text-charcoal mb-3">{stageMood(stage)}</h2>
                <p className="text-on-surface-variant leading-relaxed mb-4">{stage.note}</p>
                <p className="v3-serif italic text-xl text-charcoal leading-relaxed">{REASSURANCE}</p>
              </section>

              <section>
                <div className="mb-8">
                  <p className="v3-eyebrow text-warm-taupe mb-3">Today&rsquo;s suggested moments</p>
                  <h2 className="v3-h2 text-charcoal max-w-2xl">
                    Small ways to meet {profile.name} right where they are.
                  </h2>
                </div>

                <div className="grid md:grid-cols-2 gap-6 max-w-4xl">
                  {recommended.map((activity, index) => (
                    <MomentCard
                      key={activity.name}
                      activity={activity}
                      index={index}
                      isPicked={pickedToday.has(activity.name)}
                      onPick={handlePickToday}
                    />
                  ))}
                </div>
              </section>
            </>
          )}
        </div>
      </main>

      <FooterV3 />
      <WaitlistDialogV3 open={waitlistOpen} onClose={() => setWaitlistOpen(false)} />
    </div>
  );
}
