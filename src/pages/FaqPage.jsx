import { useState } from "react";
import NavbarV3 from "../components/v3/NavbarV3.jsx";
import FooterV3 from "../components/v3/FooterV3.jsx";
import WaitlistDialogV3 from "../components/v3/WaitlistDialogV3.jsx";
import Faq from "../components/v3/Faq.jsx";
import { V4_LINKS } from "./navLinks.js";

/**
 * Standalone route for FAQ — moved off the /next homepage so the main
 * flow stays to its six sections; reachable from the navbar.
 */
export default function FaqPage() {
  const [waitlistOpen, setWaitlistOpen] = useState(false);
  const openWaitlist = () => setWaitlistOpen(true);

  return (
    <div className="overflow-x-clip bg-surface-cream">
      <NavbarV3 onJoin={openWaitlist} links={V4_LINKS} />
      <main className="pt-16 md:pt-20">
        <Faq />
      </main>
      <FooterV3 />
      <WaitlistDialogV3 open={waitlistOpen} onClose={() => setWaitlistOpen(false)} />
    </div>
  );
}
