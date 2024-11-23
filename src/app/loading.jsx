import React from 'react';

const loading = () => {
    return (
        <div className='dark:bg-background min-h-[calc(100vh-224px)] flex items-center justify-center'>
            <span className="loading loading-spinner loading-lg dark:text-white text-gray-300"></span>
        </div>
    );
};

export default loading;