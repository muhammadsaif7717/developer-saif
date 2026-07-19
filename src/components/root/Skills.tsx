'use client';

import { Code2, Database, Wrench, Cloud, Palette, Server } from 'lucide-react';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';

// ─── Data ────────────────────────────────────────────────────────────────────

const skillCategories = [
  {
    icon: Code2,
    title: 'Frontend Architecture',
    accentHex: '#0082c4',
    skills: [
      { label: 'Modern UI', name: 'React & Next.js' },
      { label: 'Type Safety', name: 'TypeScript' },
      { label: 'Styles', name: 'Tailwind CSS' },
      { label: 'Animation', name: 'Framer Motion' },
      { label: 'Components', name: 'shadcn/ui' },
    ],
  },
  {
    icon: Server,
    title: 'Backend Systems',
    accentHex: '#0099e6',
    skills: [
      { label: 'Runtime', name: 'Node.js' },
      { label: 'Framework', name: 'Express.js' },
      { label: 'API Design', name: 'REST APIs' },
      { label: 'Auth', name: 'Authentication' },
      { label: 'ODM', name: 'Mongoose' },
    ],
  },
  {
    icon: Database,
    title: 'Database & Storage',
    accentHex: '#0082c4',
    skills: [
      { label: 'NoSQL', name: 'MongoDB' },
      { label: 'Realtime', name: 'Firebase' },
      { label: 'Relational', name: 'SQL Basics' },
      { label: 'Modeling', name: 'Database Design' },
    ],
  },
  {
    icon: Wrench,
    title: 'Tools & Workflow',
    accentHex: '#0099e6',
    skills: [
      { label: 'Version Control', name: 'Git & GitHub' },
      { label: 'Editor', name: 'VS Code' },
      { label: 'Pkg Manager', name: 'npm & yarn' },
      { label: 'API Testing', name: 'Postman' },
      { label: 'Debugging', name: 'Chrome DevTools' },
    ],
  },
  {
    icon: Palette,
    title: 'UI/UX & Design',
    accentHex: '#0082c4',
    skills: [
      { label: 'Core', name: 'Responsive Design' },
      { label: 'Prototyping', name: 'Figma' },
      { label: 'Component Lib', name: 'Material-UI' },
      { label: 'Motion', name: 'Framer Motion' },
    ],
  },
  {
    icon: Cloud,
    title: 'Cloud & Deployment',
    accentHex: '#0099e6',
    skills: [
      { label: 'Hosting', name: 'Vercel' },
      { label: 'Hosting', name: 'Netlify' },
      { label: 'Firebase', name: 'Firebase Hosting' },
      { label: 'Database', name: 'MongoDB Atlas' },
    ],
  },
];

const skillsData = [
  { id: 1, name: 'HTML', image: 'https://skillicons.dev/icons?i=html' },
  { id: 2, name: 'CSS', image: 'https://skillicons.dev/icons?i=css' },
  { id: 3, name: 'Next.js', image: 'https://skillicons.dev/icons?i=nextjs' },
  { id: 4, name: 'React', image: 'https://skillicons.dev/icons?i=react' },
  { id: 5, name: 'TypeScript', image: 'https://skillicons.dev/icons?i=ts' },
  { id: 6, name: 'JavaScript', image: 'https://skillicons.dev/icons?i=js' },
  { id: 7, name: 'Tailwind', image: 'https://skillicons.dev/icons?i=tailwind' },
  { id: 8, name: 'Node.js', image: 'https://skillicons.dev/icons?i=nodejs' },
  { id: 9, name: 'Express', image: 'https://skillicons.dev/icons?i=express' },
  { id: 10, name: 'MongoDB', image: 'https://skillicons.dev/icons?i=mongodb' },
  {
    id: 11,
    name: 'Firebase',
    image: 'https://skillicons.dev/icons?i=firebase',
  },
  { id: 12, name: 'GitHub', image: 'https://skillicons.dev/icons?i=github' },
  { id: 13, name: 'Git', image: 'https://skillicons.dev/icons?i=git' },
  { id: 14, name: 'npm', image: 'https://skillicons.dev/icons?i=npm' },
  { id: 15, name: 'Figma', image: 'https://skillicons.dev/icons?i=figma' },
  { id: 16, name: 'VS Code', image: 'https://skillicons.dev/icons?i=vscode' },
];

// ─── Sub-components ──────────────────────────────────────────────────────────

