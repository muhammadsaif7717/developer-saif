'use client';
import React, { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { BarLoader } from 'react-spinners';

const LoadingPage = () => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="flex min-h-screen items-center justify-center text-black dark:bg-background dark:text-white">
      <BarLoader
        color={theme === 'dark' ? 'white' : 'black'}
        size={200}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};

export default LoadingPage;
