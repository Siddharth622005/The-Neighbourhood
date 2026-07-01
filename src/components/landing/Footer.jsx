export default function Footer() {
  const navLinks = ["Our Mission", "The Aangan", "TRICK", "Community"];
  const legalLinks = ["Privacy Policy", "Terms of Service", "Contact Us"];

  return (
    <footer className="bg-surface-container dark:bg-inverse-surface border-t border-outline-variant/20 w-full py-section-gap px-margin-mobile md:px-gutter max-w-container-max mx-auto flex flex-col items-center gap-stack-lg">
      <div className="flex flex-col items-center gap-4">
        <img src="/logo.png" alt="The Neighbourhood logo" className="w-16 h-16 object-contain" />
        <div className="font-tagline-handwritten text-[32px] text-secondary dark:text-secondary-fixed-dim">
          The Neighbourhood
        </div>
        <p className="font-tagline-handwritten text-tagline-handwritten text-soft-sand uppercase tracking-widest text-center">
          SAFE SPACES. WARM HEARTS. BRIGHT FUTURES.
        </p>
      </div>

      <nav className="flex flex-wrap justify-center gap-stack-lg">
        {navLinks.map((label) => (
          <a
            key={label}
            href="#"
            className="font-label-sm text-label-sm text-on-surface-variant dark:text-outline hover:text-primary transition-colors"
          >
            {label}
          </a>
        ))}
      </nav>

      <div className="flex flex-wrap justify-center gap-stack-md border-t border-soft-sand/10 pt-stack-lg w-full">
        {legalLinks.map((label) => (
          <a
            key={label}
            href="#"
            className="text-xs text-on-surface-variant hover:text-primary"
          >
            {label}
          </a>
        ))}
      </div>

      <p className="text-xs text-on-surface-variant opacity-60">
        © {new Date().getFullYear()} The Neighbourhood. All rights reserved.
      </p>
    </footer>
  );
}
