'use client';
import Link from 'next/link';
import React from 'react';
import { FaGithub, FaLinkedinIn } from 'react-icons/fa';
import { LuSendHorizonal } from 'react-icons/lu';
import Swal from 'sweetalert2';

const Contact = () => {
  const handleSend = (e) => {
    e.preventDefault();
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Sent Successfully',
      showConfirmButton: false,
      timer: 1500,
    });
    e.currentTarget.reset();
  };
  return (
    <div
      id="contact"
      className="my-5 flex flex-col items-center justify-center rounded-xl bg-gray-200 p-8 dark:bg-[#00283A] dark:text-white md:p-12 lg:p-16"
    >
      <div className="pb-5 lg:pb-10">
        <h1 className="text-2xl font-bold">GET IN TOUCH</h1>
      </div>
      <hr className="bg-gray-300" />

      <div className="grid grid-cols-1 justify-between gap-10 lg:grid-cols-2">
        <div className="m-0 grid w-full grid-cols-1 items-center justify-center p-0">
          <h1 className="w-full border-b border-gray-300 text-center text-xl font-semibold capitalize lg:border-none lg:text-start">
            Contact me for collaboration
          </h1>
          <div className="mt-6 flex w-full flex-col items-center space-y-8 md:mt-8 lg:items-start">
            <Link
              href={`https://www.google.com.bd/maps/place/390%E0%A6%9C%E0%A6%BF+%E0%A6%B9%E0%A6%BE%E0%A6%89%E0%A6%B8+%E0%A6%93%E0%A6%AB+%E0%A6%AE%E0%A6%BE+%E0%A6%AC%E0%A6%BE%E0%A6%AC%E0%A6%BE/@23.7573292,90.4114466,20z/data=!4m15!1m8!3m7!1s0x3755b89268be23d7:0xf9e14970fcced350!2z4Kaw4Kau4Kao4Ka-LCDgpqLgpr7gppXgpr4!3b1!8m2!3d23.7330218!4d90.3983829!16s%2Fm%2F02phgkx!3m5!1s0x3755b93434ec9b4b:0xd6bcb2e8867514e1!8m2!3d23.7570791!4d90.4118797!16s%2Fg%2F11k4_l0rmw?hl=bn&entry=ttu&g_ep=EgoyMDI0MTAyNy4wIKXMDSoASAFQAw%3D%3D`}
              target="_blank"
              className="-mx-2 flex items-start duration-200 hover:scale-105"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="mx-2 h-6 w-6 text-blue-500 dark:text-blue-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                ></path>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                ></path>
              </svg>
              <span className="mx-2 max-w-[12rem] truncate text-gray-700 dark:text-gray-400 md:max-w-xs lg:max-w-md">
                Old Elephent Rode, Dhaka, Bangladesh
              </span>
            </Link>
            <Link
              href={`https://wa.me/+8801572900381"`}
              target="_blank"
              className="-mx-2 flex items-start duration-200 hover:scale-105"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="mx-2 h-6 w-6 text-blue-500 dark:text-blue-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                ></path>
              </svg>
              <span className="mx-2 max-w-[12rem] truncate text-gray-700 dark:text-gray-400 md:max-w-xs lg:max-w-md">
                (+880) 1572900381 (WhatsApp)
              </span>
            </Link>
            <Link
              href={`mailto:muhammadsaif7717@gmail.com`}
              className="-mx-2 flex items-start duration-200 hover:scale-105"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="mx-2 h-6 w-6 text-blue-500 dark:text-blue-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                ></path>
              </svg>
              <span className="mx-2 max-w-[12rem] truncate text-gray-700 dark:text-gray-400 md:max-w-xs lg:max-w-md">
                muhammadsaif7717@gmail.com
              </span>
            </Link>
          </div>

          <div className="mt-4 flex w-full items-center justify-center gap-4 md:mt-6 lg:justify-start">
            <ul className="flex items-center justify-center space-x-4">
              <li>
                <Link
                  href="https://drive.usercontent.google.com/download?id=1bI07nOE949lIj5kUNtlEAKhIqo_sMt5w&export=download&authuser=0&confirm=t&uuid=8558bd91-87cf-4b27-9a7f-97195f7ed006&at=APZUnTXVDpPcCqfjJpsBcaY4hQYy:1720077436011"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button className="flex w-[140px] justify-center gap-2 rounded-full bg-[#0082C4] px-2 py-2 text-white shadow-xl duration-500 hover:scale-105 hover:bg-[#3cbbfa]">
                    Resume
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                      className="animate-bounce-slow h-5 w-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3"
                      ></path>
                    </svg>
                  </button>
                </Link>
              </li>
              <li>
                <Link href="#" target="_blank" rel="noopener noreferrer">
                  <button className="flex w-[100px] justify-center gap-2 rounded-full bg-[#0082C4] px-2 py-2 text-white shadow-xl duration-500 hover:scale-105 hover:bg-[#1cb3ff]">
                    CV
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                      className="animate-bounce-slow h-5 w-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3"
                      ></path>
                    </svg>
                  </button>
                </Link>
              </li>
              <li>
                <Link
                  href="https://www.linkedin.com/in/mdsaifislam77"
                  target="_blank"
                  className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                >
                  <FaLinkedinIn className="text-4xl" />
                </Link>
              </li>
              <li>
                <Link
                  href="https://github.com/muhammadsaif7717"
                  target="_blank"
                  className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                >
                  <FaGithub className="text-4xl" />
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="w-full">
          <div className="flex flex-col items-center justify-center rounded-xl bg-gray-200 dark:bg-[#00283A] dark:text-white">
            <form
              onSubmit={handleSend}
              className="mx-auto flex max-w-screen-lg flex-col gap-5"
            >
              <h1 className="mb-2 border-b border-gray-300 text-center text-xl font-semibold lg:border-none lg:text-start">
                Lets Work Togther!
              </h1>
              <input
                type="text"
                name="name"
                placeholder="Name"
                className="input w-full overflow-hidden rounded-xl border-2 border-transparent bg-base-100 outline-none transition-all duration-300 hover:scale-[1.02] hover:border-blue-400 hover:shadow-[0_0_30px_rgba(127,72,230,0.2)] dark:bg-[#02162B]"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="input w-full overflow-hidden rounded-xl border-2 border-transparent bg-base-100 outline-none transition-all duration-300 hover:scale-[1.02] hover:border-blue-400 hover:shadow-[0_0_30px_rgba(127,72,230,0.2)] dark:bg-[#02162B]"
                required
              />
              <input
                type="text"
                name="subject"
                placeholder="Subject"
                className="input w-full overflow-hidden rounded-xl border-2 border-transparent bg-base-100 outline-none transition-all duration-300 hover:scale-[1.02] hover:border-blue-400 hover:shadow-[0_0_30px_rgba(127,72,230,0.2)] dark:bg-[#02162B]"
                required
              />
              <textarea
                name="message"
                placeholder="Message"
                className="input h-24 w-full overflow-hidden rounded-xl border-2 border-transparent bg-base-100 pt-3 outline-none transition-all duration-300 hover:scale-[1.02] hover:border-blue-400 hover:shadow-[0_0_30px_rgba(127,72,230,0.2)] dark:bg-[#02162B]"
                required
              ></textarea>
              <div className="flex flex-col items-center justify-between gap-5 lg:flex-row">
                <button className="btn w-36 rounded-full border-none bg-[#0082C4] text-white hover:bg-[#1ab3ff]">
                  Send <LuSendHorizonal className="text-lg" />
                </button>
                <p>
                  * I promise the confidentiality of your personal information
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
