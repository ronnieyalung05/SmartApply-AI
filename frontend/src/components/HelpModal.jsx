import React, { useState, useEffect } from "react";
import "../CSS/HelpModal.css";

function HelpModal() {
  // State variables for opening the modal and navigating between "about" and "guide" sections in the modal
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("guide");

  // Functions for changing open modal state variable
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  // Close modal on clicking the backdrop
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  // Close modal on escape key
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === "Escape" && isOpen) {
        closeModal();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyPress);
      document.body.style.overflow = "hidden"; // Prevent background scrolling
    }

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Content that is put into the modal for the "guide" section
  const guideContent = (
    <div className="help-modal-content">
      <h3>How to Use This App</h3>
      <div className="guide-section">
        <h4>1. Set Your Job Preferences</h4>
        <p>
          Fill out your salary range, work arrangement preferences (remote,
          in-person, hybrid), and job type preferences (intern, part-time,
          full-time). You can select multiple options for work arrangement and
          job type.
        </p>
      </div>
      <div className="guide-section">
        <h4>2. Upload Job Descriptions</h4>
        <p>
          Upload or paste job descriptions that you want to analyze. The AI will
          compare these against your preferences to find the best matches.
        </p>
      </div>
      <div className="guide-section">
        <h4>3. Get AI Analysis</h4>
        <p>
          Our AI will analyze how well each job matches your preferences and
          provide detailed insights about compatibility, potential concerns, and
          recommendations.
        </p>
      </div>
      <div className="guide-section">
        <h4>4. Review Results</h4>
        <p>
          Browse through the analysis results to make informed decisions about
          which positions to pursue based on your specific criteria.
        </p>
      </div>
    </div>
  );

  // Content that is put into the modal for the "about" section
  const aboutContent = (
    <div className="help-modal-content">
      <h3>About This Application</h3>
      <div className="about-section">
        <h4>Purpose</h4>
        <p>
          This application helps job seekers efficiently match job opportunities
          with their personal preferences using advanced AI analysis. Save time
          by quickly identifying which positions align with your career goals.
        </p>
      </div>
      <div className="about-section">
        <h4>Technology</h4>
        <p>
          Built with modern web technologies and powered by state-of-the-art AI
          models that understand job requirements and can intelligently match
          them against your specified preferences.
        </p>
      </div>
      <div className="about-section">
        <h4>Privacy</h4>
        <p>
          Your job preferences and uploaded job descriptions are processed
          securely. We don't store your personal information beyond your current
          session.
        </p>
      </div>
      <div className="about-section">
        <h4>Support</h4>
        <p>
          If you encounter any issues or have questions about using the
          application, please contact our support team through the feedback
          form.
        </p>
      </div>
    </div>
  );

  return (
    <>
      {/* Help Button */}
      <button className="help-modal-button" onClick={openModal} title="Help & About">
        ?
      </button>

      {/* Modal Overlay */}
      {isOpen && (
        <div className="help-modal-overlay" onMouseDown={handleBackdropClick}>
          <div className="help-modal-content">
            {/* Close Button */}
            <button className="help-modal-close-button" onMouseDown={closeModal}>
              ×
            </button>

            {/* Section Tabs */}
            <div className="help-modal-tabs">
              <button
                className={`help-modal-tab-button ${
                  activeSection === "guide" ? "active" : ""
                }`}
                onClick={() => setActiveSection("guide")}
              >
                How to Use
              </button>
              <button
                className={`help-modal-tab-button ${
                  activeSection === "about" ? "active" : ""
                }`}
                onClick={() => setActiveSection("about")}
              >
                About
              </button>
            </div>

            {/* Content */}
            <div className="help-modal-body">
              {activeSection === "guide" ? guideContent : aboutContent}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default HelpModal;
