'use client';

import Link from 'next/link';
import { MessageCircle, X } from 'lucide-react';
import { useState, useEffect } from 'react';

const WhatsAppButton = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  const whatsappNumber = '+8801319630516';
  const defaultMessage = `Hi, Saif! We should talk about your services in details.`;

  // Detect mobile devices
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Prevent body scroll when expanded on mobile
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

  if (!isVisible) return null;

  return (
    <>
      {/* Backdrop for expanded state */}
      {isExpanded && (
        <div
          className="fixed inset-0 z-[999] bg-black/20 backdrop-blur-sm"
          onClick={() => setIsExpanded(false)}
        />
      )}

      {/* Main WhatsApp Button Container */}
      <div className="fixed bottom-4 right-4 z-[1000] flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
        {/* Expanded Card */}
        {isExpanded && (
          <div className="animate-in slide-in-from-bottom-5 fade-in duration-300 mb-2 w-[calc(100vw-2rem)] max-w-sm rounded-2xl border-2 border-[#0082c4] bg-white p-4 shadow-2xl sm:w-80 sm:p-6 dark:bg-[#11141c]">
            {/* Close Button */}
            <button
              onClick={() => setIsExpanded(false)}
              className="absolute top-2 right-2 rounded-full p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 sm:top-3 sm:right-3 dark:hover:bg-slate-800 dark:hover:text-slate-300"
              aria-label="Close"
            >
              <X className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>

            {/* Header */}
            <div className="mb-3 sm:mb-4">
              <div className="mb-2 flex items-center gap-2 sm:gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#25D366] to-[#128C7E] sm:h-12 sm:w-12">
                  <MessageCircle className="h-5 w-5 text-white sm:h-6 sm:w-6" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="truncate text-base font-bold text-[#0082c4] sm:text-lg">
                    Let's Connect!
                  </h3>
                  <p className="text-xs text-slate-500 sm:text-sm dark:text-slate-400">
                    Usually replies within hours
                  </p>
                </div>
              </div>
            </div>

            {/* Message Preview */}
            <div className="mb-3 rounded-lg bg-[#f2f2f2] p-2.5 sm:mb-4 sm:p-3 dark:bg-[#000000]">
              <p className="text-xs leading-relaxed text-slate-600 sm:text-sm dark:text-slate-300">
                "{defaultMessage}"
              </p>
            </div>

            {/* Action Button */}
            <Link
              href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(defaultMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#25D366] to-[#128C7E] px-4 py-2.5 text-sm font-semibold text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl hover:shadow-[#25D366]/30 active:scale-95 sm:py-3 sm:text-base"
              onClick={() => setIsExpanded(false)}
            >
              <MessageCircle className="h-4 w-4 sm:h-5 sm:w-5" />
              <span className="truncate">Start Chat on WhatsApp</span>
            </Link>

            {/* Footer */}
            <p className="mt-2 text-center text-xs text-slate-400 sm:mt-3">
              Available for projects & collaborations
            </p>
          </div>
        )}

        {/* Floating Action Button */}
        <div className="relative">
          {/* Pulse Animation Rings */}
          <div className="absolute inset-0 animate-ping rounded-full bg-[#25D366] opacity-20" />
          <div className="absolute inset-0 animate-pulse rounded-full bg-[#25D366] opacity-30" />

          {/* Main Button */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[#25D366] to-[#128C7E] shadow-2xl shadow-[#25D366]/40 transition-all duration-300 hover:scale-110 hover:shadow-[#25D366]/60 active:scale-95 sm:h-16 sm:w-16"
            aria-label="Open WhatsApp chat"
          >
            {/* Icon with rotation animation */}
            <MessageCircle className="h-7 w-7 text-white transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12 sm:h-8 sm:w-8" />
          </button>

          {/* Tooltip - Hidden on mobile, shown on tablet+ */}
          {!isExpanded && (
            <div className="pointer-events-none absolute bottom-full right-0 mb-2 hidden w-max max-w-xs rounded-lg bg-slate-900 px-3 py-2 text-sm text-white opacity-0 shadow-xl transition-opacity duration-300 group-hover:opacity-100 md:block dark:bg-slate-800">
              <span>Chat with me on WhatsApp!</span>
              <div className="absolute -bottom-1 right-6 h-2 w-2 rotate-45 bg-slate-900 dark:bg-slate-800" />
            </div>
          )}
        </div>

        {/* Minimize Button (when expanded) */}
        {isExpanded && (
          <button
            onClick={() => setIsVisible(false)}
            className="text-xs text-slate-500 transition-colors hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300"
          >
            Hide chat widget
          </button>
        )}
      </div>

      {/* Restore Button (when hidden) */}
      {!isVisible && (
        <button
          onClick={() => setIsVisible(true)}
          className="fixed bottom-4 right-4 z-[1000] rounded-full bg-slate-200 p-2.5 text-slate-600 shadow-lg transition-all hover:bg-slate-300 active:scale-95 sm:bottom-6 sm:right-6 sm:p-3 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
          aria-label="Show WhatsApp button"
        >
          <MessageCircle className="h-5 w-5" />
        </button>
      )}
    </>
  );
};

export default WhatsAppButton;