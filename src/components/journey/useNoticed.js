import { useEffect, useState } from "react";

const STORAGE_KEY = "tn_journey_noticed_v1";

function load() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
  } catch {
    return {};
  }
}

/**
 * Quiet persistence for "what you've noticed" — no scoring, no percentage,
 * just a private record a parent can return to. Keyed by stage/domain/index
 * so it survives content reordering within a stage.
 */
export default function useNoticed() {
  const [noticed, setNoticed] = useState(load);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(noticed));
    } catch {
      // ignore write failures (private browsing, storage full, etc.)
    }
  }, [noticed]);

  const toggle = (key) => setNoticed((prev) => ({ ...prev, [key]: !prev[key] }));

  return { noticed, toggle };
}
