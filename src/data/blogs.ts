/**
 * blogs.ts — Article/Writing data for BlogsSection.
 *
 * Static data pattern: no live API fetch at runtime.
 * Add new articles here → section auto-updates.
 * categoryKanji is used as the ghost watermark per card.
 */

export interface BlogPost {
  title: string;
  brief: string;
  slug: string;
  url: string;
  dateAdded: string; // "YYYY-MM-DD"
  readTime: number; // minutes
  category: string; // display label e.g. "Next.js"
  categoryKanji: string; // ghost kanji watermark per article
}

export interface BlogsData {
  title: string;
  subtitle: string;
  hashnodeUsername: string;
  hashnodeUrl: string;
  posts: BlogPost[];
}

export const blogsData: BlogsData = {
  title: 'Writings',
  subtitle:
    'Thoughts on patterns I have discovered, tools I have wrestled with, and lessons earned while building things that actually ship.',
  hashnodeUsername: 'prashsainidev',
  hashnodeUrl: 'https://prashsainidev.hashnode.dev',
  posts: [
    {
      // Issue 01 — Featured Dispatch
      title: 'Getting Started with Next.js App Router',
      brief:
        'A practical guide to understanding file-based routing, layouts, and server components in the Next.js App Router — written from my own experience learning it from scratch.',
      slug: 'getting-started-nextjs-app-router',
      url: 'https://prashsainidev.hashnode.dev/',
      dateAdded: '2026-06-01',
      readTime: 8,
      category: 'Next.js',
      // 次 = "next" (as in sequence/following) — also used in Next.js naming
      categoryKanji: '次',
    },
    {
      // Issue 02
      title: 'Tailwind CSS Tips I Wish I Knew Earlier',
      brief:
        'A collection of Tailwind CSS tricks, utilities, and patterns that have saved me hours of work while building real production projects.',
      slug: 'tailwind-tips',
      url: 'https://prashsainidev.hashnode.dev/',
      dateAdded: '2026-05-15',
      readTime: 6,
      category: 'CSS',
      // 型 = "form / pattern / mold" — perfect for CSS / design patterns
      categoryKanji: '型',
    },
    {
      // Issue 03
      title: 'Building a Real-Time Tracker with Socket.IO',
      brief:
        'How I built a live location tracking app using Node.js, Socket.IO, and Mapbox GL — the architecture decisions, the mistakes, and what I would do differently.',
      slug: 'realtime-tracker-socketio',
      url: 'https://prashsainidev.hashnode.dev/',
      dateAdded: '2026-04-20',
      readTime: 9,
      category: 'Node.js',
      // 流 = "flow / stream" — ideal for real-time data streams
      categoryKanji: '流',
    },
    {
      // Issue 04
      title: 'JavaScript Closures, Explained Simply',
      brief:
        'Closures are one of those concepts that confused me for months. Here is the mental model that finally made them click — no theory jargon, just real code.',
      slug: 'javascript-closures-explained',
      url: 'https://prashsainidev.hashnode.dev/',
      dateAdded: '2026-03-10',
      readTime: 7,
      category: 'JavaScript',
      // 結 = "bind / connect / conclude" — closures bind outer scope variables
      categoryKanji: '結',
    },
    {
      // Issue 05
      title: 'Why I Switched From REST to tRPC',
      brief:
        'After months of writing repetitive API types on both client and server, I gave tRPC a shot. Here is what surprised me, what still has rough edges, and whether it was worth it.',
      slug: 'rest-to-trpc',
      url: 'https://prashsainidev.hashnode.dev/',
      dateAdded: '2026-02-05',
      readTime: 10,
      category: 'TypeScript',
      // 橋 = "bridge" — tRPC bridges client and server type-safely
      categoryKanji: '橋',
    },
  ],
};
