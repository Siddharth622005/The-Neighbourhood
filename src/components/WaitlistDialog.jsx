import { useEffect, useState } from "react";
import { supabase, isSupabaseConfigured } from "../lib/supabaseClient.js";

const REFERRAL_BOOST = 10;

export default function WaitlistDialog({ open, onClose }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("form"); // form | loading | success | error
  const [errorMessage, setErrorMessage] = useState("");
  const [result, setResult] = useState(null); // { position, effectivePosition, referralLink, totalSignups }
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!open) {
      setStatus("form");
      setEmail("");
      setErrorMessage("");
      setCopied(false);
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || status === "loading") return;

    if (!isSupabaseConfigured) {
      setStatus("error");
      setErrorMessage(
        "The waitlist isn't fully connected yet. Please try again shortly."
      );
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
          setErrorMessage("That email is already on the waitlist.");
          return;
        }
        throw insertError;
      }

      const [{ data: position }, { data: totalSignups }] = await Promise.all([
        supabase.rpc("get_queue_position", { signup_id: inserted.id }),
        supabase.rpc("get_total_signups"),
      ]);

      const effectivePosition = Math.max(1, (position ?? 1) - 0);
      const referralLink = `${window.location.origin}${window.location.pathname}?ref=${inserted.id}`;

      setResult({
        position: position ?? 1,
        effectivePosition,
        referralLink,
        totalSignups: totalSignups ?? 1,
      });
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMessage("Something went wrong. Please try again.");
    }
  };

  const shareText =
    "I just joined The Neighbourhood's waitlist, a village for modern parenting. Join me:";

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
        // user cancelled, fall through to copy
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
    >
      <div
        className="absolute inset-0 bg-charcoal/50 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="relative w-full max-w-md bg-surface-cream rounded-[28px] shadow-2xl p-8 md:p-10">
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-5 right-5 text-warm-taupe hover:text-charcoal transition-colors"
        >
          <span className="material-symbols-outlined">close</span>
        </button>

        {status !== "success" && (
          <>
            <p className="font-tagline-handwritten text-tagline-handwritten text-soft-sand uppercase tracking-widest mb-3">
              Join the Waitlist
            </p>
            <h3 className="font-headline-h2 text-headline-h3 text-charcoal mb-3">
              Find your place in the village.
            </h3>
            <p className="text-on-surface-variant mb-6">
              Be among the founding families of The Neighbourhood. We'll let you know the moment we open near you.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="email"
                required
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full px-5 py-3.5 rounded-full border border-soft-sand/40 bg-surface-container-low text-charcoal placeholder:text-on-surface-variant/60 focus:outline-none focus:ring-2 focus:ring-warm-taupe/40"
              />
              {status === "error" && (
                <p className="text-sm text-red-600">{errorMessage}</p>
              )}
              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full bg-charcoal text-surface-cream px-8 py-3.5 rounded-full font-body-strong text-lg hover:opacity-90 transition-opacity disabled:opacity-60"
              >
                {status === "loading" ? "Joining..." : "Join the Waitlist"}
              </button>
            </form>
          </>
        )}

        {status === "success" && result && (
          <div className="text-center">
            <p className="font-tagline-handwritten text-tagline-handwritten text-soft-sand uppercase tracking-widest mb-3">
              Welcome to the village
            </p>
            <h3 className="font-headline-h2 text-headline-h2 text-charcoal mb-2">
              You're #{result.effectivePosition}
            </h3>
            <p className="text-on-surface-variant mb-6">
              You're the {result.effectivePosition === 1 ? "first" : `${result.effectivePosition}th`} family in the village.
              Invite neighbours to move up the line.
            </p>

            <button
              onClick={handleShare}
              className="w-full bg-charcoal text-surface-cream px-8 py-3.5 rounded-full font-body-strong text-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-xl">share</span>
              {copied ? "Link copied!" : "Invite Neighbours"}
            </button>
            <p className="text-xs text-on-surface-variant/70 mt-4">
              Each neighbour who joins moves you up {REFERRAL_BOOST} spots.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
