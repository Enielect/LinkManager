'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { createClient } from '@/lib/supabase/server';

export async function login(prev: unknown, formData: FormData) {
  const supabase = await createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs

  //you should be using zod here for input validation
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    redirect('/error');
  }

  revalidatePath('/', 'layout');
  redirect('/');
}

export async function signup(prev: unknown, formData: FormData) {
  const supabase = await createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  };

  const { data: signupData, error } = await supabase.auth.signUp(data);
  // console.log(signupData, 'signupdata');
  // const {
  //   data: { user },
  // } = await supabase.auth.getUser();
  // console.log(user, 'user');
  console.log(error, 'error');

  if (error) {
    redirect('/error');
  }

  revalidatePath('/', 'layout');
  return signupData;
  // redirect('/');
}
