import Navbar from "../components/landing/Navbar.jsx";
import Hero from "../components/landing/Hero.jsx";
import TrustBar from "../components/landing/TrustBar.jsx";
import Mission from "../components/landing/Mission.jsx";
import FeatureRows from "../components/landing/FeatureRows.jsx";
import AppPreview from "../components/landing/AppPreview.jsx";
import TrickFramework from "../components/landing/TrickFramework.jsx";
import ClosingCTA from "../components/landing/ClosingCTA.jsx";
import Footer from "../components/landing/Footer.jsx";

export default function LandingPage() {
  return (
    <div className="overflow-x-hidden">
      <Navbar />
      <Hero />
      <TrustBar />
      <Mission />
      <FeatureRows />
      <AppPreview />
      <TrickFramework />
      <ClosingCTA />
      <Footer />
    </div>
  );
}
