"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const NavBar = () => {
    const pathName = usePathname();
    console.log(pathName)
    const links = <div className='flex flex-col lg:flex-row gap-5'>
        <Link href={`#home`} className={`${pathName === '/' && 'text-blue-400'}`}>Home</Link>
        <Link href={`#about`}>About</Link>
        <Link href={`#projects`}>Projects</Link>
        <Link href={`#contact`}>Contact</Link>
    </div>
    return (
        <div>
            <div className="navbar bg-base-100 bg-opacity-80 fixed max-w-screen-xl mx-auto  z-50 ">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            {links}
                        </ul>
                    </div>
                    <Link href={`/`} className="btn btn-ghost text-2xl text-orange-500">Developer Saif</Link>
                </div>
                <div className="navbar-center hidden lg:flex ">
                    <ul className="menu menu-horizontal px-1">
                        {links}
                    </ul>
                </div>
                <div className="navbar-end">
                    <a className="btn btn-primary rounded-full bg-orange-500 border-none" >Sing In</a>
                </div>
            </div>
        </div>
    );
};

export default NavBar;