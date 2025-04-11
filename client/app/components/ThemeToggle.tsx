import React from 'react';
import { SunIcon, MoonIcon } from 'lucide-react';
import { useTheme } from './ThemeProvider';
export default function ThemeToggle() {
  const {
    theme,
    toggleTheme
  } = useTheme();
  return <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors" aria-label="Toggle theme">
    {theme === 'light' ? <MoonIcon className="w-5 h-5 text-gray-700 dark:text-gray-300" /> : <SunIcon className="w-5 h-5 text-gray-300 dark:text-gray-100" />}
  </button>;
}