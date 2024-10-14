// src/components/Footer.js
import React from 'react';
import './styles/Footer.css';
import { SocialIcon } from 'react-social-icons/component';
import 'react-social-icons/x'
// Footer.jsx
const Footer = () => {
const twitterIcon = <SocialIcon url='https://twitter.com/teamindigo' target="_blank" rel="noopener noreferrer" />

return (
  <footer>
    <div className="footer">

    <p>&copy; {new Date().getFullYear()} Indigo Projects</p>

    <p>Contact us: hello@teamindigo.uk</p>
    <div className="social-media">
    <p>Follow us on social media:</p>
    <ul className="social-media">
<SocialIcon url='https://x.com' target="_blank" rel="noopener noreferrer" />
    </ul>
    </div>
    </div>
  </footer>
);
};

export default Footer;

