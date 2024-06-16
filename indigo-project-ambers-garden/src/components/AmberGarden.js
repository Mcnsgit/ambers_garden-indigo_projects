// src/components/AmberGarden.js
import React from 'react';
import './styles/AmberGarden.css';
// import amberImage from '../assets/amber.jpg'; // replace with actual image path
/* <img src={amberImage} alt="ber's Garden" /> */

const AmberGarden = () => (
  <section id="amber-garden">
    <div className="banner">
      <h1>Amber's Garden</h1>
      <p>A project in memory of a service dog Amber. Join us in supporting this initiative.</p>
    </div>
    <div className="donate-section">
      <h2>Support Amber's Garden</h2>
      <p>Your donations help us create a beautiful space and support events in memory of Amber.</p>
      <button className="btn-main">Donate Now</button>
    </div>
    <div className="hamper-section">
      <h2>Holistic Incense Hampers</h2>
      <p>Buy a hamper and give another one for free! Nominate someone you know or give "a stranger a reason to smile."</p>
      <button className="btn-main">Buy a Hamper</button>
    </div>
    <div className="event-section">
      <h2>Upcoming Event at Amber's Garden</h2>
      <p>More information coming soon.</p>
    </div>
  </section>
);

export default AmberGarden;
