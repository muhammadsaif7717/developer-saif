import React, { useEffect, useState } from 'react';
import { BsSunFill } from 'react-icons/bs';
import { FaMoon } from 'react-icons/fa';

const ThemeToggle = () => {
  const [darkMode, setDarkMode] = useState(true); // Set default to true for dark mode

  useEffect(() => {
    const theme = localStorage.getItem('theme');
    if (theme === 'dark' || !theme) {
      // Enable dark mode by default
      setDarkMode(true);
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      setDarkMode(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  return (
    <div className="flex items-center gap-1">
      <BsSunFill className="ml-auto text-yellow-500" size={18} />
      <div
        onClick={() => setDarkMode(!darkMode)}
        className="relative flex h-6 w-12 cursor-pointer items-center rounded-full bg-base-100 dark:bg-[#02162B]"
      >
        <div
          className="absolute h-5 w-5 transform rounded-full border-[3px] border-[#007bff] bg-base-100 shadow-md transition-transform duration-300 dark:bg-[#02162B]"
          style={darkMode ? { right: '1px' } : { left: '3px' }}
        />
      </div>
      <FaMoon className="ml-auto text-gray-800 dark:text-white" size={15} />
    </div>
  );
};

export default ThemeToggle;
