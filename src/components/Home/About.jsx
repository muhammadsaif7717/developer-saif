import React from 'react';

const About = () => {
  return (
    <section
      id="about"
      className="mx-auto max-w-screen-2xl bg-transparent pb-12 pt-8 text-gray-800 dark:text-gray-100"
    >
      <div className="px-5 lg:px-0">
        {/* What I Do Section */}
        <div className="mt-5">
          <h2 className="mb-8 text-center text-2xl font-bold uppercase">
            What I Do
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="overflow-hidden rounded-xl border-2 border-transparent bg-gray-200 p-10 shadow transition-all duration-300 hover:scale-[1.05] hover:border-blue-400 hover:shadow-lg dark:bg-primary">
              <h3 className="mb-2 text-xl font-semibold">
                Full-Stack Web Development
              </h3>
              <p>
                I create dynamic, responsive web applications using the MERN
                stack, ensuring seamless user experiences.
              </p>
            </div>
            <div className="overflow-hidden rounded-xl border-2 border-transparent bg-gray-200 p-10 shadow transition-all duration-300 hover:scale-[1.05] hover:border-blue-400 hover:shadow-lg dark:bg-primary">
              <h3 className="mb-2 text-xl font-semibold">UI/UX Design</h3>
              <p>
                I design intuitive user interfaces with a focus on aesthetics
                and usability using tools like Tailwind CSS.
              </p>
            </div>
            <div className="overflow-hidden rounded-xl border-2 border-transparent bg-gray-200 p-10 shadow transition-all duration-300 hover:scale-[1.05] hover:border-blue-400 hover:shadow-lg dark:bg-primary">
              <h3 className="mb-2 text-xl font-semibold">API Development</h3>
              <p>
                I build robust RESTful APIs with Node.js and Express, ensuring
                security and scalability.
              </p>
            </div>
          </div>
        </div>

        {/* Education Section */}
        <div className="mt-16">
          <h2 className="mb-8 text-center text-2xl font-bold uppercase">
            Education
          </h2>
          <div className="grid grid-cols-1 items-center justify-between gap-10 lg:grid-cols-2">
            <div className="space-y-3 overflow-hidden rounded-xl border-2 border-transparent bg-gray-200 p-10 shadow transition-all duration-300 hover:scale-[1.05] hover:border-blue-400 hover:shadow-lg dark:bg-primary">
              <h3 className="text-xl font-semibold">
                Diploma in Computer Science
              </h3>
              <p>Dhaka Polytechnic Institute, 2022 - Present</p>
            </div>
            <div className="space-y-3 overflow-hidden rounded-xl border-2 border-transparent bg-gray-200 p-10 shadow transition-all duration-300 hover:scale-[1.05] hover:border-blue-400 hover:shadow-lg dark:bg-primary">
              <h3 className="text-xl font-semibold">
                Secondary School Certificate (SSC)
              </h3>
              <p>Setabgonj Ideal Academy, 2018 - 2020</p>
            </div>
          </div>
        </div>

        {/* Why Choose Me Section */}
        <div className="mt-16">
          <h2 className="mb-8 text-center text-2xl font-bold uppercase">
            Why Choose Me
          </h2>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
            <div className="overflow-hidden rounded-xl border-2 border-transparent bg-gray-200 p-10 shadow transition-all duration-300 hover:scale-[1.05] hover:border-blue-400 hover:shadow-lg dark:bg-primary">
              <h3 className="mb-2 text-xl font-semibold">
                Reliable and Efficient
              </h3>
              <p>
                I prioritize delivering high-quality, efficient solutions that
                meet your needs and exceed expectations.
              </p>
            </div>
            <div className="overflow-hidden rounded-xl border-2 border-transparent bg-gray-200 p-10 shadow transition-all duration-300 hover:scale-[1.05] hover:border-blue-400 hover:shadow-lg dark:bg-primary">
              <h3 className="mb-2 text-xl font-semibold">
                Strong Communication
              </h3>
              <p>
                With a focus on collaboration, I ensure clear communication at
                every stage of the project.
              </p>
            </div>
            <div className="overflow-hidden rounded-xl border-2 border-transparent bg-gray-200 p-10 shadow transition-all duration-300 hover:scale-[1.05] hover:border-blue-400 hover:shadow-lg dark:bg-primary">
              <h3 className="mb-2 text-xl font-semibold">
                Continuous Learning
              </h3>
              <p>
                Staying up-to-date with the latest technologies, I bring
                innovative ideas to every project.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
