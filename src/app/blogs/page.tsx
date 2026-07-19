'use client';

import LoadingPage from '@/components/shared/LoadingPage';
import { getProjects } from '@/lib/getApi';
import { useQuery } from '@tanstack/react-query';
import { ArrowLeft, Link } from 'lucide-react';
import { Project } from 'next/dist/build/swc/types';

export default function Page() {
  // Fetch project data
  const {
    data: project,
    isLoading: isLoadingProject,
    error,
  } = useQuery<Project>({
    queryKey: ['projects'],
    queryFn: () => getProjects(),
  });
  console.log(project);

  if (isLoadingProject) {
    return <LoadingPage />;
  }

  if (error || !project) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white dark:bg-black">
        <div className="text-center">
          <h1 className="mb-4 text-4xl font-bold text-slate-800 dark:text-slate-100">
            Blogs Not Found
          </h1>
          <p className="mb-8 text-slate-600 dark:text-slate-400">
            Blogs you&apos;re looking for doesn&apos;t exist or has been
            removed.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-lg bg-[#0082c4] px-6 py-3 font-semibold text-white transition-all hover:bg-[#0099e6]"
          >
            <ArrowLeft className="h-5 w-5" />
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return <div></div>;
}
