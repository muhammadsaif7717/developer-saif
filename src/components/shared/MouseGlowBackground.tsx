'use client';

import { useEffect, useRef } from 'react';

export default function MouseGlowBackground() {
  const blob1Ref = useRef<HTMLDivElement>(null);
  const blob2Ref = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);

  // Current rendered position (for smooth lerp)
  const pos1 = useRef({ x: 0, y: 0 });
  const pos2 = useRef({ x: 0, y: 0 });
  // Target position (raw mouse)
  const target = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Lerp loop — blob1 chases fast, blob2 lags behind
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const animate = () => {
      pos1.current.x = lerp(pos1.current.x, target.current.x, 0.07);
      pos1.current.y = lerp(pos1.current.y, target.current.y, 0.07);

      pos2.current.x = lerp(pos2.current.x, target.current.x, 0.035);
      pos2.current.y = lerp(pos2.current.y, target.current.y, 0.035);

      if (blob1Ref.current) {
        blob1Ref.current.style.transform = `translate(${pos1.current.x}px, ${pos1.current.y}px) translate(-50%, -50%)`;
      }
      if (blob2Ref.current) {
        blob2Ref.current.style.transform = `translate(${pos2.current.x}px, ${pos2.current.y}px) translate(-50%, -50%)`;
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      {/* Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,130,196,0.3)_1px,transparent_1px),linear-gradient(90deg,rgba(0,130,196,0.3)_1px,transparent_1px)] bg-[size:50px_50px] opacity-[0.03] dark:opacity-[0.08]" />

      {/*
        Blobs start at 0,0 — their position is driven entirely by the
        rAF loop via inline transform. left-0 top-0 is the anchor.
      */}
      {/* Blob 1 — faster, primary color */}
      <div
        ref={blob1Ref}
        className="absolute top-0 left-0 h-72 w-72 rounded-full bg-[#0082c4] opacity-20 blur-[100px] will-change-transform dark:opacity-15"
        style={{ transform: 'translate(-50%, -50%)' }}
      />
      {/* Blob 2 — slower/laggier, secondary color, slightly larger */}
      <div
        ref={blob2Ref}
        className="absolute top-0 left-0 h-96 w-96 rounded-full bg-[#0099e6] opacity-15 blur-[120px] will-change-transform dark:opacity-10"
        style={{ transform: 'translate(-50%, -50%)' }}
      />
    </div>
  );
}
