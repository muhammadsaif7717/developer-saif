'use client';

import { getProjectsById } from '@/lib/getApi';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowLeft,
  ExternalLink,
  Github,
  Calendar,
  User,
  Tag,
  CheckCircle2,
  Code2,
  Sparkles,
  Terminal,
} from 'lucide-react';
import LoadingPage from '@/components/shared/LoadingPage';
import { Project } from '@/types';

interface DetailedProjectProps {
  projectId: string;
}

export default function DetailedProject({ projectId }: DetailedProjectProps) {
  const id = projectId;

  const {
    data: project,
    isLoading: isLoadingProject,
    error,
  } = useQuery<Project>({
    queryKey: ['project', id],
    queryFn: () => getProjectsById(id),
  });

  if (isLoadingProject) return <LoadingPage />;

  if (error || !project) {
    return (
      <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-white dark:bg-black">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(0,130,196,0.3)_1px,transparent_1px),linear-gradient(90deg,rgba(0,130,196,0.3)_1px,transparent_1px)] bg-[length:50px_50px] opacity-[0.03] dark:opacity-[0.08]" />
          <div className="absolute top-1/4 left-1/4 h-96 w-96 animate-pulse rounded-full bg-[#0082c4] opacity-20 blur-[120px] dark:opacity-10" />
        </div>
        <div className="relative z-10 text-center">
          <div className="mb-4 font-mono text-sm text-[#0082c4]">
            {'// 404 Error'}
          </div>
          <h1 className="mb-4 text-4xl font-bold text-[#0082c4] md:text-5xl">
            Project Not Found
          </h1>
          <p className="mb-8 text-[#64748b] dark:text-[#cbd5e1]">
            The project you're looking for doesn't exist or has been removed.
          </p>
          <Link
            href="/projects"
            className="group inline-flex items-center gap-2 rounded-lg border-2 border-[#0082c4] bg-[#0082c4] px-6 py-3 font-semibold text-white shadow-lg shadow-[#0082c4]/30 transition-all hover:bg-[#0099e6] hover:shadow-xl hover:shadow-[#0082c4]/40"
          >
            <ArrowLeft className="h-5 w-5 transition-transform group-hover:-translate-x-1" />
            Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-white dark:bg-black">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,130,196,0.3)_1px,transparent_1px),linear-gradient(90deg,rgba(0,130,196,0.3)_1px,transparent_1px)] bg-[length:50px_50px] opacity-[0.03] dark:opacity-[0.08]" />
        <div className="absolute top-20 right-1/4 h-96 w-96 animate-pulse rounded-full bg-[#0082c4] opacity-20 blur-[120px] dark:opacity-10" />
        <div className="absolute bottom-20 left-1/4 h-96 w-96 animate-pulse rounded-full bg-[#0099e6] opacity-20 blur-[120px] [animation-delay:1s] dark:opacity-10" />
        <div className="absolute top-[20%] left-[10%] animate-bounce font-mono text-xs text-[#0082c4] opacity-30 [animation-duration:15s] dark:opacity-40">
          {'const project = {}'}
        </div>
        <div className="absolute top-[35%] right-[15%] animate-bounce font-mono text-xs text-[#0082c4] opacity-30 [animation-delay:0.5s] [animation-duration:17s] dark:opacity-40">
          {'// Featured work'}
        </div>
        <div className="absolute bottom-[30%] left-[20%] animate-bounce font-mono text-xs text-[#0082c4] opacity-30 [animation-delay:1s] [animation-duration:19s] dark:opacity-40">
          {'export default'}
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Code comment */}
        <div className="mb-4 font-mono text-sm text-[#64748b] dark:text-[#cbd5e1]">
          <span className="text-[#0082c4]">
            {'<article id="project-details">'}
          </span>
        </div>

        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link
            href="/projects"
            className="group mb-8 inline-flex items-center gap-2 rounded-lg border border-[#0082c4]/20 bg-[#f2f2f2] px-4 py-2 font-medium text-[#64748b] transition-all hover:border-[#0082c4] hover:bg-[#0082c4]/10 hover:text-[#0082c4] dark:bg-[#11141c] dark:text-[#cbd5e1]"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            <span className="font-mono text-sm">{'<- Back to Projects'}</span>
          </Link>
        </motion.div>

        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-12"
        >
          <div className="mb-6 flex flex-wrap items-center gap-3">
            {project.featured && (
              <span className="inline-flex items-center gap-2 rounded-full border border-[#0082c4]/30 bg-[#0082c4]/10 px-4 py-1.5">
                <Sparkles className="h-4 w-4 text-[#0082c4]" />
                <span className="font-mono text-sm font-semibold text-[#0082c4]">
                  Featured
                </span>
              </span>
            )}
            {project.currentlyWorking && (
              <span className="inline-flex items-center gap-2 rounded-full border border-green-500/30 bg-green-500/10 px-4 py-1.5">
                <span className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
                <span className="font-mono text-sm font-semibold text-green-500">
                  In Progress
                </span>
              </span>
            )}
            <span className="inline-flex items-center gap-2 rounded-full border border-[#0082c4]/30 bg-[#f2f2f2] px-4 py-1.5 dark:bg-[#11141c]">
              <Tag className="h-4 w-4 text-[#0082c4]" />
              <span className="font-mono text-sm font-semibold text-[#0082c4] capitalize">
                {project.type}
              </span>
            </span>
          </div>

          <h1 className="mb-6 text-4xl font-bold text-[#0082c4] sm:text-5xl md:text-6xl">
            {project.title}
          </h1>

          <p className="mb-8 max-w-3xl text-base leading-relaxed text-[#64748b] sm:text-lg md:text-xl dark:text-[#cbd5e1]">
            {project.description}
          </p>

          <div className="mb-6 flex flex-wrap gap-6 font-mono text-sm text-[#64748b] dark:text-[#cbd5e1]">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-[#0082c4]" />
              <span>{project.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <User className="h-5 w-5 text-[#0082c4]" />
              <span>{project.role}</span>
            </div>
            <div className="flex items-center gap-2">
              <Code2 className="h-5 w-5 text-[#0082c4]" />
              <span>{project.category}</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-lg bg-[#0082c4] px-6 py-3 font-semibold text-white shadow-lg shadow-[#0082c4]/30 transition-all hover:scale-105 hover:bg-[#0099e6] hover:shadow-xl hover:shadow-[#0082c4]/40"
            >
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              <ExternalLink className="relative z-10 h-5 w-5" />
              <span className="relative z-10">View Live</span>
            </a>
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-lg border-2 border-[#0082c4] bg-transparent px-6 py-3 font-semibold text-[#0082c4] transition-all hover:scale-105 hover:bg-[#0082c4] hover:text-white"
            >
              <Github className="h-5 w-5 transition-transform group-hover:rotate-12" />
              Source Code
            </a>
          </div>
        </motion.div>

        {/* ── Image Gallery ─────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16"
        >
          <div className="mb-4 font-mono text-sm text-[#0082c4]">
            {'// Project Screenshots'}
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {project.image.map((img, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                className={`group relative overflow-hidden rounded-2xl border-2 border-[#0082c4]/20 bg-[#f2f2f2] shadow-lg transition-all hover:border-[#0082c4] hover:shadow-xl hover:shadow-[#0082c4]/20 dark:bg-[#11141c] ${
                  index === 0 ? 'md:col-span-2' : ''
                }`}
              >
                {/*
                  aspect-[735/401] — matches the exact upload dimensions (2940×1604).
                  Every image renders at its natural ratio with zero cropping.
                  object-top keeps the top portion (navbar / hero) visible
                  if the container ever deviates slightly from the ratio.
                */}
                <div className="relative aspect-[735/401] w-full">
                  <Image
                    src={img}
                    alt={`${project.title} - Screenshot ${index + 1}`}
                    fill
                    className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    sizes={
                      index === 0
                        ? '(max-width: 768px) 100vw, 90vw'
                        : '(max-width: 768px) 100vw, 45vw'
                    }
                    priority={index === 0}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="absolute top-4 right-4 rounded-lg bg-[#0082c4] px-3 py-1 font-mono text-sm font-semibold text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    {index + 1}/{project.image.length}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Content Grid */}
        <div className="grid gap-12 lg:grid-cols-3">
          {/* Main */}
          <div className="lg:col-span-2">
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mb-12"
            >
              <div className="mb-4 font-mono text-sm text-[#0082c4]">
                {'// Tech Stack'}
              </div>
              <div className="mb-6 flex items-center gap-3">
                <Terminal className="h-6 w-6 text-[#0082c4]" />
                <h2 className="text-2xl font-bold text-[#0082c4] sm:text-3xl">
                  Technologies Used
                </h2>
              </div>
              <div className="flex flex-wrap gap-3">
                {project.technologies.map((tech, index) => (
                  <motion.span
                    key={tech}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.5 + index * 0.05 }}
                    className="rounded-lg border border-[#0082c4]/30 bg-[#f2f2f2] px-4 py-2 font-mono text-sm font-semibold text-[#0082c4] transition-all hover:scale-105 hover:border-[#0082c4] hover:bg-[#0082c4]/10 hover:shadow-lg hover:shadow-[#0082c4]/20 dark:bg-[#11141c]"
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <div className="mb-4 font-mono text-sm text-[#0082c4]">
                {'// Key Features'}
              </div>
              <div className="mb-6 flex items-center gap-3">
                <CheckCircle2 className="h-6 w-6 text-[#0082c4]" />
                <h2 className="text-2xl font-bold text-[#0082c4] sm:text-3xl">
                  What Makes It Special
                </h2>
              </div>
              <div className="space-y-4">
                {project.features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                    className="group flex items-start gap-4 rounded-xl border border-[#0082c4]/20 bg-[#f2f2f2] p-4 transition-all hover:border-[#0082c4] hover:shadow-lg hover:shadow-[#0082c4]/10 dark:bg-[#11141c]"
                  >
                    <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#0082c4] transition-transform group-hover:scale-110" />
                    <p className="text-sm text-[#64748b] md:text-base dark:text-[#cbd5e1]">
                      {feature}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          </div>

          {/* Sidebar */}
          <motion.aside
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-1"
          >
            <div className="sticky top-24 space-y-6">
              <div className="rounded-2xl border border-[#0082c4]/20 bg-[#f2f2f2] p-6 shadow-lg dark:bg-[#11141c]">
                <div className="mb-4 font-mono text-sm text-[#0082c4]">
                  {'// Project Info'}
                </div>
                <h3 className="mb-4 text-lg font-bold text-[#0082c4]">
                  Details
                </h3>
                <dl className="space-y-4">
                  <div>
                    <dt className="mb-1 font-mono text-xs text-[#64748b] dark:text-[#cbd5e1]">
                      Category:
                    </dt>
                    <dd className="font-semibold text-[#0082c4]">
                      {project.category}
                    </dd>
                  </div>
                  <div>
                    <dt className="mb-1 font-mono text-xs text-[#64748b] dark:text-[#cbd5e1]">
                      Type:
                    </dt>
                    <dd className="font-semibold text-[#0082c4] capitalize">
                      {project.type}
                    </dd>
                  </div>
                  <div>
                    <dt className="mb-1 font-mono text-xs text-[#64748b] dark:text-[#cbd5e1]">
                      Date:
                    </dt>
                    <dd className="font-mono text-sm text-[#64748b] dark:text-[#cbd5e1]">
                      {project.date}
                    </dd>
                  </div>
                  <div>
                    <dt className="mb-1 font-mono text-xs text-[#64748b] dark:text-[#cbd5e1]">
                      Role:
                    </dt>
                    <dd className="font-semibold text-[#0082c4]">
                      {project.role}
                    </dd>
                  </div>
                </dl>
              </div>

              <div className="rounded-2xl border border-[#0082c4]/20 bg-[#f2f2f2] p-6 shadow-lg dark:bg-[#11141c]">
                <div className="mb-4 font-mono text-sm text-[#0082c4]">
                  {'// Quick Access'}
                </div>
                <h3 className="mb-4 text-lg font-bold text-[#0082c4]">Links</h3>
                <div className="space-y-3">
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-2 font-mono text-sm text-[#0082c4] transition-all hover:gap-3 hover:text-[#0099e6]"
                  >
                    <ExternalLink className="h-4 w-4" />
                    <span>Live Demo</span>
                  </a>
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-2 font-mono text-sm text-[#0082c4] transition-all hover:gap-3 hover:text-[#0099e6]"
                  >
                    <Github className="h-4 w-4" />
                    <span>Repository</span>
                  </a>
                </div>
              </div>

              <div className="rounded-2xl border border-[#0082c4]/30 bg-gradient-to-br from-[#0082c4]/10 to-[#0099e6]/10 p-6">
                <div className="mb-2 flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-[#0082c4]" />
                  <h3 className="font-mono text-sm font-bold text-[#0082c4]">
                    Interested?
                  </h3>
                </div>
                <p className="mb-4 text-sm text-[#64748b] dark:text-[#cbd5e1]">
                  Let's collaborate on your next project!
                </p>
                <Link
                  href="#contact"
                  className="group inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#0082c4] px-4 py-2 font-semibold text-white transition-all hover:bg-[#0099e6] hover:shadow-lg hover:shadow-[#0082c4]/30"
                >
                  <span>Get In Touch</span>
                  <ExternalLink className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </motion.aside>
        </div>

        {/* Bottom nav */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-20 text-center"
        >
          <div className="mb-4 font-mono text-sm text-[#64748b] dark:text-[#cbd5e1]">
            {'// Explore More'}
          </div>
          <Link
            href="/#projects"
            className="group inline-flex items-center gap-2 rounded-lg border-2 border-[#0082c4] bg-transparent px-8 py-4 font-semibold text-[#0082c4] transition-all hover:scale-105 hover:bg-[#0082c4] hover:text-white hover:shadow-lg hover:shadow-[#0082c4]/30"
          >
            <ArrowLeft className="h-5 w-5 transition-transform group-hover:-translate-x-1" />
            View All Projects
          </Link>
        </motion.div>

        <div className="mt-12 font-mono text-sm text-[#64748b] dark:text-[#cbd5e1]">
          <span className="text-[#0082c4]">{'</article>'}</span>
        </div>
      </div>
    </div>
  );
}
