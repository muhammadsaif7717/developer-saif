'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useContext } from 'react';
import ThemeToggle from './ThemeToggle';
import { ActiveContext } from '@/contexts/ActiveProvider';

const Navbar = () => {
  const pathName = usePathname();
  const isDashboard = pathName.startsWith('/dashboard');

  const { active, setActive } = useContext(ActiveContext);

  const links = (
    <div className="flex flex-col gap-5 font-semibold uppercase dark:text-white lg:flex-row">
      <Link
        onClick={() => setActive('home')}
        href="/"
        className={`hover:scale-110 ${active === 'home' && 'text-blue-400'}`}
      >
        Home
      </Link>
      <Link
        onClick={() => setActive('skills')}
        href="#skills"
        className={`hover:scale-110 ${active === 'skills' && 'text-blue-400'}`}
      >
        Skills
      </Link>
      <Link
        onClick={() => setActive('projects')}
        href="#projects"
        className={`hover:scale-110 ${active === 'projects' && 'text-blue-400'}`}
      >
        Projects
      </Link>
      <Link
        onClick={() => setActive('about')}
        href="#about"
        className={`hover:scale-110 ${active === 'about' && 'text-blue-400'}`}
      >
        About
      </Link>
      <Link
        onClick={() => setActive('contact')}
        href="#contact"
        className={`hover:scale-110 ${active === 'contact' && 'text-blue-400'}`}
      >
        Contact
      </Link>
    </div>
  );
  return (
    <nav className="z-50">
      {!isDashboard && (
        <div className="fixed z-50 flex w-full justify-center rounded-xl bg-gray-200 dark:bg-[#00283A]">
          <div className="navbar z-50 mx-auto flex max-w-screen-2xl justify-evenly rounded-xl">
            <div className="navbar-start">
              <div className="dropdown">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost mr-2 scale-125 px-3 lg:hidden"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 dark:text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h8m-8 6h16"
                    />
                  </svg>
                </div>
                <ul
                  tabIndex={0}
                  className="menu dropdown-content menu-sm z-[1] mt-3 flex w-36 items-center justify-center rounded-box bg-base-100 p-2 shadow dark:bg-primary"
                >
                  {links}
                </ul>
              </div>
              <Link
                href={`/`}
                className="btn btn-ghost ml-2 p-0 text-2xl font-bold duration-200 hover:scale-105 lg:m-0"
              >
                <cite className="text-primary dark:text-white">Developer</cite>
                <cite className="text-secondary">Saif</cite>
              </Link>
            </div>
            <div className="navbar-center hidden lg:flex">
              <ul className="menu menu-horizontal px-1">{links}</ul>
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
