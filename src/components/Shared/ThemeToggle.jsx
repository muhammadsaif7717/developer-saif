import React, { useEffect, useState } from 'react';
import { BsSunFill } from 'react-icons/bs';
import { FaMoon } from 'react-icons/fa';

const ThemeToggle = () => {
    const [darkMode, setDarkMode] = useState(true); // Set default to true for dark mode

    useEffect(() => {
        const theme = localStorage.getItem('theme');
        if (theme === 'dark' || !theme) { // Enable dark mode by default
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
        <div className='flex items-center gap-1'>
            <BsSunFill className='ml-auto text-yellow-500' size={18} />
            <div onClick={() => setDarkMode(!darkMode)} className='relative flex items-center w-12 h-6 dark:bg-[#02162B] bg-base-100 cursor-pointer rounded-full'>
                <div className="absolute bg-base-100 dark:bg-[#02162B] w-5 h-5 border-[3px] border-[#007bff] rounded-full shadow-md transform transition-transform duration-300" style={darkMode ? { right: '1px' } : { left: '3px' }} />
            </div>
            <FaMoon className='ml-auto text-gray-800 dark:text-white' size={15} />
        </div>
    );
};

export default ThemeToggle;
