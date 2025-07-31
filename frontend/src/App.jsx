import { useState } from "react";

// hooks
import useJobDescriptions from "./hooks/useJobDescriptions";
import useJobPreferences from "./hooks/useJobPreferences";
import useBeforeUnloadWarning from "./hooks/useBeforeUnloadWarning";

// components
import JobPreferencesForm from "./components/job_preferences/JobPreferencesForm";
import HelpModal from "./components/HelpModal";
import JobDescriptionForm from "./components/job_descriptions/JobDescriptionForm";
import JobDescriptionList from "./components/job_descriptions/JobDescriptionList";
import AddResumeButton from "./components/job_preferences/AddResumeButton";
import AnalyzeJobsButton from "./components/analyze_jobs/AnalyzeJobsButton";
import ViewAnalyzedJobs from "./components/analyze_jobs/ViewAnalyzedJobsButton";

import "./styles/App.css";

function App() {
  const {
    jobDescriptions,
    handleAddDescription,
    handleEditDescription,
    handleDeleteDescription,
    handleClearAllDescriptions,
  } = useJobDescriptions();

  const { preferences, setPreferences, resume, setResume } = useJobPreferences();

  const [hasUnsavedChanges] = useState(true);
  useBeforeUnloadWarning(hasUnsavedChanges);

  const [analysisResult, setAnalysisResult] = useState([]);

  const handleAnalysisComplete = (result) => {
    setAnalysisResult(result);
    console.log("Analysis completed:", result);
  };

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
            onChange={setPreferences}
          />
          <AddResumeButton
            id="add-resume-button"
            resume={resume}
            onChange={setResume}
          />
        </div>

        <div id="descriptions-section">
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
          {/* DATA SEND */}
          <AnalyzeJobsButton
            preferences={preferences}
            resume={resume}
            jobDescriptions={jobDescriptions}
            onAnalysisComplete={handleAnalysisComplete}
          />
          <ViewAnalyzedJobs analysisResult={analysisResult} />
        </div>
      </div>
    </div>
  );
}

export default App;