export function parseJsonFromText(text) {
  if (!text || typeof text !== 'string') {
    throw new Error('LLM response was empty.');
  }

  const direct = tryParse(text.trim());
  if (direct.ok) return direct.value;

  const fenced = text.match(/```(?:json)?\s*([\s\S]*?)```/i);
  if (fenced) {
    const parsedFence = tryParse(fenced[1].trim());
    if (parsedFence.ok) return parsedFence.value;
  }

  const extracted = extractFirstJsonObject(text);
  const extractedParsed = tryParse(extracted);
  if (extractedParsed.ok) return extractedParsed.value;

  throw new Error('Unable to parse valid JSON from LLM response.');
}

function tryParse(value) {
  try {
    return { ok: true, value: JSON.parse(value) };
  } catch {
    return { ok: false };
  }
}

function extractFirstJsonObject(text) {
  const start = text.indexOf('{');
  if (start === -1) {
    throw new Error('No JSON object found in LLM response.');
  }

  let depth = 0;
  let inString = false;
  let escaped = false;

  for (let index = start; index < text.length; index += 1) {
    const char = text[index];

    if (escaped) {
      escaped = false;
      continue;
    }

    if (char === '\\') {
      escaped = true;
      continue;
    }

    if (char === '"') {
      inString = !inString;
      continue;
    }

    if (inString) continue;

    if (char === '{') depth += 1;
    if (char === '}') depth -= 1;

    if (depth === 0) {
      return text.slice(start, index + 1);
    }
  }

  throw new Error('JSON object was not closed in LLM response.');
}
