'use client';

import {
  Code2,
  Database,
  Wrench,
  Cloud,
  Palette,
  Server,
  ChevronRight,
  Sparkles,
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
    description: 'Building responsive, interactive user experiences',
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
    description: 'Scalable server architecture and API design',
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
    description: 'Efficient data modeling and management',
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
    description: 'Modern development workflow optimization',
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
    description: 'Crafting beautiful, accessible interfaces',
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
    description: 'Seamless deployment and infrastructure',
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
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

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
      className="lg:pb∆-36 relative overflow-hidden bg-white pb-20 md:pb-28 dark:bg-black"
      aria-labelledby="skills-heading"
    >
      {/* Animated Background */}
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,130,196,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,130,196,0.05)_1px,transparent_1px)] bg-[size:60px_60px] dark:bg-[linear-gradient(rgba(0,130,196,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,130,196,0.1)_1px,transparent_1px)]" />
        <div className="absolute top-20 -left-40 h-96 w-96 rounded-full bg-[#0082c4] opacity-10 blur-3xl" />
        <div className="absolute top-1/3 -right-40 h-96 w-96 rounded-full bg-[#0099e6] opacity-10 blur-3xl" />
        <div className="absolute bottom-20 left-1/3 h-96 w-96 rounded-full bg-[#0082c4] opacity-10 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <header className="mb-20 text-center">
          <h2
            id="skills-heading"
            className="mb-6 bg-gradient-to-r from-[#0082c4] via-[#0099e6] to-[#0082c4] bg-clip-text text-5xl font-bold text-transparent md:text-6xl lg:text-7xl"
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
                className="h-px w-8 bg-gradient-to-r from-transparent to-[#0082c4]"
                aria-hidden="true"
              />
              Technology Arsenal
              <span
                className="h-px w-8 bg-gradient-to-l from-transparent to-[#0082c4]"
                aria-hidden="true"
              />
            </h3>
          </div>

          <div className="relative">
            <div
              className="pointer-events-none absolute top-0 left-0 z-20 h-full w-24 bg-gradient-to-r from-white via-white/80 to-transparent md:w-40 dark:from-black dark:via-black/80"
              aria-hidden="true"
            />
            <div
              className="pointer-events-none absolute top-0 right-0 z-20 h-full w-24 bg-gradient-to-l from-white via-white/80 to-transparent md:w-40 dark:from-black dark:via-black/80"
              aria-hidden="true"
            />

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
                    className="flex min-w-40 flex-col items-center gap-4 rounded-2xl border-2 border-slate-200 bg-[#f2f2f2] p-6 shadow-sm transition-all duration-300 hover:scale-110 hover:border-[#0082c4] hover:shadow-[0_0_20px_rgba(0,130,196,0.3)] dark:border-slate-800 dark:bg-[#11141c]"
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

        {/* Skill Categories Grid - IMPROVED */}
        <section aria-labelledby="expertise-heading">
          <div className="mb-12 text-center">
            <h3
              id="expertise-heading"
              className="mb-3 inline-flex items-center gap-2 font-mono text-sm font-semibold tracking-wider text-[#0082c4] uppercase"
            >
              <span
                className="h-px w-8 bg-gradient-to-r from-transparent to-[#0082c4]"
                aria-hidden="true"
              />
              Expertise Breakdown
              <span
                className="h-px w-8 bg-gradient-to-l from-transparent to-[#0082c4]"
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
              const isExpanded = selectedCategory === categoryIndex;

              return (
                <motion.article
                  key={category.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: categoryIndex * 0.1 }}
                  className="group relative overflow-hidden rounded-2xl border-2 border-slate-200 bg-[#f2f2f2] shadow-sm transition-all duration-500 hover:shadow-2xl hover:shadow-[#0082c4]/20 dark:border-slate-800 dark:bg-[#11141c] dark:hover:shadow-[#0082c4]/30"
                  onMouseEnter={() => setSelectedCategory(categoryIndex)}
                  onMouseLeave={() => setSelectedCategory(null)}
                >
                  {/* Animated Gradient Background */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br from-[#0082c4]/0 via-[#0082c4]/0 to-[#0082c4]/0 opacity-0 transition-all duration-700 ${
                      isExpanded
                        ? 'from-[#0082c4]/10 via-[#0099e6]/5 to-[#0082c4]/10 opacity-100'
                        : ''
                    }`}
                    aria-hidden="true"
                  />

                  {/* Animated Border Glow */}
                  <div
                    className={`absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 ${
                      isExpanded ? 'opacity-100' : ''
                    }`}
                    style={{
                      background:
                        'linear-gradient(90deg, #0082c4, #0099e6, #0082c4)',
                      padding: '2px',
                      WebkitMask:
                        'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                      WebkitMaskComposite: 'xor',
                      maskComposite: 'exclude',
                    }}
                    aria-hidden="true"
                  />

                  <div className="relative z-10 p-8">
                    {/* Header */}
                    <header className="mb-6">
                      <div className="mb-3 flex items-center justify-between">
                        <span className="inline-block rounded-lg bg-[#0082c4]/10 px-3 py-1 font-mono text-xs font-medium text-[#0082c4]">
                          {category.codeComment}
                        </span>
                        <motion.div
                          animate={{ rotate: isExpanded ? 90 : 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <ChevronRight className="h-5 w-5 text-[#0082c4]" />
                        </motion.div>
                      </div>

                      <div className="flex items-start gap-4">
                        <motion.div
                          className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#0082c4] to-[#0099e6] shadow-lg shadow-[#0082c4]/30"
                          whileHover={{ scale: 1.1, rotate: 12 }}
                          transition={{
                            type: 'spring',
                            stiffness: 400,
                            damping: 10,
                          }}
                        >
                          <Icon
                            className="h-7 w-7 text-white"
                            aria-hidden="true"
                          />
                        </motion.div>

                        <div className="flex-1">
                          <h3 className="mb-2 text-xl font-bold text-[#0082c4] md:text-2xl">
                            {category.title}
                          </h3>
                          <p className="text-sm text-slate-600 dark:text-slate-400">
                            {category.description}
                          </p>
                        </div>
                      </div>
                    </header>

                    {/* Skills List with Enhanced Animations */}
                    <motion.ul
                      className="space-y-4"
                      initial={false}
                      animate={{ height: isExpanded ? 'auto' : 'auto' }}
                    >
                      {category.skills.map((skill, skillIndex) => {
                        const isHovered =
                          hoveredSkill === `${categoryIndex}-${skillIndex}`;

                        return (
                          <motion.li
                            key={skill.name}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: skillIndex * 0.05 }}
                            onMouseEnter={() =>
                              setHoveredSkill(`${categoryIndex}-${skillIndex}`)
                            }
                            onMouseLeave={() => setHoveredSkill(null)}
                            className="group/skill"
                          >
                            <div className="mb-2 flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                {isHovered && (
                                  <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{
                                      type: 'spring',
                                      stiffness: 500,
                                    }}
                                  >
                                    <Sparkles className="h-3 w-3 text-[#0082c4]" />
                                  </motion.div>
                                )}
                                <span className="font-mono text-sm font-medium text-slate-700 transition-colors duration-300 group-hover/skill:text-[#0082c4] dark:text-slate-300 dark:group-hover/skill:text-[#0082c4]">
                                  {skill.name}
                                </span>
                              </div>
                              <motion.span
                                className="rounded-full bg-[#0082c4]/10 px-3 py-1 font-mono text-xs font-bold text-[#0082c4]"
                                whileHover={{ scale: 1.1 }}
                              >
                                {skill.level}%
                              </motion.span>
                            </div>

                            {/* Enhanced Progress Bar */}
                            <div
                              role="progressbar"
                              aria-valuenow={skill.level}
                              aria-valuemin={0}
                              aria-valuemax={100}
                              aria-label={`${skill.name} proficiency: ${skill.level}%`}
                              className="relative h-2.5 overflow-hidden rounded-full bg-slate-200 shadow-inner dark:bg-slate-900"
                            >
                              <motion.div
                                initial={{ width: 0 }}
                                whileInView={{ width: `${skill.level}%` }}
                                viewport={{ once: true }}
                                transition={{
                                  duration: 1,
                                  delay:
                                    categoryIndex * 0.1 + skillIndex * 0.05,
                                  ease: 'easeOut',
                                }}
                                className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-[#0082c4] via-[#0099e6] to-[#0082c4] shadow-lg shadow-[#0082c4]/50"
                              >
                                {/* Shimmer Effect */}
                                <motion.div
                                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                                  animate={{
                                    x: ['-100%', '200%'],
                                  }}
                                  transition={{
                                    repeat: Infinity,
                                    duration: 2,
                                    ease: 'linear',
                                    delay: categoryIndex * 0.2,
                                  }}
                                />
                              </motion.div>

                              {/* Pulse Effect on Hover */}
                              {isHovered && (
                                <motion.div
                                  className="absolute inset-0 rounded-full bg-[#0082c4]/30"
                                  initial={{ scale: 0, opacity: 0 }}
                                  animate={{ scale: 1.5, opacity: 0 }}
                                  transition={{
                                    duration: 0.6,
                                    repeat: Infinity,
                                  }}
                                />
                              )}
                            </div>
                          </motion.li>
                        );
                      })}
                    </motion.ul>
                  </div>

                  {/* Floating Glow Effect */}
                  <motion.div
                    className="absolute -top-8 -right-8 h-32 w-32 rounded-full bg-[#0082c4] opacity-0 blur-3xl"
                    animate={{
                      opacity: isExpanded ? 0.2 : 0,
                    }}
                    transition={{ duration: 0.5 }}
                    aria-hidden="true"
                  />
                </motion.article>
              );
            })}
          </div>
        </section>
      </div>
    </section>
  );
};

export default Skills;
