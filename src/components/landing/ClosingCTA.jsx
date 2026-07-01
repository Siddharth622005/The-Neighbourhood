import { useState } from "react";

export default function ClosingCTA() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: wire up to waitlist endpoint
    console.log("Waitlist signup:", email);
  };

  return (
    <section className="py-24 bg-charcoal text-surface-cream rounded-[48px] m-margin-mobile md:mx-gutter overflow-hidden relative">
      {/* Background dot pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <pattern id="dotPattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1" fill="currentColor" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#dotPattern)" />
        </svg>
      </div>
      {/* Blob top-left */}
      <div className="blob-float-slow pointer-events-none absolute -top-20 -left-20 w-72 h-72 text-soft-sand opacity-10" aria-hidden="true">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <path d="M48,-57C60.6,-46.3,68.1,-29.6,70.2,-12.2C72.3,5.2,69,23.3,59.4,37.1C49.8,50.9,33.9,60.4,16.1,65.5C-1.7,70.6,-21.4,71.3,-37.4,63.7C-53.4,56.1,-65.7,40.2,-70.1,22.5C-74.5,4.8,-71,-14.7,-61,-29.8C-51,-44.9,-34.5,-55.6,-18,-62.5C-1.5,-69.4,15,-67.7,29.3,-62.3C43.6,-56.9,55.7,-47.9,48,-57Z" fill="currentColor" transform="translate(100 100)" />
        </svg>
      </div>
      {/* Blob bottom-right */}
      <div className="blob-float pointer-events-none absolute -bottom-16 -right-16 w-80 h-80 text-warm-taupe opacity-10" aria-hidden="true">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <path d="M40.8,-47.6C52.9,-37.6,62.5,-23.8,65.4,-8.1C68.3,7.6,64.5,25.2,54.3,37.5C44.1,49.8,27.5,56.8,9.7,61C-8.1,65.2,-27.1,66.6,-41.8,58.4C-56.5,50.2,-66.9,32.4,-68.8,14C-70.7,-4.4,-64.1,-23.4,-52.1,-37.1C-40.1,-50.8,-22.7,-59.2,-4.1,-55.6C14.5,-52,28.7,-57.6,40.8,-47.6Z" fill="currentColor" transform="translate(100 100)" />
        </svg>
      </div>

      <div className="max-w-3xl mx-auto text-center relative z-10 px-8">
        <h2 className="font-headline-h2 text-headline-h2 text-soft-sand mb-6">Ready to join the village?</h2>
        <p className="text-primary-fixed mb-10 text-lg">
          Spaces in our local hubs are curated to maintain the warmth of the community. Join the
          waitlist to find your place in the neighborhood.
        </p>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-stack-md justify-center"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email address"
            required
            className="bg-white/10 border-white/20 text-white rounded-2xl px-6 py-4 w-full sm:w-80 focus:ring-2 focus:ring-soft-sand focus:border-transparent placeholder:text-white/50"
          />
          <button
            type="submit"
            className="bg-soft-sand text-charcoal px-10 py-4 rounded-2xl font-body-strong hover:bg-white transition-colors"
          >
            Join The Village
          </button>
        </form>
      </div>
    </section>
  );
}
