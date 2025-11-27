'use client';

import {
  Code2,
  Database,
  Wrench,
  Cloud,
  Palette,
  GitBranch,
  Server,
} from 'lucide-react';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, useAnimation } from 'framer-motion';

const skillCategories = [
  {
    icon: Code2,
    title: 'Frontend Development',
    codeComment: '// User Interface',
    skills: [
      { name: 'React', level: 95 },
      { name: 'Next.js', level: 90 },
      { name: 'TypeScript', level: 88 },
      { name: 'JavaScript (ES6+)', level: 95 },
      { name: 'HTML5 & CSS3', level: 98 },
      { name: 'Tailwind CSS', level: 95 },
    ],
  },
  {
    icon: Server,
    title: 'Backend Development',
    codeComment: '// Server Side',
    skills: [
      { name: 'Node.js', level: 88 },
      { name: 'Express.js', level: 90 },
      { name: 'REST APIs', level: 92 },
      { name: 'Authentication', level: 85 },
      { name: 'Mongoose ODM', level: 88 },
    ],
  },
  {
    icon: Database,
    title: 'Database & Storage',
    codeComment: '// Data Layer',
    skills: [
      { name: 'MongoDB', level: 90 },
      { name: 'Firebase', level: 85 },
      { name: 'SQL Basics', level: 75 },
      { name: 'Database Design', level: 82 },
    ],
  },
  {
    icon: Wrench,
    title: 'Tools & Technologies',
    codeComment: '// Dev Tools',
    skills: [
      { name: 'Git & GitHub', level: 92 },
      { name: 'VS Code', level: 95 },
      { name: 'npm & yarn', level: 90 },
      { name: 'Postman', level: 88 },
      { name: 'Chrome DevTools', level: 90 },
    ],
  },
  {
    icon: Palette,
    title: 'UI/UX & Design',
    codeComment: '// Visual Design',
    skills: [
      { name: 'Responsive Design', level: 95 },
      { name: 'Figma', level: 80 },
      { name: 'Material-UI', level: 85 },
      { name: 'Framer Motion', level: 82 },
      { name: 'shadcn/ui', level: 88 },
    ],
  },
  {
    icon: Cloud,
    title: 'Deployment & Hosting',
    codeComment: '// Cloud Services',
    skills: [
      { name: 'Vercel', level: 92 },
      { name: 'Netlify', level: 88 },
      { name: 'Firebase Hosting', level: 85 },
      { name: 'MongoDB Atlas', level: 90 },
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

const Skills = () => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const controls = useAnimation();
  const [isPaused, setIsPaused] = useState(false);

  // Memoize doubled skills array for carousel
  const doubledSkills = useMemo(() => [...skillsData, ...skillsData], []);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isPaused) {
      controls.start({
        x: ['0%', '-50%'],
        transition: {
          x: {
            repeat: Infinity,
            repeatType: 'loop',
            duration: 60,
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
      className="relative overflow-hidden bg-white py-20 md:py-28 lg:py-36 dark:bg-black"
      aria-labelledby="skills-heading"
    >
      {/* Animated Background Elements */}
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-[linear-linear(rgba(0,130,196,0.05)_1px,transparent_1px),linear-linear(90deg,rgba(0,130,196,0.05)_1px,transparent_1px)] bg-size-[60px_60px] dark:bg-[linear-linear(rgba(0,130,196,0.1)_1px,transparent_1px),linear-linear(90deg,rgba(0,130,196,0.1)_1px,transparent_1px)]" />
        <div className="absolute top-20 -left-40 h-96 w-96 rounded-full bg-[#0082c4] opacity-10 blur-3xl" />
        <div className="absolute top-1/3 -right-40 h-96 w-96 rounded-full bg-[#0099e6] opacity-10 blur-3xl" />
        <div className="absolute bottom-20 left-1/3 h-96 w-96 rounded-full bg-[#0082c4] opacity-10 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <header className="mb-20 text-center">
          <div className="mb-4 inline-block rounded-full border border-[#0082c4]/20 bg-[#0082c4]/5 px-4 py-2 backdrop-blur-sm">
            <span className="font-mono text-sm font-medium text-[#0082c4]">
              {'<TechStack />'}
            </span>
          </div>
          <h2
            id="skills-heading"
            className="mb-6 bg-linear-to-r from-[#0082c4] via-[#0099e6] to-[#0082c4] bg-clip-text text-5xl font-bold text-transparent md:text-6xl lg:text-7xl"
          >
            Skills & Expertise
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-slate-600 md:text-xl dark:text-slate-400">
            Constantly evolving tech stack powering modern web experiences
          </p>
        </header>

        {/* Technology Stack Carousel */}
        <section aria-labelledby="tech-stack-heading" className="mb-24">
          <div className="mb-8 text-center">
            <h3
              id="tech-stack-heading"
              className="inline-flex items-center gap-2 font-mono text-sm font-semibold tracking-wider text-[#0082c4] uppercase"
            >
              <span
                className="h-px w-8 bg-linear-to-r from-transparent to-[#0082c4]"
                aria-hidden="true"
              />
              Technology Arsenal
              <span
                className="h-px w-8 bg-linear-to-l from-transparent to-[#0082c4]"
                aria-hidden="true"
              />
            </h3>
          </div>

          <div className="relative">
            {/* linear Fades */}
            <div
              className="pointer-events-none absolute top-0 left-0 z-20 h-full w-24 bg-linear-to-r from-white via-white/80 to-transparent md:w-40 dark:from-black dark:via-black/80"
              aria-hidden="true"
            />
            <div
              className="pointer-events-none absolute top-0 right-0 z-20 h-full w-24 bg-linear-to-l from-white via-white/80 to-transparent md:w-40 dark:from-black dark:via-black/80"
              aria-hidden="true"
            />

            {/* Scrolling Container */}
            <div
              className="relative overflow-hidden py-4"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              role="region"
              aria-label="Scrolling technology logos"
            >
              <motion.div
                className="flex gap-6"
                animate={controls}
                style={{ minWidth: 'max-content' }}
              >
                {doubledSkills.map((skill, index) => (
                  <div
                    key={`${skill.id}-${index}`}
                    className="flex min-w-40 flex-col items-center gap-4 rounded-2xl border-2 border-slate-200 bg-[#f2f2f2] p-6 shadow-sm transition-transform duration-500 hover:scale-110 hover:border-[#0082c4] dark:border-slate-800 dark:bg-[#11141c]"
                  >
                    <Image
                      height={64}
                      width={64}
                      src={`${skill.image}&theme=${mounted && theme === 'dark' ? 'dark' : 'light'}`}
                      alt={`${skill.name} logo`}
                      className="h-16 w-16 object-contain"
                      loading="lazy"
                    />
                    <span className="text-sm font-bold text-slate-700 dark:text-slate-300">
                      {skill.name}
                    </span>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>

          <p className="mt-6 text-center text-xs text-slate-500 dark:text-slate-500">
            Hover to pause • {skillsData.length} technologies and counting
          </p>
        </section>

        {/* Skill Categories Grid */}
        <section aria-labelledby="expertise-heading">
          <div className="mb-12 text-center">
            <h3
              id="expertise-heading"
              className="mb-3 inline-flex items-center gap-2 font-mono text-sm font-semibold tracking-wider text-[#0082c4] uppercase"
            >
              <span
                className="h-px w-8 bg-linear-to-r from-transparent to-[#0082c4]"
                aria-hidden="true"
              />
              Expertise Breakdown
              <span
                className="h-px w-8 bg-linear-to-l from-transparent to-[#0082c4]"
                aria-hidden="true"
              />
            </h3>
            <p className="mt-4 text-slate-600 dark:text-slate-400">
              Deep dive into my technical proficiencies across the full stack
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {skillCategories.map((category, categoryIndex) => {
              const Icon = category.icon;
              return (
                <article
                  key={category.title}
                  className="group relative overflow-hidden rounded-2xl border-2 border-slate-200 bg-[#f2f2f2] p-8 shadow-sm transition-all duration-500 hover:-translate-y-3 hover:border-[#0082c4] hover:shadow-2xl hover:shadow-[#0082c4]/20 dark:border-slate-800 dark:bg-[#11141c] dark:hover:shadow-[#0082c4]/30"
                >
                  {/* Animated Background */}
                  <div
                    className="absolute inset-0 bg-linear-to-br from-[#0082c4]/0 via-[#0082c4]/0 to-[#0082c4]/0 opacity-0 transition-all duration-500 group-hover:from-[#0082c4]/5 group-hover:via-[#0082c4]/10 group-hover:to-[#0082c4]/5 group-hover:opacity-100"
                    aria-hidden="true"
                  />

                  {/* Header */}
                  <header className="relative z-10 mb-8">
                    <div className="mb-3 inline-block rounded-lg bg-[#0082c4]/10 px-3 py-1">
                      <span className="font-mono text-xs font-medium text-[#0082c4]">
                        {category.codeComment}
                      </span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-linear-to-br from-[#0082c4] to-[#0099e6] shadow-lg shadow-[#0082c4]/30 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-12">
                        <Icon
                          className="h-7 w-7 text-white"
                          aria-hidden="true"
                        />
                      </div>
                      <h3 className="text-xl font-bold text-[#0082c4] md:text-2xl">
                        {category.title}
                      </h3>
                    </div>
                  </header>

                  {/* Skills List */}
                  <ul className="relative z-10 space-y-5">
                    {category.skills.map((skill, skillIndex) => (
                      <li key={skill.name} className="group/skill">
                        <div className="mb-2 flex items-center justify-between">
                          <span className="font-mono text-sm font-medium text-slate-700 transition-colors duration-300 group-hover/skill:text-[#0082c4] dark:text-slate-300 dark:group-hover/skill:text-[#0082c4]">
                            {skill.name}
                          </span>
                          <span className="rounded-full bg-[#0082c4]/10 px-3 py-1 font-mono text-xs font-bold text-[#0082c4]">
                            {skill.level}%
                          </span>
                        </div>
                        <div
                          role="progressbar"
                          aria-valuenow={skill.level}
                          aria-valuemin={0}
                          aria-valuemax={100}
                          aria-label={`${skill.name} proficiency: ${skill.level}%`}
                          className="relative h-3 overflow-hidden rounded-full bg-slate-200 shadow-inner dark:bg-slate-900"
                        >
                          <div
                            className="absolute inset-y-0 left-0 rounded-full bg-linear-to-r from-[#0082c4] via-[#0099e6] to-[#0082c4] shadow-lg shadow-[#0082c4]/50 transition-all duration-1000 ease-out"
                            style={{
                              width: `${skill.level}%`,
                              transitionDelay: `${categoryIndex * 100 + skillIndex * 80}ms`,
                            }}
                          >
                            <div className="absolute inset-0 animate-[shimmer_2s_infinite] bg-linear-to-r from-transparent via-white/30 to-transparent" />
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>

                  <div
                    className="absolute -top-8 -right-8 h-32 w-32 rounded-full bg-[#0082c4] opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-20"
                    aria-hidden="true"
                  />
                </article>
              );
            })}
          </div>
        </section>

        {/* Continuous Growth Banner */}
        <section
          aria-labelledby="growth-heading"
          className="mt-24 overflow-hidden rounded-3xl border-2 border-[#0082c4]/30 bg-linear-to-br from-[#f2f2f2] via-white to-[#f2f2f2] p-10 shadow-2xl md:p-12 dark:border-[#0082c4]/40 dark:from-[#11141c] dark:via-black dark:to-[#11141c]"
        >
          <div className="relative">
            <div
              className="absolute -top-20 -right-20 h-40 w-40 rounded-full bg-[#0082c4] opacity-10 blur-3xl"
              aria-hidden="true"
            />
            <div
              className="absolute -bottom-20 -left-20 h-40 w-40 rounded-full bg-[#0099e6] opacity-10 blur-3xl"
              aria-hidden="true"
            />

            <div className="relative z-10 text-center">
              <div className="mb-6 flex items-center justify-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-linear-to-br from-[#0082c4] to-[#0099e6] shadow-lg shadow-[#0082c4]/40">
                  <GitBranch
                    className="h-6 w-6 text-white"
                    aria-hidden="true"
                  />
                </div>
                <h3
                  id="growth-heading"
                  className="bg-linear-to-r from-[#0082c4] to-[#0099e6] bg-clip-text text-3xl font-bold text-transparent md:text-4xl"
                >
                  Continuous Growth
                </h3>
              </div>

              <p className="mx-auto max-w-3xl text-base leading-relaxed text-slate-700 md:text-lg dark:text-slate-300">
                Technology evolves rapidly, and so do I. I'm constantly
                exploring new frameworks, tools, and best practices to stay at
                the cutting edge of web development. Currently diving deeper
                into{' '}
                <span className="font-bold text-[#0082c4]">
                  advanced TypeScript patterns
                </span>
                ,{' '}
                <span className="font-bold text-[#0082c4]">
                  serverless architectures
                </span>
                , and{' '}
                <span className="font-bold text-[#0082c4]">
                  performance optimization
                </span>
                .
              </p>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                <span className="inline-flex items-center gap-2 rounded-full border border-[#0082c4]/30 bg-[#0082c4]/10 px-4 py-2 text-sm font-semibold text-[#0082c4]">
                  <span
                    className="h-2 w-2 animate-pulse rounded-full bg-[#0082c4]"
                    aria-hidden="true"
                  />
                  Always Learning
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-[#0082c4]/30 bg-[#0082c4]/10 px-4 py-2 text-sm font-semibold text-[#0082c4]">
                  <span
                    className="h-2 w-2 animate-pulse rounded-full bg-[#0082c4]"
                    aria-hidden="true"
                  />
                  Always Building
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Closing Tag */}
        <div className="mt-20 text-center">
          <span
            className="inline-block rounded-lg border border-[#0082c4]/20 bg-[#0082c4]/5 px-4 py-2 font-mono text-sm font-medium text-[#0082c4]"
            aria-label="End of skills section"
          >
            {'</Skills>'}
          </span>
        </div>
      </div>
    </section>
  );
};

export default Skills;
