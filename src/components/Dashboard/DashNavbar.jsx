'use client'
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import logo from '../../../public/logo.png';
import Sidebar from './Sidebar';
import ThemeToggle from '../Shared/ThemeToggle';

const DashNavbar = () => {
    return (
        <div className='flex justify-center w-full bg-base-300 dark:bg-[#00283A] '>
            <div className="navbar flex justify-evenly ">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden p-0 mr-2 scale-125 text-white">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 dark:text-white text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content -left-5  z-[1]">
                            <Sidebar />
                        </ul>
                    </div>
                    <Link href={`/`} className="bg-transparent hover:bg-transparent btn border-none">
                        <Image src={logo} height={35} width={35} alt='logo' />
                        <div className="text-lg lg:text-2xl font-bold">
                            <cite>
                                <span className='text-black dark:text-white'>Dev<span className="text-secondary">Saif</span></span>
                            </cite>
                        </div>
                    </Link>
                </div>
                <div className="navbar-center hidden lg:flex ">

                </div>
                <div className="navbar-end p-0">
                    <ThemeToggle />
                </div>
            </div>
        </div>
    );
};

export default DashNavbar;
