import { Router } from 'express';
import { generateResponse, streamResponse } from '../controllers/anthropicController.js';

const router = Router();

router.post('/generate', generateResponse);
router.post('/stream', streamResponse);

export default router;