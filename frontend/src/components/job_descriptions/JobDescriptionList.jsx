import React, { useState } from "react";
import "../../CSS/job_descriptions/JobDescriptionList.css";

function JobDescriptionList({ descriptions, onEdit, onDelete, onClearAll }) {
  // State variables for opening/closing list, editing objects,
  // expanding objects, and deleting them in the list
  const [listOpen, setListOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [expandedItems, setExpandedItems] = useState(new Set());
  const [pendingDelete, setPendingDelete] = useState(null);

  // Reusable function for opening the list
  const openList = () => setListOpen(true);

  // Reusable function for closing the list
  const closeList = () => {
    setListOpen(false);
    setEditingIndex(null);
    setEditTitle("");
    setEditDescription("");
    setExpandedItems(new Set());
    setPendingDelete(null);
  };

  // Close list on clicking the backdrop
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      closeList();
    }
  };

  // Edit a list object (job description)
  const startEdit = (index, jobData) => {
    setEditingIndex(index);
    setEditTitle(jobData.title || "");
    setEditDescription(jobData.description || "");
  };

  // Save a list object (job description)
  const saveEdit = () => {
    if (editDescription.trim() === "") return;

    const updatedJobData = {
      title: editTitle.trim() || "Untitled Job",
      description: editDescription.trim(),
    };

    onEdit(editingIndex, updatedJobData);
    setEditingIndex(null);
    setEditTitle("");
    setEditDescription("");
  };

  // Cancel editing sequence
  const cancelEdit = () => {
    setEditingIndex(null);
    setEditTitle("");
    setEditDescription("");
  };

  // Delete a list object (job description)
  const handleDelete = (index) => {
    // On the second click - actually delete
    if (pendingDelete === index) {
      onDelete(index);
      setPendingDelete(null);
    }
    // On the first click - set delete to pending
    else {
      setPendingDelete(index);
      // Reset pending delete after 3 seconds
      setTimeout(() => {
        setPendingDelete(null);
      }, 3000);
    }
  };

  // MODIFIED: Simple toggle between collapsed and fully expanded
  const toggleExpanded = (index) => {
    const newExpanded = new Set(expandedItems);

    if (newExpanded.has(index)) {
      // If expanded, collapse completely
      newExpanded.delete(index);
    } else {
      // If collapsed, expand fully
      newExpanded.add(index);
    }

    setExpandedItems(newExpanded);
  };

  // MODIFIED: Show full text when expanded, truncated when collapsed
  const getDisplayText = (text, index) => {
    if (!expandedItems.has(index)) {
      // Not expanded - show truncated text (but CSS will handle line limits)
      return text.length <= 1000 ? text : text.substring(0, 1000) + "...";
    } else {
      // Expanded - show full text
      return text;
    }
  };

  // MODIFIED: Simple button logic
  const getExpandButtonInfo = (text, index) => {
    if (text.length <= 1000) {
      return { show: false };
    }

    if (!expandedItems.has(index)) {
      return { show: true, text: "⬇", isExpand: true };
    } else {
      return { show: true, text: "⬆", isExpand: false };
    }
  };

  // Helper function to get job data (handles both old string format and new object format)
  const getJobData = (description) => {
    if (typeof description === "string") { // TODO: Remove handling old format
      // Handle old format (just description string)
      return {
        title: "Untitled Job",
        description: description,
      };
    } else {
      // Handle new format (object with title and description)
      return {
        title: description.title || "Untitled Job",
        description: description.description || "",
      };
    }
  };

  return (
    <>
      {/* Main container for the "View Job Descriptions" button */}
      <div className="description-list-container">
        <button className="view-descriptions-button" onClick={openList}>
          View Job Descriptions ({descriptions.length})
        </button>
      </div>

      {listOpen && (
        /* Overlay backdrop for the modal */
        <div
          className="description-list-overlay"
          onMouseDown={handleBackdropClick}
        >
          {/* Main modal content container */}
          <div className="description-list-content">
            {/* Modal header with title */}
            <div className="description-list-header">
              <h3>Job Descriptions</h3>
            </div>

            {/* Modal body containing the list */}
            <div className="description-list-body">
              {descriptions.length === 0 ? (
                /* Empty state when no descriptions */
                <div className="list-empty-state">
                  <p>No job descriptions added yet.</p>
                </div>
              ) : (
                /* Container for all job description rows */
                <div className="description-list-table">
                  {descriptions.map((description, index) => {
                    const jobData = getJobData(description);

                    return (
                      /* Individual job description row */
                      <div key={index} className="description-list-row">
                        {/* Main content area of each row */}
                        <div className="description-list-item-content">
                          {editingIndex === index ? (
                            /* Edit mode container */
                            <div className="edit-description-container">
                              <input
                                type="text"
                                value={editTitle}
                                onChange={(e) => setEditTitle(e.target.value)}
                                className="edit-title-input"
                                placeholder="Job title..."
                              />
                              <textarea
                                value={editDescription}
                                onChange={(e) =>
                                  setEditDescription(e.target.value)
                                }
                                className="edit-description-textarea"
                                placeholder="Job description..."
                                autoFocus
                              />
                              <div className="edit-description-actions">
                                <button
                                  onClick={saveEdit}
                                  className="description-save-btn"
                                >
                                  Save
                                </button>
                                <button
                                  onClick={cancelEdit}
                                  className="description-cancel-btn"
                                >
                                  Cancel
                                </button>
                              </div>
                            </div>
                          ) : (
                            /* Display mode container */
                            <div className="description-display-container">
                              {/* MODIFIED: Changed structure to stack title, text and buttons vertically */}
                              <div className="description-content-wrapper">
                                <h4 className="job-title">{jobData.title}</h4>
                                <div className="description-text-wrapper">
                                  <p
                                    className={`description-text ${
                                      expandedItems.has(index)
                                        ? "fully-expanded"
                                        : ""
                                    }`}
                                  >
                                    {getDisplayText(jobData.description, index)}
                                  </p>
                                  {/* MODIFIED: Buttons now positioned at bottom of text container */}
                                  <div className="description-buttons">
                                    {(() => {
                                      const buttonInfo = getExpandButtonInfo(
                                        jobData.description,
                                        index
                                      );
                                      if (!buttonInfo.show) return null;

                                      return (
                                        <div className="expand-collapse-buttons">
                                          <button
                                            onClick={() =>
                                              toggleExpanded(index)
                                            }
                                            className="description-expand-button"
                                          >
                                            {buttonInfo.text}
                                          </button>
                                          {/* REMOVED: Separate collapse button no longer needed */}
                                        </div>
                                      );
                                    })()}
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Action buttons for each row */}
                        <div className="description-row-actions">
                          <button
                            onClick={() => startEdit(index, jobData)}
                            className="description-edit-btn"
                            disabled={editingIndex !== null}
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(index)}
                            className={`description-delete-btn ${
                              pendingDelete === index ? "pending" : ""
                            }`}
                            disabled={editingIndex !== null}
                          >
                            {pendingDelete === index ? "Confirm?" : "Delete"}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Modal footer with Done button */}
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