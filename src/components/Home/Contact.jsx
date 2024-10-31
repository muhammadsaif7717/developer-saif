'use client'
import Link from 'next/link';
import React from 'react';
import { FaGithub, FaLinkedinIn } from 'react-icons/fa';
import { LuSendHorizonal } from "react-icons/lu";
import Swal from 'sweetalert2';



const Contact = () => {
    const handleSend = (e) => {
        e.preventDefault();
        Swal.fire({
            position: "center",
            icon: "success",
            title: "Sent Successfully",
            showConfirmButton: false,
            timer: 1500
        });
        e.currentTarget.reset();
    }
    return (
        <div id='contact' className='flex flex-col bg-base-300 my-5  items-center justify-center dark:bg-[#00283A] dark:text-white p-8 md:p-12 lg:p-16 rounded-xl'>
            <div className="pb-5  lg:pb-10">
                <h1 className='text-2xl font-bold'>GET IN TOUCH</h1>
            </div>
            <hr className="bg-gray-300" />

            <div className="grid grid-cols-1 lg:grid-cols-2  justify-between  gap-10">
                <div className="w-full grid grid-cols-1 items-center justify-center p-0 m-0">
                    <h1 className="text-xl font-semibold capitalize  text-center lg:text-start w-full border-b border-gray-300 lg:border-none">Contact me for collaboration</h1>
                    <div className="mt-6 space-y-8 md:mt-8 w-full  flex flex-col items-center lg:items-start">
                        <Link href={`https://www.google.com.bd/maps/place/390%E0%A6%9C%E0%A6%BF+%E0%A6%B9%E0%A6%BE%E0%A6%89%E0%A6%B8+%E0%A6%93%E0%A6%AB+%E0%A6%AE%E0%A6%BE+%E0%A6%AC%E0%A6%BE%E0%A6%AC%E0%A6%BE/@23.7573292,90.4114466,20z/data=!4m15!1m8!3m7!1s0x3755b89268be23d7:0xf9e14970fcced350!2z4Kaw4Kau4Kao4Ka-LCDgpqLgpr7gppXgpr4!3b1!8m2!3d23.7330218!4d90.3983829!16s%2Fm%2F02phgkx!3m5!1s0x3755b93434ec9b4b:0xd6bcb2e8867514e1!8m2!3d23.7570791!4d90.4118797!16s%2Fg%2F11k4_l0rmw?hl=bn&entry=ttu&g_ep=EgoyMDI0MTAyNy4wIKXMDSoASAFQAw%3D%3D`} target='_blank' className="flex items-start -mx-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-2 text-blue-500 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round"  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                            <span className="mx-2 text-gray-700 truncate dark:text-gray-400 max-w-[12rem] md:max-w-xs lg:max-w-md">Old Elephent Rode, Dhaka, Bangladesh</span>
                        </Link>
                        <Link href={`https://wa.me/+8801572900381"`}  target='_blank' className="flex items-start -mx-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-2 text-blue-500 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round"  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                            <span className="mx-2 text-gray-700 truncate dark:text-gray-400 max-w-[12rem] md:max-w-xs lg:max-w-md">(+880) 1572900381 (WhatsApp)</span>
                        </Link>
                        <Link href={`mailto:muhammadsaif7717@gmail.com`} className="flex items-start -mx-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-2 text-blue-500 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round"  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                            <span  className="mx-2 text-gray-700 truncate dark:text-gray-400 max-w-[12rem] md:max-w-xs lg:max-w-md">muhammadsaif7717@gmail.com</span>
                        </Link>
                    </div>

                    <div className="flex items-center justify-center lg:justify-start gap-4  mt-4 md:mt-6 w-full ">
                        <ul className="flex items-center justify-center space-x-4">
                            <li>
                                <Link href="https://drive.usercontent.google.com/download?id=1bI07nOE949lIj5kUNtlEAKhIqo_sMt5w&export=download&authuser=0&confirm=t&uuid=8558bd91-87cf-4b27-9a7f-97195f7ed006&at=APZUnTXVDpPcCqfjJpsBcaY4hQYy:1720077436011"
                                    target="_blank"
                                    rel="noopener noreferrer">
                                    <button className="flex justify-center gap-2 bg-[#0082C4] px-2 py-2 rounded-full text-white shadow-xl hover:bg-[#3cbbfa] hover:scale-105 duration-500 w-[140px]">Resume<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5 animate-bounce-slow"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3"></path></svg>
                                    </button>
                                </Link>
                            </li>
                            <li>
                                <Link  href="#"
                            target="_blank"
                            rel="noopener noreferrer">
                                    <button className="flex justify-center gap-2 bg-[#0082C4] px-2 py-2 rounded-full text-white shadow-xl hover:bg-[#1cb3ff] hover:scale-105 duration-500 w-[100px]">CV<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5 animate-bounce-slow"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3"></path></svg>
                                    </button>
                                </Link>
                            </li>
                            <li>
                                <Link href="https://www.linkedin.com/in/mdsaifislam77" target="_blank" className="text-gray-500 hover:text-gray-900 dark:hover:text-white dark:text-gray-400"><FaLinkedinIn  className='text-4xl'/></Link>
                            </li>
                            <li>
                                <Link href="https://github.com/muhammadsaif7717" target="_blank" className="text-gray-500 hover:text-gray-900 dark:hover:text-white dark:text-gray-400"><FaGithub className='text-4xl'/></Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className='w-full'>
                    <div className='bg-base-300 dark:bg-[#00283A] dark:text-white rounded-xl flex flex-col items-center justify-center'>
                        <form onSubmit={handleSend} className='flex flex-col gap-5 max-w-screen-lg mx-auto'>
                            <h1 className='text-xl text-center lg:text-start font-semibold mb-2 border-b border-gray-300 lg:border-none'>Lets Work Togther!</h1>
                            <input type="text" name="name" placeholder='Name' className="input input-bordered bg-base-100 dark:bg-[#02162B] rounded-xl w-full border-none outline-none" required />
                            <input type="email" name="email" placeholder='Email' className="input input-bordered  bg-base-100 dark:bg-[#02162B]  rounded-xl w-full border-none outline-none" required />
                            <input type="text" name="subject" placeholder='Subject' className="input input-bordered  bg-base-100 dark:bg-[#02162B]  rounded-xl w-full border-none outline-none" required />
                            <textarea name="message"  placeholder='Message' className="input input-bordered  bg-base-100 dark:bg-[#02162B]  rounded-xl w-full border-none outline-none pt-3 h-24" required></textarea>
                            <div className='flex flex-col lg:flex-row gap-5 items-center justify-between'>
                                <button className='bg-[#0082C4] hover:bg-[#1ab3ff] text-white border-none w-36 rounded-full btn '>Send <LuSendHorizonal className='text-lg' /></button>
                                <p>* I promise the confidentiality of your personal information</p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;