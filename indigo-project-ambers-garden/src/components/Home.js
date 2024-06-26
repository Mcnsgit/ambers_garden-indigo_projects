// src/components/Home.js
import React from 'react';
import Banner from './Banner';
import Intro from './Intro';
import Donate from './Donate';

import CTA from './CTA';

const Home = () => (
  <>
    <Banner />
    <Intro />
    <Donate />

    <CTA />
  </>
);

export default Home;
