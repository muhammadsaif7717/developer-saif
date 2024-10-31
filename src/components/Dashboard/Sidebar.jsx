'use client'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import { GrProjects } from "react-icons/gr";

const Sidebar = () => {
    const pathName = usePathname();
    return (

        <div className='bg-base-300 dark:bg-primary min-h-screen w-52 text-white flex flex-col gap-2 pt-5'>
            <Link href={'/dashboard'} className={`dark:bg-primary  text-black dark:text-white mx-2 rounded-lg ${pathName === '/dashboard' && 'bg-base-100 dark:bg-[#474e5f]'}`}>
                <span className='menu  font-bold flex gap-2 flex-row items-center'>
                    <GrProjects />
                    <span className='text-xs lg:text-sm'>Dashboard</span>
                </span>
            </Link>
            <Link href={'/dashboard/manage-projects'} className={`dark:bg-primary  text-black dark:text-white mx-2 rounded-lg ${pathName === '/dashboard/manage-projects' && 'bg-base-100 dark:bg-[#474e5f]'}`}>
                <span className='menu  font-bold flex gap-2 flex-row items-center'>
                    <GrProjects />
                    <span className='text-xs lg:text-sm'>Manage Projects</span>
                </span>
            </Link>
            <Link href={'/dashboard/add-project'} className={`dark:bg-primary  text-black dark:text-white mx-2 rounded-lg ${pathName === '/dashboard/add-project' && 'bg-base-100 dark:bg-[#474e5f]'}`}>
                <span className='menu  font-bold flex gap-2 flex-row items-center'>
                    <GrProjects />
                    <span className='text-xs lg:text-sm'>Add Projects</span>
                </span>
            </Link>
        </div>
        // bg-base-300 dark:bg-primary  text-black dark:text-white mx-2 rounded-lg

    );
};

export default Sidebar;