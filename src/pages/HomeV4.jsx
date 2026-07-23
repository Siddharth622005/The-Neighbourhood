import { useState } from "react";
import NavbarV3 from "../components/v3/NavbarV3.jsx";
import FooterV3 from "../components/v3/FooterV3.jsx";
import WaitlistDialogV3 from "../components/v3/WaitlistDialogV3.jsx";

import HeroV4 from "../components/v4/HeroV4.jsx";
import Welcome from "../components/v4/Welcome.jsx";
import TheQuestion from "../components/v4/TheQuestion.jsx";
import Today from "../components/v4/Today.jsx";
import GroundedIn from "../components/v4/GroundedIn.jsx";
import LongArc from "../components/v4/LongArc.jsx";
import Invitation from "../components/v4/Invitation.jsx";
import { V4_LINKS } from "./navLinks.js";

/**
 * V4 — the homepage redesign, learning from Glow Baby (emotional warmth),
 * Nara Baby (premium minimalism) and Kinedu (educational confidence).
 *
 * Flow: Hero → Welcome → Why we exist (The Question) → What we're
 * building (Today) → Grounded In (trust) → Every child on their own
 * clock (The Long Arc) → Invitation.
 *
 * Story, Values and FAQ live on their own routes now (/next/story,
 * /next/values, /next/faq) — reachable from the navbar, not part of the
 * scroll. The homepage's job is the pitch; those pages are for a visitor
 * who wants more before they commit.
 */
export default function HomeV4() {
  const [waitlistOpen, setWaitlistOpen] = useState(false);
  const openWaitlist = () => setWaitlistOpen(true);

  return (
    <div className="overflow-x-clip bg-surface-cream">
      <NavbarV3 onJoin={openWaitlist} links={V4_LINKS} todayLabel={null} />
      <main>
        <HeroV4 onJoin={openWaitlist} />
        <Welcome />
        <TheQuestion />
        <Today onJoin={openWaitlist} />
        <GroundedIn />
        <LongArc />
        <Invitation onJoin={openWaitlist} />
      </main>
      <FooterV3 />
      <WaitlistDialogV3 open={waitlistOpen} onClose={() => setWaitlistOpen(false)} />
    </div>
  );
}
