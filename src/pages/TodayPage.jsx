import { useMemo, useState } from "react";
import NavbarV3 from "../components/v3/NavbarV3.jsx";
import FooterV3 from "../components/v3/FooterV3.jsx";
import WaitlistDialogV3 from "../components/v3/WaitlistDialogV3.jsx";
import OpeningGesture from "../components/today/OpeningGesture.jsx";
import useChildProfile, { stageIdForDob } from "../components/today/useChildProfile.js";
import useDailyMoments, { todayKey } from "../components/today/useDailyMoments.js";
import useCompanionMeta from "../components/today/useCompanionMeta.js";
import journeyStages from "../data/journeyStages.json";

const REASSURANCE =
  "You do not have to make today perfect. A few present minutes are enough.";

const STAGE_MOODS = [
  "A tender season of bonding.",
  "A quiet season of noticing.",
  "A curious season of reaching out.",
  "A steady season of exploration.",
  "A lively season of movement.",
  "A warm season of trying.",
  "A bright season of discovery.",
  "A playful season of independence.",
  "A thoughtful season of expression.",
  "A full season of imagination.",
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

function getStageActivities(stage) {
  return stage.activityThemes
    .flatMap((themeGroup) => themeGroup.activities.map((activity) => ({ ...activity, theme: themeGroup.theme })));
}

function getDailyPlan(stage, dayNumber) {
  const activities = getStageActivities(stage);
  const primaryIndex = activities.length ? (dayNumber - 1) % activities.length : 0;
  const primary = activities[primaryIndex];
  const alternates = activities
    .filter((_, index) => index !== primaryIndex)
    .slice(0, 2);
  return { primary, alternates, activities };
}

function findObservation(stage, activityName) {
  const domain = stage.domains.find((item) =>
    item.relatedActivities.some((activity) => activity.name === activityName)
  );
  const milestone = domain?.milestones?.[0];
  return milestone?.guide?.watch?.replace(/\.$/, "").toLowerCase() || "how your child responded";
}

function localTodayForInput() {
  return todayKey();
}

function cleanQuote(text = "") {
  return text.replace(/^"|"$/g, "");
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
                <h1 className="v3-h2 text-charcoal mb-5">Welcome. You have a little village here.</h1>
                <p className="v3-body-lg text-on-surface-variant mb-9">
                  A calm place for the small everyday moments that help your child grow.
                </p>
                <PrimaryButton onClick={() => setStep(1)}>Begin gently</PrimaryButton>
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
                <h1 className="v3-h2 text-charcoal mb-4">What should we call your child?</h1>
                <p className="text-on-surface-variant leading-relaxed mb-8">
                  You can add your name too, if you would like a more personal hello.
                </p>
                <div className="space-y-4 mb-9">
                  <label className="sr-only" htmlFor="parent-name">Parent&rsquo;s first name</label>
                  <input
                    id="parent-name"
                    type="text"
                    value={parentName}
                    onChange={(event) => setParentName(event.target.value)}
                    placeholder="Your name (optional)"
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
                <p className="v3-eyebrow text-warm-taupe mb-5">Their season</p>
                <h1 className="v3-h2 text-charcoal mb-4">When were they born?</h1>
                <p className="text-on-surface-variant leading-relaxed mb-8">
                  This helps us choose guidance that fits where {childName.trim() || "your child"} is right now.
                </p>
                <label className="sr-only" htmlFor="child-dob">Date of birth</label>
                <input
                  id="child-dob"
                  type="date"
                  required
                  autoFocus
                  value={dob}
                  max={localTodayForInput()}
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
                  This season is full of small changes. You do not need to catch them all.
                </p>
                <p className="v3-serif italic text-xl text-charcoal leading-relaxed mb-9">
                  {stage.note}
                </p>
                <div className="flex items-center justify-between gap-4">
                  <GhostButton type="button" onClick={() => setStep(2)}>Back</GhostButton>
                  <PrimaryButton onClick={finish}>Begin today</PrimaryButton>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function ProfileSettings({ profile, onSave, onClose }) {
  const [parentName, setParentName] = useState(profile.parentName || "");
  const [childName, setChildName] = useState(profile.name || "");
  const [dob, setDob] = useState(profile.dob || "");

  return (
    <PreviewShell onClose={onClose}>
      <p className="v3-eyebrow text-warm-taupe mb-4">Child details</p>
      <h2 className="v3-h3 text-charcoal mb-4">Keep the guidance close to where they are.</h2>
      <p className="text-on-surface-variant leading-relaxed mb-7">
        If something has changed, you can adjust it quietly here.
      </p>
      <form
        className="space-y-4"
        onSubmit={(event) => {
          event.preventDefault();
          if (!childName.trim() || !dob) return;
          onSave(childName, dob, parentName);
          onClose();
        }}
      >
        <label className="sr-only" htmlFor="profile-parent-name">Parent's first name</label>
        <input
          id="profile-parent-name"
          type="text"
          value={parentName}
          onChange={(event) => setParentName(event.target.value)}
          placeholder="Your name (optional)"
          className="w-full px-5 py-3.5 rounded-full border border-warm-taupe/25 bg-white/60 text-charcoal placeholder:text-on-surface-variant/50 focus:outline-none focus:ring-2 focus:ring-warm-taupe/40 focus:border-transparent"
        />
        <label className="sr-only" htmlFor="profile-child-name">Child's name</label>
        <input
          id="profile-child-name"
          type="text"
          required
          value={childName}
          onChange={(event) => setChildName(event.target.value)}
          placeholder="Child's name"
          className="w-full px-5 py-3.5 rounded-full border border-warm-taupe/25 bg-white/60 text-charcoal placeholder:text-on-surface-variant/50 focus:outline-none focus:ring-2 focus:ring-warm-taupe/40 focus:border-transparent"
        />
        <label className="sr-only" htmlFor="profile-child-dob">Date of birth</label>
        <input
          id="profile-child-dob"
          type="date"
          required
          value={dob}
          max={localTodayForInput()}
          onChange={(event) => setDob(event.target.value)}
          className="w-full px-5 py-3.5 rounded-full border border-warm-taupe/25 bg-white/60 text-charcoal focus:outline-none focus:ring-2 focus:ring-warm-taupe/40 focus:border-transparent"
        />
        <div className="flex items-center justify-between gap-4 pt-4">
          <GhostButton type="button" onClick={onClose}>Cancel</GhostButton>
          <PrimaryButton type="submit" disabled={!childName.trim() || !dob}>Save details</PrimaryButton>
        </div>
      </form>
    </PreviewShell>
  );
}

function PrimaryMomentCard({ activity, isPicked, onPick }) {
  const steps = activity.steps?.slice(0, 3) || [];
  const watchFor = activity.watchFor?.slice(0, 2) || [];

  return (
    <section className="today-fade in max-w-3xl rounded-[28px] bg-surface-container-low/65 border border-warm-taupe/10 p-8 md:p-10 mb-10 shadow-[0_24px_80px_rgba(139,115,85,0.10)]">
      <div className="flex items-start justify-between gap-5 mb-7">
        <span className="text-4xl leading-none" aria-hidden="true">{activity.icon}</span>
        <span className="rounded-full bg-surface-cream/80 border border-warm-taupe/10 px-3 py-1 text-xs text-warm-taupe">
          {estimate(activity)}
        </span>
      </div>
      <p className="v3-eyebrow text-warm-taupe mb-3">One good thing for today</p>
      <h2 className="v3-h2 text-charcoal max-w-2xl mb-4">{activity.name}</h2>
      <p className="text-on-surface-variant leading-relaxed mb-5">{shortWhy(activity)}</p>
      <p className="v3-serif italic text-xl text-charcoal leading-relaxed mb-8">
        {activity.tagline}
      </p>

      {isPicked ? (
        <div className="today-pick-label">
          <div className="inline-flex items-center gap-2 rounded-full bg-surface-cream/80 border border-warm-taupe/15 px-4 py-2 text-sm text-warm-taupe mb-8">
            <span className="material-symbols-outlined text-base" aria-hidden="true">check</span>
            <span className="v3-serif italic">Here for today</span>
          </div>

          {steps.length > 0 && (
            <div className="mb-8">
              <p className="v3-eyebrow text-warm-taupe mb-4">A gentle way to try it</p>
              <ol className="space-y-4">
                {steps.map((step, index) => (
                  <li key={step} className="flex gap-4 text-on-surface-variant leading-relaxed">
                    <span className="mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-warm-taupe/10 text-xs font-medium text-warm-taupe">
                      {index + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          )}

          {watchFor.length > 0 && (
            <div className="border-t border-warm-taupe/15 pt-6">
              <p className="v3-eyebrow text-warm-taupe mb-3">What to notice</p>
              <ul className="space-y-3">
                {watchFor.map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-relaxed text-on-surface-variant">
                    <span className="material-symbols-outlined mt-0.5 text-base text-warm-taupe" aria-hidden="true">visibility</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {activity.parentNote && (
            <p className="v3-serif italic text-lg text-charcoal leading-relaxed border-t border-warm-taupe/15 mt-6 pt-6">
              {cleanQuote(activity.parentNote)}
            </p>
          )}
        </div>
      ) : (
        <div className="flex flex-wrap items-center gap-4">
          <PrimaryButton onClick={() => onPick(activity.name)}>Show me gently</PrimaryButton>
          <p className="text-sm leading-relaxed text-on-surface-variant max-w-sm">
            No perfect version needed. A few present minutes count.
          </p>
        </div>
      )}
    </section>
  );
}

function ActivityDetail({ activity, isOpen, onToggle }) {
  const steps = activity.steps?.slice(0, 3) || [];
  const watchFor = activity.watchFor?.slice(0, 2) || [];

  return (
    <div className="border-t border-warm-taupe/15 first:border-t-0">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="w-full py-5 text-left flex items-start justify-between gap-5 focus:outline-none focus-visible:ring-2 focus-visible:ring-warm-taupe/40"
      >
        <span className="flex gap-4">
          <span className="text-2xl leading-none" aria-hidden="true">{activity.icon}</span>
          <span>
            <span className="block text-base font-semibold text-charcoal">{activity.name}</span>
            <span className="mt-1 block text-sm leading-relaxed text-on-surface-variant">{activity.tagline}</span>
          </span>
        </span>
        <span className="flex flex-shrink-0 items-center gap-2 text-xs text-warm-taupe">
          {estimate(activity)}
          <span className="material-symbols-outlined text-base" aria-hidden="true">
            {isOpen ? "expand_less" : "expand_more"}
          </span>
        </span>
      </button>

      {isOpen && (
        <div className="pb-7 pl-11 today-response-enter">
          <div className="max-w-2xl space-y-6">
            {activity.why && (
              <div>
                <p className="v3-eyebrow text-warm-taupe mb-2">Why it matters</p>
                <p className="text-sm leading-relaxed text-on-surface-variant">{activity.why}</p>
              </div>
            )}

            {steps.length > 0 && (
              <div>
                <p className="v3-eyebrow text-warm-taupe mb-3">How to try it gently</p>
                <ol className="space-y-3">
                  {steps.map((step, index) => (
                    <li key={step} className="flex gap-3 text-sm leading-relaxed text-on-surface-variant">
                      <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-warm-taupe/10 text-[11px] font-medium text-warm-taupe">
                        {index + 1}
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            )}

            {watchFor.length > 0 && (
              <div>
                <p className="v3-eyebrow text-warm-taupe mb-3">What to notice</p>
                <ul className="space-y-2">
                  {watchFor.map((item) => (
                    <li key={item} className="flex gap-3 text-sm leading-relaxed text-on-surface-variant">
                      <span className="material-symbols-outlined mt-0.5 text-base text-warm-taupe" aria-hidden="true">visibility</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {activity.parentNote && (
              <p className="v3-serif italic text-base text-charcoal leading-relaxed">
                {cleanQuote(activity.parentNote)}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function ActivityLibrary({ activities }) {
  const [openName, setOpenName] = useState(null);

  return (
    <section className="mt-14 max-w-4xl">
      <div className="mb-6">
        <p className="v3-eyebrow text-warm-taupe mb-3">More for this season</p>
        <h2 className="v3-h3 text-charcoal max-w-2xl">
          A little more context, when you want it.
        </h2>
      </div>

      <div className="rounded-[28px] bg-white/35 border border-warm-taupe/10 px-6 md:px-8">
        {activities.map((activity) => (
          <ActivityDetail
            key={activity.name}
            activity={activity}
            isOpen={openName === activity.name}
            onToggle={() => setOpenName((current) => (current === activity.name ? null : activity.name))}
          />
        ))}
      </div>
    </section>
  );
}

function MomentCard({ activity, index, isActive, onSelect }) {
  return (
    <button
      type="button"
      onClick={() => onSelect(activity)}
      className={`today-moment-card today-stagger text-left rounded-[24px] border border-warm-taupe/15 bg-white/45 p-6 md:p-7 shadow-[0_18px_60px_rgba(139,115,85,0.08)] ${
        isActive ? "border-warm-taupe/30 bg-surface-container-low/70" : ""
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
      <span className="today-pick-button inline-flex items-center gap-2 text-sm font-medium text-charcoal">
        {isActive ? "Shown above" : "Choose this instead"}
        <span className="material-symbols-outlined text-base" aria-hidden="true">arrow_forward</span>
      </span>
    </button>
  );
}

function ReflectionChoice({ name, checked, onToggle }) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      onClick={onToggle}
      className="w-full flex items-center gap-4 py-4 text-left border-t border-warm-taupe/15 first:border-t-0 active:scale-[0.99] transition-transform duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-warm-taupe/40"
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

function TomorrowPreview({ childName, stage, activities, onClose, onComplete }) {
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
        <p className="v3-eyebrow text-warm-taupe mb-4">A quiet reset</p>
        <h2 className="v3-h2 text-charcoal mb-4">That is completely okay.</h2>
        <p className="text-on-surface-variant leading-relaxed mb-3">Some days have very little room.</p>
        <p className="v3-serif italic text-xl text-charcoal leading-relaxed mb-9">Nothing is lost. We will meet you again tomorrow.</p>
        <PrimaryButton onClick={() => onComplete([])}>Back to today</PrimaryButton>
      </PreviewShell>
    );
  }

  if (step === "confirm") {
    return (
      <PreviewShell onClose={onClose}>
        <p className="v3-eyebrow text-warm-taupe mb-4">A small look back</p>
        <h2 className="v3-h2 text-charcoal mb-4">Those moments still count.</h2>
        <p className="text-on-surface-variant leading-relaxed mb-9">
          Children grow through thousands of ordinary exchanges with the people they trust.
        </p>
        <PrimaryButton onClick={() => setStep("observe")}>Continue</PrimaryButton>
      </PreviewShell>
    );
  }

  if (step === "observe") {
    return (
      <PreviewShell onClose={onClose}>
        <p className="v3-eyebrow text-warm-taupe mb-4">Looking back at {observedName}</p>
        <h2 className="v3-h3 text-charcoal mb-8 leading-snug">
          Did you notice {childName} {watchText}?
        </h2>
        <div className="flex flex-wrap gap-3">
          {["Yes", "Not yet", "I was not sure"].map((option) => (
            <button
              key={option}
              onClick={() => onComplete(selectedNames)}
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
      <p className="v3-eyebrow text-warm-taupe mb-4">Yesterday, gently</p>
      <h2 className="v3-h3 text-charcoal mb-4">
        Did any of these moments find their way into yesterday?
      </h2>
      <p className="text-on-surface-variant leading-relaxed mb-7">
        No scoring. No catching up. Just a soft look back.
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
          aria-label="Close"
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
  const { todaysRecord, reflectionRecord, pendingReflection, addTodaysPick, submitReflection } = useDailyMoments();
  const { dayNumber, markCreated, noteStageSeen, markReflected } = useCompanionMeta();
  const [waitlistOpen, setWaitlistOpen] = useState(false);
  const [pickedToday, setPickedToday] = useState(() => new Set(todaysRecord?.activityNames || []));
  const [panel, setPanel] = useState(null);

  const stageId = profile ? stageIdForDob(profile.dob) : 0;
  const stage = useMemo(() => journeyStages.find((item) => item.id === stageId), [stageId]);
  const dailyPlan = useMemo(() => getDailyPlan(stage, dayNumber), [stage, dayNumber]);
  const [activeActivityName, setActiveActivityName] = useState(dailyPlan.primary?.name);
  const activeActivity =
    dailyPlan.activities.find((activity) => activity.name === activeActivityName) || dailyPlan.primary;
  const reflectionActivities = useMemo(() => {
    const pickedNames = reflectionRecord?.activityNames || [];
    const picked = pickedNames
      .map((name) => dailyPlan.activities.find((activity) => activity.name === name))
      .filter(Boolean);
    return picked.length > 0 ? picked : dailyPlan.primary ? [dailyPlan.primary] : [];
  }, [reflectionRecord, dailyPlan.activities, dailyPlan.primary]);

  const handleOnboardingSave = (childName, dob, parentName) => {
    saveProfile(childName, dob, parentName);
    markCreated();
    noteStageSeen(stageIdForDob(dob));
  };

  const handlePickToday = (activityName) => {
    addTodaysPick(activityName);
    setActiveActivityName(activityName);
    setPickedToday((prev) => new Set(prev).add(activityName));
    if (navigator.vibrate) navigator.vibrate(8);
  };

  const handleReflectionComplete = (triedNames) => {
    submitReflection(triedNames);
    markReflected();
    setPanel(null);
  };

  if (!profile) {
    return <Onboarding onSave={handleOnboardingSave} />;
  }

  return (
    <div className="overflow-x-clip bg-surface-cream min-h-screen">
      {/* Logo now genuinely navigates to "/" (the marketing homepage),
          a different route from "/today" — no custom handler needed. */}
      <NavbarV3 onJoin={() => setWaitlistOpen(true)} showJoin={false} />

      <main className="pt-32 md:pt-40 pb-24 px-margin-mobile md:px-gutter">
        <div className="max-w-container-max mx-auto">
          <div className="flex items-start justify-between gap-6 mb-10">
            <div>
              <OpeningGesture />
              <p className="today-fade in v3-eyebrow text-warm-taupe mb-4">
                {timeGreeting(profile.parentName)} <span aria-hidden="true">☀️</span>
              </p>
              <h1 className="today-fade in v3-display text-charcoal max-w-2xl">
                Today, with {profile.name}
              </h1>
            </div>
            <div className="hidden sm:flex items-center gap-3">
              {pendingReflection && (
                <button
                  onClick={() => setPanel("reflection")}
                  className="inline-flex items-center gap-2 rounded-full border border-warm-taupe/20 bg-white/35 px-5 py-3 text-sm font-medium text-charcoal hover:bg-white/55 active:scale-[0.98] transition-all duration-200"
                >
                  Look back gently
                  <span className="material-symbols-outlined text-base" aria-hidden="true">arrow_forward</span>
                </button>
              )}
              <button
                onClick={() => setPanel("profile")}
                className="inline-flex items-center gap-2 rounded-full border border-warm-taupe/20 bg-white/25 px-4 py-3 text-sm font-medium text-charcoal hover:bg-white/50 active:scale-[0.98] transition-all duration-200"
              >
                Child details
              </button>
            </div>
          </div>

          <div className="sm:hidden mb-8 flex flex-wrap gap-3">
            {pendingReflection && (
              <button
                onClick={() => setPanel("reflection")}
                className="inline-flex items-center gap-2 rounded-full border border-warm-taupe/20 bg-white/35 px-5 py-3 text-sm font-medium text-charcoal active:scale-[0.98] transition-all duration-200"
              >
                Look back gently
                <span className="material-symbols-outlined text-base" aria-hidden="true">arrow_forward</span>
              </button>
            )}
            <button
              onClick={() => setPanel("profile")}
              className="inline-flex items-center gap-2 rounded-full border border-warm-taupe/20 bg-white/25 px-4 py-3 text-sm font-medium text-charcoal active:scale-[0.98] transition-all duration-200"
            >
              Child details
            </button>
          </div>

          {panel === "reflection" ? (
            <TomorrowPreview
              childName={profile.name}
              stage={stage}
              activities={reflectionActivities}
              onClose={() => setPanel(null)}
              onComplete={handleReflectionComplete}
            />
          ) : panel === "profile" ? (
            <ProfileSettings
              profile={profile}
              onSave={(childName, dob, parentName) => {
                saveProfile(childName, dob, parentName);
                noteStageSeen(stageIdForDob(dob));
              }}
              onClose={() => setPanel(null)}
            />
          ) : (
            <>
              <PrimaryMomentCard
                activity={activeActivity}
                isPicked={pickedToday.has(activeActivity.name)}
                onPick={handlePickToday}
              />

              <section className="today-fade in max-w-3xl rounded-[28px] bg-white/35 border border-warm-taupe/10 p-6 md:p-8 mb-12">
                <p className="v3-eyebrow text-warm-taupe mb-3">{stage.label}</p>
                <h2 className="v3-h3 text-charcoal mb-3">{stageMood(stage)}</h2>
                <p className="text-on-surface-variant leading-relaxed mb-4">{stage.note}</p>
                <p className="v3-serif italic text-xl text-charcoal leading-relaxed">{REASSURANCE}</p>
              </section>

              {dailyPlan.alternates.length > 0 && (
                <section>
                  <div className="mb-6">
                    <p className="v3-eyebrow text-warm-taupe mb-3">If today asks for something else</p>
                    <h2 className="v3-h3 text-charcoal max-w-2xl">
                      Two more gentle options for {profile.name}.
                    </h2>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6 max-w-4xl">
                    {dailyPlan.alternates.map((activity, index) => (
                      <MomentCard
                        key={activity.name}
                        activity={activity}
                        index={index}
                        isActive={activeActivity.name === activity.name}
                        onSelect={(selected) => setActiveActivityName(selected.name)}
                      />
                    ))}
                  </div>
                </section>
              )}

              <ActivityLibrary activities={dailyPlan.activities} />
            </>
          )}
        </div>
      </main>

      <FooterV3 minimal />
      <WaitlistDialogV3 open={waitlistOpen} onClose={() => setWaitlistOpen(false)} />
    </div>
  );
}
