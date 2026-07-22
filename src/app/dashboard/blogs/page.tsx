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
  MoreVertical,
  X,
  Calendar,
  Clock,
  Eye,
  FileText,
  Loader2,
  ArrowUpDown,
} from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getBlogs } from '@/lib/getApi';
import LoadingPage from '@/components/shared/LoadingPage';
import axios from 'axios';
import { Blog } from '@/types';

export default function BlogsPage() {
  const { status } = useSession();
  const router = useRouter();
  const queryClient = useQueryClient();
  const [mounted, setMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [blogToDelete, setBlogToDelete] = useState<Blog | null>(null);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'date' | 'views'>('date');

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
    data: blogs = [],
    isLoading,
    isError,
  } = useQuery<Blog[]>({
    queryKey: ['blogs'],
    queryFn: () => getBlogs(),
    staleTime: 5 * 60 * 1000,
    enabled: status === 'authenticated',
  });

  const deleteMutation = useMutation({
    mutationFn: async (blogId: string) => {
      try {
        const { data } = await axios.delete(`/api/v1/blogs/delete/${blogId}`);
        return data;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        throw new Error(
          error.response?.data?.message || 'Failed to delete blog',
        );
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
      setShowDeleteModal(false);
      setBlogToDelete(null);
    },
    onError: (error: any) => {
      alert(error.message || 'Failed to delete blog. Please try again.');
    },
  });

  // Filter and sort blogs
  const filteredBlogs = useMemo(() => {
    if (!blogs) return [];

    let filtered = [...blogs];

    if (selectedStatus !== 'All') {
      filtered = filtered.filter(
        (b) => b.status === selectedStatus.toLowerCase(),
      );
    }

    if (searchQuery) {
      const lowerQuery = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (b) =>
          b.title?.toLowerCase().includes(lowerQuery) ||
          b.categories?.some((cat) =>
            cat?.toLowerCase().includes(lowerQuery),
          ) ||
          b.tags?.some((tag) => tag?.toLowerCase().includes(lowerQuery)),
      );
    }

    if (sortBy === 'date') {
      filtered.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );
    } else if (sortBy === 'views') {
      filtered.sort((a, b) => (b.views || 0) - (a.views || 0));
    }

    return filtered;
  }, [blogs, searchQuery, selectedStatus, sortBy]);

  const statuses = ['All', 'Published', 'Draft'];

  const handleDelete = async (blog: Blog) => {
    setBlogToDelete(blog);
    setShowDeleteModal(true);
    setActiveMenu(null);
  };

  const confirmDelete = async () => {
    if (!blogToDelete?._id) return;
    deleteMutation.mutate(blogToDelete._id);
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
            Error loading blogs
          </p>
          <button
            onClick={() =>
              queryClient.invalidateQueries({ queryKey: ['blogs'] })
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
            <h1 className="text-2xl font-bold text-[#0082c4] md:text-3xl md:text-4xl">
              Blogs
            </h1>
            <p className="mt-1 text-sm text-[#64748b] md:mt-2 md:text-base dark:text-[#cbd5e1]">
              Manage your blog posts ({filteredBlogs.length}{' '}
              {filteredBlogs.length === 1 ? 'post' : 'posts'})
            </p>
          </div>
          <Link href="/dashboard/blogs/new">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 rounded-lg bg-[#0082c4] px-4 py-3 font-semibold text-white shadow-lg shadow-[#0082c4]/20 transition-all hover:bg-[#0099e6]"
            >
              <Plus className="h-5 w-5" />
              Add Blog
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
                placeholder="Search by title, categories, or tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg border border-[#e2e8f0] bg-white py-2 pr-4 pl-10 text-sm text-black placeholder-[#64748b] focus:border-[#0082c4] focus:ring-2 focus:ring-[#0082c4]/20 focus:outline-none md:py-3 md:text-base dark:border-[#27273a] dark:bg-[#11141c] dark:text-white dark:placeholder-[#cbd5e1]"
              />
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2">
              <ArrowUpDown className="h-5 w-5 text-[#64748b] dark:text-[#cbd5e1]" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'date' | 'views')}
                className="rounded-lg border border-[#e2e8f0] bg-white px-3 py-2 text-sm text-black focus:border-[#0082c4] focus:ring-2 focus:ring-[#0082c4]/20 focus:outline-none md:px-4 md:py-3 md:text-base dark:border-[#27273a] dark:bg-[#11141c] dark:text-white"
              >
                <option value="date">Sort by Date</option>
                <option value="views">Sort by Views</option>
              </select>
            </div>
          </div>

          {/* Status Filter */}
          <div>
            <p className="mb-2 text-sm font-semibold text-black dark:text-white">
              Status
            </p>
            <div className="flex flex-wrap gap-2">
              {statuses.map((status) => (
                <button
                  key={status}
                  onClick={() => setSelectedStatus(status)}
                  className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all md:px-4 md:py-2 md:text-sm ${
                    selectedStatus === status
                      ? 'bg-[#0082c4] text-white shadow-lg shadow-[#0082c4]/20'
                      : 'border border-[#e2e8f0] text-[#64748b] hover:border-[#0082c4] hover:text-[#0082c4] dark:border-[#27273a] dark:text-[#cbd5e1]'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Blogs Grid */}
        {filteredBlogs.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-[#e2e8f0] py-16 dark:border-[#27273a]">
            <FileText className="mb-4 h-16 w-16 text-[#64748b] dark:text-[#cbd5e1]" />
            <p className="text-xl font-semibold text-[#64748b] dark:text-[#cbd5e1]">
              No blogs found
            </p>
            <p className="mt-2 text-sm text-[#64748b] dark:text-[#cbd5e1]">
              {searchQuery || selectedStatus !== 'All'
                ? 'Try adjusting your search or filters'
                : 'Add your first blog post to get started'}
            </p>
            {!searchQuery && selectedStatus === 'All' && (
              <Link href="/dashboard/blogs/new">
                <button className="mt-4 rounded-lg bg-[#0082c4] px-4 py-2 font-semibold text-white hover:bg-[#0099e6]">
                  Add Blog
                </button>
              </Link>
            )}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-3"
          >
            {filteredBlogs.map((blog, index) => (
              <motion.div
                key={blog._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group relative overflow-hidden rounded-xl border-2 border-[#e2e8f0] bg-[#f2f2f2] transition-all duration-300 hover:border-[#0082c4] hover:shadow-lg hover:shadow-[#0082c4]/10 dark:border-[#27273a] dark:bg-[#11141c]"
              >
                {/* Status Badges */}
                <div className="absolute top-4 left-4 z-10 flex flex-wrap gap-2">
                  <div
                    className={`flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold text-white shadow-lg ${
                      blog.status === 'published'
                        ? 'bg-green-500'
                        : 'bg-gray-500'
                    }`}
                  >
                    {blog.status === 'published' ? 'Published' : 'Draft'}
                  </div>
                </div>

                {/* Top Right Actions & Badges */}
                <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
                  <div className="relative">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveMenu(
                          activeMenu === blog._id ? null : blog._id!,
                        );
                      }}
                      className="rounded-lg bg-white/90 p-1.5 backdrop-blur-sm transition-all hover:bg-white md:p-2 dark:bg-black/90 dark:hover:bg-black"
                    >
                      <MoreVertical className="h-5 w-5 text-black dark:text-white" />
                    </button>

                    {/* Dropdown Menu */}
                    <AnimatePresence>
                      {activeMenu === blog._id && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95, y: -10 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.95, y: -10 }}
                          onClick={(e) => e.stopPropagation()}
                          className="absolute top-12 right-0 w-48 overflow-hidden rounded-lg border border-[#e2e8f0] bg-white shadow-xl dark:border-[#27273a] dark:bg-[#11141c]"
                        >
                          <Link href={`/dashboard/blogs/edit/${blog._id}`}>
                            <button className="flex w-full items-center gap-2 px-3 py-2 text-sm font-medium text-black transition-colors hover:bg-[#0082c4]/10 md:px-4 md:py-3 dark:text-white">
                              <Edit className="h-4 w-4" />
                              Edit
                            </button>
                          </Link>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDelete(blog);
                            }}
                            className="flex w-full items-center gap-2 px-3 py-2 text-sm font-medium text-red-500 transition-colors hover:bg-red-500/10 md:px-4 md:py-3"
                          >
                            <Trash2 className="h-4 w-4" />
                            Delete
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Blog Image */}
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={blog.coverImage || '/placeholder.jpg'}
                    alt={blog.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>

                {/* Blog Info */}
                <div className="p-6">
                  <h3 className="mb-2 line-clamp-2 text-xl font-bold text-black dark:text-white">
                    {blog.title}
                  </h3>

                  {/* Meta Info */}
                  <div className="mb-4 flex items-center gap-4 text-xs text-[#64748b] dark:text-[#cbd5e1]">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {new Date(blog.createdAt).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {blog.readTime || 5} min read
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="h-3 w-3" />
                      {blog.views || 0}
                    </div>
                  </div>

                  {/* Categories */}
                  <div className="mb-4 flex flex-wrap gap-2">
                    {blog.categories?.slice(0, 3).map((cat, catIndex) => (
                      <span
                        key={`${cat}-${catIndex}`}
                        className="rounded-md bg-white px-2 py-1 text-xs font-medium text-black dark:bg-black dark:text-white"
                      >
                        {cat}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {showDeleteModal && blogToDelete && (
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
                    Delete Blog
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
                    {blogToDelete.title}
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
