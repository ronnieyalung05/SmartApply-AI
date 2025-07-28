import React, { useState } from "react";
import "../../CSS/analyzed_jobs/AnalyzeJobsButton.css";
import { validateData } from "../../utils/validateData";
import { parseResume } from "../../utils/parseResume";
import { createPrompts } from "../../utils/createPrompts";
import { sendJobAnalysis } from "../../api/analyzeJobs";

function AnalyzeJobsButton({
  preferences,
  resume,
  jobDescriptions,
  onAnalysisComplete,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleAnalyzeJobs = async () => {
    setError(null);
    const validation = validateData(preferences, resume, jobDescriptions);
    if (!validation.isValid) {
      setError(validation.message);
      return;
    }

    setIsLoading(true);
    try {
      const resumeContent = await parseResume(resume);
      const prompts = createPrompts(
        resumeContent,
        preferences,
        jobDescriptions
      );

      const analysisResults = await Promise.all(
        prompts.map(async ({ prompt, job, index }) => {
          try {
            const aiResponse = await sendJobAnalysis(prompt);
            return {
              aiResponse,
              title: job.title,
              description: job.description,
              jobIndex: index,
            };
          } catch (err) {
            return {
              aiResponse: null,
              title: job.title,
              description: job.description,
              jobIndex: index,
              error: err.message,
            };
          }
        })
      );

      const orderedResults = new Array(jobDescriptions.length);
      analysisResults.forEach((res) => {
        orderedResults[res.jobIndex] = res;
      });

      onAnalysisComplete(orderedResults);
    } catch (err) {
      setError("Analysis error: " + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="analyze-jobs-container">
      <button
        onClick={handleAnalyzeJobs}
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
