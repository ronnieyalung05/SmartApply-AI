import React, { useRef } from "react";
import "../../CSS/job_preferences/AddResumeButton.css";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB in bytes

function AddResumeButton({ resume, onChange }) {
  // Reference to the hidden file input element
  const fileInputRef = useRef(null);

  // TODO: Add or remove accepted file types here
  const acceptedFileTypes = ".pdf,.doc,.docx,.txt";

  // Handle file selection
  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > MAX_FILE_SIZE) {
        alert("File is too large. Please upload a file smaller than 5MB.");
        event.target.value = "";
        return;
      }

      onChange(file); // Pass the file to parent component
      event.target.value = "";
    }
  };

  // Trigger file input click when button is pressed
  const handleButtonClick = () => {
    if (!resume) {
      fileInputRef.current.click();
    }
  };

  // Remove/delete the uploaded file
  const handleRemoveFile = () => {
    onChange(null); // Pass null to parent component to clear the file
    // Clear the file input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Format file size for display
  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  // Get file type display name
  const getFileTypeDisplay = (fileName) => {
    const extension = fileName.split(".").pop().toLowerCase();
    const typeMap = {
      pdf: "PDF",
      doc: "Word Document",
      docx: "Word Document",
      txt: "Text File",
    };
    return typeMap[extension] || extension.toUpperCase();
  };

  return (
    <div className="add-resume-container">
      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileSelect}
        accept={acceptedFileTypes}
        style={{ display: "none" }}
      />

      {!resume ? (
        /* Add Resume Button - shown when no file is uploaded */
        <button className="add-resume-button" onClick={handleButtonClick}>
          <span className="button-icon">📄</span>
          Add Resume
        </button>
      ) : (
        /* File Display Container - shown when file is uploaded */
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
