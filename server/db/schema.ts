// import { relations, sql } from 'drizzle-orm';
import { relations } from 'drizzle-orm';
import {
  serial,
  uuid,
  timestamp,
  text,
  varchar,
  boolean,
  pgTable,
} from 'drizzle-orm/pg-core';
// import type { AdapterAccountType } from 'next-auth/adapters';

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
// export const createTable = pgTableCreator((name) => `better-nextjs_${name}`);
// I am not sure we need the users table since supabase provides authentication out of the box for us

export const linksTable = pgTable('links_table', {
  id: serial('id').primaryKey().notNull(),
  title: varchar('title', { length: 255 }).notNull(),
  read: boolean('read').notNull().default(false),
  url: varchar('url', { length: 255 }).notNull(),
  img: text('img'),
  categoryId: serial('category_id').references(() => category.id),
  toBeReadToday: boolean('toBeReadToday').notNull().default(false),
  description: text('description'),
  updatedAt: timestamp('updated_at').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  profileId: serial('profile_id').notNull(),
});

export const notificationsTable = pgTable('notifications_table', {
  id: serial('id').primaryKey().notNull(),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description').notNull(),
  read: boolean('read').notNull().default(false),
});

export const category = pgTable('category_table', {
  id: serial('id').primaryKey().notNull(),
  name: varchar('name', { length: 255 }).notNull(),
  userId: uuid('user_id')
    .references(() => profiles.id)
    .notNull(),
});

export const profiles = pgTable('profiles', {
  id: uuid('id').primaryKey().notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

export const categoryRelation = relations(category, ({ many, one }) => ({
  links: many(linksTable),
  user: one(profiles, {
    fields: [category.userId],
    references: [profiles.id],
  }),
}));

export const profilesRelation = relations(profiles, ({ many }) => ({
  categories: many(category),
}));

export const linksRelation = relations(linksTable, ({ one }) => ({
  category: one(category, {
    fields: [linksTable.categoryId],
    references: [category.id],
  }),
}));

export type InsertLinks = typeof linksTable.$inferInsert;
export type SelectLinks = typeof linksTable.$inferSelect;

export type InsertNotifications = typeof notificationsTable.$inferInsert;
export type SelectNotifications = typeof notificationsTable.$inferSelect;

export type InsertCategory = typeof category.$inferInsert;
export type SelectCategory = typeof category.$inferSelect;

export type SelectProfiles = typeof profiles.$inferSelect;
