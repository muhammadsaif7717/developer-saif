export const dynamic='force-dynamic'
import DashboardPage from '@/components/Dashboard/DashboardPage';
import React from 'react';

const Dashboard = () => {
    return (
        <div className='bg-base-100 dark:bg-background min-h-[95vh]'>
            <DashboardPage/>
        </div>
    );
};

export default Dashboard;