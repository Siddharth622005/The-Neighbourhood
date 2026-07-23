import { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

const TodayPage = lazy(() => import("./pages/TodayPage.jsx"));
const OneDayPage = lazy(() => import("./pages/OneDayPage.jsx"));
const HomeV4 = lazy(() => import("./pages/HomeV4.jsx"));
const StoryPage = lazy(() => import("./pages/StoryPage.jsx"));
const ValuesPage = lazy(() => import("./pages/ValuesPage.jsx"));
const FaqPage = lazy(() => import("./pages/FaqPage.jsx"));

export default function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Suspense fallback={null}>
            <HomeV4 />
          </Suspense>
        }
      />
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
        path="/story"
        element={
          <Suspense fallback={null}>
            <StoryPage />
          </Suspense>
        }
      />
      <Route
        path="/values"
        element={
          <Suspense fallback={null}>
            <ValuesPage />
          </Suspense>
        }
      />
      <Route
        path="/faq"
        element={
          <Suspense fallback={null}>
            <FaqPage />
          </Suspense>
        }
      />
      <Route path="/next" element={<Navigate to="/" replace />} />
      <Route path="/next/story" element={<Navigate to="/story" replace />} />
      <Route path="/next/values" element={<Navigate to="/values" replace />} />
      <Route path="/next/faq" element={<Navigate to="/faq" replace />} />
      <Route path="/v1" element={<Navigate to="/" replace />} />
      <Route path="/v2" element={<Navigate to="/" replace />} />
      <Route path="/v3" element={<Navigate to="/" replace />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
