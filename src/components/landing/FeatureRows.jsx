import ImagePlaceholder from "../ImagePlaceholder.jsx";
import useScrollReveal from "../useScrollReveal.js";

function RevealCard({ className = "", children }) {
  const { ref, inView } = useScrollReveal();
  return (
    <div ref={ref} className={`bento-card reveal ${inView ? "in-view" : ""} ${className}`}>
      {children}
    </div>
  );
}

export default function FeatureRows() {
  return (
    <section className="py-section-gap px-margin-mobile md:px-gutter max-w-container-max mx-auto">
      <div className="grid md:grid-cols-12 gap-8">
        {/* Feature 01 - AI Copilot */}
        <RevealCard className="md:col-span-7 rounded-[32px] p-10 flex flex-col justify-between min-h-[400px]">
          <div>
            <span className="font-headline-h1 text-soft-sand/40 font-bold block mb-4">01</span>
            <h3 className="font-headline-h2 text-headline-h2 text-warm-taupe mb-4">AI Copilot</h3>
            <p className="text-on-surface-variant text-lg max-w-md">
              Your parenting companion for every small win and big question. Powered by experts,
              delivered with empathy.
            </p>
          </div>
          <div className="mt-8 flex items-center gap-stack-md">
            <button className="flex items-center gap-2 text-secondary font-bold hover:underline">
              Learn how it works <span className="material-symbols-outlined">arrow_forward</span>
            </button>
          </div>
        </RevealCard>

        <div className="md:col-span-5 rounded-[32px] bg-secondary-container/20 overflow-hidden min-h-[400px]">
          <ImagePlaceholder
            className="w-full h-full"
            alt="Mobile chat interface mockup: AI assistant responding to a parent's question about sleep routines, warm cream and charcoal tones, rounded chat bubbles"
            icon="chat_bubble"
          />
        </div>

        {/* Feature 02 - Physical Spaces */}
        <div className="md:col-span-5 rounded-[32px] bg-surface-dim/30 overflow-hidden min-h-[400px] order-4 md:order-3">
          <ImagePlaceholder
            className="w-full h-full"
            alt="The Aangan play space interior: wooden play structures, low bookshelves, large windows, soft taupe cream and olive palette"
            icon="cottage"
          />
        </div>

        <RevealCard className="md:col-span-7 rounded-[32px] p-10 flex flex-col justify-between min-h-[400px] order-3 md:order-4">
          <div>
            <span className="font-headline-h1 text-soft-sand/40 font-bold block mb-4">02</span>
            <h3 className="font-headline-h2 text-headline-h2 text-warm-taupe mb-4">
              Physical Spaces
            </h3>
            <p className="text-on-surface-variant text-lg max-w-md">
              The Aangan and The Verandah: Play-based havens designed for children's discovery
              and parents' peace of mind.
            </p>
          </div>
          <div className="mt-8">
            <div className="flex gap-2">
              <span className="px-4 py-2 bg-surface-container rounded-full text-warm-taupe font-label-sm">
                Safe Havens
              </span>
              <span className="px-4 py-2 bg-surface-container rounded-full text-warm-taupe font-label-sm">
                Play-Based
              </span>
            </div>
          </div>
        </RevealCard>

        {/* Feature 03 - Community */}
        <RevealCard
          id="community"
          className="md:col-span-12 rounded-[32px] p-10 md:p-16 flex flex-col md:flex-row gap-stack-lg items-center order-5"
        >
          <div className="md:w-1/2">
            <span className="font-headline-h1 text-soft-sand/40 font-bold block mb-4">03</span>
            <h3 className="font-headline-h2 text-headline-h2 text-warm-taupe mb-4">Community</h3>
            <p className="text-on-surface-variant text-lg">
              Hyper-local support that turns neighbors into friends. Join curated circles based on
              interests, neighborhood, or child age.
            </p>
            <div className="mt-8 flex -space-x-3">
              <div className="w-12 h-12 rounded-full border-2 border-surface-cream bg-soft-sand overflow-hidden">
                <ImagePlaceholder
                  className="w-full h-full"
                  alt="Portrait illustration of a friendly parent smiling"
                  icon="person"
                />
              </div>
              <div className="w-12 h-12 rounded-full border-2 border-surface-cream bg-warm-taupe overflow-hidden">
                <ImagePlaceholder
                  className="w-full h-full"
                  alt="Portrait illustration of a father holding a toddler"
                  icon="person"
                />
              </div>
              <div className="w-12 h-12 rounded-full border-2 border-surface-cream bg-secondary overflow-hidden flex items-center justify-center text-on-secondary text-xs">
                +4k
              </div>
            </div>
          </div>

          <div className="md:w-1/2 w-full h-64 md:h-80 bg-surface-variant rounded-2xl overflow-hidden relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="material-symbols-outlined text-secondary text-6xl opacity-30">
                groups
              </span>
            </div>
            <ImagePlaceholder
              className="w-full h-full opacity-80"
              alt="Stylized map illustration of a modern neighbourhood with green spaces, walking paths, community centers"
              icon="map"
            />
          </div>
        </RevealCard>
      </div>
    </section>
  );
}
