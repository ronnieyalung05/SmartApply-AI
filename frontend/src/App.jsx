import { useEffect, useState } from "react";
import JobPreferencesForm from "./components/job_preferences/JobPreferencesForm";
import HelpModal from "./components/HelpModal";
import JobDescriptionForm from "./components/job_descriptions/JobDescriptionForm";
import JobDescriptionList from "./components/job_descriptions/JobDescriptionList";
import AddResumeButton from "./components/job_preferences/AddResumeButton";
import "./CSS/App.css";

function App() {
  /* Data to be packaged and sent to the AI model */
  const [jobDescriptions, setJobDescriptions] = useState(() => {
    const saved = localStorage.getItem("jobDescriptions");
    return saved ? JSON.parse(saved) : [];
  });
  useEffect(() => {
    localStorage.setItem("jobDescriptions", JSON.stringify(jobDescriptions));
  }, [jobDescriptions]);
  
  const [preferences, setPreferences] = useState([]);
  const [resume, setResume] = useState([]);

  /* ----Functionality to warn for page refreshes/resets---- */
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(true); // set to true to always warn

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (!hasUnsavedChanges) return;

      event.preventDefault();
      event.returnValue = ""; // Required for Chrome
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [hasUnsavedChanges]);
  /* --------------------END-------------------- */

  /* ----Functionality to handle adding job descriptions---- */
  const handleAddDescription = (newDescription) => {
    setJobDescriptions((prev) => [...prev, newDescription]);
  };

  const handleEditDescription = (index, newText) => {
    setJobDescriptions((prev) => {
      const updated = [...prev];
      updated[index] = newText;
      return updated;
    });
  };

  const handleDeleteDescription = (index) => {
    setJobDescriptions((prev) => prev.filter((_, i) => i !== index));
  };
  /* --------------------END-------------------- */

  return (
    <div id="app-container">
      <div id="top-bar">
        <h1 id="app-name">
          SmartApply AI
          <HelpModal id="help-modal" />
        </h1>
      </div>

      <div id="app-layout">
        <div id="preferences-section">
          <JobPreferencesForm id="preferences-form" />
          <AddResumeButton id="add-resume-button" />
        </div>

        <div id="descriptions-section">
          {/* CHANGED: Wrapped form and list in a container to position at bottom left */}
          <div id="descriptions-content">
            <JobDescriptionForm
              id="description-form"
              onAdd={handleAddDescription}
            />
          </div>
        </div>

        <div id="functions-section">
          <JobDescriptionList
              id="description-list"
              descriptions={jobDescriptions}
              onEdit={handleEditDescription}
              onDelete={handleDeleteDescription}
            />
        </div>
      </div>
    </div>
  );
}

export default App;