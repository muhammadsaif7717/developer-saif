'use client';

import { useState } from 'react';
import {
  ExternalLink,
  Github,
  Filter,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import Image from 'next/image';
import { getProjects } from '@/lib/getApi';
import { useQuery } from '@tanstack/react-query';
import LoadingPage from '../shared/LoadingPage';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const categories = [
  'All',
  'Web Apps',
  'UI/UX',
  'Open Source',
  'Mobile Apps',
  'API',
  'Desktop Apps',
];

interface Project {
  _id?: string;
  title: string;
  slug: string;
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
  priority: number;
}

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 3;
  const router = useRouter();

  const { data: projects = [], isLoading } = useQuery<Project[]>({
    queryKey: ['projects'],
    queryFn: () => getProjects(),
    staleTime: 5 * 60 * 1000,
  });

  const sortedProjects = [...projects].sort(
    (a, b) => (b.priority || 0) - (a.priority || 0),
  );

  const filteredProjects =
    activeCategory === 'All'
      ? sortedProjects
      : sortedProjects.filter((p) => p.category === activeCategory);

  const featuredProject = filteredProjects.find((p) => p.featured);
  const regularProjects = filteredProjects.filter((p) => !p.featured);

  const totalPages = Math.ceil(regularProjects.length / ITEMS_PER_PAGE);
  const currentRegularProjects = regularProjects.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  return (
    <section
      id="projects"
      className="relative overflow-hidden bg-white py-5 dark:bg-black"
      aria-labelledby="projects-heading"
    >
      {isLoading ? (
        <LoadingPage />
      ) : (
        <>
          {/* Background Elements */}
          <div
            className="pointer-events-none absolute inset-0 overflow-hidden"
            aria-hidden="true"
          >
            <div className="absolute inset-0 bg-[linear-gradient(rgba(0,130,196,0.3)_1px,transparent_1px),linear-gradient(90deg,rgba(0,130,196,0.3)_1px,transparent_1px)] bg-size-[50px_50px] opacity-[0.03] dark:opacity-[0.08]" />
            <div className="absolute top-1/4 right-1/4 h-96 w-96 animate-pulse rounded-full bg-[#0082c4] opacity-20 blur-[120px] dark:opacity-10" />
            <div className="absolute bottom-1/4 left-1/4 h-96 w-96 animate-pulse rounded-full bg-[#0099e6] opacity-20 blur-[120px] [animation-delay:1s] dark:opacity-10" />
          </div>

          <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <header className="mb-12 text-center md:mb-16">
              <h2
                id="projects-heading"
                className="mb-4 text-4xl font-bold md:text-5xl lg:text-6xl"
              >
                <span className="text-[#0082c4]">Featured </span>
                <span className="text-slate-800 dark:text-white">Projects</span>
              </h2>
              <p className="mx-auto max-w-2xl text-base text-[#64748b] md:text-lg dark:text-[#cbd5e1]">
                Showcasing innovative solutions built with modern technologies
              </p>
            </header>

            {/* Filter Buttons */}
            <div className="mb-12 flex flex-wrap items-center justify-center gap-3">
              <Filter className="h-5 w-5 text-[#0082c4]" aria-hidden="true" />
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => {
                    setActiveCategory(category);
                    setCurrentPage(1);
                  }}
                  className={`rounded-full border-2 px-6 py-2 font-medium transition-all duration-300 ${
                    activeCategory === category
                      ? 'border-[#0082c4] bg-[#0082c4] text-white shadow-lg shadow-[#0082c4]/30'
                      : 'border-[#e2e8f0] bg-transparent text-[#334155] hover:border-[#0082c4] hover:text-[#0082c4] dark:border-[#27273a] dark:text-[#cbd5e1] dark:hover:border-[#0082c4]'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* ── Featured Project ───────────────────────────────────── */}
            {featuredProject && (
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

                <article className="group relative overflow-hidden rounded-2xl border-2 border-[#e2e8f0] bg-[#f2f2f2] shadow-xl transition-all duration-500 hover:border-[#0082c4] hover:shadow-2xl hover:shadow-[#0082c4]/20 dark:border-[#27273a] dark:bg-[#11141c]">
                  <div
                    role="button"
                    tabIndex={0}
                    onClick={() =>
                      router.push(`/projects/${featuredProject._id}`)
                    }
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        router.push(`/projects/${featuredProject._id}`);
                      }
                    }}
                    className="cursor-pointer focus:ring-2 focus:ring-[#0082c4] focus:ring-offset-2 focus:ring-offset-white focus:outline-none dark:focus:ring-offset-black"
                  >
                    {/*
                  Layout:
                  • Mobile  → image on top (full-width, aspect-[735/401]), content below
                  • Desktop → image left (50%), content right (50%), rows match via grid
                */}
                    <div className="grid md:grid-cols-2">
                      {/* ── Image panel ── */}
                      {/*
                    On mobile  : aspect-[735/401] keeps the natural ratio → no crop
                    On desktop : h-full stretches to match the content column height.
                                 min-h-96 prevents collapse when content is short.
                  */}
                      <div className="relative aspect-[735/401] overflow-hidden md:aspect-auto md:h-full md:min-h-96">
                        {/* Hover tint */}
                        <div className="absolute inset-0 z-10 bg-gradient-to-r from-[#0082c4]/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                        <Image
                          src={featuredProject.image[0] || '/placeholder.jpg'}
                          alt={featuredProject.title}
                          fill
                          /*
                        object-top: keeps the top of the image visible when the
                        desktop panel is taller than the natural 735/401 ratio.
                        Change to object-center if your screenshots are centered.
                      */
                          className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, 50vw"
                          priority
                        />

                        {featuredProject.currentlyWorking && (
                          <div className="absolute top-4 right-4 z-20 inline-flex items-center gap-2 rounded-full border border-green-500/30 bg-green-500/10 px-3 py-1 backdrop-blur-sm">
                            <span className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
                            <span className="text-xs font-semibold text-green-500">
                              In Progress
                            </span>
                          </div>
                        )}
                      </div>

                      {/* ── Content panel ── */}
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

                        <p className="mb-6 text-lg leading-relaxed text-[#334155] dark:text-[#cbd5e1]">
                          {featuredProject.description}
                        </p>

                        <div className="mb-4 flex flex-wrap gap-4 text-sm text-[#64748b] dark:text-[#cbd5e1]">
                          <span className="font-mono">
                            <span className="text-[#0082c4]">Role:</span>{' '}
                            {featuredProject.role}
                          </span>
                          <span className="font-mono">
                            <span className="text-[#0082c4]">Date:</span>{' '}
                            {featuredProject.date}
                          </span>
                          <span className="rounded-full bg-purple-500/10 px-3 py-1 text-xs font-semibold text-purple-600 capitalize dark:text-purple-400">
                            {featuredProject.type.replace('-', ' ')}
                          </span>
                        </div>

                        <div className="mb-6 flex flex-wrap gap-2">
                          {featuredProject.technologies.map((tech, idx) => (
                            <span
                              key={`${tech}-${idx}`}
                              className="rounded-xl border border-[#0082c4]/30 bg-[#0082c4]/10 px-3 py-1 text-sm font-medium text-[#0082c4]"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>

                        <div className="flex flex-wrap gap-4">
                          {featuredProject.liveUrl && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                window.open(
                                  featuredProject.liveUrl,
                                  '_blank',
                                  'noopener,noreferrer',
                                );
                              }}
                              className="inline-flex items-center gap-2 rounded-xl bg-[#0082c4] px-6 py-3 font-semibold text-white shadow-lg shadow-[#0082c4]/30 transition-all duration-300 hover:scale-105 hover:bg-[#0099e6] hover:shadow-xl hover:shadow-[#0082c4]/40"
                            >
                              <ExternalLink className="h-5 w-5" />
                              Live Demo
                            </button>
                          )}
                          {featuredProject.githubUrl && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                window.open(
                                  featuredProject.githubUrl,
                                  '_blank',
                                  'noopener,noreferrer',
                                );
                              }}
                              className="inline-flex items-center gap-2 rounded-xl border-2 border-[#0082c4] bg-transparent px-6 py-3 font-semibold text-[#0082c4] transition-all duration-300 hover:bg-[#0082c4] hover:text-white"
                            >
                              <Github className="h-5 w-5" />
                              View Code
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              </div>
            )}

            {/* ── Regular Project Cards ──────────────────────────────── */}
            <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {currentRegularProjects.map((project, index) => (
                <Link
                  href={`/projects/${project._id}`}
                  key={project._id || project.slug}
                  className="group relative flex flex-col overflow-hidden rounded-2xl border-2 border-[#e2e8f0] bg-[#f2f2f2] shadow-lg transition-all duration-500 hover:-translate-y-2 hover:border-[#0082c4] hover:shadow-2xl hover:shadow-[#0082c4]/20 dark:border-[#27273a] dark:bg-[#11141c]"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* ── Image — exact 735/401 ratio, no crop ── */}
                  <div className="relative aspect-[735/401] w-full overflow-hidden">
                    <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#0082c4]/40 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                    <Image
                      src={project.image[0] || '/placeholder.jpg'}
                      alt={project.title}
                      fill
                      className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />

                    {project.currentlyWorking && (
                      <div className="absolute top-4 right-4 z-20 inline-flex items-center gap-2 rounded-full border border-green-500/30 bg-green-500/10 px-2 py-1 backdrop-blur-sm">
                        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-500" />
                        <span className="text-xs font-semibold text-green-500">
                          Active
                        </span>
                      </div>
                    )}

                    {/* Hover action buttons */}
                    <div className="absolute inset-0 z-20 flex items-center justify-center gap-4 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                      {project.liveUrl && (
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            window.open(
                              project.liveUrl,
                              '_blank',
                              'noopener,noreferrer',
                            );
                          }}
                          className="flex h-12 w-12 items-center justify-center rounded-full bg-[#0082c4] text-white shadow-lg shadow-[#0082c4]/50 transition-transform duration-300 hover:scale-110"
                          aria-label="View live demo"
                        >
                          <ExternalLink className="h-5 w-5" />
                        </button>
                      )}
                      {project.githubUrl && (
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            window.open(
                              project.githubUrl,
                              '_blank',
                              'noopener,noreferrer',
                            );
                          }}
                          className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#0082c4] shadow-lg transition-transform duration-300 hover:scale-110 dark:bg-[#11141c]"
                          aria-label="View source code"
                        >
                          <Github className="h-5 w-5" />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex flex-1 flex-col p-6">
                    <div className="mb-3 flex flex-wrap gap-2">
                      <span className="inline-flex items-center gap-1 rounded-full bg-[#0082c4]/10 px-3 py-1 text-xs font-semibold tracking-wider text-[#0082c4] uppercase">
                        {project.category}
                      </span>
                      <span className="inline-flex items-center gap-1 rounded-full bg-purple-500/10 px-3 py-1 text-xs font-semibold text-purple-600 capitalize dark:text-purple-400">
                        {project.type.replace('-', ' ')}
                      </span>
                    </div>

                    <h3 className="mb-3 text-xl font-bold text-black transition-colors duration-300 group-hover:text-[#0082c4] dark:text-white dark:group-hover:text-[#0082c4]">
                      {project.title}
                    </h3>

                    <p className="mb-4 flex-1 text-sm leading-relaxed text-[#64748b] dark:text-[#cbd5e1]">
                      {project.description}
                    </p>

                    <div className="mb-4 text-xs text-[#64748b] dark:text-[#cbd5e1]">
                      <span className="font-mono">{project.date}</span>
                      {project.role && (
                        <>
                          <span className="mx-2">•</span>
                          <span>{project.role}</span>
                        </>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {project.technologies.slice(0, 4).map((tech, idx) => (
                        <span
                          key={`${tech}-${idx}`}
                          className="rounded-xl border border-[#e2e8f0] bg-white px-2 py-1 text-xs font-medium text-black dark:border-[#27273a] dark:bg-black dark:text-white"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 4 && (
                        <span className="rounded-xl border border-[#e2e8f0] bg-white px-2 py-1 text-xs font-medium text-black dark:border-[#27273a] dark:bg-black dark:text-white">
                          +{project.technologies.length - 4}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Bottom accent bar */}
                  <div className="h-1 w-0 bg-gradient-to-r from-[#0082c4] to-[#0099e6] transition-all duration-500 group-hover:w-full" />
                </Link>
              ))}
            </div>

            {/* ── Pagination ─────────────────────────────────────────── */}
            {totalPages > 1 && (
              <div className="mt-12 flex items-center justify-center gap-2">
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border-2 border-[#e2e8f0] bg-white text-[#334155] transition-all hover:border-[#0082c4] hover:text-[#0082c4] disabled:cursor-not-allowed disabled:opacity-50 dark:border-[#27273a] dark:bg-[#11141c] dark:text-[#cbd5e1]"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>

                {Array.from({ length: totalPages }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`flex h-10 w-10 items-center justify-center rounded-xl font-bold transition-all ${
                      currentPage === i + 1
                        ? 'bg-[#0082c4] text-white shadow-lg shadow-[#0082c4]/30'
                        : 'border-2 border-[#e2e8f0] bg-white text-[#334155] hover:border-[#0082c4] hover:text-[#0082c4] dark:border-[#27273a] dark:bg-[#11141c] dark:text-[#cbd5e1]'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}

                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border-2 border-[#e2e8f0] bg-white text-[#334155] transition-all hover:border-[#0082c4] hover:text-[#0082c4] disabled:cursor-not-allowed disabled:opacity-50 dark:border-[#27273a] dark:bg-[#11141c] dark:text-[#cbd5e1]"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            )}

            {/* Empty State */}
            {filteredProjects.length === 0 && (
              <div className="py-20 text-center">
                <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-[#0082c4]/10">
                  <Filter className="h-12 w-12 text-[#0082c4]" />
                </div>
                <h3 className="mb-2 text-2xl font-bold text-black dark:text-white">
                  No Projects Found
                </h3>
                <p className="text-[#64748b] dark:text-[#cbd5e1]">
                  No projects match the selected category. Try a different
                  filter.
                </p>
              </div>
            )}

            {/* View More */}
            <div className="mt-10 text-center">
              <p className="mb-6 text-[#64748b] dark:text-[#cbd5e1]">
                Want to see more of my work?
              </p>
              <Link
                href="https://github.com/muhammadsaif7717"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border-2 border-[#0082c4] bg-transparent px-4 py-2.5 text-sm font-semibold text-[#0082c4] transition-all duration-300 hover:bg-[#0082c4] hover:text-white hover:shadow-lg hover:shadow-[#0082c4]/30 sm:px-5 sm:py-3 sm:text-base md:px-6"
              >
                <Github className="h-4 w-4 sm:h-5 sm:w-5" />
                View All Projects on GitHub
              </Link>
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default Projects;
