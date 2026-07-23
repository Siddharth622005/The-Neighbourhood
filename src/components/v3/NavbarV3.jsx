import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LogoIcon from "../LogoIcon.jsx";

// Anchor to homepage sections. Prefixed with "/" so the links resolve
// correctly even when the navbar is shown on /today.
const LINKS = [
  { label: "Why we exist", href: "/#why" },
  { label: "What we're building", href: "/#inside" },
  { label: "Our story", href: "/#story" },
  { label: "FAQ", href: "/#faq" },
];

/**
 * Quiet, full-width bar. Transparent while the hero is on screen; once you
 * scroll, it gains a soft cream veil and a hairline so content can pass
 * underneath without noise. The vector mark draws itself in on first load
 * (.logo-draw, see index.css).
 *
 * `links` and `homePath` default to the v3 homepage, so existing callers
 * are unaffected. Pages served from another route (e.g. /next) pass their
 * own, otherwise every nav click would bounce the visitor back to "/".
 */
export default function NavbarV3({
  onJoin,
  onLogoClick,
  links = LINKS,
  homePath = "/",
  todayLabel = "Today",
}) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const logoPath =
    typeof window !== "undefined" && window.location.pathname.startsWith("/next")
      ? "/next"
      : homePath;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock background scroll while the mobile menu overlay is open.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  // The backdrop-filter/blur lives on this inner bar, not on <nav> itself —
  // filter/backdrop-filter on an ancestor becomes the containing block for
  // position:fixed descendants, which would collapse the full-height mobile
  // overlay below (nested inside <nav>) down to the bar's own ~72px height.
  return (
    <nav className="fixed top-0 inset-x-0 z-50">
      <div
        className={`transition-all duration-500 ${
          scrolled || menuOpen
            ? "bg-surface-cream/90 backdrop-blur-md border-b border-warm-taupe/15"
            : "bg-transparent border-b border-transparent"
        }`}
      >
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter h-[72px] flex items-center justify-between">
        <Link
          to={logoPath}
          onClick={(e) => {
            closeMenu();
            onLogoClick?.(e);
          }}
          className="flex items-center gap-3 group"
          aria-label="The Neighbourhood — back to home"
        >
          <LogoIcon className="logo-draw w-8 h-8 md:w-9 md:h-9 flex-shrink-0" />
          <span className="font-semibold tracking-tight text-charcoal text-base md:text-lg whitespace-nowrap">
            The Neighbourhood
          </span>
        </Link>

        <div className="hidden lg:flex items-center gap-10">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-charcoal/70 hover:text-charcoal transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-4 md:gap-8">
          {todayLabel ? (
            <Link
              to="/today"
              className="hidden lg:inline text-sm text-charcoal/70 hover:text-charcoal transition-colors duration-200"
            >
              {todayLabel}
            </Link>
          ) : null}

          <button
            onClick={onJoin}
            className="hidden sm:inline-flex bg-charcoal text-surface-cream text-sm font-medium px-4 md:px-6 py-2.5 rounded-full whitespace-nowrap hover:opacity-90 hover:-translate-y-px transition-all duration-200"
          >
            Join the Village
          </button>

          {/* Hamburger — only ever visible below lg, where the link row
              above is hidden. Toggles the full-screen overlay below. */}
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            className="lg:hidden relative w-9 h-9 flex items-center justify-center flex-shrink-0"
          >
            <span
              className={`absolute w-5 h-[1.5px] bg-charcoal transition-all duration-300 ${
                menuOpen ? "rotate-45" : "-translate-y-[5px]"
              }`}
            />
            <span
              className={`absolute w-5 h-[1.5px] bg-charcoal transition-all duration-300 ${
                menuOpen ? "-rotate-45" : "translate-y-[5px]"
              }`}
            />
          </button>
        </div>
      </div>
      </div>

      {/* Full-screen mobile menu overlay. */}
      <div
        className={`lg:hidden fixed top-[72px] left-0 right-0 bottom-0 bg-surface-cream transition-opacity duration-300 ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="h-full flex flex-col px-margin-mobile pt-10 pb-10">
          <div className="flex flex-col gap-2">
            {links.map((link, i) => (
              <a
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                className={`v3-fade ${menuOpen ? "in-view" : ""} v3-serif text-charcoal text-3xl py-3 border-b border-warm-taupe/15`}
                style={{ transitionDelay: menuOpen ? `${i * 60}ms` : "0ms" }}
              >
                {link.label}
              </a>
            ))}
            {todayLabel ? (
              <Link
                to="/today"
                onClick={closeMenu}
                className={`v3-fade ${menuOpen ? "in-view" : ""} v3-serif text-charcoal text-3xl py-3 border-b border-warm-taupe/15`}
                style={{ transitionDelay: menuOpen ? `${links.length * 60}ms` : "0ms" }}
              >
                {todayLabel}
              </Link>
            ) : null}
          </div>

          <button
            onClick={() => {
              closeMenu();
              onJoin?.();
            }}
            className="mt-auto bg-charcoal text-surface-cream text-base font-medium px-6 py-4 rounded-full hover:opacity-90 transition-all duration-200"
          >
            Join the Village
          </button>
        </div>
      </div>
    </nav>
  );
}
