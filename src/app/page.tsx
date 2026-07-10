/**
 * HOME PAGE — Manga Story Arc
 * Assembles all sections in order. All content from src/data/.
 *
 * Section order:
 *   00 — Hero (Parallax character, name typography)
 *   01 — About (Bio, stats, 3D wireframe, story panels)
 *   02 — Skills (Physics repulsion pill chamber)
 *   03 — Projects (Horizontal scroll film strip, 3D tilt cards)
 *   [More sections TBD]
 */
import { Navbar } from '@/components/layout/Navbar';
import { HeroSection } from '@/components/sections/HeroSection';
import { AboutSection } from '@/components/sections/AboutSection';
import { SkillsSection } from '@/components/sections/SkillsSection';
import { ProjectsSection } from '@/components/sections/ProjectsSection';
import { FreelanceSection } from '@/components/sections/FreelanceSection';
import { ExperienceSection } from '@/components/sections/ExperienceSection';
import { getActiveSections } from '@/data/sections';
import { siteConfig } from '@/data/siteConfig';

export default function Home() {
  const activeSections = getActiveSections();

  return (
    <main>
      <Navbar />
      {siteConfig.hero.display && <HeroSection />}

      {activeSections.map((section) => {
        if (section.id === 'about') {
          return <AboutSection key={section.id} chapter={section.number} />;
        }
        if (section.id === 'skills') {
          return <SkillsSection key={section.id} chapter={section.number} />;
        }
        if (section.id === 'projects') {
          return <ProjectsSection key={section.id} chapter={section.number} />;
        }
        if (section.id === 'freelance') {
          return <FreelanceSection key={section.id} chapter={section.number} />;
        }
        // aiProjects goes here
        if (section.id === 'experience') {
          return <ExperienceSection key={section.id} chapter={section.number} />;
        }
        // openSource, blogs, etc. will go here
        return null;
      })}
    </main>
  );
}
