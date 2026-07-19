'use client';

import Link from 'next/link';
import { X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { FaWhatsapp } from 'react-icons/fa';

const WhatsAppButton = () => {
  const pathname = usePathname();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  const whatsappNumber = '+8801319630516';
  const defaultMessage = `Hi, Saif! We should talk about your services in details.`;

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isExpanded && isMobile) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isExpanded, isMobile]);

  if (!isVisible) {
    return (
      <button
        onClick={() => setIsVisible(true)}
        className="fixed right-3 bottom-3 z-[1000] rounded-full bg-slate-200 p-2 text-slate-600 shadow-lg transition-all hover:bg-slate-300 active:scale-95 sm:right-6 sm:bottom-6 sm:p-3 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
        aria-label="Show WhatsApp button"
      >
        <FaWhatsapp className="h-4 w-4 sm:h-5 sm:w-5" />
      </button>
    );
  }

  if (pathname.startsWith('/dashboard') || pathname.startsWith('/auth'))
    return null;

  return (
    <>
      {/* Backdrop */}
      {isExpanded && (
        <div
          className="fixed inset-0 z-[999] bg-black/20 backdrop-blur-sm"
          onClick={() => setIsExpanded(false)}
        />
      )}

      <div className="fixed right-3 bottom-3 z-[1000] flex flex-col items-end gap-2 sm:right-6 sm:bottom-6 sm:gap-3">
        {/* ── Expanded Card ──────────────────────────────────── */}
        {isExpanded && (
          <div className="animate-in slide-in-from-bottom-4 fade-in relative mb-1 w-[min(calc(100vw-1.5rem),20rem)] rounded-2xl border border-[#25D366]/40 bg-white p-4 shadow-2xl shadow-[#25D366]/10 duration-200 dark:bg-[#11141c]">
            {/* Close */}
            <button
              onClick={() => setIsExpanded(false)}
              className="absolute top-2.5 right-2.5 rounded-full p-1 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-300"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>

            {/* Header */}
            <div className="mb-3 flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#25D366] to-[#128C7E] shadow-md shadow-[#25D366]/30">
                <FaWhatsapp className="h-5 w-5 text-white" />
              </div>
              <div className="min-w-0">
                <h3 className="text-sm font-bold text-[#0082c4]">
                  Let&apos;s Connect!
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Usually replies within hours
                </p>
              </div>
            </div>

            {/* Message preview */}
            <div className="mb-3 rounded-xl bg-[#f2f2f2] px-3 py-2.5 dark:bg-black">
              <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-300">
                &quot;{defaultMessage}&quot;
              </p>
            </div>

            {/* CTA */}
            <Link
              href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(defaultMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsExpanded(false)}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#25D366] to-[#128C7E] py-2.5 text-sm font-semibold text-white shadow-md shadow-[#25D366]/25 transition-all hover:scale-[1.02] hover:shadow-lg hover:shadow-[#25D366]/35 active:scale-95"
            >
              <FaWhatsapp className="h-4 w-4" />
              Start Chat on WhatsApp
            </Link>

            <p className="mt-2 text-center text-[0.65rem] text-slate-400">
              Available for projects & collaborations
            </p>

            {/* Hide option */}
            <button
              onClick={() => {
                setIsVisible(false);
                setIsExpanded(false);
              }}
              className="mt-1 block w-full text-center text-[0.65rem] text-slate-400 transition-colors hover:text-slate-600 dark:hover:text-slate-300"
            >
              Hide widget
            </button>
          </div>
        )}

        {/* ── FAB ───────────────────────────────────────────── */}
        <div className="relative">
          {/* Ping rings */}
          <div className="absolute inset-0 animate-ping rounded-full bg-[#25D366] opacity-20" />
          <div className="absolute inset-0 animate-pulse rounded-full bg-[#25D366] opacity-25" />

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            aria-label="Open WhatsApp chat"
            className="group relative flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-[#25D366] to-[#128C7E] shadow-xl shadow-[#25D366]/40 transition-all duration-300 hover:scale-110 hover:shadow-[#25D366]/60 active:scale-95 sm:h-14 sm:w-14"
          >
            <FaWhatsapp className="h-5 w-5 text-white transition-transform duration-300 group-hover:scale-110 sm:h-7 sm:w-7" />
          </button>
        </div>
      </div>
    </>
  );
};

export default WhatsAppButton;
