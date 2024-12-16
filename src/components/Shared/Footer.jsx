'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import { FaFacebook, FaTwitter, FaYoutube } from 'react-icons/fa';
import Links from './Links';

const Footer = () => {
  const pathName = usePathname();
  const isDashboard = pathName.startsWith('/dashboard');

  return (
    <footer>
      {!isDashboard && (
        <div className="flex justify-center rounded bg-gray-200 text-base-content dark:bg-primary dark:text-white">
          <div className="footer footer-center mx-auto max-w-screen-2xl p-10">
            <nav className="text-xs">
              <Links />
            </nav>
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
