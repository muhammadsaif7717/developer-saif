import Image from 'next/image';
import React from 'react';

const Skills = () => {
  // Custom array of objects with skills in the specified order
  const skills = [
    {
      id: 1,
      name: 'React.js',
      image:
        'https://gerold.themejunction.net/wp-content/uploads/2024/05/react.png',
    },
    {
      id: 2,
      name: 'Express.js',
      image: 'https://i.postimg.cc/TwNLjkt5/icons8-express-js-50.png',
    },
    {
      id: 3,
      name: 'Node.js',
      image: 'https://i.postimg.cc/7hT63qCj/icons8-nodejs-48.png',
    },
    {
      id: 4,
      name: 'JavaScript',
      image: 'https://i.postimg.cc/mgqFFp6c/icons8-javascript-48.png',
    },
    {
      id: 5,
      name: 'MongoDB',
      image: 'https://i.postimg.cc/Fzjft993/icons8-mongo-db-48.png',
    },
    {
      id: 6,
      name: 'Firebase',
      image: 'https://i.postimg.cc/Yqz4bqDw/icons8-firebase-48.png',
    },
    {
      id: 7,
      name: 'Tailwind',
      image: 'https://i.postimg.cc/kMVF18WP/icons8-tailwind-css-48.png',
    },
    {
      id: 8,
      name: 'Bootstrap',
      image: 'https://i.postimg.cc/28kjjdGP/icons8-bootstrap-64.png',
    },
    {
      id: 9,
      name: 'Figma',
      image:
        'https://gerold.themejunction.net/wp-content/uploads/2024/05/figma.png',
    },
    {
      id: 10,
      name: 'Illustrator',
      image: 'https://i.postimg.cc/tgYYqdqX/icons8-illustrator-48.png',
    },
    {
      id: 11,
      name: 'CSS3',
      image: 'https://i.postimg.cc/5t1CfQHy/icons8-css-48.png',
    },
    {
      id: 12,
      name: 'HTML5',
      image: 'https://i.postimg.cc/PrpZyjsX/icons8-html5-48.png',
    },
  ];

  return (
    <section id="skills" className="bg-transparent">
      <div className="mx-auto w-full max-w-screen-2xl px-5 pb-12 pt-4 lg:px-0">
        <h1 className="py-4 text-center text-2xl font-bold uppercase  md:pt-8 bg-gradient-to-r from-blue-400 to-blue-500 bg-clip-text text-transparent ">
          My Skills
        </h1>

        <p className="font-poppins mx-auto my-2 w-full text-center text-[1rem] tracking-wider text-black dark:text-white md:w-3/4">
          I take your ideas and turn them into unique web projects that not only
          inspire you but also engage your audience.
        </p>

        {/* Dynamically rendering skills */}
        <div className="grid grid-cols-2 items-center justify-center gap-10 py-10 md:grid-cols-4 lg:grid-cols-6">
          {skills.map((skill) => (
            <div
              key={skill.id}
              className="relative flex flex-col items-center justify-center gap-4 overflow-hidden rounded-2xl border-2 border-transparent bg-gray-200 p-4 transition-all duration-300 hover:scale-[1.15] hover:border-blue-400 hover:shadow-[0_0_30px_rgba(127,72,230,0.2)] dark:bg-primary"
            >
              <Image
                height={100}
                width={100}
                src={skill.image}
                alt={skill.name}
                className="w-16"
              />
              <p className="text-center text-2xl tracking-wider text-black dark:text-white">
                {skill.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
