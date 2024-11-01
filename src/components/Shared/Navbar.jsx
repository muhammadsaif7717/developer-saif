"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
    const pathName = usePathname();
    const isDashboard = pathName.startsWith("/dashboard");

    const links = (
        <div className='dark:text-white font-semibold uppercase flex flex-col lg:flex-row gap-5'>
            <Link href="/" className={`${pathName === '/' && 'text-blue-400'}`}>Home</Link>
            <Link href="#about" className={`${pathName === '/#about' && 'text-blue-400'}`}>About</Link>
            <Link href="#projects" className={`${pathName === '/#projects' && 'text-blue-400'}`}>Projects</Link>
            <Link href="#contact" className={`${pathName === '/#contact' && 'text-blue-400'}`}>Contact</Link>
        </div>
    );
    return (
        <nav>
            {!isDashboard &&
                <div className='flex justify-center w-full bg-base-300 dark:bg-[#00283A] bg-opacity-80 fixed'>
                    <div className="navbar flex justify-evenly  max-w-screen-2xl mx-auto  z-50 rounded-xl">
                        <div className="navbar-start">
                            <div className="dropdown">
                                <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden p-0 mr-2 scale-125">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 dark:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                                </div>
                                <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                                    {links}
                                </ul>
                            </div>
                            <Link href={`/`} className="btn btn-ghost text-2xl font-bold p-0">
                                <cite className='text-primary dark:text-white'>Developer</cite>
                                <cite className="text-secondary">Saif</cite>
                            </Link>
                        </div>
                        <div className="navbar-center hidden lg:flex ">
                            <ul className="menu menu-horizontal px-1">
                                {links}
                            </ul>
                        </div>
                        <div className="navbar-end p-0">
                            <ThemeToggle />
                        </div>
                    </div>
                </div>
            }
        </nav>
    );
};

export default Navbar;