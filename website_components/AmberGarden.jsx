/* eslint-disable react/no-unescaped-entities */
// src/components/AmberGarden.js
import '../components/styles/AmberGarden.css';
import amberBanner from '../assets/amber.jpeg'; // Replace with actual image path
// import DonateQRCode from '../components/DonateQRCode';
import aboutImage from '../assets/about-amber.jpeg'; // Replace with actual image path
import hamperImage from '../assets/hamper.jpeg'; // Replace with actual image path
import eventsImage from '../assets/events.jpeg'; // Replace with actual image path
import Header from '../components/Header';

const AmberGarden = () => (
  <div>
    <Header />
  

  <section id="amber-garden">
    <div className="banner">
      <img src={amberBanner} alt="Amber's Garden Banner" className="banner-image" />
      <div className="banner-content">
        <h1>Amber's Garden</h1>
        <p>A project in memory of Amber, a loving service dog who touched many lives.</p>
      </div>
    </div>
    <div className="about-section">
      <img src={aboutImage} alt="About Amber" className="section-image" />
      <div className="section-text">
        <h2>About Amber's Garden</h2>
        <p>Amber was not only a beloved assistance dog but also a best friend to many. She played a significant role in gaining legal recognition for assistance dogs.</p>
        <p>Sadly, Amber passed away unexpectedly, but her legacy continues through Amber's Garden. This initiative is dedicated to creating a serene space in her memory and supporting other service dogs.</p>
      </div>
    </div>
    <div className="donate-section">
    </div>
    <div className="hamper-section">
      <img src={hamperImage} alt="Holistic Incense Hampers" className="section-image" />
      <div className="section-text">
        <h2>Holistic Incense Hampers</h2>
        <p>Buy an incense hamper and give another one for free! You can nominate someone you know or give "a stranger a reason to smile."</p>
        <a href="https://example.com/buy-hamper" target="_blank" rel="noopener noreferrer" className="btn-main">Buy a Hamper</a>
      </div>
    </div>
    <div className="event-section">
      <img src={eventsImage} alt="Upcoming Events" className="section-image" />
      <div className="section-text">
        <h2>Upcoming Events</h2>
        <p>We are planning events at Amber's Garden. More information will be available soon. Stay tuned for updates!</p>
      </div>
    </div>
  </section>
  </div>
);

{/* <DonateQRCode /> */}
export default AmberGarden;
