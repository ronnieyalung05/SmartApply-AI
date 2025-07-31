import React from "react";

function JobDescriptionItem({
  index,
  jobData,
  editingIndex,
  editTitle,
  editDescription,
  setEditTitle,
  setEditDescription,
  saveEdit,
  cancelEdit,
  startEdit,
  handleDelete,
  toggleExpanded,
  getDisplayText,
  getExpandButtonInfo,
  pendingDelete,
}) {
  const buttonInfo = getExpandButtonInfo(jobData.description, index);

  return (
    <div key={index} className="description-list-row">
      <div className="description-list-item-content">
        {editingIndex === index ? (
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
              onChange={(e) => setEditDescription(e.target.value)}
              className="edit-description-textarea"
              placeholder="Job description..."
              autoFocus
            />
            <div className="edit-description-actions">
              <button onClick={saveEdit} className="description-save-btn">
                Save
              </button>
              <button onClick={cancelEdit} className="description-cancel-btn">
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div className="description-display-container">
            <div className="description-content-wrapper">
              <h4 className="job-title">{jobData.title}</h4>
              <div className="description-text-wrapper">
                <p
                  className={`description-text ${
                    buttonInfo.isExpand ? "" : "fully-expanded"
                  }`}
                >
                  {getDisplayText(jobData.description, index)}
                </p>
                {buttonInfo.show && (
                  <div className="description-buttons">
                    <button
                      onClick={() => toggleExpanded(index)}
                      className="description-expand-button"
                    >
                      {buttonInfo.text}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

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
}

export default JobDescriptionItem;