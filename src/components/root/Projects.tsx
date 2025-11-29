'use client';

import { useState } from 'react';
import { ExternalLink, Github, Filter } from 'lucide-react';
import Image from 'next/image';
import { getProjects } from '@/lib/getApi';
import { useQuery } from '@tanstack/react-query';
import LoadingPage from '../shared/LoadingPage';
import Link from 'next/link';

const categories = ['All', 'Web Apps', 'UI/UX', 'Open Source'];

interface Project {
  _id: string;
  name: string;
  slug: string;
  title: string;
  description: string;
  image: string[];
  category: string;
  type: 'personal' | 'client' | 'open-source' | 'freelance';
  date: string;
  role: string;
  technologies: string[];
  features: string[];
  liveUrl: string;
  githubUrl: string;
  featured: boolean;
  currentlyWorking: boolean;
}

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState('All');

  // TanStack Query
  const { data: projects = [], isLoading } = useQuery<Project[]>({
    queryKey: ['projects'],
    queryFn: () => getProjects(),
    staleTime: 5 * 60 * 1000,
  });

  if (isLoading) {
    return <LoadingPage />;
  }

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
              <Link href={`/projects/${featuredProject._id}`}>
                <div className="grid gap-8 md:grid-cols-2">
                  {/* Image */}
                  <div className="relative h-64 overflow-hidden md:h-full">
                    <div className="absolute inset-0 z-10 bg-gradient-to-r from-[#0082c4]/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                    <Image
                      src={featuredProject.image[0] || '/placeholder.jpg'}
                      alt={featuredProject.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />

                    {/* Currently Working Badge */}
                    {featuredProject.currentlyWorking && (
                      <div className="absolute top-4 right-4 z-20 inline-flex items-center gap-2 rounded-full border border-green-500/30 bg-green-500/10 px-3 py-1 backdrop-blur-sm">
                        <span className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
                        <span className="text-xs font-semibold text-green-500">
                          In Progress
                        </span>
                      </div>
                    )}
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

                    {/* Role & Date */}
                    <div className="mb-4 flex flex-wrap gap-4 text-sm text-slate-600 dark:text-slate-400">
                      <span className="font-mono">
                        <span className="text-[#0082c4]">Role:</span>{' '}
                        {featuredProject.role}
                      </span>
                      <span className="font-mono">
                        <span className="text-[#0082c4]">Date:</span>{' '}
                        {featuredProject.date}
                      </span>
                    </div>

                    {/* Technologies */}
                    <div className="mb-6 flex flex-wrap gap-2">
                      {featuredProject.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-lg border border-[#0082c4]/30 bg-[#0082c4]/10 px-3 py-1 text-sm font-medium text-[#0082c4]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-4">
                      <button
                        onClick={() =>
                          window.open(featuredProject.liveUrl, '_blank')
                        }
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-xl bg-[#0082c4] px-6 py-3 font-semibold text-white shadow-lg shadow-[#0082c4]/30 transition-all duration-300 hover:scale-105 hover:bg-[#0099e6] hover:shadow-xl hover:shadow-[#0082c4]/40"
                      >
                        <ExternalLink className="h-5 w-5" />
                        Live Demo
                      </button>
                      <button
                        onClick={() =>
                          window.open(featuredProject.githubUrl, '_blank')
                        }
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-xl border-2 border-[#0082c4] bg-transparent px-6 py-3 font-semibold text-[#0082c4] transition-all duration-300 hover:bg-[#0082c4] hover:text-white"
                      >
                        <Github className="h-5 w-5" />
                        View Code
                      </button>
                    </div>
                  </div>
                </div>
              </Link>
            </article>
          </div>
        )}

        {/* Regular Projects Grid */}
        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {regularProjects.map((project, index) => (
            <Link
              href={`/projects/${project._id}`}
              key={project._id}
              className="group relative flex flex-col overflow-hidden rounded-2xl border-2 border-slate-200 bg-[#f2f2f2] shadow-lg transition-all duration-500 hover:-translate-y-2 hover:border-[#0082c4] hover:shadow-2xl hover:shadow-[#0082c4]/20 dark:border-slate-800 dark:bg-[#11141c]"
              style={{
                animationDelay: `${index * 100}ms`,
              }}
            >
              {/* Image Container */}
              <div className="relative h-56 overflow-hidden">
                <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#0082c4]/40 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <Image
                  src={project.image[0] || '/placeholder.jpg'}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Currently Working Badge */}
                {project.currentlyWorking && (
                  <div className="absolute top-4 right-4 z-20 inline-flex items-center gap-2 rounded-full border border-green-500/30 bg-green-500/10 px-2 py-1 backdrop-blur-sm">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-500" />
                    <span className="text-[10px] font-semibold text-green-500">
                      Active
                    </span>
                  </div>
                )}

                {/* Hover Overlay with Buttons */}
                <div className="absolute inset-0 z-20 flex items-center justify-center gap-4 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  <button
                    onClick={() => window.open(project.liveUrl, '_blank')}
                    rel="noopener noreferrer"
                    className="flex h-12 w-12 items-center justify-center rounded-full bg-[#0082c4] text-white shadow-lg shadow-[#0082c4]/50 transition-transform duration-300 hover:scale-110"
                    aria-label="View live demo"
                  >
                    <ExternalLink className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => window.open(project.githubUrl, '_blank')}
                    rel="noopener noreferrer"
                    className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#0082c4] shadow-lg transition-transform duration-300 hover:scale-110 dark:bg-slate-900"
                    aria-label="View source code"
                  >
                    <Github className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col p-6">
                {/* Category & Type Badge */}
                <div className="mb-3 flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-1 rounded-full bg-[#0082c4]/10 px-3 py-1 text-xs font-semibold tracking-wider text-[#0082c4] uppercase">
                    {project.category}
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-slate-200 px-3 py-1 text-xs font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                    {project.type}
                  </span>
                </div>

                <h3 className="mb-3 text-xl font-bold text-slate-800 transition-colors duration-300 group-hover:text-[#0082c4] dark:text-slate-100 dark:group-hover:text-[#0082c4]">
                  {project.title}
                </h3>

                <p className="mb-4 flex-1 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                  {project.description}
                </p>

                {/* Date & Role */}
                <div className="mb-4 text-xs text-slate-500 dark:text-slate-500">
                  <span className="font-mono">{project.date}</span>
                  {project.role && (
                    <>
                      <span className="mx-2">•</span>
                      <span>{project.role}</span>
                    </>
                  )}
                </div>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2">
                  {project.technologies.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="rounded-md border border-slate-300 bg-white px-2 py-1 text-xs font-medium text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 4 && (
                    <span className="rounded-md border border-slate-300 bg-white px-2 py-1 text-xs font-medium text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300">
                      +{project.technologies.length - 4}
                    </span>
                  )}
                </div>
              </div>

              {/* Bottom Accent Line */}
              <div className="h-1 w-0 bg-gradient-to-r from-[#0082c4] to-[#0099e6] transition-all duration-500 group-hover:w-full" />
            </Link>
          ))}
        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="py-20 text-center">
            <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-[#0082c4]/10">
              <Filter className="h-12 w-12 text-[#0082c4]" />
            </div>
            <h3 className="mb-2 text-2xl font-bold text-slate-800 dark:text-slate-100">
              No Projects Found
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              No projects match the selected category. Try a different filter.
            </p>
          </div>
        )}

        {/* View More Section */}
        <div className="mt-16 text-center">
          <p className="mb-6 text-slate-600 dark:text-slate-400">
            Want to see more of my work?
          </p>
          <Link
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border-2 border-[#0082c4] bg-transparent px-8 py-4 font-semibold text-[#0082c4] transition-all duration-300 hover:bg-[#0082c4] hover:text-white hover:shadow-lg hover:shadow-[#0082c4]/30"
          >
            <Github className="h-5 w-5" />
            View All Projects on GitHub
          </Link>
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