/** A single pill-style skill badge */
const SkillBadge = ({
  skill,
  accentHex,
  delay = 0,
}: {
  skill: { label: string; name: string };
  accentHex: string;
  delay?: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
    whileHover={{ y: -4, scale: 1.02 }}
    className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white/70 px-5 py-4 shadow-sm backdrop-blur-sm transition-shadow duration-300 hover:shadow-[0_8px_30px_rgba(0,130,196,0.15)] dark:border-white/[0.06] dark:bg-white/[0.03] dark:hover:shadow-[0_8px_30px_rgba(0,153,230,0.12)]"
  >
    {/* Hover shimmer */}
    <div
      className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      style={{
        background: `linear-gradient(135deg, ${accentHex}08 0%, transparent 60%)`,
      }}
    />
    {/* Left accent bar */}
    <div
      className="absolute top-4 bottom-4 left-0 w-[3px] rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      style={{ background: accentHex }}
    />

    <p
      className="mb-0.5 font-mono text-[0.6rem] font-bold tracking-[0.18em] uppercase opacity-50"
      style={{ color: accentHex }}
    >
      {skill.label}
    </p>
    <p className="text-base leading-tight font-semibold text-slate-800 dark:text-slate-100">
      {skill.name}
    </p>
  </motion.div>
);

/** One full category block */
const CategoryBlock = ({
  category,
  index,
}: {
  category: (typeof skillCategories)[0];
  index: number;
}) => {
  const Icon = category.icon;
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        delay: index * 0.07,
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      {/* Category header */}
      <div className="mb-6 flex items-center gap-3">
        <div
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl shadow-md"
          style={{
            background: `linear-gradient(135deg, ${category.accentHex}, ${category.accentHex}bb)`,
            boxShadow: `0 4px 14px ${category.accentHex}40`,
          }}
        >
          <Icon className="h-[18px] w-[18px] text-white" aria-hidden="true" />
        </div>
        <h4
          className="text-xl font-bold tracking-tight"
          style={{ color: category.accentHex }}
        >
          {category.title}
        </h4>
        {/* count badge */}
        <span
          className="ml-auto rounded-full px-2.5 py-0.5 text-[0.65rem] font-bold tracking-wide uppercase opacity-70"
          style={{
            background: `${category.accentHex}15`,
            color: category.accentHex,
          }}
        >
          {category.skills.length}
        </span>
      </div>

      {/* Skill grid */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {category.skills.map((skill, i) => (
          <SkillBadge
            key={skill.name}
            skill={skill}
            accentHex={category.accentHex}
            delay={index * 0.04 + i * 0.05}
          />
        ))}
      </div>

      {/* Separator */}
      {index < skillCategories.length - 1 && (
        <div
          className="mt-12 h-px"
          style={{
            background: `linear-gradient(90deg, transparent, ${category.accentHex}30, transparent)`,
          }}
        />
      )}
    </motion.div>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────

const Skills = () => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const controls = useAnimation();
  const [isPaused, setIsPaused] = useState(false);
  const doubledSkills = useMemo(() => [...skillsData, ...skillsData], []);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isPaused) {
      controls.start({
        x: ['0%', '-50%'],
        transition: {
          x: {
            repeat: Infinity,
            repeatType: 'loop',
            duration: 55,
            ease: 'linear',
          },
        },
      });
    } else {
      controls.stop();
    }
  }, [controls, isPaused]);

  const handleMouseEnter = useCallback(() => setIsPaused(true), []);
  const handleMouseLeave = useCallback(() => setIsPaused(false), []);

  return (
    <section
      id="skills"
      className="relative overflow-hidden bg-white pb-24 md:pb-32 dark:bg-black"
      aria-labelledby="skills-heading"
    >
      {/* ── Ambient Background ──────────────────────────────────── */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        {/* Line grid — matches About */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,130,196,0.3)_1px,transparent_1px),linear-gradient(90deg,rgba(0,130,196,0.3)_1px,transparent_1px)] bg-[size:50px_50px] opacity-[0.03] dark:opacity-[0.08]" />
        {/* Glow blobs — matches About */}
        <div className="absolute top-1/4 right-1/4 h-96 w-96 animate-pulse rounded-full bg-[#0082c4] opacity-20 blur-[120px] dark:opacity-10" />
        <div className="absolute bottom-1/4 left-1/4 h-96 w-96 animate-pulse rounded-full bg-[#0099e6] opacity-20 blur-[120px] [animation-delay:1s] dark:opacity-10" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 pt-0 sm:px-6 lg:px-8">
        {/* ── Section Header ──────────────────────────────────────── */}
        <header className="mb-20 text-center">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-5 inline-flex items-center gap-3"
          >
            <span className="h-px w-10 bg-gradient-to-r from-transparent to-[#0082c4]" />
            <span className="font-mono text-xs font-bold tracking-[0.25em] text-[#0082c4] uppercase">
              Technical Proficiencies
            </span>
            <span className="h-px w-10 bg-gradient-to-l from-transparent to-[#0082c4]" />
          </motion.div>

          <motion.h2
            id="skills-heading"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="mb-5 text-5xl font-extrabold tracking-tight md:text-6xl lg:text-7xl"
          >
            <span className="bg-gradient-to-r from-[#0082c4] via-[#0099e6] to-[#0082c4] bg-clip-text text-transparent">
              Skills &amp;
            </span>{' '}
            <span className="text-slate-800 dark:text-white">Expertise</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mx-auto max-w-xl text-base text-slate-500 md:text-lg dark:text-slate-400"
          >
            A constantly evolving tech stack built for crafting fast,
            accessible, and memorable web experiences.
          </motion.p>
        </header>

        {/* ── Technology Carousel ─────────────────────────────────── */}
        <section aria-labelledby="tech-stack-heading" className="mb-28">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-6 flex items-center justify-between"
          >
            <h3
              id="tech-stack-heading"
              className="font-mono text-xs font-bold tracking-[0.22em] text-[#0082c4] uppercase"
            >
              Technology Arsenal
            </h3>
            <span className="text-xs text-slate-400 dark:text-slate-600">
              {skillsData.length} technologies
            </span>
          </motion.div>

          {/* Rail */}
          <div className="relative rounded-2xl border border-slate-200/80 bg-white/60 p-4 backdrop-blur-sm dark:border-white/[0.05] dark:bg-white/[0.02]">
            {/* Fade masks */}
            <div
              className="pointer-events-none absolute top-0 left-0 z-20 h-full w-20 rounded-l-2xl bg-gradient-to-r from-white/90 to-transparent dark:from-[#080b12]/90"
              aria-hidden="true"
            />
            <div
              className="pointer-events-none absolute top-0 right-0 z-20 h-full w-20 rounded-r-2xl bg-gradient-to-l from-white/90 to-transparent dark:from-[#080b12]/90"
              aria-hidden="true"
            />

            <div
              className="overflow-hidden"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              role="region"
              aria-label="Scrolling technology logos"
            >
              <motion.div
                className="flex gap-4"
                animate={controls}
                style={{ minWidth: 'max-content' }}
              >
                {doubledSkills.map((skill, index) => (
                  <motion.div
                    key={`${skill.id}-${index}`}
                    whileHover={{ scale: 1.1, y: -4 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    className="flex w-[110px] shrink-0 flex-col items-center gap-3 rounded-xl border border-slate-200/80 bg-white p-4 shadow-sm transition-colors duration-200 hover:border-[#0082c4]/50 hover:shadow-[0_4px_20px_rgba(0,130,196,0.2)] dark:border-white/[0.06] dark:bg-white/[0.04] dark:hover:border-[#0082c4]/40"
                  >
                    <Image
                      height={48}
                      width={48}
                      src={`${skill.image}&theme=${mounted && theme === 'dark' ? 'dark' : 'light'}`}
                      alt={`${skill.name} logo`}
                      className="h-12 w-12 object-contain"
                      loading="lazy"
                    />
                    <span className="text-center text-xs leading-tight font-semibold text-slate-600 dark:text-slate-400">
                      {skill.name}
                    </span>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>

          <p className="mt-3 text-right text-[0.7rem] text-slate-400 dark:text-slate-600">
            Hover to pause the scroll
          </p>
        </section>

        {/* ── Expertise Breakdown ─────────────────────────────────── */}
        <section aria-labelledby="expertise-heading">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 flex items-end justify-between border-b border-slate-200/80 pb-4 dark:border-white/[0.06]"
          >
            <div>
              <h3
                id="expertise-heading"
                className="mb-1 font-mono text-xs font-bold tracking-[0.22em] text-[#0082c4] uppercase"
              >
                Expertise Breakdown
              </h3>
              <p className="text-2xl font-bold text-slate-800 dark:text-white">
                What I work with
              </p>
            </div>
            <span className="font-mono text-xs text-slate-400 dark:text-slate-600">
              {skillCategories.length} categories
            </span>
          </motion.div>

          <div className="space-y-12">
            {skillCategories.map((category, idx) => (
              <CategoryBlock
                key={category.title}
                category={category}
                index={idx}
              />
            ))}
          </div>
        </section>
      </div>
    </section>
  );
};

export default Skills;
