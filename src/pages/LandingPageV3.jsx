import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "../components/landing/Navbar.jsx";
import Hero from "../components/landing/HeroV3.jsx";
import TrustBar from "../components/landing/TrustBar.jsx";
import Mission from "../components/landing/Mission.jsx";
import OurStory from "../components/landing/OurStory.jsx";
import FeatureRows from "../components/landing/FeatureRows.jsx";
import AppPreview from "../components/landing/AppPreview.jsx";
import TrickFramework from "../components/landing/TrickFramework.jsx";
import ClosingCTA from "../components/landing/ClosingCTA.jsx";
import Footer from "../components/landing/Footer.jsx";

gsap.registerPlugin(ScrollTrigger);

// Alternating background "zones" as you scroll — mirrors kihealth.org's
// nav/body color-morph trick, where the whole page tint shifts per section
// instead of staying flat, giving scroll a sense of moving through distinct
// spaces. Kept subtle and on-brand: cream <-> a lighter cream-sand tint,
// both already in our palette (surface-cream / surface-container-low).
const CREAM = "#E8DDD1";
const TINT = "#FDF2E5";

const ZONES = [
  { id: "#mission", color: TINT, prevColor: CREAM },
  { id: "#our-story", color: CREAM, prevColor: TINT },
  { id: "#community", color: TINT, prevColor: CREAM },
  { id: "#trick", color: CREAM, prevColor: TINT },
];

export default function LandingPageV3() {
  const wrapperRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ZONES.forEach(({ id, color, prevColor }) => {
        ScrollTrigger.create({
          trigger: id,
          start: "top 60%",
          end: "bottom top",
          onEnter: () =>
            gsap.to(wrapperRef.current, { backgroundColor: color, duration: 0.6, ease: "power1.out" }),
          onEnterBack: () =>
            gsap.to(wrapperRef.current, { backgroundColor: color, duration: 0.6, ease: "power1.out" }),
          onLeaveBack: () =>
            gsap.to(wrapperRef.current, { backgroundColor: prevColor, duration: 0.6, ease: "power1.out" }),
        });
      });
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={wrapperRef} className="overflow-x-hidden" style={{ backgroundColor: CREAM }}>
      <Navbar />
      <Hero />
      <TrustBar />
      <Mission />
      <OurStory />
      <FeatureRows />
      <AppPreview />
      <TrickFramework />
      <ClosingCTA />
      <Footer />
    </div>
  );
}
