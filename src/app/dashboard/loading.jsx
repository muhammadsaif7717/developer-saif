import React from 'react';

const loading = () => {
  return (
    <div className="flex min-h-[calc(100vh-64px)] items-center justify-center dark:bg-background">
      <span className="loading loading-spinner loading-lg text-gray-300 dark:text-gray-300"></span>
    </div>
  );
};

export default loading;