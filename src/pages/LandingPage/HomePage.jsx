import React from 'react';
import Hero from './hero';
import HowItWorks from './howitworks';
import WhyChooseUs from './whychooseus';
import Pricing from './pricing';


function Homepage() {
  return (
    <>
      <Hero />
      <HowItWorks />
      <WhyChooseUs />
      <Pricing />
    </>
  );
}

export default Homepage;