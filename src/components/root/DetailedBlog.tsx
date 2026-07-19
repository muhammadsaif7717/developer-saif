'use client';

import { getBlogById, incrementBlogViews } from '@/lib/getApi';
import { Blog } from '@/types';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowLeft,
  BookOpen,
  Calendar,
  Clock,
  Eye,
  Rss,
  Tag,
} from 'lucide-react';
import LoadingPage from '@/components/shared/LoadingPage';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github-dark.css';
import { useEffect, useRef } from 'react';

interface DetailedBlogProps {
  blogId: string;
}

export default function DetailedBlog({ blogId }: DetailedBlogProps) {
  const id = blogId;
  const hasIncrementedViews = useRef(false);

  const {
    data: blog,
    isLoading,
    error,
  } = useQuery<Blog>({
    queryKey: ['blog', id],
    queryFn: () => getBlogById(id),
  });

  // Increment view count once on mount
  useEffect(() => {
    if (id && !hasIncrementedViews.current) {
      hasIncrementedViews.current = true;
      incrementBlogViews(id);
    }
  }, [id]);

  if (isLoading) return <LoadingPage />;

  if (error || !blog) {
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
            Blog Not Found
          </h1>
          <p className="mb-8 text-[#64748b] dark:text-[#cbd5e1]">
            The blog you&apos;re looking for doesn&apos;t exist or has been
            removed.
          </p>
          <Link
            href="/blogs"
            className="group inline-flex items-center gap-2 rounded-lg border-2 border-[#0082c4] bg-[#0082c4] px-6 py-3 font-semibold text-white shadow-lg shadow-[#0082c4]/30 transition-all hover:bg-[#0099e6] hover:shadow-xl hover:shadow-[#0082c4]/40"
          >
            <ArrowLeft className="h-5 w-5 transition-transform group-hover:-translate-x-1" />
            Back to Blogs
          </Link>
        </div>
      </div>
    );
  }

  const formattedDate = new Date(blog.createdAt).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div className="relative min-h-screen overflow-hidden bg-white dark:bg-black">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,130,196,0.3)_1px,transparent_1px),linear-gradient(90deg,rgba(0,130,196,0.3)_1px,transparent_1px)] bg-[length:50px_50px] opacity-[0.03] dark:opacity-[0.08]" />
        <div className="absolute top-20 right-1/4 h-96 w-96 animate-pulse rounded-full bg-[#0082c4] opacity-20 blur-[120px] dark:opacity-10" />
        <div className="absolute bottom-20 left-1/4 h-96 w-96 animate-pulse rounded-full bg-[#0099e6] opacity-20 blur-[120px] [animation-delay:1s] dark:opacity-10" />
        <div className="absolute top-[20%] left-[10%] animate-bounce font-mono text-xs text-[#0082c4] opacity-30 [animation-duration:15s] dark:opacity-40">
          {'const article = {}'}
        </div>
        <div className="absolute top-[35%] right-[15%] animate-bounce font-mono text-xs text-[#0082c4] opacity-30 [animation-delay:0.5s] [animation-duration:17s] dark:opacity-40">
          {'// Reading mode'}
        </div>
        <div className="absolute bottom-[30%] left-[20%] animate-bounce font-mono text-xs text-[#0082c4] opacity-30 [animation-delay:1s] [animation-duration:19s] dark:opacity-40">
          {'export default'}
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Code comment */}
        <div className="mb-4 font-mono text-sm text-[#64748b] dark:text-[#cbd5e1]">
          <span className="text-[#0082c4]">
            {'<article id="blog-detail">'}
          </span>
        </div>

        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link
            href="/blogs"
            className="group mb-8 inline-flex items-center gap-2 rounded-lg border border-[#0082c4]/20 bg-[#f2f2f2] px-4 py-2 font-medium text-[#64748b] transition-all hover:border-[#0082c4] hover:bg-[#0082c4]/10 hover:text-[#0082c4] dark:bg-[#11141c] dark:text-[#cbd5e1]"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            <span className="font-mono text-sm">{'<- Back to Blogs'}</span>
          </Link>
        </motion.div>

        {/* Hero Cover Image */}
        {blog.coverImage && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-10"
          >
            <div className="group relative overflow-hidden rounded-2xl border-2 border-[#0082c4]/20 shadow-lg">
              <div className="relative aspect-[21/9] w-full">
                <Image
                  src={blog.coverImage}
                  alt={blog.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 90vw"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              </div>
            </div>
          </motion.div>
        )}

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-10"
        >
          {/* Categories */}
          {blog.categories && blog.categories.length > 0 && (
            <div className="mb-4 flex flex-wrap items-center gap-2">
              {blog.categories.map((cat) => (
                <span
                  key={cat}
                  className="inline-flex items-center gap-2 rounded-full border border-[#0082c4]/30 bg-[#0082c4]/10 px-4 py-1.5"
                >
                  <Rss className="h-3.5 w-3.5 text-[#0082c4]" />
                  <span className="font-mono text-sm font-semibold text-[#0082c4]">
                    {cat}
                  </span>
                </span>
              ))}
            </div>
          )}

          <h1 className="mb-6 text-3xl font-bold text-[#0082c4] sm:text-4xl md:text-5xl lg:text-6xl">
            {blog.title}
          </h1>

          {/* Meta info */}
          <div className="flex flex-wrap gap-6 font-mono text-sm text-[#64748b] dark:text-[#cbd5e1]">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-[#0082c4]" />
              <span>{formattedDate}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-[#0082c4]" />
              <span>{blog.readTime} min read</span>
            </div>
            <div className="flex items-center gap-2">
              <Eye className="h-5 w-5 text-[#0082c4]" />
              <span>{blog.views?.toLocaleString() || 0} views</span>
            </div>
          </div>
        </motion.div>

        {/* Content Grid */}
        <div className="grid gap-12 lg:grid-cols-3">
          {/* Main Content — Markdown */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-2"
          >
            <div className="mb-4 font-mono text-sm text-[#0082c4]">
              {'// Article Content'}
            </div>
            <div className="rounded-2xl border border-[#0082c4]/20 bg-[#f2f2f2] p-6 shadow-lg sm:p-8 md:p-10 dark:bg-[#11141c]">
              <article className="prose prose-slate max-w-none dark:prose-invert prose-headings:text-[#0082c4] prose-a:text-[#0082c4] prose-a:no-underline hover:prose-a:underline prose-strong:text-slate-800 dark:prose-strong:text-slate-200 prose-code:rounded prose-code:bg-slate-200 prose-code:px-1.5 prose-code:py-0.5 prose-code:font-mono prose-code:text-sm prose-code:before:content-[''] prose-code:after:content-[''] dark:prose-code:bg-slate-800 prose-pre:rounded-xl prose-pre:border prose-pre:border-[#0082c4]/20 prose-pre:bg-[#0d1117] prose-img:rounded-xl prose-img:border prose-img:border-[#0082c4]/20">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeHighlight]}
                >
                  {blog.content}
                </ReactMarkdown>
              </article>
            </div>
          </motion.div>

          {/* Sidebar */}
          <motion.aside
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-1"
          >
            <div className="sticky top-24 space-y-6">
              {/* Blog Info Card */}
              <div className="rounded-2xl border border-[#0082c4]/20 bg-[#f2f2f2] p-6 shadow-lg dark:bg-[#11141c]">
                <div className="mb-4 font-mono text-sm text-[#0082c4]">
                  {'// Blog Info'}
                </div>
                <h3 className="mb-4 text-lg font-bold text-[#0082c4]">
                  Details
                </h3>
                <dl className="space-y-4">
                  <div>
                    <dt className="mb-1 font-mono text-xs text-[#64748b] dark:text-[#cbd5e1]">
                      Published:
                    </dt>
                    <dd className="font-mono text-sm text-[#64748b] dark:text-[#cbd5e1]">
                      {formattedDate}
                    </dd>
                  </div>
                  <div>
                    <dt className="mb-1 font-mono text-xs text-[#64748b] dark:text-[#cbd5e1]">
                      Read Time:
                    </dt>
                    <dd className="flex items-center gap-2 font-semibold text-[#0082c4]">
                      <Clock className="h-4 w-4" />
                      {blog.readTime} min
                    </dd>
                  </div>
                  <div>
                    <dt className="mb-1 font-mono text-xs text-[#64748b] dark:text-[#cbd5e1]">
                      Views:
                    </dt>
                    <dd className="flex items-center gap-2 font-semibold text-[#0082c4]">
                      <Eye className="h-4 w-4" />
                      {blog.views?.toLocaleString() || 0}
                    </dd>
                  </div>
                </dl>
              </div>

              {/* Categories Card */}
              {blog.categories && blog.categories.length > 0 && (
                <div className="rounded-2xl border border-[#0082c4]/20 bg-[#f2f2f2] p-6 shadow-lg dark:bg-[#11141c]">
                  <div className="mb-4 font-mono text-sm text-[#0082c4]">
                    {'// Categories'}
                  </div>
                  <h3 className="mb-4 text-lg font-bold text-[#0082c4]">
                    Categories
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {blog.categories.map((cat) => (
                      <span
                        key={cat}
                        className="rounded-lg border border-[#0082c4]/30 bg-[#0082c4]/10 px-3 py-1.5 font-mono text-xs font-semibold text-[#0082c4]"
                      >
                        {cat}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Tags Card */}
              {blog.tags && blog.tags.length > 0 && (
                <div className="rounded-2xl border border-[#0082c4]/20 bg-[#f2f2f2] p-6 shadow-lg dark:bg-[#11141c]">
                  <div className="mb-4 font-mono text-sm text-[#0082c4]">
                    {'// Tags'}
                  </div>
                  <h3 className="mb-4 text-lg font-bold text-[#0082c4]">
                    Tags
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {blog.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-[#0082c4]/20 bg-[#f2f2f2] px-3 py-1.5 font-mono text-xs text-[#64748b] transition-all hover:border-[#0082c4] hover:text-[#0082c4] dark:bg-[#1a1a2e] dark:text-[#94a3b8]"
                      >
                        <Tag className="h-3 w-3" />
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* CTA Card */}
              <div className="rounded-2xl border border-[#0082c4]/30 bg-gradient-to-br from-[#0082c4]/10 to-[#0099e6]/10 p-6">
                <div className="mb-2 flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-[#0082c4]" />
                  <h3 className="font-mono text-sm font-bold text-[#0082c4]">
                    More Articles
                  </h3>
                </div>
                <p className="mb-4 text-sm text-[#64748b] dark:text-[#cbd5e1]">
                  Explore more articles and tutorials!
                </p>
                <Link
                  href="/blogs"
                  className="group inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#0082c4] px-4 py-2 font-semibold text-white transition-all hover:bg-[#0099e6] hover:shadow-lg hover:shadow-[#0082c4]/30"
                >
                  <span>Browse All Blogs</span>
                  <Rss className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </motion.aside>
        </div>

        {/* Bottom nav */}
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
            href="/blogs"
            className="group inline-flex items-center gap-2 rounded-lg border-2 border-[#0082c4] bg-transparent px-8 py-4 font-semibold text-[#0082c4] transition-all hover:scale-105 hover:bg-[#0082c4] hover:text-white hover:shadow-lg hover:shadow-[#0082c4]/30"
          >
            <ArrowLeft className="h-5 w-5 transition-transform group-hover:-translate-x-1" />
            View All Blogs
          </Link>
        </motion.div>

        <div className="mt-12 font-mono text-sm text-[#64748b] dark:text-[#cbd5e1]">
          <span className="text-[#0082c4]">{'</article>'}</span>
        </div>
      </div>
    </div>
  );
}
