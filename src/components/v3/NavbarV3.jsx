import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LogoIcon from "../LogoIcon.jsx";

const LINKS = [
  { label: "Why we exist", href: "#why" },
  { label: "What we're building", href: "#inside" },
  { label: "Our story", href: "#story" },
  { label: "FAQ", href: "#faq" },
];

/**
 * Quiet, full-width bar. Transparent while the hero is on screen; once you
 * scroll, it gains a soft cream veil and a hairline so content can pass
 * underneath without noise. The vector mark draws itself in on first load
 * (.logo-draw, see index.css).
 */
export default function NavbarV3({ onJoin }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-surface-cream/90 backdrop-blur-md border-b border-warm-taupe/15"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter h-[72px] flex items-center justify-between">
        <a href="#top" className="flex items-center gap-3 group" aria-label="The Neighbourhood — back to top">
          <LogoIcon className="logo-draw w-8 h-8 md:w-9 md:h-9 flex-shrink-0" />
          <span className="font-semibold tracking-tight text-charcoal text-base md:text-lg whitespace-nowrap">
            The Neighbourhood
          </span>
        </a>

        <div className="hidden lg:flex items-center gap-10">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-charcoal/70 hover:text-charcoal transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
          <Link
            to="/today"
            className="text-sm text-charcoal/70 hover:text-charcoal transition-colors duration-200"
          >
            Today
          </Link>
          <Link
            to="/journey"
            className="text-sm text-charcoal/70 hover:text-charcoal transition-colors duration-200"
          >
            Your child&rsquo;s journey
          </Link>
        </div>

        <button
          onClick={onJoin}
          className="bg-charcoal text-surface-cream text-sm font-medium px-4 md:px-6 py-2.5 rounded-full whitespace-nowrap hover:opacity-90 hover:-translate-y-px transition-all duration-200"
        >
          <span className="hidden sm:inline">Join the Village</span>
          <span className="sm:hidden">Join</span>
        </button>
      </div>
    </nav>
  );
}
