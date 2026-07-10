export interface BlogPost {
  title: string;
  brief: string;
  slug: string;
  url: string;
  dateAdded: string;
  coverImage?: string;
}

export interface BlogsData {
  title: string;
  subtitle: string;
  hashnodeUsername: string; // used for live API fetch
  posts: BlogPost[]; // fallback / hardcoded posts
}

export const blogsData: BlogsData = {
  title: 'Writing',
  subtitle:
    'I write about things I learn — frontend patterns, developer tools, and lessons from building real products.',
  hashnodeUsername: 'prashsainidev',
  posts: [
    {
      title: 'Getting Started with Next.js App Router',
      brief:
        'A practical guide to understanding file-based routing, layouts, and server components in the Next.js App Router — written from my own experience learning it.',
      slug: 'getting-started-nextjs-app-router',
      url: 'https://prashsainidev.hashnode.dev/',
      dateAdded: '2026-06-01',
    },
    {
      title: 'Tailwind CSS Tips I Wish I Knew Earlier',
      brief:
        'A collection of Tailwind CSS tricks, utilities, and patterns that have saved me hours of work while building real projects.',
      slug: 'tailwind-tips',
      url: 'https://prashsainidev.hashnode.dev/',
      dateAdded: '2026-05-15',
    },
    {
      title: 'Building a Real-Time Tracker with Socket.IO',
      brief:
        'How I built a live location tracking app using Node.js, Socket.IO, and Mapbox GL — what I learnt and the mistakes I made along the way.',
      slug: 'realtime-tracker-socketio',
      url: 'https://prashsainidev.hashnode.dev/',
      dateAdded: '2026-04-20',
    },
  ],
};
