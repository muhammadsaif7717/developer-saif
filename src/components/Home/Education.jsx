import Image from 'next/image';
import React from 'react';

const Education = () => {
  return (
    <div className="mt-16">
      <h2 className="mb-8 bg-gradient-to-r from-blue-400 to-blue-500 bg-clip-text text-center text-2xl font-bold uppercase text-transparent lg:text-3xl">
        Education
      </h2>
      <div className="grid grid-cols-1 items-center justify-between gap-10 md:grid-cols-2 lg:grid-cols-3">
        <div className="space-y-3 overflow-hidden rounded-xl border-2 border-transparent bg-gray-200 p-10 shadow transition-all duration-300 hover:scale-[1.05] hover:border-blue-400 hover:shadow-lg dark:bg-primary">
          <Image
            src={`/dpi.png`}
            alt=""
            height={1080}
            width={1080}
            className="mb-2 h-20 w-20"
          />
          <h3 className="text-xl font-semibold">Diploma in Computer Science</h3>
          <p>Dhaka Polytechnic Institute, 2022 - Present</p>
        </div>
        <div className="space-y-3 overflow-hidden rounded-xl border-2 border-transparent bg-gray-200 p-10 shadow transition-all duration-300 hover:scale-[1.05] hover:border-blue-400 hover:shadow-lg dark:bg-primary">
          <Image
            src={`/dgcc.png`}
            alt=""
            height={1080}
            width={1080}
            className="mb-2 h-20 w-20"
          />
          <h3 className="text-xl font-semibold">
            Higher Secondary Certificate (HSC)
          </h3>
          <p>Dinajpur Govt. City Collage - 2023-2023</p>
        </div>
        <div className="space-y-3 overflow-hidden rounded-xl border-2 border-transparent bg-gray-200 p-10 shadow transition-all duration-300 hover:scale-[1.05] hover:border-blue-400 hover:shadow-lg dark:bg-primary">
          <Image
            src={`/sia.png`}
            alt=""
            height={1080}
            width={1080}
            className="mb-2 h-20 w-20"
          />
          <h3 className="text-xl font-semibold">
            Secondary School Certificate (SSC)
          </h3>
          <p>Setabgonj Ideal Academy, 2018 - 2020</p>
        </div>
      </div>
    </div>
  );
};

export default Education;
