import { db } from '..';
import { category } from '../schema';

export async function createCategory(name: string, userId: string) {
  await db.insert(category).values({ name, userId });
}
