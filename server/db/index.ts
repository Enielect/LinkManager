import { drizzle } from 'drizzle-orm/postgres-js';

import * as schema from './schema';

import postgres from 'postgres';

const connectionString = process.env.DATABASE_URL as string;
const client = postgres(connectionString, {
  prepare: false,
});
export const db = drizzle(client, {
  // Optional: You can add schema here if needed
  // schema: yourSchema
  schema,
});

// You can now use db to send queries, for example:
// await db.select().from(yourTable)
