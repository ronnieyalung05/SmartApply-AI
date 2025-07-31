import React from "react";
import JobDescriptionItem from "./JobDescriptionItem";
import { useJobDescriptionList } from "./hooks/useJobDescriptionList";
import "../../styles/job_descriptions/JobDescriptionList.css";

function JobDescriptionList({ descriptions, onEdit, onDelete, onClearAll }) {
  const {
    listOpen,
    openList,
    closeList,
    handleBackdropClick,
    editingIndex,
    editTitle,
    editDescription,
    setEditTitle,
    setEditDescription,
    startEdit,
    saveEdit,
    cancelEdit,
    handleDelete,
    toggleExpanded,
    getDisplayText,
    getExpandButtonInfo,
    pendingDelete,
  } = useJobDescriptionList(descriptions, onEdit, onDelete);

  const getJobData = (description) => {
    if (typeof description === "string") {
      return { title: "Untitled Job", description };
    } else {
      return {
        title: description.title || "Untitled Job",
        description: description.description || "",
      };
    }
  };

  return (
    <>
      <div className="description-list-container">
        <button className="view-descriptions-button" onClick={openList}>
          View Job Descriptions ({descriptions.length})
        </button>
      </div>

      {listOpen && (
        <div
          className="description-list-overlay"
          onMouseDown={handleBackdropClick}
        >
          <div className="description-list-content">
            <div className="description-list-header">
              <h3>Job Descriptions</h3>
            </div>

            <div className="description-list-body">
              {descriptions.length === 0 ? (
                <div className="list-empty-state">
                  <p>No job descriptions added yet.</p>
                </div>
              ) : (
                <div className="description-list-table">
                  {descriptions.map((description, index) => (
                    <JobDescriptionItem
                      key={index}
                      index={index}
                      jobData={getJobData(description)}
                      editingIndex={editingIndex}
                      editTitle={editTitle}
                      editDescription={editDescription}
                      setEditTitle={setEditTitle}
                      setEditDescription={setEditDescription}
                      saveEdit={saveEdit}
                      cancelEdit={cancelEdit}
                      startEdit={startEdit}
                      handleDelete={handleDelete}
                      toggleExpanded={toggleExpanded}
                      getDisplayText={getDisplayText}
                      getExpandButtonInfo={getExpandButtonInfo}
                      pendingDelete={pendingDelete}
                    />
                  ))}
                </div>
              )}
            </div>

            <div className="description-list-footer">
              <button
                onClick={onClearAll}
                className="description-clear-all-button"
                disabled={descriptions.length === 0}
              >
                Clear All
              </button>
              <button onClick={closeList} className="description-done-button">
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default JobDescriptionList;