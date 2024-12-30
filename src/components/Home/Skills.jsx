'use client';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import React from 'react';

const Skills = () => {
  const { theme } = useTheme();
  const skills = [
    {
      id: 1,
      name: 'nextjs',
      image: 'https://skillicons.dev/icons?i=nextjs',
    },
    {
      id: 2,
      name: 'react',
      image: 'https://skillicons.dev/icons?i=react',
    },
    {
      id: 3,
      name: 'TypeScript',
      image: 'https://skillicons.dev/icons?i=ts',
    },
    {
      id: 4,
      name: 'JavaScript',
      image: 'https://skillicons.dev/icons?i=js',
    },
    {
      id: 5,
      name: 'Tailwind',
      image: 'https://skillicons.dev/icons?i=tailwind',
    },
    {
      id: 6,
      name: 'nodejs',
      image: 'https://skillicons.dev/icons?i=nodejs',
    },
    {
      id: 7,
      name: 'Express',
      image: 'https://skillicons.dev/icons?i=express',
    },
    {
      id: 8,
      name: 'MongoDB',
      image: 'https://skillicons.dev/icons?i=mongodb',
    },
    {
      id: 9,
      name: 'HTML',
      image: 'https://skillicons.dev/icons?i=html',
    },
    {
      id: 10,
      name: 'CSS',
      image: 'https://skillicons.dev/icons?i=css',
    },
    {
      id: 11,
      name: 'Firebase',
      image: 'https://skillicons.dev/icons?i=firebase',
    },
    {
      id: 12,
      name: 'GitHub',
      image: 'https://skillicons.dev/icons?i=github',
    },
    {
      id: 13,
      name: 'git',
      image: 'https://skillicons.dev/icons?i=git',
    },
    {
      id: 14,
      name: 'npm',
      image: 'https://skillicons.dev/icons?i=npm',
    },
    {
      id: 15,
      name: 'figma',
      image: 'https://skillicons.dev/icons?i=figma',
    },
    {
      id: 16,
      name: 'vscode',
      image: 'https://skillicons.dev/icons?i=vscode',
    },
  ];

  return (
    <section id="skills" className="bg-transparent">
      <div className="mx-auto w-full max-w-screen-2xl px-5 pb-12 pt-4 lg:px-0">
        <h1 className="bg-gradient-to-r from-blue-400 to-blue-500 bg-clip-text py-4 text-center text-2xl font-bold uppercase text-transparent md:pt-8 lg:text-3xl">
          My Skills
        </h1>

        <p className="font-poppins mx-auto my-2 w-full text-center text-[1rem] tracking-wider text-black dark:text-white md:w-3/4">
          I take your ideas and turn them into unique web projects that not only
          inspire you but also engage your audience.
        </p>

        {/* Dynamically rendering skills */}
        <div className="flex flex-wrap items-center justify-center gap-4 py-10 md:grid-cols-4 md:gap-10 lg:grid-cols-6">
          {skills.map((skill) => (
            <div
              key={skill.id}
              className="relative flex flex-col items-center justify-center gap-4 overflow-hidden rounded-2xl border-2 border-transparent bg-transparent transition-all duration-300 hover:scale-[1.15] hover:border-blue-400 hover:shadow-[0_0_30px_rgba(127,72,230,0.2)]"
            >
              <Image
                height={100}
                width={100}
                src={`${skill.image}&theme=${theme === 'dark' ? 'dark' : 'light'}`}
                alt={skill.name}
                className="w-10 md:w-16"
              />
              {/* <p className="text-center text-2xl tracking-wider text-black dark:text-white">
                {skill.name}
              </p> */}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
