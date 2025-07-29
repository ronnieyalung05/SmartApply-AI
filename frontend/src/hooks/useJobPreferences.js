import { useEffect, useState } from "react";
// TODO: try catch block ...?
export default function useJobPreferences() {
  const [preferences, setPreferences] = useState(() => {
    const saved = localStorage.getItem("jobPreferences");
    return saved
      ? JSON.parse(saved)
      : {
          payRange: { min: "", max: "" },
          workArrangement: [],
          jobType: [],
          otherPreferences: "",
        };
  });

  useEffect(() => {
    localStorage.setItem("jobPreferences", JSON.stringify(preferences));
  }, [preferences]);

  const [resume, setResume] = useState(null);

  return {
    preferences,
    setPreferences,
    resume,
    setResume,
  };
}
