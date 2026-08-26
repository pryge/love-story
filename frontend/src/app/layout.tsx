import type { Metadata, Viewport } from 'next';
import { Tenor_Sans, Manrope, Marck_Script } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/providers/AuthProvider';

const tenorSans = Tenor_Sans({
  weight: '400',
  subsets: ['cyrillic', 'latin'],
  variable: '--font-tenor-sans',
});

const manrope = Manrope({
  subsets: ['cyrillic', 'latin'],
  variable: '--font-manrope',
});

const marckScript = Marck_Script({
  weight: '400',
  subsets: ['cyrillic', 'latin'],
  variable: '--font-marck-script',
});

export const metadata: Metadata = {
  title: 'Love Story 💖',
  description: 'Birthday Gift App for Katia',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
  themeColor: '#fff5f8',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="uk"
      className={`${tenorSans.variable} ${manrope.variable} ${marckScript.variable}`}
    >
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
