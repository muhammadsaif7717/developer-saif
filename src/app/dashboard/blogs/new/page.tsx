'use client';

import { Blog } from '@/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Link as LinkIcon,
  Loader2,
  Plus,
  Upload,
  X,
} from 'lucide-react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

export default function NewBlogPage() {
  const { status } = useSession();
  const router = useRouter();
  const queryClient = useQueryClient();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [mounted, setMounted] = useState(false);
  const [categoryInput, setCategoryInput] = useState('');
  const [tagInput, setTagInput] = useState('');
  const [uploadMethod, setUploadMethod] = useState<'url' | 'upload'>('upload');
  const [isUploading, setIsUploading] = useState(false);
  const [imageUrlInput, setImageUrlInput] = useState('');

  const [formData, setFormData] = useState<
    Omit<Blog, '_id' | 'createdAt' | 'updatedAt' | 'views'>
  >({
    title: '',
    slug: '',
    content: '',
    coverImage: '',
    categories: [],
    tags: [],
    status: 'draft',
    readTime: 5,
  });

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/sign-in');
    }
  }, [status, router]);

  // Auto-generate slug from title
  useEffect(() => {
    if (formData.title) {
      const slug = formData.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFormData((prev) => ({ ...prev, slug }));
    }
  }, [formData.title]);

  const uploadToImgBB = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('image', file);
    const IMGBB_API_KEY =
      process.env.NEXT_PUBLIC_IMGBB_API_KEY || 'YOUR_API_KEY';
    const response = await fetch(
      `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`,
      { method: 'POST', body: formData },
    );
    if (!response.ok) throw new Error('Failed to upload image');
    const data = await response.json();
    return data.data.url;
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    if (!file.type.startsWith('image/')) {
      alert('Please select only image files');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      alert('Image should be less than 5MB');
      return;
    }

    try {
      setIsUploading(true);
      const imageUrl = await uploadToImgBB(file);
      setFormData((prev) => ({
        ...prev,
        coverImage: imageUrl,
      }));
      setIsUploading(false);
    } catch {
      alert('Failed to upload image. Please try again.');
      setIsUploading(false);
    }
  };

  const handleAddImageUrl = () => {
    if (imageUrlInput.trim()) {
      setFormData((prev) => ({
        ...prev,
        coverImage: imageUrlInput.trim(),
      }));
      setImageUrlInput('');
    }
  };

  const handleRemoveImage = () => {
    setFormData((prev) => ({
      ...prev,
      coverImage: '',
    }));
  };

  const createBlogMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      const response = await axios.post('/api/v1/blogs/post', data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
      router.push('/dashboard/blogs');
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      alert(
        error?.response?.data?.message ||
          'Failed to create blog. Please try again.',
      );
    },
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value, type } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'number' ? parseInt(value) || 0 : value,
    }));
  };

  const handleAddItem = (
    key: 'categories' | 'tags',
    value: string,
    setValue: (val: string) => void,
  ) => {
    if (value.trim() && !formData[key].includes(value.trim())) {
      setFormData((prev) => ({ ...prev, [key]: [...prev[key], value.trim()] }));
      setValue('');
    }
  };

  const handleRemoveItem = (key: 'categories' | 'tags', item: string) => {
    setFormData((prev) => ({
      ...prev,
      [key]: prev[key].filter((i) => i !== item),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !formData.title.trim() ||
      !formData.content.trim() ||
      !formData.coverImage ||
      formData.categories.length === 0 ||
      formData.tags.length === 0
    ) {
      alert('Please fill all required fields');
      return;
    }
    createBlogMutation.mutate(formData);
  };

  if (!mounted || status === 'loading') {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white dark:bg-black">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-[#0082c4] border-t-transparent" />
      </div>
    );
  }

  if (status === 'unauthenticated') return null;

  return (
    <div className="min-h-screen bg-white pt-24 pb-12 dark:bg-black">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link href="/dashboard/blogs">
            <motion.button
              whileHover={{ x: -5 }}
              className="mb-4 flex items-center gap-2 text-[#64748b] hover:text-[#0082c4] dark:text-[#cbd5e1]"
            >
              <ArrowLeft className="h-5 w-5" />
              Back to Blogs
            </motion.button>
          </Link>
          <h1 className="text-3xl font-bold text-[#0082c4] md:text-4xl">
            Add New Blog
          </h1>
          <p className="mt-2 text-[#64748b] dark:text-[#cbd5e1]">
            Create a new blog post
          </p>
        </div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleSubmit}
          className="space-y-4 rounded-xl border-2 border-[#e2e8f0] bg-[#f2f2f2] p-4 md:space-y-6 md:p-8 dark:border-[#27273a] dark:bg-[#11141c]"
        >
          {/* Title */}
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-black md:mb-2 md:text-sm dark:text-white">
              Blog Title *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="How to build a Next.js app"
              className="w-full rounded-lg border border-[#e2e8f0] bg-white p-2.5 text-sm text-black focus:border-[#0082c4] focus:ring-2 focus:ring-[#0082c4]/20 focus:outline-none md:px-4 md:py-3 md:text-base dark:border-[#27273a] dark:bg-black dark:text-white"
              required
            />
          </div>

          {/* Slug (Auto-generated, read-only display) */}
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-black md:mb-2 md:text-sm dark:text-white">
              Slug (Auto-generated)
            </label>
            <input
              type="text"
              name="slug"
              value={formData.slug}
              readOnly
              className="w-full rounded-lg border border-[#e2e8f0] bg-gray-100 p-2.5 text-sm text-[#64748b] md:px-4 md:py-3 md:text-base dark:border-[#27273a] dark:bg-[#1a1d27] dark:text-[#cbd5e1]"
            />
          </div>

          {/* Cover Image */}
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-black md:mb-2 md:text-sm dark:text-white">
              Cover Image *
            </label>
            <div className="mb-4 flex gap-2">
              <button
                type="button"
                onClick={() => setUploadMethod('upload')}
                className={`flex-1 rounded-lg px-3 py-2 transition-all md:px-4 md:py-3 ${uploadMethod === 'upload' ? 'bg-[#0082c4] text-white' : 'border border-[#e2e8f0] text-[#64748b] hover:border-[#0082c4] dark:border-[#27273a] dark:text-[#cbd5e1]'}`}
              >
                <Upload className="mx-auto h-4 w-4 md:h-5 md:w-5" />
                <span className="mt-1 block text-[10px] md:text-xs">
                  Upload
                </span>
              </button>
              <button
                type="button"
                onClick={() => setUploadMethod('url')}
                className={`flex-1 rounded-lg px-3 py-2 transition-all md:px-4 md:py-3 ${uploadMethod === 'url' ? 'bg-[#0082c4] text-white' : 'border border-[#e2e8f0] text-[#64748b] hover:border-[#0082c4] dark:border-[#27273a] dark:text-[#cbd5e1]'}`}
              >
                <LinkIcon className="mx-auto h-4 w-4 md:h-5 md:w-5" />
                <span className="mt-1 block text-[10px] md:text-xs">URL</span>
              </button>
            </div>

            {uploadMethod === 'upload' ? (
              <>
                <input
                  ref={fileInputRef}
                  type="file"
                  onChange={handleFileSelect}
                  accept="image/*"
                  className="hidden"
                />
                {!formData.coverImage && (
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isUploading}
                    className="w-full rounded-lg border-2 border-dashed border-[#e2e8f0] bg-white p-4 transition-all hover:border-[#0082c4] disabled:opacity-50 md:p-8 dark:border-[#27273a] dark:bg-black"
                  >
                    {isUploading ? (
                      <Loader2 className="mx-auto h-12 w-12 animate-spin text-[#0082c4]" />
                    ) : (
                      <>
                        <Upload className="mx-auto h-12 w-12 text-[#64748b]" />
                        <p className="mt-2 text-sm text-[#64748b] dark:text-[#cbd5e1]">
                          Click to upload image (max 5MB)
                        </p>
                      </>
                    )}
                  </button>
                )}
              </>
            ) : (
              !formData.coverImage && (
                <div className="flex gap-2">
                  <input
                    type="url"
                    value={imageUrlInput}
                    onChange={(e) => setImageUrlInput(e.target.value)}
                    onKeyDown={(e) =>
                      e.key === 'Enter' &&
                      (e.preventDefault(), handleAddImageUrl())
                    }
                    placeholder="https://example.com/image.jpg"
                    className="flex-1 rounded-lg border border-[#e2e8f0] bg-white p-2.5 text-sm text-black focus:border-[#0082c4] focus:outline-none md:px-4 md:py-3 md:text-base dark:border-[#27273a] dark:bg-black dark:text-white"
                  />
                  <button
                    type="button"
                    onClick={handleAddImageUrl}
                    className="rounded-lg bg-[#0082c4] px-4 py-2.5 text-white transition-colors hover:bg-[#0099e6] md:py-3"
                  >
                    <Plus className="h-5 w-5" />
                  </button>
                </div>
              )
            )}

            {formData.coverImage && (
              <div className="relative mt-4 h-48 w-full overflow-hidden rounded border border-[#e2e8f0] dark:border-[#27273a]">
                <Image
                  src={formData.coverImage}
                  alt="Cover Preview"
                  fill
                  className="object-cover"
                />
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="absolute top-2 right-2 rounded-full bg-red-500 p-1.5 text-white transition-colors hover:bg-red-600"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>

          {/* Content */}
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-black md:mb-2 md:text-sm dark:text-white">
              Content (Markdown/HTML) *
            </label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleInputChange}
              rows={10}
              placeholder="Write your blog content here..."
              className="w-full rounded-lg border border-[#e2e8f0] bg-white p-2.5 text-sm text-black focus:border-[#0082c4] focus:ring-2 focus:ring-[#0082c4]/20 focus:outline-none md:px-4 md:py-3 md:text-base dark:border-[#27273a] dark:bg-black dark:text-white"
              required
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2 md:gap-6">
            {/* Categories */}
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-black md:mb-2 md:text-sm dark:text-white">
                Categories *
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={categoryInput}
                  onChange={(e) => setCategoryInput(e.target.value)}
                  onKeyDown={(e) =>
                    e.key === 'Enter' &&
                    (e.preventDefault(),
                    handleAddItem(
                      'categories',
                      categoryInput,
                      setCategoryInput,
                    ))
                  }
                  placeholder="Technology..."
                  className="flex-1 rounded-lg border border-[#e2e8f0] bg-white p-2.5 text-sm text-black focus:border-[#0082c4] focus:outline-none md:px-4 md:py-3 md:text-base dark:border-[#27273a] dark:bg-black dark:text-white"
                />
                <button
                  type="button"
                  onClick={() =>
                    handleAddItem('categories', categoryInput, setCategoryInput)
                  }
                  className="rounded-lg bg-[#0082c4] px-4 py-2.5 text-white transition-colors hover:bg-[#0099e6] md:py-3"
                >
                  <Plus className="h-5 w-5" />
                </button>
              </div>
              {formData.categories.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {formData.categories.map((cat, index) => (
                    <span
                      key={`${cat}-${index}`}
                      className="flex items-center gap-2 rounded-lg bg-[#0082c4]/10 px-3 py-1.5 text-sm font-medium text-[#0082c4]"
                    >
                      {cat}
                      <button
                        type="button"
                        onClick={() => handleRemoveItem('categories', cat)}
                        className="transition-colors hover:text-red-500"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Tags */}
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-black md:mb-2 md:text-sm dark:text-white">
                Tags *
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={(e) =>
                    e.key === 'Enter' &&
                    (e.preventDefault(),
                    handleAddItem('tags', tagInput, setTagInput))
                  }
                  placeholder="React, Nextjs..."
                  className="flex-1 rounded-lg border border-[#e2e8f0] bg-white p-2.5 text-sm text-black focus:border-[#0082c4] focus:outline-none md:px-4 md:py-3 md:text-base dark:border-[#27273a] dark:bg-black dark:text-white"
                />
                <button
                  type="button"
                  onClick={() => handleAddItem('tags', tagInput, setTagInput)}
                  className="rounded-lg bg-[#0082c4] px-4 py-2.5 text-white transition-colors hover:bg-[#0099e6] md:py-3"
                >
                  <Plus className="h-5 w-5" />
                </button>
              </div>
              {formData.tags.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {formData.tags.map((tag, index) => (
                    <span
                      key={`${tag}-${index}`}
                      className="flex items-center gap-2 rounded-lg bg-[#0082c4]/10 px-3 py-1.5 text-sm font-medium text-[#0082c4]"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => handleRemoveItem('tags', tag)}
                        className="transition-colors hover:text-red-500"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 md:gap-6">
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-black md:mb-2 md:text-sm dark:text-white">
                Status *
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className="w-full rounded-lg border border-[#e2e8f0] bg-white p-2.5 text-sm text-black focus:border-[#0082c4] focus:outline-none md:px-4 md:py-3 md:text-base dark:border-[#27273a] dark:bg-black dark:text-white"
                required
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-black md:mb-2 md:text-sm dark:text-white">
                Read Time (minutes) *
              </label>
              <input
                type="number"
                name="readTime"
                value={formData.readTime}
                onChange={handleInputChange}
                min="1"
                className="w-full rounded-lg border border-[#e2e8f0] bg-white p-2.5 text-sm text-black focus:border-[#0082c4] focus:outline-none md:px-4 md:py-3 md:text-base dark:border-[#27273a] dark:bg-black dark:text-white"
                required
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 pt-4">
            <Link href="/dashboard/blogs" className="flex-1">
              <button
                type="button"
                className="w-full rounded-lg border-2 border-[#e2e8f0] px-4 py-2.5 text-sm font-semibold hover:bg-gray-100 md:px-6 md:py-3 md:text-base dark:border-[#27273a] dark:hover:bg-gray-800"
              >
                Cancel
              </button>
            </Link>
            <button
              type="submit"
              disabled={createBlogMutation.isPending || isUploading}
              className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-[#0082c4] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#0099e6] disabled:opacity-50 md:px-6 md:py-3 md:text-base"
            >
              {createBlogMutation.isPending ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin md:h-5 md:w-5" />{' '}
                  Creating...
                </>
              ) : (
                'Create Blog'
              )}
            </button>
          </div>
        </motion.form>
      </div>
    </div>
  );
}
