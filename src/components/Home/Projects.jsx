'use client';

import { getProjects } from '@/lib/getProjects';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import React from 'react';
import { FaCheck, FaEye, FaLink } from 'react-icons/fa';
import LoadingPage from '../Shared/LoadingPage';

const loadProjects = async () => {
  return await getProjects();
};

const Projects = () => {
  const {
    data: projects,
    isLoading,
    isError,
  } = useQuery({ queryKey: ['projects'], queryFn: loadProjects });

  if (isLoading) {
    return <LoadingPage />;
  }

  if (isError) {
    return <div>Failed to load projects. Please try again later.</div>;
  }

  // Sort projects by priority (highest priority first)
  const sortedProjects = projects
    ? [...projects].sort((a, b) => b.priority - a.priority)
    : [];

  return (
    <div
      id="projects"
      className="mt-5 flex flex-col items-center rounded-xl bg-gray-200 p-5 dark:bg-background dark:text-white"
    >
      <h1 className="mb-5 bg-gradient-to-r from-blue-400 to-blue-500 bg-clip-text text-2xl font-bold uppercase text-transparent lg:text-3xl">
        Projects
      </h1>
      <div className="grid grid-cols-1 items-center justify-center gap-5 lg:grid-cols-3">
        {sortedProjects.map((project) => (
          <div
            key={project._id}
            className="card h-full w-full overflow-hidden border-2 border-transparent bg-base-100 shadow-xl transition-all duration-300 hover:scale-[1.02] hover:border-blue-400 hover:shadow-[0_0_30px_rgba(127,72,230,0.2)] dark:bg-primary"
          >
            <div className="card-content p-6 text-black dark:text-white">
              <div className="mb-4">
                <h2 className="truncate text-2xl font-bold">{project.name}</h2>
                <p className="pt-2 text-xl">{project.type}</p>
                <span className="rounded-full bg-green-500/20 px-2 py-0.5 text-xs font-medium dark:text-green-300/90">
                  {project.status}
                </span>
              </div>
              <div className="mb-4">
                <h3 className="mb-2 text-sm font-semibold">Description</h3>
                <p className="text-sm">{project.description}</p>
              </div>
              <div className="mb-4">
                <h3 className="mb-2 text-sm font-semibold">Key Features</h3>
                <ul className="space-y-1 text-sm">
                  {project.keyFeatures.map((keyFeature, index) => (
                    <li key={index} className="flex items-start">
                      <FaCheck className="mr-2 mt-0.5" />
                      <span className="truncate">{keyFeature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mb-4">
                <h3 className="mb-2 text-sm font-semibold">
                  Technologies & Tools
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((technology, index) => (
                    <span
                      key={index}
                      className="rounded-full bg-gray-300 px-2 py-1 text-xs font-medium dark:bg-gray-700"
                    >
                      {technology}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-between gap-5">
                <Link
                  href={project.sourceCode}
                  target="_blank"
                  className="btn flex flex-1 items-center justify-center gap-2 rounded-lg border-none bg-gray-200 px-3 py-0 text-sm font-medium hover:bg-gray-300 dark:bg-[#004E76] dark:text-white dark:hover:bg-[#004A99]"
                >
                  <FaLink />
                  <span>Source</span>
                </Link>
                <Link
                  href={project.link}
                  target="_blank"
                  className="btn flex flex-1 items-center justify-center gap-2 rounded-lg border-none bg-gray-200 px-3 py-0 text-sm font-medium hover:bg-gray-300 dark:bg-[#004E76] dark:text-white dark:hover:bg-[#004A99]"
                >
                  <FaEye />
                  <span>Visit</span>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
