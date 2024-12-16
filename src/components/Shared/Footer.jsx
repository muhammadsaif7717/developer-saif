'use client';
import { usePathname } from 'next/navigation';
import React from 'react';

const Footer = () => {
  const pathName = usePathname();
  const isDashboard = pathName.startsWith('/dashboard');

  return (
    <footer>
      {!isDashboard && (
        <div className="flex justify-center rounded bg-gray-200 text-base-content dark:bg-primary dark:text-white">
          <div className="footer gap-3 footer-center mx-auto max-w-screen-2xl p-10">
              <p className='text-[20px]'>Developer Protfolio of MD. SAIF ISLAM</p>
              <p className='text-[16px]'>Copyright © 2025 - All right reserved</p>
          </div>
        </div>
      )}
    </footer>
  );
};

export default Footer;
