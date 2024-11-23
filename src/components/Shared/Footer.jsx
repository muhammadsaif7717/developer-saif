'use client'
import { ActiveContext } from '@/contexts/ActiveProvider';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useContext } from 'react';
import { FaFacebook, FaTwitter, FaYoutube } from 'react-icons/fa';

const Footer = () => {
    const pathName = usePathname();
    const isDashboard = pathName.startsWith("/dashboard");

    const { active, setActive } = useContext(ActiveContext);

    const links = (
        <div className='text-black dark:text-white  uppercase flex flex-col lg:flex-row gap-5'>
            <Link onClick={() => setActive('home')} href="/" className={`${active === 'home' && 'text-blue-400'}`}>Home</Link>
            <Link onClick={() => setActive('skills')} href="#skills" className={`${active === 'skills' && 'text-blue-400'}`}>Skills</Link>
            <Link onClick={() => setActive('projects')} href="#projects" className={`${active === 'projects' && 'text-blue-400'}`}>Projects</Link>
            <Link onClick={() => setActive('about')} href="#about" className={`${active === 'about' && 'text-blue-400'}`}>About</Link>
            <Link onClick={() => setActive('contact')} href="#contact" className={`${active === 'contact' && 'text-blue-400'}`}>Contact</Link>
        </div>)

    return (
        <footer>
            {!isDashboard &&
                <div className='flex justify-center bg-gray-200 text-base-content rounded dark:bg-primary dark:text-white'>
                    <div className="footer footer-center p-10  max-w-screen-2xl mx-auto">
                        <nav className="">
                            {links}
                        </nav>
                        <nav>
                            <div className="grid grid-flow-col gap-4">
                                <Link target='blank' href={`https://x.com/muhammadsaif77`} >
                                    <FaTwitter className='text-2xl text-[#0082C4] hover:text-[#3cbbfa] hover:scale-125 duration-500' />
                                </Link>
                                <Link target='blank' href={`https://www.youtube.com/channel/UCH4scmKdKwWXeh5CUzdmddw`}>
                                    <FaYoutube className='text-2xl text-[#0082C4] hover:text-[#3cbbfa] hover:scale-125 duration-500' />
                                </Link>
                                <Link target='blank' href={`https://www.facebook.com/muhammadsaif7717`}>
                                    <FaFacebook className='text-2xl text-[#0082C4] hover:text-[#3cbbfa] hover:scale-125 duration-500' />
                                </Link>
                            </div>
                        </nav>
                        <aside>
                            <p>Copyright © 2024 - All right reserved by Developer Saif</p>
                        </aside>
                    </div>
                </div>
            }
        </footer>
    );
};

export default Footer;