import { Routes, Route, Navigate } from "react-router-dom";
import TodayPage from "./pages/TodayPage.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<TodayPage />} />
      <Route path="/today" element={<Navigate to="/" replace />} />
      <Route path="/v1" element={<Navigate to="/" replace />} />
      <Route path="/v2" element={<Navigate to="/" replace />} />
      <Route path="/v3" element={<Navigate to="/" replace />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
