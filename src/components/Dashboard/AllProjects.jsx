"use client";
import { getProjects } from "@/lib/getProjects";
import { getURL } from "@/lib/getURL";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaCheck, FaEdit, FaEye, FaLink } from "react-icons/fa";
import { RiDeleteBin2Fill } from "react-icons/ri";


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
    try {
      const url = await getURL();
      const res = await axios.delete(`${url}/api/delete-project/${id}`);
      if (res.data.res.deletedCount > 0) {
        alert("deleted successfully");
      }
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <div className="bg-transparent dark:bg-background dark:text-white rounded-xl mt-5 flex flex-col items-center">
      <h1 className="font-bold text-3xl mb-5">Manage Projects</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 items-center justify-center gap-5">
        {projects?.map((project) => (
          <div
            key={project._id}
            className="card bg-base-200 w-full shadow-xl dark:bg-primary"
          >
            <div className="card-content p-6 text-black dark:text-white">
              <div className="mb-4">
                <h2 className="text-2xl font-bold truncate">{project.name}</h2>
                <p className="text-xl pt-2">{project.type}</p>
                <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-green-500/20 text-green-300/90">
                  {project.status}
                </span>
              </div>
              <div className="mb-4">
                <h3 className="text-sm font-semibold mb-2">Description</h3>
                <p className="text-sm">{project.description}</p>
              </div>
              <div className="mb-4">
                <h3 className="text-sm font-semibold mb-2">Key Features</h3>
                <ul className="text-sm space-y-1">
                  {project.keyFeatures.map((keyFeature, index) => (
                    <li key={index} className="flex items-start">
                      <FaCheck />
                      <span className="truncate">{keyFeature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mb-4">
                <h3 className="text-sm font-semibold mb-2">
                  Technologies & Tools
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((technology, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 rounded-full text-xs font-medium"
                    >
                      {technology}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex justify-between items-center gap-5">
                <Link
                  href={project.sourceCode}
                  target="_blank"
                  className="flex-1 rounded-lg px-3 py-0 text-sm font-medium flex items-center justify-center gap-2 dark:text-white btn dark:bg-[#004E76] border-none hover:bg-[#37bcff]"
                >
                  <FaLink />
                  <span>Source Code</span>
                </Link>
                <Link
                  href={project.link}
                  target="_blank"
                  className="flex-1 rounded-lg px-3 py-0 text-sm font-medium flex items-center justify-center dark:text-white gap-2 btn dark:bg-[#004E76] border-none hover:bg-[#2fbaff]"
                >
                  <FaEye />
                  <span>Live Site</span>
                </Link>
              </div>
              <div className="flex justify-between items-center gap-5 mt-5">
                <Link
                  href={`/dashboard/update-project/${project._id}`}
                  className="flex-1 rounded-lg px-3 py-0 text-sm font-medium flex items-center justify-center gap-2 text-white btn border-none hover:bg-[#37bcff] bg-blue-500"
                >
                  <FaEdit />
                  <span>Edit</span>
                </Link>
                <button
                  onClick={() => handleDelete(project._id)}
                  className="flex-1 rounded-lg px-3 py-0 text-sm font-medium flex items-center justify-center text-white gap-2 btn bg-red-500 border-none hover:bg-[#db4c39]"
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
