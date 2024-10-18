// src/components/DonationSection.jsx
import React from 'react';
import './styles/DonationSection.css';

const DonationSection = () => (
  <section className="donation-section">
    <h2>Support the Indigo Project</h2>
    <p>Your contributions help us make a difference.</p>
    <iframe
      src="https://donorbox.org/embed/your-campaign-slug"
      height="685px"
      width="100%"
      style={{ maxWidth: '500px', minWidth: '310px', maxHeight: 'none!important', margin: '0 auto', display: 'block' }}
      seamless="seamless"
      name="donorbox"


    ></iframe>
  </section>
);

export default DonationSection;