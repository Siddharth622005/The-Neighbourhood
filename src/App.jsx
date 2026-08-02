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
