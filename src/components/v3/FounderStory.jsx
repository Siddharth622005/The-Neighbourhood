import useScrollReveal from "../useScrollReveal.js";
import WordReveal from "../WordReveal.jsx";

/**
 * The trust beat. We don't have advisor headshots or press logos, and we
 * won't invent them. What we do have is true: a real founder's story, told
 * plainly.
 */
export default function FounderStory() {
  const story = useScrollReveal(0.2);
  const quote = useScrollReveal(0.35);

  return (
    <section id="story" className="py-section-gap md:py-32 px-margin-mobile md:px-gutter max-w-container-max mx-auto">
      <div className="max-w-2xl mx-auto">
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
    </section>
  );
}
