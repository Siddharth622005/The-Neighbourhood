import { useState } from "react";
import NavbarV3 from "../components/v3/NavbarV3.jsx";
import HeroV3 from "../components/v3/HeroV3.jsx";
import Truths from "../components/v3/Truths.jsx";
import Belief from "../components/v3/Belief.jsx";
import Pillars from "../components/v3/Pillars.jsx";
import LifeInside from "../components/v3/LifeInside.jsx";
import FounderStory from "../components/v3/FounderStory.jsx";
import Values from "../components/v3/Values.jsx";
import Faq from "../components/v3/Faq.jsx";
import ClosingInvite from "../components/v3/ClosingInvite.jsx";
import FooterV3 from "../components/v3/FooterV3.jsx";
import WaitlistDialogV3 from "../components/v3/WaitlistDialogV3.jsx";

/**
 * V3 — the editorial redesign. One narrative, top to bottom:
 * parenting is beautiful → and overwhelming → that's not your fault →
 * here's what we believe → the three parts of the village → life inside →
 * who's behind it → how we behave → honest answers → an invitation.
 *
 * One waitlist flow: every CTA on the page opens the same dialog, owned
 * here. Motion is CSS-only (v3-enter / v3-fade / word-reveal) — calm by
 * construction, no scroll hijacking.
 */
export default function LandingPageV3() {
  const [waitlistOpen, setWaitlistOpen] = useState(false);
  const openWaitlist = () => setWaitlistOpen(true);

  return (
    <div className="overflow-x-clip bg-surface-cream">
      <NavbarV3 onJoin={openWaitlist} />
      <main>
        <HeroV3 onJoin={openWaitlist} />
        <Truths />
        <Belief />
        <Pillars />
        <LifeInside />
        <FounderStory />
        <Values />
        <Faq />
        <ClosingInvite onJoin={openWaitlist} />
      </main>
      <FooterV3 />
      <WaitlistDialogV3 open={waitlistOpen} onClose={() => setWaitlistOpen(false)} />
    </div>
  );
}
