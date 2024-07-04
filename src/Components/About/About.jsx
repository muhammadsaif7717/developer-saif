import React from 'react';

const About = () => {
    return (
        <div id='about' className='min-h-screen flex flex-col justify-center items-center'>
             <h1 className='text-3xl font-semibold text-center my-10 '>Discover Myself</h1>
            <div className='w-full grid grid-cols-1 lg:grid-cols-2 items-center justify-center gap-5'>
                <div className='bg-[#00283A] rounded-xl p-10 card-body h-full'>
                    <h1 className='text-xl mb-5 text-center font-semibold  ml-2'>About Me...</h1>
                    <p>Hi, I{`'`}m MD. Saif Islam, a MERN Stack web developer with 3+ years of experience. I specialize in React js, Next js, Node js, Tailwind , MongoDB, JavaScript, and I create unique websites that exceed the expectations of my clients. I am committed to collaboration, transparency, and delivering exceptional results.</p>
                </div>
                <div className='bg-[#00283A] rounded-xl p-10 card-body h-full'>
                    <h1 className='text-xl mb-5 text-center font-semibold  ml-2'>My Vision...</h1>
                    <p>With a focus on innovation and user engagement, I create websites that drive growth and success in today{`'`}s competitive online landscape. My vision is to empower businesses and individuals with cutting-edge web solutions. Let{`'`}s work together and make your digital vision a reality!</p>
                </div>
                <div className='bg-[#00283A] rounded-xl p-10 lg:col-span-2 card-body h-full'>
                    <h1 className='text-xl mb-5 text-center font-semibold  ml-2'>My Skills...</h1>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  gap-5 items-center justify-center'>
                        <div className='p-5 rounded-xl bg-gray-900 hover:scale-105 h-full '>
                            <h1 className=' font-semibold '>Expert</h1>
                            <ul typeof='i'>
                                <li className='text-sm'>🔸React</li>
                                <li className='text-sm'>🔸HTML</li>
                                <li className='text-sm'>🔸CSS</li>
                                <li className='text-sm'>🔸Tailwind</li>
                                <li className='text-sm'>🔸Daisy UI</li>
                                <li className='text-sm'>🔸Media Queries</li>
                            </ul>
                        </div>
                        <div className='p-5 rounded-xl bg-gray-900 hover:scale-105 card-body h-full'>
                            <h1 className=' font-semibold '>Comfortable</h1>
                            <ul typeof='i'>
                                <li className='text-sm'>🔸Next.js</li>
                                <li className='text-sm'>🔸JavaScript</li>
                                <li className='text-sm'>🔸Node.js</li>
                                <li className='text-sm'>🔸Express.js</li>
                                <li className='text-sm'>🔸Firebase</li>
                                <li className='text-sm'>🔸MongoDB</li>
                            </ul>
                        </div>
                        <div className='p-5 rounded-xl bg-gray-900 hover:scale-105 card-body h-full'>
                            <h1 className=' font-semibold '>Tools</h1>
                            <ul typeof='i'>
                                <li className='text-sm'>🔸Git</li>
                                <li className='text-sm'>🔸Github</li>
                                <li className='text-sm'>🔸VS Code</li>
                                <li className='text-sm'>🔸NPM</li>
                                <li className='text-sm'>🔸Figma</li>
                                <li className='text-sm'>🔸Canva</li>
                            </ul>
                        </div>
                        <div className='p-5 rounded-xl bg-gray-900 hover:scale-105 card-body h-full'>
                            <h1 className=' font-semibold '>Soft skills</h1>
                            <ul typeof='i'>
                                <li className='text-sm'>🔸Hard working</li>
                                <li className='text-sm'>🔸Quick Learner</li>
                                <li className='text-sm'>🔸Active Listening</li>
                                <li className='text-sm'>🔸Teamwork</li>
                                <li className='text-sm'>🔸Management</li>
                                <li className='text-sm'>🔸Others</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;