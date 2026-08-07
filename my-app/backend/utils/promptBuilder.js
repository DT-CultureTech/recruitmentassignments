import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..', '..');
const rubric = JSON.parse(fs.readFileSync(path.join(rootDir, 'rubric.json'), 'utf8'));

const KPI_NAMES = rubric.kpis.map((kpi) => kpi.label).join(', ');
const DIMENSION_IDS = rubric.assessmentDimensions.map((dimension) => dimension.id).join(', ');
const RUBRIC_SUMMARY = rubric.rubric.bands
  .flatMap((band) =>
    band.levels.map((level) => `${level.score}: ${level.label} (${band.band}) - ${level.description}`)
  )
  .join('\n');
const KPI_SUMMARY = rubric.kpis.map((kpi) => `${kpi.label}: ${kpi.description}`).join('\n');
const DIMENSION_SUMMARY = rubric.assessmentDimensions
  .map((dimension) => `${dimension.id}: ${dimension.description}`)
  .join('\n');

export function buildAnalysisPrompt(transcript) {
  return `
You are analyzing supervisor feedback about a DeepThought Fellow.

Return STRICT JSON ONLY. No markdown, no prose before or after the JSON, no comments, no trailing commas.

Use this rubric and domain data:
${RUBRIC_SUMMARY}

KPIs:
${KPI_SUMMARY}

Assessment dimensions:
${DIMENSION_SUMMARY}

Important diagnostic tools:
- The Survivability Test: If the Fellow left tomorrow, would the system they built continue running? (Yes = systems building, No = task execution).
- Watch for Supervisor Biases:
  1. Helpfulness bias: "She handles all my calls" is task absorption (Score 5-6), not systems building.
  2. Presence bias: "He's always on the floor" is presence, not necessarily performance.
  3. Recency bias: Focus on the full 3-6 month tenure, not just the last week.

Important scoring rules:
- Score 6: Excellent executor of tasks defined by others. "He does everything I give him."
- Score 7: Independent problem identification. "She noticed a pattern I hadn't seen and started tracking it."
- A 6 takes initiative within assigned scope. A 7 expands the scope.

Required JSON schema:
{
  "score": {
    "value": 1-10,
    "label": "rubric label from rubric.json",
    "band": "Need Attention | Productivity | Performance",
    "justification": "one paragraph grounded in evidence and addressing biases",
    "confidence": "low | medium | high"
  },
  "evidence": [
    {
      "quote": "exact quote from transcript",
      "signal": "positive | negative | neutral",
      "dimension": "execution | systems_building | kpi_impact | change_management",
      "interpretation": "why this matters for the score"
    }
  ],
  "kpiMapping": [
    {
      "kpi": "one KPI label (e.g., Quality, TAT, NPS, PAT)",
      "evidence": "plain-language summary of impact",
      "systemOrPersonal": "system | personal"
    }
  ],
  "gaps": [
    {
      "dimension": "missing dimension",
      "detail": "what was not discussed"
    }
  ],
  "followUpQuestions": [
    {
      "question": "specific question for next call",
      "targetGap": "dimension it targets",
      "lookingFor": "what a useful answer would reveal"
    }
  ]
}

Hard requirements:
- evidence: at least 3 items.
- followUpQuestions: at least 3 items.
- kpiMapping: at least 1 item.
- gaps: at least 1 item.
- Each evidence.quote must be an exact substring from the transcript.
- Do not return empty arrays or null for required sections.

Example JSON:
{
  "score": {
    "value": 6,
    "label": "Reliable and Productive",
    "band": "Productivity",
    "justification": "The supervisor describes strong task execution...",
    "confidence": "medium"
  },
  "evidence": [
    {
      "quote": "He helps me with production tracking. Every evening he updates it...",
      "signal": "positive",
      "dimension": "execution",
      "interpretation": "Reliable daily task completion"
    }
  ],
  "kpiMapping": [
    {
      "kpi": "Quality",
      "evidence": "Handles quality complaints from Tier 1 customers",
      "systemOrPersonal": "personal"
    }
  ],
  "gaps": [
    {
      "dimension": "systems_building",
      "detail": "Transcript mentions one system but it's personally maintained."
    }
  ],
  "followUpQuestions": [
    {
      "question": "If Karthik took a week off, what would stop working?",
      "targetGap": "systems_building",
      "lookingFor": "Sustainability of work"
    }
  ]
}

Transcript:
"""
${transcript}
"""
`.trim();
}

export function buildJsonRepairPrompt(badResponse, parseError) {
  return `
Fix the following LLM output into STRICT valid JSON only.
Do not add markdown, explanations, or extra keys.
Preserve the intended meaning, but ensure all required fields exist and non-empty arrays meet these counts:
- evidence: at least 3 items
- kpiMapping: at least 1 item
- gaps: at least 1 item
- followUpQuestions: at least 3 items

Validation problem:
${parseError}

Bad output:
"""
${badResponse}
"""
`.trim();
}
