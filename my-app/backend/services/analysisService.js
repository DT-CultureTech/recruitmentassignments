import { callOllama } from './ollamaService.js';
import { buildAnalysisPrompt, buildJsonRepairPrompt } from '../utils/promptBuilder.js';
import { parseJsonFromText } from '../utils/jsonParser.js';
import { validateAnalysis } from '../utils/analysisValidator.js';

export async function analyzeTranscript(transcript) {
  try {
    const firstPrompt = buildAnalysisPrompt(transcript);
    const firstResponse = await callOllama(firstPrompt);
    const firstParsed = parseAndValidate(firstResponse);

    if (firstParsed.ok) {
      return firstParsed.data;
    }

    // One repair retry keeps the API resilient without hiding persistent LLM failures.
    const repairPrompt = buildJsonRepairPrompt(firstResponse, firstParsed.error);
    const repairedResponse = await callOllama(repairPrompt, { temperature: 0 });
    const repairedParsed = parseAndValidate(repairedResponse);

    if (repairedParsed.ok) {
      return repairedParsed.data;
    }

    return buildFallbackError(repairedParsed.error);
  } catch (error) {
    return buildFallbackError(error.message);
  }
}

function parseAndValidate(llmText) {
  try {
    const parsed = parseJsonFromText(llmText);
    const validation = validateAnalysis(parsed);

    if (!validation.valid) {
      return { ok: false, error: validation.errors.join('; ') };
    }

    return { ok: true, data: parsed };
  } catch (error) {
    return { ok: false, error: error.message };
  }
}

function buildFallbackError(reason) {
  return {
    score: {
      value: null,
      label: 'Analysis unavailable',
      band: 'Unknown',
      justification: 'The model response could not be converted into the required structured format.',
      confidence: 'low'
    },
    evidence: [
      {
        quote: 'No reliable evidence could be extracted.',
        signal: 'neutral',
        dimension: 'unknown',
        interpretation: 'Retry the analysis or review the transcript manually.'
      },
      {
        quote: 'Structured evidence extraction failed.',
        signal: 'neutral',
        dimension: 'structured_output',
        interpretation: 'The response did not pass parsing or validation, so transcript quotes were not trusted.'
      },
      {
        quote: 'Manual review required.',
        signal: 'neutral',
        dimension: 'structured_output',
        interpretation: 'Use the follow-up questions below while rerunning the analysis.'
      }
    ],
    kpiMapping: [
      {
        kpi: 'Unknown',
        evidence: 'KPI mapping unavailable because structured parsing failed.',
        systemOrPersonal: 'unknown'
      }
    ],
    gaps: [
      {
        dimension: 'structured_output',
        detail: `The LLM did not return valid structured JSON after one repair attempt: ${reason}`
      }
    ],
    followUpQuestions: [
      {
        question: 'Can you describe one specific example of what the Fellow changed or built?',
        targetGap: 'structured_output',
        lookingFor: 'Human-verifiable evidence while the AI output is unavailable.'
      },
      {
        question: 'If the Fellow left tomorrow, what would keep running without them?',
        targetGap: 'systems_building',
        lookingFor: 'Whether the Fellow created durable systems or only handled tasks personally.'
      },
      {
        question: 'Which business number improved because of the Fellow work?',
        targetGap: 'kpi_impact',
        lookingFor: 'A measurable KPI connection.'
      }
    ]
  };
}
