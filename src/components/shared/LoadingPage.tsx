'use client';
import React, { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { BarLoader } from 'react-spinners';

const LoadingPage = () => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  if (!mounted) return null;

  return (
    <div className="dark:bg-background flex min-h-screen items-center justify-center text-black dark:text-white">
      <BarLoader
        color={theme === 'dark' ? 'white' : 'black'}
        width={200}
        height={4}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};

export default LoadingPage;
