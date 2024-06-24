
import Link from 'next/link';
import React from 'react';

const Projects = () => {
    return (
        <div id='projects' className='min-h-screen flex flex-col items-center justify-center '>
            <div className='w-full'>
                <h1 className='text-4xl font-semibold text-center my-10 '>Projects</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5  items-center justify-center">
                    <div className='bg-[#00283A] p-5 rounded-xl w-full space-y-3 card-body h-full'>
                        <div>
                            <h1 className='text-xl text-orange-500'>ResidencePro</h1>
                        </div>
                        <div>
                            <p>ResidencePro is a robust property management website designed to streamline the process of managing rental properties. Users can easily track payment histories, manage coupons, and oversee tenant information, all within a secure and user-friendly environment.
                            </p>
                        </div>
                        <div>
                            <Link href={``} className='text-blue-400'><button className='btn btn-primary rounded-full px-5'>Visit</button></Link>
                        </div>
                    </div>
                    <div className='bg-[#00283A] p-5 rounded-xl w-full space-y-3 card-body h-full'>
                        <div>
                            <h1 className='text-xl text-orange-500'>Bistro Boss</h1>
                        </div>
                        <div>
                            <p>Bistro Boss is a comprehensive online restaurant management website where users can effortlessly log in, explore, and order delicious food items from a variety of restaurants. Additionally, users can manage their profiles, and admins can oversee the entire system with ease.
                            </p>
                        </div>
                        <div>
                            <Link href={``} className='text-blue-400'><button className='btn btn-primary rounded-full px-5'>Visit</button></Link>
                        </div>
                    </div>
                    <div className='bg-[#00283A] p-5 rounded-xl w-full space-y-3 card-body h-full'>
                        <div>
                            <h1 className='text-xl text-orange-500'>TripTrax </h1>
                        </div>
                        <div>
                            <p>TripTrax serves as a comprehensive touring spot website where users can discover popular tourist spots of specific countries or explore destinations worldwide. Additionally, users are empowered to contribute by sharing spot details of any country, which are securely stored in the MongoDB database. With an authentication system in place, users can manage their posts effortlessly.

                            </p>
                        </div>
                        <div>
                            <Link href={``} className='text-blue-400'><button className='btn btn-primary rounded-full px-5'>Visit</button></Link>
                        </div>
                    </div>
                    <div className='bg-[#00283A] p-5 rounded-xl w-full space-y-3 card-body h-full'>
                        <div>
                            <h1 className='text-xl text-orange-500'>HotelHub</h1>
                        </div>
                        <div>
                            <p>HotelHub serves as a comprehensive hotel booking website where users can explore and book luxurious rooms and suites in various hotels across the globe. Additionally, users can contribute by posting reviews and ratings for their stays, which are securely stored in the MongoDB database. With an authentication system in place, users can manage their bookings and reviews effortlessly.
                            </p>
                        </div>
                        <div>
                            <Link href={``} className='text-blue-400'><button className='btn btn-primary rounded-full px-5'>Visit</button></Link>
                        </div>
                    </div>
                    <div className='bg-[#00283A] p-5 rounded-xl w-full space-y-3 card-body h-full'>
                        <div>
                            <h1 className='text-xl text-orange-500'>Book Vibe
                            </h1>
                        </div>
                        <div>
                            <p>Book Vibe is a comprehensive online book reading website where users can effortlessly explore, read, and manage a wide variety of books. With books displayed on the homepage, users can click on any book image to be redirected to a detailed book page, and from there, choose to read or add the book to their wish list.
                            </p>
                        </div>
                        <div>
                            <Link href={``} className='text-blue-400'><button className='btn btn-primary rounded-full px-5'>Visit</button></Link>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Projects;