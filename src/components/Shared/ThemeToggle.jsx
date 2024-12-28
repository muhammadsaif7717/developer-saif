'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { BsSunFill } from 'react-icons/bs';
import { FaMoon } from 'react-icons/fa';

const ThemeToggle = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme(); // resolvedTheme gives the actual applied theme

  useEffect(() => {
    setMounted(true); // Prevent hydration issues
  }, []);

  // Ensure it only renders on the client
  if (!mounted) return null;

  const isDarkMode = resolvedTheme === 'dark';

  return (
    <div className="flex items-center gap-2">
      <BsSunFill className="text-yellow-400" size={18} />
      <div
        onClick={() => setTheme(isDarkMode ? 'light' : 'dark')}
        className="relative flex h-6 w-12 cursor-pointer items-center rounded-full bg-white dark:bg-[#3f4144]"
      >
        {/* Toggle ball */}
        <div
          className={`absolute h-5 w-5 transform rounded-full border-[3px] border-[#007bff] shadow-md transition-transform duration-300 ${
            isDarkMode ? 'translate-x-6 bg-[#3f4144]' : 'translate-x-0 bg-white'
          }`}
        />
      </div>
      <FaMoon className="text-gray-800 dark:text-white" size={15} />
    </div>
  );
};

export default ThemeToggle;
