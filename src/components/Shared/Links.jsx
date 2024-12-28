import { ActiveContext } from '@/contexts/ActiveProvider';
import Link from 'next/link';
import React, { useContext } from 'react';

const Links = ({ setOpened }) => {
  const { active, setActive } = useContext(ActiveContext);

  const links = (
    <div className="flex flex-col gap-5 font-semibold uppercase dark:text-white lg:flex-row">
      <Link
        onClick={() => {
          setActive('home'), setOpened(false);
        }}
        href="/"
        className={`hover:text-blue-500 ${active === 'home' && 'text-blue-400'}`}
      >
        Home
      </Link>
      <Link
        onClick={() => {
          setActive('skills'), setOpened(false);
        }}
        href="/#skills"
        className={`hover:text-blue-500 ${active === 'skills' && 'text-blue-400'}`}
      >
        Skills
      </Link>
      <Link
        onClick={() => {
          setActive('projects'), setOpened(false);
        }}
        href="/#projects"
        className={`hover:text-blue-500 ${active === 'projects' && 'text-blue-400'}`}
      >
        Projects
      </Link>
      <Link
        onClick={() => {
          setActive('about'), setOpened(false);
        }}
        href="/#about"
        className={`hover:text-blue-500 ${active === 'about' && 'text-blue-400'}`}
      >
        About
      </Link>
      <Link
        onClick={() => {
          setActive('contact'), setOpened(false);
        }}
        href="/#contact"
        className={`hover:text-blue-500 ${active === 'contact' && 'text-blue-400'}`}
      >
        Contact
      </Link>
      <Link
        onClick={() => {
          setActive('blogs'), setOpened(false);
        }}
        href="/blogs"
        className={`hover:text-blue-500 ${active === 'blogs' && 'text-blue-400'}`}
      >
        Blogs
      </Link>
      <Link
        onClick={() => setOpened(false)}
        href="/dashboard"
        className={`hover:text-blue-500`}
      >
        Dashboard
      </Link>
    </div>
  );
  return <div>{links}</div>;
};

export default Links;
