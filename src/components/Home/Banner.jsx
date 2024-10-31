import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { IoCloudDownloadOutline } from "react-icons/io5";

const Banner = () => {
    return (
        <div id='home' className="min-h-[88vh] bg-opacity-50 bg-[linear-gradient(to_top,rgba(0,0,0,0.1)50%,rgba(0,0,0,0.1)50%),url('/bg-2.jpg')] dark:bg-[linear-gradient(to_top,rgba(0,0,0,0.5)50%,rgba(0,0,0,0.5)50%),url('/bg.jpg')] bg-center bg-no-repeat bg-cover rounded-xl grid grid-cols-1 items-center justify-center">
            <div className="flex justify-center lg:justify-between items-center gap-5 flex-col-reverse lg:flex-row h-full p-10">
                <div className="space-y-4">
                    <h2 className="text-2xl text-center lg:text-start font-bold dark:text-white">
                        MD. SAIF ISLAM
                    </h2>
                    <h1 className="text-blue-400 text-3xl md:text-4xl lg:text-6xl text-center lg:text-start font-bold hover:scale-105">
                        MERN Stack Developer
                    </h1>
                    <p className="text-center lg:text-start dark:text-white">
                        This is Muhammad Saif. I{`'`}m a MERN Stack web application developer. This is my portfolio page. Keep learning about myself and stay connected with me.
                        <br />
                        <a href="#about" className="text-blue-400 hover:text-orange-500">More Details...</a>
                    </p>
                    <div className="flex justify-center lg:justify-start">
                        <Link
                            href="https://drive.usercontent.google.com/download?id=1bI07nOE949lIj5kUNtlEAKhIqo_sMt5w&export=download&authuser=0&confirm=t&uuid=8558bd91-87cf-4b27-9a7f-97195f7ed006&at=APZUnTXVDpPcCqfjJpsBcaY4hQYy:1720077436011"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <button className="btn hover:scale-105 btn-primary rounded-full bg-orange-500 border-none text-white">
                                Download Resume <IoCloudDownloadOutline className="font-bold text-3xl" />
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
                        className="w-2/5 lg:w-3/5 mx-auto md:w-64 rounded-full hover:scale-90 scale-75"
                        priority
                    />
                </div>
            </div>
        </div>
    );
};

export default Banner;
