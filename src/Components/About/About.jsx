import React from 'react';

const About = () => {
    return (
        <div id='about' className='min-h-screen flex justify-center items-center'>
            <div className='w-full grid grid-cols-1 lg:grid-cols-2 items-center justify-center gap-5'>
                <div className='bg-[#00283A] rounded-xl p-10'>
                    <h1 className='text-2xl mb-5 text-center font-semibold  ml-2'>About Me...</h1>
                    <p>Hi, I{`'`}m MD. Saif Islam, a frontend web developer with 3+ years of experience. I specialize in React js, Next js, Node js, Tailwind , MongoDB, JavaScript, and I create unique websites that exceed the expectations of my clients. I am committed to collaboration, transparency, and delivering exceptional results.</p>
                </div>
                <div className='bg-[#00283A] rounded-xl p-10'>
                    <h1 className='text-2xl mb-5 text-center font-semibold  ml-2'>My Vision...</h1>
                    <p>With a focus on innovation and user engagement, I create websites that drive growth and success in today{`'`}s competitive online landscape. My vision is to empower businesses and individuals with cutting-edge web solutions. Let{`'`}s work together and make your digital vision a reality!</p>
                </div>
                <div className='bg-[#00283A] rounded-xl p-10 lg:col-span-2'>
                    <h1 className='text-2xl mb-5 text-center font-semibold  ml-2'>My Slills...</h1>
                    <div className='grid grid-cols-2 lg:grid-cols-4  gap-5 items-center justify-center'>
                        <div className='p-5 rounded-xl bg-gray-600'>
                            <h1 className='text-xl font-semibold '>Expert</h1>
                            <ul typeof='i'>
                                <li>🔸 React</li>
                                <li>🔸 HTML</li>
                                <li>🔸 CSS</li>
                                <li>🔸 Tailwind</li>
                                <li>🔸 Daisy UI</li>
                                <li>🔸 Media Queries</li>
                            </ul>
                        </div>
                        <div className='p-5 rounded-xl bg-gray-600'>
                            <h1 className='text-xl font-semibold '>Comfortable</h1>
                            <ul typeof='i'>
                                <li>🔸 Next.js</li>
                                <li>🔸 JavaScript</li>
                                <li>🔸 Node.js</li>
                                <li>🔸 Express.js</li>
                                <li>🔸 Firebase</li>
                                <li>🔸 MongoDB</li>
                            </ul>
                        </div>
                        <div className='p-5 rounded-xl bg-gray-600'>
                            <h1 className='text-xl font-semibold '>Tools</h1>
                            <ul typeof='i'>
                                <li>🔸 Git</li>
                                <li>🔸 Github</li>
                                <li>🔸 VS Code</li>
                                <li>🔸 NPM</li>
                                <li>🔸 Figma</li>
                                <li>🔸 Canva</li>
                            </ul>
                        </div>
                        <div className='p-5 rounded-xl bg-gray-600'>
                            <h1 className='text-xl font-semibold '>Soft skills:</h1>
                            <ul typeof='i'>
                                <li>🔸 Hard working</li>
                                <li>🔸 Quick Learner</li>
                                <li>🔸 Active Listening</li>
                                <li>🔸 Teamwork</li>
                                <li>🔸 Management</li>
                                <li>🔸 Others</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;