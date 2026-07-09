import { useEffect, useMemo, useRef, useState } from "react";
import NavbarV3 from "../components/v3/NavbarV3.jsx";
import FooterV3 from "../components/v3/FooterV3.jsx";
import WaitlistDialogV3 from "../components/v3/WaitlistDialogV3.jsx";
import OpeningGesture from "../components/today/OpeningGesture.jsx";
import useChildProfile, { stageIdForDob } from "../components/today/useChildProfile.js";
import useDailyMoments from "../components/today/useDailyMoments.js";
import useCompanionMeta from "../components/today/useCompanionMeta.js";
import useNoticed from "../components/journey/useNoticed.js";
import { TRIED_RESPONSES, NONE_TRIED_RESPONSES, randomFrom, greeting } from "../components/today/copy.js";
import journeyStages from "../data/journeyStages.json";

const REASSURANCE = "Every child grows differently — think of these as gentle signposts, not deadlines.";

function fadeClass(revealed) {
  return `today-fade${revealed ? " in" : ""}`;
}

function OnboardingForm({ onSave }) {
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !dob) return;
    onSave(name, dob);
  };

  return (
    <div className="max-w-md mx-auto">
      <OpeningGesture />
      <p className="v3-eyebrow text-warm-taupe mb-4 text-center">Hello</p>
      <h1 className="v3-h2 text-charcoal mb-4 text-center">
        Let&rsquo;s take a moment to get to know your child.
      </h1>
      <p className="text-on-surface-variant leading-relaxed mb-8 text-center">
        Just their name and when they were born. Nothing else, for now.
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="sr-only" htmlFor="child-name">Child&rsquo;s name</label>
        <input
          id="child-name"
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Child's name"
          className="w-full px-5 py-3.5 rounded-full border border-warm-taupe/25 bg-white/60 text-charcoal placeholder:text-on-surface-variant/50 focus:outline-none focus:ring-2 focus:ring-warm-taupe/40 focus:border-transparent"
        />
        <label className="sr-only" htmlFor="child-dob">Date of birth</label>
        <input
          id="child-dob"
          type="date"
          required
          value={dob}
          max={new Date().toISOString().slice(0, 10)}
          onChange={(e) => setDob(e.target.value)}
          className="w-full px-5 py-3.5 rounded-full border border-warm-taupe/25 bg-white/60 text-charcoal focus:outline-none focus:ring-2 focus:ring-warm-taupe/40 focus:border-transparent"
        />
        <button
          type="submit"
          className="w-full bg-charcoal text-surface-cream px-8 py-3.5 rounded-full font-medium text-lg hover:opacity-90 transition-opacity"
        >
          Begin
        </button>
      </form>
    </div>
  );
}

function LoadingBeat() {
  return (
    <div className="max-w-md mx-auto text-center py-24">
      <p className="today-fade in v3-serif text-xl text-on-surface-variant italic">
        Finding your child&rsquo;s place in all this&hellip;
      </p>
    </div>
  );
}

function StageTransition({ label }) {
  return (
    <div className="max-w-lg mx-auto text-center py-24">
      <p className="today-fade in v3-serif text-2xl text-charcoal leading-relaxed mb-3">
        Something&rsquo;s shifted since you were last here.
      </p>
      <p className="today-fade in text-sm text-warm-taupe">{label}</p>
    </div>
  );
}

function ReflectionCard({ activityNames, isFirstEver, onSubmit }) {
  const [checked, setChecked] = useState(() => new Set());

  const toggle = (name) => {
    setChecked((prev) => {
      const next = new Set(prev);
      next.has(name) ? next.delete(name) : next.add(name);
      return next;
    });
  };

  return (
    <div className="today-fade in max-w-lg mx-auto rounded-[28px] bg-surface-container-low/60 border border-warm-taupe/10 p-8 md:p-10">
      <p className="v3-eyebrow text-warm-taupe mb-3">🌿 {isFirstEver ? "How did yesterday go?" : "Yesterday's moments together"}</p>
      {!isFirstEver && (
        <h2 className="v3-h3 text-charcoal mb-6">Which of these did you get a chance to try?</h2>
      )}
      <div className="space-y-1 mb-8">
        {activityNames.map((name) => {
          const isOn = checked.has(name);
          return (
            <button
              key={name}
              onClick={() => toggle(name)}
              className="w-full flex items-center gap-3 py-3 text-left border-t border-warm-taupe/15 first:border-t-0"
            >
              <span
                className={`today-notice-dot${isOn ? " on" : ""} w-5 h-5 rounded-full border flex-shrink-0 ${
                  isOn ? "border-warm-taupe" : "border-warm-taupe/30"
                }`}
              />
              <span className={`today-notice-label text-[15px] ${isOn ? "text-charcoal" : "text-on-surface-variant"}`}>
                {name}
              </span>
            </button>
          );
        })}
      </div>
      <button
        onClick={() => onSubmit([...checked])}
        className="w-full bg-charcoal text-surface-cream px-8 py-3.5 rounded-full font-medium text-lg hover:opacity-90 transition-opacity"
      >
        Continue
      </button>
    </div>
  );
}

