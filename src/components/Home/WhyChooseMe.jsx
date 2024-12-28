import Image from 'next/image';
import React from 'react';

const WhyChooseMe = () => {
  return (
    <div className="mt-14 flex w-full flex-col items-center justify-between gap-5 md:mt-5 md:flex-row">
      <div className="w-full space-y-5 md:w-1/2">
        <h2 className="bg-gradient-to-r from-blue-400 to-blue-500 bg-clip-text text-center text-2xl font-bold uppercase text-transparent md:text-start lg:text-3xl">
          Why Choose Me
        </h2>
        <p>
          Hi! I'm a Frontend Developer with a passionate love for creating
          amazing user experiences. I believe in being punctual and dedicated
          with a strong commitment to continuous improvement mindset. My
          enthusiasm for frontend development shines through in every project I
          take on. I truly believe in the value of collaboration and I'm eager
          to work with others to create innovative solutions that meet user
          needs. As a frontend developer, I believe in the power of creativity
          and technology to create seamless user experiences that leave a
          lasting impact.
        </p>
      </div>
      <Image
        src={`/why-choose.png`}
        alt=""
        height={1080}
        width={1080}
        className="w-8/12 md:w-1/3"
      />
    </div>
  );
};

export default WhyChooseMe;
