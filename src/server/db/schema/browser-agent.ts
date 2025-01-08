import { relations, sql } from 'drizzle-orm';
import {
  index,
  int,
  primaryKey,
  sqliteTableCreator,
  text,
} from 'drizzle-orm/sqlite-core';
import { createTable, users } from '.';

export const browserAgent = createTable(
  'browser_agent',
  {
    id: int('id').primaryKey({ autoIncrement: true }),
    title: text('title').notNull(),
    description: text('description'),
    userId: text('userId', { length: 255 })
      .notNull()
      .references(() => users.id),
    sandboxId: text('sandbox_id'),
    sandboxActivatedAt: text('sandbox_activated_at'),
    metadata: text('metadata', { mode: 'json' }).$type<Record<string, any>>(),
    createdAt: int('created_at', { mode: 'timestamp' })
      .default(sql`(unixepoch())`)
      .notNull(),
    updatedAt: int('updated_at', { mode: 'timestamp' })
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (table) => [index('user_id_idx').on(table.userId)],
);

export const browserAgentRelations = relations(browserAgent, ({ one }) => ({
  user: one(users, {
    fields: [browserAgent.userId],
    references: [users.id],
  }),
}));

export const userbrowserAgentRelations = relations(users, ({ many }) => ({
	browserAgent: many(browserAgent),
}));

import { createSelectSchema } from 'drizzle-zod';
import { createInsertSchema } from 'drizzle-zod';
import { createUpdateSchema } from 'drizzle-zod';
import { z } from 'zod';

export const browserAgentSelectSchema = createSelectSchema(browserAgent);
export const browserAgentInsertSchema = createInsertSchema(browserAgent).omit({
  userId: true,
});
export const browserAgentUpdateSchema = createUpdateSchema(browserAgent);
export const browserAgentIdSchema = browserAgentSelectSchema.pick({ id: true });

export type BrowserAgent = z.infer<typeof browserAgentSelectSchema>;
export type NewBrowserAgent = z.infer<typeof browserAgentInsertSchema>;
export type UpdatedBrowserAgent = z.infer<typeof browserAgentUpdateSchema>;
export type BrowserAgentId = z.infer<typeof browserAgentIdSchema>;
