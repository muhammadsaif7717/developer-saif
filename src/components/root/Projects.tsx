'use client';

import { useState } from 'react';
import { ExternalLink, Github, Filter } from 'lucide-react';
import Image from 'next/image';

const categories = ['All', 'Web Apps', 'UI/UX', 'Open Source'];

const projects = [
  {
    id: 1,
    title: 'E-Commerce Platform',
    description:
      'Full-stack e-commerce solution with real-time inventory management and secure payment processing.',
    image:
      'https://images.unsplash.com/photo-1661956602116-aa6865609028?w=800&q=80',
    category: 'Web Apps',
    tags: ['Next.js', 'MongoDB', 'Stripe', 'Tailwind'],
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com',
    featured: true,
  },
  {
    id: 2,
    title: 'Dashboard Analytics',
    description:
      'Modern analytics dashboard with real-time data visualization and interactive charts.',
    image:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
    category: 'Web Apps',
    tags: ['React', 'TypeScript', 'D3.js', 'Node.js'],
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com',
    featured: false,
  },
  {
    id: 3,
    title: 'Design System Library',
    description:
      'Comprehensive component library with accessibility-first approach and dark mode support.',
    image:
      'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&q=80',
    category: 'UI/UX',
    tags: ['React', 'Tailwind', 'Storybook', 'TypeScript'],
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com',
    featured: false,
  },
  {
    id: 4,
    title: 'Task Management App',
    description:
      'Collaborative task management tool with real-time updates and team collaboration features.',
    image:
      'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80',
    category: 'Web Apps',
    tags: ['Next.js', 'Firebase', 'Framer Motion'],
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com',
    featured: false,
  },
  {
    id: 5,
    title: 'Weather Dashboard',
    description:
      'Beautiful weather application with location-based forecasts and interactive maps.',
    image:
      'https://images.unsplash.com/photo-1592210454359-9043f067919b?w=800&q=80',
    category: 'Open Source',
    tags: ['React', 'OpenWeather API', 'Mapbox'],
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com',
    featured: false,
  },
  {
    id: 6,
    title: 'Portfolio Template',
    description:
      'Modern portfolio template for developers with customizable themes and animations.',
    image:
      'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&q=80',
    category: 'Open Source',
    tags: ['Next.js', 'Tailwind', 'MDX'],
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com',
    featured: false,
  },
];

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredProjects =
    activeCategory === 'All'
      ? projects
      : projects.filter((project) => project.category === activeCategory);

  const featuredProject = projects.find((p) => p.featured);
  const regularProjects = filteredProjects.filter((p) => !p.featured);

  return (
    <section
      id="projects"
      className="relative overflow-hidden bg-white py-20 md:py-28 lg:py-36 dark:bg-black"
      aria-labelledby="projects-heading"
    >
      {/* Background Elements */}
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,130,196,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,130,196,0.03)_1px,transparent_1px)] bg-[length:60px_60px] dark:bg-[linear-gradient(rgba(0,130,196,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(0,130,196,0.08)_1px,transparent_1px)]" />
        <div className="absolute top-40 -right-48 h-96 w-96 rounded-full bg-[#0082c4] opacity-10 blur-3xl" />
        <div className="absolute bottom-40 -left-48 h-96 w-96 rounded-full bg-[#0099e6] opacity-10 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="mb-16 text-center">
          <div className="mb-4 inline-block rounded-full border border-[#0082c4]/20 bg-[#0082c4]/5 px-4 py-2 backdrop-blur-sm">
            <span className="font-mono text-sm font-medium text-[#0082c4]">
              {'<Portfolio />'}
            </span>
          </div>
          <h2
            id="projects-heading"
            className="mb-6 bg-gradient-to-r from-[#0082c4] via-[#0099e6] to-[#0082c4] bg-clip-text text-5xl font-bold text-transparent md:text-6xl lg:text-7xl"
          >
            Featured Projects
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-slate-600 md:text-xl dark:text-slate-400">
            Showcasing innovative solutions built with modern technologies
          </p>
        </header>

        {/* Filter Buttons */}
        <div className="mb-12 flex flex-wrap items-center justify-center gap-3">
          <Filter className="h-5 w-5 text-[#0082c4]" aria-hidden="true" />
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`rounded-full border-2 px-6 py-2 font-medium transition-all duration-300 ${
                activeCategory === category
                  ? 'border-[#0082c4] bg-[#0082c4] text-white shadow-lg shadow-[#0082c4]/30'
                  : 'border-slate-300 bg-transparent text-slate-700 hover:border-[#0082c4] hover:text-[#0082c4] dark:border-slate-700 dark:text-slate-300 dark:hover:border-[#0082c4]'
              } `}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Featured Project */}
        {featuredProject && activeCategory === 'All' && (
          <div className="mb-16">
            <div className="mb-6 flex items-center gap-2">
              <span
                className="h-px w-12 bg-gradient-to-r from-transparent to-[#0082c4]"
                aria-hidden="true"
              />
              <h3 className="font-mono text-sm font-semibold tracking-wider text-[#0082c4] uppercase">
                Spotlight Project
              </h3>
            </div>

            <article className="group relative overflow-hidden rounded-3xl border-2 border-slate-200 bg-[#f2f2f2] shadow-xl transition-all duration-500 hover:border-[#0082c4] hover:shadow-2xl hover:shadow-[#0082c4]/20 dark:border-slate-800 dark:bg-[#11141c]">
              <div className="grid gap-8 md:grid-cols-2">
                {/* Image */}
                <div className="relative h-64 overflow-hidden md:h-full">
                  <div className="absolute inset-0 z-10 bg-gradient-to-r from-[#0082c4]/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <Image
                    src={featuredProject.image}
                    alt={featuredProject.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>

                {/* Content */}
                <div className="flex flex-col justify-center p-8 md:p-12">
                  <div className="mb-4 inline-flex items-center gap-2 self-start rounded-full border border-[#0082c4]/30 bg-[#0082c4]/10 px-3 py-1">
                    <span className="h-2 w-2 animate-pulse rounded-full bg-[#0082c4]" />
                    <span className="text-xs font-semibold tracking-wider text-[#0082c4] uppercase">
                      Featured
                    </span>
                  </div>

                  <h3 className="mb-4 text-3xl font-bold text-[#0082c4] md:text-4xl">
                    {featuredProject.title}
                  </h3>

                  <p className="mb-6 text-lg leading-relaxed text-slate-700 dark:text-slate-300">
                    {featuredProject.description}
                  </p>

                  {/* Tags */}
                  <div className="mb-6 flex flex-wrap gap-2">
                    {featuredProject.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-lg border border-[#0082c4]/30 bg-[#0082c4]/10 px-3 py-1 text-sm font-medium text-[#0082c4]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-4">
                    <a
                      href={featuredProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-xl bg-[#0082c4] px-6 py-3 font-semibold text-white shadow-lg shadow-[#0082c4]/30 transition-all duration-300 hover:scale-105 hover:bg-[#0099e6] hover:shadow-xl hover:shadow-[#0082c4]/40"
                    >
                      <ExternalLink className="h-5 w-5" />
                      Live Demo
                    </a>
                    <a
                      href={featuredProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-xl border-2 border-[#0082c4] bg-transparent px-6 py-3 font-semibold text-[#0082c4] transition-all duration-300 hover:bg-[#0082c4] hover:text-white"
                    >
                      <Github className="h-5 w-5" />
                      View Code
                    </a>
                  </div>
                </div>
              </div>
            </article>
          </div>
        )}

        {/* Regular Projects Grid */}
        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {regularProjects.map((project, index) => (
            <article
              key={project.id}
              className="group relative flex flex-col overflow-hidden rounded-2xl border-2 border-slate-200 bg-[#f2f2f2] shadow-lg transition-all duration-500 hover:-translate-y-2 hover:border-[#0082c4] hover:shadow-2xl hover:shadow-[#0082c4]/20 dark:border-slate-800 dark:bg-[#11141c]"
              style={{
                animationDelay: `${index * 100}ms`,
              }}
            >
              {/* Image Container */}
              <div className="relative h-56 overflow-hidden">
                <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#0082c4]/40 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Hover Overlay with Buttons */}
                <div className="absolute inset-0 z-20 flex items-center justify-center gap-4 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-12 w-12 items-center justify-center rounded-full bg-[#0082c4] text-white shadow-lg shadow-[#0082c4]/50 transition-transform duration-300 hover:scale-110"
                    aria-label="View live demo"
                  >
                    <ExternalLink className="h-5 w-5" />
                  </a>
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#0082c4] shadow-lg transition-transform duration-300 hover:scale-110 dark:bg-slate-900"
                    aria-label="View source code"
                  >
                    <Github className="h-5 w-5" />
                  </a>
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col p-6">
                {/* Category Badge */}
                <span className="mb-3 inline-flex w-fit items-center gap-1 rounded-full bg-[#0082c4]/10 px-3 py-1 text-xs font-semibold tracking-wider text-[#0082c4] uppercase">
                  {project.category}
                </span>

                <h3 className="mb-3 text-xl font-bold text-slate-800 transition-colors duration-300 group-hover:text-[#0082c4] dark:text-slate-100 dark:group-hover:text-[#0082c4]">
                  {project.title}
                </h3>

                <p className="mb-4 flex-1 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md border border-slate-300 bg-white px-2 py-1 text-xs font-medium text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Accent Line */}
              <div className="h-1 w-0 bg-gradient-to-r from-[#0082c4] to-[#0099e6] transition-all duration-500 group-hover:w-full" />
            </article>
          ))}
        </div>

        {/* View More Section */}
        <div className="mt-16 text-center">
          <p className="mb-6 text-slate-600 dark:text-slate-400">
            Want to see more of my work?
          </p>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border-2 border-[#0082c4] bg-transparent px-8 py-4 font-semibold text-[#0082c4] transition-all duration-300 hover:bg-[#0082c4] hover:text-white hover:shadow-lg hover:shadow-[#0082c4]/30"
          >
            <Github className="h-5 w-5" />
            View All Projects on GitHub
          </a>
        </div>

        {/* Closing Tag */}
        <div className="mt-20 text-center">
          <span className="inline-block rounded-lg border border-[#0082c4]/20 bg-[#0082c4]/5 px-4 py-2 font-mono text-sm font-medium text-[#0082c4]">
            {'</Portfolio>'}
          </span>
        </div>
      </div>
    </section>
  );
};

export default Projects;
