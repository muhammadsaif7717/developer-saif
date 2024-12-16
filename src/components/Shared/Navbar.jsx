'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react';
import ThemeToggle from './ThemeToggle';
import { MdClose } from 'react-icons/md';
import { TiThMenu } from 'react-icons/ti';
import Links from './Links';

const Navbar = () => {
  const pathName = usePathname();
  const isDashboard = pathName.startsWith('/dashboard');
  const [opened, setOpened] = useState(false);

  return (
    <nav className="z-50">
      {!isDashboard && (
        <div className="fixed z-50 flex w-full justify-center bg-gray-200 dark:bg-[#00283A]">
          <div className="navbar z-50 mx-auto flex max-w-screen-2xl justify-evenly rounded-xl">
            <div className="navbar-start">
              <div className="dropdown">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost mr-2 scale-125 border-none p-3 text-white outline-none lg:hidden"
                  onClick={() => setOpened(!opened)}
                >
                  {opened ? (
                    <MdClose className="text-lg font-extrabold text-black dark:text-white" />
                  ) : (
                    <TiThMenu className="text-lg text-black dark:text-white" />
                  )}
                </div>
                <ul
                  tabIndex={0}
                  className={`menu dropdown-content menu-sm top-10 mt-4 flex w-36 items-center justify-center bg-gray-200 p-3 pt-8 shadow ease-in dark:bg-primary ${!opened && 'hidden'} ${opened && '-left-2'}`}
                >
                  {opened ? links : ''}
                </ul>
              </div>
              <Link
                href={`/#banner`}
                className="btn btn-ghost ml-2 p-0 text-2xl font-bold duration-200 hover:scale-105 hover:bg-transparent lg:m-0"
              >
                <cite className="text-primary dark:text-white">Developer</cite>
                <cite className="text-secondary">Saif</cite>
              </Link>
            </div>
            <div className="navbar-center hidden lg:flex">
              <ul className="menu menu-horizontal px-1">
                <Links/>
              </ul>
            </div>
            <div className="navbar-end p-0">
              <ThemeToggle />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
