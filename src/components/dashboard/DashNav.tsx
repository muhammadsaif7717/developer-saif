'use client';

import { useContext, useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSession, signOut } from 'next-auth/react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, LogOut, User, Menu, X, ChevronDown, Shield } from 'lucide-react';
import ThemeToggle from '../shared/ThemeToggle';
import { ActiveContext } from '@/providers/ActiveProvider';

interface UserDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

function UserDropdown({ isOpen, onClose }: UserDropdownProps) {
  const { data: session } = useSession();
  const { setActive } = useContext(ActiveContext);

  if (!session?.user) return null;

  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/' });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40"
          />

          {/* Dropdown Menu */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.2 }}
            className="card-surface border-border absolute top-full right-0 z-50 mt-2 w-72 overflow-hidden rounded-xl border bg-white shadow-2xl dark:bg-[#11141c]"
          >
            {/* User Info Header */}
            <div className="border-border border-b bg-gradient-to-r from-[#0082c4]/10 to-transparent p-4">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="absolute inset-0 bg-[#0082c4] blur-lg" />
                  <Image
                    src={session.user.image || '/default-avatar.png'}
                    alt={session.user.name || 'User'}
                    width={48}
                    height={48}
                    className="relative rounded-full ring-2 ring-[#0082c4]/50"
                  />
                  <div className="ring-background absolute right-0 bottom-0 h-3 w-3 rounded-full bg-[#10b981] ring-2" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-semibold text-[#0082c4]">
                    {session.user.name || 'User'}
                  </p>
                  <p className="text-muted-foreground truncate text-sm">
                    {session.user.email}
                  </p>
                </div>
              </div>
            </div>

            {/* Menu Items */}
            <div className="py-2">
              {/* Profile */}
              {/* <Link
                href="/dashboard/profile"
                onClick={onClose}
                className="flex items-center gap-3 px-4 py-3 hover:bg-[#0082c4]/10 transition-colors group"
              >
                <User className="w-5 h-5 text-muted-foreground group-hover:text-[#0082c4] transition-colors" />
                <div>
                  <p className="font-medium text-sm group-hover:text-[#0082c4] transition-colors">
                    My Profile
                  </p>
                  <p className="text-xs text-muted-foreground">
                    View and edit profile
                  </p>
                </div>
              </Link> */}

              {/* Settings */}
              {/* <Link
                href="/dashboard/settings"
                onClick={onClose}
                className="flex items-center gap-3 px-4 py-3 hover:bg-[#0082c4]/10 transition-colors group"
              >
                <Settings className="w-5 h-5 text-muted-foreground group-hover:text-[#0082c4] transition-colors" />
                <div>
                  <p className="font-medium text-sm group-hover:text-[#0082c4] transition-colors">
                    Settings
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Preferences and security
                  </p>
                </div>
              </Link> */}

              {/* Divider */}
              <div className="border-border my-2 border-t" />

              {/* Return to Homepage */}
              <Link
                href="/"
                onClick={() => {
                  onClose(); // call your onClose function
                  setActive('home'); // set the active link
                }}
                className="group flex items-center gap-3 px-4 py-3 transition-colors hover:bg-[#0082c4]/10"
              >
                <Home className="text-muted-foreground h-5 w-5 transition-colors group-hover:text-[#0082c4]" />
                <p className="text-sm font-medium transition-colors group-hover:text-[#0082c4]">
                  Back to Homepage
                </p>
              </Link>

              {/* Divider */}
              <div className="border-border my-2 border-t" />

              {/* Logout */}
              <button
                onClick={handleSignOut}
                className="group flex w-full items-center gap-3 px-4 py-3 transition-colors hover:bg-red-500/10"
              >
                <LogOut className="text-muted-foreground h-5 w-5 transition-colors group-hover:text-red-500" />
                <p className="text-sm font-medium transition-colors group-hover:text-red-500">
                  Sign Out
                </p>
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default function DashNav() {
  const { data: session, status } = useSession();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!mounted) return null;

  const navLinks = [
    { label: 'Overview', href: '/dashboard' },
    { label: 'Projects', href: '/dashboard/projects' },
    { label: 'Blog Posts', href: '/dashboard/blogs' },
    { label: 'Messages', href: '/dashboard/messages' },
    { label: 'Analytics', href: '/dashboard/analytics' },
  ];

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'glass-effect border-border border-b shadow-lg'
          : 'bg-transparent backdrop-blur-sm'
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between md:h-20">
          {/* Logo & Brand */}
          <Link href="/dashboard" className="relative z-10">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-[#0082c4] to-[#0099e6] opacity-50 blur-lg" />
                <span className="text-gradient-cyan relative text-2xl font-bold md:text-3xl">
                  Dashboard
                </span>
              </div>
              <Shield className="h-5 w-5 text-[#0082c4]" />
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-2 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-muted-foreground rounded-lg px-4 py-2 text-sm font-medium transition-all duration-300 hover:bg-[#0082c4]/10 hover:text-[#0082c4]"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden items-center gap-4 lg:flex">
            <ThemeToggle />

            {/* User Profile Dropdown */}
            {status === 'authenticated' && session?.user ? (
              <div className="relative">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                  className="group flex items-center gap-2 rounded-lg px-3 py-2 transition-colors hover:bg-[#0082c4]/10"
                >
                  <div className="relative">
                    <Image
                      src={session.user.image || '/default-avatar.png'}
                      alt={session.user.name || 'User'}
                      width={36}
                      height={36}
                      className="rounded-full ring-2 ring-transparent transition-all duration-300 group-hover:ring-[#0082c4]"
                    />
                    <div className="ring-background absolute right-0 bottom-0 h-2.5 w-2.5 rounded-full bg-[#10b981] ring-2" />
                  </div>
                  <ChevronDown
                    className={`text-muted-foreground h-4 w-4 transition-transform duration-300 ${
                      isUserDropdownOpen ? 'rotate-180' : ''
                    }`}
                  />
                </motion.button>

                <UserDropdown
                  isOpen={isUserDropdownOpen}
                  onClose={() => setIsUserDropdownOpen(false)}
                />
              </div>
            ) : (
              <Link href="/auth/signin">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="rounded-lg bg-[#0082c4] px-4 py-2 font-medium text-white transition-colors hover:bg-[#0099e6]"
                >
                  Sign In
                </motion.button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-3 lg:hidden">
            <ThemeToggle />

            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="rounded-lg bg-gray-100 p-2 text-[#334155] transition-colors hover:bg-gray-200 dark:bg-[#27273a] dark:text-[#cbd5e1] dark:hover:bg-[#3a3a4f]"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="border-border overflow-hidden border-t pb-4 lg:hidden"
            >
              <div className="space-y-2 py-4">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="text-muted-foreground block rounded-lg px-4 py-3 text-sm font-medium transition-all hover:bg-[#0082c4]/10 hover:text-[#0082c4]"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}

                {/* Mobile User Section */}
                {status === 'authenticated' && session?.user && (
                  <>
                    <div className="border-border my-4 border-t" />

                    <div className="card-surface rounded-lg px-4 py-3">
                      <div className="mb-3 flex items-center gap-3">
                        <Image
                          src={session.user.image || '/default-avatar.png'}
                          alt={session.user.name || 'User'}
                          width={40}
                          height={40}
                          className="rounded-full ring-2 ring-[#0082c4]/50"
                        />
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-semibold text-[#0082c4]">
                            {session.user.name}
                          </p>
                          <p className="text-muted-foreground truncate text-xs">
                            {session.user.email}
                          </p>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Link
                          href="/dashboard/profile"
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="flex items-center gap-2 rounded-lg px-3 py-2 transition-colors hover:bg-[#0082c4]/10"
                        >
                          <User className="h-4 w-4 text-[#0082c4]" />
                          <span className="text-sm font-medium">
                            My Profile
                          </span>
                        </Link>

                        <Link
                          href="/"
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="flex items-center gap-2 rounded-lg px-3 py-2 transition-colors hover:bg-[#0082c4]/10"
                        >
                          <Home className="h-4 w-4 text-[#0082c4]" />
                          <span className="text-sm font-medium">Homepage</span>
                        </Link>

                        <button
                          onClick={() => signOut({ callbackUrl: '/' })}
                          className="flex w-full items-center gap-2 rounded-lg px-3 py-2 transition-colors hover:bg-red-500/10"
                        >
                          <LogOut className="h-4 w-4 text-red-500" />
                          <span className="text-sm font-medium text-red-500">
                            Sign Out
                          </span>
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}
