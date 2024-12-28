'use client';
import LoadingPage from '@/components/Shared/LoadingPage';
import { getBlogs } from '@/lib/getBlogs';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';

const loadBlogs = async () => {
  return await getBlogs();
};

const BlogsPage = () => {
  const {
    data: blogs,
    isLoading,
    isError,
  } = useQuery({ queryKey: ['blogs'], queryFn: loadBlogs });

  if (isLoading) {
    return <LoadingPage />;
  }

  if (isError) {
    return <div>Failed to load blogs. Please try again later.</div>;
  }

  return (
    <div className="mx-auto min-h-[calc(100vh-224px)] max-w-screen-2xl pb-10 pt-24 text-black dark:text-white">
      <h1 className="mb-5 text-center text-3xl font-bold">Blogs</h1>
      <div className="grid grid-cols-1 gap-5 p-5 md:grid-cols-2 lg:grid-cols-3">
        {blogs?.map((blog, index) => (
          <div
            key={index}
            className="card w-full rounded-2xl border-2 border-transparent bg-gray-200 transition-all duration-300 hover:scale-105 hover:border-blue-400 hover:shadow-xl dark:bg-primary"
          >
            <figure>
              <Image
                height={1080}
                width={1080}
                src={blog.image}
                alt={blog.title}
                className="h-48 w-full object-cover"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title text-lg dark:text-white md:text-2xl">
                {blog.title}
              </h2>
              <p className="text-sm md:text-lg">{blog.description}</p>
              <p className="mt-2 text-xs text-gray-500 dark:text-gray-400 md:text-sm">
                By {blog.author} on {blog.date}
              </p>
              <div className="card-actions justify-end">
                <Link
                  target="_blank"
                  className="btn btn-primary w-full rounded-2xl border-none bg-[#0082C4] text-white duration-200 hover:scale-105 hover:bg-gray-400 dark:bg-[#004E76] dark:text-white dark:hover:bg-[#004A99]"
                  href={blog.blogLink}
                  rel="noopener noreferrer"
                >
                  Read More
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogsPage;
