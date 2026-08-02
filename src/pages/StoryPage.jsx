import { useState } from "react";
import NavbarV3 from "../components/v3/NavbarV3.jsx";
import FooterV3 from "../components/v3/FooterV3.jsx";
import WaitlistDialogV3 from "../components/v3/WaitlistDialogV3.jsx";
import FounderStory from "../components/v3/FounderStory.jsx";
import { V4_LINKS } from "./navLinks.js";

/**
 * Standalone route for the founder story — moved off the /next homepage
 * so the main flow stays to its six sections; reachable from the navbar.
 */
export default function StoryPage() {
  const [waitlistOpen, setWaitlistOpen] = useState(false);
  const openWaitlist = () => setWaitlistOpen(true);

  return (
    <div className="overflow-x-clip bg-cream-peach">
      <NavbarV3 onJoin={openWaitlist} links={V4_LINKS} />
      <main className="pt-3xl">
        <FounderStory />
      </main>
      <FooterV3 />
      <WaitlistDialogV3 open={waitlistOpen} onClose={() => setWaitlistOpen(false)} />
    </div>
  );
}
