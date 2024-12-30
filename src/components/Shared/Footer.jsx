'use client';
import { usePathname } from 'next/navigation';
import React from 'react';

const Footer = () => {
  const pathName = usePathname();
  const isDashboard = pathName.startsWith('/dashboard');

  return (
    <footer>
      {!isDashboard && (
        <div className="flex flex-wrap justify-center rounded bg-gray-200 text-base-content dark:bg-primary dark:text-white">
          <div className="footer footer-center mx-auto max-w-screen-2xl gap-3 p-10">
            <p className="text-[16px] md:text-[18px]">
              Developer Protfolio of MD. SAIF ISLAM
            </p>
            <p className="text-[13px] md:text-[14px]">
              Copyright © 2025 - All right reserved
            </p>
          </div>
        </div>
      )}
    </footer>
  );
};

export default Footer;
