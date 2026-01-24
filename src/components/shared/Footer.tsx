'use client';
import Link from 'next/link';
import { Github, Linkedin, Mail, ArrowUp, Facebook } from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function Footer() {
  const pathname = usePathname();
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  if (pathname.startsWith('/dashboard') || pathname.startsWith('/auth')) {
    return null;
  }

  return (
    <footer className="border-t-2 border-[#0082c4] bg-[#f2f2f2] dark:bg-[#11141c]">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8 grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Brand Column */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-[#0082c4]">
              Developer Saif
            </h3>
            <p className="text-sm text-[#334155] dark:text-[#cbd5e1]">
              Full-Stack Developer crafting modern web experiences with
              precision and innovation.
            </p>
            <p className="text-xs text-[#64748b]">
              © {currentYear} Saif. All rights reserved.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[#0082c4]">Quick Links</h4>
            <nav className="flex flex-col space-y-2">
              <Link
                href="#home"
                className="text-sm text-[#334155] transition-colors hover:text-[#0082c4] dark:text-[#cbd5e1] dark:hover:text-[#0082c4]"
              >
                Home
              </Link>
              <Link
                href="#about"
                className="text-sm text-[#334155] transition-colors hover:text-[#0082c4] dark:text-[#cbd5e1] dark:hover:text-[#0082c4]"
              >
                About
              </Link>
              <Link
                href="#skills"
                className="text-sm text-[#334155] transition-colors hover:text-[#0082c4] dark:text-[#cbd5e1] dark:hover:text-[#0082c4]"
              >
                Skills
              </Link>
              <Link
                href="#contact"
                className="text-sm text-[#334155] transition-colors hover:text-[#0082c4] dark:text-[#cbd5e1] dark:hover:text-[#0082c4]"
              >
                Contact
              </Link>
            </nav>
          </div>

          {/* Social & Connect */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[#0082c4]">Connect</h4>
            <div className="flex space-x-4">
              <a
                href="https://github.com/muhammadsaif7717"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg bg-white p-2 text-[#334155] transition-all hover:scale-110 hover:text-[#0082c4] dark:bg-[#000000] dark:text-[#cbd5e1] dark:hover:text-[#0082c4]"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="https://linkedin.com/in/mdsaifislam77"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg bg-white p-2 text-[#334155] transition-all hover:scale-110 hover:text-[#0082c4] dark:bg-[#000000] dark:text-[#cbd5e1] dark:hover:text-[#0082c4]"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="https://www.facebook.com/muhammadsaif7717"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg bg-white p-2 text-[#334155] transition-all hover:scale-110 hover:text-[#0082c4] dark:bg-[#000000] dark:text-[#cbd5e1] dark:hover:text-[#0082c4]"
                aria-label="Twitter"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="mailto:muhammadsaif7717@gmail.com"
                className="rounded-lg bg-white p-2 text-[#334155] transition-all hover:scale-110 hover:text-[#0082c4] dark:bg-[#000000] dark:text-[#cbd5e1] dark:hover:text-[#0082c4]"
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
            <div className="pt-4">
              <p className="mb-2 text-xs text-[#64748b]">Legal</p>
              <div className="flex space-x-4 text-xs">
                <Link
                  href="/privacy"
                  className="text-[#334155] transition-colors hover:text-[#0082c4] dark:text-[#cbd5e1] dark:hover:text-[#0082c4]"
                >
                  Privacy Policy
                </Link>
                <Link
                  href="/terms"
                  className="text-[#334155] transition-colors hover:text-[#0082c4] dark:text-[#cbd5e1] dark:hover:text-[#0082c4]"
                >
                  Terms of Service
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Back to Top Button */}
        <div className="flex justify-center border-t border-[#e2e8f0] pt-8 dark:border-[#27273a]">
          <button
            onClick={scrollToTop}
            className="group flex items-center space-x-2 rounded-lg bg-[#0082c4] px-6 py-3 text-white transition-all hover:scale-105 hover:bg-[#0099e6] hover:shadow-[0_0_20px_rgba(0,130,196,0.3)]"
            aria-label="Back to top"
          >
            <span className="text-sm font-medium">Back to Top</span>
            <ArrowUp className="h-4 w-4 group-hover:animate-bounce" />
          </button>
        </div>
      </div>
    </footer>
  );
}
