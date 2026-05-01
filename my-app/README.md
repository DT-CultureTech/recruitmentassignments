
# Supervisor Feedback Analyzer — Trinethra Module
## Project Motivation

Manual analysis of supervisor feedback is time-consuming and inconsistent. This tool leverages local LLMs to generate structured, reviewable insights, helping psychology interns and managers make faster, more reliable assessments while keeping human judgment in the loop.

## Folder Structure

```
my-app/
  backend/         # Node.js/Express backend, API, prompt logic
    routes/
    services/
    utils/
    package.json
    server.js
  frontend/        # React (Vite) frontend
    src/
    public/
    package.json
    vite.config.js
  rubric.json      # Rubric and KPI definitions
  sample-transcripts.json # Sample data for testing
  README.md
```

## API Endpoints

**POST /api/analyze**
- Request: `{ transcript: string }`
- Response: Structured analysis JSON (see rubric)
- Errors: Returns 400 for missing/short transcript, 500 for server/LLM errors

**GET /health**
- Health check endpoint for backend service

## Testing

Manual testing:
- Use the provided sample transcripts in the UI
- Check backend logs for errors or malformed LLM output

Automated tests: (Not included, but recommended for production)
- Add unit tests for prompt builder, validation, and API endpoints

## Troubleshooting

- **Ollama not running:** Ensure `ollama serve` is active and the model is pulled
- **CORS errors:** Confirm frontend and backend URLs match in `.env` or config
- **LLM output errors:** Backend will attempt to repair/validate; check logs for details
- **Port conflicts:** Change frontend/backend ports in config if needed


---

## Contributing

Pull requests and suggestions are welcome! For major changes, please open an issue first to discuss what you would like to change.

## Overview

This project is a full-stack AI-powered web application for analyzing supervisor feedback transcripts, built for the DeepThought Software Developer Role Simulation Assignment. The tool leverages a **local LLM (Ollama)** to generate structured, reviewable insights for psychology interns, reducing manual analysis time while maintaining human oversight.

---

## Table of Contents

- [Features](#features)
- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Setup Instructions](#setup-instructions)
- [Usage](#usage)
- [Ollama Model Choice](#ollama-model-choice)
- [Design Challenges Tackled](#design-challenges-tackled)
- [What I'd Improve With More Time](#what-id-improve-with-more-time)

---

## Features

- Paste supervisor transcript and run analysis
- Extracts evidence (quotes) with sentiment tagging (positive/negative/neutral)
- Generates rubric-based score (1–10) with justification
- Maps to business KPIs (as per assignment rubric)
- Gap analysis (identifies missing assessment dimensions)
- Suggests follow-up questions for next supervisor call
- Built-in guardrails: structured prompting, output validation, retry on invalid LLM output, UI warnings

---

## Architecture

```
Frontend (React/Vite)
  ↓
Backend (Node.js/Express)
  ↓
Prompt Builder & Validation Layer
  ↓
Ollama (Local LLM, e.g., llama3.2 or phi3)
  ↓
Structured JSON Output
  ↓
Frontend UI (for human review and editing)
```

## The Flow: 
```bash
User Input (Transcript)
        ↓
Frontend (React)
        ↓
Backend (Node)
        ↓
Prompt → LLM (Ollama)
        ↓
Raw Output (may break)
        ↓
JSON Extraction
        ↓
Validation
        ↓
Retry (if wrong)
        ↓
Final Output
        ↓
UI (user reviews)
```

---

## Tech Stack

- **Frontend:** React (Vite)
- **Backend:** Node.js (Express)
- **LLM:** Ollama (local, e.g., `llama3.2` or `phi3`)
- **Other:** Axios, node-fetch, CORS

---

## Prerequisites

- Node.js (v18+ recommended)
- npm (v9+ recommended)
- Ollama installed and running locally ([Ollama setup guide](https://ollama.com))
- At least 8GB RAM (for running LLMs locally)

---

## Setup Instructions

1. **Clone the repository**
  ```bash
  git clone <your-repo-link>
  cd my-app
  ```

2. **Start the backend**
  ```bash
  cd backend
  npm install
  node server.js
  # Backend runs at http://localhost:5000
  ```

3. **Start the frontend** (in a new terminal)
  ```bash
  cd ../frontend
  npm install
  npm run dev
  # Frontend runs at http://localhost:5173
  ```

4. **Start Ollama and pull a model** (if not already running)
  ```bash
  ollama pull llama3.2
  ollama serve
  # Ollama API runs at http://localhost:11434
  ```

---

## Usage

1. Open [http://localhost:5173](http://localhost:5173) in your browser.
2. Paste a supervisor transcript into the text area.
3. Click **Run Analysis**.
4. Review the structured analysis output. Edit or finalize as needed.

---

## Ollama Model Choice

- **Model Used:** `llama3.2` (default) or `phi3` (supported)
- **Reason:** Both models are small enough to run locally on most laptops, with good performance for structured extraction tasks. The prompt and validation logic are designed to work with any supported Ollama model.

---

## Design Challenges Tackled

1. **Consistent Structured Output from LLMs:**
  - Used strict JSON schema in prompts
  - Added a repair/retry mechanism for invalid or partial LLM outputs
  - Output is validated before display; user is warned if incomplete

2. **Non-technical User Experience:**
  - UI is clean, minimal, and avoids technical jargon
  - All AI output is presented in plain language, with clear sectioning
  - Disclaimer warns users not to blindly trust AI output

---

## What I'd Improve With More Time

- Add a side-by-side view to display the transcript and analysis together
- Allow inline editing of analysis sections before finalization
- Add more robust error handling and user feedback for LLM/API failures
- Support for saving and loading past analyses
- More granular confidence scoring and explainability for each finding