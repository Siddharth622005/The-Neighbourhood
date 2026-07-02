import LogoIcon from "../LogoIcon.jsx";

const LINKS = [
  { label: "Why we exist", href: "#why" },
  { label: "What we're building", href: "#inside" },
  { label: "Our story", href: "#story" },
  { label: "FAQ", href: "#faq" },
];

export default function FooterV3() {
  return (
    <footer className="pt-20 pb-10 px-margin-mobile md:px-gutter">
      <div className="max-w-container-max mx-auto flex flex-col items-center gap-8">
        <div className="flex flex-col items-center gap-4">
          <LogoIcon className="w-12 h-12" />
          <p className="font-semibold tracking-tight text-charcoal text-xl">
            The Neighbourhood
          </p>
          <p className="v3-serif text-warm-taupe text-lg">
            safe spaces, warm hearts, bright futures.
          </p>
        </div>

        <nav className="flex flex-wrap justify-center gap-x-10 gap-y-3">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-on-surface-variant hover:text-charcoal transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <p className="text-xs text-on-surface-variant/60 border-t border-warm-taupe/10 pt-8 w-full text-center">
          &copy; {new Date().getFullYear()} The Neighbourhood &middot; Gurugram, India
        </p>
      </div>
    </footer>
  );
}
