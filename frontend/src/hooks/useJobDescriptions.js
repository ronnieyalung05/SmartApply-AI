import { useEffect, useState } from "react";

export default function useJobDescriptions() {
  const [jobDescriptions, setJobDescriptions] = useState(() => {
    const saved = localStorage.getItem("jobDescriptions");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("jobDescriptions", JSON.stringify(jobDescriptions));
  }, [jobDescriptions]);

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
      window.confirm("Are you sure you want to delete all job descriptions?")
    ) {
      setJobDescriptions([]);
    }
  };

  return {
    jobDescriptions,
    handleAddDescription,
    handleEditDescription,
    handleDeleteDescription,
    handleClearAllDescriptions,
  };
}