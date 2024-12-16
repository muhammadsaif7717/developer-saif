import Image from 'next/image';
import React from 'react';

const WhatIDo = () => {
    return (
        <div className="mt-5">
            <h2 className="mb-8 text-center text-2xl lg:text-3xl font-bold uppercase bg-gradient-to-r from-blue-400 to-blue-500 bg-clip-text text-transparent">
                What I Do
            </h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <div className="overflow-hidden rounded-xl border-2 border-transparent bg-gray-200 p-10 shadow transition-all duration-300 hover:scale-[1.05] hover:border-blue-400 hover:shadow-lg dark:bg-primary">
                    <Image src={`/web-dev.png`} alt='' height={1080} width={1080} className='h-14 w-14 mb-2' />
                    <h3 className="mb-2 text-xl font-semibold">
                        Full-Stack Web Development
                    </h3>
                    <p>
                        I create dynamic, responsive web applications using the MERN
                        stack, ensuring seamless user experiences.
                    </p>
                </div>
                <div className="overflow-hidden rounded-xl border-2 border-transparent bg-gray-200 p-10 shadow transition-all duration-300 hover:scale-[1.05] hover:border-blue-400 hover:shadow-lg dark:bg-primary">
                    <Image src={`/ui-ux.png`} alt='' height={1080} width={1080} className='h-12 w-12 mb-2' />
                    <h3 className="mb-2 text-xl font-semibold">UI/UX Design</h3>
                    <p>
                        I design intuitive user interfaces with a focus on aesthetics
                        and usability using tools like Tailwind CSS.
                    </p>
                </div>
                <div className="overflow-hidden rounded-xl border-2 border-transparent bg-gray-200 p-10 shadow transition-all duration-300 hover:scale-[1.05] hover:border-blue-400 hover:shadow-lg dark:bg-primary ">
                    <Image src={`/api-dev.png`} alt='' height={1080} width={1080} className='h-[70px] w-[70px]' />
                    <h3 className="mb-2 text-xl font-semibold">API Development</h3>
                    <p>
                        I build robust RESTful APIs with Node.js and Express, ensuring
                        security and scalability.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default WhatIDo;