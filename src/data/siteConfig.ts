/**
 * SITE CONFIG — Master toggle for all portfolio sections.
 *
 * Set display: true  → section renders on the page
 * Set display: false → section is completely hidden
 */
export const siteConfig = {
  hero: { display: true },
  about: { display: true },
  skills: { display: true },
  projects: { display: true },
  freelance: { display: true },
  aiProjects: { display: false },
  experience: { display: true },
  openSource: { display: false },
  blogs: { display: false },
  talks: { display: false },
  podcast: { display: false },
  twitter: { display: false },
  education: { display: false },
  certifications: { display: false },
  volunteer: { display: false },
  testimonials: { display: false },
  newsletter: { display: false },
  contact: { display: false },
} as const;

export type SectionKey = keyof typeof siteConfig;
