import ImagePlaceholder from "../ImagePlaceholder.jsx";

export default function Hero() {
  return (
    <div className="relative">

      {/* Blob 1 — top left, soft sand */}
      <div className="blob-float pointer-events-none absolute -top-24 -left-24 w-80 h-80 text-soft-sand opacity-30" aria-hidden="true">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <path d="M48,-57C60.6,-46.3,68.1,-29.6,70.2,-12.2C72.3,5.2,69,23.3,59.4,37.1C49.8,50.9,33.9,60.4,16.1,65.5C-1.7,70.6,-21.4,71.3,-37.4,63.7C-53.4,56.1,-65.7,40.2,-70.1,22.5C-74.5,4.8,-71,-14.7,-61,-29.8C-51,-44.9,-34.5,-55.6,-18,-62.5C-1.5,-69.4,15,-67.7,29.3,-62.3C43.6,-56.9,55.7,-47.9,48,-57Z" fill="currentColor" transform="translate(100 100)" />
        </svg>
      </div>

      {/* Blob 2 — top right, warm taupe */}
      <div className="blob-float-slow pointer-events-none absolute -top-16 -right-20 w-96 h-96 text-warm-taupe opacity-15" aria-hidden="true">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <path d="M40.8,-47.6C52.9,-37.6,62.5,-23.8,65.4,-8.1C68.3,7.6,64.5,25.2,54.3,37.5C44.1,49.8,27.5,56.8,9.7,61C-8.1,65.2,-27.1,66.6,-41.8,58.4C-56.5,50.2,-66.9,32.4,-68.8,14C-70.7,-4.4,-64.1,-23.4,-52.1,-37.1C-40.1,-50.8,-22.7,-59.2,-4.1,-55.6C14.5,-52,28.7,-57.6,40.8,-47.6Z" fill="currentColor" transform="translate(100 100)" />
        </svg>
      </div>

      {/* Blob 3 — bottom right, soft sand */}
      <div className="blob-float pointer-events-none absolute -bottom-16 -right-16 w-64 h-64 text-soft-sand opacity-20" aria-hidden="true">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <path d="M44.7,-53.7C56.5,-44.3,63.1,-28.1,65.3,-11.2C67.5,5.7,65.3,23.3,56.6,36.3C47.9,49.3,32.7,57.7,15.8,62.4C-1.1,67,-19.7,67.9,-34.6,60.5C-49.5,53.1,-60.7,37.4,-65.2,19.8C-69.7,2.2,-67.5,-17.3,-58.4,-31.5C-49.3,-45.7,-33.3,-54.6,-17.2,-60.3C-1.1,-66,15.1,-68.5,29.2,-63.5C43.3,-58.5,32.9,-63.1,44.7,-53.7Z" fill="currentColor" transform="translate(100 100)" />
        </svg>
      </div>

      <section className="relative pt-12 pb-24 md:pt-20 md:pb-32 px-margin-mobile md:px-gutter max-w-container-max mx-auto">
        <div className="grid lg:grid-cols-2 gap-stack-lg items-center relative z-10">
          <div className="space-y-stack-md">
            <p className="font-tagline-handwritten text-tagline-handwritten text-soft-sand uppercase tracking-widest mb-4">
              an operating system for modern parenting
            </p>
            <h1 className="font-headline-h1 text-headline-h1 text-charcoal max-w-xl">
              Raising children was never meant to be done alone.
            </h1>
            <p className="text-on-surface-variant text-headline-h3 font-normal max-w-lg pb-4">
              Warm spaces where children truly belong. A community that holds you. Tools that stay with you long after the school day ends.
            </p>
            <button className="bg-charcoal text-surface-cream px-10 py-4 rounded-full font-body-strong text-lg hover:opacity-90 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 shadow-sm">
              Join the Waitlist
            </button>
          </div>

          <div className="relative hero-graphic-bg rounded-[40px] p-8 md:p-12">
            <div className="aspect-square w-full rounded-3xl overflow-hidden relative border border-soft-sand/20 bg-surface-container-low shadow-sm">
              <ImagePlaceholder
                className="w-full h-full"
                alt="Stylized Indian village courtyard (Aangan) with a central Banyan tree, soft cream and sand tones, children playing with wooden toys, parents talking in golden afternoon light"
                icon="park"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
