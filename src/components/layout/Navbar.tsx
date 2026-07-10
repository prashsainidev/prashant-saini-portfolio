/**
 * Navbar — Fixed top navigation bar.
 * Contains: Logo/name, nav links with JP labels, ThemeToggle, Resume CTA.
 * Hides on scroll down, reveals on scroll up (GSAP controlled).
 */
'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ThemeToggle } from '@/components/ui';
import { getActiveSections } from '@/data/sections';
import { heroData } from '@/data/hero';
import { useNavStore } from '@/lib/navStore';

export function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const lastScrollY = useRef(0);
  const isForceHidden = useNavStore((state) => state.isForceHidden);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;
    if (isForceHidden) {
      gsap.to(nav, { yPercent: -100, duration: 0.4, ease: 'power2.inOut' });
    } else {
      if (window.scrollY <= 100) {
        gsap.to(nav, { yPercent: 0, duration: 0.4, ease: 'power2.inOut' });
      }
    }
  }, [isForceHidden]);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    const handleScroll = () => {
      const currentY = window.scrollY;
      setScrolled(currentY > 60);

      // Force hide if global state says so (e.g. inside Projects gallery)
      if (useNavStore.getState().isForceHidden) {
        gsap.to(nav, { yPercent: -100, duration: 0.4, ease: 'power2.inOut' });
        lastScrollY.current = currentY;
        return;
      }

      // Hide on scroll down, show on scroll up
      if (currentY > lastScrollY.current && currentY > 100) {
        gsap.to(nav, { yPercent: -100, duration: 0.4, ease: 'power2.inOut' });
      } else {
        gsap.to(nav, { yPercent: 0, duration: 0.4, ease: 'power2.inOut' });
      }
      lastScrollY.current = currentY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      ref={navRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        padding: '0 clamp(1.5rem, 5vw, 4rem)',
        height: '64px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
        backgroundColor: scrolled ? 'var(--bg-overlay)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        transition: 'background-color 0.4s ease, border-color 0.4s ease, backdrop-filter 0.4s ease',
      }}
    >
      {/* Logo */}
      <a
        href="#"
        onClick={(e) => {
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        style={{
          display: 'flex',
          flexDirection: 'column',
          lineHeight: 1,
          gap: '1px',
        }}
      >
        <span
          style={{
            fontSize: '1rem',
            fontWeight: 700,
            letterSpacing: '-0.02em',
            color: 'var(--text-primary)',
          }}
        >
          {heroData.firstName.toUpperCase()}
        </span>
        <span
          style={{
            fontSize: '0.55rem',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: 'var(--accent-red)',
            fontWeight: 500,
          }}
        >
          {heroData.role}
        </span>
      </a>

      {/* Desktop Nav Links */}
      <nav
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '2rem',
        }}
        className="desktop-nav"
      >
        {getActiveSections().map((link) => (
          <button
            key={link.id}
            onClick={() => handleNavClick(link.href)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '2px',
              padding: '4px 0',
              position: 'relative',
              color: 'var(--text-dim)',
              transition: 'color 0.3s ease',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.color = 'var(--text-primary)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.color = 'var(--text-dim)';
            }}
          >
            <span
              style={{
                fontSize: '0.65rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                fontWeight: 500,
              }}
            >
              {link.label}
            </span>
            <span
              style={{
                fontSize: '0.5rem',
                fontFamily: 'var(--font-noto-jp)',
                letterSpacing: '0.05em',
                opacity: 0.45,
              }}
            >
              {link.labelJP}
            </span>
          </button>
        ))}
      </nav>

      {/* Right side: ThemeToggle + Resume */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <ThemeToggle />
        <a
          href={heroData.resumeUrl}
          target="_blank"
          rel="noopener noreferrer"
          data-magnetic
          style={{
            fontSize: '0.65rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            fontWeight: 600,
            color: 'var(--bg-primary)',
            backgroundColor: 'var(--accent-red)',
            padding: '7px 16px',
            borderRadius: '4px',
            transition: 'opacity 0.2s ease',
            display: 'none', // shown via CSS on md+
          }}
          className="resume-btn"
          onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.opacity = '0.85')}
          onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.opacity = '1')}
        >
          Resume
        </a>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="mobile-menu-btn"
          aria-label="Toggle menu"
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            display: 'none',
            flexDirection: 'column',
            gap: '5px',
            padding: '4px',
          }}
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              style={{
                display: 'block',
                width: '22px',
                height: '1.5px',
                backgroundColor: 'var(--text-primary)',
                transition: 'transform 0.3s ease, opacity 0.3s ease',
                transformOrigin: 'center',
              }}
            />
          ))}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            style={{
              position: 'absolute',
              top: '64px',
              left: 0,
              right: 0,
              backgroundColor: 'var(--bg-secondary)',
              borderBottom: '1px solid var(--border)',
              padding: '1.5rem clamp(1.5rem, 5vw, 4rem)',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem',
            }}
          >
            {getActiveSections().map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.href)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  textAlign: 'left',
                  color: 'var(--text-primary)',
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  letterSpacing: '-0.01em',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                }}
              >
                <span
                  style={{
                    fontSize: '0.6rem',
                    color: 'var(--accent-red)',
                    fontWeight: 700,
                  }}
                >
                  {link.number}
                </span>
                {link.label}
                <span
                  style={{
                    fontSize: '0.65rem',
                    fontFamily: 'var(--font-noto-jp)',
                    color: 'var(--text-dim)',
                    marginLeft: 'auto',
                    opacity: 0.5,
                  }}
                >
                  {link.labelJP}
                </span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (min-width: 768px) {
          .desktop-nav { display: flex !important; }
          .resume-btn  { display: block !important; }
          .mobile-menu-btn { display: none !important; }
        }
        @media (max-width: 767px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </header>
  );
}
