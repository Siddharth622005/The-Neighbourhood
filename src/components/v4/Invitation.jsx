import { Container } from "../ui/Section.jsx";
import AccentLabel from "../ui/AccentLabel.jsx";
import Button from "../ui/Button.jsx";
import useScrollReveal from "../useScrollReveal.js";

/**
 * Section 7 — The Invitation.
 *
 * The closing ask, on a Light Amber panel at `rounded` (30px) — the
 * system's large-surface corner. The reference never inverts to a dark
 * card; it warms the surface instead, which is what this does. Two soft
 * palette blobs sit behind it, the same shape vocabulary as the hero, so
 * the page opens and closes on the same visual idea.
 *
 * CTA label matches the hero deliberately: by here the parent has been
 * asked the same simple thing three times, in three different emotional
 * states. No countdown, no "spots remaining", no urgency device.
 */
export default function Invitation({ onJoin }) {
  const { ref, inView } = useScrollReveal(0.2);

  return (
    <section id="invitation" className="pb-3xl pt-2xl">
      <Container>
        <div
          ref={ref}
          className={`reveal ${inView ? "in-view" : ""} relative overflow-hidden rounded-rounded bg-light-amber px-lg py-3xl text-center md:px-2xl`}
        >
          {/* The blobs live in their own clipping layer pinned to the
              panel's box. An absolutely positioned child that extends
              past its parent still counts toward scrollHeight, which
              would make the panel itself scrollable when the button
              inside receives focus. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 overflow-hidden"
          >
            <div className="blob-float absolute -right-2xl -top-2xl h-[280px] w-[280px] rounded-circle bg-white/40" />
            <div className="blob-float-slow absolute -bottom-2xl -left-2xl h-[240px] w-[240px] rounded-circle bg-warm-orange/20" />
          </div>

          <div className="relative z-10 mx-auto max-w-measure-lg">
            <AccentLabel tone="deep-purple">An invitation</AccentLabel>

            <h2 className="type-section-heading mt-md text-deep-purple">
              There&rsquo;s a place here for your family.
            </h2>

            <p className="type-body-large mx-auto mt-lg max-w-measure text-slate-blue">
              Be among the founding families of The Neighbourhood. We&rsquo;ll
              write to you as the doors open.
            </p>

            <div className="mt-xl">
              <Button size="lg" variant="secondary" onClick={onJoin}>
                Start with your child
              </Button>
            </div>

            <p className="type-caption mt-md font-normal text-slate-blue">
              Less than 30 seconds &middot; Free during early access &middot; A
              quiet inbox, promised
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
