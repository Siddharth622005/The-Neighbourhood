import { useEffect, useState } from "react";

const STORAGE_KEY = "tn_child_profile_v1";

// Upper bound (in months) for each stage, in order — matches journeyStages.json
// exactly (quarterly to 36 months, then yearly to 6 years). A child's age in
// months is compared against these until one is exceeded.
const STAGE_UPPER_BOUND_MONTHS = [3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36, 48, 60, 72];

export function stageIdForDob(dob) {
  const birth = new Date(dob);
  const now = new Date();
  const months = Math.max(
    0,
    (now.getFullYear() - birth.getFullYear()) * 12 + (now.getMonth() - birth.getMonth())
  );
  const idx = STAGE_UPPER_BOUND_MONTHS.findIndex((bound) => months < bound);
  return idx === -1 ? STAGE_UPPER_BOUND_MONTHS.length - 1 : idx;
}

function load() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
  } catch {
    return null;
  }
}

export default function useChildProfile() {
  const [profile, setProfile] = useState(load);

  useEffect(() => {
    if (profile) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
      } catch {
        // ignore
      }
    }
  }, [profile]);

  const saveProfile = (name, dob) => setProfile({ name: name.trim(), dob });
  const clearProfile = () => {
    setProfile(null);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  };

  return { profile, saveProfile, clearProfile };
}
