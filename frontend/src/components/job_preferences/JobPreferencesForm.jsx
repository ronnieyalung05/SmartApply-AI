import React from "react";
import "../../styles/job_preferences/JobPreferencesForm.css";
import { useJobPreferencesForm } from "./hooks/useJobPreferencesForm";

function JobPreferencesForm({ preferences, onChange }) {
  const workArrangementOptions = ["In-Person", "Remote", "Hybrid"];
  const jobTypeOptions = ["Full Time", "Part Time", "Intern"];

  const {
    errors,
    maxCharacters,
    handlePayRangeChange,
    handleMultiSelect,
    handleOtherPreferencesChange,
  } = useJobPreferencesForm(preferences, onChange);

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