import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Banner = () => {
  return (
    <div id='home' className="h-[100vh] background bg-center bg-no-repeat bg-cover">
      <div className="flex justify-center lg:justify-between items-center gap-5 flex-col-reverse lg:flex-row pt-20 h-full p-10">
        <div className="space-y-4">
          <h2 className="text-xl text-center lg:text-start">MD. SAIF ISLAM</h2>
          <h1 className="text-blue-400 text-3xl md:text-4xl lg:text-6xl text-center lg:text-start ">MERN Stack Developer</h1>
          <p className="text-center lg:text-start">This is Muhammad Saif. I{`'`}m a full stack web application developer. This is my protfolio page. Keep learning about myself
            And stay connected with me.</p>
          <div className='flex justify-center lg:justify-start'>
            <Link href={'https://drive.google.com/file/d/1bI07nOE949lIj5kUNtlEAKhIqo_sMt5w/view?usp=drive_link'} target='blank'>
              <button className='btn  btn-primary rounded-full bg-orange-500 border-none '>My Resume</button>
            </Link>
          </div>
        </div>
        <div>
          <Image height={1080} width={1080} alt="logo" src={`/images/logo.jpg`} className="w-3/5 mx-auto md:w-64 rounded-full" />
        </div>
      </div>
    </div>
  );
};

export default Banner;