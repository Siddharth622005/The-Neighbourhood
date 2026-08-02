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

import FounderStory from "../components/v3/FounderStory.jsx";
import Values from "../components/v3/Values.jsx";
import Faq from "../components/v3/Faq.jsx";

/**
 * The Type Edition — a separate typographic version of the site, served
 * from /type.
 *
 * It imports the exact same section components as the default site, so
 * layout, spacing, colour, navigation, animation and behaviour are
 * shared rather than copied: there is one implementation of every
 * section, and this route cannot drift from it.
 *
 * The only difference is the `edition-typekit` class on the wrapper,
 * which redefines the type-role custom properties for its whole subtree
 * (see src/index.css). Nothing outside this wrapper is affected.
 */

// Same nav structure as the default site, rebased onto /type so a
// visitor stays inside the edition while browsing it.
const TYPE_LINKS = [
  { label: "Why we exist", href: "/type#the-question" },
  { label: "What we're building", href: "/type#today" },
  { label: "Our story", href: "/type/story" },
  { label: "Our values", href: "/type/values" },
  { label: "FAQ", href: "/type/faq" },
];

export default function TypeEdition({ page = "home" }) {
  const [waitlistOpen, setWaitlistOpen] = useState(false);
  const openWaitlist = () => setWaitlistOpen(true);

  const isHome = page === "home";

  return (
    <div className="edition-typekit overflow-x-clip bg-cream-peach">
      <NavbarV3 onJoin={openWaitlist} links={TYPE_LINKS} homePath="/type" />

      <main className={isHome ? undefined : "pt-3xl"}>
        {isHome && (
          <>
            <HeroV4 onJoin={openWaitlist} />
            <Welcome />
            <TheQuestion />
            <Today onJoin={openWaitlist} />
            <GroundedIn />
            <LongArc />
            <Invitation onJoin={openWaitlist} />
          </>
        )}
        {page === "story" && <FounderStory />}
        {page === "values" && <Values />}
        {page === "faq" && <Faq />}
      </main>

      <FooterV3 />
      <WaitlistDialogV3 open={waitlistOpen} onClose={() => setWaitlistOpen(false)} />
    </div>
  );
}
