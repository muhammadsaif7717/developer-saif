'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import {
  Plus,
  Search,
  Edit,
  Trash2,
  ExternalLink,
  Github,
  Star,
  MoreVertical,
  X,
  Calendar,
  Briefcase,
  Code2,
  Loader2,
  ArrowUpDown,
} from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getProjects } from '@/lib/getApi';
import LoadingPage from '@/components/shared/LoadingPage';
import axios from 'axios';
import { Project } from '@/types';

export default function ProjectsPage() {
  const { status } = useSession();
  const router = useRouter();
  const queryClient = useQueryClient();
  const [mounted, setMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState<Project | null>(null);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'priority' | 'date'>('priority');

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/sign-in');
    }
  }, [status, router]);

  const {
    data: projects = [],
    isLoading,
    isError,
  } = useQuery<Project[]>({
    queryKey: ['projects'],
    queryFn: () => getProjects(),
    staleTime: 5 * 60 * 1000,
    enabled: status === 'authenticated',
  });

  const deleteMutation = useMutation({
    mutationFn: async (projectId: string) => {
      try {
        const { data } = await axios.delete(
          `/api/v1/projects/delete/${projectId}`,
        );
        return data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        throw new Error(
          error.response?.data?.message || 'Failed to delete project',
        );
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      setShowDeleteModal(false);
      setProjectToDelete(null);
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      alert(error.message || 'Failed to delete project. Please try again.');
    },
  });

  // Filter and sort projects
  const filteredProjects = useMemo(() => {
    if (!projects) return [];

    let filtered = [...projects];

    if (selectedCategory !== 'All') {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }

    if (selectedType !== 'All') {
      filtered = filtered.filter((p) => p.type === selectedType);
    }

    if (searchQuery) {
      filtered = filtered.filter(
        (p) =>
          p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.technologies.some((tech) =>
            tech.toLowerCase().includes(searchQuery.toLowerCase()),
          ),
      );
    }

    if (sortBy === 'priority') {
      filtered.sort((a, b) => (b.priority || 0) - (a.priority || 0));
    } else if (sortBy === 'date') {
      filtered.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
      );
    }

    return filtered;
  }, [projects, searchQuery, selectedCategory, selectedType, sortBy]);

  const categories = [
    'All',
    'Web Apps',
    'UI/UX',
    'Open Source',
    'Mobile Apps',
    'API',
    'Desktop Apps',
  ];
  const projectTypes = [
    'All',
    'personal',
    'client',
    'open-source',
    'freelance',
  ];

  const handleDelete = async (project: Project) => {
    setProjectToDelete(project);
    setShowDeleteModal(true);
    setActiveMenu(null);
  };

  const confirmDelete = async () => {
    if (!projectToDelete?._id) return;
    deleteMutation.mutate(projectToDelete._id);
  };

  useEffect(() => {
    const handleClickOutside = () => setActiveMenu(null);
    if (activeMenu) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [activeMenu]);

  if (!mounted || status === 'loading') {
    return <LoadingPage />;
  }

  if (status === 'unauthenticated') {
    return null;
  }

  if (isLoading) {
    return <LoadingPage />;
  }

  if (isError) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white dark:bg-black">
        <div className="text-center">
          <p className="text-xl font-semibold text-red-500">
            Error loading projects
          </p>
          <button
            onClick={() =>
              queryClient.invalidateQueries({ queryKey: ['projects'] })
            }
            className="mt-4 rounded-lg bg-[#0082c4] px-4 py-2 text-white hover:bg-[#0099e6]"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-24 dark:bg-black">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-[#0082c4] md:text-4xl">
              Projects
            </h1>
            <p className="mt-2 text-[#64748b] dark:text-[#cbd5e1]">
              Manage your portfolio projects ({filteredProjects.length}{' '}
              {filteredProjects.length === 1 ? 'project' : 'projects'})
            </p>
          </div>
          <Link href="/dashboard/projects/new">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 rounded-lg bg-[#0082c4] px-4 py-3 font-semibold text-white shadow-lg shadow-[#0082c4]/20 transition-all hover:bg-[#0099e6]"
            >
              <Plus className="h-5 w-5" />
              Add Project
            </motion.button>
          </Link>
        </div>

        {/* Filters */}
        <div className="mb-8 space-y-4">
          {/* Search & Sort */}
          <div className="flex flex-col gap-4 sm:flex-row">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-[#64748b] dark:text-[#cbd5e1]" />
              <input
                type="text"
                placeholder="Search by title, description, or technologies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg border border-[#e2e8f0] bg-white py-3 pr-4 pl-10 text-black placeholder-[#64748b] focus:border-[#0082c4] focus:ring-2 focus:ring-[#0082c4]/20 focus:outline-none dark:border-[#27273a] dark:bg-[#11141c] dark:text-white dark:placeholder-[#cbd5e1]"
              />
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2">
              <ArrowUpDown className="h-5 w-5 text-[#64748b] dark:text-[#cbd5e1]" />
              <select
                value={sortBy}
                onChange={(e) =>
                  setSortBy(e.target.value as 'priority' | 'date')
                }
                className="rounded-lg border border-[#e2e8f0] bg-white px-4 py-3 text-black focus:border-[#0082c4] focus:ring-2 focus:ring-[#0082c4]/20 focus:outline-none dark:border-[#27273a] dark:bg-[#11141c] dark:text-white"
              >
                <option value="priority">Sort by Priority</option>
                <option value="date">Sort by Date</option>
              </select>
            </div>
          </div>

          {/* Category Filter */}
          <div>
            <p className="mb-2 text-sm font-semibold text-black dark:text-white">
              Category
            </p>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                    selectedCategory === category
                      ? 'bg-[#0082c4] text-white shadow-lg shadow-[#0082c4]/20'
                      : 'border border-[#e2e8f0] text-[#64748b] hover:border-[#0082c4] hover:text-[#0082c4] dark:border-[#27273a] dark:text-[#cbd5e1]'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Type Filter */}
          <div>
            <p className="mb-2 text-sm font-semibold text-black dark:text-white">
              Project Type
            </p>
            <div className="flex flex-wrap gap-2">
              {projectTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => setSelectedType(type)}
                  className={`rounded-lg px-4 py-2 text-sm font-medium capitalize transition-all ${
                    selectedType === type
                      ? 'bg-[#0082c4] text-white shadow-lg shadow-[#0082c4]/20'
                      : 'border border-[#e2e8f0] text-[#64748b] hover:border-[#0082c4] hover:text-[#0082c4] dark:border-[#27273a] dark:text-[#cbd5e1]'
                  }`}
                >
                  {type.replace('-', ' ')}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        {filteredProjects.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-[#e2e8f0] py-16 dark:border-[#27273a]">
            <Code2 className="mb-4 h-16 w-16 text-[#64748b] dark:text-[#cbd5e1]" />
            <p className="text-xl font-semibold text-[#64748b] dark:text-[#cbd5e1]">
              No projects found
            </p>
            <p className="mt-2 text-sm text-[#64748b] dark:text-[#cbd5e1]">
              {searchQuery ||
              selectedCategory !== 'All' ||
              selectedType !== 'All'
                ? 'Try adjusting your search or filters'
                : 'Add your first project to get started'}
            </p>
            {!searchQuery &&
              selectedCategory === 'All' &&
              selectedType === 'All' && (
                <Link href="/dashboard/projects/new">
                  <button className="mt-4 rounded-lg bg-[#0082c4] px-4 py-2 font-semibold text-white hover:bg-[#0099e6]">
                    Add Project
                  </button>
                </Link>
              )}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group relative overflow-hidden rounded-xl border-2 border-[#e2e8f0] bg-[#f2f2f2] transition-all duration-300 hover:border-[#0082c4] hover:shadow-lg hover:shadow-[#0082c4]/10 dark:border-[#27273a] dark:bg-[#11141c]"
              >
                {/* Status Badges */}
                <div className="absolute top-4 left-4 z-10 flex flex-wrap gap-2">
                  {project.featured && (
                    <div className="flex items-center gap-1 rounded-full bg-[#0082c4] px-3 py-1 text-xs font-semibold text-white shadow-lg">
                      <Star className="h-3 w-3 fill-white" />
                      Featured
                    </div>
                  )}
                  {project.currentlyWorking && (
                    <div className="flex items-center gap-1 rounded-full bg-green-500 px-3 py-1 text-xs font-semibold text-white shadow-lg">
                      <Loader2 className="h-3 w-3 animate-spin" />
                      In Progress
                    </div>
                  )}
                  {/* Priority Badge */}
                  {project.priority > 0 && (
                    <div className="flex items-center gap-1 rounded-full bg-amber-500 px-3 py-1 text-xs font-semibold text-white shadow-lg">
                      Priority: {project.priority}
                    </div>
                  )}
                </div>

                {/* Menu Button */}
                <div className="absolute top-4 right-4 z-10">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveMenu(
                        activeMenu === project._id ? null : project._id!,
                      );
                    }}
                    className="rounded-lg bg-white/90 p-2 backdrop-blur-sm transition-all hover:bg-white dark:bg-black/90 dark:hover:bg-black"
                  >
                    <MoreVertical className="h-5 w-5 text-black dark:text-white" />
                  </button>

                  {/* Dropdown Menu */}
                  <AnimatePresence>
                    {activeMenu === project._id && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -10 }}
                        onClick={(e) => e.stopPropagation()}
                        className="absolute top-12 right-0 w-48 overflow-hidden rounded-lg border border-[#e2e8f0] bg-white shadow-xl dark:border-[#27273a] dark:bg-[#11141c]"
                      >
                        <Link href={`/dashboard/projects/edit/${project._id}`}>
                          <button className="flex w-full items-center gap-2 px-4 py-3 text-sm font-medium text-black transition-colors hover:bg-[#0082c4]/10 dark:text-white">
                            <Edit className="h-4 w-4" />
                            Edit
                          </button>
                        </Link>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(project);
                          }}
                          className="flex w-full items-center gap-2 px-4 py-3 text-sm font-medium text-red-500 transition-colors hover:bg-red-500/10"
                        >
                          <Trash2 className="h-4 w-4" />
                          Delete
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Project Image */}
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={project.image[0] || '/placeholder.jpg'}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>

                {/* Project Info */}
                <div className="p-6">
                  <div className="mb-3 flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-[#0082c4]/10 px-3 py-1 text-xs font-medium text-[#0082c4]">
                      {project.category}
                    </span>
                    <span className="rounded-full bg-purple-500/10 px-3 py-1 text-xs font-medium text-purple-600 capitalize dark:text-purple-400">
                      {project.type.replace('-', ' ')}
                    </span>
                  </div>

                  <h3 className="mb-2 text-xl font-bold text-black dark:text-white">
                    {project.title}
                  </h3>

                  <p className="mb-4 line-clamp-2 text-sm text-[#64748b] dark:text-[#cbd5e1]">
                    {project.description}
                  </p>

                  {/* Meta Info */}
                  <div className="mb-4 flex items-center gap-4 text-xs text-[#64748b] dark:text-[#cbd5e1]">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {project.date}
                    </div>
                    <div className="flex items-center gap-1">
                      <Briefcase className="h-3 w-3" />
                      {project.role}
                    </div>
                  </div>

                  {/* Technologies */}
                  <div className="mb-4 flex flex-wrap gap-2">
                    {project.technologies.slice(0, 3).map((tech, techIndex) => (
                      <span
                        key={`${tech}-${techIndex}`}
                        className="rounded-md bg-white px-2 py-1 text-xs font-medium text-black dark:bg-black dark:text-white"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="rounded-md bg-white px-2 py-1 text-xs font-medium text-black dark:bg-black dark:text-white">
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>

                  {/* Action Links */}
                  <div className="flex gap-2">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-[#0082c4] bg-[#0082c4] px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-[#0099e6]"
                      >
                        <ExternalLink className="h-4 w-4" />
                        Live
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-[#e2e8f0] bg-transparent px-4 py-2 text-sm font-semibold text-black transition-all hover:border-[#0082c4] hover:bg-[#0082c4]/10 dark:border-[#27273a] dark:text-white"
                      >
                        <Github className="h-4 w-4" />
                        Code
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {showDeleteModal && projectToDelete && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm"
            onClick={() => setShowDeleteModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md overflow-hidden rounded-xl border-2 border-[#e2e8f0] bg-white shadow-2xl dark:border-[#27273a] dark:bg-[#11141c]"
            >
              <div className="border-b border-[#e2e8f0] p-6 dark:border-[#27273a]">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-black dark:text-white">
                    Delete Project
                  </h3>
                  <button
                    onClick={() => setShowDeleteModal(false)}
                    className="rounded-lg p-2 transition-colors hover:bg-[#f2f2f2] dark:hover:bg-[#27273a]"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <div className="p-6">
                <p className="text-[#64748b] dark:text-[#cbd5e1]">
                  Are you sure you want to delete{' '}
                  <span className="font-semibold text-[#0082c4]">
                    {projectToDelete.title}
                  </span>
                  ? This action cannot be undone.
                </p>
              </div>

              <div className="flex gap-3 border-t border-[#e2e8f0] p-6 dark:border-[#27273a]">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  disabled={deleteMutation.isPending}
                  className="flex-1 rounded-lg border-2 border-[#e2e8f0] px-4 py-3 font-semibold transition-colors hover:bg-[#f2f2f2] disabled:opacity-50 dark:border-[#27273a] dark:hover:bg-[#27273a]"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  disabled={deleteMutation.isPending}
                  className="flex-1 rounded-lg bg-red-500 px-4 py-3 font-semibold text-white transition-colors hover:bg-red-600 disabled:opacity-50"
                >
                  {deleteMutation.isPending ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
