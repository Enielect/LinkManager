'use server';

import { revalidatePath } from 'next/cache';
// import { redirect } from 'next/navigation';

import { createClient } from '@/lib/supabase/server';

export async function login(prev: unknown, formData: FormData) {
  const supabase = await createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs

  //you should be using zod here for input validation
  try {
    const data = {
      email: formData.get('email') as string,
      password: formData.get('password') as string,
    };

    const returnedData = await supabase.auth.signInWithPassword(data);
    const errorState = returnedData.error;
    console.log(errorState?.message);

    if (errorState) {
      return errorState.message;
    }

    revalidatePath('/', 'layout');
    return 'You have signed in successfully';
  } catch (err: unknown) {
    return err instanceof Error ? err.message : 'Invalid credentials';
  }
}

export async function signup(prev: unknown, formData: FormData) {
  const supabase = await createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  };

  const signUpInfo = await supabase.auth.signUp(data);

  console.log(signUpInfo.error, 'error');

  revalidatePath('/', 'layout');
  return signUpInfo;
  // redirect('/');
}
