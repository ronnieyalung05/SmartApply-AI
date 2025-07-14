import React, { useState } from "react";
import "../../CSS/job_preferences/JobPreferencesForm.css";

function JobPreferencesForm({ preferences, onChange }) {
  // Error state variable
  const [errors, setErrors] = useState({});

  const workArrangementOptions = ["In-Person", "Remote", "Hybrid"];
  const jobTypeOptions = ["Full Time", "Part Time", "Intern"];
  const maxCharacters = 75; // Roughly 1-2 sentences

  const handlePayRangeChange = (field, value) => {
    // Only allow numeric values up to 7 digits
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

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form before submission
    if (errors.payRange) {
      alert("Please fix the salary range error before submitting");
      return;
    }

    // Format data for API consumption
    const submissionData = {
      payRange: {
        min: preferences.payRange.min
          ? parseInt(preferences.payRange.min)
          : null,
        max: preferences.payRange.max
          ? parseInt(preferences.payRange.max)
          : null,
      },
      workArrangement: preferences.workArrangement,
      jobType: preferences.jobType,
      otherPreferences: preferences.otherPreferences.trim(),
    };

    // This is where you would send the data to your API
    console.log("Form submitted with data:", submissionData);

    // You can replace this with your actual API call
    // Example: onSubmit(submissionData);
    alert("Form submitted! Check console for data structure.");
  };

  const handleClear = () => {
    onChange({
      payRange: { min: "", max: "" },
      workArrangement: [],
      jobType: [],
      otherPreferences: "",
    });
    setErrors({});
  };

  return (
    <div className="job-preferences-form">
      <h2 className="job-preferences-form-title">Job Preferences</h2>
      <div className="job-preferences-title-separator"></div>

      <div>
        {/* Pay Range Section */}
        <div className="job-preferences-form-section">
          <label className="job-preferences-section-label">Salary Range</label>
          <div className="job-preferences-pay-range-container">
            <div className="job-preferences-pay-input-group">
              <span className="job-preferences-currency-symbol">$</span>
              <input
                type="text"
                placeholder="Min"
                value={preferences.payRange.min}
                onChange={(e) => handlePayRangeChange("min", e.target.value)}
                className="pay-input"
              />
            </div>
            <span className="job-preferences-range-separator">to</span>
            <div className="job-preferences-pay-input-group">
              <span className="job-preferences-currency-symbol">$</span>
              <input
                type="text"
                placeholder="Max"
                value={preferences.payRange.max}
                onChange={(e) => handlePayRangeChange("max", e.target.value)}
                className="pay-input"
              />
            </div>
          </div>
          {errors.payRange && (
            <div className="job-preferences-error-message">
              {errors.payRange}
            </div>
          )}
        </div>

        {/* Work Arrangement Section */}
        <div className="job-preferences-form-section">
          <label className="job-preferences-section-label">
            Work Arrangement
          </label>
          <div className="job-preferences-checkbox-group">
            {workArrangementOptions.map((option) => (
              <label key={option} className="job-preferences-checkbox-label">
                <input
                  type="checkbox"
                  checked={preferences.workArrangement.includes(option)}
                  onChange={() => handleMultiSelect("workArrangement", option)}
                />
                <span className="job-preferences-checkbox-text">{option}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Job Type Section */}
        <div className="job-preferences-form-section">
          <label className="job-preferences-section-label">Job Type</label>
          <div className="job-preferences-checkbox-group">
            {jobTypeOptions.map((option) => (
              <label key={option} className="job-preferences-checkbox-label">
                <input
                  type="checkbox"
                  checked={preferences.jobType.includes(option)}
                  onChange={() => handleMultiSelect("jobType", option)}
                />
                <span className="job-preferences-checkbox-text">{option}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Other Preferences Section */}
        <div className="job-preferences-form-section">
          <label className="job-preferences-section-label">
            Other Preferences
          </label>
          <div className="job-preferences-textarea-container">
            <textarea
              placeholder="Any other preferences or requirements..."
              value={preferences.otherPreferences}
              onChange={(e) => handleOtherPreferencesChange(e.target.value)}
              className="job-preferences-textarea"
              rows="3"
            />
            <div className="job-preferences-character-count">
              {preferences.otherPreferences.length}/{maxCharacters}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JobPreferencesForm;
