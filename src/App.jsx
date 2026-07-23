import { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LandingPageV3 from "./pages/LandingPageV3.jsx";

const TodayPage = lazy(() => import("./pages/TodayPage.jsx"));
const OneDayPage = lazy(() => import("./pages/OneDayPage.jsx"));
const HomeV4 = lazy(() => import("./pages/HomeV4.jsx"));
const StoryPage = lazy(() => import("./pages/StoryPage.jsx"));
const ValuesPage = lazy(() => import("./pages/ValuesPage.jsx"));
const FaqPage = lazy(() => import("./pages/FaqPage.jsx"));

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPageV3 />} />
      <Route
        path="/today"
        element={
          <Suspense fallback={null}>
            <TodayPage />
          </Suspense>
        }
      />
      <Route
        path="/day"
        element={
          <Suspense fallback={null}>
            <OneDayPage />
          </Suspense>
        }
      />
      <Route
        path="/next"
        element={
          <Suspense fallback={null}>
            <HomeV4 />
          </Suspense>
        }
      />
      <Route
        path="/next/story"
        element={
          <Suspense fallback={null}>
            <StoryPage />
          </Suspense>
        }
      />
      <Route
        path="/next/values"
        element={
          <Suspense fallback={null}>
            <ValuesPage />
          </Suspense>
        }
      />
      <Route
        path="/next/faq"
        element={
          <Suspense fallback={null}>
            <FaqPage />
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
