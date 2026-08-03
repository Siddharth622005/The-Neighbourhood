import { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// "/" serves src/legacy — a copy of the design that is live in
// production, kept so the alternate version can be reviewed at /type
// without changing the site anyone currently visits.
const LegacyHome = lazy(() => import("./legacy/LegacyHome.jsx"));
const LegacyStory = lazy(() => import("./legacy/LegacyStory.jsx"));
const LegacyValues = lazy(() => import("./legacy/LegacyValues.jsx"));
const LegacyFaq = lazy(() => import("./legacy/LegacyFaq.jsx"));

// "/type" serves the redesign: the refined brand palette, set in
// sama-latin.
const Edition = lazy(() => import("./pages/Edition.jsx"));

const TodayPage = lazy(() => import("./pages/TodayPage.jsx"));
const OneDayPage = lazy(() => import("./pages/OneDayPage.jsx"));

// Legal pages. Top-level routes (not per-edition), so every surface of
// the site — legacy, /type, /today, /day — can link to one canonical copy.
const PrivacyPolicy = lazy(() => import("./pages/legal/PrivacyPolicy.jsx"));
const TermsAndConditions = lazy(() => import("./pages/legal/TermsAndConditions.jsx"));
const CookiePolicy = lazy(() => import("./pages/legal/CookiePolicy.jsx"));
const Disclaimer = lazy(() => import("./pages/legal/Disclaimer.jsx"));

const page = (element) => <Suspense fallback={null}>{element}</Suspense>;

export default function App() {
  return (
    <Routes>
      {/* The live site. */}
      <Route path="/" element={page(<LegacyHome />)} />
      <Route path="/story" element={page(<LegacyStory />)} />
      <Route path="/values" element={page(<LegacyValues />)} />
      <Route path="/faq" element={page(<LegacyFaq />)} />

      {/* The redesign. */}
      <Route path="/type" element={page(<Edition edition="typekit" page="home" />)} />
      <Route path="/type/story" element={page(<Edition edition="typekit" page="story" />)} />
      <Route path="/type/values" element={page(<Edition edition="typekit" page="values" />)} />
      <Route path="/type/faq" element={page(<Edition edition="typekit" page="faq" />)} />

      {/* Product surfaces. */}
      <Route path="/today" element={page(<TodayPage />)} />
      <Route path="/day" element={page(<OneDayPage />)} />

      {/* Legal. */}
      <Route path="/privacy-policy" element={page(<PrivacyPolicy />)} />
      <Route path="/terms-and-conditions" element={page(<TermsAndConditions />)} />
      <Route path="/cookie-policy" element={page(<CookiePolicy />)} />
      <Route path="/disclaimer" element={page(<Disclaimer />)} />

      {/* Retired routes. /v2 and /reference were briefly live, so they
          point somewhere useful rather than 404ing. */}
      <Route path="/v2" element={<Navigate to="/type" replace />} />
      <Route path="/v2/story" element={<Navigate to="/type/story" replace />} />
      <Route path="/v2/values" element={<Navigate to="/type/values" replace />} />
      <Route path="/v2/faq" element={<Navigate to="/type/faq" replace />} />
      <Route path="/reference/*" element={<Navigate to="/type" replace />} />

      {/* Legacy redirects. */}
      <Route path="/next" element={<Navigate to="/" replace />} />
      <Route path="/next/story" element={<Navigate to="/story" replace />} />
      <Route path="/next/values" element={<Navigate to="/values" replace />} />
      <Route path="/next/faq" element={<Navigate to="/faq" replace />} />
      <Route path="/v1" element={<Navigate to="/" replace />} />
      <Route path="/v3" element={<Navigate to="/" replace />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
