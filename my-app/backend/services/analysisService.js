import { callOllama } from './ollamaService.js';
import { buildAnalysisPrompt, buildJsonRepairPrompt } from '../utils/promptBuilder.js';
import { parseJsonFromText } from '../utils/jsonParser.js';
import { validateAnalysis } from '../utils/analysisValidator.js';

export async function analyzeTranscript(transcript) {
  try {
    const firstPrompt = buildAnalysisPrompt(transcript);
    console.log('Built first prompt. Length:', firstPrompt.length);
    const firstResponse = await callOllama(firstPrompt);
    console.log('Received response from Ollama. Length:', firstResponse.length);
    const firstParsed = parseAndValidate(firstResponse);
    console.log('Parsed response. OK:', firstParsed.ok);

    if (firstParsed.ok) {
      return firstParsed.data;
    }

    console.log('Initial validation failed. Attempting repair retry...');
    
    const repairPrompt = buildJsonRepairPrompt(firstResponse, firstParsed.error || 'Unknown validation error');
    const repairedResponse = await callOllama(repairPrompt, { temperature: 0 });
    const repairedParsed = parseAndValidate(repairedResponse);

    if (repairedParsed.ok) {
      return repairedParsed.data;
    }

    // If repair fails but we have SOME data from the first attempt, return it anyway
    if (firstParsed.data && firstParsed.data.score) {
      console.log('Returning partial data after failed repair.');
      return firstParsed.data;
    }

    return buildFallbackError(repairedParsed.error || firstParsed.error);
  } catch (error) {
    return buildFallbackError(error.message);
  }
}

function parseAndValidate(llmText) {
  try {
    const parsed = parseJsonFromText(llmText);
    const validation = validateAnalysis(parsed);

    return { 
      ok: validation.valid, 
      data: parsed, 
      error: validation.valid ? null : validation.errors.join('; ') 
    };
  } catch (error) {
    return { ok: false, data: null, error: error.message };
  }
}

function buildFallbackError(reason) {
  return {
    score: {
      value: null,
      label: 'Analysis unavailable',
      band: 'Unknown',
      justification: `The AI analysis failed to meet strict quality criteria. Reason: ${reason}. Please try running the analysis again.`,
      confidence: 'low'
    },
    evidence: [
      {
        quote: 'No reliable evidence could be extracted.',
        signal: 'neutral',
        dimension: 'unknown',
        interpretation: 'The model response did not pass our safety or structure checks.'
      }
    ],
    kpiMapping: [],
    gaps: [
      {
        dimension: 'Analysis Error',
        detail: reason
      }
    ],
    followUpQuestions: [
      {
        question: 'Could you provide a specific example of a system or process the Fellow built?',
        targetGap: 'systems_building',
        lookingFor: 'Durable infrastructure'
      },
      {
        question: 'What business number (TAT, Quality, etc.) changed because of this work?',
        targetGap: 'kpi_impact',
        lookingFor: 'Measurable outcomes'
      }
    ]
  };
}
