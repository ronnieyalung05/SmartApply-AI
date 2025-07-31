import React from "react";
import "../../styles/job_preferences/AddResumeButton.css";
import { useResumeUpload } from "./hooks/useResumeUpload";

function AddResumeButton({ resume, onChange }) {
  const {
    fileInputRef,
    acceptedFileTypes,
    handleFileSelect,
    handleButtonClick,
    handleRemoveFile,
    formatFileSize,
    getFileTypeDisplay,
  } = useResumeUpload(resume, onChange);

  return (
    <div className="add-resume-container">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileSelect}
        accept={acceptedFileTypes}
        style={{ display: "none" }}
      />

      {!resume ? (
        <button className="add-resume-button" onClick={handleButtonClick}>
          <span className="button-icon">📄</span>
          Add Resume
        </button>
      ) : (
        <div className="uploaded-file-container">
          <div className="file-info">
            <div className="file-icon">📄</div>
            <div className="file-details">
              <div className="file-name" title={resume.name}>
                {resume.name}
              </div>
              <div className="file-metadata">
                <span className="file-type">
                  {getFileTypeDisplay(resume.name)}
                </span>
                <span className="file-size">{formatFileSize(resume.size)}</span>
              </div>
            </div>
          </div>
          <button
            className="remove-file-button"
            onClick={handleRemoveFile}
            title="Remove resume"
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
}

export default AddResumeButton;