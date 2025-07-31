import React from "react";
import "../../styles/analyze_jobs/AnalyzeJobsButton.css";
import { useJobAnalysis } from "./hooks/useJobAnalysis";

function AnalyzeJobsButton({
  preferences,
  resume,
  jobDescriptions,
  onAnalysisComplete,
}) {
  const { isLoading, error, analyzeJobs } = useJobAnalysis(
    preferences,
    resume,
    jobDescriptions,
    onAnalysisComplete
  );

  return (
    <div className="analyze-jobs-container">
      <button
        onClick={analyzeJobs}
        disabled={isLoading}
        className={`analyze-jobs-button ${isLoading ? "loading" : ""}`}
      >
        {isLoading ? "Analyzing..." : "🔍 Analyze Jobs"}
      </button>
      {error && <div className="error-message">⚠️ {error}</div>}
    </div>
  );
}

export default AnalyzeJobsButton;