"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useContext } from 'react';
import ThemeToggle from './ThemeToggle';
import { ActiveContext } from '@/contexts/ActiveProvider';

const Navbar = () => {
    const pathName = usePathname();
    const isDashboard = pathName.startsWith("/dashboard");

    const { active, setActive } = useContext(ActiveContext);

    const links = (
        <div className='dark:text-white font-semibold uppercase flex flex-col lg:flex-row gap-5'>
            <Link onClick={() => setActive('home')} href="/" className={`${active === 'home' && 'text-blue-400'}`}>Home</Link>
            <Link onClick={() => setActive('skills')} href="#skills" className={`${active === 'skills' && 'text-blue-400'}`}>Skills</Link>
            <Link onClick={() => setActive('projects')} href="#projects" className={`${active === 'projects' && 'text-blue-400'}`}>Projects</Link>
            <Link onClick={() => setActive('about')} href="#about" className={`${active === 'about' && 'text-blue-400'}`}>About</Link>
            <Link onClick={() => setActive('contact')} href="#contact" className={`${active === 'contact' && 'text-blue-400'}`}>Contact</Link>
        </div>
    );
    return (
        <nav className='z-50'>
            {!isDashboard &&
                <div className='z-50 flex justify-center w-full bg-gray-200 dark:bg-[#00283A]  fixed rounded-xl'>
                    <div className="navbar flex justify-evenly  max-w-screen-2xl mx-auto  z-50 rounded-xl">
                        <div className="navbar-start">
                            <div className="dropdown">
                                <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden px-3 mr-2 scale-125">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 dark:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                                </div>
                                <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 dark:bg-primary rounded-box w-36 flex items-center justify-center">
                                    {links}
                                </ul>
                            </div>
                            <Link href={`/`} className="btn btn-ghost text-2xl font-bold p-0 ml-2 lg:m-0">
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