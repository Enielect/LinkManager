import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import SideNav from '@/components/molecules/SideNav';
import Image from 'next/image';
import { Toaster } from '@/components/ui/sonner';
import LogOut from '@/components/ui/log-out';

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
  // interface PushSubscription {
  //   endpoint: string;
  //   keys: {
  //     p256dh: string;
  //     auth: string;
  //   };
  // }

  // interface ServiceWorkerRegistration {
  //   pushManager: {
  //     subscribe(options: {
  //       userVisibleOnly: boolean;
  //       applicationServerKey: Uint8Array;
  //     }): Promise<PushSubscription>;
  //   };
  // }
  // useEffect(() => {
  //   // Check if service workers and push are supported
  //   if ('serviceWorker' in navigator && 'PushManager' in window) {
  //     async function registerServiceWorker() {
  //       try {
  //         const registration = await navigator.serviceWorker.register('/sw.js');
  //         console.log('ServiceWorker registration successful');

  //         // Request permission for notifications
  //         const permission = await Notification.requestPermission();
  //         if (permission === 'granted') {
  //           await subscribeToPush(registration);
  //         }
  //       } catch (err) {
  //         console.error('ServiceWorker registration failed:', err);
  //       }
  //     }

  //     async function subscribeToPush(
  //       registration: ServiceWorkerRegistration
  //     ): Promise<void> {
  //       const subscription: PushSubscription =
  //         await registration.pushManager.subscribe({
  //           userVisibleOnly: true,
  //           applicationServerKey: urlBase64ToUint8Array(
  //             process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY as string
  //           ),
  //         });

  //       // Send subscription to your server
  //       await fetch('/api/subscribe', {
  //         method: 'POST',
  //         body: JSON.stringify(subscription),
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //       });
  //     }

  //     // Convert VAPID key
  //     interface Base64Converter {
  //       (base64String: string): Uint8Array;
  //     }

  //     const urlBase64ToUint8Array: Base64Converter = (base64String) => {
  //       const padding: string = '='.repeat((4 - (base64String.length % 4)) % 4);
  //       const base64: string = (base64String + padding)
  //         .replace(/-/g, '+')
  //         .replace(/_/g, '/');

  //       const rawData: string = window.atob(base64);
  //       const outputArray: Uint8Array = new Uint8Array(rawData.length);

  //       for (let i: number = 0; i < rawData.length; ++i) {
  //         outputArray[i] = rawData.charCodeAt(i);
  //       }
  //       return outputArray;
  //     };

  //     window.addEventListener('load', registerServiceWorker);
  //   }
  // }, []);

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
        <SideNav>
          <LogOut />
        </SideNav>

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
