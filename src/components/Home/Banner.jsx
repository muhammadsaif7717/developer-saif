'use client';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { IoCloudDownloadOutline } from 'react-icons/io5';
import Typewriter from 'typewriter-effect';

const Banner = () => {
  return (
    <div
      id="home"
      className="grid min-h-[450px] grid-cols-1 items-center justify-center rounded-xl bg-gray-200 bg-cover bg-center bg-no-repeat dark:bg-opacity-50 dark:bg-[linear-gradient(to_top,rgba(0,0,0,0.5)50%,rgba(0,0,0,0.5)50%),url('/bg.jpg')] md:min-h-[600px] lg:min-h-[800px]"
    >
      <div className="flex h-full flex-col-reverse items-center justify-center gap-1 p-5 md:gap-5 md:p-10 lg:flex-row lg:justify-between">
        <div className="space-y-4">
          <h2 className="text-center text-lg font-bold dark:text-white md:text-2xl lg:text-start">
            MD. SAIF ISLAM
          </h2>
          <div className="text-center text-2xl font-bold text-blue-400 md:text-4xl lg:text-start lg:text-6xl">
            <Typewriter
              options={{
                strings: [
                  'Full Stack Developer',
                  'MERN Stack Developer',
                  'Front-End Developer',
                ],
                autoStart: true,
                loop: true,
                deleteSpeed: 50,
              }}
            />
          </div>

          <p className="text-center text-xs dark:text-white md:text-lg lg:text-start">
            This is Muhammad Saif. I{`'`}m a MERN Stack web application
            developer. This is my portfolio page. Keep learning about myself and
            stay connected with me.
            <br />
            <Link href="#about" className="text-blue-400 hover:text-orange-500">
              More Details...
            </Link>
          </p>
          <div className="flex justify-center lg:justify-start">
            <Link
              href="https://drive.usercontent.google.com/download?id=1bI07nOE949lIj5kUNtlEAKhIqo_sMt5w&export=download&authuser=0&confirm=t&uuid=8558bd91-87cf-4b27-9a7f-97195f7ed006&at=APZUnTXVDpPcCqfjJpsBcaY4hQYy:1720077436011"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="btn btn-primary mb-3 rounded-full border-none bg-[#0082C4] text-white duration-200 hover:scale-105 hover:bg-[#3cbbfa] md:mb-0">
                Download Resume{' '}
                <IoCloudDownloadOutline className="text-3xl font-bold" />
              </button>
            </Link>
          </div>
        </div>
        <div>
          <Image
            height={1080}
            width={1080}
            alt="Saif Islam's profile image"
            src="/Saif.png"
            className="mx-auto w-56 scale-75 rounded-[50px] border-2 border-blue-400 bg-gray-200 p-4 transition-all duration-300 hover:scale-90 hover:shadow-[0_0_30px_rgba(127,72,230,0.2)] dark:bg-primary md:w-64 md:rounded-full lg:w-3/5"
          />
        </div>
      </div>
    </div>
  );
};

export default Banner;
