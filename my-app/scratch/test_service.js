import { analyzeTranscript } from '../backend/services/analysisService.js';
import 'dotenv/config';

const transcript = `Karthik is a good worker. He helps with production tracking and coordination. He doesn't push back much. He saved 10 mins in material handling.`;

async function test() {
  console.log('Testing analysis service directly with short transcript...');
  try {
    const data = await analyzeTranscript(transcript);
    console.log(JSON.stringify(data, null, 2));
  } catch (err) {
    console.error('Test failed:', err);
  }
}

test();
