import type { Metadata } from 'next';

import { Space_Grotesk, Noto_Sans_JP, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { CustomCursor, SmoothScroll } from '@/components/ui';

/* ============================================
   FONTS
   ============================================ */
const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

const notoSansJP = Noto_Sans_JP({
  subsets: ['latin'],
  weight: ['300', '400', '700', '900'],
  variable: '--font-noto-jp',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-jetbrains',
  display: 'swap',
});

/* ============================================
   METADATA
   ============================================ */
export const metadata: Metadata = {
  metadataBase: new URL('https://prashsainidev.vercel.app'),
  title: 'Prashant Saini — Full-Stack Developer',
  description:
    'Full-Stack Developer from Aligarh, India. Specializing in React.js, Node.js, and building clean, practical web experiences.',
  keywords: [
    'Prashant Saini',
    'Full-Stack Developer',
    'React Developer',
    'Node.js',
    'JavaScript',
    'Portfolio',
    'Aligarh',
    'India',
  ],
  authors: [{ name: 'Prashant Saini' }],
  creator: 'Prashant Saini',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    title: 'Prashant Saini — Full-Stack Developer',
    description: 'Full-Stack Developer from Aligarh, India.',
    siteName: 'Prashant Saini Portfolio',
    images: [
      {
        url: '/images/og/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Prashant Saini — Full-Stack Developer Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@prashsainidev',
    images: ['/images/og/og-image.png'],
  },
  robots: { index: true, follow: true },
};

/* ============================================
   ROOT LAYOUT
   ============================================ */
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={[spaceGrotesk.variable, notoSansJP.variable, jetbrainsMono.variable].join(' ')}
    >
      <head>
        {/*
          Theme init script — runs before React hydrates.
          Reads localStorage and applies .dark class if needed.
          Defaults to DAY (parchment) if no preference saved.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
          (function() {
            try {
              var t = localStorage.getItem('portfolio-theme');
              if (t === 'night') {
                document.documentElement.classList.add('dark');
              } else {
                document.documentElement.classList.remove('dark');
                localStorage.setItem('portfolio-theme', 'day');
              }
            } catch(e) {}
          })();
        `,
          }}
        />
      </head>
      <body>
        {/* Custom ink-drop cursor — desktop only, outside SmoothScroll so it isn't scroll-offset affected */}
        <CustomCursor />
        {/* SmoothScroll — single Lenis instance for the entire app */}
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
