import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import SideNav from '@/components/molecules/SideNav';
import Image from 'next/image';
import { Toaster } from '@/components/ui/sonner';

const winkySans = localFont({
  src: './fonts/Winky_Sans/WinkySans-VariableFont_wght.ttf',
  // variable: '--font-winky-sans',
});

export const metadata: Metadata = {
  title: 'Link Manager application',
  description:
    'Helping lazy users like me manage our links(mostly articles) more effectively',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        className={`${winkySans.className} signup-img-shadow h-[max(100dvh,100%)] antialiased`}
      >
        <Image
          // layout='fill'
          width={1000}
          height={1000}
          alt='background image'
          className='bg-repeat bg-center fixed h-[100dvh] w-full -z-50 inset-0'
          src='/shader-img.png'
        />
        <SideNav />

        {children}
        <Toaster
          toastOptions={{
            style: {
              background: '#310f5c',
              border: 'none',
            },
          }}
        />
      </body>
    </html>
  );
}
