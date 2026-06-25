'use client';

import { Sun, Moon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTheme } from '@/lib/theme';

interface ThemeToggleProps {
  className?: string;
}

export default function ThemeToggle({ className }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      onClick={toggleTheme}
      className={cn(
        'relative inline-flex items-center justify-center',
        'w-14 h-7 rounded-full',
        'bg-neutral-200 dark:bg-neutral-700',
        'transition-colors duration-300',
        'hover:bg-neutral-300 dark:hover:bg-neutral-600',
        'focus:outline-none focus:ring-2 focus:ring-neutral-900 dark:focus:ring-neutral-100',
        className
      )}
      aria-label="Prepnúť tmavý režim"
    >
      {/* Track - background with icons */}
      <div className="absolute inset-0 flex items-center justify-between px-1.5">
        <Sun className={cn(
          'w-3.5 h-3.5 transition-all duration-300',
          isDark ? 'text-neutral-500' : 'text-amber-500'
        )} />
        <Moon className={cn(
          'w-3.5 h-3.5 transition-all duration-300',
          isDark ? 'text-blue-300' : 'text-neutral-400'
        )} />
      </div>

      {/* Thumb - moving ball */}
      <div
        className={cn(
          'absolute w-5 h-5 rounded-full',
          'bg-white dark:bg-neutral-900',
          'shadow-md',
          'transition-all duration-300 ease-out',
          'flex items-center justify-center',
          isDark ? 'translate-x-7' : 'translate-x-0.5'
        )}
      >
        {/* Optional: Add mini icon inside the thumb */}
        {isDark ? (
          <Moon className="w-2.5 h-2.5 text-blue-300" />
        ) : (
          <Sun className="w-2.5 h-2.5 text-amber-500" />
        )}
      </div>
    </button>
  );
}
