export default function Navbar() {
  const navLinks = [
    { label: "Our Mission", href: "#mission", active: true },
    { label: "The Aangan", href: "#aangan" },
    { label: "TRICK", href: "#trick" },
    { label: "Community", href: "#community" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full px-4 pt-3 pb-2">
      <div className="flex justify-between items-center max-w-container-max mx-auto bg-[#f5ede4]/90 backdrop-blur-md border border-[#8B7355]/15 shadow-[0_2px_16px_rgba(139,115,85,0.10)] rounded-2xl px-6 h-16">
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="The Neighbourhood logo" className="w-8 h-8 object-contain" />
          <span className="text-headline-h3 font-headline-h3 font-bold text-primary">
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
                  ? "font-label-sm text-label-sm text-primary border-b-2 border-secondary font-bold pb-1 hover:text-secondary transition-colors duration-200"
                  : "font-label-sm text-label-sm text-on-surface-variant hover:text-secondary transition-colors duration-200"
              }
            >
              {link.label}
            </a>
          ))}
        </div>

        <button className="bg-primary text-on-primary px-6 py-2.5 rounded-xl font-body-strong transition-transform active:scale-95 duration-150 text-sm">
          Join the Waitlist
        </button>
      </div>
    </nav>
  );
}
