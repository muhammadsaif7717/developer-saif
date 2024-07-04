'use client'
import React from 'react';
import { LuSendHorizonal } from "react-icons/lu";
import Swal from 'sweetalert2';

const Contact = () => {
    const handleSend = () => {
        Swal.fire({
            position: "center",
            icon: "success",
            title: "Sent Successfully",
            showConfirmButton: false,
            timer: 1500
        });
    }
    return (
        <div id='contact' className='min-h-screen flex  flex-col items-center justify-center'>
            <div className='w-full'>
                <h1 className='text-3xl text-center font-semibold   my-10'>Contact Me</h1>
                <div className='bg-[#00283A] rounded-xl mt-5 '>

                </div>
            </div>
            <div className='w-full'>
                <div className='bg-[#00283A] rounded-xl mt-5 '>
                    <form className='p-8 md:p-12 lg:p-16 flex flex-col gap-5 max-w-screen-lg mx-auto'>
                        <h1 className='text-2xl text-center font-semibold mb-2'>Get In  Touch</h1>
                        <input type="text" name="name" placeholder='Name' className="input input-bordered bg-[#02162B] rounded-xl w-full border-none outline-none" />
                        <input type="text" name="email" placeholder='Email' className="input input-bordered bg-[#02162B] rounded-xl w-full border-none outline-none" />
                        <input type="text" name="subject" placeholder='Subject' className="input input-bordered bg-[#02162B] rounded-xl w-full border-none outline-none" />
                        <textarea name="message" placeholder='Message' className="input input-bordered bg-[#02162B] rounded-xl w-full border-none outline-none pt-3" ></textarea>
                        <div className='flex flex-col lg:flex-row gap-5 items-center justify-between'>
                            <button onClick={handleSend} className='bg-[#0082C4] w-36 rounded-full btn '>Send <LuSendHorizonal /></button>
                            <p>* I promise the confidentiality of your personal information</p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Contact;