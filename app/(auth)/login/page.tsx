'use client';

import { login, signup } from './actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AuthError, Session, User } from '@supabase/supabase-js';
import { Loader2, LockKeyhole } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useActionState, useEffect, useState } from 'react';
import { toast } from 'sonner';

export type AuthResponse =
  | {
      data: {
        user: User | null;
        session: Session | null;
      };
      error: null;
    }
  | {
      data: {
        user: null;
        session: null;
      };
      error: AuthError;
    };

const SignUpPage = () => {
  const router = useRouter();
  const [signUp, setSignUp] = useState(false);
  const [signupData, signUpDispatch, signUpPending] = useActionState(
    signup,
    null
  );
  const [signinData, loginDispatch, loginPending] = useActionState(login, null);

  useEffect(() => {
    if (signupData?.error) {
      toast(signupData?.error?.message);
    }
    if (signupData?.data) {
      toast('Check your email to verify your account');
    }

    if (signinData) {
      toast(signinData);
      if (signinData === 'You have signed in successfully') {
        router.push('/');
      }
    }

    //eslint-disable-next-line
  }, [signupData, signinData]);

  return (
    <div className=' text-white flex flex-col sm:flex-row'>
      <div className='block w-screen pseudo-blur md:w-[70vw] sm:w-[60vw] lg:w-[50vw]'>
        <Image
          alt='background'
          className='sm:hidden  sm:h-screen w-full sm:object-center object-cover h-[55vh] object-top'
          width={1000}
          height={1000}
          src='/bg_img.png'
        />
        <Image
          alt='background'
          className='sm:block hidden sm:h-screen w-full sm:object-center object-cover h-[55vh] object-top'
          width={1000}
          height={1000}
          src='/bg_img_2.png'
        />
        <span className='uppercase sm:hidden absolute text-3xl bottom-1/2 left-10'>
          Link sync
        </span>
      </div>

      <div className='px-10 sm:w-[50vw] signup-img-shadow'>
        <div className='lg:w-[35vw] h-full sm:justify-center mx-auto sm:flex sm:flex-col w-full'>
          <form className=' border-b  border-b-gray-50/10 pb-5'>
            <h2 className='py-2 md:text-lg'>Sign in with email address</h2>
            <div>
              <div className='relative'>
                <svg
                  width='20'
                  height='15'
                  className='absolute left-3.5  top-1/3 w-5'
                  viewBox='0 0 20 15'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M3.15789 0H16.8421C17.6796 0 18.4829 0.316071 19.0751 0.87868C19.6673 1.44129 20 2.20435 20 3V12C20 12.7956 19.6673 13.5587 19.0751 14.1213C18.4829 14.6839 17.6796 15 16.8421 15H3.15789C2.32037 15 1.51715 14.6839 0.924926 14.1213C0.332706 13.5587 0 12.7956 0 12V3C0 2.20435 0.332706 1.44129 0.924926 0.87868C1.51715 0.316071 2.32037 0 3.15789 0ZM3.15789 1C2.63158 1 2.16842 1.17 1.81053 1.47L10 6.5L18.1895 1.47C17.8316 1.17 17.3684 1 16.8421 1H3.15789ZM10 7.71L1.18947 2.28C1.10526 2.5 1.05263 2.75 1.05263 3V12C1.05263 12.5304 1.27444 13.0391 1.66925 13.4142C2.06406 13.7893 2.59954 14 3.15789 14H16.8421C17.4005 14 17.9359 13.7893 18.3308 13.4142C18.7256 13.0391 18.9474 12.5304 18.9474 12V3C18.9474 2.75 18.8947 2.5 18.8105 2.28L10 7.71Z'
                    fill='#A4A4A4'
                  />
                </svg>

                <Input
                  id='email'
                  name='email'
                  type='email'
                  className='!py-5 md:!py-6 md:!pb-6.5 placeholder:text-lg md:text-lg bg-[#190733] border-none pl-12'
                  placeholder='yourname@gmail.com'
                />
              </div>
              <div className='relative'>
                <LockKeyhole className='absolute left-3.5 top-[22%] w-5 text-[#A4A4A4]' />
                <Input
                  id='password'
                  name='password'
                  type='password'
                  className='!py-5 mt-3 md:!py-6 md:!pb-6.5 placeholder:text-lg md:text-lg bg-[#190733] border-none pl-12'
                  placeholder='password'
                />
              </div>
            </div>
            {signUp ? (
              <Button
                formAction={signUpDispatch}
                className='w-full md:text-lg md:py-6 mt-4 rounded-lg py-5 signup-gradient'
              >
                {signUpPending ? (
                  <Loader2 className='animate-spin' />
                ) : (
                  'Sign Up'
                )}
              </Button>
            ) : (
              <Button
                formAction={loginDispatch}
                className='w-full md:text-lg md:py-6 mt-4 rounded-lg py-5 signup-gradient'
              >
                {loginPending ? (
                  <Loader2 className='animate-spin' />
                ) : (
                  'Sign In'
                )}
              </Button>
            )}
            <div className='flex items-center pt-3 gap-3'>
              <Input
                id='signup'
                onChange={(e) => setSignUp(e.target.checked)}
                type='checkbox'
                className='h-4 w-4'
              />{' '}
              <label className='cursor-pointer' htmlFor='signup'>
                Check the box to sign up instead
              </label>
            </div>
          </form>
          <div className='space-y-2'>
            <h2 className='pt-3 md:text-lg'>or continue with </h2>
            <div className='flex '>
              <Button className='basis-1/2 hover:!border-[#310f5c] hover:bg-transparent lg:text-lg flex md:!py-5 items-center bg-[#3B2063]'>
                <svg
                  width='16'
                  height='17'
                  viewBox='0 0 16 17'
                  className='md:!w-6 md:!h-6'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M15.7541 7.37083H15.15V7.33774H8.40002V10.5267H12.6386C12.0203 12.383 10.3586 13.7156 8.40002 13.7156C5.9149 13.7156 3.90002 11.5738 3.90002 8.9322C3.90002 6.29059 5.9149 4.14884 8.40002 4.14884C9.54715 4.14884 10.5908 4.60884 11.3854 5.36022L13.5068 3.10527C12.1673 1.77828 10.3755 0.95993 8.40002 0.95993C4.25815 0.95993 0.900024 4.52951 0.900024 8.9322C0.900024 13.3349 4.25815 16.9045 8.40002 16.9045C12.5419 16.9045 15.9 13.3349 15.9 8.9322C15.9 8.39766 15.8483 7.87587 15.7541 7.37083Z'
                    fill='#FFC107'
                  />
                  <path
                    d='M8.40002 16.9044C10.3373 16.9044 12.0975 16.1164 13.4284 14.8348L11.1071 12.7469C10.3288 13.3761 9.37782 13.7164 8.40002 13.7155C6.44927 13.7155 4.79289 12.3933 4.16889 10.5481L1.72314 12.5512C2.96439 15.133 5.48515 16.9044 8.40002 16.9044Z'
                    fill='#4CAF50'
                  />
                  <path
                    d='M15.7541 7.37087H15.15V7.33778H8.40002V10.5267H12.6386C12.3429 11.4102 11.81 12.1822 11.106 12.7474L11.1071 12.7466L13.4284 14.8345C13.2641 14.9932 15.9 12.9184 15.9 8.93224C15.9 8.3977 15.8483 7.87591 15.7541 7.37087Z'
                    fill='#1976D2'
                  />
                  <path
                    d='M1.76477 5.22151L4.2289 7.14242C4.89565 5.38773 6.5104 4.14884 8.40002 4.14884C9.54715 4.14884 10.5908 4.60884 11.3854 5.36022L13.5068 3.10527C12.1673 1.77828 10.3755 0.95993 8.40002 0.95993C5.51927 0.95993 3.02102 2.68872 1.76477 5.22151Z'
                    fill='#FF3D00'
                  />
                </svg>
                <span> Google</span>
              </Button>
            </div>
            <span className='text-xs sm:text-sm md:pt-1 block text-[#B6B6B6] '>
              By registering you agree to our{' '}
              <Link href='/' className='text-[#9D5CE9]'>
                terms and conditions
              </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
