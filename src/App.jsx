import { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// "/" serves src/legacy — a copy of the design that is live in
// production, kept so the redesign can be reviewed at /v2 without
// changing the site anyone currently visits.
const LegacyHome = lazy(() => import("./legacy/LegacyHome.jsx"));
const LegacyStory = lazy(() => import("./legacy/LegacyStory.jsx"));
const LegacyValues = lazy(() => import("./legacy/LegacyValues.jsx"));
const LegacyFaq = lazy(() => import("./legacy/LegacyFaq.jsx"));

// The redesign and its variants. All three render the same section
// components; they differ only in the tokens their wrapper class sets.
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
      <Route path="/v2" element={page(<Edition edition="v2" page="home" />)} />
      <Route path="/v2/story" element={page(<Edition edition="v2" page="story" />)} />
      <Route path="/v2/values" element={page(<Edition edition="v2" page="values" />)} />
      <Route path="/v2/faq" element={page(<Edition edition="v2" page="faq" />)} />

      {/* The redesign, set in sama-latin. */}
      <Route path="/type" element={page(<Edition edition="typekit" page="home" />)} />
      <Route path="/type/story" element={page(<Edition edition="typekit" page="story" />)} />
      <Route path="/type/values" element={page(<Edition edition="typekit" page="values" />)} />
      <Route path="/type/faq" element={page(<Edition edition="typekit" page="faq" />)} />

      {/* The uploaded design system, verbatim. */}
      <Route path="/reference" element={page(<Edition edition="reference" page="home" />)} />
      <Route path="/reference/story" element={page(<Edition edition="reference" page="story" />)} />
      <Route path="/reference/values" element={page(<Edition edition="reference" page="values" />)} />
      <Route path="/reference/faq" element={page(<Edition edition="reference" page="faq" />)} />

      {/* Product surfaces. */}
      <Route path="/today" element={page(<TodayPage />)} />
      <Route path="/day" element={page(<OneDayPage />)} />

      {/* Legacy redirects. "/v2" is deliberately absent here — it used to
          redirect to "/" and is now a real route. */}
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
