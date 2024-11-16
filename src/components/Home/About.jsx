import React from "react";

const About = () => {
    return (
        <section id="about" className="bg-transparent  text-gray-800 dark:text-gray-100 pt-8 pb-12">
            <div className="container mx-auto px-6 lg:px-20">

                {/* What I Do Section */}
                <div className="mt-16">
                    <h2 className="text-3xl font-bold text-center mb-8 uppercase">What I Do</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="p-10 rounded-xl bg-gray-200 dark:bg-primary  shadow hover:shadow-lg">
                            <h3 className="text-xl font-semibold mb-2">Full-Stack Web Development</h3>
                            <p>
                                I create dynamic, responsive web applications using the MERN stack, ensuring seamless user experiences.
                            </p>
                        </div>
                        <div className="p-10 rounded-xl bg-gray-200 dark:bg-primary  shadow hover:shadow-lg">
                            <h3 className="text-xl font-semibold mb-2">UI/UX Design</h3>
                            <p>
                                I design intuitive user interfaces with a focus on aesthetics and usability using tools like Tailwind CSS.
                            </p>
                        </div>
                        <div className="p-10 rounded-xl bg-gray-200 dark:bg-primary  shadow hover:shadow-lg">
                            <h3 className="text-xl font-semibold mb-2">API Development</h3>
                            <p>
                                I build robust RESTful APIs with Node.js and Express, ensuring security and scalability.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Education Section */}
                <div className="mt-16">
                    <h2 className="text-3xl font-bold text-center mb-8 uppercase">Education</h2>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center justify-between">
                        <div className="p-10 bg-primary rounded-xl space-y-3">
                            <h3 className="text-xl font-semibold">Diploma in Computer Science</h3>
                            <p>Dhaka Polytechnic Institute, 2022 - Present</p>
                        </div>
                        <div className="p-10 bg-primary rounded-xl space-y-3">
                            <h3 className="text-xl font-semibold">Secondary School Certificate (SSC)</h3>
                            <p>Setabgonj Ideal Academy, 2018 - 2020</p>
                        </div>
                    </div>
                </div>

                {/* Why Choose Me Section */}
                <div className="mt-16">
                    <h2 className="text-3xl font-bold text-center mb-8 uppercase">Why Choose Me</h2>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                        <div className="p-10 bg-gray-200 dark:bg-primary rounded-xl shadow hover:shadow-lg">
                            <h3 className="text-xl font-semibold mb-2">Reliable and Efficient</h3>
                            <p>
                                I prioritize delivering high-quality, efficient solutions that meet your needs and exceed expectations.
                            </p>
                        </div>
                        <div className="p-10 bg-gray-200 dark:bg-primary rounded-xl shadow hover:shadow-lg">
                            <h3 className="text-xl font-semibold mb-2">Strong Communication</h3>
                            <p>
                                With a focus on collaboration, I ensure clear communication at every stage of the project.
                            </p>
                        </div>
                        <div className="p-10 bg-gray-200 dark:bg-primary rounded-xl shadow hover:shadow-lg">
                            <h3 className="text-xl font-semibold mb-2">Continuous Learning</h3>
                            <p>
                                Staying up-to-date with the latest technologies, I bring innovative ideas to every project.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
