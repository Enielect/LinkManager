import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import React from 'react';

const LogOut = () => {
  return (
    <button
      onClick={async () => {
        'use server';
        const availableCookies = await cookies();
        const allCookies = availableCookies.getAll();
        // const sbCookiesName = allCookies
        //   .filter((cookie) => cookie.name.startsWith('sb-'))
        //   .map((cookie) => cookie.name);
        allCookies.forEach((cookie) => availableCookies.delete(cookie.name));
        redirect('/login');
      }}
      className='block h-full'
    >
      logout
    </button>
  );
};

export default LogOut;
