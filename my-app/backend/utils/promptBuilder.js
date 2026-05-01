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

Important scoring rules:
- Score 6 means reliable execution of assigned work.
- Score 7 requires independent problem identification beyond assigned tasks.
- Do not over-score task absorption, helpfulness, personal heroics, or being constantly present.
- Reward durable systems: SOPs, trackers, dashboards, workflows, accountability structures, or processes that can run without the Fellow.
- Detect gaps in these dimensions: ${DIMENSION_IDS}.
- Map KPI impact only to these KPIs: ${KPI_NAMES}.

Required JSON schema:
{
  "score": {
    "value": 1-10,
    "label": "rubric label",
    "band": "Need Attention | Productivity | Performance",
    "justification": "one paragraph grounded in evidence",
    "confidence": "low | medium | high"
  },
  "evidence": [
    {
      "quote": "exact quote from transcript",
      "signal": "positive | negative | neutral",
      "dimension": "execution | systems_building | kpi_impact | change_management | problem_identification",
      "interpretation": "why this quote matters"
    }
  ],
  "kpiMapping": [
    {
      "kpi": "one KPI label from the allowed list or None",
      "evidence": "plain-language KPI evidence from transcript",
      "systemOrPersonal": "system | personal | mixed | none"
    }
  ],
  "gaps": [
    {
      "dimension": "missing or weak assessment dimension",
      "detail": "what the transcript does not cover"
    }
  ],
  "followUpQuestions": [
    {
      "question": "specific question the intern should ask next",
      "targetGap": "gap this question addresses",
      "lookingFor": "what a useful answer would reveal"
    }
  ]
}

Hard requirements:
- evidence must contain 3 to 6 items.
- Each evidence.quote must be copied from the transcript.
- Every evidence.signal must be positive, negative, or neutral.
- kpiMapping must contain at least 1 item. Use kpi "None" only if no KPI evidence exists.
- gaps must contain at least 1 item.
- followUpQuestions must contain 3 to 5 items.
- Do not return empty arrays.
- Do not invent facts not in the transcript.

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
- evidence: 3 to 6 items
- kpiMapping: at least 1 item
- gaps: at least 1 item
- followUpQuestions: 3 to 5 items

Validation problem:
${parseError}

Bad output:
"""
${badResponse}
"""
`.trim();
}
