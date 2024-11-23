'use client';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import logo from '../../../public/logo.png';
import Sidebar from './Sidebar';
import ThemeToggle from '../Shared/ThemeToggle';
import { MdClose } from 'react-icons/md';
import { TiThMenu } from 'react-icons/ti';

const DashNavbar = () => {
  const [opened, setOpened] = useState(false);
  return (
    <div className="z-50 flex w-full justify-center bg-gray-200 dark:bg-[#00283A]">
      <div className="navbar z-50 flex justify-evenly">
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
              className="menu dropdown-content menu-sm -left-5 z-[1]"
            >
              {opened && <Sidebar />}
            </ul>
          </div>
          <Link
            href={`/`}
            className="btn border-none bg-transparent hover:bg-transparent"
          >
            <Image src={logo} height={35} width={35} alt="logo" />
            <div className="text-lg font-bold lg:text-2xl">
              <cite>
                <span className="text-black dark:text-white">
                  Dev<span className="text-secondary">Saif</span>
                </span>
              </cite>
            </div>
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex"></div>
        <div className="navbar-end p-0">
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
};

export default DashNavbar;
