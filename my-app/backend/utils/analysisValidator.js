const SIGNALS = new Set(['positive', 'negative', 'neutral']);
const CONFIDENCE = new Set(['low', 'medium', 'high']);

export function validateAnalysis(data) {
  const errors = [];

  if (!isObject(data)) {
    return { valid: false, errors: ['Analysis must be a JSON object.'] };
  }

  validateScore(data.score, errors);
  validateEvidence(data.evidence, errors);
  validateKpiMapping(data.kpiMapping, errors);
  validateGaps(data.gaps, errors);
  validateQuestions(data.followUpQuestions, errors);

  return { valid: errors.length === 0, errors };
}

function validateScore(score, errors) {
  if (!isObject(score)) {
    errors.push('score object is required.');
    return;
  }

  if (!Number.isInteger(score.value) || score.value < 1 || score.value > 10) {
    errors.push('score.value must be an integer from 1 to 10.');
  }

  ['label', 'band', 'justification'].forEach((field) => {
    if (!nonEmptyString(score[field])) errors.push(`score.${field} is required.`);
  });

  if (!CONFIDENCE.has(score.confidence)) {
    errors.push('score.confidence must be low, medium, or high.');
  }
}

function validateEvidence(evidence, errors) {
  if (!Array.isArray(evidence) || evidence.length < 1) {
    errors.push('at least 1 evidence item is required.');
    return;
  }

  evidence.forEach((item, index) => {
    if (!nonEmptyString(item?.quote)) errors.push(`evidence[${index}].quote is required.`);
    if (!SIGNALS.has(item?.signal)) errors.push(`evidence[${index}].signal is invalid.`);
  });
}

function validateKpiMapping(kpiMapping, errors) {
  if (!Array.isArray(kpiMapping)) {
    errors.push('kpiMapping must be an array.');
    return;
  }
}

function validateGaps(gaps, errors) {
  if (!Array.isArray(gaps)) {
    errors.push('gaps must be an array.');
    return;
  }
}

function validateQuestions(questions, errors) {
  if (!Array.isArray(questions) || questions.length < 1) {
    errors.push('at least 1 follow-up question is required.');
    return;
  }

  questions.forEach((item, index) => {
    if (!nonEmptyString(item?.question)) errors.push(`followUpQuestions[${index}].question is required.`);
  });
}

function isObject(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function nonEmptyString(value) {
  return typeof value === 'string' && value.trim().length > 0;
}
