import React, { useState } from "react";
import "../../CSS/job_descriptions/JobDescriptionForm.css";

function JobDescriptionForm({ onAdd }) {
  // State variables for textbox
  const [jobDescription, setJobDescription] = useState("");
  
  // Adds description to the description list and removes current content from the textbox
  const handleSubmit = (e) => {
    e.preventDefault();
    if (jobDescription.trim() === "") return;

    onAdd(jobDescription.trim()); // send to parent (description list)
    setJobDescription(""); // reset form
  };

  return (
    <div className="job-description-form">
      <div className="job-description-form-container">
        <textarea
          className="job-description-textarea"
          placeholder="Enter a job description..."
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
        />
        <button type="submit" onClick={handleSubmit} className="job-description-add-button">
          Add Job Description
        </button>
      </div>
    </div>
  );
}

export default JobDescriptionForm;
