'use client'
import React from 'react';
import { LuSendHorizonal } from "react-icons/lu";
import Swal from 'sweetalert2';
import { MdAttachEmail } from "react-icons/md";
import { FaGithub, FaLinkedin, FaSquareWhatsapp, FaTwitter } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa";


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
        e.target.reset()
    }
    return (
        <div id='contact' className='min-h-screen flex  flex-col items-center justify-center'>
            <div className='w-full'>
                <h1 className='text-3xl text-center font-semibold   my-10'>Contact Me</h1>
                <div className='bg-[#00283A] rounded-xl mt-5 p-8 md:p-12 lg:p-16'>
                    <div className='flex items-center justify-center gap-5'>
                        <a href="mailto:muhammadsaif7717@gmail.com"><MdAttachEmail className='text-3xl hover:scale-110' /></a>
                        <a href="https://wa.me/+8801319630516"><FaSquareWhatsapp className='text-3xl hover:scale-110' /></a>
                        <a href="https://fb.com/muhammadsaif7717"><FaFacebook className='text-3xl hover:scale-110' /></a>
                        <a href="https://linkedin.com/in/muhammadsaif77177"><FaLinkedin className='text-3xl hover:scale-110' /></a>
                        <a href="https://twitter.com/muhammadsaif77"><FaTwitter className='text-3xl hover:scale-110' /></a>
                        <a href="https://github.com/muhammadsaif7717"><FaGithub className='text-3xl hover:scale-110' /></a>
                    </div>
                </div>
            </div>
            <div className='w-full'>
                <div className='bg-[#00283A] rounded-xl mt-5 '>
                    <form onSubmit={handleSend} className='p-8 md:p-12 lg:p-16 flex flex-col gap-5 max-w-screen-lg mx-auto'>
                        <h1 className='text-2xl text-center font-semibold mb-2'>Get In  Touch</h1>
                        <input type="text" name="name" placeholder='Name' className="input input-bordered bg-[#02162B] rounded-xl w-full border-none outline-none" required />
                        <input type="email" name="email" placeholder='Email' className="input input-bordered bg-[#02162B] rounded-xl w-full border-none outline-none" required />
                        <input type="text" name="subject" placeholder='Subject' className="input input-bordered bg-[#02162B] rounded-xl w-full border-none outline-none" required />
                        <textarea name="message" placeholder='Message' className="input input-bordered bg-[#02162B] rounded-xl w-full border-none outline-none pt-3" required></textarea>
                        <div className='flex flex-col lg:flex-row gap-5 items-center justify-between'>
                            <button className='bg-[#0082C4] w-36 rounded-full btn '>Send <LuSendHorizonal /></button>
                            <p>* I promise the confidentiality of your personal information</p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Contact;