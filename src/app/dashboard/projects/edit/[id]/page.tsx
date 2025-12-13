'use client';

import { useSession } from 'next-auth/react';
import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
  ArrowLeft,
  Upload,
  X,
  Plus,
  Loader2,
  Star,
  Link as LinkIcon,
  Calendar,
  Briefcase,
  Save,
  TrendingUp,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { getProjectsById } from '@/lib/getApi';
import axios from 'axios';
import { Project } from '@/types';

export default function EditProjectPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [mounted, setMounted] = useState(false);
  const [technologyInput, setTechnologyInput] = useState('');
  const [featureInput, setFeatureInput] = useState('');
  const [imageUrlInput, setImageUrlInput] = useState('');
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [uploadMethod, setUploadMethod] = useState<'url' | 'upload'>('upload');
  const [isUploading, setIsUploading] = useState(false);
  const [formData, setFormData] = useState<Omit<Project, '_id'>>({
    title: '',
    slug: '',
    description: '',
    image: [],
    category: 'Web Apps',
    type: 'personal',
    date: '',
    role: '',
    technologies: [],
    features: [],
    liveUrl: '',
    githubUrl: '',
    featured: false,
    currentlyWorking: false,
    priority: 0,
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
    }
  }, [status, router]);

  // Fetch project data
  const { data: project, isLoading: isLoadingProject } = useQuery({
    queryKey: ['project', id],
    queryFn: () => getProjectsById(id),
    enabled: !!id && status === 'authenticated',
  });

  // Populate form when project data is loaded
  useEffect(() => {
    if (project) {
      setFormData({
        title: project.title || '',
        slug: project.slug || '',
        description: project.description || '',
        image: project.image || [],
        category: project.category || 'Web Apps',
        type: project.type || 'personal',
        date: project.date || '',
        role: project.role || '',
        technologies: project.technologies || [],
        features: project.features || [],
        liveUrl: project.liveUrl || '',
        githubUrl: project.githubUrl || '',
        featured: project.featured || false,
        currentlyWorking: project.currentlyWorking || false,
        priority: project.priority || 0,
      });
      setImagePreviews(project.image || []);
    }
  }, [project]);

  // Auto-generate slug from title when title changes (only if manually cleared)
  useEffect(() => {
    if (formData.title && !formData.slug) {
      const slug = formData.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
      setFormData((prev) => ({ ...prev, slug }));
    }
  }, [formData.title, formData.slug]);

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

    for (const file of Array.from(files)) {
      if (!file.type.startsWith('image/')) {
        alert('Please select only image files');
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        alert('Each image should be less than 5MB');
        return;
      }
    }

    try {
      setIsUploading(true);
      const uploadedUrls: string[] = [];

      for (const file of Array.from(files)) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreviews((prev) => [...prev, reader.result as string]);
        };
        reader.readAsDataURL(file);
        const imageUrl = await uploadToImgBB(file);
        uploadedUrls.push(imageUrl);
      }

      setFormData((prev) => ({
        ...prev,
        image: [...prev.image, ...uploadedUrls],
      }));
      setIsUploading(false);
    } catch (error) {
      alert('Failed to upload images. Please try again.');
      setIsUploading(false);
    }
  };

  const handleAddImageUrl = () => {
    if (imageUrlInput.trim()) {
      setFormData((prev) => ({
        ...prev,
        image: [...prev.image, imageUrlInput.trim()],
      }));
      setImagePreviews((prev) => [...prev, imageUrlInput.trim()]);
      setImageUrlInput('');
    }
  };

  const handleRemoveImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      image: prev.image.filter((_, i) => i !== index),
    }));
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  // Update project mutation
  const updateProjectMutation = useMutation({
    mutationFn: async (data: Omit<Project, '_id'>) => {
      const response = await axios.put(`/api/v1/projects/update/${id}`, data);
      return response.data;
    },
    onSuccess: () => {
      router.push('/dashboard/projects');
    },
    onError: (error: any) => {
      alert(
        error?.response?.data?.message ||
          'Failed to update project. Please try again.',
      );
    },
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value, type } = e.target;

    if (name === 'type') {
      // Ensure type is one of the valid union types
      const validTypes: Array<
        'personal' | 'client' | 'open-source' | 'freelance'
      > = ['personal', 'client', 'open-source', 'freelance'];
      if (validTypes.includes(value as any)) {
        setFormData((prev) => ({
          ...prev,
          [name]: value as 'personal' | 'client' | 'open-source' | 'freelance',
        }));
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === 'number' ? parseInt(value) || 0 : value,
      }));
    }
  };

  const handleAddItem = (
    key: 'technologies' | 'features',
    value: string,
    setValue: (val: string) => void,
  ) => {
    if (value.trim() && !formData[key].includes(value.trim())) {
      setFormData((prev) => ({ ...prev, [key]: [...prev[key], value.trim()] }));
      setValue('');
    }
  };

  const handleRemoveItem = (key: 'technologies' | 'features', item: string) => {
    setFormData((prev) => ({
      ...prev,
      [key]: prev[key].filter((i) => i !== item),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !formData.title.trim() ||
      !formData.description.trim() ||
      formData.image.length === 0 ||
      !formData.role.trim() ||
      formData.technologies.length === 0 ||
      formData.features.length === 0
    ) {
      alert('Please fill all required fields');
      return;
    }
    updateProjectMutation.mutate(formData);
  };

  if (!mounted || status === 'loading' || isLoadingProject) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white dark:bg-black">
        <div className="flex flex-col items-center gap-4">
          <div className="h-16 w-16 animate-spin rounded-full border-4 border-[#0082c4] border-t-transparent" />
          <p className="text-lg font-semibold text-[#0082c4]">
            Loading project...
          </p>
        </div>
      </div>
    );
  }

  if (status === 'unauthenticated') return null;

  if (!project) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white dark:bg-black">
        <div className="text-center">
          <p className="text-xl font-semibold text-red-500">
            Project not found
          </p>
          <Link href="/dashboard/projects">
            <button className="mt-4 rounded-lg bg-[#0082c4] px-4 py-2 text-white hover:bg-[#0099e6]">
              Back to Projects
            </button>
          </Link>
        </div>
      </div>
    );
  }

  const categories = [
    'Web Apps',
    'UI/UX',
    'Open Source',
    'Mobile Apps',
    'API',
    'Desktop Apps',
  ];
  const projectTypes: Array<
    'personal' | 'client' | 'open-source' | 'freelance'
  > = ['personal', 'client', 'open-source', 'freelance'];

  return (
    <div className="min-h-screen bg-white pt-24 pb-12 dark:bg-black">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/dashboard/projects">
            <motion.button
              whileHover={{ x: -5 }}
              className="mb-4 flex items-center gap-2 text-[#64748b] hover:text-[#0082c4] dark:text-[#cbd5e1]"
            >
              <ArrowLeft className="h-5 w-5" />
              Back to Projects
            </motion.button>
          </Link>
          <h1 className="text-3xl font-bold text-[#0082c4] md:text-4xl">
            Edit Project
          </h1>
          <p className="mt-2 text-[#64748b] dark:text-[#cbd5e1]">
            Update your project details
          </p>
        </div>

        {/* Form */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleSubmit}
          className="space-y-6 rounded-xl border-2 border-[#e2e8f0] bg-[#f2f2f2] p-6 md:p-8 dark:border-[#27273a] dark:bg-[#11141c]"
        >
          {/* Title */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-black dark:text-white">
              Project Title *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Full-Stack E-Commerce Solution"
              className="w-full rounded-lg border border-[#e2e8f0] bg-white px-4 py-3 text-black focus:border-[#0082c4] focus:ring-2 focus:ring-[#0082c4]/20 focus:outline-none dark:border-[#27273a] dark:bg-black dark:text-white"
              required
            />
          </div>

          {/* Slug */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-black dark:text-white">
              URL Slug *
            </label>
            <input
              type="text"
              name="slug"
              value={formData.slug}
              onChange={handleInputChange}
              placeholder="full-stack-ecommerce-solution"
              className="w-full rounded-lg border border-[#e2e8f0] bg-white px-4 py-3 text-black focus:border-[#0082c4] focus:ring-2 focus:ring-[#0082c4]/20 focus:outline-none dark:border-[#27273a] dark:bg-black dark:text-white"
              required
            />
            <p className="mt-1 text-xs text-[#64748b] dark:text-[#cbd5e1]">
              URL-friendly version of the title. Auto-generated if left empty.
            </p>
          </div>

          {/* Description */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-black dark:text-white">
              Description *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={4}
              placeholder="Describe your project in detail..."
              className="w-full rounded-lg border border-[#e2e8f0] bg-white px-4 py-3 text-black focus:border-[#0082c4] focus:ring-2 focus:ring-[#0082c4]/20 focus:outline-none dark:border-[#27273a] dark:bg-black dark:text-white"
              required
            />
          </div>

          {/* Category & Type */}
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-semibold text-black dark:text-white">
                Category *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full rounded-lg border border-[#e2e8f0] bg-white px-4 py-3 text-black focus:border-[#0082c4] focus:outline-none dark:border-[#27273a] dark:bg-black dark:text-white"
                required
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-black dark:text-white">
                Type *
              </label>
              <select
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                className="w-full rounded-lg border border-[#e2e8f0] bg-white px-4 py-3 text-black focus:border-[#0082c4] focus:outline-none dark:border-[#27273a] dark:bg-black dark:text-white"
                required
              >
                {projectTypes.map((type) => (
                  <option key={type} value={type}>
                    {type.charAt(0).toUpperCase() +
                      type.slice(1).replace('-', ' ')}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Date, Role & Priority */}
          <div className="grid gap-6 md:grid-cols-3">
            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-black dark:text-white">
                <Calendar className="h-4 w-4 text-[#0082c4]" />
                Date *
              </label>
              <input
                type="text"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                placeholder="June 2024"
                className="w-full rounded-lg border border-[#e2e8f0] bg-white px-4 py-3 text-black focus:border-[#0082c4] focus:outline-none dark:border-[#27273a] dark:bg-black dark:text-white"
                required
              />
            </div>
            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-black dark:text-white">
                <Briefcase className="h-4 w-4 text-[#0082c4]" />
                Role *
              </label>
              <input
                type="text"
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                placeholder="Full-Stack Developer"
                className="w-full rounded-lg border border-[#e2e8f0] bg-white px-4 py-3 text-black focus:border-[#0082c4] focus:outline-none dark:border-[#27273a] dark:bg-black dark:text-white"
                required
              />
            </div>
            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-black dark:text-white">
                <TrendingUp className="h-4 w-4 text-[#0082c4]" />
                Priority
              </label>
              <input
                type="number"
                name="priority"
                value={formData.priority}
                onChange={handleInputChange}
                min="0"
                placeholder="0"
                className="w-full rounded-lg border border-[#e2e8f0] bg-white px-4 py-3 text-black focus:border-[#0082c4] focus:outline-none dark:border-[#27273a] dark:bg-black dark:text-white"
              />
              <p className="mt-1 text-xs text-[#64748b] dark:text-[#cbd5e1]">
                Higher number = Higher priority
              </p>
            </div>
          </div>

          {/* Images */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-black dark:text-white">
              Images * (Multiple)
            </label>
            <div className="mb-4 flex gap-2">
              <button
                type="button"
                onClick={() => setUploadMethod('upload')}
                className={`flex-1 rounded-lg px-4 py-3 transition-all ${
                  uploadMethod === 'upload'
                    ? 'bg-[#0082c4] text-white'
                    : 'border border-[#e2e8f0] text-[#64748b] hover:border-[#0082c4] dark:border-[#27273a] dark:text-[#cbd5e1]'
                }`}
              >
                <Upload className="mx-auto h-5 w-5" />
                <span className="mt-1 block text-xs">Upload</span>
              </button>
              <button
                type="button"
                onClick={() => setUploadMethod('url')}
                className={`flex-1 rounded-lg px-4 py-3 transition-all ${
                  uploadMethod === 'url'
                    ? 'bg-[#0082c4] text-white'
                    : 'border border-[#e2e8f0] text-[#64748b] hover:border-[#0082c4] dark:border-[#27273a] dark:text-[#cbd5e1]'
                }`}
              >
                <LinkIcon className="mx-auto h-5 w-5" />
                <span className="mt-1 block text-xs">URL</span>
              </button>
            </div>

            {uploadMethod === 'upload' ? (
              <>
                <input
                  ref={fileInputRef}
                  type="file"
                  onChange={handleFileSelect}
                  accept="image/*"
                  multiple
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploading}
                  className="w-full rounded-lg border-2 border-dashed border-[#e2e8f0] bg-white p-8 transition-all hover:border-[#0082c4] disabled:opacity-50 dark:border-[#27273a] dark:bg-black"
                >
                  {isUploading ? (
                    <Loader2 className="mx-auto h-12 w-12 animate-spin text-[#0082c4]" />
                  ) : (
                    <>
                      <Upload className="mx-auto h-12 w-12 text-[#64748b]" />
                      <p className="mt-2 text-sm text-[#64748b] dark:text-[#cbd5e1]">
                        Click to upload images (max 5MB each)
                      </p>
                    </>
                  )}
                </button>
              </>
            ) : (
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
                  className="flex-1 rounded-lg border border-[#e2e8f0] bg-white px-4 py-3 text-black focus:border-[#0082c4] focus:outline-none dark:border-[#27273a] dark:bg-black dark:text-white"
                />
                <button
                  type="button"
                  onClick={handleAddImageUrl}
                  className="rounded-lg bg-[#0082c4] px-4 py-3 text-white transition-colors hover:bg-[#0099e6]"
                >
                  <Plus className="h-5 w-5" />
                </button>
              </div>
            )}

            {imagePreviews.length > 0 && (
              <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-3">
                {imagePreviews.map((preview, index) => (
                  <div key={index} className="group relative">
                    <div className="relative h-32 w-full overflow-hidden rounded-lg border-2 border-[#e2e8f0] dark:border-[#27273a]">
                      <Image
                        src={preview}
                        alt={`Preview ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(index)}
                      className="absolute -top-2 -right-2 rounded-full bg-red-500 p-1.5 text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100"
                    >
                      <X className="h-4 w-4" />
                    </button>
                    {index === 0 && (
                      <span className="absolute bottom-2 left-2 rounded bg-[#0082c4] px-2 py-1 text-xs font-semibold text-white">
                        Primary
                      </span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Technologies */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-black dark:text-white">
              Technologies *
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={technologyInput}
                onChange={(e) => setTechnologyInput(e.target.value)}
                onKeyDown={(e) =>
                  e.key === 'Enter' &&
                  (e.preventDefault(),
                  handleAddItem(
                    'technologies',
                    technologyInput,
                    setTechnologyInput,
                  ))
                }
                placeholder="Next.js, TypeScript..."
                className="flex-1 rounded-lg border border-[#e2e8f0] bg-white px-4 py-3 text-black focus:border-[#0082c4] focus:outline-none dark:border-[#27273a] dark:bg-black dark:text-white"
              />
              <button
                type="button"
                onClick={() =>
                  handleAddItem(
                    'technologies',
                    technologyInput,
                    setTechnologyInput,
                  )
                }
                className="rounded-lg bg-[#0082c4] px-4 py-3 text-white transition-colors hover:bg-[#0099e6]"
              >
                <Plus className="h-5 w-5" />
              </button>
            </div>
            {formData.technologies.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {formData.technologies.map((tech, index) => (
                  <span
                    key={`${tech}-${index}`}
                    className="flex items-center gap-2 rounded-lg bg-[#0082c4]/10 px-3 py-1.5 text-sm font-medium text-[#0082c4]"
                  >
                    {tech}
                    <button
                      type="button"
                      onClick={() => handleRemoveItem('technologies', tech)}
                      className="transition-colors hover:text-red-500"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Features */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-black dark:text-white">
              Features *
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={featureInput}
                onChange={(e) => setFeatureInput(e.target.value)}
                onKeyDown={(e) =>
                  e.key === 'Enter' &&
                  (e.preventDefault(),
                  handleAddItem('features', featureInput, setFeatureInput))
                }
                placeholder="Real-time updates..."
                className="flex-1 rounded-lg border border-[#e2e8f0] bg-white px-4 py-3 text-black focus:border-[#0082c4] focus:outline-none dark:border-[#27273a] dark:bg-black dark:text-white"
              />
              <button
                type="button"
                onClick={() =>
                  handleAddItem('features', featureInput, setFeatureInput)
                }
                className="rounded-lg bg-[#0082c4] px-4 py-3 text-white transition-colors hover:bg-[#0099e6]"
              >
                <Plus className="h-5 w-5" />
              </button>
            </div>
            {formData.features.length > 0 && (
              <div className="mt-3 space-y-2">
                {formData.features.map((feature, index) => (
                  <div
                    key={`${feature}-${index}`}
                    className="flex items-center justify-between rounded-lg border border-[#e2e8f0] bg-white px-4 py-3 dark:border-[#27273a] dark:bg-black"
                  >
                    <span className="text-sm text-black dark:text-white">
                      {index + 1}. {feature}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleRemoveItem('features', feature)}
                      className="text-[#64748b] transition-colors hover:text-red-500 dark:text-[#cbd5e1]"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* URLs */}
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-semibold text-black dark:text-white">
                Live URL
              </label>
              <input
                type="url"
                name="liveUrl"
                value={formData.liveUrl}
                onChange={handleInputChange}
                placeholder="https://example.com"
                className="w-full rounded-lg border border-[#e2e8f0] bg-white px-4 py-3 text-black focus:border-[#0082c4] focus:outline-none dark:border-[#27273a] dark:bg-black dark:text-white"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-black dark:text-white">
                GitHub URL
              </label>
              <input
                type="url"
                name="githubUrl"
                value={formData.githubUrl}
                onChange={handleInputChange}
                placeholder="https://github.com/username/repo"
                className="w-full rounded-lg border border-[#e2e8f0] bg-white px-4 py-3 text-black focus:border-[#0082c4] focus:outline-none dark:border-[#27273a] dark:bg-black dark:text-white"
              />
            </div>
          </div>

          {/* Checkboxes */}
          <div className="flex gap-6">
            <label className="flex cursor-pointer items-center gap-2">
              <input
                type="checkbox"
                checked={formData.featured}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    featured: e.target.checked,
                  }))
                }
                className="h-5 w-5 rounded text-[#0082c4]"
              />
              <Star className="h-5 w-5 text-[#0082c4]" />
              <span className="text-sm font-semibold text-black dark:text-white">
                Featured
              </span>
            </label>
            <label className="flex cursor-pointer items-center gap-2">
              <input
                type="checkbox"
                checked={formData.currentlyWorking}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    currentlyWorking: e.target.checked,
                  }))
                }
                className="h-5 w-5 rounded text-[#0082c4]"
              />
              <span className="text-sm font-semibold text-black dark:text-white">
                Currently Working
              </span>
            </label>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 pt-4">
            <Link href="/dashboard/projects" className="flex-1">
              <button
                type="button"
                className="w-full rounded-lg border-2 border-[#e2e8f0] px-6 py-3 font-semibold hover:bg-gray-100 dark:border-[#27273a] dark:hover:bg-gray-800"
              >
                Cancel
              </button>
            </Link>
            <button
              type="submit"
              disabled={updateProjectMutation.isPending || isUploading}
              className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-[#0082c4] px-6 py-3 font-semibold text-white hover:bg-[#0099e6] disabled:opacity-50"
            >
              {updateProjectMutation.isPending ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Updating...
                </>
              ) : (
                <>
                  <Save className="h-5 w-5" />
                  Update Project
                </>
              )}
            </button>
          </div>
        </motion.form>
      </div>
    </div>
  );
}
