import { useCallback, useEffect, useState } from "react";

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

function daysBetween(fromDate, toDate) {
  const from = new Date(`${fromDate}T00:00:00`);
  const to = new Date(`${toDate}T00:00:00`);
  return Math.round((to - from) / 86400000);
}

function hasUnreflectedPlan(record) {
  return Boolean(record?.plannedActivityNames?.length) && !record.reflected;
}

function committedActivityNames(record) {
  if (Array.isArray(record?.commitments)) return record.commitments;
  return record?.commitment?.status === "committed" ? [record.commitment.activityName] : [];
}

/**
 * Holds voluntary daily intentions alongside the four gentle options that
 * were shown that day. Tomorrow's reflection is optional and never scored.
 */
export default function useDailyMoments() {
  const [record, setRecord] = useState(load);
  const currentDate = todayKey();

  useEffect(() => {
    if (!record) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(record));
    } catch {
      // ignore
    }
  }, [record]);

  const todaysRecord = record?.date === currentDate ? record : null;
  const followUpRecord = todaysRecord?.previous && hasUnreflectedPlan(todaysRecord.previous)
    ? todaysRecord.previous
    : record?.date !== currentDate && hasUnreflectedPlan(record)
      ? record
      : null;
  const staleCommitment = todaysRecord?.staleCommitment || null;
  const recentObservations = todaysRecord?.recentObservations || record?.recentObservations || [];

  const ensureToday = useCallback((activityNames) => {
    setRecord((previousRecord) => {
      if (previousRecord?.date === currentDate) {
        if (previousRecord.plannedActivityNames?.length) {
          if (previousRecord.recentObservations && Array.isArray(previousRecord.commitments)) return previousRecord;
          return {
            ...previousRecord,
            recentObservations: previousRecord.recentObservations || [],
            commitments: committedActivityNames(previousRecord),
          };
        }
        return {
          ...previousRecord,
          plannedActivityNames: activityNames,
          reflected: false,
          recentObservations: previousRecord.recentObservations || [],
          commitments: committedActivityNames(previousRecord),
        };
      }

      const currentPlan = hasUnreflectedPlan(previousRecord) ? previousRecord : null;
      const earlierPlan = hasUnreflectedPlan(previousRecord?.previous) ? previousRecord.previous : null;
      const candidate = currentPlan || earlierPlan;
      const age = candidate ? daysBetween(candidate.date, currentDate) : 0;

      return {
        date: currentDate,
        plannedActivityNames: activityNames,
        reflected: false,
        recentObservations: previousRecord?.recentObservations || [],
        commitments: [],
        previous: age === 1 ? candidate : null,
        staleCommitment: age > 1 ? candidate : null,
      };
    });
  }, [currentDate]);

  const commitActivity = (activityName) => {
    setRecord((previousRecord) => {
      const current = previousRecord?.date === currentDate
        ? previousRecord
        : {
            date: currentDate,
            plannedActivityNames: [],
            reflected: false,
            recentObservations: [],
            commitments: [],
            previous: null,
            staleCommitment: null,
          };
      return {
        ...current,
        commitments: [...new Set([...committedActivityNames(current), activityName])],
      };
    });
  };

  const clearCommitment = (activityName) => {
    setRecord((previousRecord) => {
      if (previousRecord?.date !== currentDate) return previousRecord;
      return {
        ...previousRecord,
        commitments: committedActivityNames(previousRecord).filter((name) => name !== activityName),
      };
    });
  };

  const submitReflection = (triedNames, signal = "") => {
    setRecord((previousRecord) => {
      if (previousRecord?.date !== currentDate || !previousRecord.previous) return previousRecord;
      const observation = triedNames.length
        ? {
            date: previousRecord.previous.date,
            activityNames: triedNames,
            signal,
          }
        : null;
      return {
        ...previousRecord,
        recentObservations: observation
          ? [...(previousRecord.recentObservations || []), observation].slice(-6)
          : previousRecord.recentObservations || [],
        previous: {
          ...previousRecord.previous,
          reflected: true,
          tried: triedNames,
          signal,
          reflectedAt: Date.now(),
        },
      };
    });
  };

  const dismissStaleCommitment = () => {
    setRecord((previousRecord) => {
      if (previousRecord?.date !== currentDate) return previousRecord;
      return { ...previousRecord, staleCommitment: null };
    });
  };

  return {
    todaysRecord,
    todaysCommitments: committedActivityNames(todaysRecord),
    followUpRecord,
    staleCommitment,
    recentObservations,
    ensureToday,
    commitActivity,
    clearCommitment,
    submitReflection,
    dismissStaleCommitment,
  };
}
