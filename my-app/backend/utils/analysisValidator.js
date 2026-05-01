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
  if (!Array.isArray(evidence) || evidence.length < 3 || evidence.length > 6) {
    errors.push('evidence must contain 3 to 6 items.');
    return;
  }

  evidence.forEach((item, index) => {
    if (!nonEmptyString(item?.quote)) errors.push(`evidence[${index}].quote is required.`);
    if (!SIGNALS.has(item?.signal)) errors.push(`evidence[${index}].signal is invalid.`);
    if (!nonEmptyString(item?.dimension)) errors.push(`evidence[${index}].dimension is required.`);
    if (!nonEmptyString(item?.interpretation)) errors.push(`evidence[${index}].interpretation is required.`);
  });
}

function validateKpiMapping(kpiMapping, errors) {
  if (!Array.isArray(kpiMapping) || kpiMapping.length === 0) {
    errors.push('kpiMapping must contain at least 1 item.');
    return;
  }

  kpiMapping.forEach((item, index) => {
    if (!nonEmptyString(item?.kpi)) errors.push(`kpiMapping[${index}].kpi is required.`);
    if (!nonEmptyString(item?.evidence)) errors.push(`kpiMapping[${index}].evidence is required.`);
    if (!nonEmptyString(item?.systemOrPersonal)) errors.push(`kpiMapping[${index}].systemOrPersonal is required.`);
  });
}

function validateGaps(gaps, errors) {
  if (!Array.isArray(gaps) || gaps.length === 0) {
    errors.push('gaps must contain at least 1 item.');
    return;
  }

  gaps.forEach((item, index) => {
    if (!nonEmptyString(item?.dimension)) errors.push(`gaps[${index}].dimension is required.`);
    if (!nonEmptyString(item?.detail)) errors.push(`gaps[${index}].detail is required.`);
  });
}

function validateQuestions(questions, errors) {
  if (!Array.isArray(questions) || questions.length < 3 || questions.length > 5) {
    errors.push('followUpQuestions must contain 3 to 5 items.');
    return;
  }

  questions.forEach((item, index) => {
    if (!nonEmptyString(item?.question)) errors.push(`followUpQuestions[${index}].question is required.`);
    if (!nonEmptyString(item?.targetGap)) errors.push(`followUpQuestions[${index}].targetGap is required.`);
    if (!nonEmptyString(item?.lookingFor)) errors.push(`followUpQuestions[${index}].lookingFor is required.`);
  });
}

function isObject(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function nonEmptyString(value) {
  return typeof value === 'string' && value.trim().length > 0;
}