function ObservationQuestion({ activityName, watchText, onAnswer }) {
  return (
    <div className="today-fade in max-w-lg mx-auto rounded-[28px] bg-surface-container-low/60 border border-warm-taupe/10 p-8 md:p-10">
      <p className="v3-eyebrow text-warm-taupe mb-4">While trying {activityName}</p>
      <p className="v3-h3 text-charcoal mb-8 leading-snug">Did you notice {watchText}</p>
      <div className="flex flex-wrap gap-3">
        {["Yes", "Not yet", "I didn't notice"].map((option) => (
          <button
            key={option}
            onClick={() => onAnswer(option)}
            className="px-6 py-3 rounded-full border border-warm-taupe/25 text-charcoal hover:bg-warm-taupe/10 transition-colors"
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function TodayPage() {
  const { profile, saveProfile } = useChildProfile();
  const { record, pendingReflection, addTodaysPick, submitReflection } = useDailyMoments();
  const { noticed, toggle } = useNoticed();
  const {
    meta,
    dayNumber,
    markCreated,
    noteStageSeen,
    markReflected,
    markFirstNoticeCelebrated,
    markDay7LineShown,
  } = useCompanionMeta();

  const [waitlistOpen, setWaitlistOpen] = useState(false);
  // loading | transition | home | reflectionPause | response | observe | celebrate
  const [phase, setPhase] = useState("home");
  const [justOnboarded, setJustOnboarded] = useState(false);
  const [transitionLabel, setTransitionLabel] = useState("");
  const [response, setResponse] = useState("");
  const [responseQuiet, setResponseQuiet] = useState(false);
  const [pendingObservation, setPendingObservation] = useState(null);
  const [celebrateFirst, setCelebrateFirst] = useState(false);
  const [pickedToday, setPickedToday] = useState(new Set());
  const [revealStep, setRevealStep] = useState(0);
  const [showQuietLine, setShowQuietLine] = useState(false);
  const [day7Visible, setDay7Visible] = useState(false);
  const dwellTimer = useRef(null);

  const stageId = profile ? stageIdForDob(profile.dob) : 0;
  const stage = useMemo(() => journeyStages.find((s) => s.id === stageId), [stageId]);

  const recommended = useMemo(() => {
    const all = stage.activityThemes.flatMap((t) => t.activities.map((a) => ({ ...a, theme: t.theme })));
    return all.slice(0, 5);
  }, [stage]);

  const handleSave = (name, dob) => {
    saveProfile(name, dob);
    markCreated();
    setJustOnboarded(true);
  };

  // On mount / whenever the resolved stage changes, decide how to enter:
  // a fresh onboarding gets the loading beat, a returning visit whose
  // stage quietly shifted gets the transition beat, everything else goes
  // straight to a staggered reveal of the home view.
  useEffect(() => {
    if (!profile) return;

    if (justOnboarded) {
      setPhase("loading");
      const t = setTimeout(() => {
        noteStageSeen(stageId);
        setPhase("home");
      }, 900);
      return () => clearTimeout(t);
    }

    if (meta.previousStageId !== null && meta.previousStageId !== stageId) {
      setPhase("transition");
      setTransitionLabel(stage.label);
      const t = setTimeout(() => {
        noteStageSeen(stageId);
        setPhase("home");
      }, 1800);
      return () => clearTimeout(t);
    }

    if (meta.previousStageId === null) {
      noteStageSeen(stageId);
    }
    setPhase("home");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile, stageId]);

  // Staggered reveal: stage label+title, then the paragraph, then each
  // activity card in turn. Re-runs every time "home" is (re)entered.
  useEffect(() => {
    if (phase !== "home") return;
    setRevealStep(0);
    const timers = [];
    timers.push(setTimeout(() => setRevealStep(1), 60));
    timers.push(setTimeout(() => setRevealStep(2), 480));
    recommended.forEach((_, i) => {
      timers.push(setTimeout(() => setRevealStep(3 + i), 700 + i * 120));
    });
    return () => timers.forEach(clearTimeout);
  }, [phase, recommended]);

  // "A week of small moments, already." — shown once, ever, the first
  // time home is reached on or after day 7. Captured into local state so
  // it stays visible for the rest of this visit even once marked shown.
  useEffect(() => {
    if (phase === "home" && dayNumber >= 7 && !meta.day7LineShown) {
      setDay7Visible(true);
      markDay7LineShown();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  // A quiet, easily-missed line if nothing's been picked a few seconds
  // after arriving — company, not a nudge.
  useEffect(() => {
    setShowQuietLine(false);
    if (phase !== "home" || pendingReflection) return;
    clearTimeout(dwellTimer.current);
    if (pickedToday.size === 0) {
      dwellTimer.current = setTimeout(() => setShowQuietLine(true), 4000);
    }
    return () => clearTimeout(dwellTimer.current);
  }, [phase, pendingReflection, pickedToday.size]);

  const findDomainForActivity = (activityName) =>
    stage.domains.find((d) => d.relatedActivities.some((a) => a.name === activityName));

  const nextUnnoticedMilestone = (domain) => {
    const di = stage.domains.indexOf(domain);
    return domain.milestones
      .map((m, mi) => ({ m, mi }))
      .find(({ mi }) => !noticed[`${stage.id}_${di}_${mi}`]);
  };

  const handlePickToday = (activityName) => {
    addTodaysPick(activityName);
    setPickedToday((prev) => new Set(prev).add(activityName));
    if (navigator.vibrate) navigator.vibrate(8);
  };

  const handleReflectionSubmit = (triedNames) => {
    markReflected();
    setPhase("reflectionPause");

    setTimeout(() => {
      submitReflection(triedNames);

      if (triedNames.length === 0) {
        setResponse(randomFrom(NONE_TRIED_RESPONSES));
        setResponseQuiet(true);
        setPhase("response");
        return;
      }

      setResponse(randomFrom(TRIED_RESPONSES));
      setResponseQuiet(false);

      for (const name of triedNames) {
        const domain = findDomainForActivity(name);
        if (!domain) continue;
        const found = nextUnnoticedMilestone(domain);
        if (found) {
          setPendingObservation({
            activityName: name,
            domain,
            milestoneIndex: found.mi,
            watchText: found.m.guide.watch.replace(/\.$/, "").toLowerCase(),
          });
          break;
        }
      }
      setPhase("response");
    }, 1000);
  };

  const handleObservationAnswer = (answer) => {
    const isFirstEverNotice = answer === "Yes" && pendingObservation && !meta.firstNoticeCelebrated;

    if (answer === "Yes" && pendingObservation) {
      const di = stage.domains.indexOf(pendingObservation.domain);
      toggle(`${stage.id}_${di}_${pendingObservation.milestoneIndex}`);
    }
    setPendingObservation(null);

    if (isFirstEverNotice) {
      markFirstNoticeCelebrated();
      setCelebrateFirst(true);
      setPhase("celebrate");
    } else {
      setPhase("home");
    }
  };

  if (!profile) {
    return (
      <div className="overflow-x-clip bg-surface-cream min-h-screen">
        <NavbarV3 onJoin={() => setWaitlistOpen(true)} />
        <div className="pt-40 pb-24 px-margin-mobile md:px-gutter">
          <OnboardingForm onSave={handleSave} />
        </div>
        <FooterV3 />
        <WaitlistDialogV3 open={waitlistOpen} onClose={() => setWaitlistOpen(false)} />
      </div>
    );
  }

  return (
    <div className="overflow-x-clip bg-surface-cream min-h-screen">
      <NavbarV3 onJoin={() => setWaitlistOpen(true)} />

      <main className="pt-32 md:pt-40 pb-24 px-margin-mobile md:px-gutter">
        <div className="max-w-container-max mx-auto">
          <OpeningGesture />

          {phase === "loading" && <LoadingBeat />}
          {phase === "transition" && <StageTransition label={transitionLabel} />}

          {phase === "reflectionPause" && (
            <div className="max-w-lg mx-auto py-24" aria-hidden="true" />
          )}

          {phase === "response" && (
            <div className="max-w-lg mx-auto text-center mb-16">
              <p
                className={`today-response-enter v3-serif text-2xl text-charcoal leading-relaxed mb-8 ${
                  responseQuiet ? "today-response-quiet" : ""
                }`}
              >
                {response}
              </p>
              <button
                onClick={() => (pendingObservation ? setPhase("observe") : setPhase("home"))}
                className="text-sm text-warm-taupe hover:text-charcoal underline underline-offset-4 decoration-soft-sand"
              >
                Continue
              </button>
            </div>
          )}

          {phase === "observe" && pendingObservation && (
            <div className="mb-16">
              <ObservationQuestion
                activityName={pendingObservation.activityName}
                watchText={pendingObservation.watchText}
                onAnswer={handleObservationAnswer}
              />
            </div>
          )}

          {phase === "celebrate" && celebrateFirst && (
            <div className="today-first-glow max-w-lg mx-auto text-center mb-16 py-14 px-8 bg-surface-container-low/60 border border-warm-taupe/15">
              <p className="today-response-enter v3-serif text-2xl text-charcoal leading-relaxed mb-8">
                That&rsquo;s the first thing we&rsquo;ve noticed together. There will be more.
              </p>
              <button
                onClick={() => setPhase("home")}
                className="text-sm text-warm-taupe hover:text-charcoal underline underline-offset-4 decoration-soft-sand"
              >
                Continue
              </button>
            </div>
          )}

          {phase === "home" && pendingReflection && (
            <div className="mb-16">
              <ReflectionCard
                activityNames={record.activityNames}
                isFirstEver={!meta.hasReflectedBefore}
                onSubmit={handleReflectionSubmit}
              />
            </div>
          )}

          {phase === "home" && !pendingReflection && (
            <>
              <p className={`${fadeClass(revealStep >= 1)} v3-eyebrow text-warm-taupe mb-4`}>
                {greeting(profile.name)}
              </p>
              <div className={`${fadeClass(revealStep >= 1)} rounded-[28px] bg-surface-container-low/60 border border-warm-taupe/10 p-8 md:p-10 mb-4 max-w-2xl`}>
                <p className="v3-eyebrow text-warm-taupe mb-3">{stage.label}</p>
                <h2 className="v3-h2 text-charcoal mb-4">{stage.title}</h2>
                <div className={fadeClass(revealStep >= 2)}>
                  <p className="text-on-surface-variant leading-relaxed mb-4">{stage.note}</p>
                  <p className="text-on-surface-variant leading-relaxed italic v3-serif">{REASSURANCE}</p>
                </div>
              </div>

              {day7Visible && (
                <p
                  className={`${fadeClass(revealStep >= 2)} text-sm text-warm-taupe/70 italic v3-serif mb-10 max-w-2xl`}
                >
                  A week of small moments, already.
                </p>
              )}

              <div className="grid md:grid-cols-2 gap-6 max-w-3xl mt-10">
                {recommended.map((activity, i) => (
                  <div
                    key={activity.name}
                    className={`${fadeClass(revealStep >= 3 + i)} rounded-[20px] border border-warm-taupe/15 bg-white/40 p-6 ${
                      pickedToday.has(activity.name) ? "today-card-picked" : ""
                    }`}
                  >
                    <span className="text-2xl block mb-3" aria-hidden="true">{activity.icon}</span>
                    <p className="text-[15px] font-medium text-charcoal mb-2">{activity.name}</p>
                    <p className="text-sm text-on-surface-variant leading-relaxed mb-5">{activity.why}</p>
                    {pickedToday.has(activity.name) ? (
                      <span className="today-pick-label text-sm text-warm-taupe/70 italic v3-serif">
                        Set aside for today
                      </span>
                    ) : (
                      <button
                        onClick={() => handlePickToday(activity.name)}
                        className="text-sm text-warm-taupe hover:text-charcoal underline underline-offset-4 decoration-soft-sand"
                      >
                        Let&rsquo;s try this today
                      </button>
                    )}
                  </div>
                ))}
              </div>

              {showQuietLine && (
                <p className="today-fade in text-sm text-on-surface-variant/70 italic v3-serif mt-10 max-w-2xl">
                  No rush. Whenever one of these feels right.
                </p>
              )}
            </>
          )}
        </div>
      </main>

      <FooterV3 />
      <WaitlistDialogV3 open={waitlistOpen} onClose={() => setWaitlistOpen(false)} />
    </div>
  );
}
