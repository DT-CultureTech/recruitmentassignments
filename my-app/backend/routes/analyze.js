import { Router } from 'express';
import { analyzeTranscript } from '../services/analysisService.js';

const router = Router();

router.post('/', async (req, res, next) => {
  try {
    const transcript = String(req.body?.transcript || '').trim();

    if (!transcript) {
      return res.status(400).json({ error: 'Transcript is required.' });
    }

    if (transcript.length < 80) {
      return res.status(400).json({
        error: 'Transcript is too short.',
        detail: 'Please paste a full supervisor transcript before running analysis.'
      });
    }

    const analysis = await analyzeTranscript(transcript);
    return res.json(analysis);
  } catch (error) {
    next(error);
  }
});

export default router;
