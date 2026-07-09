/**
 * HOME PAGE — Manga Story Arc
 * Assembles all sections in order. All content from src/data/.
 *
 * Section order:
 *   00 — Hero (Parallax character, name typography)
 *   01 — About (Bio, stats, 3D wireframe, story panels)
 *   [More sections TBD]
 */
import { Navbar } from '@/components/layout/Navbar';
import { HeroSection } from '@/components/sections/HeroSection';
import { AboutSection } from '@/components/sections/AboutSection';
import { SkillsSection } from '@/components/sections/SkillsSection';
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
        // Future sections will be added here
        return null;
      })}
    </main>
  );
}
