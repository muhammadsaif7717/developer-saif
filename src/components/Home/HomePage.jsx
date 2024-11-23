import React from 'react';
import Banner from './Banner';
import Contact from './Contact';
import Projects from './Projects';
import Skills from './Skills';
import About from './About';

const HomePage = () => {
  return (
    <div className="mx-auto min-h-[calc(100vh-224px)] max-w-screen-2xl pt-20">
      <Banner />
      <Skills />
      <Projects />
      <About />
      <Contact />
    </div>
  );
};

export default HomePage;
