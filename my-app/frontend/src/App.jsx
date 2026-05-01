import React, { useState } from 'react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/analyze';

const SAMPLE_TRANSCRIPT = `Karthik? Haan, he is good. Very sincere boy. Comes on time, leaves on time — actually he stays late most days, I don't ask him to. He's always on the floor. He's not one of those people who sits in the office and sends emails. He's hands-on.

What does he do? He helps me with production tracking. Earlier I used to maintain everything in my head — how many pieces came off each machine, what's the rejection rate, what's pending for dispatch. Now Karthik maintains a sheet. Every evening he updates it and sends it to me on WhatsApp. Very useful. I look at it every morning before the shift meeting.

He also handles a lot of the coordination. When we have quality complaints from Tier 1 — they send an email, sometimes call directly — Karthik takes the first call. He notes down the complaint, talks to the QC team, and gives me a summary. Earlier I used to handle all of this myself. Big relief.

The new drum brake line — he's been involved from the beginning. He helped set up the machine layout. He did a study on cycle times and suggested we move the deburring station closer to the CNC machines. Good idea. We did it. Saved maybe 10 minutes per batch in material handling.

One thing — he doesn't really push back. If I tell him to do something, he does it. Even if it's not the best way. I wish he would tell me sometimes, 'Sir, I think we should do it differently.' But maybe he's still new. He'll get there.`;

const signalLabels = {
  positive: 'Positive',
  negative: 'Negative',
  neutral: 'Neutral'
};

function App() {
  const [transcript, setTranscript] = useState('');
  const [analysis, setAnalysis] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleAnalyze() {
    const cleanTranscript = transcript.trim();
    setError('');
    setAnalysis(null);

    if (!cleanTranscript) {
      setError('Please paste a supervisor transcript before running analysis.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ transcript: cleanTranscript })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || data.error || 'Analysis failed.');
      }

      setAnalysis(data);
    } catch (err) {
      setError(err.message || 'Could not analyze transcript. Check that the backend and Ollama are running.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="app-shell">
      <section className="input-panel">
        <div className="header-row">
          <div>
            <p className="eyebrow">Trinethra Module</p>
            <h1>Supervisor Feedback Analyzer</h1>
          </div>
          <button className="secondary-button" type="button" onClick={() => setTranscript(SAMPLE_TRANSCRIPT)}>
            Use sample transcript
          </button>
        </div>

        <label htmlFor="transcript">Supervisor transcript</label>
        <textarea
          id="transcript"
          value={transcript}
          onChange={(event) => setTranscript(event.target.value)}
          placeholder="Paste the supervisor call transcript here..."
        />

        {error && <div className="error-box">{error}</div>}

        <button className="primary-button" type="button" disabled={loading} onClick={handleAnalyze}>
          {loading ? 'Analyzing...' : 'Run Analysis'}
        </button>
      </section>

      {loading && <div className="status-box">Analyzing transcript with Ollama. This can take a moment.</div>}

      {analysis && <AnalysisView analysis={analysis} />}
    </main>
  );
}

function AnalysisView({ analysis }) {
  return (
    <section className="results-panel">
      <div className="disclaimer">⚠️ AI-generated draft. Please review before finalizing.</div>

      <section className="score-section">
        <div>
          <p className="section-label">Score</p>
          <h2>
            {analysis.score.value ?? 'N/A'} <span>/ 10</span>
          </h2>
        </div>
        <div>
          <h3>{analysis.score.label}</h3>
          <p className="muted">
            {analysis.score.band} · Confidence: {analysis.score.confidence}
          </p>
        </div>
      </section>

      <Section title="Justification">
        <p>{analysis.score.justification}</p>
      </Section>

      <Section title="Evidence">
        <div className="evidence-grid">
          {analysis.evidence.map((item, index) => (
            <article className={`evidence-card ${item.signal}`} key={`${item.quote}-${index}`}>
              <span>{signalLabels[item.signal] || item.signal}</span>
              <blockquote>{item.quote}</blockquote>
              <p>{item.interpretation}</p>
              <small>{item.dimension}</small>
            </article>
          ))}
        </div>
      </Section>

      <Section title="KPI Mapping">
        <div className="list-grid">
          {analysis.kpiMapping.map((item, index) => (
            <article className="compact-card" key={`${item.kpi}-${index}`}>
              <strong>{item.kpi}</strong>
              <p>{item.evidence}</p>
              <small>{item.systemOrPersonal}</small>
            </article>
          ))}
        </div>
      </Section>

      <Section title="Gaps">
        <div className="list-grid">
          {analysis.gaps.map((gap, index) => (
            <article className="compact-card" key={`${gap.dimension}-${index}`}>
              <strong>{gap.dimension}</strong>
              <p>{gap.detail}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section title="Questions">
        <div className="question-list">
          {analysis.followUpQuestions.map((item, index) => (
            <article className="compact-card" key={`${item.question}-${index}`}>
              <strong>{item.question}</strong>
              <p>{item.lookingFor}</p>
              <small>{item.targetGap}</small>
            </article>
          ))}
        </div>
      </Section>
    </section>
  );
}

function Section({ title, children }) {
  return (
    <section className="content-section">
      <h2>{title}</h2>
      {children}
    </section>
  );
}

export default App;
