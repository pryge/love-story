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
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FAF6F2' },
    { media: '(prefers-color-scheme: dark)', color: '#1E2A3A' },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="uk"
      className={`${tenorSans.variable} ${manrope.variable} ${marckScript.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var path = window.location.pathname;
                  var scope = path.startsWith('/admin') ? 'admin' : 'kitty';
                  var saved = localStorage.getItem(scope + '_theme');
                  var isDark;
                  if (saved) {
                    isDark = saved === 'dark';
                  } else if (scope === 'admin') {
                    isDark = true;
                  } else {
                    var hour = new Date().getHours();
                    isDark = hour >= 22 || hour < 7;
                  }
                  document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
