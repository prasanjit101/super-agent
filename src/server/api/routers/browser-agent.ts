import { z } from 'zod';

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from '@/server/api/trpc';
import {
  browserAgentIdSchema,
  browserAgentInsertSchema,
  browserAgentUpdateSchema,
  browserAgentSelectSchema,
  browserAgent,
  listUserResourceSchema,
} from '@/server/db/schema';
import { eq } from 'drizzle-orm';

export const browserAgentRouter = createTRPCRouter({
  create: protectedProcedure
    .input(browserAgentInsertSchema)
    .mutation(async ({ ctx, input }) => {
      console.log({ input });
      await ctx.db
        .insert(browserAgent)
        .values({ ...input, userId: ctx.session.user.id });
    }),

  list: protectedProcedure.query(async ({ ctx, input }) => {
    const browserAgents = await ctx.db.query.browserAgent.findMany({
      where: (browserAgent, { eq }) =>
        eq(browserAgent.userId, ctx.session.user.id),
    });
    return browserAgents;
  }),
  get: protectedProcedure
    .input(browserAgentIdSchema)
    .query(async ({ ctx, input }) => {
      const browserAgent = await ctx.db.query.browserAgent.findFirst({
        where: (browserAgent, { eq }) => eq(browserAgent.id, input.id),
      });
      return browserAgent;
    }),
  update: protectedProcedure
    .input(browserAgentUpdateSchema)
    .mutation(async ({ ctx, input }) => {
      if (!input.id) throw new Error('id is required');
      const b = await ctx.db
        .update(browserAgent)
        .set(input)
        .where(eq(browserAgent.id, input.id))
        .returning();
      return b;
    }),
  delete: protectedProcedure
    .input(browserAgentIdSchema)
    .mutation(async ({ ctx, input }) => {
      await ctx.db.delete(browserAgent).where(eq(browserAgent.id, input.id));
    }),
});
