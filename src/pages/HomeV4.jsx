import { useState } from "react";
import NavbarV3 from "../components/v3/NavbarV3.jsx";
import FooterV3 from "../components/v3/FooterV3.jsx";
import WaitlistDialogV3 from "../components/v3/WaitlistDialogV3.jsx";

import HeroV4 from "../components/v4/HeroV4.jsx";
import TheQuestion from "../components/v4/TheQuestion.jsx";
import Today from "../components/v4/Today.jsx";
import LongArc from "../components/v4/LongArc.jsx";
import Companion from "../components/v4/Companion.jsx";
import GroundedIn from "../components/v4/GroundedIn.jsx";
import Invitation from "../components/v4/Invitation.jsx";

/**
 * V4 — the homepage redesign, learning from Glow Baby (emotional warmth),
 * Nara Baby (premium minimalism) and Kinedu (educational confidence).
 *
 * Seven sections, not nine: Progress Insights is merged into The Long Arc
 * (both made the same point), and the marketplace is deliberately absent —
 * a commerce block on a trust-first page makes every other section pay for
 * it. Three CTAs, not one per section: repetition reads as anxiety, and
 * anxiety is the one thing this page must never create.
 *
 * Emotional arc: calm → understood → supported → confident → ready.
 */
export default function HomeV4() {
  const [waitlistOpen, setWaitlistOpen] = useState(false);
  const openWaitlist = () => setWaitlistOpen(true);

  return (
    <div className="overflow-x-clip bg-surface-cream">
      <NavbarV3 onJoin={openWaitlist} />
      <main>
        <HeroV4 onJoin={openWaitlist} />
        <TheQuestion />
        <Today onJoin={openWaitlist} />
        <LongArc />
        <Companion />
        <GroundedIn />
        <Invitation onJoin={openWaitlist} />
      </main>
      <FooterV3 />
      <WaitlistDialogV3 open={waitlistOpen} onClose={() => setWaitlistOpen(false)} />
    </div>
  );
}
