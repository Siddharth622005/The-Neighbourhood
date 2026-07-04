import { useEffect, useRef, useState } from "react";
import { supabase, isSupabaseConfigured } from "../../lib/supabaseClient.js";

const REFERRAL_BOOST = 10;

/**
 * Same waitlist flow as the shared dialog (Supabase insert + queue position
 * + referral link), redesigned to match the V3 voice: calmer copy, one
 * decision per screen, honest microcopy.
 */
export default function WaitlistDialogV3({ open, onClose }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("form"); // form | loading | success | error
  const [errorMessage, setErrorMessage] = useState("");
  const [result, setResult] = useState(null);
  const [copied, setCopied] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (!open) {
      setStatus("form");
      setEmail("");
      setErrorMessage("");
      setCopied(false);
      return;
    }
    const onKeyDown = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKeyDown);
    // Move focus into the dialog when it opens.
    inputRef.current?.focus();
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || status === "loading") return;

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

      const { data: inserted, error: insertError } = await supabase
        .from("waitlist")
        .insert({
          email: email.trim().toLowerCase(),
          referred_by: refId ? Number(refId) : null,
        })
        .select("id, created_at")
        .single();

      if (insertError) {
        if (insertError.code === "23505") {
          setStatus("error");
          setErrorMessage("Good news — that email is already on the waitlist.");
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
      aria-label="Join the waitlist"
    >
      <div
        className="absolute inset-0 bg-charcoal/50 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="v3-enter relative w-full max-w-md bg-surface-cream rounded-[28px] shadow-2xl p-8 md:p-10">
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-5 right-5 text-warm-taupe hover:text-charcoal transition-colors"
        >
          <span className="material-symbols-outlined">close</span>
        </button>

        {status !== "success" && (
          <>
            <p className="v3-eyebrow text-warm-taupe mb-4">Join the waitlist</p>
            <h3 className="v3-h3 text-charcoal mb-3">
              Save your family's place.
            </h3>
            <p className="text-on-surface-variant leading-relaxed mb-7">
              Leave your email and we'll write to you when The Neighbourhood
              opens near you. Nothing else — promise.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <label className="sr-only" htmlFor="waitlist-email">Email address</label>
              <input
                id="waitlist-email"
                ref={inputRef}
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
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
                {status === "loading" ? "Saving your place…" : "Join the Waitlist"}
              </button>
            </form>
          </>
        )}

        {status === "success" && result && (
          <div className="text-center">
            <p className="v3-eyebrow text-warm-taupe mb-4">Welcome, neighbour</p>
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
