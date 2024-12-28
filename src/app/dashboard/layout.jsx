'use client';
import DashNavbar from '@/components/Dashboard/DashNavbar';
import Sidebar from '@/components/Dashboard/Sidebar';
import { useState } from 'react';
import Swal from 'sweetalert2';

export default function DashboardLayout({ children }) {
  const [loginPage, setLoginPage] = useState(false);

  const handleSubmit = (e) => {
    const username = 'muhammadsaif7717';
    const password = 'muhammadsaif7717';

    e.preventDefault();
    const form = e.target;
    const typedUsername = form.username.value;
    const typedPassaword = form.password.value;

    if (typedUsername === username && typedPassaword === password) {
      setLoginPage(false);
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Login successfull',
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Wrong username or password!',
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };
  return (
    <div className="flex flex-col bg-base-100 dark:bg-background">
      {loginPage ? (
        <div className="hero min-h-screen bg-base-200 dark:bg-background">
          <div className="hero-content">
            <div className="card w-96 max-w-sm shrink-0 bg-base-100 shadow-2xl">
              <form
                onSubmit={handleSubmit}
                className="card-body rounded-lg hover:shadow-md dark:bg-primary dark:hover:shadow-gray-800"
              >
                <div className="form-control">
                  <h1 className="text-center text-2xl font-semibold dark:text-base-300">
                    Please Login!
                  </h1>
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text dark:text-base-300">
                      Username
                    </span>
                  </label>
                  <input
                    type="text"
                    name="username"
                    placeholder="Enter username"
                    className="input input-bordered text-gray-400 dark:bg-background"
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text dark:text-base-300">
                      Password
                    </span>
                  </label>
                  <input
                    type="password"
                    name="password"
                    placeholder="Enter password"
                    className="input input-bordered text-gray-400 dark:bg-background"
                    required
                  />
                </div>
                <div className="form-control mt-6">
                  <button className="btn border-none bg-[#0082C4] text-white hover:bg-[#3987ad]">
                    Login
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <DashNavbar />
          <div className="flex">
            <div className="hidden lg:block">
              <Sidebar />
            </div>
            <div className="w-full p-5">{children}</div>
          </div>
        </div>
      )}
    </div>
  );
}
