// src/components/Footer.js
import React from 'react';
import './styles/Footer.css';

const Footer = () => (
  <footer id="contact">
    <p>Contact us: support@ptsawareness.org.uk | +44 1234 567890</p>
    <p>Follow us on social media:</p>
    <ul className="social-media">
      <li><a href="#"><i className="fab fa-facebook-f"></i></a></li>
      <li><a href="#"><i className="fab fa-twitter"></i></a></li>
      <li><a href="#"><i className="fab fa-instagram"></i></a></li>
    </ul>
    <p>&copy; 2024 Indigo Projects. All rights reserved.</p>
  </footer>
);

export default Footer;