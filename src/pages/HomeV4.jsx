import { useState } from "react";
import NavbarV3 from "../components/v3/NavbarV3.jsx";
import FooterV3 from "../components/v3/FooterV3.jsx";
import WaitlistDialogV3 from "../components/v3/WaitlistDialogV3.jsx";
import FounderStory from "../components/v3/FounderStory.jsx";
import Values from "../components/v3/Values.jsx";
import Faq from "../components/v3/Faq.jsx";

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
 * Progress Insights is merged into The Long Arc
 * (both made the same point), and the marketplace is deliberately absent —
 * a commerce block on a trust-first page makes every other section pay for
 * it. Three CTAs, not one per section: repetition reads as anxiety, and
 * anxiety is the one thing this page must never create.
 *
 * Emotional arc: calm → understood → supported → confident → ready.
 */
// The navbar defaults to the v3 homepage's anchors ("/#why" etc.), which
// would bounce a visitor off /next entirely. These point at sections that
// actually exist on this page.
const V4_LINKS = [
  { label: "Why we exist", href: "/next#the-question" },
  { label: "What we're building", href: "/next#today" },
  { label: "Our story", href: "/next#story" },
  { label: "FAQ", href: "/next#faq" },
];

export default function HomeV4() {
  const [waitlistOpen, setWaitlistOpen] = useState(false);
  const openWaitlist = () => setWaitlistOpen(true);

  return (
    <div className="overflow-x-clip bg-surface-cream">
      <NavbarV3 onJoin={openWaitlist} links={V4_LINKS} homePath="/next" />
      <main>
        <HeroV4 onJoin={openWaitlist} />
        <TheQuestion />
        <Today onJoin={openWaitlist} />
        <LongArc />
        <Companion />
        <GroundedIn />
        {/* Trust deepens here: who's behind it, how we behave, then the
            honest answers — the last objections cleared before the ask. */}
        <FounderStory />
        <Values />
        <Faq />
        <Invitation onJoin={openWaitlist} />
      </main>
      <FooterV3 />
      <WaitlistDialogV3 open={waitlistOpen} onClose={() => setWaitlistOpen(false)} />
    </div>
  );
}
