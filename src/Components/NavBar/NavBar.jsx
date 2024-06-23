import Link from 'next/link';
import React from 'react';

const NavBar = () => {
    const links = <div className='flex flex-col lg:flex-row gap-5'>
        <Link href={`/#`}>Protfolio</Link>
        <Link href={`/#`}>Projects</Link>
        <Link href={`/#`}>About</Link>
    </div>
    return (
        <div class="navbar bg-base-100">
  <div class="navbar-start">
    <div class="dropdown">
      <div tabindex="0" role="button" class="btn btn-ghost lg:hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h8m-8 6h16" />
        </svg>
      </div>
      <ul
        tabindex="0"
        class="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
        <li><a>Item 1</a></li>
        <li>
          <a>Parent</a>
          <ul class="p-2">
            <li><a>Submenu 1</a></li>
            <li><a>Submenu 2</a></li>
          </ul>
        </li>
        <li><a>Item 3</a></li>
      </ul>
    </div>
    <a class="btn btn-ghost text-xl">daisyUI</a>
  </div>
  <div class="navbar-center hidden lg:flex">
    <ul class="menu menu-horizontal px-1">
      <li><a>Item 1</a></li>
      <li>
        <details>
          <summary>Parent</summary>
          <ul class="p-2">
            <li><a>Submenu 1</a></li>
            <li><a>Submenu 2</a></li>
          </ul>
        </details>
      </li>
      <li><a>Item 3</a></li>
    </ul>
  </div>
  <div class="navbar-end">
    <a class="btn">Button</a>
  </div>
</div>
        // <div className='fixed w-full'>
        //     <div className="navbar bg-base-100 bg-opacity-50">
        //         <div className="navbar-start">
        //             <div className="dropdown">
        //                 <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        //                     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
        //                 </div>
        //                 <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
        //                     {links}
        //                 </ul>
        //             </div>
        //             <Link href={`/`} className="btn btn-ghost text-xl text-orange-500">Developer Saif</Link>
        //         </div>
        //         <div className="navbar-center hidden lg:flex ">
        //             <ul className="menu menu-horizontal px-1">
        //                 {links}
        //             </ul>
        //         </div>
        //         <div className="navbar-end">
        //             <a className="btn btn-primary text-white rounded-full bg-orange-500 border-none" href='#'>Contact</a>
        //         </div>
        //     </div>
        // </div>
    );
};

export default NavBar;