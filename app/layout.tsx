import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';

const winkySans = localFont({
  src: './fonts/Winky_Sans/WinkySans-VariableFont_wght.ttf',
  // variable: '--font-winky-sans',
});

// fonts i wish to try out as well

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
      <body className={`${winkySans.className} h-screen antialiased`}>
        {children}
      </body>
    </html>
  );
}
