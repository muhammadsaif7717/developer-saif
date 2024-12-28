'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import { GrProjects } from 'react-icons/gr';

const Sidebar = ({ setOpened }) => {
  const pathName = usePathname();
  return (
    <div className="flex min-h-screen w-52 flex-col gap-2 bg-gray-200 pt-5 text-white dark:bg-primary">
      <Link
        onClick={() => setOpened(false)}
        href={'/dashboard'}
        className={`mx-2 rounded-lg text-black dark:text-white ${pathName === '/dashboard' && 'bg-base-100 dark:bg-[#3F4144]'}`}
      >
        <span className="menu flex flex-row items-center gap-2 font-bold">
          <GrProjects />
          <span className="text-xs lg:text-sm">Dashboard</span>
        </span>
      </Link>
      <Link
        onClick={() => setOpened(false)}
        href={'/dashboard/manage-projects'}
        className={`mx-2 rounded-lg text-black dark:bg-primary dark:text-white ${pathName === '/dashboard/manage-projects' && 'bg-base-100 dark:bg-[#3F4144]'}`}
      >
        <span className="menu flex flex-row items-center gap-2 font-bold">
          <GrProjects />
          <span className="text-xs lg:text-sm">Manage Projects</span>
        </span>
      </Link>
      <Link
        onClick={() => setOpened(false)}
        href={'/dashboard/add-project'}
        className={`mx-2 rounded-lg text-black dark:bg-primary dark:text-white ${pathName === '/dashboard/add-project' && 'bg-base-100 dark:bg-[#3F4144]'}`}
      >
        <span className="menu flex flex-row items-center gap-2 font-bold">
          <GrProjects />
          <span className="text-xs lg:text-sm">Add Projects</span>
        </span>
      </Link>
    </div>
    // bg-gray-200 dark:bg-primary  text-black dark:text-white mx-2 rounded-lg
  );
};

export default Sidebar;
