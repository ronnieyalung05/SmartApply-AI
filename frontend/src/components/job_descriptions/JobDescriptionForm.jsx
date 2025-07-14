import React, { useState } from "react";
import "../../CSS/job_descriptions/JobDescriptionForm.css";

function JobDescriptionForm({ onAdd }) {
  // State variables for textboxes
  const [jobTitle, setJobTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");

  // Adds description to the description list and removes current content from the textboxes
  const handleSubmit = (e) => {
    e.preventDefault();
    if (jobDescription.trim() === "") return;

    // Create job object with title and description
    const jobData = {
      title: jobTitle.trim() || "Untitled Job", // Default title if empty
      description: jobDescription.trim(),
    };

    onAdd(jobData); // send to parent (description list)
    setJobTitle(""); // reset title
    setJobDescription(""); // reset description
  };

  return (
    <div className="job-description-form">
      <div className="job-description-form-container">
        <input
          type="text"
          className="job-title-input"
          placeholder="Job title (e.g., Software Engineer, Marketing Manager...)"
          value={jobTitle}
          onChange={(e) => setJobTitle(e.target.value)}
        />
        <textarea
          className="job-description-textarea"
          placeholder="Enter a job description..."
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
        />
        <button
          type="submit"
          onClick={handleSubmit}
          className="job-description-add-button"
        >
          Add Job Description
        </button>
      </div>
    </div>
  );
}

export default JobDescriptionForm;
