/**
 * THEME STORE
 * Zustand store for Day/Night theme management.
 * Persists preference to localStorage.
 */
import { create } from 'zustand';

type Theme = 'day' | 'night';

interface IThemeStore {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

export const useThemeStore = create<IThemeStore>((set) => ({
  theme: 'day',

  toggleTheme: () =>
    set((state) => {
      const next: Theme = state.theme === 'day' ? 'night' : 'day';
      applyTheme(next);
      return { theme: next };
    }),

  setTheme: (theme: Theme) => {
    applyTheme(theme);
    set({ theme });
  },
}));

/** Apply theme class to <html> and save to localStorage */
function applyTheme(theme: Theme) {
  const html = document.documentElement;
  if (theme === 'night') {
    html.classList.add('dark');
  } else {
    html.classList.remove('dark');
  }
  try {
    localStorage.setItem('portfolio-theme', theme);
  } catch {}
}
