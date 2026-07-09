import { useEffect, useState } from "react";

const STORAGE_KEY = "tn_daily_moments_v1";

function todayKey() {
  return new Date().toISOString().slice(0, 10); // YYYY-MM-DD, local-ish
}

function load() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
  } catch {
    return null;
  }
}

/**
 * Tracks yesterday's recommended activities so today's visit can gently ask
 * "which of these did you get a chance to try" — reflection, not a to-do
 * list. Nothing here is scored; it's just enough state to know what to ask
 * about and to avoid asking twice in one day.
 */
export default function useDailyMoments() {
  const [record, setRecord] = useState(load);

  useEffect(() => {
    if (record) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(record));
      } catch {
        // ignore
      }
    }
  }, [record]);

  const pendingReflection = record && record.date !== todayKey() && !record.reflected;

  // Adds one activity to today's picks, merging with anything already
  // picked today rather than overwriting it.
  const addTodaysPick = (activityName) => {
    setRecord((prev) => {
      if (prev && prev.date === todayKey()) {
        const names = prev.activityNames.includes(activityName)
          ? prev.activityNames
          : [...prev.activityNames, activityName];
        return { ...prev, activityNames: names };
      }
      return { date: todayKey(), activityNames: [activityName], reflected: false, tried: [] };
    });
  };

  const submitReflection = (triedNames) => {
    setRecord((prev) => (prev ? { ...prev, reflected: true, tried: triedNames } : prev));
  };

  return { record, pendingReflection, addTodaysPick, submitReflection };
}
