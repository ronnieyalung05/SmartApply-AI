import { useRef } from "react";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

export function useResumeUpload(resume, onChange) {
  const fileInputRef = useRef(null);
  const acceptedFileTypes = ".pdf,.doc,.docx,.txt";

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > MAX_FILE_SIZE) {
        alert("File is too large. Please upload a file smaller than 5MB.");
        event.target.value = "";
        return;
      }
      onChange(file);
      event.target.value = "";
    }
  };

  const handleButtonClick = () => {
    if (!resume && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleRemoveFile = () => {
    onChange(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

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

  return {
    fileInputRef,
    acceptedFileTypes,
    handleFileSelect,
    handleButtonClick,
    handleRemoveFile,
    formatFileSize,
    getFileTypeDisplay,
  };
}