"use client";
import { getProjectById } from "@/lib/getProjectById";
import { getURL } from "@/lib/getURL";
import axios from "axios";
import React, { useEffect, useState } from "react";





const UpdateProject = ({ params }) => {
  const [project, setProject] = useState(null);

  useEffect(() => {
    const loadProject = async () => {
      try {
        const res = await getProjectById(params.id);
        setProject(res);
      } catch (error) {
        console.log(error);
      }
    };
    loadProject();
  });


  const handleUpdate = async (e) => {
    e.preventDefault();
    const formData = e.target;

    const updatedProject = {
      name: formData.name.value,
      type: formData.type.value,
      priority: parseInt(formData.priority.value),
      status: formData.status.value,
      images: formData.images.value.split(",").map((image) => image.trim()),
      description: formData.description.value,
      keyFeatures: formData.keyFeatures.value
        .split(",")
        .map((feature) => feature.trim()),
      technologies: formData.technologies.value
        .split(",")
        .map((tech) => tech.trim()),
      sourceCode: formData.sourceCode.value,
      link: formData.link.value,
    };

    try {
      const url = await getURL();
      const res = await axios.patch(
        `${url}/api/update-project/${project._id}`,
        updatedProject
      );
      if (res.data.res) {
        alert("Project updated successfully");
        formData.reset();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-[95vh] flex flex-col items-center justify-center w-full">
      <h2 className="text-start lg:text-center w-full text-lg lg:text-2xl font-bold dark:text-white">
        Update Project
      </h2>
      <form
        onSubmit={handleUpdate}
        className="border rounded-xl p-4 lg:p-10 w-full lg:w-8/12 mt-5 lg:mt-10 dark:bg-primary border-none"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <div className="form-control">
            <label className="label label-text justify-start font-semibold text-sm lg:text-xl dark:text-white">
              Project Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              className="input input-bordered dark:bg-background"
              defaultValue={project?.name}
              required
            />
          </div>

          <div className="form-control">
            <label className="label label-text justify-start font-semibold text-sm lg:text-xl dark:text-white">
              Type <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="type"
              className="input input-bordered dark:bg-background"
              defaultValue={project?.type}
              required
            />
          </div>

          <div className="form-control">
            <label className="label label-text justify-start font-semibold text-sm lg:text-xl dark:text-white">
              Priority <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="priority"
              className="input input-bordered dark:bg-background"
              defaultValue={project?.priority}
              required
            />
          </div>

          <div className="form-control">
            <label className="label label-text justify-start font-semibold text-sm lg:text-xl dark:text-white">
              Status <span className="text-red-500">*</span>
            </label>
            <select
              name="status"
              className="input input-bordered text-gray-400 dark:bg-background"
              defaultValue={project?.status}
              required
            >
              <option value="" disabled>
                Select status
              </option>
              <option value="Completed">Completed</option>
              <option value="Working">Working</option>
            </select>
          </div>

          <div className="form-control">
            <label className="label label-text justify-start font-semibold text-sm lg:text-xl dark:text-white">
              Images URL (comma-separated){" "}
              <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="images"
              className="input input-bordered dark:bg-background"
              defaultValue={project?.images.join(",")}
              required
            />
          </div>

          <div className="form-control">
            <label className="label label-text justify-start font-semibold text-sm lg:text-xl dark:text-white">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              name="description"
              className="input input-bordered pt-2 dark:bg-background"
              defaultValue={project?.description}
              required
            />
          </div>

          <div className="form-control">
            <label className="label label-text justify-start font-semibold text-sm lg:text-xl dark:text-white">
              Key Features (comma-separated){" "}
              <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="keyFeatures"
              className="input input-bordered dark:bg-background"
              defaultValue={project?.keyFeatures.join(",")}
              required
            />
          </div>

          <div className="form-control">
            <label className="label label-text justify-start font-semibold text-sm lg:text-xl dark:text-white">
              Technologies (comma-separated){" "}
              <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="technologies"
              className="input input-bordered dark:bg-background"
              defaultValue={project?.technologies.join(",")}
              required
            />
          </div>

          <div className="form-control">
            <label className="label label-text justify-start font-semibold text-sm lg:text-xl dark:text-white">
              Source Code Link <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="sourceCode"
              className="input input-bordered dark:bg-background"
              defaultValue={project?.sourceCode}
              required
            />
          </div>

          <div className="form-control">
            <label className="label label-text justify-start font-semibold text-sm lg:text-xl dark:text-white">
              Project Link <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="link"
              className="input input-bordered dark:bg-background"
              defaultValue={project?.link}
              required
            />
          </div>
        </div>

        <div className="form-control w-full mt-5">
          <button
            type="submit"
            className="btn text-white border-none bg-[#49b9f1] hover:bg-[#3987ad]"
          >
            Update Project
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateProject;
