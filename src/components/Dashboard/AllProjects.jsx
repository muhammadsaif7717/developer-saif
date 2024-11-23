'use client';
import { getProjects } from '@/lib/getProjects';
import { getURL } from '@/lib/getURL';
import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { FaCheck, FaEdit, FaEye, FaLink } from 'react-icons/fa';
import { RiDeleteBin2Fill } from 'react-icons/ri';
import Swal from 'sweetalert2';

const AllProjects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const loadProjects = async () => {
      const res = await getProjects();
      setProjects(res);
    };
    loadProjects();
  }, []);

  const handleDelete = async (id) => {
    const deleteNow = async () => {
      try {
        const url = await getURL();
        const res = await axios.delete(`${url}/api/delete-project/${id}`);
        if (res.data.res.deletedCount > 0) {
          Swal.fire({
            title: 'Deleted!',
            text: 'Your file has been deleted.',
            icon: 'success',
            showConfirmButton: false,
            timer: 1500,
          });
        }
        setTimeout(() => {
          window.location.reload();
        }, 1600);
      } catch (error) {
        console.log(error);
      }
    };

    try {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
      });

      if (result.isConfirmed) {
        await deleteNow();
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Sort projects by priority (descending order, highest priority first)
  const sortedProjects = projects?.sort((a, b) => a.priority - b.priority);

  return (
    <div className="mt-5 flex flex-col items-center rounded-xl bg-transparent dark:bg-background dark:text-white">
      <h1 className="mb-5 text-3xl font-bold">Manage Projects</h1>
      <div className="grid grid-cols-1 items-center justify-center gap-5 lg:grid-cols-3">
        {sortedProjects?.map((project) => (
          <div
            key={project._id}
            className="card w-full overflow-hidden border-2 border-transparent bg-gray-200 shadow-xl transition-all duration-300 hover:scale-[1.02] hover:border-blue-400 hover:shadow-[0_0_30px_rgba(127,72,230,0.2)] dark:bg-primary"
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
                      <FaCheck />
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
                      className="rounded-full px-2 py-1 text-xs font-medium"
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
                  className="btn flex flex-1 items-center justify-center gap-2 rounded-lg border-none bg-base-100 px-3 py-0 text-sm font-medium hover:bg-gray-300 dark:bg-[#004E76] dark:text-white dark:hover:bg-[#004A99]"
                >
                  <FaLink />
                  <span>Source Code</span>
                </Link>
                <Link
                  href={project.link}
                  target="_blank"
                  className="btn flex flex-1 items-center justify-center gap-2 rounded-lg border-none bg-base-100 px-3 py-0 text-sm font-medium hover:bg-gray-300 dark:bg-[#004E76] dark:text-white dark:hover:bg-[#004A99]"
                >
                  <FaEye />
                  <span>Live Site</span>
                </Link>
              </div>
              <div className="mt-5 flex items-center justify-between gap-5">
                <Link
                  href={`/dashboard/update-project/${project._id}`}
                  className="btn flex flex-1 items-center justify-center gap-2 rounded-lg border-none bg-blue-500 px-3 py-0 text-sm font-medium text-white hover:bg-[#37bcff]"
                >
                  <FaEdit />
                  <span>Edit</span>
                </Link>
                <button
                  onClick={() => handleDelete(project._id)}
                  className="btn flex flex-1 items-center justify-center gap-2 rounded-lg border-none bg-red-500 px-3 py-0 text-sm font-medium text-white hover:bg-[#db4c39]"
                >
                  <RiDeleteBin2Fill />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllProjects;
