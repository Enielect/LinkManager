import HomePage from '@/components/HomePage';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export default async function LinkMinder() {
  // extractMetaData('https://example.com').then((metadata) =>
  //   console.log(metadata)
  // );
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect('/login');
  }

  return <HomePage />;
}
