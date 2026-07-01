export default function Mission() {
  return (
    <section
      id="mission"
      className="py-section-gap px-margin-mobile md:px-gutter max-w-3xl mx-auto text-center"
    >
      <div className="space-y-stack-md">
        <span className="material-symbols-outlined text-secondary text-4xl">favorite</span>
        <p className="font-headline-h2 text-headline-h2 text-warm-taupe leading-relaxed">
          We are rebuilding the village for modern life with play-based spaces for children,
          hyper-local communities for families, and tools to make parenting easier, because we
          believe the{" "}
          <span className="text-secondary italic">
            best thing you can do for a child is to take care of their parent.
          </span>
        </p>
      </div>
    </section>
  );
}
