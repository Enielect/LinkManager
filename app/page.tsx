import HomePage from '@/components/HomePage';
import { createClient } from '@/lib/supabase/server';
import { getCategories } from '@/server/db/queries/select';
import { redirect } from 'next/navigation';

export default async function LinkMinder() {
  // extractMetaData('https://example.com').then((metadata) =>
  //   console.log(metadata)
  // );
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();
  console.log(data, 'user data');
  //fetch categories
  if (error || !data?.user) {
    redirect('/login');
  }
  const userId = data.user.id;
  const categories = await getCategories(userId);
  console.log(categories, 'categories');

  return <HomePage categories={categories} userId={userId} />;
}
