import { Request, Response, NextFunction } from 'express';
import Anthropic from '@anthropic-ai/sdk';
import { logger } from '../utils/logger.js';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY
});

export const generateResponse = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { messages, model = 'claude-3-opus-20240229', max_tokens = 1024 } = req.body;

    const response = await anthropic.messages.create({
      model,
      max_tokens,
      messages
    });

    res.json(response);
  } catch (error) {
    logger.error('Error generating response:', error);
    next(error);
  }
};

export const streamResponse = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { messages, model = 'claude-3-opus-20240229', max_tokens = 1024 } = req.body;

    const stream = await anthropic.messages.create({
      model,
      max_tokens,
      messages,
      stream: true
    });

    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    for await (const chunk of stream) {
      res.write(`data: ${JSON.stringify(chunk)}\n\n`);
    }

    res.end();
  } catch (error) {
    logger.error('Error streaming response:', error);
    next(error);
  }
};