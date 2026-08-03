import { Link } from "react-router-dom";
import LogoIcon from "../LogoIcon.jsx";
import AccentLabel from "../ui/AccentLabel.jsx";
import { Container } from "../ui/Section.jsx";

const LEGAL_LINKS = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms & Conditions", href: "/terms-and-conditions" },
  { label: "Cookie Policy", href: "/cookie-policy" },
  { label: "Disclaimer", href: "/disclaimer" },
];

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

        <nav
          aria-label="Legal"
          className="flex flex-wrap items-center justify-center gap-x-lg gap-y-xs"
        >
          {LEGAL_LINKS.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className="type-caption font-normal text-slate-blue transition-colors duration-200 hover:text-charcoal"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <p className="type-caption w-full border-t border-warm-orange/30 pt-lg text-center font-normal text-slate-blue">
          &copy; {new Date().getFullYear()} The Neighbourhood &middot; Gurugram,
          India
        </p>
      </Container>
    </footer>
  );
}
