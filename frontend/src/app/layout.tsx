import type { Metadata, Viewport } from 'next';
import { Tenor_Sans, Manrope, Marck_Script } from 'next/font/google';
import './globals.css';

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
  description: 'Подарунок для Каті',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FAF6F2' },
    { media: '(prefers-color-scheme: dark)', color: '#1b1013' },
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
                  var saved = localStorage.getItem('kitty_theme');
                  var isDark;
                  if (saved) {
                    isDark = saved === 'dark';
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
        {children}
      </body>
    </html>
  );
}
