'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Home, ArrowLeft, Search, Mail } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function NotFound() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  if (!mounted) return null;

  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-4 pt-10 dark:bg-[#000000]">
      <div className="w-full max-w-2xl text-center">
        {/* Animated 404 */}
        <div className="relative mb-8">
          <h1 className="text-9xl font-bold text-[#0082c4] opacity-20 select-none md:text-[200px]">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="rounded-xl border-2 border-[#0082c4] bg-[#f2f2f2] px-8 py-4 shadow-[0_0_30px_rgba(0,130,196,0.3)] dark:bg-[#11141c]">
              <p className="text-2xl font-bold text-[#0082c4] md:text-3xl">
                Page Not Found
              </p>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="mb-12 space-y-4">
          <p className="text-lg text-[#334155] md:text-xl dark:text-[#cbd5e1]">
            Oops! The page you&apos;re looking for seems to have wandered off into
            the digital void.
          </p>
          <p className="text-sm text-[#64748b]">
            Don&apos;t worry, even the best developers get lost sometimes. Let&apos;s get
            you back on track.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="mb-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/"
            className="group flex w-full items-center justify-center space-x-2 rounded-lg bg-[#0082c4] px-6 py-3 text-white transition-all hover:scale-105 hover:bg-[#0099e6] hover:shadow-[0_0_20px_rgba(0,130,196,0.4)] sm:w-auto"
          >
            <Home className="h-5 w-5" />
            <span className="font-medium">Back to Home</span>
          </Link>

          <button
            onClick={() => router.back()}
            className="group flex w-full items-center justify-center space-x-2 rounded-lg border-2 border-[#0082c4] bg-[#f2f2f2] px-6 py-3 text-[#0082c4] transition-all hover:scale-105 hover:bg-[#0082c4] hover:text-white sm:w-auto dark:bg-[#11141c]"
          >
            <ArrowLeft className="h-5 w-5" />
            <span className="font-medium">Go Back</span>
          </button>
        </div>

        {/* Quick Links Card */}
        <div className="rounded-xl border border-[#e2e8f0] bg-[#f2f2f2] p-8 dark:border-[#27273a] dark:bg-[#11141c]">
          <h2 className="mb-6 text-xl font-semibold text-[#0082c4]">
            Looking for something specific?
          </h2>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <Link
              href="/#services"
              className="group rounded-lg border-2 border-transparent bg-white p-4 transition-all hover:border-[#0082c4] hover:shadow-[0_0_15px_rgba(0,130,196,0.2)] dark:bg-[#000000]"
            >
              <Search className="mx-auto mb-2 h-6 w-6 text-[#0082c4]" />
              <p className="text-sm font-medium text-[#334155] transition-colors group-hover:text-[#0082c4] dark:text-[#cbd5e1]">
                View Services
              </p>
            </Link>

            <Link
              href="/#portfolio"
              className="group rounded-lg border-2 border-transparent bg-white p-4 transition-all hover:border-[#0082c4] hover:shadow-[0_0_15px_rgba(0,130,196,0.2)] dark:bg-[#000000]"
            >
              <Search className="mx-auto mb-2 h-6 w-6 text-[#0082c4]" />
              <p className="text-sm font-medium text-[#334155] transition-colors group-hover:text-[#0082c4] dark:text-[#cbd5e1]">
                Browse Portfolio
              </p>
            </Link>

            <Link
              href="/#contact"
              className="group rounded-lg border-2 border-transparent bg-white p-4 transition-all hover:border-[#0082c4] hover:shadow-[0_0_15px_rgba(0,130,196,0.2)] dark:bg-[#000000]"
            >
              <Mail className="mx-auto mb-2 h-6 w-6 text-[#0082c4]" />
              <p className="text-sm font-medium text-[#334155] transition-colors group-hover:text-[#0082c4] dark:text-[#cbd5e1]">
                Get In Touch
              </p>
            </Link>
          </div>
        </div>

        {/* Fun Error Code */}
        <div className="mt-8">
          <p className="font-mono text-xs text-[#64748b]">
            ERROR_CODE: PAGE_NOT_FOUND_404 | STATUS: CYAN_ALERT_ACTIVE
          </p>
        </div>
      </div>
    </div>
  );
}
