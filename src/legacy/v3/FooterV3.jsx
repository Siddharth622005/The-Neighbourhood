import { Link } from "react-router-dom";
import LogoIcon from "../../components/LogoIcon.jsx";

const LEGAL_LINKS = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms & Conditions", href: "/terms-and-conditions" },
  { label: "Cookie Policy", href: "/cookie-policy" },
  { label: "Disclaimer", href: "/disclaimer" },
];

const LINKEDIN_URL = "https://www.linkedin.com/company/theneighbourhud/";

function LinkedInIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z" />
    </svg>
  );
}

export default function FooterV3({ minimal = false }) {
  if (minimal) {
    return (
      <footer className="pb-10 px-margin-mobile md:px-gutter">
        <div className="max-w-container-max mx-auto border-t border-warm-taupe/10 pt-8 text-center">
          <p className="text-xs text-on-surface-variant/60">
            The Neighbourhood &middot; A little support for today.
          </p>
        </div>
      </footer>
    );
  }

  return (
    <footer className="pt-20 pb-10 px-margin-mobile md:px-gutter">
      <div className="max-w-container-max mx-auto flex flex-col items-center gap-8">
        <div className="flex flex-col items-center gap-4">
          <LogoIcon className="w-12 h-12" />
          <p className="font-semibold tracking-tight text-charcoal text-xl">
            The Neighbourhood
          </p>
          <p className="v3-serif text-warm-taupe text-lg">
            Safe Spaces, Warm Hearts, Bright Futures.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="mailto:founders@theneighbourhood.co.in"
              className="text-sm text-on-surface-variant hover:text-charcoal transition-colors duration-200"
            >
              founders@theneighbourhood.co.in
            </a>

            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="The Neighbourhood on LinkedIn"
              className="text-on-surface-variant hover:text-charcoal transition-colors duration-200"
            >
              <LinkedInIcon className="w-5 h-5" />
            </a>
          </div>
        </div>

        <nav
          aria-label="Legal"
          className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 border-t border-warm-taupe/10 pt-8 w-full"
        >
          {LEGAL_LINKS.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className="text-xs text-on-surface-variant/70 hover:text-charcoal transition-colors duration-200"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <p className="text-xs text-on-surface-variant/60 w-full text-center">
          &copy; {new Date().getFullYear()} The Neighbourhood &middot; Gurugram, India
        </p>
      </div>
    </footer>
  );
}
