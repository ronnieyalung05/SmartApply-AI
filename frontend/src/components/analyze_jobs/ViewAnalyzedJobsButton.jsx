// TODO: refactor this code
import React, { useState } from "react";
import "../../styles/analyze_jobs/ViewAnalyzedJobsButton.css";

function ViewAnalyzedJobs({ analysisResult }) {
  const [listOpen, setListOpen] = useState(false);
  const [selectedJobIndex, setSelectedJobIndex] = useState(null);

  // Reusable function for opening the list
  const openList = () => setListOpen(true);

  // Reusable function for closing the list
  const closeList = () => {
    setListOpen(false);
    setSelectedJobIndex(null); // Reset selected job when closing
  };

  // Close list on clicking the backdrop
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      closeList();
    }
  };

  // Handle job selection
  const handleJobSelect = (index) => {
    setSelectedJobIndex(index);
  };

  // Go back to job list
  const handleBackToList = () => {
    setSelectedJobIndex(null);
  };

  // Check if we have valid analysis results
  const hasResults =
    analysisResult &&
    Array.isArray(analysisResult) &&
    analysisResult.length > 0;

  return (
    <>
      {/* Main container for the "View Analyzed Jobs" button */}
      <div className="analyzed-jobs-container">
        <button
          className="view-analyzed-jobs-button"
          onClick={openList}
          disabled={!hasResults}
        >
          View Analyzed Jobs {hasResults ? "✓" : ""}
        </button>
      </div>

      {listOpen && (
        /* Overlay backdrop for the modal */
        <div
          className="analyzed-jobs-overlay"
          onMouseDown={handleBackdropClick}
        >
          {/* Main modal content container */}
          <div className="analyzed-jobs-content">
            {/* Modal header with title */}
            <div className="analyzed-jobs-header">
              <h3>
                {selectedJobIndex !== null
                  ? `Analysis: ${
                      analysisResult[selectedJobIndex]?.title || "Unknown Job"
                    }`
                  : "Job Analysis Results"}
              </h3>
              {selectedJobIndex !== null && (
                <button
                  onClick={handleBackToList}
                  className="back-to-list-button"
                >
                  ← Back to List
                </button>
              )}
            </div>

            {/* Modal body containing the analysis */}
            <div className="analyzed-jobs-body">
              {!hasResults ? (
                /* Empty state when no analysis */
                <div className="analysis-empty-state">
                  <p>No analysis results available yet.</p>
                  <p>Click "Analyze Jobs" to get started.</p>
                </div>
              ) : selectedJobIndex !== null ? (
                /* Individual job analysis view */
                <div className="individual-job-analysis">
                  <div className="job-details">
                    <h4>Job Title:</h4>
                    <p className="job-title">
                      {analysisResult[selectedJobIndex]?.title}
                    </p>

                    <h4>AI Analysis:</h4>
                    <div className="ai-analysis">
                      {analysisResult[selectedJobIndex]?.error ? (
                        <div className="error-message">
                          <p>
                            <strong>Error:</strong>{" "}
                            {analysisResult[selectedJobIndex].error}
                          </p>
                        </div>
                      ) : (
                        <pre className="analysis-text">
                          {analysisResult[selectedJobIndex]?.aiResponse ||
                            "No analysis available"}
                        </pre>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                /* Job list view */
                <div className="job-list-container">
                  <div className="job-list-header">
                    <p>Click on a job to view its detailed analysis:</p>
                  </div>
                  <div className="job-list">
                    {analysisResult.map((job, index) => (
                      <div
                        key={index}
                        className={`job-list-item ${
                          job?.error ? "error" : "success"
                        }`}
                        onClick={() => handleJobSelect(index)}
                      >
                        <div className="job-list-item-header">
                          <h4>{job?.title || `Job ${index + 1}`}</h4>
                          {job?.error ? (
                            <span className="status-indicator error">
                              ❌ Error
                            </span>
                          ) : (
                            <span className="status-indicator success">
                              ✅ Analyzed
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Modal footer with Done button */}
            <div className="analyzed-jobs-footer">
              <button onClick={closeList} className="analyzed-jobs-done-button">
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ViewAnalyzedJobs;
