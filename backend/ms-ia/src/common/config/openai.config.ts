import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';

export const createOpenAIInstance = (configService: ConfigService): OpenAI => {
  const apiKey = configService.get<string>('API_KEY_GPT');
  return new OpenAI({
    apiKey,
  });
};
