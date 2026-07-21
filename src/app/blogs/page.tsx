'use client';

import { getBlogs } from '@/lib/getApi';
import { Blog } from '@/types';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Clock,
  Eye,
  Rss,
  Tag,
} from 'lucide-react';
import LoadingPage from '@/components/shared/LoadingPage';
import { useMemo, useState } from 'react';

const BLOGS_PER_PAGE = 6;

export default function Page() {
  const [currentPage, setCurrentPage] = useState(1);

  const {
    data: allBlogs,
    isLoading,
    error,
  } = useQuery<Blog[]>({
    queryKey: ['blogs'],
    queryFn: () => getBlogs(),
  });

  // Filter out drafts — only published blogs
  const publishedBlogs = useMemo(() => {
    if (!allBlogs) return [];
    return allBlogs.filter((blog) => blog.status === 'published');
  }, [allBlogs]);

  // Pagination
  const totalPages = Math.ceil(publishedBlogs.length / BLOGS_PER_PAGE);
  const paginatedBlogs = useMemo(() => {
    const start = (currentPage - 1) * BLOGS_PER_PAGE;
    return publishedBlogs.slice(start, start + BLOGS_PER_PAGE);
  }, [publishedBlogs, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (isLoading) {
    return <LoadingPage />;
  }

  if (error) {
    return (
      <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-white dark:bg-black">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(0,130,196,0.3)_1px,transparent_1px),linear-gradient(90deg,rgba(0,130,196,0.3)_1px,transparent_1px)] bg-[length:50px_50px] opacity-[0.03] dark:opacity-[0.08]" />
          <div className="absolute top-1/4 left-1/4 h-96 w-96 animate-pulse rounded-full bg-[#0082c4] opacity-20 blur-[120px] dark:opacity-10" />
        </div>
        <div className="relative z-10 text-center">
          <div className="mb-4 font-mono text-sm text-[#0082c4]">
            {'// Error'}
          </div>
          <h1 className="mb-4 text-4xl font-bold text-[#0082c4] md:text-5xl">
            Something Went Wrong
          </h1>
          <p className="mb-8 text-[#64748b] dark:text-[#cbd5e1]">
            Failed to load blogs. Please try again later.
          </p>
          <Link
            href="/"
            className="group inline-flex items-center gap-2 rounded-lg border-2 border-[#0082c4] bg-[#0082c4] px-6 py-3 font-semibold text-white shadow-lg shadow-[#0082c4]/30 transition-all hover:bg-[#0099e6] hover:shadow-xl hover:shadow-[#0082c4]/40"
          >
            <ArrowLeft className="h-5 w-5 transition-transform group-hover:-translate-x-1" />
            Back to Home
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
          {'const blogs = []'}
        </div>
        <div className="absolute top-[35%] right-[15%] animate-bounce font-mono text-xs text-[#0082c4] opacity-30 [animation-delay:0.5s] [animation-duration:17s] dark:opacity-40">
          {'// Latest articles'}
        </div>
        <div className="absolute bottom-[30%] left-[20%] animate-bounce font-mono text-xs text-[#0082c4] opacity-30 [animation-delay:1s] [animation-duration:19s] dark:opacity-40">
          {'export default'}
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Code comment */}
        <div className="mb-4 font-mono text-sm text-[#64748b] dark:text-[#cbd5e1]">
          <span className="text-[#0082c4]">
            {'<section id="blog-listing">'}
          </span>
        </div>

        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link
            href="/"
            className="group mb-8 inline-flex items-center gap-2 rounded-lg border border-[#0082c4]/20 bg-[#f2f2f2] px-4 py-2 font-medium text-[#64748b] transition-all hover:border-[#0082c4] hover:bg-[#0082c4]/10 hover:text-[#0082c4] dark:bg-[#11141c] dark:text-[#cbd5e1]"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            <span className="font-mono text-sm">{'<- Back to Home'}</span>
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-12"
        >
          <div className="mb-4 font-mono text-sm text-[#0082c4]">
            {'// Blog Posts'}
          </div>
          <div className="mb-4 flex items-center gap-3">
            <Rss className="h-8 w-8 text-[#0082c4] md:h-10 md:w-10" />
            <h1 className="text-4xl font-bold text-[#0082c4] sm:text-5xl md:text-6xl">
              My Blog
            </h1>
          </div>
          <p className="max-w-2xl text-base text-[#64748b] sm:text-lg dark:text-[#cbd5e1]">
            Thoughts, tutorials, and insights on web development, design, and
            technology.
          </p>
        </motion.div>

        {/* Blog Grid */}
        {publishedBlogs.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col items-center justify-center py-24"
          >
            <BookOpen className="mb-6 h-16 w-16 text-[#0082c4] opacity-50" />
            <h2 className="mb-2 text-2xl font-bold text-[#64748b] dark:text-[#cbd5e1]">
              No Blogs Yet
            </h2>
            <p className="text-[#64748b] dark:text-[#cbd5e1]">
              Stay tuned — articles are coming soon!
            </p>
          </motion.div>
        ) : (
          <>
            <div className="mb-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {paginatedBlogs.map((blog, index) => (
                <motion.div
                  key={blog._id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.15 + index * 0.08 }}
                >
                  <Link href={`/blogs/${blog._id}`} className="group block">
                    <div className="overflow-hidden rounded-2xl border border-[#0082c4]/20 bg-[#f2f2f2] shadow-lg transition-all duration-300 hover:-translate-y-2 hover:border-[#0082c4] hover:shadow-xl hover:shadow-[#0082c4]/20 dark:bg-[#11141c]">
                      {/* Cover Image */}
                      <div className="relative aspect-[16/9] w-full overflow-hidden">
                        {blog.coverImage ? (
                          <Image
                            src={blog.coverImage}
                            alt={blog.title}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#0082c4]/20 to-[#0099e6]/20">
                            <BookOpen className="h-12 w-12 text-[#0082c4] opacity-40" />
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                        {/* Read Time Badge */}
                        <div className="absolute top-3 right-3 flex items-center gap-1.5 rounded-full bg-black/60 px-3 py-1 backdrop-blur-sm">
                          <Clock className="h-3.5 w-3.5 text-white" />
                          <span className="font-mono text-xs font-medium text-white">
                            {blog.readTime} min
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-5">
                        {/* Categories */}
                        {blog.categories && blog.categories.length > 0 && (
                          <div className="mb-3 flex flex-wrap gap-2">
                            {blog.categories.slice(0, 3).map((cat) => (
                              <span
                                key={cat}
                                className="rounded-full border border-[#0082c4]/30 bg-[#0082c4]/10 px-2.5 py-0.5 font-mono text-xs font-semibold text-[#0082c4]"
                              >
                                {cat}
                              </span>
                            ))}
                          </div>
                        )}

                        {/* Title */}
                        <h2 className="mb-3 line-clamp-2 text-lg font-bold text-slate-800 transition-colors group-hover:text-[#0082c4] dark:text-slate-100">
                          {blog.title}
                        </h2>

                        {/* Tags */}
                        {blog.tags && blog.tags.length > 0 && (
                          <div className="mb-4 flex flex-wrap gap-1.5">
                            {blog.tags.slice(0, 4).map((tag) => (
                              <span
                                key={tag}
                                className="inline-flex items-center gap-1 text-xs text-[#64748b] dark:text-[#94a3b8]"
                              >
                                <Tag className="h-3 w-3" />
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}

                        {/* Meta */}
                        <div className="flex items-center justify-between border-t border-[#0082c4]/10 pt-4 font-mono text-xs text-[#64748b] dark:text-[#94a3b8]">
                          <div className="flex items-center gap-1.5">
                            <Calendar className="h-3.5 w-3.5" />
                            <span>
                              {new Date(blog.createdAt).toLocaleDateString(
                                'en-US',
                                {
                                  month: 'short',
                                  day: 'numeric',
                                  year: 'numeric',
                                },
                              )}
                            </span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Eye className="h-3.5 w-3.5" />
                            <span>
                              {blog.views?.toLocaleString() || 0} views
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Read More bar */}
                      <div className="flex items-center justify-center gap-2 border-t border-[#0082c4]/10 py-3 font-mono text-sm font-semibold text-[#0082c4] opacity-0 transition-all duration-300 group-hover:opacity-100">
                        <span>Read Article</span>
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex items-center justify-center gap-2"
              >
                {/* Previous */}
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#0082c4]/20 bg-[#f2f2f2] text-[#64748b] transition-all hover:border-[#0082c4] hover:bg-[#0082c4]/10 hover:text-[#0082c4] disabled:cursor-not-allowed disabled:opacity-40 dark:bg-[#11141c] dark:text-[#cbd5e1]"
                  aria-label="Previous page"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>

                {/* Page Numbers */}
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`flex h-10 w-10 items-center justify-center rounded-lg font-mono text-sm font-semibold transition-all ${
                        currentPage === page
                          ? 'bg-[#0082c4] text-white shadow-lg shadow-[#0082c4]/30'
                          : 'border border-[#0082c4]/20 bg-[#f2f2f2] text-[#64748b] hover:border-[#0082c4] hover:bg-[#0082c4]/10 hover:text-[#0082c4] dark:bg-[#11141c] dark:text-[#cbd5e1]'
                      }`}
                    >
                      {page}
                    </button>
                  ),
                )}

                {/* Next */}
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#0082c4]/20 bg-[#f2f2f2] text-[#64748b] transition-all hover:border-[#0082c4] hover:bg-[#0082c4]/10 hover:text-[#0082c4] disabled:cursor-not-allowed disabled:opacity-40 dark:bg-[#11141c] dark:text-[#cbd5e1]"
                  aria-label="Next page"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </motion.div>
            )}
          </>
        )}

        {/* Bottom navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-20 text-center"
        >
          <div className="mb-4 font-mono text-sm text-[#64748b] dark:text-[#cbd5e1]">
            {'// Explore More'}
          </div>
          <Link
            href="/"
            className="group inline-flex items-center gap-2 rounded-lg border-2 border-[#0082c4] bg-transparent px-8 py-4 font-semibold text-[#0082c4] transition-all hover:scale-105 hover:bg-[#0082c4] hover:text-white hover:shadow-lg hover:shadow-[#0082c4]/30"
          >
            <ArrowLeft className="h-5 w-5 transition-transform group-hover:-translate-x-1" />
            Back to Home
          </Link>
        </motion.div>

        <div className="mt-12 font-mono text-sm text-[#64748b] dark:text-[#cbd5e1]">
          <span className="text-[#0082c4]">{'</section>'}</span>
        </div>
      </div>
    </div>
  );
}
