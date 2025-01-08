import { z } from 'zod';

export * from './auth';
export * from './browser-agent';
export const listUserResourceSchema = z.object({
  id: z.string(),
});
