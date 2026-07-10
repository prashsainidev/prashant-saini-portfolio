/**
 * TYPES INDEX
 * All shared TypeScript interfaces and types for the portfolio.
 * Import from here: import { IProject, IExperience } from '@/types'
 */

/* ============================================
   PERSONAL
   ============================================ */
export interface ISocialLink {
  name: string;
  label: string;
  url: string;
  icon: string; // lucide-react icon name
}

export interface IHero {
  firstName: string;
  lastName: string;
  nameKanji: string;
  nameKanjiTranslation?: string;
  subtitle: string;
  role: string;
  roleJP?: string;
  location: string;
  locationJP: string;
  availability: string;
  resumeUrl: string;
  socials: ISocialLink[];
}

export interface IAbout {
  headline: string;
  paragraphs: string[];
  stats: Array<{
    value: string;
    label: string;
  }>;
}

/* ============================================
   EXPERIENCE
   ============================================ */
export interface IExperience {
  id: string;
  company: string;
  companyKanji: string; // Japanese label for company (e.g., "会社")
  role: string;
  roleJP: string; // Role in Japanese
  type: 'full-time' | 'internship' | 'freelance' | 'contract';
  startDate: string; // "YYYY-MM" format
  endDate: string | 'present';
  location: string;
  description: string[]; // Bullet points
  tech: string[]; // Technologies used
  chapter: string; // e.g., "01" — for manga chapter label
}

/* ============================================
   PROJECTS
   ============================================ */
export interface IProject {
  id: string;
  title: string;
  titleKanji: string; // Japanese label
  tagline: string;
  description: string;
  details: string[]; // Architecture highlights
  tech: string[];
  role: string;
  timeline: string; // e.g., "Q2 2024"
  image?: string;
  links: {
    live?: string;
    github?: string;
    demo?: string;
  };
  tags: string[]; // e.g., ["Featured", "Open Source"]
  featured: boolean;
  order: number; // Display order
}

/* ============================================
   FREELANCE
   ============================================ */
export interface IFreelanceProject {
  id: string;
  title: string;
  titleKanji: string;
  client: string;
  tagline: string;
  description: string;
  details: string[]; // Key architectural/feature highlights
  tech: string[];
  date: string; // "YYYY-MM" format for auto-sorting
  links: {
    live?: string;
    github?: string;
  };
}

/* ============================================
   SKILLS
   ============================================ */
export type TSkillLevel = 'expert' | 'proficient' | 'learning';

export interface ISkill {
  name: string;
  level: TSkillLevel;
  icon?: string;
  since?: number; // Year skill was first used — shown on hover
}

export interface ISkillCategory {
  id: string;
  label: string;
  labelJP: string; // e.g., "フロントエンド" (Frontend)
  kanjiChar: string; // Single Kanji for ink stamp
  skills: ISkill[];
}

/* ============================================
   EDUCATION
   ============================================ */
export interface IEducation {
  id: string;
  degree: string;
  field: string;
  institution: string;
  institutionShort: string;
  location: string;
  startYear: number;
  endYear: number;
  grade: string; // e.g., "CGPA: 8.1"
  highlights: string[];
  chapter: string;
}

/* ============================================
   CERTIFICATIONS
   ============================================ */
export interface ICertification {
  id: string;
  title: string;
  issuer: string;
  issuerLogo?: string;
  date: string; // "YYYY-MM"
  credentialUrl?: string;
  skills: string[];
}

/* ============================================
   BLOG
   ============================================ */
export interface IBlog {
  id: string;
  title: string;
  excerpt: string;
  url: string;
  publishedAt: string; // "YYYY-MM-DD"
  readTime: number; // minutes
  tags: string[];
  platform: string; // e.g., "Hashnode"
}

/* ============================================
   SITE CONFIG
   ============================================ */
export interface INavLink {
  label: string;
  labelJP: string;
  href: string;
  chapter: string;
}

export interface ISiteConfig {
  siteName: string;
  siteUrl: string;
  navLinks: INavLink[];
  footerTagline: string;
  footerTaglineJP: string;
}
