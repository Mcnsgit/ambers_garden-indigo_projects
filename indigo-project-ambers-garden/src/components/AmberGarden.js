// src/components/AmberGarden.js
import React from 'react';
import './styles/AmberGarden.css';
import amberImage from '../assets/amber.jpg';
import DonateQRCode from './DonateQRCode'; // Replace with actual image path
// import backgroundVideo from '../assets/amber-garden-video.mp4'; // Replace with actual video path
    //   <video autoPlay muted loop className="background-video">
    //     <source src={backgroundVideo} type="video/mp4" />
    //   </video>

const AmberGarden = () => (
  <section id="amber-garden">
    <div className="banner">
      <div className="banner-content">
        <h1>Amber's Garden</h1>
        <p>A project in memory of Amber, a loving service dog who touched many lives.</p>
      </div>
      <img className="amber-image" src={amberImage} alt="Amber in Amber's Garden" />
    </div>
    <div className="about-section">
      <h2>About Amber's Garden</h2>
      <p>Amber was not only a beloved assistance dog but also a best friend to many. She played a significant role in gaining legal recognition for assistance dogs.</p>
      <p>Sadly, Amber passed away unexpectedly, but her legacy continues through Amber's Garden. This initiative is dedicated to creating a serene space in her memory and supporting other service dogs.</p>
    </div>
    <div className="donate-section">
      <h2>Support Amber's Garden</h2>
      <p>Your donations will help create Amber's Garden, a place of peace and reflection, and fund events in her memory.</p>
      <div className="donate-section">
      <DonateQRCode />
    </div>
    </div>
    <div className="hamper-section">
      <h2>Holistic Incense Hampers</h2>
      <p>Buy an incense hamper and give another one for free! You can nominate someone you know or give "a stranger a reason to smile."</p>
      <button className="btn-main">Buy a Hamper</button>
    </div>
    <div className="event-section">
      <h2>Upcoming Events</h2>
      <p>We are planning events at Amber's Garden. More information will be available soon. Stay tuned for updates!</p>
    </div>
  </section>
);

export default AmberGarden;
