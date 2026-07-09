/**
 * SITE CONFIG — Master toggle for all portfolio sections.
 *
 * Set display: true  → section renders on the page
 * Set display: false → section is completely hidden
 */
export const siteConfig = {
  hero: { display: true },
  about: { display: true },
  work: { display: false },
  education: { display: false },
  skills: { display: true },
  projects: { display: false },
  aiProjects: { display: false },
  openSource: { display: false },
  certifications: { display: false },
  blogs: { display: false },
  newsletter: { display: false },
  podcast: { display: false },
  talks: { display: false },
  volunteer: { display: false },
  twitter: { display: false },
  testimonials: { display: false },
  contact: { display: false },
} as const;

export type SectionKey = keyof typeof siteConfig;
