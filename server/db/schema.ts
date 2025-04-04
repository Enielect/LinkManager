// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

// import { relations, sql } from 'drizzle-orm';
import { serial, timestamp, text, pgTable } from 'drizzle-orm/pg-core';
// import type { AdapterAccountType } from 'next-auth/adapters';

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
// export const createTable = pgTableCreator((name) => `better-nextjs_${name}`);
// I am not sure we need the users table since supabase provides authentication out of the box for us

export const usersTable = pgTable('links_table', {
  id: serial('id').primaryKey().notNull(),
  // avatar_url: text('avatar_url'), for now uploading profile images is not supported
  address: text('address').notNull(),
  description: text('description'),
  updated_at: timestamp('updated_at').notNull(),
  created_at: timestamp('created_at').notNull().defaultNow()
});