'use client';
import { ActiveContext } from '@/contexts/ActiveProvider';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useContext } from 'react';
import { FaFacebook, FaTwitter, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  const pathName = usePathname();
  const isDashboard = pathName.startsWith('/dashboard');

  const { active, setActive } = useContext(ActiveContext);

  const links = (
    <div className="flex flex-wrap items-center justify-center gap-5 uppercase dark:text-white">
      <Link
        onClick={() => setActive('home')}
        href="/"
        className={`hover:scale-110 ${active === 'home' && 'text-blue-400'}`}
      >
        Home
      </Link>
      <Link
        onClick={() => setActive('skills')}
        href="/#skills"
        className={`hover:scale-110 ${active === 'skills' && 'text-blue-400'}`}
      >
        Skills
      </Link>
      <Link
        onClick={() => setActive('projects')}
        href="/#projects"
        className={`hover:scale-110 ${active === 'projects' && 'text-blue-400'}`}
      >
        Projects
      </Link>
      <Link
        onClick={() => setActive('about')}
        href="/#about"
        className={`hover:scale-110 ${active === 'about' && 'text-blue-400'}`}
      >
        About
      </Link>
      <Link
        onClick={() => setActive('contact')}
        href="/#contact"
        className={`hover:scale-110 ${active === 'contact' && 'text-blue-400'}`}
      >
        Contact
      </Link>
      <Link
        onClick={() => setActive('blogs')}
        href="/blogs"
        className={`hover:scale-110 ${active === 'blogs' && 'text-blue-400'}`}
      >
        Blogs
      </Link>
    </div>
  );

  return (
    <footer>
      {!isDashboard && (
        <div className="flex justify-center rounded bg-gray-200 text-base-content dark:bg-primary dark:text-white">
          <div className="footer footer-center mx-auto max-w-screen-2xl p-10">
            <nav className="">{links}</nav>
            <nav>
              <div className="grid grid-flow-col gap-4">
                <Link target="blank" href={`https://x.com/muhammadsaif77`}>
                  <FaTwitter className="text-2xl text-[#0082C4] duration-500 hover:scale-125 hover:text-[#3cbbfa]" />
                </Link>
                <Link
                  target="blank"
                  href={`https://www.youtube.com/channel/UCH4scmKdKwWXeh5CUzdmddw`}
                >
                  <FaYoutube className="text-2xl text-[#0082C4] duration-500 hover:scale-125 hover:text-[#3cbbfa]" />
                </Link>
                <Link
                  target="blank"
                  href={`https://www.facebook.com/muhammadsaif7717`}
                >
                  <FaFacebook className="text-2xl text-[#0082C4] duration-500 hover:scale-125 hover:text-[#3cbbfa]" />
                </Link>
              </div>
            </nav>
            <aside>
              <p>Copyright © 2024 - All right reserved by Developer Saif</p>
            </aside>
          </div>
        </div>
      )}
    </footer>
  );
};

export default Footer;
