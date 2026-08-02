import { useEffect, useRef, useState } from "react";
import { supabase, isSupabaseConfigured } from "../../lib/supabaseClient.js";

const REFERRAL_BOOST = 3;
const CHILD_STAGES = [
  "Expecting / due soon",
  "0–3 months",
  "3–6 months",
  "6–12 months",
  "1–2 years",
  "2–3 years",
  "3–5 years",
  "Still figuring it out",
];

/**
 * Same waitlist flow as the shared dialog (Supabase insert + queue position
 * + referral link), redesigned to match the V3 voice: calmer copy, one
 * decision per screen, honest microcopy.
 */
export default function WaitlistDialogV3({ open, onClose }) {
  const [mode, setMode] = useState("join"); // join | lookup
  const [joinStep, setJoinStep] = useState("child"); // child | parent
  const [childStage, setChildStage] = useState("");
  const [childName, setChildName] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [lookupPhone, setLookupPhone] = useState("");
  const [status, setStatus] = useState("form"); // form | loading | success | error
  const [errorMessage, setErrorMessage] = useState("");
  const [result, setResult] = useState(null);
  const [copied, setCopied] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (!open) {
      setMode("join");
      setJoinStep("child");
      setChildStage("");
      setChildName("");
      setStatus("form");
      setName("");
      setPhone("");
      setEmail("");
      setLookupPhone("");
      setErrorMessage("");
      setCopied(false);
      return;
    }
    const onKeyDown = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKeyDown);
    // Move focus into the dialog when it opens.
    window.setTimeout(() => inputRef.current?.focus(), 0);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  const handleChildStep = (e) => {
    e.preventDefault();
    if (!childStage) return;
    setErrorMessage("");
    setJoinStep("parent");
    window.setTimeout(() => inputRef.current?.focus(), 0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || status === "loading") return;

    if (!isSupabaseConfigured) {
      setStatus("error");
      setErrorMessage("The waitlist isn't connected yet. Please try again a little later.");
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    try {
      const params = new URLSearchParams(window.location.search);
      const refId = params.get("ref");
      const trimmedEmail = email.trim().toLowerCase();
      const signup = {
        name: name.trim(),
        phone: phone.trim(),
        email: trimmedEmail || null,
        child_stage: childStage || null,
        child_name: childName.trim() || null,
        referred_by: refId ? Number(refId) : null,
      };

      let { data: inserted, error: insertError } = await supabase
        .from("waitlist")
        .insert(signup)
        .select("id, created_at")
        .single();

      if (insertError?.code === "PGRST204" || insertError?.message?.includes("child_")) {
        const { child_stage, child_name, ...legacySignup } = signup;
        const retry = await supabase
          .from("waitlist")
          .insert(legacySignup)
          .select("id, created_at")
          .single();
        inserted = retry.data;
        insertError = retry.error;
      }

      if (insertError) {
        if (insertError.code === "23505") {
          const isPhone = insertError.message?.includes("phone");
          setStatus("error");
          setErrorMessage(
            isPhone
              ? "Good news — that phone number is already on the waitlist."
              : "Good news — that email is already on the waitlist."
          );
          return;
        }
        throw insertError;
      }

      const [{ data: position }, { data: totalSignups }] = await Promise.all([
        supabase.rpc("get_queue_position", { signup_id: inserted.id }),
        supabase.rpc("get_total_signups"),
      ]);

      setResult({
        position: position ?? 1,
        referralLink: `${window.location.origin}${window.location.pathname}?ref=${inserted.id}`,
        totalSignups: totalSignups ?? 1,
      });
      setStatus("success");
    } catch {
      setStatus("error");
      setErrorMessage("Something went wrong on our side. Please try again.");
    }
  };

  const handleLookup = async (e) => {
    e.preventDefault();
    if (!lookupPhone.trim() || status === "loading") return;

    if (!isSupabaseConfigured) {
      setStatus("error");
      setErrorMessage("The waitlist isn't connected yet. Please try again a little later.");
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    try {
      const { data, error } = await supabase.rpc("find_my_spot", {
        p_phone: lookupPhone.trim(),
      });
      if (error) throw error;

      const row = data?.[0];
      if (!row) {
        setStatus("error");
        setErrorMessage("We couldn't find a signup with that number.");
        return;
      }

      setResult({
        position: row.queue_position ?? 1,
        referralLink: `${window.location.origin}${window.location.pathname}?ref=${row.id}`,
      });
      setStatus("success");
    } catch {
      setStatus("error");
      setErrorMessage("Something went wrong on our side. Please try again.");
    }
  };

  const shareText =
    "I just joined the waitlist for The Neighbourhood — the village, rebuilt. Join me:";

  const handleShare = async () => {
    if (!result) return;
    if (navigator.share) {
      try {
        await navigator.share({
          title: "The Neighbourhood",
          text: shareText,
          url: result.referralLink,
        });
        return;
      } catch {
        // user closed the share sheet — fall through to copy
      }
    }
    await navigator.clipboard.writeText(`${shareText} ${result.referralLink}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Join the village"
    >
      <div
        className="absolute inset-0 bg-charcoal/50 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="v3-enter relative w-full max-w-[28rem] bg-surface-cream rounded-[28px] shadow-2xl p-8 md:p-10">
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-5 right-5 text-warm-taupe hover:text-charcoal transition-colors"
        >
          <span className="material-symbols-outlined">close</span>
        </button>

        {status !== "success" && mode === "join" && (
          <>
            <p className="v3-eyebrow text-warm-taupe mb-4">
              Step {joinStep === "child" ? "1" : "2"} of 2
            </p>
            {joinStep === "child" ? (
              <>
                <h3 className="v3-h3 text-charcoal mb-3">Start with your child.</h3>
                <p className="text-on-surface-variant leading-relaxed mb-7">
                  A little context helps us shape the village around the stage
                  your family is in.
                </p>

                <form onSubmit={handleChildStep} className="space-y-4">
                  <label className="block text-sm font-medium text-charcoal px-1" htmlFor="waitlist-child-stage">
                    What is your child's age or due date?
                  </label>
                  <select
                    id="waitlist-child-stage"
                    ref={inputRef}
                    required
                    value={childStage}
                    onChange={(e) => setChildStage(e.target.value)}
                    className="w-full px-5 py-3.5 rounded-full border border-warm-taupe/25 bg-white/60 text-charcoal focus:outline-none focus:ring-2 focus:ring-warm-taupe/40 focus:border-transparent"
                  >
                    <option value="">Select a stage</option>
                    {CHILD_STAGES.map((stage) => (
                      <option key={stage} value={stage}>{stage}</option>
                    ))}
                  </select>

                  <label className="sr-only" htmlFor="waitlist-child-name">Child's name or nickname</label>
                  <input
                    id="waitlist-child-name"
                    type="text"
                    value={childName}
                    onChange={(e) => setChildName(e.target.value)}
                    placeholder="Child's name / nickname (optional)"
                    className="w-full px-5 py-3.5 rounded-full border border-warm-taupe/25 bg-white/60 text-charcoal placeholder:text-on-surface-variant/50 focus:outline-none focus:ring-2 focus:ring-warm-taupe/40 focus:border-transparent"
                  />

                  <button
                    type="submit"
                    className="w-full bg-charcoal text-surface-cream px-8 py-3.5 rounded-full font-medium text-lg hover:opacity-90 transition-opacity"
                  >
                    Continue
                  </button>
                </form>
              </>
            ) : (
              <>
                <h3 className="v3-h3 text-charcoal mb-3">
                  Save your family's place.
                </h3>
                <p className="text-on-surface-variant leading-relaxed mb-7">
                  Be one of the founding families. What we build, we build with
                  you.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <label className="sr-only" htmlFor="waitlist-name">Parent name</label>
                  <input
                    id="waitlist-name"
                    ref={inputRef}
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Parent name"
                    className="w-full px-5 py-3.5 rounded-full border border-warm-taupe/25 bg-white/60 text-charcoal placeholder:text-on-surface-variant/50 focus:outline-none focus:ring-2 focus:ring-warm-taupe/40 focus:border-transparent"
                  />
                  <label className="sr-only" htmlFor="waitlist-phone">Phone number</label>
                  <input
                    id="waitlist-phone"
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Phone number"
                    className="w-full px-5 py-3.5 rounded-full border border-warm-taupe/25 bg-white/60 text-charcoal placeholder:text-on-surface-variant/50 focus:outline-none focus:ring-2 focus:ring-warm-taupe/40 focus:border-transparent"
                  />
                  <p className="-mt-2 px-1 text-xs leading-relaxed text-on-surface-variant/70">
                    We'll only use this for your waitlist spot and important
                    launch updates. No spam, no selling your number.
                  </p>
                  <label className="sr-only" htmlFor="waitlist-email">Email address (optional)</label>
                  <input
                    id="waitlist-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    className="w-full px-5 py-3.5 rounded-full border border-warm-taupe/25 bg-white/60 text-charcoal placeholder:text-on-surface-variant/50 focus:outline-none focus:ring-2 focus:ring-warm-taupe/40 focus:border-transparent"
                  />
                  {status === "error" && (
                    <p className="text-sm text-error px-1" role="alert">{errorMessage}</p>
                  )}
                  <p className="px-1 text-xs leading-relaxed text-on-surface-variant/70">
                    By joining, you agree to hear from The Neighbourhood about
                    your place in the village. You can opt out anytime.
                  </p>
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="w-full bg-charcoal text-surface-cream px-8 py-3.5 rounded-full font-medium text-lg hover:opacity-90 transition-opacity disabled:opacity-60"
                  >
                    {status === "loading" ? "Saving your place…" : "Join the Village"}
                  </button>
                </form>

                <button
                  type="button"
                  onClick={() => {
                    setStatus("form");
                    setErrorMessage("");
                    setJoinStep("child");
                    window.setTimeout(() => inputRef.current?.focus(), 0);
                  }}
                  className="w-full text-center text-sm text-on-surface-variant/70 hover:text-charcoal transition-colors mt-5"
                >
                  Back to child details
                </button>
              </>
            )}

            <button
              type="button"
              onClick={() => {
                setMode("lookup");
                setJoinStep("child");
                setErrorMessage("");
                setStatus("form");
              }}
              className="w-full text-center text-sm text-on-surface-variant/70 hover:text-charcoal transition-colors mt-6"
            >
              Already joined? Find your spot
            </button>
          </>
        )}

        {status !== "success" && mode === "lookup" && (
          <>
            <p className="v3-eyebrow text-warm-taupe mb-4">Welcome back</p>
            <h3 className="v3-h3 text-charcoal mb-3">Find your spot.</h3>
            <p className="text-on-surface-variant leading-relaxed mb-7">
              Enter the phone number you joined with, and we'll bring back
              your place in line and your referral link.
            </p>

            <form onSubmit={handleLookup} className="space-y-4">
              <label className="sr-only" htmlFor="waitlist-lookup-phone">Phone number</label>
              <input
                id="waitlist-lookup-phone"
                type="tel"
                required
                value={lookupPhone}
                onChange={(e) => setLookupPhone(e.target.value)}
                placeholder="Phone number"
                className="w-full px-5 py-3.5 rounded-full border border-warm-taupe/25 bg-white/60 text-charcoal placeholder:text-on-surface-variant/50 focus:outline-none focus:ring-2 focus:ring-warm-taupe/40 focus:border-transparent"
              />
              {status === "error" && (
                <p className="text-sm text-error px-1" role="alert">{errorMessage}</p>
              )}
              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full bg-charcoal text-surface-cream px-8 py-3.5 rounded-full font-medium text-lg hover:opacity-90 transition-opacity disabled:opacity-60"
              >
                {status === "loading" ? "Looking…" : "Find my spot"}
              </button>
            </form>

            <button
              type="button"
              onClick={() => {
                setMode("join");
                setErrorMessage("");
                setStatus("form");
              }}
              className="w-full text-center text-sm text-on-surface-variant/70 hover:text-charcoal transition-colors mt-6"
            >
              Back to join the waitlist
            </button>
          </>
        )}

        {status === "success" && result && (
          <div className="text-center">
            <p className="v3-eyebrow text-warm-taupe mb-4">
              {mode === "lookup" ? "Welcome back, neighbour" : "Welcome, neighbour"}
            </p>
            <h3 className="v3-h2 text-charcoal mb-3">
              You're #{result.position} in line.
            </h3>
            <p className="text-on-surface-variant leading-relaxed mb-7">
              Know other parents who'd want this? Each neighbour you invite
              moves you up {REFERRAL_BOOST} places.
            </p>
            <button
              onClick={handleShare}
              className="w-full bg-charcoal text-surface-cream px-8 py-3.5 rounded-full font-medium text-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-xl" aria-hidden="true">share</span>
              {copied ? "Link copied" : "Invite your neighbours"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
