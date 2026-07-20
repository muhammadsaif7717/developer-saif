'use client';
import { useContext, useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useSession } from 'next-auth/react';

import {
  Code,
  ContactRound,
  Home,
  LayoutDashboard,
  LayoutPanelLeft,
  ListChecks,
  Menu,
  Rss,
  SquareChartGantt,
  X,
} from 'lucide-react';
import { ActiveContext } from '@/providers/ActiveProvider';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const [opened, setOpened] = useState(false);
  const { active, setActive } = useContext(ActiveContext);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        opened &&
        !target.closest('.mobile-menu') &&
        !target.closest('.menu-button')
      ) {
        setOpened(false);
      }
    };

    if (opened) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => document.removeEventListener('click', handleClickOutside);
  }, [opened]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (opened) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [opened]);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
    key: string,
  ) => {
    setActive(key);
    setOpened(false);

    if (href.startsWith('/#') || href.startsWith('#')) {
      const targetId = href.split('#')[1];
      if (pathname === '/') {
        e.preventDefault();
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
          window.history.pushState(null, '', `/#${targetId}`);
        }
      }
    }
  };

  // Scroll Spy to highlight active section on the home page
  useEffect(() => {
    if (pathname !== '/') return;

    const sections = ['home', 'about', 'skills', 'projects', 'contact'];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-30% 0px -30% 0px',
        threshold: 0,
      },
    );

    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [pathname, setActive]);

  // Handle hash scroll when navigating from another page
  useEffect(() => {
    if (pathname === '/') {
      const hash = window.location.hash;
      if (hash) {
        const id = hash.replace('#', '');
        setTimeout(() => {
          const element = document.getElementById(id);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            setActive(id);
          }
        }, 400); // 400ms is perfectly balanced to allow image rendering before scrolling
      }
    }
  }, [pathname, setActive]);

  if (!mounted) {
    return (
      <nav className="fixed z-40 w-full backdrop-blur-[10px]">
        <div className="flex w-full items-center justify-between p-2 md:p-5">
          <div className="h-8 w-32 animate-pulse rounded bg-gray-300 dark:bg-gray-700" />
          <div className="h-8 w-24 animate-pulse rounded bg-gray-300 dark:bg-gray-700" />
        </div>
      </nav>
    );
  }

  const navLinks = [
    { name: 'Home', href: '/', icon: Home, key: 'home' },
    { name: 'About', href: '/#about', icon: SquareChartGantt, key: 'about' },
    { name: 'Skills', href: '/#skills', icon: ListChecks, key: 'skills' },
    { name: 'Projects', href: '/#projects', icon: Code, key: 'projects' },
    { name: 'Contact', href: '/#contact', icon: ContactRound, key: 'contact' },
    { name: 'Blogs', href: '/blogs', icon: Rss, key: 'blogs' },
  ];

  if (pathname.startsWith('/dashboard') || pathname.startsWith('/auth')) {
    return null;
  }

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed z-40 w-full bg-transparent backdrop-blur-[10px]"
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6 md:py-4">
          {/* Logo & Menu Button */}
          <div className="flex items-center gap-0 md:gap-5">
            <button
              onClick={() => setOpened(!opened)}
              className="menu-button block p-2 transition-transform hover:scale-110 lg:hidden"
              aria-label="Toggle menu"
            >
              <Menu className="h-7 w-7 text-black dark:text-white" />
            </button>
            <Link
              onClick={(e) => handleNavClick(e, '/', 'home')}
              href="/"
              className="text-lg font-bold text-black transition-colors hover:text-[#0082c4] md:text-2xl lg:text-3xl dark:text-white dark:hover:text-[#0082c4]"
            >
              Developer <span className="text-[#0082c4]">Saif</span>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden items-center gap-4 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.key}
                onClick={(e) => handleNavClick(e, link.href, link.key)}
                href={link.href}
                scroll={!link.href.includes('#')}
                className="group relative flex items-center justify-center"
                aria-label={link.name}
              >
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-lg transition-all duration-200 ${
                    active === link.key
                      ? 'bg-[#0082c4] text-white shadow-lg shadow-[#0082c4]/30'
                      : 'text-black hover:bg-[#f2f2f2] dark:text-white dark:hover:bg-[#11141c]'
                  }`}
                >
                  <link.icon className="h-5 w-5" />
                </div>
                {/* Tooltip */}
                <span className="pointer-events-none absolute -bottom-10 rounded-md bg-black px-2 py-1 text-xs whitespace-nowrap text-white opacity-0 transition-opacity group-hover:opacity-100 dark:bg-white dark:text-black">
                  {link.name}
                </span>
              </Link>
            ))}

            {/* Dashboard Link (if authenticated) */}
            {status === 'authenticated' && session.user.role === 'admin' && (
              <Link
                onClick={() => setActive('dashboard')}
                href="/dashboard"
                className="group relative flex items-center justify-center"
                aria-label="Dashboard"
              >
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-lg transition-all duration-200 ${
                    active === 'dashboard'
                      ? 'bg-[#0082c4] text-white shadow-lg shadow-[#0082c4]/30'
                      : 'text-black hover:bg-[#f2f2f2] dark:text-white dark:hover:bg-[#11141c]'
                  }`}
                >
                  <LayoutDashboard className="h-5 w-5" />
                </div>
                <span className="pointer-events-none absolute -bottom-10 rounded-md bg-black px-2 py-1 text-xs whitespace-nowrap text-white opacity-0 transition-opacity group-hover:opacity-100 dark:bg-white dark:text-black">
                  Dashboard
                </span>
              </Link>
            )}

            <div className="ml-2">
              <ThemeToggle />
            </div>
          </div>

          {/* Contact Button */}
          <motion.a
            href="/#contact"
            onClick={(e: React.MouseEvent<HTMLAnchorElement>) =>
              handleNavClick(e, '/#contact', 'contact')
            }
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 rounded-lg border-2 border-[#0082c4] bg-[#0082c4] px-3 py-2 font-semibold text-white shadow-lg shadow-[#0082c4]/20 transition-all hover:shadow-xl hover:shadow-[#0082c4]/30 md:px-4"
          >
            <LayoutPanelLeft className="h-4 w-4 md:h-6 md:w-6" />
            <span className="text-xs md:text-base">Contact me</span>
          </motion.a>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {opened && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
              onClick={() => setOpened(false)}
            />

            {/* Mobile Menu */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="mobile-menu fixed top-0 left-0 z-50 h-full w-4/5 max-w-sm overflow-y-auto bg-white p-6 shadow-2xl md:w-80 dark:bg-[#11141c]"
            >
              {/* Close Button */}
              <button
                onClick={() => setOpened(false)}
                className="mb-8 p-2 transition-transform hover:scale-110"
                aria-label="Close menu"
              >
                <X className="h-7 w-7 text-black dark:text-white" />
              </button>

              {/* Mobile Navigation Links */}
              <div className="flex flex-col gap-2">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.key}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      scroll={!link.href.includes('#')}
                      onClick={(e) => handleNavClick(e, link.href, link.key)}
                      className={`flex items-center gap-4 rounded-lg p-3 font-semibold transition-all ${
                        active === link.key
                          ? 'bg-[#0082c4] text-white shadow-lg shadow-[#0082c4]/20'
                          : 'text-black hover:bg-[#f2f2f2] dark:text-white dark:hover:bg-[#27273a]'
                      }`}
                    >
                      <link.icon className="h-6 w-6" />
                      <span>{link.name}</span>
                    </Link>
                  </motion.div>
                ))}

                {/* Dashboard Link (Mobile - if authenticated) */}
                {status === 'authenticated' &&
                  session.user.role === 'admin' && (
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: navLinks.length * 0.05 }}
                    >
                      <Link
                        href="/dashboard"
                        onClick={() => {
                          setOpened(false);
                          setActive('dashboard');
                        }}
                        className={`flex items-center gap-4 rounded-lg p-3 font-semibold transition-all ${
                          active === 'dashboard'
                            ? 'bg-[#0082c4] text-white shadow-lg shadow-[#0082c4]/20'
                            : 'text-black hover:bg-[#f2f2f2] dark:text-white dark:hover:bg-[#27273a]'
                        }`}
                      >
                        <LayoutDashboard className="h-6 w-6" />
                        <span>Dashboard</span>
                      </Link>
                    </motion.div>
                  )}

                {/* Theme Toggle in Mobile Menu */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: (navLinks.length + 4) * 0.05 }}
                  className="mt-4 flex items-center gap-4 rounded-lg p-3 hover:bg-[#f2f2f2] dark:hover:bg-[#27273a]"
                >
                  <ThemeToggle />
                  <span className="font-semibold text-black dark:text-white">
                    Theme
                  </span>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
