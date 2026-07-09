import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merge Tailwind CSS classes safely without conflicts.
 * Use this everywhere instead of plain template literals.
 * @example cn("px-4 py-2", isActive && "bg-vermillion", className)
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format a "YYYY-MM" date string to a human-readable label.
 * @example formatDate("2024-06") → "Jun 2024"
 */
export function formatDate(dateStr: string | 'present'): string {
  if (dateStr === 'present') return 'Present';
  const [year, month] = dateStr.split('-');
  const date = new Date(Number(year), Number(month) - 1);
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}

/**
 * Calculate duration between two dates in "X yr Y mo" format.
 * @example getDuration("2023-06", "2024-01") → "7 mo"
 */
export function getDuration(start: string, end: string | 'present'): string {
  const startDate = new Date(start + '-01');
  const endDate = end === 'present' ? new Date() : new Date(end + '-01');
  const months =
    (endDate.getFullYear() - startDate.getFullYear()) * 12 +
    (endDate.getMonth() - startDate.getMonth());
  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;
  if (years === 0) return `${remainingMonths} mo`;
  if (remainingMonths === 0) return `${years} yr`;
  return `${years} yr ${remainingMonths} mo`;
}

/**
 * Clamp a number between min and max.
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/**
 * Generate a two-padded chapter number string.
 * @example chapterNum(3) → "03"
 */
export function chapterNum(n: number): string {
  return String(n).padStart(2, '0');
}
