import useScrollReveal from "../useScrollReveal.js";
import WordReveal from "../WordReveal.jsx";

/**
 * The trust beat. We don't have advisor headshots or press logos, and we
 * won't invent them. What we do have is true: a real founder's story and a
 * real body of research. Told plainly, this is stronger than a logo wall.
 */
export default function FounderStory() {
  const story = useScrollReveal(0.2);
  const quote = useScrollReveal(0.35);
  const science = useScrollReveal(0.3);

  return (
    <section id="story" className="py-section-gap md:py-32 px-margin-mobile md:px-gutter max-w-container-max mx-auto">
      <div className="grid lg:grid-cols-12 gap-14 lg:gap-20">
        <div className="lg:col-span-7">
          <p className="v3-eyebrow text-warm-taupe mb-6">Our story</p>
          <WordReveal
            text="It started with a couple who couldn't find what their daughter needed."
            className="v3-h2 text-charcoal mb-10 max-w-xl"
          />

          <div
            ref={story.ref}
            className={`v3-fade ${story.inView ? "in-view" : ""} space-y-6 v3-body-lg text-on-surface-variant max-w-xl`}
          >
            <p>
              Like many parents in Gurugram, Sakshi and Rachit spent weeks
              visiting preschools for Mehr. They met passionate teachers.
              They saw well-run centres. They found warm caregivers. Never
              all three, never in one place.
            </p>
            <p>
              One evening, watching Mehr play, Sakshi remembered the
              neighbourhood she grew up in — where aunties and uncles looked
              out for every child, where you could knock on any door. And it
              landed: we haven't just lost our padosis. We've lost the
              entire village it takes to raise a child.
            </p>
            <p>So they started building it back.</p>
            <p>And then Rudr arrived.</p>
            <p>
              Suddenly they weren't just building for Mehr anymore — they
              were living the exact problem they'd set out to solve. Two
              children, one village missing, and a half-built answer in
              their hands. That's when it stopped being a project and
              started being urgent.
            </p>
            <p>
              Warm spaces where children belong. Neighbours who become
              familiar. And a quiet layer of guidance, so no parent ever has
              to figure it out in the dark — the way they once did.
            </p>
          </div>

          <blockquote
            ref={quote.ref}
            className={`v3-fade ${quote.inView ? "in-view" : ""} mt-12 border-l-2 border-soft-sand pl-8 max-w-xl`}
          >
            <p className="v3-serif text-2xl md:text-[1.75rem] leading-relaxed text-charcoal">
              &ldquo;We're not trying to bring back the past. We're rebuilding
              the village for today's families — one child, one parent, one
              family at a time.&rdquo;
            </p>
            <footer className="mt-4 text-sm font-medium text-warm-taupe">
              Sakshi &amp; Rachit, Founders
            </footer>
          </blockquote>
        </div>

        <div className="lg:col-span-5">
          <div
            ref={science.ref}
            className={`v3-fade ${science.inView ? "in-view" : ""} lg:sticky lg:top-28 rounded-[28px] bg-surface-container/50 border border-warm-taupe/10 p-8 md:p-10`}
          >
            <span className="material-symbols-outlined text-warm-taupe text-3xl mb-5 block" aria-hidden="true">
              biotech
            </span>
            <h3 className="v3-h3 text-charcoal mb-4">Grounded in real science</h3>
            <p className="text-on-surface-variant leading-relaxed">
              Our spaces and programs draw on real research into how calm,
              connected environments shape a child's developing mind and
              immune system alike. It's why The Aangan feels the way it does:
              not decorated to impress parents, but designed to regulate
              children.
            </p>
            <p className="text-on-surface-variant leading-relaxed mt-4">
              Not trends. Research.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
