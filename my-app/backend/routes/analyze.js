const express = require("express");
const router = express.Router();
const runOllama = require("../utils/ollama");

async function safeParse(response, runOllama) {
  try {
    const start = response.indexOf("{");
    const end = response.lastIndexOf("}") + 1;
    return JSON.parse(response.slice(start, end));
  } catch (err) {
    console.log("Retrying...");

    const retryPrompt = `
Fix this into STRICT valid JSON only:

${response}
`;

    const retry = await runOllama(retryPrompt);

    const start = retry.indexOf("{");
    const end = retry.lastIndexOf("}") + 1;

    return JSON.parse(retry.slice(start, end));
  }
}

router.post("/", async (req, res) => {
  const { transcript } = req.body;

  const prompt = `
SYSTEM ROLE:
You are a strict evaluator trained in structured behavioral analysis.

You MUST behave like a psychology intern at DeepThought analyzing supervisor feedback.

You are NOT allowed to be generic.
You are NOT allowed to assume facts not present in transcript.
You are NOT allowed to skip any section.

----------------------------------------

OBJECTIVE:
Convert unstructured supervisor transcript into structured evaluation.

----------------------------------------

INPUT RULES:
- Use ONLY the given transcript
- DO NOT hallucinate missing details
- If something is missing → explicitly mention it in "gaps"

----------------------------------------

ANALYSIS STEPS (MANDATORY):

STEP 1: Evidence Extraction
- Extract 4 to 8 EXACT quotes from transcript
- Each quote MUST reflect behavior
- Tag each as: positive / negative / neutral
- Do NOT paraphrase

STEP 2: Scoring (1 to 10)
- Base ONLY on extracted evidence
- Score must reflect consistency + depth
- Justification must reference quotes

STEP 3: KPI Mapping
Map behavior to relevant KPIs:
- productivity
- ownership
- communication
- system building
- execution discipline
- problem solving

Only include KPIs that have clear evidence.

STEP 4: Gap Detection (CRITICAL THINKING)
Identify what is NOT mentioned:
- No leadership evidence?
- No team response?
- No systems built?
- No long-term impact?

Gaps must be specific and meaningful.

STEP 5: Follow-up Questions
- Generate 3 to 5 sharp questions
- Each question MUST target a gap
- Avoid generic questions

----------------------------------------

STRICT OUTPUT RULES:
- Return ONLY valid JSON
- No explanation outside JSON
- Do NOT add markdown
- Do NOT add extra text

----------------------------------------

OUTPUT FORMAT:

{
  "evidence": [
    { "quote": "...", "type": "positive/negative/neutral" }
  ],
  "score": number,
  "justification": "...",
  "kpis": ["..."],
  "gaps": ["..."],
  "questions": ["..."]
}

----------------------------------------

TRANSCRIPT:
${transcript}
`;

  try {
  const response = await runOllama(prompt);

  const parsed = await safeParse(response, runOllama);

  res.json(parsed);
} catch (err) {
  console.error(err);
  res.status(500).json({ error: "Failed to analyze" });
}
});

module.exports = router;