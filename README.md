# SmartApply AI

**SmartApply AI** is a personalized job-matching assistant that uses artificial intelligence to evaluate how well job descriptions align with a user’s preferences and resume. Built with a modern stack using React and Flask, this tool helps job seekers make more informed application decisions by providing structured, AI-generated insights.

---

## Features

- **Job Preferences Form**: Users can specify key criteria such as location, job type, salary expectations, and work arrangements.
- **Resume Upload**: Upload a resume (PDF, DOC, DOCX, TXT, or RTF) to include in AI evaluations.
- **Job Description Management**: Add, edit, and delete multiple job descriptions via a dynamic form interface.
- **AI-Powered Analysis (Coming Soon)**: Structured prompt generation and backend processing will evaluate the match between job descriptions, preferences, and resume content.
- **Responsive Design**: Optimized for both desktop and smaller screen sizes.

---

## Technologies Used

- **Frontend**: React (with custom CSS)
- **Backend**: Flask (for AI processing, API endpoints, and document parsing)
- **File Handling**: Local file parsing (currently supports client-side resume upload)
- **Deployment**: Not yet deployed; runs locally during development

---

## Setup Instructions

### Prerequisites

- Node.js (v18 or higher)
- Python 3.8+
- pip (Python package manager)

### Frontend Setup (React)

```bash
cd frontend
npm install
npm start
```

### Backend Setup (Flask)

```bash
cd backend
python3 -m venv venv
source venv/bin/activate  # On Windows use: venv\Scripts\activate
pip install -r requirements.txt
python app.py
```

> Ensure both frontend and backend are running concurrently on different ports.

---

## File Upload Limits

- Resume uploads are currently limited to **5MB**.
- Accepted file formats: `.pdf`, `.doc`, `.docx`, `.txt`, `.rtf`.

---

## Project Structure

```
SmartApply-AI/
│
├── frontend/                  # React frontend
│   ├── components/          # React components (forms, modals, etc.)
│   ├── CSS/                 # Custom styling
│   ├── App.js               # Main app layout
│   └── index.js
│
├── backend/                  # Flask backend (AI processing logic)
│   ├── app.py               # Flask app entry point
│   └── requirements.txt     # Python dependencies
│
└── README.md
```

---

## Future Improvements

- AI integration with OpenAI or similar LLMs for job match scoring
- Exportable AI analysis reports
- Enhanced file storage and validation
- User authentication and session tracking

---

## License

This project is currently under development and not yet licensed for distribution. Please contact the author before reuse or deployment.

---
