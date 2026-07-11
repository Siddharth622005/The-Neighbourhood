import { useEffect, useState } from "react";

const STORAGE_KEY = "tn_daily_moments_v1";

export function todayKey(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
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
  const currentDate = todayKey();

  useEffect(() => {
    if (record) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(record));
      } catch {
        // ignore
      }
    }
  }, [record]);

  const todaysRecord = record?.date === currentDate ? record : null;
  const reflectionRecord =
    record && record.date !== currentDate && !record.reflected
      ? record
      : record?.previous && !record.previous.reflected
        ? record.previous
        : null;
  const pendingReflection = Boolean(reflectionRecord);

  // Adds one activity to today's picks, merging with anything already
  // picked today rather than overwriting it.
  const addTodaysPick = (activityName) => {
    setRecord((prev) => {
      if (prev && prev.date === currentDate) {
        const names = prev.activityNames.includes(activityName)
          ? prev.activityNames
          : [...prev.activityNames, activityName];
        return { ...prev, activityNames: names };
      }
      const previous =
        prev && prev.date !== currentDate && !prev.reflected
          ? prev
          : prev?.previous && !prev.previous.reflected
            ? prev.previous
            : null;
      return {
        date: currentDate,
        activityNames: [activityName],
        reflected: false,
        tried: [],
        previous,
      };
    });
  };

  const submitReflection = (triedNames) => {
    setRecord((prev) => {
      if (!prev) return prev;
      if (prev.date !== currentDate) return { ...prev, reflected: true, tried: triedNames };
      if (prev.previous) {
        return {
          ...prev,
          previous: { ...prev.previous, reflected: true, tried: triedNames },
        };
      }
      return prev;
    });
  };

  return { record, todaysRecord, reflectionRecord, pendingReflection, addTodaysPick, submitReflection };
}
