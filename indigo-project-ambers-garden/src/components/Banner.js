// src/components/Banner.js
import React from 'react';
import './styles/Banner.css';
// import backgroundVideo from '../assets/background-video.mp4';

const Banner = () => (
  <div className="banner">
    <video autoPlay muted loop className="background-video">
      {/* <source src={backgroundVideo} type="video/mp4" /> */}
    </video>
    <h1>June is PTSD Awareness Month</h1>
    <p>Join us in raising awareness and supporting those affected by PTSD.</p>
    <a href="#donate" className="btn-main">Donate Now</a>
  </div>
);

export default Banner;
