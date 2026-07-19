'use client';

import {
  Code2,
  Rocket,
  Users,
  Award,
  Coffee,
  Brain,
  Terminal,
  Sparkles,
  Target,
} from 'lucide-react';
import Image from 'next/image';

const stats = [
  { label: 'Years Experience', value: '5+', icon: Award },
  { label: 'Projects Completed', value: '50+', icon: Rocket },
  { label: 'Happy Clients', value: '30+', icon: Users },
  { label: 'Cups of Coffee', value: '∞', icon: Coffee },
];

const values = [
  {
    icon: Code2,
    title: 'Precision',
    description:
      'Writing clean, maintainable code with meticulous attention to detail.',
    codeComment: '// Clean code matters',
  },
  {
    icon: Rocket,
    title: 'Innovation',
    description:
      'Leveraging cutting-edge technologies to build modern, scalable solutions.',
    codeComment: '// Stay ahead',
  },
  {
    icon: Users,
    title: 'Collaboration',
    description:
      'Partner mindset with transparent communication and shared success goals.',
    codeComment: '// Team player',
  },
  {
    icon: Brain,
    title: 'Problem Solving',
    description:
      'Analytical approach to tackling complex technical challenges efficiently.',
    codeComment: '// Think deep',
  },
];

const About = () => {
  return (
    <section
      id="about"
      className="relative overflow-hidden bg-white py-16 md:py-24 lg:py-32 dark:bg-black"
    >
      {/* Animated Grid Background - Same as Banner */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,130,196,0.3)_1px,transparent_1px),linear-gradient(90deg,rgba(0,130,196,0.3)_1px,transparent_1px)] bg-size-[50px_50px] opacity-[0.03] dark:opacity-[0.08]" />

        {/* Gradient Orbs */}
        <div className="absolute top-1/4 right-1/4 h-96 w-96 animate-pulse rounded-full bg-[#0082c4] opacity-20 blur-[120px] dark:opacity-10" />
        <div className="absolute bottom-1/4 left-1/4 h-96 w-96 animate-pulse rounded-full bg-[#0099e6] opacity-20 blur-[120px] [animation-delay:1s] dark:opacity-10" />

        {/* Floating Code Snippets */}
        <div className="absolute top-[20%] left-[10%] animate-bounce font-mono text-xs text-[#0082c4] opacity-30 [animation-duration:15s] dark:opacity-40">
          {'const about = { }'}
        </div>
        <div className="absolute top-[40%] right-[15%] animate-bounce font-mono text-xs text-[#0082c4] opacity-30 [animation-delay:0.5s] [animation-duration:17s] dark:opacity-40">
          {'function developer()'}
        </div>
        <div className="absolute bottom-[30%] left-[20%] animate-bounce font-mono text-xs text-[#0082c4] opacity-30 [animation-delay:1s] [animation-duration:19s] dark:opacity-40">
          {'// Passionate coder'}
        </div>
        <div className="absolute right-[25%] bottom-[20%] animate-bounce font-mono text-xs text-[#0082c4] opacity-30 [animation-delay:1.5s] [animation-duration:21s] dark:opacity-40">
          {'export default About'}
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header with Code Style */}
        <div className="mb-12 text-center md:mb-16">
          {/* <div className="mb-3 font-mono text-sm text-[#64748b] dark:text-[#cbd5e1]">
            <span className="text-[#0082c4]">{'<section id="about">'}</span>
          </div> */}
          <h2 className="mb-4 text-4xl font-bold text-[#0082c4] md:text-5xl lg:text-6xl">
            About Me
          </h2>
          <p className="mx-auto max-w-2xl text-base text-[#64748b] md:text-lg dark:text-[#cbd5e1]">
            Passionate developer crafting digital experiences that make a
            difference
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="mb-16 grid gap-12 md:mb-20 lg:grid-cols-2 lg:gap-16">
          {/* Left: Image & Quick Stats */}
          <div className="space-y-6 md:space-y-8">
            {/* Code Badge */}
            <div className="flex items-center justify-center gap-2 lg:justify-start">
              <Terminal className="h-4 w-4 animate-pulse text-[#0082c4]" />
              <span className="font-mono text-sm text-[#0082c4]">
                {'developer.profile()'}
              </span>
            </div>

            {/* Profile Image */}
            <div className="group relative mx-auto max-w-md lg:mx-0">
              <div className="relative overflow-hidden rounded-2xl border-2 border-[#0082c4] bg-white p-2 transition-all duration-300 hover:scale-105 hover:border-[#0099e6] hover:shadow-xl hover:shadow-[#0082c4]/30 dark:bg-black">
                <div className="relative aspect-square overflow-hidden rounded-xl bg-gradient-to-br from-[#0082c4]/20 to-[#0099e6]/20">
                  <Image
                    src="https://i.ibb.co.com/Fb3MTP0f/Picsart-26-01-06-05-22-42-281.png"
                    alt="MD. Saif Islam - Full Stack Developer"
                    fill
                    className="object-cover object-top"
                    priority
                  />
                </div>
              </div>

              {/* Floating Tech Icon */}
              <div className="absolute -top-3 -right-3 flex h-14 w-14 animate-bounce items-center justify-center rounded-full border-2 border-[#0082c4] bg-[#f2f2f2] [animation-duration:3s] dark:bg-[#11141c]">
                <Sparkles className="h-6 w-6 text-[#0082c4]" />
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="group relative overflow-hidden rounded-xl bg-[#f2f2f2] p-5 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-[#0082c4]/20 sm:p-6 dark:bg-[#11141c]"
                >
                  <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-[#0082c4]/5 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                  <stat.icon className="relative z-10 mx-auto mb-2 h-7 w-7 text-[#0082c4] transition-transform group-hover:scale-110 sm:h-8 sm:w-8" />
                  <div className="relative z-10 mb-1 text-2xl font-bold text-[#0082c4] sm:text-3xl">
                    {stat.value}
                  </div>
                  <div className="relative z-10 text-xs text-[#64748b] sm:text-sm dark:text-[#cbd5e1]">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Story & Journey */}
          <div className="space-y-5 md:space-y-6">
            {/* Opening Code Comment */}
            <div className="font-mono text-sm text-[#0082c4]">
              {'// My Journey'}
            </div>

            {/* Story Content */}
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-[#0082c4] md:text-3xl">
                From Curiosity to Craft
              </h3>
              <div className="space-y-4 border-l-2 border-[#0082c4] pl-4 text-sm leading-relaxed text-[#64748b] md:text-base dark:text-[#cbd5e1]">
                <p>
                  Hey there! I&apos;m{' '}
                  <span className="font-semibold text-[#0082c4]">
                    MD. Saif Islam
                  </span>
                  , a full-stack developer with an unwavering passion for
                  building elegant, scalable digital solutions. My journey into
                  web development started with simple curiosity and has evolved
                  into a career focused on creating impactful, user-centered
                  applications.
                </p>
                <p>
                  With over{' '}
                  <span className="font-semibold text-[#0082c4]">
                    5 years of hands-on experience
                  </span>
                  , I&apos;ve had the privilege of collaborating with startups,
                  established enterprises, and ambitious founders. I specialize
                  in the modern JavaScript ecosystem, particularly the{' '}
                  <span className="font-semibold text-[#0082c4]">
                    MERN stack
                  </span>
                  , with a laser focus on performance, scalability, and
                  exceptional user experiences.
                </p>
                <p>
                  When I&apos;m not coding, you&apos;ll find me exploring emerging
                  technologies, contributing to open-source projects, or sharing
                  insights with the developer community. I believe in{' '}
                  <span className="font-semibold text-[#0082c4]">
                    continuous learning
                  </span>{' '}
                  and staying at the forefront of web development innovation.
                </p>
              </div>
            </div>

            {/* Tech Philosophy Card */}
            <div className="group relative overflow-hidden rounded-xl border border-[#0082c4]/20 bg-[#f2f2f2] p-5 transition-all duration-300 hover:border-[#0082c4]/50 hover:shadow-lg hover:shadow-[#0082c4]/20 md:p-6 dark:bg-[#11141c]">
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-[#0082c4]/5 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              <div className="relative z-10 mb-2 flex items-center gap-2">
                <Target className="h-5 w-5 text-[#0082c4]" />
                <h4 className="font-mono text-lg font-semibold text-[#0082c4]">
                  myApproach()
                </h4>
              </div>
              <p className="relative z-10 text-sm leading-relaxed text-[#64748b] dark:text-[#cbd5e1]">
                I believe in writing code that&apos;s not just functional, but{' '}
                <span className="font-semibold text-[#0082c4]">
                  maintainable and scalable
                </span>
                . Every project is an opportunity to deliver value while
                maintaining the highest standards of quality, performance, and
                user experience.
              </p>
            </div>

            {/* Closing Comment */}
            <div className="font-mono text-sm text-[#64748b] dark:text-[#cbd5e1]">
              {'// End of story'}
            </div>
          </div>
        </div>

        {/* Core Values Section */}
        <div>
          <div className="mb-10 text-center md:mb-12">
            <div className="mb-3 font-mono text-sm text-[#0082c4]">
              {'// Core Values'}
            </div>
            <h3 className="mb-3 text-3xl font-bold text-[#0082c4] md:text-4xl">
              What Drives Me
            </h3>
            {/* <p className="text-sm text-[#64748b] md:text-base dark:text-[#cbd5e1]">
              const values = [...]
            </p> */}
          </div>

          <div className="grid gap-5 sm:grid-cols-2 md:gap-6 lg:grid-cols-4">
            {values.map((value) => (
              <div
                key={value.title}
                className="group relative overflow-hidden rounded-xl border border-[#0082c4]/20 bg-[#f2f2f2] p-6 transition-all duration-300 hover:-translate-y-2 hover:border-[#0082c4]/50 hover:shadow-xl hover:shadow-[#0082c4]/20 dark:bg-[#11141c]"
              >
                <div className="absolute inset-0 -translate-y-full bg-gradient-to-b from-[#0082c4]/5 to-transparent transition-transform duration-300 group-hover:translate-y-0" />

                {/* Code Comment */}
                <div className="relative z-10 mb-3 font-mono text-xs text-[#0082c4]">
                  {value.codeComment}
                </div>

                {/* Icon */}
                <value.icon className="relative z-10 mb-4 h-10 w-10 text-[#0082c4] transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6 md:h-12 md:w-12" />

                {/* Title */}
                <h4 className="relative z-10 mb-2 text-lg font-bold text-[#0082c4] md:text-xl">
                  {value.title}
                </h4>

                {/* Description */}
                <p className="relative z-10 text-sm leading-relaxed text-[#64748b] dark:text-[#cbd5e1]">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Closing Tag */}
        {/* <div className="mt-12 text-center font-mono text-sm text-[#64748b] md:mt-16 dark:text-[#cbd5e1]">
          <span className="text-[#0082c4]">{'</section>'}</span>
        </div> */}
      </div>
    </section>
  );
};

export default About;
