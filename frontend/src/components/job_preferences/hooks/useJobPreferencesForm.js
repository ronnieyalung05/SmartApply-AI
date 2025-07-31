import { useState } from "react";

export function useJobPreferencesForm(preferences, onChange) {
  const [errors, setErrors] = useState({});

  const maxCharacters = 75; // Roughly 1-2 sentences

  const handlePayRangeChange = (field, value) => {
    if (value === "" || /^\d{1,7}$/.test(value)) {
      const newPayRange = { ...preferences.payRange, [field]: value };

      const minVal = parseInt(newPayRange.min) || 0;
      const maxVal = parseInt(newPayRange.max) || Infinity;

      let newErrors = { ...errors };

      if (field === "min" && minVal > maxVal && newPayRange.max !== "") {
        newErrors.payRange =
          "Minimum salary cannot be higher than maximum salary";
      } else if (field === "max" && maxVal < minVal && newPayRange.min !== "") {
        newErrors.payRange =
          "Maximum salary cannot be lower than minimum salary";
      } else {
        delete newErrors.payRange;
      }

      setErrors(newErrors);
      onChange({
        ...preferences,
        payRange: newPayRange,
      });
    }
  };

  const handleMultiSelect = (field, value) => {
    onChange({
      ...preferences,
      [field]: preferences[field].includes(value)
        ? preferences[field].filter((item) => item !== value)
        : [...preferences[field], value],
    });
  };

  const handleOtherPreferencesChange = (value) => {
    if (value.length <= maxCharacters) {
      onChange({
        ...preferences,
        otherPreferences: value,
      });
    }
  };

  return {
    errors,
    maxCharacters,
    handlePayRangeChange,
    handleMultiSelect,
    handleOtherPreferencesChange,
  };
}
