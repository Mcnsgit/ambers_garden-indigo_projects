// src/components/Banner.js
import React from 'react';
import './styles/Banner.css';
import VideoBackground from './VideoBackGRound';

const Banner = () => (
  <div className="banner">
    <VideoBackground />
    <div className="overlay">
      <h1>June is PTSD Awareness Month</h1>
      <p>Join us in raising awareness and supporting those affected by PTSD.</p>
      <a href="#donate" className="btn-main">Donate Now</a>
    </div>
  </div>
);

export default Banner;
