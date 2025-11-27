'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { motion } from 'framer-motion';

const ThemeToggle = () => {
  const [mounted, setMounted] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent hydration issues
  if (!mounted) {
    return (
      <div className="h-10 w-10 animate-pulse rounded-lg bg-[#f2f2f2] dark:bg-[#11141c]" />
    );
  }

  const isDarkMode = resolvedTheme === 'dark';

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => setTheme(isDarkMode ? 'light' : 'dark')}
      className="group relative overflow-hidden rounded-lg bg-[#f2f2f2] p-2 transition-all duration-300 hover:bg-[#e2e8f0] hover:shadow-lg hover:shadow-[#0082c4]/20 dark:bg-[#11141c] dark:hover:bg-[#27273a] dark:hover:shadow-[#0082c4]/30"
      aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
    >
      {/* Cyan glow effect on hover */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileHover={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 bg-linear-to-br from-[#0082c4]/10 to-[#0099e6]/10 blur-xl"
      />

      {/* Icon container with rotation animation */}
      <motion.div
        initial={false}
        animate={{ rotate: isDarkMode ? 180 : 0 }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
        className="relative z-10"
      >
        {isDarkMode ? (
          <Moon className="h-5 w-5 text-[#cbd5e1] transition-colors duration-300 group-hover:text-[#0082c4]" />
        ) : (
          <Sun className="h-5 w-5 text-[#334155] transition-colors duration-300 group-hover:text-[#0082c4]" />
        )}
      </motion.div>

      {/* Tooltip */}
      <span className="pointer-events-none absolute -bottom-10 left-1/2 -translate-x-1/2 rounded-md bg-black px-2 py-1 text-xs whitespace-nowrap text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:bg-white dark:text-black">
        {isDarkMode ? 'Light mode' : 'Dark mode'}
      </span>
    </motion.button>
  );
};

export default ThemeToggle;
