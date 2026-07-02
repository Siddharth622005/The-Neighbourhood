import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage.jsx";
import LandingPageV1 from "./pages/LandingPageV1.jsx";
import LandingPageV2 from "./pages/LandingPageV2.jsx";
import LandingPageV3 from "./pages/LandingPageV3.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/v1" element={<LandingPageV1 />} />
      <Route path="/v2" element={<LandingPageV2 />} />
      <Route path="/v3" element={<LandingPageV3 />} />
    </Routes>
  );
}
