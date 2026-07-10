import { IFreelanceProject } from '@/types';

export const freelanceData: IFreelanceProject[] = [
  {
    id: 'lens-of-shubh',
    title: 'Lens of Shubh',
    titleKanji: '写真',
    client: 'Shubh',
    tagline: 'A premium photography portfolio and client management platform.',
    description:
      'A full-stack client-management and portfolio platform for a professional photographer. Built with Next.js App Router for optimal performance, featuring a custom secure admin panel for uploading and managing high-resolution photography via Cloudinary.',
    details: [
      'Custom Admin Panel with Secure Authentication (NextAuth)',
      'Prisma ORM with Neon DB (PostgreSQL) and Supabase integration',
      'Optimized image delivery and management via Cloudinary',
    ],
    tech: ['Next.js 16', 'Tailwind CSS v4', 'Prisma', 'Supabase', 'NextAuth', 'Cloudinary', 'Zod'],
    date: '2026-07-01', // Automatically sorts to top if newest
    links: {
      live: 'https://lens-of-shubh.vercel.app/',
      github: 'https://github.com/prashsainidev/lens-of-shubh',
    },
  },
];

/**
 * Returns all freelance projects sorted by date (newest first).
 */
export function getSortedFreelanceProjects(): IFreelanceProject[] {
  return [...freelanceData].sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
}
