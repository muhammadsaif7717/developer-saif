'use client';
import LoadingPage from '@/components/shared/LoadingPage';

import * as LucideIcons from 'lucide-react';
const { Code2, Loader2, Database, Wrench, Cloud, Palette, Server } =
  LucideIcons;
import { useTheme } from 'next-themes';
import Image from 'next/image';
import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';

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
      className="mb-0.5 font-mono text-xs font-bold tracking-[0.18em] uppercase opacity-50"
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
  totalCategories,
}: {
  category: any;
  index: number;
  totalCategories: number;
}) => {
  const getIcon = (name: string) => {
    if (!name) return Code2;
    if ((LucideIcons as any)[name]) return (LucideIcons as any)[name];
    const pascalName = name
      .split('-')
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join('');
    return (LucideIcons as any)[pascalName] || Code2;
  };
  const Icon = getIcon(category.icon);
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
          <Icon className="h-5 w-5 text-white" aria-hidden="true" />
        </div>
        <h4
          className="text-xl font-bold tracking-tight"
          style={{ color: category.accentHex }}
        >
          {category.title}
        </h4>
        {/* count badge */}
        <span
          className="ml-auto rounded-full px-2.5 py-0.5 text-xs font-bold tracking-wide uppercase opacity-70"
          style={{
            background: `${category.accentHex}15`,
            color: category.accentHex,
          }}
        >
          {category.skills?.length || 0}
        </span>
      </div>

      {/* Skill grid */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {category.skills?.map((skill: any, i: number) => (
          <SkillBadge
            key={skill.name}
            skill={skill}
            accentHex={category.accentHex}
            delay={index * 0.04 + i * 0.05}
          />
        ))}
      </div>

      {/* Separator */}
      {index < totalCategories - 1 && (
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

  // Dynamic data states
  const [skillCategories, setSkillCategories] = useState<any[]>([]);
  const [skillsData, setSkillsData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [skillsRes, arsenalRes] = await Promise.all([
          fetch('/api/skills').then((r) => r.json()),
          fetch('/api/arsenal').then((r) => r.json()),
        ]);
        if (skillsRes.success) setSkillCategories(skillsRes.data);
        if (arsenalRes.success) setSkillsData(arsenalRes.data);
      } catch (error) {
        console.error('Failed to fetch skills data', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();

    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  const doubledSkills = useMemo(
    () => [...skillsData, ...skillsData],
    [skillsData],
  );

  useEffect(() => {
    if (!isPaused && doubledSkills.length > 0) {
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
  }, [controls, isPaused, doubledSkills]);

  const handleMouseEnter = useCallback(() => setIsPaused(true), []);
  const handleMouseLeave = useCallback(() => setIsPaused(false), []);

  return (
    <section
      id="skills"
      className="relative overflow-hidden bg-white pb-24 md:pb-32 dark:bg-black"
      aria-labelledby="skills-heading"
    >
      {loading ? (
        <LoadingPage />
      ) : (
        <>
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
            <header className="mb-12 text-center md:mb-16">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-4 flex items-center justify-center gap-3"
              >
                <span className="h-px w-10 bg-gradient-to-r from-transparent to-[#0082c4]" />
                <span className="font-mono text-sm font-medium tracking-wider text-[#0082c4] uppercase">
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
                className="mb-4 text-4xl font-bold md:text-5xl lg:text-6xl"
              >
                <span className="text-[#0082c4]">Skills &amp; </span>
                <span className="text-slate-800 dark:text-white">
                  Expertise
                </span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="mx-auto max-w-2xl text-base text-[#64748b] md:text-lg dark:text-[#cbd5e1]"
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
                        key={`${skill.name}-${index}`}
                        whileHover={{ scale: 1.1, y: -4 }}
                        transition={{
                          type: 'spring',
                          stiffness: 300,
                          damping: 20,
                        }}
                        className="flex w-28 shrink-0 flex-col items-center gap-3 rounded-xl border border-slate-200/80 bg-white p-4 shadow-sm transition-colors duration-200 hover:border-[#0082c4]/50 hover:shadow-[0_4px_20px_rgba(0,130,196,0.2)] dark:border-white/[0.06] dark:bg-white/[0.04] dark:hover:border-[#0082c4]/40"
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

              <p className="mt-3 text-right text-xs text-slate-400 dark:text-slate-600">
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
                  {skillCategories.filter((cat: any) => !cat.isHidden).length}{' '}
                  categories
                </span>
              </motion.div>

              <div className="space-y-12">
                {skillCategories
                  .filter((cat: any) => !cat.isHidden)
                  .map((category, idx) => (
                    <CategoryBlock
                      key={category.title}
                      category={category}
                      index={idx}
                      totalCategories={
                        skillCategories.filter((cat: any) => !cat.isHidden)
                          .length
                      }
                    />
                  ))}
              </div>
            </section>
          </div>
        </>
      )}
    </section>
  );
};

export default Skills;
