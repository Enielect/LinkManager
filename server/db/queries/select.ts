import { db } from '..';

export async function getCategories(userId: string) {
  //note I was only able to query my db from drizzle after adding the schema to the schema property in
  // drizzle(client, {
  // schema,
  //  });

return await db.query.category.findMany({
    where: (category, { eq }) => eq(category.userId, userId),
    columns: {
        name: true,
    },
});
}
