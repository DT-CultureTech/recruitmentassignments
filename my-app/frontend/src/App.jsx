import { useState } from "react";
import axios from "axios";

function App() {
  const [transcript, setTranscript] = useState("");
  const [result, setResult] = useState(null);

  const handleAnalyze = async () => {
    const res = await axios.post("http://localhost:5000/analyze", {
      transcript,
    });
    setResult(res.data);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Supervisor Feedback Analyzer</h2>

      <textarea
        rows={10}
        cols={80}
        placeholder="Paste transcript here..."
        value={transcript}
        onChange={(e) => setTranscript(e.target.value)}
      />

      <br /><br />

      <button onClick={handleAnalyze}>Run Analysis</button>

      {result && (
        <div>
          <p style={{ color: "orange" }}>
            AI-generated draft. Please verify before finalizing.
          </p>
          <h3>Score: {result.score}</h3>

          <h4>Evidence</h4>
          {result.evidence?.map((e, i) => (
            <p key={i}>
              {e.quote} — <b>{e.type}</b>
            </p>
          ))}

          <h4>Gaps</h4>
          {result.gaps?.map((g, i) => <p key={i}>{g}</p>)}

          <h4>Questions</h4>
          {result.questions?.map((q, i) => <p key={i}>{q}</p>)}
        </div>
      )}
    </div>
  );
}

export default App;