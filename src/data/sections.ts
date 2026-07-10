/**
 * sections.ts — Ordered section registry for the portfolio.
 *
 * Single source of truth for:
 * - Section IDs (must match the id="" on each <section> element)
 * - Display labels + JP labels (used in Navbar)
 * - Auto-calculated section numbers (01, 02...)
 * - siteConfig key (for display gating)
 *
 * To add a section: add a row here + flip siteConfig[key].display = true
 * The Navbar will automatically include it.
 */

import { siteConfig } from './siteConfig';

export interface SectionEntry {
  id: string; // matches id="" on the <section>
  label: string; // shown in Navbar
  labelJP: string; // Japanese translation
  labelTranslation: string; // English translation for the tooltip
  configKey: keyof typeof siteConfig;
}

/**
 * Ordered list of ALL navigable sections.
 * EXACTLY matches the sequence from the original portfolio.
 * Hero is excluded — it's the page top and the logo scrolls there.
 */
const SECTION_REGISTRY: SectionEntry[] = [
  {
    id: 'about',
    label: 'About',
    labelJP: '私について',
    labelTranslation: 'About Me',
    configKey: 'about',
  },
  {
    id: 'skills',
    label: 'Skills',
    labelJP: '武器',
    labelTranslation: 'Weapons / Skills',
    configKey: 'skills',
  },
  {
    id: 'projects',
    label: 'Projects',
    labelJP: '作品',
    labelTranslation: 'Projects / Works',
    configKey: 'projects',
  },
  {
    id: 'freelance',
    label: 'Freelance',
    labelJP: '委託',
    labelTranslation: 'Client Work',
    configKey: 'freelance',
  },
  {
    id: 'aiProjects',
    label: 'AI Projects',
    labelJP: '人工知能',
    labelTranslation: 'AI & Automations',
    configKey: 'aiProjects',
  },
  {
    id: 'experience',
    label: 'Experience',
    labelJP: '経験',
    labelTranslation: 'Work Experience',
    configKey: 'experience',
  },
  {
    id: 'openSource',
    label: 'Open Source',
    labelJP: '共有',
    labelTranslation: 'Community Code',
    configKey: 'openSource',
  },
  {
    id: 'blogs',
    label: 'Articles',
    labelJP: '記事',
    labelTranslation: 'Writings / Blogs',
    configKey: 'blogs',
  },
  {
    id: 'talks',
    label: 'Talks',
    labelJP: '登壇',
    labelTranslation: 'Speaking / Events',
    configKey: 'talks',
  },
  {
    id: 'podcast',
    label: 'Podcast',
    labelJP: '音声',
    labelTranslation: 'Audio / Podcasts',
    configKey: 'podcast',
  },
  {
    id: 'twitter',
    label: 'Social',
    labelJP: '発信',
    labelTranslation: 'Twitter / X Feed',
    configKey: 'twitter',
  },
  {
    id: 'education',
    label: 'Education',
    labelJP: '学歴',
    labelTranslation: 'Academic History',
    configKey: 'education',
  },
  {
    id: 'certifications',
    label: 'Certifications',
    labelJP: '資格',
    labelTranslation: 'Certifications',
    configKey: 'certifications',
  },
  {
    id: 'volunteer',
    label: 'Community',
    labelJP: '奉仕',
    labelTranslation: 'Community Service',
    configKey: 'volunteer',
  },
  {
    id: 'testimonials',
    label: 'Testimonials',
    labelJP: '推薦',
    labelTranslation: 'Endorsements',
    configKey: 'testimonials',
  },
  {
    id: 'newsletter',
    label: 'Newsletter',
    labelJP: '購読',
    labelTranslation: 'Stay Updated',
    configKey: 'newsletter',
  },
  {
    id: 'contact',
    label: 'Contact',
    labelJP: '連絡',
    labelTranslation: 'Get In Touch',
    configKey: 'contact',
  },
];

/**
 * Returns only the sections that are enabled in siteConfig,
 * with their auto-calculated display number (01, 02...).
 */
export function getActiveSections() {
  let counter = 1;
  return SECTION_REGISTRY.filter((s) => siteConfig[s.configKey].display).map((s) => ({
    ...s,
    number: String(counter++).padStart(2, '0'),
    href: `#${s.id}`,
  }));
}

/** Flat list of all sections including disabled — for scroll-spy IDs */
export const ALL_SECTION_IDS = ['hero', ...SECTION_REGISTRY.map((s) => s.id)];
