/**
 * ThemeToggle — Day/Night toggle button.
 * Reads saved preference from localStorage on mount.
 * Updates Zustand state + DOM class + localStorage on toggle.
 */
'use client';

import { useEffect } from 'react';
import { useThemeStore } from '@/lib/themeStore';
import { cn } from '@/lib/utils';

interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { theme, toggleTheme, setTheme } = useThemeStore();

  /**
   * Run once on client mount.
   * Read localStorage and sync both Zustand state AND DOM class.
   * We read localStorage directly (not DOM class) because the
   * Next.js Script "beforeInteractive" can race with React hydration
   * in dev/Turbopack mode — this is the reliable approach.
   */
  useEffect(() => {
    let resolved: 'day' | 'night' = 'day';
    try {
      const saved = localStorage.getItem('portfolio-theme');
      resolved = saved === 'night' ? 'night' : 'day';
    } catch {}

    // Sync DOM class
    if (resolved === 'night') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    // Sync Zustand state
    setTheme(resolved);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const isNight = theme === 'night';

  return (
    <button
      id="theme-toggle-btn"
      onClick={toggleTheme}
      className={cn('theme-toggle', className)}
      aria-label={isNight ? 'Switch to day mode' : 'Switch to night mode'}
      title={isNight ? 'Day mode' : 'Night mode'}
      style={{
        background: 'none',
        border: '1.5px solid var(--border)',
        borderRadius: '6px',
        padding: '6px 10px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        fontSize: '0.7rem',
        letterSpacing: '0.15em',
        textTransform: 'uppercase',
        color: 'var(--text-dim)',
        transition: 'border-color 0.3s ease, color 0.3s ease',
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--accent-red)';
        (e.currentTarget as HTMLButtonElement).style.color = 'var(--accent-red)';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--border)';
        (e.currentTarget as HTMLButtonElement).style.color = 'var(--text-dim)';
      }}
    >
      <span style={{ fontSize: '1rem' }} aria-hidden>
        {isNight ? '🌸' : '🌙'}
      </span>
      <span>{isNight ? '昼' : '夜'}</span>
    </button>
  );
}
