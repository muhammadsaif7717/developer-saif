'use client';
import { getURL } from '@/lib/getURL';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React from 'react';
import Swal from 'sweetalert2';

const AddProject = () => {
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = e.target;

    const newProject = {
      name: formData.name.value,
      type: formData.type.value,
      priority: parseInt(formData.priority.value),
      status: formData.status.value,
      images: formData.images.value.split(',').map((image) => image.trim()),
      description: formData.description.value,
      keyFeatures: formData.keyFeatures.value
        .split(',')
        .map((feature) => feature.trim()),
      technologies: formData.technologies.value
        .split(',')
        .map((tech) => tech.trim()),
      sourceCode: formData.sourceCode.value,
      link: formData.link.value,
    };

    try {
      const url = await getURL();
      const res = await axios.post(
        `${url}/dashboard/add-project/api`,
        newProject
      );
      if (res.data.res.insertedId) {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Project added successfully',
          showConfirmButton: false,
          timer: 1500,
        });
        formData.reset();
        router.push('/dashboard/manage-projects');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex min-h-[95vh] w-full flex-col items-center justify-center">
      <h2 className="w-full text-start text-lg font-bold dark:text-white lg:text-center lg:text-2xl">
        Add New Project
      </h2>
      <form
        onSubmit={handleSubmit}
        className="mt-5 w-full rounded-xl border border-none p-4 dark:bg-primary lg:mt-10 lg:w-8/12 lg:p-10"
      >
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          <div className="form-control">
            <label className="label label-text justify-start text-sm font-semibold dark:text-white lg:text-xl">
              Project Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              className="input input-bordered dark:bg-background"
              placeholder="Project name"
              required
            />
          </div>

          <div className="form-control">
            <label className="label label-text justify-start text-sm font-semibold dark:text-white lg:text-xl">
              Type <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="type"
              className="input input-bordered dark:bg-background"
              placeholder="Type"
              required
            />
          </div>

          <div className="form-control">
            <label className="label label-text justify-start text-sm font-semibold dark:text-white lg:text-xl">
              Priority <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="priority"
              className="input input-bordered dark:bg-background"
              placeholder="Type"
              required
            />
          </div>

          <div className="form-control">
            <label className="label label-text justify-start text-sm font-semibold dark:text-white lg:text-xl">
              Status <span className="text-red-500">*</span>
            </label>
            <select
              name="status"
              className="input input-bordered text-gray-400 dark:bg-background"
              required
            >
              <option>Select status</option>
              <option value="Completed">Completed</option>
              <option value="Working">Working</option>
            </select>
          </div>

          <div className="form-control">
            <label className="label label-text justify-start text-sm font-semibold dark:text-white lg:text-xl">
              Images URL (comma-separated){' '}
              <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="images"
              className="input input-bordered dark:bg-background"
              placeholder="Type"
              required
            />
          </div>

          <div className="form-control">
            <label className="label label-text justify-start text-sm font-semibold dark:text-white lg:text-xl">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              name="description"
              className="input input-bordered pt-2 dark:bg-background"
              placeholder="Description"
              required
            />
          </div>

          <div className="form-control">
            <label className="label label-text justify-start text-sm font-semibold dark:text-white lg:text-xl">
              Key Features (comma-separated){' '}
              <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="keyFeatures"
              className="input input-bordered dark:bg-background"
              placeholder="Key features"
              required
            />
          </div>

          <div className="form-control">
            <label className="label label-text justify-start text-sm font-semibold dark:text-white lg:text-xl">
              Technologies (comma-separated){' '}
              <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="technologies"
              className="input input-bordered dark:bg-background"
              placeholder="Technologies"
              required
            />
          </div>

          <div className="form-control">
            <label className="label label-text justify-start text-sm font-semibold dark:text-white lg:text-xl">
              Source Code Link <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="sourceCode"
              className="input input-bordered dark:bg-background"
              placeholder="Source code link"
              required
            />
          </div>
          <div className="form-control">
            <label className="label label-text justify-start text-sm font-semibold dark:text-white lg:text-xl">
              Project Link <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="link"
              className="input input-bordered dark:bg-background"
              placeholder="Project link"
              required
            />
          </div>
        </div>

        <div className="form-control mt-5 w-full">
          <button
            type="submit"
            className="btn border-none bg-[#49b9f1] text-white hover:bg-[#3987ad]"
          >
            Add Project
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProject;
