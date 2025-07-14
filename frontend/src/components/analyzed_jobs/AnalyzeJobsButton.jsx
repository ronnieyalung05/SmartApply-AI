import React, { useState } from "react";
import "../../CSS/analyzed_jobs/AnalyzeJobsButton.css";

function AnalyzeJobsButton({
  preferences,
  resume,
  jobDescriptions,
  onAnalysisComplete,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Helper function to validate data integrity
  const validateData = () => {
    const MAX_CHARACTERS_ALLOWED = 12000;
    const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
    const MAX_JOB_DESCRIPTIONS = 50;

    try {
      // Check if props exist and are the right type
      if (!preferences || typeof preferences !== "object") {
        throw new Error("Invalid preferences data");
      }

      if (!Array.isArray(jobDescriptions)) {
        throw new Error("Invalid job descriptions data");
      }

      // Validate resume
      if (!resume) {
        return {
          isValid: false,
          message: "Please upload a resume before analyzing jobs.",
        };
      }

      if (!(resume instanceof File)) {
        throw new Error("Invalid resume file");
      }

      if (resume.size > MAX_FILE_SIZE) {
        return {
          isValid: false,
          message:
            "Resume file is too large. Please upload a file smaller than 10MB.",
        };
      }

      // Check file type
      const allowedTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "text/plain",
        "application/rtf",
      ];
      if (
        !allowedTypes.includes(resume.type) &&
        !resume.name.match(/\.(pdf|doc|docx|txt|rtf)$/i)
      ) {
        return {
          isValid: false,
          message:
            "Invalid file type. Please upload a PDF, DOC, DOCX, TXT, or RTF file.",
        };
      }

      // Validate job descriptions
      if (jobDescriptions.length === 0) {
        return {
          isValid: false,
          message: "Please add at least one job description before analyzing.",
        };
      }

      if (jobDescriptions.length > MAX_JOB_DESCRIPTIONS) {
        return {
          isValid: false,
          message: "Too many job descriptions. Maximum 50 allowed.",
        };
      }

      // Check if job descriptions are objects with required properties
      for (let i = 0; i < jobDescriptions.length; i++) {
        const job = jobDescriptions[i];
        if (
          typeof job !== "object" ||
          !job.title ||
          !job.description ||
          typeof job.title !== "string" ||
          typeof job.description !== "string"
        ) {
          return {
            isValid: false,
            message: `Job ${i + 1} is missing title or description.`,
          };
        }
        if (job.description.trim().length === 0) {
          return {
            isValid: false,
            message: `Job description ${i + 1} is empty.`,
          };
        }
        if (job.description.length > MAX_CHARACTERS_ALLOWED) {
          return {
            isValid: false,
            message: `Job description ${
              i + 1
            } is too long. Maximum ${MAX_CHARACTERS_ALLOWED} characters allowed.`,
          };
        }
      }

      // Validate preferences structure
      if (!preferences.payRange || typeof preferences.payRange !== "object") {
        throw new Error("Invalid preferences structure - payRange missing");
      }

      if (!Array.isArray(preferences.workArrangement)) {
        throw new Error(
          "Invalid preferences structure - workArrangement must be an array"
        );
      }

      if (!Array.isArray(preferences.jobType)) {
        throw new Error(
          "Invalid preferences structure - jobType must be an array"
        );
      }

      if (typeof preferences.otherPreferences !== "string") {
        throw new Error(
          "Invalid preferences structure - otherPreferences must be a string"
        );
      }

      return { isValid: true };
    } catch (error) {
      console.error("Data validation error:", error);
      throw new Error(`Data validation failed: ${error.message}`);
    }
  };

  // Convert file to text for prompt
  // TODO: create a separate function for converting a file to text
  const fileToText = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsText(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  // Create individual prompt for each job description
  const createJobPrompt = (resumeContent, jobData, jobIndex) => {
    return `Please analyze the following job description against my resume and preferences:

RESUME:
${resumeContent}

PREFERENCES:
- Pay Range: ${preferences.payRange.min} - ${preferences.payRange.max}
- Work Arrangement: ${preferences.workArrangement.join(", ")}
- Job Type: ${preferences.jobType.join(", ")}
- Other Preferences: ${preferences.otherPreferences}

JOB TITLE: ${jobData.title}

JOB DESCRIPTION:
${jobData.description}

Please provide a detailed analysis of how well this job matches my resume and preferences, including:
1. Match score (1-10) for this job
2. Pros and cons for this position
3. Recommendation on whether to prioritize this job
4. Any gaps in my resume that might affect my candidacy for this specific role`;
  };

  // Send individual request to API
  const analyzeIndividualJob = async (prompt, jobData, jobIndex) => {
    const backend_server = import.meta.env.VITE_BACKEND_SERVER || "/generate";

    try {
      const res = await fetch(backend_server, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: prompt }),
      });

      const data = await res.json();

      if (res.ok) {
        return {
          jobIndex: jobIndex,
          aiResponse: data.response,
          title: jobData.title,
          success: true,
        };
      } else {
        return {
          jobIndex: jobIndex,
          error: data.error || "Unknown error",
          title: jobData.title,
          success: false,
        };
      }
    } catch (error) {
      return {
        jobIndex: jobIndex,
        error: error.message,
        title: jobData.title,
        success: false,
      };
    }
  };

  const handleAnalyzeJobs = async () => {
    // Reset state
    setError(null);

    try {
      // Validate all data before proceeding
      const validation = validateData();
      if (!validation.isValid) {
        setError(validation.message);
        return;
      }

      setIsLoading(true);

      // Convert resume file to text (for text files) or get file info
      let resumeContent = "";
      if (resume.type === "text/plain") {
        resumeContent = await fileToText(resume);
      } else {
        resumeContent = `[${resume.type} file: ${resume.name}]`;
      }

      // Create individual prompts for each job description
      const jobPrompts = jobDescriptions.map((jobData, index) => ({
        prompt: createJobPrompt(resumeContent, jobData, index),
        jobData: jobData,
        index: index,
      }));

      // Send all requests concurrently
      const analysisPromises = jobPrompts.map(({ prompt, jobData, index }) =>
        analyzeIndividualJob(prompt, jobData, index)
      );

      // Wait for all requests to complete
      const results = await Promise.all(analysisPromises);

      // Separate successful results from errors
      const successfulAnalyses = results.filter((result) => result.success);
      const errors = results.filter((result) => !result.success);

      if (errors.length > 0) {
        console.error("Some job analyses failed:", errors);
        // You might want to show which specific jobs failed
        const failedJobs = errors.map((error) => `"${error.title}"`).join(", ");
        setError(`Failed to analyze some jobs: ${failedJobs}`);
      }

      // Create 2D array of analysis results in the correct order
      const analysisArray = new Array(jobDescriptions.length);

      // Fill successful analyses
      successfulAnalyses.forEach((result) => {
        analysisArray[result.jobIndex] = {
          aiResponse: result.aiResponse,
          title: result.title,
          description: result.description,
        };
      });

      // Fill in error placeholders for failed analyses
      errors.forEach((error) => {
        analysisArray[error.jobIndex] = {
          aiResponse: null,
          title: error.title,
          description: error.description,
          error: error.error,
        };
      });

      // Pass the analysis results array to parent component
      if (onAnalysisComplete) {
        onAnalysisComplete(analysisArray);
      }

      console.log("Analysis results array:", analysisArray);
    } catch (error) {
      console.error("Error analyzing jobs:", error);
      setError("Fetch error: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="analyze-jobs-container">
      <button
        className={`analyze-jobs-button ${isLoading ? "loading" : ""}`}
        onClick={handleAnalyzeJobs}
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <span className="loading-spinner"></span>
            Analyzing... {/*TODO: add a progress tracker e.g. 3/10... */}
          </>
        ) : (
          <>
            <span className="analyze-icon">🔍</span>
            Analyze Jobs
          </>
        )}
      </button>

      {error && (
        <div className="error-message">
          <span className="error-icon">⚠️</span>
          {error}
        </div>
      )}
    </div>
  );
}

export default AnalyzeJobsButton;
