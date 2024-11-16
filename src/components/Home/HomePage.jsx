import React from 'react';
import Banner from './Banner';
import Contact from './Contact';
import Projects from './Projects';
import Skills from './Skills';
import About from './About';

const HomePage = () => {
    return (
        <div className="max-w-screen-2xl mx-auto pt-20 min-h-[calc(100vh-224px)]">
            <Banner />
            <Skills/>
            <Projects />
            <About/>
            <Contact />
        </div>
    );
};

export default HomePage;