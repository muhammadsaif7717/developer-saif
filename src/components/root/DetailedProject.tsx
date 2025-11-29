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
} from 'lucide-react';
import LoadingPage from '@/components/shared/LoadingPage';

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

interface DetailedProjectProps {
  projectId: string;
}

export default function DetailedProject({ projectId }: DetailedProjectProps) {
  const id = projectId;

  // Fetch project data
  const {
    data: project,
    isLoading: isLoadingProject,
    error,
  } = useQuery<Project>({
    queryKey: ['project', id],
    queryFn: () => getProjectsById(id),
  });
  console.log(id, project);

  if (isLoadingProject) {
    return <LoadingPage />;
  }

  if (error || !project) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white dark:bg-black">
        <div className="text-center">
          <h1 className="mb-4 text-4xl font-bold text-slate-800 dark:text-slate-100">
            Project Not Found
          </h1>
          <p className="mb-8 text-slate-600 dark:text-slate-400">
            The project you're looking for doesn't exist or has been removed.
          </p>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 rounded-lg bg-[#0082c4] px-6 py-3 font-semibold text-white transition-all hover:bg-[#0099e6]"
          >
            <ArrowLeft className="h-5 w-5" />
            Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-white dark:bg-black">
      {/* Background Elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,130,196,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,130,196,0.03)_1px,transparent_1px)] bg-[length:60px_60px] dark:bg-[linear-gradient(rgba(0,130,196,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(0,130,196,0.08)_1px,transparent_1px)]" />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-20 -right-48 h-96 w-96 rounded-full bg-[#0082c4] opacity-20 blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 4,
          }}
          className="absolute bottom-20 -left-48 h-96 w-96 rounded-full bg-[#0099e6] opacity-20 blur-3xl"
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link
            href="/projects"
            className="group mb-8 inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 font-medium text-slate-700 transition-all hover:border-[#0082c4] hover:text-[#0082c4] dark:border-slate-700 dark:bg-[#11141c] dark:text-slate-300 dark:hover:border-[#0082c4]"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to Projects
          </Link>
        </motion.div>

        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-12"
        >
          {/* Badges */}
          <div className="mb-6 flex flex-wrap items-center gap-3">
            {project.featured && (
              <span className="inline-flex items-center gap-2 rounded-full border border-[#0082c4]/30 bg-[#0082c4]/10 px-4 py-1.5">
                <Sparkles className="h-4 w-4 text-[#0082c4]" />
                <span className="text-sm font-semibold text-[#0082c4]">
                  Featured Project
                </span>
              </span>
            )}
            {project.currentlyWorking && (
              <span className="inline-flex items-center gap-2 rounded-full border border-green-500/30 bg-green-500/10 px-4 py-1.5">
                <span className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
                <span className="text-sm font-semibold text-green-500">
                  Currently Working
                </span>
              </span>
            )}
            <span className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-slate-100 px-4 py-1.5 dark:border-slate-700 dark:bg-slate-800">
              <Tag className="h-4 w-4 text-slate-600 dark:text-slate-400" />
              <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                {project.type}
              </span>
            </span>
          </div>

          {/* Title */}
          <h1 className="mb-6 bg-gradient-to-r from-[#0082c4] via-[#0099e6] to-[#0082c4] bg-clip-text text-4xl font-bold text-transparent sm:text-5xl md:text-6xl">
            {project.title}
          </h1>

          {/* Description */}
          <p className="mb-8 max-w-3xl text-lg leading-relaxed text-slate-600 sm:text-xl dark:text-slate-400">
            {project.description}
          </p>

          {/* Meta Information */}
          <div className="flex flex-wrap gap-6 text-sm text-slate-600 dark:text-slate-400">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-[#0082c4]" />
              <span className="font-mono">{project.date}</span>
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

          {/* Action Buttons */}
          <div className="mt-8 flex flex-wrap gap-4">
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-[#0082c4] px-6 py-3 font-semibold text-white shadow-lg shadow-[#0082c4]/30 transition-all hover:bg-[#0099e6] hover:shadow-xl hover:shadow-[#0082c4]/40"
            >
              <ExternalLink className="h-5 w-5" />
              View Live Project
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border-2 border-[#0082c4] bg-transparent px-6 py-3 font-semibold text-[#0082c4] transition-all hover:bg-[#0082c4] hover:text-white"
            >
              <Github className="h-5 w-5" />
              View Source Code
            </motion.a>
          </div>
        </motion.div>

        {/* Image Gallery */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16"
        >
          <div className="grid gap-6 md:grid-cols-2">
            {project.image.map((img, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                className={`group relative overflow-hidden rounded-2xl border-2 border-slate-200 bg-slate-100 shadow-lg transition-all hover:border-[#0082c4] hover:shadow-2xl hover:shadow-[#0082c4]/20 dark:border-slate-800 dark:bg-slate-900 ${
                  index === 0 ? 'md:col-span-2' : ''
                }`}
              >
                <div
                  className={`relative ${
                    index === 0 ? 'h-[400px] sm:h-[500px]' : 'h-[300px]'
                  }`}
                >
                  <Image
                    src={img}
                    alt={`${project.title} - Screenshot ${index + 1}`}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Content Grid */}
        <div className="grid gap-12 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Technologies Section */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mb-12"
            >
              <div className="mb-6 flex items-center gap-3">
                <Code2 className="h-6 w-6 text-[#0082c4]" />
                <h2 className="text-2xl font-bold text-slate-800 sm:text-3xl dark:text-slate-100">
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
                    className="rounded-xl border-2 border-[#0082c4]/30 bg-[#0082c4]/10 px-4 py-2 font-mono text-sm font-semibold text-[#0082c4] transition-all hover:border-[#0082c4] hover:bg-[#0082c4]/20"
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </motion.section>

            {/* Features Section */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <div className="mb-6 flex items-center gap-3">
                <CheckCircle2 className="h-6 w-6 text-[#0082c4]" />
                <h2 className="text-2xl font-bold text-slate-800 sm:text-3xl dark:text-slate-100">
                  Key Features
                </h2>
              </div>
              <div className="space-y-4">
                {project.features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                    className="flex items-start gap-4 rounded-xl border border-slate-200 bg-[#f2f2f2] p-4 transition-all hover:border-[#0082c4] hover:shadow-lg dark:border-slate-800 dark:bg-[#11141c]"
                  >
                    <CheckCircle2 className="h-6 w-6 flex-shrink-0 text-[#0082c4]" />
                    <p className="text-slate-700 dark:text-slate-300">
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
              {/* Project Info Card */}
              <div className="rounded-2xl border-2 border-slate-200 bg-[#f2f2f2] p-6 shadow-lg dark:border-slate-800 dark:bg-[#11141c]">
                <h3 className="mb-4 text-lg font-bold text-slate-800 dark:text-slate-100">
                  Project Information
                </h3>
                <dl className="space-y-4">
                  <div>
                    <dt className="mb-1 text-sm font-medium text-slate-600 dark:text-slate-400">
                      Category
                    </dt>
                    <dd className="font-semibold text-[#0082c4]">
                      {project.category}
                    </dd>
                  </div>
                  <div>
                    <dt className="mb-1 text-sm font-medium text-slate-600 dark:text-slate-400">
                      Project Type
                    </dt>
                    <dd className="font-semibold text-slate-800 capitalize dark:text-slate-100">
                      {project.type}
                    </dd>
                  </div>
                  <div>
                    <dt className="mb-1 text-sm font-medium text-slate-600 dark:text-slate-400">
                      Date
                    </dt>
                    <dd className="font-mono text-slate-800 dark:text-slate-100">
                      {project.date}
                    </dd>
                  </div>
                  <div>
                    <dt className="mb-1 text-sm font-medium text-slate-600 dark:text-slate-400">
                      My Role
                    </dt>
                    <dd className="font-semibold text-slate-800 dark:text-slate-100">
                      {project.role}
                    </dd>
                  </div>
                </dl>
              </div>

              {/* Quick Links Card */}
              <div className="rounded-2xl border-2 border-slate-200 bg-[#f2f2f2] p-6 shadow-lg dark:border-slate-800 dark:bg-[#11141c]">
                <h3 className="mb-4 text-lg font-bold text-slate-800 dark:text-slate-100">
                  Quick Links
                </h3>
                <div className="space-y-3">
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-[#0082c4] transition-all hover:gap-3 hover:text-[#0099e6]"
                  >
                    <ExternalLink className="h-4 w-4" />
                    <span className="font-medium">Live Website</span>
                  </a>
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-[#0082c4] transition-all hover:gap-3 hover:text-[#0099e6]"
                  >
                    <Github className="h-4 w-4" />
                    <span className="font-medium">Source Code</span>
                  </a>
                </div>
              </div>

              {/* Share Card */}
              <div className="rounded-2xl border-2 border-[#0082c4]/20 bg-gradient-to-br from-[#0082c4]/10 to-[#0099e6]/10 p-6">
                <h3 className="mb-2 text-lg font-bold text-slate-800 dark:text-slate-100">
                  Like this project?
                </h3>
                <p className="mb-4 text-sm text-slate-600 dark:text-slate-400">
                  Let's collaborate on your next big idea!
                </p>
                <Link
                  href="#contact"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#0082c4] px-4 py-2 font-semibold text-white transition-all hover:bg-[#0099e6]"
                >
                  Get In Touch
                </Link>
              </div>
            </div>
          </motion.aside>
        </div>

        {/* Navigation to Other Projects */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-20 text-center"
        >
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 rounded-xl border-2 border-[#0082c4] bg-transparent px-8 py-4 font-semibold text-[#0082c4] transition-all hover:bg-[#0082c4] hover:text-white hover:shadow-lg hover:shadow-[#0082c4]/30"
          >
            <ArrowLeft className="h-5 w-5" />
            View All Projects
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
