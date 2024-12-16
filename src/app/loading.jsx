import React from 'react';

const loading = () => {
  return (
    <div className="flex min-h-[calc(100vh-132px)] items-center justify-center dark:bg-background">
      <span className="loading loading-spinner loading-lg text-gray-300 dark:text-white"></span>
    </div>
  );
};

export default loading;
