import LogoIcon from "../LogoIcon.jsx";
import AccentLabel from "../ui/AccentLabel.jsx";
import { Container } from "../ui/Section.jsx";

/**
 * Footer sits on the Light Amber wash — the token whose role DESIGN.md
 * names as "footer accent areas". Divider is Warm Orange at low opacity,
 * matching the dashed-outline vocabulary used elsewhere.
 */
export default function FooterV3({ minimal = false }) {
  if (minimal) {
    return (
      <footer className="bg-light-amber py-lg">
        <Container className="text-center">
          <p className="type-caption font-normal text-slate-blue">
            The Neighbourhood &middot; A little support for today.
          </p>
        </Container>
      </footer>
    );
  }

  return (
    <footer className="bg-light-amber py-2xl">
      <Container className="flex flex-col items-center gap-lg">
        <LogoIcon className="h-2xl w-2xl" />

        <p className="type-sub-heading text-deep-purple">The Neighbourhood</p>

        <AccentLabel className="text-center">
          Safe Spaces, Warm Hearts, Bright Futures
        </AccentLabel>

        <a
          href="mailto:founders@theneighbourhood.co.in"
          className="type-body-regular text-slate-blue transition-colors duration-200 hover:text-charcoal"
        >
          founders@theneighbourhood.co.in
        </a>

        <p className="type-caption w-full border-t border-warm-orange/30 pt-lg text-center font-normal text-slate-blue">
          &copy; {new Date().getFullYear()} The Neighbourhood &middot; Gurugram,
          India
        </p>
      </Container>
    </footer>
  );
}
