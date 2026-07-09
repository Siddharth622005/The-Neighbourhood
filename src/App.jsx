import { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LandingPageV3 from "./pages/LandingPageV3.jsx";

const JourneyPage = lazy(() => import("./pages/JourneyPage.jsx"));

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPageV3 />} />
      <Route
        path="/journey"
        element={
          <Suspense fallback={null}>
            <JourneyPage />
          </Suspense>
        }
      />
      <Route path="/v1" element={<Navigate to="/" replace />} />
      <Route path="/v2" element={<Navigate to="/" replace />} />
      <Route path="/v3" element={<Navigate to="/" replace />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
