import React from 'react';
import Education from './Education';
import WhatIDo from './WhatIDo';
import WhyChooseMe from './WhyChooseMe';

const About = () => {
  return (
    <section
      id="about"
      className="mx-auto max-w-screen-2xl bg-transparent pb-12 pt-8 text-gray-800 dark:text-gray-100"
    >
      <div className="px-5 lg:px-0">
        {/* What I Do Section */}
        <WhatIDo />

        {/* Education Section */}
        <Education />

        {/* Why Choose Me Section */}
        <WhyChooseMe />
      </div>
    </section>
  );
};

export default About;
