# Trinethra Supervisor Feedback Analyzer

React + Node.js app that analyzes supervisor transcripts with local Ollama (`llama3.2`) and returns a structured draft for intern review.

## Setup

1. Install Ollama and pull the model:
   ```bash
   ollama pull llama3.2
   ```

2. Start the backend:
   ```bash
   cd backend
   npm install
   npm run dev
   ```

3. Start the frontend:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

4. Open `http://localhost:5173`.

## Configuration

Backend environment variables:

```bash
PORT=5000
FRONTEND_URL=http://localhost:5173
CORS_ORIGINS=http://localhost:5173,http://localhost:5174
OLLAMA_URL=http://localhost:11434/api/generate
OLLAMA_MODEL=llama3.2
```

Frontend environment variable:

```bash
VITE_API_URL=http://localhost:5000/api/analyze
```

## Architecture

The React frontend sends a transcript to the Express backend. The backend builds a rubric-aware prompt, calls Ollama locally, extracts JSON safely, validates required fields, retries once with a stricter JSON repair prompt if needed, and returns only structured analysis to the UI.

## Design Challenges Addressed

- Structured output reliability: strict JSON prompt, safe extraction, validation, and one repair retry.
- Gap detection: prompt requires missing assessment dimensions and targeted follow-up questions.
- Showing uncertainty: the UI labels the output as an AI-generated draft and displays confidence.

## Future Improvements

- Add editable analysis fields so interns can revise the draft before finalizing.
- Add side-by-side transcript evidence highlighting.
- Store past analyses with reviewer decisions for quality tracking.
