import { useEffect, useState } from "react";
import JobPreferencesForm from "./components/job_preferences/JobPreferencesForm";
import HelpModal from "./components/HelpModal";
import JobDescriptionForm from "./components/job_descriptions/JobDescriptionForm";
import JobDescriptionList from "./components/job_descriptions/JobDescriptionList";
import AddResumeButton from "./components/job_preferences/AddResumeButton";
import AnalyzeJobsButton from "./components/analyzed_jobs/AnalyzeJobsButton";
import ViewAnalyzedJobs from "./components/analyzed_jobs/ViewAnalyzedJobsButton";
import "./CSS/App.css";

function App() {
  // Job Description Data and Functions
  const [jobDescriptions, setJobDescriptions] = useState(() => {
    const saved = localStorage.getItem("jobDescriptions");
    return saved ? JSON.parse(saved) : [];
  });
  useEffect(() => {
    localStorage.setItem("jobDescriptions", JSON.stringify(jobDescriptions));
  }, [jobDescriptions]);

  // Functionality to handle job descriptions in the list
  const handleAddDescription = (newDescription) => {
    setJobDescriptions((prev) => [...prev, newDescription]);
  };

  const handleEditDescription = (index, updatedJob) => {
    setJobDescriptions((prev) => {
      const updated = [...prev];
      updated[index] = updatedJob;
      return updated;
    });
  };

  const handleDeleteDescription = (index) => {
    setJobDescriptions((prev) => prev.filter((_, i) => i !== index));
  };

  const handleClearAllDescriptions = () => {
    if (
      window.confirm("Are you sure you want to delete all job descriptions?") // TODO: change to popup element rather than window confirm
    ) {
      setJobDescriptions([]);
    }
  };

  // Job Preference Data and Functions
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
  const [resume, setResume] = useState(null); // Null since it's a single file

  // Functionality to handle preference changes
  const handlePreferencesChange = (newPreferences) => {
    setPreferences(newPreferences);
  };

  // Resume Data and Handling
  const handleResumeChange = (file) => {
    setResume(file);
  };

  // ----Functionality to warn for page refreshes/resets
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

  // Analysis Results State - now stores array of job analysis objects
  const [analysisResult, setAnalysisResult] = useState([]);

  const handleAnalysisComplete = (result) => {
    // result is now an array of objects with structure:
    // [{ aiResponse: string, title: string, description: string, error?: string }]
    setAnalysisResult(result);
    console.log("Analysis completed:", result);
  };

  /* END */

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
          <JobPreferencesForm
            id="preferences-form"
            preferences={preferences}
            onChange={handlePreferencesChange}
          />
          <AddResumeButton
            id="add-resume-button"
            resume={resume}
            onChange={handleResumeChange}
          />
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
            onClearAll={handleClearAllDescriptions}
          />
          {/* Updated AnalyzeJobsButton with onAnalysisComplete callback */}
          <AnalyzeJobsButton
            preferences={preferences}
            resume={resume}
            jobDescriptions={jobDescriptions}
            onAnalysisComplete={handleAnalysisComplete}
          />

          {/* Updated ViewAnalyzedJobs component to handle array structure */}
          <ViewAnalyzedJobs analysisResult={analysisResult} />
        </div>
      </div>
    </div>
  );
}

export default App;
