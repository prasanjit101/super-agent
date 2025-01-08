import { z } from 'zod';

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from '@/server/api/trpc';
import { eq } from 'drizzle-orm';
import { browserAgentSelectSchema } from '@/server/db/schema';

export const sandboxRouter = createTRPCRouter({
  start: protectedProcedure.input(browserAgentSelectSchema).mutation(async ({ ctx, input }) => {
      
  }),
  stop: protectedProcedure.input(browserAgentSelectSchema).mutation(async ({ ctx, input }) => {
      
  }),
  stream: protectedProcedure.input(browserAgentSelectSchema).mutation(async ({ ctx, input }) => {
      
  }),
});
