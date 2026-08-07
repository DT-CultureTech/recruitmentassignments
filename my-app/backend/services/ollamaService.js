import fetch from 'node-fetch';

const OLLAMA_URL = process.env.OLLAMA_URL || 'http://localhost:11434/api/generate';
const OLLAMA_MODEL = process.env.OLLAMA_MODEL || 'llama3.2';
const OLLAMA_TIMEOUT_MS = Number(process.env.OLLAMA_TIMEOUT_MS || 240000);

export async function callOllama(prompt, options = {}) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), OLLAMA_TIMEOUT_MS);

  console.log(`Calling Ollama model: ${OLLAMA_MODEL} with prompt length: ${prompt.length}`);
  const response = await fetch(OLLAMA_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    signal: controller.signal,
    body: JSON.stringify({
      model: OLLAMA_MODEL,
      prompt,
      stream: false,
      options: {
        temperature: options.temperature ?? 0.2,
        top_p: options.topP ?? 0.9,
        num_ctx: options.numCtx ?? 4096,
        num_predict: options.numPredict ?? 1800
      }
    })
  }).finally(() => {
    clearTimeout(timeout);
    console.log('Ollama request finished (success or failure).');
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Ollama request failed (${response.status}): ${body}`);
  }

  const data = await response.json();

  if (!data.response) {
    throw new Error('Ollama response did not include a response field.');
  }

  return data.response;
}
