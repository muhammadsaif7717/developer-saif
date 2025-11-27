'use client';

import {
  Github,
  Linkedin,
  Twitter,
  Facebook,
  Mail,
  ArrowRight,
  Download,
  ArrowDown,
  Terminal,
  CodeXml,
} from 'lucide-react';
import Image from 'next/image';
import { Typewriter } from 'react-simple-typewriter';

const Banner = () => {
  const socialLinks = [
    {
      icon: Github,
      href: 'https://github.com/muhammadsaif7717',
      label: 'GitHub',
      hoverColor: 'hover:bg-black hover:text-white',
    },
    {
      icon: Linkedin,
      href: 'https://linkedin.com/in/mdsaifislam77',
      label: 'LinkedIn',
      hoverColor: 'hover:bg-[#0082c4] hover:text-white',
    },
    {
      icon: Twitter,
      href: 'https://twitter.com/muhammadsaif77',
      label: 'Twitter',
      hoverColor: 'hover:bg-[#1DA1F2] hover:text-white',
    },
    {
      icon: Facebook,
      href: 'https://facebook.com/muhammadsaif7717',
      label: 'Facebook',
      hoverColor: 'hover:bg-[#1877F2] hover:text-white',
    },
    {
      icon: Mail,
      href: 'mailto:muhammadsaif7717@gmail.com',
      label: 'Email',
      hoverColor: 'hover:bg-[#0082c4] hover:text-white',
    },
  ];

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-white py-20 md:py-0 dark:bg-black">
      {/* Animated Grid Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-linear(rgba(0,130,196,0.3)_1px,transparent_1px),linear-linear(90deg,rgba(0,130,196,0.3)_1px,transparent_1px)] bg-size-[30px_30px] opacity-[0.03] sm:bg-size-[40px_40px] md:bg-size-[50px_50px] dark:opacity-[0.08]" />

        {/* linear Orbs */}
        <div className="absolute top-1/4 left-1/4 h-48 w-48 animate-pulse rounded-full bg-[#0082c4] opacity-20 blur-[80px] sm:h-64 sm:w-64 sm:blur-[100px] md:h-96 md:w-96 md:blur-[120px] dark:opacity-10" />
        <div className="absolute right-1/4 bottom-1/4 h-48 w-48 animate-pulse rounded-full bg-[#0099e6] opacity-20 blur-[80px] [animation-delay:1s] sm:h-64 sm:w-64 sm:blur-[100px] md:h-96 md:w-96 md:blur-[120px] dark:opacity-10" />

        {/* Corner Code Decorations - Hidden on mobile */}
        <div className="absolute top-4 left-4 font-mono text-xs text-[#0082c4] opacity-30 sm:top-6 sm:left-6 sm:text-sm md:top-8 md:left-8 dark:opacity-50">
          <div>{'<html>'}</div>
          <div className="ml-2 sm:ml-3 md:ml-4">{'<body>'}</div>
          <div className="ml-4 sm:ml-6 md:ml-8">{'<div className="hero">'}</div>
        </div>
        <div className="absolute right-4 bottom-4 text-right font-mono text-xs text-[#0082c4] opacity-30 sm:right-6 sm:bottom-6 sm:text-sm md:right-8 md:bottom-8 dark:opacity-50">
          <div className="mr-4 sm:mr-6 md:mr-8">{'</div>'}</div>
          <div className="mr-2 sm:mr-3 md:mr-4">{'</body>'}</div>
          <div>{'</html>'}</div>
        </div>

        {/* Floating Code Snippets - Responsive positioning */}
        <div className="absolute top-[15%] left-[5%] animate-bounce font-mono text-[10px] text-[#0082c4] opacity-30 [animation-duration-[15s]] sm:text-xs dark:opacity-40">
          {'{ developer: true }'}
        </div>
        <div className="absolute top-[27%] left-[16%] animate-bounce font-mono text-[10px] text-[#0082c4] opacity-30 [animation-delay:0.5s] [animation-duration-[17s]] sm:text-xs dark:opacity-40">
          {'const skills = [...]'}
        </div>
        <div className="absolute top-[39%] left-[27%] animate-bounce font-mono text-[10px] text-[#0082c4] opacity-30 [animation-delay:1s] [animation-duration-[19s]] sm:text-xs dark:opacity-40">
          {'function build()'}
        </div>
        <div className="absolute top-[51%] left-[38%] animate-bounce font-mono text-[10px] text-[#0082c4] opacity-30 [animation-delay:1.5s] [animation-duration-[21s]] sm:text-xs dark:opacity-40">
          {'// Clean code'}
        </div>
        <div className="absolute top-[63%] left-[49%] animate-bounce font-mono text-[10px] text-[#0082c4] opacity-30 [animation-delay:2s] [animation-duration-[23s]] sm:text-xs dark:opacity-30">
          {'npm run dev'}
        </div>
        <div className="absolute top-[75%] left-[60%] animate-bounce font-mono text-[10px] text-[#0082c4] opacity-30 [animation-delay:2.5s] [animation-duration-[25s]] sm:text-xs dark:opacity-40">
          {'<Component />'}
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex h-full w-full max-w-7xl flex-col items-center justify-center gap-0 px-4 py-8 sm:px-6 sm:py-12 md:gap-10 md:px-8 md:py-16 lg:flex-row lg:gap-12 lg:px-10 lg:py-20">
        {/* Image Section - Left Side */}
        <div className="flex w-full flex-col items-center justify-center lg:w-1/2">
          {/* Code Badge Above Image */}
          <div className="mb-4 flex items-center gap-2 rounded-full border border-[#0082c4]/20 bg-[#f2f2f2] px-3 py-1.5 sm:mb-5 sm:px-4 sm:py-2 md:mb-6 dark:bg-[#11141c]">
            <Terminal className="h-3 w-3 animate-pulse text-[#0082c4] sm:h-4 sm:w-4" />
            <span className="font-mono text-xs text-[#0082c4] sm:text-sm">
              {'status: available'}
            </span>
          </div>

          {/* Image with Enhanced Effects */}
          <div className="group relative">
            {/* Image container */}
            <div className="relative rounded-2xl border-2 border-[#0082c4] bg-white p-1.5 transition-all duration-300 hover:scale-105 hover:border-[#0099e6] sm:p-2 lg:rounded-full dark:bg-black">
              <div className="flex h-[180px] w-[180px] items-center justify-center overflow-hidden rounded-xl bg-linear-to-br from-[#0082c4]/20 to-[#0099e6]/20 sm:h-[220px] sm:w-[220px] md:h-[260px] md:w-[260px] lg:h-[300px] lg:w-[300px] lg:rounded-full">
                <Image
                  src="/Saif.png"
                  alt="MD. Saif Islam - Full Stack Developer"
                  height={500}
                  width={500}
                  className="h-full w-full rounded-xl object-cover lg:rounded-full"
                  priority
                />
              </div>
            </div>

            {/* Floating Tech Icons */}
            <div className="absolute -top-2 -right-2 flex h-10 w-10 animate-bounce items-center justify-center rounded-full border-2 border-[#0082c4] bg-[#f2f2f2] [animation-duration-[3s]] sm:-top-3 sm:-right-3 sm:h-11 sm:w-11 md:-top-4 md:-right-4 md:h-12 md:w-12 dark:bg-[#11141c]">
              <CodeXml className="h-5 w-5 text-[#0082c4] sm:h-6 sm:w-6" />
            </div>
          </div>

          {/* Social Links with Code Style */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2 sm:mt-7 sm:gap-3 md:mt-8">
            <span className="mr-1 hidden font-mono text-xs text-[#64748b] sm:mr-2 sm:inline sm:text-sm dark:text-[#cbd5e1]">
              {'connect: ['}
            </span>
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`group relative flex h-10 w-10 items-center justify-center rounded-full bg-[#f2f2f2] text-[#334155] shadow-md transition-all duration-300 hover:-translate-y-1 hover:scale-110 sm:h-11 sm:w-11 dark:bg-[#11141c] dark:text-[#cbd5e1] ${social.hoverColor}`}
                aria-label={social.label}
              >
                <social.icon className="h-4 w-4 transition-transform group-hover:rotate-12 sm:h-5 sm:w-5" />

                {/* Enhanced Tooltip */}
                <span className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 rounded-lg bg-[#0082c4] px-2 py-1 font-mono text-[10px] whitespace-nowrap text-white opacity-0 transition-all group-hover:-translate-y-1 group-hover:opacity-100 sm:-top-12 sm:px-3 sm:py-1.5 sm:text-xs">
                  {social.label}
                </span>
              </a>
            ))}
            <span className="ml-1 hidden font-mono text-xs text-[#64748b] sm:ml-2 sm:inline sm:text-sm dark:text-[#cbd5e1]">
              {']'}
            </span>
          </div>
        </div>

        {/* Content Section - Right Side */}
        <div className="mt-6 w-full space-y-3 sm:space-y-4 md:space-y-5 lg:mt-0 lg:w-1/2 lg:space-y-6">
          {/* Greeting with Code Style */}
          <div className="animate-fade-in font-mono text-xs text-[#64748b] sm:text-sm dark:text-[#cbd5e1]">
            <span className="text-[#0082c4]">const</span> developer = {'{'}
          </div>

          {/* Name */}
          <h1 className="animate-[fadeInUp_0.6s_ease-out_0.2s_forwards] text-2xl font-bold text-black opacity-0 sm:text-3xl md:text-4xl lg:text-5xl dark:text-white">
            MD. Saif Islam
          </h1>

          {/* Animated Role */}
          <div className="flex min-h-12 flex-wrap items-center gap-2 sm:min-h-14 md:min-h-16">
            <span className="font-mono text-sm text-[#64748b] sm:text-base md:text-lg dark:text-[#cbd5e1]">
              Role:
            </span>
            <div className="relative min-w-0 flex-1">
              <h2 className="text-xl font-extrabold wrap-break-word text-[#0082c4] transition-all duration-500 sm:text-2xl md:text-3xl lg:text-4xl">
                <Typewriter
                  words={[
                    'Full-Stack Developer',
                    'Front-End Developer',
                    'MERN Stack Developer',
                    'React & Next.js Expert',
                  ]}
                  loop={0}
                  cursor
                  cursorStyle="|"
                  typeSpeed={70}
                  deleteSpeed={50}
                  delaySpeed={1500}
                />
              </h2>
            </div>
          </div>

          {/* Description with Code Comment Style */}
          <div className="space-y-1.5 sm:space-y-2">
            <p className="font-mono text-xs text-[#0082c4] sm:text-sm">
              {'// About Me'}
            </p>
            <p className="border-l-2 border-[#0082c4] pl-3 text-xs leading-relaxed text-[#64748b] sm:pl-4 sm:text-sm md:text-base lg:text-lg dark:text-[#cbd5e1]">
              Passionate about crafting elegant, scalable web solutions with
              modern technologies. Specialized in building high-performance
              applications that deliver exceptional user experiences. Let's
              transform your ideas into reality.
            </p>
          </div>

          {/* Tech Stack Pills */}
          <div className="flex flex-wrap gap-1.5 pt-1 sm:gap-2 sm:pt-2">
            {[
              'React',
              'Next.js',
              'TypeScript',
              'Node.js',
              'Express.js',
              'MongoDB',
              'Tailwind CSS',
              'Firebase',
              'NextAuth',
              'Git',
              'GitHub',
              'HTML',
              'CSS',
            ].map((tech, index) => (
              <span
                key={index}
                className="cursor-default rounded-full border border-[#0082c4]/20 bg-[#f2f2f2] px-2 py-0.5 font-mono text-xs text-[#0082c4] transition-all hover:border-[#0082c4] hover:shadow-lg hover:shadow-[#0082c4]/20 sm:px-3 sm:py-1 sm:text-sm dark:bg-[#11141c]"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:gap-4 sm:pt-4">
            {/* Download Resume Button */}
            <a
              href="https://drive.google.com/uc?export=download&id=1fXoyWDzFV_VS81ISMkK-G0vCHc7_nw8j"
              target="_blank"
              className="group relative flex items-center justify-center gap-2 overflow-hidden rounded-lg bg-[#0082c4] px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-[#0082c4]/30 transition-all duration-300 hover:scale-105 hover:bg-[#0099e6] hover:shadow-xl hover:shadow-[#0082c4]/40 sm:px-5 sm:py-3 sm:text-base md:px-6"
            >
              <div className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              <Download className="relative z-10 h-4 w-4 transition-transform group-hover:translate-y-1 sm:h-5 sm:w-5" />
              <span className="relative z-10">Download Resume</span>
            </a>

            {/* Learn More Button */}
            <a
              href="#about"
              className="group relative flex items-center justify-center gap-2 overflow-hidden rounded-lg border-2 border-[#0082c4] bg-transparent px-4 py-2.5 text-sm font-semibold text-[#0082c4] transition-all duration-300 hover:scale-105 hover:bg-[#0082c4] hover:text-white hover:shadow-lg hover:shadow-[#0082c4]/30 sm:px-5 sm:py-3 sm:text-base md:px-6"
            >
              <div className="absolute inset-0 translate-y-full bg-[#0082c4] transition-transform duration-300 group-hover:translate-y-0" />
              <span className="relative z-10">Learn More</span>
              <ArrowRight className="relative z-10 h-4 w-4 transition-transform group-hover:translate-x-1 sm:h-5 sm:w-5" />
            </a>
          </div>

          {/* Closing Code Bracket */}
          <div className="pt-1 font-mono text-xs text-[#64748b] sm:pt-2 sm:text-sm dark:text-[#cbd5e1]">
            {'}'}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <a
        href="#about"
        className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 animate-bounce flex-col items-center gap-1 font-semibold text-[#0082c4] transition-all [animation-duration-[2s]] hover:scale-110 hover:text-[#0099e6] sm:bottom-4 sm:gap-2 md:bottom-5"
      >
        <span className="font-mono text-xs sm:text-sm">scroll()</span>
        <ArrowDown className="h-4 w-4 sm:h-5 sm:w-5" />
      </a>
    </div>
  );
};

export default Banner;
