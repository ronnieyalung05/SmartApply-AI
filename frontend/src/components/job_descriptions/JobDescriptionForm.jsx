import React, { useState } from "react";
import "../../CSS/job_descriptions/JobDescriptionForm.css";

function JobDescriptionForm({ onAdd }) {
  // State variables for textbox
  const [input, setInput] = useState("");

  // Adds description to the description list and removes current content from the textbox
  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() === "") return;

    onAdd(input.trim()); // send to parent (description list)
    setInput(""); // reset form
  };

  return (
    <div className="job-description-form">
      <div className="job-description-form-container">
        <textarea
          className="job-description-textarea"
          placeholder="Enter a job description..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit" onClick={handleSubmit} className="job-description-add-button">
          Add Job Description
        </button>
      </div>
    </div>
  );
}

export default JobDescriptionForm;
