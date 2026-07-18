/**
 * HOME PAGE — Manga Story Arc
 * Assembles all sections in order. All content from src/data/.
 *
 * Section order:
 *   00 — Hero (Parallax character, name typography)
 *   01 — About (Bio, stats, 3D wireframe, story panels)
 *   02 — Skills (Physics repulsion pill chamber)
 *   03 — Projects (Horizontal scroll film strip, 3D tilt cards)
 *   04 — Freelance (Client work showcase)
 *   05 — AI Projects (Manga Tech-Grid)
 *   06 — Experience (GSAP vertical timeline)
 *   07 — Open Source (Git commit log terminal aesthetic)
 *   [Act III–V sections added here as 1-liners in SECTION_MAP]
 */
import { Navbar } from '@/components/layout/Navbar';
import { HeroSection } from '@/components/sections/HeroSection';
import { AboutSection } from '@/components/sections/AboutSection';
import { SkillsSection } from '@/components/sections/SkillsSection';
import { ProjectsSection } from '@/components/sections/ProjectsSection';
import { FreelanceSection } from '@/components/sections/FreelanceSection';
import { AIProjectsSection } from '@/components/sections/AIProjectsSection';
import { ExperienceSection } from '@/components/sections/ExperienceSection';
import { OpenSourceSection } from '@/components/sections/OpenSourceSection';
import { getActiveSections } from '@/data/sections';
import { siteConfig } from '@/data/siteConfig';

/** Each section component receives at minimum a `chapter` prop */
type SectionProps = { chapter: string };

/**
 * SECTION_MAP — Registry of section ID → component.
 * To add a new section: import the component and add a 1-line entry here.
 * The section renders automatically when siteConfig[key].display = true.
 */
const SECTION_MAP: Record<string, React.ComponentType<SectionProps>> = {
  about: AboutSection,
  skills: SkillsSection,
  projects: ProjectsSection,
  freelance: FreelanceSection,
  aiProjects: AIProjectsSection,
  experience: ExperienceSection,
  openSource: OpenSourceSection,
  // Act III — 声 (The Voice)
  // blogs:    BlogsSection,    ← uncomment when component is built
  // talks:    TalksSection,
  // podcast:  PodcastSection,
  // twitter:  TwitterSection,
  // Act IV — 資格 (The Credentials)
  // education:       EducationSection,
  // certifications:  CertificationsSection,
  // volunteer:       VolunteerSection,
  // testimonials:    TestimonialsSection,
  // Act V — 繋がり (The Connection)
  // newsletter: NewsletterSection,
  // contact:    ContactSection,
};

export default function Home() {
  const activeSections = getActiveSections();

  return (
    <main>
      <Navbar />
      {siteConfig.hero.display && <HeroSection />}

      {activeSections.map((section) => {
        const Component = SECTION_MAP[section.id];
        // If no component is registered yet, skip silently (section is planned but not built)
        return Component ? <Component key={section.id} chapter={section.number} /> : null;
      })}
    </main>
  );
}
