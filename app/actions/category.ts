'use server';

import { createCategory } from '@/server/db/queries/insert';

export async function addCategory(name: string, userId: string) {
  await createCategory(name, userId);
}
