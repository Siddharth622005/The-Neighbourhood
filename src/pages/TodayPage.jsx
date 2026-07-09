import { useMemo, useState } from "react";
import NavbarV3 from "../components/v3/NavbarV3.jsx";
import FooterV3 from "../components/v3/FooterV3.jsx";
import WaitlistDialogV3 from "../components/v3/WaitlistDialogV3.jsx";
import useChildProfile, { stageIdForDob } from "../components/today/useChildProfile.js";
import useDailyMoments from "../components/today/useDailyMoments.js";
import useNoticed from "../components/journey/useNoticed.js";
import { TRIED_RESPONSES, NONE_TRIED_RESPONSES, randomFrom, greeting } from "../components/today/copy.js";
import journeyStages from "../data/journeyStages.json";

const REASSURANCE = "Every child grows differently — think of these as gentle signposts, not deadlines.";

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
      <p className="v3-eyebrow text-warm-taupe mb-4">Hello</p>
      <h1 className="v3-h2 text-charcoal mb-4">
        Let&rsquo;s take a moment to get to know your child.
      </h1>
      <p className="text-on-surface-variant leading-relaxed mb-8">
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

function ReflectionCard({ activityNames, onSubmit }) {
  const [checked, setChecked] = useState(() => new Set());

  const toggle = (name) => {
    setChecked((prev) => {
      const next = new Set(prev);
      next.has(name) ? next.delete(name) : next.add(name);
      return next;
    });
  };

  return (
    <div className="max-w-lg mx-auto rounded-[28px] bg-surface-container-low/60 border border-warm-taupe/10 p-8 md:p-10">
      <p className="v3-eyebrow text-warm-taupe mb-3">🌿 Yesterday&rsquo;s moments together</p>
      <h2 className="v3-h3 text-charcoal mb-6">Which of these did you get a chance to try?</h2>
      <div className="space-y-1 mb-8">
        {activityNames.map((name) => (
          <button
            key={name}
            onClick={() => toggle(name)}
            className="w-full flex items-center gap-3 py-3 text-left border-t border-warm-taupe/15 first:border-t-0"
          >
            <span
              className={`w-5 h-5 rounded-full border flex-shrink-0 transition-colors duration-200 ${
                checked.has(name) ? "bg-warm-taupe border-warm-taupe" : "border-warm-taupe/30"
              }`}
            />
            <span className="text-[15px] text-charcoal">{name}</span>
          </button>
        ))}
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
    <div className="max-w-lg mx-auto rounded-[28px] bg-surface-container-low/60 border border-warm-taupe/10 p-8 md:p-10">
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
  const [waitlistOpen, setWaitlistOpen] = useState(false);
  const [phase, setPhase] = useState("home"); // home | response | observe | done
  const [response, setResponse] = useState("");
  const [pendingObservation, setPendingObservation] = useState(null);

  const stageId = profile ? stageIdForDob(profile.dob) : 0;
  const stage = useMemo(() => journeyStages.find((s) => s.id === stageId), [stageId]);

  const recommended = useMemo(() => {
    const all = stage.activityThemes.flatMap((t) => t.activities.map((a) => ({ ...a, theme: t.theme })));
    return all.slice(0, 5);
  }, [stage]);

  const findDomainForActivity = (activityName) =>
    stage.domains.find((d) => d.relatedActivities.some((a) => a.name === activityName));

  const nextUnnoticedMilestone = (domain) => {
    const di = stage.domains.indexOf(domain);
    return domain.milestones
      .map((m, mi) => ({ m, mi }))
      .find(({ mi }) => !noticed[`${stage.id}_${di}_${mi}`]);
  };

  const [pickedToday, setPickedToday] = useState(new Set());

  const handlePickToday = (activityName) => {
    addTodaysPick(activityName);
    setPickedToday((prev) => new Set(prev).add(activityName));
  };

  const handleReflectionSubmit = (triedNames) => {
    submitReflection(triedNames);
    if (triedNames.length === 0) {
      setResponse(randomFrom(NONE_TRIED_RESPONSES));
      setPhase("response");
      return;
    }
    setResponse(randomFrom(TRIED_RESPONSES));

    // Find one tried activity that maps to a domain with an unnoticed
    // milestone, and prepare a single gentle observation question for it.
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
  };

  const handleObservationAnswer = (answer) => {
    if (answer === "Yes" && pendingObservation) {
      const di = stage.domains.indexOf(pendingObservation.domain);
      toggle(`${stage.id}_${di}_${pendingObservation.milestoneIndex}`);
    }
    setPendingObservation(null);
    setPhase("done");
  };

  if (!profile) {
    return (
      <div className="overflow-x-clip bg-surface-cream min-h-screen">
        <NavbarV3 onJoin={() => setWaitlistOpen(true)} />
        <div className="pt-40 pb-24 px-margin-mobile md:px-gutter">
          <OnboardingForm onSave={saveProfile} />
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
          {pendingReflection && phase === "home" && (
            <div className="mb-16">
              <ReflectionCard
                activityNames={record.activityNames}
                onSubmit={handleReflectionSubmit}
              />
            </div>
          )}

          {phase === "response" && (
            <div className="max-w-lg mx-auto text-center mb-16">
              <p className="v3-serif text-2xl text-charcoal leading-relaxed mb-8">{response}</p>
              {pendingObservation ? (
                <button
                  onClick={() => setPhase("observe")}
                  className="text-sm text-warm-taupe hover:text-charcoal underline underline-offset-4 decoration-soft-sand"
                >
                  Continue
                </button>
              ) : (
                <button
                  onClick={() => setPhase("home")}
                  className="text-sm text-warm-taupe hover:text-charcoal underline underline-offset-4 decoration-soft-sand"
                >
                  Continue
                </button>
              )}
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

          {(phase === "home" || phase === "done") && !pendingReflection && (
            <>
              <p className="v3-eyebrow text-warm-taupe mb-4">{greeting(profile.name)}</p>
              <div className="rounded-[28px] bg-surface-container-low/60 border border-warm-taupe/10 p-8 md:p-10 mb-14 max-w-2xl">
                <p className="v3-eyebrow text-warm-taupe mb-3">{stage.label}</p>
                <h2 className="v3-h2 text-charcoal mb-4">{stage.title}</h2>
                <p className="text-on-surface-variant leading-relaxed mb-4">{stage.note}</p>
                <p className="text-on-surface-variant leading-relaxed italic v3-serif">{REASSURANCE}</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6 max-w-3xl">
                {recommended.map((activity) => (
                  <div
                    key={activity.name}
                    className="rounded-[20px] border border-warm-taupe/15 bg-white/40 p-6"
                  >
                    <span className="text-2xl block mb-3" aria-hidden="true">{activity.icon}</span>
                    <p className="text-[15px] font-medium text-charcoal mb-2">{activity.name}</p>
                    <p className="text-sm text-on-surface-variant leading-relaxed mb-5">{activity.why}</p>
                    {pickedToday.has(activity.name) ? (
                      <span className="text-sm text-warm-taupe/70 italic v3-serif">
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
            </>
          )}
        </div>
      </main>

      <FooterV3 />
      <WaitlistDialogV3 open={waitlistOpen} onClose={() => setWaitlistOpen(false)} />
    </div>
  );
}
