import { useEffect, useState } from "react";

const STORAGE_KEY = "tn_companion_meta_v1";

function load() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
  } catch {
    return null;
  }
}

const DEFAULT_META = {
  createdAt: null, // set once, on first onboarding
  previousStageId: null, // last stage shown, to detect quiet transitions
  hasReflectedBefore: false, // Day 2's reflection header is unique
  firstNoticeCelebrated: false, // the one unrepeatable glow moment
  day7LineShown: false, // "a week of small moments" — shown once, ever
};

/**
 * The small pieces of ritual state that make the first week feel like a
 * sequence of specific days rather than the same screen on a loop. None of
 * this is shown to the parent as numbers or progress — it only ever
 * surfaces as a line of copy or a one-time visual moment.
 */
export default function useCompanionMeta() {
  const [meta, setMeta] = useState(() => load() || DEFAULT_META);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(meta));
    } catch {
      // ignore
    }
  }, [meta]);

  const markCreated = () => setMeta((m) => (m.createdAt ? m : { ...m, createdAt: Date.now() }));

  const dayNumber = meta.createdAt
    ? Math.floor((Date.now() - meta.createdAt) / 86400000) + 1
    : 1;

  const noteStageSeen = (stageId) =>
    setMeta((m) => ({ ...m, previousStageId: stageId }));

  const markReflected = () =>
    setMeta((m) => (m.hasReflectedBefore ? m : { ...m, hasReflectedBefore: true }));

  const markFirstNoticeCelebrated = () =>
    setMeta((m) => ({ ...m, firstNoticeCelebrated: true }));

  const markDay7LineShown = () =>
    setMeta((m) => ({ ...m, day7LineShown: true }));

  return {
    meta,
    dayNumber,
    markCreated,
    noteStageSeen,
    markReflected,
    markFirstNoticeCelebrated,
    markDay7LineShown,
  };
}
