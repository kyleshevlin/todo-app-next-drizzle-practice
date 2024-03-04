import { text, boolean, pgTable, serial, timestamp } from 'drizzle-orm/pg-core'

export const todo = pgTable('todo', {
  id: serial('id').primaryKey(),
  text: text('text').notNull(),
  done: boolean('done').default(false).notNull(),
  createdAt: timestamp('createdAt', { precision: 6, withTimezone: true })
    .defaultNow()
    .notNull(),
})
