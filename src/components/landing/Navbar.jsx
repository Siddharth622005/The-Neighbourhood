export default function Navbar() {
  const navLinks = [
    { label: "Our Mission", href: "#mission", active: true },
    { label: "The Aangan", href: "#aangan" },
    { label: "TRICK", href: "#trick" },
    { label: "Community", href: "#community" },
  ];

  return (
    <nav className="flex justify-between items-center w-full px-margin-mobile md:px-gutter max-w-container-max mx-auto h-20 sticky top-0 z-50 bg-[#f5ede4]/90 backdrop-blur-md border-b border-[#8B7355]/12 shadow-[0_1px_12px_rgba(139,115,85,0.08)]">
      <div className="flex items-center gap-3">
        <img src="/logo.png" alt="The Neighbourhood logo" className="w-10 h-10 object-contain" />
        <span className="text-headline-h3 font-headline-h3 font-bold text-primary dark:text-on-surface">
          The Neighbourhood
        </span>
      </div>

      <div className="hidden md:flex items-center gap-stack-lg">
        {navLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className={
              link.active
                ? "font-label-sm text-label-sm text-primary dark:text-on-surface border-b-2 border-secondary font-bold pb-1 hover:text-secondary transition-colors duration-200"
                : "font-label-sm text-label-sm text-on-surface-variant dark:text-outline hover:text-secondary transition-colors duration-200"
            }
          >
            {link.label}
          </a>
        ))}
      </div>

      <button className="bg-primary text-on-primary px-8 py-3 rounded-2xl font-body-strong transition-transform active:scale-95 duration-150">
        Join the Waitlist
      </button>
    </nav>
  );
}
