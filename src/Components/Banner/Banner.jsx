import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { IoCloudDownloadOutline  } from "react-icons/io5";

const Banner = () => {
  return (
    <div id='home' className="h-[100vh] background bg-center bg-no-repeat bg-cover">
      <div className="flex justify-center lg:justify-between items-center gap-5 flex-col-reverse lg:flex-row pt-20 h-full p-10">
        <div className="space-y-4">
          <h2 className="text-2xl text-center lg:text-start font-bold ">MD. SAIF ISLAM</h2>
          <h1 className="text-blue-400 text-3xl md:text-4xl lg:text-6xl text-center lg:text-start font-bold hover:scale-105">MERN Stack Developer</h1>
          <p className="text-center lg:text-start">This is Muhammad Saif. I{`'`}m a MERN Stack web application developer. This is my protfolio page. Keep learning about myself And stay connected with me. <a href="#about" className='text-blue-400 hover:text-orange-500'>More Details...</a></p>
          <div className='flex justify-center lg:justify-start'>
            <Link href={'https://drive.usercontent.google.com/download?id=1bI07nOE949lIj5kUNtlEAKhIqo_sMt5w&export=download&authuser=0&confirm=t&uuid=8558bd91-87cf-4b27-9a7f-97195f7ed006&at=APZUnTXVDpPcCqfjJpsBcaY4hQYy:1720077436011'} target='blank'>
              <button className='btn hover:scale-105 btn-primary rounded-full bg-orange-500 border-none '>Download Resume <IoCloudDownloadOutline className='font-bold text-3xl' /></button>
            </Link>
          </div>
        </div>
        <div>
          <Image height={1080} width={1080} alt="logo" src={`/images/logo.jpg`} className="w-3/5 mx-auto md:w-64 rounded-full hover:scale-105" />
        </div>
      </div>
    </div>
  );
};

export default Banner;